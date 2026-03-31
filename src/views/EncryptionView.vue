<script setup lang="ts">
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const plaintext = ref('')
const secretKey = ref('')
const ciphertext = ref('')
const decryptText = ref('')
const decryptKey = ref('')
const decryptResult = ref('')
const algorithm = ref('AES')
const error = ref('')

const encrypt = () => {
  try {
    error.value = ''
    if (!plaintext.value || !secretKey.value) return

    switch (algorithm.value) {
      case 'AES':
        ciphertext.value = CryptoJS.AES.encrypt(plaintext.value, secretKey.value).toString()
        break
      case 'DES':
        ciphertext.value = CryptoJS.DES.encrypt(plaintext.value, secretKey.value).toString()
        break
      case 'TripleDES':
        ciphertext.value = CryptoJS.TripleDES.encrypt(plaintext.value, secretKey.value).toString()
        break
      case 'Rabbit':
        ciphertext.value = CryptoJS.Rabbit.encrypt(plaintext.value, secretKey.value).toString()
        break
      case 'RC4':
        ciphertext.value = CryptoJS.RC4.encrypt(plaintext.value, secretKey.value).toString()
        break
    }
  } catch (e) {
    error.value = 'Encryption failed'
  }
}

const decrypt = () => {
  try {
    error.value = ''
    if (!decryptText.value || !decryptKey.value) return

    switch (algorithm.value) {
      case 'AES':
        decryptResult.value = CryptoJS.AES.decrypt(decryptText.value, decryptKey.value).toString(
          CryptoJS.enc.Utf8
        )
        break
      case 'DES':
        decryptResult.value = CryptoJS.DES.decrypt(decryptText.value, decryptKey.value).toString(
          CryptoJS.enc.Utf8
        )
        break
      case 'TripleDES':
        decryptResult.value = CryptoJS.TripleDES.decrypt(
          decryptText.value,
          decryptKey.value
        ).toString(CryptoJS.enc.Utf8)
        break
      case 'Rabbit':
        decryptResult.value = CryptoJS.Rabbit.decrypt(decryptText.value, decryptKey.value).toString(
          CryptoJS.enc.Utf8
        )
        break
      case 'RC4':
        decryptResult.value = CryptoJS.RC4.decrypt(decryptText.value, decryptKey.value).toString(
          CryptoJS.enc.Utf8
        )
        break
    }

    if (!decryptResult.value) {
      error.value = 'Decryption failed - wrong key or invalid ciphertext'
    }
  } catch (e) {
    error.value = 'Decryption failed'
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Text Encryption/Decryption</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Encrypt -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Encrypt</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 space-y-4">
          <div class="grid gap-2">
            <Label>Algorithm</Label>
            <select
              v-model="algorithm"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="AES">AES</option>
              <option value="DES">DES</option>
              <option value="TripleDES">TripleDES</option>
              <option value="Rabbit">Rabbit</option>
              <option value="RC4">RC4</option>
            </select>
          </div>
          <div class="grid gap-2">
            <Label>Secret Key</Label>
            <Input v-model="secretKey" type="password" placeholder="Enter secret key..." aria-label="Encryption key" />
          </div>
          <div class="grid gap-2">
            <Label>Plaintext</Label>
            <Textarea v-model="plaintext" placeholder="Enter text to encrypt..." rows="4" />
          </div>
          <Button @click="encrypt" class="w-full">Encrypt</Button>
          <div v-if="ciphertext" class="space-y-2">
            <Label>Ciphertext</Label>
            <Textarea :model-value="ciphertext" readonly class="font-mono text-sm" rows="3" />
          </div>
        </CardContent>
      </Card>

      <!-- Decrypt -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Decrypt</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 space-y-4">
          <div class="grid gap-2">
            <Label>Secret Key</Label>
            <Input v-model="decryptKey" type="password" placeholder="Enter secret key..." aria-label="Decryption key" />
          </div>
          <div class="grid gap-2">
            <Label>Ciphertext</Label>
            <Textarea
              v-model="decryptText"
              placeholder="Enter ciphertext to decrypt..."
              rows="4"
              class="font-mono text-sm"
            />
          </div>
          <Button @click="decrypt" class="w-full">Decrypt</Button>
          <div v-if="decryptResult" class="space-y-2">
            <Label>Plaintext</Label>
            <Textarea :model-value="decryptResult" readonly rows="3" />
          </div>
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
