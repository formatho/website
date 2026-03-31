<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'

const jsonInput = ref('')
const minifiedOutput = ref('')
const originalSize = ref(0)
const minifiedSize = ref(0)
const error = ref('')

const minify = () => {
  try {
    error.value = ''
    if (!jsonInput.value.trim()) {
      minifiedOutput.value = ''
      originalSize.value = 0
      minifiedSize.value = 0
      return
    }

    originalSize.value = new Blob([jsonInput.value]).size
    const parsed = JSON.parse(jsonInput.value)
    minifiedOutput.value = JSON.stringify(parsed)
    minifiedSize.value = new Blob([minifiedOutput.value]).size
  } catch (e: any) {
    error.value = e.message || 'Invalid JSON'
    minifiedOutput.value = ''
  }
}

const copyOutput = () => {
  navigator.clipboard.writeText(minifiedOutput.value)
}

watch(jsonInput, minify)
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">JSON Minifier</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="jsonInput"
            language="json"
            class="h-full"
            placeholder="Enter JSON to minify..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex-row items-center justify-between">
          <CardTitle>Minified Output</CardTitle>
          <Button variant="outline" size="sm" @click="copyOutput" :disabled="!minifiedOutput"
            >Copy</Button
          >
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="minifiedOutput"
            language="json"
            readonly
            class="h-full"
            placeholder="Minified JSON will appear here..."
          />
        </CardContent>
      </Card>
    </div>

    <div v-if="minifiedOutput" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Original Size</div>
          <div class="text-2xl font-bold">{{ originalSize }} bytes</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Minified Size</div>
          <div class="text-2xl font-bold">{{ minifiedSize }} bytes</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Saved</div>
          <div class="text-2xl font-bold text-green-600">
            {{ ((1 - minifiedSize / originalSize) * 100).toFixed(1) }}%
          </div>
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
