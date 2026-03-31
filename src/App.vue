<script setup>
// Main application container - uses Vue Router for navigation
import TwinOverlay from '@/components/TwinOverlay.vue'
import ExitIntentPopup from '@/components/ExitIntentPopup.vue'
</script>

<template>
  <div id="app">
    <router-view />
    <!-- Global Twin Overlay - enables summoning from any component -->
    <TwinOverlay />
    <!-- Global Exit Intent Popup - shows on mouse leave -->
    <ExitIntentPopup />
  </div>
</template>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #2c3e50;
}

#app {
  min-height: 100vh;
}

/* Utility Classes */
.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-view,
  .agent-detail-view {
    padding: 1rem;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
