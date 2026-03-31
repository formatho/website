<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'

const keySize = ref(2048)
const publicKey = ref('')
const privateKey = ref('')
const generating = ref(false)

const generateKeyPair = async () => {
  generating.value = true
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: keySize.value,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256'
      },
      true,
      ['sign', 'verify']
    )

    const publicKeyData = await window.crypto.subtle.exportKey('spki', keyPair.publicKey)
    const privateKeyData = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey)

    publicKey.value = arrayBufferToPem(publicKeyData, 'PUBLIC KEY')
    privateKey.value = arrayBufferToPem(privateKeyData, 'PRIVATE KEY')
  } catch (e) {
    console.error(e)
  } finally {
    generating.value = false
  }
}

const arrayBufferToPem = (buffer: ArrayBuffer, label: string): string => {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  const lines = base64.match(/.{1,64}/g) || []
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">RSA Key Pair Generator</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Generate RSA Key Pair</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label>Key Size (bits)</Label>
            <select
              v-model.number="keySize"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option :value="2048">2048 bits</option>
              <option :value="3072">3072 bits</option>
              <option :value="4096">4096 bits</option>
            </select>
          </div>
          <div class="flex items-end">
            <Button @click="generateKeyPair" :disabled="generating" class="w-full" aria-label="Generate RSA key pair">
              {{ generating ? 'Generating...' : 'Generate Key Pair' }}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Public Key (PEM)</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="publicKey"
            language="plaintext"
            readonly
            class="h-full"
            placeholder="Public key will appear here..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Private Key (PEM)</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="privateKey"
            language="plaintext"
            readonly
            class="h-full"
            placeholder="Private key will appear here..."
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
