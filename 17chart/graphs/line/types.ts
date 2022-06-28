import { Grid, Legend } from '../../types/option'
import {
  MarkLine,
  DataZoom,
  XAxis,
  YAxis,
} from '../../utils/coordinate/rectCoor/type'
import { ObjectOf } from '../../types/general'

export type Tooltip = {
  trigger: string
  borderColor?: string
}

export interface LineDefaultOption {
  tooltip: Tooltip
  legend: Legend
  color: string | string[]
  grid: Grid
  xAxis: XAxis
  yAxis: YAxis
  dataZoom?: DataZoom
  series: SerieItem[]
}

export interface SerieItem {
  name: string
  type: string
  data: number[]
  label: {
    show: boolean
    color: string
    position: string
  }
  smooth?: boolean
  markLine?: MarkLine
  areaStyle?: ObjectOf<any>
}
