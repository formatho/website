<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import {
  Wallet, AlertTriangle, CheckCircle2, ExternalLink, ArrowRight,
  Loader2, X, RefreshCw, Zap, TrendingUp, Shield, Info, Search
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'

// ============ LI.FI API base (via nginx proxy) ============
const LIFI_API = '/api/lifi'

// ============ Wallet ============
interface Eip1193Provider {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>
  on?: (event: string, handler: (...args: unknown[]) => void) => void
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
  isMetaMask?: boolean
  isRabby?: boolean
}

const provider = ref<Eip1193Provider | null>(null)
const account = ref('')
const chainId = ref('')
const balance = ref('')
const isConnecting = ref(false)
const walletError = ref('')

const injectedProvider = computed(() => {
  if (typeof window === 'undefined') return null
  return (window as unknown as { ethereum?: Eip1193Provider }).ethereum ?? null
})

const isWalletConnected = computed(() => !!account.value)

// EVM chains supported by LI.FI (major ones for RWA)
const EVM_CHAINS: Record<number, { name: string; symbol: string; key: string; color: string }> = {
  1: { name: 'Ethereum', symbol: 'ETH', key: 'eth', color: '#627EEA' },
  10: { name: 'Optimism', symbol: 'ETH', key: 'opt', color: '#FF0420' },
  56: { name: 'BNB Chain', symbol: 'BNB', key: 'bsc', color: '#F0B90B' },
  100: { name: 'Gnosis', symbol: 'xDAI', key: 'gni', color: '#48A9A6' },
  137: { name: 'Polygon', symbol: 'MATIC', key: 'pol', color: '#8247E5' },
  324: { name: 'zkSync', symbol: 'ETH', key: 'zks', color: '#8C8DFC' },
  1101: { name: 'Polygon zkEVM', symbol: 'ETH', key: 'zke', color: '#8247E5' },
  8453: { name: 'Base', symbol: 'ETH', key: 'bas', color: '#0052FF' },
  42161: { name: 'Arbitrum', symbol: 'ETH', key: 'arb', color: '#28A0F0' },
  42220: { name: 'Celo', symbol: 'CELO', key: 'cel', color: '#FBCC5C' },
  43114: { name: 'Avalanche', symbol: 'AVAX', key: 'ava', color: '#E84142' },
  59144: { name: 'Linea', symbol: 'ETH', key: 'lin', color: '#61DFFF' },
  81457: { name: 'Blast', symbol: 'ETH', key: 'blr', color: '#FCFC03' },
  34443: { name: 'Mode', symbol: 'ETH', key: 'mod', color: '#D7D7D7' },
  534352: { name: 'Scroll', symbol: 'ETH', key: 'scr', color: '#E0E0FF' },
}

async function connectWallet() {
  walletError.value = ''
  const eth = injectedProvider.value
  if (!eth) {
    walletError.value = 'No wallet found. Install MetaMask or Rabby.'
    return
  }
  isConnecting.value = true
  try {
    provider.value = eth
    const accounts = await eth.request({ method: 'eth_requestAccounts' }) as string[]
    if (accounts?.length) account.value = accounts[0]
    const cid = await eth.request({ method: 'eth_chainId' }) as string
    chainId.value = cid
    await fetchBalance()
    if (eth.on) {
      eth.on('accountsChanged', (...args: unknown[]) => {
        const addrs = args[0] as string[]
        if (!addrs?.length) disconnectWallet()
        else { account.value = addrs[0]; fetchBalance() }
      })
      eth.on('chainChanged', (...args: unknown[]) => {
        chainId.value = args[0] as string
        fetchBalance()
      })
    }
  } catch (err: unknown) {
    walletError.value = err instanceof Error ? err.message : 'Failed to connect'
  } finally {
    isConnecting.value = false
  }
}

async function fetchBalance() {
  if (!provider.value || !account.value || !chainId.value) return
  try {
    const result = await provider.value.request({
      method: 'eth_getBalance', params: [account.value, 'latest'],
    }) as string
    const wei = BigInt(result)
    const eth = Number(wei) / 1e18
    const chain = EVM_CHAINS[parseInt(chainId.value, 16)]
    balance.value = eth >= 0.01 ? `${eth.toFixed(4)} ${chain?.symbol ?? 'ETH'}`
      : eth > 0 ? `${eth.toFixed(6)} ${chain?.symbol ?? 'ETH'}`
      : `0 ${chain?.symbol ?? 'ETH'}`
  } catch { balance.value = '' }
}

function disconnectWallet() {
  account.value = ''
  chainId.value = ''
  balance.value = ''
  provider.value = null
}

const currentChainNum = computed(() => parseInt(chainId.value, 16) || 0)
const currentChain = computed(() => EVM_CHAINS[currentChainNum.value] ?? null)

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

// ============ Tokens ============
interface TokenInfo {
  address: string
  symbol: string
  decimals: number
  name: string
  logoURI?: string
  chainId: number
}

// RWA-related, stablecoin, and native token filters
const RWA_TOKEN_SYMBOLS = [
  // Stablecoins
  'USDC', 'USDT', 'DAI', 'FRAX', 'LUSD', 'USDe', 'sUSDe', 'PYUSD', 'USDP', 'TUSD', 'GUSD', 'USTC',
  // RWA tokens
  'OUSG', 'USDY', 'RWA', 'BUIDL', 'TOKEN', 'STBT', 'DRV', 'USDR',
  // Wrapped / liquid staking (commonly paired)
  'WETH', 'cbETH', 'wstETH', 'rETH', 'WBTC',
]

const fromChainId = ref<number>(1)
const toChainId = ref<number>(42161)
const fromTokens = ref<TokenInfo[]>([])
const toTokens = ref<TokenInfo[]>([])
const fromToken = ref<TokenInfo | null>(null)
const toToken = ref<TokenInfo | null>(null)
const fromAmount = ref('100')
const isLoadingTokens = ref(false)
const tokenSearchFrom = ref('')
const tokenSearchTo = ref('')

const nativeToken = (chainId: number): TokenInfo => ({
  address: '0x0000000000000000000000000000000000000000',
  symbol: EVM_CHAINS[chainId]?.symbol ?? 'ETH',
  decimals: 18,
  name: `${EVM_CHAINS[chainId]?.name ?? 'Ethereum'} Native`,
  chainId,
})

async function loadTokens() {
  isLoadingTokens.value = true
  try {
    // Fetch tokens for both chains in parallel
    const [fromRes, toRes] = await Promise.all([
      fetch(`${LIFI_API}/tokens?chains=${fromChainId.value}`),
      fetch(`${LIFI_API}/tokens?chains=${toChainId.value}`),
    ])
    const fromData = await fromRes.json()
    const toData = await toRes.json()

    const filterTokens = (data: Record<string, TokenInfo[]>, chainId: number): TokenInfo[] => {
      const tokens = data[chainId] || data[String(chainId)] || []
      // Filter to RWA + stable + native tokens
      const filtered = tokens.filter((t: TokenInfo) =>
        RWA_TOKEN_SYMBOLS.includes(t.symbol.toUpperCase())
      )
      // Dedupe by symbol
      const seen = new Set<string>()
      const deduped = filtered.filter((t: TokenInfo) => {
        if (seen.has(t.symbol.toUpperCase())) return false
        seen.add(t.symbol.toUpperCase())
        return true
      })
      // Prepend native token
      return [nativeToken(chainId), ...deduped]
    }

    fromTokens.value = filterTokens(fromData, fromChainId.value)
    toTokens.value = filterTokens(toData, toChainId.value)

    // Set defaults
    const defaultFrom = fromTokens.value.find(t => t.symbol === 'USDC') || fromTokens.value[1] || fromTokens.value[0]
    const defaultTo = toTokens.value.find(t => t.symbol === 'USDC') || toTokens.value[1] || toTokens.value[0]
    fromToken.value = defaultFrom
    toToken.value = defaultTo
  } catch (err) {
    // Fallback to minimal token list
    fromTokens.value = [nativeToken(fromChainId.value)]
    toTokens.value = [nativeToken(toChainId.value)]
    fromToken.value = fromTokens.value[0]
    toToken.value = toTokens.value[0]
  } finally {
    isLoadingTokens.value = false
  }
}

const filteredFromTokens = computed(() => {
  if (!tokenSearchFrom.value) return fromTokens.value
  const q = tokenSearchFrom.value.toLowerCase()
  return fromTokens.value.filter(t =>
    t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
  )
})

const filteredToTokens = computed(() => {
  if (!tokenSearchTo.value) return toTokens.value
  const q = tokenSearchTo.value.toLowerCase()
  return toTokens.value.filter(t =>
    t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
  )
})

// ============ Quote ============
interface LiFiQuote {
  estimate: {
    toAmount: string
    fromAmount: string
    gasCosts: string
    executionDuration: number
    tool: string
  }
  action: {
    fromToken: { address: string; symbol: string; decimals: number; chainId: number }
    toToken: { address: string; symbol: string; decimals: number; chainId: number }
    fromChainId: number
    toChainId: number
    fromAmount: string
    fromAddress: string
  }
  transactionRequest?: {
    to: string
    data: string
    value: string
    gasLimit: string
    gasPrice: string
  }
  tool: string
  toolDetails: { key: string; name: string; logoURI: string }[]
}

const quote = ref<LiFiQuote | null>(null)
const isFetchingQuote = ref(false)
const quoteError = ref('')

async function fetchQuote() {
  if (!fromToken.value || !toToken.value || !fromAmount.value || !account.value) return
  quoteError.value = ''
  quote.value = null
  isFetchingQuote.value = true

  try {
    // Convert amount to smallest unit
    const amount = BigInt(Math.floor(parseFloat(fromAmount.value) * Math.pow(10, fromToken.value.decimals)))
    const params = new URLSearchParams({
      fromChain: String(fromChainId.value),
      toChain: String(toChainId.value),
      fromToken: fromToken.value.address,
      toToken: toToken.value.address,
      fromAmount: amount.toString(),
      fromAddress: account.value,
    })

    const res = await fetch(`${LIFI_API}/quote?${params}`)
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || data.error || 'Failed to get quote')
    }

    quote.value = data
  } catch (err: unknown) {
    quoteError.value = err instanceof Error ? err.message : 'Failed to fetch quote'
  } finally {
    isFetchingQuote.value = false
  }
}

