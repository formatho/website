<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const ssid = ref('')
const password = ref('')
const encryption = ref('WPA')
const qrDataUrl = ref('')

const generateQR = async () => {
  if (!ssid.value) return

  // WiFi QR code format: WIFI:T:<encryption>;S:<ssid>;P:<password>;;
  const wifiString = `WIFI:T:${encryption.value};S:${ssid.value};P:${password.value};;`

  // Use a simple QR code library approach or API
  // For now, we'll use an external QR code API
  const size = 300
  qrDataUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(wifiString)}`
}

const downloadQR = () => {
  const a = document.createElement('a')
  a.href = qrDataUrl.value
  a.download = `wifi-${ssid.value}.png`
  a.click()
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">WiFi QR Code Generator</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>WiFi Details</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-2">
            <Label>Network Name (SSID)</Label>
            <Input v-model="ssid" placeholder="Enter WiFi network name..." />
          </div>
          <div class="grid gap-2">
            <Label>Password</Label>
            <Input v-model="password" type="password" placeholder="Enter WiFi password..." />
          </div>
          <div class="grid gap-2">
            <Label>Encryption</Label>
            <select
              v-model="encryption"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
          <Button @click="generateQR" class="w-full" aria-label="Generate WiFi QR code">Generate QR Code</Button>
        </CardContent>
      </Card>

      <Card v-if="qrDataUrl">
        <CardHeader class="flex-row items-center justify-between">
          <CardTitle>QR Code</CardTitle>
          <Button variant="outline" size="sm" @click="downloadQR">Download</Button>
        </CardHeader>
        <CardContent class="flex justify-center">
          <img :src="qrDataUrl" alt="WiFi QR Code" class="max-w-full rounded-lg shadow-lg" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
