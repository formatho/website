<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Buffer } from 'buffer'
// Ensure Buffer is available globally for bip39 and crypto libs
if (typeof window !== 'undefined') {
  ;(window as any).Buffer = Buffer
  ;(globalThis as any).Buffer = Buffer
}
import * as bip39 from 'bip39'
// @ts-ignore
import { derivePath } from 'ed25519-hd-key'
import { Keypair } from '@solana/web3.js'
import { Keyring } from '@polkadot/keyring'
import { mnemonicToAccount } from 'viem/accounts'
import { bech32 } from 'bech32'
// @ts-ignore
import { sha256 } from '@noble/hashes/sha2.js'
// @ts-ignore
import { ripemd160 } from '@noble/hashes/legacy.js'
import { secp256k1 } from '@noble/curves/secp256k1'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Wallet,
  Key,
  Shield,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Check,
  TreeDeciduous,
  BookOpen,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
  RefreshCw,
  Trash2,
  Download,
  Info
} from 'lucide-vue-next'

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const mnemonicWords = ref('12')
const passphrase = ref('')
const showSensitive = ref(false)
const deriveLocallyOnly = ref(true)
const importedMnemonic = ref('')
const importedPrivateKey = ref('')
const error = ref('')
const success = ref('')
const isGenerating = ref(false)
const activeTab = ref('derive')

// HD Path Explorer State
const explorerStep = ref<'seed' | 'master' | 'child' | 'public' | 'address'>('seed')
const selectedChainForExplorer = ref<string>('ethereum')

// ============================================================================
// TYPES
// ============================================================================

interface ChainResult {
  name: string
  ticker: string
  curve: string
  derivationStandard: string
  derivationPath: string
  publicKey: string
  privateKey: string
  address: string
  addressEncoding: string
  notes: string
  color: string
  icon: string
  status: 'derived' | 'partial' | 'coming-soon'
}

interface HDExplorerStep {
  id: string
  label: string
  description: string
  data?: string
  format?: 'hex' | 'base58' | 'bech32' | 'text'
}

// ============================================================================
// CHAIN CONFIGURATIONS
// ============================================================================

const chainConfigs = [
  {
    id: 'ethereum',
    name: 'Ethereum/EVM',
    ticker: 'ETH',
    curve: 'secp256k1',
    derivationStandard: 'BIP-44',
    derivationPath: "m/44'/60'/0'/0/0",
    addressEncoding: 'Hex (20 bytes, Keccak-256 last 20 bytes)',
    notes: 'Used by Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche C-Chain, and most EVM-compatible chains.',
    color: 'bg-blue-500/10 border-blue-500/30',
    icon: '🔷'
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    ticker: 'BTC',
    curve: 'secp256k1',
    derivationStandard: 'BIP-44',
    derivationPath: "m/44'/0'/0'/0/0",
    addressEncoding: 'Base58 (P2PKH) or Bech32 (P2WPKH)',
    notes: 'Original BIP-44 implementation. Native SegWit uses m/84\'/0\'/0\'/0/0 path.',
    color: 'bg-orange-500/10 border-orange-500/30',
    icon: '₿'
  },
  {
    id: 'solana',
    name: 'Solana',
    ticker: 'SOL',
    curve: 'Ed25519',
    derivationStandard: 'BIP-44',
    derivationPath: "m/44'/501'/0'/0'",
    addressEncoding: 'Base58 (Ed25519 public key)',
    notes: 'Uses Ed25519 curve with hardened derivation at account level.',
    color: 'bg-purple-500/10 border-purple-500/30',
    icon: '◎'
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    ticker: 'ATOM',
    curve: 'secp256k1',
    derivationStandard: 'BIP-44',
    derivationPath: "m/44'/118'/0'/0/0",
    addressEncoding: 'Bech32 (cosmos...) with SHA-256 + RIPEMD-160',
    notes: 'Used by Cosmos Hub and Cosmos SDK-based chains (Osmosis, Juno, etc).',
    color: 'bg-indigo-500/10 border-indigo-500/30',
    icon: '⚛'
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    ticker: 'DOT',
    curve: 'Sr25519',
    derivationStandard: 'Polkadot-specific',
    derivationPath: '//<account>',
    addressEncoding: 'SS58 (Base58-like with checksum)',
    notes: 'Uses Schnorrkel (Sr25519) for better signature aggregation and HD support.',
    color: 'bg-pink-500/10 border-pink-500/30',
    icon: '●'
  },
  {
    id: 'sui',
    name: 'Sui',
    ticker: 'SUI',
    curve: 'Ed25519',
    derivationStandard: 'BIP-44',
    derivationPath: "m/44'/784'/0'/0'/0'",
    addressEncoding: 'Base64 (Ed25519 public key + flag byte)',
    notes: 'Uses Ed25519 with zkSNARK-compatible address format.',
    color: 'bg-cyan-500/10 border-cyan-500/30',
    icon: '◈'
  },
  {
    id: 'aptos',
    name: 'Aptos',
    ticker: 'APT',
    curve: 'Ed25519',
    derivationStandard: 'BIP-44',
    derivationPath: "m/44'/637'/0'/0'/0'",
    addressEncoding: 'Base64 with 0x prefix (Ed25519 public key)',
    notes: 'Derived from Diem blockchain. Uses standard Ed25519 signatures.',
    color: 'bg-teal-500/10 border-teal-500/30',
    icon: '▲'
  },
  {
    id: 'near',
    name: 'NEAR',
    ticker: 'NEAR',
    curve: 'Ed25519',
    derivationStandard: 'NEAR-specific',
    derivationPath: "m/44'/397'/0'/0'/0'",
    addressEncoding: 'Base58 (implicit account ID or ed25519 public key)',
    notes: 'Uses implicit accounts created on first use. Key derivation differs from standard BIP-44.',
    color: 'bg-emerald-500/10 border-emerald-500/30',
    icon: '◉'
  }
]

