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
    <Navbar />
    <Breadcrumb v-if="showBreadcrumb" />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />

    <!-- Live Analytics Widget -->
    <LiveSiteAnalytics />
  </div>
</template>
