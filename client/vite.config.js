import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':'https://retrade-7ttv.onrender.com',
    // {target:'https://retrade-7ttv.onrender.com',
    // changeOrigin: true,
    // secure: false,
    // }
  
  },
  },

})
