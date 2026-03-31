<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'

const jsonInput = ref('')
const tomlOutput = ref('')
const error = ref('')

const toToml = (obj: any, prefix = ''): string => {
  let result = ''

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (value === null) {
      continue
    } else if (typeof value === 'string') {
      result += `${fullKey} = "${value.replace(/"/g, '\\"')}"\n`
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      result += `${fullKey} = ${value}\n`
    } else if (Array.isArray(value)) {
      result += `${fullKey} = [${value
        .map((v) => (typeof v === 'string' ? `"${v}"` : v))
        .join(', ')}]\n`
    } else if (typeof value === 'object') {
      result += `\n[${fullKey}]\n`
      result += toToml(value, '')
    }
  }

  return result
}

watch(jsonInput, () => {
  try {
    error.value = ''
    if (!jsonInput.value.trim()) {
      tomlOutput.value = ''
      return
    }
    const parsed = JSON.parse(jsonInput.value)
    tomlOutput.value = toToml(parsed)
  } catch (e: any) {
    error.value = e.message || 'Invalid JSON'
    tomlOutput.value = ''
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">JSON to TOML Converter</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>JSON Input</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="jsonInput"
            language="json"
            class="h-full"
            placeholder="Enter JSON..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>TOML Output</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="tomlOutput"
            language="plaintext"
            readonly
            class="h-full"
            placeholder="TOML output will appear here..."
          />
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
