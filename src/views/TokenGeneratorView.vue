<script setup lang="ts">
import { ref, computed } from 'vue'
import { Key, Copy, Check, RefreshCw } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const length = ref(32)
const count = ref(5)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(false)
const customChars = ref('')
const tokens = ref<string[]>([])
const copied = ref<number | null>(null)

const charsets = computed(() => ({
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
}))

const generateToken = (): string => {
  let chars = ''

  if (customChars.value) {
    chars = customChars.value
  } else {
    if (includeUppercase.value) chars += charsets.value.uppercase
    if (includeLowercase.value) chars += charsets.value.lowercase
    if (includeNumbers.value) chars += charsets.value.numbers
    if (includeSymbols.value) chars += charsets.value.symbols
  }

  if (!chars) chars = charsets.value.lowercase + charsets.value.numbers

  const bytes = new Uint8Array(length.value)
  crypto.getRandomValues(bytes)

  let token = ''
  for (let i = 0; i < length.value; i++) {
    const char = chars[bytes[i]! % chars.length]
    token += char ?? ''
  }

  return token
}

const generate = () => {
  tokens.value = Array.from({ length: count.value }, () => generateToken())
}

const copyToken = (index: number) => {
  const token = tokens.value[index]
  if (token) {
    navigator.clipboard.writeText(token)
    copied.value = index
    setTimeout(() => (copied.value = null), 2000)
  }
}

const copyAll = () => {
  navigator.clipboard.writeText(tokens.value.join('\n'))
  copied.value = -1
  setTimeout(() => (copied.value = null), 2000)
}

// Generate initial tokens
generate()
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Key class="w-8 h-8" />
          Token Generator
        </h1>
        <p class="text-muted-foreground mt-2">Generate secure random tokens and API keys.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Options -->
        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
            <CardDescription>Configure token generation</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Length -->
            <div>
              <label class="block text-sm font-medium mb-2">Length: {{ length }}</label>
              <input v-model.number="length" type="range" min="8" max="128" class="w-full" />
              <div class="flex justify-between text-xs text-muted-foreground">
                <span>8</span>
                <span>128</span>
              </div>
            </div>

            <!-- Count -->
            <div>
              <label class="block text-sm font-medium mb-2">Count</label>
              <input
                v-model.number="count"
                type="number"
                min="1"
                max="100"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <!-- Character Sets -->
            <div>
              <label class="block text-sm font-medium mb-2">Character Sets</label>
              <div class="space-y-2">
                <label class="flex items-center gap-2">
                  <input v-model="includeUppercase" type="checkbox" class="rounded" />
                  <span>Uppercase (A-Z)</span>
                </label>
                <label class="flex items-center gap-2">
                  <input v-model="includeLowercase" type="checkbox" class="rounded" />
                  <span>Lowercase (a-z)</span>
                </label>
                <label class="flex items-center gap-2">
                  <input v-model="includeNumbers" type="checkbox" class="rounded" />
                  <span>Numbers (0-9)</span>
                </label>
                <label class="flex items-center gap-2">
                  <input v-model="includeSymbols" type="checkbox" class="rounded" />
                  <span>Symbols (!@#$...)</span>
                </label>
              </div>
            </div>

            <!-- Custom Chars -->
            <div>
              <label class="block text-sm font-medium mb-2">Custom Characters (optional)</label>
              <input
                v-model="customChars"
                type="text"
                placeholder="e.g., ABCDEF0123456789"
                class="w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <!-- Generate Button -->
            <Button @click="generate" class="w-full" aria-label="Generate secure token">
              <RefreshCw class="w-4 h-4 mr-2" />
              Generate Tokens
            </Button>
          </CardContent>
        </Card>

        <!-- Results -->
        <Card class="lg:col-span-2">
          <CardHeader>
            <div class="flex items-center justify-between">
              <div>
                <CardTitle>Generated Tokens</CardTitle>
                <CardDescription
                  >{{ tokens.length }} token(s) of {{ length }} characters</CardDescription
                >
              </div>
              <Button @click="copyAll" variant="outline" size="sm" aria-label="Copy all tokens">
                <component :is="copied === -1 ? Check : Copy" class="w-4 h-4 mr-2" />
                {{ copied === -1 ? 'Copied!' : 'Copy All' }}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div
                v-for="(token, index) in tokens"
                :key="index"
                class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
              >
                <div class="font-mono text-sm break-all">{{ token }}</div>
                <Button @click="copyToken(index)" variant="ghost" size="sm" :aria-label="'Copy token ' + (index + 1)">
                  <component :is="copied === index ? Check : Copy" class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Security Info -->
      <Card class="mt-6">
        <CardHeader>
          <CardTitle>Security Information</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div class="font-semibold">Randomness</div>
              <div class="text-muted-foreground">Cryptographically secure</div>
            </div>
            <div>
              <div class="font-semibold">Entropy</div>
              <div class="text-muted-foreground">{{ Math.floor(length * Math.log2(62)) }} bits</div>
            </div>
            <div>
              <div class="font-semibold">Collision Resistance</div>
              <div class="text-muted-foreground">Extremely low</div>
            </div>
            <div>
              <div class="font-semibold">Best Practice</div>
              <div class="text-muted-foreground">32+ characters</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
