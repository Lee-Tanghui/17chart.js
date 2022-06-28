import json from 'rollup-plugin-json'
import typescript from '@rollup/plugin-typescript'
import less from 'rollup-plugin-less'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: '17chart/index.ts',
    external: ['echarts'],
    output: {
      sourcemap: false,
      name: '$17chart',
      file: `lib/17chart.min.js`,
      format: 'umd',
      globals: {
        echarts: 'echarts',
      },
    },
    plugins: [
      json(),
      typescript({ sourceMap: false }),
      terser(),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
  {
    input: '17chart/styles/index.less',
    output: {
      file: 'lib/17chart.css',
    },
    plugins: [
      less({
        output: `lib/17chart.css`,
      }),
    ],
  },
]
