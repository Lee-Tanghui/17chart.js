import { COLOR } from '../../utils/constants'
import { ObjectOf } from '../../types/general'
import { ScatterSerieItem, ScatterDefaultOption } from './types'

export const getDefaultOption = (): ScatterDefaultOption => {
  const defaultOption: ScatterDefaultOption = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { marker, name, value, dimensionNames } = params
        return `${name}${name ? '<br>' : ''}
        ${marker}${dimensionNames[0]}:${value[0]},
        ${dimensionNames[1]}:${value[1]}`
      },
      borderColor: '#fff',
    },
    legend: {
      show: true,
      bottom: 24,
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 16,
      icon: 'circle',
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
      axisTick: {
        show: false,
      },
      nameTextStyle: {
        color: '#999',
        verticalAlign: 'top',
        lineHeight: 18,
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
      nameTextStyle: {
        align: 'right',
        color: '#999',
      },
      axisLabel: {
        color: '#999',
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

export const getScatterSerieItem = (): ScatterSerieItem => {
  const item: ScatterSerieItem = {
    name: '',
    type: 'scatter',
    data: [],
    label: {
      show: false,
      color: '#666',
      position: 'top',
    },
  }

  return item
}
