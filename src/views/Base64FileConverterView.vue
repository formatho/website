<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const fileInput = ref<File | null>(null)
const base64Output = ref('')
const error = ref('')
const fileName = ref('')

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  error.value = ''
  base64Output.value = ''

  if (target.files && target.files[0]) {
    const file = target.files[0]
    fileInput.value = file
    fileName.value = file.name
    await convertToBase64()
  }
}

const convertToBase64 = async () => {
  if (!fileInput.value) return

  try {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Remove data URL prefix
      base64Output.value = result.split(',')[1] ?? ''
    }
    reader.onerror = () => {
      error.value = 'Failed to read file'
    }
    reader.readAsDataURL(fileInput.value)
  } catch (e) {
    error.value = 'Failed to convert file to Base64'
  }
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(base64Output.value)
}

const downloadAsText = () => {
  const blob = new Blob([base64Output.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName.value}.base64.txt`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Base64 File Converter</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Convert File to Base64</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 space-y-4">
        <div class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <input type="file" @change="handleFileUpload" class="hidden" id="file-upload" />
          <label for="file-upload" class="cursor-pointer">
            <div class="text-muted-foreground mb-2">Click to select a file</div>
            <Button variant="outline" as="span" aria-label="Select file to convert">Select File</Button>
          </label>
        </div>

        <div v-if="fileName" class="text-sm text-muted-foreground">Selected: {{ fileName }}</div>

        <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
          {{ error }}
        </div>

        <div v-if="base64Output" class="space-y-3">
          <div class="flex justify-between items-center">
            <Label>Base64 Output</Label>
            <div class="flex gap-2">
              <Button variant="outline" size="sm" @click="copyToClipboard" aria-label="Copy Base64 output">Copy</Button>
              <Button variant="outline" size="sm" @click="downloadAsText" aria-label="Download as text file">Download</Button>
            </div>
          </div>
          <CodeEditor
            :model-value="base64Output"
            language="plaintext"
            readonly
            class="min-h-[250px]"
          />
          <div class="text-sm text-muted-foreground">
            Size: {{ (base64Output.length / 1024).toFixed(2) }} KB
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
