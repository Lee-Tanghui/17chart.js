import { useEffect } from 'react'
import { data1 } from './mock/data'
import $17chart from '../../../17chart/index'

export default function ScatterPage() {
  useEffect(() => {
    // 1. 普通散点图
    new $17chart.Scatter('chart1', {
      renderer: 'svg',
      xField: 'x',
      yField: 'y',
      nameField: 'name', // 散点图特有字段
      data: data1.slice(3),
      xAxis: {
        name: '指数A',
      },
      yAxis: {
        name: '指数B',
      },
    })
    // 2. 多类型散点图(使用groupField的方式)
    new $17chart.Scatter('chart2', {
      renderer: 'svg',
      xField: 'x',
      yField: 'y',
      color: ['#F4664A', '#FFC827', '#30BF78', '#5B8FF9'],
      nameField: 'name', // 散点图特有字段
      groupField: 'type', // 散点图特有字段
      data: data1,
      xAxis: {
        name: '指数A',
      },
      yAxis: {
        name: '指数B',
      },
    })
  }, [])

  return (
    <div>
      <section>
        <h1>1. 普通散点图</h1>
        <div id="chart1"></div>
      </section>
      <section>
        <h1>2. 分组散点图</h1>
        <div id="chart2"></div>
      </section>
    </div>
  )
}
