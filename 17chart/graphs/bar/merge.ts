import { BarDefaultOption, UserOption, CustomLegend } from './types'
import { ObjectOf } from '../../types/general'
import {
  is2Array,
  isArray,
  deepAssign,
  deleteProperty,
} from '../../utils/tools'
import get from '../../utils/safe-get'
import set from '../../utils/safe-set'
import { getBarSerieItem } from './default'
import {
  getAxisList,
  getIsExchangeAxis,
  getIsLegendYAxisShow,
} from '../../utils/coordinate/rectCoor/handler'

/**
 * @desc 将userOption合并到defaultOption
 * @param defaultOption 柱状图的默认option
 * @param userOption 用户传递的option
 */
export const merge = (
  defaultOption: BarDefaultOption,
  userOption: UserOption,
  chartInstance: any,
) => {
  const isExchangeAxis = getIsExchangeAxis(userOption)
  // 挂载xAxis或yAxis的数据
  if (isExchangeAxis) {
    defaultOption.yAxis.data = getAxisList(userOption)
  } else {
    defaultOption.xAxis.data = getAxisList(userOption)
  }
  // 检查XY轴翻转的情况
  checkXYAxisOverTurn(userOption, chartInstance)
  // 检查自定义lengend
  checkCustomLegend(userOption, chartInstance)
  // 检查自定义颜色情况 (注意，这个函数的调用，必须放在checkCustomLegend后面)
  checkColorCategory(userOption)
  // 挂载series的数据
  defaultOption.series = getSeries(userOption)
}

const getSeries = (userOption: ObjectOf<any>) => {
  const { data, xField, yField, isStack, labelColor, bar } = userOption
  const isExchangeAxis = getIsExchangeAxis(userOption)

  const _get = (data: any[], index?: number) => {
    const seriesItem = getBarSerieItem()
    seriesItem.data = data.map(i => {
      return {
        name: isExchangeAxis ? i[yField] : i[xField],
        value: isExchangeAxis ? i[xField] : i[yField],
      }
    })

    // x、y轴互换的情况，label的position的位置会有所变化
    if (isExchangeAxis) {
      seriesItem.label.position = 'right'
    }

    // 堆积柱状图
    if (isStack) {
      seriesItem.stack = 'total'
      seriesItem.label.position = 'inside'

      if (labelColor && index !== undefined) {
        seriesItem.label.color = isArray(labelColor)
          ? labelColor[index]
          : labelColor
      }
    }

    if (bar) {
      const copyBar = deepAssign({}, bar)

      deleteProperty(copyBar, 'colorCategory')

      deepAssign(seriesItem, copyBar)
    }

    return seriesItem
  }

  if (is2Array(data)) {
    return data.map((array: any[], index: number) => {
      return _get(array, index)
    })
  } else {
    return [_get(data)]
  }
}

const checkCustomLegend = (userOption: UserOption, chartInstance: any) => {
  const ID = 'custom-legend'
  const customLegend = get(userOption, 'legend.custom')
  if (customLegend && isArray(customLegend)) {
    const legends = customLegend
      .map((i: CustomLegend) => {
        return `
      <div style="display:flex; align-items:center; margin-right:16px;">
        <span style="background:${i.color};display:inline-block;width:8px;height:8px;margin-right:4px;"></span>
        <span style="font-size: 12px;color:rgb(51, 51, 51);">${i.name}</span>
      </div>`
      })
      .join('')
    const legendDom: HTMLElement = document.createElement('div')
    const isTop = (userOption.legend as ObjectOf<any>).hasOwnProperty('top')
    const top = (userOption.legend as ObjectOf<any>).top || 16
    const bottom = (userOption.legend as ObjectOf<any>).bottom || 16
    const position = isTop ? 'top' : 'bottom'
    const positionValue = isTop ? top : bottom

    legendDom.setAttribute(
      'style',
      `position:absolute;${position}: ${positionValue}px;width:100%;display:flex;justify-content:center`,
    )
    legendDom.id = ID
    legendDom.innerHTML = legends

    // 如果设置了customLegend, 此时colorCategory和color不再有效
    const colorCategory = get(userOption, 'bar.colorCategory')
    const color = get(userOption, 'color')
    if (color) {
      console.warn(
        'Invalid option: option.color is invalid when you set legend.custom',
      )
    }
    if (colorCategory) {
      console.warn(
        'Invalid option: bar.colorCategory is invalid when you set legend.custom',
      )
    }
    if ((get(userOption, 'bar.colorBy') as unknown) === 'data') {
      console.warn(
        'Invalid option: bar.colorBy is data is invalid when you set legend.custom ',
      )
    }

    if (
      (userOption.legend as ObjectOf<any>).hasOwnProperty('right') ||
      (userOption.legend as ObjectOf<any>).hasOwnProperty('left')
    ) {
      console.warn(
        'Invalid option: grid.right or grid.left is not allowed when you set legend.custom',
      )
    }

    // 在容器里面新增container
    const existLegendDom = chartInstance.container.querySelector(
      `#${chartInstance.container.id} #${ID}`,
    )
    if (existLegendDom) {
      existLegendDom.parentElement.removeChild(existLegendDom)
    }
    chartInstance.container.appendChild(legendDom)

    // 设置自定义颜色（复用自定义颜色）
    const customColor: string[] = customLegend.map((i: CustomLegend) => i.color)
    set(userOption, 'color', customColor)
    set(userOption, 'bar.colorBy', 'data')
    set(userOption, 'bar.colorCategory', 'inherit')
  }
}

const checkXYAxisOverTurn = (userOption: UserOption, chartInstance: any) => {
  // TODO: 优化这一块的代码逻辑，现在写得及其的烂
  // 如果是X轴和Y轴翻转的情况，此时应该根据数据去调整容器的高度
  if ((get(userOption, 'yAxis.type') as any) === 'category') {
    console.log('是翻转的柱状图')
    const data = get(userOption, 'data')
    const isStack = get(userOption, 'isStack')
    const barWidth = (get(userOption, 'bar.barWidth') as unknown) as number
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
    const { isTrue } = getIsLegendYAxisShow(userOption)

    chartInstance.container.style.height = `${height + (isTrue ? 92 : 0)}px`
  }
}

/**
 * 自定义柱状图颜色的策略检查
 * 策略分为：
 *  - inherit： 如果数据的颜色要比给定的颜色多，此时应该以最后一个颜色进行扩充
 *  - loop：  如果数据的颜色要比给定的颜色多，此时循环第一个的颜色，以此类推
 * @param userOption
 */
const checkColorCategory = (userOption: UserOption) => {
  // 自定义柱状图颜色的情况
  const colorCategory = get(userOption, 'bar.colorCategory')
  const color = get(userOption, 'color')
  if (
    color &&
    isArray(color) &&
    colorCategory &&
    (colorCategory as unknown) === 'inherit'
  ) {
    const dataLength = userOption.data.length
    if (color.length < dataLength) {
      const lastColor = color[color.length - 1]
      const count = dataLength - color.length
      for (let i = 0; i < count; i++) {
        ;(userOption.color as string[]).push(lastColor)
      }
    }
  }
}

/**
 * 获取多维度的堆积柱状图的数据项（取最大的）
 */
export const get2ArrayStackBarLength = (data: ObjectOf<any>[][]): number => {
  let max = 0
  data.forEach(array => {
    if (array.length >= max) {
      max = array.length
    }
  })

  return max
}
