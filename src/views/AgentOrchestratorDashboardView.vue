<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { HeartbeatIcon, CpuIcon, ActivityIcon, ClockIcon, PlayCircleIcon, PauseCircleIcon, StopIcon, TerminalIcon, LayoutDashboard } from 'lucide-vue-next'
import TeamInvitationModal from '@/components/TeamInvitationModal.vue'

interface Agent {
  id: string
  name: string
  status: 'running' | 'stopped' | 'error' | 'idle'
  type: string
  lastActive: string
  tasksCompleted: number
  cpuUsage: number
  memoryUsage: number
}

interface ActivityItem {
  id: string
  timestamp: string
  agentId: string
  agentName: string
  action: string
  details: string
}

const router = useRouter()
const agents = ref<Agent[]>([])
const activities = ref<ActivityItem[]>([])
const socket = ref<WebSocket | null>(null)
const isConnected = ref(false)

// Team collaboration features (Pro)
const isTeamModalOpen = ref(false)
const organizationId = ref('org-123') // In production, this would come from auth/user context

// Stats
const totalAgents = ref(0)
const runningAgents = ref(0)
const totalTasksCompleted = ref(0)
const avgCpuUsage = ref(0)
const avgMemoryUsage = ref(0)

// Analytics navigation handler
const navigateToAnalytics = () => {
  router.push('/agent-orchestrator/analytics')
}

const connectWebSocket = () => {
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  socket.value = new WebSocket(`${wsProtocol}//localhost:8080/ws`)
  
  socket.value.onopen = () => {
    isConnected.value = true
    console.log('WebSocket connected')
  }
  
  socket.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    handleWebSocketMessage(data)
  }
  
  socket.value.onerror = (error) => {
    console.error('WebSocket error:', error)
    isConnected.value = false
  }
  
  socket.value.onclose = () => {
    isConnected.value = false
    // Reconnect after 3 seconds
    setTimeout(connectWebSocket, 3000)
  }
}

const handleWebSocketMessage = (data: any) => {
  switch(data.type) {
    case 'agents_updated':
      agents.value = data.payload
      updateStats()
      break
    case 'activity_updated':
      activities.value = [data.payload, ...activities.value].slice(0, 50)
      break
    case 'status_changed':
      const agentIndex = agents.value.findIndex(a => a.id === data.agentId)
      if (agentIndex !== -1) {
        agents.value[agentIndex].status = data.status as Agent['status']
        updateStats()
      }
      break
  }
}

const updateStats = () => {
  totalAgents.value = agents.value.length
  runningAgents.value = agents.value.filter(a => a.status === 'running').length
  totalTasksCompleted.value = agents.value.reduce((sum, a) => sum + a.tasksCompleted, 0)
  
  if (agents.value.length > 0) {
    avgCpuUsage.value = Math.round(agents.value.reduce((sum, a) => sum + a.cpuUsage, 0) / agents.value.length)
    avgMemoryUsage.value = Math.round(agents.value.reduce((sum, a) => sum + a.memoryUsage, 0) / agents.value.length)
  }
}

const getStatusColor = (status: Agent['status']) => {
  switch(status) {
    case 'running': return 'bg-green-500'
    case 'stopped': return 'bg-gray-500'
    case 'error': return 'bg-red-500'
    case 'idle': return 'bg-yellow-500'
    default: return 'bg-gray-500'
  }
}

