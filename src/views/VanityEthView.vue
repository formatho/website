<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { Copy, Check, Play, Square, ShieldCheck, AlertTriangle } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Ethereum Vanity Address Generator Online - Client-Side & Private | Formatho',
  description:
    'Generate Ethereum vanity addresses with your chosen prefix or suffix. Runs 100% in your browser with a Web Worker - the private key is never transmitted, logged, or stored.',
  keywords: [
    'ethereum vanity address generator',
    'vanity eth address',
    'eth vanity generator online',
    'custom ethereum address',
    'safe vanity address',
    'client-side vanity generator'
  ],
  ogType: 'website'
})

const prefix = ref('')
const suffix = ref('')
const isRunning = ref(false)
const attempts = ref(0)
const rate = ref(0)
const copiedField = ref<string | null>(null)

interface Found {
  address: string
  privateKey: string
  attempts: number
}
const results = ref<Found[]>([])

let worker: Worker | null = null
let startTime = 0

const hexPattern = /^[0-9a-fA-F]*$/
const prefixError = computed(() =>
  prefix.value && !hexPattern.test(prefix.value) ? 'Prefix must be hex characters (0-9, a-f)' : ''
)
const suffixError = computed(() =>
  suffix.value && !hexPattern.test(suffix.value) ? 'Suffix must be hex characters (0-9, a-f)' : ''
)
const canStart = computed(
  () => !isRunning.value && !prefixError.value && !suffixError.value && (prefix.value || suffix.value)
)

// Expected attempts for the combined pattern (each hex char = 1/16)
const expectedAttempts = computed(() => {
  const n = prefix.value.length + suffix.value.length
  return n ? Math.pow(16, n) : 0
})

function formatBig(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k'
  return n.toLocaleString()
}

function start() {
  if (!canStart.value) return
  isRunning.value = true
  attempts.value = 0
  startTime = performance.now()

  worker = new Worker(new URL('../workers/vanity.worker.ts', import.meta.url), { type: 'module' })
  worker.onmessage = (e: MessageEvent) => {
    const { type, attempts: total, address, privateKey } = e.data
    if (type === 'progress') {
      attempts.value = total
      const elapsed = (performance.now() - startTime) / 1000
      if (elapsed > 0) rate.value = Math.round((total - 0) / elapsed)
    } else if (type === 'found') {
      attempts.value = total
      results.value.unshift({ address, privateKey, attempts: total })
      if (results.value.length > 10) results.value.pop()
    }
  }
  worker.postMessage({ action: 'start', prefix: prefix.value, suffix: suffix.value })
}

function stop() {
  isRunning.value = false
  worker?.postMessage({ action: 'stop' })
  worker?.terminate()
  worker = null
}

onUnmounted(stop)

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = key
    setTimeout(() => (copiedField.value = null), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <ShieldCheck class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Ethereum Vanity Address Generator</h1>
        <p class="text-sm text-muted-foreground">
          Keys are generated in your browser — never transmitted, logged, or stored
        </p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Pattern</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="vanity-prefix" class="text-sm font-medium text-muted-foreground mb-1 block">
              Address prefix (after 0x)
            </label>
            <div class="flex items-center gap-2">
              <span class="font-mono text-sm text-muted-foreground">0x</span>
              <Input
                id="vanity-prefix"
                v-model="prefix"
                class="font-mono"
                maxlength="10"
                placeholder="dead"
                aria-label="Address prefix"
              />
            </div>
            <p v-if="prefixError" class="text-xs text-red-500 mt-1">{{ prefixError }}</p>
          </div>
          <div>
            <label for="vanity-suffix" class="text-sm font-medium text-muted-foreground mb-1 block">
              Address suffix (ending)
            </label>
            <Input
              id="vanity-suffix"
              v-model="suffix"
              class="font-mono"
              maxlength="10"
              placeholder="beef"
              aria-label="Address suffix"
            />
            <p v-if="suffixError" class="text-xs text-red-500 mt-1">{{ suffixError }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 flex-wrap">
          <Button v-if="!isRunning" :disabled="!canStart" @click="start">
            <Play class="w-4 h-4 mr-2" />
            Start generating
          </Button>
          <Button v-else variant="destructive" @click="stop">
            <Square class="w-4 h-4 mr-2" />
            Stop
          </Button>
          <div v-if="attempts > 0" class="text-sm text-muted-foreground font-mono">
            {{ attempts.toLocaleString() }} attempts · {{ rate.toLocaleString() }}/sec
          </div>
          <div
            v-if="expectedAttempts > 0 && !isRunning"
            class="text-xs text-muted-foreground"
          >
            ~{{ formatBig(expectedAttempts) }} attempts expected for this pattern
          </div>
        </div>
      </CardContent>
    </Card>

    <Card v-if="results.length" class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Matches found ({{ results.length }})</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div v-for="(r, i) in results" :key="r.address" class="p-4 border border-border rounded-lg space-y-2">
          <div class="flex items-center justify-between gap-4">
            <code class="font-mono text-sm font-semibold text-primary break-all">{{ r.address }}</code>
            <Button variant="ghost" size="sm" :aria-label="'Copy address ' + i" @click="copy(r.address, 'addr' + i)">
              <Check v-if="copiedField === 'addr' + i" class="w-4 h-4" />
              <Copy v-else class="w-4 h-4" />
            </Button>
          </div>
          <div class="flex items-center justify-between gap-4">
            <code class="font-mono text-xs break-all text-muted-foreground">{{ r.privateKey }}</code>
            <Button variant="ghost" size="sm" :aria-label="'Copy private key ' + i" @click="copy(r.privateKey, 'pk' + i)">
              <Check v-if="copiedField === 'pk' + i" class="w-4 h-4" />
              <Copy v-else class="w-4 h-4" />
            </Button>
          </div>
          <p class="text-xs text-muted-foreground">Found after {{ r.attempts.toLocaleString() }} attempts</p>
        </div>
      </CardContent>
    </Card>

    <div class="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <AlertTriangle class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div class="text-sm">
        <p class="font-semibold text-yellow-800">Use for testing and throwaway accounts</p>
        <p class="text-yellow-700 mt-1">
          Although this generator runs entirely in your browser, best practice for holding real funds is to
          generate keys on an air-gapped device or hardware wallet. Never share a private key.
        </p>
      </div>
    </div>
  </div>
</template>
