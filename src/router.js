import { createRouter,createWebHashHistory } from 'vue-router'
const printer = ()=> import('./pages/Printer.vue')
const uploadd = ()=> import('./pages/Uploadd.vue')


const routes = [
  {
    path: '/printer',
    name: 'printer',
    component: printer,
  },
  {
    path: '/uploadd',
    name: 'uploadd',
    component: uploadd,
  },
]

let router = createRouter({
  history : createWebHashHistory(),
  routes : routes,
})

export default router