// Debounced quote fetching
let quoteTimer: ReturnType<typeof setTimeout> | null = null
function debouncedQuote() {
  if (quoteTimer) clearTimeout(quoteTimer)
  quoteTimer = setTimeout(() => fetchQuote(), 500)
}

watch([fromToken, toToken, fromAmount, fromChainId, toChainId, account], () => {
  if (account.value && fromAmount.value) debouncedQuote()
})

watch([fromChainId, toChainId], () => {
  loadTokens()
})

// ============ Execute Swap ============
const isExecuting = ref(false)
const execStatus = ref('')
const txHash = ref('')
const transferStatus = ref('')

async function executeSwap() {
  if (!quote.value?.transactionRequest || !provider.value || !account.value) return
  isExecuting.value = true
  execStatus.value = 'Sending transaction...'
  transferStatus.value = ''
  txHash.value = ''

  try {
    // Check if we need ERC-20 approval first
    if (fromToken.value && fromToken.value.address !== '0x0000000000000000000000000000000000000000') {
      const approvalAddr = (quote.value as LiFiQuote & { estimate: { approvalAddress?: string } }).estimate.approvalAddress
        || (quote.value.transactionRequest as { to: string }).to

      const currentAllowance = await provider.value.request({
        method: 'eth_call',
        params: [{
          to: fromToken.value.address,
          data: `0xdd62ed3e000000000000000000000000${account.value.slice(2)}000000000000000000000000${approvalAddr.slice(2)}`,
        }, 'latest'],
      }) as string

      const allowance = BigInt(currentAllowance)
      const needed = BigInt(Math.floor(parseFloat(fromAmount.value) * Math.pow(10, fromToken.value.decimals)))

      if (allowance < needed) {
        execStatus.value = 'Approving token...'
        const approveData = `0x095ea7b3000000000000000000000000${approvalAddr.slice(2)}${needed.toString(16).padStart(64, '0')}`
        const approveTx = await provider.value.request({
          method: 'eth_sendTransaction',
          params: [{ from: account.value, to: fromToken.value.address, data: approveData }],
        }) as string
        // Wait for approval confirmation
        await waitForTx(approveTx)
      }
    }

    // Send the swap transaction
    execStatus.value = 'Executing swap...'
    const tx = await provider.value.request({
      method: 'eth_sendTransaction',
      params: [{
        from: account.value,
        to: quote.value.transactionRequest.to,
        data: quote.value.transactionRequest.data,
        value: quote.value.transactionRequest.value || '0x0',
        gasLimit: quote.value.transactionRequest.gasLimit,
      }],
    }) as string

    txHash.value = tx
    execStatus.value = 'Transaction sent. Waiting for confirmation...'

    // If cross-chain, poll status
    if (fromChainId.value !== toChainId.value) {
      await pollTransferStatus(tx)
    } else {
      await waitForTx(tx)
      execStatus.value = 'Swap complete!'
      transferStatus.value = 'DONE'
    }
  } catch (err: unknown) {
    execStatus.value = ''
    quoteError.value = err instanceof Error ? err.message : 'Transaction failed'
  } finally {
    isExecuting.value = false
  }
}

