import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
const ResourcePage = () => import('../pages/Utils/ResourcePage.vue')
const GetvipPage = () => import('../pages/Utils/GetvipPage.vue')
const printer = () => import('../pages/Printer.vue')
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
        component: () => import('../pages/Link.vue'),
    },
]

let router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router
