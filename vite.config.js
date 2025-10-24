import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        onboarding: resolve(__dirname, 'templates/onboarding.html'),
        clarity: resolve(__dirname, 'templates/clarity.html'),
        feedback: resolve(__dirname, 'templates/feedback.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  preview: {
    port: 4173,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'components'),
      '@features': resolve(__dirname, 'features'),
      '@templates': resolve(__dirname, 'templates')
    }
  }
})
