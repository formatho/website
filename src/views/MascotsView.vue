<script setup lang="ts">
// MascotsView.vue - Formatho Character Universe
// Note: AOS is initialized globally in main.ts
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden border-b border-border/50"
    >
      <!-- Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      
      <!-- Decorative Elements -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-4 py-20 md:py-32 relative">
        <div class="max-w-4xl mx-auto">
          <!-- Glassmorphic Hero Card -->
          <div
            class="glass-card p-12 md:p-16 text-center"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <!-- Decorative Top Line -->
            <div class="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
            
            <!-- Title -->
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <span class="gradient-text">Meet the Formatho Team</span>
            </h1>
            
            <!-- Subtitle -->
            <p
              class="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="200"
            >
              Where workflows take form. Guided by Flowtho.
            </p>
            
            <!-- Decorative Bottom Line -->
            <div class="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8"></div>
            
            <!-- Coming Soon Badge -->
            <div
              class="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="300"
            >
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span class="text-sm font-medium text-muted-foreground">Character cards coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Placeholder Section for Character Cards -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-6xl mx-auto">
        <div
          class="text-center"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <h2 class="text-2xl md:text-3xl font-bold mb-4">The Formatho Character Universe</h2>
          <p class="text-muted-foreground max-w-xl mx-auto">
            Flowtho, Morpho, Memo, Nexo, and Halo are getting ready to meet you.
            Stay tuned for individual character cards and stories.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}

.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
