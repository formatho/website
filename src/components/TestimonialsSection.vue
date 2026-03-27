<script setup lang="ts">
import { ref } from 'vue'

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  company: string
  logo?: string
}

const testimonials = ref<Testimonial[]>([
  {
    id: 1,
    quote: "Formatho has become an essential part of my daily workflow. The privacy-first approach means I can process sensitive data without worrying about leaks. The JSON formatter alone has saved me hours.",
    author: "Alex Chen",
    role: "Senior Backend Engineer",
    company: "TechFlow"
  },
  {
    id: 2,
    quote: "Finally, a developer toolkit that respects user privacy. The Base64 encoder and UUID generator are lightning fast, and I love that everything runs client-side. No more worrying about data leaving my browser.",
    author: "Sarah Martinez",
    role: "Full Stack Developer",
    company: "DevStudio"
  },
  {
    id: 3,
    quote: "We switched our entire team to Formatho for daily formatting tasks. The interface is clean, the tools are reliable, and the zero-tracking policy aligns perfectly with our company's privacy standards.",
    author: "Michael Park",
    role: "Lead Developer",
    company: "CodeCraft"
  },
  {
    id: 4,
    quote: "The diff checker is a game-changer for code reviews. I use it daily to compare config files and API responses. The fact that it's completely free and privacy-focused makes it even better.",
    author: "Emily Watson",
    role: "DevOps Engineer",
    company: "CloudScale"
  }
])
</script>

<template>
  <section class="container mx-auto px-4 py-16 border-t border-border/50">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold mb-4" data-aos="fade-down">
          Loved by Developers Worldwide
        </h2>
        <p class="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-aos="fade-down" data-aos-delay="50">
          Join thousands of developers who trust Formatho for their daily productivity needs
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          class="bg-white border border-gray-100 rounded-lg p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <!-- Quote -->
          <div class="mb-6">
            <svg
              class="w-8 h-8 text-primary/20 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p class="text-foreground leading-relaxed text-base">
              "{{ testimonial.quote }}"
            </p>
          </div>

          <!-- Author Info -->
          <div class="flex items-start gap-4">
            <!-- Avatar Placeholder -->
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span class="text-lg font-semibold text-gray-900">
                {{ testimonial.author.split(' ').map(n => n[0]).join('') }}
              </span>
            </div>

            <!-- Author Details -->
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-foreground">{{ testimonial.author }}</h4>
              </div>
              <p class="text-sm text-muted-foreground">
                {{ testimonial.role }}
              </p>
              <div class="flex items-center gap-2 mt-2">
                <div class="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-muted-foreground">{{ testimonial.company }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats/Social Proof -->
      <div class="mt-12 pt-12 border-t border-border/50">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div data-aos="fade-up" data-aos-delay="0">
            <div class="text-3xl md:text-4xl font-bold text-foreground mb-2">15K+</div>
            <div class="text-sm text-muted-foreground">Monthly Active Users</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <div class="text-3xl md:text-4xl font-bold text-foreground mb-2">100+</div>
            <div class="text-sm text-muted-foreground">Developer Tools</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <div class="text-3xl md:text-4xl font-bold text-foreground mb-2">99.9%</div>
            <div class="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <div class="text-3xl md:text-4xl font-bold text-foreground mb-2">0</div>
            <div class="text-sm text-muted-foreground">Data Tracking</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
