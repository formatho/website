<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold mb-8">Privacy Policy</h1>
      <p class="text-muted-foreground mb-8">Last updated: March 7, 2026</p>

      <div class="glass-card p-8 md:p-12 space-y-8">
        <section>
          <h2 class="text-2xl font-bold mb-4">Introduction</h2>
          <p class="text-muted-foreground leading-relaxed">
            Welcome to Formatho. We are committed to protecting your privacy and ensuring the
            security of your data. This Privacy Policy explains how we collect, use, and safeguard
            information when you use our website and services at formatho.com.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Information We Collect</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Client-Side Processing:</strong> The core principle of Formatho is that all data
            processing happens locally in your browser. When you use our tools (JSON formatters,
            Base64 encoders, hash generators, etc.), your data is processed entirely on your device
            and is never transmitted to our servers.
          </p>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Analytics Data:</strong> We use Google Analytics to collect anonymous usage
            statistics such as page views, browser types, and general geographic data. This helps us
            improve our services and understand how users interact with our website.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            <strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance
            your browsing experience and analyze site traffic. You can control cookie preferences
            through your browser settings.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <ul class="list-disc list-inside text-muted-foreground space-y-2">
            <li>To provide, maintain, and improve our services</li>
            <li>To analyze usage patterns and optimize user experience</li>
            <li>To detect and prevent technical issues</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Data Security</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Since all data processing occurs locally in your browser, your sensitive information
            (API keys, passwords, configuration files, etc.) never leaves your device. This
            architecture inherently provides a high level of security and privacy.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            We implement industry-standard security measures to protect our website infrastructure,
            including SSL/TLS encryption and regular security audits.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Third-Party Services</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors
            interact with our website. Google Analytics may collect information about your use of
            our website. For more information, see
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-900"
              >Google's Privacy Policy</a
            >.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            <strong>Google AdSense:</strong> We may display advertisements through Google AdSense,
            which uses cookies to serve ads based on your prior visits to our website or other
            websites. You can opt out of personalized advertising by visiting
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-900"
              >Google Ads Settings</a
            >.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Your Rights</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Depending on your location, you may have the following rights:
          </p>
          <ul class="list-disc list-inside text-muted-foreground space-y-2">
            <li><strong>Access:</strong> Request information about data we collect about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> Request deletion of your data</li>
            <li>
              <strong>Opt-Out:</strong> Opt out of analytics tracking and personalized advertising
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Children's Privacy</h2>
          <p class="text-muted-foreground leading-relaxed">
            Our services are not intended for children under 13 years of age. We do not knowingly
            collect personal information from children under 13. If you believe we have collected
            information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Changes to This Policy</h2>
          <p class="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
          <p class="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us through our
            <RouterLink to="/contact" class="text-gray-900">Contact page</RouterLink>
            or visit our
            <RouterLink to="/about" class="text-gray-900">About page</RouterLink> for
            more information.
          </p>
        </section>
      </div>

      <!-- Related Links -->
      <div class="mt-8 flex flex-wrap gap-4">
        <RouterLink
          to="/terms"
          class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
        >
          Terms of Service →
        </RouterLink>
        <RouterLink
          to="/contact"
          class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
        >
          Contact Us →
        </RouterLink>
      </div>
    </div>
  </div>
</template>
