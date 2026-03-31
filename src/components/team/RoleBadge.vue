<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Role = 'owner' | 'admin' | 'member' | 'viewer'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  role: Role
  size?: Size
}>(), {
  size: 'md'
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-2 py-0.5 text-xs'
    case 'lg': return 'px-3 py-1 text-base'
    default: return 'px-2.5 py-0.5 text-sm'
  }
})

const roleClasses = computed(() => {
  switch (props.role) {
    case 'owner':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    case 'admin':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    case 'member':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case 'viewer':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
  }
})

const roleLabel = computed(() => {
  return props.role.charAt(0).toUpperCase() + props.role.slice(1)
})
</script>

<template>
  <span
    :class="cn(
      'inline-flex items-center font-medium rounded-full capitalize',
      sizeClasses,
      roleClasses
    )"
  >
    {{ roleLabel }}
  </span>
</template>
