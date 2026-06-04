<script setup lang="ts">
import { ref, computed } from 'vue'
import { bls12_381 } from '@noble/curves/bls12-381.js'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Key, PenTool, ShieldCheck, Link2 } from 'lucide-vue-next'
import Breadcrumb from '@/components/Breadcrumb.vue'

const mode = ref('sign')
const privateKeyHex = ref('')
const message = ref('')
const signatureHex = ref('')
const publicKeyHex = ref('')
const verifyPubKey = ref('')
const verifyMessage = ref('')
const verifySignature = ref('')
const copyField = ref<string | null>(null)

// Generate a random private key
const generateKey = () => {
  const key = bls12_381.utils.randomPrivateKey()
  privateKeyHex.value = Buffer.from(key).toString('hex')
}

// Derive public key from private key
const publicKey = computed(() => {
  if (!privateKeyHex.value) return ''
  try {
    const privBytes = hexToBytes(privateKeyHex.value)
    const pub = bls12_381.getPublicKey(privBytes)
    return Buffer.from(pub).toString('hex')
  } catch {
    return 'Invalid private key'
  }
})

// Sign a message
const signResult = computed(() => {
  if (!privateKeyHex.value || !message.value) return ''
  try {
    const privBytes = hexToBytes(privateKeyHex.value)
    const msgBytes = new TextEncoder().encode(message.value)
    const sig = bls12_381.sign(msgBytes, privBytes)
    return Buffer.from(sig).toString('hex')
  } catch {
    return 'Signing failed'
  }
})

// Verify a signature
const verifyResult = computed(() => {
  if (!verifyPubKey.value || !verifyMessage.value || !verifySignature.value) return ''
  try {
    const pubBytes = hexToBytes(verifyPubKey.value)
    const msgBytes = new TextEncoder().encode(verifyMessage.value)
    const sigBytes = hexToBytes(verifySignature.value)
    const valid = bls12_381.verify(sigBytes, msgBytes, pubBytes)
    return valid
  } catch {
    return null
  }
})

// Aggregate signatures
const aggSigs = ref('')
const aggResult = computed(() => {
  if (!aggSigs.value.trim()) return ''
  try {
    const sigs = aggSigs.value
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => hexToBytes(s))
    if (sigs.length < 2) return 'Need at least 2 signatures to aggregate'
    const aggregated = bls12_381.aggregateSignatures(sigs)
    return Buffer.from(aggregated).toString('hex')
  } catch {
    return 'Aggregation failed — check hex format'
  }
})

// Aggregate public keys
const aggPubs = ref('')
const aggPubResult = computed(() => {
  if (!aggPubs.value.trim()) return ''
  try {
    const pubs = aggPubs.value
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => hexToBytes(s))
    if (pubs.length < 2) return 'Need at least 2 public keys to aggregate'
    const aggregated = bls12_381.aggregatePublicKeys(pubs)
    return Buffer.from(aggregated).toString('hex')
  } catch {
    return 'Aggregation failed — check hex format'
  }
})

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex length')
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return bytes
}

const copyToClipboard = (text: string, field: string) => {
  navigator.clipboard.writeText(text)
  copyField.value = field
  setTimeout(() => { copyField.value = null }, 2000)
}

