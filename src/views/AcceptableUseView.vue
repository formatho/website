<script setup lang="ts">
import { AlertTriangle, Ban, CheckCircle2 } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Acceptable Use Policy - Formatho',
  description: 'Acceptable use policy for Formatho tools. What is and is not permitted when using our free developer tools.',
  keywords: ['formatho acceptable use', 'terms of use', 'usage policy'],
  ogType: 'website'
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-3 mb-8">
        <div class="p-3 bg-primary/10 rounded-lg">
          <AlertTriangle class="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 class="text-4xl font-bold">Acceptable Use Policy</h1>
          <p class="text-muted-foreground">What you can and cannot do with Formatho</p>
        </div>
      </div>

      <div class="glass-card p-8 md:p-12 space-y-8">
        <section>
          <h2 class="text-2xl font-bold mb-4">Permitted Use</h2>
          <div class="space-y-3">
            <div v-for="use in [
              'Using any tool for legitimate development, testing, or educational purposes',
              'Using security tools (headers analyzer, CSP evaluator) to audit your own websites',
              'Using crypto tools (hash generator, JWT decoder) to debug your own applications',
              'Using blockchain tools to interact with contracts you own or have permission to read',
              'Using the vanity address generator to create addresses for your own wallets',
              'Sharing links to Formatho tools in documentation, blog posts, or forums',
              'Using tools for CTF challenges and security research with proper authorization',
            ]" :key="use" class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <p class="text-sm text-muted-foreground leading-relaxed">{{ use }}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Prohibited Use</h2>
          <div class="space-y-3">
            <div v-for="prohibition in [
              'Attacking, probing, or scanning websites you do not own or have written authorization to test',
              'Using security tools to exploit vulnerabilities in third-party systems',
              'Generating cryptocurrency addresses for phishing, fraud, or theft',
              'Using the string obfuscator or encoding tools to evade spam filters or security controls maliciously',
              'Attempting to identify private keys, seed phrases, or wallet addresses belonging to others',
              'Using tools to create or distribute malware',
              'Scraping, rate-limit abuse, or attempting to overload our infrastructure',
              'Using tools in violation of applicable laws including CFAA, GDPR, or local computer crime statutes',
            ]" :key="prohibition" class="flex items-start gap-3">
              <Ban class="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              <p class="text-sm text-muted-foreground leading-relaxed">{{ prohibition }}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Crypto and Blockchain Tools</h2>
          <div class="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p class="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              <strong>Important:</strong> Formatho blockchain tools (vanity address generator,
              wallet generator, multi-chain keys) generate cryptographic keys in your browser.
              These tools are for development, testing, and education. For wallets holding
              real funds, always use a hardware wallet or air-gapped device. We are not
              responsible for lost funds resulting from keys generated on this site.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Security Tools</h2>
          <div class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p class="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
              <strong>Authorization required:</strong> Security tools (headers analyzer, CSP
              evaluator, CORS tester) must only be used against systems you own or have
              explicit written authorization to test. Unauthorized security testing is illegal
              under the Computer Fraud and Abuse Act (CFAA) and similar laws worldwide.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Consequences of Violation</h2>
          <p class="text-muted-foreground leading-relaxed">
            If we detect abuse of Formatho tools for malicious purposes, we may:
          </p>
          <ul class="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1">
            <li>Block your IP address or network range</li>
            <li>Report illegal activity to relevant authorities</li>
            <li>Cooperate with law enforcement investigations</li>
            <li>Modify or restrict tools that are being abused</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">No Warranty</h2>
          <p class="text-muted-foreground leading-relaxed">
            Formatho tools are provided "as is" without warranty of any kind. We make no
            guarantees about accuracy, security, or fitness for a particular purpose. Use
            at your own risk. See our <RouterLink to="/terms" class="text-primary hover:underline">Terms of Service</RouterLink>
            for full details.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Contact</h2>
          <p class="text-muted-foreground leading-relaxed">
            Questions about acceptable use?
            <a href="mailto:abuse@formatho.com" class="text-primary hover:underline">abuse@formatho.com</a>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
