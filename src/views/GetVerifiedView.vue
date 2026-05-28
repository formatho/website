<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
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

// Hero text stagger animation
const heroLines = [
  { text: 'Reality', visible: false },
  { text: 'is about to', visible: false },
  { text: 'get on-chain.', visible: false }
]

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

// Scroll-driven section visibility
const sectionVisibility = reactive<Record<string, boolean>>({
  hero: false,
  reveal: false,
  privacy: false,
  pillars: false,
  cta: false
})

// Floating shapes parallax offset
const scrollY = ref(0)
const mousePos = reactive({ x: 0, y: 0 })

let sequenceTimer: ReturnType<typeof setTimeout> | null = null

const typeText = (text: string, index: number, charIndex: number = 0) => {
  if (index !== activeRevealIndex.value) return

  if (charIndex <= text.length) {
    displayedText.value = text.slice(0, charIndex)
    revealPhase.value = 'typing'
    sequenceTimer = setTimeout(() => typeText(text, index, charIndex + 1), 22)
  } else {
    revealPhase.value = 'visible'
    const holdTime = index === revealStrings.length - 1 ? 3000 : 2400
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
        activeRevealIndex.value++
        displayedText.value = ''
        revealPhase.value = 'typing'
        typeText(revealStrings[activeRevealIndex.value], activeRevealIndex.value)
      }, 500)
    }, holdTime)
  }
}

const startSequence = () => {
  activeRevealIndex.value = 0
  displayedText.value = ''
  revealPhase.value = 'typing'
  typeText(revealStrings[0], 0)
}

const handleRestart = () => {
  isSequenceComplete.value = false
  startSequence()
}

const handleSubmit = async () => {
  if (!isValidEmail.value) return
  await submitEmail(email.value, source.value)
}

const handleScroll = () => {
  scrollY.value = window.scrollY

  const sections = ['hero', 'reveal', 'privacy', 'pillars', 'cta']
  sections.forEach(id => {
    const el = document.getElementById(`${id}-section`)
    if (el) {
      const rect = el.getBoundingClientRect()
      sectionVisibility[id] = rect.top < window.innerHeight * 0.82
    }
  })
}

const handleMouseMove = (e: MouseEvent) => {
  mousePos.x = (e.clientX / window.innerWidth - 0.5) * 2
  mousePos.y = (e.clientY / window.innerHeight - 0.5) * 2
}

