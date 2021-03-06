# 17chart.js

## 什么是17chart？

`17chart.js`是基于Echart.js二次封装的一个图表库，目的在于：

- 统一一套完整的图表渲染主题样式
- 简化Echarts配置项的复杂度（一段即使上百行的`option`代码，大部分都是服务于UI样式和组件）
- 对Echarts.js无需考虑的一些图表业务细节进行处理

> 开发图表示例网站：[http://17chart-dev-website-1258339218.cos-website.ap-beijing.myqcloud.com/](http://17chart-dev-website-1258339218.cos-website.ap-beijing.myqcloud.com/)

## 什么是图表业务细节？

- 旋转X轴名称后，可能需要增加图表的整体高度，避免图表显示区域过小
- 旋转X轴之后，名称过长的情况的特殊处理
- 小数格式化成为百分比数据后，`yAxis`、`label`、`tooltip`等都需要进行格式化显示
- `lengend`、`dataZoom`影响`grid.bottom`或者`grid.top`的值
- `xAxis.name`和`yAxis.name`影响`grid.bottom`或者`grid.top`的值
- `xAxsi`是表示数值的条形图时，图表容器的高度需要根据数值个数调整高度
- 饼图的显示需要从小到大、或者从大到小进行排序
- 等等


这些业务细节可能会由于业务数据的不同，而需要进行调整。这可能耽误了我们大部分的前端时间。所以根据业务进行二次封装就变得很有必要。

## 如何使用17chart.js

> 当前还未发布npm，还在开发内测-`alpha`阶段，请勿使用!

### 1. 安装17chart.js

```
npm install 17chart.js
```

### 2. 引入17chart.js和17chart.css

```
import $17chart from '17chart.js'
import '17chart.js/17chart.css'

new $17chart.Bar('chart1', {
  data: data1,
  xField: 'name',
  yField: 'value',
})
```

## 版本日志

- [版本日志文件](https://github.com/Lee-Tanghui/17chart.js/blob/main/CHANGELOG.md)