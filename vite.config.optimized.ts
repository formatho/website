// Advanced Vite Configuration for Enterprise Performance
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { Plugin } from 'vite'

// Custom plugin for performance optimizations
function performanceOptimizations(): Plugin {
  return {
    name: 'performance-optimizations',
    config() {
      return {
        build: {
          // Enable minification
          minify: 'terser',
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          },
          // CSS code splitting
          cssCodeSplit: true,
          // Generate source maps for production debugging
          sourcemap: false,
          // Chunk size warnings
          chunkSizeWarningLimit: 500,
          rollupOptions: {
            output: {
              // Optimized chunk naming
              chunkFileNames: (chunkInfo) => {
                const facadeModuleId = chunkInfo.facadeModuleId 
                  ? chunkInfo.facadeModuleId.split('/').pop() 
                  : 'chunk'
                return `assets/${facadeModuleId}-[hash].js`
              },
              entryFileNames: 'assets/[name]-[hash].js',
              assetFileNames: 'assets/[name]-[hash].[ext]',
              
              // Advanced manual chunks
              manualChunks(id) {
                if (!id.includes('node_modules')) return undefined
                
                // Large libraries - split into separate chunks
                if (id.includes('jspdf') || id.includes('html2pdf') || id.includes('html2canvas')) {
                  return 'pdf'
                }
                if (id.includes('chart.js')) {
                  return 'charts'
                }
                if (id.includes('solidity') || id.includes('@ethereumjs/block')) {
                  return 'solidity'
                }
                if (id.includes('@polkadot')) {
                  return 'crypto-polkadot'
                }
                
                // Vue ecosystem
                if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
                  return 'vue-vendor'
                }
                
                // UI libraries
                if (id.includes('radix') || id.includes('headlessui')) {
                  return 'ui-vendor'
                }
                
                // Utility libraries
                if (id.includes('lodash') || id.includes('date-fns') || id.includes('axios')) {
                  return 'utils-vendor'
                }
                
                // Everything else in main vendor chunk
                return 'vendor'
              }
            }
          }
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nodePolyfills({
      include: ['buffer', 'stream', 'util', 'process'],
    }),
    performanceOptimizations(),
    
    // Bundle analyzer (only in analyze mode)
    process.env.ANALYZE ? visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }) : null,
    
    // Compression plugins
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Only compress files > 10KB
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ].filter(Boolean),
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
  define: {
    'global': 'globalThis',
    'process.env': '{}',
  },
  
  // Performance optimizations
  server: {
    hmr: {
      overlay: true,
    },
  },
  
  // Optimization settings
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
    ],
    exclude: [
      'solidity',
    ],
  },
  
  // Build performance
  build: {
    // Enable parallel processing
    reportCompressedSize: false,
    // Turn off brotli size reporting for faster builds
    brotliSize: false,
  },
})
