<script setup lang="ts">
import { ref } from 'vue'
import * as bcrypt from 'bcryptjs'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CodeEditor from '@/components/CodeEditor.vue'

const password = ref('')
const saltRounds = ref(10)
const hashResult = ref('')
const hashToVerify = ref('')
const passwordToVerify = ref('')
const verifyResult = ref<'valid' | 'invalid' | ''>('')

const generateHash = () => {
  if (!password.value) return
  hashResult.value = bcrypt.hashSync(password.value, saltRounds.value)
}

const verifyHash = () => {
  if (!hashToVerify.value || !passwordToVerify.value) return
  verifyResult.value = bcrypt.compareSync(passwordToVerify.value, hashToVerify.value)
    ? 'valid'
    : 'invalid'
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Bcrypt Hash Generator/Verifier</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Generator -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Generate Hash</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 space-y-4">
          <div class="grid gap-2">
            <Label>Password</Label>
            <Input v-model="password" type="password" placeholder="Enter password..." />
          </div>
          <div class="grid gap-2">
            <Label>Salt Rounds</Label>
            <Input v-model.number="saltRounds" type="number" min="4" max="20" />
          </div>
          <Button @click="generateHash" class="w-full" aria-label="Generate new hash">Generate Hash</Button>
          <div v-if="hashResult" class="space-y-2">
            <Label>Hash Result</Label>
            <CodeEditor
              :model-value="hashResult"
              language="plaintext"
              :readonly="true"
              min-height="80px"
              :line-numbers="'off'"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Verifier -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Verify Hash</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 space-y-4">
          <div class="grid gap-2">
            <Label>Password</Label>
            <Input
              v-model="passwordToVerify"
              type="password"
              placeholder="Enter password to verify..."
            />
          </div>
          <div class="grid gap-2">
            <Label>Hash</Label>
            <CodeEditor
              v-model="hashToVerify"
              language="plaintext"
              min-height="80px"
              :line-numbers="'off'"
            />
          </div>
          <Button @click="verifyHash" class="w-full">Verify</Button>
          <div
            v-if="verifyResult"
            :class="[
              'p-4 rounded-md text-center font-medium',
              verifyResult === 'valid'
                ? 'bg-green-500/10 text-green-600'
                : 'bg-red-500/10 text-red-600'
            ]"
          >
            {{
              verifyResult === 'valid'
                ? '✓ Password matches hash'
                : '✗ Password does not match hash'
            }}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
