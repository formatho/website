<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Calendar, Clock, Copy, Check, RefreshCw, ArrowRightLeft, Info } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const inputDate = ref('')
const inputFormat = ref('auto')
const copied = ref<string | null>(null)
const currentTimestamp = ref(0)
const showClockSection = ref(true)

let timestampInterval: number | null = null

onMounted(() => {
  currentTimestamp.value = Math.floor(Date.now() / 1000)
  timestampInterval = setInterval(() => {
    currentTimestamp.value = Math.floor(Date.now() / 1000)
  }, 1000)
})

onUnmounted(() => {
  if (timestampInterval) {
    clearInterval(timestampInterval)
  }
})

const now = computed(() => new Date())

const setCurrentTime = () => {
  inputDate.value = now.value.toISOString()
}

const setFromTimestamp = () => {
  inputDate.value = currentTimestamp.value.toString()
  inputFormat.value = 'unix'
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

const humanReadableTime = computed(() => {
  const now = new Date()
  if (!parsedDate.value) return null
  const diff = now.getTime() - parsedDate.value.getTime()
  const seconds = Math.abs(diff / 1000)
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const weeks = days / 7
  const months = days / 30
  const years = days / 365

  const future = diff < 0

  if (seconds < 60) return `${future ? 'In ' : ''}${Math.floor(seconds)} seconds`
  if (minutes < 60) return `${future ? 'In ' : ''}${Math.floor(minutes)} minutes`
  if (hours < 24) return `${future ? 'In ' : ''}${Math.floor(hours)} hours`
  if (days < 7) return `${future ? 'In ' : ''}${Math.floor(days)} days`
  if (weeks < 4) return `${future ? 'In ' : ''}${Math.floor(weeks)} weeks`
  if (months < 12) return `${future ? 'In ' : ''}${Math.floor(months)} months`
  return `${future ? 'In ' : ''}${Math.floor(years)} years`
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

const conversionPresets = [
  { label: '+ 1 hour', offset: 3600000 },
  { label: '+ 24 hours', offset: 86400000 },
  { label: '+ 7 days', offset: 7 * 86400000 },
  { label: '+ 30 days', offset: 30 * 86400000 },
  { label: '- 1 hour', offset: -3600000 },
  { label: '- 24 hours', offset: -86400000 },
  { label: '- 7 days', offset: -7 * 86400000 },
  { label: '- 30 days', offset: -30 * 86400000 }
]

const applyOffset = (offset: number) => {
  if (parsedDate.value) {
    const newDate = new Date(parsedDate.value.getTime() + offset)
    inputDate.value = newDate.toISOString()
  }
}

const programmingLanguages = computed(() => {
  if (!parsedDate.value) return []

  const ts = Math.floor(parsedDate.value.getTime() / 1000)
  const tsMs = parsedDate.value.getTime()

  return [
    { language: 'JavaScript', code: `new Date(${ts} * 1000)` },
    { language: 'Python', code: `datetime.fromtimestamp(${ts})` },
    { language: 'Java', code: `new Date(${ts}L * 1000)` },
    { language: 'PHP', code: `date('Y-m-d H:i:s', ${ts})` },
    { language: 'Ruby', code: `Time.at(${ts})` },
    { language: 'Go', code: `time.Unix(${ts}, 0)` },
    { language: 'C#', code: `DateTimeOffset.FromUnixTimeSeconds(${ts})` },
    { language: 'C++ (Unix)', code: `std::chrono::system_clock::from_time_t(${ts})` },
    { language: 'MySQL', code: `FROM_UNIXTIME(${ts})` },
    { language: 'PostgreSQL', code: `to_timestamp(${ts})` },
    { language: 'Bash', code: `date -d @${ts}` },
    { language: 'PowerShell', code: `[DateTimeOffset]::FromUnixTimeSeconds(${ts})` }
  ]
})
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

      <!-- Live Clock Section -->
      <Card class="mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Clock class="w-5 h-5" />
            Current Unix Timestamp
          </CardTitle>
          <CardDescription>Live updating current epoch timestamp</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-6">
            <div>
              <div class="text-4xl font-mono font-bold">{{ currentTimestamp }}</div>
              <div class="text-sm text-muted-foreground mt-1">seconds since Jan 1, 1970</div>
            </div>
            <div class="flex-1 text-right">
              <div class="text-lg font-mono">{{ new Date().toISOString() }}</div>
              <div class="text-sm text-muted-foreground mt-1">
                {{ new Date().toLocaleString() }}
              </div>
            </div>
            <Button @click="setFromTimestamp" variant="outline" size="sm">
              <Copy class="w-4 h-4 mr-2" />
              Use This
            </Button>
          </div>
        </CardContent>
      </Card>

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
            <Button
              @click="setCurrentTime"
              variant="outline"
              size="sm"
              aria-label="Set to current time"
            >
              <RefreshCw class="w-4 h-4 mr-2" />
              Current Time
            </Button>
            <Button
              v-for="preset in presets"
              :key="preset.label"
              @click="inputDate = preset.value()"
              variant="outline"
              size="sm"
              :aria-label="'Set to ' + preset.label"
            >
              {{ preset.label }}
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Human readable time (like unixtimestamp.com) -->
      <Card v-if="parsedDate && humanReadableTime" class="mb-6">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ArrowRightLeft class="w-5 h-5" />
            Human Readable Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-semibold">{{ humanReadableTime }}</div>
        </CardContent>
      </Card>

      <!-- Quick Add/Subtract (like unixtimestamp.com) -->
      <Card v-if="parsedDate" class="mb-6">
        <CardHeader>
          <CardTitle>Quick Add/Subtract Time</CardTitle>
          <CardDescription>Adjust the current date by common time intervals</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              v-for="preset in conversionPresets"
              :key="preset.label"
              @click="applyOffset(preset.offset)"
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
            <Button
              @click="copyFormat(type)"
              variant="ghost"
              size="sm"
              aria-label="Copy date format"
            >
              <component :is="copied === type ? Check : Copy" class="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Programming Language Examples (like unixtimestamp.com) -->
      <Card v-if="parsedDate && programmingLanguages.length > 0" class="mb-6">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Info class="w-5 h-5" />
            Programming Language Examples
          </CardTitle>
          <CardDescription
            >How to use this timestamp in various programming languages</CardDescription
          >
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div
              v-for="lang in programmingLanguages"
              :key="lang.language"
              class="flex items-start gap-3 p-3 bg-surface-hover rounded-lg border"
            >
              <div class="flex-1">
                <div class="text-sm font-semibold mb-1">{{ lang.language }}</div>
                <code class="text-xs font-mono bg-muted px-2 py-1 rounded">{{ lang.code }}</code>
              </div>
              <Button
                @click="copyFormat(lang.code)"
                variant="ghost"
                size="sm"
                aria-label="Copy code"
              >
                <component :is="copied === lang.code ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
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
