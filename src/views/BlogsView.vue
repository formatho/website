<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-vue-next'
import { blogPosts } from '../data/blogPosts'

// Note: AOS is initialized globally in main.ts to prevent scroll freezing conflicts

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Header -->
    <div
      class="text-center mb-12"
      data-aos="fade-up"
      data-aos-duration="400"
    >
      <h1 class="text-4xl font-bold mb-4">Blog</h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Developer guides, tutorials, and insights from the Formatho team
      </p>
      <p class="text-sm text-muted-foreground mt-2">{{ blogPosts.length }} articles</p>
    </div>

    <!-- Blog Posts Grid -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(post, index) in blogPosts"
          :key="post.id"
          class="glass-card-scale overflow-hidden hover:border-primary/50 transition-all group flex flex-col"
          data-aos="fade-up"
          data-aos-duration="400"
          :data-aos-delay="(index % 3) * 50"
        >
          <!-- Image -->
          <div v-if="post.image" class="aspect-video overflow-hidden">
            <RouterLink :to="`/blogs/${post.slug}`" class="icon-wrapper w-full h-full">
              <img
                :src="post.image"
                :alt="post.imageAlt || post.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </RouterLink>
          </div>

          <!-- Content -->
          <div class="flex-1 p-6 flex flex-col">
            <!-- Meta -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
              <div class="flex items-center gap-1">
                <Calendar class="w-4 h-4" />
                {{ formatDate(post.date) }}
              </div>
              <div class="flex items-center gap-1">
                <Clock class="w-4 h-4" />
                {{ post.readTime }}
              </div>
            </div>

            <!-- Title -->
            <RouterLink :to="`/blogs/${post.slug}`">
              <h2 class="text-xl font-bold mb-2 group-hover:text-gray-900 transition-colors line-clamp-2">
                {{ post.title }}
              </h2>
            </RouterLink>

            <!-- Excerpt -->
            <p class="text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
              {{ post.excerpt }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                class="text-gray-900"
              >
                <Tag class="w-3 h-3" />
                {{ tag }}
              </span>
              <span v-if="post.tags.length > 3" class="text-xs text-muted-foreground">
                +{{ post.tags.length - 3 }}
              </span>
            </div>

            <!-- Read More Link -->
            <RouterLink
              :to="`/blogs/${post.slug}`"
              class="btn-primary inline-flex items-center gap-2 text-sm font-medium mt-auto"
            >
              Read More
              <ArrowRight class="w-4 h-4" />
            </RouterLink>
          </div>
        </article>
      </div>

      <!-- Empty State (if no posts) -->
      <div v-if="blogPosts.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">No blog posts yet. Check back soon!</p>
      </div>
    </div>

    <!-- Newsletter Signup -->
    <div class="max-w-2xl mx-auto mt-16">
      <div
        class="glass-card p-8 text-center"
        data-aos="fade-up"
        data-aos-duration="400"
      >
        <h3 class="text-2xl font-bold mb-2">Stay Updated</h3>
        <p class="text-muted-foreground mb-6">
          Get notified when we publish new articles and updates.
        </p>
        <div class="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            class="btn-primary px-6 py-2 rounded-lg font-medium"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
