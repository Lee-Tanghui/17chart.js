import { useEffect, useState } from 'react'
import $17chart from '../../../17chart/index'
import {
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data9,
  data10,
} from './mock/data'
import { Affix, Button } from 'antd'
import ConfigPanel from '../../components/configPanel'
import json from './config'

export default function BarPage() {
  useEffect(() => {
    // 1. 普通柱状图
    new $17chart.Bar('chart1', {
      renderer: 'svg',
      data: data1,
      xField: 'name',
      yField: 'value',
      tooltip: {
        trigger: 'axis',
      },
    })

    // 2. 有x轴名称和y轴名称
    new $17chart.Bar('chart2', {
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
    new $17chart.Bar('chart3', {
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

    // 4. 有名称类别的情况
    new $17chart.Bar('chart4', {
      renderer: 'svg',
      data: data1,
      xField: 'name',
      yField: 'value',
      name: '参测情况',
      xAxis: {
        name: '学科',
      },
      yAxis: {
        name: '参测人数',
      },
    })

    // 5. 有柱状图和折线图的情况
    // new $17chart.Bar('chart5', {
    //   render: 'svg',
    //   type: 'multi', // 多个类型的图
    //   data: [
    //     { xField: 'name', yFild: 'value', data: data1, name: '数量' },
    //     { xField: 'name', yFild: 'value', data: data3, name: '占比情况' },
    //   ],
    //   name: '参测情况',
    //   xAxis: {
    //     name: '学科',
    //   },
    //   yAxis: {
    //     name: '参测人数',
    //   },
    // })

    // 6 并排柱状图
    const chart6 = new $17chart.Bar('chart6', {
      renderer: 'svg',
      xField: 'name',
      yField: 'value',
      name: ['语文', '数学', '英语'],
      data: data4,
      isPercent: true,
      legend: {},
    })

    // 7. 有标注的情况
    new $17chart.Bar('chart7', {
      renderer: 'svg',
      xField: 'name',
      yField: 'value',
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

    // 8. 有标注的情况（百分比）
    new $17chart.Bar('chart8', {
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
            yAxis: 0.33,
          },
        ],
      },
    })

    // 9. 有DataZoom的情况
    new $17chart.Bar('chart9', {
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

    // 10. 有旋转X轴名称的情况
    const chart10 = new $17chart.Bar('chart10', {
      renderer: 'svg',
      data: data5,
      xField: 'name',
      yField: 'value',
      yAxis: {
        name: '参测人数',
      },
      xAxis: {
        name: '学校名称',
        axisLabel: {
          rotate: 45,
        },
      },
    })

    // 11. 有旋转X轴名称的情况（名字超级长的情况）
    const chart11 = new $17chart.Bar('chart11', {
      data: data6,
      xField: 'name',
      yField: 'value',
      renderer: 'svg',
      yAxis: {
        name: '参测人数',
      },
      xAxis: {
        name: '学校名称',
        axisLabel: {
          rotate: 45,
        },
      },
    })

    // 12. 取消label名称 + 调整legend的位置
    const { option } = new $17chart.Bar('chart12', {
      renderer: 'svg',
      data: data1,
      xField: 'name',
      yField: 'value',
      isShowLabel: false,
      name: '参测情况',
      legend: {
        top: 12,
        bottom: 20,
      },
      xAxis: {
        name: '学科',
      },
      yAxis: {
        name: '参测人数',
      },
    })
    console.log(option)

    // 13. 堆叠柱状图
    new $17chart.Bar('chart13', {
      renderer: 'svg',
      data: data7,
      xField: 'name',
      yField: 'value',
      isStack: true,
      isPercent: true,
      name: ['数学', '语文', '英语', '物理'],
      labelColor: ['#fff', '#666', '#fff', '#666'],
      xAxis: {
        name: '得分率',
      },
      yAxis: {
        name: '人数占比',
        minInterval: 0.01,
      },
    })

    // 14. 堆叠柱状图（程度递进：优秀、良好、一般、不及格）
    const chart14 = new $17chart.Bar('chart14', {
      renderer: 'svg',
      data: data7,
      xField: 'name',
      yField: 'value',
      isStack: true,
      isPercent: true,
      color: ['#30BF78', '#F3F247', '#FFC827', '#F4664A'],
      labelColor: ['#fff', '#666', '#666', '#fff'],
      name: ['优秀', '良好', '一般', '不及格'],
      xAxis: {
        name: '得分率',
      },
      yAxis: {
        name: '人数占比',
        minInterval: 0.01,
      },
      dataZoom: {
        brushSelect: false,
        start: 15,
        end: 85,
      },
    })

    // 15. 柱状图（X、Y轴翻转）
    new $17chart.Bar('chart15', {
      renderer: 'svg',
      data: data5.slice(0, 10),
      xField: 'value', // x轴字段此时是value
      yField: 'name', // y轴字段此时是name
      yAxis: {
        type: 'category', // 增加这个参数
        name: '学校名称',
      },
      xAxis: {
        type: 'value', // 增加这个参数
        name: '参测人数',
      },
    })

    // 16. 柱状图（X、Y轴翻转，有百分比）
    new $17chart.Bar('chart16', {
      renderer: 'svg',
      data: JSON.parse(JSON.stringify(data5.slice(0, 10))).map((i: any) => {
        i.value = i.value * 0.001
        return i
      }),
      xField: 'value', // x轴字段此时是value
      yField: 'name', // y轴字段此时是name
      yAxis: {
        type: 'category', // 增加这个参数
        name: '学校名称',
      },
      isPercent: true,
      percentFixed: 2,
      xAxis: {
        type: 'value', // 增加这个参数
        name: '参测占比',
      },
    })

    // 17. X、Y轴翻转（自定义颜色）
    new $17chart.Bar('chart17', {
      xField: 'value',
      yField: 'type',
      renderer: 'svg',
      data: data9.flat(Infinity),
      color: ['#5AD8A6', '#748AB1', '#F7C739', '#EB7E65', '#5B8FF9'],
      bar: {
        colorBy: 'data',
        colorCategory: 'inherit', // inherit 或者 loop
      },
      yAxis: {
        type: 'category',
        inverse: true,
      },
      xAxis: {
        type: 'value',
        interval: 1,
      },
    })
    // 18. X、Y轴翻转（自定义图例）
    new $17chart.Bar('chart18', {
      xField: 'value',
      yField: 'type',
      data: data9.flat(Infinity),
      legend: {
        // 注意添加了legend.custom后，不再允许增加color和bar.colorCategory
        custom: [
          { name: '全区', color: '#5AD8A6' },
          { name: '公办', color: '#748AB1' },
          { name: '民办', color: '#F7C739' },
          { name: '随迁', color: '#EB7E65' },
          { name: '各学校', color: '#5B8FF9' },
        ],
      },
      yAxis: {
        type: 'category', // 增加这个参数
        inverse: true,
      },
      xAxis: {
        type: 'value', // 增加这个参数
        interval: 1,
      },
      markLine: {
        data: [
          {
            name: '全区',
            xAxis: 8,
            label: {
              position: 'start',
              color: '#5AD8A6',
            },
            lineStyle: {
              color: '#5AD8A6',
              width: 2,
            },
          },
          {
            name: '公办',
            xAxis: 6,
            label: {
              position: 'start',
              color: '#748AB1',
            },
            lineStyle: {
              color: '#748AB1',
              width: 2,
            },
          },
        ],
      },
    })
    // 19. X、Y轴翻转（自定义图例）
    new $17chart.Bar('chart19', {
      xField: 'value',
      yField: 'type',
      renderer: 'svg',
      data: data10.flat(Infinity),
      legend: {
        // custom的图例只允许在y轴方向，不允许在x轴方向
        top: 16,
        // 注意添加了legend.custom后，不再允许增加color和bar.colorCategory
        custom: [
          { name: '全区', color: '#5AD8A6' },
          { name: '公办', color: '#748AB1' },
          { name: '本校', color: '#5B8FF9' },
        ],
      },
      yAxis: {
        type: 'category', // 增加这个参数
        inverse: true,
      },
      xAxis: {
        type: 'value', // 增加这个参数
        interval: 1,
      },
    })
  }, [])

  const [visible, setVisible] = useState(false)
  const onButtonClick = () => {
    setVisible(true)
  }

  return (
    <div>
      <Affix offsetTop={60} style={{ position: 'absolute', right: 20 }}>
        <Button type="primary" onClick={onButtonClick}>
          配置项
        </Button>
      </Affix>
      <ConfigPanel
        json={json}
        title="柱状图配置项"
        visible={visible}
        onVisibleChange={setVisible}
      ></ConfigPanel>
      {/* 图表部分 */}
      <section>
        <h1>1. 普通柱状图</h1>
        <div id="chart1"></div>
      </section>
      <section>
        <h1>2. 有x轴名称和y轴名称</h1>
        <div id="chart2"></div>
      </section>
      <section>
        <h1>3. 有百分比的情况</h1>
        <div id="chart3"></div>
      </section>
      <section>
        <h1>4. 有name的情况（tooltip会有名称）</h1>
        <div id="chart4"></div>
      </section>
      <section>
        <h1>5. 有柱状图和折线图的情况（之后开发）</h1>
        <div id="chart5"></div>
      </section>
      <section>
        <h1>6. 并排柱状图</h1>
        <div id="chart6"></div>
      </section>
      <section>
        <h1>7. 有标注（辅助线）的情况</h1>
        <div id="chart7"></div>
      </section>
      <section>
        <h1>8. 有标注（辅助线）的情况（百分比）</h1>
        <div id="chart8"></div>
      </section>
      <section>
        <h1>9. 有DataZoom区间的情况</h1>
        <div id="chart9"></div>
      </section>
      <section>
        <h1>10. 有旋转X轴名称</h1>
        <div id="chart10"></div>
      </section>
      <section>
        <h1>11. 有旋转X轴名称（名字超级长的情况）</h1>
        <div id="chart11"></div>
      </section>
      <section>
        <h1>12. 取消label名称 + 调整legend的位置</h1>
        <div id="chart12"></div>
      </section>
      <section>
        <h1>13. 堆叠柱状图</h1>
        <div id="chart13"></div>
      </section>
      <section>
        <h1>14. 堆叠柱状图（程度递进的关系）</h1>
        <div id="chart14"></div>
      </section>
      <section>
        <h1>15. X、Y轴翻转的情况</h1>
        <div id="chart15"></div>
      </section>
      <section>
        <h1>16. X、Y轴翻转，并且是百分比的情况</h1>
        <div id="chart16"></div>
      </section>
      <section>
        <h1>17. X、Y轴翻转 + 自定义颜色</h1>
        <div id="chart17"></div>
      </section>
      <section>
        <h1>18. X、Y轴翻 + 自定义图例 + 标注线自定义颜色</h1>
        <p>⚠️注意：</p>
        <p>1. 自定义图例的配置和自定义颜色互斥，会优先以自定义图例的颜色为准</p>
        <p>2. 自定义图例的的legend位置只允许设置top或bottom</p>
        <div id="chart18"></div>
      </section>
      <section>
        <h1>19. X、Y轴翻 + 自定义图例 + 图例位置设置</h1>
        <p>⚠️注意：</p>
        <p>1. 自定义图例的配置和自定义颜色互斥，会优先以自定义图例的颜色为准</p>
        <p>2. 自定义图例的的legend位置只允许设置top或bottom</p>
        <div id="chart19"></div>
      </section>
    </div>
  )
}
