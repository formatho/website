<script setup lang="ts">
import { Shield, Lock, Zap, Github } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4 py-6">
    <div
      v-for="badge in [
        { icon: Shield, label: '100% Private' },
        { icon: Lock, label: 'Zero Tracking' },
        { icon: Zap, label: 'Lightning Fast' },
      ]"
      :key="badge.label"
      class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/15 rounded-lg"
    >
      <component :is="badge.icon" class="w-4 h-4 text-primary" />
      <span class="text-sm font-medium text-foreground">{{ badge.label }}</span>
    </div>

    <a
      href="https://github.com/formatho/website"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/15 rounded-lg hover:bg-primary/10 transition-colors"
    >
      <Github class="w-4 h-4 text-primary" />
      <span class="text-sm font-medium text-foreground">Open Source</span>
    </a>
  </div>
</template>
