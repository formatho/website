<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'
import { blogMetadata } from '../data/blogMetadata'

const activeCategory = ref('ALL')

const allTags = computed(() => {
  const tags = new Set<string>()
  blogMetadata.forEach(post => post.tags.forEach(tag => tags.add(tag)))
  return ['ALL', ...Array.from(tags).slice(0, 8)]
})

const filteredPosts = computed(() => {
  if (activeCategory.value === 'ALL') return blogMetadata
  return blogMetadata.filter(post => post.tags.includes(activeCategory.value))
})

const formatDate = (dateString: string) => {
  const d = new Date(dateString)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = String(d.getFullYear()).slice(2)
  return `${day}.${month}.${year}`
}

const formatReadTime = (readTime: string) => {
  const mins = readTime.replace(/\s*min.*/, '')
  return mins
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Formatho Blog',
        description: 'Developer guides, tutorials, and insights from the Formatho team',
        url: 'https://formatho.com/blogs',
        publisher: {
          '@type': 'Organization',
          name: 'Formatho',
          url: 'https://formatho.com'
        },
        blogPost: blogMetadata.slice(0, 10).map(post => ({
          '@type': 'BlogPosting',
          headline: post.title,
          datePublished: post.date,
          url: `https://formatho.com/blogs/${post.slug}`
        }))
      })
    }
  ]
})
</script>

<template>
  <div class="min-h-screen overflow-x-hidden">
    <!-- ============================================ -->
    <!-- HERO: 50/50 SPLIT                             -->
    <!-- ============================================ -->
    <section class="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] border-b border-foreground/10">
      <!-- Left: Typography -->
      <div class="flex flex-col justify-end p-8 md:p-16">
        <p class="text-xs font-medium tracking-widest text-muted-foreground mb-6">
          VOL. 01 — APR 2026
        </p>
        <h1 class="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8">
          BLOG
        </h1>
        <p class="text-muted-foreground max-w-md leading-relaxed">
          Developer guides, tutorials, and insights from the Formatho team. No fluff. Pure signal.
        </p>
      </div>

      <!-- Right: Edge-to-edge greyscale image -->
      <div class="relative min-h-[300px] md:min-h-0">
        <div
          class="absolute inset-0 bg-foreground/5 filter grayscale contrast-125"
        >
          <img
            v-if="blogMetadata[0]?.image"
            :src="blogMetadata[0].image"
            :alt="blogMetadata[0].imageAlt || blogMetadata[0].title"
            class="w-full h-full object-cover grayscale"
            loading="eager"
          />
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- CATEGORY NAVIGATION: Sticky                    -->
    <!-- ============================================ -->
    <nav class="sticky top-0 z-30 bg-background border-b border-foreground/10">
      <div class="container mx-auto px-4 md:px-8">
        <div class="flex items-center gap-8 overflow-x-auto py-4 no-scrollbar">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="activeCategory = tag"
            class="text-xs tracking-widest uppercase whitespace-nowrap transition-all pb-1"
            :class="activeCategory === tag
              ? 'text-foreground font-bold border-b-2 border-foreground'
              : 'text-muted-foreground hover:text-foreground line-through decoration-foreground/20'"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </nav>

    <!-- ============================================ -->
    <!-- ARTICLE FEED: BRUTALIST LIST                   -->
    <!-- ============================================ -->
    <section class="container mx-auto px-4 md:px-8 py-0">
      <div v-if="filteredPosts.length === 0" class="text-center py-24">
        <p class="text-muted-foreground text-xs tracking-widest uppercase">No posts found</p>
      </div>

      <RouterLink
        v-for="post in filteredPosts"
        :key="post.id"
        :to="`/blogs/${post.slug}`"
        class="group block border-b border-foreground/10"
      >
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 items-center">
          <!-- Left: Date -->
          <div class="md:col-span-2">
            <p class="text-lg md:text-xl font-bold tracking-tight text-muted-foreground">
              {{ formatDate(post.date) }}
            </p>
          </div>

          <!-- Center: Title + Meta -->
          <div class="md:col-span-7">
            <h2
              class="text-2xl md:text-4xl font-black tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-200"
            >
              {{ post.title }}
              <span class="inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">→</span>
            </h2>
            <p class="text-xs tracking-widest text-muted-foreground mt-3 uppercase">
              [ MINUTE READ : {{ formatReadTime(post.readTime) }} ]<template v-if="post.tags.length"> [ TAG : {{ post.tags[0] }} ]</template>
            </p>
          </div>

          <!-- Right: Thumbnail -->
          <div class="md:col-span-3 flex justify-end">
            <div class="w-20 h-20 md:w-24 md:h-24 aspect-square overflow-hidden">
              <img
                v-if="post.image"
                :src="post.image"
                :alt="post.imageAlt || post.title"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
              <div v-else class="w-full h-full bg-foreground/5 grayscale"></div>
            </div>
          </div>
        </div>
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
