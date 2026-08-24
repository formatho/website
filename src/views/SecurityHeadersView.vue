<script setup lang="ts">
import { ref } from 'vue'
import { ShieldCheck, AlertTriangle, XCircle, Loader2, ClipboardPaste, Terminal, Info } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Security Headers Analyzer - Check HSTS, CSP, X-Frame | Formatho',
  description: 'Analyze HTTP security headers: HSTS, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Paste headers from curl or DevTools — graded A-F with fix recommendations. 100% private.',
  keywords: ['security headers check', 'hsts check', 'csp header analyzer', 'x-frame-options', 'http security headers', 'website security scan', 'header security grade', 'curl headers'],
  ogType: 'website'
})

type Mode = 'paste' | 'fetch'
const mode = ref<Mode>('paste')
const url = ref('')
const pastedHeaders = ref('')
const loading = ref(false)
const error = ref('')
const grade = ref('')
const score = ref(0)
const headers = ref<Array<{ name: string; present: boolean; value: string; severity: string; fix: string }>>([])

const CHECKS: Array<{ name: string; header: string; severity: string; fix: string; validate?: (v: string) => boolean }> = [
  { name: 'Strict-Transport-Security (HSTS)', header: 'strict-transport-security', severity: 'critical', fix: 'Add: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload' },
  { name: 'Content-Security-Policy', header: 'content-security-policy', severity: 'critical', fix: "Add a CSP header to prevent XSS and data injection. Use our CSP Generator." },
  { name: 'X-Frame-Options', header: 'x-frame-options', severity: 'high', fix: 'Add: X-Frame-Options: DENY (or SAMEORIGIN if you embed yourself)', validate: (v) => /deny|sameorigin/i.test(v) },
  { name: 'X-Content-Type-Options', header: 'x-content-type-options', severity: 'medium', fix: 'Add: X-Content-Type-Options: nosniff', validate: (v) => /nosniff/i.test(v) },
  { name: 'Referrer-Policy', header: 'referrer-policy', severity: 'medium', fix: 'Add: Referrer-Policy: strict-origin-when-cross-origin', validate: (v) => !/unsafe-url/i.test(v) },
  { name: 'Permissions-Policy', header: 'permissions-policy', severity: 'low', fix: 'Add: Permissions-Policy: camera=(), microphone=(), geolocation=()' },
]

function analyzeHeaderMap(hmap: Map<string, string>) {
  let pts = 0
  const max = CHECKS.length * 10
  const results: typeof headers.value = []
  for (const check of CHECKS) {
    const value = hmap.get(check.header) || ''
    const present = !!value
    const valid = present && (!check.validate || check.validate(value))
    if (valid) pts += 10
    else if (present) pts += 5
    results.push({ name: check.name, present, value, severity: present && !valid ? 'warn' : present ? 'pass' : check.severity, fix: present && !valid ? check.fix : present ? '' : check.fix })
  }
  score.value = Math.round((pts / max) * 100)
  grade.value = score.value >= 90 ? 'A' : score.value >= 75 ? 'B' : score.value >= 60 ? 'C' : score.value >= 40 ? 'D' : 'F'
  headers.value = results
}

function analyzePasted() {
  error.value = ''
  grade.value = ''
  headers.value = []
  const raw = pastedHeaders.value.trim()
  if (!raw) { error.value = 'Paste your response headers first'; return }

  const hmap = new Map<string, string>()
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('HTTP/')) continue
    const idx = trimmed.indexOf(':')
    if (idx > 0) {
      hmap.set(trimmed.slice(0, idx).trim().toLowerCase(), trimmed.slice(idx + 1).trim())
    }
  }
  if (hmap.size === 0) { error.value = 'No headers found. Expected format: "Header-Name: value" (one per line)'; return }
  analyzeHeaderMap(hmap)
}

