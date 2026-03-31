<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'

const xmlInput = ref('')
const jsonOutput = ref('')
const error = ref('')

const xmlToJson = (xml: string): any => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')

  const parseNode = (node: Node): any => {
    const obj: any = {}

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim()
      return text || null
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element

      // Handle attributes
      if (element.attributes.length > 0) {
        obj['@attributes'] = {}
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i]
          if (attr) {
            obj['@attributes'][attr.name] = attr.value
          }
        }
      }

      // Handle child nodes
      const childNodes = Array.from(element.childNodes).filter(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
      )

      if (childNodes.length === 0) {
        return obj['@attributes'] || ''
      }

      const firstChild = childNodes[0]
      if (childNodes.length === 1 && firstChild?.nodeType === Node.TEXT_NODE) {
        return firstChild.textContent?.trim() || ''
      }

      for (const child of childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const childElement = child as Element
          const childName = childElement.nodeName
          const childValue = parseNode(child)

          if (obj[childName] !== undefined) {
            if (!Array.isArray(obj[childName])) {
              obj[childName] = [obj[childName]]
            }
            obj[childName].push(childValue)
          } else {
            obj[childName] = childValue
          }
        }
      }
    }

    return obj
  }

  const result = parseNode(doc.documentElement)
  return { [doc.documentElement.nodeName]: result }
}

watch(xmlInput, () => {
  try {
    error.value = ''
    if (!xmlInput.value.trim()) {
      jsonOutput.value = ''
      return
    }
    const parsed = xmlToJson(xmlInput.value)
    jsonOutput.value = JSON.stringify(parsed, null, 2)
  } catch (e: any) {
    error.value = e.message || 'Invalid XML'
    jsonOutput.value = ''
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">XML to JSON Converter</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>XML Input</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="xmlInput"
            language="xml"
            class="h-full"
            placeholder="Enter XML..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>JSON Output</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="jsonOutput"
            language="json"
            readonly
            class="h-full"
            placeholder="JSON output will appear here..."
          />
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
