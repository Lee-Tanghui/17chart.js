import { useEffect } from 'react'
import $17chart from '../../../17chart/index'
import { data1, data2, data3, data4, data5, data6, data7 } from './mock/data'

export default function LinePage() {
  useEffect(() => {
    // 1. 普通折线图
    new $17chart.Line('chart1', {
      renderer: 'svg',
      data: data1,
      xField: 'name',
      yField: 'value',
    })
    // 2. 有X轴和Y轴名称
    new $17chart.Line('chart2', {
      renderer: 'svg',
      data: data1,
      xField: 'name',
      yField: 'value',
      xAxis: {
        name: '学科',
      },
      yAxis: {
        name: '参测人数',
      },
    })
    // 3. 有百分比的情况
    new $17chart.Line('chart3', {
      renderer: 'svg',
      data: data2,
      xField: 'key',
      yField: 'rate',
      grid: {
        right: 60,
      },
      isPercent: true, // 传递该字段
      xAxis: {
        name: '作答时长（秒）',
      },
      yAxis: {
        name: '人数占比',
      },
    })
    // 4. 有百分比的情况
    new $17chart.Line('chart4', {
      renderer: 'svg',
      data: data2,
      xField: 'key',
      yField: 'rate',
      grid: {
        right: 60,
      },
      isPercent: true, // 传递该字段
      percentFixed: 2,
      smooth: true,
      xAxis: {
        name: '作答时长（秒）',
      },
      yAxis: {
        name: '人数占比',
      },
    })
    // 5. 有name的情况 + 调整legend位置
    const { option } = new $17chart.Line('chart5', {
      renderer: 'svg',
      name: '参测情况',
      data: data1,
      xField: 'name',
      yField: 'value',
      legend: {
        top: 16,
      },
      xAxis: {
        name: '学科',
      },
      yAxis: {
        name: '参测人数',
      },
    })
    console.log(option)
    // 6. 多折线图
    new $17chart.Line('chart6', {
      renderer: 'svg',
      data: data4,
      xField: 'name',
      yField: 'value',
      isPercent: true,
      name: ['语文', '数学', '英语'],
      xAxis: {
        name: '学科',
      },
      yAxis: {
        name: '参测人数',
      },
    })
    // 7. 有标注的情况
    new $17chart.Line('chart7', {
      renderer: 'svg',
      xField: 'name',
      yField: 'value',
      xAxis: {
        name: '学科',
      },
      yAxis: {
        name: '参测人数',
      },
      data: data1,
      markLine: {
        data: [
          {
            name: '最小值',
            yAxis: 2,
          },
          {
            name: '平均值',
            yAxis: 3,
          },
          {
            name: '最大值',
            yAxis: 4,
          },
        ],
      },
    })
    // 8. 有标注和百分比的情况
    new $17chart.Line('chart8', {
      renderer: 'svg',
      data: data2,
      xField: 'key',
      yField: 'rate',
      grid: {
        right: 60,
      },
      isPercent: true,
      xAxis: {
        name: '作答时长（秒）',
      },
      yAxis: {
        name: '人数占比',
        minInterval: 0.1,
      },
      markLine: {
        data: [
          {
            name: '最大值',
            yAxis: 0.56,
          },
        ],
      },
    })
    // 9. 有DataZoom的情况
    new $17chart.Line('chart9', {
      renderer: 'svg',
      data: data5,
      xField: 'name',
      yField: 'value',
      grid: {
        bottom: 60,
      },
      yAxis: {
        name: '参测人数',
      },
      xAxis: {
        name: '学校名称',
      },
      dataZoom: {
        // 用户可设置数据
        brushSelect: false,
        start: 15,
        end: 85,
      },
    })
    // 10. 面积图
    new $17chart.Line('chart10', {
      renderer: 'svg',
      data: data5,
      xField: 'name',
      yField: 'value',
      grid: {
        bottom: 60,
      },
      areaStyle: {},
      isShowLabel: false,
      yAxis: {
        name: '参测人数',
      },
      xAxis: {
        name: '学校名称',
      },
    })
  }, [])

  return (
    <div>
      <section>
        <h1>1. 普通折线图</h1>
        <div id="chart1"></div>
      </section>
      <section>
        <h1>2. 有X轴和Y轴名称</h1>
        <div id="chart2"></div>
      </section>
      <section>
        <h1>3. 有百分比的情况</h1>
        <div id="chart3"></div>
      </section>
      <section>
        <h1>4. 有百分比的情况 + 平滑折线图</h1>
        <div id="chart4"></div>
      </section>
      <section>
        <h1>5. 有name的情况 + 调整legend位置</h1>
        <div id="chart5"></div>
      </section>
      <section>
        <h1>6. 多折线图</h1>
        <div id="chart6"></div>
      </section>
      <section>
        <h1>7. 有标注（辅助线）的情况</h1>
        <div id="chart7"></div>
      </section>
      <section>
        <h1>8. 有标注（辅助线）的情况</h1>
        <div id="chart8"></div>
      </section>
      <section>
        <h1>9. 有DataZoom的情况</h1>
        <div id="chart9"></div>
      </section>
      <section>
        <h1>10. 面积图</h1>
        <div id="chart10"></div>
      </section>
    </div>
  )
}
