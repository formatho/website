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
  <div class="analytics-widget">
    <div class="analytics-card">
      <!-- Live Users -->
      <div class="metric">
        <div class="metric-header">
          <span class="pulse-dot"></span>
          <span class="metric-label">Live User Count</span>
        </div>
        <div class="metric-value">
          <span class="number">{{ liveUsers }}</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Monthly Traffic Counter -->
      <div class="metric">
        <div class="metric-header">
          <span class="metric-label">Total Users this month</span>
        </div>
        <div class="metric-value">
          <span class="number">{{ formatNumber(monthlyVisitors) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analytics-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.analytics-card {
  /* Liquid Glass Effect */
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2px solid rgba(156, 163, 175, 0.4); /* Grey border */
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  transition: all 0.3s ease;
}

.analytics-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(156, 163, 175, 0.6); /* Brighter grey on hover */
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700; /* Bold */
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff; /* Sharp white color */
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.number {
  font-variant-numeric: tabular-nums;
  transition: all 0.3s ease;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow for better readability */
}

.divider {
  height: 1px;
  background: rgba(156, 163, 175, 0.3); /* Grey divider */
  margin: 12px 0;
}

/* Pulsing indicator dot */
.pulse-dot {
  width: 8px;
  height: 8px;
  background: hsl(142 76% 36%);
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

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

/* Mobile responsiveness */
@media (max-width: 640px) {
  .analytics-widget {
    bottom: 10px;
    right: 10px;
  }

  .analytics-card {
    padding: 12px 16px;
    min-width: 180px;
  }

  .metric-value {
    font-size: 22px;
  }

  .metric-label {
    font-size: 10px;
  }
}

/* Ensure it doesn't block important elements */
@media (max-width: 480px) {
  .analytics-widget {
    /* Move above bottom navigation if present */
    bottom: 70px;
  }
}

/* Dark mode adjustment */
@media (prefers-color-scheme: dark) {
  .analytics-card {
    background: rgba(0, 0, 0, 0.5);
    border-color: rgba(156, 163, 175, 0.5); /* Grey border for dark mode */
  }
}
</style>
