<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Copy, Check, Package, ArrowRightLeft, AlertCircle } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'GZip Compress & Decompress Online - Client-Side | Formatho',
  description:
    'Compress text to gzip/deflate and decompress gzip, deflate, or zlib data online. Includes Base64 input/output for SAML and API debugging. Runs with native browser compression — nothing uploaded.',
  keywords: [
    'gzip decompress online',
    'gzip compress online',
    'deflate decode online',
    'zlib decompress',
    'base64 to gzip',
    'gzip to base64',
    'saml deflate decompress'
  ],
  ogType: 'website'
})

type Mode = 'compress' | 'decompress'
type Fmt = 'gzip' | 'deflate' | 'deflate-raw'
const mode = ref<Mode>('compress')
const fmt = ref<Fmt>('gzip')
const input = ref('')
const base64Out = ref(true)
const output = ref('')
const error = ref('')
const copied = ref(false)
const stat = ref({ inBytes: 0, outBytes: 0 })

function streamSupported(): boolean {
  return typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined'
}

async function run() {
  error.value = ''
  output.value = ''
  copied.value = false
  if (!streamSupported()) {
    error.value = 'This browser does not expose native compression streams. Use a current Chrome, Edge, Firefox, or Safari.'
    return
  }
  try {
    if (mode.value === 'compress') {
      const data = new TextEncoder().encode(input.value)
      const stream = new Blob([data as unknown as BlobPart]).stream().pipeThrough(new CompressionStream(fmt.value))
      const buf = new Uint8Array(await new Response(stream).arrayBuffer())
      stat.value = { inBytes: data.length, outBytes: buf.length }
      if (base64Out.value) {
        output.value = btoa(String.fromCharCode(...buf))
      } else {
        output.value = new TextDecoder('latin1').decode(buf)
      }
    } else {
      // accept base64 or hex input for decompression
      const trimmed = input.value.trim()
      let bytes: Uint8Array
      if (/^(0x)?[0-9a-f\s]+$/i.test(trimmed) && trimmed.replace(/0x|\s/gi, '').length % 2 === 0 && !/[+/=]/.test(trimmed)) {
        const hex = trimmed.replace(/0x/gi, '').replace(/\s/g, '')
        bytes = new Uint8Array(hex.match(/.{2}/g)!.map((h) => parseInt(h, 16)))
      } else {
        const bin = atob(trimmed.replace(/\s/g, ''))
        bytes = new Uint8Array(bin.length)
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
      }
      const stream = new Blob([bytes as unknown as BlobPart]).stream().pipeThrough(new DecompressionStream(fmt.value))
      const buf = new Uint8Array(await new Response(stream).arrayBuffer())
      stat.value = { inBytes: bytes.length, outBytes: buf.length }
      output.value = new TextDecoder().decode(buf)
    }
  } catch (e: any) {
    error.value =
      mode.value === 'decompress'
        ? 'Decompression failed — check that the format matches (gzip vs deflate vs raw deflate) and the input is valid Base64/hex. SAML Redirect bindings use raw deflate.'
        : 'Compression failed: ' + (e?.message || 'unknown error')
  }
}

const ratio = computed(() => {
  const { inBytes, outBytes } = stat.value
  if (!inBytes || !outBytes || mode.value !== 'compress') return ''
  return `${Math.round((1 - outBytes / inBytes) * 100)}% smaller`
})

async function copyOut() {
  try {
    await navigator.clipboard.writeText(output.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Package class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">GZip / Deflate Compressor</h1>
        <p class="text-sm text-muted-foreground">Compress and decompress gzip, zlib, and raw deflate with native browser streams — nothing uploaded</p>
      </div>
    </div>

    <div class="flex gap-2 flex-wrap" role="tablist" aria-label="Compression mode">
      <button
        v-for="m in (['compress', 'decompress'] as Mode[])"
        :key="m"
        role="tab"
        :aria-selected="mode === m"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border capitalize transition-colors"
        :class="mode === m ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:bg-muted'"
        @click="mode = m"
      >
        <ArrowRightLeft class="w-4 h-4" />
        {{ m }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader><CardTitle class="text-lg">{{ mode === 'compress' ? 'Plain text' : 'Compressed data (Base64 or hex)' }}</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-2">
            <Label for="gz-input">{{ mode === 'compress' ? 'Text to compress' : 'Base64 or hex payload' }}</Label>
            <Textarea id="gz-input" v-model="input" :rows="8" class="font-mono text-xs" :placeholder="mode === 'compress' ? 'Paste text…' : 'H4sIAAAAA…'" :aria-label="mode === 'compress' ? 'Text to compress' : 'Base64 or hex compressed data'" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="gz-fmt">Format</Label>
              <select id="gz-fmt" v-model="fmt" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-mono">
                <option value="gzip">gzip (with header)</option>
                <option value="deflate">zlib deflate</option>
                <option value="deflate-raw">raw deflate (SAML)</option>
              </select>
            </div>
            <div v-if="mode === 'compress'" class="grid gap-2">
              <Label for="gz-b64">Output</Label>
              <select id="gz-b64" v-model="base64Out" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs">
                <option :value="true">Base64</option>
                <option :value="false">Escaped bytes</option>
              </select>
            </div>
          </div>
          <Button class="w-full" :disabled="!input.trim()" @click="run">{{ mode === 'compress' ? 'Compress' : 'Decompress' }}</Button>
          <p v-if="error" class="text-sm text-red-500 flex items-start gap-1"><AlertCircle class="w-4 h-4 shrink-0 mt-0.5" /> {{ error }}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">{{ mode === 'compress' ? 'Compressed output' : 'Decompressed text' }}</CardTitle>
          <Button v-if="output" variant="ghost" size="sm" aria-label="Copy output" @click="copyOut">
            <Check v-if="copied" class="w-4 h-4" /><Copy v-else class="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <pre class="font-mono text-xs whitespace-pre-wrap break-all p-3 border border-border rounded-lg bg-muted/40 min-h-48 max-h-96 overflow-auto">{{ output || '—' }}</pre>
          <p v-if="output" class="text-xs text-muted-foreground mt-2">
            {{ stat.inBytes.toLocaleString() }} bytes in → {{ stat.outBytes.toLocaleString() }} bytes out
            <span v-if="ratio"> · {{ ratio }}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
