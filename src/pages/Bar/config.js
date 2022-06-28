export default {
  xField: 'name',
  yField: 'value',
  data: [
    { value: 2, name: '语文' },
    { value: 3, name: '数学' },
    { value: 4, name: '英语' },
  ],
  renderer: 'canvas',
  name: '参测情况',
  isStack: true,
  color: ['#30BF78', '#F3F247', '#FFC827', '#F4664A'],
  labelColor: ['#fff', '#666', '#fff', '#666'],
  grid: {
    right: 60,
  },
  isShowLabel: true,
  isPercent: true,
  percentFixed: 2,
  xAxis: {
    type: 'category',
    name: '学科',
  },
  yAxis: {
    type: 'value',
    name: '参测人数',
    minInterval: 1,
  },
  dataZoom: {
    brushSelect: false,
    start: 15,
    end: 85,
  },
}
