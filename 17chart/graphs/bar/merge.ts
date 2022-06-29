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

    // x、y轴互换的情况，label的position的位置会有所变化
    if (isExchangeAxis) {
      seriesItem.label.position = 'right'
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
    legendDom.setAttribute(
      'style',
      `position:absolute;bottom: 16px;width:100%;display:flex;justify-content:center`,
    )
    legendDom.id = ID
    legendDom.innerHTML = legends

    // 如果设置了customLegend, 此时colorCategory和color不再有效
    const colorCategory = get(userOption, 'bar.colorCategory')
    const color = get(userOption, 'color')
    if (color) {
      console.error(
        'Invalid option: option.color is invalid when you set legend.custom',
      )
    }
    if (colorCategory) {
      console.error(
        'Invalid option: bar.colorCategory is invalid when you set legend.custom',
      )
    }
    if ((get(userOption, 'bar.colorBy') as unknown) === 'data') {
      console.error(
        'Invalid option: bar.colorBy is data is invalid when you set legend.custom ',
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
    // 如果数据的颜色要比给定的颜色多，当是inherit情况的时候，此时应该以最后一个颜色进行扩充
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
