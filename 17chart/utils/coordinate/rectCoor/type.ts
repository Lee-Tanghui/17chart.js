export interface MarkLineDataItem {
  name: string
  yAxis?: number
  xAxis?: number
}

export interface MarkLine {
  silent: boolean
  symbol: string
  lineStyle: {
    color: string
  }
  label: {
    position: string
    color: string
    formatter: (params: any) => {}
  }
  data: MarkLineDataItem[]
}

export interface DataZoom {
  backgroundColor: string
  type: string
  show: boolean
  height: number
  dataBackground: {
    lineStyle: {
      color: string
    }
    areaStyle: {
      color: string
    }
  }

  selectedDataBackground: {
    lineStyle: {
      color: string
    }
    areaStyle: {
      color: string
    }
  }
  borderColor: string
  fillerColor: string
  textStyle: {
    color: string
    fontSize: number
  }
  left: string | number
  right: string | number
  brushSelect: boolean
  start: number
  end: number
}

export interface XAxis {
  name?: string
  type?: string
  data?: string[]
  axisTick: {
    show: boolean
  }
  nameTextStyle: {
    color: string
    verticalAlign: string
    lineHeight: number
  }
  axisLabel: {
    rotate: number
    margin: number
    color: string
  }
  axisLine: {
    lineStyle: {
      color: string
      opacity: number
    }
  }
}

export interface YAxis {
  name?: string
  type?: string
  data?: string[]
  nameTextStyle: {
    align: string
    color: string
  }
  axisLabel: {
    color: string
  }
  minInterval: number
  splitLine: {
    lineStyle: {
      color: string
    }
  }
}
