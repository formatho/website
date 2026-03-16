<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface Props {
  name: string
  to: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: ''
})
</script>

<template>
  <RouterLink
    :to="props.to"
    class="group block w-full rounded-lg border border-border/40 bg-card p-4 hover:border-gray-900/50 hover:bg-gray-900/5 transition-all duration-200"
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <div class="font-semibold text-foreground">{{ props.name }}</div>
        <div v-if="props.description" class="text-sm text-muted-foreground line-clamp-2">
          {{ props.description }}
        </div>
      </div>
      <div class="text-gray-900">
        <span class="sr-only">Open</span>
      </div>
    </div>
  </RouterLink>
</template>
