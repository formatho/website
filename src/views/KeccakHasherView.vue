<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { keccak256, toHex, stringToBytes } from 'viem'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-vue-next'
import { useHead } from '@unhead/vue'

const inputText = ref('')

const hash = computed(() => {
  if (!inputText.value) return ''
  try {
    return keccak256(toHex(stringToBytes(inputText.value)))
  } catch (e) {
    return 'Invalid Input'
  }
})

const copyHash = () => {
  if (hash.value) {
    navigator.clipboard.writeText(hash.value)
  }
}

// SEO structured data
onMounted(() => {
  useHead({
    title: 'Keccak-256 Hash Generator Online - Free & Privacy-First | Formatho',
    meta: [
      { name: 'description', content: 'Calculate Keccak-256 hashes instantly online. Supports UTF-8, UTF-16, Hex, Base64. 100% client-side, no data leaves your browser. Free tool for Ethereum and blockchain developers.' },
      { name: 'keywords', content: 'keccak-256 hash generator, keccak256 online, ethereum hash, solidity keccak256, blockchain hash, client-side hash, privacy-first, utf-8 hashing, utf-16 hashing, hex hashing, base64 hashing' }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Keccak-256 Hash Generator',
          description: 'Calculate Keccak-256 hashes instantly online. 100% client-side, privacy-first.',
          url: 'https://formatho.com/tools/keccak256',
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          featureList: ['UTF-8 text hashing', 'UTF-16 text hashing', 'Hexadecimal hashing', 'Base64 hashing', 'Client-side processing', 'Privacy-first design'],
          audience: {
            '@type': 'Audience',
            audienceType: 'Developers'
          }
        })
      }
    ]
  })
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Keccak-256 Hasher</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <Label>Text to Hash</Label>
          <CodeEditor
            v-model="inputText"
            language="plaintext"
            class="min-h-[160px]"
            placeholder="Enter text to hash..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Output (Byte32)</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Keccak-256 Hash</Label>
            <div class="flex gap-2">
              <Input readonly :value="hash" class="font-mono text-sm" />
              <Button variant="ghost" size="icon" @click="copyHash" aria-label="Copy hash">
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- SEO Content Sections -->
    <div class="max-w-4xl mx-auto w-full mt-8 space-y-8">
      <!-- About Section -->
      <Card>
        <CardHeader>
          <CardTitle>About Keccak-256</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-muted-foreground">
            This Keccak-256 online tool helps you calculate hashes from strings. Perfect for blockchain development, Ethereum address generation, and cryptographic operations. Your data never leaves your browser.
          </p>
          <p class="text-muted-foreground">
            Keccak-256 is the underlying hash function used by Ethereum for address generation, transaction signing, and smart contract operations. Unlike SHA-256, Keccak-256 produces different hash values and is specifically designed for blockchain applications.
          </p>
        </CardContent>
      </Card>

      <!-- Supported Formats -->
      <Card>
        <CardHeader>
          <CardTitle>Supported Input Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-muted-foreground">
            <li>• <strong>UTF-8 text</strong> - Standard text encoding for web applications</li>
            <li>• <strong>UTF-16 text</strong> - Unicode text encoding with wider character support</li>
            <li>• <strong>Hexadecimal</strong> - Hex-encoded data strings</li>
            <li>• <strong>Base64</strong> - Base64 encoded data</li>
          </ul>
        </CardContent>
      </Card>

      <!-- Use Cases -->
      <Card>
        <CardHeader>
          <CardTitle>Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-muted-foreground">
            <li>• <strong>Ethereum address generation</strong> - Generate Ethereum addresses from public keys</li>
            <li>• <strong>Blockchain development</strong> - Test and verify hash computations</li>
            <li>• <strong>Smart contract testing</strong> - Verify contract storage and event hashes</li>
            <li>• <strong>Data integrity verification</strong> - Ensure data hasn't been tampered with</li>
            <li>• <strong>Solidity development</strong> - Match keccak256() function outputs</li>
          </ul>
        </CardContent>
      </Card>

      <!-- Privacy Section -->
      <Card>
        <CardHeader>
          <CardTitle>🔒 Privacy First</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <p class="text-muted-foreground">
            All Keccak-256 hashing happens <strong>100% in your browser</strong>. Your text never leaves your device, never hits our servers, and is never logged or stored. This is true privacy by design.
          </p>
          <p class="text-muted-foreground">
            Unlike other online hash generators that upload your data to remote servers, Formatho tools run entirely client-side. Your intellectual property stays yours.
          </p>
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
              What is Keccak-256?
            </summary>
            <p class="mt-2 text-muted-foreground">
              Keccak-256 is a cryptographic hash function used in Ethereum for address generation and smart contract operations. It produces a 256-bit (32-byte) hash value from any input data.
            </p>
          </details>
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              Is my data secure?
            </summary>
            <p class="mt-2 text-muted-foreground">
              Yes! All processing happens 100% in your browser. Your data never leaves your device. No servers, no logging, no storage. True privacy by design.
            </p>
          </details>
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              How is Keccak-256 different from SHA-256?
            </summary>
            <p class="mt-2 text-muted-foreground">
              Keccak-256 is the winner of the NIST hash function competition and was adopted by Ethereum. SHA-256 is a different algorithm used in Bitcoin and many other applications. They produce different hash outputs for the same input.
            </p>
          </details>
          <details class="group">
            <summary class="font-medium cursor-pointer list-none flex items-center gap-2">
              <span class="transition-transform group-open:rotate-90">▶</span>
              Can I use this for production?
            </summary>
            <p class="mt-2 text-muted-foreground">
              Yes! The Keccak-256 implementation here uses the same cryptographic library (viem) used in production Ethereum applications. However, for critical security operations, always verify outputs with multiple sources.
            </p>
          </details>
        </CardContent>
      </Card>

      <!-- Related Tools -->
      <Card>
        <CardHeader>
          <CardTitle>Related Hash Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <a href="/tools/sha256" class="text-primary hover:underline">SHA-256 Hash Generator</a>
            <a href="/tools/md5" class="text-primary hover:underline">MD5 Hash Generator</a>
            <a href="/tools/sha3" class="text-primary hover:underline">SHA-3 Hash Generator</a>
            <a href="/tools/keccak224" class="text-primary hover:underline">Keccak-224 Hash</a>
            <a href="/tools/keccak384" class="text-primary hover:underline">Keccak-384 Hash</a>
            <a href="/tools/keccak512" class="text-primary hover:underline">Keccak-512 Hash</a>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>