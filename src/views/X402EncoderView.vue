<script setup lang="ts">
import { ref, computed } from 'vue'
import { DollarSign, Copy, Check, ArrowRightLeft, Zap } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'X402 Payment Encoder - Agent-to-Agent Payments | Formatho',
  description: 'Encode and decode X402 payment payloads for agent-to-agent transactions on Ritual Chain. Build HTTP 402 payment challenges, responses, and settlement data. Free, private, client-side.',
  keywords: ['x402 encoder', 'x402 payment', 'agent to agent payment', 'ritual x402', 'http 402 payment', 'machine payments', 'ai agent payments'],
  ogType: 'website'
})

const payer = ref('0x1234567890123456789012345678901234567890')
const payee = ref('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd')
const amount = ref('10000000000000000') // 0.01 ETH in wei
const token = ref('RITUAL')
const chainId = ref(1979)
const resource = ref('https://api.example-agent.com/v1/inference')
const copied = ref('')
const activeTab = ref<'encode' | 'decode'>('encode')
const decodeInput = ref('')
const decoded = ref<Record<string, unknown> | null>(null)
const decodeError = ref('')

interface X402Payment {
  version: string
  payer: string
  payee: string
  amount: string
  token: string
  chainId: number
  resource: string
  timestamp: number
  expiresAt: number
  nonce: string
  signature: string
  scheme: string
}

const encodedPayment = computed((): X402Payment => {
  const now = Math.floor(Date.now() / 1000)
  return {
    version: 'x402/1.0',
    payer: payer.value,
    payee: payee.value,
    amount: amount.value,
    token: token.value,
    chainId: chainId.value,
    resource: resource.value,
    timestamp: now,
    expiresAt: now + 300, // 5 minutes
    nonce: '0x' + Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0')).join(''),
    signature: '(signed by payer — see signing instructions below)',
    scheme: 'https://x402.org/schemes/evm'
  }
})

const encodedJson = computed(() => JSON.stringify(encodedPayment.value, null, 2))

// HTTP 402 challenge format
const httpChallenge = computed(() => {
  return JSON.stringify({
    'X-402-Challenge': {
      scheme: 'https://x402.org/schemes/evm',
      network: chainId.value,
      payee: payee.value,
      resource: resource.value,
      maxAmountRequired: amount.value,
      asset: token.value,
    }
  }, null, 2)
})

// Payment header format
const paymentHeader = computed(() => {
  return JSON.stringify({
    'X-402-Payment': encodedPayment.value
  }, null, 2)
})

function decode() {
  decodeError.value = ''
  decoded.value = null
  try {
    const data = JSON.parse(decodeInput.value)
    // Accept both raw payment and header-wrapped
    const payment = data['X-402-Payment'] || data['X-402-Challenge'] || data
    decoded.value = payment as Record<string, unknown>

    // Validate required fields
    const required = ['payer', 'payee', 'amount']
    const missing = required.filter(f => !(f in payment))
    if (missing.length > 0) {
      decodeError.value = `Missing required fields: ${missing.join(', ')}`
      decoded.value = null
    }
  } catch (e) {
    decodeError.value = 'Invalid JSON: ' + (e as Error).message
  }
}

