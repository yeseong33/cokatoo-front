import * as echarts from 'echarts'


// 정규분포 데이터를 생성하는 함수
function generateRandomScores(mean, stdDev, count, range = [0, 100]) {
  const [min, max] = range
  const scores = []

  for (let i = 0; i < count; i++) {
    // Box-Muller 변환을 이용해 정규분포 데이터 생성
    let u1 = Math.random()
    let u2 = Math.random()
    let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2) // 표준 정규분포 값

    // 생성된 값을 평균과 표준편차에 맞게 스케일링
    let score = z * stdDev + mean

    // 값이 범위를 벗어나지 않도록 조정
    if (score < min) score = min
    if (score > max) score = max

    // 소수점 첫째 자리로 반올림
    scores.push(Math.round(score * 10) / 10)
  }

  return scores
}

// 점수 데이터를 기반으로 분포 계산
function calculateFineDistribution(scores, binSize) {
  const maxScore = Math.max(...scores)
  const bins = Array(Math.ceil(maxScore / binSize)).fill(0) // 0~최대 점수 범위로 나눈 빈
  scores.forEach(score => {
    const binIndex = Math.min(Math.floor(score / binSize), bins.length - 1)
    bins[binIndex]++
  })
  return bins.map((count, index) => [index * binSize, count]) // [구간 시작점, 빈도]
}


export function initChart(chartDom, scores) {
  const binSize = 1; // 세밀한 구간 크기
  const distribution = calculateFineDistribution(scores, binSize); // 분포 데이터 계산

  const myChart = echarts.init(chartDom);

  const targetScore = 70; // 강조하고 싶은 점수

  // 목표 점수까지 색칠된 구간 생성
  const shadedData = distribution.filter(([x]) => x >= targetScore); // targetScore 이하만 추출

  // 상위 퍼센트 계산
  const sortedScores = [...scores].sort((a, b) => a - b); // 정렬
  const targetIndex = sortedScores.findIndex((score) => score > targetScore);
  const percentile = Math.round(100 - ((targetIndex / sortedScores.length) * 100).toFixed(2), 10); // 상위 퍼센트 계산

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
        data: shadedData,
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
              coord: [targetScore, 1200], // x: 점수, y: 빈도
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
