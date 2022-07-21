import * as echarts from 'echarts'
import { ObjectOf } from '../types/general'
import {
  getIsNeedRotate,
  getLabelMaxHeightByRotateXAxisLabel,
} from '../utils/coordinate/rectCoor/handler'
import { HEIGHT } from '../utils/constants'
import get from '../utils/safe-get'
import { checkIsValidData } from '../utils/validator'

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

    // 参数检测
    this._validate(container, options)

    // 设置标识
    this.container.setAttribute('chart-source', CHART_SOURCE)

    // 判断图表的高度(如果<=100px，那么将其给默认的高度360px)
    if (this.container.offsetHeight <= 100) {
      this.container.style.height = '360px'
    }

    // 如果旋转X轴坐标名称，如果名称过程，需要增加容器的高度。否则会出现图表展现区域过小的情况
    if (getIsNeedRotate(options)) {
      const height = getLabelMaxHeightByRotateXAxisLabel(options)
      if (
        height > HEIGHT.MAX_BOTTOM_HEIGHT_TOLERANCE_VALUE &&
        this.container.offsetHeight <= 360
      ) {
        const extraHeight = height - HEIGHT.MAX_BOTTOM_HEIGHT_TOLERANCE_VALUE
        this.container.style.height = `${this.container.offsetHeight +
          extraHeight}px`
      }
    }

    // 设置renderer
    const chartInitOption = {
      renderer: options.renderer ? options.renderer : 'canvas',
    }

    this.chart = echarts.init(this.container, undefined, chartInitOption)

    this._registerEvent()

    new Promise<void>(resolve => {
      resolve()
    }).then(() => {
      this.render()
    })
  }

  public render() {
    // 移除可能存在的自定义图例
    if (this.container.querySelector('#custom-legend')) {
      const customLegend = this.container.querySelector(
        '#custom-legend',
      ) as HTMLElement
      customLegend.parentElement?.removeChild(customLegend)
    }
    // 如果有设置自定义高度（重置容器高度）
    if (get(this.option, 'height')) {
      const height = get(this.option, 'height')
      Reflect.deleteProperty(this.option, 'height')
      this.container.style.height = `${height}px`
    }
    this.chart.clear()
    this.chart.setOption(this.option)
  }

  private _resize() {
    this.chart.resize()
  }

  private _registerEvent() {
    this._observeReisze()
  }

  private _validate(container: string | HTMLElement, options: ObjectOf<any>) {
    // 【参数检测错误】： container不存在
    if (!container) {
      throw TypeError('argument of container is required')
    }
    // 【参数错误检测】： options不存在
    if (!options) {
      throw TypeError('argument of option is required')
    }
    // 【参数错误检测】：传递的id，但是没有获取到元素
    if (typeof container === 'string' && !this.container) {
      throw TypeError(`Invalid id: Can't get the dom that id is ${container}`)
    }
    // 【参数错误检测】：传递的不是id，但是不是一个DOM节点
    if (typeof container !== 'string' && this.container.nodeType !== 1) {
      throw TypeError('Invalid Type: container is not a dom element')
    }
    // 【参数错误检测】：options.data不是一个数组的情况
    if (!checkIsValidData(get(options, 'data'))) {
      console.error('Invalid Type: options.data should be type of Array')
      return
    }
  }

  private _observeReisze() {
    const resizeObserver = new ResizeObserver(entries => {
      this._resize()
    })
    if (this.container.parentElement) {
      resizeObserver.observe(this.container.parentElement)
    }
  }
}
