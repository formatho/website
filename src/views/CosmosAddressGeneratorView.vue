<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { generateMnemonic as scureGenerateMnemonic, mnemonicToSeedSync, validateMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english.js'
import { HDKey } from '@scure/bip32'
import { sha256 } from '@noble/hashes/sha256'
import { ripemd160 } from '@noble/hashes/ripemd160'
import { keccak_256 } from '@noble/hashes/sha3'
import { secp256k1 } from '@noble/curves/secp256k1.js'
import { bech32 } from 'bech32'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Chain = {
  value: string
  label: string
  prefix: string
  coinType: number
}

const chains: Chain[] = [
  { value: 'cosmos', label: 'Cosmos Hub (ATOM)', prefix: 'cosmos', coinType: 118 },
  { value: 'osmo', label: 'Osmosis (OSMO)', prefix: 'osmo', coinType: 100118 },
  { value: 'juno', label: 'Juno (JUNO)', prefix: 'juno', coinType: 118 },
  { value: 'secret', label: 'Secret Network (SCRT)', prefix: 'secret', coinType: 529 },
  { value: 'stars', label: 'Stargaze (STARS)', prefix: 'stars', coinType: 118 },
  { value: 'akash', label: 'Akash Network (AKT)', prefix: 'akash', coinType: 118 },
  { value: 'kava', label: 'Kava (KAVA)', prefix: 'kava', coinType: 459 },
  { value: 'injective', label: 'Injective (INJ)', prefix: 'inj', coinType: 60 },
  { value: 'cre', label: 'Crescent (CRE)', prefix: 'cre', coinType: 118 },
  { value: 'umee', label: 'Umee (UMEE)', prefix: 'umee', coinType: 118 },
]

const COIN_TYPE_ALGO: Record<number, 'secp256k1' | 'eth_secp256k1'> = {
  118: 'secp256k1',
  100118: 'secp256k1',
  529: 'secp256k1',
  459: 'secp256k1',
  60: 'eth_secp256k1',
}

const wordCount = ref<number>(12)
const mnemonic = ref('')
const passphrase = ref('')
const selectedChainValue = ref('cosmos')
const accountIndex = ref(0)
const isReady = ref(false)

const selectedChain = computed(() => chains.find(c => c.value === selectedChainValue.value) ?? chains[0])

interface DerivedResult {
  path: string
  privateKey: string
  publicKey: string
  address: string
}

const results = ref<DerivedResult | null>(null)
const multiChainResults = ref<{ chain: string; prefix: string; address: string }[]>([])
const errorMsg = ref('')
const isValid = computed(() => mnemonic.value ? validateMnemonic(mnemonic.value as any, wordlist as any) : false)

function doGenerateMnemonic() {
  const strength = wordCount.value === 12 ? 128 : wordCount.value === 15 ? 160 : wordCount.value === 18 ? 192 : wordCount.value === 21 ? 224 : 256
  mnemonic.value = scureGenerateMnemonic(wordlist as any, strength as any)
  deriveAll()
}

function deriveAll() {
  errorMsg.value = ''
  results.value = null
  multiChainResults.value = []

  if (!mnemonic.value) return

  if (!validateMnemonic(mnemonic.value as any, wordlist as any)) {
    errorMsg.value = 'Invalid BIP39 mnemonic — check your seed phrase.'
    return
  }

  try {
    const seed = mnemonicToSeedSync(mnemonic.value as any, passphrase.value)
    const master = HDKey.fromMasterSeed(seed)
    const chain = selectedChain.value
    const algo = COIN_TYPE_ALGO[chain.coinType] ?? 'secp256k1'

    // BIP44 path: m/44'/coinType'/0'/0/accountIndex
    const path = `m/44'/${chain.coinType}'/0'/0/${accountIndex.value}`
    const child = master.derive(path)

    if (!child.privateKey) {
      errorMsg.value = 'Failed to derive private key.'
      return
    }

    const privHex = Array.from(child.privateKey).map(b => b.toString(16).padStart(2, '0')).join('')

    // Public key — compressed secp256k1
    let pubHex: string
    let addressBytes: Uint8Array

    if (algo === 'eth_secp256k1') {
      // Ethereum-style: keccak256(uncompressed pubKey without prefix)[12:32]
      const pubPoint = secp256k1.ProjectivePoint.fromPrivateKey(privHex)
      const uncompressedBytes = pubPoint.toRawBytes(false) // 65 bytes with 0x04 prefix
      const hash = keccak_256(uncompressedBytes.slice(1)) // drop prefix
      addressBytes = hash.slice(12)
      const pubCompressed = child.publicKey
      pubHex = pubCompressed ? Array.from(pubCompressed).map(b => b.toString(16).padStart(2, '0')).join('') : ''
    } else {
      // Standard Cosmos: ripemd160(sha256(compressed_pubkey))
      const pubCompressed = child.publicKey
      if (!pubCompressed) {
        errorMsg.value = 'Failed to derive public key.'
        return
      }
      pubHex = Array.from(pubCompressed).map(b => b.toString(16).padStart(2, '0')).join('')
      const sha = sha256(pubCompressed)
      addressBytes = ripemd160(sha)
    }

    // Bech32 encode
    const words = bech32.toWords(addressBytes)
    const address = bech32.encode(chain.prefix, words)

    results.value = {
      path,
      privateKey: privHex,
      publicKey: pubHex,
      address,
    }

    // Generate addresses for all chains from the same mnemonic
    for (const c of chains) {
      try {
        const cAlgo = COIN_TYPE_ALGO[c.coinType] ?? 'secp256k1'
        const cPath = `m/44'/${c.coinType}'/0'/0/${accountIndex.value}`
        const cChild = master.derive(cPath)
        if (!cChild.privateKey || !cChild.publicKey) continue

        let cAddressBytes: Uint8Array
        if (cAlgo === 'eth_secp256k1') {
          const cPrivHex = Array.from(cChild.privateKey).map(b => b.toString(16).padStart(2, '0')).join('')
          const cPubPoint = secp256k1.ProjectivePoint.fromPrivateKey(cPrivHex)
          const cUncompressed = cPubPoint.toRawBytes(false)
          const cHash = keccak_256(cUncompressed.slice(1))
          cAddressBytes = cHash.slice(12)
        } else {
          const sha = sha256(cChild.publicKey)
          cAddressBytes = ripemd160(sha)
        }

        const cWords = bech32.toWords(cAddressBytes)
        const cAddress = bech32.encode(c.prefix, cWords)
        multiChainResults.value.push({ chain: c.label, prefix: c.prefix, address: cAddress })
      } catch {
        // skip chains that fail
      }
    }
  } catch (err) {
    errorMsg.value = `Derivation failed: ${(err as Error).message}`
  }
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

onMounted(() => {
  isReady.value = true
})
</script>

<template>
  <div class="container mx-auto p-6 max-w-6xl">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-2">🌌 Cosmos Address Generator</h1>
      <p class="text-lg text-muted-foreground">
        Generate real Cosmos blockchain addresses from BIP39 seed phrases. Uses proper BIP32/BIP44 derivation, secp256k1 cryptography, and Bech32 encoding — entirely in your browser.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Input Section -->
      <Card>
        <CardHeader>
          <CardTitle>🔧 Configuration</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="wordCount">Mnemonic Word Count</Label>
            <Select v-model="wordCount">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="12">12 words (128 bits)</SelectItem>
                <SelectItem :value="15">15 words (160 bits)</SelectItem>
                <SelectItem :value="18">18 words (192 bits)</SelectItem>
                <SelectItem :value="21">21 words (224 bits)</SelectItem>
                <SelectItem :value="24">24 words (256 bits)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="chain">Target Blockchain</Label>
            <Select v-model="selectedChainValue">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="chain in chains" :key="chain.value" :value="chain.value">
                  {{ chain.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p class="text-xs text-muted-foreground mt-1">
              Coin type {{ selectedChain.coinType }} (BIP-44)
            </p>
          </div>

          <div>
            <Label for="accountIndex">Account Index</Label>
            <Input
              id="accountIndex"
              v-model.number="accountIndex"
              type="number"
              min="0"
              placeholder="0"
              @change="deriveAll"
            />
          </div>

          <div>
            <Label for="passphrase">BIP39 Passphrase (optional)</Label>
            <Input
              id="passphrase"
              v-model="passphrase"
              type="password"
              placeholder="25th word (optional)"
              @input="deriveAll"
            />
          </div>

          <Button @click="doGenerateMnemonic" class="w-full" :disabled="!isReady">
            🎲 Generate New Mnemonic
          </Button>

          <div v-if="mnemonic">
            <Label for="mnemonic">Seed Phrase</Label>
            <Textarea
              id="mnemonic"
              v-model="mnemonic"
              rows="3"
              placeholder="Enter or generate a BIP39 mnemonic..."
              class="font-mono"
              @input="deriveAll"
            />
            <div class="flex items-center gap-2 mt-2">
              <Button variant="outline" size="sm" @click="copyToClipboard(mnemonic)">
                📋 Copy
              </Button>
              <span v-if="isValid" class="text-sm text-green-600">✅ Valid mnemonic</span>
              <span v-else class="text-sm text-red-600">❌ Invalid mnemonic</span>
            </div>
          </div>

          <div v-if="errorMsg" class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {{ errorMsg }}
          </div>
        </CardContent>
      </Card>

      <!-- Results Section -->
      <Card>
        <CardHeader>
          <CardTitle>📊 Derived Keys & Address</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <template v-if="results">
            <div>
              <Label>Derivation Path</Label>
              <div class="font-mono text-sm bg-muted p-2 rounded">{{ results.path }}</div>
            </div>

            <div>
              <Label>Private Key (Hex)</Label>
              <div class="relative">
                <Input :value="results.privateKey" readonly class="font-mono text-xs pr-10" />
                <Button variant="outline" size="sm" class="absolute right-1 top-1 h-7 px-2" @click="copyToClipboard(results.privateKey)">📋</Button>
              </div>
              <p class="text-xs text-muted-foreground mt-1">32-byte secp256k1 private key</p>
            </div>

            <div>
              <Label>Public Key (Hex, compressed)</Label>
              <div class="relative">
                <Input :value="results.publicKey" readonly class="font-mono text-xs pr-10" />
                <Button variant="outline" size="sm" class="absolute right-1 top-1 h-7 px-2" @click="copyToClipboard(results.publicKey)">📋</Button>
              </div>
              <p class="text-xs text-muted-foreground mt-1">33-byte compressed secp256k1 public key</p>
            </div>

            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
              <Label class="text-green-800">{{ selectedChain.label }} Address</Label>
              <div class="relative mt-1">
                <Input :value="results.address" readonly class="font-mono text-sm pr-10 bg-white" />
                <Button variant="outline" size="sm" class="absolute right-1 top-1 h-7 px-2" @click="copyToClipboard(results.address)">📋</Button>
              </div>
              <p class="text-xs text-green-700 mt-1">Bech32-encoded with "{{ selectedChain.prefix }}" prefix</p>
            </div>
          </template>

          <div v-else class="text-center py-8 text-muted-foreground">
            <p class="text-sm">Generate a mnemonic or enter an existing one to derive addresses.</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Multi-chain addresses -->
    <Card v-if="multiChainResults.length" class="mt-6">
      <CardHeader>
        <CardTitle>🔗 Same Seed, Every Cosmos Chain</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground mb-4">
          One seed phrase controls assets across all these chains. Different Bech32 prefixes create different addresses from the same private key.
        </p>
        <div class="grid gap-2 md:grid-cols-2">
          <div v-for="r in multiChainResults" :key="r.prefix" class="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <span class="font-mono text-xs font-bold w-16 shrink-0">{{ r.prefix }}1</span>
            <span class="font-mono text-xs truncate flex-1">{{ r.address.substring(r.prefix.length + 1) }}</span>
            <Button variant="ghost" size="sm" class="h-6 px-2 shrink-0" @click="copyToClipboard(r.address)">📋</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Explanation Section -->
    <Card class="mt-6">
      <CardHeader>
        <CardTitle>📚 How Cosmos Addresses Are Generated</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-3">
            <h3 class="font-semibold text-lg">Step-by-Step Process</h3>
            <ol class="space-y-3 text-sm">
              <li class="flex items-start gap-3">
                <span class="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <div>
                  <strong>BIP39 Mnemonic → Seed:</strong> Your seed phrase is converted to a 64-byte seed using PBKDF2 with the mnemonic as salt and "mnemonic" as password.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <div>
                  <strong>BIP32 Master Key:</strong> HMAC-SHA512 creates a master private key and chain code from the seed.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <div>
                  <strong>BIP44 Derivation:</strong> Hierarchical derivation follows the path
                  <code class="bg-muted px-1 rounded text-xs">m/44'/coinType'/0'/0/index</code>
                  where coinType 118 is Cosmos Hub.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <div>
                  <strong>secp256k1 Public Key:</strong> Elliptic curve multiplication produces a 33-byte compressed public key from the private key.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">5</span>
                <div>
                  <strong>Hash & Bech32:</strong>
                  <code class="bg-muted px-1 rounded text-xs">RIPEMD160(SHA256(pubkey))</code>
                  gives a 20-byte address, then Bech32 encoding adds a human-readable prefix (e.g. "cosmos") and checksum.
                </div>
              </li>
            </ol>
          </div>

          <div class="space-y-4">
            <div>
              <h3 class="font-semibold text-lg mb-2">Bech32 Encoding</h3>
              <p class="text-sm">
                Cosmos uses Bech32 (BIP-173) for addresses. The format is:
              </p>
              <div class="mt-2 p-3 bg-muted rounded font-mono text-xs space-y-1">
                <div><span class="text-blue-600">prefix</span> + <span class="text-purple-600">1</span> + <span class="text-green-600">data</span> + <span class="text-red-600">checksum</span></div>
                <div class="text-muted-foreground">cosmos1abc...xyz</div>
              </div>
              <p class="text-xs text-muted-foreground mt-2">
                The separator is always "1". The checksum detects typos. Each chain uses a different prefix, creating different addresses from the same key.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">BIP-44 Coin Types</h3>
              <div class="space-y-1 text-xs font-mono bg-muted p-3 rounded">
                <div><strong>118</strong> — Cosmos Hub, Juno, Stargaze, Akash</div>
                <div><strong>100118</strong> — Osmosis</div>
                <div><strong>529</strong> — Secret Network</div>
                <div><strong>459</strong> — Kava</div>
                <div><strong>60</strong> — Injective (Ethereum-style)</div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 class="font-semibold text-yellow-800 mb-2">⚠️ Security Notes</h4>
          <ul class="text-sm text-yellow-700 space-y-1">
            <li>• This tool runs 100% in your browser — your seed phrase never leaves your device</li>
            <li>• Never share your seed phrase or private keys with anyone</li>
            <li>• These are real cryptographic derivations — do NOT use generated keys for real funds without proper backup</li>
            <li>• Always verify addresses on an official wallet before sending funds</li>
          </ul>
        </div>
      </CardContent>
    </Card>

    <!-- SEO Content Section -->
    <div class="mt-6 prose prose-sm max-w-none text-muted-foreground">
      <h2 class="text-2xl font-bold text-foreground mb-4">Cosmos Address Generator — Supported Chains</h2>
      <p>
        This tool generates wallet addresses for the entire Cosmos ecosystem using a single BIP39 seed phrase.
        Each chain uses the same underlying cryptography (secp256k1 elliptic curve) but applies a different
        Bech32 human-readable prefix (HRP), producing unique addresses per chain from the same private key.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-4 mb-2">Cosmos Hub (ATOM)</h3>
      <p>
        The flagship chain of the Cosmos network. ATOS addresses use the <code>cosmos1...</code> prefix with
        BIP-44 coin type 118. The Cosmos Hub is the interchain routing center powered by the IBC protocol,
        enabling transfers between Cosmos Hub, Osmosis, Juno, Akash, and 90+ other chains.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-4 mb-2">Osmosis (OSMO)</h3>
      <p>
        The leading DEX in the Cosmos ecosystem. Osmosis addresses use the <code>osmo1...</code> prefix with
        BIP-44 coin type 100118. OSMO tokens are used for governance and liquidity mining on the Osmosis
        decentralized exchange.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-4 mb-2">Injective (INJ)</h3>
      <p>
        A DeFi-specific blockchain using Ethereum-style key derivation (coin type 60). Injective addresses
        use the <code>inj1...</code> prefix but are derived using keccak256 hashing instead of the standard
        Cosmos ripemd160(sha256) approach, making them compatible with EVM tooling.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-4 mb-2">Juno (JUNO)</h3>
      <p>
        A smart contract platform in the Cosmos ecosystem. Juno addresses use the <code>juno1...</code> prefix
        with BIP-44 coin type 118. JUNO powers CosmWasm smart contracts and cross-chain dApps.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-4 mb-2">Akash Network (AKT)</h3>
      <p>
        A decentralized cloud computing marketplace. Akash addresses use the <code>akash1...</code> prefix
        with coin type 118. AKT is used to lease compute resources from decentralized providers.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-4 mb-2">Secret Network (SCRT)</h3>
      <p>
        A privacy-focused blockchain with encrypted smart contracts. Secret Network addresses use the
        <code>secret1...</code> prefix with BIP-44 coin type 529.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-4 mb-2">Stargaze (STARS)</h3>
      <p>
        An NFT marketplace and creation platform in the Cosmos ecosystem. Stargaze addresses use the
        <code>stars1...</code> prefix with coin type 118.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-4 mb-2">Kava (KAVA)</h3>
      <p>
        A Layer-1 blockchain combining Cosmos SDK and EVM compatibility. Kava addresses use the
        <code>kava1...</code> prefix with BIP-44 coin type 459.
      </p>

      <h3 class="text-lg font-semibold text-foreground mt-4 mb-2">Crescent (CRE) & Umee (UMEE)</h3>
      <p>
        Crescent is a DeFi hub with liquidity routing and AMM features, using the <code>cre1...</code> prefix.
        Umee is an interchain money market protocol using the <code>umee1...</code> prefix. Both use coin type 118.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-6 mb-4">Why Use a Cosmos Multi-Chain Address Generator?</h2>
      <p>
        The Cosmos ecosystem's unique architecture means a single seed phrase can manage assets across
        dozens of blockchains. Whether you're setting up a wallet for Cosmos Hub (ATOM), trading on Osmosis
        (OSMO), deploying contracts on Juno (JUNO), or using Akash (AKT) for decentralized hosting,
        understanding how your addresses are derived helps you verify transactions and manage security.
      </p>
      <p>
        This generator uses the same cryptographic libraries as production wallets: <strong>BIP32</strong>
        hierarchical deterministic key derivation, <strong>BIP44</strong> multi-account structure,
        <strong>secp256k1</strong> elliptic curve cryptography, and <strong>Bech32</strong> encoding.
        Everything runs client-side in your browser — no data is ever transmitted.
      </p>
    </div>
  </div>
</template>
