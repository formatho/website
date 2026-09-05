<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Binary, Search, AlertCircle } from 'lucide-vue-next'
import { keccak256, toBytes, decodeAbiParameters, parseAbiParameters, getAbiItem, type Abi } from 'viem'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Ethereum Calldata Decoder - Selector & Args Lookup | Formatho',
  description:
    'Decode raw Ethereum calldata: paste 0x hex, the 4-byte selector is matched against a built-in dictionary (ERC-20, permit, routers, common errors) and arguments decode by signature or pasted ABI. Also decodes event logs by topic0. Client-side.',
  keywords: [
    'ethereum calldata decoder',
    'erc20 calldata decoder',
    'solidity calldata decoder',
    'abi decoder online',
    'function selector decoder',
    'erc20 permit decoder',
    'solidity error decoder',
    'event signature decoder',
    'topic0 lookup'
  ],
  ogType: 'website'
})

// ---------------- signature dictionary ----------------
const DICTIONARY: string[] = [
  // ERC-20
  'transfer(address,uint256)', 'transferFrom(address,address,uint256)', 'approve(address,uint256)',
  'allowance(address,address)', 'balanceOf(address)', 'totalSupply()',
  'Transfer(address,address,uint256)', 'Approval(address,address,uint256)',
  // permit (EIP-2612 / DAI-style)
  'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)',
  'permit(address,uint256,uint256,uint256,bool,uint8,bytes32,bytes32)', 'nonces(address)', 'DOMAIN_SEPARATOR()',
  // common router / token functions
  'deposit()', 'withdraw(uint256)', 'mint(uint256)', 'burn(uint256)', 'mint(address,uint256)',
  'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)',
  'swapExactETHForTokens(uint256,address[],address,uint256)',
  'swapTokensForExactETH(uint256,uint256,address[],address,uint256)',
  'exactInput((bytes,address,uint256,uint256,uint256))',
  'exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))',
  'multicall(uint256,bytes[])', 'execute(bytes,bytes[])',
  // admin / proxy
  'transferOwnership(address)', 'renounceOwnership()', 'owner()', 'implementation()', 'upgradeTo(address)',
  'pause()', 'unpause()', 'setApprovalForAll(address,bool)',
  // common custom errors
  'TransferFromIncorrectOwner()', 'TransferCallerNotOwnerNorApproved()', 'ApprovalCallerNotOwnerNorApproved()',
  'InsufficientAllowance(uint256)', 'InsufficientBalance(uint256,uint256)', 'PermitDeadlineExpired(uint256)',
  'InvalidSigner(address,address)', 'ERC20InsufficientAllowance(address,uint256,uint256)',
  'ERC20InsufficientBalance(address,uint256,uint256)', 'ERC20InvalidApprover(address)', 'ReentrancyGuardReentrantCall()',
  'OwnableUnauthorizedAccount(address)', 'SafeCastOverflowedUintDowncast(uint8,uint256)',
  // common events
  'Swap(address,address,int256,int256,uint160,uint128,int24)', 'Mint(address,address,uint256,uint256)',
  'Swap(address,indexed address,indexed address,uint256,uint256)', 'OrderFilled(bytes32,address,uint256)',
  'Withdrawal(address,address,uint256)', 'Deposit(address,address,uint256)'
]

interface SigMatch { signature: string; selector: string; kind: 'function' | 'error' | 'event' }

