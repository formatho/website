<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Unlock, Binary } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'CTR Mode Encryption Visualizer - Counter Mode Demo | Formatho',
  description:
    'Interactive CTR mode demo: enter plaintext and key, watch counter blocks generate a keystream that XORs with plaintext. Used by AES-GCM, Arcium (Rescue cipher), and more. Free, client-side.',
  keywords: ['ctr mode demo', 'counter mode encryption', 'ctr mode visualizer', 'block cipher modes', 'aes ctr mode', 'keystream encryption'],
  ogType: 'website'
})

const plaintext = ref('Hello CTR Mode')
const keyHex = ref('')
const nonceHex = ref('')
const step = ref(0)

interface Block {
  counter: string
  counterHex: string
  keystreamHex: string
  plaintextHex: string
  plaintextChar: string
  ciphertextHex: string
}

const blocks = ref<Block[]>([])
const ciphertextHex = ref('')

function hexEncode(s: string): string {
  return [...new TextEncoder().encode(s)].map(b => b.toString(16).padStart(2, '0')).join('')
}

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  return [...arr].map(b => b.toString(16).padStart(2, '0')).join('')
}

function xorHex(a: string, b: string): string {
  let result = ''
  for (let i = 0; i < Math.min(a.length, b.length); i += 2) {
    const xa = parseInt(a.slice(i, i + 2), 16)
    const xb = parseInt(b.slice(i, i + 2), 16)
    result += (xa ^ xb).toString(16).padStart(2, '0')
  }
  return result
}

// Simple deterministic "block cipher" for demo (XOR with key rotation)
function demoBlockCipher(input: string, key: string): string {
  let out = ''
  for (let i = 0; i < input.length; i += 2) {
    const kc = key.charCodeAt((i / 2) % key.length)
    const iv = parseInt(input.slice(i, i + 2), 16)
    out += ((iv + kc) % 256).toString(16).padStart(2, '0')
  }
  return out
}

function run() {
  if (!plaintext.value.trim()) return
  step.value = 1

  if (!keyHex.value) keyHex.value = randomHex(16) // 128-bit key
  if (!nonceHex.value) nonceHex.value = randomHex(8) // 8-byte nonce

  const ptHex = hexEncode(plaintext.value)
  const blockSize = 16 // 16-byte blocks (128-bit)
  const numBlocks = Math.ceil(ptHex.length / (blockSize * 2))

  blocks.value = []
  let ctHex = ''

  for (let i = 0; i < numBlocks; i++) {
    // Counter block: nonce (8 bytes) + counter (4 bytes) + zeros (4 bytes)
    const counterVal = i
    const counterBytes = counterVal.toString(16).padStart(8, '0')
    const counterBlock = nonceHex.value + counterBytes + '00000000'

    // Generate keystream by "encrypting" the counter block
    const keystream = demoBlockCipher(counterBlock, keyHex.value)

    // XOR keystream with plaintext block
    const ptBlock = ptHex.slice(i * blockSize * 2, (i + 1) * blockSize * 2).padEnd(blockSize * 2, '00')
    const ctBlock = xorHex(ptBlock, keystream)
    ctHex += ctBlock

    const ptChars = plaintext.value.slice(i * blockSize, (i + 1) * blockSize)

    blocks.value.push({
      counter: `Block ${i}`,
      counterHex: counterBlock,
      keystreamHex: keystream,
      plaintextHex: ptBlock,
      plaintextChar: ptChars,
      ciphertextHex: ctBlock
    })
  }

  ciphertextHex.value = ctHex
  step.value = 2
}

function reset() {
  plaintext.value = ''
  keyHex.value = ''
  nonceHex.value = ''
  blocks.value = []
  ciphertextHex.value = ''
  step.value = 0
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Binary class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">CTR Mode Encryption Visualizer</h1>
        <p class="text-sm text-muted-foreground">Watch counter blocks generate a keystream that XORs with plaintext — step by step</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="grid gap-2 md:col-span-1">
            <Label>Plaintext</Label>
            <Input v-model="plaintext" placeholder="Enter text..." aria-label="Plaintext" />
          </div>
          <div class="grid gap-2">
            <Label>Key (hex, 16 bytes)</Label>
            <Input v-model="keyHex" class="font-mono text-xs" placeholder="auto-generated" aria-label="Encryption key" />
          </div>
          <div class="grid gap-2">
            <Label>Nonce (hex, 8 bytes)</Label>
            <Input v-model="nonceHex" class="font-mono text-xs" placeholder="auto-generated" aria-label="Nonce" />
          </div>
        </div>
        <div class="flex gap-2">
          <Button @click="run" :disabled="!plaintext">Encrypt</Button>
          <Button variant="outline" @click="reset">Reset</Button>
        </div>
      </CardContent>
    </Card>

    <template v-if="step >= 2">
      <Card class="border-primary/30">
        <CardHeader>
          <CardTitle class="text-lg">Block-by-block breakdown</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <p class="text-xs text-muted-foreground">
            CTR mode turns a block cipher into a stream cipher. It never encrypts the plaintext directly —
            it encrypts incrementing counter blocks to produce a keystream, then XORs that with the plaintext.
          </p>
          <div v-for="b in blocks" :key="b.counter" class="p-3 border border-border rounded-lg space-y-1">
            <p class="text-xs font-bold">{{ b.counter }} <span class="text-muted-foreground font-normal">— plaintext: "{{ b.plaintextChar }}"</span></p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              <div class="p-2 bg-muted/40 rounded">
                <span class="text-muted-foreground">Counter block:</span><br>{{ b.counterHex }}
              </div>
              <div class="p-2 bg-amber-50 rounded">
                <span class="text-muted-foreground">E(counter, key) = keystream:</span><br>{{ b.keystreamHex }}
              </div>
              <div class="p-2 bg-blue-50 rounded">
                <span class="text-muted-foreground">Plaintext block:</span><br>{{ b.plaintextHex }}
              </div>
              <div class="p-2 bg-green-50 rounded">
                <span class="text-muted-foreground">XOR → ciphertext:</span><br>{{ b.ciphertextHex }}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Ciphertext (hex)</CardTitle>
          <CopyButton v-if="ciphertextHex" :text="ciphertextHex" aria-label="Copy ciphertext" />
        </CardHeader>
        <CardContent>
          <p class="font-mono text-xs break-all p-3 border border-border rounded-lg bg-muted/40">{{ ciphertextHex }}</p>
        </CardContent>
      </Card>

      <Card class="bg-muted/20">
        <CardContent class="pt-5 space-y-2 text-xs text-muted-foreground">
          <p><strong>Key properties of CTR mode:</strong></p>
          <ul class="list-disc ml-4 space-y-1">
            <li><strong>Parallelizable</strong> — each block can be encrypted independently (counter is deterministic)</li>
            <li><strong>No padding needed</strong> — XOR with keystream handles any length</li>
            <li><strong>Never reuse a nonce+counter</strong> — same keystream = broken security</li>
            <li><strong>Used in:</strong> AES-CTR, AES-GCM (internally), Arcium's Rescue cipher, IPSec</li>
          </ul>
          <p class="mt-2"><strong>Arcium note:</strong> Arcium uses counters of the form <code>[nonce, i, 0, 0, 0]</code> where nonce is 16 bytes and i increments. After decryption, the MXE increments the nonce by 1 for output encryption.</p>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