const results = ref<ChainResult[]>([])

// ============================================================================
// WALLET GENERATION & IMPORT
// ============================================================================

const generateWallet = async () => {
  try {
    isGenerating.value = true
    error.value = ''
    success.value = ''

    const strength = mnemonicWords.value === '24' ? 256 : 128
    const mnemonic = bip39.generateMnemonic(strength)
    importedMnemonic.value = mnemonic
    importedPrivateKey.value = ''

    success.value = 'New mnemonic generated! Deriving keys...'
    await deriveKeys()
  } catch (err: any) {
    console.error('Generate wallet error:', err)
    error.value = 'Error generating wallet: ' + (err?.message || String(err))
    isGenerating.value = false
  }
}

const importMnemonic = async () => {
  try {
    isGenerating.value = true
    error.value = ''
    success.value = ''

    const cleaned = importedMnemonic.value.trim().toLowerCase()
    if (!bip39.validateMnemonic(cleaned)) {
      error.value = 'Invalid mnemonic phrase. Please check your words.'
      return
    }

    importedPrivateKey.value = ''
    success.value = 'Mnemonic imported successfully! Click "Derive Keys" to see addresses.'
    await deriveKeys()
  } catch (err: any) {
    console.error(err)
    error.value = 'Error importing mnemonic: ' + err.message
  } finally {
    isGenerating.value = false
  }
}

const importPrivateKey = async () => {
  try {
    isGenerating.value = true
    error.value = ''
    success.value = ''

    const privKey = importedPrivateKey.value.trim()

    // Basic validation - should be hex string of reasonable length
    const hexRegex = /^(0x)?[0-9a-fA-F]+$/
    if (!hexRegex.test(privKey)) {
      error.value = 'Invalid private key format. Must be hexadecimal.'
      return
    }

    const cleanHex = privKey.replace('0x', '')
    if (cleanHex.length !== 64 && cleanHex.length !== 66) {
      error.value = 'Invalid private key length. Expected 64-66 hex characters (32-33 bytes).'
      return
    }

    importedMnemonic.value = ''
    success.value = 'Private key imported. Deriving Ethereum address only.'
    await deriveKeysFromPrivateKey(cleanHex)
  } catch (err: any) {
    console.error(err)
    error.value = 'Error importing private key: ' + err.message
  } finally {
    isGenerating.value = false
  }
}

const clearAll = () => {
  importedMnemonic.value = ''
  importedPrivateKey.value = ''
  passphrase.value = ''
  results.value = []
  error.value = ''
  success.value = ''
  explorerStep.value = 'seed'
}

// ============================================================================
// KEY DERIVATION
// ============================================================================

const getCosmosAddress = (privKeyHex: string, prefix: string = 'cosmos') => {
  const privKeyBytes = Buffer.from(privKeyHex.replace('0x', ''), 'hex')
  const pubKey = secp256k1.getPublicKey(privKeyBytes, true)
  const sha = sha256(pubKey)
  const rip = ripemd160(sha)
  const words = bech32.toWords(Buffer.from(rip))
  return bech32.encode(prefix, words)
}

