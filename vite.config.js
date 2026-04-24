import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.VITE_NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    include: ['test/**/*.{test,spec}.{ts,tsx}']
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_LIVE_API_URL,
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ''),
        hostRewrite: process.env.VITE_LIVE_API_URL
      }
    }
  }


  /*build: {
   outDir: 'dist',
   minify: 'esbuild',
   terserOptions: undefined, // not used with esbuild
   rollupOptions: {},
   target: 'es2018',
   // use esbuild's drop: ['console','debugger']
   esbuild: {
     drop: ['console', 'debugger']
   }
 }*/
})
