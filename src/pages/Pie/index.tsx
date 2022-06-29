import { useEffect } from 'react'
import $17chart from '../../../17chart/index'
import { data1, data2 } from './mock/data'

export default function PiePage() {
  useEffect(() => {
    // 1. 普通饼图
    new $17chart.Pie('chart1', {
      data: data1,
    })
    // 2. 普通饼图
    new $17chart.Pie('chart2', {
      data: data1,
      radius: ['30%', '50%'],
    })
    // 3. 格式化文本
    new $17chart.Pie('chart3', {
      data: data1,
      //
      pie: {
        label: {
          formatter: `{b}:{d}%`,
        },
      },
    })
    // 4. legend位置调整
    new $17chart.Pie('chart4', {
      renderer: 'svg',
      data: data1,
      legend: {
        right: '20%',
        orient: 'vertical',
      },
    })
    // 5. 数据自定义字段
    new $17chart.Pie('chart5', {
      data: data2,
      nameField: 'type',
      valueField: 'count',
    })
    // 6. 排序（从大到下，降序排列）
    new $17chart.Pie('chart6', {
      data: data1,
      sort: 'descending',
    })
    // 7. 排序（从小到大，升序排列）
    new $17chart.Pie('chart7', {
      data: data1,
      sort: 'ascending',
    })
  })

  return (
    <div>
      <section>
        <h1>1. 普通饼图</h1>
        <div id="chart1"></div>
      </section>
      <section>
        <h1>2. 圆环图</h1>
        <div id="chart2"></div>
      </section>
      <section>
        <h1>3. 格式化文本</h1>
        <div id="chart3"></div>
      </section>
      <section>
        <h1>4. legend位置调整</h1>
        <div id="chart4"></div>
      </section>
      <section>
        <h1>5. 自定义字段</h1>
        <div id="chart5"></div>
      </section>
      <section>
        <h1>6. 排序（从大到小:descending）</h1>
        <div id="chart6"></div>
      </section>
      <section>
        <h1>7. 排序（从小到大:ascending）</h1>
        <div id="chart7"></div>
      </section>
    </div>
  )
}
