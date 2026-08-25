<script setup lang="ts">
import { ref, computed } from 'vue'
import { Lock, AlertTriangle, CheckCircle2, XCircle, Terminal } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'TLS Certificate Checker - Expiry, Issuer, Security | Formatho',
  description: 'Check TLS/SSL certificate expiry dates, issuer, subject, and security configuration. Paste openssl output for instant analysis. Free, private, client-side.',
  keywords: ['tls checker', 'ssl certificate check', 'certificate expiry checker', 'openssl certificate', 'tls security scan', 'certificate analyzer'],
  ogType: 'website'
})

const input = ref('')
const url = ref('')
const loading = ref(false)
const error = ref('')

interface CertInfo {
  subject: string
  issuer: string
  notBefore: Date | null
  notAfter: Date | null
  daysUntilExpiry: number
  isExpired: boolean
  isExpiringSoon: boolean
  san: string[]
  keyType: string
  sigAlgorithm: string
}

const result = ref<CertInfo | null>(null)

function parseCertOutput(raw: string): CertInfo | null {
  const info: CertInfo = {
    subject: '', issuer: '', notBefore: null, notAfter: null,
    daysUntilExpiry: 0, isExpired: false, isExpiringSoon: false,
    san: [], keyType: '', sigAlgorithm: ''
  }

  const subjectMatch = raw.match(/subject=(?:.*?CN\s*=\s*)([^\n,]+)/) || raw.match(/Subject:\s*(.+?)(?:\n|$)/)
  if (subjectMatch) info.subject = subjectMatch[1].trim()

  const issuerMatch = raw.match(/issuer=(?:.*?CN\s*=\s*)([^\n,]+)/) || raw.match(/Issuer:\s*(.+?)(?:\n|$)/)
  if (issuerMatch) info.issuer = issuerMatch[1].trim()

  const notBeforeMatch = raw.match(/notBefore=(.+)/) || raw.match(/Not Before:\s*(.+)/)
  if (notBeforeMatch) info.notBefore = new Date(notBeforeMatch[1].trim())

  const notAfterMatch = raw.match(/notAfter=(.+)/) || raw.match(/Not After\s*:\s*(.+)/)
  if (notAfterMatch) info.notAfter = new Date(notAfterMatch[1].trim())

  const sanMatch = raw.match(/Subject Alternative Name[^\n]*:(.+)/) || raw.match(/X509v3 Subject Alternative Name:\s*(.+)/)
  if (sanMatch) info.san = sanMatch[1].split(',').map(s => s.trim()).filter(Boolean)

  const keyMatch = raw.match(/Public Key Algorithm[^\n]*:(.+)/) || raw.match(/Server public key is (\d+)/)
  if (keyMatch) info.keyType = keyMatch[1].trim()

  const sigMatch = raw.match(/Signature Algorithm[^\n]*:(.+)/)
  if (sigMatch) info.sigAlgorithm = sigMatch[1].trim()

  if (info.notAfter) {
    const diff = info.notAfter.getTime() - Date.now()
    info.daysUntilExpiry = Math.ceil(diff / (1000 * 60 * 60 * 24))
    info.isExpired = diff < 0
    info.isExpiringSoon = diff > 0 && diff < 1000 * 60 * 60 * 24 * 30
  }

  return info.subject || info.notAfter ? info : null
}

function analyze() {
  error.value = ''
  result.value = null
  const raw = input.value.trim()
  if (!raw) { error.value = 'Paste certificate output first'; return }
  const parsed = parseCertOutput(raw)
  if (!parsed) {
    error.value = 'Could not parse certificate. Expected openssl output with notBefore/notAfter, Subject, or Issuer lines.'
    return
  }
  result.value = parsed
}

