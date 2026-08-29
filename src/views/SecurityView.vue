<script setup lang="ts">
import { Shield, Bug, Mail, Clock, CheckCircle2 } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Security - Formatho',
  description: 'Report security vulnerabilities to Formatho. How to disclose responsibly, what is in scope, and our response commitments.',
  keywords: ['formatho security', 'vulnerability disclosure', 'bug bounty', 'security report'],
  ogType: 'website'
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-3 mb-8">
        <div class="p-3 bg-primary/10 rounded-lg">
          <Shield class="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 class="text-4xl font-bold">Security</h1>
          <p class="text-muted-foreground">Responsible disclosure and security practices</p>
        </div>
      </div>

      <div class="glass-card p-8 md:p-12 space-y-8">
        <section>
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <Bug class="w-5 h-5" /> Reporting a Vulnerability
          </h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            We take security seriously. If you discover a vulnerability in Formatho, we
            appreciate responsible disclosure and will make every effort to acknowledge
            and address your report.
          </p>
          <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p class="text-sm font-medium mb-1">Report to:</p>
            <a href="mailto:security@formatho.com" class="text-primary hover:underline font-mono">
              security@formatho.com
            </a>
            <p class="text-sm font-medium mt-3 mb-1">Or use our security.txt (RFC 9116):</p>
            <code class="text-xs font-mono">https://formatho.com/.well-known/security.txt</code>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Scope</h2>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p class="font-medium">In scope</p>
                <ul class="text-sm text-muted-foreground leading-relaxed mt-1 space-y-1">
                  <li>• formatho.com and all subdomains (qa.formatho.com)</li>
                  <li>• XSS, CSRF, SQL injection, SSRF vulnerabilities</li>
                  <li>• Authentication/authorization bypasses</li>
                  <li>• Data exposure (if any tool inadvertently transmits data)</li>
                  <li>• Content Security Policy bypasses</li>
                  <li>• Subdomain takeover</li>
                </ul>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Clock class="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p class="font-medium">Out of scope</p>
                <ul class="text-sm text-muted-foreground leading-relaxed mt-1 space-y-1">
                  <li>• Rate limiting or brute force (report, but low priority)</li>
                  <li>• Reports from automated scanners without PoC</li>
                  <li>• Social engineering attacks</li>
                  <li>• Physical security</li>
                  <li>• DoS/DDoS (do not test)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Our Security Practices</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="practice in [
              { title: 'HTTPS enforced', desc: 'TLS 1.2+ with HSTS preload' },
              { title: 'CSP headers', desc: 'Strict Content-Security-Policy' },
              { title: 'Zero cookies', desc: 'No tracking cookies to hijack' },
              { title: 'Client-side only', desc: 'No server-side data to breach' },
              { title: 'security.txt', desc: 'RFC 9116 disclosure contact' },
              { title: 'Regular updates', desc: 'Dependencies kept current' },
            ]" :key="practice.title" class="p-4 border border-border rounded-lg">
              <p class="font-medium text-sm">{{ practice.title }}</p>
              <p class="text-xs text-muted-foreground mt-1">{{ practice.desc }}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Safe Harbor</h2>
          <p class="text-muted-foreground leading-relaxed">
            We will not pursue legal action against researchers who make a good-faith effort to
            comply with this policy:
          </p>
          <ul class="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1">
            <li>Use only the minimum testing necessary to verify the vulnerability</li>
            <li>Avoid privacy violations, data destruction, and degradation of user experience</li>
            <li>Give us reasonable time to fix the issue before public disclosure</li>
            <li>Do not access, modify, or delete data that does not belong to you</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Response Timeline</h2>
          <div class="space-y-3">
            <div class="flex items-start gap-4">
              <span class="text-sm font-mono font-bold text-primary shrink-0 w-20">24 hrs</span>
              <p class="text-sm text-muted-foreground">Acknowledgment of your report</p>
            </div>
            <div class="flex items-start gap-4">
              <span class="text-sm font-mono font-bold text-primary shrink-0 w-20">72 hrs</span>
              <p class="text-sm text-muted-foreground">Initial assessment and severity classification</p>
            </div>
            <div class="flex items-start gap-4">
              <span class="text-sm font-mono font-bold text-primary shrink-0 w-20">7 days</span>
              <p class="text-sm text-muted-foreground">Fix deployment for critical issues</p>
            </div>
            <div class="flex items-start gap-4">
              <span class="text-sm font-mono font-bold text-primary shrink-0 w-20">30 days</span>
              <p class="text-sm text-muted-foreground">Resolution or documented timeline for complex issues</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Recognition</h2>
          <p class="text-muted-foreground leading-relaxed">
            With your permission, we will acknowledge your contribution (name/handle and link)
            once the vulnerability is fixed. We do not currently offer monetary bounties.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
