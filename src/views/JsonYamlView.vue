<script setup lang="ts">
import { ref } from 'vue'
import yaml from 'js-yaml'
import { FileJson, FileType } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Breadcrumb from '@/components/Breadcrumb.vue'

const jsonInput = ref('')
const yamlInput = ref('')
const error = ref('')

const convertToYaml = () => {
  error.value = ''
  try {
    const obj = JSON.parse(jsonInput.value)
    yamlInput.value = yaml.dump(obj)
  } catch (e: any) {
    error.value = 'Invalid JSON: ' + e.message
  }
}

const convertToJson = () => {
  error.value = ''
  try {
    const obj = yaml.load(yamlInput.value)
    jsonInput.value = JSON.stringify(obj, null, 2)
  } catch (e: any) {
    error.value = 'Invalid YAML: ' + e.message
  }
}

// Sample data for quick testing
const fillSample = () => {
  jsonInput.value = JSON.stringify(
    {
      name: 'DevTools',
      version: 1.0,
      features: ['markdown', 'json', 'yaml']
    },
    null,
    2
  )
  convertToYaml()
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <!-- Breadcrumb Navigation -->
    <Breadcrumb />
    
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">JSON &lt;-&gt; YAML Converter</h1>
      <Button variant="ghost" @click="fillSample" aria-label="Load sample JSON/YAML data">Load Sample</Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- JSON Column -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium flex items-center gap-2">
            <FileJson class="h-4 w-4" /> JSON
          </CardTitle>
          <Button size="sm" @click="convertToYaml" aria-label="Convert JSON to YAML"> To YAML -> </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="jsonInput"
            language="json"
            class="h-full"
            placeholder='{"key": "value"}'
          />
        </CardContent>
      </Card>

      <!-- YAML Column -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium flex items-center gap-2">
            <FileType class="h-4 w-4" /> YAML
          </CardTitle>
          <Button size="sm" @click="convertToJson" variant="secondary" aria-label="Convert YAML to JSON"> &lt;- To JSON </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="yamlInput"
            language="yaml"
            class="h-full"
            placeholder="key: value"
          />
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>

    <!-- Related Tools -->
    <div class="mt-8 p-6 bg-muted/20 rounded-lg border border-border">
      <h2 class="text-xl font-bold mb-4">Related Tools</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="/json-viewer"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">JSON Viewer</h3>
          <p class="text-sm text-muted-foreground">Format and validate JSON data</p>
        </a>
        <a
          href="/yaml-viewer"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">YAML Viewer</h3>
          <p class="text-sm text-muted-foreground">Format and validate YAML data</p>
        </a>
        <a
          href="/json-minify"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">JSON Minify</h3>
          <p class="text-sm text-muted-foreground">Reduce JSON file size</p>
        </a>
        <a
          href="/json-csv"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">JSON to CSV</h3>
          <p class="text-sm text-muted-foreground">Convert JSON to CSV format</p>
        </a>
        <a
          href="/json-xml"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">JSON to XML</h3>
          <p class="text-sm text-muted-foreground">Convert JSON to XML format</p>
        </a>
      </div>
    </div>
  </div>
</template>
