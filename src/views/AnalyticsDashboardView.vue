<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Papa from 'papaparse'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Time range selector
const timeRange = ref<'7d' | '30d' | '90d'>('7d')

// Analytics data (mock)
interface DataPoint {
  date: string
  cpuUsage: number
  memoryUsage: number
  tasksCompleted: number
}

const analyticsData = ref<DataPoint[]>([])

// Task type distribution
interface TaskType {
  name: string
  value: number
}

const taskTypeDistribution = ref<TaskType[]>([
  { name: 'Content Generation', value: 45 },
  { name: 'Code Review', value: 30 },
  { name: 'Data Analysis', value: 25 }
])

// Agent performance data
interface AgentPerformance {
  agentName: string
  score: number
}

const agentPerformance = ref<AgentPerformance[]>([
  { agentName: 'Content Bot Alpha', score: 95 },
  { agentName: 'Code Reviewer Beta', score: 88 },
  { agentName: 'Data Analyst Gamma', score: 92 }
])

// Generate mock data based on time range
const generateMockData = () => {
  const days = timeRange.value === '7d' ? 7 : timeRange.value === '30d' ? 30 : 90
  
  analyticsData.value = Array.from({ length: days }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (days - i - 1))
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      cpuUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
      memoryUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
      tasksCompleted: Math.floor(Math.random() * 20) + 5 // 5-25 tasks
    }
  })
}

// Time range selector handler
const onTimeRangeChange = (range: '7d' | '30d' | '90d') => {
  timeRange.value = range
  generateMockData()
}

onMounted(() => {
  generateMockData()
})

