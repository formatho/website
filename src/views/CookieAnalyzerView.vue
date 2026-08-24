<script setup lang="ts">
import { ref, computed } from 'vue'
import { Cookie, CheckCircle2, XCircle, AlertTriangle } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Cookie Security Analyzer - Check Secure, HttpOnly, SameSite | Formatho',
  description: 'Analyze Set-Cookie headers for security: Secure flag, HttpOnly, SameSite, __Secure- and __Host- prefixes, domain scope, and expiry. Free, private, client-side.',
  keywords: ['cookie security analyzer', 'set-cookie checker', 'httponly check', 'samesite cookie', 'cookie flags', 'secure cookie validator'],
  ogType: 'website'
})

const input = ref('')
const results = computed(() => {
  if (!input.value.trim()) return []
  const lines = input.value.trim().split('\n').map(l => l.trim()).filter(Boolean)
  return lines.map(line => {
    // Parse Set-Cookie header
    const parts = line.split(';').map(p => p.trim())
    const nameValue = parts[0]
    const eqIdx = nameValue.indexOf('=')
    const name = eqIdx > 0 ? nameValue.slice(0, eqIdx).trim() : nameValue
    const value = eqIdx > 0 ? nameValue.slice(eqIdx + 1).trim() : ''

    const flags = new Map<string, string>()
    for (let i = 1; i < parts.length; i++) {
      const p = parts[i]
      const [k, ...v] = p.split('=')
      flags.set(k.trim().toLowerCase(), v.join('=').trim())
    }

    const secure = flags.has('secure')
    const httpOnly = flags.has('httponly')
    const sameSite = (flags.get('samesite') || '').toLowerCase() || 'not set'
    const domain = flags.get('domain') || '(host only)'
    const path = flags.get('path') || '/'
    const maxAge = flags.get('max-age')
    const expires = flags.get('expires')
    const hasSecurePrefix = name.startsWith('__Secure-')
    const hasHostPrefix = name.startsWith('__Host-')

    // Security score
    let score = 0
    if (secure) score += 25
    if (httpOnly) score += 25
    if (sameSite === 'strict' || sameSite === 'lax') score += 25
    else if (sameSite === 'none' && secure) score += 15
    if (hasSecurePrefix || hasHostPrefix) score += 15
    if (!maxAge && !expires) score += 10 // session cookie is safer
    score = Math.min(score, 100)

    const issues: string[] = []
    if (!secure) issues.push('Missing Secure flag — cookie can be sent over HTTP')
    if (!httpOnly && !name.startsWith('csrf')) issues.push('Missing HttpOnly — JavaScript can read this cookie (XSS risk)')
    if (!sameSite || sameSite === 'none' && !secure) issues.push('SameSite not properly set — CSRF risk')
    if (domain.startsWith('.')) issues.push(`Domain ${domain} is too broad — subdomains can access this cookie`)
    if (maxAge && Number(maxAge) > 86400 * 365) issues.push('Max-Age exceeds 1 year — consider shorter session lifetime')

    return { name, value, secure, httpOnly, sameSite, domain, path, maxAge, expires, hasSecurePrefix, hasHostPrefix, score, issues, original: line }
  })
})

function scoreClass(s: number) { return s >= 75 ? 'text-green-600' : s >= 50 ? 'text-amber-600' : 'text-red-600' }
function fillSample() {
  input.value = `sessionid=abc123def456; Path=/; HttpOnly; Secure; SameSite=Lax
csrftoken=tok123; Path=/; Secure; SameSite=Strict
tracking_id=xyz789; Domain=.example.com; Max-Age=7776000
api_key=secret123; Path=/api/;`
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><Cookie class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Cookie Security Analyzer</h1>
        <p class="text-sm text-muted-foreground">Check Secure, HttpOnly, SameSite flags and security prefixes</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Paste Set-Cookie headers</CardTitle>
        <Button variant="outline" size="sm" @click="fillSample">Load samples</Button>
      </CardHeader>
      <CardContent>
        <Textarea v-model="input" :rows="4" class="font-mono text-xs" placeholder="sessionid=abc123; Path=/; HttpOnly; Secure; SameSite=Lax" aria-label="Set-Cookie headers" />
        <p class="text-xs text-muted-foreground mt-2">One cookie per line. Get headers from browser DevTools → Network → Response Headers → set-cookie.</p>
      </CardContent>
    </Card>

    <div v-if="results.length" class="space-y-4">
      <div v-for="r in results" :key="r.name" class="border border-border rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <p class="font-mono text-sm font-bold">{{ r.name }}</p>
            <code class="text-xs text-muted-foreground break-all">{{ r.value.length > 40 ? r.value.slice(0, 40) + '…' : r.value }}</code>
          </div>
          <div class="text-right shrink-0">
            <p class="text-2xl font-black" :class="scoreClass(r.score)">{{ r.score }}</p>
            <p class="text-xs text-muted-foreground">/ 100</p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div class="flex items-center gap-2 p-2 border border-border rounded-lg text-xs">
            <component :is="r.secure ? CheckCircle2 : XCircle" class="w-3.5 h-3.5" :class="r.secure ? 'text-green-600' : 'text-red-600'" />
            <span :class="r.secure ? 'text-foreground' : 'text-red-600'">Secure</span>
          </div>
          <div class="flex items-center gap-2 p-2 border border-border rounded-lg text-xs">
            <component :is="r.httpOnly ? CheckCircle2 : XCircle" class="w-3.5 h-3.5" :class="r.httpOnly ? 'text-green-600' : 'text-red-600'" />
            <span :class="r.httpOnly ? 'text-foreground' : 'text-red-600'">HttpOnly</span>
          </div>
          <div class="flex items-center gap-2 p-2 border border-border rounded-lg text-xs">
            <component :is="r.sameSite === 'strict' || r.sameSite === 'lax' ? CheckCircle2 : AlertTriangle" class="w-3.5 h-3.5" :class="r.sameSite === 'strict' || r.sameSite === 'lax' ? 'text-green-600' : 'text-amber-600'" />
            <span>SameSite: {{ r.sameSite }}</span>
          </div>
          <div class="flex items-center gap-2 p-2 border border-border rounded-lg text-xs">
            <component :is="r.hasHostPrefix || r.hasSecurePrefix ? CheckCircle2 : AlertTriangle" class="w-3.5 h-3.5" :class="r.hasHostPrefix || r.hasSecurePrefix ? 'text-green-600' : 'text-muted-foreground'" />
            <span>{{ r.hasHostPrefix ? '__Host-' : r.hasSecurePrefix ? '__Secure-' : 'no prefix' }}</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span>Domain: <code>{{ r.domain }}</code></span>
          <span>Path: <code>{{ r.path }}</code></span>
          <span v-if="r.maxAge">Max-Age: <code>{{ r.maxAge }}s</code></span>
          <span v-if="r.expires">Expires: <code>{{ r.expires }}</code></span>
        </div>

        <div v-if="r.issues.length" class="space-y-1.5 pt-2 border-t border-border">
          <div v-for="(issue, i) in r.issues" :key="i" class="flex items-start gap-2 text-xs text-red-600">
            <AlertTriangle class="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{{ issue }}</span>
          </div>
        </div>
        <div v-else class="pt-2 border-t border-border flex items-center gap-2 text-xs text-green-600">
          <CheckCircle2 class="w-3.5 h-3.5" /> All security flags properly configured
        </div>
      </div>
    </div>
  </div>
</template>
