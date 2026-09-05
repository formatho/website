<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Copy, Check, KeyRound, PenLine, ShieldCheck, AlertCircle } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'RSA Key Generator & Signature Tool (Sign/Verify) | Formatho',
  description:
    'Generate RSA key pairs (2048-4096 bit), sign messages with an RSA private key (RSASSA-PKCS1-v1_5 or RSA-PSS), and verify RSA signatures online. 100% client-side - keys and messages never leave your browser.',
  keywords: [
    'rsa signature online',
    'generate rsa signature',
    'sign message with rsa private key',
    'rsa sign and verify online',
    'rsa key pair generator',
    'rsassa-pkcs1-v1_5',
    'rsa-pss signer',
    'verify rsa signature online'
  ],
  ogType: 'website'
})

type Tab = 'generate' | 'sign' | 'verify'
const tab = ref<Tab>('generate')
const tabs: { id: Tab; label: string; icon: typeof KeyRound }[] = [
  { id: 'generate', label: 'Generate', icon: KeyRound },
  { id: 'sign', label: 'Sign', icon: PenLine },
  { id: 'verify', label: 'Verify', icon: ShieldCheck }
]

// ---------- shared helpers ----------
function arrayBufferToPem(buffer: ArrayBuffer, label: string): string {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  const lines = base64.match(/.{1,64}/g) || []
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`
}

function pemToDer(pem: string): { der: Uint8Array; label: string } {
  const match = pem.replace(/\r/g, '').match(/-----BEGIN ([A-Z ]+)-----([\s\S]*?)-----END \1-----/)
  if (!match) throw new Error('No PEM block found. Expected -----BEGIN ... KEY----- armor.')
  const base64 = match[2].replace(/\s/g, '')
  const binary = atob(base64)
  const der = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) der[i] = binary.charCodeAt(i)
  return { der, label: match[1] }
}

// DER length encoding for the wrappers below
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

// Traditional "BEGIN RSA PRIVATE KEY" (PKCS#1) -> PKCS#8 so Web Crypto can import it
function pkcs1PrivateToPkcs8(pkcs1: Uint8Array): Uint8Array {
  const algId = der(0x30, new Uint8Array([0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00]))
  const version = der(0x02, new Uint8Array([0x00]))
  const inner = der(0x04, pkcs1)
  return der(0x30, concat(version, algId, inner))
}

// "BEGIN RSA PUBLIC KEY" (PKCS#1) -> SPKI
function pkcs1PublicToSpki(pkcs1: Uint8Array): Uint8Array {
  const algId = der(0x30, new Uint8Array([0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00]))
  const bits = new Uint8Array(1 + pkcs1.length) // leading 0 = no unused bits
  bits.set(pkcs1, 1)
  return der(0x30, concat(algId, der(0x03, bits)))
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

function algorithm(hash: string, pss: boolean): Algorithm {
  return pss
    ? { name: 'RSA-PSS', saltLength: { 'SHA-256': 32, 'SHA-384': 48, 'SHA-512': 64 }[hash] ?? 32 }
    : { name: 'RSASSA-PKCS1-v1_5' }
}

// ---------- generate tab ----------
const keySize = ref(2048)
const publicKey = ref('')
const privateKey = ref('')
const generating = ref(false)
const copiedKey = ref('')

const generateKeyPair = async () => {
  generating.value = true
  publicKey.value = ''
  privateKey.value = ''
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      { name: 'RSASSA-PKCS1-v1_5', modulusLength: keySize.value, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
      true,
      ['sign', 'verify']
    )
    publicKey.value = arrayBufferToPem(await window.crypto.subtle.exportKey('spki', keyPair.publicKey), 'PUBLIC KEY')
    privateKey.value = arrayBufferToPem(await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey), 'PRIVATE KEY')
  } catch (e) {
    console.error(e)
  } finally {
    generating.value = false
  }
}

async function copyText(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => (copiedKey.value = ''), 1500)
  } catch {
    /* clipboard unavailable */
  }
}

// ---------- sign tab ----------
const signKey = ref('')
const signMessage = ref('')
const signScheme = ref<'v15' | 'pss'>('v15')
const signHash = ref('SHA-256')
const signEncoding = ref<'base64' | 'hex'>('base64')
const signatureOut = ref('')
const signError = ref('')
const signing = ref(false)

async function runSign() {
  signError.value = ''
  signatureOut.value = ''
  signing.value = true
  try {
    // Import twice: once per scheme shape (v1_5 vs PSS import params differ only in name,
    // but Web Crypto requires the exact match with the sign algorithm)
    const key = await window.crypto.subtle.importKey(
      'pkcs8',
      (() => {
        const { der: b, label } = pemToDer(signKey.value)
        if (label === 'RSA PRIVATE KEY') return pkcs1PrivateToPkcs8(b).buffer as ArrayBuffer
        if (label !== 'PRIVATE KEY') throw new Error(`Expected a private key PEM, got "${label}".`)
        return b.buffer as ArrayBuffer
      })(),
      { name: signScheme.value === 'pss' ? 'RSA-PSS' : 'RSASSA-PKCS1-v1_5', hash: signHash.value },
      false,
      ['sign']
    )
    const sig = await window.crypto.subtle.sign(
      algorithm(signHash.value, signScheme.value === 'pss'),
      key,
      new TextEncoder().encode(signMessage.value)
    )
    const bytes = new Uint8Array(sig)
    signatureOut.value =
      signEncoding.value === 'hex'
        ? '0x' + [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
        : btoa(String.fromCharCode(...bytes))
  } catch (e: any) {
    signError.value = e?.message || 'Signing failed - check the key PEM format.'
  } finally {
    signing.value = false
  }
}

// ---------- verify tab ----------
const verifyKey = ref('')
const verifyMessage = ref('')
const verifySignature = ref('')
const verifyScheme = ref<'v15' | 'pss'>('v15')
const verifyHash = ref('SHA-256')
const verifyResult = ref<null | boolean>(null)
const verifyError = ref('')
const verifying = ref(false)

function decodeSignature(input: string): Uint8Array {
  const trimmed = input.trim()
  if (/^(0x)?[0-9a-f]+$/i.test(trimmed) && trimmed.replace(/^0x/, '').length % 2 === 0 && !/[+/=]/.test(trimmed)) {
    const hex = trimmed.replace(/^0x/, '')
    return new Uint8Array(hex.match(/.{2}/g)!.map((h) => parseInt(h, 16)))
  }
  const binary = atob(trimmed.replace(/\s/g, ''))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

async function verifySignatureFn() {
  verifyError.value = ''
  verifyResult.value = null
  verifying.value = true
  try {
    const { der: keyBytes, label } = pemToDer(verifyKey.value)
    let bytes = keyBytes
    if (label === 'RSA PUBLIC KEY') bytes = pkcs1PublicToSpki(keyBytes)
    else if (label !== 'PUBLIC KEY') throw new Error(`Expected a public key PEM, got "${label}".`)
    const key = await window.crypto.subtle.importKey(
      'spki',
      bytes.buffer as ArrayBuffer,
      { name: verifyScheme.value === 'pss' ? 'RSA-PSS' : 'RSASSA-PKCS1-v1_5', hash: verifyHash.value },
      false,
      ['verify']
    )
    const sigBytes = decodeSignature(verifySignature.value)
    verifyResult.value = await window.crypto.subtle.verify(
      algorithm(verifyHash.value, verifyScheme.value === 'pss'),
      key,
      sigBytes,
      new TextEncoder().encode(verifyMessage.value)
    )
  } catch (e: any) {
    verifyError.value = e?.message || 'Verification failed - check key, message, and signature formats.'
  } finally {
    verifying.value = false
  }
}

const selectClass = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg">
        <KeyRound class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">RSA Key Generator &amp; Signature Tool</h1>
        <p class="text-sm text-muted-foreground">
          Generate RSA key pairs, sign messages with a private key, verify signatures — all client-side
        </p>
      </div>
    </div>

    <!-- Tabs -->
    <Tabs v-model="tab">
      <TabsList aria-label="RSA operations">
        <TabsTrigger v-for="t in tabs" :key="t.id" :value="t.id" class="flex items-center gap-2">
          <component :is="t.icon" class="w-4 h-4" />
          {{ t.label }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="generate">
      <Card>
        <CardHeader><CardTitle class="text-lg">Generate RSA key pair</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="key-size">Key size (bits)</Label>
              <select id="key-size" v-model.number="keySize" :class="selectClass">
                <option :value="2048">2048 bits</option>
                <option :value="3072">3072 bits</option>
                <option :value="4096">4096 bits</option>
              </select>
            </div>
            <div class="flex items-end">
              <Button @click="generateKeyPair" :disabled="generating" class="w-full" aria-label="Generate RSA key pair">
                {{ generating ? 'Generating…' : 'Generate Key Pair' }}
              </Button>
            </div>
          </div>
          <p class="text-xs text-muted-foreground">
            Keys are generated in your browser via the Web Crypto API and never transmitted. 2048 bits is the
            practical minimum today; use 3072+ for long-lived keys.
          </p>
        </CardContent>
      </Card>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0">
            <CardTitle class="text-lg">Public key (PEM)</CardTitle>
            <Button v-if="publicKey" variant="ghost" size="sm" aria-label="Copy public key" @click="copyText(publicKey, 'pub')">
              <Check v-if="copiedKey === 'pub'" class="w-4 h-4" /><Copy v-else class="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea :model-value="publicKey" readonly :rows="8" class="font-mono text-xs" placeholder="Public key appears here…" aria-label="Generated public key" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0">
            <CardTitle class="text-lg">Private key (PEM)</CardTitle>
            <Button v-if="privateKey" variant="ghost" size="sm" aria-label="Copy private key" @click="copyText(privateKey, 'priv')">
              <Check v-if="copiedKey === 'priv'" class="w-4 h-4" /><Copy v-else class="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea :model-value="privateKey" readonly :rows="8" class="font-mono text-xs" placeholder="Private key appears here…" aria-label="Generated private key" />
          </CardContent>
        </Card>
      </div>
      </TabsContent>
      <TabsContent value="sign">
      <Card>
        <CardHeader><CardTitle class="text-lg">Sign a message with your RSA private key</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-2">
            <Label for="sign-key">Private key (PEM — PKCS#8 "PRIVATE KEY" or traditional "RSA PRIVATE KEY")</Label>
            <Textarea id="sign-key" v-model="signKey" :rows="6" class="font-mono text-xs" placeholder="-----BEGIN PRIVATE KEY-----" aria-label="RSA private key PEM" />
          </div>
          <div class="grid gap-2">
            <Label for="sign-msg">Message</Label>
            <Textarea id="sign-msg" v-model="signMessage" :rows="4" class="font-mono text-sm" placeholder="Text to sign" aria-label="Message to sign" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="grid gap-2">
              <Label for="sign-scheme">Scheme</Label>
              <select id="sign-scheme" v-model="signScheme" :class="selectClass">
                <option value="v15">RSASSA-PKCS1-v1_5</option>
                <option value="pss">RSA-PSS</option>
              </select>
            </div>
            <div class="grid gap-2">
              <Label for="sign-hash">Hash</Label>
              <select id="sign-hash" v-model="signHash" :class="selectClass">
                <option>SHA-256</option>
                <option>SHA-384</option>
                <option>SHA-512</option>
              </select>
            </div>
            <div class="grid gap-2">
              <Label for="sign-enc">Output</Label>
              <select id="sign-enc" v-model="signEncoding" :class="selectClass">
                <option value="base64">Base64</option>
                <option value="hex">Hex</option>
              </select>
            </div>
          </div>
          <Button @click="runSign" :disabled="signing || !signKey || !signMessage" class="w-full">
            {{ signing ? 'Signing…' : 'Sign Message' }}
          </Button>
          <p v-if="signError" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="w-4 h-4 shrink-0" /> {{ signError }}
          </p>
        </CardContent>
      </Card>

      <Card v-if="signatureOut">
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Signature ({{ signEncoding }})</CardTitle>
          <Button variant="ghost" size="sm" aria-label="Copy signature" @click="copyText(signatureOut, 'sig')">
            <Check v-if="copiedKey === 'sig'" class="w-4 h-4" /><Copy v-else class="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p class="font-mono text-xs break-all p-3 border border-border rounded-lg bg-muted/50">{{ signatureOut }}</p>
          <p class="text-xs text-muted-foreground mt-2">
            Verify it in the Verify tab with the matching public key, scheme, and hash.
          </p>
        </CardContent>
      </Card>
      </TabsContent>
      <TabsContent value="verify">
      <Card>
        <CardHeader><CardTitle class="text-lg">Verify an RSA signature</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-2">
            <Label for="verify-key">Public key (PEM — SPKI "PUBLIC KEY" or "RSA PUBLIC KEY")</Label>
            <Textarea id="verify-key" v-model="verifyKey" :rows="6" class="font-mono text-xs" placeholder="-----BEGIN PUBLIC KEY-----" aria-label="RSA public key PEM" />
          </div>
          <div class="grid gap-2">
            <Label for="verify-msg">Message (exact signed text)</Label>
            <Textarea id="verify-msg" v-model="verifyMessage" :rows="4" class="font-mono text-sm" placeholder="Text that was signed" aria-label="Signed message" />
          </div>
          <div class="grid gap-2">
            <Label for="verify-sig">Signature (Base64 or Hex)</Label>
            <Textarea id="verify-sig" v-model="verifySignature" :rows="3" class="font-mono text-xs" placeholder="Base64 or 0x-hex signature" aria-label="Signature to verify" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="verify-scheme">Scheme</Label>
              <select id="verify-scheme" v-model="verifyScheme" :class="selectClass">
                <option value="v15">RSASSA-PKCS1-v1_5</option>
                <option value="pss">RSA-PSS</option>
              </select>
            </div>
            <div class="grid gap-2">
              <Label for="verify-hash">Hash</Label>
              <select id="verify-hash" v-model="verifyHash" :class="selectClass">
                <option>SHA-256</option>
                <option>SHA-384</option>
                <option>SHA-512</option>
              </select>
            </div>
          </div>
          <Button @click="verifySignatureFn" :disabled="verifying || !verifyKey || !verifyMessage || !verifySignature" class="w-full">
            {{ verifying ? 'Verifying…' : 'Verify Signature' }}
          </Button>
          <p v-if="verifyError" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="w-4 h-4 shrink-0" /> {{ verifyError }}
          </p>
        </CardContent>
      </Card>

      <Card v-if="verifyResult !== null" :class="verifyResult ? 'border-green-500/40' : 'border-red-500/40'">
        <CardContent class="flex items-center gap-3 pt-6">
          <component
            :is="verifyResult ? ShieldCheck : AlertCircle"
            class="w-6 h-6 shrink-0"
            :class="verifyResult ? 'text-green-600' : 'text-red-500'"
          />
          <div>
            <p class="font-semibold" :class="verifyResult ? 'text-green-700' : 'text-red-600'">
              {{ verifyResult ? 'Signature is VALID' : 'Signature is INVALID' }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ verifyResult
                ? 'The signature matches the message under the given public key, scheme, and hash.'
                : 'The signature does not match. Check that the message is byte-identical, and that scheme and hash match what the signer used.' }}
            </p>
          </div>
        </CardContent>
      </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
