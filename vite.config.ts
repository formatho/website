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
  define: {
    'global': 'globalThis',
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          // Vue core
          if (id.includes('vue/dist') || id.includes('vue-router') || id.includes('@vueuse/')) {
            return 'vue-vendor'
          }
          // UI framework
          if (id.includes('radix-vue')) {
            return 'ui-radix'
          }
          // Heavy crypto — each in its own chunk
          if (id.includes('@polkadot') || id.includes('@solana')) return 'crypto-polkadot-solana'
          if (id.includes('bip39') || id.includes('ed25519-hd-key')) return 'crypto-bip39'
          if (id.includes('bcryptjs')) return 'crypto-bcrypt'
          if (id.includes('@noble')) return 'crypto-noble'
          if (id.includes('viem')) return 'crypto-viem'
          if (id.includes('bech32')) return 'crypto-bech32'
          // PDF
          if (id.includes('jspdf') || id.includes('html2pdf') || id.includes('html2canvas')) return 'pdf'
          // Charts
          if (id.includes('chart.js')) return 'charts'
          // Solidity
          if (id.includes('solidity') || id.includes('compiler')) return 'solidity'
          // Everything else
          return 'vendor'
        }
      }
    }
  },
})