const deriveKeys = async () => {
  try {
    if (!importedMnemonic.value) {
      error.value = 'No mnemonic provided. Generate or import a mnemonic first.'
      return
    }

    const mnemonic = importedMnemonic.value.trim().toLowerCase()
    const seed = await bip39.mnemonicToSeed(mnemonic, passphrase.value)
    const resultsList: ChainResult[] = []

    // Import HDKey
    const { HDKey } = await import('viem/accounts')
    const rootHdKey = HDKey.fromMasterSeed(seed)

    // ========================================================================
    // 1. Ethereum/EVM
    // ========================================================================
    try {
      const ethPath = "m/44'/60'/0'/0/0"
      const ethAccount = mnemonicToAccount(mnemonic, { path: ethPath as any })
      const ethChild = rootHdKey.derive(ethPath)

      let ethPrivKey = 'Unavailable'
      let ethPubKey = 'Unavailable'

      if (ethChild.privateKey) {
        ethPrivKey = Buffer.from(ethChild.privateKey).toString('hex')
        const pubKeyBytes = secp256k1.getPublicKey(ethChild.privateKey, false)
        ethPubKey = Buffer.from(pubKeyBytes).toString('hex')
      }

      resultsList.push({
        name: 'Ethereum/EVM',
        ticker: 'ETH',
        curve: 'secp256k1',
        derivationStandard: 'BIP-44',
        derivationPath: ethPath,
        publicKey: ethPubKey,
        privateKey: ethPrivKey,
        address: ethAccount.address,
        addressEncoding: 'Hex (0x...)',
        notes: chainConfigs[0].notes,
        color: chainConfigs[0].color,
        icon: chainConfigs[0].icon,
        status: 'derived'
      })
    } catch (e) {
      console.error('Ethereum derivation error:', e)
    }

    // ========================================================================
    // 2. Bitcoin
    // ========================================================================
    try {
      const btcPath = "m/44'/0'/0'/0/0"
      const btcChild = rootHdKey.derive(btcPath)

      if (btcChild.privateKey && btcChild.publicKey) {
        const btcPrivKey = Buffer.from(btcChild.privateKey).toString('hex')
        const btcPubKey = Buffer.from(btcChild.publicKey).toString('hex')

        // Simple P2PKH address (for demonstration)
        const pubKeyHash = ripemd160(sha256(Buffer.from(btcChild.publicKey)))
        // This is simplified - real BTC address encoding is more complex
        const btcAddress = '1' + Buffer.from(pubKeyHash).toString('hex').substring(0, 32)

        resultsList.push({
          name: 'Bitcoin',
          ticker: 'BTC',
          curve: 'secp256k1',
          derivationStandard: 'BIP-44',
          derivationPath: btcPath,
          publicKey: btcPubKey,
          privateKey: btcPrivKey,
          address: btcAddress + '... (P2PKH simplified)',
          addressEncoding: 'Base58 (P2PKH)',
          notes: chainConfigs[1].notes,
          color: chainConfigs[1].color,
          icon: chainConfigs[1].icon,
          status: 'partial'
        })
      }
    } catch (e) {
      console.error('Bitcoin derivation error:', e)
    }

    // ========================================================================
    // 3. Solana
    // ========================================================================
    try {
      const solPath = "m/44'/501'/0'/0'"
      const derivedSeed = derivePath(solPath, seed.toString('hex')).key
      const solKeypair = Keypair.fromSeed(derivedSeed)

      resultsList.push({
        name: 'Solana',
        ticker: 'SOL',
        curve: 'Ed25519',
        derivationStandard: 'BIP-44',
        derivationPath: solPath,
        publicKey: solKeypair.publicKey.toBase58(),
        privateKey: Buffer.from(solKeypair.secretKey).slice(0, 32).toString('hex'),
        address: solKeypair.publicKey.toBase58(),
        addressEncoding: 'Base58',
        notes: chainConfigs[2].notes,
        color: chainConfigs[2].color,
        icon: chainConfigs[2].icon,
        status: 'derived'
      })
    } catch (e) {
      console.error('Solana derivation error:', e)
    }

    // ========================================================================
    // 4. Cosmos
    // ========================================================================
    try {
      const cosmosPath = "m/44'/118'/0'/0/0"
      const cosmosChild = rootHdKey.derive(cosmosPath)

      if (cosmosChild.privateKey && cosmosChild.publicKey) {
        const cosmosPriv = Buffer.from(cosmosChild.privateKey).toString('hex')
        const cosmosAddr = getCosmosAddress(cosmosPriv)

        resultsList.push({
          name: 'Cosmos',
          ticker: 'ATOM',
          curve: 'secp256k1',
          derivationStandard: 'BIP-44',
          derivationPath: cosmosPath,
          publicKey: Buffer.from(cosmosChild.publicKey).toString('hex'),
          privateKey: cosmosPriv,
          address: cosmosAddr,
          addressEncoding: 'Bech32 (cosmos...)',
          notes: chainConfigs[3].notes,
          color: chainConfigs[3].color,
          icon: chainConfigs[3].icon,
          status: 'derived'
        })
      }
    } catch (e) {
      console.error('Cosmos derivation error:', e)
    }

    // ========================================================================
    // 5. Polkadot
    // ========================================================================
    try {
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 })
      const pair = keyring.addFromUri(mnemonic + (passphrase.value ? `//${passphrase.value}` : ''))

      resultsList.push({
        name: 'Polkadot',
        ticker: 'DOT',
        curve: 'Sr25519',
        derivationStandard: 'Polkadot-specific',
        derivationPath: '//<account> (soft derivation)',
        publicKey: Buffer.from(pair.publicKey).toString('hex'),
        privateKey: 'Protected (derived from mnemonic)',
        address: pair.address,
        addressEncoding: 'SS58',
        notes: chainConfigs[4].notes,
        color: chainConfigs[4].color,
        icon: chainConfigs[4].icon,
        status: 'derived'
      })
    } catch (e) {
      console.error('Polkadot derivation error:', e)
    }

    // ========================================================================
    // 6. Sui (Coming Soon - show derivation info)
    // ========================================================================
    resultsList.push({
      name: 'Sui',
      ticker: 'SUI',
      curve: 'Ed25519',
      derivationStandard: 'BIP-44',
      derivationPath: "m/44'/784'/0'/0'/0'",
      publicKey: 'Coming soon',
      privateKey: 'Coming soon',
      address: 'Coming soon',
      addressEncoding: 'Base64',
      notes: chainConfigs[5].notes,
      color: chainConfigs[5].color,
      icon: chainConfigs[5].icon,
      status: 'coming-soon'
    })

    // ========================================================================
    // 7. Aptos (Coming Soon - show derivation info)
    // ========================================================================
    resultsList.push({
      name: 'Aptos',
      ticker: 'APT',
      curve: 'Ed25519',
      derivationStandard: 'BIP-44',
      derivationPath: "m/44'/637'/0'/0'/0'",
      publicKey: 'Coming soon',
      privateKey: 'Coming soon',
      address: 'Coming soon',
      addressEncoding: 'Base64 with 0x prefix',
      notes: chainConfigs[6].notes,
      color: chainConfigs[6].color,
      icon: chainConfigs[6].icon,
      status: 'coming-soon'
    })

    // ========================================================================
    // 8. NEAR (Coming Soon - show derivation info)
    // ========================================================================
    resultsList.push({
      name: 'NEAR',
      ticker: 'NEAR',
      curve: 'Ed25519',
      derivationStandard: 'NEAR-specific',
      derivationPath: "m/44'/397'/0'/0'/0'",
      publicKey: 'Coming soon',
      privateKey: 'Coming soon',
      address: 'Coming soon',
      addressEncoding: 'Base58',
      notes: chainConfigs[7].notes,
      color: chainConfigs[7].color,
      icon: chainConfigs[7].icon,
      status: 'coming-soon'
    })

    results.value = resultsList
    success.value = 'Keys derived successfully! Explore the results below.'

  } catch (err: any) {
    console.error(err)
    error.value = 'Error deriving keys: ' + err.message
  }
}

