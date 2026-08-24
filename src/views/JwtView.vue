<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Key, CheckCircle2, XCircle, Clock, ShieldCheck, AlertTriangle } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'JWT Debugger - Decode, Verify & Inspect Tokens | Formatho',
  description:
    'Decode and verify JSON Web Tokens in your browser. Inspect header, payload, and claims; verify HS256/HS384/HS512 signatures with a secret or RS256/ES256 with a public key. See expiry status and registered claim details. 100% client-side.',
  keywords: ['jwt decoder', 'jwt verifier', 'jwt debugger', 'verify jwt online', 'hs256 verify', 'rs256 verify', 'jwt expiry check', 'decode jwt token', 'jwt claims'],
  ogType: 'website'
})

// ─── Decode state ───
const token = ref('')
const header = ref<Record<string, unknown> | null>(null)
const payload = ref<Record<string, unknown> | null>(null)
const signature = ref('')
const decodeError = ref('')

// ─── Verify state ───
const secret = ref('')
const publicKeyPem = ref('')
const verifyResult = ref<null | { valid: boolean; message: string }>(null)
const verifying = ref(false)

// ─── Expiry state ───
const expiryStatus = computed(() => {
  if (!payload.value) return null
  const exp = payload.value.exp as number | undefined
  if (!exp) return { status: 'unknown', label: 'No expiry (exp) claim', color: 'text-muted-foreground' }
  const now = Math.floor(Date.now() / 1000)
  const diff = exp - now
  if (diff < 0) return { status: 'expired', label: `Expired ${humanize(-diff)} ago`, color: 'text-red-600' }
  if (diff < 3600) return { status: 'soon', label: `Expires in ${humanize(diff)}`, color: 'text-amber-600' }
  return { status: 'valid', label: `Valid for ${humanize(diff)}`, color: 'text-green-600' }
})

function humanize(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}

// ─── Registered claims metadata ───
const CLAIM_META: Record<string, { name: string; desc: string }> = {
  iss: { name: 'Issuer', desc: 'Who created and signed this token' },
  sub: { name: 'Subject', desc: 'Who the token is about (usually the user ID)' },
  aud: { name: 'Audience', desc: 'Who the token is intended for' },
  exp: { name: 'Expiration Time', desc: 'When the token stops being valid (Unix timestamp)' },
  iat: { name: 'Issued At', desc: 'When the token was created (Unix timestamp)' },
  nbf: { name: 'Not Before', desc: 'When the token becomes valid (Unix timestamp)' },
  jti: { name: 'JWT ID', desc: 'Unique identifier for this token' },
}

const claimDetails = computed(() => {
  if (!payload.value) return []
  return Object.entries(payload.value).map(([key, value]) => {
    const meta = CLAIM_META[key]
    const isTimestamp = ['exp', 'iat', 'nbf'].includes(key) && typeof value === 'number'
    return {
      key,
      value: String(value),
      name: meta?.name || key,
      desc: meta?.desc || '',
      humanDate: isTimestamp ? new Date((value as number) * 1000).toLocaleString() : undefined,
    }
  })
})

// ─── Base64URL helpers ───
function b64urlToUint8(b64: string): Uint8Array {
  const b64pad = b64.replace(/-/g, '+').replace(/_/g, '/')
  const pad = b64pad.length % 4 === 0 ? '' : '='.repeat(4 - (b64pad.length % 4))
  const raw = atob(b64pad + pad)
  return Uint8Array.from(raw, (c) => c.charCodeAt(0))
}

// ─── Decode ───
function decodeToken() {
  decodeError.value = ''
  header.value = null
  payload.value = null
  signature.value = ''
  verifyResult.value = null
  if (!token.value.trim()) return

  const parts = token.value.trim().split('.')
  if (parts.length !== 3) {
    decodeError.value = `Invalid JWT: expected 3 parts (header.payload.signature), got ${parts.length}`
    return
  }

  try {
    header.value = JSON.parse(new TextDecoder().decode(b64urlToUint8(parts[0])))
    payload.value = JSON.parse(new TextDecoder().decode(b64urlToUint8(parts[1])))
    signature.value = parts[2]
  } catch (e) {
    decodeError.value = 'Invalid JWT: ' + (e as Error).message
  }
}

watch(token, decodeToken)

