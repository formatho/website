import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nodePolyfills({
      include: ['buffer', 'process', 'stream', 'util'],
      globals: {
        Buffer: true,
        global: true,
        process: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: '/tools/',
  ssr: {
    noExternal: ['@headlessui/vue']
  },
  build: {
    // Core Web Vitals Optimization - Code Splitting
    rollupOptions: {
      output: {
        // Use function-based manualChunks to handle SSR builds properly
        // SSR builds treat 'vue' as external, so we need to exclude it
        manualChunks(id) {
          // Skip for SSR external modules (vue, vue-router are externals in SSR)
          if (id.includes('node_modules/vue/') || id.includes('node_modules/@vue/') || id.includes('node_modules/vue-router/')) {
            return undefined
          }
          
          // Split large vendor dependencies
          if (id.includes('node_modules/crypto-js/') || id.includes('node_modules/bcryptjs/') || id.includes('node_modules/bip39/') || id.includes('node_modules/@noble/hashes/')) {
            return 'crypto-vendor'
          }
          if (id.includes('node_modules/@solana/web3.js/') || id.includes('node_modules/viem/') || id.includes('node_modules/@polkadot/keyring/')) {
            return 'blockchain-vendor'
          }
          if (id.includes('node_modules/docx/') || id.includes('node_modules/jspdf/') || id.includes('node_modules/html2pdf.js/')) {
            return 'document-vendor'
          }
          if (id.includes('node_modules/highlight.js/') || id.includes('node_modules/marked/') || id.includes('node_modules/sql-formatter/') || id.includes('node_modules/gpt-tokenizer/')) {
            return 'code-vendor'
          }
          if (id.includes('node_modules/radix-vue/') || id.includes('node_modules/lucide-vue-next/')) {
            return 'ui-vendor'
          }
          if (id.includes('node_modules/chart.js/') || id.includes('node_modules/vue-chartjs/')) {
            return 'chart-vendor'
          }
          if (id.includes('node_modules/bpmn-js/')) {
            return 'bpmn-vendor'
          }
          
          return undefined
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['vue', 'vue-router', 'crypto-js'],
    exclude: ['@polkadot/keyring', '@polkadot/util-crypto']
  }
})
