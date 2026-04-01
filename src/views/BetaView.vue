<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const name = ref('')
const email = ref('')
const role = ref('')
const useCase = ref('')
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async () => {
  if (!name.value || !email.value) return
  
  isSubmitting.value = true
  
  try {
    const response = await fetch('http://localhost:18765/api/beta-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        role: role.value,
        use_case: useCase.value
      })
    })
    
    if (response.ok) {
      isSubmitted.value = true
    } else {
      const data = await response.json()
      alert(data.error || data.message || 'Failed to submit application')
    }
  } catch (error) {
    console.error('Signup failed:', error)
    alert('Failed to submit application. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
          <span class="text-primary text-sm font-medium">🚀 Beta Program</span>
        </div>
        <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Become a Founding Beta Tester
        </h1>
        <p class="text-xl text-slate-400 max-w-2xl mx-auto">
          Agent Orchestrator is looking for 10 early adopters to test our AI agent platform and shape the future of the product.
        </p>
      </div>

      <!-- Benefits Grid -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <Card class="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle class="text-2xl flex items-center gap-3">
              <span class="text-3xl">🎁</span>
              What You'll Get
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4 text-slate-300">
            <div class="flex items-start gap-3">
              <span class="text-green-400 text-xl">✅</span>
              <div>
                <div class="font-semibold text-white">6 months free Pro tier</div>
                <div class="text-sm text-slate-400">$294 value - unlimited agents, pools, API access</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-green-400 text-xl">✅</span>
              <div>
                <div class="font-semibold text-white">Founder-level support</div>
                <div class="text-sm text-slate-400">Direct access via email, Discord, or phone</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-green-400 text-xl">✅</span>
              <div>
                <div class="font-semibold text-white">Shape the product roadmap</div>
                <div class="text-sm text-slate-400">Your feedback directly influences development</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-green-400 text-xl">✅</span>
              <div>
                <div class="font-semibold text-white">"Founding Beta Tester" status</div>
                <div class="text-sm text-slate-400">Permanent badge + website recognition</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle class="text-2xl flex items-center gap-3">
              <span class="text-3xl">🎯</span>
              What We're Looking For
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4 text-slate-300">
            <div class="flex items-start gap-3">
              <span class="text-blue-400 text-xl">👨‍💻</span>
              <div>
                <div class="font-semibold text-white">Developers using AI tools</div>
                <div class="text-sm text-slate-400">Familiar with ChatGPT, Claude, or similar</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-blue-400 text-xl">⏱️</span>
              <div>
                <div class="font-semibold text-white">1-2 hours/week for 2 weeks</div>
                <div class="text-sm text-slate-400">Test features, provide feedback</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-blue-400 text-xl">💬</span>
              <div>
                <div class="font-semibold text-white">Willing to share honest feedback</div>
                <div class="text-sm text-slate-400">Both positive and constructive</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-blue-400 text-xl">🚀</span>
              <div>
                <div class="font-semibold text-white">Early adopter mindset</div>
                <div class="text-sm text-slate-400">Excited about cutting-edge tools</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Signup Form -->
      <Card class="bg-slate-900/50 border-slate-800 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle class="text-3xl text-center">Apply Now</CardTitle>
          <CardDescription class="text-center text-lg">
            Only 10 spots available - Applications close soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="isSubmitted" class="text-center py-8">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold mb-2">Application Received!</h3>
            <p class="text-slate-400">
              We'll review your application and get back to you within 24 hours.
              Check your email for confirmation.
            </p>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2">Name *</label>
              <Input
                v-model="name"
                placeholder="Your name"
                required
                class="bg-slate-800 border-slate-700"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Email *</label>
              <Input
                v-model="email"
                type="email"
                placeholder="you@example.com"
                required
                class="bg-slate-800 border-slate-700"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Role</label>
              <Input
                v-model="role"
                placeholder="e.g., Full-stack developer, DevOps engineer, Founder"
                class="bg-slate-800 border-slate-700"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">What would you use Agent Orchestrator for? (optional)</label>
              <textarea
                v-model="useCase"
                placeholder="e.g., Automating code reviews, content generation, data processing..."
                class="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
            </div>

            <Button aria-label="Explore Formatho beta"
              type="submit"
              :loading="isSubmitting"
              size="lg"
              class="w-full font-semibold py-6 text-lg"
            >
              Apply for Beta Access
            </Button>

            <p class="text-center text-sm text-slate-500">
              By applying, you agree to provide feedback during the beta period.
            </p>
          </form>
        </CardContent>
      </Card>

      <!-- Features Preview -->
      <div class="mt-20">
        <h2 class="text-3xl font-bold text-center mb-10">What You'll Be Testing</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <Card class="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle class="text-xl">🤖 Multiple AI Models</CardTitle>
            </CardHeader>
            <CardContent class="text-slate-400">
              Connect to OpenAI, Anthropic Claude, or run local models with Ollama. Switch between providers seamlessly.
            </CardContent>
          </Card>

          <Card class="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle class="text-xl">🔄 Agent Pools</CardTitle>
            </CardHeader>
            <CardContent class="text-slate-400">
              Run 10+ agents in parallel for maximum productivity. Distribute tasks across specialized AI workers.
            </CardContent>
          </Card>

          <Card class="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle class="text-xl">🔒 Privacy-First</CardTitle>
            </CardHeader>
            <CardContent class="text-slate-400">
              All data stays on your machine. No cloud dependency. Complete control over your AI agents.
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mt-20 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-2">When will I hear back?</h3>
            <p class="text-slate-400">Within 24 hours of applying. We're reviewing applications daily.</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">What happens after I'm accepted?</h3>
            <p class="text-slate-400">You'll receive login credentials, download links, and a quick-start guide. We'll also schedule an optional onboarding call.</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Is there a deadline?</h3>
            <p class="text-slate-400">We're accepting applications until we fill all 10 spots. Apply early to secure your place.</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">What if I'm not selected?</h3>
            <p class="text-slate-400">You'll be added to our waitlist and notified when we open more beta spots or launch publicly.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
