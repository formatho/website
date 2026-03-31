<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const startIp = ref('')
const endIp = ref('')

interface ExpandedIp {
  ip: string
  index: number
}

const expandedIps = computed<ExpandedIp[]>(() => {
  if (!startIp.value || !endIp.value) return []

  const startParts = startIp.value.split('.').map((p) => parseInt(p, 10))
  const endParts = endIp.value.split('.').map((p) => parseInt(p, 10))

  if (startParts.length !== 4 || endParts.length !== 4) return []
  if (startParts.some((p) => isNaN(p) || p < 0 || p > 255)) return []
  if (endParts.some((p) => isNaN(p) || p < 0 || p > 255)) return []

  const s0 = startParts[0] ?? 0
  const s1 = startParts[1] ?? 0
  const s2 = startParts[2] ?? 0
  const s3 = startParts[3] ?? 0
  const e0 = endParts[0] ?? 0
  const e1 = endParts[1] ?? 0
  const e2 = endParts[2] ?? 0
  const e3 = endParts[3] ?? 0

  const startNum = (s0 << 24) + (s1 << 16) + (s2 << 8) + s3
  const endNum = (e0 << 24) + (e1 << 16) + (e2 << 8) + e3

  if (endNum < startNum) return []

  const numToIp = (num: number) =>
    [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.')

  const count = endNum - startNum + 1
  if (count > 256) {
    return [{ ip: `Too many IPs (${count.toLocaleString()}). Max 256.`, index: 0 }]
  }

  return Array.from({ length: count }, (_, i) => ({
    ip: numToIp(startNum + i),
    index: i + 1
  }))
})

const copyAll = () => {
  const ips = expandedIps.value.map((e) => e.ip).join('\n')
  if (ips) navigator.clipboard.writeText(ips)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">IPv4 Range Expander</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>IP Range</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label>Start IP</Label>
            <Input v-model="startIp" placeholder="192.168.1.1" class="font-mono" />
          </div>
          <div class="grid gap-2">
            <Label>End IP</Label>
            <Input v-model="endIp" placeholder="192.168.1.10" class="font-mono" />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card v-if="expandedIps.length > 0" class="flex flex-col min-h-0 flex-1">
      <CardHeader class="flex-row items-center justify-between">
        <CardTitle>Expanded IPs ({{ expandedIps.length }})</CardTitle>
        <Button variant="outline" size="sm" @click="copyAll" aria-label="Copy all IP addresses">Copy All</Button>
      </CardHeader>
      <CardContent class="flex-1 min-h-0 overflow-y-auto">
        <div class="space-y-1">
          <div
            v-for="item in expandedIps"
            :key="item.index"
            class="flex items-center gap-4 p-2 rounded hover:bg-muted transition-colors"
          >
            <span class="text-sm text-muted-foreground w-12">{{ item.index }}.</span>
            <code class="font-mono">{{ item.ip }}</code>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
