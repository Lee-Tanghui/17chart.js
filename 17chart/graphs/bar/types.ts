import {
  MarkLine,
  DataZoom,
  XAxis,
  YAxis,
  MarkLineDataItem,
} from '../../utils/coordinate/rectCoor/type'
import { ObjectOf } from '../../types/general'
import { Grid, Legend } from '../../types/option'

export interface BarDefaultOption {
  tooltip: Tooltip
  legend: Legend
  color: string | string[]
  grid: Grid
  xAxis: XAxis
  yAxis: YAxis
  dataZoom?: DataZoom
  series: SerieItem[]
}

export type Tooltip = {
  trigger: string
  className: string
  borderColor?: string
  axisPointer: {
    type: string
    shadowStyle: {
      color: string
      shadowBlur?: number
      opacity: number
    }
  }
}

export interface SerieItem {
  name: string
  type: string
  barMaxWidth: number
  barMinWidth: number
  barGap: string
  barCategoryGap: string
  data: ObjectOf<any>[]
  stack?: string
  label: {
    show: boolean
    color: string
    position: string
  }
  markLine?: MarkLine
}

export interface CustomLegend {
  name: string
  color: string
}

export interface UserOption {
  // 字段名
  xField: string
  yField: string
  data: any[]
  renderer?: string
  name?: string | string[]
  isStack?: boolean
  color?: string | string[]
  labelColor?: string | string[]
  tooltip?: {
    trigger?: string
  }
  grid?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
  legend?: {
    show?: boolean
    custom?: any[]
  }
  isShowLabel?: boolean
  isPercent?: boolean
  percentFixed?: number
  xAxis?: {
    type?: string
    name?: string
    axisLabel?: {
      rotate: number
    }
    interval?: number
  }
  yAxis?: {
    type?: string
    name?: string
    minInterval?: number
    inverse?: boolean
  }
  dataZoom?: {
    brushSelect?: boolean
    start?: number
    end?: number
  }
  markLine?: {
    data?: MarkLineDataItem[]
  }
  bar?: {
    colorBy?: string
    colorCategory?: string
  }
}
