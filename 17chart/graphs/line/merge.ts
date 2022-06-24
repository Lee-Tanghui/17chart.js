import {
  getAxisList,
  getIsExchangeAxis,
} from '../../utils/coordinate/rectCoor/handler'
import { ObjectOf } from '../../types/general'
import { getLineSerieItem } from './default'
import { is2Array } from '../../utils/tools'
import { LineDefaultOption } from './types'

/**
 * @desc 将userOption合并到defaultOption
 * @param defaultOption
 * @param userOption
 */
export const merge = (
  defaultOption: LineDefaultOption,
  userOption: ObjectOf<any>,
) => {
  const isExchangeAxis = getIsExchangeAxis(userOption)

  if (isExchangeAxis) {
    console.warn(
      'Invalid Option:Chart Line not allowed to set YAxis as category axis',
    )
  }

  defaultOption.xAxis.data = getAxisList(userOption)

  defaultOption.series = getSeries(userOption)
}

const getSeries = (userOption: ObjectOf<any>) => {
  const { data, yField, smooth, areaStyle } = userOption

  const _get = (data: any[]) => {
    const item = getLineSerieItem(smooth, areaStyle)
    item.data = data.map((i) => {
      return i[yField]
    })

    return item
  }

  if (is2Array(data)) {
    return data.map((array: any[]) => {
      return _get(array)
    })
  } else {
    return [_get(data)]
  }
}
