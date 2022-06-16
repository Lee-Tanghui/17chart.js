;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('echarts')))
    : typeof define === 'function' && define.amd
    ? define(['echarts'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.$17chart = factory(global.echarts)))
})(this, function (echarts) {
  'use strict'

  function _interopNamespace(e) {
    if (e && e.__esModule) return e
    var n = Object.create(null)
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k)
          Object.defineProperty(
            n,
            k,
            d.get
              ? d
              : {
                  enumerable: true,
                  get: function () {
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

  const isNullOrUndef = function (val) {
    return val === undefined || val === null
  }
  const sget = function (instance, path) {
    return path.split('.').reduce(function (p, c) {
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

  /**
   * 是否是一个二维数组(内部每个元素都应该是一个数组)
   * @param array
   * @returns Boolean
   */
  const is2Array = (array) => {
    return array.every((i) => {
      return Array.isArray(i)
    })
  }
  /**
   * 是否是一个数组类型
   * @param value
   * @returns boolean
   */
  const isArray = (value) => {
    return Array.isArray(value)
  }
  /**
   * 是否是字符类型
   * @param value
   * @returns  boolean
   */
  const isString = (value) => {
    return typeof value === 'string'
  }
  /**
   * 是否是布尔类型
   * @param value
   * @returns boolean
   */
  const isBoolean = (value) => {
    return typeof value === 'boolean'
  }
  /**
   * 判断是否是中文字符
   * @param str 字符
   */
  const isCN = (str) => {
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
    str.split('').forEach((s) => {
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
  const insertNewlineEveryTen = (value) => {
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
    objs.forEach((obj) => {
      obj && deepAssignSingle(objTo, obj)
    })
    return objTo
  }
  const deepAssignSingle = (objTo, obj) => {
    if (obj instanceof Array) {
      objTo = []
      obj.forEach((item) => {
        objTo.push(deepAssignSingle({}, item))
      })
      return
    }
    let keys = Object.keys(obj)
    keys.forEach((key) => {
      if (typeof obj[key] == 'object') {
        if (obj[key] instanceof Array) {
          objTo[key] = []
          obj[key].forEach((item) => {
            let temp = {}
            deepAssignSingle(temp, item)
            objTo[key].push(temp)
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
   * 统一处理Option
   * @param option （此处的option是 userOption和defaultOption合并过后的全量option）
   * @param userOption (此处的userOption是用户的option)
   */
  const handler = (option, userOption) => {
    const { isPercent, percentFixed, name, isShowLabel } = userOption
    // 1. axis.name会影响grid.left和grid.right
    if (option.xAxis && option.xAxis.name) {
      const extraWidth = _getExtraWidth(option.xAxis.name, isPercent)
      option.grid.right = option.grid.right + extraWidth
    }
    if (option.yAxis && option.yAxis.name) {
      const extraWidth = _getExtraWidth(option.yAxis.name, isPercent)
      option.grid.left = option.grid.left + extraWidth
    }
    // 2. 如果是百分比的情况，则需要做格式化处理
    if (isPercent) {
      const formatterFn = function (value) {
        return (value * 100).toFixed(percentFixed) + '%'
      }
      const dataFormatterFn = function (item) {
        return (item.value * 100).toFixed(0) + '%'
      }
      // y轴的label值需要做格式化处理
      set(option, 'yAxis.axisLabel.formatter', formatterFn)
      // tooltip的值需要做格式化处理
      set(option, 'tooltip.valueFormatter', formatterFn)
      // 柱状图label的值需要做格式化处理
      set(option, 'series.0.label.formatter', dataFormatterFn)
    }
    // 3. 如果name存在，将其放置到series.0.name上
    if (name) {
      if (isString(name)) {
        set(option, 'series.0.name', name)
      } else if (isArray(name)) {
        name.forEach((_name, index) => {
          set(option, `series.${index}.name`, _name)
        })
      }
    }
    // 4. 如果X轴的名称是需要旋转的，此时需要处理名称过长的情况
    if (getIsNeedRotate(userOption)) {
      const isUserSetFormatter = sget(userOption, 'xAxis.axisLabel.formatter')
      if (!isUserSetFormatter) {
        // 隐藏重叠的标签
        set(option, 'xAxis.axisLabel.hideOverlap', true)
        // 格式化处理
        set(option, 'xAxis.axisLabel.formatter', (value) => {
          return value.length >= 11 ? insertNewlineEveryTen(value) : value
        })
      }
    }
    // 5. 是否显示数据label
    if (isBoolean(isShowLabel)) {
      option.series.map((serieItem) => {
        set(serieItem, 'label.show', isShowLabel)
      })
    }
  }
  /**
   * 判断是否需要旋转
   */
  const getIsNeedRotate = (userOption) => {
    let isRotate = false
    if (sget(userOption, 'xAxis.axisLabel.rotate')) {
      isRotate = true
    }
    return isRotate
  }
  /**
   * 获取x轴的名称列表
   */
  const getXAxisList = (userOption) => {
    const { xField, data } = userOption
    if (is2Array(data)) {
      return data[0].map((i) => i[xField])
    } else {
      return data.map((i) => i[xField])
    }
  }
  /**
   * 获取轴中最长的字符
   */
  const getMaxAxisLabel = (axisList) => {
    let maxStr = ''
    axisList.forEach((axis) => {
      if (axis.length > maxStr.length) {
        maxStr = axis
      }
    })
    return maxStr
  }
  /**
   * 获取旋转x坐标后，名称的最大高度
   */
  const getLabelMaxHeightByRotateXAxisLabel = (userOption) => {
    const ONE_ROW_MAX_LENGTH = 100
    const angle = sget(userOption, 'xAxis.axisLabel.rotate')
    const xAxisList = getXAxisList(userOption)
    const maxLabel = getMaxAxisLabel(xAxisList)
    const length = getStrLength(maxLabel, FONT_SIZE.AXIS_LABEL)
    const height =
      Math.sin(angle) *
      (length >= ONE_ROW_MAX_LENGTH ? ONE_ROW_MAX_LENGTH : length)
    return height
  }
  /**
   * 获取额外的宽度
   * @param { string } name
   * @param { boolean } isPercent
   * @returns {number}
   */
  const _getExtraWidth = (name, isPercent) => {
    if (name.length > 2) {
      return (name.length - 2) * (isPercent ? 8 : 16)
    } else {
      return 0
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
      // 【参数错误检测】：传递的id，但是没有获取到元素
      if (typeof container === 'string' && !this.container) {
        throw new Error(`Invalid id: Can't get the dom that id is ${container}`)
      }
      // 【参数错误检测】：传递的不是id，但是不是一个DOM节点
      if (typeof container !== 'string' && this.container.nodeType !== 1) {
        throw new TypeError('Invalid Type: container is not a dom element')
      }
      // 设置标识
      this.container.setAttribute('chart-source', CHART_SOURCE)
      // 判断图表的高度(如果<=100px，那么将其给默认的高度360px)
      if (this.container.offsetHeight <= 100) {
        this.container.style.height = '360px'
      }
      // 如果旋转X轴坐标名称，如果名称过程，需要增加容器的高度。否则会出现图表展现区域过小的情况
      if (getIsNeedRotate(options)) {
        const height = getLabelMaxHeightByRotateXAxisLabel(options)
        if (height > HEIGHT.MAX_BOTTOM_HEIGHT_TOLERANCE_VALUE) {
          const extraHeight = height - HEIGHT.MAX_BOTTOM_HEIGHT_TOLERANCE_VALUE
          this.container.style.height = `${
            this.container.offsetHeight + extraHeight
          }px`
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
      new Promise((resolve) => {
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
    _observeReisze() {
      const resizeObserver = new ResizeObserver((entries) => {
        this._resize()
      })
      if (this.container.parentElement) {
        resizeObserver.observe(this.container.parentElement)
      }
    }
  }

  const getDefaultOption = () => {
    const defaultOption = {
      tooltip: {
        trigger: 'item',
      },
      color: COLOR.THEME_PRIMARY_COLORS,
      grid: {
        top: 30,
        left: 0,
        right: 40,
        bottom: '3%',
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
        },
        axisLabel: {
          rotate: 0,
          margin: 14,
          color: '#999',
        },
        axisLine: {
          lineStyle: {
            color: '#333',
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
      data: [],
      label: {
        show: true,
        color: '#666',
        position: 'top',
      },
    }
  }
  const getMarkLine = (isPercent) => {
    return {
      silent: true,
      symbol: 'none',
      lineStyle: {
        color: '#FF5858',
      },
      label: {
        position: 'insideEndBottom',
        color: '#FF5858',
        formatter: (params) => {
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

  const merge = (defaultOption, userOption) => {
    let { data, yField, isPercent, markLine, dataZoom } = userOption
    if (is2Array(data)) {
      // 挂载xAxis的数据
      defaultOption.xAxis.data = getXAxisList(userOption)
      // 挂载图表数据
      const seriesData = data.map((array) => {
        const seriesItem = getBarSerieItem()
        seriesItem.data = array.map((i) => i[yField])
        return seriesItem
      })
      defaultOption.series = seriesData
    } else {
      // 挂载xAxis的数据
      defaultOption.xAxis.data = getXAxisList(userOption)
      // 挂载图表数据
      const seriesItem = getBarSerieItem()
      const seriesData = data.map((i) => i[yField])
      seriesItem.data = seriesData
      defaultOption.series.push(seriesItem)
    }
    // 查看是否有辅助线存在
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
      defaultOption.grid.bottom = 80
    }
    // Merge数据(需要删除data、xField、yField三个字段)
    const copyUserOption = deepAssign({}, userOption)
    Reflect.deleteProperty(copyUserOption, 'data')
    Reflect.deleteProperty(copyUserOption, 'xField')
    Reflect.deleteProperty(copyUserOption, 'yField')
    deepAssign(defaultOption, userOption)
    // 统一处理
    handler(defaultOption, userOption)
    return defaultOption
  }

  const GRAPH_TYPES = {
    BAR: 'bar',
    LINE: 'line',
    MIXIN: 'mixin',
  }

  class Bar extends Graph {
    /**图表选项 */
    option
    /**图表类型 */
    type
    constructor(container, userOption) {
      super(container, userOption)
      this.type = GRAPH_TYPES.BAR
      this.option = merge(getDefaultOption(), userOption)
    }
  }

  var index = {
    Bar,
  }

  return index
})
