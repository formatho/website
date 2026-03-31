<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  PlusIcon, 
  FilterIcon, 
  SearchIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  CircleIcon,
  PlayIcon,
  Trash2Icon,
  EditIcon
} from 'lucide-vue-next'

interface Task {
  id: string
  title: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  agentId?: string
  agentName?: string
  dueDate?: string
  createdAt: string
  tags: string[]
}

const tasks = ref<Task[]>([
  { id: '1', title: 'Implement OAuth2 authentication flow', description: 'Add secure OAuth2 login support for enterprise customers', priority: 'critical', status: 'in-progress', agentId: '3', agentName: 'Backend Agent', dueDate: '2026-03-15', createdAt: '2026-03-08T10:00:00Z', tags: ['backend', 'security'] },
  { id: '2', title: 'Update API documentation', description: 'Refresh endpoint documentation with new v2 endpoints', priority: 'high', status: 'pending', agentId: '4', agentName: 'Documentation Agent', dueDate: '2026-03-12', createdAt: '2026-03-09T14:30:00Z', tags: ['documentation'] },
  { id: '3', title: 'Fix mobile navigation bug', description: 'Hamburger menu not closing on route change in Safari', priority: 'medium', status: 'blocked', agentId: '2', agentName: 'Frontend Agent', createdAt: '2026-03-10T08:00:00Z', tags: ['frontend', 'bug'] },
  { id: '4', title: 'Optimize image compression pipeline', description: 'Reduce processing time for large batch uploads', priority: 'low', status: 'pending', agentId: '5', agentName: 'Performance Agent', createdAt: '2026-03-07T16:45:00Z', tags: ['performance', 'optimization'] },
  { id: '5', title: 'Add dark mode toggle', description: 'Implement system preference detection and manual override', priority: 'high', status: 'in-progress', agentId: '2', agentName: 'Frontend Agent', dueDate: '2026-03-14', createdAt: '2026-03-09T09:15:00Z', tags: ['frontend', 'ui'] },
  { id: '6', title: 'Setup CI/CD pipeline for mobile app', description: 'Automate build and deployment for iOS and Android', priority: 'critical', status: 'pending', agentId: '6', agentName: 'DevOps Agent', dueDate: '2026-03-18', createdAt: '2026-03-10T06:00:00Z', tags: ['devops', 'mobile'] },
])

const searchQuery = ref('')
const priorityFilter = ref<string>('all')
const statusFilter = ref<string>('all')
const sortBy = ref<'createdAt' | 'dueDate' | 'priority'>('priority')
const sortOrder = ref<'asc' | 'desc'>('desc')
const showFilters = ref(false)

