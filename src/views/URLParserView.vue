<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Link, Copy, Check, ExternalLink, RefreshCw } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'

const urlInput = ref('')
const copied = ref<string | null>(null)

// Encode/Decode utility
const rawText = ref('')
const encodedText = ref('')
const isEncoding = ref(true) // true = raw to encoded, false = encoded to raw

// Watch rawText for changes (encoding)
watch(rawText, (newValue) => {
  if (isEncoding.value) {
    try {
      encodedText.value = encodeURIComponent(newValue)
    } catch {
      encodedText.value = ''
    }
  }
})

// Watch encodedText for changes (decoding)
watch(encodedText, (newValue) => {
  if (!isEncoding.value) {
    try {
      rawText.value = decodeURIComponent(newValue)
    } catch {
      rawText.value = ''
    }
  }
})

const handleRawInput = () => {
  isEncoding.value = true
}

const handleEncodedInput = () => {
  isEncoding.value = false
}

const parsedUrl = computed(() => {
  if (!urlInput.value) return null

  try {
    const url = new URL(urlInput.value)
    return url
  } catch {
    return null
  }
})

const params = computed(() => {
  if (!parsedUrl.value) return []

  const searchParams = new URLSearchParams(parsedUrl.value.search)
  return Array.from(searchParams.entries())
})

const components = computed(() => {
  if (!parsedUrl.value) return {}

  const url = parsedUrl.value

  return {
    Protocol: url.protocol.replace(':', ''),
    Hostname: url.hostname,
    Port: url.port || '(default)',
    Pathname: url.pathname || '/',
    Search: url.search || '(none)',
    Hash: url.hash || '(none)',
    Origin: url.origin,
    'Full URL': url.href,
    Username: url.username || '(none)',
    Password: url.password ? '•••••' : '(none)'
  }
})

const examples = [
  { label: 'Simple', url: 'https://example.com' },
  { label: 'With Port', url: 'https://example.com:8080/path/to/page' },
  { label: 'Query Params', url: 'https://example.com/search?q=hello&page=1' },
  { label: 'Auth', url: 'https://user:pass@example.com/api/v1' },
  { label: 'Hash', url: 'https://example.com/page#section-1' },
  { label: 'Localhost', url: 'http://localhost:3000/api?key=123&callback=func' }
]

const copyComponent = (type: string) => {
  const value = components.value[type as keyof typeof components.value]
  if (value !== undefined) {
    navigator.clipboard.writeText(value)
    copied.value = type
    setTimeout(() => (copied.value = null), 2000)
  }
}

const openUrl = () => {
  if (parsedUrl.value) {
    window.open(parsedUrl.value.href, '_blank')
  }
}

const copyParam = (value: string, key: string) => {
  navigator.clipboard.writeText(value)
  copied.value = key
  setTimeout(() => (copied.value = null), 2000)
}

const clearAll = () => {
  urlInput.value = ''
}

