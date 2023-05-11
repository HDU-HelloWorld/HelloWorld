import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
const printer = () => import('../pages/Printer.vue')
const homework = () => import('../pages/Uploadd.vue')


const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
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
        path: '/link',
        name: 'link',
        component: () => import('../pages/Link.vue'),
    }
]

let router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router