onMounted(() => {
  heroLines.forEach((_, i) => {
    setTimeout(() => {
      heroLines[i].visible = true
    }, 300 + i * 200)
  })

  setTimeout(startSequence, 1400)

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  if (sequenceTimer) clearTimeout(sequenceTimer)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="get-verified-page min-h-screen bg-background overflow-hidden">

    <!-- Floating geometric shapes (Bullo-style) -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        class="floating-shape shape-ring-1 absolute -top-20 -right-20 w-[500px] h-[500px] border border-foreground/8 rounded-full"
        :style="{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15 + scrollY * 0.05}px)` }"
      ></div>
      <div
        class="floating-shape shape-dots absolute top-1/3 -left-10 w-[200px] h-[200px]"
        :style="{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10 + scrollY * -0.08}px)` }"
      >
        <div class="absolute top-0 left-0 w-2 h-2 bg-foreground/10 rounded-full"></div>
        <div class="absolute top-8 left-12 w-1.5 h-1.5 bg-foreground/8 rounded-full"></div>
        <div class="absolute top-4 left-6 w-3 h-3 border border-foreground/10 rounded-full"></div>
        <div class="absolute top-16 left-4 w-1 h-1 bg-foreground/15 rounded-full"></div>
        <div class="absolute top-12 left-16 w-2 h-2 border border-foreground/6 rounded-full"></div>
      </div>
      <div
        class="floating-shape shape-ring-2 absolute -bottom-40 -left-40 w-[400px] h-[400px] border border-foreground/6 rounded-full"
        :style="{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8 + scrollY * -0.03}px)` }"
      ></div>
      <div
        class="floating-shape shape-cross absolute top-2/3 right-[15%] opacity-[0.06]"
        :style="{ transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px) rotate(45deg)` }"
      >
        <div class="w-16 h-px bg-foreground"></div>
        <div class="w-px h-16 bg-foreground absolute top-0 left-1/2 -translate-x-1/2"></div>
      </div>
      <div
        class="floating-shape shape-grid absolute bottom-[10%] right-[5%] opacity-[0.04]"
        :style="{ transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8 + scrollY * 0.02}px)` }"
      >
        <div class="grid grid-cols-4 gap-4">
          <div v-for="n in 16" :key="n" class="w-1 h-1 bg-foreground rounded-full"></div>
        </div>
      </div>
    </div>

    <!-- 1. HERO SECTION -->
    <section id="hero-section" class="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      <div
        class="fixed top-20 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-3 border border-foreground/20 rounded-full px-5 py-2 bg-background/80 backdrop-blur-sm"
        data-aos="fade-down"
      >
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/40"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
        </span>
        <span class="text-[10px] font-mono font-bold tracking-[3px] uppercase">Building</span>
      </div>

      <div class="text-center max-w-5xl">
        <h1 class="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.95] mb-8">
          <span
            v-for="(line, i) in heroLines"
            :key="i"
            class="hero-line block transition-all duration-700 ease-out"
            :class="line.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          >
            <span v-if="i === 2" class="gradient-text">{{ line.text }}</span>
            <span v-else>{{ line.text }}</span>
          </span>
        </h1>

        <p
          class="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed transition-all duration-700"
          :class="heroLines[2]?.visible ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-4'"
        >
          The ultimate verification standard for Real World Asset tokenization is loading.
        </p>
      </div>

      <div
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-1000"
        :class="heroLines[2]?.visible ? 'opacity-40' : 'opacity-0'"
      >
        <span class="text-[9px] font-mono tracking-[4px] uppercase">Scroll</span>
        <div class="w-px h-8 bg-foreground/30 relative overflow-hidden">
          <div class="w-full h-3 bg-foreground animate-scroll-line"></div>
        </div>
      </div>
    </section>

    <!-- 2. SEQUENTIAL REVEAL -->
    <section id="reveal-section" class="relative z-10 py-32 md:py-40 px-6">
      <div class="max-w-3xl mx-auto">
        <div
          class="flex items-center gap-4 mb-20 transition-all duration-700"
          :class="sectionVisibility.reveal ? 'opacity-100' : 'opacity-0'"
        >
          <div class="h-px w-8 bg-foreground/30"></div>
          <span class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/60">What we're building</span>
        </div>

        <div class="min-h-[200px] flex items-start">
          <p
            class="text-lg md:text-2xl lg:text-[1.75rem] font-semibold leading-[1.5] tracking-tight transition-all duration-500 ease-out"
            :class="{
              'opacity-0 translate-y-3': revealPhase === 'idle' || revealPhase === 'fading',
              'opacity-100 translate-y-0': revealPhase === 'typing' || revealPhase === 'visible',
            }"
          >
            <span class="text-muted-foreground/30 font-mono text-xs align-top mr-3 font-normal select-none">
              {{ activeRevealIndex >= 0 ? String(activeRevealIndex + 1).padStart(2, '0') : '' }}
            </span>
            <span>{{ displayedText }}</span>
            <span
              v-if="revealPhase === 'typing'"
              class="inline-block w-[2px] h-5 bg-foreground/70 ml-0.5 animate-pulse align-middle"
            ></span>
          </p>
        </div>

        <div class="mt-16 flex items-center gap-3">
          <div class="flex-1 h-px bg-foreground/10 relative overflow-hidden rounded-full">
            <div
              class="absolute left-0 top-0 h-full bg-foreground/40 transition-all duration-500 ease-out rounded-full"
              :style="{ width: `${((activeRevealIndex + 1) / revealStrings.length) * 100}%` }"
            ></div>
          </div>
          <span class="text-[10px] font-mono text-muted-foreground/40 tabular-nums">
            {{ activeRevealIndex >= 0 ? `${activeRevealIndex + 1}/${revealStrings.length}` : '' }}
          </span>
        </div>

        <div v-if="isSequenceComplete" class="mt-8">
          <button
            @click="handleRestart"
            class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/40 hover:text-foreground transition-colors duration-300"
          >
            ↻ Replay
          </button>
        </div>
      </div>
    </section>

    <!-- 3. PRIVACY-FIRST DECLARATION -->
    <section id="privacy-section" class="relative z-10 py-32 md:py-40 px-6">
      <div class="max-w-4xl mx-auto">
        <div
          class="transition-all duration-1000 ease-out"
          :class="sectionVisibility.privacy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        >
          <div class="flex items-center gap-4 mb-20">
            <div class="h-px w-8 bg-foreground/30"></div>
            <span class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/60">Privacy Architecture</span>
          </div>

          <div class="mb-16">
            <h2 class="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]">
              We don't store
              <br />your data.
              <br />
              <span class="text-muted-foreground/40">We verify its truth.</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20">
            <p class="text-base text-muted-foreground leading-[1.8]">
              Our verification engine is built on a fundamental principle: sensitive information should never leave your control. We construct cryptographic proofs of validity, confirming identity, ownership, and compliance, without ever exposing the underlying data.
            </p>
            <p class="text-base text-muted-foreground leading-[1.8]">
              No centralized databases. No third-party custodians. No trust assumptions. Just math, verified on-chain, readable by anyone who needs to know, and invisible to everyone who doesn't.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Pillars -->
    <section id="pillars-section" class="relative z-10 py-16 md:py-24 px-6">
      <div
        class="max-w-5xl mx-auto transition-all duration-1000 ease-out"
        :class="sectionVisibility.pillars ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10">
          <div class="bg-background p-8 md:p-10 group hover:bg-foreground/[0.02] transition-colors duration-500">
            <div class="w-10 h-10 border border-foreground/20 rounded-lg flex items-center justify-center mb-6 group-hover:border-foreground/40 transition-colors">
              <span class="text-lg">ZK</span>
            </div>
            <h3 class="text-sm font-black tracking-wide uppercase mb-3">Zero-Knowledge Proofs</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">Verify without revealing. Prove existence without exposing contents.</p>
          </div>
          <div class="bg-background p-8 md:p-10 group hover:bg-foreground/[0.02] transition-colors duration-500">
            <div class="w-10 h-10 border border-foreground/20 rounded-lg flex items-center justify-center mb-6 group-hover:border-foreground/40 transition-colors">
              <span class="text-lg font-mono text-xs">&lt;/&gt;</span>
            </div>
            <h3 class="text-sm font-black tracking-wide uppercase mb-3">Client-Side First</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">All processing happens locally. Your data never touches our servers.</p>
          </div>
          <div class="bg-background p-8 md:p-10 group hover:bg-foreground/[0.02] transition-colors duration-500">
            <div class="w-10 h-10 border border-foreground/20 rounded-lg flex items-center justify-center mb-6 group-hover:border-foreground/40 transition-colors">
              <span class="text-lg">&#x2713;</span>
            </div>
            <h3 class="text-sm font-black tracking-wide uppercase mb-3">Audit-Ready</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">Every verification generates a tamper-proof record. Compliance, built in.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CTA - WAITLIST -->
    <section id="cta-section" class="relative z-10 py-32 md:py-40 px-6">
      <div
        class="max-w-xl mx-auto text-center transition-all duration-1000 ease-out"
        :class="sectionVisibility.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
      >
        <div class="flex items-center justify-center gap-4 mb-16">
          <div class="h-px w-8 bg-foreground/30"></div>
          <span class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/60">Early Access</span>
          <div class="h-px w-8 bg-foreground/30"></div>
        </div>

        <h2 class="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-[1.05]">
          Get early access to the
          <span class="gradient-text">verification engine.</span>
        </h2>

        <p class="text-sm text-muted-foreground mb-10 leading-relaxed">
          Join the inner circle. Be the first to know when we launch, and shape how verification works for RWA.
        </p>

        <div v-if="!success" class="max-w-md mx-auto mb-6">
          <div class="flex flex-col sm:flex-row gap-0 border border-foreground/20 rounded-xl overflow-hidden focus-within:border-foreground/50 transition-colors">
            <input
              v-model="email"
              type="email"
              placeholder="your@email.com"
              class="flex-1 px-5 py-4 bg-transparent text-sm font-mono focus:outline-none placeholder:text-muted-foreground/30"
              @keyup.enter="handleSubmit"
            />
            <button
              @click="handleSubmit"
              :disabled="!isValidEmail || isLoading"
              class="px-6 py-4 bg-foreground text-background text-[11px] font-bold tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed whitespace-nowrap sm:border-l border-foreground/20"
            >
              {{ isLoading ? 'Joining...' : 'Join Waitlist' }}
            </button>
          </div>
        </div>

        <div v-else class="mb-6">
          <div class="inline-flex items-center gap-3 border border-foreground/30 rounded-full px-6 py-3">
            <span class="text-sm">&#x2713;</span>
            <span class="text-sm font-mono">You're on the list. We'll be in touch.</span>
          </div>
        </div>

        <p v-if="error" class="text-xs text-red-500/70 font-mono">{{ error }}</p>

        <p class="text-[9px] font-mono text-muted-foreground/25 tracking-[2px] uppercase mt-10">
          No spam. We respect your inbox like we respect your data.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <div class="relative z-10 py-16 text-center border-t border-foreground/8">
      <RouterLink
        to="/"
        class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/40 hover:text-foreground transition-colors duration-300"
      >
        &#x2190; Back to Formatho
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
@keyframes scroll-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}
.animate-scroll-line {
  animation: scroll-line 2s ease-in-out infinite;
}

@keyframes float-bob {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}
.floating-shape {
  animation: float-bob 8s ease-in-out infinite;
}
.shape-ring-1 { animation-duration: 12s; }
.shape-ring-2 { animation-duration: 10s; animation-delay: -3s; }
.shape-dots { animation-duration: 9s; animation-delay: -5s; }
.shape-cross { animation-duration: 11s; animation-delay: -2s; }
.shape-grid { animation-duration: 14s; animation-delay: -7s; }
</style>
