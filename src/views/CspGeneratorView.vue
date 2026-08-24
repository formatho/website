<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, Check, Shield, Code2 } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'CSP Generator - Content Security Policy Builder | Formatho',
  description: 'Generate Content-Security-Policy headers with a visual builder. Configure default-src, script-src, style-src, img-src, connect-src and more. Copy the header and deploy. Free, private, client-side.',
  keywords: ['csp generator', 'content security policy generator', 'csp header builder', 'csp tutorial', 'security header generator'],
  ogType: 'website'
})

interface Directive {
  key: string
  label: string
  desc: string
  enabled: boolean
  sources: string
  preset: string[]
}

const cspPresets = [
  {
    label: 'Strict',
    apply: () => {
      directives.value.forEach(d => { d.enabled = false; d.sources = "'self'" })
      directives.value[0].enabled = true // default-src
      extraDirectives.value.forEach(e => { e.enabled = true })
    }
  },
  {
    label: 'CDN + Fonts',
    apply: () => {
      directives.value.forEach(d => { d.enabled = false })
      const set = (key: string, sources: string) => {
        const d = directives.value.find(x => x.key === key)
        if (d) { d.enabled = true; d.sources = sources }
      }
      set('default-src', "'self'")
      set('script-src', "'self' https://cdn.jsdelivr.net")
      set('style-src', "'self' 'unsafe-inline' https://fonts.googleapis.com")
      set('font-src', "'self' https://fonts.gstatic.com")
      set('img-src', "'self' data: https:")
      set('connect-src', "'self'")
      extraDirectives.value.forEach(e => { e.enabled = e.key !== 'upgrade-insecure-requests' })
    }
  },
  {
    label: 'Report-Only',
    apply: () => {
      reportOnly.value = true
      reportUri.value = '/csp-report'
      directives.value.forEach(d => { d.enabled = false; d.sources = "'self'" })
      directives.value[0].enabled = true
    }
  },
  {
    label: 'Clear',
    apply: () => {
      directives.value.forEach(d => { d.enabled = false; d.sources = '' })
      directives.value[0].enabled = true
      directives.value[0].sources = "'self'"
      extraDirectives.value.forEach(e => { e.enabled = false })
      reportOnly.value = false
      reportUri.value = ''
    }
  },
]

