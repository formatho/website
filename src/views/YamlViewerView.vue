<script setup lang="ts">
import { ref, watch } from 'vue'
import yaml from 'js-yaml'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Button } from '@/components/ui/button'

const yamlInput = ref('')
const error = ref('')

watch(yamlInput, () => {
  try {
    error.value = ''
    if (!yamlInput.value.trim()) return
    yaml.load(yamlInput.value)
  } catch (e: any) {
    error.value = e.message || 'Invalid YAML'
  }
})

const formatYaml = () => {
  try {
    error.value = ''
    if (!yamlInput.value.trim()) return
    const parsed = yaml.load(yamlInput.value)
    yamlInput.value = yaml.dump(parsed, { indent: 2, lineWidth: -1 })
  } catch (e: any) {
    error.value = e.message || 'Invalid YAML'
  }
}

const copyOutput = () => {
  navigator.clipboard.writeText(yamlInput.value)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">YAML Viewer</h1>
    </div>

    <div class="flex gap-2">
      <Button @click="formatYaml" aria-label="Format YAML">Format</Button>
      <Button variant="outline" @click="copyOutput" :disabled="!yamlInput">Copy</Button>
    </div>

    <Card class="flex flex-col min-h-0 flex-1">
      <CardHeader>
        <CardTitle>YAML</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 min-h-0">
        <CodeEditor
          v-model="yamlInput"
          language="yaml"
          class="h-full"
          placeholder="Enter YAML..."
        />
      </CardContent>
    </Card>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
    <div v-else-if="yamlInput" class="p-4 text-sm text-green-600 bg-green-500/10 rounded-md">
      ✓ Valid YAML
    </div>
  </div>
</template>
