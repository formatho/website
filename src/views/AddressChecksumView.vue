<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAddress, isAddress, bytesToHex } from 'viem'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy, Info, ShieldAlert } from 'lucide-vue-next'

const address = ref('')

// Calculate character-by-character checksum details
const checksumDetails = computed(() => {
  try {
    if (!address.value || !isAddress(address.value)) return null

    const lowerAddress = address.value.toLowerCase().replace('0x', '')
    const hashBytes = keccak256(Buffer.from(lowerAddress, 'utf-8'))
    const hash = '0x' + bytesToHex(hashBytes)
    const checksummed = getAddress(address.value)

    const details = []
    for (let i = 0; i < 40; i++) {
      const char = lowerAddress[i]
      const hashIndex = Math.floor(i / 2)
      const hashByte = parseInt(hash[2 + hashIndex], 16)
      const isHighNibble = i % 2 === 1
      const threshold = isHighNibble ? hashByte & 0xf : (hashByte >> 4) & 0xf
      const shouldBeUppercase = threshold >= 8
      const actualInputChar = address.value.replace('0x', '')[i] || char
      const actualIsUppercase = actualInputChar !== char

      details.push({
        position: i,
        character: char,
        checksumChar: checksummed.replace('0x', '')[i],
        inputChar: actualInputChar,
        hashValue: hash.slice(2),
        hashIndex,
        hashByte: hash[2 + hashIndex],
        isHighNibble,
        threshold,
        shouldBeUppercase,
        actualIsUppercase,
        isCorrect: shouldBeUppercase === actualIsUppercase
      })
    }

    // Check if input address matches the correct checksum
    const isSpoofed = address.value !== checksummed && address.value !== address.value.toLowerCase()

    return {
      hash,
      checksummed,
      details,
      isSpoofed
    }
  } catch (error) {
    console.error('Checksum details error:', error)
    return null
  }
})