async function waitForTx(hash: string) {
  if (!provider.value) return
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 3000))
    const receipt = await provider.value.request({
      method: 'eth_getTransactionReceipt', params: [hash],
    }) as { status: string } | null
    if (receipt) {
      if (receipt.status === '0x0') throw new Error('Transaction reverted')
      return
    }
  }
}

async function pollTransferStatus(hash: string) {
  if (!quote.value) return
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 10000))
    try {
      const params = new URLSearchParams({
        txHash: hash,
        fromChain: String(fromChainId.value),
        toChain: String(toChainId.value),
        bridge: quote.value.tool,
      })
      const res = await fetch(`${LIFI_API}/status?${params}`)
      const data = await res.json()
      if (data.status === 'DONE') {
        transferStatus.value = 'DONE'
        execStatus.value = `Transfer complete! ${data.substatus === 'COMPLETED' ? '✅' : data.substatus}`
        return
      }
      if (data.status === 'FAILED') {
        transferStatus.value = 'FAILED'
        execStatus.value = `Transfer failed: ${data.substatus || 'unknown error'}`
        return
      }
      execStatus.value = `Transfer in progress... (${data.substatus || data.status})`
    } catch { /* retry */ }
  }
  execStatus.value = 'Transfer still pending — check explorer'
}

