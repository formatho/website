<script setup lang="ts">
import { ref } from 'vue'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english.js'
import { HDKey } from '@scure/bip32'
import { sha256 } from '@noble/hashes/sha256'
import { ripemd160 } from '@noble/hashes/ripemd160'
import { bech32 } from 'bech32'
import { mnemonicToAccount } from 'viem/accounts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

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

// Helper: convert Uint8Array to hex string (no Buffer dependency)
const toHex = (bytes: Uint8Array) => Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')

const generateMnemonic = () => {
  try {
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
    const ethAccount = mnemonicToAccount(mnemonic.value, { path: ethPath } as any)
    const ethChild = master.derive(ethPath)
    resultsList.push({
      name: 'Ethereum',
      ticker: 'ETH',
      address: ethAccount.address,
      privateKey: ethChild.privateKey ? toHex(ethChild.privateKey) : 'Unavailable',
      publicKey: ethChild.publicKey ? toHex(ethChild.publicKey) : 'Unavailable',
      path: ethPath,
      algo: 'Secp256k1',
      algoDesc: 'ECDSA on secp256k1 curve. Used by Bitcoin, Ethereum, Cosmos.',
      color: 'bg-blue-100 dark:bg-blue-900'
    })

    // 2. Solana (BIP44 derivation)
    const solPath = "m/44'/501'/0'/0'"
    const solChild = master.derive(solPath)
    resultsList.push({
      name: 'Solana',
      ticker: 'SOL',
      address: 'Requires Ed25519 (see note)',
      privateKey: solChild.privateKey ? toHex(solChild.privateKey) : 'Unavailable',
      publicKey: solChild.publicKey ? toHex(solChild.publicKey) : 'Unavailable',
      path: solPath,
      algo: 'Ed25519',
      algoDesc: 'EdDSA on Curve25519. Solana uses Ed25519 with specific SLIP-0010 derivation.',
      color: 'bg-indigo-100 dark:bg-indigo-900'
    })

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
    resultsList.push({
      name: 'Bitcoin',
      ticker: 'BTC',
      address: 'Requires Bech32m encoding (see note)',
      privateKey: btcChild.privateKey ? toHex(btcChild.privateKey) : 'Unavailable',
      publicKey: btcChild.publicKey ? toHex(btcChild.publicKey) : 'Unavailable',
      path: btcPath,
      algo: 'Secp256k1',
      algoDesc: 'Native SegWit (BIP84). Uses Bech32m encoding for addresses.',
      color: 'bg-orange-100 dark:bg-orange-900'
    })

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
            <p class="text-sm opacity-80 mt-1">{{ chain.algo }}</p>
          </div>
        </div>

        <div class="space-y-3 text-sm font-mono break-all">
          <div>
            <div class="text-xs uppercase font-bold opacity-60 mb-1">Address</div>
            <div class="bg-white/50 dark:bg-black/20 p-2 rounded select-all">
              {{ chain.address }}
            </div>
          </div>
          <div>
            <div class="text-xs uppercase font-bold opacity-60 mb-1">Private Key</div>
            <div class="bg-white/50 dark:bg-black/20 p-2 rounded blur-sm hover:blur-none transition-all select-all">
              {{ chain.privateKey }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-xs uppercase font-bold opacity-60 mb-1">Derivation Path</div>
              <div class="bg-white/50 dark:bg-black/20 p-1.5 rounded">{{ chain.path }}</div>
            </div>
            <div>
              <div class="text-xs uppercase font-bold opacity-60 mb-1">Public Key</div>
              <div class="bg-white/50 dark:bg-black/20 p-1.5 rounded truncate">{{ chain.publicKey }}</div>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-black/10 dark:border-white/10">
            <p class="text-xs font-sans opacity-90 leading-relaxed">
              <strong>Algorithm:</strong> {{ chain.algoDesc }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!generated && !error" class="text-center text-muted-foreground py-8">
      Click <strong>Generate Random</strong> to create a new mnemonic, or paste an existing one and click <strong>Calculate Keys</strong>.
    </div>
  </div>
</template>