const getStatusBadgeColor = (status: Agent['status']) => {
  switch(status) {
    case 'running': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'stopped': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'idle': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}

const getAgentStatusIcon = (status: Agent['status']): string => {
  switch(status) {
    case 'running': return 'play-circle'
    case 'stopped': return 'stop'
    case 'error': return 'stop'
    case 'idle': return 'pause-circle'
    default: return 'circle'
  }
}

const navigateToAgentDetail = (agentId: string) => {
  router.push(`/agent-orchestrator/${agentId}`)
}

// Team collaboration handler (Pro Feature)
const handleMemberAdded = (member: any) => {
  console.log('New team member added:', member)
  // In production, this would trigger a notification or refresh the team list
}

// Simulate data for demo purposes if no WebSocket connection
const simulateData = () => {
  agents.value = [
    { id: '1', name: 'Content Writer Agent', status: 'running', type: 'content', lastActive: new Date().toISOString(), tasksCompleted: 42, cpuUsage: 35, memoryUsage: 128 },
    { id: '2', name: 'Data Analyst Agent', status: 'idle', type: 'analysis', lastActive: new Date(Date.now() - 60000).toISOString(), tasksCompleted: 18, cpuUsage: 5, memoryUsage: 96 },
    { id: '3', name: 'Code Reviewer Agent', status: 'running', type: 'development', lastActive: new Date().toISOString(), tasksCompleted: 73, cpuUsage: 42, memoryUsage: 156 },
    { id: '4', name: 'Research Bot', status: 'error', type: 'research', lastActive: new Date(Date.now() - 300000).toISOString(), tasksCompleted: 5, cpuUsage: 0, memoryUsage: 0 },
    { id: '5', name: 'Translation Agent', status: 'stopped', type: 'translation', lastActive: new Date(Date.now() - 86400000).toISOString(), tasksCompleted: 127, cpuUsage: 0, memoryUsage: 0 },
  ]
  
  activities.value = [
    { id: '1', timestamp: new Date().toISOString(), agentId: '3', agentName: 'Code Reviewer Agent', action: 'task_completed', details: 'Reviewed PR #245' },
    { id: '2', timestamp: new Date(Date.now() - 120000).toISOString(), agentId: '1', agentName: 'Content Writer Agent', action: 'task_started', details: 'Started writing blog post about AI agents' },
    { id: '3', timestamp: new Date(Date.now() - 300000).toISOString(), agentId: '4', agentName: 'Research Bot', action: 'error', details: 'API rate limit exceeded' },
    { id: '4', timestamp: new Date(Date.now() - 600000).toISOString(), agentId: '2', agentName: 'Data Analyst Agent', action: 'task_completed', details: 'Analyzed sales data for Q1' },
  ]
  
  updateStats()
}

onMounted(() => {
  connectWebSocket()
  // Timeout to simulate data if WebSocket fails
  setTimeout(() => {
    if (!isConnected.value) {
      simulateData()
    }
  }, 2000)
})

onUnmounted(() => {
  if (socket.value) {
    socket.value.close()
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Agent Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage your AI agents in real-time</p>
      </div>
      
      <!-- Connection Status & Actions -->
      <div class="flex items-center gap-3">
        <!-- Analytics Dashboard Button -->
        <button 
          @click="navigateToAnalytics"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2"
        >
          <LayoutDashboard class="w-4 h-4" />
          Analytics
        </button>
        
        <!-- Connection Status -->
        <div class="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
          <span 
            :class="[
              'w-2.5 h-2.5 rounded-full', 
              isConnected ? 'bg-green-500' : 'bg-red-500'
            ]"
          ></span>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            {{ isConnected ? 'Connected' : 'Disconnected' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Agents -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Agents</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ totalAgents }}</p>
          </div>
          <Icon name="heart" class="w-8 h-8 text-blue-600" />
        </div>
      </div>

      <!-- Running Agents -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Running</p>
            <p class="text-3xl font-bold text-green-600 mt-2">{{ runningAgents }}/{{ totalAgents }}</p>
          </div>
          <Icon name="play-circle" class="w-8 h-8 text-green-600" />
        </div>
      </div>

      <!-- Tasks Completed -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Tasks Completed</p>
            <p class="text-3xl font-bold text-purple-600 mt-2">{{ totalTasksCompleted }}</p>
          </div>
          <Icon name="terminal" class="w-8 h-8 text-purple-600" />
        </div>
      </div>

      <!-- Resource Usage -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Avg CPU Usage</p>
            <p class="text-3xl font-bold text-orange-600 mt-2">{{ avgCpuUsage }}%</p>
          </div>
          <Icon name="cpu" class="w-8 h-8 text-orange-600" />
        </div>
      </div>
    </div>

    <!-- Agents Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Active Agents</h2>
        <div class="flex gap-2">
          <button 
            @click="isTeamModalOpen = true"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2"
          >
            👥 Team Collaboration (Pro)
          </button>
          <button 
            @click="simulateData"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CPU/Mem</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tasks</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr 
              v-for="agent in agents" 
              :key="agent.id"
              @click="navigateToAgentDetail(agent.id)"
              class="hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div :class="[getStatusColor(agent.status), 'w-2 h-2 rounded-full mr-3']"></div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ agent.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusBadgeColor(agent.status)]">
                  {{ agent.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-white capitalize">{{ agent.type }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500 dark:text-gray-400">CPU: {{ agent.cpuUsage }}%</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">Mem: {{ agent.memoryUsage }}MB</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">{{ agent.tasksCompleted }}</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ formatTime(agent.lastActive) }}
              </td>
              <td class="px-6 py-4 text-right text-sm font-medium">
                <button @click.stop="navigateToAgentDetail(agent.id)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="agents.length === 0" class="px-6 py-12 text-center">
        <Icon name="heart" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 dark:text-gray-400">No agents found. Start an agent to get started.</p>
      </div>
    </div>

    <!-- Activity Feed -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Activity Feed</h2>
        <Icon name="clock" class="w-5 h-5 text-gray-400" />
      </div>
      
      <div class="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        <div 
          v-for="activity in activities" 
          :key="activity.id"
          class="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          <div class="flex items-start gap-3">
            <Icon name="activity" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.agentName }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{{ activity.action.replace('_', ' ') }}: {{ activity.details }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {{ new Date(activity.timestamp).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="activities.length === 0" class="px-6 py-12 text-center">
        <Icon name="activity" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 dark:text-gray-400">No activity recorded yet.</p>
      </div>
    </div>

    <!-- Team Collaboration Modal (Pro Feature) -->
    <TeamInvitationModal 
      v-model:is-open="isTeamModalOpen"
      :organization-id="organizationId"
      @member-added="handleMemberAdded"
    />
  </div>
</template>

<style scoped>
/* Custom scrollbar for better UX */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
  background: #1e293b;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #475569;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
