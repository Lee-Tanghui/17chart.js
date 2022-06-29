import { ObjectOf } from '../../types/general'
import { getPieSerieItem } from './default'

type PieData = {
  name: string
  value: number
}

enum SORT_TYPE {
  DESCENDING = 'descending',
  ASCENDING = 'ascending',
}

export const merge = (
  defaultOption: ObjectOf<any>,
  userOption: ObjectOf<any>,
) => {
  defaultOption.series = getSereis(userOption)
}

const getSereis = (userOption: ObjectOf<any>) => {
  const { nameField, valueField, sort } = userOption
  const { data } = userOption
  let _data = data.map((i: any) => i)

  if (nameField || valueField) {
    _data = data.map(
      (item: ObjectOf<any>): PieData => {
        return {
          name: nameField ? item[nameField] : item.name,
          value: valueField ? item[valueField] : item.name,
        }
      },
    )
  }
  if (sort) {
    if (sort === SORT_TYPE.DESCENDING) {
      _data = _data.sort((a: PieData, b: PieData) => {
        return b.value - a.value
      })
    } else if (sort === SORT_TYPE.ASCENDING) {
      _data = _data.sort((a: PieData, b: PieData) => {
        return a.value - b.value
      })
    }
  }

  const serieItem = getPieSerieItem(userOption)

  serieItem.data = _data

  return [serieItem]
}
