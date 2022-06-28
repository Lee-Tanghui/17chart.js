import { defineConfig } from 'umi'

export default defineConfig({
  title: '17Chart',
  layout: {
    title: '17Chart-开发者',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', name: 'REAME.md', component: '@/pages/Index/index' },
    { path: '/bar', name: '柱状图', component: '@/pages/Bar/index' },
    { path: '/line', name: '折线图', component: '@/pages/Line/index' },
    { path: '/scatter', name: '散点图', component: '@/pages/Scatter/index' },
    { path: '/pie', name: '饼图', component: '@/pages/Pie/index' },
  ],
  fastRefresh: {},
  history: {
    type: 'hash',
  },
})
