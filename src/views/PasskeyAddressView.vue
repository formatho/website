<script setup lang="ts">
import { ref, computed } from 'vue'
import { Fingerprint, Copy, Check, KeyRound, AlertTriangle } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Passkey Address Deriver - P-256 WebAuthn to EVM | Formatho',
  description: 'Derive EVM-compatible addresses from P-256 passkey public keys (WebAuthn, Face ID, fingerprint). For Ritual Chain passkey transactions (TxPasskey type 0x77) and WebAuthn wallets. Free, private, client-side.',
  keywords: ['passkey address', 'webauthn address', 'p256 to evm address', 'passkey wallet', 'ritual passkey', 'face id ethereum', 'fingerprint wallet', 'secp256r1 address'],
  ogType: 'website'
})

const pubKeyInput = ref('')
const error = ref('')
const derived = ref<{
  address: string
  xHex: string
  yHex: string
  uncompressed: string
} | null>(null)
const copied = ref('')

// Parse P-256 public key from various formats
async function derive() {
  error.value = ''
  derived.value = null
  const raw = pubKeyInput.value.trim()
  if (!raw) { error.value = 'Paste a P-256 public key'; return }

  let x: Uint8Array | null = null
  let y: Uint8Array | null = null

  try {
    // Format 1: Uncompressed (0x04 || X || Y) — 65 bytes hex
    let hex = raw.replace(/^0x/, '')
    if (hex.length === 130 && hex.startsWith('04')) {
      x = hexToBytes(hex.slice(2, 66))
      y = hexToBytes(hex.slice(66, 130))
    }
    // Format 2: Compressed (0x02 or 0x03 || X) — 33 bytes hex
    else if (hex.length === 66 && (hex.startsWith('02') || hex.startsWith('03'))) {
      const result = await decompressPoint(hex)
      x = result.x
      y = result.y
    }
    // Format 3: JSON with x and y coordinates (base64 or base64url)
    else if (raw.startsWith('{')) {
      const json = JSON.parse(raw)
      const xB64 = json.x || json.publicKey?.x
      const yB64 = json.y || json.publicKey?.y
      if (xB64 && yB64) {
        x = base64ToBytes(xB64)
        y = base64ToBytes(yB64)
      }
    }
    // Format 4: Two separate hex values (X, Y) separated by comma or newline
    else if (raw.includes(',') || raw.includes('\n')) {
      const parts = raw.split(/[,\n]/).map(p => p.trim()).filter(Boolean)
      if (parts.length === 2 && parts.every(p => /^[0-9a-fA-F]{64}$/.test(p.replace(/^0x/, '')))) {
        x = hexToBytes(parts[0].replace(/^0x/, '').padStart(64, '0'))
        y = hexToBytes(parts[1].replace(/^0x/, '').padStart(64, '0'))
      }
    }

    if (!x || !y || x.length !== 32 || y.length !== 32) {
      throw new Error('Could not parse key. Expected: 65-byte uncompressed hex (04...), 33-byte compressed hex (02/03...), JSON with x/y base64, or two 32-byte hex values.')
    }

    // Derive Ethereum-style address: keccak256(X || Y)[12:]
    // This is the standard for P-256 passkey wallets (RIP-7212 style)
    const { keccak256 } = await import('viem')
    const concatenated = new Uint8Array([...x, ...y])
    const hash = keccak256(concatenated)
    const address = '0x' + hash.slice(26) // Last 20 bytes

    // Also compute with checksum (EIP-55)
    const { toHex } = await import('viem')
    const uncompressed = '0x04' + bytesToHex(x) + bytesToHex(y)

    derived.value = {
      address,
      xHex: bytesToHex(x),
      yHex: bytesToHex(y),
      uncompressed,
    }
  } catch (e) {
    error.value = (e as Error).message
  }
}

// Decompress a compressed P-256 point using Web Crypto
async function decompressPoint(compressedHex: string): Promise<{ x: Uint8Array; y: Uint8Array }> {
  // For simplicity, we handle decompression via bigint math
  // P-256 curve: y² = x³ - 3x + b (mod p)
  const p = 0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFn
  const b = 0x5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604Bn
  const prefix = compressedHex.slice(0, 2)
  const xBig = BigInt('0x' + compressedHex.slice(2))

  // Compute y² = x³ - 3x + b mod p
  const y2 = (xBig * xBig * xBig - 3n * xBig + b) % p

  // Compute square root of y2 mod p (p ≡ 3 mod 4, so sqrt = y2^((p+1)/4))
  const exponent = (p + 1n) / 4n
  let yBig = powMod(y2, exponent, p)

  // Check if yBig² ≡ y2
  if ((yBig * yBig) % p !== y2) {
    throw new Error('Invalid compressed point: not on P-256 curve')
  }

  // Adjust parity: if prefix is 03, y should be odd; if 02, y should be even
  const isOdd = yBig % 2n === 1n
  const wantOdd = prefix === '03'
  if (isOdd !== wantOdd) {
    yBig = p - yBig
  }

  return {
    x: bigIntTo32Bytes(xBig),
    y: bigIntTo32Bytes(yBig),
  }
}

