<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Button } from '@/components/ui/button'

const inputText = ref('')
const encodedText = ref('')
const decodedText = ref('')

const encode = () => {
  try {
    encodedText.value = encodeURIComponent(inputText.value)
  } catch (e) {
    encodedText.value = 'Encoding error'
  }
}

const decode = () => {
  try {
    decodedText.value = decodeURIComponent(inputText.value)
  } catch (e) {
    decodedText.value = 'Decoding error - invalid encoded string'
  }
}

const encodeAll = () => {
  try {
    encodedText.value = inputText.value
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  } catch (e) {
    encodedText.value = 'Encoding error'
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">URL Encoder/Decoder</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <CodeEditor
          v-model="inputText"
          language="plaintext"
          class="min-h-[100px]"
          placeholder="Enter text to encode or decode..."
        />
        <div class="flex gap-2 flex-wrap">
          <Button @click="encode" aria-label="Encode URL">Encode</Button>
          <Button @click="encodeAll" variant="outline" aria-label="Encode all characters">Encode All Characters</Button>
          <Button @click="decode" variant="secondary" aria-label="Decode URL">Decode</Button>
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
            language="plaintext"
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
