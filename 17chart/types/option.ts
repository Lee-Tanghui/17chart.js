export type Grid = {
  top: number
  left: number
  right: number
  bottom: string | number
  containLabel: boolean
}

export interface Legend {
  show: boolean
  bottom: number
  itemWidth: number
  itemHeight: number
  itemGap: number
  icon: string
}
