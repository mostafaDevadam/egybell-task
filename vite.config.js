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
   proxy: {
      '/api': {
        target: isProd
          ? process.env.VITE_LIVE_API_URL
          : process.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // forwards /api/:path -> /:path on target
        secure: true, // set to false only if target uses self-signed cert in dev
      },
    },
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
