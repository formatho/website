<script setup lang="ts">
import { ref, computed } from 'vue'
import { Clock, Copy, Check } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const minute = ref('0')
const hour = ref('*')
const dayOfMonth = ref('*')
const month = ref('*')
const dayOfWeek = ref('*')
const copied = ref(false)

const cronExpression = computed(() => {
  return `${minute.value} ${hour.value} ${dayOfMonth.value} ${month.value} ${dayOfWeek.value}`
})

const humanReadable = computed(() => {
  const parts = []

  if (minute.value !== '*') parts.push(`at minute ${minute.value}`)
  if (hour.value !== '*') parts.push(`at hour ${hour.value}`)
  if (dayOfMonth.value !== '*') parts.push(`on day ${dayOfMonth.value} of the month`)
  if (month.value !== '*') parts.push(`in month ${month.value}`)
  if (dayOfWeek.value !== '*')
    parts.push(
      `on ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][parseInt(dayOfWeek.value)]}`
    )

  if (parts.length === 0) return 'Every minute'
  if (
    minute.value === '*' &&
    hour.value === '*' &&
    dayOfMonth.value === '*' &&
    month.value === '*' &&
    dayOfWeek.value === '*'
  ) {
    return 'Every minute'
  }

  return parts.join(', ')
})

const presets = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Hourly', cron: '0 * * * *' },
  { label: 'Daily (midnight)', cron: '0 0 * * *' },
  { label: 'Daily (6 AM)', cron: '0 6 * * *' },
  { label: 'Weekly (Sunday midnight)', cron: '0 0 * * 0' },
  { label: 'Monthly (1st)', cron: '0 0 1 * *' },
  { label: 'Every 5 minutes', cron: '*/5 * * * *' },
  { label: 'Every 15 minutes', cron: '*/15 * * * *' },
  { label: 'Every 30 minutes', cron: '*/30 * * * *' },
  { label: 'Every 6 hours', cron: '0 */6 * * *' },
  { label: 'Weekdays (9 AM)', cron: '0 9 * * 1-5' },
  { label: 'Weekends (10 AM)', cron: '0 10 * * 0,6' }
]

const applyPreset = (cron: string) => {
  const parts = cron.split(' ')
  minute.value = parts[0] ?? '*'
  hour.value = parts[1] ?? '*'
  dayOfMonth.value = parts[2] ?? '*'
  month.value = parts[3] ?? '*'
  dayOfWeek.value = parts[4] ?? '*'
}

const copyCron = () => {
  navigator.clipboard.writeText(cronExpression.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const specialChars = [
  { char: '*', desc: 'Any value' },
  { char: ',', desc: 'List separator' },
  { char: '-', desc: 'Range' },
  { char: '/', desc: 'Step values' }
]
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Clock class="w-8 h-8" />
          Crontab Generator
        </h1>
        <p class="text-muted-foreground mt-2">Generate and understand cron expressions.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Input -->
        <Card class="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cron Expression Builder</CardTitle>
            <CardDescription>Configure each field</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Fields -->
            <div class="grid grid-cols-5 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Minute</label>
                <input
                  v-model="minute"
                  type="text"
                  placeholder="0-59"
                  class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div class="text-xs text-muted-foreground mt-1 text-center">0-59</div>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Hour</label>
                <input
                  v-model="hour"
                  type="text"
                  placeholder="0-23"
                  class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div class="text-xs text-muted-foreground mt-1 text-center">0-23</div>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Day</label>
                <input
                  v-model="dayOfMonth"
                  type="text"
                  placeholder="1-31"
                  class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div class="text-xs text-muted-foreground mt-1 text-center">1-31</div>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Month</label>
                <input
                  v-model="month"
                  type="text"
                  placeholder="1-12"
                  class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div class="text-xs text-muted-foreground mt-1 text-center">1-12</div>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Weekday</label>
                <input
                  v-model="dayOfWeek"
                  type="text"
                  placeholder="0-6"
                  class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div class="text-xs text-muted-foreground mt-1 text-center">0-6</div>
              </div>
            </div>

            <!-- Presets -->
            <div>
              <label class="block text-sm font-medium mb-2">Quick Presets</label>
              <div class="flex flex-wrap gap-2">
                <Button
                  v-for="preset in presets"
                  :key="preset.label"
                  @click="applyPreset(preset.cron)"
                  variant="outline"
                  size="sm"
                >
                  {{ preset.label }}
                </Button>
              </div>
            </div>

            <!-- Special Characters -->
            <div class="p-4 bg-surface-hover rounded-lg">
              <div class="text-sm font-medium mb-2">Special Characters</div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div v-for="char in specialChars" :key="char.char" class="flex items-center gap-2">
                  <code class="bg-primary/10 px-2 py-1 rounded">{{ char.char }}</code>
                  <span class="text-muted-foreground">{{ char.desc }}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Output -->
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Cron Expression -->
            <div class="p-4 bg-surface-hover rounded-lg">
              <div class="text-sm text-muted-foreground mb-2">Cron Expression</div>
              <div class="font-mono text-xl text-center">{{ cronExpression }}</div>
            </div>

            <!-- Human Readable -->
            <div class="p-4 bg-surface-hover rounded-lg">
              <div class="text-sm text-muted-foreground mb-2">Human Readable</div>
              <div class="capitalize">{{ humanReadable }}</div>
            </div>

            <!-- Copy Button -->
            <Button @click="copyCron" class="w-full" aria-label="Copy cron expression">
              <component :is="copied ? Check : Copy" class="w-4 h-4 mr-2" />
              {{ copied ? 'Copied!' : 'Copy Expression' }}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
