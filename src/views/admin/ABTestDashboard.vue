<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ABTestVariant {
  variant_id: string
  variant_name: string
  visitors: number
  conversions: number
  conversion_rate: number
  traffic_weight: number
}

interface ABTestResults {
  test_id: string
  test_name: string
  hypothesis: string
  start_time: string
  end_time: string
  status: string
  variants: ABTestVariant[]
  winner?: string
  statistical_significance: number
  total_visitors: number
  total_conversions: number
  expected_lift: number
  actual_lift: number
}

const tests = ref<ABTestResults[]>([])
const loading = ref(true)
const error = ref('')
const autoRefresh = ref(true)
const refreshInterval = ref<number | null>(null)

const fetchTests = async () => {
  try {
    const response = await fetch('/api/analytics/ab-tests', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!response.ok) throw new Error('Failed to fetch A/B tests')

    const data = await response.json()
    tests.value = data.tests || []
    error.value = ''
  } catch (err: any) {
    error.value = err.message || 'Failed to load A/B test data'
    console.error('Error fetching A/B tests:', err)
  } finally {
    loading.value = false
  }
}

const getConfidenceColor = (significance: number): string => {
  if (significance >= 0.95) return 'bg-green-500'
  if (significance >= 0.85) return 'bg-yellow-500'
  return 'bg-gray-400'
}

const getConfidenceText = (significance: number): string => {
  if (significance >= 0.95) return '95%+ Confidence'
  if (significance >= 0.85) return '85%+ Confidence'
  if (significance >= 0.50) return '50%+ Confidence'
  return 'Insufficient Data'
}

const getStatusBadge = (status: string): string => {
  switch (status) {
    case 'running':
      return 'bg-green-500'
    case 'completed':
      return 'bg-blue-500'
    case 'paused':
      return 'bg-yellow-500'
    default:
      return 'bg-gray-500'
  }
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num)
}

const formatPercent = (num: number): string => {
  return num.toFixed(2) + '%'
}

const toggleAutoRefresh = () => {
  autoRefresh.value = !autoRefresh.value

  if (autoRefresh.value) {
    refreshInterval.value = window.setInterval(fetchTests, 30000) // 30 seconds
  } else if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
    refreshInterval.value = null
  }
}

