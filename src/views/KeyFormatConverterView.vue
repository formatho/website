<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Copy, Check, KeyRound, ArrowRightLeft, AlertCircle } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Private Key Format Converter - PKCS#1, PKCS#8, PEM | Formatho',
  description:
    'Convert RSA private keys between PKCS#1 (BEGIN RSA PRIVATE KEY) and PKCS#8 (BEGIN PRIVATE KEY), and between PEM and DER hex. Convert public keys between SPKI and PKCS#1. 100% client-side.',
  keywords: [
    'private key format converter',
    'pkcs1 to pkcs8',
    'pkcs8 to pkcs1',
    'rsa private key converter',
    'pem to der',
    'begin rsa private key to begin private key',
    'key format online'
  ],
  ogType: 'website'
})

const input = ref('')
const error = ref('')
const converted = ref(false)
const copiedKey = ref('')

// ---------- DER helpers ----------
function derLen(n: number): number[] {
  if (n < 0x80) return [n]
  const bytes: number[] = []
  let v = n
  while (v > 0) {
    bytes.unshift(v & 0xff)
    v >>= 8
  }
  return [0x80 | bytes.length, ...bytes]
}
function der(tag: number, content: Uint8Array): Uint8Array {
  const len = derLen(content.length)
  const out = new Uint8Array(1 + len.length + content.length)
  out[0] = tag
  out.set(len, 1)
  out.set(content, 1 + len.length)
  return out
}
function concat(...parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((s, p) => s + p.length, 0)
  const out = new Uint8Array(total)
  let off = 0
  for (const p of parts) {
    out.set(p, off)
    off += p.length
  }
  return out
}
const RSA_ALG_ID = der(0x30, new Uint8Array([0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00]))

function pkcs1PrivateToPkcs8(pkcs1: Uint8Array): Uint8Array {
  return der(0x30, concat(der(0x02, new Uint8Array([0x00])), RSA_ALG_ID, der(0x04, pkcs1)))
}
function pkcs1PublicToSpki(pkcs1: Uint8Array): Uint8Array {
  const bits = new Uint8Array(1 + pkcs1.length)
  bits.set(pkcs1, 1)
  return der(0x30, concat(RSA_ALG_ID, der(0x03, bits)))
}

// Walk top-level children of a DER SEQUENCE
function derChildren(buf: Uint8Array): { tag: number; content: Uint8Array }[] {
  const out: { tag: number; content: Uint8Array }[] = []
  let i = 0
  while (i + 2 < buf.length) {
    const tag = buf[i]
    i++
    let len = buf[i]
    i++
    if (len & 0x80) {
      const n = len & 0x7f
      len = 0
      for (let j = 0; j < n; j++) len = len * 256 + buf[i + j]
      i += n
    }
    out.push({ tag, content: buf.slice(i, i + len) })
    i += len
  }
  return out
}
// PKCS#8: SEQ( INTEGER 0, SEQ(alg), OCTETSTRING(pkcs1) )
function pkcs8ToPkcs1Private(pkcs8: Uint8Array): Uint8Array | null {
  // the file IS the outer SEQUENCE — walk into its content first
  const outer = derChildren(pkcs8)
  if (outer.length !== 1 || outer[0].tag !== 0x30) return null
  const children = derChildren(outer[0].content)
  if (children.length < 3 || children[0].tag !== 0x02 || children[2].tag !== 0x04) return null
  const inner = children[2].content
  // inner is the PKCS#1 RSAPrivateKey SEQUENCE
  if (inner[0] !== 0x30) return null
  return inner
}
// SPKI: SEQ( SEQ(alg), BITSTRING(00 || pkcs1pub) )
function spkiToPkcs1Public(spki: Uint8Array): Uint8Array | null {
  const outer = derChildren(spki)
  if (outer.length !== 1 || outer[0].tag !== 0x30) return null
  const children = derChildren(outer[0].content)
  if (children.length < 2 || children[1].tag !== 0x03) return null
  const bits = children[1].content
  return bits.slice(1) // strip the unused-bits byte
}

