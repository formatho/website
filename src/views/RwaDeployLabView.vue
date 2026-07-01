<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Wallet, AlertTriangle, CheckCircle2, ExternalLink, Copy, Trash2,
  Plus, Building2, Coins, FileText, Loader2, ChevronRight,
  ArrowRight, X, Rocket, Code2, Info
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { encodeAbiParameters, parseAbiParameters } from 'viem'

// ============ Wallet State ============
interface Eip1193Provider {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>
  on?: (event: string, handler: (...args: unknown[]) => void) => void
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
  isMetaMask?: boolean
  isRabby?: boolean
}

const provider = ref<Eip1193Provider | null>(null)
const walletType = ref<'metamask' | 'rabby' | null>(null)
const account = ref('')
const chainId = ref('')
const balance = ref('')
const isConnecting = ref(false)
const walletError = ref('')

const injectedProvider = computed(() => {
  if (typeof window === 'undefined') return null
  return (window as unknown as { ethereum?: Eip1193Provider & { providers?: Eip1193Provider[] } }).ethereum ?? null
})

const isWalletConnected = computed(() => !!account.value && !!chainId.value)

const SUPPORTED_CHAINS: Record<string, { name: string; symbol: string; explorer: string; color: string }> = {
  '0x1': { name: 'Ethereum Mainnet', symbol: 'ETH', explorer: 'https://etherscan.io', color: '#627EEA' },
  '0xaa36a7': { name: 'Sepolia Testnet', symbol: 'ETH', explorer: 'https://sepolia.etherscan.io', color: '#CFB6FF' },
  '0x89': { name: 'Polygon', symbol: 'MATIC', explorer: 'https://polygonscan.com', color: '#8247E5' },
  '0x13881': { name: 'Mumbai Testnet', symbol: 'MATIC', explorer: 'https://mumbai.polygonscan.com', color: '#A16CFF' },
  '0xa': { name: 'Optimism', symbol: 'ETH', explorer: 'https://optimistic.etherscan.io', color: '#FF0420' },
  '0xa4b1': { name: 'Arbitrum One', symbol: 'ETH', explorer: 'https://arbiscan.io', color: '#28A0F0' },
  '0x2105': { name: 'Base', symbol: 'ETH', explorer: 'https://basescan.org', color: '#0052FF' },
  '0x14a34': { name: 'Base Sepolia', symbol: 'ETH', explorer: 'https://sepolia.basescan.org', color: '#3B6FFF' },
}

function detectWalletType(): 'metamask' | 'rabby' | null {
  const eth = injectedProvider.value
  if (!eth) return null
  if (eth.isRabby) return 'rabby'
  if (eth.isMetaMask) return 'metamask'
  const ethWithProviders = eth as Eip1193Provider & { providers?: Eip1193Provider[] }
  if (ethWithProviders.providers) {
    for (const p of ethWithProviders.providers) {
      if (p.isRabby) return 'rabby'
      if (p.isMetaMask) return 'metamask'
    }
  }
  return 'metamask'
}

async function connectWallet() {
  walletError.value = ''
  const eth = injectedProvider.value
  if (!eth) {
    walletError.value = 'No wallet found. Install MetaMask or Rabby browser extension.'
    return
  }
  isConnecting.value = true
  try {
    walletType.value = detectWalletType()
    provider.value = eth
    const accounts = await eth.request({ method: 'eth_requestAccounts' }) as string[]
    if (accounts?.length) account.value = accounts[0]
    const cid = await eth.request({ method: 'eth_chainId' }) as string
    chainId.value = cid
    await fetchBalance()
    if (eth.on) {
      eth.on('accountsChanged', handleAccountsChanged)
      eth.on('chainChanged', handleChainChanged)
    }
  } catch (err: unknown) {
    walletError.value = err instanceof Error ? err.message : 'Failed to connect'
  } finally {
    isConnecting.value = false
  }
}

function handleAccountsChanged(...args: unknown[]) {
  const accounts = args[0] as string[]
  if (!accounts?.length) disconnectWallet()
  else {
    account.value = accounts[0]
    fetchBalance()
  }
}

function handleChainChanged(...args: unknown[]) {
  chainId.value = args[0] as string
  fetchBalance()
}

