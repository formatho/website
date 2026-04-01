<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const phoneNumber = ref('')
const countryCode = ref('US')

interface ParsedPhone {
  valid: boolean
  international: string
  national: string
  country: string
  e164: string
}

const parsePhone = (input: string, country: string): ParsedPhone | null => {
  if (!input) return null

  // Remove all non-digit characters except +
  const cleaned = input.replace(/[^\d+]/g, '')

  // Simple US phone parser
  if (country === 'US') {
    const digits = cleaned.replace('+1', '').replace(/\D/g, '')
    if (digits.length === 10) {
      return {
        valid: true,
        international: `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`,
        national: `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`,
        country: 'United States',
        e164: `+1${digits}`
      }
    }
  }

  // Generic international format
  if (cleaned.startsWith('+') && cleaned.length >= 8) {
    return {
      valid: true,
      international: cleaned,
      national: cleaned,
      country: 'International',
      e164: cleaned
    }
  }

  return {
    valid: false,
    international: input,
    national: input,
    country: 'Unknown',
    e164: input
  }
}

const parsedPhone = computed(() => {
  return parsePhone(phoneNumber.value, countryCode.value)
})

const copyValue = (value: string) => {
  navigator.clipboard.writeText(value)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Phone Parser & Formatter</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Parse Phone Number</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label>Phone Number</Label>
            <Input v-model="phoneNumber" placeholder="+1 (555) 123-4567" class="font-mono" />
          </div>
          <div class="grid gap-2">
            <Label>Country</Label>
            <select
              v-model="countryCode"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IN">India</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>

    <div v-if="parsedPhone" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-1">Valid</div>
          <div
            :class="['text-2xl font-bold', parsedPhone.valid ? 'text-green-600' : 'text-red-600']"
          >
            {{ parsedPhone.valid ? '✓ Yes' : '✗ No' }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-1">Country</div>
          <div class="text-2xl font-bold">{{ parsedPhone.country }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-2">E.164 Format</div>
          <div class="font-mono text-lg">{{ parsedPhone.e164 }}</div>
          <Button variant="ghost" size="sm" class="mt-2" @click="copyValue(parsedPhone.e164)" aria-label="Copy E164 format">
            >Copy</Button
          >
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-2">National Format</div>
          <div class="font-mono text-lg">{{ parsedPhone.national }}</div>
          <Button variant="ghost" size="sm" class="mt-2" @click="copyValue(parsedPhone.national)" aria-label="Copy national format">
            >Copy</Button
          >
        </CardContent>
      </Card>

      <Card class="md:col-span-2">
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-2">International Format</div>
          <div class="font-mono text-lg">{{ parsedPhone.international }}</div>
          <Button
            variant="ghost"
            size="sm"
            class="mt-2"
            @click="copyValue(parsedPhone.international)"
            >Copy</Button
          >
        </CardContent>
      </Card>
    </div>
  </div>
</template>
