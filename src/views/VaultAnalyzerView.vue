<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Vault, Calculator, Radar, AlertCircle, Loader2 } from 'lucide-vue-next'
import { createPublicClient, http, formatUnits, erc4626Abi, erc20Abi } from 'viem'
import { evmChains } from '@/data/evmChains'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ERC-4626 Vault Analyzer - Math Simulator & On-Chain Reader | Formatho',
  description:
    'Simulate ERC-4626 vault math with exact spec rounding (previewDeposit, share price, fees, inflation attack) and read any live vault on-chain: asset, totals, share price, liquidity. 100% client-side.',
  keywords: [
    'erc4626 calculator',
    'erc-4626 vault analyzer',
    'vault share price calculator',
    'previewdeposit calculator',
    'erc4626 inflation attack',
    'vault math simulator',
    'yield vault analyzer'
  ],
  ogType: 'website'
})

// ---------------- Tab 1: simulator (pure math, per EIP-4626) ----------------
const sim = ref({
  totalAssets: '1000000', // asset units (raw)
  totalSupply: '1000000', // share units (raw)
  assetDecimals: 18,
  amount: '1000', // deposit amount, human units
  virtualAssets: '1', // OZ default offset
  virtualShares: '1',
  growthApr: '8', // % APR of the underlying strategy
  days: '365',
  mgmtFeeBps: '20' // 0.20%
})

const toRaw = (human: string, decimals: number) => {
  const [i, f = ''] = human.split('.')
  const padded = (f + '0'.repeat(decimals)).slice(0, decimals)
  return BigInt(i || '0') * 10n ** BigInt(decimals) + BigInt(padded || '0')
}
const fmt = (v: bigint, decimals: number) => {
  try {
    return formatUnits(v, decimals)
  } catch {
    return v.toString()
  }
}

// EIP-4626 mint: shares = mulDiv(assets, totalSupply + virtualShares, totalAssets + virtualAssets, round down)
const simOut = computed(() => {
  try {
    const d = sim.value.assetDecimals
    const assets = toRaw(sim.value.amount || '0', d)
    const ta = toRaw(sim.value.totalAssets || '0', d)
    const ts = toRaw(sim.value.totalSupply || '0', d)
    if (ta <= 0n || ts <= 0n) return null

    const va = BigInt(sim.value.virtualAssets || '0')
    const vs = BigInt(sim.value.virtualShares || '0')

    // exact mulDiv (round down) via BigInt
    const mulDivDown = (a: bigint, b: bigint, c: bigint) => (a * b) / c
    const mulDivUp = (a: bigint, b: bigint, c: bigint) => {
      const inv = c - ((a * b) % c)
      if (inv == c) return (a * b) / c
      return (a * b) / c + 1n
    }

    const sharesMinted = mulDivDown(assets, ts + vs, ta + va)
    const assetsOnRedeem = mulDivDown(sharesMinted, ta + va, ts + vs) // redeem rounds down
    const assetsToWithdraw = mulDivUp(assets, ts + vs, ta + va) // withdraw rounds up

    const priceBefore = mulDivDown(ts > 0n ? ts : 1n, 10n ** 18n, ts) // placeholder; use ratio below

    // growth: value of the deposited position after `days` at APR, then mgmt fee on assets
    const apr = Number(sim.value.growthApr || 0) / 100
    const days = Number(sim.value.days || 0)
    const growthFactor = 1 + (apr * days) / 365
    const feeBps = Number(sim.value.mgmtFeeBps || 0)
    const grossAssetsAfter = Number(sim.value.amount || 0) * growthFactor
    const feeDrag = (grossAssetsAfter - Number(sim.value.amount || 0)) * (feeBps / 10000)
    const netAssetsAfter = grossAssetsAfter - (feeDrag * days) / 365

    // inflation attack: attacker front-runs victim's deposit
    const attack = inflationAttack(ta, ts, va, vs, d)

    return {
      sharesMinted,
      assetsOnRedeem,
      roundTripLoss: assets - assetsOnRedeem,
      assetsToWithdraw,
      sharePrice: mulDivDown(ta, 10n ** 18n, ts),
      grossAssetsAfter,
      netAssetsAfter,
      feeDrag,
      attack
    }
  } catch {
    return null
  }
})

