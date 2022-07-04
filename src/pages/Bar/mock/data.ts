import { getRandomNum } from './mock.tool'

export const data1 = [
  { value: 2, name: '语文' },
  { value: 3, name: '数学' },
  { value: 4, name: '英语' },
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
  { value: 0.22, name: '语文' },
  { value: 0.33, name: '数学' },
  { value: 0.44, name: '英语' },
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

const _data7 = []
for (let i = 0; i < 4; i++) {
  _data7.push([
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0, 0.1)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.1, 0.2)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.2, 0.3)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.3, 0.4)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.4, 0.5)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.5, 0.6)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.6, 0.7)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.7, 0.8)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.8, 0.9)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.9, 1]' },
  ])
}
export const data7 = _data7

const _data8 = []
for (let i = 0; i < 4; i++) {
  _data8.push([
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0, 0.1)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.1, 0.2)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.2, 0.3)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.3, 0.4)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.4, 0.5)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.5, 0.6)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.6, 0.7)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.7, 0.8)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.8, 0.9)' },
    { value: Number(getRandomNum(0.1, 0.3).toFixed(2)), name: '[0.9, 1]' },
  ])
}
export const data8 = _data8

export const data9 = [
  { type: '全区', value: 8 },
  { type: '公办', value: 6 },
  { type: '民办', value: 7 },
  { type: '随迁', value: 5 },
  { type: '龙柏一小', value: 9 },
  { type: '黎明小学', value: 9.2 },
  { type: '鹤北小学', value: 8 },
  { type: '马桥文外', value: 7 },
  { type: '七宝实小', value: 9 },
  { type: '七宝外小', value: 10 },
]

export const data10 = [
  { type: '全区', value: 9 },
  { type: '公办', value: 9 },
  { type: '本校', value: 9 },
]

export const data11 = [
  [
    { country: 'A', year: '全区', value: 0.4715 },
    { country: 'A', year: '公办', value: 0.5092 },
    { country: 'A', year: '民办', value: 0.5406 },
    { country: 'A', year: '随迁', value: 0.2329 },
  ],
  [
    { country: 'B', year: '全区', value: 0.3405 },
    { country: 'B', year: '公办', value: 0.344 },
    { country: 'B', year: '民办', value: 0.2457 },
    { country: 'B', year: '随迁', value: 0.3815 },
  ],
  [
    { country: 'C', year: '全区', value: 0.0817 },
    { country: 'C', year: '公办', value: 0.0689 },
    { country: 'C', year: '民办', value: 0.0919 },
    { country: 'C', year: '随迁', value: 0.1419 },
  ],
  [
    { country: 'D', year: '全区', value: 0.064 },
    { country: 'D', year: '公办', value: 0.0477 },
    { country: 'D', year: '民办', value: 0.0812 },
    { country: 'D', year: '随迁', value: 0.1379 },
  ],
  [
    { country: 'E', year: '全区', value: 0.0422 },
    { country: 'E', year: '公办', value: 0.0302 },
    { country: 'E', year: '民办', value: 0.0406 },
    { country: 'E', year: '随迁', value: 0.1058 },
  ],
]

export const data13_4 = [
  [
    { country: 'A', year: '全区', value: 0.9715 },
    { country: 'A', year: '公办', value: 0.5092 },
    { country: 'A', year: '民办', value: 0.5406 },
    { country: 'A', year: '随迁', value: 0.2329 },
  ],
  [
    { country: 'B', year: '全区', value: 0.0105 },
    { country: 'B', year: '公办', value: 0.444 },
    { country: 'B', year: '民办', value: 0.2457 },
    { country: 'B', year: '随迁', value: 0.3815 },
  ],
  [
    { country: 'C', year: '全区', value: 0.0117 },
    { country: 'C', year: '公办', value: 0.0189 },
    { country: 'C', year: '民办', value: 0.0919 },
    { country: 'C', year: '随迁', value: 0.1419 },
  ],
  [
    { country: 'D', year: '全区', value: 0.004 },
    { country: 'D', year: '公办', value: 0.0177 },
    { country: 'D', year: '民办', value: 0.0812 },
    { country: 'D', year: '随迁', value: 0.1379 },
  ],
  [
    { country: 'E', year: '全区', value: 0.0022 },
    { country: 'E', year: '公办', value: 0.0102 },
    { country: 'E', year: '民办', value: 0.036 },
    { country: 'E', year: '随迁', value: 0.1058 },
  ],
]

export const data12 = [
  { type: '图形与几何', value: 301.41 },
  { type: '数与运算', value: 304.95 },
  { type: '方程与代数', value: 300.99 },
  { type: '概率与统计', value: 303.13 },
]
