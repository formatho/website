<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Github, Search } from 'lucide-vue-next'

const isMobileMenuOpen = ref(false)

const categories = [
  {
    name: 'Data Tools',
    items: [
      { name: 'JSON Lint', route: '/json-lint' },
      { name: 'YAML Linter', route: '/yaml-lint' },
      { name: 'JSON to YAML', route: '/json-yaml' },
      { name: 'Base64', route: '/base64' },
      { name: 'SQL Formatter', route: '/sql' }
    ]
  },
  {
    name: 'Converters',
    items: [
      { name: 'Case Converter', route: '/case-converter' },
      { name: 'Color Converter', route: '/color-converter' },
      { name: 'Integer Base', route: '/integer-base-converter' },
      { name: 'Temperature', route: '/temperature-converter' },
      { name: 'Date-Time', route: '/date-time-converter' }
    ]
  },
  {
    name: 'EVM Tools',
    items: [
      { name: 'Unit Converter', route: '/evm-converter' },
      { name: 'Keccak-256', route: '/keccak256' },
      { name: 'Checksum', route: '/address-checksum' },
      { name: 'Multi-Chain Keys', route: '/multi-chain-keys' }
    ]
  },
  {
    name: 'Generators',
    items: [
      { name: 'UUID', route: '/uuid' },
      { name: 'Token Generator', route: '/token-generator' },
      { name: 'Hash Text', route: '/hash-text' },
      { name: 'QR Code', route: '/qr-code-generator' }
    ]
  }
]
</script>

<template>
  <nav class="sticky top-0 z-50 glass border-b border-border/50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Formatho"
            class="h-8 w-8 rounded-lg transition-transform group-hover:scale-110"
          />
          <span class="text-xl font-bold gradient-text">Formatho</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <!-- Home Link -->
          <RouterLink
            to="/"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </RouterLink>

          <!-- About Us Link -->
          <RouterLink
            to="/about"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About Us
          </RouterLink>

          <!-- Tools Dropdown -->
          <div class="relative group">
            <button
              class="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Tools
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              class="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <div class="glass-card min-w-[600px] p-6 grid grid-cols-2 gap-6">
                <div v-for="category in categories" :key="category.name" class="space-y-2">
                  <h3 class="text-xs font-semibold uppercase text-primary mb-3">
                    {{ category.name }}
                  </h3>
                  <div class="space-y-1">
                    <RouterLink
                      v-for="item in category.items"
                      :key="item.name"
                      :to="item.route"
                      class="block px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-md transition-all"
                    >
                      {{ item.name }}
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- GitHub Link -->
          <a
            href="https://github.com/nnn-gif/tools"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github class="w-4 h-4" />
            GitHub
          </a>

          <!-- Blogs Link -->
          <RouterLink
            to="/blogs"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Blogs
          </RouterLink>



        <!-- Search & Mobile Menu Button -->
        <div class="flex items-center gap-3">
          <RouterLink
            to="/"
            class="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-primary/50 transition-all"
          >
            <Search class="w-4 h-4" />
            <span>Search...</span>
            <kbd class="hidden lg:inline-block ml-auto px-2 py-0.5 text-xs bg-muted rounded"
              >⌘K</kbd
            >
          </RouterLink>

          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-border">
        <div class="space-y-4">
          <!-- Home Link -->
          <RouterLink
            to="/"
            @click="isMobileMenuOpen = false"
            class="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all"
          >
            Home
          </RouterLink>

          <!-- About Us Link -->
          <RouterLink
            to="/about"
            @click="isMobileMenuOpen = false"
            class="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all"
          >
            About Us
          </RouterLink>

          <!-- Tools Categories -->
          <div v-for="category in categories" :key="category.name" class="space-y-2">
            <h3 class="text-xs font-semibold uppercase text-primary px-3">{{ category.name }}</h3>
            <div class="space-y-1">
              <RouterLink
                v-for="item in category.items"
                :key="item.name"
                :to="item.route"
                @click="isMobileMenuOpen = false"
                class="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all"
              >
                {{ item.name }}
              </RouterLink>
            </div>
          </div>

          <!-- GitHub Link -->
          <div class="pt-4 border-t border-border">
            <a
              href="https://github.com/nnn-gif/tools"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all"
            >
              <Github class="w-4 h-4" />
              GitHub
            </a>

            <!-- Blogs Link -->
            <RouterLink
              to="/blogs"
              @click="isMobileMenuOpen = false"
              class="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all"
            >
              Blogs
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
