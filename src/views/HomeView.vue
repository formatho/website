<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Input } from '@/components/ui/input'
import formathoIcons from '@/assets/formatho-icons.json'

// Note: AOS is initialized globally in main.ts to avoid conflicts

const searchQuery = ref('')

// Tool to icon mapping
const toolIconMap: Record<string, string> = {
  // Crypto & Security
  'Token Generator': 'generators',
  'Hash Text': 'hashing',
  'Bcrypt': 'encryption',
  'UUID Generator': 'validation',
  'ULID Generator': 'generators',
  'Encrypt/Decrypt': 'encryption',
  'BIP39 Passphrase': 'blockchain',
  'HMAC Generator': 'hashing',
  'RSA Key Pair': 'crypto',
  'Password Strength': 'security',
  
  // Converters
  'Date-Time Converter': 'datetime',
  'Integer Base Converter': 'converters',
  'Roman Numerals': 'converters',
  'Base64 String': 'base64',
  'Base64 File': 'base64',
  'Color Converter': 'design',
  'Case Converter': 'formatting',
  'Text to NATO': 'text-processing',
  'Text to Binary': 'encoding',
  'JSON <> YAML': 'toml',
  'JSON <> CSV': 'text-processing',
  'Temperature': 'datetime',
  'XML <> JSON': 'toml',
  
  // Web & Network
  'URL Encoder/Decoder': 'formatting',
  'HTML Entities': 'formatting',
  'URL Parser': 'network',
  'Device Information': 'devops',
  'Basic Auth Generator': 'security',
  'Meta Tag Generator': 'formatting',
  'JWT Debugger': 'validation',
  'Keycode Info': 'devops',
  'Slugify': 'text-processing',
  'User Agent Parser': 'network',
  'HTTP Status Codes': 'network',
  'JSON Diff': 'validation',
  
  // Images & Media
  'QR Code Generator': 'qr-code',
  'WiFi QR Code': 'qr-code',
  'Image Compressor': 'compression',
  'Camera Recorder': 'network',
  
  // Development
  'Git Cheat Sheet': 'devops',
  'Crontab Generator': 'datetime',
  'JSON Viewer': 'json',
  'JSON Minify': 'json',
  'SQL Formatter': 'sql',
  'Chmod Calculator': 'security',
  'Docker to Compose': 'docker',
  'XML Formatter': 'xml',
  'YAML Viewer': 'yaml',
  'Regex Tester': 'regex',
  
  // Network Tools
  'IPv4 Subnet Calculator': 'network',
  'IPv4 Address Converter': 'network',
  'IPv4 Range Expander': 'network',
  'MAC Address Lookup': 'network',
  'MAC Address Generator': 'network',
  'IPv6 ULA Generator': 'network',
  
  // Math & Calculators
  'Math Evaluator': 'validation',
  'ETA Calculator': 'datetime',
  'Percentage Calculator': 'calculators',
  
  // Text Tools
  'Lorem Ipsum Generator': 'text-processing',
  'Markdown Editor': 'formatting',
  'Diff Checker': 'validation',
  'Text Statistics': 'text-processing',
  'Emoji Picker': 'text-processing',
  'String Obfuscator': 'security',
  'ASCII Art': 'text-processing',
  
  // Data Validation
  'Phone Parser': 'validation',
  'IBAN Validator': 'validation',
  'JSON Linter': 'validation',
  'YAML Linter': 'validation',
  
  // Blockchain
  'EVM Unit Converter': 'blockchain',
  'Keccak-256 Hasher': 'hashing',
  'Address Checksum': 'validation',
  'Multi-Chain Keys': 'blockchain',
  'Address from Key': 'blockchain',
  'Solidity to Opcodes': 'blockchain',
  
  // Artificial Intelligence
  'Agent Orchestrator': 'generators',
  'Agent Identity Generator': 'bot',
  'Local Token Counter': 'hashing',
}

