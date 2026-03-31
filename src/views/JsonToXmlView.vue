<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'

const jsonInput = ref('')
const xmlOutput = ref('')
const error = ref('')

const jsonToXml = (obj: any, rootName = 'root', indent = 2): string => {
  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  const toXml = (data: any, name: string, level: number): string => {
    const indentStr = ' '.repeat(level * indent)

    if (data === null || data === undefined) {
      return `${indentStr}<${name}/>\n`
    }

    if (typeof data !== 'object') {
      return `${indentStr}<${name}>${escapeXml(String(data))}</${name}>\n`
    }

    if (Array.isArray(data)) {
      return data.map((item) => toXml(item, name, level)).join('')
    }

    let xml = `${indentStr}<${name}>\n`

    // Handle attributes
    if (data['@attributes']) {
      const attrs = Object.entries(data['@attributes'])
        .map(([k, v]) => `${k}="${escapeXml(String(v))}"`)
        .join(' ')
      if (attrs) {
        xml = `${indentStr}<${name} ${attrs}>\n`
      }
      delete data['@attributes']
    }

    for (const [key, value] of Object.entries(data)) {
      xml += toXml(value, key, level + 1)
    }

    xml += `${indentStr}</${name}>\n`
    return xml
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(obj, rootName, 0)}`
}

watch(jsonInput, () => {
  try {
    error.value = ''
    if (!jsonInput.value.trim()) {
      xmlOutput.value = ''
      return
    }
    const parsed = JSON.parse(jsonInput.value)
    xmlOutput.value = jsonToXml(parsed)
  } catch (e: any) {
    error.value = e.message || 'Invalid JSON'
    xmlOutput.value = ''
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">JSON to XML Converter</h1>
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
          <CardTitle>XML Output</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="xmlOutput"
            language="xml"
            readonly
            class="h-full"
            placeholder="XML output will appear here..."
          />
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