function fillSample() {
  decodeInput.value = JSON.stringify({
    version: 'x402/1.0',
    payer: '0x1234567890123456789012345678901234567890',
    payee: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    amount: '10000000000000000',
    token: 'RITUAL',
    chainId: 1979,
    resource: 'https://api.agent.com/v1/llm',
    timestamp: 1750000000,
    expiresAt: 1750000300,
    nonce: '0xdeadbeef12345678',
    scheme: 'https://x402.org/schemes/evm'
  }, null, 2)
}

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => (copied.value = ''), 1500)
  } catch { /* clipboard unavailable */ }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><DollarSign class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">X402 Payment Encoder</h1>
        <p class="text-sm text-muted-foreground">Build agent-to-agent payment payloads for Ritual Chain — 100% client-side</p>
      </div>
    </div>

    <!-- Tab switcher -->
    <div class="flex gap-2 mb-4">
      <button
        class="no-btn-hover text-sm px-4 py-2 rounded-lg border transition-colors font-medium"
        :class="activeTab === 'encode' ? 'bg-primary/10 border-primary/40' : 'border-border text-muted-foreground'"
        @click="activeTab = 'encode'"
      >
        <ArrowRightLeft class="w-4 h-4 inline mr-1.5" /> Encode
      </button>
      <button
        class="no-btn-hover text-sm px-4 py-2 rounded-lg border transition-colors font-medium"
        :class="activeTab === 'decode' ? 'bg-primary/10 border-primary/40' : 'border-border text-muted-foreground'"
        @click="activeTab = 'decode'"
      >
        <Zap class="w-4 h-4 inline mr-1.5" /> Decode
      </button>
    </div>

    <!-- ENCODE MODE -->
    <div v-if="activeTab === 'encode'" class="space-y-6">
      <Card>
        <CardHeader><CardTitle class="text-lg">Payment parameters</CardTitle></CardHeader>
        <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-medium text-muted-foreground mb-1 block">Payer address (from)</label>
            <Input v-model="payer" class="font-mono text-xs" placeholder="0x..." aria-label="Payer address" />
          </div>
          <div>
            <label class="text-xs font-medium text-muted-foreground mb-1 block">Payee address (to)</label>
            <Input v-model="payee" class="font-mono text-xs" placeholder="0x..." aria-label="Payee address" />
          </div>
          <div>
            <label class="text-xs font-medium text-muted-foreground mb-1 block">Amount (in wei)</label>
            <Input v-model="amount" class="font-mono text-xs" placeholder="10000000000000000" aria-label="Amount in wei" />
          </div>
          <div>
            <label class="text-xs font-medium text-muted-foreground mb-1 block">Token</label>
            <Input v-model="token" class="font-mono text-xs" placeholder="RITUAL" aria-label="Token symbol" />
          </div>
          <div>
            <label class="text-xs font-medium text-muted-foreground mb-1 block">Chain ID</label>
            <Input v-model="chainId" type="number" class="font-mono text-xs" placeholder="1979" aria-label="Chain ID" />
          </div>
          <div>
            <label class="text-xs font-medium text-muted-foreground mb-1 block">Resource URL</label>
            <Input v-model="resource" class="font-mono text-xs" placeholder="https://api.agent.com/..." aria-label="Resource URL" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Encoded payment payload</CardTitle>
          <Button variant="outline" size="sm" @click="copy(encodedJson, 'payload')">
            <Check v-if="copied === 'payload'" class="w-3.5 h-3.5 mr-1 text-green-600" /><Copy v-else class="w-3.5 h-3.5 mr-1" />
            Copy
          </Button>
        </CardHeader>
        <CardContent>
          <pre class="text-xs font-mono bg-muted/50 rounded-lg p-4 overflow-x-auto">{{ encodedJson }}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-lg">HTTP 402 challenge (server response)</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-start justify-between gap-2">
            <pre class="text-xs font-mono bg-muted/50 rounded-lg p-4 overflow-x-auto flex-1">{{ httpChallenge }}</pre>
            <Button variant="ghost" size="sm" aria-label="Copy challenge" @click="copy(httpChallenge, 'challenge')">
              <Check v-if="copied === 'challenge'" class="w-4 h-4 text-green-600" /><Copy v-else class="w-4 h-4" />
            </Button>
          </div>
          <p class="text-xs text-muted-foreground mt-2">
            The payee agent returns this in the HTTP response when a payment is required.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-lg">Payment header (client request)</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-start justify-between gap-2">
            <pre class="text-xs font-mono bg-muted/50 rounded-lg p-4 overflow-x-auto flex-1">{{ paymentHeader }}</pre>
            <Button variant="ghost" size="sm" aria-label="Copy payment header" @click="copy(paymentHeader, 'header')">
              <Check v-if="copied === 'header'" class="w-4 h-4 text-green-600" /><Copy v-else class="w-4 h-4" />
            </Button>
          </div>
          <p class="text-xs text-muted-foreground mt-2">
            The payer agent sends this header with the retry request after receiving a 402 challenge.
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- DECODE MODE -->
    <div v-if="activeTab === 'decode'" class="space-y-6">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Paste X402 payment JSON</CardTitle>
          <Button variant="outline" size="sm" @click="fillSample">Sample</Button>
        </CardHeader>
        <CardContent class="space-y-3">
          <textarea
            v-model="decodeInput"
            :rows="8"
            class="w-full p-3 font-mono text-xs rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder='{"version":"x402/1.0","payer":"0x...","payee":"0x..."}'
            aria-label="X402 payment JSON to decode"
          />
          <Button size="sm" @click="decode">Decode payment</Button>
          <p v-if="decodeError" class="text-xs text-red-500">{{ decodeError }}</p>
        </CardContent>
      </Card>

      <Card v-if="decoded">
        <CardHeader><CardTitle class="text-lg">Decoded payment</CardTitle></CardHeader>
        <CardContent class="space-y-2">
          <div v-for="(value, key) in decoded" :key="key" class="flex items-start justify-between gap-3 p-3 border border-border rounded-lg">
            <span class="text-xs text-muted-foreground shrink-0 font-mono">{{ key }}</span>
            <code class="text-xs font-mono text-right break-all">{{ String(value) }}</code>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
