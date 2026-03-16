<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Calendar, Clock, ArrowLeft, Tag, ExternalLink } from 'lucide-vue-next'
import { blogPosts } from '../data/blogPosts'

// Note: AOS is initialized globally in main.ts to avoid conflicts and prevent scroll freezing

// Define props - slug can come from route params or from props (for static routes)
const props = defineProps<{
  slug?: string
}>()

const route = useRoute()

// Get slug from multiple sources (in order of priority):
//1. Props (for static routes with explicit props)
//2. Route params (for dynamic routes with :slug)
//3. Route name (for static routes named 'blog-post-{slug}')
//4. URL path parsing (fallback for SSR)
const slug = computed(() => {
  //1. Check route meta.slug (set by static routes)
  if (route.meta?.slug) return route.meta.slug as string

  // 2. Props (for static routes with explicit props)
  if (props.slug) return props.slug

  // 3. Route params (for dynamic routes with :slug)
  if (route.params.slug) return route.params.slug as string

  // 4. Extract slug from route name (e.g., 'blog-post-uuid-v1-vs-v4' -> 'uuid-v1-vs-v4')
  if (route.name && typeof route.name === 'string' && route.name.startsWith('blog-post-')) {
    return route.name.replace('blog-post-', '')
  }

  // 5. Fallback: parse from URL path (e.g., '/blogs/uuid-v1-vs-v4' -> 'uuid-v1-vs-v4')
  if (route.path) {
    const pathParts = route.path.split('/').filter(Boolean)
    // For path like /blogs/uuid-v1-vs-v4, pathParts = ['blogs', 'uuid-v1-vs-v4']
    if (pathParts.length >= 2 && pathParts[0] === 'blogs') {
      return pathParts.slice(1).join('/')
    }
  }

  return ''
})

const post = computed(() => {
  // First check if postData was injected into meta during SSR
  if (route.meta?.postData) {
    return route.meta.postData as (typeof blogPosts)[0]
  }
  // Otherwise look up by slug
  return blogPosts.find((p) => p.slug === slug.value)
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO: Update meta tags for blog post
const siteName = 'Formatho'
const baseUrl = 'https://formatho.com/tools'

// Use @vueuse/head for SEO meta tags
useHead(computed(() => {
  if (!post.value) {
    return {
      title: 'Article Not Found - Formatho',
      meta: [
        { name: 'description', content: 'The requested article could not be found.' }
      ]
    }
  }

  const fullTitle = `${post.value.title} - ${siteName}`
  const url = `${baseUrl}/blogs/${post.value.slug}`
  const image = post.value.image 
    ? `${baseUrl}${post.value.image}` 
    : `${baseUrl}/logo.png`

  // JSON-LD Structured Data for Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.value.title,
    image: image,
    datePublished: post.value.date,
    dateModified: post.value.date,
    author: {
      '@type': 'Organization',
      name: siteName
    },
    description: post.value.excerpt,
    articleSection: post.value.tags[0] || 'Technology',
    url: url
  }

  return {
    title: fullTitle,
    meta: [
      { name: 'title', content: fullTitle },
      { name: 'description', content: post.value.excerpt },
      { name: 'keywords', content: post.value.tags.join(', ') },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: post.value.excerpt },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: siteName },
      { property: 'article:published_time', content: post.value.date },
      { property: 'article:tag', content: post.value.tags.join(', ') },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@heyformatho' },
      { name: 'twitter:url', content: url },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: post.value.excerpt },
      { name: 'twitter:image', content: image }
    ],
    link: [
      { rel: 'canonical', href: url }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(articleSchema)
      }
    ]
  }
}))
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Back Link -->
    <RouterLink
      to="/blogs"
      class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gray-900 transition-colors mb-8"
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
        class="btn-primary px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Browse all articles
      </RouterLink>
    </div>

    <!-- Article Content -->
    <article v-else class="max-w-4xl mx-auto">
      <!-- Header -->
      <header
        class="mb-8"
        data-aos="fade-up"
        data-aos-duration="400"
      >
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
            class="text-gray-900"
          >
            <Tag class="w-3 h-3" />
            {{ tag }}
          </span>
        </div>
      </header>

      <!-- Featured Image -->
      <div
        v-if="post.image"
        class="mb-8 rounded-xl overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="400"
        data-aos-delay="100"
      >
        <img
          :src="post.image"
          :alt="post.imageAlt || post.title"
          class="w-full h-auto object-cover"
          loading="lazy"
        />
        <p v-if="post.imageAlt" class="text-xs text-muted-foreground mt-2 text-center">
          {{ post.imageAlt }}
        </p>
      </div>

      <!-- Article Body -->
      <div
        class="prose prose-lg max-w-none dark:prose-invert"
        data-aos="fade-up"
        data-aos-duration="400"
        data-aos-delay="200"
      >
        <div v-html="post.content"></div>
      </div>

      <!-- CTA Section -->
      <div
        v-if="post.cta"
        class="mt-12 p-6 glass-card border-primary/30 bg-primary/5"
        data-aos="fade-up"
        data-aos-duration="400"
        data-aos-delay="300"
      >
        <h3 class="text-xl font-bold mb-3">{{ post.cta.title }}</h3>
        <p class="text-muted-foreground mb-4">{{ post.cta.description }}</p>
        <RouterLink
          :to="post.cta.link"
          class="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
        >
          {{ post.cta.buttonText }}
          <ExternalLink class="w-4 h-4" />
        </RouterLink>
      </div>

      <!-- Related Tools -->
      <div
        v-if="post.relatedTools && post.relatedTools.length > 0"
        class="mt-12"
        data-aos="fade-up"
        data-aos-duration="400"
        data-aos-delay="400"
      >
        <h3 class="text-2xl font-bold mb-6">Related Tools</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RouterLink
            v-for="(tool, index) in post.relatedTools"
            :key="tool.link"
            :to="tool.link"
            class="p-4 glass-card hover:border-primary/50 transition-all group"
            data-aos="fade-up"
            data-aos-duration="400"
            :data-aos-delay="400 + (index * 50)"
          >
            <h4 class="font-semibold group-hover:text-gray-900 transition-colors">
              {{ tool.name }}
            </h4>
            <p class="text-sm text-muted-foreground">{{ tool.description }}</p>
          </RouterLink>
        </div>
      </div>

      <!-- Share & Navigation -->
      <div
        class="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        data-aos="fade-up"
        data-aos-duration="400"
        data-aos-delay="500"
      >
        <RouterLink
          to="/blogs"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gray-900 transition-colors"
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
.prose :deep(ul),
.prose :deep(ol) {
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
  @apply text-gray-900 hover:underline;
}
.prose :deep(table) {
  @apply w-full border-collapse my-4;
}
.prose :deep(th),
.prose :deep(td) {
  @apply border border-border p-2 text-left;
}
.prose :deep(th) {
  @apply bg-muted font-semibold;
}

/* Mobile: Ensure Related Tools grid stacks on mobile */
@media (max-width: 768px) {
  .prose :deep(.grid) {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
  }
}
</style>
