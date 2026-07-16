<script setup lang="ts">
import { ref, computed } from 'vue'
import { parseUnits, formatUnits } from 'viem'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-vue-next'

const textValue = ref('1.5')
const selectedUnit = ref<'ether' | 'gwei' | 'wei'>('ether')

const computedValues = computed(() => {
  try {
    if (!textValue.value) return { ether: '', gwei: '', wei: '' }

    // Convert to Wei first as base
    let weiValue: bigint
    if (selectedUnit.value === 'ether') {
      weiValue = parseUnits(textValue.value, 18)
    } else if (selectedUnit.value === 'gwei') {
      weiValue = parseUnits(textValue.value, 9)
    } else {
      weiValue = BigInt(textValue.value)
    }

    return {
      ether: formatUnits(weiValue, 18),
      gwei: formatUnits(weiValue, 9),
      wei: weiValue.toString()
    }
  } catch (e) {
    return { ether: 'Invalid Input', gwei: 'Invalid Input', wei: 'Invalid Input' }
  }
})

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-6 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">EVM Unit Converter</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Value</Label>
            <Input v-model="textValue" placeholder="Enter value..." aria-label="Value to convert" />
          </div>
          <div class="space-y-2">
            <Label>Unit</Label>
            <div class="flex gap-2">
              <Button
                variant="outline"
                :class="{ 'bg-primary text-primary-foreground': selectedUnit === 'ether' }"
                @click="selectedUnit = 'ether'"
                aria-label="Select Ether unit"
              >
                Ether
              </Button>
              <Button
                variant="outline"
                :class="{ 'bg-primary text-primary-foreground': selectedUnit === 'gwei' }"
                @click="selectedUnit = 'gwei'"
                aria-label="Select Gwei unit"
              >
                Gwei
              </Button>
              <Button
                variant="outline"
                :class="{ 'bg-primary text-primary-foreground': selectedUnit === 'wei' }"
                @click="selectedUnit = 'wei'"
                aria-label="Select Wei unit"
              >
                Wei
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Converted Values</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Ether (10^18 Wei)</Label>
            <div class="flex gap-2">
              <Input readonly :value="computedValues.ether" />
              <Button variant="ghost" size="icon" @click="copyToClipboard(computedValues.ether)" aria-label="Copy Ether value">
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div class="space-y-2">
            <Label>Gwei (10^9 Wei)</Label>
            <div class="flex gap-2">
              <Input readonly :value="computedValues.gwei" />
              <Button variant="ghost" size="icon" @click="copyToClipboard(computedValues.gwei)" aria-label="Copy Gwei value">
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div class="space-y-2">
            <Label>Wei</Label>
            <div class="flex gap-2">
              <Input readonly :value="computedValues.wei" />
              <Button variant="ghost" size="icon" @click="copyToClipboard(computedValues.wei)" aria-label="Copy Wei value">
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Educational Content -->
    <div class="max-w-4xl mx-auto w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-xl">Understanding Ethereum Units</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Ethereum's native currency (Ether) has multiple denominations. Understanding the relationship
            between Wei, Gwei, and Ether is essential for smart contract development, gas calculations,
            and DeFi applications.
          </p>

          <h3 class="text-lg font-bold mt-4">Wei — The Smallest Unit</h3>
          <p>
            Named after Wei Dai, a pioneer of cryptography and cryptocurrency. 1 Wei = 1 (10^0). It's the
            base unit — every value in the EVM is ultimately denominated in Wei. Smart contracts always
            operate in Wei, never Ether.
          </p>

          <h3 class="text-lg font-bold mt-4">Gwei — Gas Pricing Unit</h3>
          <p>
            Short for "gigawei" (10^9 Wei). Gas prices on Ethereum are measured in Gwei. During network
            congestion, Gwei can spike from 5-10 to 100-500+. Monitoring Gwei helps you time transactions
            for lower fees. Common ranges:
          </p>
          <ul class="space-y-1">
            <li><strong>&lt; 30 Gwei:</strong> Low network activity — good time for transactions</li>
            <li><strong>30-80 Gwei:</strong> Moderate activity — standard transactions</li>
            <li><strong>80-150 Gwei:</strong> High activity — consider waiting</li>
            <li><strong>&gt; 150 Gwei:</strong> Very high — expensive for complex operations</li>
          </ul>

          <h3 class="text-lg font-bold mt-4">Ether — The Human-Readable Unit</h3>
          <p>
            1 ETH = 10^18 Wei. Used for display purposes and user-facing applications. When building
            smart contracts, always convert user-input Ether to Wei before processing.
          </p>

          <h3 class="text-lg font-bold mt-4">Common Conversion Mistakes</h3>
          <ul class="space-y-1">
            <li><strong>Forgetting decimals:</strong> 1 ETH ≠ 1000000000000000000 — use <code>parseEther("1.0")</code></li>
            <li><strong>Mixing Gwei and Wei:</strong> Gas price is in Gwei, but <code>msg.value</code> is always Wei</li>
            <li><strong>Using Number instead of BigInt:</strong> JavaScript Number can't safely represent Wei values above ~53 bits. Always use BigInt for EVM calculations.</li>
          </ul>
        </CardContent>
      </Card>

      <!-- FAQ Section -->
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              What is the difference between Wei and Gwei?
            </summary>
            <p class="mt-2 text-muted-foreground">
              Wei is the smallest unit of Ether (10^-18 ETH). Gwei (gigawei) is 10^9 Wei, or 10^-9 ETH. Gas prices are typically quoted in Gwei because individual Wei values are too small to be practical for discussion.
            </p>
          </details>
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              Why does my smart contract use Wei instead of Ether?
            </summary>
            <p class="mt-2 text-muted-foreground">
              The EVM operates exclusively in Wei to avoid floating-point precision issues. Solidity doesn't support floating-point numbers, so all values are integers in Wei. Convert to Ether only for display purposes using <code>formatUnits(value, 18)</code>.
            </p>
          </details>
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              How much is 1 Gwei in Ether?
            </summary>
            <p class="mt-2 text-muted-foreground">
              1 Gwei = 0.000000001 ETH (10^-9). So if gas costs 20 Gwei and your transaction uses 21,000 gas units, the total gas fee = 21000 × 20 Gwei = 420,000 Gwei = 0.00042 ETH.
            </p>
          </details>
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              Is this converter accurate for mainnet and L2s?
            </summary>
            <p class="mt-2 text-muted-foreground">
              Yes. All EVM-compatible chains (Ethereum mainnet, Polygon, Arbitrum, Optimism, Base, etc.) use the same Wei/Gwei/Ether denomination system. The conversion math is identical across all EVM networks.
            </p>
          </details>
        </CardContent>
      </Card>

      <!-- Related Tools -->
      <Card>
        <CardHeader>
          <CardTitle>Related Blockchain Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <a href="/tools/keccak256" class="text-primary hover:underline">Keccak-256 Hasher</a>
            <a href="/tools/address-checksum" class="text-primary hover:underline">Address Checksum (EIP-55)</a>
            <a href="/tools/multi-chain-keys" class="text-primary hover:underline">Multi-Chain Wallet</a>
            <a href="/tools/abi-encoder" class="text-primary hover:underline">ABI Encoder &amp; Decoder</a>
            <a href="/tools/solidity-to-opcodes" class="text-primary hover:underline">Solidity to Opcodes</a>
            <a href="/tools/bip39" class="text-primary hover:underline">BIP39 Mnemonic Generator</a>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
