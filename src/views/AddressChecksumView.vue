<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAddress, isAddress } from 'viem'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-vue-next'

const address = ref('')

const validationResult = computed(() => {
  if (!address.value) return { status: 'empty', checksum: '', original: '', mixed: false }

  if (isAddress(address.value)) {
    const checksummed = getAddress(address.value)
    const isMixedCase = address.value !== address.value.toLowerCase() && address.value !== address.value.toUpperCase()
    return {
      status: 'valid',
      checksum: checksummed,
      original: address.value,
      mixed: isMixedCase && address.value !== checksummed
    }
  }

  return { status: 'invalid', checksum: '', original: '', mixed: false }
})

const copyChecksum = () => {
  if (validationResult.value.status === 'valid') {
    navigator.clipboard.writeText(validationResult.value.checksum)
  }
}

const exampleAddress = '0xa1b2c3d4e5f67890abcdef1234567890abcdef12'
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-6 bg-muted/30">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Ethereum Address Checksum (EIP-55)</h1>
      <p class="text-muted-foreground mt-1">Validate and convert Ethereum addresses to their correct checksummed format. Prevents loss from typos and spoofed addresses.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <Label>Ethereum Address</Label>
          <Input
            v-model="address"
            placeholder="0x..."
            aria-label="Ethereum address input"
            class="font-mono"
            :class="{
              'border-green-500': validationResult.status === 'valid',
              'border-destructive': validationResult.status === 'invalid'
            }"
          />
          <div v-if="validationResult.status === 'invalid'" class="text-xs text-destructive">
            Invalid Ethereum Address
          </div>
          <div v-if="validationResult.mixed" class="text-xs text-amber-600 font-medium">
            ⚠️ Your address has mixed casing that doesn't match the EIP-55 checksum. The original may be a spoofed address.
          </div>
          <div v-if="validationResult.status === 'valid'" class="text-xs text-green-600">
            ✅ Valid address — checksummed version generated below
          </div>
          <Button variant="outline" size="sm" @click="address = exampleAddress">
            Try Example
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Checksummed Result</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>EIP-55 Checksum Address</Label>
            <div class="flex gap-2 relative">
              <Input readonly :value="validationResult.checksum" class="font-mono text-sm" />
              <Button
                variant="ghost"
                size="icon"
                @click="copyChecksum" aria-label="Copy checksummed address"
                :disabled="validationResult.status !== 'valid'"
              >
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div v-if="validationResult.status === 'valid'" class="text-xs text-muted-foreground space-y-1">
            <p><strong>Original:</strong> <code class="font-mono">{{ validationResult.original }}</code></p>
            <p><strong>Checksummed:</strong> <code class="font-mono">{{ validationResult.checksum }}</code></p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Educational Content -->
    <div class="max-w-5xl mx-auto w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-xl">Why Address Checksums Matter</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>Ethereum addresses are 40-character hexadecimal strings. Without checksums, these addresses are case-insensitive — meaning <code>0xab...cd</code> and <code>0xAB...CD</code> resolve to the same account. This creates a dangerous attack vector.</p>

          <h3 class="text-lg font-bold mt-4">The Spoofed Address Attack</h3>
          <p>An attacker generates a vanity address that looks similar to a known address but uses different capitalization. For example:</p>
          <div class="bg-muted/50 p-3 rounded-md font-mono text-xs space-y-1">
            <p><strong class="text-red-500">Spoofed:</strong> 0x<strong>A</strong>e7eC8<strong>B</strong>3C...d<strong>E</strong>4f (attacker's address)</p>
            <p><strong class="text-green-500">Real:    </strong> 0x<strong>a</strong>E7eC8<strong>b</strong>3C...D<strong>e</strong>4F (victim's address)</p>
          </div>
          <p>At a glance, they look identical. But the capitalization differs — and on networks without EIP-55 validation, both are treated as valid inputs. A user copies the wrong one, sends funds, and they're gone forever.</p>

          <h3 class="text-lg font-bold mt-4">Real-World Incidents</h3>
          <ul class="space-y-3">
            <li>
              <strong>The "Poisoned Address" Attack (2023-2024)</strong> — Attackers sent dust transactions from spoofed addresses to victims' wallets. When the victim later copied an address from their transaction history, they accidentally copied the attacker's lookalike address. Estimated losses exceeded <strong>$100M+</strong> across multiple victims.
            </li>
            <li>
              <strong>ENS Name Spoofing</strong> — Attackers registered ENS names similar to well-known entities and generated addresses with matching first/last characters, making manual verification unreliable without checksum validation.
            </li>
            <li>
              <strong>Clipboard Hijacking</strong> — Malware replaces copied Ethereum addresses with attacker-controlled addresses that share the same first and last characters. EIP-55 checksum verification catches this because the case pattern won't match.
            </li>
          </ul>

          <h3 class="text-lg font-bold mt-4">How EIP-55 Works</h3>
          <p>EIP-55 encodes the address using the Keccak-256 hash of the lowercase address itself:</p>
          <ol class="space-y-1 list-decimal list-inside">
            <li>Take the lowercase address (without <code>0x</code>)</li>
            <li>Hash it with Keccak-256</li>
            <li>For each character in the address: if the corresponding hash nibble ≥ 8, uppercase it</li>
            <li>The result is a mixed-case address where the casing is a cryptographic checksum</li>
          </ol>
          <p>Any change to even a single character produces a completely different hash, making the checksum fail. This gives ~15 bits of error detection — catching 99.998% of typos.</p>

          <h3 class="text-lg font-bold mt-4">Protect Yourself</h3>
          <ul class="space-y-1">
            <li>Always verify addresses using EIP-55 checksum before sending</li>
            <li>Compare the full address, not just first/last characters</li>
            <li>Use address book features in wallets for frequent recipients</li>
            <li>Test with small amounts first for new addresses</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
