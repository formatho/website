<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Calendar, Clock, ArrowLeft, Tag, ExternalLink } from 'lucide-vue-next'
import { blogPosts } from '../data/blogPosts'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const post = computed(() => blogPosts.find(p => p.slug === slug.value))

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
    <!-- Back Link -->
    <RouterLink
      to="/blogs"
      class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
    >
      <ArrowLeft class="w-4 h-4" />
      Back to all articles
    </RouterLink>

    <!-- Article Not Found -->
    <div v-if="!post" class="text-center py-16">
      <h1 class="text-4xl font-bold mb-4">Article Not Found</h1>
      <p class="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
      <RouterLink
        to="/blogs"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Browse all articles
      </RouterLink>
    </div>

    <!-- Article Content -->
    <article v-else class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <!-- Meta -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <div class="flex items-center gap-1">
            <Calendar class="w-4 h-4" />
            {{ formatDate(post.date) }}
          </div>
          <div class="flex items-center gap-1">
            <Clock class="w-4 h-4" />
            {{ post.readTime }} read
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-bold mb-4 leading-tight">{{ post.title }}</h1>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="inline-flex items-center gap-1 px-3 py-1 text-sm bg-primary/10 text-primary rounded-md"
          >
            <Tag class="w-3 h-3" />
            {{ tag }}
          </span>
        </div>
      </header>

      <!-- Article Body -->
      <div class="prose prose-lg max-w-none dark:prose-invert">
        <div v-html="post.content"></div>
      </div>

      <!-- CTA Section -->
      <div v-if="post.cta" class="mt-12 p-6 glass-card border-primary/30 bg-primary/5">
        <h3 class="text-xl font-bold mb-3">{{ post.cta.title }}</h3>
        <p class="text-muted-foreground mb-4">{{ post.cta.description }}</p>
        <RouterLink
          :to="post.cta.link"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          {{ post.cta.buttonText }}
          <ExternalLink class="w-4 h-4" />
        </RouterLink>
      </div>

      <!-- Related Tools -->
      <div v-if="post.relatedTools && post.relatedTools.length > 0" class="mt-12">
        <h3 class="text-2xl font-bold mb-6">Related Tools</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RouterLink
            v-for="tool in post.relatedTools"
            :key="tool.link"
            :to="tool.link"
            class="p-4 glass-card hover:border-primary/50 transition-all group"
          >
            <h4 class="font-semibold group-hover:text-primary transition-colors">{{ tool.name }}</h4>
            <p class="text-sm text-muted-foreground">{{ tool.description }}</p>
          </RouterLink>
        </div>
      </div>

      <!-- Share & Navigation -->
      <div class="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <RouterLink
          to="/blogs"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          Back to all articles
        </RouterLink>
      </div>
    </article>
  </div>
</template>

<style scoped>
.prose :deep(h2) {
  @apply text-2xl font-bold mt-8 mb-4;
}
.prose :deep(h3) {
  @apply text-xl font-semibold mt-6 mb-3;
}
.prose :deep(p) {
  @apply mb-4 leading-relaxed text-muted-foreground;
}
.prose :deep(ul), .prose :deep(ol) {
  @apply my-4 pl-6;
}
.prose :deep(li) {
  @apply mb-2 text-muted-foreground;
}
.prose :deep(code) {
  @apply px-1.5 py-0.5 bg-muted rounded text-sm font-mono;
}
.prose :deep(pre) {
  @apply p-4 bg-muted rounded-lg overflow-x-auto my-4;
}
.prose :deep(pre code) {
  @apply p-0 bg-transparent;
}
.prose :deep(blockquote) {
  @apply pl-4 border-l-4 border-primary italic my-4 text-muted-foreground;
}
.prose :deep(a) {
  @apply text-primary hover:underline;
}
.prose :deep(table) {
  @apply w-full border-collapse my-4;
}
.prose :deep(th), .prose :deep(td) {
  @apply border border-border p-2 text-left;
}
.prose :deep(th) {
  @apply bg-muted font-semibold;
}
</style>
