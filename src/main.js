import { createApp } from 'vue'
// import './style.css'
// EXPLOSION!!
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router.js'
// v-md-editor MarkDown解析器
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'

VMdEditor.use(vuepressTheme, {
  Prism,
})
import './assets/css/reset.css'
const app = createApp(App)

app.use(router)

app.use(ElementPlus)

app.use(VMdEditor)

app.mount('#app')
