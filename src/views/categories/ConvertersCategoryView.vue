<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { tools } from '@/data/tools'
import * as LucideIcons from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Data, Base64, and Timestamp Converters | Formatho',
  description: 'Real-time Unix timestamp, JSON to YAML, Base64, and color conversion with client-side processing. Free online converters with zero server uploads.',
  keywords: ['unix timestamp converter', 'json yaml converter', 'base64 converter', 'color converter', 'timestamp tools', 'data converters', 'format converters', 'client-side', 'free tools'],
  canonicalUrl: 'https://formatho.com/category/converters'
})

const convertersCategory = tools.find(t => t.category === 'Converters')
const toolsList = ref(convertersCategory?.items || [])

let jsonLdScript: HTMLScriptElement | null = null

onMounted(() => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Data, Base64, and Timestamp Converters',
    description: 'Real-time Unix timestamp, JSON to YAML, Base64, and color conversion with client-side processing.',
    url: 'https://formatho.com/category/converters',
    about: {
      '@type': 'Thing',
      name: 'Data Converters',
      description: 'Base64, timestamp, color, and format converters'
    },
    numberOfItems: toolsList.value.length
  }

  jsonLdScript = document.createElement('script')
  jsonLdScript.type = 'application/ld+json'
  jsonLdScript.setAttribute('data-category-schema', 'true')
  jsonLdScript.textContent = JSON.stringify(structuredData)
  document.head.appendChild(jsonLdScript)
})

onUnmounted(() => {
  if (jsonLdScript?.parentNode) {
    jsonLdScript.parentNode.removeChild(jsonLdScript)
    jsonLdScript = null
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Header Section -->
    <div class="mb-12 text-center max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Data, Base64, and Timestamp Converters</h1>
      <p class="text-muted-foreground text-lg">
        Real-time Unix timestamp, JSON to YAML, Base64, and color conversion with client-side processing.
      </p>
    </div>

    <!-- Tools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <RouterLink
        v-for="(tool, toolIndex) in toolsList"
        :key="tool.name"
        :to="tool.route"
        class="premium-card-hover"
      >
        <div
          class="h-full p-6 cursor-pointer border border-foreground transition-all duration-150 ease-out hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-[2px] hover:-translate-x-[2px]"
          data-aos="fade-up"
          :data-aos-delay="(toolIndex % 4) * 50"
        >
          <div class="flex flex-col h-full">
            <!-- Icon with dynamic Lucide component -->
            <div class="mb-4">
              <div class="p-3 border border-foreground/20 w-fit">
                <component
                  :is="LucideIcons[tool.iconName] || LucideIcons.Wrench"
                  class="w-6 h-6 text-gray-900"
                  stroke-width="2"
                />
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-2 transition-colors">
                {{ tool.name }}
              </h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                {{ tool.description }}
              </p>
            </div>

            <!-- Arrow Icon -->
            <div class="flex items-center text-gray-900 mt-auto pt-4">
              <span class="text-xs tracking-widest uppercase font-semibold">EXECUTE</span>
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