// Export functions
const exportToCSV = () => {
  const csv = Papa.unparse({
    fields: ['Date', 'CPU Usage (%)', 'Memory Usage (%)', 'Tasks Completed'],
    data: analyticsData.value.map(item => [item.date, item.cpuUsage, item.memoryUsage, item.tasksCompleted])
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `analytics-export-${timeRange.value}.csv`
  link.click()
}

const exportToJSON = () => {
  const json = JSON.stringify(analyticsData.value, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `analytics-export-${timeRange.value}.json`
  link.click()
}

// Computed properties for KPIs
const totalTasksCompleted = computed(() => analyticsData.value.reduce((sum, item) => sum + item.tasksCompleted, 0))
const avgCpuUsage = computed(() => Math.round(analyticsData.value.reduce((sum, item) => sum + item.cpuUsage, 0) / analyticsData.value.length))
const avgMemoryUsage = computed(() => Math.round(analyticsData.value.reduce((sum, item) => sum + item.memoryUsage, 0) / analyticsData.value.length))

// Recent activity (last 10 items reversed)
const recentActivity = computed(() => [...analyticsData.value].reverse().slice(0, 10))
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Monitor agent performance, task completion trends, and collaboration insights</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Top Controls -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <!-- Time Range Selector -->
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <Button 
            @click="onTimeRangeChange('7d')" aria-label="Show last 7 days"
            :variant="timeRange === '7d' ? 'default' : 'outline'"
          >
            Last 7 Days
          </Button>
          <Button 
            @click="onTimeRangeChange('30d')" aria-label="Show last 30 days"
            :variant="timeRange === '30d' ? 'default' : 'outline'"
          >
            Last 30 Days
          </Button>
          <Button 
            @click="onTimeRangeChange('90d')" aria-label="Show last 90 days"
            :variant="timeRange === '90d' ? 'default' : 'outline'"
          >
            Last 90 Days
          </Button>
        </div>

        <!-- Export Buttons -->
        <div class="flex gap-2">
          <Button 
            @click="exportToCSV" aria-label="Export analytics as CSV"
            class="bg-green-600 hover:bg-green-700"
          >
            Export CSV
          </Button>
          <Button 
            @click="exportToJSON"
            class="bg-purple-600 hover:bg-purple-700"
          >
            Export JSON
          </Button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</h3>
            <span class="text-2xl">📊</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ totalTasksCompleted }}</span>
            <span class="text-sm text-green-600">+12.5%</span>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400">Avg CPU Usage</h3>
            <span class="text-2xl">⚡</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ avgCpuUsage }}%</span>
            <span class="text-sm text-green-600">-3.2%</span>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Memory</h3>
            <span class="text-2xl">💾</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ avgMemoryUsage }}%</span>
            <span class="text-sm text-green-600">+1.8%</span>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Agents</h3>
            <span class="text-2xl">🤖</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">23</span>
            <span class="text-sm text-green-600">+4 new</span>
          </div>
        </div>
      </div>

      <!-- Main Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Analytics Overview Chart (Line + Bar) -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Overview</h3>
          
          <!-- Custom SVG Line Chart -->
          <svg viewBox="0 0 500 200" class="w-full h-48">
            <!-- Grid lines -->
            <line v-for="i in 5" :key="i" 
              :x1="40" 
              :y1="40 + (i * 35)" 
              :x2="460" 
              :y2="40 + (i * 35)" 
              stroke="#e5e7eb" 
              stroke-width="1"
            />
            
            <!-- CPU Usage Line -->
            <polyline
              :points="analyticsData.map((d, i) => {
                const x = 40 + (i / Math.max(analyticsData.length - 1, 1)) * 420;
                const y = 160 - ((d.cpuUsage - 30) / 40) * 120;
                return `${x},${y}`;
              }).join(' ')"
              fill="none" 
              stroke="#3b82f6" 
              stroke-width="2"
            />
            
            <!-- Memory Usage Line -->
            <polyline
              :points="analyticsData.map((d, i) => {
                const x = 40 + (i / Math.max(analyticsData.length - 1, 1)) * 420;
                const y = 160 - ((d.memoryUsage - 40) / 30) * 120;
                return `${x},${y}`;
              }).join(' ')"
              fill="none" 
              stroke="#f59e0b" 
              stroke-width="2"
            />
            
            <!-- Tasks Completed Bar Chart -->
            <rect
              v-for="(d, i) in analyticsData.slice(-15)"
              :key="i"
              :x="40 + (i / Math.max(analyticsData.length - 1, 1)) * 420 - 8"
              :y="160 - ((d.tasksCompleted / 25) * 120)"
              width="16"
              height="120"
              fill="#10b981"
              opacity="0.3"
            />
            
            <!-- Y-axis labels -->
            <text v-for="val in [0, 25, 50, 75, 100]" :key="val" 
              x="35" 
              :y="160 - ((val / 100) * 120) + 4" 
              text-anchor="end"
              class="text-xs fill-gray-600"
            >{{ val }}%</text>
            
            <!-- Legend -->
            <rect x="430" y="10" width="12" height="12" fill="#3b82f6" rx="2" />
            <text x="450" y="19" class="text-xs fill-gray-700">CPU Usage</text>
            
            <rect x="430" y="28" width="12" height="12" fill="#f59e0b" rx="2" />
            <text x="450" y="37" class="text-xs fill-gray-700">Memory Usage</text>
            
            <rect x="430" y="46" width="12" height="12" fill="#10b981" rx="2" opacity="0.3" />
            <text x="450" y="55" class="text-xs fill-gray-700">Tasks</text>
          </svg>
        </div>

        <!-- Task Type Distribution (Pie Chart using CSS conic gradient) -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Task Distribution</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Breakdown of tasks by type over selected period</p>
          </div>
          
          <!-- Pie Chart -->
          <div 
            :style="{
              background: `conic-gradient(
                #3b82f6 0deg ${taskTypeDistribution[0].value * 3.6}deg,
                #10b981 ${taskTypeDistribution[0].value * 3.6}deg ${(taskTypeDistribution[0].value + taskTypeDistribution[1].value) * 3.6}deg,
                #f59e0b ${(taskTypeDistribution[0].value + taskTypeDistribution[1].value) * 3.6}deg 360deg
              )`
            }"
            class="w-48 h-48 rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-lg"
          ></div>
          
          <!-- Legend -->
          <div class="space-y-2">
            <div v-for="(item, i) in taskTypeDistribution" :key="i" class="flex items-center gap-2">
              <div 
                :style="{ backgroundColor: i === 0 ? '#3b82f6' : i === 1 ? '#10b981' : '#f59e0b' }"
                class="w-4 h-4 rounded-full"
              ></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.name }}</span>
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.value }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Agent Performance Bar Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Agent Performance</h3>
          
          <div class="space-y-2">
            <div v-for="(item, i) in agentPerformance" :key="i" class="flex items-center gap-3">
              <span class="text-xs text-gray-600 dark:text-gray-400 w-32 truncate">{{ item.agentName }}</span>
              <div class="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden relative">
                <div 
                  class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                  :style="{ width: `${item.score}%` }"
                ></div>
                <span class="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {{ item.score }}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Task Type Donut Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Task Categories</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Distribution of tasks across different categories</p>
          </div>
          
          <!-- Donut Chart -->
          <div 
            :style="{
              background: `conic-gradient(
                #3b82f6 0deg ${taskTypeDistribution[0].value * 3.6}deg,
                #10b981 ${taskTypeDistribution[0].value * 3.6}deg ${(taskTypeDistribution[0].value + taskTypeDistribution[1].value) * 3.6}deg,
                #f59e0b ${(taskTypeDistribution[0].value + taskTypeDistribution[1].value) * 3.6}deg 360deg
              )`
            }"
            class="w-48 h-48 rounded-full flex items-center justify-center shadow-lg relative"
          >
            <!-- Inner white circle to create donut effect -->
            <div 
              class="absolute inset-0 bg-white dark:bg-gray-800 m-auto rounded-full"
              style="width: 65%; height: 65%;"
            ></div>
            
            <div class="text-center relative z-10">
              <div class="text-lg font-bold text-gray-900 dark:text-white">
                {{ taskTypeDistribution.reduce((sum, d) => sum + d.value, 0) }}%
              </div>
              <div class="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CPU Usage</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Memory Usage</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tasks Completed</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(item, index) in recentActivity" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ item.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  <span :class="[
                    'inline-block px-2 py-1 rounded-full text-xs',
                    item.cpuUsage > 70 ? 'bg-red-100 text-red-800' : 
                    item.cpuUsage > 50 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  ]">{{ item.cpuUsage }}%</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  <span :class="[
                    'inline-block px-2 py-1 rounded-full text-xs',
                    item.memoryUsage > 70 ? 'bg-red-100 text-red-800' : 
                    item.memoryUsage > 50 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  ]">{{ item.memoryUsage }}%</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ item.tasksCompleted }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer info -->
      <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Data is refreshed automatically every 5 minutes | Pro features available in Agent Orchestrator
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>