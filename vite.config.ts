import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'chrome91',
    outDir: 'dist/renderer',
    emptyOutDir: true,
    assetsDir: './',
    rollupOptions: {
      input: {
        main: './src/main.ts',
        renderer: './src/renderer.ts',
      },
    },
  },
})
