<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMonthlyCounter } from '@/composables/useMonthlyCounter'

// ============================================
// PERSISTENT COUNTER - Uses CountAPI for persistence
// ============================================
// Monthly visitors counter is now persistent via API
const { monthlyVisitors, isLoading: _counterLoading } = useMonthlyCounter()

// ============================================
// LIVE USER SIMULATION (Client-side only, as requested)
// ============================================
const LIVE_USER_UPDATE_INTERVAL = 3000 // Update live users every 3 seconds
const liveUsers = ref(12)
let liveUserInterval: number | undefined

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US')
}

// Simulate live users (8-24, fluctuating every 3 seconds as per requirements)
const updateLiveUsers = () => {
  // Random fluctuation: +/- 1-3 users, staying within 8-24 range
  const change = Math.floor(Math.random() * 7) - 3 // -3 to +3
  liveUsers.value = Math.max(8, Math.min(24, liveUsers.value + change))
}

onMounted(() => {
  // Initialize live users (8-24 as per requirements)
  liveUsers.value = Math.floor(Math.random() * 17) + 8 // 8-24

  // Start live user simulation
  liveUserInterval = window.setInterval(updateLiveUsers, LIVE_USER_UPDATE_INTERVAL)
})

onUnmounted(() => {
  if (liveUserInterval) {
    clearInterval(liveUserInterval)
  }
})
</script>

<template>
  <div class="fixed bottom-5 right-5 z-[9999]">
    <!-- Glassmorphism card: original dark slate at 20% opacity, compact size -->
    <div
      class="bg-slate-900/20 backdrop-blur-md border-2 border-slate-400/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl px-3 py-1.5 min-w-[180px] transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-slate-400/40"
    >
      <!-- Live Users -->
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center gap-2">
          <!-- Pulsing green dot -->
          <span class="w-2 h-2 bg-green-600 rounded-full flex-shrink-0 animate-pulse"></span>
          <span class="text-[11px] text-white/70 font-bold uppercase tracking-wide">Live</span>
        </div>
        <span class="text-3xl font-bold text-white tabular-nums pl-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">{{ liveUsers }}</span>
      </div>

      <!-- Divider -->
      <div class="h-px bg-slate-400/30 my-2"></div>

      <!-- Monthly Users -->
      <div class="flex flex-col gap-1.5">
        <span class="text-[11px] text-white/70 font-bold uppercase tracking-wide">Monthly Users</span>
        <span class="text-3xl font-bold text-white tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">{{ formatNumber(monthlyVisitors) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Pulsing animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  div.fixed {
    bottom: 10px;
    right: 10px;
  }
}

/* Ensure it doesn't block important elements */
@media (max-width: 480px) {
  div.fixed {
    bottom: 70px;
  }
}
</style>