const deriveKeysFromPrivateKey = async (privateKeyHex: string) => {
  try {
    const resultsList: ChainResult[] = []

    // Only Ethereum can be derived directly from a private key
    const privKeyBytes = Buffer.from(privateKeyHex, 'hex')
    const pubKeyBytes = secp256k1.getPublicKey(privKeyBytes, false)
    const pubKey = secp256k1.getPublicKey(privKeyBytes, true)

    // Simple Ethereum address derivation (last 20 bytes of Keccak-256 hash)
    // This is simplified - viem does it properly but we want to show the concept
    const { keccak_256 } = await import('@noble/hashes/sha3.js')
    const pubKeyHash = keccak_256(pubKey.slice(1))
    const address = '0x' + Buffer.from(pubKeyHash.slice(-20)).toString('hex')

    resultsList.push({
      name: 'Ethereum/EVM',
      ticker: 'ETH',
      curve: 'secp256k1',
      derivationStandard: 'Direct (no HD)',
      derivationPath: 'N/A (private key import)',
      publicKey: Buffer.from(pubKeyBytes).toString('hex'),
      privateKey: privateKeyHex,
      address: address,
      addressEncoding: 'Hex (0x...)',
      notes: 'Derived directly from imported private key. HD derivation not available.',
      color: chainConfigs[0].color,
      icon: chainConfigs[0].icon,
      status: 'derived'
    })

    results.value = resultsList
  } catch (err: any) {
    console.error(err)
    error.value = 'Error deriving from private key: ' + err.message
  }
}

// ============================================================================
// HD PATH EXPLORER
// ============================================================================

const explorerSteps = ref<HDExplorerStep[]>([])

