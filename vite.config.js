import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
   test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    include: ['test/**/*.{test,spec}.{ts,tsx}']
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
