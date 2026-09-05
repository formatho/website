<script setup lang="ts">
import { inject, computed, type Ref } from 'vue'

interface TabsContentProps {
  value: string
}

const props = defineProps<TabsContentProps>()

const tabsContext = inject<{
  activeTab: Ref<string>
  setActiveTab: (value: string) => void
}>('tabs')

const isActive = computed(() => tabsContext?.activeTab.value === props.value)
</script>

<template>
  <div v-show="isActive" role="tabpanel" class="mt-4">
    <slot />
  </div>
</template>