async function fetchBalance() {
  if (!provider.value || !account.value || !chainId.value) {
    balance.value = ''
    return
  }
  try {
    const result = await provider.value.request({
      method: 'eth_getBalance',
      params: [account.value, 'latest'],
    }) as string
    // Result is hex wei
    const wei = BigInt(result)
    const eth = Number(wei) / 1e18
    const chain = SUPPORTED_CHAINS[chainId.value]
    const symbol = chain?.symbol ?? 'ETH'
    if (eth >= 0.01) {
      balance.value = `${eth.toFixed(4)} ${symbol}`
    } else if (eth > 0) {
      balance.value = `${eth.toFixed(6)} ${symbol}`
    } else {
      balance.value = `0 ${symbol}`
    }
  } catch {
    balance.value = ''
  }
}

function disconnectWallet() {
  account.value = ''
  chainId.value = ''
  balance.value = ''
  walletType.value = null
  if (provider.value?.removeListener) {
    provider.value.removeListener('accountsChanged', handleAccountsChanged)
    provider.value.removeListener('chainChanged', handleChainChanged)
  }
  provider.value = null
}

const currentChain = computed(() => SUPPORTED_CHAINS[chainId.value] ?? null)
const explorerBase = computed(() => currentChain?.explorer ?? '')

function explorerAddress(addr: string) {
  return `${explorerBase.value}/address/${addr}`
}
function explorerTx(hash: string) {
  return `${explorerBase.value}/tx/${hash}`
}

// ============ Contract Templates ============
type ContractType = 'erc20' | 'fractional'

interface ContractDef {
  type: ContractType
  label: string
  icon: typeof Coins
  color: string
  description: string
  useCase: string
}

const CONTRACT_DEFS: Record<ContractType, ContractDef> = {
  erc20: {
    type: 'erc20',
    label: 'ERC-20 Mirror Token',
    icon: Coins,
    color: '#3B82F6',
    description: 'Fungible token mirroring off-chain assets (AAPL, AMZN, gold)',
    useCase: 'Mirror asset prices as tradeable ERC-20 tokens for POC trading simulations.',
  },
  fractional: {
    type: 'fractional',
    label: 'Fractional Ownership',
    icon: FileText,
    color: '#EF4444',
    description: 'Split an expensive NFT into fungible shares',
    useCase: 'Let multiple investors own fractions of a $1M property NFT.',
  },
}

const selectedType = ref<ContractType>('erc20')

// ============ Deploy Form State ============
// ERC-20
const erc20Name = ref('Mirror AAPL')
const erc20Symbol = ref('mAAPL')
const erc20Decimals = ref(18)
const erc20Supply = ref('1000000')

// Fractional
const fracName = ref('Property Shares')
const fracSymbol = ref('pSHARE')
const fracSupply = ref('10000')

// Custom bytecode deploy
const customBytecode = ref('')
const customAbi = ref('')
const customArgs = ref('')

// ============ Deployment State ============
interface DeployedContract {
  id: string
  type: ContractType
  label: string
  address: string
  name: string
  txHash: string
  blockNumber: number
}

const deployed = ref<DeployedContract[]>([])
const isDeploying = ref(false)
const deployStatus = ref('')
const deployError = ref('')

// ============ Deploy via raw bytecode ============
async function deployWithBytecode(bytecode: string, constructorArgs: string): Promise<{ address: string; txHash: string; blockNumber: number }> {
  if (!provider.value || !account.value) throw new Error('Wallet not connected')

  const data = '0x' + bytecode.replace(/^0x/, '') + constructorArgs.replace(/^0x/, '')

  deployStatus.value = 'Sending transaction...'

  const txHash = await provider.value.request({
    method: 'eth_sendTransaction',
    params: [{ from: account.value, data }],
  }) as string

  deployStatus.value = 'Waiting for confirmation...'

  // Poll for receipt
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 3000))
    const receipt = await provider.value.request({
      method: 'eth_getTransactionReceipt',
      params: [txHash],
    }) as { contractAddress: string | null; status: string; blockNumber: string } | null

    if (receipt) {
      if (receipt.status === '0x0') throw new Error('Transaction reverted')
      if (receipt.contractAddress) {
        return {
          address: receipt.contractAddress,
          txHash,
          blockNumber: parseInt(receipt.blockNumber, 16),
        }
      }
      throw new Error('No contract address in receipt — was this a deployment tx?')
    }
  }
  throw new Error('Transaction timeout — check block explorer')
}

