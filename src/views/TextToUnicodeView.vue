<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const inputText = ref('')
const conversionType = ref<'unicode' | 'html'>('unicode')

const unicodeOutput = computed(() => {
  return inputText.value
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0)
      return `U+${code.toString(16).toUpperCase().padStart(4, '0')}`
    })
    .join(' ')
})

const htmlOutput = computed(() => {
  return inputText.value
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0)
      return `&#${code};`
    })
    .join('')
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Text to Unicode Converter</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Convert Text to Unicode</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 space-y-4">
        <div class="grid gap-2">
          <Label>Input Text</Label>
          <Input v-model="inputText" aria-label="Text to convert to Unicode" placeholder="Enter text to convert..." />
        </div>

        <div class="grid gap-2">
          <Label>Output Format</Label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="conversionType" aria-label="Unicode output format" value="unicode" />
              <span>Unicode (U+XXXX)</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="conversionType" aria-label="HTML entities output format" value="html" />
              <span>HTML Entities (&amp;#XXX;)</span>
            </label>
          </div>
        </div>

        <div v-if="inputText" class="space-y-2">
          <Label>Output</Label>
          <div class="p-4 rounded-lg bg-muted font-mono text-sm break-all">
            {{ conversionType === 'unicode' ? unicodeOutput : htmlOutput }}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
