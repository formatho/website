<script setup lang="ts">
// AgentLog.vue - Live Thinking Timeline Panel
// Displays the council handoff sequence in real-time

import { computed } from 'vue'
import { useAgentCouncil } from '@/store/useAgentCouncil'
import { mascotMetadata } from '@/assets/mascot-assets'

const { messageQueue, isRunning, currentPhase } = useAgentCouncil()

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
    complete: 'Complete'
  }
  return labels[currentPhase.value] || 'Unknown'
})
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
