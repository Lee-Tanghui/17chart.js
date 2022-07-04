import { ObjectOf, GridEumType } from '../../../types/general'
import {
  deepAssign,
  is2Array,
  insertNewlineEveryTen,
  getStrLengthSize,
  getStrLength,
} from '../../tools'
import { getMarkLine, getDataZoom } from './default'
import get from '../../safe-get'
import set from '../../safe-set'
import { FONT_SIZE } from '../../constants'

/**
 * 直角坐标的统一处理函数
 */

export const handler = (
  defaultOption: ObjectOf<any>,
  userOption: ObjectOf<any>,
) => {
  const {
    markLine,
    isPercent,
    dataZoom,
    xAxis,
    yAxis,
    percentFixed,
  } = userOption

  // 处理有辅助线的情况
  if (markLine) {
    const _markLine = getMarkLine(isPercent, userOption)
    deepAssign(_markLine, markLine)
    defaultOption.series[0].markLine = _markLine
  }

  // 查看是否有dataZoom的存在(如果有，则需要调整底部的预留高度)
  if (dataZoom) {
    const _dataZoom = getDataZoom()
    deepAssign(_dataZoom, dataZoom)
    defaultOption.dataZoom = _dataZoom
    if (!get(userOption, 'grid.bottom')) {
      defaultOption.grid.bottom = 80
      if (getIsLegendShow(userOption)) {
        set(userOption, 'legend.bottom', 48)
      }
    }
  }

  // 删除非echarts的options字段
  const copyUserOption = deepAssign({}, userOption)
  Reflect.deleteProperty(copyUserOption, 'data')
  Reflect.deleteProperty(copyUserOption, 'xField')
  Reflect.deleteProperty(copyUserOption, 'yField')

  // merge数据（接下来的操作基本都是直接操作defaultOption了）
  deepAssign(defaultOption, copyUserOption)

  // 判断是否axis.name存在， 如果存在会影响grid.left和grid.right
  if (xAxis && xAxis.name) {
    const extraWidth = getExtraWidth(xAxis.name, isPercent, 'right')
    setExtraGrid(defaultOption, GridEumType.RIGHT, extraWidth)
    defaultOption.grid.right = defaultOption.grid.right + extraWidth
  }
  if (yAxis && yAxis.name) {
    const extraWidth = getExtraWidth(yAxis.name, isPercent, 'left')
    setExtraGrid(defaultOption, GridEumType.LEFT, extraWidth)
  }

  if (isPercent) {
    // y轴的label值需要做格式化处理
    const axis = getIsExchangeAxis(userOption) ? 'xAxis' : 'yAxis'
    set(defaultOption, `${axis}.axisLabel.formatter`, function(value: number) {
      return (value * 100).toFixed(percentFixed) + '%'
    })
    if (
      ((get(defaultOption, `${axis}.minInterval`) as unknown) as number) >= 1
    ) {
      set(defaultOption, `${axis}.minInterval`, 0.1)
    }
  }

  // 如果X轴的名称是需要旋转的，此时需要处理名称过长的情况
  if (getIsNeedRotate(userOption)) {
    const isUserSetFormatter = get(userOption, 'xAxis.axisLabel.formatter')

    if (!isUserSetFormatter) {
      // 隐藏重叠的标签
      set(defaultOption, 'xAxis.axisLabel.hideOverlap', true)
      // 格式化处理
      set(defaultOption, 'xAxis.axisLabel.formatter', (value: string) => {
        return value.length >= 11 ? insertNewlineEveryTen(value) : value
      })
    }
  }
}

/**
 * 获取旋转x坐标后，名称的最大高度
 */
export const getLabelMaxHeightByRotateXAxisLabel = (
  userOption: ObjectOf<any>,
): number => {
  const ONE_ROW_MAX_LENGTH = 100
  const angle = (get(userOption, 'xAxis.axisLabel.rotate') as unknown) as number
  const xAxisList = getAxisList(userOption)
  const maxLabel = getMaxAxisLabel(xAxisList)
  const length = getStrLengthSize(maxLabel, FONT_SIZE.AXIS_LABEL)
  const height =
    Math.sin(angle) *
    (length >= ONE_ROW_MAX_LENGTH ? ONE_ROW_MAX_LENGTH : length)

  return height
}

