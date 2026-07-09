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
      { name: 'JSON Lint', route: '/tools/json-lint' },
      { name: 'YAML Linter', route: '/tools/yaml-lint' },
      { name: 'JSON to YAML', route: '/tools/json-yaml' },
      { name: 'Base64', route: '/tools/base64' },
      { name: 'SQL Formatter', route: '/tools/sql' }
    ]
  },
  {
    name: 'Converters',
    items: [
      { name: 'Case Converter', route: '/tools/case-converter' },
      { name: 'Color Converter', route: '/tools/color-converter' },
      { name: 'Integer Base', route: '/tools/integer-base-converter' },
      { name: 'Temperature', route: '/tools/temperature-converter' },
      { name: 'Date-Time', route: '/tools/date-time-converter' }
    ]
  },
  {
    name: 'EVM Tools',
    items: [
      { name: 'Unit Converter', route: '/tools/evm-converter' },
      { name: 'Keccak-256', route: '/tools/keccak256' },
      { name: 'Checksum', route: '/tools/address-checksum' },
      { name: 'Multi-Chain Keys', route: '/tools/multi-chain-keys' }
    ]
  },
  {
    name: 'Generators',
    items: [
      { name: 'UUID', route: '/tools/uuid' },
      { name: 'Token Generator', route: '/tools/token-generator' },
      { name: 'Hash Text', route: '/tools/hash-text' },
      { name: 'QR Code', route: '/tools/qr-code-generator' }
    ]
  }
]

// Shared nav link classes — brutalist editorial style
const navLinkClass =
  'text-[13px] font-semibold tracking-[1.5px] uppercase text-foreground hover:underline hover:underline-offset-[6px] decoration-2 hover:decoration-foreground py-2 px-1'
</script>

