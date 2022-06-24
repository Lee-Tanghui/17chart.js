import { getIsExchangeAxis } from '../../utils/coordinate/rectCoor/handler'
import { ObjectOf } from '../../types/general'
import { getScatterSerieItem } from './default'
import { getSetArray } from '../../utils/tools'
import { ScatterDataItem } from './types'

/**
 * @desc 将userOption合并到defaultOption
 * @param defaultOption
 * @param userOption
 */
export const merge = (defaultOption, userOption: ObjectOf<any>) => {
  const isExchangeAxis = getIsExchangeAxis(userOption)

  if (isExchangeAxis) {
    console.warn(
      'Invalid Option:Chart Line not allowed to set YAxis as category axis',
    )
  }

  defaultOption.series = getSeries(userOption)
}

const getSeries = (userOption: ObjectOf<any>) => {
  const { xField, yField, nameField, groupField, data } = userOption

  if (!groupField) {
    const serieItem = getScatterSerieItem()
    const serieItemData: ScatterDataItem[] = data.map((d: ObjectOf<any>) => {
      return {
        name: d[nameField],
        value: [d[xField], d[yField]],
      }
    })
    serieItem.data = serieItemData
    return [serieItem]
  } else {
    const groupFieldList = getSetArray(
      data.map((i: ObjectOf<any>) => {
        return i[groupField]
      }),
    )
    return groupFieldList.map((groupName: string) => {
      const serieItem = getScatterSerieItem()

      serieItem.name = groupName
      const serieItemData: ScatterDataItem[] = data
        .filter((i: ObjectOf<any>) => {
          return i[groupField] === groupName
        })
        .map((d: ObjectOf<any>) => {
          return {
            name: d[nameField],
            value: [d[xField], d[yField]],
          }
        })
      serieItem.data = serieItemData

      return serieItem
    })
  }
}