/**
 * 判断是否需要旋转
 */
export const getIsNeedRotate = (userOption: any): boolean => {
  let isRotate = false

  if (get(userOption, 'xAxis.axisLabel.rotate')) {
    isRotate = true
  }

  return isRotate
}

/**
 * 获取坐标轴的名称列表
 */
export const getAxisList = (userOption: ObjectOf<any>): string[] => {
  const { xField, data, yField } = userOption
  let field = getIsExchangeAxis(userOption) ? yField : xField

  if (is2Array(data)) {
    return data[0].map((i: ObjectOf<any>) => i[field])
  } else {
    return data.map((i: ObjectOf<any>) => i[field])
  }
}

/**
 * 是否调换坐标轴
 * 也就是说X轴用来做数值，Y轴用来做分类（一般也就柱状图会使用）
 */
export const getIsExchangeAxis = (userOption: ObjectOf<any>) => {
  return (get(userOption, 'yAxis.type') as any) === 'category'
}

/**
 * 判断是否有legend
 */
export const getIsLegendShow = (userOption: any): boolean => {
  let isShow = true

  const nameList = get(userOption, 'name')

  if (
    ((get(userOption, 'legend.show') as unknown) as boolean) === false ||
    !nameList ||
    !nameList.length
  ) {
    isShow = false
  }

  if (get(userOption, 'groupField') || get(userOption, 'legend')) {
    isShow = true
  }

  return isShow
}

/**
 * 判断是否有位于Y轴的legend（会影响容器位置）
 */
interface IsLegendYAxisShow {
  isTrue: boolean
  position: string
}
export const getIsLegendYAxisShow = (
  userOption: ObjectOf<any>,
): IsLegendYAxisShow => {
  const isShow = getIsLegendShow(userOption)
  const legend = get(userOption, 'legend')
  const isYAxisLegend =
    !getIsSetLegendPosition(userOption) ||
    (legend &&
      (legend.hasOwnProperty('bottom') || legend.hasOwnProperty('top')))

  let position = ''

  if (legend && legend.hasOwnProperty('bottom')) {
    position = 'bottom'
  }

  if (legend && legend.hasOwnProperty('top')) {
    position = 'top'
  }

  return {
    isTrue: isShow && isYAxisLegend,
    position,
  }
}

/**
 * 判断用户是否有设置legend的位置
 * 没有的话默认是底部显示, 即bottom
 */
export const getIsSetLegendPosition = (userOption: ObjectOf<any>): boolean => {
  const legend = get(userOption, 'legend')
  return !!(
    legend &&
    !!Object.keys(legend).find(position => {
      return ['top', 'bottom', 'left', 'right'].includes(position)
    })
  )
}

/**
 * 获取额外的宽度
 * @param { string } name
 * @param { boolean } isPercent
 * @returns {number}
 */
const getExtraWidth = (
  name: string,
  isPercent: boolean,
  type: string,
): number => {
  const percentUnitWidth = type === 'right' ? 6 : 8
  const length = getStrLength(name)
  if (length > 2) {
    return (length - 2) * (isPercent ? percentUnitWidth : 16)
  } else {
    return 0
  }
}

/**
 *
 * @param option 选项
 * @param type 要设置的gird.类型
 * @param extraLength
 */
export const setExtraGrid = (
  option: ObjectOf<any>,
  type: GridEumType,
  extraLength: number,
): void => {
  if (!option || !option.grid || !option.grid.hasOwnProperty(type)) {
    return
  }
  option.grid[type] = option.grid[type] + extraLength
}

/**
 * 获取轴中最长的字符
 */
export const getMaxAxisLabel = (axisList: string[]): string => {
  let maxStr = ''
  axisList.forEach((axis: string) => {
    if (axis.length > maxStr.length) {
      maxStr = axis
    }
  })

  return maxStr
}
