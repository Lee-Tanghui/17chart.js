'use strict'

var echarts = require('echarts')

function _interopNamespace(e) {
  if (e && e.__esModule) return e
  var n = Object.create(null)
  if (e) {
    Object.keys(e).forEach(function(k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k)
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function() {
                  return e[k]
                },
              },
        )
      }
    })
  }
  n['default'] = e
  return Object.freeze(n)
}

var echarts__namespace = /*#__PURE__*/ _interopNamespace(echarts)

var GridEumType
;(function(GridEumType) {
  GridEumType['RIGHT'] = 'right'
  GridEumType['LEFT'] = 'left'
  GridEumType['TOP'] = 'top'
  GridEumType['bottom'] = 'bottom'
})(GridEumType || (GridEumType = {}))

/**
 * 是否是一个二维数组(内部每个元素都应该是一个数组)
 * @param array
 * @returns Boolean
 */
const is2Array = array => {
  return array.every(i => {
    return Array.isArray(i)
  })
}
/**
 * 是否是一个数组类型
 * @param value
 * @returns boolean
 */
const isArray = value => {
  return Array.isArray(value)
}
/**
 * 是否是字符类型
 * @param value
 * @returns  boolean
 */
const isString = value => {
  return typeof value === 'string'
}
/**
 * 是否是布尔类型
 * @param value
 * @returns boolean
 */
const isBoolean = value => {
  return typeof value === 'boolean'
}
/**
 * 判断是否是中文字符
 * @param str 字符
 */
const isCN = str => {
  const cnReg = new RegExp(
    '([\u4e00-\u9fff]|[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\uff01\u3010\u3011\uffe5])+',
    'g',
  )
  return cnReg.test(str)
}
/**
 * 获取字符的长度
 * @param str 字符
 * @param fontSize 中文字符所占宽度
 */
const getStrLength = (str, fontSize) => {
  let cnCount = 0 // 中文字符数
  let enCount = 0 // 英文字符数
  str.split('').forEach(s => {
    isCN(s) ? cnCount++ : enCount++
  })
  return Math.ceil(cnCount * fontSize + enCount * (fontSize / 2))
}
/**
 * 字符过长时，以每10个中文字符为一行，插入新的一行
 * 最多只有2行, 超过2行的时候，第二行末尾....
 * @param value 字符
 * @returns
 */
const insertNewlineEveryTen = value => {
  let count = 0 // 长度的累加值（中文字符1，非英文字符0.5）
  let pivotIndex10 = 0
  let pivotIndex20 = 0
  value.split('').forEach((s, i) => {
    count = isCN(s) ? count + 1 : count + 0.5
    if (count >= 10 && pivotIndex10 === 0) {
      pivotIndex10 = i
    }
    if (count >= 20 && pivotIndex20 === 0) {
      pivotIndex20 = i
    }
  })
  if (count >= 10) {
    return pivotIndex20
      ? `${value.slice(0, pivotIndex10)}\n${value.slice(
          pivotIndex10,
          pivotIndex20 - 2,
        )}...`
      : `${value.slice(0, pivotIndex10)}\n${value.slice(
          pivotIndex10,
          value.length,
        )}`
  } else {
    return value
  }
}
const deepAssign = (objTo, ...objs) => {
  objs.forEach(obj => {
    obj && deepAssignSingle(objTo, obj)
  })
  return objTo
}
const deepAssignSingle = (objTo, obj) => {
  if (obj instanceof Array) {
    objTo = []
    obj.forEach(item => {
      objTo.push(deepAssignSingle({}, item))
    })
    return
  }
  let keys = Object.keys(obj)
  keys.forEach(key => {
    if (typeof obj[key] == 'object') {
      if (obj[key] instanceof Array) {
        objTo[key] = []
        obj[key].forEach(item => {
          if (Object.prototype.toString.call(item) === '[object Object]') {
            let temp = {}
            deepAssignSingle(temp, item)
            objTo[key].push(temp)
          } else {
            objTo[key].push(item)
          }
        })
      } else {
        if (typeof objTo[key] != 'object' || objTo[key] instanceof Array) {
          objTo[key] = {}
        }
        deepAssignSingle(objTo[key], obj[key])
      }
    } else {
      objTo[key] = obj[key]
    }
  })
}
/**
 * 数组去重
 */
