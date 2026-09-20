<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScanLine, CheckCircle2, AlertCircle, Loader2, ShieldCheck, ExternalLink } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'DPP Resolver Tester — QR Scan Verification | Formatho',
  description:
    'Test a Digital Product Passport resolver: paste the URL from a QR code, fetch the passport, and verify required fields are present. Free, runs in your browser.',
  keywords: ['dpp resolver test', 'digital product passport qr test', 'dpp resolver verification', 'scan dpp qr code', 'espr resolver check', 'gs1 resolver test'],
  ogType: 'website'
})

const url = ref('')
const loading = ref(false)
const error = ref('')
const result = ref<{
  status: number
  contentType: string
  fields: Array<{ name: string; present: boolean; value?: string }>
  json: unknown
  raw: string
} | null>(null)

const REQUIRED_FIELDS = [
  'identification',
  'identification.gtin',
  'identification.productName',
  'operator',
  'operator.name',
  'dataCarrier',
  'dataCarrier.resolverUrl',
  'conformity',
  'conformity.ceMarking',
  'batteryPassport',
  'batteryPassport.chemistry',
  'circularity'
]

function get(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, k) => (acc as Record<string, unknown>)?.[k], obj)
}

async function test() {
  error.value = ''
  result.value = null
  if (!url.value.trim() || !/^https?:\/\/.+/.test(url.value)) {
    error.value = 'Enter a valid HTTPS resolver URL (the URL encoded in the QR code)'
    return
  }
  loading.value = true
  try {
    const res = await fetch(url.value, { headers: { Accept: 'application/json' } })
    const raw = await res.text()
    let json: unknown = null
    try { json = JSON.parse(raw) } catch { /* not JSON */ }
    const fields = REQUIRED_FIELDS.map(f => {
      const v = get(json, f)
      return { name: f, present: v !== undefined && v !== null, value: v !== undefined && v !== null ? String(v).slice(0, 60) : undefined }
    })
    result.value = { status: res.status, contentType: res.headers.get('content-type') || 'unknown', fields, json, raw: raw.slice(0, 2000) }
  } catch (e) {
    error.value = 'Fetch failed: ' + (e as Error).message + ' — check CORS (the resolver must allow browser access) and that the URL is reachable.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-4 space-y-4">
    <div class="flex items-center gap-2">
      <div class="p-1.5 bg-primary/10 rounded-lg"><ScanLine class="w-5 h-5 text-primary" /></div>
      <div>
        <h1 class="text-xl md:text-2xl font-bold">DPP Resolver Tester</h1>
        <p class="text-xs text-muted-foreground">Test the full chain: QR URL → resolver → passport data. Free, runs in your browser.</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-5 space-y-3">
        <label class="text-xs text-muted-foreground">Resolver URL (what the QR code encodes)</label>
        <div class="flex gap-2">
          <input
            v-model="url"
            class="flex-1 h-10 rounded-md border border-input bg-background px-3 font-mono text-sm"
            placeholder="https://dpp.example.com/passport/DPP-2026-000042"
            aria-label="DPP resolver URL"
            @keyup.enter="test"
          />
          <Button size="lg" :disabled="loading || !url.trim()" @click="test">
            <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />
            Test resolver
          </Button>
        </div>
        <p class="text-[10px] text-muted-foreground">
          Paste the URL from a DPP QR code (or a GS1 Digital Link). This tool fetches it and checks that the returned JSON contains the required passport fields. The resolver must allow cross-origin requests (CORS).
        </p>
      </CardContent>
    </Card>

    <Card v-if="error" class="border-red-500/40">
      <CardContent class="pt-5 flex items-start gap-2">
        <AlertCircle class="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
        <p class="text-xs text-red-600 font-mono">{{ error }}</p>
      </CardContent>
    </Card>

    <template v-if="result">
      <!-- Status -->
      <Card :class="result.status === 200 ? 'border-green-500/50' : 'border-red-500/40'">
        <CardContent class="pt-5 flex flex-wrap items-center gap-4 text-sm">
          <component :is="result.status === 200 ? CheckCircle2 : AlertCircle" class="w-5 h-5" :class="result.status === 200 ? 'text-green-600' : 'text-red-500'" />
          <div>
            <p class="font-semibold">HTTP {{ result.status }}</p>
            <p class="text-xs text-muted-foreground">{{ result.contentType }}</p>
          </div>
          <a v-if="url" :href="url" target="_blank" rel="noopener noreferrer" class="ml-auto text-xs text-primary underline underline-offset-2 flex items-center gap-1">
            Open directly <ExternalLink class="w-3 h-3" />
          </a>
        </CardContent>
      </Card>

      <!-- Field checks -->
      <Card v-if="result.json">
        <CardContent class="pt-5 space-y-2">
          <p class="text-sm font-semibold mb-3">Required passport fields</p>
          <div v-for="f in result.fields" :key="f.name" class="flex items-center gap-3 text-xs py-1 border-b border-border/40">
            <component :is="f.present ? CheckCircle2 : AlertCircle" class="w-3.5 h-3.5 shrink-0" :class="f.present ? 'text-green-600' : 'text-red-500'" />
            <code class="font-mono flex-1">{{ f.name }}</code>
            <span v-if="f.present && f.value" class="text-muted-foreground font-mono truncate max-w-[200px]">{{ f.value }}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
              :class="f.present ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'">{{ f.present ? 'present' : 'missing' }}</span>
          </div>
        </CardContent>
      </Card>

      <!-- Raw response -->
      <Card v-if="result.raw">
        <CardContent class="pt-5">
          <p class="text-sm font-semibold mb-2">Raw response (first 2KB)</p>
          <pre class="text-[10px] font-mono whitespace-pre-wrap break-all border border-border rounded-lg p-3 max-h-64 overflow-y-auto bg-muted/20 m-0">{{ result.raw }}</pre>
        </CardContent>
      </Card>
    </template>

    <Card>
      <CardContent class="pt-5 text-xs text-muted-foreground leading-relaxed space-y-2">
        <p><strong class="text-foreground">What this tests:</strong> the chain a consumer or recycler experiences — scan QR → resolve URL → receive passport data. It checks HTTP reachability, JSON structure, and that required ESPR fields are present.</p>
        <p>If the fetch fails with a CORS error, the resolver needs to send <code class="font-mono">Access-Control-Allow-Origin</code> — without it, browser-based tools and consumer apps cannot read the passport. This is a common deployment gap.</p>
        <p>Build the QR with the <RouterLink to="/tools/gs1-digital-link" class="text-primary underline underline-offset-2">GS1 Digital Link builder</RouterLink>, validate the JSON with the <RouterLink to="/tools/dpp-json-validator" class="text-primary underline underline-offset-2">DPP JSON Validator</RouterLink>.</p>
      </CardContent>
    </Card>
  </div>
</template>
