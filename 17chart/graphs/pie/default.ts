import { ObjectOf } from '../../types/general'
import { COLOR } from '../../utils/constants'

export const getDefaultOption = () => {
  return {
    color: COLOR.THEME_PRIMARY_COLORS,
    tooltip: {
      trigger: 'item',
      borderColor: '#fff',
    },
    legend: {
      bottom: 16,
    },
    series: [],
  }
}

export const getPieSerieItem = (userOption: ObjectOf<any>) => {
  const { radius } = userOption
  return {
    name: '',
    type: 'pie',
    radius: radius ? radius : '50%',
    data: [],
  }
}