function inflationAttack(ta: bigint, ts: bigint, va: bigint, vs: bigint, d: number) {
  // classic first-depositor scenario: attacker deposits 1 wei share-state, donates X to skew price,
  // victim deposits 1000 tokens and receives ~0 shares.
  // Model: vault has totalSupply = 1 share (attacker), totalAssets = 1 wei.
  const one = 10n ** BigInt(d)
  const victim = 1000n * one
  const donation = 10n * one // attacker donates 10 tokens directly to the vault
  const ts0 = 1n
  const ta0 = 1n
  const sharesForVictim = (victim * (ts0 + vs)) / (ta0 + donation + va)
  const attackerRedeem = mulDivAll(ts0, ta0 + donation + va, ts0 + vs) // attacker redeems 1 share
  return {
    victimShares: sharesForVictim,
    victimSharesHuman: fmt(sharesForVictim, d),
    attackerGain: attackerRedeem - 1n,
    attackerGainHuman: fmt(attackerRedeem - 1n, d)
  }
}
function mulDivAll(a: bigint, b: bigint, c: bigint) {
  return (a * b) / c
}

// ---------------- Tab 2: on-chain reader ----------------
const reader = ref({
  chain: evmChains[0].slug,
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  customRpc: ''
})
const loading = ref(false)
const readError = ref('')
const vaultData = ref<null | {
  name: string
  symbol: string
  asset: string
  assetSymbol: string
  assetDecimals: number
  totalAssets: bigint
  totalSupply: bigint
  shareDecimals: number
  sharePrice: string
  convertToShares100: string
  convertToAssets100: string
  maxDeposit: string
  maxRedeem: string
}>(null)

async function readVault() {
  loading.value = true
  readError.value = ''
  vaultData.value = null
  try {
    const chain = evmChains.find((c) => c.slug === reader.value.chain)!
    const transport = reader.value.customRpc.trim() ? http(reader.value.customRpc.trim()) : http(chain.rpc)
    const client = createPublicClient({ transport })
    const addr = reader.value.address.trim() as `0x${string}`
    if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) throw new Error('Invalid vault address.')

    const [name, symbol, asset, totalAssets, totalSupply, shareDecimals] = await Promise.all([
      client.readContract({ address: addr, abi: erc4626Abi, functionName: 'name' }),
      client.readContract({ address: addr, abi: erc4626Abi, functionName: 'symbol' }),
      client.readContract({ address: addr, abi: erc4626Abi, functionName: 'asset' }),
      client.readContract({ address: addr, abi: erc4626Abi, functionName: 'totalAssets' }),
      client.readContract({ address: addr, abi: erc4626Abi, functionName: 'totalSupply' }),
      client.readContract({ address: addr, abi: erc20Abi, functionName: 'decimals' })
    ])

    let assetSymbol = '?'
    let assetDecimals = 18
    try {
      const [s, dc] = await Promise.all([
        client.readContract({ address: asset, abi: erc20Abi, functionName: 'symbol' }),
        client.readContract({ address: asset, abi: erc20Abi, functionName: 'decimals' })
      ])
      assetSymbol = s
      assetDecimals = dc
    } catch {
      /* non-standard asset token */
    }

    const probe = 100n * 10n ** BigInt(assetDecimals)
    const [c100s, c100a, maxDeposit, maxRedeem] = await Promise.all([
      client.readContract({ address: addr, abi: erc4626Abi, functionName: 'convertToShares', args: [probe] }),
      client.readContract({ address: addr, abi: erc4626Abi, functionName: 'convertToAssets', args: [probe] }),
      client.readContract({ address: addr, abi: erc4626Abi, functionName: 'maxDeposit', args: [addr] }).catch(() => 0n),
      client.readContract({ address: addr, abi: erc4626Abi, functionName: 'maxRedeem', args: [addr] }).catch(() => 0n)
    ])

    const sharePrice = totalSupply > 0n ? (totalAssets * 10n ** 18n) / totalSupply : 0n

    vaultData.value = {
      name,
      symbol,
      asset,
      assetSymbol,
      assetDecimals,
      totalAssets,
      totalSupply,
      shareDecimals,
      sharePrice: fmt(sharePrice, 18),
      convertToShares100: fmt(c100s, shareDecimals),
      convertToAssets100: fmt(c100a, assetDecimals),
      maxDeposit: maxDeposit ? fmt(maxDeposit, assetDecimals) : 'n/a',
      maxRedeem: maxRedeem ? fmt(maxRedeem, shareDecimals) : 'n/a'
    }
  } catch (e: any) {
    readError.value = e?.shortMessage || e?.message || 'Failed to read the vault. Is the address an ERC-4626 contract on this chain?'
  } finally {
    loading.value = false
  }
}

