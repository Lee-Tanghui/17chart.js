import * as echarts from 'echarts'
import { ObjectOf } from '../types/general'
import {
  getIsNeedRotate,
  getLabelMaxHeightByRotateXAxisLabel,
  getIsLegendYAxisShow,
} from '../utils/coordinate/rectCoor/handler'
import { get2ArrayStackBarLength } from '../graphs/bar/merge'
import { HEIGHT } from '../utils/constants'
import get from '../utils/safe-get'
import { is2Array } from '../utils/tools'
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

    // 如果是X轴和Y轴翻转的情况，此时应该根据数据去调整容器的高度
    // TODO: 优化这一块的代码逻辑，现在写得及其的烂
    if ((get(options, 'yAxis.type') as any) === 'category') {
      const data = get(options, 'data')
      const isStack = get(options, 'isStack')
      const barWidth = (get(options, 'bar.barWidth') as unknown) as number
      const _is2Array = is2Array(data as ObjectOf<any>[])
      let length = _is2Array
        ? isStack
          ? get2ArrayStackBarLength(data as ObjectOf<any>[][])
          : data.flat(2).length
        : data.length
      let unitBarSpace = 0
      // TODO: 这里的逻辑都得优化
      let BASE_UNIT_PER_LEGNTH = 36
      if (length <= 8) {
        if (length >= 7) {
          BASE_UNIT_PER_LEGNTH = 52
        } else if (length >= 6) {
          BASE_UNIT_PER_LEGNTH = 60
        } else if (length >= 5) {
          BASE_UNIT_PER_LEGNTH = 72
        } else if (length >= 2) {
          BASE_UNIT_PER_LEGNTH = 80
        } else {
          BASE_UNIT_PER_LEGNTH = 140
        }
      }

      // TODO: 这里的比例不会这么写，需要考虑到一个比率
      if (barWidth) {
        if (barWidth < 30) {
          unitBarSpace = 4
        } else if (barWidth >= 30 && barWidth < 60) {
          unitBarSpace = 1.6
        } else if (barWidth >= 60 && barWidth < 80) {
          unitBarSpace = 0.9
        } else if (barWidth >= 80 && barWidth < 100) {
          unitBarSpace = 0.6
        } else {
          unitBarSpace = 0.1
        }
      }

      const unitPerLength = barWidth
        ? barWidth + unitBarSpace * barWidth
        : BASE_UNIT_PER_LEGNTH

      const height = length * unitPerLength
      const { isTrue } = getIsLegendYAxisShow(options)

      this.container.style.height = `${height + (isTrue ? 92 : 0)}px`
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
    // 【参数检测错误】： container存在
    if (!container) {
      throw TypeError('argument of container is required')
    }
    // 【参数错误检测】： 我是否
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
    // 【参数错误检测】：options不是一个数组
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
