<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Copy, Check, Fingerprint, AlertCircle } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'X.509 Certificate Fingerprint Calculator Online | Formatho',
  description:
    'Calculate SHA-1, SHA-256, SHA-384 and SHA-512 fingerprints of X.509 certificates from PEM. Used for certificate pinning, SAML key descriptors, and TLS verification. 100% client-side.',
  keywords: [
    'certificate fingerprint calculator',
    'x509 fingerprint',
    'cert sha256 fingerprint online',
    'pem fingerprint',
    'saml certificate fingerprint',
    'certificate thumbprint'
  ],
  ogType: 'website'
})

const pem = ref('')
const error = ref('')
const fingerprints = ref<{ algo: string; hex: string; colon: string }[]>([])
const copiedKey = ref('')

async function compute() {
  error.value = ''
  fingerprints.value = []
  const match = pem.value.replace(/\r/g, '').match(/-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/)
  if (!match) {
    error.value = 'No -----BEGIN CERTIFICATE----- PEM block found.'
    return
  }
  const b64 = match[1].replace(/\s/g, '')
  let bin: string
  try {
    bin = atob(b64)
  } catch {
    error.value = 'The certificate body is not valid Base64.'
    return
  }
  const der = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) der[i] = bin.charCodeAt(i)
  if (der.length < 50) {
    error.value = 'Certificate too short to be valid DER.'
    return
  }
  for (const algo of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
    const digest = new Uint8Array(await crypto.subtle.digest(algo, der as unknown as ArrayBuffer))
    const hex = [...digest].map((b) => b.toString(16).padStart(2, '0')).join('')
    const colon = (hex.match(/.{2}/g) || []).join(':').toUpperCase()
    fingerprints.value.push({ algo, hex, colon })
  }
}

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => (copiedKey.value = ''), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Fingerprint class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">X.509 Certificate Fingerprint</h1>
        <p class="text-sm text-muted-foreground">SHA-1 / SHA-256 / SHA-384 / SHA-512 thumbprints from a PEM certificate — computed locally</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle class="text-lg">Certificate (PEM)</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label for="cert-pem">Paste your certificate</Label>
          <Textarea id="cert-pem" v-model="pem" :rows="7" class="font-mono text-xs" placeholder="-----BEGIN CERTIFICATE-----" aria-label="Certificate PEM" />
        </div>
        <Button class="w-full" :disabled="!pem.trim()" @click="compute">Calculate fingerprints</Button>
        <p v-if="error" class="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle class="w-4 h-4 shrink-0" /> {{ error }}
        </p>
      </CardContent>
    </Card>

    <Card v-if="fingerprints.length">
      <CardHeader><CardTitle class="text-lg">Fingerprints (over the DER-encoded certificate)</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <div v-for="f in fingerprints" :key="f.algo" class="p-3 border border-border rounded-lg space-y-1">
          <div class="flex items-center justify-between">
            <p class="text-xs font-bold uppercase tracking-wide">{{ f.algo }}</p>
            <div class="flex gap-1">
              <Button variant="ghost" size="sm" :aria-label="'Copy ' + f.algo + ' hex'" @click="copy(f.hex, f.algo + 'h')">
                <Check v-if="copiedKey === f.algo + 'h'" class="w-4 h-4" /><Copy v-else class="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" :aria-label="'Copy ' + f.algo + ' colon'" @click="copy(f.colon, f.algo + 'c')">
                <Check v-if="copiedKey === f.algo + 'c'" class="w-4 h-4" /><Copy v-else class="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p class="font-mono text-xs break-all">{{ f.colon }}</p>
          <p class="font-mono text-[10px] text-muted-foreground break-all">{{ f.hex }}</p>
        </div>
        <p class="text-xs text-muted-foreground">
          Fingerprints are computed over the DER encoding of the certificate — the same values OpenSSL
          (<span class="font-mono">openssl x509 -fingerprint -sha256</span>) and SAML tooling display.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
