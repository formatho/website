<script setup lang="ts">
import { inject, computed, type Ref } from 'vue'

interface TabsTriggerProps {
  value: string
}

const props = defineProps<TabsTriggerProps>()

const tabsContext = inject<{
  activeTab: Ref<string>
  setActiveTab: (value: string) => void
}>('tabs')

const isActive = computed(() => tabsContext?.activeTab.value === props.value)

const handleClick = () => {
  tabsContext?.setActiveTab(props.value)
}
</script>

<template>
  <button
    @click="handleClick"
    :role="'tab'"
    :aria-selected="isActive"
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      isActive
        ? 'bg-primary text-primary-foreground shadow-sm'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
    ]"
  >
    <slot />
  </button>
</template>
