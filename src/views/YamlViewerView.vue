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
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold tracking-tight">YAML Linter & Viewer</h1>
      </div>
      <p class="text-sm text-muted-foreground">
        Format, validate, and beautify YAML documents instantly. Our YAML linter checks syntax errors in real-time and helps you fix indentation issues. 100% client-side - your data never leaves your browser.
      </p>
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

    <!-- SEO Content Section -->
    <div class="mt-4 p-4 bg-card rounded-lg border">
      <h2 class="text-lg font-semibold mb-2">About This YAML Linter</h2>
      <div class="text-sm text-muted-foreground space-y-2">
        <p>
          This free <strong>YAML linter</strong> and validator helps you format, validate, and beautify YAML documents with real-time syntax checking. Whether you're working with Kubernetes configs, CI/CD pipelines, or data serialization, our tool ensures your YAML files are error-free and properly formatted.
        </p>
        <h3 class="font-medium text-foreground mt-3">Key Features:</h3>
        <ul class="list-disc list-inside space-y-1 ml-2">
          <li><strong>Real-time YAML validation</strong> - Detects syntax errors instantly as you type</li>
          <li><strong>YAML formatter & beautifier</strong> - Auto-formats with proper indentation (2 spaces)</li>
          <li><strong>YAML syntax checker</strong> - Identifies common YAML mistakes</li>
          <li><strong>100% privacy-first</strong> - All processing happens in your browser</li>
          <li><strong>No signup required</strong> - Start linting YAML immediately</li>
          <li><strong>Supports all YAML versions</strong> - YAML 1.1, 1.2, and beyond</li>
        </ul>
        <h3 class="font-medium text-foreground mt-3">Common Use Cases:</h3>
        <ul class="list-disc list-inside space-y-1 ml-2">
          <li>Validate Kubernetes manifests and Helm charts</li>
          <li>Check CI/CD pipeline configurations (GitHub Actions, GitLab CI)</li>
          <li>Format Docker Compose files</li>
          <li>Lint Ansible playbooks and inventory files</li>
          <li>Validate API specifications and configuration files</li>
        </ul>
      </div>
    </div>
  </div>
</template>
