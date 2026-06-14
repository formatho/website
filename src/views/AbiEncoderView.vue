<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Copy, RefreshCw, ArrowRightLeft, Code2, FileJson, Plus, Trash2, Zap } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { encodeFunctionParameters, decodeAbiParameters } from 'viem'

type ParamType = 'address' | 'uint256' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'int256' | 'int128' | 'int64' | 'int32' | 'int8' | 'bool' | 'string' | 'bytes' | 'bytes32' | 'bytes4'

interface AbiParam {
  type: ParamType
  name: string
  value: string
}

type Tab = 'encode' | 'decode' | 'function'

const activeTab = ref<Tab>('encode')

// ===== ENCODE =====
const encodeParams = ref<AbiParam[]>([
  { type: 'address', name: 'recipient', value: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
  { type: 'uint256', name: 'amount', value: '1000000000000000000' },
])

const paramTypes = ['address', 'uint256', 'uint8', 'uint16', 'uint32', 'uint64', 'uint128', 'int256', 'int128', 'int64', 'int32', 'int8', 'bool', 'string', 'bytes', 'bytes32', 'bytes4']

const encodeError = ref('')
const encodeResult = ref('')

const encodeAbi = () => {
  encodeError.value = ''
  encodeResult.value = ''

  if (!encodeParams.value.length) {
    encodeError.value = 'Add at least one parameter.'
    return
  }

  try {
    const types = encodeParams.value.map(p => p.type)
    const values = encodeParams.value.map(p => {
      if (p.type === 'bool') return p.value === 'true' || p.value === '1'
      if (p.type.startsWith('uint') || p.type.startsWith('int')) return BigInt(p.value || '0')
      if (p.type === 'bytes' || p.type.startsWith('bytes')) {
        return p.value.startsWith('0x') ? p.value : '0x' + p.value
      }
      return p.value
    })

    const encoded = encodeFunctionParameters(types as any, values as any)
    encodeResult.value = encoded
  } catch (e: any) {
    encodeError.value = e.shortMessage || e.message || 'Failed to encode parameters'
  }
}

const addEncodeParam = () => {
  encodeParams.value.push({ type: 'uint256', name: `param${encodeParams.value.length + 1}`, value: '' })
}

const removeEncodeParam = (index: number) => {
  encodeParams.value.splice(index, 1)
}

// ===== DECODE =====
const decodeInput = ref('0x000000000000000000000000742d35cc6634c0532925a3b844bc454e4438f44e00000000000000000000000000000000000000000000000000de0b6b3a7640000')
const decodeTypes = ref('address, uint256')
const decodeError = ref('')
const decodeResult = ref<{ type: string; value: string }[]>([])

const decodeAbi = () => {
  decodeError.value = ''
  decodeResult.value = []

  if (!decodeInput.value.trim()) {
    decodeError.value = 'Paste encoded ABI data to decode.'
    return
  }

  try {
    const types = decodeTypes.value.split(',').map(t => t.trim()).filter(Boolean)
    const decoded = decodeAbiParameters(types as any, decodeInput.value as any)

    decodeResult.value = types.map((type, i) => ({
      type,
      value: typeof decoded[i] === 'bigint' ? decoded[i].toString() : String(decoded[i])
    }))
  } catch (e: any) {
    decodeError.value = e.shortMessage || e.message || 'Failed to decode ABI data'
  }
}

// ===== FUNCTION ENCODER =====
const funcSig = ref('transfer(address,uint256)')
const funcParams = ref<AbiParam[]>([
  { type: 'address', name: 'to', value: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
  { type: 'uint256', name: 'amount', value: '1000000000000000000' },
])
const funcError = ref('')
const funcResult = ref('')
const funcSelector = ref('')

const encodeFunction = () => {
  funcError.value = ''
  funcResult.value = ''
  funcSelector.value = ''

  try {
    const types = funcParams.value.map(p => p.type)
    const values = funcParams.value.map(p => {
      if (p.type === 'bool') return p.value === 'true' || p.value === '1'
      if (p.type.startsWith('uint') || p.type.startsWith('int')) return BigInt(p.value || '0')
      if (p.type === 'bytes' || p.type.startsWith('bytes')) {
        return p.value.startsWith('0x') ? p.value : '0x' + p.value
      }
      return p.value
    })

    // Build canonical signature
    const sig = `${funcSig.value.split('(')[0]}(${types.join(',')})`
    const encoded = encodeFunctionParameters(types as any, values as any)

    // Selector is first 4 bytes (10 chars including 0x)
    funcSelector.value = encoded.substring(0, 10)
    funcResult.value = encoded
  } catch (e: any) {
    funcError.value = e.shortMessage || e.message || 'Failed to encode function call'
  }
}

const addFuncParam = () => {
  funcParams.value.push({ type: 'uint256', name: `param${funcParams.value.length + 1}`, value: '' })
}

const removeFuncParam = (index: number) => {
  funcParams.value.splice(index, 1)
}

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {}
}

// Common function signatures for quick fill
const commonFunctions = [
  { name: 'transfer(address,uint256)', label: 'ERC20 transfer' },
  { name: 'approve(address,uint256)', label: 'ERC20 approve' },
  { name: 'transferFrom(address,address,uint256)', label: 'ERC20 transferFrom' },
  { name: 'balanceOf(address)', label: 'ERC20 balanceOf' },
  { name: 'mint(address,uint256)', label: 'mint' },
  { name: 'burn(uint256)', label: 'burn' },
]

// Initial encode
encodeAbi()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">ABI Encoder &amp; Decoder</h1>
        <p class="text-sm text-muted-foreground mt-1">Encode and decode Solidity ABI parameters — function calls, constructor args, and raw data</p>
      </div>
    </div>

    <!-- AI Context Banner -->
    <div class="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-foreground/5 border border-foreground/10">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">🤖 Perfect for smart contract debugging &amp; AI-assisted dev</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">Encode for Foundry/Cast</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">Decode tx input data</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">100% client-side</span>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-foreground/10">
      <button
        v-for="tab in ([
          { id: 'encode', label: 'Encode Parameters', icon: Code2 },
          { id: 'decode', label: 'Decode Data', icon: FileJson },
          { id: 'function', label: 'Function Call', icon: Zap },
        ] as const)"
        :key="tab.id"
        class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px"
        :class="activeTab === tab.id
          ? 'border-foreground text-foreground'
          : 'border-transparent text-muted-foreground hover:text-foreground'"
        @click="activeTab = tab.id"
      >
        <component :is="tab.icon" class="h-4 w-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ENCODE TAB -->
    <div v-if="activeTab === 'encode'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Parameters</CardTitle>
          <Button size="sm" variant="outline" @click="addEncodeParam">
            <Plus class="h-3.5 w-3.5 mr-1" /> Add
          </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-auto space-y-3">
          <div
            v-for="(param, i) in encodeParams"
            :key="i"
            class="flex items-end gap-2"
          >
            <div class="w-32 space-y-1">
              <Label class="text-[10px] uppercase text-muted-foreground">Type</Label>
              <Select v-model="param.type">
                <SelectTrigger class="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="t in paramTypes" :key="t" :value="t">{{ t }}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="w-28 space-y-1">
              <Label class="text-[10px] uppercase text-muted-foreground">Name</Label>
              <Input v-model="param.name" class="h-9" placeholder="name" />
            </div>
            <div class="flex-1 space-y-1">
              <Label class="text-[10px] uppercase text-muted-foreground">Value</Label>
              <Input v-model="param.value" class="h-9 font-mono text-xs" :placeholder="param.type === 'bool' ? 'true/false' : param.type === 'address' ? '0x...' : '0'" />
            </div>
            <Button size="icon" variant="ghost" class="h-9 w-9 text-muted-foreground hover:text-destructive" @click="removeEncodeParam(i)">
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
          <Button @click="encodeAbi" class="w-full">
            <Zap class="mr-2 h-4 w-4" /> Encode
          </Button>
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Encoded ABI Data</CardTitle>
          <Button v-if="encodeResult" size="sm" variant="ghost" @click="copyText(encodeResult)">
            <Copy class="h-3.5 w-3.5 mr-1" /> Copy
          </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <div v-if="encodeError" class="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {{ encodeError }}
          </div>
          <div v-else-if="encodeResult" class="space-y-3">
            <div class="p-3 rounded-lg bg-muted font-mono text-xs break-all">{{ encodeResult }}</div>
            <div class="text-xs text-muted-foreground">
              Length: {{ (encodeResult.length - 2) / 2 }} bytes · {{ encodeParams.length }} parameters
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full text-muted-foreground text-sm">
            Click "Encode" to generate ABI-encoded data
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- DECODE TAB -->
    <div v-if="activeTab === 'decode'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle class="text-sm font-medium">Input</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 flex flex-col gap-4">
          <div class="space-y-2">
            <Label>Parameter Types (comma-separated)</Label>
            <Input v-model="decodeTypes" class="font-mono text-xs" placeholder="address, uint256, string" />
          </div>
          <div class="space-y-2 flex-1 min-h-0 flex flex-col">
            <Label>Encoded Hex Data</Label>
            <textarea
              v-model="decodeInput"
              class="flex-1 min-h-[200px] resize-none rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
              placeholder="0x..."
              spellcheck="false"
            />
          </div>
          <Button @click="decodeAbi" class="w-full">
            <Zap class="mr-2 h-4 w-4" /> Decode
          </Button>
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle class="text-sm font-medium">Decoded Parameters</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <div v-if="decodeError" class="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {{ decodeError }}
          </div>
          <div v-else-if="decodeResult.length" class="space-y-2">
            <div
              v-for="(item, i) in decodeResult"
              :key="i"
              class="flex items-center gap-3 p-2.5 rounded-lg border border-foreground/10"
            >
              <span class="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-xs font-bold flex-shrink-0">{{ i }}</span>
              <div class="flex-1 min-w-0">
                <div class="text-xs text-muted-foreground font-mono">{{ item.type }}</div>
                <div class="text-sm font-mono break-all">{{ item.value }}</div>
              </div>
              <Button size="icon" variant="ghost" class="h-8 w-8 flex-shrink-0" @click="copyText(item.value)">
                <Copy class="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full text-muted-foreground text-sm">
            Paste encoded data and click "Decode"
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- FUNCTION CALL TAB -->
    <div v-if="activeTab === 'function'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle class="text-sm font-medium">Function Signature &amp; Args</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-auto space-y-4">
          <!-- Quick pick -->
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="cf in commonFunctions"
              :key="cf.name"
              class="px-2 py-1 rounded-md bg-foreground/5 hover:bg-foreground/10 text-[11px] font-mono transition-colors"
              @click="funcSig = cf.name; const types = cf.name.match(/\(([^)]*)\)/)?.[1]?.split(',').filter(Boolean) || []; funcParams = types.map((t, i) => ({ type: t.trim() as ParamType, name: `arg${i}`, value: '' }))"
            >
              {{ cf.label }}
            </button>
          </div>

          <div class="space-y-2">
            <Label>Function Signature</Label>
            <Input v-model="funcSig" class="font-mono text-xs" placeholder="transfer(address,uint256)" />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label>Arguments</Label>
              <Button size="sm" variant="outline" @click="addFuncParam">
                <Plus class="h-3.5 w-3.5 mr-1" /> Add
              </Button>
            </div>
            <div
              v-for="(param, i) in funcParams"
              :key="i"
              class="flex items-end gap-2"
            >
              <div class="w-32 space-y-1">
                <Label class="text-[10px] uppercase text-muted-foreground">Type</Label>
                <Select v-model="param.type">
                  <SelectTrigger class="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="t in paramTypes" :key="t" :value="t">{{ t }}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="w-24 space-y-1">
                <Label class="text-[10px] uppercase text-muted-foreground">Name</Label>
                <Input v-model="param.name" class="h-9" placeholder="name" />
              </div>
              <div class="flex-1 space-y-1">
                <Label class="text-[10px] uppercase text-muted-foreground">Value</Label>
                <Input v-model="param.value" class="h-9 font-mono text-xs" :placeholder="param.type === 'bool' ? 'true/false' : param.type === 'address' ? '0x...' : '0'" />
              </div>
              <Button size="icon" variant="ghost" class="h-9 w-9 text-muted-foreground hover:text-destructive" @click="removeFuncParam(i)">
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button @click="encodeFunction" class="w-full">
            <Zap class="mr-2 h-4 w-4" /> Encode Call Data
          </Button>
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Encoded Call Data</CardTitle>
          <Button v-if="funcResult" size="sm" variant="ghost" @click="copyText(funcResult)">
            <Copy class="h-3.5 w-3.5 mr-1" /> Copy
          </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <div v-if="funcError" class="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {{ funcError }}
          </div>
          <div v-else-if="funcResult" class="space-y-3">
            <!-- Function Selector -->
            <div class="p-3 rounded-lg bg-blue-500/5 border border-blue-500/15">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-blue-600 mb-1">Function Selector (4 bytes)</div>
              <div class="font-mono text-sm text-blue-600">{{ funcSelector }}</div>
            </div>

            <!-- Full calldata -->
            <div>
              <div class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Full Call Data</div>
              <div class="p-3 rounded-lg bg-muted font-mono text-xs break-all">{{ funcResult }}</div>
            </div>

            <div class="text-xs text-muted-foreground">
              Use with: <code class="px-1 py-0.5 rounded bg-muted">cast send &lt;contract&gt; &lt;selector&gt;&lt;data&gt;</code> or inject into a raw transaction
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full text-muted-foreground text-sm">
            Enter function signature and args, then click "Encode"
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
