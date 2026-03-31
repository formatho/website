<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const secret = ref('')
const digits = ref(6)
const period = ref(30)
const otpCode = ref('')
const remainingTime = ref(30)
let interval: number | null = null

const base32Decode = (base32: string): Uint8Array => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  const cleaned = base32.toUpperCase().replace(/[^A-Z2-7]/g, '')
  const bits = cleaned
    .split('')
    .map((c) => alphabet.indexOf(c).toString(2).padStart(5, '0'))
    .join('')
  const bytes = new Uint8Array(Math.floor(bits.length / 8))
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.substr(i * 8, 8), 2)
  }
  return bytes
}

const hmacSha1 = async (key: Uint8Array, message: Uint8Array): Promise<ArrayBuffer> => {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key.buffer as ArrayBuffer,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  )
  return crypto.subtle.sign('HMAC', cryptoKey, message.buffer as ArrayBuffer)
}

const generateTOTP = async () => {
  if (!secret.value) return

  try {
    const key = base32Decode(secret.value)
    const counter = Math.floor(Date.now() / 1000 / period.value)
    const counterBuffer = new ArrayBuffer(8)
    const counterView = new DataView(counterBuffer)
    counterView.setUint32(4, counter, false)

    const hmac = await hmacSha1(key, new Uint8Array(counterBuffer))
    const hmacArray = new Uint8Array(hmac)
    const lastByte = hmacArray[hmacArray.length - 1] ?? 0
    const offset = lastByte & 0x0f
    const o0 = hmacArray[offset] ?? 0
    const o1 = hmacArray[offset + 1] ?? 0
    const o2 = hmacArray[offset + 2] ?? 0
    const o3 = hmacArray[offset + 3] ?? 0
    const code =
      (((o0 & 0x7f) << 24) | ((o1 & 0xff) << 16) | ((o2 & 0xff) << 8) | (o3 & 0xff)) %
      Math.pow(10, digits.value)

    otpCode.value = code.toString().padStart(digits.value, '0')
  } catch (e) {
    otpCode.value = 'Invalid secret'
  }
}

const updateRemainingTime = () => {
  remainingTime.value = period.value - (Math.floor(Date.now() / 1000) % period.value)
}

onMounted(() => {
  interval = window.setInterval(() => {
    updateRemainingTime()
    if (remainingTime.value === period.value) {
      generateTOTP()
    }
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">OTP/TOTP Generator</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Generate TOTP Code</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="grid gap-2">
            <Label>Secret (Base32)</Label>
            <Input v-model="secret" placeholder="Enter secret..." class="font-mono uppercase" />
          </div>
          <div class="grid gap-2">
            <Label>Digits</Label>
            <select
              v-model.number="digits"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option :value="6">6 digits</option>
              <option :value="8">8 digits</option>
            </select>
          </div>
          <div class="grid gap-2">
            <Label>Period (seconds)</Label>
            <select
              v-model.number="period"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option :value="30">30 seconds</option>
              <option :value="60">60 seconds</option>
            </select>
          </div>
        </div>

        <Button @click="generateTOTP" class="w-full md:w-auto" aria-label="Generate TOTP code">Generate Code</Button>
      </CardContent>
    </Card>

    <div v-if="otpCode" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground mb-2">OTP Code</div>
          <div class="text-5xl font-mono font-bold tracking-widest">{{ otpCode }}</div>
          <div class="mt-4">
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div
                class="h-full bg-primary transition-all duration-1000"
                :style="{ width: `${(remainingTime / period) * 100}%` }"
              ></div>
            </div>
            <div class="text-sm text-muted-foreground mt-2">Expires in {{ remainingTime }}s</div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
