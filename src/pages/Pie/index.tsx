import { useEffect } from 'react'
import $17chart from '../../../17chart/index'
import { data1 } from './mock/data'

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
    </div>
  )
}
