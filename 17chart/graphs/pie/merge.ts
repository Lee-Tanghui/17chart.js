import { ObjectOf } from '../../types/general'
import { getPieSerieItem } from './default'

export const merge = (
  defaultOption: ObjectOf<any>,
  userOption: ObjectOf<any>,
) => {
  defaultOption.series = getSereis(userOption)
}

const getSereis = (userOption: ObjectOf<any>) => {
  const { nameField, valueField } = userOption
  const { data } = userOption
  let _data = data

  if (nameField || valueField) {
    _data = data.map((item: ObjectOf<any>) => {
      return {
        name: nameField ? item[nameField] : item.name,
        value: valueField ? item[valueField] : item.name,
      }
    })
  }

  const serieItem = getPieSerieItem(userOption)

  serieItem.data = _data

  return [serieItem]
}