<style scoped>
@keyframes coming-soon-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.coming-soon-badge {
  animation: coming-soon-blink 2s ease-in-out infinite;
}
</style>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] glass-nav border-b border-white/10"
    role="navigation"
    aria-label="Main Navigation"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 group nav-btn" aria-label="Formatho Home">
          <img
            src="/logo.png"
            alt=""
            class="h-8 w-8 transition-transform group-hover:scale-110"
            aria-hidden="true"
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
              :class="[navLinkClass, 'flex items-center gap-1 nav-btn']"
              @click="isToolsDropdownOpen = !isToolsDropdownOpen"
              :aria-expanded="isToolsDropdownOpen"
              aria-controls="tools-dropdown-menu"
            >
              Tools
              <span
                class="text-[10px] font-mono ml-0.5 transition-transform inline-block"
                :class="{ 'rotate-45': isToolsDropdownOpen }"
                aria-hidden="true"
                >+</span
              >
            </button>

            <!-- Dropdown Menu -->
            <div
              v-show="isToolsDropdownOpen"
              id="tools-dropdown-menu"
              role="menu"
              class="absolute left-0 top-full pt-2 z-[9999]"
              :aria-label="'Tools menu - ' + (isToolsDropdownOpen ? 'expanded' : 'collapsed')"
              @keydown.esc="closeToolsDropdown"
            >
              <!-- Screen reader announcement for dropdown state -->
              <div class="sr-only-only" :aria-live="'polite'" aria-atomic="true">
                Tools menu {{ isToolsDropdownOpen ? 'expanded' : 'collapsed' }}
              </div>
              <div
                class="bg-enterprise-card/95 backdrop-blur-md border border-border/50 rounded-xl min-w-[600px] p-6 grid grid-cols-2 gap-6 shadow-xl"
              >
                <div v-for="category in categories" :key="category.name" class="space-y-2">
                  <h3
                    class="text-[11px] font-bold tracking-[2px] uppercase text-enterprise-primary mb-3 border-b border-border/30 pb-2"
                  >
                    {{ category.name }}
                  </h3>
                  <div class="space-y-0">
                    <RouterLink
                      v-for="item in category.items"
                      :key="item.name"
                      :to="item.route"
                      @click="handleToolLinkClick"
                      class="block px-2 py-2 text-sm text-muted-foreground hover:text-enterprise-primary hover:pl-4 transition-all border-b border-border/20"
                    >
                      {{ item.name }}
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://github.com/formatho"
            target="_blank"
            rel="noopener noreferrer"
            :class="[navLinkClass, 'flex items-center gap-1']"
          >
            <Github class="w-3.5 h-3.5" />
            GitHub
          </a>

          <RouterLink to="/blogs" :class="navLinkClass">Blog</RouterLink>
          <RouterLink to="/pricing" :class="navLinkClass">Pricing</RouterLink>

          <RouterLink to="/get-verified" :class="[navLinkClass, 'flex items-center gap-1.5']">
            Get Verified
            <span
              class="coming-soon-badge text-[9px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-foreground text-background"
              >coming soon</span
            >
          </RouterLink>
        </div>

        <!-- Search & Mobile Menu Button -->
        <div class="flex items-center gap-3">
          <!-- Command Line Search -->
          <button
            @click="openSearchModal"
            class="nav-btn hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border border-border/50 rounded-xl bg-transparent hover:bg-enterprise-card/50 hover:border-enterprise-primary/30 transition-colors"
            aria-label="Open search modal"
          >
            <Search class="w-3.5 h-3.5" aria-hidden="true" />
            <span class="font-mono text-xs">Search...</span>
            <kbd
              class="hidden lg:inline-block ml-4 px-1.5 py-0.5 text-[10px] bg-foreground text-background font-mono font-bold rounded-xl"
              aria-hidden="true"
            >
              ⌘K
            </kbd>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="nav-btn md:hidden p-2 text-foreground min-w-[48px] min-h-[48px] flex items-center justify-center"
            :aria-expanded="isMobileMenuOpen"
            :aria-label="isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" aria-hidden="true" />
            <X v-else class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden py-4 border-t border-border/50 bg-enterprise-card/50 backdrop-blur-sm"
      >
        <div class="space-y-1">
          <RouterLink to="/" @click="isMobileMenuOpen = false" :class="[navLinkClass, 'block']"
            >Home</RouterLink
          >
          <RouterLink to="/about" @click="isMobileMenuOpen = false" :class="[navLinkClass, 'block']"
            >About</RouterLink
          >

          <!-- Mobile Tools Dropdown -->
          <div class="pointer-events-auto">
            <button
              @click="toggleToolsDropdown"
              :class="[navLinkClass, 'flex items-center justify-between w-full nav-btn']"
            >
              <span>Tools</span>
              <span
                class="text-[10px] font-mono"
                :class="{ 'rotate-45 inline-block': isToolsDropdownOpen }"
                >+</span
              >
            </button>

            <div v-show="isToolsDropdownOpen" class="space-y-3 mt-2 pl-4">
              <div v-for="category in categories" :key="category.name" class="space-y-1">
                <h3 class="text-[11px] font-bold tracking-[2px] uppercase text-foreground py-2">
                  {{ category.name }}
                </h3>
                <RouterLink
                  v-for="item in category.items"
                  :key="item.name"
                  :to="item.route"
                  @click="handleToolLinkClick"
                  class="block px-2 py-2 text-sm text-muted-foreground border-b border-border/20 hover:text-enterprise-primary"
                >
                  {{ item.name }}
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-border/50 mt-2">
            <a
              href="https://github.com/formatho"
              target="_blank"
              rel="noopener noreferrer"
              :class="[navLinkClass, 'flex items-center gap-2']"
            >
              <Github class="w-3.5 h-3.5" />
              GitHub
            </a>
            <RouterLink
              to="/blogs"
              @click="isMobileMenuOpen = false"
              :class="[navLinkClass, 'block']"
              >Blog</RouterLink
            >
            <RouterLink
              to="/pricing"
              @click="isMobileMenuOpen = false"
              :class="[navLinkClass, 'block']"
              >Pricing</RouterLink
            >
            <RouterLink
              to="/get-verified"
              @click="isMobileMenuOpen = false"
              :class="[navLinkClass, 'flex items-center gap-1.5']"
            >
              Get Verified
              <span
                class="coming-soon-badge text-[9px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-foreground text-background"
                >coming soon</span
              >
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Global Search Modal -->
  <GlobalSearchModal :is-open="isSearchModalOpen" @close="closeSearchModal" />
</template>
