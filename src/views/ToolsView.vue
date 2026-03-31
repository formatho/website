<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Breadcrumb from '@/components/Breadcrumb.vue'

interface Tool {
  name: string
  path: string
  description: string
  category: string
  icon: string
}

const tools: Tool[] = [
  // Text & String Tools
  {
    name: 'UUID Generator',
    path: '/uuid',
    description: 'Generate UUIDs (v1, v4, and more)',
    category: 'Text & String',
    icon: '🔑'
  },
  {
    name: 'Lorem Ipsum Generator',
    path: '/lorem',
    description: 'Generate placeholder text',
    category: 'Text & String',
    icon: '📝'
  },
  {
    name: 'Case Converter',
    path: '/case-converter',
    description: 'Convert text case formats',
    category: 'Text & String',
    icon: '🔤'
  },
  {
    name: 'Text Statistics',
    path: '/text-statistics',
    description: 'Analyze text statistics',
    category: 'Text & String',
    icon: '📊'
  },
  {
    name: 'Text to Binary',
    path: '/text-to-binary',
    description: 'Convert text to binary and back',
    category: 'Text & String',
    icon: '🔢'
  },
  {
    name: 'List Converter',
    path: '/list-converter',
    description: 'Convert list formats',
    category: 'Text & String',
    icon: '📋'
  },
  {
    name: 'Numeronym Generator',
    path: '/numeronym-generator',
    description: 'Generate numeronyms (i18n, a11y)',
    category: 'Text & String',
    icon: '🔢'
  },
  {
    name: 'Sluginator',
    path: '/sluginator',
    description: 'Generate URL-friendly slugs',
    category: 'Text & String',
    icon: '🔗'
  },
  {
    name: 'Emoji Picker',
    path: '/emoji-picker',
    description: 'Search and copy emojis',
    category: 'Text & String',
    icon: '😀'
  },
  {
    name: 'ASCII Art Drawer',
    path: '/ascii-drawer',
    description: 'Convert text to ASCII art',
    category: 'Text & String',
    icon: '🎨'
  },

  // JSON & Data Tools
  {
    name: 'JSON Linter',
    path: '/json-lint',
    description: 'Validate and lint JSON',
    category: 'JSON & Data',
    icon: '📋'
  },
  {
    name: 'JSON Viewer',
    path: '/json-viewer',
    description: 'Format and view JSON',
    category: 'JSON & Data',
    icon: '👁️'
  },
  {
    name: 'JSON Diff',
    path: '/json-diff',
    description: 'Compare two JSON documents',
    category: 'JSON & Data',
    icon: '🔍'
  },
  {
    name: 'JSON Minify',
    path: '/json-minify',
    description: 'Minify JSON',
    category: 'JSON & Data',
    icon: '🗜️'
  },
  {
    name: 'JSON to CSV',
    path: '/json-csv',
    description: 'Convert JSON to CSV and back',
    category: 'JSON & Data',
    icon: '📊'
  },
  {
    name: 'JSON to XML',
    path: '/json-to-xml',
    description: 'Convert JSON to XML',
    category: 'JSON & Data',
    icon: '📄'
  },
  {
    name: 'JSON to YAML',
    path: '/json-yaml',
    description: 'Convert JSON to YAML',
    category: 'JSON & Data',
    icon: '📄'
  },
  {
    name: 'JSON to TOML',
    path: '/json-to-toml',
    description: 'Convert JSON to TOML',
    category: 'JSON & Data',
    icon: '📄'
  },
  {
    name: 'XML to JSON',
    path: '/xml-to-json',
    description: 'Convert XML to JSON',
    category: 'JSON & Data',
    icon: '📄'
  },
  {
    name: 'XML Formatter',
    path: '/xml-formatter',
    description: 'Format and beautify XML',
    category: 'JSON & Data',
    icon: '📐'
  },

  // YAML & Config Tools
  {
    name: 'YAML Linter',
    path: '/yaml-lint',
    description: 'Validate and lint YAML',
    category: 'YAML & Config',
    icon: '📋'
  },
  {
    name: 'YAML Viewer',
    path: '/yaml-viewer',
    description: 'Format and view YAML',
    category: 'YAML & Config',
    icon: '👁️'
  },
  {
    name: 'YAML to TOML',
    path: '/yaml-to-toml',
    description: 'Convert YAML to TOML',
    category: 'YAML & Config',
    icon: '📄'
  },
  {
    name: 'TOML to JSON',
    path: '/toml-to-json',
    description: 'Convert TOML to JSON',
    category: 'YAML & Config',
    icon: '📄'
  },
  {
    name: 'TOML to YAML',
    path: '/toml-to-yaml',
    description: 'Convert TOML to YAML',
    category: 'YAML & Config',
    icon: '📄'
  },
  {
    name: 'SQL Formatter',
    path: '/sql-formatter',
    description: 'Format SQL queries',
    category: 'YAML & Config',
    icon: '🗃️'
  },

  // Encoding & Hashing
  {
    name: 'Base64 Encoder',
    path: '/base64',
    description: 'Encode and decode Base64',
    category: 'Encoding & Hashing',
    icon: '🔐'
  },
  {
    name: 'Base64 File Converter',
    path: '/base64-file-converter',
    description: 'Convert files to Base64',
    category: 'Encoding & Hashing',
    icon: '📁'
  },
  {
    name: 'URL Encoder',
    path: '/url-encoder',
    description: 'Encode and decode URLs',
    category: 'Encoding & Hashing',
    icon: '🔗'
  },
  {
    name: 'HTML Entities',
    path: '/html-entities',
    description: 'Encode and decode HTML entities',
    category: 'Encoding & Hashing',
    icon: '🌐'
  },
  {
    name: 'Hash Generator',
    path: '/hash-text',
    description: 'Generate MD5, SHA hashes',
    category: 'Encoding & Hashing',
    icon: '#️⃣'
  },
  {
    name: 'Bcrypt Hasher',
    path: '/bcrypt',
    description: 'Generate bcrypt password hashes',
    category: 'Encoding & Hashing',
    icon: '🔒'
  },
  {
    name: 'HMAC Generator',
    path: '/hmac-generator',
    description: 'Generate HMAC signatures',
    category: 'Encoding & Hashing',
    icon: '🔑'
  },
  {
    name: 'Keccak-256',
    path: '/keccak256',
    description: 'Generate Keccak-256 hashes',
    category: 'Encoding & Hashing',
    icon: '💎'
  },

  // Crypto & Keys
  {
    name: 'JWT Debugger',
    path: '/jwt',
    description: 'Decode and debug JWTs',
    category: 'Crypto & Keys',
    icon: '🎫'
  },
  {
    name: 'RSA Key Generator',
    path: '/rsa-key-generator',
    description: 'Generate RSA key pairs',
    category: 'Crypto & Keys',
    icon: '🗝️'
  },
  {
    name: 'BIP39 Mnemonic',
    path: '/bip39-generator',
    description: 'Generate BIP39 mnemonics',
    category: 'Crypto & Keys',
    icon: '📝'
  },
  {
    name: 'Multi-Chain Keys',
    path: '/multi-chain-keys',
    description: 'Generate keys for multiple blockchains',
    category: 'Crypto & Keys',
    icon: '⛓️'
  },
  {
    name: 'Address from Key',
    path: '/address-from-key',
    description: 'Derive addresses from private keys',
    category: 'Crypto & Keys',
    icon: '📍'
  },
  {
    name: 'Address Checksum',
    path: '/address-checksum',
    description: 'Validate Ethereum address checksums',
    category: 'Crypto & Keys',
    icon: '✅'
  },
  {
    name: 'Token Generator',
    path: '/token-generator',
    description: 'Generate secure random tokens',
    category: 'Crypto & Keys',
    icon: '🎰'
  },
  {
    name: 'ULID Generator',
    path: '/ulid-generator',
    description: 'Generate ULIDs',
    category: 'Crypto & Keys',
    icon: '🆔'
  },
  {
    name: 'Encryption',
    path: '/encryption',
    description: 'Encrypt and decrypt text',
    category: 'Crypto & Keys',
    icon: '🔐'
  },

  // Web & Network
  {
    name: 'URL Parser',
    path: '/url-parser',
    description: 'Parse and analyze URLs',
    category: 'Web & Network',
    icon: '🔗'
  },
  {
    name: 'QR Code Generator',
    path: '/qr-code',
    description: 'Generate QR codes',
    category: 'Web & Network',
    icon: '📱'
  },
  {
    name: 'WiFi QR Code',
    path: '/wifi-qr-code',
    description: 'Generate WiFi QR codes',
    category: 'Web & Network',
    icon: '📶'
  },
  {
    name: 'Meta Tag Generator',
    path: '/meta-tag-generator',
    description: 'Generate HTML meta tags',
    category: 'Web & Network',
    icon: '🏷️'
  },
  {
    name: 'Diff Checker',
    path: '/diff',
    description: 'Compare text differences',
    category: 'Web & Network',
    icon: '🔍'
  },
  {
    name: 'Markdown to HTML',
    path: '/markdown-to-html',
    description: 'Convert Markdown to HTML',
    category: 'Web & Network',
    icon: '📝'
  },
  {
    name: 'HTML WYSIWYG Editor',
    path: '/html-wysiwyg-editor',
    description: 'Visual HTML editor',
    category: 'Web & Network',
    icon: '✏️'
  },
  {
    name: 'Docker to Compose',
    path: '/docker-run-to-compose',
    description: 'Convert docker run to compose',
    category: 'Web & Network',
    icon: '🐳'
  },
  {
    name: 'Git Memo',
    path: '/git-memo',
    description: 'Git command reference',
    category: 'Web & Network',
    icon: '📚'
  },

  // Time & Date
  {
    name: 'Date Time Converter',
    path: '/date-time-converter',
    description: 'Convert date and time formats',
    category: 'Time & Date',
    icon: '📅'
  },
  {
    name: 'Cron Generator',
    path: '/crontab-generator',
    description: 'Generate cron expressions',
    category: 'Time & Date',
    icon: '⏰'
  },
  {
    name: 'Chronometer',
    path: '/chronometer',
    description: 'Online stopwatch',
    category: 'Time & Date',
    icon: '⏱️'
  },
  {
    name: 'ETA Calculator',
    path: '/eta-calculator',
    description: 'Calculate estimated time',
    category: 'Time & Date',
    icon: '⏳'
  },

  // Blockchain
  {
    name: 'EVM Unit Converter',
    path: '/evm-converter',
    description: 'Convert Wei, Gwei, Ether',
    category: 'Blockchain',
    icon: '⟠'
  },
  {
    name: 'Solidity to Opcodes',
    path: '/solidity-to-opcodes',
    description: 'Compile Solidity to opcodes',
    category: 'Blockchain',
    icon: '⚙️'
  },
  {
    name: 'Gas Estimator',
    path: '/gas-estimator',
    description: 'Estimate gas costs',
    category: 'Blockchain',
    icon: '⛽'
  },
  {
    name: 'Multi-Chain Address',
    path: '/multi-chain-keys',
    description: 'Generate addresses for multiple chains',
    category: 'Blockchain',
    icon: '⛓️'
  },

  // Math & Numbers
  {
    name: 'Math Evaluator',
    path: '/math-evaluator',
    description: 'Evaluate math expressions',
    category: 'Math & Numbers',
    icon: '🧮'
  },
  {
    name: 'Number Base Converter',
    path: '/base-converter',
    description: 'Convert between number bases',
    category: 'Math & Numbers',
    icon: '🔢'
  },
  {
    name: 'Roman Numeral Converter',
    path: '/roman-numeral-converter',
    description: 'Convert Roman numerals',
    category: 'Math & Numbers',
    icon: '🏛️'
  },
  {
    name: 'Color Converter',
    path: '/color-converter',
    description: 'Convert color formats',
    category: 'Math & Numbers',
    icon: '🎨'
  },

  // Images
  {
    name: 'Image Compressor',
    path: '/image',
    description: 'Compress images',
    category: 'Images',
    icon: '🖼️'
  },
  {
    name: 'BPMN Viewer',
    path: '/bpmn',
    description: 'View BPMN diagrams',
    category: 'Images',
    icon: '📊'
  },
  {
    name: 'BPMN to Visio',
    path: '/bpmn-to-visio',
    description: 'Convert BPMN to Visio',
    category: 'Images',
    icon: '📊'
  },

  // Network
  {
    name: 'IP Address Converter',
    path: '/ipv4-address-converter',
    description: 'Convert IP addresses',
    category: 'Network',
    icon: '🌐'
  },
  {
    name: 'IPv4 Range Expander',
    path: '/ipv4-range-expander',
    description: 'Expand IPv4 ranges',
    category: 'Network',
    icon: '📊'
  },
  {
    name: 'IPv6 ULA Generator',
    path: '/ipv6-ula-generator',
    description: 'Generate IPv6 ULA',
    category: 'Network',
    icon: '🌐'
  },
  {
    name: 'MAC Address Generator',
    path: '/mac-address-generator',
    description: 'Generate MAC addresses',
    category: 'Network',
    icon: '💻'
  },
  {
    name: 'Random Port Generator',
    path: '/random-port-generator',
    description: 'Generate random ports',
    category: 'Network',
    icon: '🚪'
  },
  {
    name: 'CIDR Calculator',
    path: '/cidr-calculator',
    description: 'Calculate CIDR notation',
    category: 'Network',
    icon: '🌐'
  },

  // Developer Utilities
  {
    name: 'Regex Tester',
    path: '/regex-tester',
    description: 'Test regular expressions',
    category: 'Developer Utilities',
    icon: '🔎'
  },
  {
    name: 'Chmod Calculator',
    path: '/chmod-calculator',
    description: 'Calculate chmod permissions',
    category: 'Developer Utilities',
    icon: '🔐'
  },
  {
    name: 'Basic Auth Generator',
    path: '/basic-auth-generator',
    description: 'Generate Basic Auth headers',
    category: 'Developer Utilities',
    icon: '🔑'
  },
  {
    name: 'OTP Code Generator',
    path: '/otp-code-generator',
    description: 'Generate TOTP codes',
    category: 'Developer Utilities',
    icon: '📲'
  },
  {
    name: 'Email Normalizer',
    path: '/email-normalizer',
    description: 'Normalize email addresses',
    category: 'Developer Utilities',
    icon: '📧'
  },
  {
    name: 'Phone Parser',
    path: '/phone-number-parser',
    description: 'Parse phone numbers',
    category: 'Developer Utilities',
    icon: '📞'
  },
  {
    name: 'User Agent Parser',
    path: '/user-agent-parser',
    description: 'Parse user agent strings',
    category: 'Developer Utilities',
    icon: '🤖'
  },
  {
    name: 'Local Token Counter',
    path: '/local-token-counter',
    description: 'Count tokens locally',
    category: 'Developer Utilities',
    icon: '🔢'
  },

  // AI & Automation
  {
    name: 'Agent Identity Generator',
    path: '/agent-identity-generator',
    description: 'Generate AI agent identities',
    category: 'AI & Automation',
    icon: '🤖'
  },
  {
    name: 'Benchmark Builder',
    path: '/benchmark-builder',
    description: 'Build performance benchmarks',
    category: 'AI & Automation',
    icon: '📈'
  }
]

