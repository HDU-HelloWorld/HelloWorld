import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
const ResourcePage = () => import('../pages/Utils/ResourcePage.vue')
const GetvipPage = () => import('../pages/Utils/GetvipPage.vue')
const printer = () => import('../pages/PrinterPage.vue')
const homework = () => import('../pages/Uploadd.vue')

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
        path: '/link',
        name: 'link',
        component: () => import('../pages/LinkPage.vue'),
    },
]

let router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
