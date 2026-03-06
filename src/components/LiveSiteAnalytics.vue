<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ============================================
// DATA HOOK - Easy to replace with API call
// ============================================
const MONTHLY_VISITORS = 12847 // Replace with: await fetch('/api/analytics/monthly')

// State
const liveUsers = ref(1)
const monthlyVisitors = ref(MONTHLY_VISITORS)
let simulationInterval: number | undefined

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US')
}

// Simulate live users (1-50, fluctuating every 3 seconds)
const simulateLiveUsers = () => {
  // Random fluctuation: +/- 1-5 users, staying within 1-50 range
  const change = Math.floor(Math.random() * 11) - 5 // -5 to +5
  liveUsers.value = Math.max(1, Math.min(50, liveUsers.value + change))
}

onMounted(() => {
  // Start simulation - updates every 3 seconds
  liveUsers.value = Math.floor(Math.random() * 50) + 1
  simulationInterval = window.setInterval(simulateLiveUsers, 3000)
})

onUnmounted(() => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
  }
})
</script>

<template>
  <div class="live-analytics-widget">
    <div class="analytics-card">
      <!-- Live Users -->
      <div class="metric">
        <div class="metric-header">
          <span class="pulse-dot"></span>
          <span class="metric-label">Current Live Users</span>
        </div>
        <div class="metric-value">{{ liveUsers }}</div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Monthly Traffic -->
      <div class="metric">
        <div class="metric-header">
          <span class="metric-label">Total Visitors this Month</span>
        </div>
        <div class="metric-value">{{ formatNumber(monthlyVisitors) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-analytics-widget {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.analytics-card {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  min-width: 180px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 12px 0;
}

/* Pulsing green dot */
.pulse-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .live-analytics-widget {
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .analytics-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    min-width: auto;
  }

  .metric {
    flex: 1;
  }

  .divider {
    width: 1px;
    height: auto;
    margin: 0;
    align-self: stretch;
  }

  .metric-value {
    font-size: 20px;
  }

  .metric-label {
    font-size: 10px;
  }
}

/* Ensure it doesn't block important elements */
@media (max-width: 480px) {
  .live-analytics-widget {
    /* Move above bottom navigation if present */
    bottom: 70px;
  }
}
</style>
