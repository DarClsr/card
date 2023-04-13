import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 路径别名配置
  resolve:{
    alias:{
      "@":path.join(__dirname,"src")
    }
  },
  // scss配置
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      },
    }
  },
  // proxy代理跨域
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://localhost:5000/api',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')  //重写请求地址
      }
    }
  }
})
