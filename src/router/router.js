import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
// import UpLoadVue from '../pages/UpLoad.vue'
const ResourcePage = () => import('../pages/Utils/ResourcePage.vue')
const GetvipPage = () => import('../pages/Utils/GetvipPage.vue')
const LoginPage = () => import('../pages/Auth/LoginPage.vue')
const printer = () => import('../pages/PrinterPage.vue')
const homework = () => import('../pages/UploadPage.vue')
const bind = () => import('../pages/BindPage.vue')
const VideoPage = () => import('../pages/Video/VideoPage.vue')

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/resource',
    name: 'ResourcePage',
    component: ResourcePage,
  },
  {
    path: '/print',
    name: 'print',
    component: printer,
  },
  {
    path: '/homework',
    name: 'homework',
    component: homework,
  },
  {
    path: '/music/getvip',
    name: 'GetvipPage',
    component: GetvipPage,
  },
  {
    path: '/auth/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/link',
    name: 'link',
    component: () => import('../pages/LinkPage.vue'),
  },
  {
    path: '/bind',
    name: 'bind',
    component: bind,
  },
  {
    path: '/video',
    name: 'VideoPage',
    component: VideoPage,
  },
]

let router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
