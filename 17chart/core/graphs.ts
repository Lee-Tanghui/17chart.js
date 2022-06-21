import * as echarts from 'echarts'
import { ObjectOf } from '../types/general'
import {
  getIsNeedRotate,
  getLabelMaxHeightByRotateXAxisLabel,
} from '../utils/option'
import { HEIGHT } from '../utils/constants'
import get from '../utils/safe-get'
import { is2Array } from '../utils/tools'

const CHART_SOURCE = '17-chart'

export default abstract class Graph {
  /** 17Chart绘制的画布 */
  public readonly container: HTMLElement
  /** 17Chart的实例 */
  public chart: any
  /** 配置项 */
  public abstract option: ObjectOf<any>

  constructor(container: string | HTMLElement, options: ObjectOf<any>) {
    this.container =
      typeof container === 'string'
        ? (document.getElementById(container) as HTMLElement)
        : (container as HTMLElement)

    // 【参数错误检测】：传递的id，但是没有获取到元素
    if (typeof container === 'string' && !this.container) {
      throw new Error(`Invalid id: Can't get the dom that id is ${container}`)
    }
    // 【参数错误检测】：传递的不是id，但是不是一个DOM节点
    if (typeof container !== 'string' && this.container.nodeType !== 1) {
      throw new TypeError('Invalid Type: container is not a dom element')
    }

    // 设置标识
    this.container.setAttribute('chart-source', CHART_SOURCE)

    // 判断图表的高度(如果<=100px，那么将其给默认的高度360px)
    if (this.container.offsetHeight <= 100) {
      this.container.style.height = '360px'
    }

    // 如果是X轴和Y轴翻转的情况，此时应该根据数据去调整容器的高度
    if ((get(options, 'yAxis.type') as any) === 'category') {
      const data = get(options, 'data')
      const _is2Array = is2Array(data as ObjectOf<any>[])
      let length = _is2Array ? get(options, 'data.0').length : data.length
      const height = length * 30

      this.container.style.height = `${height}px`
    }

    // 如果旋转X轴坐标名称，如果名称过程，需要增加容器的高度。否则会出现图表展现区域过小的情况
    if (getIsNeedRotate(options)) {
      const height = getLabelMaxHeightByRotateXAxisLabel(options)
      if (
        height > HEIGHT.MAX_BOTTOM_HEIGHT_TOLERANCE_VALUE &&
        this.container.offsetHeight <= 360
      ) {
        const extraHeight = height - HEIGHT.MAX_BOTTOM_HEIGHT_TOLERANCE_VALUE
        this.container.style.height = `${
          this.container.offsetHeight + extraHeight
        }px`
      }
    }

    // 设置renderer
    const chartInitOption = {
      renderer: options.renderer ? options.renderer : 'canvas',
    }

    this.chart = echarts.init(this.container, undefined, chartInitOption)

    this._registerEvent()

    new Promise<void>((resolve) => {
      resolve()
    }).then(() => {
      this.render()
    })
  }

  public render() {
    this.chart.clear()
    this.chart.setOption(this.option)
  }

  private _resize() {
    this.chart.resize()
  }

  private _registerEvent() {
    this._observeReisze()
  }

  private _observeReisze() {
    const resizeObserver = new ResizeObserver((entries) => {
      this._resize()
    })
    if (this.container.parentElement) {
      resizeObserver.observe(this.container.parentElement)
    }
  }
}