const tools = [
  {
    category: 'Crypto & Security',
    items: [
      {
        name: 'Token Generator',
        description: 'Generate secure random tokens with customizable length and character sets.',
        route: '/token-generator'
      },
      {
        name: 'Hash Text',
        description: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes.',
        route: '/hash-text'
      },
      {
        name: 'Bcrypt',
        description: 'Generate and verify Bcrypt password hashes.',
        route: '/bcrypt'
      },
      {
        name: 'UUID Generator',
        description: 'Generate UUIDs (Universally Unique Identifiers). Supports v1, v4, and more.',
        route: '/uuid'
      },
      {
        name: 'ULID Generator',
        description: 'Generate ULIDs (Universally Unique Lexicographically Sortable Identifiers).',
        route: '/ulid-generator'
      },
      {
        name: 'Encrypt/Decrypt',
        description: 'Encrypt and decrypt text using various algorithms.',
        route: '/encryption'
      },
      {
        name: 'BIP39 Passphrase',
        description: 'Generate BIP39 mnemonic phrases for cryptocurrency wallets.',
        route: '/bip39-generator'
      },
      {
        name: 'HMAC Generator',
        description: 'Generate HMAC hash codes with various algorithms.',
        route: '/hmac-generator'
      },
      {
        name: 'RSA Key Pair',
        description: 'Generate RSA public/private key pairs.',
        route: '/rsa-key-pair-generator'
      },
      {
        name: 'Password Strength',
        description: 'Analyze password strength and get improvement suggestions.',
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
        route: '/date-time-converter'
      },
      {
        name: 'Integer Base Converter',
        description: 'Convert numbers between binary, octal, decimal, and hexadecimal.',
        route: '/integer-base-converter'
      },
      {
        name: 'Roman Numerals',
        description: 'Convert between Roman numerals and Arabic numbers.',
        route: '/roman-numeral-converter'
      },
      {
        name: 'Base64 String',
        description: 'Encode and decode Base64 strings instantly.',
        route: '/base64'
      },
      {
        name: 'Base64 File',
        description: 'Convert files to and from Base64 encoding.',
        route: '/base64-file-converter'
      },
      {
        name: 'Color Converter',
        description: 'Convert colors between HEX, RGB, HSL, and other formats.',
        route: '/color-converter'
      },
      {
        name: 'Case Converter',
        description: 'Convert text between different cases (camelCase, snake_case, etc.).',
        route: '/case-converter'
      },
      {
        name: 'Text to NATO',
        description: 'Convert text to NATO phonetic alphabet.',
        route: '/text-to-nato-alphabet'
      },
      {
        name: 'Text to Binary',
        description: 'Convert text to binary and vice versa.',
        route: '/text-to-binary'
      },
      {
        name: 'JSON <> YAML',
        description: 'Convert JSON to YAML and YAML to JSON instantly.',
        route: '/json-yaml'
      },
      {
        name: 'JSON <> CSV',
        description: 'Convert JSON to CSV and CSV to JSON format instantly.',
        route: '/json-csv'
      },
      {
        name: 'Temperature',
        description: 'Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine.',
        route: '/temperature-converter'
      },
      {
        name: 'XML <> JSON',
        description: 'Convert between XML and JSON formats.',
        route: '/xml-to-json'
      }
    ]
  },
  {
    category: 'Web & Network',
    items: [
      {
        name: 'URL Encoder/Decoder',
        description: 'Encode and decode URL strings.',
        route: '/url-encoder'
      },
      {
        name: 'HTML Entities',
        description: 'Encode and decode HTML entities.',
        route: '/html-entities'
      },
      {
        name: 'URL Parser',
        description: 'Parse and analyze URLs to extract components.',
        route: '/url-parser'
      },
      {
        name: 'Device Information',
        description: 'View your browser and device information.',
        route: '/device-information'
      },
      {
        name: 'Basic Auth Generator',
        description: 'Generate HTTP Basic Authentication headers.',
        route: '/basic-auth-generator'
      },
      {
        name: 'Meta Tag Generator',
        description: 'Generate HTML meta tags for SEO.',
        route: '/meta-tag-generator'
      },
      {
        name: 'JWT Debugger',
        description: 'Decode and inspect JWT tokens instantly.',
        route: '/jwt'
      },
      {
        name: 'Keycode Info',
        description: 'Find keyboard keycodes for JavaScript events.',
        route: '/keycode-info'
      },
      {
        name: 'Slugify',
        description: 'Convert text to URL-friendly slugs.',
        route: '/slugify-string'
      },
      {
        name: 'User Agent Parser',
        description: 'Parse and analyze user agent strings.',
        route: '/user-agent-parser'
      },
      {
        name: 'HTTP Status Codes',
        description: 'Reference for HTTP status codes and their meanings.',
        route: '/http-status-codes'
      },
      {
        name: 'JSON Diff',
        description: 'Compare two JSON objects and see differences.',
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
        route: '/qr-code-generator'
      },
      {
        name: 'WiFi QR Code',
        description: 'Generate QR codes for WiFi network credentials.',
        route: '/wifi-qr-code-generator'
      },
      {
        name: 'Image Compressor',
        description: 'Compress and optimize images.',
        route: '/image'
      },
      {
        name: 'Camera Recorder',
        description: 'Record video from your webcam.',
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
        route: '/git-memo'
      },
      {
        name: 'Crontab Generator',
        description: 'Generate cron expressions with a visual builder.',
        route: '/crontab-generator'
      },
      {
        name: 'JSON Viewer',
        description: 'Format and visualize JSON data.',
        route: '/json-viewer'
      },
      {
        name: 'JSON Minify',
        description: 'Minify JSON to reduce size.',
        route: '/json-minify'
      },
      {
        name: 'SQL Formatter',
        description: 'Format and beautify SQL queries.',
        route: '/sql'
      },
      {
        name: 'Chmod Calculator',
        description: 'Calculate Unix file permissions.',
        route: '/chmod-calculator'
      },
      {
        name: 'Docker to Compose',
        description: 'Convert docker run commands to docker-compose.',
        route: '/docker-run-to-compose-converter'
      },
      {
        name: 'XML Formatter',
        description: 'Format and prettify XML documents.',
        route: '/xml-formatter'
      },
      {
        name: 'YAML Viewer',
        description: 'Format and validate YAML documents.',
        route: '/yaml-viewer'
      },
      {
        name: 'Regex Tester',
        description: 'Test and debug regular expressions.',
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
        route: '/ipv4-subnet-calculator'
      },
      {
        name: 'IPv4 Address Converter',
        description: 'Convert IPv4 addresses between formats.',
        route: '/ipv4-address-converter'
      },
      {
        name: 'IPv4 Range Expander',
        description: 'Expand IPv4 address ranges into individual IPs.',
        route: '/ipv4-range-expander'
      },
      {
        name: 'MAC Address Lookup',
        description: 'Look up MAC address vendor information.',
        route: '/mac-address-lookup'
      },
      {
        name: 'MAC Address Generator',
        description: 'Generate random MAC addresses.',
        route: '/mac-address-generator'
      },
      {
        name: 'IPv6 ULA Generator',
        description: 'Generate IPv6 Unique Local Addresses.',
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
        route: '/math-evaluator'
      },
      {
        name: 'ETA Calculator',
        description: 'Calculate estimated time of arrival.',
        route: '/eta-calculator'
      },
      {
        name: 'Percentage Calculator',
        description: 'Calculate percentages, increases, and decreases.',
        route: '/percentage-calculator'
      }
    ]
  },
  {
    category: 'Text Tools',
    items: [
      {
        name: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text for designs.',
        route: '/lorem'
      },
      {
        name: 'Markdown Editor',
        description: 'Edit and preview Markdown files in real-time.',
        route: '/markdown'
      },
      {
        name: 'Diff Checker',
        description: 'Compare two texts and see differences.',
        route: '/diff'
      },
      {
        name: 'Text Statistics',
        description: 'Count characters, words, sentences, and paragraphs.',
        route: '/text-statistics'
      },
      {
        name: 'Emoji Picker',
        description: 'Browse and copy emojis.',
        route: '/emoji-picker'
      },
      {
        name: 'String Obfuscator',
        description: 'Obfuscate strings to hide sensitive data.',
        route: '/string-obfuscator'
      },
      {
        name: 'ASCII Art',
        description: 'Convert text to ASCII art.',
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
        route: '/phone-parser'
      },
      {
        name: 'IBAN Validator',
        description: 'Validate and parse International Bank Account Numbers.',
        route: '/iban-validator'
      },
      {
        name: 'JSON Linter',
        description: 'Validate and lint JSON code.',
        route: '/json-lint'
      },
      {
        name: 'YAML Linter',
        description: 'Validate and lint YAML code.',
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
        route: '/evm-converter'
      },
      {
        name: 'Keccak-256 Hasher',
        description: 'Generate Keccak-256 hashes for Ethereum.',
        route: '/keccak256'
      },
      {
        name: 'Address Checksum',
        description: 'Validate Ethereum addresses (EIP-55).',
        route: '/address-checksum'
      },
      {
        name: 'Multi-Chain Keys',
        description: 'Generate keys for multiple blockchains from one mnemonic.',
        route: '/multi-chain-keys'
      },
      {
        name: 'Address from Key',
        description: 'Derive addresses from private keys.',
        route: '/address-from-key'
      },
      {
        name: 'Solidity to Opcodes',
        description: 'Compile Solidity to EVM opcodes.',
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
        route: '/agent-orchestrator'
      },
      {
        name: 'Agent Identity Generator',
        description: 'Instantly generate unique personas, traits, and system prompts for AI agents.',
        route: '/agent-identity-generator'
      },
      {
        name: 'Local Token Counter',
        description: 'Client-side LLM token counter. 100% private, no API calls.',
        route: '/local-token-counter'
      }
    ]
  }
]

