const _data1 = [
  {
    name: '公立',
    type: '公立',
    x: 9.8,
    y: 9.6,
  },
  {
    name: '私立',
    type: '私立',
    x: 12.1,
    y: 12.6,
  },
  {
    name: '随迁',
    type: '随迁',
    x: 10.1,
    y: 12.2,
  },
]

for (let i = 0; i < 20; i++) {
  _data1.push({
    name: `第${i + 1}实验小学`,
    type: '其他',
    x: Number((Math.random() * 10).toFixed(0)),
    y: Number((Math.random() * 10).toFixed(0)),
  })
}

export const data1 = _data1
