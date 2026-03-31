<script setup lang="ts">
// AgentLog.vue - Live Thinking Timeline Panel
// Displays the council handoff sequence in real-time

import { computed, ref } from 'vue'
import { useAgentCouncil } from '@/store/useAgentCouncil'
import { mascotMetadata } from '@/assets/mascot-assets'

const { 
  messageQueue, 
  isRunning, 
  currentPhase, 
  generatedTaskData, 
  canGenerateTask,
  taskGenerated,
  markTaskGenerated 
} = useAgentCouncil()

// Task creation state
const isCreatingTask = ref(false)
const taskCreationError = ref<string | null>(null)
const createdTaskId = ref<string | null>(null)

// API configuration
const TODO_API_KEY = import.meta.env.VITE_TODO_API_KEY || 'sk_agent_6fd8d60a-c09f-4130-9d08-37da8eefbbd8'
const TODO_PROJECT_ID = import.meta.env.VITE_TODO_PROJECT_ID || '824fd09b-a52a-4e94-95db-462483ce74fe'

// Color mapping for agents
const agentColors: Record<string, string> = {
  flowtho: 'border-cyan-500 bg-cyan-500/10',
  morpho: 'border-orange-500 bg-orange-500/10',
  memo: 'border-amber-500 bg-amber-500/10',
  nexo: 'border-emerald-500 bg-emerald-500/10',
  halo: 'border-rose-500 bg-rose-500/10'
}

const agentTextColors: Record<string, string> = {
  flowtho: 'text-cyan-400',
  morpho: 'text-orange-400',
  memo: 'text-amber-400',
  nexo: 'text-emerald-400',
  halo: 'text-rose-400'
}

// Format timestamp
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

// Phase label
const phaseLabel = computed(() => {
  const labels: Record<string, string> = {
    idle: 'Council Idle',
    planning: 'Planning Phase',
    building: 'Building Phase',
    connecting: 'Connecting Phase',
    remembering: 'Memory Phase',
    guiding: 'Onboarding Phase',
    complete: 'Complete',
    generate_task: 'Task Generated'
  }
  return labels[currentPhase.value] || 'Unknown'
})

// Create official ticket
const createOfficialTicket = async () => {
  if (!generatedTaskData.value || isCreatingTask.value) return
  
  isCreatingTask.value = true
  taskCreationError.value = null
  
  try {
    const response = await fetch('https://todo.formatho.com/api/agent/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': TODO_API_KEY
      },
      body: JSON.stringify({
        title: generatedTaskData.value.title,
        description: generatedTaskData.value.description,
        priority: generatedTaskData.value.priority,
        project_id: TODO_PROJECT_ID,
        metadata: {
          source: 'council_simulation',
          session_id: generatedTaskData.value.sessionId,
          source_agent: generatedTaskData.value.sourceAgent
        }
      })
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }
    
    const result = await response.json()
    createdTaskId.value = result.id || result.task_id || 'created'
    markTaskGenerated()
    
    console.log('[AgentLog] Task created successfully:', createdTaskId.value)
  } catch (error) {
    taskCreationError.value = error instanceof Error ? error.message : 'Failed to create task'
    console.error('[AgentLog] Task creation failed:', error)
  } finally {
    isCreatingTask.value = false
  }
}
</script>

<template>
  <div class="agent-log glass-card p-4 w-full max-w-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
      <div class="flex items-center gap-2">
        <div 
          class="w-2 h-2 rounded-full"
          :class="isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"
        />
        <span class="text-sm font-medium">Agent Council Log</span>
      </div>
      <span class="text-xs text-muted-foreground">{{ phaseLabel }}</span>
    </div>

    <!-- Message List -->
    <div class="space-y-3 max-h-96 overflow-y-auto">
      <TransitionGroup name="log-entry">
        <div
          v-for="message in messageQueue"
          :key="message.id"
          class="log-entry p-3 rounded-lg border-l-4 transition-all"
          :class="agentColors[message.agent]"
        >
          <!-- Agent Name & Time -->
          <div class="flex items-center justify-between mb-1">
            <span 
              class="text-sm font-semibold capitalize"
              :class="agentTextColors[message.agent]"
            >
              {{ message.agent }}
            </span>
            <span class="text-xs text-muted-foreground">
              {{ formatTime(message.timestamp) }}
            </span>
          </div>
          
          <!-- Action Text -->
          <p class="text-sm text-slate-300">{{ message.action }}</p>
          
          <!-- Duration Badge -->
          <div class="mt-2 flex items-center gap-1">
            <span class="text-xs text-muted-foreground">
              {{ message.duration }}ms
            </span>
            <div class="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-300"
                :class="agentTextColors[message.agent].replace('text-', 'bg-')"
                style="width: 100%"
              />
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div 
        v-if="messageQueue.length === 0" 
        class="text-center py-8 text-muted-foreground"
      >
        <p class="text-sm">Click "Start Council" to begin</p>
        <p class="text-xs mt-1">Watch agents collaborate in real-time</p>
      </div>
    </div>

    <!-- Status Bar -->
    <div 
      v-if="isRunning" 
      class="mt-4 pt-3 border-t border-border/50 flex items-center gap-2"
    >
      <div class="flex gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce" style="animation-delay: 0ms" />
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce" style="animation-delay: 150ms" />
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce" style="animation-delay: 300ms" />
      </div>
      <span class="text-xs text-green-400">Council Active</span>
    </div>

    <!-- Create Official Ticket Button -->
    <div 
      v-if="canGenerateTask" 
      class="mt-4 pt-3 border-t border-border/50"
    >
      <div class="text-center">
        <p class="text-xs text-muted-foreground mb-2">
          Council simulation complete. Ready to create task?
        </p>
        <button
          @click="createOfficialTicket"
          :disabled="isCreatingTask"
          class="w-full py-2 px-4 rounded-lg font-medium text-sm transition-all
                 bg-gradient-to-r from-cyan-500 to-emerald-500 
                 hover:from-cyan-400 hover:to-emerald-400
                 disabled:opacity-50 disabled:cursor-not-allowed
                 text-white shadow-lg shadow-cyan-500/20"
        >
          <span v-if="isCreatingTask" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating...
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Official Ticket
          </span>
        </button>
        <p v-if="taskCreationError" class="mt-2 text-xs text-red-400">
          {{ taskCreationError }}
        </p>
      </div>
    </div>

    <!-- Task Created Confirmation -->
    <div 
      v-if="taskGenerated && createdTaskId" 
      class="mt-4 pt-3 border-t border-border/50"
    >
      <div class="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
        <svg class="h-8 w-8 mx-auto mb-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm font-medium text-emerald-400">Task Created!</p>
        <p class="text-xs text-muted-foreground mt-1">
          View on <a href="https://todo.formatho.com" target="_blank" class="text-emerald-400 hover:underline">todo.formatho.com</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.log-entry-enter-active {
  animation: slide-in 0.3s ease-out;
}

.log-entry-leave-active {
  animation: slide-out 0.2s ease-in;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(20px);
  }
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.3);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.5);
}
</style>
