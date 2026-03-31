<script setup lang="ts">
import { ref, watch } from 'vue'
import yaml from 'js-yaml'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'

const tomlInput = ref('')
const yamlOutput = ref('')
const error = ref('')

// Simple TOML parser
const parseToml = (toml: string): any => {
  const result: any = {}
  const lines = toml.split('\n')
  let currentSection = result
  let currentSectionName = ''

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) continue

    const sectionMatch = trimmed.match(/^\[([^\]]+)\]$/)
    if (sectionMatch && sectionMatch[1]) {
      currentSectionName = sectionMatch[1]
      const parts = currentSectionName.split('.')
      currentSection = result
      for (const part of parts) {
        if (!currentSection[part]) {
          currentSection[part] = {}
        }
        currentSection = currentSection[part]
      }
      continue
    }

    const kvMatch = trimmed.match(/^([^=]+)=(.+)$/)
    if (kvMatch && kvMatch[1] && kvMatch[2]) {
      const key = kvMatch[1].trim()
      const rawValue = kvMatch[2].trim()

      let value: any = rawValue

      if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
        value = rawValue.slice(1, -1).replace(/\\"/g, '"')
      } else if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
        value = JSON.parse(rawValue)
      } else if (rawValue === 'true') {
        value = true
      } else if (rawValue === 'false') {
        value = false
      } else if (!isNaN(Number(rawValue))) {
        value = Number(rawValue)
      }

      currentSection[key] = value
    }
  }

  return result
}

watch(tomlInput, () => {
  try {
    error.value = ''
    if (!tomlInput.value.trim()) {
      yamlOutput.value = ''
      return
    }
    const parsed = parseToml(tomlInput.value)
    yamlOutput.value = yaml.dump(parsed, { indent: 2, lineWidth: -1 })
  } catch (e: any) {
    error.value = e.message || 'Invalid TOML'
    yamlOutput.value = ''
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">TOML to YAML Converter</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>TOML Input</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="tomlInput"
            language="plaintext"
            class="h-full"
            placeholder="Enter TOML..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>YAML Output</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="yamlOutput"
            language="yaml"
            readonly
            class="h-full"
            placeholder="YAML output will appear here..."
          />
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
