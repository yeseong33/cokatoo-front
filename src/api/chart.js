import * as echarts from 'echarts'
function generateNormalDistributionData(mean, stdDev, points) {
  let data = []
  for (let i = 0; i < points; i++) {
    let x = (i / points) * 100 // x 값 (0~100 사이의 범위)
    let y =
      (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2)) // 정규분포 계산
    y = y * 100 // 스케일링 (y 값을 보기 좋게 확장)
    data.push([x.toFixed(2), y.toFixed(2)])
  }
  return data
}

export function initChart(chartDom) {
  var myChart = echarts.init(chartDom)

  // 정규분포 데이터 생성 (평균: 50, 표준편차: 15, 100 포인트)
  const data = generateNormalDistributionData(50, 15, 100)

  var option = {
    xAxis: {
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '30%']
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        {
          gt: 70,
          lt: 100,
          color: 'rgba(0, 0, 180, 0.4)'
        }
        // {
        //   gt: 50,
        //   lt: 70,
        //   color: 'rgba(0, 0, 180, 0.4)'
        // }
      ]
    },
    series: [
      {
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [{ xAxis: 70 }, { xAxis: 100 }]
        },
        areaStyle: {},
        data: data // 정규분포 더미 데이터 사용
      }
    ]
  }

  myChart.setOption(option)

  // Ensure chart resizes when the window size changes
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
