<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

type ConversionDirection = 'xml-to-json' | 'json-to-xml'

const direction = ref<ConversionDirection>('xml-to-json')
const input = ref('')
const output = ref('')
const error = ref('')

// XML to JSON
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

      const children = childNodes.filter((n) => n.nodeType === Node.ELEMENT_NODE)
      if (children.length === 0) {
        return obj['@attributes'] || ''
      }

      for (const child of children) {
        if (child?.nodeType === Node.ELEMENT_NODE) {
          const childResult = parseNode(child)
          const childName = child.nodeName
          if (childName in obj) {
            if (!Array.isArray(obj[childName])) {
              obj[childName] = [obj[childName]]
            }
            obj[childName].push(childResult)
          } else {
            obj[childName] = childResult
          }
        }
      }
    }
    return obj
  }

  const root = doc.documentElement
  if (root.nodeName === 'parsererror') {
    throw new Error('Invalid XML input')
  }

  const result: any = {}
  result[root.nodeName] = parseNode(root)
  return result
}

// JSON to XML
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

  return `<?xml version="1.0" encoding="UTF-8"?>\n` + toXml(obj, rootName, 0)
}

// Perform conversion
const convert = () => {
  error.value = ''
  output.value = ''

  try {
    if (!input.value.trim()) {
      output.value = ''
      return
    }

    if (direction.value === 'xml-to-json') {
      const result = xmlToJson(input.value)
      output.value = JSON.stringify(result, null, 2)
    } else {
      const jsonData = JSON.parse(input.value)
      const rootKey = Object.keys(jsonData)[0] || 'root'
      output.value = jsonToXml(jsonData, rootKey)
    }
  } catch (e: any) {
    error.value = e.message || 'Conversion failed'
    output.value = ''
  }
}

// Auto-convert when input changes
watch(input, () => {
  convert()
})

// Reset output when direction changes
watch(direction, () => {
  output.value = ''
  error.value = ''
  if (input.value) {
    convert()
  }
})

// Copy output
const copyOutput = async () => {
  if (!output.value) return
  try {
    await navigator.clipboard.writeText(output.value)
    // You could add a toast notification here
  } catch (err) {
    error.value = 'Failed to copy to clipboard'
  }
}

// Placeholder computed
const inputPlaceholder = computed(() => {
  return direction.value === 'xml-to-json'
    ? '<?xml version="1.0"?><root><item>Example</item></root>'
    : '{ "root": { "item": "Example" } }'
})
</script>

<template>
  <div class="container mx-auto py-6">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl font-bold">XML ↔ JSON Converter</CardTitle>
        <p class="text-sm text-muted-foreground">
          Convert XML to JSON and vice versa entirely client-side.
        </p>
      </CardHeader>
      <CardContent class="space-y-4">
        <!-- Direction Toggle -->
        <div class="flex gap-2 mb-4">
          <button
            @click="direction = 'xml-to-json'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              direction === 'xml-to-json'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            ]"
          >
            XML to JSON
          </button>
          <button
            @click="direction = 'json-to-xml'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              direction === 'json-to-xml'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            ]"
          >
            JSON to XML
          </button>
        </div>

        <!-- Input -->
        <div class="space-y-2">
          <label class="text-sm font-medium">
            {{ direction === 'xml-to-json' ? 'XML Input' : 'JSON Input' }}
          </label>
          <Textarea
            v-model="input"
            :placeholder="inputPlaceholder"
            class="font-mono text-sm min-h-[200px]"
          />
        </div>

        <!-- Output -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium">
              {{ direction === 'xml-to-json' ? 'JSON Output' : 'XML Output' }}
            </label>
            <button
              @click="copyOutput"
              :disabled="!output"
              class="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Copy
            </button>
          </div>
          <Textarea
            v-model="output"
            readonly
            placeholder="Output will appear here..."
            class="font-mono text-sm min-h-[200px]"
          />
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm"
        >
          {{ error }}
        </div>
      </CardContent>
    </Card>
  </div>
</template>
