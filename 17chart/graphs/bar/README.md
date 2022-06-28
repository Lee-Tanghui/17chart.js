# 柱状图

## 可配置属性

```javascript
{ 
  // ===== 必填字段 =====
  data: [],  // 数据
  xField: '', // X轴所对应的data对象中字段名称
  yField: '', // Y轴所对应的data对象中字段名称

  // ===== 非必填字段 =====
  name: '', // 用于series[0]上的name
  isPercent: false, // 是否有百分比（数值为小数，例如0.28）
  percentFixed: 0, //  百分比保留的小数位
  xAxis: {
    name: '', // X轴的名称
    axisLabel: {
      rotate: 0, // 标签旋转的角度
      formatter: (value) => { // 标签格式化
        return value   
      }, 
    }
  },
  yAxis: {
    name: '', // Y轴的名称
    minInterval: 1, // y轴最小间隔
    axisLabel: {
      formatter: (value) => { // 标签格式化
        return value
       }
    }
  },
}
```