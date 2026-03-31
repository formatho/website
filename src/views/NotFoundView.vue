<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-vue-next'
import OrigamiMascot from '@/components/OrigamiMascot.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-lg w-full text-center">
      <!-- Mascot -->
      <div class="mb-8 flex justify-center" data-aos="fade-down" data-aos-duration="600">
        <OrigamiMascot
          character="morpho"
          size="w-16 h-16"
          contextId="404-error"
          message="I folded this wrong. This page doesn't exist."
        />
      </div>

      <!-- Error Code -->
      <h1
        class="text-8xl md:text-9xl font-bold text-muted-foreground/20 mb-4"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="100"
      >
        404
      </h1>

      <!-- Error Message -->
      <h2
        class="text-2xl md:text-3xl font-bold mb-4"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="200"
      >
        Page Not Found
      </h2>

      <p
        class="text-muted-foreground mb-8"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="300"
      >
        The page you're looking for doesn't exist or has been moved.
      </p>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="400"
      >
        <Button @click="goBack" variant="outline" class="gap-2">
          <ArrowLeft class="w-4 h-4" />
          Go Back
        </Button>
        <Button @click="goHome" class="gap-2">
          <Home class="w-4 h-4" />
          Back to Home
        </Button>
      </div>

      <!-- Helpful Links -->
      <div
        class="mt-12 pt-8 border-t border-border"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="500"
      >
        <p class="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
        <div class="flex flex-wrap justify-center gap-4 text-sm">
          <router-link to="/" class="text-primary hover:underline">
            All Tools
          </router-link>
          <router-link to="/about" class="text-primary hover:underline">
            About
          </router-link>
          <router-link to="/contact" class="text-primary hover:underline">
            Contact
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
