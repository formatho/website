<script setup lang="ts">
/**
 * Renders a consistent 2D monochrome Lucide icon for each tool category.
 * Used across HomeView, CategoryView, and ToolsView for visual consistency.
 */
import { computed } from 'vue'
import {
  Boxes,
  ShieldCheck,
  Database,
  Code2,
  ArrowLeftRight,
  Globe
} from 'lucide-vue-next'

const props = defineProps<{ slug: string; size?: number }>()

const iconMap: Record<string, typeof Boxes> = {
  web3: Boxes,
  security: ShieldCheck,
  'data-formats': Database,
  developer: Code2,
  converters: ArrowLeftRight,
  network: Globe
}

const icon = computed(() => iconMap[props.slug] || Boxes)
const dimension = computed(() => props.size || 24)
</script>

<template>
  <component :is="icon" :size="dimension" class="text-foreground" stroke-width="1.5" />
</template>
