<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSEO } from '@/composables/useSEO'
import { useEmailCapture } from '@/composables/useEmailCapture'

useSEO({
  title: 'Get Verified - RWA Verification Engine | Formatho',
  description:
    'The new standard for Real World Asset verification. Privacy-first, trustless verification for RWA tokenization. Coming soon.',
  keywords: ['RWA verification', 'real world assets', 'tokenization', 'privacy-first', 'blockchain verification', 'get verified'],
  ogType: 'website'
})

const { email, isValidEmail, submitEmail, isLoading, error, success } = useEmailCapture()
const source = ref<'get-verified'>('get-verified' as any)

// Sequential reveal state
const activeRevealIndex = ref(-1)
const revealPhase = ref<'idle' | 'typing' | 'visible' | 'fading'>('idle')
const displayedText = ref('')
const isSequenceComplete = ref(false)

const revealStrings = [
  'Right now, we\'re building the bridge between the physical and the programmable...',
  'We\'re building a way to answer: Does the asset exist, and who actually owns it?',
  'We\'re building systems to verify that a registry document exists in reality, and matches the metadata perfectly.',
  'We\'re building a way to answer: Is the code secure and compliant?',
  'We\'re building automated checks to ensure your smart contract code matches known, bulletproof secure standards.',
  'We\'re building a way to answer: Does the token match reality?',
  'We\'re building cryptographic proofs that a wallet address belongs to the exact individual who signed the message.',
  'We\'re building the new standard for RWA trust.'
]

let sequenceTimer: ReturnType<typeof setTimeout> | null = null

const typeText = (text: string, index: number, charIndex: number = 0) => {
  if (index !== activeRevealIndex.value) return

  if (charIndex <= text.length) {
    displayedText.value = text.slice(0, charIndex)
    revealPhase.value = 'typing'
    sequenceTimer = setTimeout(() => typeText(text, index, charIndex + 1), 18)
  } else {
    revealPhase.value = 'visible'
    // Hold for a beat, then fade and move to next
    const holdTime = index === revealStrings.length - 1 ? 3000 : 2200
    sequenceTimer = setTimeout(() => {
      if (index !== activeRevealIndex.value) return
      revealPhase.value = 'fading'
      sequenceTimer = setTimeout(() => {
        if (index === revealStrings.length - 1) {
          isSequenceComplete.value = true
          revealPhase.value = 'visible'
          displayedText.value = text
          return
        }
        // Move to next string
        activeRevealIndex.value++
        displayedText.value = ''
        revealPhase.value = 'typing'
        typeText(revealStrings[activeRevealIndex.value], activeRevealIndex.value)
      }, 600)
    }, holdTime)
  }
}

const startSequence = () => {
  activeRevealIndex.value = 0
  displayedText.value = ''
  revealPhase.value = 'typing'
  typeText(revealStrings[0], 0)
}

// Privacy section visibility
const privacyVisible = ref(false)
const ctaVisible = ref(false)

const handleScroll = () => {
  const privacyEl = document.getElementById('privacy-section')
  const ctaEl = document.getElementById('cta-section')

  if (privacyEl) {
    const rect = privacyEl.getBoundingClientRect()
    privacyVisible.value = rect.top < window.innerHeight * 0.85
  }
  if (ctaEl) {
    const rect = ctaEl.getBoundingClientRect()
    ctaVisible.value = rect.top < window.innerHeight * 0.85
  }
}

const handleSubmit = async () => {
  if (!isValidEmail.value) return
  await submitEmail(email.value, source.value)
}

const handleRestart = () => {
  isSequenceComplete.value = false
  startSequence()
}

