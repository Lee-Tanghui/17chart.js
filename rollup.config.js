import json from 'rollup-plugin-json'
import typescript from '@rollup/plugin-typescript'
import less from 'rollup-plugin-less'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

export default [
  // umd
  {
    input: '17chart/index.ts',
    external: ['echarts'],
    output: {
      sourcemap: false,
      name: '$17chart',
      file: `lib/umd/17chart.min.js`,
      format: 'umd',
      globals: {
        echarts: 'echarts',
      },
    },
    plugins: [
      json(),
      typescript({ sourceMap: false }),
      terser(),
      less({
        output: `lib/umd/17chart.css`,
      }),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
  // esm
  {
    input: '17chart/index.ts',
    external: ['echarts'],
    output: {
      sourcemap: false,
      name: '$17chart',
      file: `lib/esm/17chart.esm.js`,
      format: 'es',
      globals: {
        echarts: 'echarts',
      },
    },
    plugins: [
      json(),
      typescript({ sourceMap: false }),
      less({
        output: `lib/esm/17chart.css`,
      }),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
  // cjs
  {
    input: '17chart/index.ts',
    external: ['echarts'],
    output: {
      sourcemap: false,
      name: '$17chart',
      file: `lib/cjs/17chart.common.js`,
      format: 'cjs',
      globals: {
        echarts: 'echarts',
      },
    },
    plugins: [
      json(),
      typescript({ sourceMap: false }),
      less({
        output: `lib/cjs/17chart.css`,
      }),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
]
