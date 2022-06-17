export const data1 = [
  { value: 2, name: '手机' },
  { value: 3, name: '电脑' },
  { value: 4, name: 'iPad' },
]

export const data2 = [
  {
    key: '[0,145)',
    value: 0,
    rate: 0.0,
  },
  {
    key: '[145,298)',
    value: 1,
    rate: 0.11,
  },
  {
    key: '[298,451)',
    value: 0,
    rate: 0.0,
  },
  {
    key: '[451,604)',
    value: 2,
    rate: 0.22,
  },
  {
    key: '[604,757)',
    value: 3,
    rate: 0.33,
  },
  {
    key: '[757,910)',
    value: 0,
    rate: 0.0,
  },
  {
    key: '[910,1063)',
    value: 3,
    rate: 0.33,
  },
  {
    key: '[1063,1216)',
    value: 0,
    rate: 0.0,
  },
  {
    key: '[1216,1369)',
    value: 0,
    rate: 0.0,
  },
  {
    key: '[1369,1522)',
    value: 0,
    rate: 0.0,
  },
  {
    key: '[1522,+∞)',
    value: 0,
    rate: 0.0,
  },
]

export const data3 = [
  { value: 0.22, name: '手机' },
  { value: 0.33, name: '电脑' },
  { value: 0.44, name: 'iPad' },
]

const _data4 = []
for (let i = 0; i < 3; i++) {
  _data4.push([
    { value: Number(Math.random().toFixed(2)), name: '1班' },
    { value: Number(Math.random().toFixed(2)), name: '2班' },
    { value: Number(Math.random().toFixed(2)), name: '4班' },
    { value: Number(Math.random().toFixed(2)), name: '5班' },
    { value: Number(Math.random().toFixed(2)), name: '6班' },
    { value: Number(Math.random().toFixed(2)), name: '7班' },
    { value: Number(Math.random().toFixed(2)), name: '8班' },
  ])
}
export const data4 = _data4

const _data5 = []
for (let i = 0; i < 40; i++) {
  _data5.push({
    value: (Math.random() * 200).toFixed(0),
    name: `第${i + 1}实验小学`,
  })
}
export const data5 = _data5

const _data6 = []
for (let i = 0; i < 40; i++) {
  _data6.push({
    value: (Math.random() * 200).toFixed(0),
    name: `第${i + 1}实验小学(北京市xx附中望京分校)`,
  })
}
export const data6 = _data6
