import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,         // 允许外部访问
    port: 3000,
    strictPort: true,
    open: true,
    // ✅ 允许 cpolar.cn 以及所有子域名（包括 *.vip.cpolar.cn 这种多级子域名）
    allowedHosts: ['.cpolar.cn']
  }
})