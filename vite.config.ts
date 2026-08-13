import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 开发环境代理目标，可用环境变量 VITE_API_PROXY_TARGET 覆盖
const PROXY_TARGET = process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:8000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 前端统一请求 /api/*，由 Vite 转发到后端并去掉 /api 前缀，
      // 避免开发时的跨域/CORS 问题。
      '/api': {
        target: PROXY_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
