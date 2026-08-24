<script setup lang="ts">
import { ref } from 'vue'
import { ShieldCheck, AlertTriangle, XCircle, Search, Loader2 } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Security Headers Analyzer - Check HSTS, CSP, X-Frame | Formatho',
  description: 'Analyze HTTP security headers on any URL: HSTS, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Graded A-F with fix recommendations. Runs from your browser.',
  keywords: ['security headers check', 'hsts check', 'csp header analyzer', 'x-frame-options', 'http security headers', 'website security scan', 'header security grade'],
  ogType: 'website'
})

const url = ref('')
const sampleUrls = [
  { label: 'GitHub', url: 'https://github.com' },
  { label: 'Google', url: 'https://www.google.com' },
  { label: 'Cloudflare', url: 'https://www.cloudflare.com' },
]
const loading = ref(false)
const error = ref('')
const grade = ref('')
const score = ref(0)
const headers = ref<Array<{ name: string; present: boolean; value: string; severity: string; fix: string }>>([])

const CHECKS: Array<{ name: string; header: string; severity: string; fix: string; validate?: (v: string) => boolean }> = [
  { name: 'Strict-Transport-Security (HSTS)', header: 'strict-transport-security', severity: 'critical', fix: 'Add: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload' },
  { name: 'Content-Security-Policy', header: 'content-security-policy', severity: 'critical', fix: 'Add a CSP header to prevent XSS, clickjacking, and data injection. Use our CSP Generator.' },
  { name: 'X-Frame-Options', header: 'x-frame-options', severity: 'high', fix: 'Add: X-Frame-Options: DENY (or SAMEORIGIN if you embed yourself)', validate: (v) => /deny|sameorigin/i.test(v) },
  { name: 'X-Content-Type-Options', header: 'x-content-type-options', severity: 'medium', fix: 'Add: X-Content-Type-Options: nosniff', validate: (v) => /nosniff/i.test(v) },
  { name: 'Referrer-Policy', header: 'referrer-policy', severity: 'medium', fix: 'Add: Referrer-Policy: strict-origin-when-cross-origin', validate: (v) => !/unsafe-url/i.test(v) },
  { name: 'Permissions-Policy', header: 'permissions-policy', severity: 'low', fix: 'Add: Permissions-Policy: camera=(), microphone=(), geolocation=()' },
]

async function analyze() {
  error.value = ''
  grade.value = ''
  headers.value = []
  let target = url.value.trim()
  if (!target) return
  if (!/^https?:\/\//.test(target)) target = 'https://' + target

  loading.value = true
  try {
    const res = await fetch(target, { mode: 'cors', signal: AbortSignal.timeout(15000) })
    const h = res.headers
    let pts = 0
    const max = CHECKS.length * 10
    const results: typeof headers.value = []

    for (const check of CHECKS) {
      const value = h.get(check.header) || ''
      const present = !!value
      const valid = present && (!check.validate || check.validate(value))
      if (valid) pts += 10
      else if (present) pts += 5
      results.push({ name: check.name, present, value, severity: present && !valid ? 'warn' : present ? 'pass' : check.severity, fix: present && !valid ? check.fix : present ? '' : check.fix })
    }

    score.value = Math.round((pts / max) * 100)
    grade.value = score.value >= 90 ? 'A' : score.value >= 75 ? 'B' : score.value >= 60 ? 'C' : score.value >= 40 ? 'D' : 'F'
    headers.value = results
  } catch (e) {
    error.value = 'Could not read headers from this URL. The site may not send CORS headers (Access-Control-Allow-Origin), which prevents browser-based inspection. You can still check headers manually with curl: curl -sI ' + target
  } finally {
    loading.value = false
  }
}

function sevIcon(sev: string) {
  return sev === 'pass' ? ShieldCheck : sev === 'warn' ? AlertTriangle : XCircle
}
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
        <p class="text-sm text-muted-foreground">Check HSTS, CSP, X-Frame-Options and more — from your browser</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardContent class="space-y-4 pt-6">
        <div class="flex gap-3">
          <Input v-model="url" class="font-mono text-sm" placeholder="https://example.com" aria-label="URL to analyze" @keyup.enter="analyze" />
        </div>
        <div class="flex flex-wrap gap-2">
          <button v-for="sample in sampleUrls" :key="sample.label" class="no-btn-hover text-xs px-2.5 py-1 border border-border rounded-full hover:border-primary/40 transition-colors" @click="url = sample.url">
            {{ sample.label }}
          </button>
          <Button :disabled="loading" @click="analyze">
            <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />
            <Search v-else class="w-4 h-4 mr-1" />
            Analyze
          </Button>
        </div>
        <p v-if="error" class="text-xs text-amber-600 leading-relaxed">{{ error }}</p>
      </CardContent>
    </Card>

    <div v-if="grade" class="mb-6 flex items-center gap-6 p-6 rounded-xl border" :class="score >= 75 ? 'bg-green-500/10 border-green-500/20' : score >= 50 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20'">
      <div class="text-5xl font-black" :class="score >= 75 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'">{{ grade }}</div>
      <div>
        <p class="text-lg font-semibold">{{ score }} / 100</p>
        <p class="text-sm text-muted-foreground">{{ headers.filter(h => h.severity === 'pass').length }} of {{ CHECKS.length }} headers correctly configured</p>
      </div>
    </div>

    <Card v-if="headers.length">
      <CardHeader><CardTitle class="text-lg">Header details</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <div v-for="h in headers" :key="h.name" class="flex items-start gap-3 p-4 border border-border rounded-lg" :class="{ 'bg-green-500/5': h.severity === 'pass', 'bg-red-500/5': h.severity === 'critical' }">
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
