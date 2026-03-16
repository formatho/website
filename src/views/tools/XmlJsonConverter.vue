<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Copy, FileJson } from 'lucide-vue-next'

// DOMParser is browser-native - privacy-first, zero server calls
const DOMParser = window.DOMParser

const xmlInput = ref('')
const jsonInput = ref('')
const error = ref('')

// Parse XML to JSON using browser-native DOMParser
const xmlToJson = (xml: string): any => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')

  const parseNode = (node: Node): any => {
    const obj: any = {}

    // Handle text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim()
      return text || null
    }

    // Handle element nodes
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

// Convert JSON to XML using browser-native API
const jsonToXml = (json: any): string => {
  const buildXml = (obj: any, tagName: string = 'root'): string => {
    if (obj === null || obj === undefined) return ''

    let xml = ''

    // Handle arrays
    if (Array.isArray(obj)) {
      for (const item of obj) {
        xml += `  <${tagName}>${buildXml(item, 'item')}</${tagName}>`
      }
      return xml
    }

    // Handle objects
    for (const [key, value] of Object.entries(obj)) {
      if (key === '@attributes') {
        // Handle attributes
        for (const [attrName, attrValue] of Object.entries(value)) {
          xml += ` ${attrName}="${attrValue}"`
        }
        continue
      }

      // Handle values
      const isObject = typeof value === 'object' && value !== null && !Array.isArray(value)
      const isArray = Array.isArray(value)

      if (isArray) {
        xml += `\n  <${key}>`
        for (const item of value) {
          xml += `\n    <item>${buildXml(item)}</item>`
        }
        xml += `\n  </${key}>`
      } else if (isObject) {
        xml += `\n  <${key}>${buildXml(value, 'item')}</${key}>`
      } else if (value !== null && value !== undefined) {
        xml += `\n  <${key}>${value}</${key}>`
      }
    }

    return xml
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n${buildXml(json)}`
}

// Convert XML input to JSON
const convertXmlToJson = () => {
  error.value = ''
  try {
    if (!xmlInput.value.trim()) {
      jsonInput.value = ''
      return
    }

    const parsed = xmlToJson(xmlInput.value)
    jsonInput.value = JSON.stringify(parsed, null, 2)
  } catch (e: any) {
    error.value = e.message || 'Invalid XML format'
    jsonInput.value = ''
  }
}

// Convert JSON input to XML
const convertJsonToXml = () => {
  error.value = ''
  try {
    if (!jsonInput.value.trim()) {
      xmlInput.value = ''
      return
    }

    const jsonObj = JSON.parse(jsonInput.value)
    xmlInput.value = jsonToXml(jsonObj)
  } catch (e: any) {
    error.value = e.message || 'Invalid JSON format'
    xmlInput.value = ''
  }
}

// Copy to clipboard functions
const copyXmlToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(xmlInput.value)
    error.value = ''
  } catch (e: any) {
    error.value = 'Failed to copy XML to clipboard'
  }
}

const copyJsonToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(jsonInput.value)
    error.value = ''
  } catch (e: any) {
    error.value = 'Failed to copy JSON to clipboard'
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">XML :left_right_arrow: JSON Converter</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- XML Column (Left) -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium flex items-center gap-2">
            <FileJson class="h-4 w-4" /> XML Input
          </CardTitle>
          <div class="flex gap-2">
            <Button
              size="sm"
              @click="convertXmlToJson"
              class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
            >
              To JSON &rarr;
            </Button>
            <Button
              size="icon"
              variant="outline"
              @click="copyXmlToClipboard"
              class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
              :disabled="!xmlInput"
            >
              <Copy class="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <Textarea
            v-model="xmlInput"
            class="h-full resize-none font-mono"
            placeholder="Enter XML...&#10;&lt;root>&#10;&lt;name>Formatho</name>&#10;&lt;/root>"
          />
        </CardContent>
      </Card>

      <!-- JSON Column (Right) -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium flex items-center gap-2">
            <FileJson class="h-4 w-4" /> JSON Output
          </CardTitle>
          <div class="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              @click="convertJsonToXml"
              class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
            >
              &larr; To XML
            </Button>
            <Button
              size="icon"
              variant="outline"
              @click="copyJsonToClipboard"
              class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
              :disabled="!jsonInput"
            >
              <Copy class="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <Textarea
            v-model="jsonInput"
            class="h-full resize-none font-mono"
            placeholder="JSON output will appear here..."
          />
        </CardContent>
      </Card>
    </div>

    <!-- Subtle inline error message -->
    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
