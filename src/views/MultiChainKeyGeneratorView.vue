<script setup lang="ts">
import { ref } from 'vue'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english.js'
import { HDKey } from '@scure/bip32'
import { sha256 } from '@noble/hashes/sha256'
import { ripemd160 } from '@noble/hashes/ripemd160'
import { keccak_256 } from '@noble/hashes/sha3'
import { bech32 } from 'bech32'
import { Button } from '@/components/ui/button'
import {  } from '@/components/ui/card'

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
}

const results = ref<ChainResult[]>([])

// Helper: convert Uint8Array to hex string
const toHex = (bytes: Uint8Array) => Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')

// Generate Ethereum address from public key
const getEthAddress = (publicKey: Uint8Array) => {
  // Uncompressed public key: first byte is 0x04, rest is X + Y coordinates
  // Remove the 0x04 prefix, then keccak256 hash the rest
  const pubKeyBytes = publicKey.length === 65 ? publicKey.slice(1) : publicKey
  const hash = keccak_256(pubKeyBytes)
  return '0x' + toHex(hash.slice(-20))
}

const generateMnemonic = () => {
  try {
    if (typeof window === 'undefined' || !window.crypto) {
      error.value = 'Crypto API not available. Please use a modern browser over HTTPS.'
      return
    }
    mnemonic.value = bip39.generateMnemonic(wordlist, 128)
    error.value = ''
    generateKeys()
  } catch (err: any) {
    console.error(err)
    error.value = 'Error generating mnemonic: ' + err.message
  }
}

const validateAndGenerate = () => {
  if (!bip39.validateMnemonic(mnemonic.value, wordlist)) {
    error.value = 'Invalid mnemonic phrase'
    return
  }
  error.value = ''
  generateKeys()
}

const getCosmosAddress = (pubKey: Uint8Array) => {
  const sha = sha256(pubKey)
  const rip = ripemd160(sha)
  const words = bech32.toWords(rip)
  return bech32.encode('cosmos', words)
}

const generateKeys = () => {
  try {
    const seed = bip39.mnemonicToSeedSync(mnemonic.value)
    const master = HDKey.fromMasterSeed(seed)
    const resultsList: ChainResult[] = []

    // 1. Ethereum (and EVM)
    const ethPath = "m/44'/60'/0'/0/0"
    const ethChild = master.derive(ethPath)
    if (ethChild.publicKey) {
      const ethAddress = getEthAddress(ethChild.publicKey)
      resultsList.push({
        name: 'Ethereum',
        ticker: 'ETH',
        address: ethAddress,
        privateKey: ethChild.privateKey ? toHex(ethChild.privateKey) : 'Unavailable',
        publicKey: toHex(ethChild.publicKey),
        path: ethPath,
        algo: 'Secp256k1',
        algoDesc: 'ECDSA on secp256k1 curve. Used by Bitcoin, Ethereum, Cosmos.',
        color: 'bg-blue-100 dark:bg-blue-900'
      })
    }

    // 2. Solana (BIP44 derivation path — note: real Solana uses SLIP-0010 Ed25519)
    const solPath = "m/44'/501'/0'/0'"
    const solChild = master.derive(solPath)
    if (solChild.publicKey) {
      resultsList.push({
        name: 'Solana',
        ticker: 'SOL',
        address: 'Requires SLIP-0010 Ed25519 derivation',
        privateKey: solChild.privateKey ? toHex(solChild.privateKey) : 'Unavailable',
        publicKey: toHex(solChild.publicKey),
        path: solPath,
        algo: 'Ed25519',
        algoDesc: 'EdDSA on Curve25519. Solana uses SLIP-0010 Ed25519 with specific derivation.',
        color: 'bg-indigo-100 dark:bg-indigo-900'
      })
    }

    // 3. Cosmos
    const cosmosPath = "m/44'/118'/0'/0/0"
    const cosmosChild = master.derive(cosmosPath)
    if (cosmosChild.publicKey) {
      const cosmosAddress = getCosmosAddress(cosmosChild.publicKey)
      resultsList.push({
        name: 'Cosmos',
        ticker: 'ATOM',
        address: cosmosAddress,
        privateKey: cosmosChild.privateKey ? toHex(cosmosChild.privateKey) : 'Unavailable',
        publicKey: toHex(cosmosChild.publicKey),
        path: cosmosPath,
        algo: 'Secp256k1',
        algoDesc: 'Same curve as Ethereum but using Bech32 address encoding.',
        color: 'bg-purple-100 dark:bg-purple-900'
      })
    }

    // 4. Bitcoin (Native SegWit)
    const btcPath = "m/84'/0'/0'/0/0"
    const btcChild = master.derive(btcPath)
    if (btcChild.publicKey) {
      resultsList.push({
        name: 'Bitcoin',
        ticker: 'BTC',
        address: 'Requires Bech32m encoding',
        privateKey: btcChild.privateKey ? toHex(btcChild.privateKey) : 'Unavailable',
        publicKey: toHex(btcChild.publicKey),
        path: btcPath,
        algo: 'Secp256k1',
        algoDesc: 'Native SegWit (BIP84). Uses Bech32m encoding for addresses.',
        color: 'bg-orange-100 dark:bg-orange-900'
      })
    }

    // 5. Polkadot
    resultsList.push({
      name: 'Polkadot',
      ticker: 'DOT',
      address: 'Requires Sr25519 WASM',
      privateKey: 'Requires @polkadot WASM',
      publicKey: 'Requires @polkadot WASM',
      path: '//polkadot',
      algo: 'Sr25519',
      algoDesc: 'Schnorr signatures on Ristretto group. Requires WASM initialization.',
      color: 'bg-pink-100 dark:bg-pink-900'
    })

    results.value = resultsList
    generated.value = true
  } catch (err: any) {
    console.error(err)
    error.value = 'Error generating keys: ' + err.message
  }
}

