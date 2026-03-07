<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-vue-next'
import { blogPosts } from '../data/blogPosts'

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
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Blog</h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Developer guides, tutorials, and insights from the Formatho team
      </p>
      <p class="text-sm text-muted-foreground mt-2">
        {{ blogPosts.length }} articles
      </p>
    </div>

    <!-- Blog Posts Grid -->
    <div class="max-w-5xl mx-auto">
      <div class="grid gap-8">
        <article
          v-for="post in blogPosts"
          :key="post.id"
          class="glass-card p-6 hover:border-primary/50 transition-all group"
        >
          <div class="flex flex-col md:flex-row md:items-start gap-4">
            <!-- Content -->
            <div class="flex-1">
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
              <h2 class="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {{ post.title }}
              </h2>

              <!-- Excerpt -->
              <p class="text-muted-foreground mb-4 leading-relaxed">
                {{ post.excerpt }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                >
                  <Tag class="w-3 h-3" />
                  {{ tag }}
                </span>
              </div>

              <!-- Read More Link -->
              <RouterLink
                :to="`/blogs/${post.slug}`"
                class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Read More
                <ArrowRight class="w-4 h-4" />
              </RouterLink>
            </div>
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
      <div class="glass-card p-8 text-center">
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
            class="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