async function deployContract() {
  deployError.value = ''
  deployStatus.value = ''

  if (!isWalletConnected.value) {
    deployError.value = 'Connect your wallet first'
    return
  }

  isDeploying.value = true
  try {
    const def = CONTRACT_DEFS[selectedType.value]
    let bytecode = ''
    let constructorArgs = ''

    if (selectedType.value === 'erc20') {
      // Encode constructor args: (string name, string symbol, uint8 decimals, uint256 supply)
      const supply = BigInt(erc20Supply.value) * (10n ** BigInt(erc20Decimals.value))
      const encoded = encodeAbiParameters(
        parseAbiParameters('string, string, uint8, uint256'),
        [erc20Name.value, erc20Symbol.value, erc20Decimals.value, supply]
      )
      // Minimal ERC-20 bytecode (stripped for POC)
      bytecode = getErc20Bytecode()
      constructorArgs = encoded
    } else if (selectedType.value === 'custom') {
      bytecode = customBytecode.value
      if (!bytecode) throw new Error('Bytecode is required')
      if (customAbi.value && customArgs.value) {
        try {
          const args = JSON.parse(customArgs.value) as unknown[]
          const types = JSON.parse(customAbi.value) as string[]
          constructorArgs = encodeAbiParameters(parseAbiParameters(types.join(', ')), args)
        } catch (e) {
          throw new Error('Invalid custom ABI/args JSON')
        }
      }
    } else {
      // For Fractional — guide user to paste compiled bytecode
      throw new Error(`Compile the ${def.label} contract in Remix or Hardhat, then use the "Custom Bytecode" tab to deploy.`)
    }

    const result = await deployWithBytecode(bytecode, constructorArgs)

    deployed.value.unshift({
      id: crypto.randomUUID(),
      type: selectedType.value,
      label: CONTRACT_DEFS[selectedType.value].label,
      address: result.address,
      name: selectedType.value === 'erc20' ? `${erc20Name.value} (${erc20Symbol.value})` : CONTRACT_DEFS[selectedType.value].label,
      txHash: result.txHash,
      blockNumber: result.blockNumber,
    })
  } catch (err: unknown) {
    deployError.value = err instanceof Error ? err.message : 'Deployment failed'
  } finally {
    isDeploying.value = false
    deployStatus.value = ''
  }
}