const reset = () => {
  mnemonic.value = ''
  error.value = ''
  results.value = []
  generated.value = false
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-6 bg-muted/30">
    <div class="prose dark:prose-invert max-w-none">
      <h1>Multi-Chain Key Generator</h1>
      <p class="text-slate-600 dark:text-slate-400">
        Generate keys and addresses for multiple blockchains from a single recovery phrase.
        Your keys never leave your browser.
      </p>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Mnemonic Phrase (Seed)
          </label>
          <textarea
            v-model="mnemonic"
            rows="3"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
            placeholder="Enter your 12 or 24 word phrase..."
          />
        </div>

        <div class="flex flex-wrap gap-3">
          <Button @click="generateMnemonic" aria-label="Generate new mnemonic">
            Generate Random
          </Button>
          <Button @click="validateAndGenerate" class="bg-emerald-600 hover:bg-emerald-700" aria-label="Calculate keys">
            Calculate Keys
          </Button>
          <Button @click="reset" variant="outline">Clear</Button>
        </div>

        <div
          v-if="error"
          class="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-md"
        >
          {{ error }}
        </div>
      </div>
    </div>

    <div v-if="generated" class="grid gap-4 md:grid-cols-1">
      <div
        v-for="chain in results"
        :key="chain.name"
        :class="['rounded-lg p-6 border', chain.color]"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold flex items-center gap-2">
              {{ chain.name }}
              <span class="text-xs bg-black/10 px-2 py-0.5 rounded">{{ chain.ticker }}</span>
            </h3>
            <p class="text-sm text-slate-700 dark:text-slate-300 mt-1">{{ chain.algo }}</p>
          </div>
        </div>

        <div class="space-y-3 text-sm font-mono break-all">
          <div>
            <div class="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Address</div>
            <div class="bg-white/50 dark:bg-black/20 p-2 rounded select-all">
              {{ chain.address }}
            </div>
          </div>
          <div>
            <div class="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Private Key</div>
            <div class="bg-white/50 dark:bg-black/20 p-2 rounded blur-sm hover:blur-none transition-all select-all">
              {{ chain.privateKey }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Derivation Path</div>
              <div class="bg-white/50 dark:bg-black/20 p-1.5 rounded">{{ chain.path }}</div>
            </div>
            <div>
              <div class="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Public Key</div>
              <div class="bg-white/50 dark:bg-black/20 p-1.5 rounded truncate">{{ chain.publicKey }}</div>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-black/10 dark:border-white/10">
            <p class="text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Algorithm:</strong> {{ chain.algoDesc }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!generated && !error" class="text-center text-muted-foreground py-8">
      Click <strong>Generate Random</strong> to create a new mnemonic, or paste an existing one and click <strong>Calculate Keys</strong>.
    </div>

    <!-- Educational Content -->
    <div class="max-w-4xl mx-auto w-full space-y-6">
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-6">
        <h2 class="text-xl font-bold mb-4">How Multi-Chain Wallets Work</h2>
        <div class="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            A multi-chain wallet generates keys and addresses for different blockchains from a single
            recovery phrase (mnemonic). This is possible because of BIP-39, BIP-32, and BIP-44 standards
            that define hierarchical deterministic (HD) key derivation.
          </p>

          <h3 class="text-lg font-bold mt-4">The BIP-39 Mnemonic Standard</h3>
          <p>
            BIP-39 generates a human-readable 12 or 24-word phrase from entropy. This phrase is the root
            of all keys — every blockchain address is deterministically derived from it. Lose this phrase
            and you lose access to all your wallets across every chain.
          </p>

          <h3 class="text-lg font-bold mt-4">Derivation Paths (BIP-44)</h3>
          <p>
            Each blockchain uses a specific derivation path to generate keys from the master seed.
            The path format is <code>m/purpose'/coin_type'/account'/change/address_index</code>:
          </p>
          <ul class="space-y-1">
            <li><strong>Ethereum:</strong> m/44'/60'/0'/0/0</li>
            <li><strong>Bitcoin:</strong> m/84'/0'/0'/0/0 (Native SegWit)</li>
            <li><strong>Solana:</strong> m/44'/501'/0'/0'</li>
            <li><strong>Cosmos:</strong> m/44'/118'/0'/0/0</li>
          </ul>

          <h3 class="text-lg font-bold mt-4">Different Curves for Different Chains</h3>
          <p>
            Not all blockchains use the same cryptography. Ethereum, Bitcoin, and Cosmos use
            <strong>secp256k1</strong> (ECDSA). Solana uses <strong>Ed25519</strong> (EdDSA).
            Polkadot uses <strong>Sr25519</strong> (Schnorr signatures). This is why some chains
            can share the same private key but others require different derivation methods.
          </p>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-6">
        <h2 class="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              Is it safe to use this tool?
            </summary>
            <p class="mt-2 text-muted-foreground">
              Yes — all key generation happens 100% in your browser using the Web Crypto API. Your mnemonic
              and private keys never leave your device. However, never paste a mnemonic from a wallet that
              holds real funds into any online tool.
            </p>
          </details>
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              Can I use one mnemonic for all blockchains?
            </summary>
            <p class="mt-2 text-muted-foreground">
              Yes. BIP-44 defines standard derivation paths for each blockchain. A single mnemonic can
              generate keys for Ethereum, Bitcoin, Solana, Cosmos, and many other chains. Each chain uses
              its own derivation path, so the addresses are different but all recoverable from the same phrase.
            </p>
          </details>
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              What is a derivation path?
            </summary>
            <p class="mt-2 text-muted-foreground">
              A derivation path (e.g., m/44'/60'/0'/0/0) tells the HD wallet algorithm which branch of the
              key tree to use. Think of it like a file path — different paths lead to different keys, but
              all originate from the same root (your mnemonic seed).
            </p>
          </details>
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              Why does Solana show "Requires SLIP-0010"?
            </summary>
            <p class="mt-2 text-muted-foreground">
              Solana uses Ed25519 signatures, which require SLIP-0010 derivation instead of BIP-32.
              The address generation needs a different cryptographic library. The private key shown here
              is derived via BIP-44 secp256k1 as a reference, but a real Solana wallet uses SLIP-0010.
            </p>
          </details>
        </div>
      </div>

      <!-- Related Tools -->
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-6">
        <h2 class="text-xl font-bold mb-4">Related Blockchain Tools</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <a href="/tools/address-checksum" class="text-primary hover:underline">Address Checksum (EIP-55)</a>
          <a href="/tools/keccak256" class="text-primary hover:underline">Keccak-256 Hasher</a>
          <a href="/tools/bip39" class="text-primary hover:underline">BIP39 Mnemonic Generator</a>
          <a href="/tools/evm-converter" class="text-primary hover:underline">EVM Unit Converter</a>
          <a href="/tools/abi-encoder" class="text-primary hover:underline">ABI Encoder &amp; Decoder</a>
          <a href="/tools/solidity-to-opcodes" class="text-primary hover:underline">Solidity to Opcodes</a>
        </div>
      </div>
    </div>
  </div>
</template>
