<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Copy, Check, Trash2, AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  title: string
  description?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Enter your content here...',
  description: ''
})

// Inject SoftwareApplication structured data for SEO
onMounted(() => {
  const existingLd = document.getElementById('tool-json-ld')
  if (existingLd) existingLd.remove()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: props.title,
    description: props.description || `${props.title} - Free online privacy-first developer tool by Formatho`,
    url: `https://formatho.com/tools${window.location.pathname}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Organization',
      name: 'Formatho',
      url: 'https://formatho.com'
    }
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = 'tool-json-ld'
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
})

const emit = defineEmits<{
  input: [value: string]
  clear: []
}>()

const inputValue = ref('')
const outputValue = ref('')
const error = ref('')
const isCopied = ref(false)
const isValid = ref(false)

// Computed classes for different states
const inputStateClass = computed(() => {
  if (error.value) return 'border-destructive focus:ring-destructive'
  if (isValid.value) return 'border-success focus:ring-success'
  return 'border-border focus:ring-primary'
})

// Methods
const handleInput = (value: string) => {
  inputValue.value = value
  error.value = ''
  emit('input', value)
}

const handleClear = () => {
  inputValue.value = ''
  outputValue.value = ''
  error.value = ''
  isValid.value = false
  emit('clear')
}

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(outputValue.value)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Expose methods for parent components
defineExpose({
  setInput: (value: string) => {
    inputValue.value = value
  },
  setOutput: (value: string) => {
    outputValue.value = value
  },
  setError: (message: string) => {
    error.value = message
    isValid.value = false
  },
  setValid: () => {
    error.value = ''
    isValid.value = true
  },
  reset: () => {
    handleClear()
  },
  getInput: () => inputValue.value,
  getOutput: () => outputValue.value
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Tool Header -->
    <div class="border-b border-border/50 bg-muted/30">
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-6xl mx-auto">
          <div class="flex items-start justify-between">
            <div class="space-y-2">
              <h1 class="text-3xl md:text-4xl font-bold gradient-text">{{ title }}</h1>
              <p v-if="description" class="text-muted-foreground text-sm md:text-base">
                {{ description }}
              </p>
            </div>
            <Button
              v-if="inputValue || outputValue"
              variant="ghost"
              size="sm"
              @click="handleClear"
              class="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive"
              aria-label="Clear all input and output"
            >
              <Trash2 class="w-4 h-4" />
              <span class="hidden sm:inline">Clear</span>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tool Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Input Panel -->
          <div class="flex flex-col space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold flex items-center gap-2">
                <span>Input</span>
                <span v-if="isValid" class="flex items-center gap-1 text-xs text-success">
                  <Check class="w-3 h-3" />
                  Valid
                </span>
              </h2>
              <Button
                v-if="inputValue"
                variant="ghost"
                size="sm"
                @click="handleClear"
                class="h-8 px-2"
                aria-label="Clear input"
              >
                <Trash2 class="w-4 h-4" />
              </Button>
            </div>

            <div class="relative flex-1">
              <Textarea
                v-model="inputValue"
                :placeholder="placeholder"
                class="min-h-[400px] font-mono text-sm resize-none custom-scrollbar"
                :class="inputStateClass"
                @input="handleInput($event.target.value)"
              />
            </div>

            <!-- Error Message -->
            <div
              v-if="error"
              class="flex items-start gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              <AlertCircle class="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div class="flex-1">
                <p class="text-sm font-semibold text-destructive">Error</p>
                <p class="text-sm text-destructive/90 mt-1">{{ error }}</p>
              </div>
            </div>

            <!-- Character Count -->
            <div class="flex items-center justify-between text-xs text-muted-foreground">
              <span>{{ inputValue.length }} characters</span>
              <span>{{ inputValue.split('\n').length }} lines</span>
            </div>
          </div>

          <!-- Output Panel -->
          <div class="flex flex-col space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Output</h2>
              <Button
                v-if="outputValue"
                variant="outline"
                size="sm"
                @click="handleCopy"
                class="h-8 flex items-center gap-2"
                aria-label="Copy output to clipboard"
              >
                <Copy v-if="!isCopied" class="w-4 h-4" />
                <Check v-else class="w-4 h-4 text-success" />
                <span class="hidden sm:inline">{{ isCopied ? 'Copied!' : 'Copy' }}</span>
              </Button>
            </div>

            <div class="relative flex-1 min-h-[400px]">
              <div
                class="w-full h-full p-4 font-mono text-sm bg-card/50 border border-border rounded-lg custom-scrollbar overflow-auto"
                :class="{ 'bg-muted/30': !outputValue }"
              >
                <pre v-if="outputValue" class="whitespace-pre-wrap break-all">{{
                  outputValue
                }}</pre>
                <p v-else class="text-muted-foreground/50 italic">Output will appear here...</p>
              </div>
            </div>

            <!-- Output Stats -->
            <div class="flex items-center justify-between text-xs text-muted-foreground">
              <span>{{ outputValue.length }} characters</span>
              <span>{{ outputValue.split('\n').length }} lines</span>
            </div>
          </div>
        </div>

        <!-- Slot for additional tool options -->
        <div v-if="$slots.options" class="mt-8 pt-8 border-t border-border">
          <slot name="options"></slot>
        </div>

        <!-- Slot for additional content -->
        <div v-if="$slots.content" class="mt-8">
          <slot name="content"></slot>
        </div>

        <!-- Agent Todo Cross-Sell Banner -->
        <div class="mt-12 rounded-xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/10 p-6 md:p-8">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="flex-1 text-center md:text-left">
              <h3 class="text-xl font-bold mb-2">🤖 Give Your AI Agents Persistent Memory</h3>
              <p class="text-muted-foreground text-sm">
                Your agents forget tasks between sessions. Agent Todo gives them a persistent task queue with REST API, priority management, and agent identity tracking. Free forever for solo developers.
              </p>
            </div>
            <a
              href="https://todo.formatho.com"
              target="blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Try Agent Todo Free →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
