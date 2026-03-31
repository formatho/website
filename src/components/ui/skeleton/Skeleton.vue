<script setup lang="ts">
/**
 * Skeleton.vue
 * Premium skeleton loader for async content
 * Prevents layout jumps during data fetching
 */
import { computed } from 'vue'

interface Props {
  class?: string
  width?: string
  height?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  animate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  width: '100%',
  height: '1rem',
  rounded: 'md',
  animate: true
})

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const classes = computed(() => [
  'bg-slate-200 dark:bg-slate-700',
  roundedClasses[props.rounded],
  props.animate && 'animate-pulse',
  props.class
].filter(Boolean).join(' '))
</script>

<template>
  <div
    :class="classes"
    :style="{ width, height }"
    aria-hidden="true"
  />
</template>