function toPem(der: Uint8Array, label: string): string {
  let bin = ''
  for (const b of der) bin += String.fromCharCode(b)
  const b64 = btoa(bin)
  const lines = b64.match(/.{1,64}/g) || []
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`
}
function pemToDer(pem: string): { der: Uint8Array; label: string } {
  const match = pem.replace(/\r/g, '').match(/-----BEGIN ([A-Z ]+)-----([\s\S]*?)-----END \1-----/)
  if (!match) throw new Error('No PEM block found. Expected -----BEGIN ... KEY----- armor.')
  const bin = atob(match[2].replace(/\s/g, ''))
  const der = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) der[i] = bin.charCodeAt(i)
  return { der, label: match[1] }
}

// ---------- conversion ----------
interface Output {
  id: string
  label: string
  value: string
}
const outputs = ref<Output[]>([])
const detected = ref('')

async function convert() {
  error.value = ''
  outputs.value = []
  converted.value = false
  try {
    const { der: bytes, label } = pemToDer(input.value)
    const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
    detected.value = label

    if (label === 'PRIVATE KEY') {
      const pkcs1 = pkcs8ToPkcs1Private(bytes)
      if (!pkcs1) throw new Error('This PKCS#8 file does not carry an RSA private key (EC or Ed25519 keys have no PKCS#1 form).')
      await crypto.subtle.importKey('pkcs8', bytes as unknown as ArrayBuffer, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, true, ['sign'])
      outputs.value = [
        { id: 'pkcs8', label: 'PKCS#8 PEM (unchanged, re-wrapped)', value: toPem(bytes, 'PRIVATE KEY') },
        { id: 'pkcs1', label: 'PKCS#1 PEM — BEGIN RSA PRIVATE KEY', value: toPem(pkcs1, 'RSA PRIVATE KEY') },
        { id: 'der', label: 'DER hex (PKCS#8)', value: hex }
      ]
    } else if (label === 'RSA PRIVATE KEY') {
      const pkcs8 = pkcs1PrivateToPkcs8(bytes)
      await crypto.subtle.importKey('pkcs8', pkcs8 as unknown as ArrayBuffer, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, true, ['sign'])
      outputs.value = [
        { id: 'pkcs1', label: 'PKCS#1 PEM (unchanged, re-wrapped)', value: toPem(bytes, 'RSA PRIVATE KEY') },
        { id: 'pkcs8', label: 'PKCS#8 PEM — BEGIN PRIVATE KEY', value: toPem(pkcs8, 'PRIVATE KEY') },
        { id: 'der', label: 'DER hex (PKCS#1)', value: hex }
      ]
    } else if (label === 'PUBLIC KEY') {
      const pkcs1 = spkiToPkcs1Public(bytes)
      await crypto.subtle.importKey('spki', bytes as unknown as ArrayBuffer, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, true, ['verify'])
      outputs.value = [
        { id: 'spki', label: 'SPKI PEM (unchanged, re-wrapped)', value: toPem(bytes, 'PUBLIC KEY') },
        ...(pkcs1 ? [{ id: 'pkcs1pub', label: 'PKCS#1 PEM — BEGIN RSA PUBLIC KEY', value: toPem(pkcs1, 'RSA PUBLIC KEY') }] : []),
        { id: 'der', label: 'DER hex (SPKI)', value: hex }
      ]
    } else if (label === 'RSA PUBLIC KEY') {
      const spki = pkcs1PublicToSpki(bytes)
      await crypto.subtle.importKey('spki', spki as unknown as ArrayBuffer, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, true, ['verify'])
      outputs.value = [
        { id: 'pkcs1pub', label: 'PKCS#1 PEM (unchanged, re-wrapped)', value: toPem(bytes, 'RSA PUBLIC KEY') },
        { id: 'spki', label: 'SPKI PEM — BEGIN PUBLIC KEY', value: toPem(spki, 'PUBLIC KEY') },
        { id: 'der', label: 'DER hex (PKCS#1)', value: hex }
      ]
    } else {
      // EC / other — validate and offer PEM/DER only
      outputs.value = [{ id: 'der', label: 'DER hex (label: ' + label + ')', value: hex }]
    }
    converted.value = true
  } catch (e: any) {
    error.value = e?.message?.includes('PEM')
      ? e.message
      : 'Could not convert: the key failed Web Crypto validation (' + (e?.message || 'unknown') + '). Is it a valid RSA key?'
  }
}

async function copy(text: string, id: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = id
    setTimeout(() => (copiedKey.value = ''), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg">
        <KeyRound class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Private Key Format Converter</h1>
        <p class="text-sm text-muted-foreground">PKCS#1 ↔ PKCS#8, SPKI ↔ PKCS#1 public, PEM ↔ DER — keys never leave the browser</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle class="text-lg">Paste a key (PEM)</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label for="key-in">Any RSA key PEM — BEGIN PRIVATE KEY, BEGIN RSA PRIVATE KEY, BEGIN PUBLIC KEY, BEGIN RSA PUBLIC KEY</Label>
          <Textarea id="key-in" v-model="input" :rows="7" class="font-mono text-xs" placeholder="-----BEGIN PRIVATE KEY-----" aria-label="Key PEM to convert" />
        </div>
        <Button class="w-full" :disabled="!input.trim()" @click="convert">
          <ArrowRightLeft class="w-4 h-4 mr-1" /> Convert key
        </Button>
        <p v-if="error" class="text-sm text-red-500 flex items-start gap-1">
          <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" /> {{ error }}
        </p>
      </CardContent>
    </Card>

    <template v-if="converted">
      <p class="text-sm text-muted-foreground">Detected format: <span class="font-mono font-semibold">{{ detected }}</span> — validated with Web Crypto before conversion.</p>
      <Card v-for="o in outputs" :key="o.id">
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">{{ o.label }}</CardTitle>
          <Button variant="ghost" size="sm" :aria-label="'Copy ' + o.label" @click="copy(o.value, o.id)">
            <Check v-if="copiedKey === o.id" class="w-4 h-4" /><Copy v-else class="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <pre class="font-mono text-xs whitespace-pre-wrap break-all p-3 border border-border rounded-lg bg-muted/40 max-h-64 overflow-auto">{{ o.value }}</pre>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
