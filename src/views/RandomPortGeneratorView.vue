<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const port = ref(0)
const excludedPorts = ref<number[]>([])
const minPort = ref(1024)
const maxPort = ref(65535)

const generatePort = () => {
  const availablePorts: number[] = []

  for (let i = minPort.value; i <= maxPort.value; i++) {
    if (!excludedPorts.value.includes(i)) {
      availablePorts.push(i)
    }
  }

  if (availablePorts.length === 0) {
    port.value = 0
    return
  }

  const randomIndex = Math.floor(Math.random() * availablePorts.length)
  port.value = availablePorts[randomIndex] ?? 0
}

const copyPort = () => {
  navigator.clipboard.writeText(port.value.toString())
}

// Generate initial port
generatePort()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Random Port Generator</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label>Min Port</Label>
              <input
                v-model.number="minPort"
                type="number"
                min="1"
                max="65535"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div class="grid gap-2">
              <Label>Max Port</Label>
              <input
                v-model.number="maxPort"
                type="number"
                min="1"
                max="65535"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <Button @click="generatePort" class="w-full" aria-label="Generate random port">Generate Port</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Port</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="text-center">
            <div class="text-gray-900">{{ port }}</div>
          </div>
          <Button @click="copyPort" variant="outline" class="w-full">Copy</Button>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Common Port Ranges</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          <div class="p-3 rounded bg-muted">
            <div class="font-semibold">Well-Known Ports</div>
            <div class="text-muted-foreground">0 - 1023 (system use)</div>
          </div>
          <div class="p-3 rounded bg-muted">
            <div class="font-semibold">Registered Ports</div>
            <div class="text-muted-foreground">1024 - 49151</div>
          </div>
          <div class="p-3 rounded bg-muted">
            <div class="font-semibold">Dynamic/Private Ports</div>
            <div class="text-muted-foreground">49152 - 65535</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
