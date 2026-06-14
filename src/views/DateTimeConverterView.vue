<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Calendar, Clock, Copy, Check, RefreshCw, ArrowRightLeft, Info } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const inputDateString = ref('')
const inputTimestamp = ref('')
const activeSource = ref<'date' | 'timestamp'>('date')
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
  inputDateString.value = now.value.toISOString()
  activeSource.value = 'date'
}

const setFromTimestamp = () => {
  inputTimestamp.value = currentTimestamp.value.toString()
  activeSource.value = 'timestamp'
}

const parsedDate = computed(() => {
  const raw = activeSource.value === 'date' ? inputDateString.value : inputTimestamp.value
  if (!raw) return null

  try {
    let d: Date
    if (activeSource.value === 'timestamp') {
      d = new Date(parseInt(raw) * 1000)
    } else {
      const trimmed = raw.trim()
      d = /^\d+$/.test(trimmed) ? new Date(parseInt(trimmed) * 1000) : new Date(raw)
    }
    if (isNaN(d.getTime())) return null
    return d
  } catch {
    return null
  }
})

// Sync: typing in one field auto-fills the other
let syncing = false
const onDateStringInput = () => {
  activeSource.value = 'date'
  if (!inputDateString.value || syncing) return
  try {
    const trimmed = inputDateString.value.trim()
    const d = /^\d+$/.test(trimmed)
      ? new Date(parseInt(trimmed) * 1000)
      : new Date(inputDateString.value)
    if (!isNaN(d.getTime())) {
      syncing = true
      inputTimestamp.value = Math.floor(d.getTime() / 1000).toString()
      syncing = false
    }
  } catch {
    /* ignore */
  }
}

const onTimestampInput = () => {
  activeSource.value = 'timestamp'
  if (!inputTimestamp.value || syncing) return
  const trimmed = inputTimestamp.value.trim()
  if (!/^\d+$/.test(trimmed)) return
  try {
    const d = new Date(parseInt(trimmed) * 1000)
    if (!isNaN(d.getTime())) {
      syncing = true
      inputDateString.value = d.toISOString()
      syncing = false
    }
  } catch {
    /* ignore */
  }
}

const humanReadableTime = computed(() => {
  const now = new Date()
  if (!parsedDate.value) return null
  const diff = now.getTime() - parsedDate.value.getTime()
  const totalSeconds = Math.abs(diff / 1000)

  const future = diff < 0
  const suffix = future ? 'from now' : 'ago'

  const yrs = Math.floor(totalSeconds / (365 * 86400))
  const yrsRem = totalSeconds - yrs * 365 * 86400
  const mnths = Math.floor(yrsRem / (30 * 86400))
  const mnthsRem = yrsRem - mnths * 30 * 86400
  const dys = Math.floor(mnthsRem / 86400)
  const dysRem = mnthsRem - dys * 86400
  const hrs = Math.floor(dysRem / 3600)
  const hrsRem = dysRem - hrs * 3600
  const mins = Math.floor(hrsRem / 60)
  const secs = Math.floor(hrsRem - mins * 60)

  const parts: string[] = []
  if (yrs > 0) parts.push(`${yrs} year${yrs > 1 ? 's' : ''}`)
  if (mnths > 0) parts.push(`${mnths} month${mnths > 1 ? 's' : ''}`)
  if (dys > 0) parts.push(`${dys} day${dys > 1 ? 's' : ''}`)
  if (hrs > 0) parts.push(`${hrs} hour${hrs > 1 ? 's' : ''}`)
  if (mins > 0) parts.push(`${mins} minute${mins > 1 ? 's' : ''}`)
  if (secs > 0) parts.push(`${secs} second${secs > 1 ? 's' : ''}`)

  // Show at least "X seconds" even when everything is zero
  if (parts.length === 0) parts.push('0 seconds')

  return `${parts.join(' ')} ${suffix}`
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

const applyPreset = (preset: { label: string; value: () => string }) => {
  inputDateString.value = preset.value()
  activeSource.value = 'date'
}

const applyOffset = (offset: number) => {
  if (parsedDate.value) {
    const newDate = new Date(parsedDate.value.getTime() + offset)
    syncing = true
    inputDateString.value = newDate.toISOString()
    inputTimestamp.value = Math.floor(newDate.getTime() / 1000).toString()
    activeSource.value = 'date'
    syncing = false
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
          <CardDescription
            >Enter a date/time or Unix timestamp — both sync automatically</CardDescription
          >
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium mb-1 block">Date / Time</label>
              <input
                v-model="inputDateString"
                @input="onDateStringInput"
                type="text"
                placeholder="2024-06-19T00:21:03.000Z"
                class="w-full px-3 py-2 border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label class="text-sm font-medium mb-1 block">Unix Timestamp (seconds)</label>
              <input
                v-model="inputTimestamp"
                @input="onTimestampInput"
                type="text"
                placeholder="1718755263"
                class="w-full px-3 py-2 border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
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
              @click="applyPreset(preset)"
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
            Relative Time
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

      <Card v-else-if="(inputDateString || inputTimestamp) && !parsedDate" class="border-red-500">
        <CardContent class="py-8 text-center text-red-500"> Invalid date format </CardContent>
      </Card>

      <div v-else class="text-center py-16 text-muted-foreground">
        <Clock class="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Enter a date above to see conversions</p>
      </div>
    </div>
  </div>
</template>
