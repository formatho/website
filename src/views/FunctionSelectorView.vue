<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, Check, FunctionSquare, AlertCircle, Search, Wand2 } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { keccak256, toBytes } from 'viem'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Solidity Function Selector Calculator & Lookup | Formatho',
  description:
    'Calculate Solidity function selectors (4-byte signatures) with Keccak-256, or look up which function a selector like 0xa9059cbb belongs to. Batch mode, ERC presets, Foundry cast sig compatible. 100% client-side.',
  keywords: [
    'function selector calculator',
    'solidity function selector',
    '4-byte signature',
    'function selector lookup',
    'selector decoder',
    'keccak256 selector',
    'cast sig',
    'abi selector',
    '0xa9059cbb',
    'ethers interface id'
  ],
  ogType: 'website'
})

const input = ref('transfer(address,uint256)\napprove(address,uint256)\nbalanceOf(address)')

const copiedRow = ref<string | null>(null)
const copiedAll = ref(false)

const signatureRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*\(.*\)$/

const rows = computed(() => {
  return input.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((sig) => {
      if (!signatureRegex.test(sig)) {
        return { sig, selector: '', error: 'Invalid signature format' }
      }
      try {
        const hash = keccak256(toBytes(sig))
        return { sig, selector: hash.slice(0, 10), error: '' }
      } catch {
        return { sig, selector: '', error: 'Could not hash signature' }
      }
    })
})

const validRows = computed(() => rows.value.filter((r) => !r.error))

// ---- Presets: curated signature sets loaded with one click ----
const presets: Record<string, string[]> = {
  'ERC-20': [
    'totalSupply()',
    'balanceOf(address)',
    'transfer(address,uint256)',
    'allowance(address,address)',
    'approve(address,uint256)',
    'transferFrom(address,address,uint256)',
    'Transfer(address,address,uint256)',
    'Approval(address,address,uint256)'
  ],
  'ERC-721': [
    'balanceOf(address)',
    'ownerOf(uint256)',
    'safeTransferFrom(address,address,uint256)',
    'safeTransferFrom(address,address,uint256,bytes)',
    'transferFrom(address,address,uint256)',
    'approve(address,uint256)',
    'setApprovalForAll(address,bool)',
    'getApproved(uint256)',
    'isApprovedForAll(address,address)',
    'tokenURI(uint256)',
    'Transfer(address,address,uint256)',
    'ApprovalForAll(address,address,bool)'
  ],
  'ERC-1155': [
    'balanceOf(address,uint256)',
    'balanceOfBatch(address[],uint256[])',
    'setApprovalForAll(address,bool)',
    'isApprovedForAll(address,address)',
    'safeTransferFrom(address,address,uint256,uint256,bytes)',
    'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)',
    'uri(uint256)',
    'TransferSingle(address,address,address,uint256,uint256)',
    'TransferBatch(address,address,address,uint256[],uint256[])'
  ],
  'ERC-4626': [
    'asset()',
    'totalAssets()',
    'convertToShares(uint256)',
    'convertToAssets(uint256)',
    'maxDeposit(address)',
    'previewDeposit(uint256)',
    'deposit(uint256,address)',
    'maxMint(address)',
    'previewMint(uint256)',
    'mint(uint256,address)',
    'maxWithdraw(address)',
    'previewWithdraw(uint256)',
    'withdraw(uint256,address,address)',
    'maxRedeem(address)',
    'previewRedeem(uint256)',
    'redeem(uint256,address,address)'
  ],
  'Admin & Proxy': [
    'owner()',
    'renounceOwnership()',
    'transferOwnership(address)',
    'supportsInterface(bytes4)',
    'pause()',
    'unpause()',
    'implementation()',
    'upgradeTo(address)',
    'upgradeToAndCall(address,bytes)',
    'admin()',
    'changeAdmin(address)',
    'name()',
    'symbol()',
    'decimals()'
  ]
}

function loadPreset(name: string) {
  input.value = presets[name].join('\n')
}

// ---- Reverse lookup: selector hex -> matching signatures ----
// The dictionary is derived from the presets above plus a few extra
// high-traffic signatures; selectors are computed at runtime, so the
// list never drifts from the actual Keccak-256 math.
const extraDictionary = [
  'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)',
  'nonces(address)',
  'DOMAIN_SEPARATOR()',
  'deposit()',
  'withdraw(uint256)',
  'stake(uint256)',
  'claim()',
  'mint(address,uint256)',
  'burn(uint256)',
  'getRoleMember(bytes32,uint256)',
  'hasRole(bytes32,address)',
  'grantRole(bytes32,address)',
  'revokeRole(bytes32,address)'
]

const dictionary = [...new Set([...Object.values(presets).flat(), ...extraDictionary])]

const selectorIndex = computed(() => {
  const map = new Map<string, string[]>()
  for (const sig of dictionary) {
    const selector = keccak256(toBytes(sig)).slice(0, 10)
    const existing = map.get(selector) || []
    existing.push(sig)
    map.set(selector, existing)
  }
  return map
})

const lookupInput = ref('')

const lookupResult = computed(() => {
  const raw = lookupInput.value.trim().replace(/^0x/, '')
  if (!raw) return null
  if (!/^[0-9a-fA-F]{8}$/.test(raw)) {
    return { valid: false as const, matches: [] }
  }
  const selector = '0x' + raw.toLowerCase()
  return { valid: true as const, selector, matches: selectorIndex.value.get(selector) || [] }
})