const validationResult = computed(() => {
  if (!address.value) return { status: 'empty', checksum: '', original: '', mixed: false }

  if (isAddress(address.value)) {
    const checksummed = getAddress(address.value)
    const isMixedCase =
      address.value !== address.value.toLowerCase() && address.value !== address.value.toUpperCase()
    const isSpoofed = checksumDetails.value ? checksumDetails.value.isSpoofed : false
    return {
      status: 'valid',
      checksum: checksummed,
      original: address.value,
      mixed: isMixedCase && address.value !== checksummed,
      spoofed: isSpoofed
    }
  }

  return { status: 'invalid', checksum: '', original: '', mixed: false, spoofed: false }
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
      <p class="text-muted-foreground mt-1">
        Validate and convert Ethereum addresses to their correct checksummed format. Prevents loss
        from typos and spoofed addresses.
      </p>
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
          <div
            v-if="validationResult.spoofed"
            class="flex items-start gap-2 text-xs text-red-600 font-medium bg-red-50 dark:bg-red-950/20 p-2 rounded"
          >
            <ShieldAlert class="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <p class="font-bold">⚠️ Spoofed Address Detected!</p>
              <p class="mt-1 text-red-700 dark:text-red-400">
                The capitalization doesn't match EIP-55. This could be a copy-paste error or a
                malicious spoofed address.
              </p>
            </div>
          </div>
          <div
            v-if="validationResult.status === 'valid' && !validationResult.spoofed"
            class="text-xs text-green-600"
          >
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
                @click="copyChecksum"
                aria-label="Copy checksummed address"
                :disabled="validationResult.status !== 'valid'"
              >
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div
            v-if="validationResult.status === 'valid'"
            class="text-xs text-muted-foreground space-y-1"
          >
            <p>
              <strong>Original:</strong>
              <code class="font-mono">{{ validationResult.original }}</code>
            </p>
            <p>
              <strong>Checksummed:</strong>
              <code class="font-mono">{{ validationResult.checksum }}</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Checksum Visualization -->
    <div
      v-if="checksumDetails && checksumDetails.details && checksumDetails.details.length > 0"
      class="max-w-5xl mx-auto w-full"
    >
      <Card>
        <CardHeader>
          <div class="flex items-start justify-between">
            <CardTitle class="text-xl flex items-center gap-2">
              <Info class="h-5 w-5" />
              Character-by-Character Checksum
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="bg-muted/50 p-4 rounded-md">
            <div class="text-xs space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-medium">Keccak-256 Hash:</span>
                <code class="font-mono text-xs break-all">{{ checksumDetails.hash }}</code>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-medium">Lowercase Address:</span>
                <code class="font-mono text-xs">{{ address.value.toLowerCase() }}</code>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-medium">Checksummed:</span>
                <code class="font-mono text-xs">{{ checksumDetails.checksummed }}</code>
              </div>
            </div>
          </div>

          <div class="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>How it works:</strong> For each character in the address, we check the
              corresponding nibble (4-bit) in the Keccak-256 hash:
            </p>
            <ul class="list-disc list-inside space-y-1 ml-2">
              <li>
                If the nibble is <code class="bg-background px-1 rounded">≥ 8</code>, the character
                is <strong class="text-foreground">UPPERCASED</strong>
              </li>
              <li>
                If the nibble is <code class="bg-background px-1 rounded">&lt; 8</code>, the
                character remains <strong class="text-foreground">lowercase</strong>
              </li>
            </ul>
            <p class="mt-2">This creates a 15-bit checksum that catches 99.998% of typos.</p>
          </div>

          <!-- Character Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
              <thead>
                <tr class="border-b">
                  <th class="text-left p-2 font-medium">Pos</th>
                  <th class="text-left p-2 font-medium">Char</th>
                  <th class="text-left p-2 font-medium">Hash Byte</th>
                  <th class="text-left p-2 font-medium">Nibble</th>
                  <th class="text-left p-2 font-medium">Value</th>
                  <th class="text-left p-2 font-medium">Result</th>
                  <th class="text-left p-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(detail, idx) in checksumDetails.details"
                  :key="idx"
                  class="border-b last:border-0"
                  :class="{
                    'bg-red-50 dark:bg-red-950/20': !detail.isCorrect,
                    'bg-green-50 dark:bg-green-950/20': detail.isCorrect
                  }"
                >
                  <td class="p-2 font-mono text-muted-foreground">{{ detail.position }}</td>
                  <td class="p-2">
                    <div class="flex items-center gap-2">
                      <span
                        class="font-mono font-bold text-lg"
                        :class="{
                          uppercase: detail.actualIsUppercase,
                          'text-red-600 dark:text-red-400': !detail.isCorrect
                        }"
                      >
                        {{ detail.inputChar }}
                      </span>
                      <span class="text-muted-foreground">→</span>
                      <span class="font-mono text-muted-foreground">{{ detail.checksumChar }}</span>
                      <span class="text-muted-foreground">({{ detail.character }})</span>
                    </div>
                  </td>
                  <td class="p-2 font-mono text-muted-foreground">
                    <span class="font-bold">{{ detail.hashIndex }}</span>
                    = {{ detail.hashByte }}
                  </td>
                  <td class="p-2 font-mono">{{ detail.isHighNibble ? 'right' : 'left' }}</td>
                  <td class="p-2">
                    <div class="flex items-center gap-2">
                      <span
                        class="font-mono font-bold"
                        :class="detail.threshold >= 8 ? 'text-foreground' : 'text-muted-foreground'"
                      >
                        {{ detail.threshold }}
                      </span>
                      <span class="text-muted-foreground">{{
                        detail.threshold >= 8 ? '≥ 8' : '&lt; 8'
                      }}</span>
                    </div>
                  </td>
                  <td class="p-2">
                    <span
                      class="px-2 py-1 rounded text-xs font-bold"
                      :class="
                        detail.shouldBeUppercase
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-muted-foreground'
                      "
                    >
                      {{ detail.shouldBeUppercase ? 'UPPER' : 'lower' }}
                    </span>
                  </td>
                  <td class="p-2">
                    <div class="flex items-center gap-1">
                      <span
                        v-if="detail.isCorrect"
                        class="text-green-600 dark:text-green-400 font-bold"
                        >✓</span
                      >
                      <span v-else class="text-red-600 dark:text-red-400 font-bold">✗</span>
                      <span
                        :class="
                          detail.isCorrect
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        "
                      >
                        {{ detail.isCorrect ? 'Valid' : 'Invalid' }}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Legend -->
          <div class="flex flex-wrap gap-4 text-xs">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-foreground"></div>
              <span>Threshold ≥ 8 → UPPERCASE</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-muted border border-foreground/20"></div>
              <span>Threshold &lt; 8 → lowercase</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span>Correct casing</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-red-600 dark:text-red-400 font-bold">✗</span>
              <span>Incorrect casing (spoofed)</span>
            </div>
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
          <p>
            Ethereum addresses are 40-character hexadecimal strings. Without checksums, these
            addresses are case-insensitive — meaning <code>0xab...cd</code> and
            <code>0xAB...CD</code> resolve to the same account. This creates a dangerous attack
            vector.
          </p>

          <h3 class="text-lg font-bold mt-4">The Spoofed Address Attack</h3>
          <p>
            An attacker generates a vanity address that looks similar to a known address but uses
            different capitalization. For example:
          </p>
          <div class="bg-muted/50 p-3 rounded-md font-mono text-xs space-y-1">
            <p>
              <strong class="text-red-500">Spoofed:</strong>
              0x<strong>A</strong>e7eC8<strong>B</strong>3C...d<strong>E</strong>4f (attacker's
              address)
            </p>
            <p>
              <strong class="text-green-500">Real: </strong>
              0x<strong>a</strong>E7eC8<strong>b</strong>3C...D<strong>e</strong>4F (victim's
              address)
            </p>
          </div>
          <p>
            At a glance, they look identical. But the capitalization differs — and on networks
            without EIP-55 validation, both are treated as valid inputs. A user copies the wrong
            one, sends funds, and they're gone forever.
          </p>

          <h3 class="text-lg font-bold mt-4">Real-World Incidents</h3>
          <ul class="space-y-3">
            <li>
              <strong>The "Poisoned Address" Attack (2023-2024)</strong> — Attackers sent dust
              transactions from spoofed addresses to victims' wallets. When the victim later copied
              an address from their transaction history, they accidentally copied the attacker's
              lookalike address. Estimated losses exceeded <strong>$100M+</strong> across multiple
              victims.
            </li>
            <li>
              <strong>ENS Name Spoofing</strong> — Attackers registered ENS names similar to
              well-known entities and generated addresses with matching first/last characters,
              making manual verification unreliable without checksum validation.
            </li>
            <li>
              <strong>Clipboard Hijacking</strong> — Malware replaces copied Ethereum addresses with
              attacker-controlled addresses that share the same first and last characters. EIP-55
              checksum verification catches this because the case pattern won't match.
            </li>
          </ul>

          <h3 class="text-lg font-bold mt-4">How EIP-55 Works</h3>
          <p>
            EIP-55 encodes the address using the Keccak-256 hash of the lowercase address itself:
          </p>
          <ol class="space-y-1 list-decimal list-inside">
            <li>Take the lowercase address (without <code>0x</code>)</li>
            <li>Hash it with Keccak-256</li>
            <li>
              For each character in the address: if the corresponding hash nibble ≥ 8, uppercase it
            </li>
            <li>The result is a mixed-case address where the casing is a cryptographic checksum</li>
          </ol>
          <p>
            Any change to even a single character produces a completely different hash, making the
            checksum fail. This gives ~15 bits of error detection — catching 99.998% of typos.
          </p>

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
