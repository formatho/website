<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const emailInput = ref('')

const normalizedEmail = computed(() => {
  if (!emailInput.value) return ''
  return emailInput.value.toLowerCase().trim()
})

const analysis = computed(() => {
  const email = normalizedEmail.value
  if (!email) return null

  const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const parts = email.split('@')
  const localPart = parts[0] || ''
  const domain = parts[1] || ''

  return {
    normalized: email,
    validFormat,
    localPart,
    domain,
    length: email.length,
    hasPlus: localPart.includes('+'),
    hasDot: localPart.includes('.')
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Email Normalizer</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Normalize Email Address</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>Input Email</Label>
          <Input v-model="emailInput" placeholder="Enter email address..." aria-label="Email address to normalize" />
        </div>
      </CardContent>
    </Card>

    <div v-if="analysis" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Normalized Email</div>
          <div class="text-xl font-mono font-bold break-all">{{ analysis.normalized }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Valid Format</div>
          <div
            :class="[
              'text-2xl font-bold',
              analysis.validFormat ? 'text-green-600' : 'text-red-600'
            ]"
          >
            {{ analysis.validFormat ? '✓ Yes' : '✗ No' }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Local Part</div>
          <div class="text-xl font-mono break-all">{{ analysis.localPart }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Domain</div>
          <div class="text-xl font-mono break-all">{{ analysis.domain }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-3">Analysis</div>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="p-2 rounded bg-muted">Length: {{ analysis.length }} chars</div>
            <div
              :class="[
                'p-2 rounded',
                analysis.hasPlus ? 'bg-blue-500/10 text-blue-600' : 'bg-muted'
              ]"
            >
              Has +: {{ analysis.hasPlus ? 'Yes' : 'No' }}
            </div>
            <div
              :class="[
                'p-2 rounded',
                analysis.hasDot ? 'bg-blue-500/10 text-blue-600' : 'bg-muted'
              ]"
            >
              Has dot: {{ analysis.hasDot ? 'Yes' : 'No' }}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
