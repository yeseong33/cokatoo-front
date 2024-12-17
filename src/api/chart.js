import * as echarts from 'echarts'
import { LogAPI } from '.';



async function getScores() {
  const response = await LogAPI.scores();

  if (!response.data) {
    throw new Error('Response data is not available');
  }

  const decoder = new TextDecoder(); // UTF-8 디코더
  const scores = [];

  // 스트리밍 데이터 처리
  for await (const chunk of response.data.split(/\r?\n/)) {
    if (chunk.trim()) {
      try {
        const json = JSON.parse(chunk); // NDJSON 각 줄을 JSON으로 파싱
        scores.push(json.score); // 점수 배열에 추가
      } catch (err) {
        console.error('JSON 파싱 에러:', err);
      }
    }
  }

  console.log('모든 점수 수신 완료:', scores);
  return scores;
}


function calculateFineDistribution(scores, binSize) {
  const maxScore = 100; // 최대 점수는 100
  const bins = Array(Math.ceil(maxScore / binSize)).fill(0); // 구간 개수만큼 배열 초기화
  
  // 점수 스케일 조정 (0~1 -> 0~100)
  const scaledScores = scores.map(score => score * 100);

  // 각 점수를 적절한 구간에 배치
  scaledScores.forEach(score => {
    const binIndex = Math.min(Math.floor(score / binSize), bins.length - 1); // 구간 계산
    bins[binIndex]++;
  });

  // [구간 시작점, 빈도] 형태로 반환
  return bins.map((count, index) => [index * binSize, count]);
}

export async function initChart(chartDom) {
  const binSize = 1; // 세밀한 구간 크기
  const scores = await getScores();
  const distribution = calculateFineDistribution(scores, binSize); // 분포 데이터 계산

  const myChart = echarts.init(chartDom);

  const targetScore = 72.1; // 강조하고 싶은 점수

  // 목표 점수에 해당하는 빈도 계산 (올림 처리)
  const roundedTargetScore = Math.ceil(targetScore); // 점수 올림 처리
    
  // 상위 퍼센트 계산 수정
  const totalScores = scores.length; // 전체 데이터 개수
  const sortedScores = [...scores].sort((a, b) => b - a); // 내림차순으로 정렬
  const targetIndex = sortedScores.findIndex((score) => score <= targetScore / 100); // 현재 점수보다 작은 점수의 인덱스 찾기

  // 현재 점수보다 높은 점수들의 빈도수 계산
  const higherScores = sortedScores.slice(0, targetIndex); // 현재 점수보다 높은 점수들만 포함
  const percentile = Math.ceil((higherScores.length / totalScores) * 100); // 올림 처리하여 상위 퍼센트 계산

  // targetFrequency 계산 (해당 점수의 빈도 계산)
  const targetFrequency = distribution.find(([score]) => score >= targetScore)?.[1] || 0; // 내 점수의 빈도 찾기

  const option = {
    title: {
      text: '정규분포 곡선 (점수 기반)',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.componentType === 'markPoint') {
          const { coord, name } = params.data;
          return `${name}<br>점수: ${coord[0]}<br>빈도: ${coord[1]}<br>상위: ${percentile}%`;
        }
        if (params.seriesName === '강조된 구간') {
          return `점수: ${params.data[0]}<br>빈도: ${params.data[1]}`;
        }
        return '';
      },
    },
    xAxis: {
      type: 'value',
      name: '점수',
      boundaryGap: false,
      min: 0,
      max: 100,
      interval: 10, // x축 간격을 10점 단위로 설정
    },
    yAxis: {
      type: 'value',
      name: '빈도',
    },
    series: [
      {
        name: '전체 분포',
        type: 'line',
        data: distribution,
        smooth: true,
        lineStyle: {
          color: '#5470C6',
          width: 2,
        },
        areaStyle: {
          color: 'rgba(84, 112, 198, 0.2)', // 전체 배경 영역 스타일
        },
        symbol: 'none',
      },
      {
        name: '강조된 구간',
        type: 'line',
        data: distribution.filter(([x]) => x >= targetScore), // 강조 구간 데이터
        smooth: true,
        lineStyle: {
          color: '#DA0037',
          width: 2,
        },
        areaStyle: {
          color: 'rgba(218, 0, 55, 0.3)', // 강조 구간 배경 색
        },
        symbol: 'none',
      },
      {
        type: 'line',
        markPoint: {
          data: [
            {
              coord: [targetScore, targetFrequency], // 타겟 점수와 빈도 값
              symbol: 'circle',
              symbolSize: 10,
              itemStyle: {
                color: '#DA0037',
              },
              label: {
                formatter: `내 점수: ${targetScore}`,
                color: '#DA0037',
                fontWeight: 'bold',
                position: 'top',
              },
              name: '내 점수',
            },
          ],
        },
      },
    ],
  };

  myChart.setOption(option);

  // 리사이즈 이벤트 추가
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}
