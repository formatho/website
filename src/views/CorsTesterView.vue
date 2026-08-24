<script setup lang="ts">
import { ref } from 'vue'
import { Globe, Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'CORS Tester - Test Cross-Origin Requests | Formatho',
  description: 'Test CORS (Cross-Origin Resource Sharing) on any API endpoint. See Access-Control-Allow-Origin, methods, headers, and preflight responses. Runs from your browser — exactly what real clients see.',
  keywords: ['cors tester', 'cors check', 'access-control-allow-origin', 'cors preflight', 'cors debug', 'cross origin test'],
  ogType: 'website'
})

const url = ref('')
const method = ref('GET')
const loading = ref(false)
const result = ref<null | { success: boolean; status: number; statusText: string; headers: Array<{ name: string; value: string }>; error?: string }>(null)

const CORS_HEADERS = [
  'access-control-allow-origin',
  'access-control-allow-methods',
  'access-control-allow-headers',
  'access-control-allow-credentials',
  'access-control-expose-headers',
  'access-control-max-age',
]

async function test() {
  error.value = ''
  result.value = null
  let target = url.value.trim()
  if (!target) return
  if (!/^https?:\/\//.test(target)) target = 'https://' + target
  loading.value = true
  try {
    const res = await fetch(target, {
      method: method.value,
      mode: 'cors',
      signal: AbortSignal.timeout(15000),
    })
    const headers: Array<{ name: string; value: string }> = []
    // Collect CORS-relevant headers
    for (const name of CORS_HEADERS) {
      const value = res.headers.get(name)
      if (value) headers.push({ name, value })
    }
    // Also show content-type
    const ct = res.headers.get('content-type')
    if (ct) headers.push({ name: 'content-type', value: ct })

    result.value = { success: res.ok, status: res.status, statusText: res.statusText, headers }
  } catch (e) {
    const msg = (e as Error).message
    result.value = {
      success: false,
      status: 0,
      statusText: 'Request blocked',
      headers: [],
      error: msg.includes('CORS') || msg.includes('Access-Control')
        ? 'Request was blocked by CORS. The server did not return Access-Control-Allow-Origin for this origin.'
        : msg,
    }
  } finally {
    loading.value = false
  }
}

const error = ref('')
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><Globe class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">CORS Tester</h1>
        <p class="text-sm text-muted-foreground">Test cross-origin requests from your browser — exactly what real clients see</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardContent class="space-y-4 pt-6">
        <div class="flex gap-3">
          <select v-model="method" class="h-10 rounded-md border border-input bg-transparent px-3 font-mono text-sm shrink-0">
            <option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option><option>OPTIONS</option>
          </select>
          <Input v-model="url" class="font-mono text-sm" placeholder="https://api.example.com/data" aria-label="URL to test" @keyup.enter="test" />
          <Button :disabled="loading" @click="test">
            <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />Test
          </Button>
        </div>
      </CardContent>
    </Card>

    <div v-if="result">
      <div class="mb-6 flex items-center gap-3 p-4 rounded-xl border" :class="result.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'">
        <component :is="result.success ? CheckCircle2 : XCircle" class="w-5 h-5" :class="result.success ? 'text-green-600' : 'text-red-600'" />
        <div>
          <p class="font-medium" :class="result.success ? 'text-green-700' : 'text-red-700'">
            {{ result.status }} {{ result.statusText }}
          </p>
          <p v-if="result.error" class="text-xs text-muted-foreground mt-1">{{ result.error }}</p>
        </div>
      </div>

      <Card v-if="result.headers.length">
        <CardHeader><CardTitle class="text-lg">CORS response headers</CardTitle></CardHeader>
        <CardContent class="space-y-2">
          <div v-for="h in result.headers" :key="h.name" class="flex items-start justify-between gap-4 p-3 border border-border rounded-lg">
            <code class="font-mono text-xs text-muted-foreground shrink-0">{{ h.name }}</code>
            <code class="font-mono text-xs text-right break-all">{{ h.value }}</code>
          </div>
        </CardContent>
      </Card>

      <div v-else-if="result.success" class="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
        <AlertTriangle class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p class="text-sm text-amber-700">The request succeeded but no CORS headers were exposed to JavaScript. The server may not send Access-Control-Expose-Headers for custom headers.</p>
      </div>
    </div>
  </div>
</template>
