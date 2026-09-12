<script setup lang="ts">
import { provide, ref, watch } from 'vue'

interface TabsProps {
  defaultValue?: string
  modelValue?: string
}

const props = defineProps<TabsProps>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const activeTab = ref(props.modelValue || props.defaultValue || '')

const setActiveTab = (value: string) => {
  activeTab.value = value
  emit('update:modelValue', value)
}

watch(() => props.modelValue, (v) => {
  if (v && v !== activeTab.value) activeTab.value = v
})

provide('tabs', {
  activeTab,
  setActiveTab
})
</script>

<template>
  <div class="tabs-container">
    <slot />
  </div>
</template>