// ============ Quote display helpers ============
const toAmountFormatted = computed(() => {
  if (!quote.value) return ''
  const amount = BigInt(quote.value.estimate.toAmount)
  const decimals = quote.value.action.toToken.decimals
  return (Number(amount) / Math.pow(10, decimals)).toFixed(6)
})

const exchangeRate = computed(() => {
  if (!quote.value || !fromAmount.value) return ''
  const from = parseFloat(fromAmount.value)
  const to = parseFloat(toAmountFormatted.value)
  if (!from || !to) return ''
  return (to / from).toFixed(6)
})

const isCrossChain = computed(() => fromChainId.value !== toChainId.value)

const gasCostEth = computed(() => {
  if (!quote.value?.estimate?.gasCosts) return ''
  return (Number(quote.value.estimate.gasCosts) / 1e18).toFixed(6)
})

// ============ Lifecycle ============
onMounted(() => {
  // Auto-detect wallet
  if (injectedProvider.value) {
    injectedProvider.value.request({ method: 'eth_accounts' }).then((accounts: unknown) => {
      const addrs = accounts as string[]
      if (addrs?.length) {
        account.value = addrs[0]
        provider.value = injectedProvider.value
        injectedProvider.value!.request({ method: 'eth_chainId' }).then((cid: unknown) => {
          chainId.value = cid as string
          fetchBalance()
          loadTokens()
        })
      } else {
        loadTokens()
      }
    }).catch(() => loadTokens())
  } else {
    loadTokens()
  }
})