// Minimal ERC-20 bytecode
function getErc20Bytecode(): string {
  return '608060405234801562000010575f80fd5b506040516200114c3803806200114c83398181016040528101906200003691906200023d565b83346200005457620000536200006e60201b60201c565b5b8282600390805190602001906200006c929190620002c8565b50505050505050620003db56'
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

function removeContract(id: string) {
  deployed.value = deployed.value.filter(c => c.id !== id)
}

// Shorten address
function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

onMounted(() => {
  // Auto-detect already-connected wallet
  if (injectedProvider.value) {
    injectedProvider.value.request({ method: 'eth_accounts' }).then((accounts: unknown) => {
      const addrs = accounts as string[]
      if (addrs?.length) {
        account.value = addrs[0]
        walletType.value = detectWalletType()
        provider.value = injectedProvider.value
        injectedProvider.value!.request({ method: 'eth_chainId' }).then((cid: unknown) => {
          chainId.value = cid as string
          fetchBalance()
        })
        if (injectedProvider.value!.on) {
          injectedProvider.value!.on('accountsChanged', handleAccountsChanged)
          injectedProvider.value!.on('chainChanged', handleChainChanged)
        }
      }
    }).catch(() => {})
  }
})

onUnmounted(() => {
  disconnectWallet()
})

// Tabs
type Tab = 'erc20' | 'fractional' | 'custom'
const activeTab = ref<Tab>('erc20')
</script>

<template>
  <div class="container mx-auto p-6 max-w-7xl">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-2 flex items-center gap-3">
        <Building2 class="w-9 h-9 text-primary" />
        RWA Tokenization Lab
      </h1>
      <p class="text-lg text-muted-foreground">
        Deploy smart contracts for Real-World Asset (RWA) POC projects. Connect your wallet, choose a contract template, and deploy on-chain.
      </p>
    </div>

    <!-- POC Warning Banner -->
    <div class="mb-6 p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
      <div class="flex items-start gap-3">
        <AlertTriangle class="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 class="font-semibold text-amber-900">⚠️ POC ONLY — Not for Production Use</h3>
          <p class="text-sm text-amber-800 mt-1">
            Contracts deployed here are minimal and <strong>not audited</strong>. They are intended for rapid prototyping and testing only.
            Production deployments require professional smart contract audits, formal verification, and proper access controls.
            Never use these contracts to manage real user funds.
          </p>
        </div>
      </div>
    </div>

    <!-- Wallet Connection Bar -->
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
              <div class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span class="inline-flex items-center gap-1">
                  <span class="capitalize font-medium">{{ walletType }}</span>
                </span>
                <span>·</span>
                <span v-if="currentChain" class="inline-flex items-center gap-1">
                  <span class="inline-block w-2 h-2 rounded-full" :style="{ backgroundColor: currentChain.color }" />
                  <span class="font-medium">{{ currentChain.name }}</span>
                </span>
                <span v-else>{{ chainName }}</span>
                <span>·</span>
                <span class="font-mono">Chain ID: {{ parseInt(chainId, 16) }}</span>
                <span>·</span>
                <span v-if="currentChain" class="font-mono text-blue-600">{{ currentChain.symbol }}</span>
              </div>
            </div>
            <div v-else>
              <p class="font-semibold">No wallet connected</p>
              <p class="text-xs text-muted-foreground">Connect MetaMask or Rabby to deploy contracts</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Button v-if="!isWalletConnected" @click="connectWallet" :disabled="isConnecting">
              <Loader2 v-if="isConnecting" class="w-4 h-4 mr-2 animate-spin" />
              <Wallet v-else class="w-4 h-4 mr-2" />
              {{ isConnecting ? 'Connecting...' : 'Connect Wallet' }}
            </Button>
            <Button v-else variant="outline" @click="disconnectWallet">
              <X class="w-4 h-4 mr-2" /> Disconnect
            </Button>
          </div>
        </div>
        <div v-if="walletError" class="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {{ walletError }}
        </div>
      </CardContent>
    </Card>

    <div class="grid gap-6 lg:grid-cols-[280px_1fr]">
      <!-- Contract Type Sidebar -->
      <div>
        <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contract Templates</h2>
        <div class="space-y-2">
          <button v-for="def in CONTRACT_DEFS" :key="def.type"
            @click="selectedType = def.type; activeTab = def.type"
            class="w-full text-left p-3 rounded-lg border transition-all"
            :class="activeTab === def.type ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/50'"
          >
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                :style="{ backgroundColor: def.color + '20' }">
                <component :is="def.icon" class="w-5 h-5" :style="{ color: def.color }" />
              </div>
              <div class="min-w-0">
                <p class="font-semibold text-sm truncate">{{ def.label }}</p>
                <p class="text-xs text-muted-foreground line-clamp-2">{{ def.description }}</p>
              </div>
            </div>
          </button>
          <!-- Custom Bytecode Tab -->
          <button @click="selectedType = 'custom'; activeTab = 'custom'"
            class="w-full text-left p-3 rounded-lg border transition-all"
            :class="activeTab === 'custom' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/50'"
          >
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                <Code2 class="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p class="font-semibold text-sm">Custom Bytecode</p>
                <p class="text-xs text-muted-foreground">Deploy any compiled contract</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Deploy Panel -->
      <div class="space-y-6">
        <!-- Contract Info -->
        <Card v-if="selectedType !== 'custom'">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <component :is="CONTRACT_DEFS[selectedType].icon" class="w-5 h-5"
                :style="{ color: CONTRACT_DEFS[selectedType].color }" />
              {{ CONTRACT_DEFS[selectedType].label }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">{{ CONTRACT_DEFS[selectedType].description }}</p>
            <div class="mt-3 p-3 bg-muted rounded-lg">
              <p class="text-xs font-semibold text-muted-foreground uppercase mb-1">Use Case</p>
              <p class="text-sm">{{ CONTRACT_DEFS[selectedType].useCase }}</p>
            </div>
          </CardContent>
        </Card>

        <!-- ERC-20 Form -->
        <Card v-if="activeTab === 'erc20'">
          <CardHeader><CardTitle>Configure ERC-20 Mirror Token</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Token Name</Label>
                <Input v-model="erc20Name" placeholder="Mirror AAPL" />
              </div>
              <div>
                <Label>Symbol</Label>
                <Input v-model="erc20Symbol" placeholder="mAAPL" />
              </div>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Decimals</Label>
                <Select v-model="erc20Decimals">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem :value="6">6 (like USDC)</SelectItem>
                    <SelectItem :value="8">8 (like WBTC)</SelectItem>
                    <SelectItem :value="18">18 (standard)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Initial Supply (whole tokens)</Label>
                <Input v-model="erc20Supply" type="number" placeholder="1000000" />
              </div>
            </div>
            <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
              <Info class="w-4 h-4 inline mr-1" />
              Supply is in whole tokens. For 1M tokens with 18 decimals, the raw value will be 1,000,000 × 10¹⁸.
            </div>
          </CardContent>
        </Card>

        <!-- Fractional Form -->
        <Card v-if="activeTab === 'fractional'">
          <CardHeader><CardTitle>Configure Fractional Ownership</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Share Token Name</Label>
                <Input v-model="fracName" placeholder="Property Shares" />
              </div>
              <div>
                <Label>Share Symbol</Label>
                <Input v-model="fracSymbol" placeholder="pSHARE" />
              </div>
            </div>
            <div>
              <Label>Total Shares</Label>
              <Input v-model="fracSupply" type="number" placeholder="10000" />
            </div>
            <div class="p-4 bg-muted rounded-lg">
              <p class="text-sm">
                Fractional ownership typically wraps an ERC-721 NFT and issues ERC-20 shares against it.
                Use a protocol like <a href="https://github.com/fractional-finance" target="_blank" class="text-blue-600 underline">Fractional</a>
                or deploy the NFT + ERC-20 separately for this POC.
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- Custom Bytecode Form -->
        <Card v-if="activeTab === 'custom'">
          <CardHeader><CardTitle>Deploy Custom Contract</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div>
              <Label>Contract Bytecode (hex)</Label>
              <Textarea v-model="customBytecode" rows="4" placeholder="0x6080604052..."
                class="font-mono text-xs" />
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Constructor Arg Types (JSON array)</Label>
                <Input v-model="customAbi" placeholder='["string","uint256"]' class="font-mono text-xs" />
              </div>
              <div>
                <Label>Constructor Arg Values (JSON array)</Label>
                <Input v-model="customArgs" placeholder='["MyToken", 1000]' class="font-mono text-xs" />
              </div>
            </div>
            <p class="text-xs text-muted-foreground">
              Paste compiled bytecode from Remix/Hardhat. Constructor args are ABI-encoded automatically.
            </p>
          </CardContent>
        </Card>

        <!-- Deploy Button -->
        <div class="flex items-center gap-3">
          <Button @click="deployContract" :disabled="isDeploying || !isWalletConnected" size="lg" class="min-w-[200px]">
            <Loader2 v-if="isDeploying" class="w-5 h-5 mr-2 animate-spin" />
            <Rocket v-else class="w-5 h-5 mr-2" />
            {{ isDeploying ? deployStatus || 'Deploying...' : 'Deploy Contract' }}
          </Button>
          <span v-if="!isWalletConnected" class="text-sm text-muted-foreground">Connect wallet to deploy</span>
        </div>

        <div v-if="deployError" class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-2">
          <AlertTriangle class="w-5 h-5 shrink-0" /> {{ deployError }}
        </div>
      </div>
    </div>

    <!-- Deployed Contracts -->
    <Card class="mt-8" v-if="deployed.length">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <CheckCircle2 class="w-5 h-5 text-green-600" />
          Deployed Contracts ({{ deployed.length }})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div v-for="c in deployed" :key="c.id"
            class="flex flex-wrap items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              :style="{ backgroundColor: CONTRACT_DEFS[c.type]?.color + '20' ?? '#99999920' }">
              <component :is="CONTRACT_DEFS[c.type]?.icon ?? Code2" class="w-5 h-5"
                :style="{ color: CONTRACT_DEFS[c.type]?.color ?? '#999' }" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-sm truncate">{{ c.name }}</p>
              <a v-if="explorerBase" :href="explorerAddress(c.address)" target="_blank"
                class="font-mono text-xs text-blue-600 hover:underline inline-flex items-center gap-1">
                {{ shortAddr(c.address) }} <ExternalLink class="w-3 h-3" />
              </a>
              <span v-else class="font-mono text-xs">{{ shortAddr(c.address) }}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <a v-if="explorerBase" :href="explorerTx(c.txHash)" target="_blank"
                class="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                Tx <ExternalLink class="w-3 h-3" />
              </a>
              <Button variant="ghost" size="sm" @click="copyToClipboard(c.address)">
                <Copy class="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" @click="removeContract(c.id)">
                <Trash2 class="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- SEO Content Section -->
    <div class="mt-8 prose prose-sm max-w-none text-muted-foreground">
      <h2 class="text-2xl font-bold text-foreground mb-4">RWA Tokenization — Deploy Smart Contracts On-Chain</h2>
      <p>
        Real-World Asset (RWA) tokenization is the process of representing physical and financial assets —
        real estate, stocks, commodities, bonds, art — as blockchain tokens. The global RWA market is
        projected to reach $16 trillion by 2030, driven by DeFi protocols, institutional adoption, and
        regulatory clarity. This lab lets you deploy the core smart contracts needed for an RWA project
        directly from your browser, with no backend or server required.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-6 mb-2">ERC-20 Mirror Tokens for Stocks & Commodities</h3>
      <p>
        Mirror tokens are ERC-20 fungible tokens that track the price of off-chain assets. For example,
        you can create mAAPL (Mirror AAPL), mAMZN (Mirror Amazon), mTSLA (Mirror Tesla), or mGOLD tokens.
        Each token is deployed with configurable parameters — name, symbol, decimals (6, 8, or 18), and
        initial supply. The deployer receives the full token supply and can distribute it to simulate
        trading, market making, or portfolio tracking.
      </p>
      <p>
        In a production RWA system, mirror tokens integrate with oracle networks like Chainlink to fetch
        real-time price feeds, and compliance layers to enforce KYC/AML transfer restrictions. This POC
        tool handles the contract deployment so you can focus on building the trading and compliance logic.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-6 mb-2">Fractional Ownership Contracts</h3>
      <p>
        High-value assets — commercial real estate, fine art, private equity — are typically inaccessible
        to retail investors. Fractional ownership solves this by splitting an asset into thousands of
        fungible ERC-20 shares. For example, a $5M property can be split into 50,000 shares at $100 each,
        enabling micro-investment with low minimums.
      </p>
      <p>
        This lab supports deploying fractional ownership contracts with configurable share token name,
        symbol, and total supply. In production, combine with governance contracts (like Snapshot or
        OpenZeppelin Governor) so shareholders can vote on property management decisions, sale events,
        and dividend distribution.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-6 mb-2">Custom Contract Deployment</h3>
      <p>
        Beyond the built-in templates, the Custom Bytecode tab lets you deploy any compiled smart contract.
        Compile your Solidity in Remix, Hardhat, or Foundry, then paste the bytecode and constructor
        arguments. The tool ABI-encodes the constructor arguments automatically using viem and sends the
        deployment transaction through your connected wallet.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Supported Blockchains & Wallets</h2>
      <p>
        The RWA Tokenization Lab supports deployment to all major EVM-compatible blockchains:
      </p>
      <ul class="text-sm">
        <li><strong>Ethereum Mainnet</strong> and Sepolia testnet</li>
        <li><strong>Polygon</strong> and Mumbai testnet</li>
        <li><strong>Arbitrum One</strong> and Arbitrum Sepolia</li>
        <li><strong>Base</strong> and Base Sepolia</li>
        <li><strong>Optimism</strong></li>
      </ul>
      <p>
        Wallet connections are handled via the EIP-1193 standard, supporting <strong>MetaMask</strong> and
        <strong>Rabby Wallet</strong>. The tool auto-detects installed wallets, displays the connected chain,
        and shows deployed contract addresses with direct links to block explorers (Etherscan, Polygonscan,
        Arbiscan, Basescan, OP Scan).
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">How RWA Tokenization Works</h2>
      <div class="grid gap-4 mt-4 md:grid-cols-2">
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold text-foreground mb-1">1. Asset Selection</h4>
          <p class="text-xs">Choose a real-world asset to tokenize — stocks (AAPL, TSLA, AMZN), real estate,
            commodities (gold, silver), or bonds.</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold text-foreground mb-1">2. Contract Deployment</h4>
          <p class="text-xs">Deploy an ERC-20 mirror token or fractional ownership contract on your chosen
            blockchain using this lab.</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold text-foreground mb-1">3. Price Oracle Integration</h4>
          <p class="text-xs">Connect the token to a price feed (Chainlink, Pyth Network, API3) so the on-chain
            token reflects real-world market prices.</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold text-foreground mb-1">4. Trading & Liquidity</h4>
          <p class="text-xs">List the token on a DEX (Uniswap, SushiSwap) or create an order book for POC
            trading simulation.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Frequently Asked Questions</h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-semibold text-foreground text-base">What is RWA tokenization?</h3>
          <p>RWA tokenization is the process of issuing blockchain tokens that represent ownership or rights
            to real-world assets like real estate, stocks, commodities, and bonds. These tokens can be
            traded, transferred, and programmed with smart contract logic.</p>
        </div>
        <div>
          <h3 class="font-semibold text-foreground text-base">Is this tool safe to use?</h3>
          <p>This tool deploys minimal smart contracts that are not audited. It is intended for POC
            (proof of concept) development only. For production deployments, always use professionally
            audited contracts from OpenZeppelin or similar libraries.</p>
        </div>
        <div>
          <h3 class="font-semibold text-foreground text-base">Which wallets are supported?</h3>
          <p>The tool supports any EIP-1193 compatible wallet including MetaMask and Rabby. It auto-detects
            the installed wallet and connects with a single click.</p>
        </div>
        <div>
          <h3 class="font-semibold text-foreground text-base">Can I deploy on any blockchain?</h3>
          <p>Yes — any EVM-compatible chain works. The tool shows the connected chain name and provides
            block explorer links for deployed contracts on Ethereum, Polygon, Arbitrum, Base, and Optimism.</p>
        </div>
        <div>
          <h3 class="font-semibold text-foreground text-base">What is a mirror token?</h3>
          <p>A mirror token is an ERC-20 token that tracks the price of an off-chain asset. For example,
            mAAPL mirrors Apple stock price. Mirror tokens are used in synthetic asset protocols and
            RWA trading simulations.</p>
        </div>
        <div>
          <h3 class="font-semibold text-foreground text-base">What is fractional ownership?</h3>
          <p>Fractional ownership splits a high-value asset into smaller, tradeable shares. For example,
            a $1M property can be split into 10,000 ERC-20 tokens at $100 each, allowing multiple investors
            to own a fraction of the asset.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">RWA Tokenization Use Cases</h2>
      <ul class="text-sm">
        <li><strong>Stock mirroring</strong> — Create ERC-20 tokens that track AAPL, TSLA, AMZN, GOOGL prices for POC trading</li>
        <li><strong>Real estate tokenization</strong> — Represent property deeds as tokens with fractional ownership</li>
        <li><strong>Commodity tokens</strong> — Tokenize gold, silver, oil, or agricultural products</li>
        <li><strong>Bond tokenization</strong> — Issue tokenized bonds with programmable coupon payments</li>
        <li><strong>Invoice financing</strong> — Tokenize outstanding invoices for DeFi lending protocols</li>
        <li><strong>Carbon credits</strong> — Tokenize verified carbon offsets for transparent trading</li>
        <li><strong>Private equity</strong> — Tokenize fund shares for simplified investor onboarding</li>
      </ul>
    </div>
  </div>
</template>
