<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  FileCode,
  FileJson,
  FileDiff,
  Binary,
  KeyRound,
  Database,
  Fingerprint,
  Type,
  FileType,
  Image,
  Network,
  Calculator,
  Hash,
  ShieldCheck,
  Bot,
  Lock,
  Link,
  Globe,
  Timer,
  Thermometer,
  TextCursor,
  Smile,
  Phone,
  CreditCard,
  Settings,
  Terminal,
  Layers,
  Wifi,
  QrCode,
  Camera,
  Palette,
  Calendar,
  GitBranch,
  Braces,
  Shield,
  Key,
  Binary as BinaryIcon,
  Languages,
  List,
  FileText,
  CaseSensitive,
  Clock,
  Gauge,
  Search,
  Code,
  AppWindow,
  Keyboard
} from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LiveSiteAnalytics from '@/components/LiveSiteAnalytics.vue'

const tools = [
  {
    category: 'Crypto & Security',
    items: [
      {
        name: 'Token Generator',
        description: 'Generate secure random tokens with customizable length and character sets.',
        icon: Key,
        route: '/token-generator'
      },
      {
        name: 'Hash Text',
        description: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes.',
        icon: Hash,
        route: '/hash-text'
      },
      {
        name: 'Bcrypt',
        description: 'Generate and verify Bcrypt password hashes.',
        icon: Lock,
        route: '/bcrypt'
      },
      {
        name: 'UUID Generator',
        description: 'Generate UUIDs (Universally Unique Identifiers). Supports v1, v4, and more.',
        icon: Fingerprint,
        route: '/uuid'
      },
      {
        name: 'ULID Generator',
        description: 'Generate ULIDs (Universally Unique Lexicographically Sortable Identifiers).',
        icon: Fingerprint,
        route: '/ulid-generator'
      },
      {
        name: 'Encrypt/Decrypt',
        description: 'Encrypt and decrypt text using various algorithms.',
        icon: Lock,
        route: '/encryption'
      },
      {
        name: 'BIP39 Passphrase',
        description: 'Generate BIP39 mnemonic phrases for cryptocurrency wallets.',
        icon: ShieldCheck,
        route: '/bip39-generator'
      },
      {
        name: 'HMAC Generator',
        description: 'Generate HMAC hash codes with various algorithms.',
        icon: Hash,
        route: '/hmac-generator'
      },
      {
        name: 'RSA Key Pair',
        description: 'Generate RSA public/private key pairs.',
        icon: KeyRound,
        route: '/rsa-key-pair-generator'
      },
      {
        name: 'Password Strength',
        description: 'Analyze password strength and get improvement suggestions.',
        icon: Shield,
        route: '/password-strength-analyser'
      }
    ]
  },
  {
    category: 'Converters',
    items: [
      {
        name: 'Date-Time Converter',
        description: 'Convert dates and times between different formats and timezones.',
        icon: Calendar,
        route: '/date-time-converter'
      },
      {
        name: 'Integer Base Converter',
        description: 'Convert numbers between binary, octal, decimal, and hexadecimal.',
        icon: BinaryIcon,
        route: '/integer-base-converter'
      },
      {
        name: 'Roman Numerals',
        description: 'Convert between Roman numerals and Arabic numbers.',
        icon: Languages,
        route: '/roman-numeral-converter'
      },
      {
        name: 'Base64 String',
        description: 'Encode and decode Base64 strings instantly.',
        icon: Binary,
        route: '/base64'
      },
      {
        name: 'Base64 File',
        description: 'Convert files to and from Base64 encoding.',
        icon: FileCode,
        route: '/base64-file-converter'
      },
      {
        name: 'Color Converter',
        description: 'Convert colors between HEX, RGB, HSL, and other formats.',
        icon: Palette,
        route: '/color-converter'
      },
      {
        name: 'Case Converter',
        description: 'Convert text between different cases (camelCase, snake_case, etc.).',
        icon: CaseSensitive,
        route: '/case-converter'
      },
      {
        name: 'Text to NATO',
        description: 'Convert text to NATO phonetic alphabet.',
        icon: Languages,
        route: '/text-to-nato-alphabet'
      },
      {
        name: 'Text to Binary',
        description: 'Convert text to binary and vice versa.',
        icon: BinaryIcon,
        route: '/text-to-binary'
      },
      {
        name: 'Text to Unicode',
        description: 'Convert text to Unicode code points and vice versa.',
        icon: Languages,
        route: '/text-to-unicode'
      },
      {
        name: 'JSON <> YAML',
        description: 'Convert JSON to YAML and YAML to JSON instantly.',
        icon: FileJson,
        route: '/json-yaml'
      },
      {
        name: 'JSON <> CSV',
        description: 'Convert JSON to CSV and CSV to JSON format instantly.',
        icon: FileJson,
        route: '/json-csv'
      },
      {
        name: 'List Converter',
        description: 'Convert lists between different formats (array, newline, comma-separated).',
        icon: List,
        route: '/list-converter'
      },
      {
        name: 'Temperature',
        description: 'Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine.',
        icon: Thermometer,
        route: '/temperature-converter'
      },
      {
        name: 'XML <> JSON',
        description: 'Convert between XML and JSON formats.',
        icon: Braces,
        route: '/xml-to-json'
      },
      {
        name: 'Markdown to HTML',
        description: 'Convert Markdown text to HTML.',
        icon: FileCode,
        route: '/markdown-to-html'
      }
    ]
  },
  {
    category: 'Web & Network',
    items: [
      {
        name: 'URL Encoder/Decoder',
        description: 'Encode and decode URL strings.',
        icon: Link,
        route: '/url-encoder'
      },
      {
        name: 'HTML Entities',
        description: 'Encode and decode HTML entities.',
        icon: Code,
        route: '/html-entities'
      },
      {
        name: 'URL Parser',
        description: 'Parse and analyze URLs to extract components.',
        icon: Link,
        route: '/url-parser'
      },
      {
        name: 'Device Information',
        description: 'View your browser and device information.',
        icon: AppWindow,
        route: '/device-information'
      },
      {
        name: 'Basic Auth Generator',
        description: 'Generate HTTP Basic Authentication headers.',
        icon: Lock,
        route: '/basic-auth-generator'
      },
      {
        name: 'Meta Tag Generator',
        description: 'Generate HTML meta tags for SEO.',
        icon: FileCode,
        route: '/meta-tag-generator'
      },
      {
        name: 'OTP Generator',
        description: 'Generate TOTP/HOTP one-time passwords.',
        icon: Key,
        route: '/otp-code-generator'
      },
      {
        name: 'MIME Types',
        description: 'Look up MIME types for file extensions.',
        icon: FileType,
        route: '/mime-types'
      },
      {
        name: 'JWT Debugger',
        description: 'Decode and inspect JWT tokens instantly.',
        icon: KeyRound,
        route: '/jwt'
      },
      {
        name: 'Keycode Info',
        description: 'Find keyboard keycodes for JavaScript events.',
        icon: Keyboard,
        route: '/keycode-info'
      },
      {
        name: 'Slugify',
        description: 'Convert text to URL-friendly slugs.',
        icon: Link,
        route: '/slugify-string'
      },
      {
        name: 'User Agent Parser',
        description: 'Parse and analyze user agent strings.',
        icon: Globe,
        route: '/user-agent-parser'
      },
      {
        name: 'HTTP Status Codes',
        description: 'Reference for HTTP status codes and their meanings.',
        icon: Globe,
        route: '/http-status-codes'
      },
      {
        name: 'JSON Diff',
        description: 'Compare two JSON objects and see differences.',
        icon: FileDiff,
        route: '/json-diff'
      }
    ]
  },
  {
    category: 'Images & Media',
    items: [
      {
        name: 'QR Code Generator',
        description: 'Generate QR codes from text or URLs.',
        icon: QrCode,
        route: '/qr-code-generator'
      },
      {
        name: 'WiFi QR Code',
        description: 'Generate QR codes for WiFi network credentials.',
        icon: Wifi,
        route: '/wifi-qr-code-generator'
      },
      {
        name: 'SVG Placeholder',
        description: 'Generate SVG placeholder images.',
        icon: Image,
        route: '/svg-placeholder-generator'
      },
      {
        name: 'Image Compressor',
        description: 'Compress and optimize images.',
        icon: Image,
        route: '/image'
      },
      {
        name: 'Camera Recorder',
        description: 'Record video from your webcam.',
        icon: Camera,
        route: '/camera-recorder'
      }
    ]
  },
  {
    category: 'Development',
    items: [
      {
        name: 'Git Cheat Sheet',
        description: 'Quick reference for common Git commands.',
        icon: GitBranch,
        route: '/git-memo'
      },
      {
        name: 'Random Port',
        description: 'Generate random port numbers for development.',
        icon: Terminal,
        route: '/random-port-generator'
      },
      {
        name: 'Crontab Generator',
        description: 'Generate cron expressions with a visual builder.',
        icon: Clock,
        route: '/crontab-generator'
      },
      {
        name: 'JSON Viewer',
        description: 'Format and visualize JSON data.',
        icon: Braces,
        route: '/json-viewer'
      },
      {
        name: 'JSON Minify',
        description: 'Minify JSON to reduce size.',
        icon: Braces,
        route: '/json-minify'
      },
      {
        name: 'SQL Formatter',
        description: 'Format and beautify SQL queries.',
        icon: Database,
        route: '/sql'
      },
      {
        name: 'Chmod Calculator',
        description: 'Calculate Unix file permissions.',
        icon: Settings,
        route: '/chmod-calculator'
      },
      {
        name: 'Docker to Compose',
        description: 'Convert docker run commands to docker-compose.',
        icon: Layers,
        route: '/docker-run-to-docker-compose-converter'
      },
      {
        name: 'XML Formatter',
        description: 'Format and prettify XML documents.',
        icon: FileCode,
        route: '/xml-formatter'
      },
      {
        name: 'YAML Viewer',
        description: 'Format and validate YAML documents.',
        icon: FileText,
        route: '/yaml-viewer'
      },
      {
        name: 'Regex Tester',
        description: 'Test and debug regular expressions.',
        icon: Search,
        route: '/regex-tester'
      }
    ]
  },
  {
    category: 'Network Tools',
    items: [
      {
        name: 'IPv4 Subnet Calculator',
        description: 'Calculate IPv4 subnets, network ranges, and available hosts.',
        icon: Network,
        route: '/ipv4-subnet-calculator'
      },
      {
        name: 'IPv4 Address Converter',
        description: 'Convert IPv4 addresses between formats.',
        icon: Network,
        route: '/ipv4-address-converter'
      },
      {
        name: 'IPv4 Range Expander',
        description: 'Expand IPv4 address ranges into individual IPs.',
        icon: Network,
        route: '/ipv4-range-expander'
      },
      {
        name: 'MAC Address Lookup',
        description: 'Look up MAC address vendor information.',
        icon: Network,
        route: '/mac-address-lookup'
      },
      {
        name: 'MAC Address Generator',
        description: 'Generate random MAC addresses.',
        icon: Network,
        route: '/mac-address-generator'
      },
      {
        name: 'IPv6 ULA Generator',
        description: 'Generate IPv6 Unique Local Addresses.',
        icon: Network,
        route: '/ipv6-ula-generator'
      }
    ]
  },
  {
    category: 'Math & Calculators',
    items: [
      {
        name: 'Math Evaluator',
        description: 'Evaluate mathematical expressions.',
        icon: Calculator,
        route: '/math-evaluator'
      },
      {
        name: 'ETA Calculator',
        description: 'Calculate estimated time of arrival.',
        icon: Timer,
        route: '/eta-calculator'
      },
      {
        name: 'Percentage Calculator',
        description: 'Calculate percentages, increases, and decreases.',
        icon: Calculator,
        route: '/percentage-calculator'
      }
    ]
  },
  {
    category: 'Measurement',
    items: [
      {
        name: 'Chronometer',
        description: 'Stopwatch and timer tool.',
        icon: Timer,
        route: '/chronometer'
      },
      {
        name: 'Benchmark Builder',
        description: 'Build and run code benchmarks.',
        icon: Gauge,
        route: '/benchmark-builder'
      }
    ]
  },
  {
    category: 'Text Tools',
    items: [
      {
        name: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text for designs.',
        icon: Type,
        route: '/lorem'
      },
      {
        name: 'Markdown Editor',
        description: 'Edit and preview Markdown files in real-time.',
        icon: FileCode,
        route: '/markdown'
      },
      {
        name: 'Diff Checker',
        description: 'Compare two texts and see the differences.',
        icon: FileDiff,
        route: '/diff'
      },
      {
        name: 'Text Statistics',
        description: 'Count characters, words, sentences, and paragraphs.',
        icon: TextCursor,
        route: '/text-statistics'
      },
      {
        name: 'Emoji Picker',
        description: 'Browse and copy emojis.',
        icon: Smile,
        route: '/emoji-picker'
      },
      {
        name: 'String Obfuscator',
        description: 'Obfuscate strings to hide sensitive data.',
        icon: Lock,
        route: '/string-obfuscator'
      },
      {
        name: 'Numeronym Generator',
        description: 'Generate numeronyms (i18n, k8s, a11y, etc.).',
        icon: TextCursor,
        route: '/numeronym-generator'
      },
      {
        name: 'ASCII Art',
        description: 'Convert text to ASCII art.',
        icon: Type,
        route: '/ascii-text-drawer'
      }
    ]
  },
  {
    category: 'Data Validation',
    items: [
      {
        name: 'Phone Parser',
        description: 'Parse and format phone numbers.',
        icon: Phone,
        route: '/phone-parser'
      },
      {
        name: 'IBAN Validator',
        description: 'Validate and parse International Bank Account Numbers.',
        icon: CreditCard,
        route: '/iban-validator'
      },
      {
        name: 'JSON Linter',
        description: 'Validate and lint JSON code.',
        icon: FileJson,
        route: '/json-lint'
      },
      {
        name: 'YAML Linter',
        description: 'Validate and lint YAML code.',
        icon: FileType,
        route: '/yaml-lint'
      }
    ]
  },
  {
    category: 'Blockchain',
    items: [
      {
        name: 'EVM Unit Converter',
        description: 'Convert between Wei, Gwei, and Ether.',
        icon: Calculator,
        route: '/evm-converter'
      },
      {
        name: 'Keccak-256 Hasher',
        description: 'Generate Keccak-256 hashes for Ethereum.',
        icon: Hash,
        route: '/keccak256'
      },
      {
        name: 'Address Checksum',
        description: 'Validate Ethereum addresses (EIP-55).',
        icon: ShieldCheck,
        route: '/address-checksum'
      },
      {
        name: 'Multi-Chain Keys',
        description: 'Generate keys for multiple blockchains from one mnemonic.',
        icon: KeyRound,
        route: '/multi-chain-keys'
      },
      {
        name: 'Address from Key',
        description: 'Derive addresses from private keys.',
        icon: KeyRound,
        route: '/address-from-key'
      },
      {
        name: 'Solidity to Opcodes',
        description: 'Compile Solidity to EVM opcodes.',
        icon: FileCode,
        route: '/solidity-to-opcodes'
      }
    ]
  },
  {
    category: 'Artificial Intelligence',
    items: [
      {
        name: 'Agent Orchestrator',
        description: 'Spin up AI workers with text. Manage AI agents locally.',
        icon: Bot,
        route: '/agent-orchestrator'
      },
      {
        name: 'Agent Identity Generator',
        description: 'Generate ERC-8004 compliant metadata for AI Agents.',
        icon: Bot,
        route: '/agent-identity'
      }
    ]
  }
]
</script>

