<script setup lang="ts">
/**
 * TwinOverlay.vue
 * Global container for floating digital twin mascots
 * Mount this at the root level (App.vue) to enable global summoning
 */
import { computed } from 'vue'
import { useTwins, type TwinSummon } from '@/composables/useTwins'
import OrigamiMascot from '@/components/OrigamiMascot.vue'

const { activeTwins, dismissTwin } = useTwins()

// Position calculation for each twin
const getPositionStyle = (position: TwinSummon['position']): Record<string, string> => {
  const style: Record<string, string> = {
    position: position.type,
    zIndex: '9999'
  }
  
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
  
  // Y positioning
  if (position.y === 'top') {
    style.top = '1rem'
  } else if (position.y === 'bottom') {
    style.bottom = '1rem'
  } else if (position.y === 'center') {
    style.top = '50%'
    style.transform = style.transform 
      ? `${style.transform} translateY(-50%)` 
      : 'translateY(-50%)'
  } else {
    style.top = `${position.y}px`
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
    <div class="twin-overlay">
      <div
        v-for="twin in activeTwins"
        :key="twin.id"
        class="twin-container"
        :style="getPositionStyle(twin.position)"
        data-aos="fade-up"
        data-aos-duration="400"
      >
        <OrigamiMascot
          :character="twin.character"
          :message="twin.message"
          :context-id="twin.contextId"
          size="w-12 h-12"
          @dismiss="handleDismiss(twin.contextId)"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.twin-overlay {
  pointer-events: none;
  position: fixed;
  inset: 0;
  overflow: hidden;
}

.twin-container {
  pointer-events: auto;
  max-width: 400px;
  animation: twin-enter 0.4s ease-out;
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
</style>
