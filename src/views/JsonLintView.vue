<script setup lang="ts">
import { ref, watch } from 'vue'
import ToolPageLayout from '@/components/ToolPageLayout.vue'
import { Button } from '@/components/ui/button'

const toolLayout = ref<InstanceType<typeof ToolPageLayout>>()

const input = ref('')
let output = ''

const processJson = (value: string) => {
  if (!value.trim()) {
    toolLayout.value?.setOutput('')
    toolLayout.value?.setValid()
    return
  }

  try {
    const parsed = JSON.parse(value)
    output = JSON.stringify(parsed, null, 2)
    toolLayout.value?.setOutput(output)
    toolLayout.value?.setValid()
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Invalid JSON'
    toolLayout.value?.setError(errorMessage)
    toolLayout.value?.setOutput('')
  }
}

watch(input, (newValue) => {
  processJson(newValue)
})

const handleInput = (value: string) => {
  input.value = value
}

const fillSample = () => {
  const sample =
    '{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York"}}'
  input.value = sample
  processJson(sample)
}
</script>

<template>
  <ToolPageLayout
    ref="toolLayout"
    title="JSON Linter"
    description="Validate, format, and beautify your JSON code instantly. Detect and fix syntax errors with real-time validation."
    placeholder="Paste or type your JSON here..."
    @input="handleInput"
    @clear="
      () => {
        input = ''
      }
    "
  >
    <template #options>
      <div class="space-y-6">
        <!-- Sample Button -->
        <div>
          <Button variant="outline" @click="fillSample" class="gap-2" aria-label="Load sample JSON"> Load Sample JSON </Button>
        </div>

        <!-- Features -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Features</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 glass-card">
              <div class="text-gray-900">Real-time Validation</div>
              <p class="text-sm text-muted-foreground">
                Instantly detects and highlights JSON syntax errors as you type.
              </p>
            </div>
            <div class="p-4 glass-card">
              <div class="text-gray-900">Format & Beautify</div>
              <p class="text-sm text-muted-foreground">
                Automatically formats your JSON with proper indentation.
              </p>
            </div>
            <div class="p-4 glass-card">
              <div class="text-gray-900">100% Client-Side</div>
              <p class="text-sm text-muted-foreground">
                Your JSON never leaves your browser. Complete privacy.
              </p>
            </div>
          </div>
        </div>

        <!-- Usage Examples -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold">Common Use Cases</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 border border-border rounded-lg">
              <div class="font-mono text-sm mb-2 text-muted-foreground">// API Response</div>
              <pre class="text-xs bg-muted p-3 rounded overflow-x-auto"><code>{
  "status": "success",
  "data": {...}
}</code></pre>
            </div>
            <div class="p-4 border border-border rounded-lg">
              <div class="font-mono text-sm mb-2 text-muted-foreground">// Configuration</div>
              <pre class="text-xs bg-muted p-3 rounded overflow-x-auto"><code>{
  "app": {
    "name": "MyApp",
    "version": "1.0.0"
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ToolPageLayout>
</template>
