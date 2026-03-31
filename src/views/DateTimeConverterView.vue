<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calendar, Clock, Copy, Check, RefreshCw } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const inputDate = ref('')
const inputFormat = ref('auto')
const copied = ref<string | null>(null)

const now = computed(() => new Date())

const setCurrentTime = () => {
  inputDate.value = now.value.toISOString()
}

const parsedDate = computed(() => {
  if (!inputDate.value) return null

  try {
    if (inputFormat.value === 'unix') {
      return new Date(parseInt(inputDate.value) * 1000)
    } else if (inputFormat.value === 'unix-ms') {
      return new Date(parseInt(inputDate.value))
    } else {
      return new Date(inputDate.value)
    }
  } catch {
    return null
  }
})

const formats = computed(() => {
  if (!parsedDate.value) return {}

  const d = parsedDate.value

  return {
    'ISO 8601': d.toISOString(),
    UTC: d.toUTCString(),
    'Local Date': d.toLocaleDateString(),
    'Local Time': d.toLocaleTimeString(),
    'Local DateTime': d.toLocaleString(),
    'Date String': d.toDateString(),
    'Time String': d.toTimeString(),
    'Unix Timestamp (seconds)': Math.floor(d.getTime() / 1000).toString(),
    'Unix Timestamp (ms)': d.getTime().toString(),
    Year: d.getFullYear().toString(),
    'Month (1-12)': (d.getMonth() + 1).toString(),
    Day: d.getDate().toString(),
    'Day of Week': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      d.getDay()
    ],
    'Hours (0-23)': d.getHours().toString(),
    Minutes: d.getMinutes().toString(),
    Seconds: d.getSeconds().toString(),
    Milliseconds: d.getMilliseconds().toString(),
    'Timezone Offset (min)': d.getTimezoneOffset().toString(),
    'Custom (YYYY-MM-DD)': `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    'Custom (DD/MM/YYYY)': `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`,
    'Custom (MM/DD/YYYY)': `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`,
    'ISO Date': d.toISOString().split('T')[0],
    'ISO Time': d.toISOString().split('T')[1]?.split('.')[0] ?? ''
  }
})

const copyFormat = (type: string) => {
  const value = formats.value[type as keyof typeof formats.value]
  if (value !== undefined) {
    navigator.clipboard.writeText(value)
  }
  copied.value = type
  setTimeout(() => (copied.value = null), 2000)
}

const presets = [
  { label: 'Now (ISO)', value: () => new Date().toISOString() },
  { label: 'Today 00:00', value: () => new Date(new Date().setHours(0, 0, 0, 0)).toISOString() },
  { label: 'Tomorrow', value: () => new Date(Date.now() + 86400000).toISOString() },
  { label: 'Yesterday', value: () => new Date(Date.now() - 86400000).toISOString() },
  { label: 'Week from now', value: () => new Date(Date.now() + 7 * 86400000).toISOString() }
]
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Calendar class="w-8 h-8" />
          Date Time Converter
        </h1>
        <p class="text-muted-foreground mt-2">Convert dates and times between different formats.</p>
      </div>

      <!-- Input -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Enter a date, time, or timestamp</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex gap-4">
            <div class="flex-1">
              <input
                v-model="inputDate"
                type="text"
                placeholder="Enter date, e.g., 2024-01-15 or 1705312800"
                class="w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              v-model="inputFormat"
              class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="auto">Auto Detect</option>
              <option value="unix">Unix (seconds)</option>
              <option value="unix-ms">Unix (ms)</option>
            </select>
          </div>

          <div class="flex gap-2 flex-wrap">
            <Button @click="setCurrentTime" variant="outline" size="sm">
              <RefreshCw class="w-4 h-4 mr-2" />
              Current Time
            </Button>
            <Button
              v-for="preset in presets"
              :key="preset.label"
              @click="inputDate = preset.value()"
              variant="outline"
              size="sm"
            >
              {{ preset.label }}
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Results -->
      <Card v-if="parsedDate && Object.keys(formats).length > 0">
        <CardHeader>
          <CardTitle>Converted Formats</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div
            v-for="(value, type) in formats"
            :key="type"
            class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
          >
            <div class="flex-1">
              <div class="text-sm text-muted-foreground mb-1">{{ type }}</div>
              <div class="font-mono">{{ value }}</div>
            </div>
            <Button @click="copyFormat(type)" variant="ghost" size="sm" aria-label="Copy date format">
              <component :is="copied === type ? Check : Copy" class="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card v-else-if="inputDate && !parsedDate" class="border-red-500">
        <CardContent class="py-8 text-center text-red-500"> Invalid date format </CardContent>
      </Card>

      <div v-else class="text-center py-16 text-muted-foreground">
        <Clock class="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Enter a date above to see conversions</p>
      </div>
    </div>
  </div>
</template>
