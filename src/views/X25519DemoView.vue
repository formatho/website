<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { ArrowRightLeft, KeyRound, Lock, Unlock } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'X25519 Key Exchange Demo - Diffie-Hellman Online | Formatho',
  description:
    'Generate X25519 keypairs and perform ECDH key exchange in your browser. See how two parties derive the same shared secret without ever transmitting it. Used by Signal, TLS 1.3, Arcium. Free, client-side.',
  keywords: ['x25519 key exchange', 'diffie hellman demo', 'ecdh x25519', 'curve25519 key exchange', 'shared secret derivation', 'elliptic curve diffie hellman'],
  ogType: 'website'
})

const alicePub = ref('')
const alicePriv = ref('')
const bobPub = ref('')
const bobPriv = ref('')
const aliceShared = ref('')
const bobShared = ref('')
const step = ref(0)
const error = ref('')

async function generateKeys() {
  error.value = ''
  step.value = 1
  try {
    const alice = await crypto.subtle.generateKey({ name: 'X25519' }, true, ['deriveKey', 'deriveBits'])
    const bob = await crypto.subtle.generateKey({ name: 'X25519' }, true, ['deriveKey', 'deriveBits'])

    const alicePubBuf = await crypto.subtle.exportKey('raw', alice.publicKey)
    const alicePrivBuf = await crypto.subtle.exportKey('pkcs8', alice.privateKey)
    const bobPubBuf = await crypto.subtle.exportKey('raw', bob.publicKey)
    const bobPrivBuf = await crypto.subtle.exportKey('pkcs8', bob.privateKey)

    alicePub.value = bufToHex(alicePubBuf)
    alicePriv.value = bufToHex(alicePrivBuf).slice(-96) // last 48 bytes of PKCS8
    bobPub.value = bufToHex(bobPubBuf)
    bobPriv.value = bufToHex(bobPrivBuf).slice(-96)

    // derive shared secrets
    const aliceSharedBits = await crypto.subtle.deriveBits(
      { name: 'X25519', public: alice.publicKey },
      bob.privateKey,
      256
    )
    const bobSharedBits = await crypto.subtle.deriveBits(
      { name: 'X25519', public: bob.publicKey },
      alice.privateKey,
      256
    )

    aliceShared.value = bufToHex(aliceSharedBits)
    bobShared.value = bufToHex(bobSharedBits)
    step.value = 2
  } catch (e: any) {
    error.value = 'X25519 not supported in this browser. ' + (e?.message || '')
  }
}

function bufToHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

function reset() {
  alicePub.value = ''; alicePriv.value = ''; bobPub.value = ''; bobPriv.value = ''
  aliceShared.value = ''; bobShared.value = ''; step.value = 0; error.value = ''
}

const matchShared = aliceShared.value && bobShared.value && aliceShared.value === bobShared.value
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><ArrowRightLeft class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">X25519 Key Exchange Demo</h1>
        <p class="text-sm text-muted-foreground">Watch two parties derive the same shared secret without ever transmitting it</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock class="w-4 h-4" />
          <span>Keys are generated and the exchange runs entirely in your browser via the Web Crypto API.</span>
        </div>
      </CardContent>
    </Card>

    <div class="flex gap-2">
      <Button @click="generateKeys" :disabled="step > 0">Generate Keys & Exchange</Button>
      <Button variant="outline" @click="reset" :disabled="step === 0">Reset</Button>
    </div>

    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

    <!-- Step 1: Keys generated -->
    <div v-if="step >= 1" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card class="border-blue-500/30">
        <CardHeader>
          <CardTitle class="text-base flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">A</span>
            Alice's Keys
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <div>
            <p class="text-xs text-muted-foreground mb-1">Public key (32 bytes — safe to share):</p>
            <p class="font-mono text-xs break-all p-2 bg-muted/40 rounded border border-border">{{ alicePub }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground mb-1">Private key (never transmitted):</p>
            <p class="font-mono text-xs break-all p-2 bg-red-50 rounded border border-red-200">{{ alicePriv }}</p>
          </div>
        </CardContent>
      </Card>

      <Card class="border-green-500/30">
        <CardHeader>
          <CardTitle class="text-base flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[10px] font-bold">B</span>
            Bob's Keys
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <div>
            <p class="text-xs text-muted-foreground mb-1">Public key (32 bytes — safe to share):</p>
            <p class="font-mono text-xs break-all p-2 bg-muted/40 rounded border border-border">{{ bobPub }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground mb-1">Private key (never transmitted):</p>
            <p class="font-mono text-xs break-all p-2 bg-red-50 rounded border border-red-200">{{ bobPriv }}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Step 2: Exchange -->
    <Card v-if="step >= 2" class="border-primary/40">
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <KeyRound class="w-5 h-5" /> The Exchange
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 p-4 rounded-lg bg-muted/20">
          <div class="text-center">
            <p class="text-xs font-bold text-blue-600">Alice computes:</p>
            <code class="text-xs font-mono">shared = DH(alice_priv, bob_pub)</code>
            <p class="font-mono text-xs break-all mt-1 p-2 bg-blue-50 rounded border border-blue-200 max-w-48 mx-auto">{{ aliceShared }}</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <ArrowRightLeft class="w-6 h-6 text-primary" />
            <span class="text-xs text-muted-foreground">same secret</span>
            <component :is="matchShared ? 'Check' : 'X'" class="w-5 h-5" :class="matchShared ? 'text-green-600' : 'text-red-500'" />
          </div>
          <div class="text-center">
            <p class="text-xs font-bold text-green-600">Bob computes:</p>
            <code class="text-xs font-mono">shared = DH(bob_priv, alice_pub)</code>
            <p class="font-mono text-xs break-all mt-1 p-2 bg-green-50 rounded border border-green-200 max-w-48 mx-auto">{{ bobShared }}</p>
          </div>
        </div>

        <div class="p-3 border border-border rounded-lg text-xs text-muted-foreground space-y-1">
          <p><strong>What just happened:</strong> Alice and Bob each combined their own private key with the other's public key. Both arrived at the same 256-bit shared secret. An eavesdropper who sees both public keys cannot compute this secret (that's the elliptic curve discrete logarithm problem).</p>
          <p class="mt-2"><strong>Where this is used:</strong> TLS 1.3, Signal Protocol, SSH, WireGuard, and Arcium (client↔MXE encryption).</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
