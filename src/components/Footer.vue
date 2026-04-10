<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Github, Heart, Shield, Zap } from 'lucide-vue-next'
import EmailCapture from '@/components/EmailCapture.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border/50 bg-muted/30 mt-auto">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div class="space-y-4">
          <RouterLink to="/" class="flex items-center gap-3">
            <img src="/logo.png" alt="Formatho" class="h-8 w-8 rounded-lg" />
            <span class="text-lg font-bold text-foreground">Formatho</span>
          </RouterLink>
          <p class="text-sm text-muted-foreground leading-relaxed">
            Privacy-first developer tools that run 100% client-side. Your data stays in your
            browser.
          </p>
          <div class="flex items-center gap-4 social-icons-group justify-start">
            <a
              href="https://github.com/formatho/website"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors duration-100 flex items-center"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a
              href="https://x.com/heyformatho"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors duration-100 flex items-center"
              aria-label="X (Twitter)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </a>
            <a
              href="https://linkedin.com/company/formatho"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors duration-100 flex items-center"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
          <!-- Newsletter in Footer -->
          <div class="pt-2">
            <p class="text-xs text-muted-foreground mb-2">Get updates</p>
            <EmailCapture
              source="footer"
              variant="compact"
              placeholder="Email"
              buttonText="→"
            />
          </div>
        </div>

        <!-- Features -->
        <div>
          <h3 class="text-sm font-semibold mb-4">Features</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield class="w-4 h-4 text-gray-900" />
              100% Client-Side
            </li>
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap class="w-4 h-4 text-gray-900" />
              Lightning Fast
            </li>
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart class="w-4 h-4 text-gray-900" />
              Privacy First
            </li>
          </ul>
        </div>

        <!-- Popular Tools -->
        <div>
          <h3 class="text-sm font-semibold mb-4">Popular Tools</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/json-lint"
                class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
              >
                JSON Linter
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/uuid"
                class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
              >
                UUID Generator
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/base64"
                class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
              >
                Base64 Encoder
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/jwt"
                class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
              >
                JWT Debugger
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-sm font-semibold mb-4">Categories</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/"
                class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
              >
                Data Tools
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/"
                class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
              >
                Converters
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/"
                class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
              >
                EVM Tools
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/"
                class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
              >
                Generators
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p class="text-sm text-muted-foreground">
          © {{ currentYear }} Formatho. Built with
          <Heart class="w-4 h-4 inline text-red-500" />
          for developers.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <RouterLink to="/about" class="hover:text-gray-900 transition-colors">
            About Us
          </RouterLink>
          <RouterLink to="/privacy" class="hover:text-gray-900 transition-colors">
            Privacy Policy
          </RouterLink>
          <RouterLink to="/contact" class="hover:text-gray-900 transition-colors">
            Contact Us
          </RouterLink>
          <a
            href="https://github.com/formatho/website"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-gray-900 transition-colors"
          >
            View Source
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
