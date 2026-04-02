<script setup lang="ts">
/**
 * CodeEditor.vue
 * Reusable Monaco Editor wrapper for Formatho
 * Premium dark-mode SaaS aesthetic with language support
 */
import { ref, computed, watch, onMounted } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'

// Configure Monaco workers via CDN (works with SSG/Vite)
onMounted(() => {
  self.MonacoEnvironment = {
    getWorkerUrl(_: unknown, label: string) {
      const base = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min'
      if (label === 'json') return `${base}/vs/language/json/json.worker.js`
      if (label === 'css' || label === 'scss' || label === 'less') return `${base}/vs/language/css/css.worker.js`
      if (label === 'html' || label === 'handlebars' || label === 'razor') return `${base}/vs/language/html/html.worker.js`
      if (label === 'typescript' || label === 'javascript') return `${base}/vs/language/typescript/ts.worker.js`
      return `${base}/vs/editor/editor.worker.js`
    }
  }
})

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
  minHeight: '200px',
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
const content = ref(props.modelValue)

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
// Monaco Configuration
// ============================================================
const options = computed(() => ({
  // Theme
  theme: 'vs-dark',
  
  // Basic options
  readOnly: props.readonly,
  language: props.language,
  fontSize: props.fontSize,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  
  // Layout
  minimap: { enabled: props.showMinimap },
  lineNumbers: props.lineNumbers,
  wordWrap: props.wordWrap,
  
  // Appearance
  scrollBeyondLastLine: false,
  renderLineHighlight: 'line',
  cursorBlinking: 'smooth',
  
  // Behavior
  automaticLayout: true,
  tabSize: 2,
  insertSpaces: true,
  
  // Scrollbar
  scrollbar: {
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
    useShadows: false
  },
  
  // Padding
  padding: { top: 16, bottom: 16 },
  
  // Features
  folding: true,
  bracketPairColorization: { enabled: true },
  contextmenu: true,
  quickSuggestions: true
}))

// ============================================================
// Event Handlers
// ============================================================
const handleChange = (value: string | undefined) => {
  const newValue = value || ''
  content.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<template>
  <div class="code-editor-wrapper rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
    <!-- Language Badge -->
    <div class="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 border-b border-slate-700">
      <span class="text-xs text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-700/50">
        {{ language.toUpperCase() }}
      </span>
    </div>
    
    <!-- Monaco Editor -->
    <div :style="{ minHeight, maxHeight, overflow: 'auto' }">
      <VueMonacoEditor
        v-model:value="content"
        :language="language"
        :options="options"
        :height="minHeight"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<style scoped>
.code-editor-wrapper :deep(.monaco-editor) {
  border-radius: 0;
}

.code-editor-wrapper :deep(.monaco-editor .margin) {
  background-color: transparent;
}
</style>