onMounted(() => {
  // Small delay so the page renders first
  setTimeout(startSequence, 800)
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  if (sequenceTimer) clearTimeout(sequenceTimer)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- ============================================ -->
    <!-- 1. HERO SECTION - THE HOOK                   -->
    <!-- ============================================ -->
    <section class="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      <!-- Ambient background glow -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-foreground/3 rounded-full blur-[100px]"></div>
      </div>

      <!-- Top badge -->
      <div class="inline-flex items-center gap-2 border border-foreground rounded-full px-4 py-2 mb-8" data-aos="fade-down">
        <span class="inline-block w-1.5 h-1.5 rounded-full bg-foreground animate-pulse"></span>
        <span class="text-[11px] font-bold tracking-[2px] uppercase">Under Development</span>
      </div>

      <!-- Headline -->
      <h1
        class="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-center max-w-4xl leading-[1.1] mb-6"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Reality is about to get
        <br class="hidden md:block" />
        <span class="gradient-text">on-chain.</span>
      </h1>

      <!-- Sub-headline -->
      <p
        class="text-lg md:text-xl text-muted-foreground max-w-2xl text-center leading-relaxed mb-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        The ultimate verification standard for Real World Asset tokenization is loading.
      </p>

      <p
        class="text-sm font-mono text-muted-foreground/60 tracking-wider uppercase"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Bridging physical truth with on-chain data
      </p>

      <!-- Scroll hint -->
      <div class="absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground/40 animate-bounce">
        <span class="text-[10px] font-mono tracking-[3px] uppercase">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" class="text-foreground/30">
          <path d="M8 4L8 20M8 20L2 14M8 20L14 14" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- 2. SEQUENTIAL REVEAL - THE CORE TEASERS       -->
    <!-- ============================================ -->
    <section class="relative py-24 md:py-32 px-6">
      <div class="max-w-3xl mx-auto">
        <!-- Section marker -->
        <div class="flex items-center gap-4 mb-16">
          <div class="h-px flex-1 bg-foreground/15"></div>
          <span class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground">What we're building</span>
          <div class="h-px flex-1 bg-foreground/15"></div>
        </div>

        <!-- The reveal container -->
        <div class="min-h-[180px] flex items-center justify-center">
          <p
            class="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed text-center transition-all duration-500 ease-out"
            :class="{
              'opacity-0 translate-y-2': revealPhase === 'idle' || revealPhase === 'fading',
              'opacity-100 translate-y-0': revealPhase === 'typing' || revealPhase === 'visible',
            }"
          >
            <span class="text-muted-foreground/50 font-mono text-sm mr-2 font-normal" v-if="revealPhase !== 'idle'">
              {{ activeRevealIndex >= 0 ? String(activeRevealIndex + 1).padStart(2, '0') : '' }}
            </span>
            <span>{{ displayedText }}</span>
            <span
              v-if="revealPhase === 'typing'"
              class="inline-block w-0.5 h-6 bg-foreground ml-0.5 animate-pulse align-middle"
            ></span>
          </p>
        </div>

        <!-- Progress dots -->
        <div class="flex items-center justify-center gap-2 mt-12">
          <button
            v-for="(_, i) in revealStrings"
            :key="i"
            class="w-1.5 h-1.5 rounded-full transition-all duration-300"
            :class="i === activeRevealIndex ? 'bg-foreground scale-150' : i < activeRevealIndex ? 'bg-foreground/40' : 'bg-foreground/10'"
            @click="handleRestart"
          ></button>
        </div>

        <!-- Replay button -->
        <div v-if="isSequenceComplete" class="flex justify-center mt-8">
          <button
            @click="handleRestart"
            class="text-[11px] font-mono tracking-[2px] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            ↻ Replay
          </button>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- 3. PRIVACY-FIRST DECLARATION                  -->
    <!-- ============================================ -->
    <section id="privacy-section" class="py-24 md:py-32 px-6">
      <div
        class="max-w-3xl mx-auto transition-all duration-700 ease-out"
        :class="privacyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <!-- Section marker -->
        <div class="flex items-center gap-4 mb-16">
          <div class="h-px flex-1 bg-foreground/15"></div>
          <span class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground">Privacy Architecture</span>
          <div class="h-px flex-1 bg-foreground/15"></div>
        </div>

        <!-- Declaration blockquote -->
        <div class="border-l-2 border-foreground pl-6 md:pl-8 mb-12">
          <p class="text-xl md:text-2xl lg:text-3xl font-bold leading-snug tracking-tight mb-6">
            We don't store your data.
            <br />
            <span class="text-muted-foreground">We verify its truth.</span>
          </p>
        </div>

        <div class="max-w-2xl">
          <p class="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
            Our verification engine is built on a fundamental principle: sensitive information should never leave your control. We construct cryptographic proofs of validity, confirming identity, ownership, and compliance, without ever exposing the underlying data.
          </p>
          <p class="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
            No centralized databases. No third-party custodians. No trust assumptions. Just math, verified on-chain, readable by anyone who needs to know, and invisible to everyone who doesn't.
          </p>
        </div>

        <!-- Trust pillars -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="border border-foreground/15 rounded-xl p-5">
            <div class="text-2xl mb-3">🔒</div>
            <h3 class="text-sm font-bold tracking-wide uppercase mb-2">Zero-Knowledge Proofs</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">Verify without revealing. Prove existence without exposing contents.</p>
          </div>
          <div class="border border-foreground/15 rounded-xl p-5">
            <div class="text-2xl mb-3">🏗️</div>
            <h3 class="text-sm font-bold tracking-wide uppercase mb-2">Client-Side First</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">All processing happens locally. Your data never touches our servers.</p>
          </div>
          <div class="border border-foreground/15 rounded-xl p-5">
            <div class="text-2xl mb-3">📋</div>
            <h3 class="text-sm font-bold tracking-wide uppercase mb-2">Audit-Ready</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">Every verification generates a tamper-proof record. Compliance, built in.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- 4. CALL TO ACTION - THE WAITLIST              -->
    <!-- ============================================ -->
    <section id="cta-section" class="py-24 md:py-32 px-6">
      <div
        class="max-w-lg mx-auto text-center transition-all duration-700 ease-out"
        :class="ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <!-- Section marker -->
        <div class="flex items-center gap-4 mb-12">
          <div class="h-px flex-1 bg-foreground/15"></div>
          <span class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground">Early Access</span>
          <div class="h-px flex-1 bg-foreground/15"></div>
        </div>

        <h2 class="text-3xl md:text-4xl font-black tracking-tight mb-4">
          Get early access to the
          <br />
          <span class="gradient-text">verification engine.</span>
        </h2>

        <p class="text-sm text-muted-foreground mb-8">
          Join the inner circle. Be the first to know when we launch, and shape how verification works for RWA.
        </p>

        <!-- Waitlist form -->
        <div v-if="!success" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="flex-1 px-4 py-3 bg-transparent border border-foreground rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-foreground/30 placeholder:text-muted-foreground/40"
            @keyup.enter="handleSubmit"
          />
          <button
            @click="handleSubmit"
            :disabled="!isValidEmail || isLoading"
            class="px-6 py-3 bg-foreground text-background text-[12px] font-bold tracking-[1.5px] uppercase rounded-xl hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {{ isLoading ? 'Joining...' : 'Join Waitlist' }}
          </button>
        </div>

        <!-- Success state -->
        <div v-else class="mb-4">
          <div class="inline-flex items-center gap-2 border border-foreground rounded-full px-4 py-2">
            <span class="text-green-500">✓</span>
            <span class="text-sm font-mono">You're on the list. We'll be in touch.</span>
          </div>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-xs text-red-500 font-mono">{{ error }}</p>

        <!-- Subtle note -->
        <p class="text-[10px] font-mono text-muted-foreground/40 tracking-wider mt-6">
          No spam. Unsubscribe anytime. We respect your inbox like we respect your data.
        </p>
      </div>
    </section>

    <!-- Footer nav -->
    <div class="py-12 text-center border-t border-foreground/10">
      <RouterLink
        to="/"
        class="text-[11px] font-mono tracking-[2px] uppercase text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to Formatho
      </RouterLink>
    </div>
  </div>
</template>
