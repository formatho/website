<script setup lang="ts">
import { ref, computed } from 'vue'
import { Link, Copy, Check, ExternalLink } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const urlInput = ref('')
const copied = ref<string | null>(null)

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
  'https://example.com',
  'https://example.com:8080/path/to/page',
  'https://example.com/search?q=hello&page=1',
  'https://user:pass@example.com/api/v1',
  'https://example.com/page#section-1',
  'http://localhost:3000/api?key=123&callback=func'
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
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Link class="w-8 h-8" />
          URL Parser
        </h1>
        <p class="text-muted-foreground mt-2">
          Parse and analyze URLs to extract components and query parameters.
        </p>
      </div>

      <!-- Input -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle>URL Input</CardTitle>
          <CardDescription>Enter a URL to parse</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex gap-4">
            <input
              v-model="urlInput"
              type="url"
              placeholder="https://example.com/path?query=value"
              class="flex-1 px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button v-if="parsedUrl" @click="openUrl" variant="outline">
              <ExternalLink class="w-4 h-4 mr-2" />
              Open
            </Button>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="text-sm text-muted-foreground">Examples:</span>
            <Button
              v-for="example in examples"
              :key="example"
              @click="urlInput = example"
              variant="ghost"
              size="sm"
              class="font-mono text-xs"
            >
              {{ example.slice(0, 30) }}{{ example.length > 30 ? '...' : '' }}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" v-if="parsedUrl">
        <!-- Components -->
        <Card>
          <CardHeader>
            <CardTitle>URL Components</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div
              v-for="(value, type) in components"
              :key="type"
              class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
            >
              <div class="flex-1">
                <div class="text-sm text-muted-foreground mb-1">{{ type }}</div>
                <div class="font-mono text-sm break-all">{{ value }}</div>
              </div>
              <Button @click="copyComponent(type)" variant="ghost" size="sm">
                <component :is="copied === type ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Query Parameters -->
        <Card>
          <CardHeader>
            <CardTitle>Query Parameters</CardTitle>
            <CardDescription>{{ params.length }} parameter(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div v-if="params.length > 0" class="space-y-2">
              <div
                v-for="[key, value] in params"
                :key="key"
                class="p-3 bg-surface-hover rounded-lg border"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <div class="text-gray-900">{{ key }}</div>
                    <div class="font-mono text-sm mt-1 break-all">{{ value || '(empty)' }}</div>
                  </div>
                  <Button @click="copyParam(value, key)" variant="ghost" size="sm">
                    <component :is="copied === key ? Check : Copy" class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-muted-foreground">No query parameters</div>
          </CardContent>
        </Card>
      </div>

      <Card v-else-if="urlInput" class="border-red-500">
        <CardContent class="py-8 text-center text-red-500"> Invalid URL format </CardContent>
      </Card>

      <div v-else class="text-center py-16 text-muted-foreground">
        <Link class="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Enter a URL above to parse its components</p>
      </div>
    </div>
  </div>
</template>