const stat = (label: string, value: string) => ({ label, value })
const simStats = computed(() => {
  const o = simOut.value
  if (!o) return []
  const d = sim.value.assetDecimals
  return [
    stat('Shares minted (deposit, round-down)', fmt(o.sharesMinted, d)),
    stat('Assets back on redeem (round-down)', fmt(o.assetsOnRedeem, d)),
    stat('Round-trip dust lost', o.roundTripLoss.toString() + ' wei'),
    stat('Assets needed (withdraw, round-up)', fmt(o.assetsToWithdraw, d)),
    stat('Share price (assets/share ×10¹⁸)', o.sharePrice.toString())
  ]
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Vault class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">ERC-4626 Vault Analyzer</h1>
        <p class="text-sm text-muted-foreground">
          Spec-exact vault math simulator and on-chain vault reader — all client-side
        </p>
      </div>
    </div>

    <Tabs default-value="simulator" class="space-y-6">
      <TabsList aria-label="Vault analyzer modes">
        <TabsTrigger value="simulator" class="flex items-center gap-2"><Calculator class="w-4 h-4" /> Simulator</TabsTrigger>
        <TabsTrigger value="reader" class="flex items-center gap-2"><Radar class="w-4 h-4" /> Read on-chain</TabsTrigger>
      </TabsList>

      <!-- SIMULATOR -->
      <TabsContent value="simulator" class="space-y-6">
        <Card>
          <CardHeader><CardTitle class="text-lg">Vault state &amp; deposit</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="ta">Total assets (raw units)</Label>
                <Input id="ta" v-model="sim.totalAssets" class="font-mono text-xs" aria-label="Total assets" />
              </div>
              <div class="grid gap-2">
                <Label for="ts">Total supply (shares, raw)</Label>
                <Input id="ts" v-model="sim.totalSupply" class="font-mono text-xs" aria-label="Total supply" />
              </div>
              <div class="grid gap-2">
                <Label for="amt">Deposit amount (human units)</Label>
                <Input id="amt" v-model="sim.amount" class="font-mono text-xs" aria-label="Deposit amount" />
              </div>
              <div class="grid gap-2">
                <Label for="dec">Asset decimals</Label>
                <Input id="dec" v-model.number="sim.assetDecimals" type="number" min="0" max="18" aria-label="Asset decimals" />
              </div>
              <div class="grid gap-2">
                <Label for="va">Virtual assets offset (OZ: 1)</Label>
                <Input id="va" v-model="sim.virtualAssets" class="font-mono text-xs" aria-label="Virtual assets" />
              </div>
              <div class="grid gap-2">
                <Label for="vs">Virtual shares offset (OZ: 1)</Label>
                <Input id="vs" v-model="sim.virtualShares" class="font-mono text-xs" aria-label="Virtual shares" />
              </div>
            </div>
            <p class="text-xs text-muted-foreground">
              Math follows EIP-4626 exactly: mint/deposit round shares down, withdraw rounds assets up, redeem rounds
              assets down — computed in BigInt with the virtual-share offsets OpenZeppelin uses.
            </p>
          </CardContent>
        </Card>

        <div v-if="simStats.length" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card v-for="s in simStats" :key="s.label">
            <CardContent class="pt-5 pb-4">
              <p class="text-xs text-muted-foreground uppercase tracking-wide">{{ s.label }}</p>
              <p class="text-sm font-mono font-bold mt-1 break-all">{{ s.value }}</p>
            </CardContent>
          </Card>
        </div>

        <Card v-if="simOut">
          <CardHeader><CardTitle class="text-lg">Growth &amp; fee drag</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="grid gap-2">
                <Label for="apr">Strategy APR (%)</Label>
                <Input id="apr" v-model="sim.growthApr" class="font-mono text-xs" aria-label="Strategy APR" />
              </div>
              <div class="grid gap-2">
                <Label for="days">Horizon (days)</Label>
                <Input id="days" v-model="sim.days" type="number" min="0" aria-label="Horizon days" />
              </div>
              <div class="grid gap-2">
                <Label for="fee">Management fee (bps/yr)</Label>
                <Input id="fee" v-model="sim.mgmtFeeBps" class="font-mono text-xs" aria-label="Management fee bps" />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div class="p-3 border border-border rounded-lg">
                <p class="text-xs text-muted-foreground uppercase">Gross after horizon</p>
                <p class="font-mono font-bold mt-1">{{ simOut.grossAssetsAfter.toFixed(4) }}</p>
              </div>
              <div class="p-3 border border-border rounded-lg">
                <p class="text-xs text-muted-foreground uppercase">Fee drag</p>
                <p class="font-mono font-bold mt-1">{{ simOut.feeDrag.toFixed(4) }}</p>
              </div>
              <div class="p-3 border border-border rounded-lg">
                <p class="text-xs text-muted-foreground uppercase">Net</p>
                <p class="font-mono font-bold mt-1">{{ simOut.netAssetsAfter.toFixed(4) }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card v-if="simOut?.attack" class="border-amber-500/40">
          <CardHeader><CardTitle class="text-lg">Inflation attack illustration</CardTitle></CardHeader>
          <CardContent class="space-y-2 text-sm">
            <p class="text-muted-foreground">
              First-depositor scenario: attacker mints 1 share, donates 10 tokens directly to the vault to inflate the
              share price, then you deposit 1,000 tokens.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="p-3 border border-border rounded-lg">
                <p class="text-xs text-muted-foreground uppercase">Your shares received</p>
                <p class="font-mono font-bold mt-1 text-red-600">{{ simOut.attack.victimSharesHuman }}</p>
              </div>
              <div class="p-3 border border-border rounded-lg">
                <p class="text-xs text-muted-foreground uppercase">Attacker's gain on your 1,000</p>
                <p class="font-mono font-bold mt-1 text-red-600">{{ simOut.attack.attackerGainHuman }}</p>
              </div>
            </div>
            <p class="text-xs text-muted-foreground">
              Mitigations: virtual share offsets (the simulator inputs above), seeding the vault before openings, and
              dead shares. The offsets round dust away from the attacker's arithmetic.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- READER -->
      <TabsContent value="reader" class="space-y-6">
        <Card>
          <CardHeader><CardTitle class="text-lg">Read a live ERC-4626 vault</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="chain">Chain</Label>
                <select id="chain" v-model="reader.chain" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option v-for="c in evmChains" :key="c.slug" :value="c.slug">{{ c.name }}</option>
                </select>
              </div>
              <div class="grid gap-2">
                <Label for="rpc">Custom RPC (optional)</Label>
                <Input id="rpc" v-model="reader.customRpc" class="font-mono text-xs" placeholder="https://…" aria-label="Custom RPC URL" />
              </div>
            </div>
            <div class="grid gap-2">
              <Label for="vaddr">Vault address</Label>
              <Input id="vaddr" v-model="reader.address" class="font-mono text-xs" aria-label="Vault address" />
            </div>
            <Button class="w-full" :disabled="loading" @click="readVault">
              <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />
              {{ loading ? 'Reading…' : 'Analyze vault' }}
            </Button>
            <p v-if="readError" class="text-sm text-red-500 flex items-start gap-1">
              <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" /> {{ readError }}
            </p>
            <p class="text-xs text-muted-foreground">
              Read-only <span class="font-mono">eth_call</span>s to the standard ERC-4626 interface — nothing signed, nothing can move funds.
            </p>
          </CardContent>
        </Card>

        <template v-if="vaultData">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Vault</p><p class="text-sm font-bold mt-1 truncate">{{ vaultData.name }}</p></CardContent></Card>
            <Card><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Asset</p><p class="text-sm font-bold mt-1">{{ vaultData.assetSymbol }}</p></CardContent></Card>
            <Card><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Total assets</p><p class="text-sm font-mono font-bold mt-1 truncate">{{ formatUnits(vaultData.totalAssets, vaultData.assetDecimals).slice(0, 14) }}</p></CardContent></Card>
            <Card><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Total supply</p><p class="text-sm font-mono font-bold mt-1 truncate">{{ formatUnits(vaultData.totalSupply, vaultData.shareDecimals).slice(0, 14) }}</p></CardContent></Card>
            <Card class="col-span-2"><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Share price (assets per share ×10¹⁸)</p><p class="text-sm font-mono font-bold mt-1 break-all">{{ vaultData.sharePrice }}</p></CardContent></Card>
            <Card><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">convertToShares(100)</p><p class="text-sm font-mono font-bold mt-1 truncate">{{ vaultData.convertToShares100 }}</p></CardContent></Card>
            <Card><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">convertToAssets(100)</p><p class="text-sm font-mono font-bold mt-1 truncate">{{ vaultData.convertToAssets100 }}</p></CardContent></Card>
          </div>
          <Card>
            <CardContent class="flex items-center justify-between gap-3 pt-5">
              <p class="font-mono text-xs text-muted-foreground break-all">{{ vaultData.asset }}</p>
              <CopyButton :text="vaultData.asset" variant="ghost" aria-label="Copy asset address" />
            </CardContent>
          </Card>
        </template>
      </TabsContent>
    </Tabs>
  </div>
</template>
