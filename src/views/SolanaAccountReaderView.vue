<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check, Play, Search, KeyRound, AlertCircle, Loader2 } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Solana Account Reader & PDA Generator | Formatho',
  description:
    'Look up any Solana account - owner, lamports, rent epoch, data - and decode SPL token accounts. Includes a Program Derived Address (PDA) generator. Connects from your browser to any Solana RPC.',
  keywords: [
    'solana account reader',
    'solana account info',
    'decode solana token account',
    'solana pda generator',
    'program derived address',
    'solana rpc viewer',
    'check solana account balance'
  ],
  ogType: 'website'
})

const rpcUrl = ref('https://api.mainnet-beta.solana.com')
const pubkey = ref('')
const loading = ref(false)
const error = ref('')
const account = ref<null | {
  owner: string
  lamports: string
  rentEpoch: number
  executable: boolean
  dataSize: number
  dataPreview: string
  token?: { mint: string; amount: string; state: string; delegate?: string }
}>(null)
const copied = ref<string | null>(null)

const presets = [
  { label: 'Mainnet', url: 'https://api.mainnet-beta.solana.com' },
  { label: 'Devnet', url: 'https://api.devnet.solana.com' },
  { label: 'Testnet', url: 'https://api.testnet.solana.com' }
]

// PDA generator state
const pdaSeeds = ref('seeds:one')
const pdaProgram = ref('')
const pdaResult = ref('')
const pdaError = ref('')

async function fetchAccount() {
  error.value = ''
  account.value = null
  const pk = pubkey.value.trim()
  if (!pk) {
    error.value = 'Enter a Solana public key'
    return
  }
  try {
    new PublicKey(pk)
  } catch {
    error.value = 'Invalid Solana public key (base58)'
    return
  }
  loading.value = true
  try {
    const conn = new Connection(rpcUrl.value, 'confirmed')
    const info = await conn.getAccountInfo(new PublicKey(pk))
    if (!info) {
      error.value = 'Account not found on this network - check the RPC endpoint and key'
      return
    }
    const hex = Buffer.from(info.data).toString('hex')
    let token: SolanaToken | undefined
    if (info.owner.toBase58() === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' && info.data.length === 165) {
      const d = info.data
      const amount = d.readBigUInt64LE(64)
      const delegateOpt = d.readUInt32LE(72)
      const stateByte = d.readUInt8(108)
      token = {
        mint: new PublicKey(d.slice(0, 32)).toBase58(),
        amount: amount.toString(),
        state: ['Uninitialized', 'Initialized', 'Frozen'][stateByte] || `Unknown(${stateByte})`,
        delegate: delegateOpt === 1 ? new PublicKey(d.slice(76, 108)).toBase58() : undefined
      }
    }
    account.value = {
      owner: info.owner.toBase58(),
      lamports: (Number(info.lamports) / LAMPORTS_PER_SOL).toFixed(9).replace(/\.?0+$/, '') + ' SOL',
      rentEpoch: info.rentEpoch,
      executable: info.executable,
      dataSize: info.data.length,
      dataPreview: hex ? '0x' + hex.slice(0, 128) + (hex.length > 128 ? '…' : '') : '(empty)',
      token
    }
  } catch (e) {
    error.value = (e as Error).message
  } finally {
    loading.value = false
  }
}

interface SolanaToken {
  mint: string
  amount: string
  state: string
  delegate?: string
}