// Forward-direction sanity feed: while typing a selector, also check
// whether any line currently in the textarea collides with it.
const lookupInInput = computed(() => {
  const r = lookupResult.value
  if (!r || !r.valid) return []
  return validRows.value.filter((row) => row.selector === r.selector)
})

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedRow.value = key
    setTimeout(() => (copiedRow.value = null), 1500)
  } catch {
    /* clipboard unavailable */
  }
}

async function copyAll() {
  const text = validRows.value.map((r) => `${r.selector}  ${r.sig}`).join('\n')
  try {
    await navigator.clipboard.writeText(text)
    copiedAll.value = true
    setTimeout(() => (copiedAll.value = false), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <FunctionSquare class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Solidity Function Selector Calculator &amp; Lookup</h1>
        <p class="text-sm text-muted-foreground">
          Compute 4-byte selectors with Keccak-256 or reverse-lookup a selector — batch mode, all client-side
        </p>
      </div>
    </div>

    <!-- Reverse lookup: the "0xa9059cbb -> which function?" direction -->
    <Card class="mb-6 border-primary/20">
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <Search class="w-4 h-4" /> Reverse lookup: selector &rarr; function
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <Input
          v-model="lookupInput"
          placeholder="0xa9059cbb"
          class="font-mono"
          aria-label="Selector to look up"
        />
        <div v-if="lookupResult && !lookupResult.valid" class="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" /> Enter 8 hex characters (with or without 0x)
        </div>
        <div v-else-if="lookupResult && lookupResult.valid" class="space-y-2">
          <div v-if="lookupResult.matches.length" class="space-y-2">
            <p class="text-xs text-muted-foreground">
              {{ lookupResult.matches.length === 1 ? 'Known signature' : lookupResult.matches.length + ' known signatures' }}
              with selector <span class="font-mono text-primary">{{ lookupResult.selector }}</span>:
            </p>
            <div
              v-for="sig in lookupResult.matches"
              :key="sig"
              class="flex items-center justify-between gap-4 p-3 border border-border rounded-lg"
            >
              <p class="font-mono text-sm font-semibold break-all">{{ sig }}</p>
              <Button variant="ghost" size="sm" :aria-label="'Copy ' + sig" @click="copy(sig, 'lookup-' + sig)">
                <Check v-if="copiedRow === 'lookup-' + sig" class="w-4 h-4" />
                <Copy v-else class="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p v-else class="text-xs text-muted-foreground">
            No match in the built-in dictionary of {{ dictionary.length }} common signatures (ERC-20/721/1155/4626,
            admin, proxy, permit). The selector may belong to a less common or custom function — a full lookup needs
            an aggregated 4-byte database such as openchain.xyz.
          </p>
          <p v-if="lookupInInput.length" class="text-xs text-primary">
            Note:
            {{ lookupInInput.map((r) => r.sig).join(', ') }} in your input
            {{ lookupResult.matches.some((m) => lookupInInput.some((r) => r.sig === m)) ? 'is one of' : 'collides with' }}
            the matched signature{{ lookupResult.matches.length > 1 ? 's' : '' }}.
          </p>
        </div>
        <p v-else class="text-xs text-muted-foreground">
          Paste a calldata selector (e.g. <span class="font-mono">0xa9059cbb</span>) to find which common function it
          calls. Matching runs against {{ dictionary.length }} built-in signatures — no network requests.
        </p>
      </CardContent>
    </Card>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Function signatures (one per line)</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <Textarea
          v-model="input"
          :rows="6"
          class="font-mono text-sm"
          placeholder="transfer(address,uint256)"
          aria-label="Function signatures"
        />
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs text-muted-foreground flex items-center gap-1">
            <Wand2 class="w-3 h-3" /> Load preset:
          </span>
          <Button
            v-for="(sigs, name) in presets"
            :key="name"
            variant="outline"
            size="sm"
            @click="loadPreset(name)"
          >
            {{ name }}
          </Button>
        </div>
      </CardContent>
    </Card>

    <Card v-if="rows.length">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Selectors ({{ validRows.length }})</CardTitle>
        <Button v-if="validRows.length" variant="outline" size="sm" @click="copyAll">
          <Check v-if="copiedAll" class="w-4 h-4 mr-1" />
          <Copy v-else class="w-4 h-4 mr-1" />
          {{ copiedAll ? 'Copied' : 'Copy all' }}
        </Button>
      </CardHeader>
      <CardContent>
        <div class="space-y-2">
          <div
            v-for="row in rows"
            :key="row.sig"
            class="flex items-center justify-between gap-4 p-3 border border-border rounded-lg"
          >
            <div class="min-w-0 flex-1">
              <p class="font-mono text-sm font-semibold text-primary break-all">
                {{ row.selector || '—' }}
              </p>
              <p class="font-mono text-xs text-muted-foreground truncate">{{ row.sig }}</p>
              <p v-if="row.error" class="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle class="w-3 h-3" /> {{ row.error }}
              </p>
            </div>
            <Button
              v-if="row.selector"
              variant="ghost"
              size="sm"
              :aria-label="'Copy selector for ' + row.sig"
              @click="copy(row.selector, row.sig)"
            >
              <Check v-if="copiedRow === row.sig" class="w-4 h-4" />
              <Copy v-else class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
