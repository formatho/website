<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ArrowRight } from 'lucide-vue-next'

// Import tools data
import { tools } from '../data/tools'

// Flatten tools array for search
interface ToolItem {
  name: string
  description: string
  route: string
  category: string
}

const allTools = computed<ToolItem[]>(() => {
  return tools.flatMap(category =>
    category.items.map(tool => ({
      name: tool.name,
      description: tool.description,
      route: tool.route,
      category: category.category
    }))
  )
})

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)

// Filter tools based on search query
const filteredTools = computed<ToolItem[]>(() => {
  if (!searchQuery.value.trim()) {
    return allTools.value.slice(0, 10) // Show first 10 tools when empty
  }

  const query = searchQuery.value.toLowerCase()
  return allTools.value.filter(tool =>
    tool.name.toLowerCase().includes(query) ||
    tool.description.toLowerCase().includes(query) ||
    tool.category.toLowerCase().includes(query)
  ).slice(0, 20) // Limit to 20 results
})

// Auto-focus input when modal opens
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    searchQuery.value = ''
    selectedIndex.value = 0
    await nextTick()
    searchInput.value?.focus()
  }
})

// Navigate to tool and close modal
const selectTool = (tool: ToolItem) => {
  router.push(tool.route)
  emit('close')
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredTools.value.length - 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      break
    case 'Enter':
      e.preventDefault()
      if (filteredTools.value[selectedIndex.value]) {
        selectTool(filteredTools.value[selectedIndex.value])
      }
      break
    case 'Escape':
      e.preventDefault()
      emit('close')
      break
  }
}

// Global keyboard shortcut listener (Cmd+K / Ctrl+K)
const handleGlobalKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    emit('close') // This will toggle the modal if handled by parent
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

// Close modal on backdrop click
const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

// Highlight matching text
const highlightMatch = (text: string): string => {
  if (!searchQuery.value.trim()) return text

  const query = searchQuery.value.trim().toLowerCase()
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi')
  return text.replace(regex, '<mark class="bg-primary/20 text-gray-900 px-0.5 rounded">$1</mark>')
}

const escapeRegex = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32"
        @click="handleBackdropClick"
        @keydown="handleKeydown"
      >
        <div
          class="glass-panel w-full max-w-2xl mx-4 rounded-xl shadow-2xl overflow-hidden"
          @click.stop
        >
          <!-- Search Input -->
          <div class="p-4 border-b border-border/50">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search tools... (e.g., JSON, Base64, UUID)"
                class="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gray-900/50 focus:border-gray-900/50 transition-all"
              />
              <kbd class="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-muted rounded text-muted-foreground">
                ESC
              </kbd>
            </div>
          </div>

          <!-- Results List -->
          <div class="max-h-[60vh] overflow-y-auto">
            <ul v-if="filteredTools.length > 0" class="divide-y divide-border/50">
              <li
                v-for="(tool, index) in filteredTools"
                :key="tool.route"
                @click="selectTool(tool)"
                :class="[
                  'flex items-start gap-3 p-4 cursor-pointer transition-all',
                  'hover:bg-primary/5',
                  index === selectedIndex ? 'bg-primary/10' : ''
                ]"
              >
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3
                      class="text-sm font-semibold text-gray-900 truncate"
                      v-html="highlightMatch(tool.name)"
                    />
                  </div>
                  <p
                    class="text-sm text-muted-foreground line-clamp-2"
                    v-html="highlightMatch(tool.description)"
                  />
                  <span class="text-xs text-muted-foreground mt-1 inline-block">
                    {{ tool.category }}
                  </span>
                </div>
                <ArrowRight
                  v-if="index === selectedIndex"
                  class="w-4 h-4 text-gray-900 flex-shrink-0 mt-1"
                />
              </li>
            </ul>

            <!-- No Results -->
            <div
              v-else
              class="p-8 text-center text-muted-foreground"
            >
              <Search class="w-12 h-12 mx-auto mb-3 text-gray-900 opacity-50" />
              <p class="text-lg font-medium">No tools found</p>
              <p class="text-sm mt-1">Try a different search term</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-3 border-t border-border/50 bg-muted/30">
            <div class="flex items-center justify-between text-xs text-muted-foreground">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 bg-background rounded">↑</kbd>
                  <kbd class="px-1.5 py-0.5 bg-background rounded">↓</kbd>
                  to navigate
                </span>
                <span class="flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 bg-background rounded">Enter</kbd>
                  to open
                </span>
              </div>
              <span>{{ filteredTools.length }} {{ filteredTools.length === 1 ? 'result' : 'results' }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
mark {
  background-color: hsl(var(--primary) / 0.2);
  color: hsl(var(--foreground));
  padding: 0 2px;
  border-radius: 2px;
}
</style>
