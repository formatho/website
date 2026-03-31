<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ipAddress = ref('')

interface IpInfo {
  decimal: string
  binary: string
  hex: string
  octal: string
  reverseDns: string
}

const ipInfo = computed<IpInfo | null>(() => {
  if (!ipAddress.value) return null

  const parts = ipAddress.value.split('.')
  if (parts.length !== 4) return null

  const octets = parts.map((p) => parseInt(p, 10))
  if (octets.some((p) => isNaN(p) || p < 0 || p > 255)) return null

  const o0 = octets[0] ?? 0
  const o1 = octets[1] ?? 0
  const o2 = octets[2] ?? 0
  const o3 = octets[3] ?? 0

  const decimal = (o0 << 24) + (o1 << 16) + (o2 << 8) + o3

  return {
    decimal: decimal.toString(),
    binary: octets.map((o) => o.toString(2).padStart(8, '0')).join('.'),
    hex: octets.map((o) => o.toString(16).toUpperCase().padStart(2, '0')).join('.'),
    octal: octets.map((o) => o.toString(8).padStart(3, '0')).join('.'),
    reverseDns: `${o3}.${o2}.${o1}.${o0}.in-addr.arpa`
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">IPv4 Address Converter</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-2">
          <Label>IPv4 Address</Label>
          <Input v-model="ipAddress" placeholder="192.168.1.1" class="font-mono" aria-label="IPv4 address" />
        </div>
      </CardContent>
    </Card>

    <div v-if="ipInfo" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-1">Decimal</div>
          <div class="text-2xl font-mono font-bold break-all">{{ ipInfo.decimal }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-1">Binary</div>
          <div class="text-lg font-mono font-bold break-all">{{ ipInfo.binary }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-1">Hexadecimal</div>
          <div class="text-xl font-mono font-bold break-all">{{ ipInfo.hex }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-1">Octal</div>
          <div class="text-xl font-mono font-bold break-all">{{ ipInfo.octal }}</div>
        </CardContent>
      </Card>

      <Card class="md:col-span-2">
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-1">Reverse DNS</div>
          <div class="text-xl font-mono font-bold break-all">{{ ipInfo.reverseDns }}</div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