// Filtered and sorted tasks
const filteredTasks = computed(() => {
  let result = [...tasks.value]
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // Priority filter
  if (priorityFilter.value !== 'all') {
    result = result.filter(task => task.priority === priorityFilter.value)
  }
  
  // Status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(task => task.status === statusFilter.value)
  }
  
  // Sort
  result.sort((a, b) => {
    let comparison = 0
    
    switch(sortBy.value) {
      case 'priority':
        const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
        break
      case 'dueDate':
        if (a.dueDate && b.dueDate) {
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        } else if (a.dueDate) {
          comparison = -1
        } else if (b.dueDate) {
          comparison = 1
        }
        break
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
    }
    
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
  
  return result
})

// Stats
const totalTasks = computed(() => tasks.value.length)
const completedTasks = computed(() => tasks.value.filter(t => t.status === 'completed').length)
const pendingTasks = computed(() => tasks.value.filter(t => t.status === 'pending' || t.status === 'in-progress').length)
const criticalTasks = computed(() => tasks.value.filter(t => t.priority === 'critical' && t.status !== 'completed').length)

// Progress percentage
const progressPercentage = computed(() => {
  if (totalTasks.value === 0) return 0
  return Math.round((completedTasks.value / totalTasks.value) * 100)
})

const getPriorityColor = (priority: Task['priority']) => {
  switch(priority) {
    case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  }
}

const getStatusColor = (status: Task['status']) => {
  switch(status) {
    case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'blocked': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
}

const getStatusIcon = (status: Task['status']): string => {
  switch(status) {
    case 'pending': return 'circle'
    case 'in-progress': return 'play'
    case 'completed': return 'check-circle'
    case 'blocked': return 'alert-circle'
    default: return 'circle'
  }
}

const formatDueDate = (date?: string) => {
  if (!date) return null
  
  const dueDate = new Date(date)
  const today = new Date()
  
  if (dueDate < today) {
    return { text: 'Overdue', color: 'text-red-600 dark:text-red-400' }
  } else if (dueDate.getTime() === today.getTime()) {
    return { text: 'Today', color: 'text-orange-600 dark:text-orange-400' }
  } else if (dueDate.getTime() < today.getTime() + 7 * 24 * 60 * 60 * 1000) {
    return { text: 'Due in ' + Math.round((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)) + ' days', color: 'text-yellow-600 dark:text-yellow-400' }
  } else {
    return { text: dueDate.toLocaleDateString(), color: 'text-gray-600 dark:text-gray-400' }
  }
}

const toggleTaskStatus = (taskId: string) => {
  const task = tasks.value.find(t => t.id === taskId)
  if (!task) return
  
  const statusMap: Record<Task['status'], Task['status']> = {
    'pending': 'in-progress',
    'in-progress': 'completed',
    'completed': 'pending',
    'blocked': 'pending'
  }
  
  task.status = statusMap[task.status]
}

const deleteTask = (taskId: string) => {
  tasks.value = tasks.value.filter(t => t.id !== taskId)
}

const clearCompleted = () => {
  tasks.value = tasks.value.filter(t => t.status !== 'completed')
}

const resetFilters = () => {
  searchQuery.value = ''
  priorityFilter.value = 'all'
  statusFilter.value = 'all'
}

// Keyboard shortcuts
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key.toLowerCase()) {
      case 'f':
        e.preventDefault()
        showFilters.value = !showFilters.value
        break
      case '/':
        e.preventDefault()
        // Focus search input would go here
        break
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">TODO Queue</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Manage and track tasks across all agents</p>
      </div>
      
      <!-- Add Task Button -->
      <Button 
        @click="$router.push(`/agent-orchestrator/config`)"
        class="flex items-center gap-2"
      >
        <PlusIcon class="w-5 h-5" />
        Add Task
      </Button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Total Tasks -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ totalTasks }}</p>
      </div>

      <!-- Pending Tasks -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
        <p class="text-3xl font-bold text-blue-600 mt-2">{{ pendingTasks }}</p>
      </div>

      <!-- Completed Tasks -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
        <p class="text-3xl font-bold text-green-600 mt-2">{{ completedTasks }}</p>
      </div>

      <!-- Critical Tasks -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Critical</p>
        <p class="text-3xl font-bold text-red-600 mt-2">{{ criticalTasks }}</p>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
        <span class="text-sm font-bold text-blue-600">{{ progressPercentage }}%</span>
      </div>
      
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      
      <div class="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{{ completedTasks }} / {{ totalTasks }} tasks completed</span>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div class="flex items-center gap-4 flex-wrap">
        <!-- Search -->
        <div class="relative flex-1 min-w-[200px] max-w-md">
          <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search tasks..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Filter Toggle -->
        <button 
          @click="showFilters = !showFilters"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
            showFilters ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          ]"
        >
          <Icon name="filter" class="w-5 h-5" />
          Filters
          <template v-if="showFilters">
            <Icon name="chevron-down" class="w-4 h-4" />
          </template>
          <template v-else>
            <Icon name="chevron-up" class="w-4 h-4" />
          </template>
        </button>

        <!-- Sort Dropdown -->
        <select 
          v-model="sortBy"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="createdAt">Sort by Created</option>
        </select>

        <!-- Clear Completed -->
        <button 
          @click="clearCompleted"
          v-if="completedTasks > 0"
          class="px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
        >
          Clear Completed
        </button>

        <!-- Reset Filters -->
        <button 
          @click="resetFilters"
          v-if="searchQuery || priorityFilter !== 'all' || statusFilter !== 'all'"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 font-medium transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <!-- Expanded Filters -->
      <div v-if="showFilters" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Priority Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
          <select 
            v-model="priorityFilter"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
          <select 
            v-model="statusFilter"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <!-- Sort Order -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort Order</label>
          <button 
            @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-between"
          >
            {{ sortOrder === 'desc' ? 'Descending (High → Low)' : 'Ascending (Low → High)' }}
            <template v-if="sortOrder === 'desc'">
              <Icon name="chevron-down" class="w-4 h-4" />
            </template>
            <template v-else>
              <Icon name="chevron-up" class="w-4 h-4" />
            </template>
          </button>
        </div>
      </div>
    </div>

    <!-- Task List -->
    <div class="space-y-3">
      <div v-for="task in filteredTasks" :key="task.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <!-- Task Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-2">
              <button 
                @click="toggleTaskStatus(task.id)"
                class="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Icon :name="getStatusIcon(task.status)" class="w-4 h-4" />
              </button>
              
              <h3 :class="[
                'font-semibold text-gray-900 dark:text-white',
                task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : ''
              ]">{{ task.title }}</h3>
              
              <span :class="['px-2.5 py-0.5 rounded-full text-xs font-medium', getPriorityColor(task.priority)]">
                {{ task.priority }}
              </span>
            </div>
            
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ task.description }}</p>
            
            <!-- Meta Info -->
            <div class="flex items-center gap-4 flex-wrap">
              <!-- Agent Assignment -->
              <template v-if="task.agentName">
                <div class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <ActivityIcon class="w-4 h-4" />
                  {{ task.agentName }}
                </div>
              </template>

              <!-- Due Date -->
              <template v-if="task.dueDate">
                <div class="flex items-center gap-1.5 text-sm" :class="formatDueDate(task.dueDate)?.color">
                  <CalendarIcon class="w-4 h-4" />
                  {{ formatDueDate(task.dueDate)?.text }}
                </div>
              </template>

              <!-- Created At -->
              <div class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon class="w-4 h-4" />
                {{ new Date(task.createdAt).toLocaleDateString() }}
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span 
                  v-for="tag in task.tags" 
                  :key="tag"
                  class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium capitalize"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 ml-4">
            <button 
              @click="$router.push(`/agent-orchestrator/${task.agentId}`)"
              v-if="task.agentId"
              class="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="View Agent"
            >
              <EditIcon class="w-4 h-4" />
            </button>
            
            <button 
              @click="deleteTask(task.id)"
              class="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Delete Task"
            >
              <Trash2Icon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredTasks.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
        <FilterIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search query</p>
        
        <button 
          @click="resetFilters"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>

    <!-- Keyboard Shortcuts Help -->
    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Keyboard shortcuts:</strong></p>
      <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
        <span><kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">Ctrl</kbd> + <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">F</kbd> Toggle filters</span>
        <span><kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">/</kbd> Search tasks</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
