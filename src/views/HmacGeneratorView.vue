<script setup lang="ts">
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const message = ref('')
const secretKey = ref('')
const algorithm = ref('SHA256')
const hmacResult = ref('')

const generateHMAC = () => {
  if (!message.value || !secretKey.value) return

  let hash
  switch (algorithm.value) {
    case 'MD5':
      hash = CryptoJS.HmacMD5(message.value, secretKey.value)
      break
    case 'SHA1':
      hash = CryptoJS.HmacSHA1(message.value, secretKey.value)
      break
    case 'SHA256':
      hash = CryptoJS.HmacSHA256(message.value, secretKey.value)
      break
    case 'SHA384':
      hash = CryptoJS.HmacSHA384(message.value, secretKey.value)
      break
    case 'SHA512':
      hash = CryptoJS.HmacSHA512(message.value, secretKey.value)
      break
    case 'SHA3':
      hash = CryptoJS.HmacSHA3(message.value, secretKey.value)
      break
    default:
      return
  }

  hmacResult.value = hash.toString()
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">HMAC Generator</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Generate HMAC</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="grid gap-2">
            <Label>Algorithm</Label>
            <select
              v-model="algorithm"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="MD5">HMAC-MD5</option>
              <option value="SHA1">HMAC-SHA1</option>
              <option value="SHA256">HMAC-SHA256</option>
              <option value="SHA384">HMAC-SHA384</option>
              <option value="SHA512">HMAC-SHA512</option>
              <option value="SHA3">HMAC-SHA3</option>
            </select>
          </div>
          <div class="grid gap-2 md:col-span-2">
            <Label>Secret Key</Label>
            <Input v-model="secretKey" type="password" placeholder="Enter secret key..." aria-label="HMAC secret key" />
          </div>
        </div>

        <div class="grid gap-2">
          <Label>Message</Label>
          <Textarea v-model="message" placeholder="Enter message to hash..." rows="4" />
        </div>

        <Button @click="generateHMAC" class="w-full md:w-auto" aria-label="Generate HMAC">Generate HMAC</Button>

        <div v-if="hmacResult" class="space-y-2">
          <Label>HMAC Result (hex)</Label>
          <Textarea :model-value="hmacResult" readonly class="font-mono text-sm" rows="3" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
