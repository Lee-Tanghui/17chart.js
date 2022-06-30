import { BarDefaultOption, SerieItem } from './types'
import { COLOR, CLASS_NAME } from '../../utils/constants'

export const getDefaultOption = (): BarDefaultOption => {
  const defaultOption: BarDefaultOption = {
    tooltip: {
      trigger: 'item',
      className: CLASS_NAME.BAR_TOOLTIP,
      borderColor: '#fff',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: '#F3F5F9',
          shadowBlur: 0.2,
          opacity: 0.04,
        },
      },
    },
    legend: {
      show: true,
      bottom: 24,
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 16,
      icon: 'rect',
    },
    color: COLOR.THEME_PRIMARY_COLORS,
    grid: {
      top: 30,
      left: 0,
      right: 40,
      bottom: 24,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: [],
      axisTick: {
        show: false,
      },
      nameTextStyle: {
        color: '#999',
        verticalAlign: 'top',
        lineHeight: 22,
      },
      axisLabel: {
        rotate: 0,
        margin: 14,
        color: '#999',
      },
      axisLine: {
        lineStyle: {
          color: '#666',
          opacity: 0.9,
        },
      },
    },
    yAxis: {
      name: '',
      type: 'value',
      nameTextStyle: {
        align: 'right',
        color: '#999',
      },
      axisLabel: {
        color: '#999',
      },
      axisTick: {
        show: false,
      },
      minInterval: 1,
      splitLine: {
        lineStyle: {
          color: '#D9D9D9',
        },
      },
    },
    series: [],
  }
  return defaultOption
}

export const getBarSerieItem = (): SerieItem => {
  return {
    name: '',
    type: 'bar',
    barMaxWidth: 72,
    barMinWidth: 16,
    barGap: '30%',
    barCategoryGap: '50%',
    data: [],
    label: {
      show: true,
      color: '#666',
      position: 'top',
    },
  }
}
