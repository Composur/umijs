
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes = [
  { path: '/', component: '@/pages/index.vue' },
  { path: '/docs', component: '@/pages/docs.vue' },
  { path: '/about/:id', name: 'About', component: '@/pages/about' },
]
