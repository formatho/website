<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Button } from '@/components/ui/button'
import { Binary, Copy, Check, ArrowRightLeft } from 'lucide-vue-next'

const textInput = ref('Hello World')
const binaryInput = ref(
  '01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100'
)
const mode = ref<'text-to-binary' | 'binary-to-text'>('text-to-binary')
const copied = ref(false)

const textToBinary = (text: string): string => {
  return text
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ')
}

const binaryToText = (binary: string): string => {
  const bytes = binary.replace(/[^01]/g, '').match(/.{8}/g) || []
  return bytes.map((byte) => String.fromCharCode(parseInt(byte, 2))).join('')
}

const binaryOutput = computed(() => {
  if (!textInput.value) return ''
  return textToBinary(textInput.value)
})

const textOutput = computed(() => {
  if (!binaryInput.value) return ''
  return binaryToText(binaryInput.value)
})

const copyOutput = () => {
  const output = mode.value === 'text-to-binary' ? binaryOutput.value : textOutput.value
  navigator.clipboard.writeText(output)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const swapMode = () => {
  if (mode.value === 'text-to-binary') {
    const binary = textToBinary(textInput.value)
    binaryInput.value = binary
    mode.value = 'binary-to-text'
  } else {
    const text = binaryToText(binaryInput.value)
    textInput.value = text
    mode.value = 'text-to-binary'
  }
}
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Binary class="w-8 h-8" />
          Text to Binary
        </h1>
        <p class="text-muted-foreground mt-2">Convert text to binary and binary to text.</p>
      </div>

      <!-- Mode Toggle -->
      <Card class="mb-6">
        <CardContent class="py-4">
          <div class="flex items-center justify-center gap-4">
            <Button
              :variant="mode === 'text-to-binary' ? 'default' : 'outline'"
              @click="mode = 'text-to-binary'"
            >
              Text → Binary
            </Button>
            <Button @click="swapMode" variant="ghost" aria-label="Swap conversion mode">
              <ArrowRightLeft class="w-4 h-4" />
            </Button>
            <Button
              :variant="mode === 'binary-to-text' ? 'default' : 'outline'"
              @click="mode = 'binary-to-text'"
            >
              Binary → Text
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Text to Binary -->
      <div v-if="mode === 'text-to-binary'" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Input (Text)</CardTitle>
            <CardDescription>Enter text to convert to binary</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeEditor
              v-model="textInput"
              language="plaintext"
              class="min-h-[128px]"
              placeholder="Enter text..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output (Binary)</CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="binaryOutput" class="space-y-4">
              <div class="p-4 bg-surface-hover rounded-lg border font-mono text-sm break-all">
                {{ binaryOutput }}
              </div>
              <Button @click="copyOutput" class="w-full" aria-label="Copy binary output">
                <component :is="copied ? Check : Copy" class="w-4 h-4 mr-2" />
                {{ copied ? 'Copied!' : 'Copy Binary' }}
              </Button>
            </div>
            <div v-else class="text-center py-8 text-muted-foreground">
              Enter text above to convert
            </div>
          </CardContent>
        </Card>

        <!-- Character Breakdown -->
        <Card v-if="textInput">
          <CardHeader>
            <CardTitle>Character Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-2 px-4">Character</th>
                    <th class="text-left py-2 px-4">ASCII Code</th>
                    <th class="text-left py-2 px-4">Binary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(char, index) in textInput.split('')" :key="index" class="border-b">
                    <td class="py-2 px-4 font-mono text-lg">
                      {{ char === ' ' ? '␣' : char }}
                    </td>
                    <td class="py-2 px-4 font-mono">{{ char.charCodeAt(0) }}</td>
                    <td class="py-2 px-4 font-mono">
                      {{ char.charCodeAt(0).toString(2).padStart(8, '0') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Binary to Text -->
      <div v-else class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Input (Binary)</CardTitle>
            <CardDescription>Enter binary (spaces between bytes optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeEditor
              v-model="binaryInput"
              language="plaintext"
              class="min-h-[128px]"
              placeholder="01001000 01100101 01101100 01101100 01101111..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output (Text)</CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="textOutput" class="space-y-4">
              <div class="p-4 bg-surface-hover rounded-lg border font-mono text-xl break-all">
                {{ textOutput }}
              </div>
              <Button @click="copyOutput" class="w-full" aria-label="Copy text output">
                <component :is="copied ? Check : Copy" class="w-4 h-4 mr-2" />
                {{ copied ? 'Copied!' : 'Copy Text' }}
              </Button>
            </div>
            <div v-else class="text-center py-8 text-muted-foreground">
              Enter binary above to convert
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
