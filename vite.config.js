import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: true,
    //vue3 vite配置热更新不用手动刷新
    // Listening on all local IPs
    // host: true,
  }
})
