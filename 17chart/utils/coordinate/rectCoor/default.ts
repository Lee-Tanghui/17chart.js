import { MarkLine, DataZoom } from './type'

/**
 * 获取markLine的对象
 * @param isPercent 是否是百分比类型
 * @returns
 */
export const getMarkLine = (isPercent: boolean): MarkLine => {
  return {
    silent: true,
    symbol: 'none',
    lineStyle: {
      color: '#666',
    },
    label: {
      position: 'insideEndBottom',
      color: '#666',
      formatter: (params: any) => {
        const { name, value } = params
        if (name) {
          return `${name}: ${
            isPercent ? (value * 100).toFixed(0) + '%' : value
          }`
        } else {
          return value
        }
      },
    },
    data: [],
  }
}

/**
 * 获取DatZoom对象
 */
export const getDataZoom = (): DataZoom => {
  return {
    backgroundColor: '#E9EBF2',
    type: 'slider',
    show: true,
    height: 12,
    dataBackground: {
      lineStyle: {
        color: '#DCDEE2',
      },
      areaStyle: {
        color: 'rgba(56, 107, 255, 0.1)',
      },
    },
    selectedDataBackground: {
      lineStyle: {
        color: '#C5C5C5',
      },
      areaStyle: {
        color: 'transparent',
      },
    },
    borderColor: '#fff',
    fillerColor: 'rgba(56, 107, 255, 0.1)',
    textStyle: {
      color: '#A1A3B4',
      fontSize: 10,
    },
    left: '29.16%',
    right: '29.16%',
    brushSelect: false,
    start: 25,
    end: 75,
  }
}
