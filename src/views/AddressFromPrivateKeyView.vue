<script setup lang="ts">
import { ref } from 'vue'
import { privateKeyToAccount } from 'viem/accounts'
import { secp256k1 } from '@noble/curves/secp256k1'
// @ts-ignore
import { ripemd160 } from '@noble/hashes/legacy.js'
// @ts-ignore
import { sha256 } from '@noble/hashes/sha2.js'
import { Buffer } from 'buffer'
import { bech32 } from 'bech32'
import { Keypair } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

// Polyfill Buffer
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer
}

const privateKey = ref('')
const results = ref<any[]>([])
const error = ref('')

// Helpers
const toHex = (u8: Uint8Array) => Buffer.from(u8).toString('hex')

const calculateAddresses = async () => {
  try {
    results.value = []
    error.value = ''
    let pkInput = privateKey.value.trim()

    // Normalize input: remove 0x prefix if present
    const cleanHex = pkInput.startsWith('0x') ? pkInput.slice(2) : pkInput

    // Basic validation
    // We expect 32 bytes (64 hex chars) for secp256k1 keys usually
    // Solana keys (Ed25519) logic below
    if (cleanHex.length !== 64) {
      // We could support WIF here later, but for now strict hex
      throw new Error('Invalid private key length. Expecting 32 bytes (64 hex characters).')
    }

    const privKeyBytes = Buffer.from(cleanHex, 'hex')
    if (privKeyBytes.length !== 32) throw new Error('Invalid hex string')

    const chains = []

    // ----------------------------------------------------
    // 1. Ethereum / EVM (secp256k1)
    // ----------------------------------------------------
    try {
      const account = privateKeyToAccount(`0x${cleanHex}`)
      // Uncompressed pubkey (0x04...)
      const pubKeyUncompressed = secp256k1.getPublicKey(privKeyBytes, false)

      chains.push({
        name: 'Ethereum (EVM)',
        ticker: 'ETH',
        address: account.address,
        desc: 'Standard for ETH, BSC, Polygon, Optimism, Arbitrum, Base, etc.',
        color: 'bg-blue-100 dark:bg-blue-900',
        publicKey: toHex(pubKeyUncompressed)
      })
    } catch (e) {
      console.error('ETH fail', e)
    }

    // ----------------------------------------------------
    // 2. Bitcoin (Legacy & Segwit)
    // ----------------------------------------------------
    // Bitcoin uses Compressed Public Key usually for modern addresses
    try {
      const pubKeyCompressed = secp256k1.getPublicKey(privKeyBytes, true)
      const sha = sha256(pubKeyCompressed)
      const rip = ripemd160(sha)

      // Bech32 (Segwit) - P2WPKH
      // Prefix 'bc'
      const words = bech32.toWords(rip)
      // version 0 for P2WPKH
      const wordsWithVersion = [0, ...words]
      const btcSegwit = bech32.encode('bc', wordsWithVersion)

      // Legacy (Base58) - P2PKH
      // Not implementing Base58Check manually right now to save complexity/deps if @solana/web3 doesn't export generic bs58.
      // But Segwit is good enough for modern needs.

      chains.push({
        name: 'Bitcoin (SegWit)',
        ticker: 'BTC',
        address: btcSegwit,
        desc: 'Native SegWit (Bech32). Starts with bc1q.',
        color: 'bg-orange-100 dark:bg-orange-900',
        publicKey: toHex(pubKeyCompressed)
      })
    } catch (e) {
      console.error('BTC fail', e)
    }

    // ----------------------------------------------------
    // 3. Cosmos (ATOM)
    // ----------------------------------------------------
    try {
      const pubKeyCompressed = secp256k1.getPublicKey(privKeyBytes, true)
      const sha = sha256(pubKeyCompressed)
      const rip = ripemd160(sha)
      const words = bech32.toWords(rip)
      const atomAddr = bech32.encode('cosmos', words)

      chains.push({
        name: 'Cosmos',
        ticker: 'ATOM',
        address: atomAddr,
        desc: 'Cosmos Hub address (Bech32).',
        color: 'bg-indigo-100 dark:bg-indigo-900',
        publicKey: toHex(pubKeyCompressed)
      })
    } catch (e) {
      console.error('Cosmos fail', e)
    }

    // ----------------------------------------------------
    // 4. Solana (Ed25519) - TREATING INPUT AS SEED
    // ----------------------------------------------------
    try {
      // If we treat the 32 bytes as a SEED for Ed25519
      const keypair = Keypair.fromSeed(privKeyBytes)

      chains.push({
        name: 'Solana (from Seed)',
        ticker: 'SOL',
        address: keypair.publicKey.toBase58(),
        desc: 'Derived treating the input 32 bytes as an Ed25519 SEED.',
        color: 'bg-purple-100 dark:bg-purple-900',
        publicKey: keypair.publicKey.toBase58()
      })
    } catch (e) {
      console.error('SOL fail', e)
    }

    // ----------------------------------------------------
    // 5. Tron (TRX)
    // ----------------------------------------------------
    // Tron Address = Base58Check(0x41 + last 20 bytes of Keccak-256(pubKey))
    // We need base58check. @solana/web3.js uses bs58 internally but doesn't expose generic encode with checksum maybe?
    // Let's see if we can do a quick implementation or skip.
    // Actually we can implement Base58Check easily using sha256.
    try {
      // 1. Get PubKey (uncompressed, drop 04 prefix)
      const pubKeyUncompressed = secp256k1.getPublicKey(privKeyBytes, false)
      const pubKeyStart = pubKeyUncompressed.slice(1) // Drop 0x04

      // 2. Keccak-256
      const { keccak256 } = await import('viem')
      // viem keccak256 takes hex string or bytes
      const hash = keccak256(pubKeyStart) // returns 0x string

      // 3. Last 20 bytes
      const last20 = hash.slice(-40) // last 20 hex chars (40 chars)

      // 4. Add prefix 41
      const inputHex = '41' + last20
      const inputBytes = Buffer.from(inputHex, 'hex')

      // 5. Double SHA256 for checksum
      const h1 = sha256(inputBytes)
      const h2 = sha256(h1)
      const checksum = h2.slice(0, 4)

      // 6. Append checksum
      const finalBytes = Buffer.concat([inputBytes, checksum])

      // 7. Base58 Encode
      // We need a base58 encoder. Solana web3 uses bs58 but might not expose 'encode'.
      // Let's use a simple inline impl or try to find one.
      // Actually, bitcoinjs-lib is not here.
      // 'bs58' is a common transitive dependency.
      // Let's check `node_modules` via import if possible?
      // Risky without knowing exact path.
      // Wait, `MultiChainKeyGeneratorView` used `Keypair.fromSeed`.
      // Let's use a simple base58 implementation since we only need encode.

      const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
      const base58Encode = (buffer: Uint8Array) => {
        let carry: number
        const digits: number[] = [0]
        for (let i = 0; i < buffer.length; i++) {
          for (let j = 0; j < digits.length; j++) digits[j]! <<= 8
          digits[0]! += buffer[i]!
          carry = 0
          for (let j = 0; j < digits.length; ++j) {
            digits[j]! += carry
            carry = (digits[j]! / 58) | 0
            digits[j]! %= 58
          }
          while (carry) {
            digits.push(carry % 58)
            carry = (carry / 58) | 0
          }
        }
        let str = ''
        for (let i = 0; i < buffer.length && buffer[i] === 0; i++) str += '1'
        for (let i = digits.length - 1; i >= 0; i--) str += ALPHABET[digits[i]!]
        return str
      }

      const tronAddress = base58Encode(finalBytes)

      chains.push({
        name: 'Tron',
        ticker: 'TRX',
        address: tronAddress,
        desc: 'EVM-compatible keys, Base58Check encoded (starts with T).',
        color: 'bg-red-100 dark:bg-red-900',
        publicKey: toHex(pubKeyUncompressed)
      })
    } catch (e) {
      console.error('Tron fail', e)
    }

    results.value = chains
  } catch (err: any) {
    console.error(err)
    error.value = err.message || 'Invalid Private Key'
    results.value = []
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-6 gap-6 overflow-y-auto bg-muted/30">
    <div class="prose dark:prose-invert max-w-none">
      <h1>Address from Private Key (Multi-Chain)</h1>
      <p class="text-slate-600 dark:text-slate-400">
        Enter a 32-byte raw private key (hex) to derive valid addresses for multiple blockchains.
        <br />
        <span class="text-xs text-muted-foreground"
          >Since many chains share elliptic curves (secp256k1), the same private key corresponds to
          valid addresses on all of them.</span
        >
      </p>
      <div
        class="p-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 text-amber-700 dark:text-amber-400 text-sm"
      >
        <strong>Security Warning:</strong> This tool runs 100% in your browser. Keys are never sent
        to any server. However, do not paste keys that hold real value. Use for testing/recovery
        only.
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Input Column -->
      <div class="lg:col-span-1 space-y-6">
        <div
          class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Input Key</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Private Key (Hex)
              </label>
              <div class="relative">
                <input
                  v-model="privateKey"
                  type="text"
                  class="w-full font-mono rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  placeholder="e.g. 4f3a..."
                  @input="error = ''"
                />
              </div>
              <p class="text-xs text-slate-500 mt-1">Enter 64 hex characters (32 bytes).</p>
            </div>

            <Button
              @click="calculateAddresses"
              class="w-full"
            >
              Derive Addresses
            </Button>

            <div
              v-if="error"
              class="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-800"
            >
              {{ error }}
            </div>
          </div>
        </div>
      </div>

      <!-- Results Column -->
      <div class="lg:col-span-2 space-y-4">
        <h2 class="text-xl font-bold flex items-center gap-2">
          Derived Addresses
          <span
            v-if="results.length"
            class="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
            >{{ results.length }} Found</span
          >
        </h2>

        <div
          v-if="results.length === 0 && !error"
          class="text-slate-400 italic py-8 text-center border-2 border-dashed rounded-lg"
        >
          Enter a key to see addresses.
        </div>

        <div
          v-for="chain in results"
          :key="chain.name"
          :class="[
            'relative rounded-lg p-5 border transition-all',
            chain.color,
            'border-black/5 dark:border-white/5'
          ]"
        >
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
            <div>
              <h3 class="font-bold text-lg flex items-center gap-2">
                {{ chain.name }}
                <span
                  class="text-xs font-mono bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded"
                  >{{ chain.ticker }}</span
                >
              </h3>
              <p class="text-xs opacity-75 max-w-sm">{{ chain.desc }}</p>
            </div>
          </div>

          <div class="mt-4 space-y-3">
            <div>
              <div class="text-[10px] uppercase font-bold opacity-60 mb-1">Address</div>
              <div
                class="font-mono text-base break-all bg-white/60 dark:bg-black/20 p-2.5 rounded select-all border border-black/5 dark:border-white/5"
              >
                {{ chain.address }}
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="text-[10px] uppercase font-bold opacity-60 mb-1">Public Key</div>
                <div
                  class="font-mono text-xs break-all bg-white/40 dark:bg-black/10 p-1.5 rounded select-all truncate"
                >
                  {{ chain.publicKey }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
