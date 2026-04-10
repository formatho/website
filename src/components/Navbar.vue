<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Github, Search } from 'lucide-vue-next'
import GlobalSearchModal from './GlobalSearchModal.vue'

const isMobileMenuOpen = ref(false)
const isToolsDropdownOpen = ref(false)
const isSearchModalOpen = ref(false)
const toolsDropdownRef = ref<HTMLElement | null>(null)

const closeToolsDropdown = () => {
  isToolsDropdownOpen.value = false
}

const toggleToolsDropdown = () => {
  isToolsDropdownOpen.value = !isToolsDropdownOpen.value
}

const toggleSearchModal = () => {
  isSearchModalOpen.value = !isSearchModalOpen.value
}

const openSearchModal = () => {
  isSearchModalOpen.value = true
}

const closeSearchModal = () => {
  isSearchModalOpen.value = false
}

const handleGlobalKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    toggleSearchModal()
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (toolsDropdownRef.value && !toolsDropdownRef.value.contains(event.target as Node)) {
    closeToolsDropdown()
  }
}

const handleToolLinkClick = () => {
  closeToolsDropdown()
  isMobileMenuOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleGlobalKeydown)
})

const categories = [
  {
    name: 'Data Tools',
    items: [
      { name: 'JSON Lint', route: 'json-lint' },
      { name: 'YAML Linter', route: 'yaml-lint' },
      { name: 'JSON to YAML', route: 'json-yaml' },
      { name: 'Base64', route: 'base64' },
      { name: 'SQL Formatter', route: 'sql' }
    ]
  },
  {
    name: 'Converters',
    items: [
      { name: 'Case Converter', route: 'case-converter' },
      { name: 'Color Converter', route: 'color-converter' },
      { name: 'Integer Base', route: 'integer-base-converter' },
      { name: 'Temperature', route: 'temperature-converter' },
      { name: 'Date-Time', route: 'date-time-converter' }
    ]
  },
  {
    name: 'EVM Tools',
    items: [
      { name: 'Unit Converter', route: 'evm-converter' },
      { name: 'Keccak-256', route: 'keccak256' },
      { name: 'Checksum', route: 'address-checksum' },
      { name: 'Multi-Chain Keys', route: 'multi-chain-keys' }
    ]
  },
  {
    name: 'Generators',
    items: [
      { name: 'UUID', route: 'uuid' },
      { name: 'Token Generator', route: 'token-generator' },
      { name: 'Hash Text', route: 'hash-text' },
      { name: 'QR Code', route: 'qr-code-generator' }
    ]
  }
]

// Shared nav link classes — brutalist editorial style
const navLinkClass = 'text-[13px] font-semibold tracking-[1.5px] uppercase text-foreground hover:underline hover:underline-offset-[6px] decoration-2 hover:decoration-foreground py-2 px-1'
</script>

<template>
  <nav class="sticky top-0 z-[100] bg-background border-b border-foreground">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Formatho"
            class="h-8 w-8 transition-transform group-hover:scale-110"
          />
          <span class="text-lg font-black tracking-tight gradient-text">FORMATHO</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <RouterLink to="/" :class="navLinkClass">Home</RouterLink>
          <RouterLink to="/about" :class="navLinkClass">About</RouterLink>

          <!-- Tools Dropdown -->
          <div class="relative pointer-events-auto" ref="toolsDropdownRef">
            <button
              :class="[navLinkClass, 'flex items-center gap-1']"
              @click="isToolsDropdownOpen = !isToolsDropdownOpen"
            >
              Tools
              <span class="text-[10px] font-mono ml-0.5 transition-transform inline-block" :class="{ 'rotate-45': isToolsDropdownOpen }">+</span>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-show="isToolsDropdownOpen"
              class="absolute left-0 top-full pt-2 z-[9999]"
            >
              <div
                class="bg-background border border-foreground rounded-none min-w-[600px] p-6 grid grid-cols-2 gap-6"
              >
                <div v-for="category in categories" :key="category.name" class="space-y-2">
                  <h3 class="text-[11px] font-bold tracking-[2px] uppercase text-foreground mb-3 border-b border-foreground/10 pb-2">
                    {{ category.name }}
                  </h3>
                  <div class="space-y-0">
                    <RouterLink
                      v-for="item in category.items"
                      :key="item.name"
                      :to="item.route"
                      @click="handleToolLinkClick"
                      class="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:pl-4 transition-all border-b border-foreground/5"
                    >
                      {{ item.name }}
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://github.com/formatho/website"
            target="_blank"
            rel="noopener noreferrer"
            :class="[navLinkClass, 'flex items-center gap-1']"
          >
            <Github class="w-3.5 h-3.5" />
            GitHub
          </a>

          <RouterLink to="/blogs" :class="navLinkClass">Blog</RouterLink>
          <RouterLink to="/pricing" :class="navLinkClass">Pricing</RouterLink>
        </div>

        <!-- Search & Mobile Menu Button -->
        <div class="flex items-center gap-3">
          <!-- Command Line Search -->
          <button
            @click="openSearchModal"
            class="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border border-foreground rounded-none bg-transparent hover:bg-foreground/5 transition-colors"
          >
            <Search class="w-3.5 h-3.5" />
            <span class="font-mono text-xs">Search...</span>
            <kbd class="hidden lg:inline-block ml-4 px-1.5 py-0.5 text-[10px] bg-foreground text-background font-mono font-bold rounded-none">
              ⌘K
            </kbd>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 text-foreground"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-foreground">
        <div class="space-y-1">
          <RouterLink to="/" @click="isMobileMenuOpen = false" :class="[navLinkClass, 'block']">Home</RouterLink>
          <RouterLink to="/about" @click="isMobileMenuOpen = false" :class="[navLinkClass, 'block']">About</RouterLink>

          <!-- Mobile Tools Dropdown -->
          <div class="pointer-events-auto">
            <button
              @click="toggleToolsDropdown"
              :class="[navLinkClass, 'flex items-center justify-between w-full']"
            >
              <span>Tools</span>
              <span class="text-[10px] font-mono" :class="{ 'rotate-45 inline-block': isToolsDropdownOpen }">+</span>
            </button>

            <div v-show="isToolsDropdownOpen" class="space-y-3 mt-2 pl-4">
              <div v-for="category in categories" :key="category.name" class="space-y-1">
                <h3 class="text-[11px] font-bold tracking-[2px] uppercase text-foreground py-2">{{ category.name }}</h3>
                <RouterLink
                  v-for="item in category.items"
                  :key="item.name"
                  :to="item.route"
                  @click="handleToolLinkClick"
                  class="block px-2 py-2 text-sm text-muted-foreground border-b border-foreground/5"
                >
                  {{ item.name }}
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-foreground mt-2">
            <a
              href="https://github.com/formatho/website"
              target="_blank"
              rel="noopener noreferrer"
              :class="[navLinkClass, 'flex items-center gap-2']"
            >
              <Github class="w-3.5 h-3.5" />
              GitHub
            </a>
            <RouterLink to="/blogs" @click="isMobileMenuOpen = false" :class="[navLinkClass, 'block']">Blog</RouterLink>
            <RouterLink to="/pricing" @click="isMobileMenuOpen = false" :class="[navLinkClass, 'block']">Pricing</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Global Search Modal -->
  <GlobalSearchModal :is-open="isSearchModalOpen" @close="closeSearchModal" />
</template>
