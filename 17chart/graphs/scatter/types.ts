import { Grid, Legend } from '../../types/option'
import {
  MarkLine,
  DataZoom,
  XAxis,
  YAxis,
} from '../../utils/coordinate/rectCoor/type'

export interface ScatterDataItem {
  name?: string
  value: number[]
}

export interface ScatterSerieItem {
  name?: string
  type: string
  data: ScatterDataItem[]
  label: {
    show: boolean
    color: string
    position: string
  }
  markLine?: MarkLine
}

export interface ScatterDefaultOption {
  tooltip: {
    trigger: string
    formatter: (params: any) => {}
    borderColor?: string
  }
  legend: Legend
  color: string | string[]
  grid: Grid
  xAxis: XAxis
  yAxis: YAxis
  dataZoom?: DataZoom
  series: ScatterSerieItem[]
}