async function analyzeUrl() {
  error.value = ''
  grade.value = ''
  headers.value = []
  let target = url.value.trim()
  if (!target) { error.value = 'Enter a URL'; return }
  if (!/^https?:\/\//.test(target)) target = 'https://' + target
  loading.value = true
  try {
    const res = await fetch(target, { mode: 'cors', signal: AbortSignal.timeout(15000) })
    const hmap = new Map<string, string>()
    for (const check of CHECKS) {
      const value = res.headers.get(check.header)
      if (value) hmap.set(check.header, value)
    }
    if (hmap.size === 0) {
      error.value = `CORS prevented reading headers from ${target}. Switch to "Paste headers" mode — it always works. Run: curl -sI ${target} in your terminal.`
      return
    }
    analyzeHeaderMap(hmap)
  } catch {
    error.value = `Could not fetch ${target}. The site blocks cross-origin requests (no Access-Control-Allow-Origin). Switch to "Paste headers" mode — it always works.`
  } finally {
    loading.value = false
  }
}

async function pasteFromClipboard() {
  try {
    pastedHeaders.value = await navigator.clipboard.readText()
  } catch {
    error.value = 'Could not read clipboard — paste manually instead'
  }
}

function fillSample() {
  pastedHeaders.value = `HTTP/2 200
content-type: text/html; charset=utf-8
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy: default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=()`
}

function sevIcon(sev: string) { return sev === 'pass' ? ShieldCheck : sev === 'warn' ? AlertTriangle : XCircle }
function sevClass(sev: string) {
  return sev === 'pass' ? 'text-green-600' : sev === 'warn' ? 'text-amber-600' : sev === 'low' ? 'text-muted-foreground' : sev === 'medium' ? 'text-amber-600' : 'text-red-600'
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><ShieldCheck class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Security Headers Analyzer</h1>
        <p class="text-sm text-muted-foreground">Check HSTS, CSP, X-Frame-Options and more — 100% private, in your browser</p>
      </div>
    </div>

    <!-- Mode toggle -->
    <div class="flex gap-2 mb-4">
      <button
        class="no-btn-hover text-sm px-4 py-2 rounded-lg border transition-colors font-medium"
        :class="mode === 'paste' ? 'bg-primary/10 border-primary/40 text-foreground' : 'border-border text-muted-foreground hover:border-foreground/30'"
        @click="mode = 'paste'"
      >
        <ClipboardPaste class="w-4 h-4 inline mr-1.5" /> Paste headers
      </button>
      <button
        class="no-btn-hover text-sm px-4 py-2 rounded-lg border transition-colors font-medium"
        :class="mode === 'fetch' ? 'bg-primary/10 border-primary/40 text-foreground' : 'border-border text-muted-foreground hover:border-foreground/30'"
        @click="mode = 'fetch'"
      >
        <Terminal class="w-4 h-4 inline mr-1.5" /> Try URL fetch
      </button>
    </div>

    <!-- Paste mode (primary, always works) -->
    <Card v-if="mode === 'paste'" class="mb-6">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Paste response headers</CardTitle>
        <div class="flex gap-2">
          <Button variant="outline" size="sm" @click="pasteFromClipboard"><ClipboardPaste class="w-3.5 h-3.5 mr-1" />Paste</Button>
          <Button variant="outline" size="sm" @click="fillSample">Sample</Button>
        </div>
      </CardHeader>
      <CardContent class="space-y-3">
        <Textarea
          v-model="pastedHeaders"
          :rows="8"
          class="font-mono text-xs"
          placeholder="HTTP/2 200&#10;content-type: text/html&#10;strict-transport-security: max-age=31536000&#10;x-frame-options: DENY&#10;..."
          aria-label="Response headers to analyze"
        />
        <div class="flex items-start gap-2 text-xs text-muted-foreground">
          <Info class="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>
            Run <code class="font-mono bg-muted px-1.5 py-0.5 rounded">curl -sI https://your-site.com</code> in your terminal,
            copy the output, and paste it here. Headers never leave your browser.
          </p>
        </div>
        <Button size="sm" @click="analyzePasted">Analyze headers</Button>
        <p v-if="error" class="text-xs text-amber-600">{{ error }}</p>
      </CardContent>
    </Card>

    <!-- Fetch mode (may fail due to CORS) -->
    <Card v-if="mode === 'fetch'" class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Fetch headers from a URL</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div class="flex flex-wrap gap-1.5 mb-2">
          <button v-for="sample in [
            { label: 'GitHub', url: 'https://github.com' },
            { label: 'Google', url: 'https://www.google.com' },
            { label: 'Cloudflare', url: 'https://www.cloudflare.com' },
          ]" :key="sample.label" class="no-btn-hover text-xs px-2.5 py-1 border border-border rounded-full hover:border-primary/40 transition-colors" @click="url = sample.url">
            {{ sample.label }}
          </button>
        </div>
        <div class="flex gap-3">
          <Input v-model="url" class="font-mono text-sm" placeholder="https://example.com" aria-label="URL to analyze" @keyup.enter="analyzeUrl" />
          <Button :disabled="loading" @click="analyzeUrl">
            <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />Analyze
          </Button>
        </div>
        <div class="flex items-start gap-2 text-xs text-amber-600">
          <AlertTriangle class="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>This mode only works for sites that send CORS headers. Most sites don't — use "Paste headers" mode for those.</p>
        </div>
        <p v-if="error" class="text-xs text-amber-600">{{ error }}</p>
      </CardContent>
    </Card>

    <!-- Results -->
    <div v-if="grade" class="mb-6 flex items-center gap-6 p-6 rounded-xl border"
      :class="score >= 75 ? 'bg-green-500/10 border-green-500/20' : score >= 50 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20'">
      <div class="text-5xl font-black" :class="score >= 75 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'">{{ grade }}</div>
      <div>
        <p class="text-lg font-semibold">{{ score }} / 100</p>
        <p class="text-sm text-muted-foreground">{{ headers.filter(h => h.severity === 'pass').length }} of {{ CHECKS.length }} headers correctly configured</p>
      </div>
    </div>

    <Card v-if="headers.length">
      <CardHeader><CardTitle class="text-lg">Header details</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <div v-for="h in headers" :key="h.name" class="flex items-start gap-3 p-4 border border-border rounded-lg"
          :class="{ 'bg-green-500/5': h.severity === 'pass', 'bg-red-500/5': h.severity === 'critical' }">
          <component :is="sevIcon(h.severity)" class="w-5 h-5 mt-0.5 shrink-0" :class="sevClass(h.severity)" />
          <div class="min-w-0 flex-1">
            <p class="font-medium text-sm">{{ h.name }}</p>
            <code v-if="h.value" class="text-xs font-mono text-muted-foreground block mt-1 break-all">{{ h.value }}</code>
            <p v-if="h.fix && h.severity !== 'pass'" class="text-xs text-muted-foreground mt-2 leading-relaxed">{{ h.fix }}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
