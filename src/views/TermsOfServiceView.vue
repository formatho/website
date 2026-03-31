<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold mb-8">Terms of Service</h1>
      <p class="text-muted-foreground mb-8">Last updated: March 7, 2026</p>

      <div class="glass-card p-8 md:p-12 space-y-8">
        <section>
          <h2 class="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p class="text-muted-foreground leading-relaxed">
            By accessing and using Formatho (formatho.com), you accept and agree to be bound by
            these Terms of Service and our Privacy Policy. If you do not agree to these terms,
            please do not use our services.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">2. Description of Service</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Formatho provides free, privacy-first developer tools that run entirely in your browser.
            Our tools include but are not limited to:
          </p>
          <ul class="list-disc list-inside text-muted-foreground space-y-2">
            <li>JSON/YAML formatters and validators</li>
            <li>Base64 encoders/decoders</li>
            <li>Hash generators (SHA, MD5, etc.)</li>
            <li>JWT decoders</li>
            <li>Unit converters</li>
            <li>Text manipulation tools</li>
            <li>Developer utilities</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">3. Use of Service</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            You agree to use Formatho only for lawful purposes and in accordance with these Terms.
            You agree not to:
          </p>
          <ul class="list-disc list-inside text-muted-foreground space-y-2">
            <li>Use the service for any illegal or unauthorized purpose</li>
            <li>Attempt to probe, scan, or exploit any vulnerabilities in our system</li>
            <li>Use automated systems to overload or abuse our servers</li>
            <li>Transmit any malicious code or harmful content</li>
            <li>Interfere with or disrupt the service or servers</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">4. Privacy and Data Processing</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            All tools on Formatho process data locally in your browser. Your data is never
            transmitted to our servers unless explicitly stated. This means:
          </p>
          <ul class="list-disc list-inside text-muted-foreground space-y-2">
            <li>Your sensitive information remains on your device</li>
            <li>We have no access to the data you process using our tools</li>
            <li>You are responsible for the security of your own data</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">5. Intellectual Property</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Our Content:</strong> The Formatho website, including its original content,
            features, and functionality, is owned by Formatho and is protected by international
            copyright, trademark, and other intellectual property laws.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            <strong>Open Source:</strong> Many of our tools are open source and available on GitHub.
            Open-source components are governed by their respective licenses.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">6. Disclaimer of Warranties</h2>
          <p class="text-muted-foreground leading-relaxed">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
            WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER
            HARMFUL COMPONENTS.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
          <p class="text-muted-foreground leading-relaxed">
            IN NO EVENT SHALL FORMATHO, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR
            AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
            INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE
            THE SERVICE.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">8. Indemnification</h2>
          <p class="text-muted-foreground leading-relaxed">
            You agree to defend, indemnify, and hold harmless Formatho and its licensee and
            licensors, and their employees, contractors, agents, officers, and directors, from and
            against any and all claims, damages, obligations, losses, liabilities, costs or debt,
            and expenses arising from your use of and access to the Service.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">9. Governing Law</h2>
          <p class="text-muted-foreground leading-relaxed">
            These Terms shall be governed and construed in accordance with applicable laws, without
            regard to its conflict of law provisions. Our failure to enforce any right or provision
            of these Terms will not be considered a waiver of those rights.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">10. Changes to Terms</h2>
          <p class="text-muted-foreground leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">11. Contact Us</h2>
          <p class="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us through our
            <RouterLink to="/contact" class="text-gray-900">Contact page</RouterLink
            >.
          </p>
        </section>
      </div>

      <!-- Related Links -->
      <div class="mt-8 flex flex-wrap gap-4">
        <RouterLink
          to="/privacy"
          class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
        >
          Privacy Policy →
        </RouterLink>
        <RouterLink
          to="/about"
          class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
        >
          About Us →
        </RouterLink>
      </div>
    </div>
  </div>
</template>