async function checkUrl() {
  error.value = ''
  result.value = null
  loading.value = true
  try {
    // Quick check: is the site HTTPS and does it respond?
    const res = await fetch(url.value.startsWith('http') ? url.value : `https://${url.value}`, {
      method: 'HEAD', mode: 'no-cors', signal: AbortSignal.timeout(10000)
    })
    // no-cors gives opaque response but throws on connection failure
    // If we get here, TLS is working
    const days = 90 // Can't read actual cert from no-cors
    result.value = {
      subject: url.value.replace(/^https?:\/\//, '').split('/')[0],
      issuer: '(browser cannot read issuer details)', notBefore: null, notAfter: null,
      daysUntilExpiry: -1, isExpired: false, isExpiringSoon: false,
      san: [], keyType: '', sigAlgorithm: ''
    }
    error.value = 'TLS connection successful — but browsers do not expose certificate details to JavaScript. Use the paste mode below for full certificate analysis.'
  } catch {
    error.value = `Could not connect to ${url.value}. Check the URL and try again.`
  } finally {
    loading.value = false
  }
}

function fillSample() {
  input.value = `subject=CN = example.com
issuer=C = US, O = Let's Encrypt, CN = R3
notBefore=Jan 15 12:00:00 2026 GMT
notAfter=Apr 15 12:00:00 2026 GMT
Signature Algorithm: sha256WithRSAEncryption
Public Key Algorithm: id-ecPublicKey (256 bits)`
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><Lock class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">TLS Certificate Checker</h1>
        <p class="text-sm text-muted-foreground">Check certificate expiry, issuer, and security configuration</p>
      </div>
    </div>

    <!-- URL quick check -->
    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">Quick connectivity check</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <div class="flex gap-3">
          <Input v-model="url" class="font-mono text-sm" placeholder="https://example.com" aria-label="URL to check" @keyup.enter="checkUrl" />
          <Button :disabled="loading" @click="checkUrl">{{ loading ? 'Checking…' : 'Check' }}</Button>
        </div>
        <div v-if="error" class="flex items-start gap-2 text-xs" :class="result ? 'text-green-700' : 'text-amber-600'">
          <component :is="result ? CheckCircle2 : AlertTriangle" class="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p class="leading-relaxed">{{ error }}</p>
        </div>
      </CardContent>
    </Card>

    <!-- Paste mode -->
    <Card class="mb-6">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg flex items-center gap-2"><Terminal class="w-4 h-4" /> Full certificate analysis (paste openssl output)</CardTitle>
        <Button variant="outline" size="sm" @click="fillSample">Sample</Button>
      </CardHeader>
      <CardContent class="space-y-3">
        <Textarea v-model="input" :rows="6" class="font-mono text-xs"
          placeholder="subject=CN = example.com&#10;issuer=C = US, O = Let's Encrypt&#10;notBefore=Jan 15 12:00:00 2026 GMT&#10;notAfter=Apr 15 12:00:00 2026 GMT"
          aria-label="Certificate output" />
        <div class="flex items-start gap-2 text-xs text-muted-foreground">
          <Terminal class="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p class="leading-relaxed">
            Run <code class="font-mono bg-muted px-1.5 py-0.5 rounded">openssl s_client -connect your-site.com:443 -servername your-site.com 2>/dev/null | openssl x509 -noout -subject -issuer -dates -ext subjectAltName</code>
            and paste the output above.
          </p>
        </div>
        <Button size="sm" @click="analyze">Analyze certificate</Button>
      </CardContent>
    </Card>

    <!-- Results -->
    <div v-if="result" class="space-y-4">
      <!-- Expiry status -->
      <div v-if="result.daysUntilExpiry >= 0" class="flex items-center gap-4 p-5 rounded-xl border"
        :class="result.isExpired ? 'bg-red-500/10 border-red-500/20' : result.isExpiringSoon ? 'bg-amber-500/10 border-amber-500/20' : 'bg-green-500/10 border-green-500/20'">
        <component :is="result.isExpired ? XCircle : result.isExpiringSoon ? AlertTriangle : CheckCircle2"
          class="w-6 h-6" :class="result.isExpired ? 'text-red-600' : result.isExpiringSoon ? 'text-amber-600' : 'text-green-600'" />
        <div>
          <p class="text-lg font-semibold" :class="result.isExpired ? 'text-red-700' : result.isExpiringSoon ? 'text-amber-700' : 'text-green-700'">
            {{ result.isExpired ? 'Certificate EXPIRED' : result.isExpiringSoon ? `Expiring in ${result.daysUntilExpiry} days` : `Valid for ${result.daysUntilExpiry} days` }}
          </p>
          <p v-if="result.notAfter" class="text-sm text-muted-foreground">Expires: {{ result.notAfter.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        </div>
      </div>

      <!-- Details -->
      <Card>
        <CardHeader><CardTitle class="text-lg">Certificate details</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div v-for="(value, key) in {
            'Subject (CN)': result.subject,
            'Issuer': result.issuer,
            'Valid from': result.notBefore?.toLocaleString() || '—',
            'Valid until': result.notAfter?.toLocaleString() || '—',
            'Signature algorithm': result.sigAlgorithm || '—',
            'Key type': result.keyType || '—',
          }" :key="key" class="flex items-start justify-between gap-4 p-3 border border-border rounded-lg">
            <span class="text-sm text-muted-foreground shrink-0">{{ key }}</span>
            <code class="text-xs font-mono text-right break-all">{{ value }}</code>
          </div>
          <div v-if="result.san.length" class="p-3 border border-border rounded-lg">
            <p class="text-sm text-muted-foreground mb-2">Subject Alternative Names</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="san in result.san" :key="san" class="text-xs font-mono px-2 py-1 bg-muted border border-border rounded-full">{{ san }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
