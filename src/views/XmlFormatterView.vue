<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Button } from '@/components/ui/button'

const xmlInput = ref('')
const formattedOutput = ref('')
const error = ref('')
const indentSize = ref(2)

const formatXml = () => {
  try {
    error.value = ''
    if (!xmlInput.value.trim()) {
      formattedOutput.value = ''
      return
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlInput.value, 'text/xml')

    const errorNode = doc.querySelector('parsererror')
    if (errorNode) {
      error.value = 'Invalid XML'
      formattedOutput.value = ''
      return
    }

    const serialize = (node: Node, indent: number): string => {
      const indentStr = ' '.repeat(indent)
      let result = ''

      if (node.nodeType === Node.DOCUMENT_NODE) {
        for (const child of Array.from(node.childNodes)) {
          result += serialize(child, indent)
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element
        const children = Array.from(element.childNodes).filter(
          (n) =>
            n.nodeType === Node.ELEMENT_NODE ||
            (n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
        )

        result += `${indentStr}<${element.tagName}`

        // Add attributes
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i]
          if (attr) {
            result += ` ${attr.name}="${attr.value}"`
          }
        }

        if (children.length === 0) {
          result += '/>\n'
        } else if (children.length === 1 && children[0]?.nodeType === Node.TEXT_NODE) {
          const child = children[0]
          result += `>${child?.textContent?.trim() ?? ''}</${element.tagName}>\n`
        } else {
          result += '>\n'
          for (const child of children) {
            result += serialize(child, indent + indentSize.value)
          }
          result += `${indentStr}</${element.tagName}>\n`
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim()
        if (text) {
          result += `${indentStr}${text}\n`
        }
      }

      return result
    }

    formattedOutput.value = serialize(doc, 0)
  } catch (e: any) {
    error.value = e.message || 'Failed to format XML'
    formattedOutput.value = ''
  }
}

const copyOutput = () => {
  navigator.clipboard.writeText(formattedOutput.value)
}

watch([xmlInput, indentSize], formatXml)
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">XML Formatter</h1>
    </div>

    <div class="flex items-center gap-4">
      <label class="flex items-center gap-2 text-sm">
        Indent:
        <input
          v-model.number="indentSize"
          type="number"
          min="1"
          max="8"
          class="w-16 h-10 rounded-md border border-input bg-background px-3 py-2"
        />
        spaces
      </label>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Input XML</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="xmlInput"
            language="xml"
            class="h-full"
            placeholder="Enter XML to format..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex-row items-center justify-between">
          <CardTitle>Formatted XML</CardTitle>
          <Button variant="outline" size="sm" @click="copyOutput" :disabled="!formattedOutput" aria-label="Copy formatted XML">
            >Copy</Button
          >
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="formattedOutput"
            language="xml"
            readonly
            class="h-full"
            placeholder="Formatted XML will appear here..."
          />
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
