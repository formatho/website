// Funnel definitions: chained tool flows where one tool's output feeds the next.
// Add a funnel here and it appears at /funnels — no other registration needed.

export interface FunnelStep {
  toolRoute: string
  toolName: string
  title: string
  input: string
  output: string
  minutes?: number
}

export interface Funnel {
  slug: string
  name: string
  tagline: string
  audience: string
  seoDescription: string
  keywords: string[]
  steps: FunnelStep[]
}

export const funnels: Funnel[] = [
  {
    slug: 'eu-product-passport',
    name: 'EU Product Passport',
    tagline: 'From barcode to a Digital Product Passport QR you can print on packaging.',
    audience: 'Exporters shipping to the EU (textile, electronics, batteries, tyres)',
    seoDescription:
      'Chain free tools into one workflow: validate your GTIN, turn it into a GS1 Digital Link, score DPP readiness, draft the passport and generate the QR code — the full EU Digital Product Passport pipeline, client-side.',
    keywords: ['digital product passport workflow', 'gtin to qr', 'gs1 digital link dpp', 'eu export pipeline', 'dpp funnel'],
    steps: [
      {
        toolRoute: '/tools/gtin-validator',
        toolName: 'GTIN Validator',
        title: 'Validate your product identifier',
        input: 'The barcode number on your packaging (GTIN/EAN/UPC)',
        output: 'A verified GTIN with the check digit confirmed and the issuing GS1 country decoded',
        minutes: 1,
      },
      {
        toolRoute: '/tools/gs1-digital-link',
        toolName: 'GS1 Digital Link Builder',
        title: 'Turn the GTIN into a web-resolvable link',
        input: 'The validated GTIN (optionally lot, serial, expiry)',
        output: 'A standards-compliant GS1 Digital Link URI — the exact identifier format the EU DPP QR encodes',
        minutes: 2,
      },
      {
        toolRoute: '/tools/dpp-readiness',
        toolName: 'DPP Readiness Score',
        title: 'Score what you already have',
        input: 'Your product and the documents in your files today',
        output: 'A 0-100 readiness score plus the shortlist of gaps that cost the most points',
        minutes: 3,
      },
      {
        toolRoute: '/tools/dpp-playground',
        toolName: 'DPP Playground',
        title: 'Draft the passport',
        input: 'Your industry, the score gaps and the documents you hold',
        output: 'A structured draft passport (JSON) with a field-by-field gap analysis',
        minutes: 5,
      },
      {
        toolRoute: '/tools/qr-code-generator',
        toolName: 'QR Code Generator',
        title: 'Put it on the packaging',
        input: 'The GS1 Digital Link URL (resolving to your passport landing page)',
        output: 'A printable QR code that opens the product data when scanned',
        minutes: 1,
      },
    ],
  },
  {
    slug: 'email-auth-hardening',
    name: 'Email Auth Hardening',
    tagline: 'Stop your domain being used for spoofing and phishing — SPF, then DMARC.',
    audience: 'Anyone sending business email (especially from a custom domain)',
    seoDescription:
      'The SPF to DMARC workflow: analyze your SPF record against the 10-lookup limit, then parse and grade your DMARC policy — two chained tools that take a domain from spoofable to protected.',
    keywords: ['spf dmarc workflow', 'email authentication setup', 'spf to dmarc', 'domain spoofing fix'],
    steps: [
      {
        toolRoute: '/tools/spf-analyzer',
        toolName: 'SPF Record Analyzer',
        title: 'Audit who can send as your domain',
        input: 'Your domain (fetched via DNS) or a pasted v=spf1 record',
        output: 'A mechanism breakdown, the DNS lookup count against the 10 limit, and concrete fixes',
        minutes: 2,
      },
      {
        toolRoute: '/tools/dmarc-parser',
        toolName: 'DMARC Record Parser',
        title: 'Check the policy that ties it together',
        input: 'Your _dmarc TXT record (fetched by domain) — after SPF issues are fixed',
        output: 'An A-F policy grade, every tag validated against RFC 7489, and rollout warnings (p=none, pct, rua)',
        minutes: 2,
      },
    ],
  },
]
