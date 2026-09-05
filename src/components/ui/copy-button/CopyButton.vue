<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

/**
 * CopyButton — the one clipboard-copy implementation for the whole site.
 * Copies `text` (or the result of `text()` for lazily computed values),
 * swaps to a check icon for 1.5s, and resets. Clipboard failures fail
 * silently (unavailable permissions) — never block the UI on them.
 */
const props = withDefaults(
  defineProps<{
    /** Value to copy — string or a function returning one (called at click time). */
    text: string | (() => string)
    /** Accessible label announced to screen readers. */
    ariaLabel?: string
    /** Optional visible text next to the icon. */
    label?: string
    /** Text shown while copied (defaults to label). */
    copiedLabel?: string
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    /** Revert the check icon after this many ms. */
    resetMs?: number
  }>(),
  {
    ariaLabel: 'Copy to clipboard',
    label: '',
    copiedLabel: undefined,
    variant: 'outline',
    size: 'sm',
    resetMs: 1500
  }
)

const copied = ref(false)

async function copy() {
  const value = typeof props.text === 'function' ? props.text() : props.text
  try {
    await navigator.clipboard.writeText(value)
    copied.value = true
    setTimeout(() => (copied.value = false), props.resetMs)
  } catch {
    /* clipboard unavailable — ignore */
  }
}
</script>

<template>
  <Button :variant="variant" :size="size" :aria-label="ariaLabel" @click="copy">
    <Check v-if="copied" class="w-4 h-4" :class="label ? 'mr-1' : ''" />
    <Copy v-else class="w-4 h-4" :class="label ? 'mr-1' : ''" />
    <template v-if="label">{{ copied ? (copiedLabel ?? label) : label }}</template>
  </Button>
</template>
