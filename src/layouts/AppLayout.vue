<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import LiveSiteAnalytics from '@/components/LiveSiteAnalytics.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { computed } from 'vue'

const route = useRoute()

// Only show breadcrumb when not on home page
const showBreadcrumb = computed(() => route.path !== '/')
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Skip to Content Link - Accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
    >
      Skip to main content
    </a>
    
    <Navbar />
    <Breadcrumb v-if="showBreadcrumb" />
    <main id="main-content" class="flex-1">
      <RouterView />
    </main>
    <Footer />

    <!-- Live Analytics Widget -->
    <LiveSiteAnalytics />
  </div>
</template>
