<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ibanInput = ref('')

interface IbanInfo {
  valid: boolean
  countryCode: string
  checkDigits: string
  bban: string
  formatted: string
  bankCode?: string
  accountNumber?: string
}

const countryLengths: Record<string, number> = {
  AL: 28,
  AD: 24,
  AT: 20,
  AZ: 28,
  BE: 16,
  BH: 22,
  BA: 20,
  BR: 29,
  BG: 22,
  CR: 21,
  HR: 21,
  CY: 28,
  CZ: 24,
  DK: 18,
  DO: 28,
  EE: 20,
  FO: 18,
  FI: 18,
  FR: 27,
  GE: 22,
  DE: 22,
  GI: 23,
  GR: 27,
  GL: 18,
  GT: 28,
  HU: 28,
  IS: 26,
  IE: 22,
  IL: 23,
  IT: 27,
  JO: 30,
  KZ: 20,
  KW: 30,
  LV: 21,
  LB: 28,
  LI: 21,
  LT: 20,
  LU: 20,
  MK: 19,
  MT: 31,
  MR: 27,
  MU: 30,
  MC: 27,
  MD: 24,
  ME: 22,
  NL: 18,
  NO: 15,
  PK: 24,
  PS: 29,
  PL: 28,
  PT: 25,
  QA: 29,
  RO: 24,
  SM: 27,
  SA: 24,
  RS: 22,
  SK: 24,
  SI: 19,
  ES: 24,
  SE: 24,
  CH: 21,
  TN: 24,
  TR: 26,
  AE: 23,
  GB: 22,
  VG: 24
}

const validateIban = (iban: string): IbanInfo | null => {
  if (!iban) return null

  // Remove spaces and convert to uppercase
  const cleaned = iban.replace(/\s/g, '').toUpperCase()

  // Basic format check
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(cleaned)) {
    return {
      valid: false,
      countryCode: '',
      checkDigits: '',
      bban: '',
      formatted: cleaned
    }
  }

  const countryCode = cleaned.slice(0, 2)
  const checkDigits = cleaned.slice(2, 4)
  const bban = cleaned.slice(4)

  // Check length
  const expectedLength = countryLengths[countryCode]
  if (expectedLength && cleaned.length !== expectedLength) {
    return {
      valid: false,
      countryCode,
      checkDigits,
      bban,
      formatted: formatIban(cleaned)
    }
  }

  // Check digit validation (mod-97)
  const rearranged = bban + countryCode + checkDigits
  const numeric = rearranged
    .split('')
    .map((c) => {
      const code = c.charCodeAt(0)
      return code >= 65 && code <= 90 ? (code - 55).toString() : c
    })
    .join('')

  let remainder = 0
  for (let i = 0; i < numeric.length; i++) {
    const char = numeric[i]
    remainder = (remainder * 10 + parseInt(char ?? '0')) % 97
  }

  const valid = remainder === 1

  return {
    valid,
    countryCode,
    checkDigits,
    bban,
    formatted: formatIban(cleaned),
    bankCode: bban.slice(0, 4),
    accountNumber: bban.slice(4)
  }
}

const formatIban = (iban: string): string => {
  return iban.replace(/(.{4})/g, '$1 ').trim()
}

const ibanInfo = computed(() => {
  return validateIban(ibanInput.value)
})

const copyIban = () => {
  if (ibanInfo.value?.formatted) {
    navigator.clipboard.writeText(ibanInfo.value.formatted.replace(/\s/g, ''))
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">IBAN Validator & Parser</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Validate IBAN</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>IBAN</Label>
          <Input
            v-model="ibanInput"
            placeholder="DE89 3704 0044 0532 0130 00"
            class="font-mono uppercase"
            aria-label="IBAN input for validation"
          />
        </div>
      </CardContent>
    </Card>

    <div v-if="ibanInfo" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Valid</div>
          <div :class="['text-3xl font-bold', ibanInfo.valid ? 'text-green-600' : 'text-red-600']">
            {{ ibanInfo.valid ? '✓ Valid' : '✗ Invalid' }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Country</div>
          <div class="text-3xl font-bold">{{ ibanInfo.countryCode || 'Unknown' }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Check Digits</div>
          <div class="text-2xl font-mono">{{ ibanInfo.checkDigits || '-' }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">BBAN</div>
          <div class="text-xl font-mono break-all">{{ ibanInfo.bban || '-' }}</div>
        </CardContent>
      </Card>

      <Card class="md:col-span-2">
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Formatted</div>
          <div class="text-xl font-mono">{{ ibanInfo.formatted }}</div>
          <Button
            v-if="ibanInfo.formatted"
            variant="ghost"
            size="sm"
            class="mt-2"
            @click="copyIban"
          >
            Copy
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
