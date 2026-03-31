<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const macAddress = ref('')

const generateMac = () => {
  // Generate a random MAC with locally administered bit set
  const bytes = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256))
  // Set locally administered bit (bit 1 of first octet)
  const firstByte = bytes[0] ?? 0
  bytes[0] = (firstByte & 0xfe) | 0x02
  macAddress.value = bytes.map((b) => b.toString(16).toUpperCase().padStart(2, '0')).join(':')
}

const copyMac = () => {
  navigator.clipboard.writeText(macAddress.value)
}

// Generate initial MAC
generateMac()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">MAC Address Generator</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Generate Random MAC Address</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>Generated MAC</Label>
          <div class="flex gap-2">
            <div class="flex-1 p-4 rounded-lg bg-muted font-mono text-2xl text-center">
              {{ macAddress }}
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <Button @click="generateMac" class="flex-1">Generate New</Button>
          <Button variant="outline" @click="copyMac" aria-label="Copy MAC address">Copy</Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>About MAC Addresses</CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>
          Generated MAC addresses have the locally administered bit set (bit 1 of the first octet).
        </p>
        <p>
          This means they are suitable for virtual machines, testing, and other non-hardware use
          cases.
        </p>
        <p>Format: XX:XX:XX:XX:XX:XX (hexadecimal)</p>
      </CardContent>
    </Card>
  </div>
</template>
