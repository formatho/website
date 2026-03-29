<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { abTestManager, landingPageTests, type ABTest, type ABTestVariant } from '@/utils/abTesting'

const tests = ref<ABTest[]>([])
const selectedTest = ref<ABTest | null>(null)
const results = ref<Record<string, any>>({})
const isLoading = ref(false)

// Load tests on mount
onMounted(() => {
  tests.value = abTestManager.getActiveTests()
})

// Load results for a test
async function loadResults(testId: string) {
  isLoading.value = true
  try {
    const result = await abTestManager.getResults(testId)
    if (result) {
      results.value[testId] = result
    }
  } catch (e) {
    console.error('Failed to load results:', e)
  } finally {
    isLoading.value = false
  }
}

// Select a test to view details
function selectTest(test: ABTest) {
  selectedTest.value = test
  loadResults(test.id)
}

// Get variant stats
function getVariantStats(test: ABTest, variantId: string) {
  const testResults = results.value[test.id]
  if (!testResults?.variants) return null
  
  return testResults.variants.find((v: any) => v.id === variantId)
}

// Format date
function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Calculate days running
function daysRunning(startDate: Date): number {
  const start = new Date(startDate)
  const now = new Date()
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

// Get winner indicator
function getWinner(test: ABTest): string | null {
  const testResults = results.value[test.id]
  if (!testResults?.winner) return null
  
  const winner = test.variants.find(v => v.id === testResults.winner)
  return winner?.name || null
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">A/B Test Dashboard</h1>
      <p class="text-slate-400">Monitor and analyze your landing page experiments</p>
    </div>

    <!-- Test List -->
    <div class="grid gap-4 mb-8">
      <Card 
        v-for="test in tests" 
        :key="test.id"
        class="cursor-pointer hover:border-blue-500 transition-colors"
        :class="{ 'border-blue-500': selectedTest?.id === test.id }"
        @click="selectTest(test)"
      >
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="text-lg">{{ test.name }}</CardTitle>
              <CardDescription>
                Target: {{ test.targetMetric }} • {{ daysRunning(test.startDate) }} days running
              </CardDescription>
            </div>
            <div class="flex items-center gap-2">
              <span 
                class="px-2 py-1 text-xs rounded-full"
                :class="test.active ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'"
              >
                {{ test.active ? 'Active' : 'Inactive' }}
              </span>
              <span class="text-sm text-slate-400">
                {{ test.trafficAllocation }}% traffic
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="variant in test.variants" :key="variant.id" class="text-sm">
              <div class="font-medium">{{ variant.name }}</div>
              <div class="text-slate-400">{{ variant.weight }}% of traffic</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Selected Test Details -->
    <Card v-if="selectedTest" class="mt-6">
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>{{ selectedTest.name }}</CardTitle>
            <CardDescription>
              Started {{ formatDate(selectedTest.startDate) }}
            </CardDescription>
          </div>
          <Button @click="loadResults(selectedTest.id)" :disabled="isLoading">
            {{ isLoading ? 'Loading...' : 'Refresh Results' }}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <!-- Winner Banner -->
        <div 
          v-if="getWinner(selectedTest)" 
          class="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
        >
          <div class="flex items-center gap-2">
            <span class="text-2xl">🏆</span>
            <div>
              <div class="font-semibold text-green-400">Winner Detected</div>
              <div class="text-sm">{{ getWinner(selectedTest) }}</div>
            </div>
          </div>
        </div>

        <!-- Variant Results -->
        <div class="grid gap-4">
          <div 
            v-for="variant in selectedTest.variants" 
            :key="variant.id"
            class="p-4 border border-slate-700 rounded-lg"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-semibold">{{ variant.name }}</h4>
              <span class="text-sm text-slate-400">{{ variant.weight }}% traffic</span>
            </div>
            
            <!-- Variant Changes Preview -->
            <div class="mb-4 text-sm">
              <div class="text-slate-400 mb-1">Changes:</div>
              <div class="bg-slate-800/50 rounded p-2">
                <div v-for="(value, key) in variant.changes" :key="key" class="truncate">
                  <span class="text-slate-400">{{ key }}:</span>
                  <span class="ml-2">{{ value }}</span>
                </div>
              </div>
            </div>

            <!-- Stats (if available) -->
            <div v-if="getVariantStats(selectedTest, variant.id)" class="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div class="text-slate-400">Visitors</div>
                <div class="font-semibold">{{ getVariantStats(selectedTest, variant.id)?.visitors || 0 }}</div>
              </div>
              <div>
                <div class="text-slate-400">Conversions</div>
                <div class="font-semibold">{{ getVariantStats(selectedTest, variant.id)?.conversions || 0 }}</div>
              </div>
              <div>
                <div class="text-slate-400">Conv. Rate</div>
                <div class="font-semibold text-green-400">
                  {{ (getVariantStats(selectedTest, variant.id)?.conversionRate * 100).toFixed(1) }}%
                </div>
              </div>
            </div>
            <div v-else class="text-sm text-slate-400">
              No results yet. Click "Refresh Results" to load data from analytics.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Getting Started -->
    <Card v-else class="mt-6">
      <CardHeader>
        <CardTitle>Select a Test</CardTitle>
        <CardDescription>
          Click on a test above to view detailed results and variant performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="text-sm text-slate-400">
          <p class="mb-4">A/B testing helps you optimize your landing page by comparing different versions:</p>
          <ul class="list-disc list-inside space-y-2">
            <li><strong>Headline Test:</strong> Comparing value-based vs speed-based messaging</li>
            <li><strong>CTA Test:</strong> Testing different button copy variations</li>
            <li><strong>Urgency Test:</strong> Scarcity vs social proof approaches</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
