<script setup lang="ts">
// AgentLog.vue - Live Thinking Timeline Panel
// Displays the council handoff sequence in real-time
// Version: 2.0.0 - Dark Theme Optimized for Sidebar

import { computed, ref } from 'vue'
import { useAgentCouncil } from '@/store/useAgentCouncil'

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

// Color mapping for agents (dark theme)
const agentColors: Record<string, string> = {
  flowtho: 'border-cyan-500/50 bg-cyan-500/5',
  morpho: 'border-orange-500/50 bg-orange-500/5',
  memo: 'border-amber-500/50 bg-amber-500/5',
  nexo: 'border-emerald-500/50 bg-emerald-500/5',
  halo: 'border-rose-500/50 bg-rose-500/5'
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
  <div class="agent-log">
    <!-- Message List -->
    <div class="message-list">
      <TransitionGroup name="log-entry">
        <div
          v-for="message in messageQueue"
          :key="message.id"
          class="log-entry border-l-2"
          :class="agentColors[message.agent]"
        >
          <!-- Agent Name & Time -->
          <div class="entry-header">
            <span 
              class="agent-name capitalize"
              :class="agentTextColors[message.agent]"
            >
              {{ message.agent }}
            </span>
            <span class="entry-time">
              {{ formatTime(message.timestamp) }}
            </span>
          </div>
          
          <!-- Action Text -->
          <p class="entry-action">{{ message.action }}</p>
          
          <!-- Duration Bar -->
          <div class="duration-bar">
            <div 
              class="duration-fill"
              :class="agentTextColors[message.agent].replace('text-', 'bg-')"
            ></div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div 
        v-if="messageQueue.length === 0" 
        class="empty-state"
      >
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="empty-text">No activity yet</p>
        <p class="empty-hint">Enter a prompt to start the council</p>
      </div>
    </div>

    <!-- Running Indicator -->
    <div 
      v-if="isRunning" 
      class="running-indicator"
    >
      <div class="running-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <span class="running-text">Council Active</span>
    </div>

    <!-- Create Official Ticket Button -->
    <div 
      v-if="canGenerateTask" 
      class="task-creation"
    >
      <p class="task-hint">
        Council simulation complete. Create task?
      </p>
      <button
        @click="createOfficialTicket"
        :disabled="isCreatingTask"
        class="create-task-btn"
      >
        <span v-if="isCreatingTask" class="btn-loading">
          <svg class="spinner" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Creating...
        </span>
        <span v-else class="btn-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create Ticket
        </span>
      </button>
      <p v-if="taskCreationError" class="task-error">
        {{ taskCreationError }}
      </p>
    </div>

    <!-- Task Created Confirmation -->
    <div 
      v-if="taskGenerated && createdTaskId" 
      class="task-success"
    >
      <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="success-text">Task Created!</p>
      <a href="https://todo.formatho.com" target="_blank" class="success-link">
        View on todo.formatho.com →
      </a>
    </div>
  </div>
</template>

<style scoped>
.agent-log {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Message List */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

/* Log Entry */
.log-entry {
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.entry-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.agent-name {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.entry-time {
  font-size: 0.5625rem;
  color: #475569;
  font-variant-numeric: tabular-nums;
}

.entry-action {
  font-size: 0.6875rem;
  color: #94a3b8;
  line-height: 1.4;
  margin-bottom: 0.375rem;
}

.duration-bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1px;
  overflow: hidden;
}

.duration-fill {
  height: 100%;
  border-radius: 1px;
  width: 100%;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 1.5rem 0.5rem;
}

.empty-icon {
  width: 32px;
  height: 32px;
  margin: 0 auto 0.5rem;
  color: #374151;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-text {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.empty-hint {
  font-size: 0.625rem;
  color: #475569;
}

/* Running Indicator */
.running-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.running-dots {
  display: flex;
  gap: 3px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #22c55e;
  animation: dot-pulse 1.4s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-pulse {
  0%, 80%, 100% { opacity: 0.4; }
  40% { opacity: 1; }
}

.running-text {
  font-size: 0.6875rem;
  color: #22c55e;
  font-weight: 500;
}

/* Task Creation */
.task-creation {
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.task-hint {
  font-size: 0.625rem;
  color: #64748b;
  text-align: center;
  margin-bottom: 0.5rem;
}

.create-task-btn {
  width: 100%;
  padding: 0.625rem 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}

.create-task-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.create-task-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-content,
.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
}

.btn-content svg {
  width: 14px;
  height: 14px;
}

.spinner {
  width: 14px;
  height: 14px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.task-error {
  font-size: 0.625rem;
  color: #f87171;
  text-align: center;
  margin-top: 0.375rem;
}

/* Task Success */
.task-success {
  padding: 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 8px;
  text-align: center;
}

.success-icon {
  width: 28px;
  height: 28px;
  color: #22c55e;
  margin: 0 auto 0.375rem;
}

.success-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: #22c55e;
  margin-bottom: 0.25rem;
}

.success-link {
  font-size: 0.625rem;
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s ease;
}

.success-link:hover {
  color: #22c55e;
}

/* Transitions */
.log-entry-enter-active {
  animation: slide-in 0.3s ease-out;
}

.log-entry-leave-active {
  animation: slide-out 0.2s ease-in;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-10px);
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
    transform: translateX(10px);
  }
}

/* Custom scrollbar */
.message-list::-webkit-scrollbar {
  width: 3px;
}

.message-list::-webkit-scrollbar-track {
  background: transparent;
}

.message-list::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.3);
  border-radius: 2px;
}

.message-list::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.5);
}
</style>