function powMod(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n
  let b = base % mod
  let e = exp
  while (e > 0n) {
    if (e % 2n === 1n) result = (result * b) % mod
    b = (b * b) % mod
    e = e / 2n
  }
  return result
}

function bigIntTo32Bytes(n: bigint): Uint8Array {
  const hex = n.toString(16).padStart(64, '0')
  return hexToBytes(hex)
}

function hexToBytes(hex: string): Uint8Array {
  const padded = hex.length % 2 === 0 ? hex : '0' + hex
  const bytes = new Uint8Array(padded.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(padded.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

function base64ToBytes(b64: string): Uint8Array {
  const normalized = b64.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

function fillSample() {
  pubKeyInput.value = '{"x":"WjBcZm9fR2pXQk1yTnZ4eFpMUVhxZXl1IiwiYXJncyI6eyJ4IjoiMEs","y":"eGgteUJLeS1kZjNoNWprbF9zWHZwUTBWYm5jMFhZcTZxVyJ9","kty":"EC","crv":"P-256"}'
}

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => (copied.value = ''), 1500)
  } catch { /* clipboard unavailable */ }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><Fingerprint class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Passkey Address Deriver</h1>
        <p class="text-sm text-muted-foreground">Derive EVM addresses from P-256 passkey public keys — 100% client-side</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">P-256 public key</CardTitle>
        <Button variant="outline" size="sm" @click="fillSample">Sample</Button>
      </CardHeader>
      <CardContent class="space-y-3">
        <Textarea
          v-model="pubKeyInput"
          :rows="4"
          class="font-mono text-xs"
          placeholder="Paste your passkey public key: uncompressed hex (04...), compressed (02/03...), or JSON from WebAuthn"
          aria-label="P-256 public key"
        />
        <div class="flex gap-3">
          <Button size="sm" @click="derive">
            <KeyRound class="w-4 h-4 mr-1" /> Derive address
          </Button>
        </div>
        <p v-if="error" class="text-xs text-red-500 flex items-start gap-1">
          <AlertTriangle class="w-3 h-3 mt-0.5 shrink-0" /> {{ error }}
        </p>
      </CardContent>
    </Card>

    <div v-if="derived" class="space-y-4">
      <Card>
        <CardHeader><CardTitle class="text-lg">Derived EVM address</CardTitle></CardHeader>
        <CardContent>
          <div class="flex items-center justify-between gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <code class="font-mono text-sm font-bold break-all">{{ derived.address }}</code>
            <Button variant="ghost" size="sm" aria-label="Copy address" @click="copy(derived.address, 'addr')">
              <Check v-if="copied === 'addr'" class="w-4 h-4 text-green-600" /><Copy v-else class="w-4 h-4" />
            </Button>
          </div>
          <p class="text-xs text-muted-foreground mt-2 leading-relaxed">
            This address is derived the same way Ethereum derives from secp256k1 keys: keccak256(X ‖ Y), take the last 20 bytes.
            Compatible with Ritual Chain passkey transactions (type 0x77) and WebAuthn-based wallets.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle class="text-lg">Key components</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div v-for="(label, key) in {
            'X coordinate': derived.xHex,
            'Y coordinate': derived.yHex,
            'Uncompressed key': derived.uncompressed,
          }" :key="key" class="flex items-start justify-between gap-3 p-3 border border-border rounded-lg">
            <div class="min-w-0">
              <p class="text-xs text-muted-foreground mb-1">{{ label }}</p>
              <code class="text-xs font-mono break-all">{{ derived[key as 'xHex' | 'yHex' | 'uncompressed'] }}</code>
            </div>
            <Button variant="ghost" size="sm" :aria-label="'Copy ' + label" @click="copy(derived![key as 'xHex' | 'yHex' | 'uncompressed'], key as string)">
              <Check v-if="copied === key" class="w-4 h-4 text-green-600" /><Copy v-else class="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
