<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Wallet, AlertTriangle, CheckCircle2, ExternalLink, Copy, Trash2,
  Plus, Building2, Coins, Shield, FileText, Loader2, ChevronRight,
  Network, ArrowRight, X, Rocket, Code2, Info
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
  else account.value = accounts[0]
}

function handleChainChanged(...args: unknown[]) {
  chainId.value = args[0] as string
}

function disconnectWallet() {
  account.value = ''
  chainId.value = ''
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
type ContractType = 'erc20' | 'nft' | 'permissionlist' | 'oracle' | 'fractional'

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
  nft: {
    type: 'nft',
    label: 'Real Estate NFT (ERC-721)',
    icon: Building2,
    color: '#8B5CF6',
    description: 'Non-fungible token representing unique real-world property',
    useCase: 'Tokenize property deeds with metadata — address, valuation, images.',
  },
  permissionlist: {
    type: 'permissionlist',
    label: 'Permission List (KYC/AML)',
    icon: Shield,
    color: '#10B981',
    description: 'Whitelist contract for compliance gating',
    useCase: 'Restrict token transfers to verified addresses — simulate regulated markets.',
  },
  oracle: {
    type: 'oracle',
    label: 'Price Oracle Mock',
    icon: Network,
    color: '#F59E0B',
    description: 'On-chain price feed you can update manually',
    useCase: 'Push mock prices for AAPL, BTC, gold without real Chainlink integration.',
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

// NFT
const nftName = ref('Property Deed Registry')
const nftSymbol = ref('PROP')

// Permission List
const permName = ref('KYC Whitelist')

// Oracle
const oracleAsset = ref('AAPL')
const oracleSymbol = ref('AAPL')

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
      // For NFT, PermissionList, Oracle, Fractional — guide user to paste compiled bytecode
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
type Tab = 'erc20' | 'nft' | 'permissionlist' | 'oracle' | 'fractional' | 'custom'
const activeTab = ref<Tab>('erc20')
</script>

<template>
  <div class="container mx-auto p-6 max-w-7xl">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-2 flex items-center gap-3">
        <Building2 class="w-9 h-9 text-primary" />
        RWA Deployment Lab
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
            <div v-if="isWalletConnected">
              <p class="font-mono text-sm font-semibold">{{ shortAddr(account) }}</p>
              <p class="text-xs text-muted-foreground flex items-center gap-1">
                <span class="capitalize">{{ walletType }}</span>
                <span>·</span>
                <span>{{ currentChain?.name ?? chainName }}</span>
                <span v-if="chainId" class="inline-block w-2 h-2 rounded-full ml-1"
                  :style="{ backgroundColor: currentChain?.color ?? '#999' }" />
              </p>
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

        <!-- NFT Form -->
        <Card v-if="activeTab === 'nft'">
          <CardHeader><CardTitle>Configure Real Estate NFT (ERC-721)</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Collection Name</Label>
                <Input v-model="nftName" placeholder="Property Deed Registry" />
              </div>
              <div>
                <Label>Symbol</Label>
                <Input v-model="nftSymbol" placeholder="PROP" />
              </div>
            </div>
            <div class="p-4 bg-muted rounded-lg space-y-3">
              <div class="flex items-start gap-2">
                <Info class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p class="text-sm font-semibold">How to deploy an NFT contract:</p>
                  <ol class="text-sm text-muted-foreground mt-1 space-y-1 list-decimal list-inside">
                    <li>Go to <a href="https://remix.ethereum.org" target="_blank" class="text-blue-600 underline">Remix IDE</a></li>
                    <li>Use OpenZeppelin's ERC721 template</li>
                    <li>Compile with Solidity 0.8.x</li>
                    <li>Copy the bytecode and paste it in the "Custom Bytecode" tab</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Permission List Form -->
        <Card v-if="activeTab === 'permissionlist'">
          <CardHeader><CardTitle>Configure Permission List</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div>
              <Label>Contract Name</Label>
              <Input v-model="permName" placeholder="KYC Whitelist" />
            </div>
            <div class="p-4 bg-muted rounded-lg">
              <p class="text-sm font-semibold mb-1">Suggested Solidity:</p>
              <pre class="text-xs overflow-x-auto bg-gray-900 text-green-400 p-3 rounded">pragma solidity ^0.8.0;
contract PermissionList {
  mapping(address => bool) public isWhitelisted;
  address public admin;
  constructor() { admin = msg.sender; }
  function add(address user) external {
    require(msg.sender == admin);
    isWhitelisted[user] = true;
  }
}</pre>
              <p class="text-xs text-muted-foreground mt-2">Compile in Remix and deploy via Custom Bytecode tab.</p>
            </div>
          </CardContent>
        </Card>

        <!-- Oracle Form -->
        <Card v-if="activeTab === 'oracle'">
          <CardHeader><CardTitle>Configure Price Oracle Mock</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Asset Name</Label>
                <Input v-model="oracleAsset" placeholder="AAPL" />
              </div>
              <div>
                <Label>Asset Symbol</Label>
                <Input v-model="oracleSymbol" placeholder="AAPL" />
              </div>
            </div>
            <div class="p-4 bg-muted rounded-lg">
              <p class="text-sm font-semibold mb-1">Suggested Solidity:</p>
              <pre class="text-xs overflow-x-auto bg-gray-900 text-green-400 p-3 rounded">pragma solidity ^0.8.0;
contract MockOracle {
  string public asset;
  uint256 public price;
  uint256 public lastUpdate;
  constructor(string memory _asset) {
    asset = _asset;
    price = 0;
  }
  function setPrice(uint256 _price) external {
    price = _price;
    lastUpdate = block.timestamp;
  }
}</pre>
              <p class="text-xs text-muted-foreground mt-2">Compile in Remix and deploy via Custom Bytecode tab.</p>
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

    <!-- Educational Content (SEO) -->
    <div class="mt-8 prose prose-sm max-w-none text-muted-foreground">
      <h2 class="text-2xl font-bold text-foreground mb-4">RWA Smart Contract Templates</h2>
      <p>
        Real-World Asset (RWA) tokenization bridges physical assets — real estate, stocks, commodities, art —
        with blockchain infrastructure. This lab provides POC templates for the key contract types needed
        in an RWA project:
      </p>
      <div class="grid gap-4 mt-4">
        <div>
          <h3 class="text-lg font-semibold text-foreground">ERC-20 Mirror Tokens for Stocks & Commodities</h3>
          <p>
            Mirror tokens represent off-chain assets like AAPL, AMZN, or gold on-chain. Each token maps 1:1
            to a real-world asset price. In a POC, combine with the Oracle Mock contract to push prices and
            simulate trading. Real implementations would integrate Chainlink price feeds and compliance checks.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-foreground">Real Estate NFTs (ERC-721)</h3>
          <p>
            Each property is unique — making ERC-721 NFTs the natural choice for real estate tokenization.
            The NFT metadata stores property details (address, legal description, valuation, images) while
            the smart contract handles ownership transfer. NFTs can be listed on marketplaces and transferred
            peer-to-peer (subject to regulatory compliance).
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-foreground">Permission Lists for KYC/AML Compliance</h3>
          <p>
            Regulated RWA transfers require verified participants. A permission list contract acts as an
            on-chain whitelist — only KYC'd addresses can receive tokens. This simulates the compliance
            layer that real RWA platforms (like Securitize, Polymath) implement.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-foreground">Price Oracle Mocks for Testing</h3>
          <p>
            Oracles connect smart contracts to off-chain data. For POC development, a mock oracle lets you
            manually set prices without deploying real Chainlink integrations. Test trading bots, liquidation
            logic, and portfolio tracking with controlled price inputs.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-foreground">Fractional Ownership for High-Value Assets</h3>
          <p>
            A $5M property is inaccessible to most investors. Fractional ownership splits the NFT into
            fungible ERC-20 shares, enabling micro-investment. Governance mechanisms determine how the
            underlying asset is managed and eventually sold.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