const dictionaryIndex = computed(() => {
  const map = new Map<string, SigMatch[]>()
  for (const sig of DICTIONARY) {
    const isEvent = /[A-Z]\w*\(/.test(sig.split('(')[0]) && /[A-Z]/.test(sig.split('(')[0][0])
    const hash = keccak256(toBytes(sig))
    const key = isEvent ? hash : hash.slice(0, 10)
    const kind = isEvent ? 'event' : sig.includes('()') || /[a-z]/.test(sig[0]) ? 'function' : 'error'
    const entry: SigMatch = { signature: sig, selector: key, kind: kind as SigMatch['kind'] }
    const list = map.get(key) || []
    list.push(entry)
    map.set(key, list)
  }
  return map
})

// ---------------- calldata tab ----------------
const calldataInput = ref('')
const abiInput = ref('')

interface DecodedArg { name: string; type: string; value: string }
interface DecodeResult {
  selector: string
  matches: SigMatch[]
  args: DecodedArg[]
  usedSignature: string
  decodedFromAbi: boolean
  error?: string
}

const decoded = ref<DecodeResult | null>(null)
const decodeError = ref('')

function tryDecode(sig: SigMatch, argBytes: Uint8Array, abi?: Abi): DecodedArg[] | string {
  try {
    const types = sig.signature.slice(sig.signature.indexOf('(') + 1, -1)
    if (!types) return []
    let params = parseAbiParameters(types as never)
    let names: string[] = params.map((_, i) => `arg${i}`)
    if (abi) {
      // prefer human names from pasted ABI
      try {
        const item = getAbiItem({ abi, name: sig.signature.split('(')[0] })
        const inputs = (item as any).inputs || []
        if (inputs.length === params.length) names = inputs.map((inp: any, i: number) => inp.name || `arg${i}`)
      } catch { /* fall back to argN */ }
    }
    const values = decodeAbiParameters(params, argBytes as `0x${string}` as never)
    return values.map((v, i) => ({
      name: names[i],
      type: params[i].type,
      value: typeof v === 'bigint' ? v.toString() : typeof v === 'object' ? JSON.stringify(v, (_, x) => typeof x === 'bigint' ? x.toString() : x) : String(v)
    }))
  } catch (e: any) {
    return 'decode failed: ' + (e?.message?.slice(0, 80) || 'unknown')
  }
}

function decodeCalldata() {
  decodeError.value = ''
  decoded.value = null
  const hex = calldataInput.value.trim().replace(/^0x/, '')
  if (hex.length < 8 || !/^[0-9a-f]+$/i.test(hex)) {
    decodeError.value = 'Paste raw calldata hex (at least 4 selector bytes + args), with or without 0x.'
    return
  }
  const selector = '0x' + hex.slice(0, 8).toLowerCase()
  const argHex = hex.slice(8)
  const argBytes = new Uint8Array(argHex.match(/.{2}/g)!.map((b) => parseInt(b, 16)))

  let abi: Abi | undefined
  if (abiInput.value.trim()) {
    try {
      abi = JSON.parse(abiInput.value)
    } catch {
      decodeError.value = 'Pasted ABI is not valid JSON — decoding with the dictionary only.'
    }
  }

  const matches = dictionaryIndex.value.get(selector) || []
  const match = matches[0]

  if (match) {
    const res = tryDecode(match, argBytes, abi)
    decoded.value = Array.isArray(res)
      ? { selector, matches, args: res, usedSignature: match.signature, decodedFromAbi: !!abi }
      : { selector, matches, args: [], usedSignature: match.signature, decodedFromAbi: false, error: res }
  } else {
    decoded.value = { selector, matches: [], args: [], usedSignature: '', decodedFromAbi: false }
  }
}

const argBytesCount = computed(() => Math.floor((calldataInput.value.trim().replace(/^0x/, '').length - 8) / 2))

// ---------------- logs tab ----------------
const topicInput = ref('')
const topicMatch = computed<SigMatch[] | null>(() => {
  const hex = topicInput.value.trim().replace(/^0x/, '')
  if (!/^[0-9a-f]{64}$/i.test(hex)) return null
  return dictionaryIndex.value.get('0x' + hex.toLowerCase()) || []
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Binary class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Ethereum Calldata Decoder</h1>
        <p class="text-sm text-muted-foreground">
          Raw calldata → function/error + arguments, matched locally against known signatures
        </p>
      </div>
    </div>

    <Tabs default-value="calldata" class="space-y-6">
      <TabsList aria-label="Decode modes">
        <TabsTrigger value="calldata">Calldata</TabsTrigger>
        <TabsTrigger value="logs">Event topic</TabsTrigger>
      </TabsList>

      <TabsContent value="calldata" class="space-y-6">
        <Card>
          <CardHeader><CardTitle class="text-lg">Raw calldata (hex)</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-2">
              <Label for="cd">Paste transaction input data — e.g. an ERC-20 transfer</Label>
              <Textarea
                id="cd"
                v-model="calldataInput"
                :rows="5"
                class="font-mono text-xs"
                placeholder="0xa9059cbb000000000000000000000000…"
                aria-label="Raw calldata hex"
              />
            </div>
            <div class="grid gap-2">
              <Label for="abi">ABI JSON (optional — enables argument names)</Label>
              <Textarea id="abi" v-model="abiInput" :rows="3" class="font-mono text-xs" placeholder='[{ "name": "transfer", "inputs": […] }]' aria-label="ABI JSON" />
            </div>
            <Button class="w-full" @click="decodeCalldata">Decode calldata</Button>
            <p v-if="decodeError" class="text-sm text-red-500 flex items-start gap-1">
              <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" /> {{ decodeError }}
            </p>
            <p class="text-xs text-muted-foreground">
              Selector matching runs against a built-in dictionary of {{ DICTIONARY.length }} common signatures —
              ERC-20/721, permit, routers, standard custom errors, and events. Nothing is uploaded.
            </p>
          </CardContent>
        </Card>

        <template v-if="decoded">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0">
              <CardTitle class="text-lg">Selector</CardTitle>
              <CopyButton :text="decoded.selector" variant="ghost" aria-label="Copy selector" />
            </CardHeader>
            <CardContent class="space-y-2">
              <p class="font-mono text-sm font-bold text-primary">{{ decoded.selector }}</p>
              <p class="text-xs text-muted-foreground">{{ argBytesCount }} argument bytes ({{ Math.floor(argBytesCount / 32) }} words)</p>
              <div v-if="decoded.matches.length" class="space-y-2">
                <p v-for="m in decoded.matches" :key="m.signature" class="text-sm">
                  <span class="font-mono">{{ m.signature }}</span>
                  <span class="ml-2 text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-muted">{{ m.kind }}</span>
                </p>
              </div>
              <p v-else class="text-sm text-amber-600">
                Not in the built-in dictionary — likely a custom function. Paste the contract ABI above to decode with
                names, or check an aggregated 4-byte database.
              </p>
            </CardContent>
          </Card>

          <Card v-if="decoded.args.length">
            <CardHeader><CardTitle class="text-lg">Decoded arguments ({{ decoded.usedSignature }})</CardTitle></CardHeader>
            <CardContent class="space-y-2">
              <div v-for="(a, i) in decoded.args" :key="i" class="flex items-start justify-between gap-3 p-3 border border-border rounded-lg">
                <div class="min-w-0">
                  <p class="text-xs text-muted-foreground">{{ a.name }} <span class="font-mono">({{ a.type }})</span></p>
                  <p class="font-mono text-sm break-all">{{ a.value }}</p>
                </div>
                <CopyButton :text="a.value" variant="ghost" :aria-label="'Copy ' + a.name" />
              </div>
            </CardContent>
          </Card>
          <p v-else-if="decoded.error" class="text-sm text-red-500">{{ decoded.error }}</p>
        </template>
      </TabsContent>

      <TabsContent value="logs" class="space-y-6">
        <Card>
          <CardHeader><CardTitle class="text-lg">Event signature lookup (topic0)</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-2">
              <Label for="topic">topic0 hash (32-byte keccak of the event signature)</Label>
              <Textarea id="topic" v-model="topicInput" :rows="2" class="font-mono text-xs" placeholder="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" aria-label="Event topic0 hash" />
            </div>
            <p class="text-xs text-muted-foreground">
              The example hash is <span class="font-mono">Transfer(address,address,uint256)</span> — the most emitted
              event on every EVM chain.
            </p>
          </CardContent>
        </Card>
        <Card v-if="topicInput.trim()">
          <CardContent class="pt-6">
            <div v-if="topicMatch && topicMatch.length">
              <p class="text-sm mb-2">Known event signature(s):</p>
              <p v-for="m in topicMatch" :key="m.signature" class="font-mono text-sm font-semibold">{{ m.signature }}</p>
            </div>
            <p v-else-if="topicMatch !== null" class="text-sm text-amber-600">
              Not in the built-in dictionary. Custom or less common event — an aggregated signature database can resolve it.
            </p>
            <p v-else class="text-xs text-red-500">Enter a full 32-byte hex hash (64 characters).</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
