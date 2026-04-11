<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface RelatedTool {
  name: string
  description: string
  route: string
  emoji?: string
}

defineProps<{
  tools: RelatedTool[]
  title?: string
}>()
</script>

<template>
  <div class="related-tools">
    <h3 v-if="title" class="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
      {{ title }}
    </h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
      <RouterLink
        v-for="tool in tools"
        :key="tool.route"
        :to="tool.route"
        class="group flex items-start gap-2 p-3 border border-foreground/10 hover:border-foreground bg-background transition-all hover:shadow-[2px_2px_0px_#000]"
      >
        <span v-if="tool.emoji" class="text-base flex-shrink-0">{{ tool.emoji }}</span>
        <div>
          <p class="text-sm font-semibold leading-tight group-hover:underline">{{ tool.name }}</p>
          <p class="text-xs text-muted-foreground mt-0.5 line-clamp-1">{{ tool.description }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
