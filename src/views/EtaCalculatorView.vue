<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const distance = ref<number | undefined>(100)
const speed = ref<number | undefined>(60)
const startTime = ref('')

interface EtaInfo {
  hours: number
  minutes: number
  totalMinutes: number
  arrivalTime: string | null
}

const etaInfo = computed<EtaInfo>(() => {
  const dist = distance.value ?? 0
  const spd = speed.value ?? 1
  const totalMinutes = (dist / spd) * 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)

  let arrivalTime: string | null = null
  if (startTime.value) {
    const parts = startTime.value.split(':')
    const h = Number(parts[0] ?? 0)
    const m = Number(parts[1] ?? 0)
    if (!isNaN(h) && !isNaN(m)) {
      const startDate = new Date()
      startDate.setHours(h, m, 0, 0)
      startDate.setMinutes(startDate.getMinutes() + totalMinutes)
      arrivalTime = startDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }
  }

  return { hours, minutes, totalMinutes: Math.round(totalMinutes), arrivalTime }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">ETA Calculator</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Calculate Estimated Time of Arrival</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="grid gap-2">
            <Label>Distance (km or miles)</Label>
            <Input v-model.number="distance" type="number" min="0" step="0.1" aria-label="Distance" />
          </div>
          <div class="grid gap-2">
            <Label>Speed (km/h or mph)</Label>
            <Input v-model.number="speed" type="number" min="1" step="0.1" aria-label="Speed" />
          </div>
          <div class="grid gap-2">
            <Label>Start Time (optional)</Label>
            <Input v-model="startTime" type="time" />
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Travel Time</div>
          <div class="text-3xl font-bold">{{ etaInfo.hours }}h {{ etaInfo.minutes }}m</div>
          <div class="text-sm text-muted-foreground">{{ etaInfo.totalMinutes }} minutes total</div>
        </CardContent>
      </Card>

      <Card v-if="etaInfo.arrivalTime">
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Estimated Arrival</div>
          <div class="text-3xl font-bold">{{ etaInfo.arrivalTime }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Average Speed</div>
          <div class="text-3xl font-bold">{{ speed }}</div>
          <div class="text-sm text-muted-foreground">per hour</div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