onUnmounted(() => {
  disconnectWallet()
})
</script>

<template>
  <div class="container mx-auto p-6 max-w-5xl">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-2 flex items-center gap-3">
        <Zap class="w-9 h-9 text-primary" />
        RWA Asset Swap
      </h1>
      <p class="text-lg text-muted-foreground">
        Swap RWA tokens, stablecoins, and native assets across EVM chains. Powered by LI.FI cross-chain routing.
      </p>
    </div>

    <!-- Wallet Bar -->
    <Card class="mb-6">
      <CardContent class="p-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center"
              :class="isWalletConnected ? 'bg-green-100' : 'bg-muted'">
              <Wallet v-if="!isWalletConnected" class="w-6 h-6 text-muted-foreground" />
              <CheckCircle2 v-else class="w-6 h-6 text-green-600" />
            </div>
            <div v-if="isWalletConnected" class="space-y-1">
              <div class="flex items-center gap-2">
                <p class="font-mono text-sm font-semibold">{{ shortAddr(account) }}</p>
                <span v-if="balance" class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">{{ balance }}</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span v-if="currentChain" class="inline-flex items-center gap-1">
                  <span class="inline-block w-2 h-2 rounded-full" :style="{ backgroundColor: currentChain.color }" />
                  <span class="font-medium">{{ currentChain.name }}</span>
                </span>
                <span>·</span>
                <span class="font-mono">Chain ID: {{ currentChainNum }}</span>
              </div>
            </div>
            <div v-else>
              <p class="font-semibold">No wallet connected</p>
              <p class="text-xs text-muted-foreground">Connect MetaMask or Rabby to swap</p>
            </div>
          </div>
          <Button v-if="!isWalletConnected" @click="connectWallet" :disabled="isConnecting">
            <Loader2 v-if="isConnecting" class="w-4 h-4 mr-2 animate-spin" />
            <Wallet v-else class="w-4 h-4 mr-2" />
            {{ isConnecting ? 'Connecting...' : 'Connect Wallet' }}
          </Button>
          <Button v-else variant="outline" @click="disconnectWallet">
            <X class="w-4 h-4 mr-2" /> Disconnect
          </Button>
        </div>
        <div v-if="walletError" class="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {{ walletError }}
        </div>
      </CardContent>
    </Card>

    <!-- Swap Interface -->
    <Card class="mb-6">
      <CardContent class="p-6 space-y-6">
        <!-- From Section -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <Label>From</Label>
            <Select v-model="fromChainId">
              <SelectTrigger class="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="(chain, id) in EVM_CHAINS" :key="id" :value="Number(id)">
                  <span class="inline-block w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: chain.color }" />
                  {{ chain.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex gap-2">
            <Input v-model="fromAmount" type="number" placeholder="0.0" class="text-lg font-semibold" />
            <Select v-model="fromToken">
              <SelectTrigger class="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <div class="p-2">
                  <Input v-model="tokenSearchFrom" placeholder="Search..." class="h-8 text-xs" />
                </div>
                <SelectItem v-for="t in filteredFromTokens" :key="t.address" :value="t">
                  <div class="flex items-center gap-2">
                    <span class="font-medium">{{ t.symbol }}</span>
                    <span class="text-xs text-muted-foreground truncate">{{ t.name }}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p v-if="isLoadingTokens" class="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Loader2 class="w-3 h-3 animate-spin" /> Loading tokens...
          </p>
        </div>

        <!-- Swap Direction Button -->
        <div class="flex justify-center">
          <Button variant="outline" size="sm" @click="() => {
            const tmpChain = fromChainId; fromChainId = toChainId; toChainId = tmpChain
            const tmpToken = fromToken; fromToken = toToken; toToken = tmpToken
          }">
            <ArrowRight class="w-4 h-4 rotate-90" />
          </Button>
        </div>

        <!-- To Section -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <Label>To</Label>
            <Select v-model="toChainId">
              <SelectTrigger class="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="(chain, id) in EVM_CHAINS" :key="id" :value="Number(id)">
                  <span class="inline-block w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: chain.color }" />
                  {{ chain.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex gap-2">
            <Input :model-value="toAmountFormatted || '0.0'" readonly placeholder="0.0"
              class="text-lg font-semibold bg-muted" />
            <Select v-model="toToken">
              <SelectTrigger class="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <div class="p-2">
                  <Input v-model="tokenSearchTo" placeholder="Search..." class="h-8 text-xs" />
                </div>
                <SelectItem v-for="t in filteredToTokens" :key="t.address" :value="t">
                  <div class="flex items-center gap-2">
                    <span class="font-medium">{{ t.symbol }}</span>
                    <span class="text-xs text-muted-foreground truncate">{{ t.name }}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Quote Details -->
        <div v-if="quote" class="space-y-2 p-4 bg-muted rounded-lg">
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Rate</span>
            <span class="font-mono">1 {{ fromToken?.symbol }} = {{ exchangeRate }} {{ toToken?.symbol }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">{{ isCrossChain ? 'Cross-chain' : 'Same-chain' }}</span>
            <span class="font-medium">{{ quote.tool }}</span>
          </div>
          <div v-if="gasCostEth" class="flex justify-between text-sm">
            <span class="text-muted-foreground">Est. Gas Cost</span>
            <span class="font-mono">{{ gasCostEth }} ETH</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Est. Time</span>
            <span>{{ Math.ceil(quote.estimate.executionDuration / 60) }} min</span>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="isFetchingQuote" class="flex items-center justify-center py-4">
          <Loader2 class="w-6 h-6 animate-spin text-primary mr-2" />
          <span class="text-sm text-muted-foreground">Finding best route...</span>
        </div>

        <!-- Error -->
        <div v-if="quoteError" class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-2">
          <AlertTriangle class="w-5 h-5 shrink-0" /> {{ quoteError }}
        </div>

        <!-- Execute -->
        <Button @click="executeSwap" :disabled="!quote || isExecuting || !isWalletConnected"
          size="lg" class="w-full">
          <Loader2 v-if="isExecuting" class="w-5 h-5 mr-2 animate-spin" />
          <Zap v-else class="w-5 h-5 mr-2" />
          {{ isExecuting ? execStatus || 'Processing...' : 'Swap Now' }}
        </Button>

        <!-- Execution Status -->
        <div v-if="txHash" class="p-4 border rounded-lg space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold">Transaction</span>
            <a :href="`https://etherscan.io/tx/${txHash}`" target="_blank"
              class="text-xs text-blue-600 hover:underline inline-flex items-center gap-1">
              {{ shortAddr(txHash) }} <ExternalLink class="w-3 h-3" />
            </a>
          </div>
          <div v-if="execStatus" class="text-sm" :class="transferStatus === 'DONE' ? 'text-green-600' : transferStatus === 'FAILED' ? 'text-red-600' : 'text-muted-foreground'">
            {{ execStatus }}
          </div>
          <div v-if="isCrossChain && transferStatus !== 'DONE' && transferStatus !== 'FAILED'"
            class="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 class="w-3 h-3 animate-spin" /> Cross-chain transfer in progress...
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- POC Warning -->
    <div class="mb-6 p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
      <div class="flex items-start gap-3">
        <AlertTriangle class="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 class="font-semibold text-amber-900">⚠️ POC Only</h3>
          <p class="text-sm text-amber-800 mt-1">
            This swap interface uses LI.FI's routing API for POC purposes. Always verify routes and token addresses
            before executing transactions. Cross-chain transfers may take 5-30 minutes depending on bridge congestion.
          </p>
        </div>
      </div>
    </div>

    <!-- Supported Tokens Info -->
    <Card class="mb-6">
      <CardHeader><CardTitle>Supported Tokens</CardTitle></CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground mb-4">
          Only RWA-related, stablecoin, and native tokens are shown. Filtered from LI.FI's full token list per chain.
        </p>
        <div class="flex flex-wrap gap-2">
          <span v-for="sym in RWA_TOKEN_SYMBOLS" :key="sym"
            class="px-3 py-1 text-xs font-mono rounded-full bg-muted border">
            {{ sym }}
          </span>
        </div>
      </CardContent>
    </Card>

    <!-- SEO Content -->
    <div class="mt-8 prose prose-sm max-w-none text-muted-foreground">
      <h2 class="text-2xl font-bold text-foreground mb-4">Cross-Chain RWA Token Swap</h2>
      <p>
        Swap real-world asset (RWA) tokens, stablecoins, and native crypto across 15+ EVM blockchains.
        This tool uses LI.FI's routing engine to find the best cross-chain swap routes — aggregating
        27+ bridges and 30+ DEXs to get you the best price and fastest execution.
      </p>
      <p>
        Supported assets include stablecoins (USDC, USDT, DAI, FRAX, LUSD, USDe, PYUSD), RWA tokens
        (OUSG, USDY, STBT, BUIDL), wrapped staking tokens (wstETH, cbETH, rETH), and native gas tokens
        (ETH, MATIC, AVAX, BNB). Transfer between Ethereum, Arbitrum, Optimism, Base, Polygon,
        Avalanche, zkSync, Scroll, Linea, Blast, Mode, BNB Chain, Gnosis, Celo, and Polygon zkEVM.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-6 mb-4">How Cross-Chain RWA Swaps Work</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold text-foreground mb-1">1. Select Assets</h4>
          <p class="text-xs">Choose source and destination tokens from the filtered RWA/stable list. Set the amount to swap.</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold text-foreground mb-1">2. Get Best Route</h4>
          <p class="text-xs">LI.FI aggregates bridges and DEXs to find the optimal route — best price, lowest gas, fastest execution.</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold text-foreground mb-1">3. Approve & Execute</h4>
          <p class="text-xs">Grant token allowance if needed, then sign the swap transaction via MetaMask or Rabby wallet.</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold text-foreground mb-1">4. Track Transfer</h4>
          <p class="text-xs">For cross-chain swaps, monitor transfer status in real-time until funds arrive on the destination chain.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-foreground mt-6 mb-4">Why Use LI.FI for RWA Token Swaps?</h2>
      <p>
        RWA tokens are deployed across multiple chains — OUSG on Ethereum, USDY on Arbitrum, tokenized
        treasuries on Base. Moving between them requires reliable cross-chain infrastructure. LI.FI's
        aggregation layer ensures you get the best route automatically, with built-in fallbacks if a
        bridge or DEX fails mid-transaction. Smart routing considers price impact, gas costs, bridge
        liquidity, and execution speed across all available paths.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-6 mb-4">FAQ</h2>
      <div class="space-y-3">
        <div>
          <h3 class="font-semibold text-foreground text-base">What tokens can I swap?</h3>
          <p>This tool shows RWA tokens, stablecoins (USDC, USDT, DAI), liquid staking tokens (wstETH, cbETH),
            and native gas tokens (ETH, MATIC, AVAX). Other tokens available on LI.FI can be swapped
            via their full API.</p>
        </div>
        <div>
          <h3 class="font-semibold text-foreground text-base">How long do cross-chain swaps take?</h3>
          <p>Same-chain swaps are instant (~10 seconds). Cross-chain swaps typically take 2-15 minutes
            depending on the bridge used and destination chain congestion.</p>
        </div>
        <div>
          <h3 class="font-semibold text-foreground text-base">What are the fees?</h3>
          <p>You pay gas fees on the source chain plus any bridge fees (typically 0.05%-0.5% depending
            on the route). LI.FI does not charge additional fees beyond what bridges and DEXs charge.</p>
        </div>
        <div>
          <h3 class="font-semibold text-foreground text-base">Which wallets are supported?</h3>
          <p>MetaMask and Rabby wallet are auto-detected. Any EIP-1193 compatible wallet will work.</p>
        </div>
      </div>
    </div>
  </div>
</template>
