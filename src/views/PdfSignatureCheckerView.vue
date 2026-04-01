<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface SignatureInfo {
  name: string
  date: string
  reason: string
  location: string
  valid: boolean | null
}

const file = ref<File | null>(null)
const signatures = ref<SignatureInfo[]>([])
const loading = ref(false)
const error = ref('')

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    file.value = target.files[0]
    await checkSignatures()
  }
}

const checkSignatures = async () => {
  if (!file.value) return

  loading.value = true
  error.value = ''
  signatures.value = []

  try {
    const arrayBuffer = await file.value.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)

    // Simple PDF signature extraction (basic check)
    const decoder = new TextDecoder('latin1')
    const content = decoder.decode(bytes)

    // Look for signature dictionaries
    const sigRegex = /\/Type\s*\/Sig[^]*?\/Name\s*\(([^)]*)\)[^]*?\/Date\s*\(([^)]*)\)/gi
    let match

    while ((match = sigRegex.exec(content)) !== null) {
      signatures.value.push({
        name: match[1] || 'Unknown',
        date: match[2] || 'Unknown',
        reason: '',
        location: '',
        valid: null // Would need proper crypto validation
      })
    }

    // If no signatures found with regex, check for Sig flags
    if (signatures.value.length === 0 && content.includes('/Sig')) {
      signatures.value.push({
        name: 'Signature Present',
        date: 'Details not extractable',
        reason: 'PDF contains digital signature(s)',
        location: '',
        valid: null
      })
    }

    if (signatures.value.length === 0) {
      error.value = 'No digital signatures found in this PDF'
    }
  } catch (e) {
    error.value = 'Failed to read PDF file'
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">PDF Signature Checker</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Check PDF Signatures</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 space-y-4">
        <div class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".pdf"
            @change="handleFileUpload"
            class="hidden"
            id="pdf-upload"
          />
          <label for="pdf-upload" class="cursor-pointer">
            <div class="text-muted-foreground mb-2">Click to upload PDF or drag and drop</div>
            <Button variant="outline" as="span" aria-label="Select PDF file for signature check">Select PDF File</Button>
          </label>
        </div>

        <div v-if="file" class="text-sm text-muted-foreground">
          File: {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
        </div>

        <div v-if="loading" class="text-center py-4">Checking signatures...</div>

        <div v-if="error" class="p-4 text-sm text-orange-600 bg-orange-500/10 rounded-md">
          {{ error }}
        </div>

        <div v-if="signatures.length > 0" class="space-y-3">
          <h3 class="font-semibold">Signatures Found ({{ signatures.length }})</h3>
          <div v-for="(sig, index) in signatures" :key="index" class="p-4 rounded-lg bg-muted">
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div><span class="text-muted-foreground">Name:</span> {{ sig.name }}</div>
              <div><span class="text-muted-foreground">Date:</span> {{ sig.date }}</div>
              <div v-if="sig.reason" class="col-span-2">
                <span class="text-muted-foreground">Reason:</span> {{ sig.reason }}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