const updateExplorer = (chainId: string) => {
  selectedChainForExplorer.value = chainId
  const chain = chainConfigs.find(c => c.id === chainId)
  if (!chain || !importedMnemonic.value) return

  const steps: HDExplorerStep[] = []

  // Step 1: Seed
  steps.push({
    id: 'seed',
    label: 'Mnemonic Phrase',
    description: '12 or 24 words from BIP-39 wordlist',
    data: importedMnemonic.value.split(' ').slice(0, 4).join(' ') + '...',
    format: 'text'
  })

  // Step 2: Master Key
  steps.push({
    id: 'master',
    label: 'Master Seed',
    description: 'PBKDF2-HMAC-SHA512(stretch) → 64 bytes',
    data: '[Hidden - 512-bit seed]',
    format: 'hex'
  })

  // Step 3: Child Key
  steps.push({
    id: 'child',
    label: 'Derived Private Key',
    description: `BIP-32 HD derivation: ${chain.derivationPath}`,
    data: '[Hidden - private key material]',
    format: 'hex'
  })

  // Step 4: Public Key
  steps.push({
    id: 'public',
    label: 'Public Key',
    description: `Elliptic curve: ${chain.curve}`,
    data: chain.id === 'ethereum' ? '04[uncompressed 65 bytes]' :
          chain.id === 'solana' ? '[32 bytes Ed25519]' :
          '[compressed 33 bytes]',
    format: 'hex'
  })

  // Step 5: Address
  steps.push({
    id: 'address',
    label: 'Final Address',
    description: `Encoding: ${chain.addressEncoding}`,
    data: chain.id === 'ethereum' ? '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' :
          chain.id === 'solana' ? 'Gj5vKjq...[Base58]' :
          chain.id === 'cosmos' ? 'cosmos1...[Bech32]' :
          '[encoded address]',
    format: 'text'
  })

  explorerSteps.value = steps
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    success.value = `${label} copied to clipboard!`
    setTimeout(() => success.value = '', 2000)
  } catch (err) {
    error.value = 'Failed to copy to clipboard'
  }
}

