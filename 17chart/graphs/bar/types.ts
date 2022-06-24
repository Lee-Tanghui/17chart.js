import {
  MarkLine,
  DataZoom,
  XAxis,
  YAxis,
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