async function derivePda() {
  pdaError.value = ''
  pdaResult.value = ''
  try {
    if (!pdaProgram.value.trim()) throw new Error('Enter the program ID')
    const programId = new PublicKey(pdaProgram.value.trim())
    const seedBufs = pdaSeeds.value
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((seed) => {
        if (seed.startsWith('0x')) return Buffer.from(seed.slice(2), 'hex')
        return Buffer.from(seed, 'utf8')
      })
      .slice(0, 8)
    const [pda, bump] = await PublicKey.findProgramAddress(seedBufs, programId)
    pdaResult.value = `PDA: ${pda.toBase58()}\nBump seed: ${bump}`
  } catch (e) {
    pdaError.value = (e as Error).message
  }
}

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => (copied.value = null), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Search class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Solana Account Reader &amp; PDA Generator</h1>
        <p class="text-sm text-muted-foreground">
          Look up any account, decode SPL token accounts, derive PDAs — straight from your browser
        </p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Account lookup</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="sol-rpc" class="text-sm font-medium text-muted-foreground mb-1 block">RPC endpoint</label>
            <Input id="sol-rpc" v-model="rpcUrl" class="font-mono text-sm" placeholder="https://..." aria-label="Solana RPC endpoint" />
            <div class="flex flex-wrap gap-1.5 mt-2">
              <button
                v-for="preset in presets"
                :key="preset.label"
                class="no-btn-hover text-xs px-2 py-0.5 border border-foreground/15 rounded-full hover:border-foreground/40 transition-colors"
                :class="{ 'bg-primary/10 border-primary/40': rpcUrl === preset.url }"
                @click="rpcUrl = preset.url"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>
          <div>
            <label for="sol-key" class="text-sm font-medium text-muted-foreground mb-1 block">Account public key</label>
            <Input
              id="sol-key"
              v-model="pubkey"
              class="font-mono text-sm"
              placeholder="Base58 public key"
              aria-label="Solana account public key"
              @keyup.enter="fetchAccount"
            />
          </div>
        </div>
        <Button size="sm" :disabled="loading" @click="fetchAccount">
          <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />
          <Play v-else class="w-4 h-4 mr-1" />
          Look up account
        </Button>
        <p v-if="error" class="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" /> {{ error }}
        </p>
      </CardContent>
    </Card>

    <Card v-if="account" class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Account info</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2">
        <div v-for="(v, k) in {
          'Owner program': account.owner,
          'Balance': account.lamports,
          'Rent epoch': account.rentEpoch,
          'Executable': account.executable ? 'yes' : 'no',
          'Data size': account.dataSize + ' bytes'
        }" :key="k" class="flex items-start justify-between gap-4 p-3 border border-border rounded-lg">
          <span class="text-sm text-muted-foreground flex-shrink-0">{{ k }}</span>
          <code class="font-mono text-xs break-all text-right">{{ v }}</code>
        </div>
        <div class="p-3 border border-border rounded-lg">
          <p class="text-sm text-muted-foreground mb-1">Data (first 64 bytes)</p>
          <code class="font-mono text-xs break-all">{{ account.dataPreview }}</code>
        </div>
        <div v-if="account.token" class="p-4 bg-green-500/10 border border-green-500/20 rounded-lg space-y-1">
          <p class="text-sm font-semibold text-green-700">SPL Token account decoded</p>
          <div class="flex items-center justify-between gap-4">
            <p class="font-mono text-xs break-all">Mint: {{ account.token.mint }}</p>
            <Button variant="ghost" size="sm" aria-label="Copy mint" @click="copy(account.token!.mint, 'mint')">
              <Check v-if="copied === 'mint'" class="w-4 h-4" />
              <Copy v-else class="w-4 h-4" />
            </Button>
          </div>
          <p class="font-mono text-xs">Amount (raw): {{ account.token.amount }}</p>
          <p class="font-mono text-xs">State: {{ account.token.state }}</p>
          <p v-if="account.token.delegate" class="font-mono text-xs break-all">Delegate: {{ account.token.delegate }}</p>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <KeyRound class="w-4 h-4" /> Program Derived Address (PDA) generator
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-sm text-muted-foreground">
          One seed per line (UTF-8, or 0x-prefixed hex). Seeds, plus the bump seed, must total 32 bytes or fewer.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="pda-seeds" class="text-sm font-medium text-muted-foreground mb-1 block">Seeds</label>
            <Textarea id="pda-seeds" v-model="pdaSeeds" :rows="3" class="font-mono text-xs" aria-label="PDA seeds" />
          </div>
          <div>
            <label for="pda-program" class="text-sm font-medium text-muted-foreground mb-1 block">Program ID</label>
            <Input id="pda-program" v-model="pdaProgram" class="font-mono text-sm" placeholder="Program public key" aria-label="Program ID" />
            <Button size="sm" class="mt-3" @click="derivePda">Derive PDA</Button>
          </div>
        </div>
        <p v-if="pdaError" class="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" /> {{ pdaError }}
        </p>
        <div v-if="pdaResult" class="flex items-center justify-between gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <pre class="font-mono text-xs whitespace-pre-wrap">{{ pdaResult }}</pre>
          <Button variant="ghost" size="sm" aria-label="Copy PDA" @click="copy(pdaResult, 'pda')">
            <Check v-if="copied === 'pda'" class="w-4 h-4" />
            <Copy v-else class="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
