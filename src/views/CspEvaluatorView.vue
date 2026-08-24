<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, ScanSearch } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'CSP Evaluator - Analyze Content Security Policy | Formatho',
  description: 'Paste a Content-Security-Policy header and find security weaknesses: unsafe-inline, wildcards, missing directives, bypass risks. Free, private, client-side analysis.',
  keywords: ['csp evaluator', 'csp checker', 'content security policy analysis', 'csp validator', 'csp security check'],
  ogType: 'website'
})

const cspInput = ref('')

const examples = [
  {
    label: '⚠️ Weak (unsafe-inline)',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src * data:",
  },
  {
    label: '✅ Strict (recommended)',
    value: "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  },
  {
    label: 'CDN + Google Fonts',
    value: "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.example.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'",
  },
  {
    label: '❌ Broken (wildcards)',
    value: "default-src *; script-src * 'unsafe-inline' 'unsafe-eval' data:; img-src *; connect-src *",
  },
  {
    label: 'Report-Only mode',
    value: "default-src 'self'; script-src 'self' https: 'unsafe-inline'; report-uri /csp-report",
  },
]
const findings = computed(() => {
  if (!cspInput.value.trim()) return []
  const results: Array<{ severity: 'high' | 'medium' | 'low' | 'info'; title: string; detail: string }> = []
  const csp = cspInput.value.trim()
  const directives = csp.split(';').map(d => d.trim()).filter(Boolean)
  const dirMap: Record<string, string> = {}
  for (const d of directives) {
    const [name, ...values] = d.split(/\s+/)
    dirMap[name.toLowerCase()] = values.join(' ')
  }

  // High severity
  if (/\bunsafe-inline\b/i.test(csp) && /script-src|default-src/i.test(csp)) {
    results.push({ severity: 'high', title: 'unsafe-inline in script-src', detail: 'Allows inline <script> tags and event handlers (onclick etc.), which defeats the primary purpose of CSP against XSS. Use nonces or hashes instead.' })
  }
  if (/\bunsafe-eval\b/i.test(csp)) {
    results.push({ severity: 'high', title: 'unsafe-eval present', detail: 'Allows eval(), new Function(), and setTimeout with strings. This is required by some legacy frameworks but significantly weakens CSP.' })
  }
  if (/\bscript-src[^;]*\*/i.test(csp) || (!dirMap['script-src'] && dirMap['default-src']?.includes('*'))) {
    results.push({ severity: 'high', title: 'Wildcard (*) in script-src', detail: 'Allows scripts from any origin. This makes CSP effectively useless against XSS from third-party sources.' })
  }
  if (!dirMap['default-src'] && !dirMap['script-src']) {
    results.push({ severity: 'high', title: 'No default-src or script-src', detail: 'Without these directives, JavaScript can load from anywhere. This is the most critical CSP configuration.' })
  }

  // Medium severity
  if (!dirMap['object-src'] && !dirMap['default-src']?.includes("'none'")) {
    results.push({ severity: 'medium', title: 'Missing object-src', detail: 'Without object-src, <object>/<embed>/<applet> elements can load from anywhere. Set object-src \'none\' unless you specifically need plugins.' })
  }
  if (!dirMap['base-uri']) {
    results.push({ severity: 'medium', title: 'Missing base-uri', detail: 'Without base-uri, an injected <base> tag can redirect all relative URLs to an attacker-controlled domain. Set base-uri \'self\'.' })
  }
  if (!dirMap['frame-ancestors'] && !/x-frame-options/i.test(csp)) {
    results.push({ severity: 'medium', title: 'Missing frame-ancestors', detail: 'Without frame-ancestors, the page can be embedded in iframes (clickjacking). Set frame-ancestors \'none\' or \'self\'.' })
  }
  if (/http:\/\//.test(csp)) {
    results.push({ severity: 'medium', title: 'Insecure http:// sources', detail: 'HTTP sources can be man-in-the-middle attacked. Use https:// for all external sources.' })
  }

  // Low severity
  if (/\bdata:/i.test(csp)) {
    results.push({ severity: 'low', title: 'data: URI allowed', detail: 'data: URIs can carry inline payloads. If used in img-src this is common, but avoid in script-src.' })
  }
  if (!dirMap['form-action']) {
    results.push({ severity: 'low', title: 'Missing form-action', detail: 'Without form-action, forms can submit to any origin. Set form-action \'self\' to prevent data exfiltration via form submission.' })
  }

  // Info
  if (dirMap['upgrade-insecure-requests'] !== undefined) {
    results.push({ severity: 'info', title: 'upgrade-insecure-requests enabled', detail: 'Good — this automatically upgrades HTTP requests to HTTPS.' })
  }
  if (!findings.value.length || results.every(r => r.severity === 'info')) {
    results.push({ severity: 'info', title: 'No critical issues found', detail: 'This CSP appears to follow best practices. Test in Report-Only mode before enforcing.' })
  }

  return results
})

const sevOrder = { high: 0, medium: 1, low: 2, info: 3 }
const sorted = computed(() => [...findings.value].sort((a, b) => sevOrder[a.severity] - sevOrder[b.severity]))
const highCount = computed(() => findings.value.filter(f => f.severity === 'high').length)
const medCount = computed(() => findings.value.filter(f => f.severity === 'medium').length)

function sevIcon(s: string) { return s === 'high' ? ShieldAlert : s === 'medium' ? AlertTriangle : s === 'low' ? Info : CheckCircle2 }
function sevClass(s: string) { return s === 'high' ? 'text-red-600 bg-red-500/10 border-red-500/20' : s === 'medium' ? 'text-amber-600 bg-amber-500/10 border-amber-500/20' : s === 'low' ? 'text-blue-600 bg-blue-500/10 border-blue-500/20' : 'text-green-600 bg-green-500/10 border-green-500/20' }
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><ScanSearch class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">CSP Evaluator</h1>
        <p class="text-sm text-muted-foreground">Find security weaknesses in your Content-Security-Policy</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">Paste your CSP header</CardTitle></CardHeader>
      <CardContent>
        <Textarea v-model="cspInput" :rows="4" class="font-mono text-xs" placeholder="default-src 'self'; script-src 'self' https://cdn.example.com 'unsafe-inline'..." aria-label="CSP header to evaluate" />
        <div class="flex flex-wrap gap-2 mt-3">
          <button
            v-for="example in examples"
            :key="example.label"
            class="no-btn-hover text-xs px-2.5 py-1 border border-border rounded-full hover:border-primary/40 transition-colors"
            @click="cspInput = example.value"
          >
            {{ example.label }}
          </button>
        </div>
      </CardContent>
    </Card>

    <div v-if="findings.length" class="space-y-3">
      <div v-if="highCount || medCount" class="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
        <ShieldAlert class="w-5 h-5 text-red-600" />
        <p class="text-sm font-medium text-red-700">{{ highCount }} high and {{ medCount }} medium severity issues found</p>
      </div>

      <div v-for="(f, i) in sorted" :key="i" class="flex items-start gap-3 p-4 rounded-lg border" :class="sevClass(f.severity)">
        <component :is="sevIcon(f.severity)" class="w-5 h-5 mt-0.5 shrink-0" :class="f.severity === 'high' ? 'text-red-600' : f.severity === 'medium' ? 'text-amber-600' : f.severity === 'low' ? 'text-blue-600' : 'text-green-600'" />
        <div>
          <p class="font-medium text-sm" :class="f.severity === 'high' ? 'text-red-700' : f.severity === 'medium' ? 'text-amber-700' : f.severity === 'low' ? 'text-blue-700' : 'text-green-700'">{{ f.title }}</p>
          <p class="text-xs text-muted-foreground mt-1 leading-relaxed">{{ f.detail }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
