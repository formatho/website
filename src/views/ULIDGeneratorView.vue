<script setup lang="ts">
import { ref } from 'vue'
import { Fingerprint, Copy, Check, RefreshCw, Trash2 } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ulids = ref<string[]>([])
const count = ref(10)
const copied = ref<number | null>(null)

// ULID generation (Crockford's Base32)
const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

const generateUlid = (): string => {
  const now = Date.now()

  // Time component (10 characters)
  const time: string[] = []
  let timestamp = now
  for (let i = 0; i < 10; i++) {
    const char = ENCODING[timestamp % 32]
    time.unshift(char ?? '0')
    timestamp = Math.floor(timestamp / 32)
  }

  // Random component (16 characters)
  const random: string[] = []
  const randomBytes = new Uint8Array(16)
  crypto.getRandomValues(randomBytes)

  for (let i = 0; i < 16; i++) {
    const byte = randomBytes[i]
    const char = byte !== undefined ? ENCODING[byte % 32] : '0'
    random.push(char ?? '0')
  }

  return time.join('') + random.join('')
}

const parseUlid = (ulid: string): { timestamp: number; date: string } => {
  const timeComponent = ulid.slice(0, 10)
  let timestamp = 0

  for (let i = 0; i < timeComponent.length; i++) {
    const char = timeComponent[i] ?? '0'
    const value = ENCODING.indexOf(char)
    timestamp = timestamp * 32 + value
  }

  return {
    timestamp,
    date: new Date(timestamp).toISOString()
  }
}

const generate = () => {
  ulids.value = Array.from({ length: count.value }, () => generateUlid())
}

const generateOne = () => {
  ulids.value.unshift(generateUlid())
}

const clear = () => {
  ulids.value = []
}

const copyUlid = (index: number) => {
  const ulid = ulids.value[index]
  if (ulid) {
    navigator.clipboard.writeText(ulid)
    copied.value = index
    setTimeout(() => (copied.value = null), 2000)
  }
}

const copyAll = () => {
  navigator.clipboard.writeText(ulids.value.join('\n'))
  copied.value = -1
  setTimeout(() => (copied.value = null), 2000)
}

// Generate initial ULIDs
generate()
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Fingerprint class="w-8 h-8" />
          ULID Generator
        </h1>
        <p class="text-muted-foreground mt-2">
          Generate Universally Unique Lexicographically Sortable Identifiers.
        </p>
      </div>

      <!-- Controls -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle>Generate ULIDs</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex gap-4 items-end">
            <div class="flex-1">
              <label class="block text-sm mb-2">Count</label>
              <input
                v-model.number="count"
                type="number"
                min="1"
                max="1000"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button @click="generate" class="flex-1" aria-label="Generate ULID">
              <RefreshCw class="w-4 h-4 mr-2" />
              Generate {{ count }}
            </Button>
            <Button @click="generateOne" variant="outline" class="flex-1" aria-label="Generate one ULID"> + Generate One </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Results -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>Generated ULIDs</CardTitle>
              <CardDescription>{{ ulids.length }} ULID(s)</CardDescription>
            </div>
            <div class="flex gap-2">
              <Button v-if="ulids.length > 0" @click="copyAll" variant="outline" size="sm">
                <component :is="copied === -1 ? Check : Copy" class="w-4 h-4 mr-2" />
                {{ copied === -1 ? 'Copied!' : 'Copy All' }}
              </Button>
              <Button v-if="ulids.length > 0" @click="clear" variant="outline" size="sm">
                <Trash2 class="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="ulids.length > 0" class="space-y-2">
            <div
              v-for="(ulid, index) in ulids"
              :key="ulid"
              class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
            >
              <div class="flex-1">
                <div class="font-mono text-lg">{{ ulid }}</div>
                <div class="text-xs text-muted-foreground mt-1">
                  {{ parseUlid(ulid).date }}
                </div>
              </div>
              <Button @click="copyUlid(index)" variant="ghost" size="sm">
                <component :is="copied === index ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div v-else class="text-center py-8 text-muted-foreground">
            <Fingerprint class="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Click "Generate" to create ULIDs</p>
          </div>
        </CardContent>
      </Card>

      <!-- Info -->
      <Card class="mt-6">
        <CardHeader>
          <CardTitle>About ULIDs</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="font-semibold">Format</div>
              <div class="text-muted-foreground">26 characters</div>
            </div>
            <div>
              <div class="font-semibold">Encoding</div>
              <div class="text-muted-foreground">Crockford's Base32</div>
            </div>
            <div>
              <div class="font-semibold">Time Component</div>
              <div class="text-muted-foreground">First 10 chars (48 bits)</div>
            </div>
            <div>
              <div class="font-semibold">Random Component</div>
              <div class="text-muted-foreground">Last 16 chars (80 bits)</div>
            </div>
            <div>
              <div class="font-semibold">Timestamp Precision</div>
              <div class="text-muted-foreground">Milliseconds</div>
            </div>
            <div>
              <div class="font-semibold">Sortability</div>
              <div class="text-muted-foreground">Lexicographically sortable</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
