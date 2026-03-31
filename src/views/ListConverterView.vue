<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Button } from '@/components/ui/button'

const inputList = ref('')
const outputList = ref('')
const inputFormat = ref('comma')
const outputFormat = ref('newline')
const sortList = ref(false)
const uniqueOnly = ref(false)

const parseList = (text: string, format: string): string[] => {
  if (!text.trim()) return []

  switch (format) {
    case 'comma':
      return text
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    case 'newline':
      return text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    case 'space':
      return text.split(/\s+/).filter(Boolean)
    case 'semicolon':
      return text
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean)
    case 'tab':
      return text
        .split('\t')
        .map((s) => s.trim())
        .filter(Boolean)
    default:
      return text
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
  }
}

const formatList = (items: string[], format: string): string => {
  switch (format) {
    case 'comma':
      return items.join(', ')
    case 'newline':
      return items.join('\n')
    case 'space':
      return items.join(' ')
    case 'semicolon':
      return items.join('; ')
    case 'tab':
      return items.join('\t')
    case 'json':
      return JSON.stringify(items, null, 2)
    default:
      return items.join('\n')
  }
}

const convert = () => {
  let items = parseList(inputList.value, inputFormat.value)

  if (uniqueOnly.value) {
    items = [...new Set(items)]
  }

  if (sortList.value) {
    items.sort((a, b) => a.localeCompare(b))
  }

  outputList.value = formatList(items, outputFormat.value)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">List Converter</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle class="text-sm">Input Format</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            v-model="inputFormat"
            class="w-full h-10 rounded-md border border-input bg-background px-3"
          >
            <option value="comma">Comma separated</option>
            <option value="newline">Newline separated</option>
            <option value="space">Space separated</option>
            <option value="semicolon">Semicolon separated</option>
            <option value="tab">Tab separated</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-sm">Output Format</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            v-model="outputFormat"
            class="w-full h-10 rounded-md border border-input bg-background px-3"
          >
            <option value="comma">Comma separated</option>
            <option value="newline">Newline separated</option>
            <option value="space">Space separated</option>
            <option value="semicolon">Semicolon separated</option>
            <option value="tab">Tab separated</option>
            <option value="json">JSON array</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-sm">Options</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="sortList" />
            <span class="text-sm">Sort alphabetically</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="uniqueOnly" />
            <span class="text-sm">Remove duplicates</span>
          </label>
        </CardContent>
      </Card>

      <Card class="flex items-center justify-center">
        <Button @click="convert" class="w-full">Convert</Button>
      </Card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="inputList"
            language="plaintext"
            class="h-full"
            placeholder="Enter list items..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="outputList"
            language="plaintext"
            readonly
            class="h-full"
            placeholder="Converted list will appear here..."
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
