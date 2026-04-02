<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as bip39 from 'bip39'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const wordCount = ref(12)
const mnemonic = ref('')
const seed = ref('')
const passphrase = ref('')
const entropy = ref('')
const isReady = ref(false)

const generateMnemonic = () => {
  const strength =
    wordCount.value === 12
      ? 128
      : wordCount.value === 15
        ? 160
        : wordCount.value === 18
          ? 192
          : wordCount.value === 21
            ? 224
            : 256
  mnemonic.value = bip39.generateMnemonic(strength)
  updateSeed()
}

const updateSeed = async () => {
  if (mnemonic.value) {
    try {
      const seedBytes = await bip39.mnemonicToSeed(mnemonic.value, passphrase.value)
      seed.value = Array.from(seedBytes).map(b => b.toString(16).padStart(2, '0')).join('')
    } catch (err) {
      console.error('Seed derivation failed:', err)
      seed.value = 'Error deriving seed'
    }
  }
}

const validateMnemonic = () => {
  return mnemonic.value ? bip39.validateMnemonic(mnemonic.value) : false
}

// Only run after mount (client-side) to avoid SSR crypto issues
onMounted(() => {
  isReady.value = true
  generateMnemonic()
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">BIP39 Mnemonic Generator</h1>
    </div>

    <div v-if="isReady" class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Generate -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Generate Mnemonic</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 space-y-4">
          <div class="grid gap-2">
            <Label>Word Count</Label>
            <select
              v-model.number="wordCount"
              aria-label="Mnemonic word count"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option :value="12">12 words</option>
              <option :value="15">15 words</option>
              <option :value="18">18 words</option>
              <option :value="21">21 words</option>
              <option :value="24">24 words</option>
            </select>
          </div>
          <Button @click="generateMnemonic" class="w-full" aria-label="Generate new BIP39 mnemonic">Generate New Mnemonic</Button>

          <div class="space-y-2">
            <Label>Mnemonic Phrase</Label>
            <Textarea
              v-model="mnemonic"
              @input="updateSeed"
              rows="4"
              aria-label="BIP39 mnemonic phrase"
              class="font-mono"
              placeholder="Enter or generate mnemonic..."
            />
            <div
              v-if="mnemonic"
              :class="['text-sm', validateMnemonic() ? 'text-green-600' : 'text-red-600']"
            >
              {{ validateMnemonic() ? '✓ Valid BIP39 mnemonic' : '✗ Invalid mnemonic' }}
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Seed -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Derive Seed</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 space-y-4">
          <div class="grid gap-2">
            <Label>Passphrase (optional)</Label>
            <Input
              v-model="passphrase"
              @input="updateSeed"
              type="password"
              aria-label="BIP39 passphrase"
              placeholder="Enter passphrase..."
            />
          </div>
          <div class="space-y-2">
            <Label>Seed (hex)</Label>
            <Textarea :model-value="seed" readonly aria-label="Derived seed hex" rows="8" class="font-mono text-xs" />
          </div>
          <div class="space-y-2">
            <Label>Entropy (hex)</Label>
            <Textarea :model-value="entropy" readonly aria-label="Entropy hex" rows="3" class="font-mono text-xs" />
          </div>
        </CardContent>
      </Card>
    </div>
    <div v-else class="flex items-center justify-center py-20 text-muted-foreground">
      Loading...
    </div>
  </div>
</template>