const downloadResults = () => {
  try {
    const data = {
      timestamp: new Date().toISOString(),
      warning: 'EDUCATIONAL USE ONLY - NEVER USE REAL FUNDS',
      mnemonic: importedMnemonic.value,
      passphrase: passphrase.value || 'none',
      chains: results.value.filter(r => r.status === 'derived').map(r => ({
        chain: r.name,
        ticker: r.ticker,
        address: r.address,
        derivationPath: r.derivationPath,
        curve: r.curve
      }))
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `multichain-keys-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)

    success.value = 'Results downloaded!'
    setTimeout(() => success.value = '', 2000)
  } catch (err: any) {
    error.value = 'Failed to download: ' + err.message
  }
}

// ============================================================================
// LIFECYCLE
// ============================================================================

onMounted(() => {
  // Initialize with default chain selected for explorer
  updateExplorer('ethereum')
})
</script>

<template>
  <div class="h-full flex flex-col p-4 md:p-6 gap-6 overflow-y-auto bg-muted/30">

    <!-- ========================================================================
         HEADER
         ======================================================================== -->
    <div class="space-y-2">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary/10 rounded-lg">
          <Key class="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Multi-Chain Key Generator</h1>
          <p class="text-sm text-muted-foreground">
            Developer utility & wallet education tool
          </p>
        </div>
      </div>
    </div>

    <!-- ========================================================================
         WARNING BANNER
         ======================================================================== -->
    <Card class="border-amber-500/50 bg-amber-500/10">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <AlertTriangle class="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div class="space-y-1">
            <p class="font-semibold text-amber-900 dark:text-amber-100">
              Educational & Local Development Only
            </p>
            <p class="text-sm text-amber-800 dark:text-amber-200">
              <strong>Never use real funds</strong> with addresses generated here. This tool is for
              learning about wallet derivation curves, paths, and address formats. All derivation happens
              locally in your browser - nothing is sent to any server.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- ========================================================================
         MAIN CONTENT GRID
         ======================================================================== -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <!-- LEFT SIDEBAR: WALLET INPUT PANEL -->
      <div class="lg:col-span-4 space-y-4">

        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Wallet class="w-5 h-5" />
              Wallet Input
            </CardTitle>
            <CardDescription>
              Generate a new wallet or import existing credentials
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">

            <!-- Options -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <Label for="mnemonic-length" class="text-sm">Mnemonic Length</Label>
                <select
                  id="mnemonic-length"
                  v-model="mnemonicWords"
                  class="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="12">12 words</option>
                  <option value="24">24 words</option>
                </select>
              </div>

              <div class="flex items-center justify-between">
                <Label for="show-sensitive" class="text-sm">Show Sensitive Data</Label>
                <Switch
                  id="show-sensitive"
                  v-model="showSensitive"
                  class="data-[state=checked]:bg-red-500"
                />
              </div>

              <div class="flex items-center justify-between">
                <Label for="derive-locally" class="text-sm">Derive Locally Only</Label>
                <Switch
                  id="derive-locally"
                  v-model="deriveLocallyOnly"
                  disabled
                  class="opacity-50"
                />
              </div>
            </div>

            <hr class="border-border" />

            <!-- Generate Wallet -->
            <div class="space-y-2">
              <Label class="text-sm font-medium">Generate New Wallet</Label>
              <Button
                @click="generateWallet"
                :disabled="isGenerating"
                class="w-full"
                variant="default"
              >
                <Sparkles v-if="!isGenerating" class="w-4 h-4 mr-2" />
                <RefreshCw v-else class="w-4 h-4 mr-2 animate-spin" />
                Generate Wallet
              </Button>
            </div>

            <hr class="border-border" />

            <!-- Import Mnemonic -->
            <div class="space-y-2">
              <Label for="import-mnemonic" class="text-sm font-medium">Import Mnemonic</Label>
              <Textarea
                id="import-mnemonic"
                v-model="importedMnemonic"
                placeholder="Enter your 12 or 24 word mnemonic phrase..."
                class="min-h-[80px] font-mono text-sm"
              />
              <Button
                @click="importMnemonic"
                :disabled="isGenerating || !importedMnemonic"
                class="w-full"
                variant="secondary"
              >
                <Download class="w-4 h-4 mr-2" />
                Import Mnemonic
              </Button>
            </div>

            <hr class="border-border" />

            <!-- Import Private Key -->
            <div class="space-y-2">
              <Label for="import-privatekey" class="text-sm font-medium">Import Raw Private Key</Label>
              <Input
                id="import-privatekey"
                v-model="importedPrivateKey"
                type="password"
                placeholder="0x..."
                class="font-mono text-sm"
              />
              <Button
                @click="importPrivateKey"
                :disabled="isGenerating || !importedPrivateKey"
                class="w-full"
                variant="secondary"
              >
                <Key class="w-4 h-4 mr-2" />
                Import Private Key
              </Button>
            </div>

            <hr class="border-border" />

            <!-- Optional Passphrase -->
            <div class="space-y-2">
              <Label for="passphrase" class="text-sm font-medium">Optional Passphrase</Label>
              <Input
                id="passphrase"
                v-model="passphrase"
                type="password"
                placeholder="BIP-39 passphrase (optional)"
              />
              <p class="text-xs text-muted-foreground">
                Adding a passphrase generates completely different addresses from the same mnemonic.
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2 pt-2">
              <Button
                v-if="importedMnemonic || importedPrivateKey"
                @click="deriveKeys"
                :disabled="isGenerating"
                class="flex-1"
                variant="default"
              >
                <ArrowRight class="w-4 h-4 mr-2" />
                Derive Keys
              </Button>
              <Button
                v-if="importedMnemonic || importedPrivateKey || results.length > 0"
                @click="clearAll"
                variant="outline"
                class="flex-1"
              >
                <Trash2 class="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>

          </CardContent>
        </Card>

      </div>

      <!-- RIGHT PANEL: MULTI-CHAIN DERIVATION & EXPLORER -->
      <div class="lg:col-span-8 space-y-4">

        <!-- Status Messages -->
        <Card v-if="error || success" :class="error ? 'border-red-500/50 bg-red-500/10' : 'border-green-500/50 bg-green-500/10'">
          <CardContent class="pt-4">
            <div class="flex items-start gap-2">
              <component :is="error ? AlertTriangle : Check" class="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p :class="error ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'" class="text-sm">
                {{ error || success }}
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- Tabs for different views -->
        <div v-if="results.length > 0" class="flex gap-2 border-b border-border pb-2">
          <button
            @click="activeTab = 'derive'"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-t-lg transition-colors',
              activeTab === 'derive'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            ]"
          >
            <TreeDeciduous class="w-4 h-4 inline mr-2" />
            Derived Keys
          </button>
          <button
            @click="activeTab = 'explorer'"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-t-lg transition-colors',
              activeTab === 'explorer'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            ]"
          >
            <BookOpen class="w-4 h-4 inline mr-2" />
            HD Path Explorer
          </button>
          <button
            @click="activeTab = 'education'"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-t-lg transition-colors',
              activeTab === 'education'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            ]"
          >
            <Info class="w-4 h-4 inline mr-2" />
            Education
          </button>
        </div>

        <!-- DERIVED KEYS TAB -->
        <div v-if="activeTab === 'derive' && results.length > 0" class="space-y-4">

          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">Multi-Chain Addresses</h2>
            <Button
              v-if="results.some(r => r.status === 'derived')"
              @click="downloadResults"
              variant="outline"
              size="sm"
            >
              <Download class="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              v-for="chain in results"
              :key="chain.name"
              :class="[
                'transition-all hover:shadow-md',
                chain.color,
                chain.status === 'coming-soon' ? 'opacity-60' : ''
              ]"
            >
              <CardHeader class="pb-3">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl">{{ chain.icon }}</span>
                    <div>
                      <CardTitle class="text-base">{{ chain.name }}</CardTitle>
                      <CardDescription class="text-xs">{{ chain.ticker }}</CardDescription>
                    </div>
                  </div>
                  <div v-if="chain.status === 'coming-soon'" class="text-xs bg-muted px-2 py-1 rounded">
                    Coming Soon
                  </div>
                  <div v-else-if="chain.status === 'partial'" class="text-xs bg-amber-500/20 px-2 py-1 rounded">
                    Partial
                  </div>
                  <Shield v-else class="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent class="space-y-3">

                <!-- Curve & Standard -->
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-muted-foreground">Curve:</span>
                    <span class="ml-1 font-mono font-medium">{{ chain.curve }}</span>
                  </div>
                  <div>
                    <span class="text-muted-foreground">Standard:</span>
                    <span class="ml-1 font-medium">{{ chain.derivationStandard }}</span>
                  </div>
                </div>

                <!-- Derivation Path -->
                <div>
                  <Label class="text-xs text-muted-foreground">Derivation Path</Label>
                  <div class="mt-1 p-2 bg-background/50 rounded font-mono text-xs break-all">
                    {{ chain.derivationPath }}
                  </div>
                </div>

                <!-- Address -->
                <div>
                  <div class="flex items-center justify-between">
                    <Label class="text-xs text-muted-foreground">Address</Label>
                    <button
                      v-if="chain.status === 'derived'"
                      @click="copyToClipboard(chain.address, 'Address')"
                      class="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <Copy class="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <div class="mt-1 p-2 bg-background/50 rounded font-mono text-xs break-all">
                    {{ chain.address }}
                  </div>
                  <p class="text-xs text-muted-foreground mt-1">{{ chain.addressEncoding }}</p>
                </div>

                <!-- Public Key -->
                <div>
                  <Label class="text-xs text-muted-foreground">Public Key</Label>
                  <div class="mt-1 p-2 bg-background/50 rounded font-mono text-xs break-all truncate">
                    {{ chain.publicKey }}
                  </div>
                </div>

                <!-- Private Key (hidden by default) -->
                <div v-if="chain.status === 'derived'">
                  <div class="flex items-center justify-between">
                    <Label class="text-xs text-muted-foreground">Private Key</Label>
                    <button
                      @click="copyToClipboard(chain.privateKey, 'Private Key')"
                      class="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <Copy class="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <div class="mt-1 p-2 bg-background/50 rounded font-mono text-xs break-all relative group">
                    <span
                      :class="showSensitive ? '' : 'blur-sm select-none'"
                      class="transition-all"
                    >
                      {{ chain.privateKey }}
                    </span>
                    <div v-if="!showSensitive" class="absolute inset-0 flex items-center justify-center">
                      <EyeOff class="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <!-- Notes -->
                <div v-if="chain.notes" class="pt-2 border-t border-border/50">
                  <p class="text-xs text-muted-foreground leading-relaxed">
                    {{ chain.notes }}
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>

        <!-- HD PATH EXPLORER TAB -->
        <div v-if="activeTab === 'explorer'" class="space-y-4">

          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">HD Path Explorer</h2>
            <select
              v-model="selectedChainForExplorer"
              @change="updateExplorer(selectedChainForExplorer)"
              class="flex h-9 w-48 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option
                v-for="chain in chainConfigs"
                :key="chain.id"
                :value="chain.id"
              >
                {{ chain.icon }} {{ chain.name }}
              </option>
            </select>
          </div>

          <Card>
            <CardContent class="pt-6">
              <div class="space-y-6">

                <!-- Visual Flow -->
                <div class="flex items-center justify-between gap-2 overflow-x-auto pb-4">

                  <div
                    v-for="(step, index) in explorerSteps"
                    :key="step.id"
                    class="flex items-center gap-2 flex-shrink-0"
                  >
                    <!-- Step Box -->
                    <div class="text-center">
                      <div
                        :class="[
                          'w-16 h-16 rounded-lg flex items-center justify-center text-2xl mb-2 transition-all',
                          selectedChainForExplorer === 'ethereum' && index === 0 ? 'bg-blue-500/20' :
                          selectedChainForExplorer === 'solana' && index === 0 ? 'bg-purple-500/20' :
                          'bg-primary/10'
                        ]"
                      >
                        <TreeDeciduous class="w-8 h-8 text-primary" />
                      </div>
                      <p class="text-xs font-medium">{{ step.label }}</p>
                    </div>

                    <!-- Arrow -->
                    <ArrowRight
                      v-if="index < explorerSteps.length - 1"
                      class="w-6 h-6 text-muted-foreground flex-shrink-0"
                    />
                  </div>

                </div>

                <!-- Step Details -->
                <div class="space-y-4">
                  <h3 class="font-semibold">Derivation Steps</h3>

                  <div
                    v-for="step in explorerSteps"
                    :key="step.id"
                    class="p-4 bg-muted/50 rounded-lg space-y-2"
                  >
                    <div class="flex items-start justify-between">
                      <div>
                        <h4 class="font-medium">{{ step.label }}</h4>
                        <p class="text-sm text-muted-foreground">{{ step.description }}</p>
                      </div>
                      <div class="text-right">
                        <span class="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {{ step.format }}
                        </span>
                      </div>
                    </div>
                    <div v-if="step.data" class="p-2 bg-background rounded font-mono text-sm">
                      {{ step.data }}
                    </div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

        </div>

        <!-- EDUCATION TAB -->
        <div v-if="activeTab === 'education'" class="space-y-4">

          <h2 class="text-xl font-semibold">Why Different Addresses?</h2>

          <p class="text-muted-foreground">
            Even though we started from <strong>one mnemonic</strong>, the resulting keys and
            addresses are completely different. Here's why:
          </p>

          <!-- Educational Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <!-- Curves -->
            <Card>
              <CardHeader>
                <CardTitle class="text-base flex items-center gap-2">
                  <div class="p-1 bg-blue-500/20 rounded">
                    <TreeDeciduous class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  Elliptic Curves
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <p class="text-sm text-muted-foreground">
                  Different chains use different mathematical curves for cryptography.
                  Keys cannot be "cast" between curves.
                </p>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between items-center">
                    <span>Ethereum / Cosmos / Bitcoin</span>
                    <code class="bg-muted px-1.5 py-0.5 rounded text-xs">secp256k1</code>
                  </div>
                  <div class="flex justify-between items-center">
                    <span>Solana / Sui / Aptos / NEAR</span>
                    <code class="bg-muted px-1.5 py-0.5 rounded text-xs">Ed25519</code>
                  </div>
                  <div class="flex justify-between items-center">
                    <span>Polkadot</span>
                    <code class="bg-muted px-1.5 py-0.5 rounded text-xs">Sr25519</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Derivation Paths -->
            <Card>
              <CardHeader>
                <CardTitle class="text-base flex items-center gap-2">
                  <div class="p-1 bg-amber-500/20 rounded">
                    <ArrowRight class="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  Derivation Paths
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <p class="text-sm text-muted-foreground">
                  BIP-44 paths isolate chains so you don't accidentally sign the wrong transaction.
                  Each path component has meaning.
                </p>
                <div class="space-y-2 text-xs">
                  <div class="p-2 bg-muted rounded">
                    <div class="font-mono">m / 44' / 60' / 0' / 0 / 0</div>
                    <div class="text-muted-foreground mt-1">
                      purpose / coin_type / account / change / index
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-1 text-xs">
                    <div>m</div><div class="text-muted-foreground">master key</div>
                    <div>44'</div><div class="text-muted-foreground">BIP-44</div>
                    <div>60'</div><div class="text-muted-foreground">Ethereum</div>
                    <div>0'</div><div class="text-muted-foreground">account #0</div>
                    <div>0</div><div class="text-muted-foreground">external (recv)</div>
                    <div>0</div><div class="text-muted-foreground">address #0</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Address Encoding -->
            <Card>
              <CardHeader>
                <CardTitle class="text-base flex items-center gap-2">
                  <div class="p-1 bg-emerald-500/20 rounded">
                    <Shield class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Address Encoding
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <p class="text-sm text-muted-foreground">
                  Public keys are hashed and encoded differently to create the final address string.
                </p>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between items-center">
                    <span>Ethereum</span>
                    <span class="text-xs text-muted-foreground">Hex (Keccak-256)</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span>Solana</span>
                    <span class="text-xs text-muted-foreground">Base58</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span>Cosmos</span>
                    <span class="text-xs text-muted-foreground">Bech32</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span>Bitcoin</span>
                    <span class="text-xs text-muted-foreground">Base58/Bech32</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span>Polkadot</span>
                    <span class="text-xs text-muted-foreground">SS58</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          <!-- Comparison Table -->
          <Card>
            <CardHeader>
              <CardTitle>Chain Comparison</CardTitle>
              <CardDescription>
                Quick reference for multi-chain wallet development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b">
                      <th class="text-left py-2 px-2 font-medium">Chain</th>
                      <th class="text-left py-2 px-2 font-medium">Curve</th>
                      <th class="text-left py-2 px-2 font-medium">BIP-44 Coin Type</th>
                      <th class="text-left py-2 px-2 font-medium">Address Encoding</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="chain in chainConfigs" :key="chain.id" class="border-b border-border/50">
                      <td class="py-2 px-2">{{ chain.icon }} {{ chain.name }}</td>
                      <td class="py-2 px-2 font-mono text-xs">{{ chain.curve }}</td>
                      <td class="py-2 px-2 font-mono text-xs">
                        {{ chain.id === 'ethereum' ? "60'" :
                           chain.id === 'bitcoin' ? "0'" :
                           chain.id === 'solana' ? "501'" :
                           chain.id === 'cosmos' ? "118'" :
                           chain.id === 'polkadot' ? 'N/A' :
                           chain.id === 'sui' ? "784'" :
                           chain.id === 'aptos' ? "637'" :
                           chain.id === 'near' ? "397'" : 'N/A' }}
                      </td>
                      <td class="py-2 px-2 text-xs text-muted-foreground">{{ chain.addressEncoding.split(' ')[0] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        </div>

        <!-- Empty State -->
        <Card v-if="results.length === 0" class="border-dashed">
          <CardContent class="pt-12 pb-12 text-center">
            <Key class="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 class="text-lg font-semibold mb-2">No Keys Generated</h3>
            <p class="text-sm text-muted-foreground mb-4">
              Generate a new wallet or import an existing mnemonic to see multi-chain addresses.
            </p>
            <Button @click="generateWallet" variant="default">
              <Sparkles class="w-4 h-4 mr-2" />
              Generate Wallet
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>

  </div>
</template>
