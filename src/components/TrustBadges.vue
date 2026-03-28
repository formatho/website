<script setup lang="ts">
import { Shield, Lock, Zap, Heart, Github } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6 py-6">
    <!-- Privacy Badge -->
    <div class="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
      <Shield class="w-5 h-5 text-green-600" />
      <span class="text-sm font-medium text-green-700 dark:text-green-400">100% Private</span>
    </div>

    <!-- No Tracking Badge -->
    <div class="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <Lock class="w-5 h-5 text-blue-600" />
      <span class="text-sm font-medium text-blue-700 dark:text-blue-400">Zero Tracking</span>
    </div>

    <!-- Fast Badge -->
    <div class="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <Zap class="w-5 h-5 text-yellow-600" />
      <span class="text-sm font-medium text-yellow-700 dark:text-yellow-400">Lightning Fast</span>
    </div>

    <!-- Open Source Badge -->
    <a 
      href="https://github.com/formatho/website" 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <Github class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Open Source</span>
    </a>
  </div>
</template>
