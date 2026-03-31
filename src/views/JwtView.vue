<script setup lang="ts">
import { ref, watch } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { ShieldAlert } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Breadcrumb from '@/components/Breadcrumb.vue'

const token = ref('')
const header = ref('')
const payload = ref('')
const error = ref('')

const decodeToken = () => {
  error.value = ''
  if (!token.value) {
    header.value = ''
    payload.value = ''
    return
  }

  try {
    const decodedHeader = jwtDecode(token.value, { header: true })
    const decodedPayload = jwtDecode(token.value)

    header.value = JSON.stringify(decodedHeader, null, 2)
    payload.value = JSON.stringify(decodedPayload, null, 2)
  } catch (e: any) {
    error.value = 'Invalid JWT: ' + e.message
    header.value = ''
    payload.value = ''
  }
}

watch(token, decodeToken)

const fillSample = () => {
  // A dummy JWT for testing
  token.value =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <!-- Breadcrumb Navigation -->
    <Breadcrumb />
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">JWT Debugger</h1>
      <Button variant="ghost" @click="fillSample">Load Sample</Button>
    </div>

    <div
      v-if="error"
      class="p-4 text-sm text-destructive bg-destructive/10 rounded-md flex items-center gap-2"
    >
      <ShieldAlert class="h-4 w-4" />
      {{ error }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Input Column -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle class="text-sm font-medium">Encoded Token</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="token"
            language="plaintext"
            class="h-full"
            placeholder="Paste JWT here..."
          />
        </CardContent>
      </Card>

      <!-- Output Column -->
      <div class="flex flex-col gap-4 min-h-0">
        <Card class="flex flex-col min-h-0 flex-1">
          <CardHeader class="py-2">
            <CardTitle class="text-sm font-medium">Header</CardTitle>
          </CardHeader>
          <CardContent class="flex-1 min-h-0 overflow-auto">
            <CodeEditor
              :model-value="header"
              language="json"
              readonly
              class="h-full min-h-[100px]"
            />
          </CardContent>
        </Card>
        <Card class="flex flex-col min-h-0 flex-[2]">
          <CardHeader class="py-2">
            <CardTitle class="text-sm font-medium">Payload</CardTitle>
          </CardHeader>
          <CardContent class="flex-1 min-h-0 overflow-auto">
            <CodeEditor
              :model-value="payload"
              language="json"
              readonly
              class="h-full min-h-[200px]"
            />
          </CardContent>
        </Card>
      </div>

    <!-- Related Tools -->
    <div class="mt-8 p-6 bg-muted/20 rounded-lg border border-border">
      <h2 class="text-xl font-bold mb-4">Related Tools</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="/base64"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">Base64 Encoder/Decoder</h3>
          <p class="text-sm text-muted-foreground">Encode and decode Base64 strings and files</p>
        </a>
        <a
          href="/hash-text"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">Hash Generator</h3>
          <p class="text-sm text-muted-foreground">Generate MD5, SHA-1, SHA-256, SHA-512 hashes</p>
        </a>
        <a
          href="/token-generator"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">Token Generator</h3>
          <p class="text-sm text-muted-foreground">Generate secure random tokens</p>
        </a>
        <a
          href="/encryption"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">Text Encryption</h3>
          <p class="text-sm text-muted-foreground">Encrypt and decrypt text with various algorithms</p>
        </a>
      </div>
    </div>
    </div>
  </div>
</template>
