<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Clock, ArrowRightLeft, Copy, Check, RefreshCw, Timer, Globe } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Live clock - updates every second
const now = ref(new Date())
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

// Current time computed values
const currentUnixSeconds = computed(() => Math.floor(now.value.getTime() / 1000))
const currentUnixMs = computed(() => now.value.getTime())
const currentISO = computed(() => now.value.toISOString())
const currentUTC = computed(() => now.value.toUTCString())
const currentLocal = computed(() => now.value.toLocaleString())

// Input state
const inputTimestamp = ref('')
const direction = ref<'toHuman' | 'toUnix'>('toHuman')
const copied = ref<string | null>(null)
const humanDateInput = ref('')

// Parse input and compute results
const parseResult = computed(() => {
  if (!inputTimestamp.value.trim()) return null

  const raw = inputTimestamp.value.trim()

  // Try to detect if it's a unix timestamp
  if (/^-?\d+$/.test(raw)) {
    const num = parseInt(raw)
    // Auto-detect seconds vs milliseconds
    // If > 10^12 it's likely milliseconds (after 2001-09-09 in seconds)
    const ms = num > 1e12 ? num : num * 1000
    const d = new Date(ms)
    if (isNaN(d.getTime())) return null
    return {
      date: d,
      wasUnix: true,
      wasMs: num > 1e12,
      originalValue: raw
    }
  }

  // Try parsing as date string
  const d = new Date(raw)
  if (!isNaN(d.getTime())) {
    return {
      date: d,
      wasUnix: false,
      wasMs: false,
      originalValue: raw
    }
  }

  return null
})

