<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface AnalyticsStats {
  totalUsers: number
  activeUsers: number
  pageViews: number
  sessions: number
  avgSessionDuration: number
  bounceRate: number
  topPages: Array<{ path: string; count: number }>
  topEvents: Array<{ name: string; count: number }>
  conversionFunnels: Array<{
    name: string
    steps: Array<{ name: string; count: number; conversionRate: number }>
  }>
}

const stats = ref<AnalyticsStats>({
  totalUsers: 0,
  activeUsers: 0,
  pageViews: 0,
  sessions: 0,
  avgSessionDuration: 0,
  bounceRate: 0,
  topPages: [],
  topEvents: [],
  conversionFunnels: []
})

const dateRange = ref({
  start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  end: new Date()
})

const loading = ref(true)

onMounted(async () => {
  await fetchStats()
})

async function fetchStats() {
  loading.value = true
  try {
    const response = await fetch(
      `http://localhost:18766/api/analytics/stats?start=${dateRange.value.start.toISOString()}&end=${dateRange.value.end.toISOString()}`
    )
    stats.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
  } finally {
    loading.value = false
  }
}

const formatDuration = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  }
  return `${seconds}s`
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Analytics Dashboard</h1>
      <p class="text-muted-foreground">Monitor user behavior, conversion funnels, and feature usage</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="text-2xl">Loading analytics...</div>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-6">
      <!-- Overview Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 bg-card border border-border rounded-lg">
          <div class="text-3xl font-bold text-primary">{{ stats.totalUsers.toLocaleString() }}</div>
          <div class="text-sm text-muted-foreground">Total Users</div>
        </div>
        <div class="p-4 bg-card border border-border rounded-lg">
          <div class="text-3xl font-bold text-green-600">{{ stats.activeUsers.toLocaleString() }}</div>
          <div class="text-sm text-muted-foreground">Active Today</div>
        </div>
        <div class="p-4 bg-card border border-border rounded-lg">
          <div class="text-3xl font-bold text-blue-600">{{ stats.pageViews.toLocaleString() }}</div>
          <div class="text-sm text-muted-foreground">Page Views</div>
        </div>
        <div class="p-4 bg-card border border-border rounded-lg">
          <div class="text-3xl font-bold text-purple-600">{{ stats.sessions.toLocaleString() }}</div>
          <div class="text-sm text-muted-foreground">Sessions</div>
        </div>
      </div>

      <!-- Engagement Metrics -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="p-6 bg-card border border-border rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Engagement</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Avg. Session Duration</span>
              <span class="font-semibold">{{ formatDuration(stats.avgSessionDuration) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Bounce Rate</span>
              <span class="font-semibold">{{ (stats.bounceRate * 100).toFixed(1) }}%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Pages per Session</span>
              <span class="font-semibold">{{ (stats.pageViews / stats.sessions).toFixed(1) }}</span>
            </div>
          </div>
        </div>

        <div class="p-6 bg-card border border-border rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Date Range</h3>
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="text-sm text-muted-foreground">Start</label>
              <input
                v-model="dateRange.start"
                type="date"
                aria-label="Start date"
                class="w-full px-3 py-2 border border-border rounded"
              />
            </div>
            <div class="flex-1">
              <label class="text-sm text-muted-foreground">End</label>
              <input
                v-model="dateRange.end"
                type="date"
                aria-label="End date"
                class="w-full px-3 py-2 border border-border rounded"
              />
            </div>
          </div>
          <button
            @click="fetchStats"
            aria-label="Apply date range filter"
            class="w-full mt-4 py-2 bg-primary text-primary-foreground rounded font-medium"
          >
            Apply
          </button>
        </div>
      </div>

      <!-- Top Pages -->
      <div class="p-6 bg-card border border-border rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Top Pages</h3>
        <div class="space-y-3">
          <div
            v-for="page in stats.topPages"
            :key="page.path"
            class="flex justify-between items-center p-2 hover:bg-muted/30 rounded"
          >
            <span class="text-sm font-mono">{{ page.path }}</span>
            <span class="text-sm font-semibold">{{ page.count.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <!-- Top Events -->
      <div class="p-6 bg-card border border-border rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Top Events</h3>
        <div class="space-y-3">
          <div
            v-for="event in stats.topEvents"
            :key="event.name"
            class="flex justify-between items-center p-2 hover:bg-muted/30 rounded"
          >
            <span class="text-sm">{{ event.name }}</span>
            <span class="text-sm font-semibold">{{ event.count.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <!-- Conversion Funnels -->
      <div class="p-6 bg-card border border-border rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Conversion Funnels</h3>
        <div class="space-y-6">
          <div v-for="funnel in stats.conversionFunnels" :key="funnel.name">
            <h4 class="font-medium mb-3">{{ funnel.name }}</h4>
            <div class="space-y-2">
              <div
                v-for="(step, index) in funnel.steps"
                :key="step.name"
                class="relative"
              >
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm">{{ index + 1 }}. {{ step.name }}</span>
                  <span class="text-sm font-semibold">{{ step.count.toLocaleString() }}</span>
                </div>
                <div class="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary transition-all"
                    :style="{ width: `${step.conversionRate * 100}%` }"
                  ></div>
                </div>
                <div class="text-xs text-muted-foreground mt-1">
                  {{ (step.conversionRate * 100).toFixed(1) }}% conversion
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
