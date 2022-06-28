import get from './safe-get'
import set from './safe-set'
import { isArray, isString, isBoolean } from './tools'
import { ObjectOf } from '../types/general'
import { getIsLegendShow } from '../utils/coordinate/rectCoor/handler'

/**
 * 统一处理Option
 * @param defaultOption
 * @param userOption
 */
export const handler = (
  defaultOption: ObjectOf<any>,
  userOption: ObjectOf<any>,
) => {
  const { isPercent, percentFixed, name, isShowLabel } = userOption
  // 如果是百分比的情况，则需要做格式化处理
  if (isPercent) {
    // 设置tooltip的格式化
    set(defaultOption, 'tooltip.valueFormatter', function(value: number) {
      return (value * 100).toFixed(percentFixed) + '%'
    })
    // 设置label的格式化处理
    defaultOption.series.forEach((serieItem: ObjectOf<any>) => {
      set(serieItem, 'label.formatter', function(item: ObjectOf<any>) {
        return (item.value * 100).toFixed(percentFixed) + '%'
      })
    })
  }

  // 如果name存在, 需要处理到series[index].name上 ，且可能需要改变tooltip的trigger
  if (name) {
    if (isString(name)) {
      set(defaultOption, 'series.0.name', name)
    } else if (isArray(name)) {
      name.forEach((_name: string, index: number) => {
        set(defaultOption, `series.${index}.name`, _name)
      })
      set(defaultOption, 'tooltip.trigger', 'axis')
    }
  }

  // 如果有legend的话，需要增加grid.bottom的值
  if (getIsLegendShow(userOption) && !userOption.dataZoom) {
    const gridBottom = (get(defaultOption, 'grid.bottom') as unknown) as number
    set(defaultOption, 'grid.bottom', gridBottom + 32)
  }

  // 是否显示数据label
  if (isBoolean(isShowLabel)) {
    defaultOption.series.map((serieItem: ObjectOf<any>) => {
      set(serieItem, 'label.show', isShowLabel)
    })
  }
}
