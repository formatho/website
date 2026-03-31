<script setup lang="ts">
/**
 * TwinOverlay.vue
 * Global container for floating digital twin mascots
 * Mount this at the root level (App.vue) to enable global summoning
 * Features: Z-index management, collision detection, vertical stacking
 */
import { computed } from 'vue'
import { useTwins, type TwinSummon } from '@/composables/useTwins'
import OrigamiMascot from '@/components/OrigamiMascot.vue'

const { activeTwins, dismissTwin } = useTwins()

// Base z-index for twins (above Monaco editors which use z-index ~1000)
const BASE_Z_INDEX = 9999

// Calculate position with collision avoidance (vertical stacking)
const getPositionStyle = (position: TwinSummon['position'], index: number): Record<string, string> => {
  const style: Record<string, string> = {
    position: position.type,
    zIndex: String(BASE_Z_INDEX + index) // Increment z-index for stacking
  }
  
  // Base offset for collision avoidance
  const offsetMultiplier = index * 140 // 140px spacing between twins
  
  // X positioning
  if (position.x === 'left') {
    style.left = '1rem'
  } else if (position.x === 'right') {
    style.right = '1rem'
  } else if (position.x === 'center') {
    style.left = '50%'
    style.transform = 'translateX(-50%)'
  } else {
    style.left = `${position.x}px`
  }
  
  // Y positioning with collision offset
  if (position.y === 'top') {
    style.top = `calc(1rem + ${offsetMultiplier}px)`
  } else if (position.y === 'bottom') {
    style.bottom = `calc(1rem + ${offsetMultiplier}px)`
  } else if (position.y === 'center') {
    style.top = `calc(50% + ${offsetMultiplier}px)`
    style.transform = style.transform 
      ? `${style.transform} translateY(-50%)` 
      : 'translateY(-50%)'
  } else {
    style.top = `${(position.y as number) + offsetMultiplier}px`
  }
  
  return style
}

// Handle dismiss with permanent cooldown
const handleDismiss = (contextId: string) => {
  dismissTwin(contextId, true)
}
</script>

<template>
  <!-- Global Twin Overlay Container -->
  <Teleport to="body">
    <div class="twin-overlay pointer-events-none fixed inset-0 overflow-hidden z-[9999]">
      <TransitionGroup name="twin-list">
        <div
          v-for="(twin, index) in activeTwins"
          :key="twin.id"
          class="twin-container pointer-events-auto max-w-md"
          :style="getPositionStyle(twin.position, index)"
        >
          <OrigamiMascot
            :character="twin.character"
            :message="twin.message"
            :context-id="twin.contextId"
            size="w-12 h-12"
            @dismiss="handleDismiss(twin.contextId)"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.twin-list-enter-active {
  animation: twin-enter 0.4s ease-out;
}

.twin-list-leave-active {
  animation: twin-leave 0.3s ease-in;
}

.twin-list-move {
  transition: transform 0.3s ease;
}

@keyframes twin-enter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes twin-leave {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
}
</style>
