# 17chart.js

> 开发图表示例网站：[http://17chart-dev-website-1258339218.cos-website.ap-beijing.myqcloud.com/](http://17chart-dev-website-1258339218.cos-website.ap-beijing.myqcloud.com/)

## 什么是17chart？

`17chart.js`是基于Echart.js二次封装的一个图表库，目的在于：

- 统一一套完整的图表渲染主题样式
- 简化Echarts配置项的复杂度（一段即使上百行的`option`代码，大部分都是服务于UI样式和组件）
- 对Echarts.js无需考虑的一些图表业务细节进行处理



## 什么是图表业务细节？

- 旋转X轴名称后，可能需要增加图表的整体高度，避免图表显示区域过小
- 旋转X轴之后，名称过长的情况的特殊处理
- 小数格式化成为百分比数据后，`yAxis`、`label`、`tooltip`等都需要进行格式化显示
- `lengend`、`dataZoom`影响`grid.bottom`或者`grid.top`的值
- `xAxis.name`和`yAxis.name`影响`grid.bottom`或者`grid.top`的值
- 等等


这些业务细节可能会由于业务数据的不同，而需要进行调整。这可能耽误了我们大部分的前端时间。所以根据业务进行二次封装就变得很有必要。

## 如何使用17chart.js

> 当前还未发布npm，还在开发beta阶段，请勿使用!

### 1. 安装17chart.js

```
npm install 17chart.js
```

### 2. 引入17chart.js和17chart.css

```
import $17chart from '17chart.js'
import '17chart.js/17chart.css'

new $17chart.Bar('chart1', {
  renderer: 'svg',
  data: data1,
  xField: 'name',
  yField: 'value',
})
```