const swapEncodeDecode = () => {
  const temp = rawText.value
  rawText.value = encodedText.value
  encodedText.value = temp
}
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3 text-gray-900 dark:text-gray-100">
          <Link class="w-8 h-8" />
          URL Parser
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Parse and analyze URLs to extract components and query parameters.
        </p>
      </div>

      <!-- Input -->
      <Card class="mb-6 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle class="text-gray-900 dark:text-gray-100">URL Input</CardTitle>
          <CardDescription>Enter a URL to parse</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex gap-4">
            <input
              v-model="urlInput"
              type="url"
              placeholder="https://example.com/path?query=value"
              class="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
            />
            <Button 
              v-if="urlInput" 
              @click="clearAll" aria-label="Clear all fields" 
              variant="outline"
              class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border-gray-200 dark:border-gray-700"
            >
              <RefreshCw class="w-4 h-4" />
            </Button>
            <Button 
              v-if="parsedUrl" 
              @click="openUrl" aria-label="Open URL in browser" 
              variant="outline"
              class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border-gray-200 dark:border-gray-700"
            >
              <ExternalLink class="w-4 h-4 mr-2" />
              Open
            </Button>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">Examples:</span>
            <Button
              v-for="example in examples"
              :key="example.url"
              @click="urlInput = example.url"
              variant="ghost"
              size="sm"
              class="font-mono text-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {{ example.label }}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" v-if="parsedUrl">
        <!-- Components -->
        <Card class="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle class="text-gray-900 dark:text-gray-100">URL Components</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div
              v-for="(value, type) in components"
              :key="type"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 dark:hover:border-gray-700 group cursor-pointer"
              @click="copyComponent(type)" aria-label="Copy URL component"
            >
              <div class="flex-1">
                <div class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 font-medium">{{ type }}</div>
                <div class="font-mono text-sm text-gray-900 dark:text-gray-100 break-all">{{ value }}</div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                class="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <component :is="copied === type ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Query Parameters -->
        <Card class="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle class="text-gray-900 dark:text-gray-100">Query Parameters</CardTitle>
            <CardDescription>{{ params.length }} parameter(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div v-if="params.length > 0" class="space-y-2">
              <div
                v-for="[key, value] in params"
                :key="key"
                class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 dark:hover:border-gray-700 group cursor-pointer"
                @click="copyParam(value, key)"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <div class="text-gray-900 dark:text-gray-100 font-medium">{{ key }}</div>
                    <div class="font-mono text-sm mt-1 break-all text-gray-600 dark:text-gray-400">{{ value || '(empty)' }}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    class="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <component :is="copied === key ? Check : Copy" class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-400 dark:text-gray-500">
              No query parameters
            </div>
          </CardContent>
        </Card>
      </div>

      <Card v-else-if="urlInput" class="border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <CardContent class="py-8 text-center text-red-600 dark:text-red-400 font-medium">
          Invalid URL format
        </CardContent>
      </Card>

      <div v-else class="text-center py-16 text-gray-400 dark:text-gray-500">
        <Link class="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Enter a URL above to parse its components</p>
      </div>

      <!-- Encode/Decode Utility Section -->
      <Card class="mt-8 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="text-gray-900 dark:text-gray-100">URL Encode/Decode Utility</CardTitle>
              <CardDescription>
                Convert text to URL-encoded format and vice versa
              </CardDescription>
            </div>
            <Button 
              @click="swapEncodeDecode" 
              variant="outline"
              size="sm"
              class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border-gray-200 dark:border-gray-700"
            >
              <RefreshCw class="w-4 h-4 mr-2" />
              Swap
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Raw Text -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Raw Text</label>
                <Button
                  @click="navigator.clipboard.writeText(rawText)"
                  variant="ghost"
                  size="sm"
                  :disabled="!rawText"
                  class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                >
                  <Copy class="w-4 h-4" />
                </Button>
              </div>
              <CodeEditor
                v-model="rawText"
                language="plaintext"
                class="min-h-[200px]"
                placeholder="Enter raw text to encode..."
              />
            </div>

            <!-- Encoded Text -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">URL-Encoded Text</label>
                <Button
                  @click="navigator.clipboard.writeText(encodedText)"
                  variant="ghost"
                  size="sm"
                  :disabled="!encodedText"
                  class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                >
                  <Copy class="w-4 h-4" />
                </Button>
              </div>
              <CodeEditor
                v-model="encodedText"
                language="plaintext"
                class="min-h-[200px]"
                placeholder="Enter encoded text to decode..."
              />
            </div>
          </div>

          <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <strong class="text-gray-900 dark:text-gray-100">Tip:</strong> Type in either field to automatically convert. Raw text uses
              <code class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-xs font-mono">encodeURIComponent()</code> and encoded
              text uses
              <code class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-xs font-mono">decodeURIComponent()</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
