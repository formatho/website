<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10">
        <Radar class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold">OWASP ZAP Report Analyzer</h1>
        <p class="text-sm text-muted-foreground">Paste a ZAP JSON or Markdown report, get a triaged summary with fixes. 100% client-side.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>Paste ZAP Report</CardTitle><CardDescription>Traditional JSON export (-J) or Markdown (-md) from OWASP ZAP.</CardDescription></CardHeader>
      <CardContent class="space-y-3">
        <textarea v-model="report" rows="10" class="w-full p-3 rounded-md border bg-background text-sm font-mono" placeholder='{"@generated": "...", "site": [...]}'></textarea>
        <div class="flex gap-2">
          <Button @click="analyze">Analyze Report</Button>
          <Button variant="outline" @click="report = sample; result = null">Load Sample</Button>
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
    </Card>

    <div v-if="result">
      <Card class="mb-4">
        <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div v-for="r in riskOrder" :key="r" class="p-3 rounded-lg border text-center">
              <div class="text-2xl font-bold" :class="riskClass(r)">{{ result.byRisk[r]?.length || 0 }}</div>
              <div class="text-xs text-muted-foreground">{{ r }}</div>
            </div>
          </div>
          <p class="mt-3 text-sm text-muted-foreground">{{ result.alerts.length }} unique alerts, {{ result.instances }} total instances across {{ result.sites }} site(s).</p>
        </CardContent>
      </Card>

      <Card v-for="a in result.alerts" :key="a.pluginid + a.name" class="mb-3">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 flex-wrap">
            <span class="px-2 py-0.5 rounded-full text-xs font-semibold" :class="riskBadge(a.risk)">{{ a.risk }}</span>
            {{ a.name }}
            <span class="text-xs text-muted-foreground">x{{ a.count }}</span>
          </CardTitle>
          <CardDescription>
            Plugin {{ a.pluginid }}
            <a v-if="a.cwe" :href="'https://cwe.mitre.org/data/definitions/' + a.cwe + '.html'" target="_blank" rel="noopener" class="underline">CWE-{{ a.cwe }}</a>
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2 text-sm">
          <p v-if="a.desc" class="text-muted-foreground">{{ a.desc }}</p>
          <details v-if="a.uris.length">
            <summary class="cursor-pointer font-medium">{{ a.uris.length }} affected URL{{ a.uris.length > 1 ? 's' : '' }}</summary>
            <ul class="mt-2 space-y-1">
              <li v-for="u in a.uris" :key="u" class="font-mono text-xs break-all text-muted-foreground">{{ u }}</li>
            </ul>
          </details>
          <details v-if="a.solution">
            <summary class="cursor-pointer font-medium">Solution</summary>
            <p class="mt-2 text-muted-foreground">{{ a.solution }}</p>
          </details>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>OWASP Zed Attack Proxy (ZAP) is a free, open-source web application security scanner. Reports it exports are dense JSON that is hard to triage. This tool parses them in your browser: nothing is uploaded, no network calls.</p>
        <p>Export from ZAP via Report &gt; Export JSON (or -J flag on the CLI), then paste above.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Radar } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'OWASP ZAP Report Analyzer - Triage Scan Results | Formatho',
  description: 'Paste an OWASP ZAP JSON or Markdown report and get a triaged summary: risk counts, affected URLs, CWE links and fixes. 100% client-side.',
  keywords: 'owasp zap, zap report analyzer, zap json parser, zap report viewer, zap alerts, web security scanner, zap scan triage'
})

const report = ref('')
const error = ref('')
const result = ref<any>(null)
const riskOrder = ['High', 'Medium', 'Low', 'Informational', 'False Positive']

interface Alert {
  name: string; risk: string; pluginid: string; cwe?: string
  desc: string; solution: string; count: number; uris: string[]
}

const sample = JSON.stringify({
  '@generated': 'Fri, 25 Sep 2026 10:00:00',
  site: [{
    '@name': 'https://example.com',
    alerts: [
      { pluginid: '10038', name: 'Content Security Policy (CSP) Header Not Set', riskdesc: 'Medium', confidence: 'Medium', cweid: '693', desc: 'The response does not include a Content-Security-Policy header.', solution: 'Ensure a Content-Security-Policy header is set on all responses.', instances: [{ uri: 'https://example.com/' }, { uri: 'https://example.com/about' }] },
      { pluginid: '10098', name: 'Cross-Domain Misconfiguration', riskdesc: 'Low', confidence: 'Medium', cweid: '264', desc: 'The application allows cross-domain access from arbitrary third parties.', solution: 'Restrict the Access-Control-Allow-Origin header to trusted origins.', instances: [{ uri: 'https://example.com/api' }] }
    ]
  }]
}, null, 2)

