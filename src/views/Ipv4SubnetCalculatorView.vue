<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ipAddress = ref('')
const cidr = ref(24)

interface SubnetInfo {
  networkAddress: string
  broadcastAddress: string
  subnetMask: string
  wildcardMask: string
  firstHost: string
  lastHost: string
  totalHosts: number
  usableHosts: number
  cidr: number
}

const subnetInfo = computed<SubnetInfo | null>(() => {
  if (!ipAddress.value) return null

  const parts = ipAddress.value.split('.')
  if (parts.length !== 4) return null

  const ip = parts.map((p) => parseInt(p, 10))
  if (ip.some((p) => isNaN(p) || p < 0 || p > 255)) return null

  const cidrVal = Math.max(0, Math.min(32, cidr.value))
  const mask = (0xffffffff << (32 - cidrVal)) >>> 0
  const wildcard = ~mask >>> 0

  const i0 = ip[0] ?? 0
  const i1 = ip[1] ?? 0
  const i2 = ip[2] ?? 0
  const i3 = ip[3] ?? 0

  const ipNum = (i0 << 24) + (i1 << 16) + (i2 << 8) + i3
  const network = (ipNum & mask) >>> 0
  const broadcast = (network | wildcard) >>> 0

  const numToIp = (num: number) =>
    [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.')

  const totalHosts = Math.pow(2, 32 - cidrVal)
  const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0

  return {
    networkAddress: numToIp(network),
    broadcastAddress: numToIp(broadcast),
    subnetMask: numToIp(mask),
    wildcardMask: numToIp(wildcard),
    firstHost: totalHosts > 2 ? numToIp(network + 1) : numToIp(network),
    lastHost: totalHosts > 2 ? numToIp(broadcast - 1) : numToIp(broadcast),
    totalHosts,
    usableHosts,
    cidr: cidrVal
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">IPv4 Subnet Calculator</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label>IP Address</Label>
            <Input v-model="ipAddress" aria-label="IP address" placeholder="192.168.1.1" class="font-mono" />
          </div>
          <div class="grid gap-2">
            <Label>CIDR / Subnet</Label>
            <Input v-model.number="cidr" type="number" aria-label="CIDR prefix length" min="0" max="32" class="font-mono" />
          </div>
        </div>
      </CardContent>
    </Card>

    <div v-if="subnetInfo" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Network Address</div>
          <div class="text-xl font-mono font-bold">{{ subnetInfo.networkAddress }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Broadcast Address</div>
          <div class="text-xl font-mono font-bold">{{ subnetInfo.broadcastAddress }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Subnet Mask</div>
          <div class="text-xl font-mono font-bold">{{ subnetInfo.subnetMask }}</div>
          <div class="text-sm text-muted-foreground">/{{ subnetInfo.cidr }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Wildcard Mask</div>
          <div class="text-xl font-mono font-bold">{{ subnetInfo.wildcardMask }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">First Host</div>
          <div class="text-xl font-mono font-bold">{{ subnetInfo.firstHost }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Last Host</div>
          <div class="text-xl font-mono font-bold">{{ subnetInfo.lastHost }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Total Hosts</div>
          <div class="text-xl font-bold">{{ subnetInfo.totalHosts.toLocaleString() }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Usable Hosts</div>
          <div class="text-xl font-bold">{{ subnetInfo.usableHosts.toLocaleString() }}</div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
