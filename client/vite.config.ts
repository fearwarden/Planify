import {defineConfig, splitVendorChunkPlugin} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  define: {
    global: 'window'
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true
      },
      "/images": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
