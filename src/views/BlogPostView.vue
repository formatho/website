<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'
import { ArrowLeft } from 'lucide-vue-next'
import { blogPosts } from '../data/blogPosts'
import EmailCapture from '@/components/EmailCapture.vue'

const props = defineProps<{
  slug?: string
}>()

const route = useRoute()

const slug = computed(() => {
  if (route.meta?.slug) return route.meta.slug as string
  if (props.slug) return props.slug
  if (route.params.slug) return route.params.slug as string
  if (route.name && typeof route.name === 'string' && route.name.startsWith('blog-post-')) {
    return route.name.replace('blog-post-', '')
  }
  if (route.path) {
    const pathParts = route.path.split('/').filter(Boolean)
    if (pathParts.length >= 2 && pathParts[0] === 'blogs') {
      return pathParts.slice(1).join('/')
    }
  }
  return ''
})

const post = computed(() => {
  if (route.meta?.postData) {
    return route.meta.postData as (typeof blogPosts)[0]
  }
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

const siteName = 'Formatho'
const baseUrl = 'https://formatho.com/tools'

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
    ? (post.value.image.startsWith('http') ? post.value.image : `${baseUrl}${post.value.image}`)
    : `${baseUrl}/logo.png`

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
  <div class="min-h-screen overflow-x-hidden">
    <!-- Back Navigation -->
    <div class="border-b border-foreground/10">
      <div class="container mx-auto px-4 md:px-8 py-4">
        <RouterLink
          to="/blogs"
          class="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft class="w-3 h-3" />
          Back to Index
        </RouterLink>
      </div>
    </div>

    <!-- Not Found -->
    <div v-if="!post" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <h1 class="text-8xl font-black tracking-tighter leading-none text-foreground/10 mb-4">404</h1>
        <p class="text-xs tracking-widest text-muted-foreground mb-8">ARTICLE NOT FOUND</p>
        <RouterLink
          to="/blogs"
          class="text-xs tracking-widest uppercase text-foreground hover:text-muted-foreground transition-colors"
        >
          Return to Index →
        </RouterLink>
      </div>
    </div>

    <!-- Article -->
    <template v-else>
      <!-- ============================================ -->
      <!-- HEADER: Dominant Title                        -->
      <!-- ============================================ -->
      <header class="min-h-[50vh] flex flex-col justify-end border-b border-foreground/10">
        <div class="container mx-auto px-4 md:px-8 pb-12 md:pb-20">
          <!-- Meta -->
          <div class="flex items-center gap-6 mb-8">
            <p class="text-xs tracking-widest text-muted-foreground uppercase">
              {{ formatDate(post.date) }}
            </p>
            <p class="text-xs tracking-widest text-muted-foreground uppercase">
              {{ post.readTime }}
            </p>
          </div>

          <!-- Title -->
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none max-w-5xl">
            {{ post.title }}
          </h1>

          <!-- Tags -->
          <div class="flex flex-wrap gap-4 mt-8">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs tracking-widest uppercase text-muted-foreground"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </header>

      <!-- ============================================ -->
      <!-- FEATURED IMAGE                                -->
      <!-- ============================================ -->
      <div v-if="post.image" class="border-b border-foreground/10">
        <div class="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <img
            :src="post.image"
            :alt="post.imageAlt || post.title"
            class="w-full max-h-[60vh] object-cover grayscale"
            loading="lazy"
          />
        </div>
      </div>

      <!-- ============================================ -->
      <!-- CONTENT: Narrow Prose Column + Grid Quotes    -->
      <!-- ============================================ -->
      <div class="container mx-auto px-4 md:px-8 py-12 md:py-24">
        <article class="max-w-prose mx-auto">
          <div
            class="prose-editorial"
            v-html="post.content"
          ></div>
        </article>
      </div>

      <!-- ============================================ -->
      <!-- NEWSLETTER                                    -->
      <!-- ============================================ -->
      <div class="border-t border-foreground/10">
        <div class="container mx-auto px-4 md:px-8 py-12 md:py-20">
          <div class="max-w-prose mx-auto">
            <EmailCapture
              source="blog"
              variant="card"
              title="Enjoyed this article?"
              subtitle="Subscribe to get more tutorials, tips, and developer insights delivered to your inbox."
              placeholder="your@email.com"
              buttonText="Subscribe"
            />
          </div>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- CTA                                           -->
      <!-- ============================================ -->
      <div v-if="post.cta" class="border-t border-foreground/10">
        <div class="container mx-auto px-4 md:px-8 py-12 md:py-20">
          <div class="max-w-prose mx-auto">
            <h3 class="text-2xl md:text-3xl font-black tracking-tighter leading-none mb-4">{{ post.cta.title }}</h3>
            <p class="text-muted-foreground leading-relaxed mb-8">{{ post.cta.description }}</p>
            <RouterLink
              :to="post.cta.link"
              class="inline-flex items-center justify-center bg-foreground px-8 py-4 text-sm font-medium tracking-widest text-background hover:bg-foreground/90 transition-colors"
            >
              {{ post.cta.buttonText }} →
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- RELATED TOOLS                                 -->
      <!-- ============================================ -->
      <div v-if="post.relatedTools && post.relatedTools.length > 0" class="border-t border-foreground/10">
        <div class="container mx-auto px-4 md:px-8 py-12 md:py-20">
          <p class="text-xs tracking-widest text-muted-foreground mb-8 uppercase">Related Tools</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
            <RouterLink
              v-for="tool in post.relatedTools"
              :key="tool.link"
              :to="tool.link"
              class="p-8 bg-background hover:bg-muted/50 transition-colors group"
            >
              <h4 class="text-lg font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-200">
                {{ tool.name }} <span class="inline-block opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
              </h4>
              <p class="text-sm text-muted-foreground mt-2">{{ tool.description }}</p>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- FOOTER NAV                                    -->
      <!-- ============================================ -->
      <div class="border-t border-foreground/10">
        <div class="container mx-auto px-4 md:px-8 py-8">
          <RouterLink
            to="/blogs"
            class="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft class="w-3 h-3" />
            Back to Index
          </RouterLink>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Editorial prose styles */
.prose-editorial :deep(h2) {
  @apply text-2xl md:text-3xl font-black tracking-tight leading-tight mt-16 mb-6;
}

.prose-editorial :deep(h3) {
  @apply text-xl md:text-2xl font-bold tracking-tight leading-tight mt-12 mb-4;
}

.prose-editorial :deep(p) {
  @apply text-base md:text-lg leading-relaxed text-muted-foreground mb-6;
}

.prose-editorial :deep(ul),
.prose-editorial :deep(ol) {
  @apply my-6 pl-6 space-y-2;
}

.prose-editorial :deep(li) {
  @apply text-base md:text-lg leading-relaxed text-muted-foreground;
}

.prose-editorial :deep(code) {
  @apply px-1.5 py-0.5 bg-muted text-sm font-mono;
}

.prose-editorial :deep(pre) {
  @apply p-6 bg-muted my-8 overflow-x-auto;
}

.prose-editorial :deep(pre code) {
  @apply p-0 bg-transparent;
}

/* Grid-breaking blockquotes */
.prose-editorial :deep(blockquote) {
  @apply my-12 py-6 border-l-2 border-foreground text-2xl md:text-3xl font-bold tracking-tight leading-snug;
  margin-left: -3rem;
  margin-right: -3rem;
  padding-left: 3rem;
  padding-right: 3rem;
}

@media (max-width: 768px) {
  .prose-editorial :deep(blockquote) {
    margin-left: 0;
    margin-right: 0;
    padding-left: 1.5rem;
    padding-right: 0;
  }
}

.prose-editorial :deep(a) {
  @apply text-foreground hover:underline underline-offset-4;
}

.prose-editorial :deep(table) {
  @apply w-full my-8;
}

.prose-editorial :deep(th),
.prose-editorial :deep(td) {
  @apply border border-foreground/10 p-3 text-left text-sm;
}

.prose-editorial :deep(th) {
  @apply bg-muted font-bold tracking-widest text-xs uppercase;
}

.prose-editorial :deep(img) {
  @apply my-8 w-full;
}

.prose-editorial :deep(strong) {
  @apply text-foreground font-bold;
}
</style>