const getSetArray = array => {
  return Array.from(new Set(array))
}

/**
 * 获取markLine的对象
 * @param isPercent 是否是百分比类型
 * @returns
 */
const getMarkLine = isPercent => {
  return {
    silent: true,
    symbol: 'none',
    lineStyle: {
      color: '#666',
    },
    label: {
      position: 'insideEndBottom',
      color: '#666',
      formatter: params => {
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
const getDataZoom = () => {
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

const isNullOrUndef = function(val) {
  return val === undefined || val === null
}
const sget = function(instance, path) {
  return path.split('.').reduce(function(p, c) {
    return !isNullOrUndef(p) ? getValue(p, c) : undefined
  }, instance)
}
const findArrayOperator = /([^\[]*)\[([0-9]*)\]/
function getValue(parent, childProperty) {
  const matches = findArrayOperator.exec(childProperty)
  if (matches) {
    const name = matches[1]
    const arrayIndex = matches[2]
    if (!isNullOrUndef(parent[name])) {
      return parent[name][arrayIndex]
    } else {
      return undefined
    }
  } else {
    return parent[childProperty]
  }
}

function set(obj, propsArg, value) {
  var props, lastProp
  if (Array.isArray(propsArg)) {
    props = propsArg.slice(0)
  }
  if (typeof propsArg == 'string') {
    props = propsArg.split('.')
  }
  if (typeof propsArg == 'symbol') {
    props = [propsArg]
  }
  if (!Array.isArray(props)) {
    throw new Error('props arg must be an array, a string or a symbol')
  }
  lastProp = props.pop()
  if (!lastProp) {
    return false
  }
  prototypeCheck(lastProp)
  var thisProp
  while ((thisProp = props.shift())) {
    prototypeCheck(thisProp)
    if (typeof obj[thisProp] == 'undefined') {
      obj[thisProp] = {}
    }
    obj = obj[thisProp]
    if (!obj || typeof obj != 'object') {
      return false
    }
  }
  obj[lastProp] = value
  return true
}
function prototypeCheck(prop) {
  if (prop == '__proto__' || prop == 'constructor' || prop == 'prototype') {
    throw new Error('setting of prototype values not supported')
  }
}

// 颜色常量
const COLOR = {
  FONT_COLOR: '#666',
  AXIS_LINE_COLOR: '#eee',
  THEME_PRIMARY_COLORS: [
    '#5B8FF9',
    '#61DDAA',
    '#748AB1',
    '#F6BD16',
    '#7262FD',
    '#78D3F8',
    '#9661BC',
    '#F6903D',
    '#008685',
    '#F08BB4',
  ],
}
// 类名
const CLASS_NAME = {
  BAR_TOOLTIP: 'yq_chart_tooltip--bar',
}
// 字体大小
const FONT_SIZE = {
  AXIS_LABEL: 12,
}
// 高度
const HEIGHT = {
  //底部最大高度的忍耐值（如果大于此值，需要增加相应的container的高度，和grid的高度）
  MAX_BOTTOM_HEIGHT_TOLERANCE_VALUE: 45,
}

/**
 * 直角坐标的统一处理函数
 */
const handler$1 = (defaultOption, userOption) => {
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
    const _markLine = getMarkLine(isPercent)
    deepAssign(_markLine, markLine)
    defaultOption.series[0].markLine = _markLine
  }
  // 查看是否有dataZoom的存在(如果有，则需要调整底部的预留高度)
  if (dataZoom) {
    const _dataZoom = getDataZoom()
    deepAssign(_dataZoom, dataZoom)
    defaultOption.dataZoom = _dataZoom
    if (!sget(userOption, 'grid.bottom')) {
      defaultOption.grid.bottom = 80
      if (getIsLegendShow(userOption)) {
        set(userOption, 'legend.bottom', 48)
      }
    }
  }
  // Merge数据(需要删除data、xField、yField三个字段)
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
    set(defaultOption, `${axis}.axisLabel.formatter`, function(value) {
      return (value * 100).toFixed(percentFixed) + '%'
    })
    if (sget(defaultOption, `${axis}.minInterval`) >= 1) {
      set(defaultOption, `${axis}.minInterval`, 0.1)
    }
  }
  // 如果X轴的名称是需要旋转的，此时需要处理名称过长的情况
  if (getIsNeedRotate(userOption)) {
    const isUserSetFormatter = sget(userOption, 'xAxis.axisLabel.formatter')
    if (!isUserSetFormatter) {
      // 隐藏重叠的标签
      set(defaultOption, 'xAxis.axisLabel.hideOverlap', true)
      // 格式化处理
      set(defaultOption, 'xAxis.axisLabel.formatter', value => {
        return value.length >= 11 ? insertNewlineEveryTen(value) : value
      })
    }
  }
}
/**
 * 获取旋转x坐标后，名称的最大高度
 */
const getLabelMaxHeightByRotateXAxisLabel = userOption => {
  const ONE_ROW_MAX_LENGTH = 100
  const angle = sget(userOption, 'xAxis.axisLabel.rotate')
  const xAxisList = getAxisList(userOption)
  const maxLabel = getMaxAxisLabel(xAxisList)
  const length = getStrLength(maxLabel, FONT_SIZE.AXIS_LABEL)
  const height =
    Math.sin(angle) *
    (length >= ONE_ROW_MAX_LENGTH ? ONE_ROW_MAX_LENGTH : length)
  return height
}
/**
 * 判断是否需要旋转
 */
const getIsNeedRotate = userOption => {
  let isRotate = false
  if (sget(userOption, 'xAxis.axisLabel.rotate')) {
    isRotate = true
  }
  return isRotate
}
/**
 * 获取坐标轴的名称列表
 */
const getAxisList = userOption => {
  const { xField, data, yField } = userOption
  let field = getIsExchangeAxis(userOption) ? yField : xField
  if (is2Array(data)) {
    return data[0].map(i => i[field])
  } else {
    return data.map(i => i[field])
  }
}
/**
 * 是否调换坐标轴
 * 也就是说X轴用来做数值，Y轴用来做分类（一般也就柱状图会使用）
 */
const getIsExchangeAxis = userOption => {
  return sget(userOption, 'yAxis.type') === 'category'
}
/**
 * 判断是否有legend
 */
const getIsLegendShow = userOption => {
  let isShow = true
  const nameList = sget(userOption, 'name')
  if (
    sget(userOption, 'legend.show') === false ||
    !nameList ||
    !nameList.length
  ) {
    isShow = false
  }
  if (sget(userOption, 'groupField')) {
    isShow = true
  }
  return isShow
}
/**
 * 获取额外的宽度
 * @param { string } name
 * @param { boolean } isPercent
 * @returns {number}
 */
const getExtraWidth = (name, isPercent, type) => {
  const percentUnitWidth = type === 'right' ? 10 : 8
  if (name.length > 2) {
    return (name.length - 2) * (isPercent ? percentUnitWidth : 16)
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
const setExtraGrid = (option, type, extraLength) => {
  option.grid[type] = option.grid[type] + extraLength
}
/**
 * 获取轴中最长的字符
 */
const getMaxAxisLabel = axisList => {
  let maxStr = ''
  axisList.forEach(axis => {
    if (axis.length > maxStr.length) {
      maxStr = axis
    }
  })
  return maxStr
}

/**
 * 验证是否合法
 * @param data option.data的数据
 * @returns
 */
const checkIsValidData = data => {
  if (Array.isArray(data)) {
    return true
  } else {
    return false
  }
}

const CHART_SOURCE = '17-chart'
class Graph {
  /** 17Chart绘制的画布 */
  container
  /** 17Chart的实例 */
  chart
  constructor(container, options) {
    this.container =
      typeof container === 'string'
        ? document.getElementById(container)
        : container
    // 参数检测
    this._validate(container, options)
    // 设置标识
    this.container.setAttribute('chart-source', CHART_SOURCE)
    // 判断图表的高度(如果<=100px，那么将其给默认的高度360px)
    if (this.container.offsetHeight <= 100) {
      this.container.style.height = '360px'
    }
    // 如果是X轴和Y轴翻转的情况，此时应该根据数据去调整容器的高度
    if (sget(options, 'yAxis.type') === 'category') {
      const data = sget(options, 'data')
      const _is2Array = is2Array(data)
      let length = _is2Array ? sget(options, 'data.0').length : data.length
      const height = length * 30
      this.container.style.height = `${height}px`
    }
    // 如果旋转X轴坐标名称，如果名称过程，需要增加容器的高度。否则会出现图表展现区域过小的情况
    if (getIsNeedRotate(options)) {
      const height = getLabelMaxHeightByRotateXAxisLabel(options)
      if (
        height > HEIGHT.MAX_BOTTOM_HEIGHT_TOLERANCE_VALUE &&
        this.container.offsetHeight <= 360
      ) {
        const extraHeight = height - HEIGHT.MAX_BOTTOM_HEIGHT_TOLERANCE_VALUE
        this.container.style.height = `${this.container.offsetHeight +
          extraHeight}px`
      }
    }
    // 设置renderer
    const chartInitOption = {
      renderer: options.renderer ? options.renderer : 'canvas',
    }
    this.chart = echarts__namespace.init(
      this.container,
      undefined,
      chartInitOption,
    )
    this._registerEvent()
    new Promise(resolve => {
      resolve()
    }).then(() => {
      this.render()
    })
  }
  render() {
    this.chart.clear()
    this.chart.setOption(this.option)
  }
  _resize() {
    this.chart.resize()
  }
  _registerEvent() {
    this._observeReisze()
  }
  _validate(container, options) {
    // 【参数检测错误】： container存在
    if (!container) {
      throw TypeError('argument of container is required')
    }
    // 【参数错误检测】： 我是否
    if (!options) {
      throw TypeError('argument of option is required')
    }
    // 【参数错误检测】：传递的id，但是没有获取到元素
    if (typeof container === 'string' && !this.container) {
      console.error(`Invalid id: Can't get the dom that id is ${container}`)
      return
    }
    // 【参数错误检测】：传递的不是id，但是不是一个DOM节点
    if (typeof container !== 'string' && this.container.nodeType !== 1) {
      console.error('Invalid Type: container is not a dom element')
      return
    }
    // 【参数错误检测】：optionss不是一个数组
    if (!checkIsValidData(sget(options, 'data'))) {
      console.error('Invalid Type: options.data should be type of Array')
      return
    }
  }
  _observeReisze() {
    const resizeObserver = new ResizeObserver(entries => {
      this._resize()
    })
    if (this.container.parentElement) {
      resizeObserver.observe(this.container.parentElement)
    }
  }
}

const GRAPH_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  SCATTER: 'scatter',
  PIE: 'pie',
  MIXIN: 'mixin',
}

/**
 * 统一处理Option
 * @param defaultOption
 * @param userOption
 */
const handler = (defaultOption, userOption) => {
  const { isPercent, percentFixed, name, isShowLabel } = userOption
  // 如果是百分比的情况，则需要做格式化处理
  if (isPercent) {
    // 设置tooltip的格式化
    set(defaultOption, 'tooltip.valueFormatter', function(value) {
      return (value * 100).toFixed(percentFixed) + '%'
    })
    // 设置label的格式化处理
    defaultOption.series.forEach(serieItem => {
      set(serieItem, 'label.formatter', function(item) {
        return (item.value * 100).toFixed(percentFixed) + '%'
      })
    })
  }
  // 如果name存在, 需要处理到series[index].name上 ，且可能需要改变tooltip的trigger
  if (name) {
    if (isString(name)) {
      set(defaultOption, 'series.0.name', name)
    } else if (isArray(name)) {
      name.forEach((_name, index) => {
        set(defaultOption, `series.${index}.name`, _name)
      })
      set(defaultOption, 'tooltip.trigger', 'axis')
    }
  }
  // 如果有legend的话，需要增加grid.bottom的值
  if (getIsLegendShow(userOption) && !userOption.dataZoom) {
    const gridBottom = sget(defaultOption, 'grid.bottom')
    set(defaultOption, 'grid.bottom', gridBottom + 32)
  }
  // 是否显示数据label
  if (isBoolean(isShowLabel)) {
    defaultOption.series.map(serieItem => {
      set(serieItem, 'label.show', isShowLabel)
    })
  }
}

const getDefaultOption$3 = () => {
  const defaultOption = {
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
const getBarSerieItem = () => {
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

/**
 * @desc 将userOption合并到defaultOption
 * @param defaultOption 柱状图的默认option
 * @param userOption 用户传递的option
 */
const merge$3 = (defaultOption, userOption) => {
  const isExchangeAxis = getIsExchangeAxis(userOption)
  // 挂载xAxis或yAxis的数据
  if (isExchangeAxis) {
    defaultOption.yAxis.data = getAxisList(userOption)
  } else {
    defaultOption.xAxis.data = getAxisList(userOption)
  }
  // 挂载series的数据
  defaultOption.series = getSeries$2(userOption)
}
const getSeries$2 = userOption => {
  const { data, xField, yField, isStack, labelColor } = userOption
  const isExchangeAxis = getIsExchangeAxis(userOption)
  const _get = (data, index) => {
    const seriesItem = getBarSerieItem()
    seriesItem.data = data.map(i => i[isExchangeAxis ? xField : yField])
    // 堆积柱状图
    if (isStack) {
      seriesItem.stack = 'total'
      seriesItem.label.position = 'inside'
      if (labelColor && index !== undefined) {
        seriesItem.label.color = isArray(labelColor)
          ? labelColor[index]
          : labelColor
      }
    }
    // x、y轴互换的情况，label的position的位置会有所变化
    if (isExchangeAxis) {
      seriesItem.label.position = 'right'
    }
    return seriesItem
  }
  if (is2Array(data)) {
    return data.map((array, index) => {
      return _get(array, index)
    })
  } else {
    return [_get(data)]
  }
}

class Bar extends Graph {
  /**图表选项 */
  option
  /**图表类型 */
  type
  constructor(container, userOption) {
    super(container, userOption)
    this.type = GRAPH_TYPES.BAR
    const defaultOption = getDefaultOption$3()
    // 柱状图自定义merge
    merge$3(defaultOption, userOption)
    // 直角坐标系处理
    handler$1(defaultOption, userOption)
    // 统一处理
    handler(defaultOption, userOption)
    // 设置this.option
    this.option = defaultOption
  }
}

const getDefaultOption$2 = () => {
  const defaultOption = {
    tooltip: {
      trigger: 'axis',
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
const getLineSerieItem = (smooth, areaStyle) => {
  const item = {
    name: '',
    type: 'line',
    data: [],
    label: {
      show: true,
      color: '#666',
      position: 'top',
    },
  }
  if (smooth) {
    item.smooth = true
  }
  if (areaStyle) {
    item.areaStyle = areaStyle
  }
  return item
}

/**
 * @desc 将userOption合并到defaultOption
 * @param defaultOption
 * @param userOption
 */
const merge$2 = (defaultOption, userOption) => {
  const isExchangeAxis = getIsExchangeAxis(userOption)
  if (isExchangeAxis) {
    console.warn(
      'Invalid Option:Chart Line not allowed to set YAxis as category axis',
    )
  }
  defaultOption.xAxis.data = getAxisList(userOption)
  defaultOption.series = getSeries$1(userOption)
}
const getSeries$1 = userOption => {
  const { data, yField, smooth, areaStyle } = userOption
  const _get = data => {
    const item = getLineSerieItem(smooth, areaStyle)
    item.data = data.map(i => {
      return i[yField]
    })
    return item
  }
  if (is2Array(data)) {
    return data.map(array => {
      return _get(array)
    })
  } else {
    return [_get(data)]
  }
}

class Line extends Graph {
  /**图表选项 */
  option
  /**图表类型 */
  type
  constructor(container, userOption) {
    super(container, userOption)
    this.type = GRAPH_TYPES.LINE
    const defaultOption = getDefaultOption$2()
    // 折线图自定义merge
    merge$2(defaultOption, userOption)
    // 直角坐标系处理
    handler$1(defaultOption, userOption)
    // 统一处理
    handler(defaultOption, userOption)
    this.option = defaultOption
  }
}

const getDefaultOption$1 = () => {
  const defaultOption = {
    tooltip: {
      trigger: 'item',
      formatter: params => {
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
const getScatterSerieItem = () => {
  const item = {
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

/**
 * @desc 将userOption合并到defaultOption
 * @param defaultOption
 * @param userOption
 */
const merge$1 = (defaultOption, userOption) => {
  const isExchangeAxis = getIsExchangeAxis(userOption)
  if (isExchangeAxis) {
    console.warn(
      'Invalid Option:Chart Line not allowed to set YAxis as category axis',
    )
  }
  defaultOption.series = getSeries(userOption)
}
const getSeries = userOption => {
  const { xField, yField, nameField, groupField, data } = userOption
  if (!groupField) {
    const serieItem = getScatterSerieItem()
    const serieItemData = data.map(d => {
      return {
        name: d[nameField],
        value: [d[xField], d[yField]],
      }
    })
    serieItem.data = serieItemData
    return [serieItem]
  } else {
    const groupFieldList = getSetArray(
      data.map(i => {
        return i[groupField]
      }),
    )
    return groupFieldList.map(groupName => {
      const serieItem = getScatterSerieItem()
      serieItem.name = groupName
      const serieItemData = data
        .filter(i => {
          return i[groupField] === groupName
        })
        .map(d => {
          return {
            name: d[nameField],
            value: [d[xField], d[yField]],
          }
        })
      serieItem.data = serieItemData
      return serieItem
    })
  }
}

class Scatter extends Graph {
  /**图表选项 */
  option
  /**图表类型 */
  type
  constructor(container, userOption) {
    super(container, userOption)
    this.type = GRAPH_TYPES.SCATTER
    const defaultOption = getDefaultOption$1()
    // 折线图自定义merge
    merge$1(defaultOption, userOption)
    // 直角坐标系处理
    handler$1(defaultOption, userOption)
    // 统一处理
    handler(defaultOption, userOption)
    this.option = defaultOption
  }
}

const getDefaultOption = () => {
  return {
    color: COLOR.THEME_PRIMARY_COLORS,
    tooltip: {
      trigger: 'item',
      borderColor: '#fff',
    },
    legend: {
      bottom: 16,
    },
    series: [],
  }
}
const getPieSerieItem = userOption => {
  const { radius } = userOption
  return {
    name: '',
    type: 'pie',
    radius: radius ? radius : '50%',
    data: [],
  }
}

const merge = (defaultOption, userOption) => {
  defaultOption.series = getSereis(userOption)
}
const getSereis = userOption => {
  const { nameField, valueField } = userOption
  const { data } = userOption
  let _data = data
  if (nameField || valueField) {
    _data = data.map(item => {
      return {
        name: nameField ? item[nameField] : item.name,
        value: valueField ? item[valueField] : item.name,
      }
    })
  }
  const serieItem = getPieSerieItem(userOption)
  serieItem.data = _data
  return [serieItem]
}

class Pie extends Graph {
  /**图表选项 */
  option
  /**图表类型 */
  type
  constructor(container, userOption) {
    super(container, userOption)
    this.type = GRAPH_TYPES.PIE
    const defaultOption = getDefaultOption()
    // 饼图自定义merge
    merge(defaultOption, userOption)
    // 统一处理
    handler(defaultOption, userOption)
    this.option = defaultOption
  }
}

var index = {
  Bar,
  Line,
  Scatter,
  Pie,
}

module.exports = index
