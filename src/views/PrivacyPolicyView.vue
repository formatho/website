<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Privacy Policy - Formatho',
  description: 'Formatho privacy policy: zero cookies, zero tracking, all processing in your browser. No personal data collected.',
  keywords: ['formatho privacy policy', 'zero tracking', 'cookieless analytics', 'client-side processing'],
  ogType: 'website'
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold mb-8">Privacy Policy</h1>
      <p class="text-muted-foreground mb-8">Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>

      <div class="glass-card p-8 md:p-12 space-y-8">
        <section>
          <h2 class="text-2xl font-bold mb-4">The Short Version</h2>
          <p class="text-muted-foreground leading-relaxed">
            Formatho sets zero cookies. We run zero ads. All tool processing happens in your browser —
            your data (JSON, tokens, keys, hashes) never touches our servers. We use Umami Analytics,
            which is cookieless and collects no personal data. That's the whole policy.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Information We Collect</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Tool inputs and outputs:</strong> Never collected. When you use any Formatho tool —
            JSON formatter, JWT decoder, vanity address generator, hash tool — the processing happens
            entirely in your browser using JavaScript. Nothing you paste, type, or generate is
            transmitted to us or any third party.
          </p>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Analytics:</strong> We use <a href="https://umami.is" class="text-primary hover:underline" rel="noopener noreferrer">Umami Analytics</a>,
            a privacy-first analytics platform that does not use cookies and does not collect personal
            data. Umami records anonymous, aggregated page views and events (which pages are visited,
            which tools are used). It cannot identify you, track you across sites, or build a profile
            of your behavior.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            <strong>Email newsletter (optional):</strong> If you voluntarily subscribe to our newsletter,
            we store your email address to send you updates. You can unsubscribe at any time. This is
            the only personal data we ever collect, and only if you explicitly provide it.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Cookies</h2>
          <p class="text-muted-foreground leading-relaxed">
            Formatho sets <strong>zero cookies</strong>. We do not use Google Analytics, ad networks,
            social media pixels, or any other tracking technology that sets cookies. No cookie consent
            banner is needed because there is nothing to consent to.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Local Storage</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            We use browser localStorage and sessionStorage to remember UI preferences — for example,
            that you dismissed a popup, saved contract reader tabs, or muted audio. This data:
          </p>
          <ul class="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
            <li>Never leaves your device</li>
            <li>Is not transmitted to any server</li>
            <li>Cannot track you across websites</li>
            <li>Is cleared when you clear your browser data</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Third-Party Services</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Umami Analytics (cloud.umami.is):</strong> Cookieless analytics. Receives anonymous
            page view and event data. No cookies, no personal data, no cross-site tracking.
          </p>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Content Delivery:</strong> Our site is served via standard web infrastructure
            (Cloudflare CDN, web servers). These services see your IP address as part of delivering
            the page — standard for every website — but we do not use this for tracking.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            <strong>Fonts (fonts.googleapis.com):</strong> We load web fonts from Google Fonts. Google
            may see your IP address as part of this request. If this concerns you, a content blocker
            will prevent it without affecting site functionality.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Your Rights (GDPR / CCPA)</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Under GDPR and CCPA, you have the right to access, correct, delete, and export your
            personal data. Because we collect almost no personal data:
          </p>
          <ul class="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
            <li><strong>Right to access:</strong> We have no personal data about you (unless you subscribed to the newsletter — contact us for that)</li>
            <li><strong>Right to deletion:</strong> Clear your browser's localStorage — that removes all Formatho data from your device</li>
            <li><strong>Right to opt out:</strong> Block cloud.umami.is in your content blocker — analytics stops with no effect on functionality</li>
            <li><strong>Data portability:</strong> No data to port — your tool inputs and outputs already belong to you</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Children's Privacy</h2>
          <p class="text-muted-foreground leading-relaxed">
            Formatho is not directed at children under 13. We do not knowingly collect personal
            information from children. Since we collect almost no data from anyone, this is
            straightforwardly true.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Security</h2>
          <p class="text-muted-foreground leading-relaxed">
            All traffic to formatho.com is encrypted via HTTPS (TLS 1.2+). We enforce HSTS, CSP,
            and other security headers. Since we do not store your data, there is nothing to breach.
            If you find a security issue, see our <RouterLink to="/security" class="text-primary hover:underline">security page</RouterLink>.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Changes to This Policy</h2>
          <p class="text-muted-foreground leading-relaxed">
            We may update this policy to reflect changes in our practices. Any changes will be
            posted on this page with an updated date. If we ever add a technology that sets cookies
            or collects personal data, we will update this policy and add appropriate consent
            mechanisms before doing so.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Contact</h2>
          <p class="text-muted-foreground leading-relaxed">
            Questions about privacy? Email us at
            <a href="mailto:privacy@formatho.com" class="text-primary hover:underline">privacy@formatho.com</a>
            or visit our <RouterLink to="/contact" class="text-primary hover:underline">contact page</RouterLink>.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