// All output formats
const conversions = computed(() => {
  if (!parseResult.value) return {}
  const d = parseResult.value.date

  return {
    'Unix Timestamp (seconds)': Math.floor(d.getTime() / 1000).toString(),
    'Unix Timestamp (milliseconds)': d.getTime().toString(),
    'ISO 8601': d.toISOString(),
    'UTC': d.toUTCString(),
    'Local Date & Time': d.toLocaleString(),
    'Local Date': d.toLocaleDateString(),
    'Local Time': d.toLocaleTimeString(),
    'Relative': getRelativeTime(d),
    'Date String': d.toDateString(),
    'YYYY-MM-DD': `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    'YYYY-MM-DD HH:mm:ss': `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`,
    'Day of Week': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()],
    'Timezone Offset (minutes)': d.getTimezoneOffset().toString(),
    'Timezone Offset (hours)': (d.getTimezoneOffset() / -60).toString(),
  }
})

// Seconds since a given timestamp
const secondsSince = computed(() => {
  if (!parseResult.value) return null
  const diff = Math.floor(now.value.getTime() / 1000) - Math.floor(parseResult.value.date.getTime() / 1000)
  return diff
})

const minutesSince = computed(() => {
  if (!secondsSince.value) return null
  return Math.floor(secondsSince.value / 60)
})

const hoursSince = computed(() => {
  if (!minutesSince.value === null) return null
  return Math.floor(secondsSince.value! / 3600)
})

const daysSince = computed(() => {
  if (secondsSince.value === null) return null
  return Math.floor(secondsSince.value! / 86400)
})

const humanReadableSince = computed(() => {
  if (secondsSince.value === null) return ''
  const abs = Math.abs(secondsSince.value)
  const suffix = secondsSince.value! >= 0 ? 'ago' : 'from now'

  if (abs < 60) return `${abs} seconds ${suffix}`
  if (abs < 3600) return `${Math.floor(abs / 60)} minutes ${abs % 60 > 0 ? `${abs % 60} seconds` : ''} ${suffix}`.trim()
  if (abs < 86400) return `${Math.floor(abs / 3600)} hours ${Math.floor((abs % 3600) / 60)} minutes ${suffix}`
  if (abs < 2592000) return `${Math.floor(abs / 86400)} days ${Math.floor((abs % 86400) / 3600)} hours ${suffix}`
  if (abs < 31536000) return `${Math.floor(abs / 2592000)} months ${Math.floor((abs % 2592000) / 86400)} days ${suffix}`
  return `${(abs / 31536000).toFixed(1)} years ${suffix}`
})

// Relative time helper
function getRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime()
  const abs = Math.abs(diff)
  const suffix = diff > 0 ? 'ago' : 'from now'

  if (abs < 60) return `${abs} seconds ${suffix}`
  if (abs < 3600) return `${Math.floor(abs / 60)} minutes ${suffix}`
  if (abs < 86400) return `${Math.floor(abs / 3600)} hours ${suffix}`
  if (abs < 2592000) return `${Math.floor(abs / 86400)} days ${suffix}`
  if (abs < 31536000) return `${Math.floor(abs / 2592000)} months ${suffix}`
  return `${(abs / 31536000).toFixed(1)} years ${suffix}`
}

// Actions
const setNow = () => {
  inputTimestamp.value = Math.floor(Date.now() / 1000).toString()
}

const clear = () => {
  inputTimestamp.value = ''
}

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = label
    setTimeout(() => { copied.value = null }, 2000)
  } catch {
    // fallback
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copied.value = label
    setTimeout(() => { copied.value = null }, 2000)
  }
}

// Common timestamps
const commonTimestamps = [
  { label: 'Unix Epoch', value: '0' },
  { label: 'Y2K', value: '946684800' },
  { label: 'Jan 1, 2024', value: '1704067200' },
  { label: 'Jan 1, 2025', value: '1735689600' },
  { label: 'Jan 1, 2026', value: '1767225600' },
]
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
    <div class="max-w-5xl mx-auto space-y-6">

      <!-- Header -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <Timer class="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          Unix Timestamp Converter
        </h1>
        <p class="text-muted-foreground mt-2 text-sm sm:text-base">
          Convert Unix timestamps to human-readable dates and vice versa. All processing happens in your browser.
        </p>
      </div>

      <!-- Live Current Time -->
      <Card class="border-primary/20 bg-primary/5">
        <CardHeader class="pb-3">
          <CardTitle class="text-base flex items-center gap-2">
            <Clock class="w-5 h-5 text-primary animate-pulse" />
            Current Time
          </CardTitle>
          <CardDescription>Live clock — updates every second</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <div class="text-xs text-muted-foreground uppercase tracking-wider">Unix Timestamp (seconds)</div>
              <div class="font-mono text-lg sm:text-xl font-bold flex items-center gap-2">
                {{ currentUnixSeconds }}
                <button
                  @click="copyToClipboard(currentUnixSeconds.toString(), 'current-unix')"
                  class="opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="Copy unix timestamp"
                >
                  <component :is="copied === 'current-unix' ? Check : Copy" class="w-4 h-4" />
                </button>
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-muted-foreground uppercase tracking-wider">Unix Timestamp (ms)</div>
              <div class="font-mono text-lg sm:text-xl font-bold flex items-center gap-2">
                {{ currentUnixMs }}
                <button
                  @click="copyToClipboard(currentUnixMs.toString(), 'current-unix-ms')"
                  class="opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="Copy unix timestamp in milliseconds"
                >
                  <component :is="copied === 'current-unix-ms' ? Check : Copy" class="w-4 h-4" />
                </button>
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-muted-foreground uppercase tracking-wider">Human Readable (UTC)</div>
              <div class="font-mono text-sm sm:text-base">{{ currentUTC }}</div>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-muted-foreground uppercase tracking-wider">Human Readable (Local)</div>
              <div class="font-mono text-sm sm:text-base">{{ currentLocal }}</div>
            </div>
            <div class="sm:col-span-2 space-y-1">
              <div class="text-xs text-muted-foreground uppercase tracking-wider">ISO 8601</div>
              <div class="font-mono text-sm sm:text-base flex items-center gap-2">
                {{ currentISO }}
                <button
                  @click="copyToClipboard(currentISO, 'current-iso')"
                  class="opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="Copy ISO date"
                >
                  <component :is="copied === 'current-iso' ? Check : Copy" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Input Section -->
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base flex items-center gap-2">
            <ArrowRightLeft class="w-5 h-5" />
            Convert Timestamp
          </CardTitle>
          <CardDescription>
            Enter a Unix timestamp (seconds or milliseconds) or a date string — auto-detected
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex gap-3">
            <input
              v-model="inputTimestamp"
              type="text"
              placeholder="e.g. 1718236800 or 2024-06-12T15:30:00Z"
              class="flex-1 px-4 py-3 border rounded-lg font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
            <Button @click="setNow" variant="outline" aria-label="Use current timestamp">
              <RefreshCw class="w-4 h-4 mr-2" />
              Now
            </Button>
            <Button @click="clear" variant="ghost" aria-label="Clear input">
              Clear
            </Button>
          </div>

          <!-- Quick timestamps -->
          <div class="flex gap-2 flex-wrap">
            <span class="text-xs text-muted-foreground self-center mr-1">Quick:</span>
            <Button
              v-for="ts in commonTimestamps"
              :key="ts.label"
              @click="inputTimestamp = ts.value"
              variant="outline"
              size="sm"
              class="text-xs"
              :aria-label="'Set to ' + ts.label"
            >
              {{ ts.label }}
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Seconds Since (Live) -->
      <Card v-if="parseResult && secondsSince !== null" class="border-amber-500/20 bg-amber-500/5">
        <CardHeader class="pb-3">
          <CardTitle class="text-base flex items-center gap-2">
            <Globe class="w-5 h-5 text-amber-500" />
            Seconds Since
          </CardTitle>
          <CardDescription>Live elapsed time since the entered timestamp</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="text-center p-3 bg-background rounded-lg border">
              <div class="text-2xl font-bold font-mono text-amber-600">{{ Math.abs(secondsSince).toLocaleString() }}</div>
              <div class="text-xs text-muted-foreground mt-1">{{ secondsSince >= 0 ? 'seconds ago' : 'seconds from now' }}</div>
            </div>
            <div class="text-center p-3 bg-background rounded-lg border">
              <div class="text-2xl font-bold font-mono">{{ Math.abs(minutesSince!).toLocaleString() }}</div>
              <div class="text-xs text-muted-foreground mt-1">minutes</div>
            </div>
            <div class="text-center p-3 bg-background rounded-lg border">
              <div class="text-2xl font-bold font-mono">{{ Math.abs(hoursSince!).toLocaleString() }}</div>
              <div class="text-xs text-muted-foreground mt-1">hours</div>
            </div>
            <div class="text-center p-3 bg-background rounded-lg border">
              <div class="text-2xl font-bold font-mono">{{ Math.abs(daysSince!).toLocaleString() }}</div>
              <div class="text-xs text-muted-foreground mt-1">days</div>
            </div>
          </div>
          <div class="mt-3 text-center text-sm text-muted-foreground font-medium">
            {{ humanReadableSince }}
          </div>
        </CardContent>
      </Card>

      <!-- Conversion Results -->
      <Card v-if="parseResult && Object.keys(conversions).length > 0">
        <CardHeader class="pb-3">
          <CardTitle class="text-base">All Formats</CardTitle>
          <CardDescription v-if="parseResult.wasUnix">
            Detected as Unix timestamp ({{ parseResult.wasMs ? 'milliseconds' : 'seconds' }})
          </CardDescription>
          <CardDescription v-else>
            Detected as date string
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div
            v-for="(value, label) in conversions"
            :key="label"
            class="flex items-center justify-between p-3 bg-background rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div class="flex-1 min-w-0 mr-3">
              <div class="text-xs text-muted-foreground mb-0.5">{{ label }}</div>
              <div class="font-mono text-sm truncate">{{ value }}</div>
            </div>
            <Button
              @click="copyToClipboard(value, label)"
              variant="ghost"
              size="icon"
              class="shrink-0"
              :aria-label="'Copy ' + label"
            >
              <component :is="copied === label ? Check : Copy" class="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Error state -->
      <Card v-else-if="inputTimestamp && !parseResult" class="border-destructive">
        <CardContent class="py-8 text-center">
          <p class="text-destructive font-medium">Invalid timestamp or date format</p>
          <p class="text-muted-foreground text-sm mt-1">
            Try entering a Unix timestamp like <code class="font-mono bg-muted px-1 rounded">1718236800</code> or a date like <code class="font-mono bg-muted px-1 rounded">2024-06-12</code>
          </p>
        </CardContent>
      </Card>

      <!-- Empty state -->
      <div v-else class="text-center py-12 text-muted-foreground">
        <Timer class="w-12 h-12 mx-auto mb-3 opacity-40" />
        <p>Enter a timestamp or date above to convert</p>
        <p class="text-sm mt-1">Supports Unix timestamps (s/ms), ISO 8601, and common date formats</p>
      </div>

    </div>
  </div>
</template>
