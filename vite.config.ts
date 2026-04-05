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
          // Heavy deps: split into separate lazy-loaded chunks
          if (id.includes('monaco-editor')) return 'monaco'
          if (id.includes('gpt-tokenizer')) return 'gpt-tokenizer'
          if (id.includes('jspdf') || id.includes('html2pdf') || id.includes('html2canvas')) return 'pdf'
          if (id.includes('chart.js')) return 'charts'
          if (id.includes('viem') || id.includes('@wagmi')) return 'viem'
          if (id.includes('@solana/web3.js') || id.includes('@solana')) return 'solana'
          if (id.includes('solidity') || id.includes('@ethereumjs')) return 'solidity'
          if (id.includes('@polkadot')) return 'crypto-polkadot'
          if (id.includes('bpmn-js') || id.includes('bpmn-moddle')) return 'bpmn'
          if (id.includes('lucide-vue-next')) return 'lucide'
          if (id.includes('highlight.js') || id.includes('highlightjs')) return 'highlight'
          // Core framework
          if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia') || id.includes('@vueuse')) return 'vue-core'
          // Everything else
          return 'vendor'
        }
      }
    }
  },
})