// Auto-generate key on mount
generateKey()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">BLS Signatures</h1>
        <p class="text-muted-foreground mt-1">Generate, verify, and aggregate BLS12-381 signatures — all client-side</p>
      </div>
      <Breadcrumb />
    </div>

    <Tabs v-model="mode" class="w-full max-w-4xl mx-auto">
      <TabsList class="grid w-full grid-cols-4">
        <TabsTrigger value="sign" class="flex items-center gap-2">
          <PenTool class="w-4 h-4" /> Sign
        </TabsTrigger>
        <TabsTrigger value="verify" class="flex items-center gap-2">
          <ShieldCheck class="w-4 h-4" /> Verify
        </TabsTrigger>
        <TabsTrigger value="aggregate-sig" class="flex items-center gap-2">
          <Link2 class="w-4 h-4" /> Aggregate Sigs
        </TabsTrigger>
        <TabsTrigger value="aggregate-pub" class="flex items-center gap-2">
          <Key class="w-4 h-4" /> Aggregate Keys
        </TabsTrigger>
      </TabsList>

      <!-- SIGN TAB -->
      <TabsContent value="sign">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Private Key</CardTitle>
              <CardDescription>BLS12-381 private key (32 bytes hex)</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex gap-2">
                <Input v-model="privateKeyHex" placeholder="hex private key..." class="font-mono text-sm" />
                <Button @click="generateKey" variant="outline" size="sm">Generate</Button>
              </div>
              <div v-if="publicKey && publicKey !== 'Invalid private key'" class="space-y-2">
                <Label>Public Key (48 bytes)</Label>
                <div class="flex items-center gap-2">
                  <code class="text-xs bg-muted p-2 rounded flex-1 break-all">{{ publicKey }}</code>
                  <Button @click="copyToClipboard(publicKey, 'pubkey')" variant="ghost" size="icon">
                    <Check v-if="copyField === 'pubkey'" class="w-4 h-4 text-green-500" />
                    <Copy v-else class="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div v-if="publicKey === 'Invalid private key'" class="text-sm text-destructive">
                Invalid private key — must be 32 bytes (64 hex chars)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sign Message</CardTitle>
              <CardDescription>Enter a message to sign with your private key</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <Label>Message</Label>
              <CodeEditor
                v-model="message"
                language="plaintext"
                class="min-h-[100px]"
                placeholder="Enter message to sign..."
              />
              <div v-if="signResult && signResult !== 'Signing failed'" class="space-y-2">
                <Label>Signature (96 bytes)</Label>
                <div class="flex items-center gap-2">
                  <code class="text-xs bg-muted p-2 rounded flex-1 break-all">{{ signResult }}</code>
                  <Button @click="copyToClipboard(signResult, 'sig')" variant="ghost" size="icon">
                    <Check v-if="copyField === 'sig'" class="w-4 h-4 text-green-500" />
                    <Copy v-else class="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div v-if="signResult === 'Signing failed'" class="text-sm text-destructive">
                Signing failed — check your private key
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- VERIFY TAB -->
      <TabsContent value="verify">
        <Card class="mt-4 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Verify Signature</CardTitle>
            <CardDescription>Verify a BLS12-381 signature against a public key and message</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label>Public Key (48 bytes hex)</Label>
              <Input v-model="verifyPubKey" placeholder="48-byte hex public key..." class="font-mono text-sm" />
            </div>
            <div class="space-y-2">
              <Label>Message</Label>
              <CodeEditor
                v-model="verifyMessage"
                language="plaintext"
                class="min-h-[80px]"
                placeholder="Enter original message..."
              />
            </div>
            <div class="space-y-2">
              <Label>Signature (96 bytes hex)</Label>
              <Input v-model="verifySignature" placeholder="96-byte hex signature..." class="font-mono text-sm" />
            </div>
            <div v-if="verifyResult !== '' && verifyResult !== null" class="p-4 rounded-lg"
              :class="verifyResult ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'">
              <div class="flex items-center gap-2 font-semibold">
                <ShieldCheck class="w-5 h-5" />
                {{ verifyResult ? '✓ Signature is VALID' : '✗ Signature is INVALID' }}
              </div>
            </div>
            <div v-if="verifyResult === null" class="text-sm text-destructive">
              Verification failed — check hex format of inputs
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- AGGREGATE SIGNATURES TAB -->
      <TabsContent value="aggregate-sig">
        <Card class="mt-4 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Aggregate Signatures</CardTitle>
            <CardDescription>Combine multiple BLS signatures into one (one per line, 96 bytes hex each)</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <Label>Signatures (one per line)</Label>
            <CodeEditor
              v-model="aggSigs"
              language="plaintext"
              class="min-h-[160px]"
              placeholder="Paste BLS signatures here, one per line..."
            />
            <div v-if="aggResult && !aggResult.includes('failed') && !aggResult.includes('Need')" class="space-y-2">
              <Label>Aggregated Signature</Label>
              <div class="flex items-center gap-2">
                <code class="text-xs bg-muted p-2 rounded flex-1 break-all">{{ aggResult }}</code>
                <Button @click="copyToClipboard(aggResult, 'aggsig')" variant="ghost" size="icon">
                  <Check v-if="copyField === 'aggsig'" class="w-4 h-4 text-green-500" />
                  <Copy v-else class="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div v-if="aggResult && (aggResult.includes('failed') || aggResult.includes('Need'))" class="text-sm text-destructive">
              {{ aggResult }}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- AGGREGATE PUBLIC KEYS TAB -->
      <TabsContent value="aggregate-pub">
        <Card class="mt-4 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Aggregate Public Keys</CardTitle>
            <CardDescription>Combine multiple BLS public keys into one (one per line, 48 bytes hex each)</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <Label>Public Keys (one per line)</Label>
            <CodeEditor
              v-model="aggPubs"
              language="plaintext"
              class="min-h-[160px]"
              placeholder="Paste BLS public keys here, one per line..."
            />
            <div v-if="aggPubResult && !aggPubResult.includes('failed') && !aggPubResult.includes('Need')" class="space-y-2">
              <Label>Aggregated Public Key</Label>
              <div class="flex items-center gap-2">
                <code class="text-xs bg-muted p-2 rounded flex-1 break-all">{{ aggPubResult }}</code>
                <Button @click="copyToClipboard(aggPubResult, 'aggpub')" variant="ghost" size="icon">
                  <Check v-if="copyField === 'aggpub'" class="w-4 h-4 text-green-500" />
                  <Copy v-else class="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div v-if="aggPubResult && (aggPubResult.includes('failed') || aggPubResult.includes('Need'))" class="text-sm text-destructive">
              {{ aggPubResult }}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- Info Section -->
    <Card class="max-w-4xl mx-auto w-full mt-4">
      <CardHeader>
        <CardTitle class="text-lg">About BLS Signatures</CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p><strong>BLS (Boneh-Lynn-Shacham)</strong> is a signature scheme using bilinear pairings on the BLS12-381 curve. It enables <strong>signature aggregation</strong> — multiple signatures can be combined into one compact signature, verified against an aggregated public key.</p>
        <ul class="list-disc list-inside space-y-1 ml-2">
          <li><strong>Private key:</strong> 32 bytes (256-bit scalar)</li>
          <li><strong>Public key:</strong> 48 bytes (G1 point, compressed)</li>
          <li><strong>Signature:</strong> 96 bytes (G2 point, compressed)</li>
          <li><strong>Aggregation:</strong> n signatures → 1 signature (96 bytes). Constant size regardless of n.</li>
        </ul>
        <p>Used in Ethereum consensus (validator attestations), DFINITY, Filecoin, Algorand, and many threshold signature schemes.</p>
        <p class="text-xs">⚡ All operations run 100% client-side. No data leaves your browser.</p>
      </CardContent>
    </Card>
  </div>
</template>