onMounted(() => {
  fetchTests()

  if (autoRefresh.value) {
    refreshInterval.value = window.setInterval(fetchTests, 30000)
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold">A/B Test Dashboard</h1>
        <p class="text-muted-foreground mt-2">
          Monitor test performance and identify winning variants
        </p>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div
            :class="[
              'w-2 h-2 rounded-full',
              autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            ]"
          />
          <span class="text-sm text-muted-foreground">
            {{ autoRefresh ? 'Live Updates' : 'Paused' }}
          </span>
        </div>

        <Button @click="toggleAutoRefresh" variant="outline">
          {{ autoRefresh ? 'Pause' : 'Resume' }}
        </Button>

        <Button @click="fetchTests">
          Refresh
        </Button>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
      <p class="text-red-400">{{ error }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p class="text-muted-foreground">Loading A/B test data...</p>
    </div>

    <!-- Tests Grid -->
    <div v-else class="space-y-6">
      <Card v-for="test in tests" :key="test.test_id" class="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <CardTitle class="text-2xl">{{ test.test_name }}</CardTitle>
                <Badge :class="getStatusBadge(test.status)">
                  {{ test.status }}
                </Badge>
                <Badge v-if="test.winner" class="bg-green-500">
                  Winner: {{ test.winner }}
                </Badge>
              </div>
              <CardDescription class="text-base">
                {{ test.hypothesis }}
              </CardDescription>
            </div>

            <div class="text-right">
              <div class="text-sm text-muted-foreground mb-1">Expected Lift</div>
              <div class="text-2xl font-bold text-green-400">
                +{{ test.expected_lift }}%
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <!-- Overall Stats -->
          <div class="grid grid-cols-4 gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
            <div>
              <div class="text-sm text-muted-foreground mb-1">Total Visitors</div>
              <div class="text-2xl font-bold">{{ formatNumber(test.total_visitors) }}</div>
            </div>
            <div>
              <div class="text-sm text-muted-foreground mb-1">Total Conversions</div>
              <div class="text-2xl font-bold">{{ formatNumber(test.total_conversions) }}</div>
            </div>
            <div>
              <div class="text-sm text-muted-foreground mb-1">Overall Conversion</div>
              <div class="text-2xl font-bold">
                {{ test.total_visitors > 0 ? formatPercent((test.total_conversions / test.total_visitors) * 100) : '0%' }}
              </div>
            </div>
            <div>
              <div class="text-sm text-muted-foreground mb-1">Statistical Confidence</div>
              <div class="flex items-center gap-2">
                <div :class="['w-3 h-3 rounded-full', getConfidenceColor(test.statistical_significance)]" />
                <span class="text-sm font-medium">{{ getConfidenceText(test.statistical_significance) }}</span>
              </div>
            </div>
          </div>

          <!-- Variants -->
          <div class="space-y-3">
            <div class="text-sm font-medium text-muted-foreground mb-2">Variants Performance</div>

            <div
              v-for="variant in test.variants"
              :key="variant.variant_id"
              :class="[
                'p-4 rounded-lg border transition-all',
                test.winner === variant.variant_id
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-slate-800/30 border-slate-700'
              ]"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    v-if="test.winner === variant.variant_id"
                    class="text-green-400"
                  >
                    ✓
                  </div>
                  <div class="font-semibold">{{ variant.variant_name }}</div>
                </div>

                <div class="text-right">
                  <div class="text-sm text-muted-foreground">Conversion Rate</div>
                  <div class="text-xl font-bold">
                    {{ formatPercent(variant.conversion_rate) }}
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span class="text-muted-foreground">Visitors:</span>
                  <span class="ml-2 font-medium">{{ formatNumber(variant.visitors) }}</span>
                </div>
                <div>
                  <span class="text-muted-foreground">Conversions:</span>
                  <span class="ml-2 font-medium">{{ formatNumber(variant.conversions) }}</span>
                </div>
                <div>
                  <span class="text-muted-foreground">Traffic:</span>
                  <span class="ml-2 font-medium">{{ formatPercent(variant.traffic_weight * 100) }}</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mt-3">
                <div 
                  :class="[
                    'h-2 rounded-full overflow-hidden',
                    test.winner === variant.variant_id ? 'bg-green-500/20' : 'bg-slate-700'
                  ]"
                >
                  <div 
                    :class="[
                      'h-full rounded-full transition-all',
                      test.winner === variant.variant_id ? 'bg-green-500' : 'bg-blue-500'
                    ]"
                    :style="{ width: `${Math.min((variant.conversion_rate / 10) * 100, 100)}%` }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Recommendations -->
          <div
            v-if="test.statistical_significance >= 0.95"
            class="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <div class="flex items-start gap-3">
              <div class="text-green-400 text-xl">✓</div>
              <div>
                <div class="font-semibold text-green-400 mb-1">Test Complete!</div>
                <div class="text-sm text-muted-foreground">
                  Statistical significance reached ({{ (test.statistical_significance * 100).toFixed(0) }}% confidence).
                  <span v-if="test.winner">
                    <strong>{{ test.winner }}</strong> is the winner with {{ test.actual_lift > 0 ? '+' : '' }}{{ test.actual_lift.toFixed(1) }}% lift.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="test.total_visitors < 1000"
            class="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          >
            <div class="flex items-start gap-3">
              <div class="text-blue-400 text-xl">ℹ️</div>
              <div>
                <div class="font-semibold text-blue-400 mb-1">Collecting Data...</div>
                <div class="text-sm text-muted-foreground">
                  Need at least 1,000 visitors per variant for statistically significant results.
                  Currently at {{ formatNumber(test.total_visitors) }} total visitors.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Empty State -->
      <div v-if="tests.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🧪</div>
        <h3 class="text-xl font-semibold mb-2">No Active A/B Tests</h3>
        <p class="text-muted-foreground">
          A/B tests will appear here once they start collecting data.
        </p>
      </div>
    </div>
  </div>
</template>
