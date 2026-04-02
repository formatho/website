<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
import { Buffer } from 'buffer'
import { secp256k1 } from '@noble/curves/secp256k1'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useTwins } from '@/composables/useTwins'

const { summonTwin } = useTwins()

// Polyfill Buffer for browser environment
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer
}

const mnemonic = ref('')
const error = ref('')
const generated = ref(false)

interface ChainResult {
  name: string
  ticker: string
  address: string
  privateKey: string
  publicKey: string
  path: string
  algo: string
  algoDesc: string
  color: string
  pubKeyLabel?: string
}

const results = ref<ChainResult[]>([])

const generateMnemonic = () => {
  try {
    mnemonic.value = bip39.generateMnemonic()
    error.value = ''
    generateKeys() // Auto generate
  } catch (err: any) {
    console.error(err)
    error.value = 'Error generating mnemonic: ' + err.message
  }
}

const validateAndGenerate = () => {
  if (!bip39.validateMnemonic(mnemonic.value)) {
    error.value = 'Invalid mnemonic phrase'
    return
  }
  error.value = ''
  generateKeys()
}

const getCosmosAddress = (privKeyHex: string) => {
  // privKeyHex is '0x...' or just hex
  const privKeyBytes = Buffer.from(privKeyHex.replace('0x', ''), 'hex')
  const pubKey = secp256k1.getPublicKey(privKeyBytes, true) // Compressed
  const sha = sha256(pubKey)
  const rip = ripemd160(sha)
  const words = bech32.toWords(rip)
  return bech32.encode('cosmos', words)
}

const getPolkadotAddress = (mnemonicStr: string) => {
  // Polkadot standard derivation
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 })
  const pair = keyring.addFromUri(mnemonicStr)
  return {
    address: pair.address,
    publicKey: Buffer.from(pair.publicKey).toString('hex'),
    seed: 'Protected (Seed derived)'
  }
}

