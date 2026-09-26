import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { execSync } from 'node:child_process'

// Inject git commit SHA at build time
const gitCommit = process.env.VITE_GIT_COMMIT || (() => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'unknown'
  }
})()

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __GIT_COMMIT__: JSON.stringify(gitCommit),
    'global': 'globalThis',
    'process.env': '{}',
  },
  plugins: [
    vue(),
    nodePolyfills({
      include: ['buffer', 'stream', 'util', 'process'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Force pngjs to use Node.js entry instead of browser.js with CommonJS loader
      'pngjs': 'pngjs/lib/png.js'
    }
  },
  optimizeDeps: {
    include: ['qrcode', 'pngjs'],
  },
  build: {
    // ES2018 so optional chaining / nullish coalescing are transpiled:
    // ES2020 output threw 'Unexpected token .' SyntaxErrors on older browsers
    // (Safari < 13.1, Chrome < 80, old in-app webviews), blanking the app.
    target: 'es2018',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
        // No manualChunks: a catch-all vendor bucket forces every node_modules
        // package into one eager chunk (~5 MB) because the entry imports a
        // helper from it. Letting Rollup place each library next to its lazy
        // importer keeps the entry graph small; shared libs get automatic
        // on-demand chunks.
      }
    }
  },
})
