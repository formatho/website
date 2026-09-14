<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Privacy Policy - Formatho',
  description: 'Formatho privacy policy: all tool processing happens in your browser and tool inputs are never uploaded. The site is funded by Google AdSense — see how ads, cookies, and consent work.',
  keywords: ['formatho privacy policy', 'adsense cookies', 'cookie consent', 'client-side processing', 'gdpr'],
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
            Everything you type into a Formatho tool stays in your browser — nothing you paste, upload, or
            generate is sent to our servers. Our analytics stack is Umami (cookieless) plus Google Analytics 4,
            which sets cookies for measurement — denied by default in the EEA, UK, and Switzerland until you
            consent via the Google-certified Funding Choices banner. The site is funded by advertising served
            through Google AdSense: third parties including Google may place cookies or use similar
            technologies for ad purposes as described below.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Information We Collect</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Tool inputs and outputs:</strong> Never collected. When you use any Formatho tool —
            JSON formatter, JWT decoder, vanity address generator, hash tool — the processing happens
            entirely in your browser using JavaScript. Nothing you paste, type, or generate is
            transmitted to us or any third party by the tool itself.
          </p>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Analytics — Umami (cookieless):</strong> records anonymous, aggregated page views and
            events (which pages are visited, which tools are used). No cookies, no personal data, no
            cross-site tracking, no profiling.
            <br><br>
            <strong>Analytics — Google Analytics 4 (G-516615571):</strong> sets first-party cookies
            (<code class="text-xs">_ga</code>, <code class="text-xs">_ga_*</code>) to distinguish visitors and
            sessions, and reports page views, referrers, and interaction events to Google. It is loaded with
            Google Consent Mode v2: in the <strong>EEA, UK, and Switzerland</strong> these cookies are not set
            or used until you grant analytics consent in the banner; elsewhere they are active by default.
            You can opt out with Google's
            <a href="https://tools.google.com/dlpage/gaoptout" class="text-primary hover:underline" rel="noopener noreferrer">browser add-on</a>.
          </p>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Advertising:</strong> We display ads through Google AdSense. As a result, third-party
            vendors, including Google, may place and read cookies in your browser, and may use web
            beacons, browser local storage, and your IP address to serve ads based on your prior visits
            to this or other websites. Google's use of advertising cookies enables it and its partners to
            serve ads to you based on your visit to our site and/or other sites on the internet. You can
            opt out of personalised advertising by visiting
            <a href="https://www.google.com/settings/ads" class="text-primary hover:underline" rel="noopener noreferrer">Google Ads Settings</a>,
            and you can learn more at
            <a href="https://policies.google.com/technologies/partner-sites" class="text-primary hover:underline font-medium" rel="noopener noreferrer">How Google uses data when you use our partners' sites or apps</a>.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            <strong>Email newsletter (optional):</strong> If you voluntarily subscribe to our newsletter,
            we store your email address to send you updates. You can unsubscribe at any time. Apart from
            what ad and analytics vendors process as described above, this is the only personal data we
            collect, and only if you explicitly provide it.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Cookies and Consent</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Formatho itself sets no cookies for its own purposes, and tool functionality never requires
            cookies. However, advertising and measurement vendors do use cookies and similar
            technologies under the <strong>ePrivacy/GDPR consent regime</strong>:
          </p>
          <ul class="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-4">
            <li><strong>Google advertising cookies</strong> you may receive include <code class="text-xs">__gads</code>,
              <code class="text-xs">__gpi</code>, and <code class="text-xs">__goli</code> (Google Ads / AdSense),
              the <code class="text-xs">IDE</code> and <code class="text-xs">test_cookie</code> cookies
              (doubleclick.net), and consent records stored by Funding Choices such as
              <code class="text-xs">OTAdditionalConsentString</code> and entries under
              <code class="text-xs">fundingchoicesmessages.google.com</code>. Local storage and web beacons
              may be used for the same purposes.</li>
            <li>Visitors in the <strong>European Economic Area, the United Kingdom, and Switzerland</strong> see a
              consent banner powered by <strong>Google Funding Choices</strong>, a Google-certified consent
              management platform, <strong>before personalised ads are served</strong>. Your decision
              (personalised advertising, measurement, and legitimate-interest purposes) is recorded
              with a timestamp and passed to Google's ad tags on every request.</li>
          </ul>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Withdrawing or changing consent:</strong> reopen the banner any time via the
            "Privacy" / "Manage cookies" link it leaves on the page, or clear the cookies above in your
            browser settings — the banner reappears on your next visit. You can additionally opt out of
            personalised advertising at
            <a href="https://www.google.com/settings/ads" class="text-primary hover:underline" rel="noopener noreferrer">Google Ads Settings</a>
            and <a href="https://optout.aboutads.info/" class="text-primary hover:underline" rel="noopener noreferrer">optout.aboutads.info</a>.
            Where consent is not given, Google serves non-personalised ads or, where even that requires
            consent, no ads at all.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            Full details of the technologies involved are in Google's disclosure:
            <a href="https://policies.google.com/technologies/partner-sites" class="text-primary hover:underline" rel="noopener noreferrer">How Google uses data when you use our partners' sites or apps</a>.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Local Storage</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            We use browser localStorage and sessionStorage to remember UI preferences — for example,
            that you dismissed a popup, saved contract reader tabs, or muted audio. This data:
          </p>
          <ul class="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
            <li>Never leaves your device (Formatho's own storage)</li>
            <li>Is not transmitted to any server by us</li>
            <li>Cannot track you across websites</li>
            <li>Is cleared when you clear your browser data</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Third-Party Services</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Google AdSense (pagead2.googlesyndication.com, fundingchoicesmessages.google.com):</strong>
            Serves advertising and the consent banner. Google may place and read cookies and use web
            beacons and IP addresses as described in the
            <a href="https://policies.google.com/technologies/partner-sites" class="text-primary hover:underline" rel="noopener noreferrer">Google partner-sites disclosure</a>.
            See <a href="https://policies.google.com/technologies/ads" class="text-primary hover:underline" rel="noopener noreferrer">How Google uses cookies in advertising</a> for the full list of technologies.
          </p>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Umami Analytics (cloud.umami.is):</strong> Cookieless analytics. Receives anonymous
            page view and event data. No cookies, no personal data, no cross-site tracking.
          </p>
          <p class="text-muted-foreground leading-relaxed mb-4">
            <strong>Google Analytics (www.googletagmanager.com, *.google-analytics.com):</strong> Measurement
            cookies and reporting as described in the analytics section above; consent-gated in the
            EEA/UK/Switzerland via the banner. See Google's
            <a href="https://policies.google.com/technologies/partner-sites" class="text-primary hover:underline" rel="noopener noreferrer">partner-sites disclosure</a>.
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
            personal data:
          </p>
          <ul class="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
            <li><strong>Right to access:</strong> We hold personal data about you only if you subscribed to the newsletter — contact us for that. For data held by advertising vendors, use the vendor controls linked below.</li>
            <li><strong>Right to deletion:</strong> Clear your browser's cookies and localStorage — that removes all Formatho and ad-vendor identifiers from your device. Newsletter subscribers can email us to be deleted.</li>
            <li><strong>Right to opt out of targeted advertising:</strong> Visit
              <a href="https://www.google.com/settings/ads" class="text-primary hover:underline" rel="noopener noreferrer">Google Ads Settings</a>
              or <a href="https://optout.aboutads.info/" class="text-primary hover:underline" rel="noopener noreferrer">optout.aboutads.info</a>
              (DAA), and change your cookie choices any time via the consent banner's "Privacy" link.</li>
            <li><strong>Right to opt out of analytics:</strong> Block cloud.umami.is in your content blocker — analytics stops with no effect on functionality.</li>
            <li><strong>Data portability:</strong> Your tool inputs and outputs already belong to you — they never left your device.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Children's Privacy</h2>
          <p class="text-muted-foreground leading-relaxed">
            Formatho is not directed at children under 13. We do not knowingly collect personal
            information from children. Ad serving on this site is configured with Google's protections,
            and personalised ads are not served to users in jurisdictions where consent cannot be
            lawfully obtained.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Security</h2>
          <p class="text-muted-foreground leading-relaxed">
            All traffic to formatho.com is encrypted via HTTPS (TLS 1.2+). We enforce HSTS, CSP,
            and other security headers. We do not store your tool data, so there is nothing of yours
            to breach. If you find a security issue, see our <RouterLink to="/security" class="text-primary hover:underline">security page</RouterLink>.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Changes to This Policy</h2>
          <p class="text-muted-foreground leading-relaxed">
            We may update this policy to reflect changes in our practices. Any changes will be
            posted on this page with an updated date. If we add or remove advertising, analytics, or
            cookie-setting technologies, we will update this policy and the consent experience before
            doing so.
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
