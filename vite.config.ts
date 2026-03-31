import { fileURLToPath, from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  },
  },
  build: {
    // Enable chunk splitting for better caching
    rollOptions: {
      output: {
        // Create separate chunks for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Split large dependencies into separate chunks
    manualChunks: {
      // Vue core
      'vue-vendor': ['vue', 'vue-router', 'pinia'],
      
      // UI framework
      'ui-vendor': ['radix-vue', '@vueuse/core', '@vueuse/integrations/useLocalStorage'],
      
      // Monaco Editor - separate chunk
      'monaco-editor': ['monaco-editor', '@guolao/vue-monaco-editor'],
      
      // Crypto libraries
      'crypto': ['bcryptjs', '@noble/curves/secp256k1', '@noble/hashes/sha2', '@noble/hashes/legacy'],
      
      // Diff library
      'diff': ['diff'],
      
      // Charts/Data visualization
      'charts': ['chart.js'],
    },
  },
  optimizeDeps: {
    // Include all dependencies that are dynamically imported
    include: ['monaco-editor', '@guolao/vue-monaco-editor'],
  },
})
