<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Button } from '@/components/ui/button'

const inputText = ref('')
const encodedText = ref('')
const decodedText = ref('')

const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '€': '&euro;',
  '£': '&pound;',
  '¥': '&yen;',
  '¢': '&cent;',
  '§': '&sect;',
  '¶': '&para;',
  '°': '&deg;',
  '±': '&plusmn;',
  '×': '&times;',
  '÷': '&divide;'
}

const encode = () => {
  let result = inputText.value
  for (const [char, entity] of Object.entries(htmlEntities)) {
    result = result.split(char).join(entity)
  }
  // Also encode other non-ASCII characters
  // eslint-disable-next-line no-control-regex
  result = result.replace(/[^\x00-\x7F]/g, (char) => {
    return `&#${char.charCodeAt(0)};`
  })
  encodedText.value = result
}

const decode = () => {
  const doc = new DOMParser().parseFromString(inputText.value, 'text/html')
  decodedText.value = doc.documentElement.textContent || ''
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">HTML Entities Encoder/Decoder</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <CodeEditor
          v-model="inputText"
          language="html"
          class="min-h-[100px]"
          placeholder="Enter text to encode or decode..."
        />
        <div class="flex gap-2">
          <Button @click="encode" aria-label="Encode HTML entities">Encode</Button>
          <Button @click="decode" variant="secondary" aria-label="Decode HTML entities">Decode</Button>
        </div>
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Encoded</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="encodedText"
            language="html"
            readonly
            class="h-full"
            placeholder="Encoded result..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Decoded</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="decodedText"
            language="plaintext"
            readonly
            class="h-full"
            placeholder="Decoded result..."
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