const directives = ref<Directive[]>([
  { key: 'default-src', label: 'default-src', desc: 'Fallback for all resource types', enabled: true, sources: "'self'", preset: ["'self'", "'none'"] },
  { key: 'script-src', label: 'script-src', desc: 'Where JavaScript can load from', enabled: false, sources: '', preset: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdn.example.com'] },
  { key: 'style-src', label: 'style-src', desc: 'Where stylesheets can load from', enabled: false, sources: '', preset: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'] },
  { key: 'img-src', label: 'img-src', desc: 'Where images can load from', enabled: false, sources: '', preset: ["'self'", 'data:', 'https:'] },
  { key: 'font-src', label: 'font-src', desc: 'Where fonts can load from', enabled: false, sources: '', preset: ["'self'", 'https://fonts.gstatic.com'] },
  { key: 'connect-src', label: 'connect-src', desc: 'Where fetch/XHR/WebSocket can connect', enabled: false, sources: '', preset: ["'self'", 'https://api.example.com'] },
  { key: 'frame-src', label: 'frame-src', desc: 'Where iframes can load from', enabled: false, sources: '', preset: ["'self'", 'https:'] },
  { key: 'media-src', label: 'media-src', desc: 'Where audio/video can load from', enabled: false, sources: '', preset: ["'self'", 'https:'] },
])

const extraDirectives = ref<Array<{ key: string; value: string; enabled: boolean }>>([
  { key: 'object-src', value: "'none'", enabled: true },
  { key: 'base-uri', value: "'self'", enabled: true },
  { key: 'form-action', value: "'self'", enabled: false },
  { key: 'frame-ancestors', value: "'none'", enabled: true },
  { key: 'upgrade-insecure-requests', value: '', enabled: false },
])

const reportOnly = ref(false)
const reportUri = ref('')
const copied = ref(false)

const csp = computed(() => {
  const parts: string[] = []
  for (const d of directives.value) {
    if (d.enabled && d.sources.trim()) {
      parts.push(`${d.key} ${d.sources.trim().split(/\s+/).join(' ')}`)
    }
  }
  for (const e of extraDirectives.value) {
    if (e.enabled) {
      parts.push(e.value ? `${e.key} ${e.value}` : e.key)
    }
  }
  if (reportUri.value.trim()) {
    parts.push(`report-uri ${reportUri.value.trim()}`)
  }
  return parts.join('; ')
})

const headerName = computed(() => reportOnly.value ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy')

async function copyCsp() {
  try {
    await navigator.clipboard.writeText(`${headerName.value}: ${csp.value}`)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch { /* clipboard unavailable */ }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><Shield class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">CSP Generator</h1>
        <p class="text-sm text-muted-foreground">Build a Content-Security-Policy header visually</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Fetch directives -->
      <Card>
        <CardHeader><CardTitle class="text-lg">Resource directives</CardTitle>
          <div class="flex flex-wrap gap-1.5">
            <button v-for="preset in cspPresets" :key="preset.label" class="no-btn-hover text-xs px-2 py-0.5 border border-border rounded-full hover:border-primary/40 transition-colors" @click="preset.apply">
              {{ preset.label }}
            </button>
          </div></CardHeader>
        <CardContent class="space-y-4">
          <div v-for="d in directives" :key="d.key" class="p-3 border border-border rounded-lg space-y-2">
            <div class="flex items-center justify-between gap-2">
              <div>
                <label :for="'dir-' + d.key" class="font-mono text-sm font-semibold">{{ d.label }}</label>
                <p class="text-xs text-muted-foreground">{{ d.desc }}</p>
              </div>
              <input :id="'dir-' + d.key" type="checkbox" v-model="d.enabled" class="accent-primary w-4 h-4" />
            </div>
            <div v-if="d.enabled">
              <Input :id="'src-' + d.key" v-model="d.sources" class="font-mono text-xs" :placeholder="'self'" />
              <div class="flex flex-wrap gap-1.5 mt-1.5">
                <button v-for="p in d.preset" :key="p" class="no-btn-hover text-[10px] px-2 py-0.5 border border-border rounded-full hover:border-primary/40 transition-colors font-mono" @click="d.sources = d.sources ? d.sources + ' ' + p : p">{{ p }}</button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Extra directives + output -->
      <div class="space-y-6">
        <Card>
          <CardHeader><CardTitle class="text-lg">Security directives</CardTitle></CardHeader>
          <CardContent class="space-y-3">
            <div v-for="e in extraDirectives" :key="e.key" class="flex items-center justify-between gap-3 p-3 border border-border rounded-lg">
              <div class="min-w-0">
                <p class="font-mono text-sm font-semibold">{{ e.key }}</p>
                <code v-if="e.value" class="text-xs text-muted-foreground">{{ e.value }}</code>
              </div>
              <input type="checkbox" v-model="e.enabled" class="accent-primary w-4 h-4" />
            </div>
            <div class="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p class="text-sm font-semibold font-mono">Report-Only mode</p>
                <p class="text-xs text-muted-foreground">Log violations without blocking</p>
              </div>
              <input type="checkbox" v-model="reportOnly" class="accent-primary w-4 h-4" />
            </div>
            <div v-if="reportOnly">
              <label for="report-uri" class="text-xs font-medium text-muted-foreground mb-1 block">report-uri endpoint</label>
              <Input id="report-uri" v-model="reportUri" class="font-mono text-xs" placeholder="/csp-report" />
            </div>
          </CardContent>
        </Card>

        <!-- Output -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0">
            <CardTitle class="text-lg flex items-center gap-2"><Code2 class="w-4 h-4" /> Generated header</CardTitle>
            <Button variant="outline" size="sm" @click="copyCsp">
              <Check v-if="copied" class="w-3.5 h-3.5 mr-1" /><Copy v-else class="w-3.5 h-3.5 mr-1" />
              {{ copied ? 'Copied' : 'Copy' }}
            </Button>
          </CardHeader>
          <CardContent>
            <pre class="text-xs font-mono bg-muted/50 rounded-lg p-4 whitespace-pre-wrap break-all">{{ headerName }}: {{ csp || '(configure directives above)' }}</pre>
            <p class="text-xs text-muted-foreground mt-3">Add this header in your web server, CDN, or meta tag. Test with Report-Only mode first.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