function fillSample() {
  token.value =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MDAwMDAwMDB9.ihkSfA3F0RGqfXVqDGBaTZROI6jPC5cH4-VNyH5jbLA'
}

// ─── Signature verification (Web Crypto API, 100% client-side) ───
async function verify(): Promise<void> {
  if (!token.value.trim() || !header.value) {
    verifyResult.value = { valid: false, message: 'Paste a valid JWT first' }
    return
  }

  const alg = header.value.alg as string
  verifying.value = true
  verifyResult.value = null

  try {
    const parts = token.value.trim().split('.')
    const signedContent = new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
    const sigBytes = b64urlToUint8(parts[2])

    if (alg.startsWith('HS')) {
      if (!secret.value) {
        verifyResult.value = { valid: false, message: 'Enter the shared secret to verify HMAC signatures' }
        return
      }
      const hash = alg === 'HS256' ? 'SHA-256' : alg === 'HS384' ? 'SHA-384' : 'SHA-512'
      const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret.value),
        { name: 'HMAC', hash },
        false,
        ['verify']
      )
      const valid = await crypto.subtle.verify('HMAC', key, sigBytes, signedContent)
      verifyResult.value = {
        valid,
        message: valid ? `Signature valid (${alg})` : 'Signature INVALID — secret does not match',
      }
    } else if (alg.startsWith('RS') || alg.startsWith('PS') || alg.startsWith('ES')) {
      if (!publicKeyPem.value.trim()) {
        verifyResult.value = { valid: false, message: 'Paste the RSA/EC public key (PEM format) to verify' }
        return
      }
      const pem = publicKeyPem.value.trim()
      const keyData = pem
        .replace(/-----BEGIN PUBLIC KEY-----/, '')
        .replace(/-----END PUBLIC KEY-----/, '')
        .replace(/-----BEGIN RSA PUBLIC KEY-----/, '')
        .replace(/-----END RSA PUBLIC KEY-----/, '')
        .replace(/\s/g, '')
      const raw = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0))

      let key: CryptoKey
      if (alg.startsWith('ES')) {
        key = await crypto.subtle.importKey('spki', raw, { name: 'ECDSA', namedCurve: alg === 'ES256' ? 'P-256' : 'P-384' }, false, ['verify'])
        const valid = await crypto.subtle.verify({ name: 'ECDSA', hash: { name: 'SHA-256' } }, key, sigBytes, signedContent)
        verifyResult.value = { valid, message: valid ? `Signature valid (${alg})` : 'Signature INVALID — key does not match' }
      } else {
        const hash = alg.endsWith('256') ? 'SHA-256' : alg.endsWith('384') ? 'SHA-384' : 'SHA-512'
        key = await crypto.subtle.importKey('spki', raw, { name: 'RSASSA-PKCS1-v1_5', hash }, false, ['verify'])
        const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, sigBytes, signedContent)
        verifyResult.value = { valid, message: valid ? `Signature valid (${alg})` : 'Signature INVALID — key does not match' }
      }
    } else if (alg === 'none') {
      verifyResult.value = { valid: false, message: 'Algorithm "none" — token is unsigned and cannot be verified' }
    } else {
      verifyResult.value = { valid: false, message: `Unsupported algorithm: ${alg}` }
    }
  } catch (e) {
    verifyResult.value = { valid: false, message: 'Verification failed: ' + (e as Error).message }
  } finally {
    verifying.value = false
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Key class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">JWT Debugger</h1>
        <p class="text-sm text-muted-foreground">
          Decode, inspect, and verify JSON Web Tokens — 100% in your browser
        </p>
      </div>
    </div>

    <!-- Token input -->
    <Card class="mb-6">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Paste your JWT</CardTitle>
        <Button variant="outline" size="sm" @click="fillSample">Load sample</Button>
      </CardHeader>
      <CardContent>
        <Textarea
          v-model="token"
          :rows="4"
          class="font-mono text-xs"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi..."
          aria-label="JWT token"
        />
        <p v-if="decodeError" class="text-xs text-red-500 mt-2 flex items-center gap-1">
          <XCircle class="w-3 h-3" /> {{ decodeError }}
        </p>
      </CardContent>
    </Card>

    <!-- Expiry banner -->
    <div v-if="expiryStatus" class="mb-6 flex items-center gap-3 p-4 rounded-xl border"
      :class="expiryStatus.status === 'expired' ? 'bg-red-500/10 border-red-500/20' : expiryStatus.status === 'soon' ? 'bg-amber-500/10 border-amber-500/20' : expiryStatus.status === 'valid' ? 'bg-green-500/10 border-green-500/20' : 'bg-muted/50 border-border'"
    >
      <component :is="expiryStatus.status === 'expired' ? XCircle : expiryStatus.status === 'soon' ? AlertTriangle : expiryStatus.status === 'valid' ? CheckCircle2 : Clock"
        class="w-5 h-5" :class="expiryStatus.color" />
      <p class="text-sm font-medium" :class="expiryStatus.color">{{ expiryStatus.label }}</p>
    </div>

    <div v-if="header && payload" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">Header</CardTitle>
        </CardHeader>
        <CardContent>
          <pre class="text-xs font-mono bg-muted/50 rounded-lg p-4 overflow-x-auto">{{ JSON.stringify(header, null, 2) }}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-lg">Payload</CardTitle>
        </CardHeader>
        <CardContent>
          <pre class="text-xs font-mono bg-muted/50 rounded-lg p-4 overflow-x-auto">{{ JSON.stringify(payload, null, 2) }}</pre>
        </CardContent>
      </Card>
    </div>

    <!-- Registered claims -->
    <Card v-if="claimDetails.length" class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Claims breakdown</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2">
        <div v-for="claim in claimDetails" :key="claim.key"
          class="flex items-start justify-between gap-4 p-3 border border-border rounded-lg"
          :class="{ 'bg-primary/5': CLAIM_META[claim.key] }"
        >
          <div class="min-w-0">
            <p class="font-mono text-sm font-semibold">
              {{ claim.key }}
              <span v-if="claim.name !== claim.key" class="text-muted-foreground font-normal">— {{ claim.name }}</span>
            </p>
            <p v-if="claim.desc" class="text-xs text-muted-foreground mt-0.5">{{ claim.desc }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <code class="text-xs font-mono text-foreground">{{ claim.value.length > 50 ? claim.value.slice(0, 50) + '…' : claim.value }}</code>
            <p v-if="claim.humanDate" class="text-xs text-primary mt-0.5">{{ claim.humanDate }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Signature verification -->
    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <ShieldCheck class="w-4 h-4" /> Verify signature
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-sm text-muted-foreground">
          Verification happens entirely in your browser using the Web Crypto API — secrets and keys never leave your machine.
        </p>

        <div v-if="header?.alg?.startsWith('HS')">
          <label for="jwt-secret" class="text-sm font-medium text-muted-foreground mb-1 block">
            Shared secret ({{ header.alg }})
          </label>
          <Input id="jwt-secret" v-model="secret" type="password" class="font-mono text-sm" placeholder="your-256-bit-secret" aria-label="HMAC secret" />
        </div>

        <div v-else-if="header?.alg?.startsWith('RS') || header?.alg?.startsWith('PS') || header?.alg?.startsWith('ES')">
          <label for="jwt-pubkey" class="text-sm font-medium text-muted-foreground mb-1 block">
            Public key (PEM, {{ header.alg }})
          </label>
          <Textarea id="jwt-pubkey" v-model="publicKeyPem" :rows="5" class="font-mono text-xs"
            placeholder="-----BEGIN PUBLIC KEY-----&#10;MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...&#10;-----END PUBLIC KEY-----"
            aria-label="Public key PEM" />
        </div>

        <div v-else-if="header?.alg === 'none'" class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p class="text-sm text-amber-700 flex items-center gap-2">
            <AlertTriangle class="w-4 h-4" /> This token uses "alg: none" — it is unsigned. Never accept unsigned tokens in production.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <Button size="sm" :disabled="verifying || !header" @click="verify">
            {{ verifying ? 'Verifying…' : 'Verify signature' }}
          </Button>
        </div>

        <div v-if="verifyResult" class="flex items-center gap-3 p-4 rounded-xl border"
          :class="verifyResult.valid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'"
        >
          <component :is="verifyResult.valid ? CheckCircle2 : XCircle" class="w-5 h-5" :class="verifyResult.valid ? 'text-green-600' : 'text-red-600'" />
          <p class="text-sm font-medium" :class="verifyResult.valid ? 'text-green-700' : 'text-red-700'">
            {{ verifyResult.message }}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
