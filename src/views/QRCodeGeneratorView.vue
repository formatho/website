<script setup lang="ts">
import { ref } from 'vue'
import { QrCode, Download, Copy, Check } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import QRCode from 'qrcode'
import CodeEditor from '@/components/CodeEditor.vue'

const text = ref('')
const qrDataUrl = ref('')
const copied = ref(false)
const size = ref(256)
const errorCorrectionLevel = ref<'L' | 'M' | 'Q' | 'H'>('M')
const foreground = ref('#000000')
const background = ref('#FFFFFF')

const generateQR = async () => {
  if (!text.value) {
    qrDataUrl.value = ''
    return
  }

  try {
    qrDataUrl.value = await QRCode.toDataURL(text.value, {
      width: size.value,
      errorCorrectionLevel: errorCorrectionLevel.value,
      color: {
        dark: foreground.value,
        light: background.value
      }
    })
  } catch (err) {
    console.error('Error generating QR code:', err)
  }
}

const downloadQR = () => {
  if (!qrDataUrl.value) return

  const link = document.createElement('a')
  link.download = 'qrcode.png'
  link.href = qrDataUrl.value
  link.click()
}

const copyToClipboard = async () => {
  if (!qrDataUrl.value) return

  try {
    const response = await fetch(qrDataUrl.value)
    const blob = await response.blob()
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const presets = [
  { label: 'URL', value: 'https://example.com' },
  { label: 'Email', value: 'mailto:hello@example.com' },
  { label: 'Phone', value: 'tel:+1234567890' },
  { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
  {
    label: 'vCard',
    value:
      'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD'
  }
]

const applyPreset = (value: string) => {
  text.value = value
  generateQR()
}

// Generate on mount if there's default text
generateQR()
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <QrCode class="w-8 h-8" />
          QR Code Generator
        </h1>
        <p class="text-muted-foreground mt-2">
          Generate QR codes for URLs, text, emails, phone numbers, WiFi, and more.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Input Section -->
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter text or URL to encode</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <!-- Text Input -->
            <div>
              <label class="block text-sm font-medium mb-2">Content</label>
              <CodeEditor
                v-model="text"
                language="plaintext"
                class="min-h-[128px]"
                placeholder="Enter text, URL, or any data..."
              />
            </div>

            <!-- Presets -->
            <div>
              <label class="block text-sm font-medium mb-2">Quick Presets</label>
              <div class="flex flex-wrap gap-2">
                <Button
                  v-for="preset in presets"
                  :key="preset.label"
                  variant="outline"
                  size="sm"
                  @click="applyPreset(preset.value)"
                >
                  {{ preset.label }}
                </Button>
              </div>
            </div>

            <!-- Settings -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Size</label>
                <input
                  v-model.number="size"
                  @input="generateQR"
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  class="w-full"
                />
                <div class="text-sm text-muted-foreground text-center">{{ size }}x{{ size }}px</div>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Error Correction</label>
                <select
                  v-model="errorCorrectionLevel"
                  @change="generateQR"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Foreground</label>
                <input
                  v-model="foreground"
                  @input="generateQR"
                  type="color"
                  class="w-full h-10 cursor-pointer"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Background</label>
                <input
                  v-model="background"
                  @input="generateQR"
                  type="color"
                  class="w-full h-10 cursor-pointer"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Output Section -->
        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <CardDescription>Generated QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <div v-if="qrDataUrl" class="space-y-4">
              <!-- QR Code Display -->
              <div class="flex justify-center p-8 bg-white rounded-lg">
                <img :src="qrDataUrl" alt="QR Code" class="max-w-full" />
              </div>

              <!-- Actions -->
              <div class="flex gap-2">
                <Button @click="downloadQR" class="flex-1">
                  <Download class="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
                <Button @click="copyToClipboard" variant="outline" class="flex-1">
                  <component :is="copied ? Check : Copy" class="w-4 h-4 mr-2" />
                  {{ copied ? 'Copied!' : 'Copy to Clipboard' }}
                </Button>
              </div>
            </div>

            <div v-else class="text-center py-16 text-muted-foreground">
              <QrCode class="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Enter text above to generate QR code</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
