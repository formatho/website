<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from './button'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  loading: false,
  disabled: false
})

const isDisabled = computed(() => props.disabled || props.loading)

// Spinner color based on variant
const spinnerColorClass = computed(() => {
  if (props.variant === 'outline' || props.variant === 'ghost' || props.variant === 'link') {
    return 'text-primary'
  }
  return 'text-primary-foreground'
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="isDisabled"
    :class="cn(
      buttonVariants({ variant, size }), 
      props.class,
      loading && 'cursor-wait opacity-90'
    )"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      :class="cn('animate-spin h-4 w-4', spinnerColorClass)"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </Primitive>
</template>
