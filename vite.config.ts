import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nodePolyfills({
      include: ['buffer', 'stream', 'util', 'process'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'global': 'globalThis',
    'process.env': '{}',
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          // Only split truly huge/heavy deps; keep the rest together to avoid circular dep issues
          if (id.includes('jspdf') || id.includes('html2pdf') || id.includes('html2canvas')) return 'pdf'
          if (id.includes('chart.js')) return 'charts'
          if (id.includes('solidity') || id.includes('@ethereumjs/block')) return 'solidity'
          if (id.includes('@polkadot')) return 'crypto-polkadot'
          // Everything else in one vendor chunk
          return 'vendor'
        }
      }
    }
  },
})
