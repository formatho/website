<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Feedback {
  id: string
  type: 'bug' | 'feature' | 'testimonial' | 'general'
  rating: number
  title: string
  description: string
  email: string
  name: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  created_at: string
  resolution?: string
  assigned_to?: string
}

const feedback = ref<Feedback[]>([])
const loading = ref(true)
const selectedFeedback = ref<Feedback | null>(null)
const filter = ref({
  status: '',
  type: '',
  priority: ''
})

const stats = ref({
  total: 0,
  by_type: {} as Record<string, number>,
  by_status: {} as Record<string, number>,
  by_priority: {} as Record<string, number>,
  average_rating: 0,
  recent_count: 0
})

const filteredFeedback = computed(() => {
  return feedback.value.filter(f => {
    if (filter.value.status && f.status !== filter.value.status) return false
    if (filter.value.type && f.type !== filter.value.type) return false
    if (filter.value.priority && f.priority !== filter.value.priority) return false
    return true
  })
})

onMounted(async () => {
  await Promise.all([
    fetchFeedback(),
    fetchStats()
  ])
})

async function fetchFeedback() {
  try {
    const response = await fetch('http://localhost:18766/api/beta-feedback')
    const data = await response.json()
    feedback.value = data.feedback || []
  } catch (error) {
    console.error('Failed to fetch feedback:', error)
  } finally {
    loading.value = false
  }
}

async function fetchStats() {
  try {
    const response = await fetch('http://localhost:18766/api/beta-feedback/stats')
    stats.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

async function updateStatus(id: string, status: string) {
  try {
    const response = await fetch(`http://localhost:18766/api/beta-feedback/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    
    if (response.ok) {
      await fetchFeedback()
      await fetchStats()
    }
  } catch (error) {
    console.error('Failed to update status:', error)
  }
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800'
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
}

const typeIcons = {
  bug: '🐛',
  feature: '💡',
  testimonial: '⭐',
  general: '💬'
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Beta Feedback Dashboard</h1>
      <p class="text-muted-foreground">Review and manage feedback from beta testers</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="p-4 bg-card border border-border rounded-lg">
        <div class="text-2xl font-bold">{{ stats.total }}</div>
        <div class="text-sm text-muted-foreground">Total Feedback</div>
      </div>
      <div class="p-4 bg-card border border-border rounded-lg">
        <div class="text-2xl font-bold">{{ stats.by_status?.new || 0 }}</div>
        <div class="text-sm text-muted-foreground">New</div>
      </div>
      <div class="p-4 bg-card border border-border rounded-lg">
        <div class="text-2xl font-bold">{{ stats.recent_count }}</div>
        <div class="text-sm text-muted-foreground">Last 7 Days</div>
      </div>
      <div class="p-4 bg-card border border-border rounded-lg">
        <div class="text-2xl font-bold">{{ stats.average_rating?.toFixed(1) || 'N/A' }}</div>
        <div class="text-sm text-muted-foreground">Avg Rating</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 mb-6">
      <select v-model="filter.status" class="px-4 py-2 border border-border rounded-lg bg-background">
        <option value="">All Statuses</option>
        <option value="new">New</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>
      <select v-model="filter.type" class="px-4 py-2 border border-border rounded-lg bg-background">
        <option value="">All Types</option>
        <option value="bug">Bug</option>
        <option value="feature">Feature</option>
        <option value="testimonial">Testimonial</option>
        <option value="general">General</option>
      </select>
      <select v-model="filter.priority" class="px-4 py-2 border border-border rounded-lg bg-background">
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
    </div>

    <!-- Feedback List -->
    <div v-if="loading" class="text-center py-12">
      <div class="text-2xl">Loading...</div>
    </div>

    <div v-else-if="filteredFeedback.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">📭</div>
      <p class="text-muted-foreground">No feedback found</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in filteredFeedback"
        :key="item.id"
        class="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all cursor-pointer"
        @click="selectedFeedback = item"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ typeIcons[item.type] }}</span>
            <div>
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ item.name || 'Anonymous' }} • {{ item.email }}
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <span :class="['px-2 py-1 rounded text-xs font-medium', statusColors[item.status]]">
              {{ item.status }}
            </span>
            <span :class="['px-2 py-1 rounded text-xs font-medium', priorityColors[item.priority]]">
              {{ item.priority }}
            </span>
          </div>
        </div>
        
        <p class="text-sm text-muted-foreground mb-3 line-clamp-2">
          {{ item.description }}
        </p>
        
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">
            {{ new Date(item.created_at).toLocaleDateString() }}
          </span>
          <div v-if="item.rating > 0" class="flex gap-1">
            <span v-for="i in 5" :key="i">{{ i <= item.rating ? '⭐' : '☆' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="selectedFeedback" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" @click="selectedFeedback = null">
      <div class="bg-background max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg p-6" @click.stop>
        <div class="flex items-start justify-between mb-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">{{ typeIcons[selectedFeedback.type] }}</span>
              <h2 class="text-xl font-bold">{{ selectedFeedback.title }}</h2>
            </div>
            <p class="text-sm text-muted-foreground">
              From: {{ selectedFeedback.name || 'Anonymous' }} ({{ selectedFeedback.email }})
            </p>
          </div>
          <button @click="selectedFeedback = null" class="text-2xl hover:text-red-500">✕</button>
        </div>

        <div class="space-y-4">
          <div>
            <h3 class="font-semibold mb-2">Description</h3>
            <p class="text-sm">{{ selectedFeedback.description }}</p>
          </div>

          <div v-if="selectedFeedback.rating > 0">
            <h3 class="font-semibold mb-2">Rating</h3>
            <div class="flex gap-1">
              <span v-for="i in 5" :key="i" class="text-2xl">{{ i <= selectedFeedback.rating ? '⭐' : '☆' }}</span>
            </div>
          </div>

          <div class="flex gap-4">
            <div>
              <h3 class="font-semibold mb-2">Status</h3>
              <select
                :value="selectedFeedback.status"
                @change="updateStatus(selectedFeedback.id, ($event.target as HTMLSelectElement).value)"
                class="px-4 py-2 border border-border rounded-lg bg-background"
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <h3 class="font-semibold mb-2">Priority</h3>
              <span :class="['px-3 py-2 rounded-lg text-sm font-medium', priorityColors[selectedFeedback.priority]]">
                {{ selectedFeedback.priority }}
              </span>
            </div>
          </div>

          <div v-if="selectedFeedback.resolution">
            <h3 class="font-semibold mb-2">Resolution</h3>
            <p class="text-sm">{{ selectedFeedback.resolution }}</p>
          </div>

          <div class="text-sm text-muted-foreground">
            Submitted: {{ new Date(selectedFeedback.created_at).toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
