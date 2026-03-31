<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-vue-next'
import * as yaml from 'js-yaml'

const yamlInput = ref('')
const yamlOutput = ref('')
const error = ref<string | null>(null)
const isValid = ref(false)

const validateYAML = () => {
  if (!yamlInput.value.trim()) {
    error.value = null
    isValid.value = false
    yamlOutput.value = ''
    return
  }

  try {
    yaml.load(yamlInput.value)
    error.value = null
    isValid.value = true
  } catch (e: any) {
    error.value = e.message
    isValid.value = false
    yamlOutput.value = ''
  }
}

const formatYAML = () => {
  if (!isValid.value) return

  try {
    const parsed = yaml.load(yamlInput.value)
    yamlOutput.value = yaml.dump(parsed, { indent: 2 })
  } catch (e: any) {
    error.value = e.message
  }
}

watch(yamlInput, validateYAML)

const fillSample = () => {
  yamlInput.value = `name: John Doe
age: 30
email: john@example.com
address:
  street: 123 Main St
  city: New York`
  validateYAML()
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">YAML Linter</h1>
      <Button variant="ghost" @click="fillSample" aria-label="Load sample YAML data">Load Sample</Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Input Column -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium flex items-center gap-2">
            <div class="flex items-center gap-2">
              YAML Input
              <div v-if="yamlInput.trim()" class="flex items-center gap-1">
                <CheckCircle v-if="isValid" class="h-4 w-4 text-success" />
                <AlertCircle v-else class="h-4 w-4 text-destructive" />
                <span :class="isValid ? 'text-success' : 'text-destructive'" class="text-xs">
                  {{ isValid ? 'Valid' : 'Invalid' }}
                </span>
              </div>
            </div>
          </CardTitle>
          <Button size="sm" @click="formatYAML" :disabled="!isValid">
            Format <ArrowRight class="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 flex flex-col gap-2">
          <CodeEditor
            v-model="yamlInput"
            language="yaml"
            class="flex-1 min-h-0"
            placeholder="key: value"
          />
          <div
            v-if="error"
            class="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm"
          >
            <div class="font-semibold mb-1">Syntax Error:</div>
            {{ error }}
          </div>
        </CardContent>
      </Card>

      <!-- Output Column -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">Formatted Output</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="yamlOutput"
            language="yaml"
            readonly
            class="h-full min-h-0"
            placeholder="Formatted YAML will appear here..."
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