const generateKeys = async () => {
  try {
    const seed = await bip39.mnemonicToSeed(mnemonic.value)
    const resultsList: ChainResult[] = []

    // 1. Ethereum (and EVM)
    // Path: m/44'/60'/0'/0/0
    const ethPath = "m/44'/60'/0'/0/0"
    const ethAccount = mnemonicToAccount(mnemonic.value, { path: ethPath as any })

    // Use viem's HDKey to get raw private key explicitly for display
    const { HDKey } = await import('viem/accounts')
    const rootHdKey = HDKey.fromMasterSeed(seed)

    const ethChild = rootHdKey.derive(ethPath)
    let ethPrivKey = 'Unavailable'
    let ethPubKey = 'Unavailable'
    if (ethChild.privateKey) {
      ethPrivKey = Buffer.from(ethChild.privateKey).toString('hex')
      // Get uncompressed public key (65 bytes, starts with 04) for clearer relationship to address
      const pubKeyBytes = secp256k1.getPublicKey(ethChild.privateKey, false)
      ethPubKey = Buffer.from(pubKeyBytes).toString('hex')
    }

    resultsList.push({
      name: 'Ethereum',
      ticker: 'ETH',
      address: ethAccount.address,
      privateKey: ethPrivKey,
      publicKey: ethPubKey,
      path: ethPath,
      algo: 'Secp256k1',
      algoDesc:
        'ECDSA (Elliptic Curve Digital Signature Algorithm) on secp256k1 curve. Used by Bitcoin, Ethereum, Cosmos.',
      color: 'bg-blue-100 dark:bg-blue-900',
      pubKeyLabel: 'Public Key (Uncompressed)'
    })

    // 2. Solana
    // Path: m/44'/501'/0'/0'
    const solPath = "m/44'/501'/0'/0'"
    const derivedSeed = derivePath(solPath, seed.toString('hex')).key
    const solKeypair = Keypair.fromSeed(derivedSeed)
    resultsList.push({
      name: 'Solana',
      ticker: 'SOL',
      address: solKeypair.publicKey.toBase58(),
      privateKey: Buffer.from(solKeypair.secretKey).toString('hex'),
      publicKey: solKeypair.publicKey.toBase58(),
      path: solPath,
      algo: 'Ed25519',
      algoDesc:
        'Edwards-curve Digital Signature Algorithm (EdDSA) using SHA-512 and Curve25519. Designed for high speed and security.',
      color: 'bg-indigo-100 dark:bg-indigo-900',
      pubKeyLabel: 'Public Key (Base58)'
    })

    // 3. Cosmos
    // Path: m/44'/118'/0'/0/0
    const cosmosPath = "m/44'/118'/0'/0/0"
    const cosmosChild = rootHdKey.derive(cosmosPath)
    if (cosmosChild.privateKey && cosmosChild.publicKey) {
      const cosmosPriv = Buffer.from(cosmosChild.privateKey).toString('hex')
      resultsList.push({
        name: 'Cosmos',
        ticker: 'ATOM',
        address: getCosmosAddress(cosmosPriv),
        privateKey: cosmosPriv,
        publicKey: Buffer.from(cosmosChild.publicKey).toString('hex'),
        path: cosmosPath,
        algo: 'Secp256k1',
        algoDesc:
          'Same curve as Ethereum (secp256k1) but using Bech32 address encoding and different derivation path.',
        color: 'bg-purple-100 dark:bg-purple-900',
        pubKeyLabel: 'Public Key (Compressed)'
      })
    }

    // 4. Polkadot
    const polkadotInfo = getPolkadotAddress(mnemonic.value)
    resultsList.push({
      name: 'Polkadot',
      ticker: 'DOT',
      address: polkadotInfo.address,
      privateKey: polkadotInfo.seed,
      publicKey: polkadotInfo.publicKey,
      path: '<mnemonic>', // Direct derivation
      algo: 'Sr25519',
      algoDesc:
        'Schnorr signatures on Ristretto group (Schnorrkel). Variant of Ed25519 offering better derivation properties and HD support.',
      color: 'bg-pink-100 dark:bg-pink-900',
      pubKeyLabel: 'Public Key (Hex)'
    })

    resultsList.push({
      name: 'Cardano',
      ticker: 'ADA',
      address: 'Requires WASM Lib',
      privateKey: 'Unavailable',
      publicKey: 'Unavailable',
      path: "m/1852'/1815'/0'/0/0",
      algo: 'Ed25519 (Extended)',
      algoDesc:
        'Uses BIP32-Ed25519 (Khovratovich/Law). Keys are extended (64-byte private + 32-byte chain code). Address generation requires complex hashing and attributes.',
      color: 'bg-teal-100 dark:bg-teal-900',
      pubKeyLabel: 'Public Key'
    })

    results.value = resultsList
    generated.value = true
    
    // Summon Morpho on successful key generation
    summonTwin('morpho', 'Architecture compiled. Keys generated.', 'multichain-keys-success', {
      x: 'right',
      y: 80
    })
  } catch (err: any) {
    console.error(err)
    error.value = 'Error generating keys: ' + err.message
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-6 gap-6 overflow-y-auto bg-muted/30">
    <div class="prose dark:prose-invert max-w-none">
      <h1>Multi-Chain Key Generator</h1>
      <p class="text-slate-600 dark:text-slate-400">
        Generate keys and addresses for multiple blockchains from a single recovery phrase. Note:
        This tool runs entirely in your browser. Your keys never leave this device.
      </p>
    </div>

    <div
      class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Mnemonic Phrase (Seed)
          </label>
          <div class="relative">
            <CodeEditor
              v-model="mnemonic"
              language="plaintext"
              class="min-h-[80px]"
              placeholder="Enter your 12 or 24 word phrase..."
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <Button
            @click="generateMnemonic" aria-label="Generate new mnemonic"
          >
            Generate Random
          </Button>
          <Button
            @click="validateAndGenerate" aria-label="Validate and generate keys"
            class="bg-emerald-600 hover:bg-emerald-700"
          >
            Calculate Keys
          </Button>
        </div>

        <div
          v-if="error"
          class="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-md"
        >
          {{ error }}
        </div>
      </div>
    </div>

    <div v-if="generated" class="grid gap-6 md:grid-cols-1">
      <div
        v-for="chain in results"
        :key="chain.name"
        :class="[
          'relative rounded-lg p-6 border transition-colors',
          chain.color,
          'border-current border-opacity-20'
        ]"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold dark:text-slate-100 flex items-center gap-2">
              {{ chain.name }}
              <span class="text-xs bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded">{{
                chain.ticker
              }}</span>
            </h3>
            <p class="text-sm opacity-80 mt-1">{{ chain.algo }}</p>
          </div>
        </div>

        <div class="space-y-4 text-sm font-mono break-all">
          <div>
            <div class="text-xs uppercase font-bold opacity-60 mb-1">Address</div>
            <div class="bg-white/50 dark:bg-black/20 p-2 rounded select-all">
              {{ chain.address }}
            </div>
          </div>

          <div>
            <div class="text-xs uppercase font-bold opacity-60 mb-1">Private Key</div>
            <div class="group relative">
              <div
                class="bg-white/50 dark:bg-black/20 p-2 rounded blur-sm group-hover:blur-none transition-all select-all overflow-hidden text-ellipsis"
              >
                {{ chain.privateKey }}
              </div>
              <div
                class="absolute inset-0 flex items-center justify-center text-xs opacity-60 group-hover:opacity-0 pointer-events-none"
              >
                Hover to reveal
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div class="text-xs uppercase font-bold opacity-60 mb-1">Derivation Path</div>
              <div class="bg-white/50 dark:bg-black/20 p-1.5 rounded">{{ chain.path }}</div>
            </div>
            <div>
              <div class="text-xs uppercase font-bold opacity-60 mb-1">
                {{ chain.pubKeyLabel || 'Public Key' }}
              </div>
              <div class="bg-white/50 dark:bg-black/20 p-1.5 rounded truncate">
                {{ chain.publicKey }}
              </div>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
            <p class="text-xs font-sans opacity-90 leading-relaxed">
              <strong>Algorithm:</strong> {{ chain.algoDesc }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 space-y-6">
      <div class="border-t border-border pt-8">
        <h2 class="text-2xl font-bold mb-4">How do they differ?</h2>
        <p class="text-muted-foreground mb-6">
          Even though we started from <strong class="text-foreground">one mnemonic</strong>, the
          resulting keys and addresses are completely different.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- Elliptic Curves -->
        <div class="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
          <h3 class="font-semibold text-lg flex items-center gap-2 mb-3">
            <span class="p-1 bg-blue-100 dark:bg-blue-900 rounded text-blue-600 dark:text-blue-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                />
                <path d="m2 12 5-5 5 5 5-5 5 5" />
              </svg>
            </span>
            Elliptic Curves
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Different chains use different mathematical curves for cryptography. You cannot simple
            "cast" keys between them.
          </p>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between">
              <span>Ethereum / Cosmos</span>
              <code class="bg-muted px-1.5 py-0.5 rounded">secp256k1</code>
            </li>
            <li class="flex justify-between">
              <span>Solana</span>
              <code class="bg-muted px-1.5 py-0.5 rounded">Ed25519</code>
            </li>
            <li class="flex justify-between">
              <span>Polkadot</span>
              <code class="bg-muted px-1.5 py-0.5 rounded">Sr25519</code>
            </li>
          </ul>
        </div>

        <!-- Derivation Paths -->
        <div class="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
          <h3 class="font-semibold text-lg flex items-center gap-2 mb-3">
            <span
              class="p-1 bg-amber-100 dark:bg-amber-900 rounded text-amber-600 dark:text-amber-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="M6 12h.01" />
                <path d="M10 12h.01" />
                <path d="M14 12h.01" />
                <path d="M18 12h.01" />
              </svg>
            </span>
            Derivation Paths (BIP-44)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Wallets use a "path" to deterministically generate keys. This isolates chains so you
            don't accidentally sign the wrong transaction.
          </p>
          <ul class="space-y-2 text-sm">
            <li class="flex flex-col gap-1">
              <span class="text-xs font-semibold opacity-70">Ethereum</span>
              <code class="bg-muted px-1.5 py-0.5 rounded w-fit">m/44'/60'/0'/0/0</code>
            </li>
            <li class="flex flex-col gap-1">
              <span class="text-xs font-semibold opacity-70">Solana</span>
              <code class="bg-muted px-1.5 py-0.5 rounded w-fit">m/44'/501'/0'/0'</code>
            </li>
            <li class="flex flex-col gap-1">
              <span class="text-xs font-semibold opacity-70">Cardano</span>
              <code class="bg-muted px-1.5 py-0.5 rounded w-fit">m/1852'/1815'/0'/0/0</code>
            </li>
          </ul>
        </div>

        <!-- Address Formats -->
        <div class="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
          <h3 class="font-semibold text-lg flex items-center gap-2 mb-3">
            <span
              class="p-1 bg-emerald-100 dark:bg-emerald-900 rounded text-emerald-600 dark:text-emerald-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                />
              </svg>
            </span>
            Address Formats
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Public keys are hashed and encoded differently to create the final address string.
          </p>
          <div class="space-y-3 text-sm">
            <div>
              <div class="font-medium mb-1">Ethereum</div>
              <div class="text-xs text-muted-foreground">
                Last 20 bytes of Keccak-256 hash (Hex)
              </div>
            </div>
            <div>
              <div class="font-medium mb-1">Solana</div>
              <div class="text-xs text-muted-foreground">Base58 encoding of Ed25519 public key</div>
            </div>
            <div>
              <div class="font-medium mb-1">Cosmos</div>
              <div class="text-xs text-muted-foreground">
                Bech32 encoding of SHA-256 + RIPEMD-160
              </div>
            </div>
            <div>
              <div class="font-medium mb-1">Cardano</div>
              <div class="text-xs text-muted-foreground">
                Bech32 (addr1) with extended attributes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
