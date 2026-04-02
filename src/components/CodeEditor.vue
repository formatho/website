<script setup lang="ts">
/**
 * CodeEditor.vue
 * Lightweight textarea-based code editor for Formatho
 * Replaces Monaco Editor for reliability and performance
 */
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

// ============================================================
// Props
// ============================================================
interface Props {
  modelValue: string
  language?: string
  readonly?: boolean
  minHeight?: string
  maxHeight?: string
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval'
  wordWrap?: 'on' | 'off' | 'bounded' | 'wordWrapColumn'
  fontSize?: number
  showMinimap?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  language: 'json',
  readonly: false,
  minHeight: '120px',
  maxHeight: '500px',
  lineNumbers: 'on',
  wordWrap: 'on',
  fontSize: 14,
  showMinimap: false
})

// ============================================================
// Emits
// ============================================================
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
}>()

// ============================================================
// Editor State
// ============================================================
const textarea = ref<HTMLTextAreaElement | null>(null)
const content = ref(props.modelValue)
const isFocused = ref(false)

// Sync external changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== content.value) {
      content.value = newValue
    }
  }
)

// ============================================================
// Line Count
// ============================================================
const lineCount = computed(() => {
  return content.value.split('\n').length
})

// ============================================================
// Event Handlers
// ============================================================
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const newValue = target.value
  content.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleFocus = () => { isFocused.value = true }
const handleBlur = () => { isFocused.value = false }

// Handle tab key for indentation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.preventDefault()
    const textarea = event.target as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newValue = content.value.substring(0, start) + '  ' + content.value.substring(end)
    content.value = newValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
    nextTick(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 2
    })
  }
}

// Auto-resize
const adjustHeight = () => {
  const el = textarea.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.max(parseInt(props.minHeight), el.scrollHeight) + 'px'
}

onMounted(() => {
  adjustHeight()
})

watch(content, () => {
  nextTick(adjustHeight)
})
</script>

<template>
  <div
    class="code-editor-wrapper rounded-lg overflow-hidden border transition-colors duration-200"
    :class="isFocused ? 'border-slate-500' : 'border-slate-700'"
  >
    <!-- Header Bar -->
    <div class="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 border-b border-slate-700">
      <span class="text-xs text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-700/50">
        {{ language.toUpperCase() }}
      </span>
      <span class="text-xs text-slate-500">
        {{ lineCount }} lines
      </span>
    </div>

    <!-- Editor Area with Line Numbers -->
    <div class="flex bg-slate-900" :style="{ minHeight, maxHeight: readonly ? minHeight : maxHeight, overflow: 'auto' }">
      <!-- Line Numbers -->
      <div
        v-if="lineNumbers === 'on'"
        class="flex-shrink-0 py-4 px-2 text-right select-none bg-slate-900/50 border-r border-slate-700/50"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <div
          v-for="i in lineCount"
          :key="i"
          class="text-slate-600 leading-6 font-mono"
        >
          {{ i }}
        </div>
      </div>

      <!-- Textarea -->
      <textarea
        ref="textarea"
        :value="content"
        :readonly="readonly"
        :class="[
          'w-full py-4 px-3 bg-transparent text-slate-200 resize-none outline-none',
          'font-mono leading-6 placeholder:text-slate-600',
          readonly ? 'cursor-default' : ''
        ]"
        :style="{ fontSize: fontSize + 'px', minHeight }"
        :placeholder="readonly ? 'No content' : 'Type here...'"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
      />
    </div>
  </div>
</template>

<style scoped>
.code-editor-wrapper textarea::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-editor-wrapper textarea::-webkit-scrollbar-track {
  background: transparent;
}

.code-editor-wrapper textarea::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}

.code-editor-wrapper textarea::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

.code-editor-wrapper textarea::selection {
  background: rgba(59, 130, 246, 0.3);
}
</style>
