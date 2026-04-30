// vite.config.ts (if you have one)
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  optimizeDeps: {
    include: ['@angular/animations', '@angular/animations/browser']
  },
  ssr: {
    noExternal: ['@angular/animations']
  }
});