import { ObjectOf } from '../../types/general'
import { COLOR } from '../../utils/constants'
import get from '../../utils/safe-get'
import { deepAssign } from '../../utils/tools'

export const getDefaultOption = () => {
  return {
    color: COLOR.THEME_PRIMARY_COLORS,
    tooltip: {
      trigger: 'item',
      borderColor: '#fff',
    },
    legend: {
      bottom: 16,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 16,
    },
    series: [],
  }
}

export const getPieSerieItem = (userOption: ObjectOf<any>) => {
  const { radius } = userOption
  const pieItem = {
    name: '',
    type: 'pie',
    radius: radius ? radius : '50%',
    data: [],
    label: {
      formatter: (params: any) => {
        const { name, percent } = params
        return `{name|${name}}\n{percent|${percent}}%`
      },
    },
  }

  if (get(userOption, 'pie')) {
    deepAssign(pieItem, get(userOption, 'pie'))
  }

  if (!get(userOption, 'pie.label.formatter')) {
    ;(pieItem.label as any).rich = {
      name: {
        color: '#A1A3B4',
      },
      percent: {
        lineHeight: 20,
        color: '#4D5271',
        fontSize: 14,
      },
    }
  }

  return pieItem
}