const categories = computed(() => {
  const cats = new Set(tools.map((t) => t.category))
  return Array.from(cats).sort()
})

const getToolsByCategory = (category: string) => {
  return tools.filter((t) => t.category === category)
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <Breadcrumb />

    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold tracking-tight mb-4">
          All Developer Tools
        </h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Privacy-first tools that run entirely in your browser. No data sent to servers.
        </p>
      </div>

      <!-- Tools by Category -->
      <div class="space-y-12">
        <div
          v-for="category in categories"
          :key="category"
          class="space-y-4"
        >
          <h2 class="text-2xl font-semibold border-b border-border pb-2">
            {{ category }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <router-link
              v-for="tool in getToolsByCategory(category)"
              :key="tool.path"
              :to="tool.path"
              class="group"
            >
              <Card class="h-full hover:border-primary hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div class="flex items-start gap-3">
                    <span class="text-3xl">{{ tool.icon }}</span>
                    <div class="flex-1">
                      <CardTitle class="text-lg group-hover:text-primary transition-colors">
                        {{ tool.name }}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription class="text-sm">
                    {{ tool.description }}
                  </CardDescription>
                </CardContent>
              </Card>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-16 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
          <span class="font-semibold">{{ tools.length }}</span>
          <span class="text-muted-foreground">tools available</span>
        </div>
      </div>
    </div>
  </div>
</template>