<template>
  <div class="flex flex-col h-full overflow-y-auto bg-background">
    <!-- Hero Section -->
    <section
      class="border-b border-border bg-gradient-to-b from-muted/20 via-muted/10 to-background"
    >
      <div class="container mx-auto px-6 py-20 md:py-28">
        <div class="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div class="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Formatho"
              class="h-20 w-20 md:h-24 md:w-24 rounded-xl shadow-lg"
            />
            <h1
              class="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
            >
              Formatho
            </h1>
          </div>
          <p class="text-2xl md:text-3xl font-semibold text-foreground max-w-3xl leading-tight">
            The Privacy-First Online Text & Developer Utility Toolkit
          </p>
          <p class="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Fast, secure, privacy-first collection of 100+ online text formatting tools, developer
            utilities, and content productivity tools — built to solve everyday formatting,
            conversion, and debugging problems directly in your browser.
          </p>
          <div class="flex flex-wrap gap-3 justify-center mt-2">
            <span
              class="px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
            >
              No sign-up
            </span>
            <span
              class="px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
            >
              No uploads
            </span>
            <span
              class="px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
            >
              No tracking
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section class="container mx-auto px-6 py-12 md:py-16">
      <div class="space-y-16">
        <div v-for="category in tools" :key="category.category" class="space-y-6">
          <div class="flex items-center gap-3">
            <h2 class="text-3xl font-bold tracking-tight">{{ category.category }}</h2>
            <div class="flex-1 h-px bg-border"></div>
            <span class="text-sm text-muted-foreground font-medium">
              {{ category.items.length }} {{ category.items.length === 1 ? 'tool' : 'tools' }}
            </span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RouterLink
              v-for="tool in category.items"
              :key="tool.name"
              :to="tool.route"
              class="group"
            >
              <Card
                class="h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 hover:-translate-y-1 cursor-pointer border-2"
              >
                <CardHeader>
                  <div class="flex items-start gap-4">
                    <div
                      class="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    >
                      <component :is="tool.icon" class="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <CardTitle
                        class="group-hover:text-primary transition-colors text-lg leading-tight"
                      >
                        {{ tool.name }}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription class="leading-relaxed">{{ tool.description }}</CardDescription>
                </CardContent>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Analytics Widget -->
    <LiveSiteAnalytics />
  </div>
</template>
