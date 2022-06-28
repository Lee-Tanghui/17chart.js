import { BarDefaultOption, UserOption } from './types'
import { ObjectOf } from '../../types/general'
import { is2Array, isArray } from '../../utils/tools'
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
) => {
  const isExchangeAxis = getIsExchangeAxis(userOption)
  // 挂载xAxis或yAxis的数据
  if (isExchangeAxis) {
    defaultOption.yAxis.data = getAxisList(userOption)
  } else {
    defaultOption.xAxis.data = getAxisList(userOption)
  }
  // 挂载series的数据
  defaultOption.series = getSeries(userOption)
}

const getSeries = (userOption: ObjectOf<any>) => {
  const { data, xField, yField, isStack, labelColor } = userOption
  const isExchangeAxis = getIsExchangeAxis(userOption)

  const _get = (data: any[], index?: number) => {
    const seriesItem = getBarSerieItem()
    seriesItem.data = data.map(i => i[isExchangeAxis ? xField : yField])

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