// Filter tools based on search query
const filteredTools = computed(() => {
  if (!searchQuery.value.trim()) {
    return tools
  }

  const query = searchQuery.value.toLowerCase()

  return tools
    .map((category) => ({
      category: category.category,
      items: category.items.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query)
      )
    }))
    .filter((category) => category.items.length > 0)
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div class="container mx-auto px-4 py-12 md:py-16 relative">
        <div class="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <!-- Logo & Title -->
          <div
            class="flex items-center gap-4"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            <img
                src="/logo.png"
                alt="Formatho"
                class="h-20 w-20 rounded-xl shadow-2xl ring-2 ring-primary/20"
              />
            <h1 class="text-5xl md:text-7xl font-bold tracking-tight gradient-text">Formatho</h1>
          </div>

          <!-- Description -->
          <p
            class="text-2xl md:text-3xl font-semibold text-foreground max-w-3xl leading-tight"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            The Privacy-First Developer Toolkit
          </p>
          <p
            class="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            Fast, secure, privacy-first collection of 100+ developer utilities and content
            productivity tools — built to solve everyday formatting, conversion, and debugging
            problems directly in your browser.
          </p>

          <!-- Trust Badges Row -->
          <div class="flex flex-wrap gap-4 justify-center items-center mt-6">
            <!-- Privacy Shield -->
            <div
              class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <span
                class="w-5 h-5 text-primary"
                v-html="formathoIcons.icons['privacy-shield'].svg"
              />
              <span class="text-sm font-medium text-foreground">Your data never leaves your browser</span>
            </div>

            <!-- No Log Globe -->
            <div
              class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <span
                class="w-5 h-5 text-primary"
                v-html="formathoIcons.icons['no-log-globe'].svg"
              />
              <span class="text-sm font-medium text-foreground">Zero tracking, zero storage</span>
            </div>

            <!-- Client Side Chip -->
            <div
              class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span
                class="w-5 h-5 text-primary"
                v-html="formathoIcons.icons['client-side-chip'].svg"
              />
              <span class="text-sm font-medium text-foreground">100% client-side processing</span>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="w-full max-w-2xl mt-6">
            <div class="relative">
              <Search
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              />
              <Input
                v-model="searchQuery"
                type="text"
                placeholder="Search tools... (e.g., JSON, Base64, UUID)"
                class="w-full pl-12 pr-4 py-6 text-lg glass-card border-primary/20 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
            <p v-if="searchQuery" class="text-sm text-muted-foreground mt-3 text-left">
              Found {{ filteredTools.reduce((acc, cat) => acc + cat.items.length, 0) }} tools for
              "{{ searchQuery }}"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section class="container mx-auto px-4 py-10 md:py-14">
      <div v-if="filteredTools.length === 0" class="text-center py-20">
        <p class="text-xl text-muted-foreground">No tools found matching "{{ searchQuery }}"</p>
        <button
          @click="searchQuery = ''"
          class="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Clear search
        </button>
      </div>

      <div v-else class="space-y-12">
        <div v-for="(category, categoryIndex) in filteredTools" :key="category.category" class="space-y-6">
          <div class="flex items-center gap-4">
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">{{ category.category }}</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
            <span class="text-sm text-muted-foreground font-medium">
              {{ category.items.length }} {{ category.items.length === 1 ? 'tool' : 'tools' }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <RouterLink
              v-for="(tool, toolIndex) in category.items"
              :key="tool.name"
              :to="tool.route"
              class="group"
            >
              <div
                class="glass-card h-full p-6 cursor-pointer"
                data-aos="fade-up"
                :data-aos-delay="(toolIndex % 4) * 50"
              >
                <div class="flex flex-col h-full">
                  <!-- Icon with SVG from formatho-icons.json -->
                  <div class="mb-4">
                    <div
                      class="p-3 rounded-xl bg-primary/10 transition-all w-fit"
                    >
                      <span
                        class="w-6 h-6 text-primary"
                        v-html="formathoIcons.icons[toolIconMap[tool.name] || 'generators']?.svg || ''"
                      />
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1">
                    <h3
                      class="text-lg font-semibold mb-2 transition-colors"
                    >
                      {{ tool.name }}
                    </h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      {{ tool.description }}
                    </p>
                  </div>

                  <!-- Arrow indicator -->
                  <div
                    class="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Open tool
                    <svg
                      class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- SEO Content Block -->
    <section class="container mx-auto px-4 py-16 border-t border-border/50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center">Why Developers Choose Formatho</h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-primary">Privacy-First Architecture</h3>
            <p class="text-muted-foreground">
              Every tool runs 100% client-side in your browser. No uploads, no database storage, and zero third-party analytics. Your sensitive data never leaves your device.
            </p>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-primary">Lightning Fast Performance</h3>
            <p class="text-muted-foreground">
              Zero server latency means instant results. Tools execute directly in your browser's JavaScript engine, giving you millisecond-level response times for all operations.
            </p>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-primary">Developer Focused</h3>
            <p class="text-muted-foreground">
              Built by developers, for developers. Clean interfaces, keyboard shortcuts, and powerful features that solve real-world problems in your daily workflow.
            </p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-muted-foreground mb-4">Not seeing what you need?</p>
          <a
            href="mailto:support@formatho.com"
            class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Suggest a tool
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Hover state with scale and deeper shadow */
.glass-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.glass-card:hover {
  transform: scale(1.02);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: rgba(6, 182, 212, 0.5);
}
</style>
