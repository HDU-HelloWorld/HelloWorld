import { createApp } from 'vue'
// import './style.css'
// EXPLOSION!!
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router.js'
import './assets/css/reset.css'
const app = createApp(App)

app.use(router)

app.use(ElementPlus)

app.mount('#app')