const riskBadge = (r: string) => {
  if (r === 'High') return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  if (r === 'Medium') return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
  if (r === 'Low') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
  return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
}
const riskClass = (r: string) => riskBadge(r)

const normalizeRisk = (r: string) => {
  const s = (r || '').toLowerCase()
  if (s.includes('false')) return 'False Positive'
  if (s.includes('high')) return 'High'
  if (s.includes('medium') || s.includes('moderate')) return 'Medium'
  if (s.includes('low')) return 'Low'
  return 'Informational'
}

const analyze = () => {
  error.value = ''
  result.value = null
  const text = report.value.trim()
  if (!text) { error.value = 'Paste a ZAP report first.'; return }

  const alerts: Alert[] = []
  let sites = 0
  try {
    if (text.startsWith('{') || text.startsWith('[')) {
      const data = JSON.parse(text)
      const siteList = Array.isArray(data) ? data : (data.site || [])
      sites = siteList.length
      for (const site of siteList) {
        for (const a of site.alerts || []) {
          alerts.push({
            name: a.name || 'Unnamed alert',
            risk: normalizeRisk(a.riskdesc || a.risk || ''),
            pluginid: String(a.pluginid || ''),
            cwe: a.cweid ? String(a.cweid) : undefined,
            desc: (a.desc || '').replace(/<[^>]+>/g, ' ').trim().slice(0, 400),
            solution: (a.solution || '').replace(/<[^>]+>/g, ' ').trim().slice(0, 600),
            count: (a.instances || []).length || a.count || 1,
            uris: (a.instances || []).map((i: any) => `${i.method ? i.method + ' ' : ''}${i.uri}`)
          })
        }
      }
    } else {
      // Markdown format: ## <risk> alerts - <name> ... "The URL ... " blocks
      const blocks = text.split(/(?=\n## )/)
      const uriRe = /The URL\n\n\s*(\S+)/g
      for (const block of blocks) {
        const h = block.match(/^## (High|Medium|Low|Informational|False Positive)(?:\/Medium)? (?:Potential )?alerts?\s*-\s*(.+)/m)
        if (!h) continue
        const uris = [...block.matchAll(uriRe)].map(m => m[1])
        const param = block.match(/\* URL: (\S+)/g) || []
        alerts.push({
          name: h[2].trim(), risk: h[1], pluginid: (block.match(/plugin id:\s*(\d+)/i) || [])[1] || '',
          cwe: (block.match(/CWE-?(\d+)/i) || [])[1],
          desc: (block.match(/(?:^|\n)([^#\n*].{20,300})/) || [])[1]?.trim() || '',
          solution: (block.match(/(?:Solution|fix):\s*([\s\S]{10,600}?)(?:\n\n|\n#|$)/i) || [])[1]?.trim() || '',
          count: uris.length || param.length || 1, uris: uris.length ? uris : param.map((p: string) => p.replace('* URL: ', ''))
        })
      }
    }
  } catch (e: any) {
    error.value = 'Could not parse report: ' + e.message + ' Export JSON (Report > Export JSON) for best results.'
    return
  }

  if (!alerts.length) { error.value = 'No alerts found. For Markdown reports, use ZAP standard markdown export.'; return }

  // merge duplicate alert names
  const merged = new Map<string, Alert>()
  for (const a of alerts) {
    const key = a.pluginid + '|' + a.name
    const prev = merged.get(key)
    if (prev) { prev.count += a.count; prev.uris = [...prev.uris, ...a.uris].slice(0, 50) }
    else merged.set(key, a)
  }
  const all = [...merged.values()]
  const byRisk: Record<string, Alert[]> = {}
  for (const r of riskOrder) byRisk[r] = all.filter(a => a.risk === r).sort((x, y) => y.count - x.count)
  result.value = { alerts: [...byRisk.High, ...byRisk.Medium, ...byRisk.Low, ...byRisk.Informational, ...byRisk['False Positive']], byRisk, instances: all.reduce((s, a) => s + a.count, 0), sites }
}

onMounted(() => { report.value = sample; analyze() })
</script>
