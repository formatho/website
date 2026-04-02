<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const macAddress = ref('')

interface MacInfo {
  formatted: string
  vendor: string
}

const macVendors: Record<string, string> = {
  '00:1A:11': 'Dell Inc.',
  '00:1B:21': 'Dell Inc.',
  '00:1C:23': 'Dell Inc.',
  '00:1D:09': 'Dell Inc.',
  '00:1E:C9': 'Dell Inc.',
  '00:50:56': 'VMware, Inc.',
  '00:0C:29': 'VMware, Inc.',
  '00:05:69': 'VMware, Inc.',
  '00:1C:14': 'VMware, Inc.',
  '00:0F:4B': 'ASUSTek Computer Inc.',
  '00:1A:92': 'ASUSTek Computer Inc.',
  '00:1E:8C': 'ASUSTek Computer Inc.',
  '00:1F:F3': 'ASUSTek Computer Inc.',
  '00:26:18': 'ASUSTek Computer Inc.',
  '00:03:FF': 'Apple, Inc.',
  '00:05:02': 'Apple, Inc.',
  '00:0A:27': 'Apple, Inc.',
  '00:0A:95': 'Apple, Inc.',
  '00:0D:93': 'Apple, Inc.',
  '00:10:FA': 'Apple, Inc.',
  '00:11:24': 'Apple, Inc.',
  '00:14:51': 'Apple, Inc.',
  '00:16:CB': 'Apple, Inc.',
  '00:17:F2': 'Apple, Inc.',
  '00:19:E3': 'Apple, Inc.',
  '00:1B:63': 'Apple, Inc.',
  '00:1C:B3': 'Apple, Inc.',
  '00:1D:4F': 'Apple, Inc.',
  '00:1E:52': 'Apple, Inc.',
  '00:1E:C2': 'Apple, Inc.',
  '00:1F:5B': 'Apple, Inc.',
  '00:1F:F6': 'Apple, Inc.',
  '00:22:41': 'Apple, Inc.',
  '00:23:12': 'Apple, Inc.',
  '00:23:6C': 'Apple, Inc.',
  '00:23:DF': 'Apple, Inc.',
  '00:24:36': 'Apple, Inc.',
  '00:25:00': 'Apple, Inc.',
  '00:25:4B': 'Apple, Inc.',
  '00:25:BC': 'Apple, Inc.',
  '00:26:08': 'Apple, Inc.',
  '00:26:4A': 'Apple, Inc.',
  '00:26:B0': 'Apple, Inc.',
  '00:26:BB': 'Apple, Inc.',
  '00:30:65': 'Apple, Inc.',
  'D8:1C:79': 'Samsung Electronics',
  '00:12:FB': 'Samsung Electronics',
  '00:16:6B': 'Samsung Electronics',
  '00:17:C2': 'Samsung Electronics',
  '00:18:AF': 'Samsung Electronics',
  '00:1A:8A': 'Samsung Electronics',
  '00:1E:7D': 'Samsung Electronics',
  '00:1F:27': 'Samsung Electronics'
}

const macInfo = ref<MacInfo | null>(null)

const lookupMac = () => {
  if (!macAddress.value) {
    macInfo.value = null
    return
  }

  // Normalize MAC address
  const clean = macAddress.value.replace(/[:\-.]/g, '').toUpperCase()
  if (clean.length !== 12) {
    macInfo.value = null
    return
  }

  const formatted = clean.match(/.{2}/g)?.join(':') || ''
  const oui = formatted.substring(0, 8)

  macInfo.value = {
    formatted,
    vendor: macVendors[oui] || 'Unknown vendor'
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">MAC Address Lookup</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Lookup MAC Address</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>MAC Address</Label>
          <Input
            v-model="macAddress"
            @input="lookupMac"
            aria-label="MAC address to look up"
            placeholder="00:1A:2B:3C:4D:5E"
            class="font-mono uppercase"
          />
        </div>
      </CardContent>
    </Card>

    <div v-if="macInfo" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Formatted MAC</div>
          <div class="text-2xl font-mono font-bold">{{ macInfo.formatted }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Vendor</div>
          <div class="text-xl font-bold">{{ macInfo.vendor }}</div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
