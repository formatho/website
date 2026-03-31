import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // Enable chunk splitting for better caching
    rollupOptions: {
      output: {
        // Create separate chunks for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        // Split large dependencies into separate chunks
        manualChunks(id) {
          // Don't split for SSR build (external modules)
          if (id.includes('node_modules')) {
            // Vue core
            if (id.includes('vue/dist') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            // UI framework
            if (id.includes('radix-vue') || id.includes('@vueuse/core')) {
              return 'ui-vendor'
            }
            // Monaco Editor
            if (id.includes('monaco-editor') || id.includes('@guolao/vue-monaco-editor')) {
              return 'monaco-editor'
            }
            // Crypto libraries
            if (id.includes('bcryptjs') || id.includes('@noble/curves')) {
              return 'crypto'
            }
            // Diff library
            if (id.includes('/diff/')) {
              return 'diff'
            }
            // Charts
            if (id.includes('chart.js')) {
              return 'charts'
            }
          }
          return undefined
        }
      }
    }
  },
  optimizeDeps: {
    // Include all dependencies that are dynamically imported
    include: ['monaco-editor', '@guolao/vue-monaco-editor'],
  },
})
