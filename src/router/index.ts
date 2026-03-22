import AppLayout from '../layouts/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import MarkdownView from '../views/MarkdownView.vue'
import { blogPosts } from '../data/blogPosts'

// Generate static routes for each blog post (for SSG pre-rendering)
// Store slug in meta since props don't work reliably during SSR
const blogPostRoutes = blogPosts.map((post) => ({
  path: `blogs/${post.slug}`,
  name: `blog-post-${post.slug}`,
  component: () => import('../views/BlogPostView.vue'),
  meta: {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    slug: post.slug // Store slug in meta for SSR access
  }
}))

export const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {
          title: 'Formatho - Privacy-First Developer Tools',
          description:
            'Fast, secure, privacy-first collection of online text formatting tools, developer utilities, and content productivity tools.',
          keywords:
            'developer tools, text formatter, json formatter, privacy-first tools, online utilities'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {
          title: 'About Us - Formatho',
          description:
            'Learn about Formatho - our mission to build privacy-first developer tools and AI agent orchestration solutions.',
          keywords:
            'about formatho, privacy-first tools, developer tools, ai agent orchestrator, open source'
        }
      },
      {
        path: 'docs/api',
        name: 'api-docs',
        component: () => import('../views/docs/ApiDocsView.vue'),
        meta: {
          title: 'API Documentation - Agent Orchestrator | Formatho',
          description:
            'Comprehensive REST API documentation for Agent Orchestrator. Interactive examples, authentication guides, and code snippets in JavaScript, Python, and Go.',
          keywords:
            'api documentation, rest api, agent orchestrator api, developer docs, interactive api, code examples'
        }
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import('../views/BlogsView.vue'),
        meta: {
          title: 'Blog - Formatho',
          description:
            'Insights, updates, and stories from the Formatho team. Read about privacy-first development, AI agents, and more.',
          keywords: 'formatho blog, developer tools blog, privacy-first, ai agents, web development'
        }
      },
      // Static blog post routes (MUST come before dynamic route for proper matching)
      ...blogPostRoutes,
      // Dynamic fallback for blog posts (only used if no static route matches)
      {
        path: 'blogs/:slug',
        name: 'blog-post-dynamic',
        component: () => import('../views/BlogPostView.vue'),
        meta: {
          title: 'Blog Post - Formatho',
          description:
            'Read technical articles about developer tools, privacy-first development, and AI agents.',
          keywords: 'formatho blog, developer tools, privacy, ai agents'
        }
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: () => import('../views/PrivacyPolicyView.vue'),
        meta: {
          title: 'Privacy Policy - Formatho',
          description:
            'Learn about Formatho privacy practices. All data processing happens locally in your browser.',
          keywords: 'privacy policy, data protection, client-side processing'
        }
      },
      {
        path: 'terms',
        name: 'terms',
        component: () => import('../views/TermsOfServiceView.vue'),
        meta: {
          title: 'Terms of Service - Formatho',
          description: 'Terms of Service for Formatho - privacy-first developer tools.',
          keywords: 'terms of service, user agreement'
        }
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue'),
        meta: {
          title: 'Contact Us - Formatho',
          description:
            'Get in touch with the Formatho team. Report bugs, request features, or join our community.',
          keywords: 'contact, support, feedback, github'
        }
      },
      {
        path: 'pricing',
        name: 'pricing',
        component: () => import('../views/PricingView.vue'),
        meta: {
          title: 'Pricing - Formatho',
          description:
            'Simple, transparent pricing for Formatho developer tools. Start free, upgrade when you need more.',
          keywords: 'pricing, plans, subscription, pro, enterprise'
        }
      },
      {
        path: 'markdown',
        name: 'markdown',
        component: MarkdownView,
        meta: {
          title: 'Markdown Editor',
          description:
            'Edit and preview Markdown files in real-time. Privacy-first markdown editor that runs 100% client-side in your browser.',
          keywords:
            'markdown editor, markdown preview, markdown viewer, github markdown, privacy-first'
        }
      },
      {
        path: 'json-yaml',
        name: 'json-yaml',
        component: () => import('../views/JsonYamlView.vue'),
        meta: {
          title: 'JSON to YAML Converter',
          description:
            'Convert JSON to YAML and YAML to JSON instantly. Free, privacy-first converter that processes data entirely in your browser.',
          keywords:
            'json to yaml, yaml to json, json converter, yaml converter, json yaml, privacy-first'
        }
      },
      {
        path: 'json-csv',
        name: 'json-csv',
        component: () => import('../views/JsonCsvView.vue'),
        meta: {
          title: 'JSON to CSV Converter',
          description:
            'Convert JSON to CSV and CSV to JSON format instantly. Free, client-side converter that keeps your data private.',
          keywords:
            'json to csv, csv to json, json converter, csv converter, json csv, privacy-first'
        }
      },
      {
        path: 'diff',
        name: 'diff',
        component: () => import('../views/DiffView.vue'),
        meta: {
          title: 'Text Diff Tool',
          description:
            'Compare two texts and see the differences highlighted. Free diff tool that runs entirely in your browser.',
          keywords:
            'diff tool, text diff, compare text, diff checker, text comparison, privacy-first'
        }
      },
      {
        path: 'base64',
        name: 'base64',
        component: () => import('../views/Base64View.vue'),
        meta: {
          title: 'Base64 Encoder & Decoder',
          description:
            'Encode and decode Base64 strings instantly. Free, privacy-first Base64 tool that processes data entirely in your browser.',
          keywords:
            'base64 encoder, base64 decoder, base64 encode, base64 decode, base64 converter, privacy-first'
        }
      },
      {
        path: 'jwt',
        name: 'jwt',
        component: () => import('../views/JwtView.vue'),
        meta: {
          title: 'JWT Decoder',
          description:
            'Decode and inspect JWT tokens instantly. View JWT header, payload, and signature. Privacy-first tool that runs in your browser.',
          keywords:
            'jwt decoder, jwt decode, jwt token decoder, jwt inspector, json web token, privacy-first'
        }
      },
      {
        path: 'sql',
        name: 'sql',
        component: () => import('../views/SqlFormatterView.vue'),
        meta: {
          title: 'SQL Formatter',
          description:
            'Format and beautify SQL queries instantly. Free SQL formatter that runs entirely in your browser. Supports multiple SQL dialects.',
          keywords:
            'sql formatter, sql beautifier, sql prettifier, format sql, sql formatter online, privacy-first'
        }
      },
      {
        path: 'uuid',
        name: 'uuid',
        component: () => import('../views/UuidGeneratorView.vue'),
        meta: {
          title: 'UUID Generator',
          description:
            'Generate UUIDs (Universally Unique Identifiers) instantly. Free UUID generator that creates v1, v4, and other UUID formats.',
          keywords:
            'uuid generator, generate uuid, uuid v4, uuid v1, unique identifier generator, privacy-first'
        }
      },
      {
        path: 'lorem',
        name: 'lorem',
        component: () => import('../views/LoremIpsumView.vue'),
        meta: {
          title: 'Lorem Ipsum Generator',
          description:
            'Generate Lorem Ipsum placeholder text instantly. Customize paragraphs, words, and sentences. Free text generator.',
          keywords:
            'lorem ipsum generator, placeholder text, dummy text generator, lorem ipsum, privacy-first'
        }
      },
      {
        path: 'image',
        name: 'image',
        component: () => import('../views/ImageCompressorView.vue'),
        meta: {
          title: 'Image Compressor',
          description:
            'Compress and optimize images instantly. Reduce image file size while maintaining quality. Privacy-first tool that processes images in your browser.',
          keywords:
            'image compressor, compress image, image optimizer, reduce image size, image compression, privacy-first'
        }
      },
      {
        path: 'json-lint',
        name: 'json-lint',
        component: () => import('../views/JsonLintView.vue'),
        meta: {
          title: 'JSON Linter & Validator',
          description:
            'Validate and lint JSON code instantly. Find syntax errors and format JSON. Free JSON validator that runs entirely in your browser.',
          keywords:
            'json linter, json validator, json formatter, validate json, json checker, privacy-first'
        }
      },
      {
        path: 'yaml-lint',
        name: 'yaml-lint',
        component: () => import('../views/YamlLintView.vue'),
        meta: {
          title: 'YAML Linter & Validator',
          description:
            'Validate and lint YAML code instantly. Find syntax errors and format YAML. Free YAML validator that runs entirely in your browser.',
          keywords:
            'yaml linter, yaml validator, yaml formatter, validate yaml, yaml checker, privacy-first'
        }
      },
      {
        path: 'bpmn',
        name: 'bpmn',
        component: () => import('../views/BpmnView.vue'),
        meta: {
          title: 'BPMN Viewer & PDF Exporter',
          description:
            'Visualize BPMN 2.0 diagrams and export them as PDF. Free, privacy-first BPMN viewer that runs entirely in your browser.',
          keywords:
            'bpmn viewer, bpmn to pdf, bpmn diagram, business process model, bpmn export, privacy-first'
        }
      },
      {
        path: 'evm-converter',
        name: 'evm-converter',
        component: () => import('../views/EvmUnitConverterView.vue'),
        meta: {
          title: 'EVM Unit Converter',
          description:
            'Convert between Wei, Gwei, and Ether instantly. Essential tool for Ethereum developers.',
          keywords:
            'ethereum unit converter, wei converter, gwei converter, ether converter, evm tools'
        }
      },
      {
        path: 'keccak256',
        name: 'keccak256',
        component: () => import('../views/KeccakHasherView.vue'),
        meta: {
          title: 'Keccak-256 Hasher',
          description:
            'Generate Keccak-256 hashes online. Secure, client-side hashing for Ethereum development.',
          keywords: 'keccak256 hash, keccak256 online, ethereum hash, solidity keccak256'
        }
      },
      {
        path: 'address-checksum',
        name: 'address-checksum',
        component: () => import('../views/AddressChecksumView.vue'),
        meta: {
          title: 'Address Checksum (EIP-55)',
          description:
            'Validate and checksum Ethereum addresses (EIP-55). Ensure correct address formatting.',
          keywords: 'ethereum address checksum, eip-55 checksum, address validator, connect wallet'
        }
      },
      {
        path: 'multi-chain-keys',
        name: 'multi-chain-keys',
        component: () => import('../views/MultiChainKeyGeneratorView.vue'),
        meta: {
          title: 'Multi-Chain Key Generator',
          description:
            'Generate keys for Ethereum, Solana, Polkadot, and Cosmos from one mnemonic. Understand the algorithms.',
          keywords:
            'multi chain wallet, key generator, ethereum, solana, polkadot, cosmos, bip39, ed25519, secp256k1'
        }
      },
      {
        path: 'address-from-key',
        name: 'address-from-key',
        component: () => import('../views/AddressFromPrivateKeyView.vue'),
        meta: {
          title: 'Address from Private Key (Multi-Chain)',
          description:
            'Derive addresses for Ethereum, Bitcoin, Solana, and more from a private key. Runs entirely in browser.',
          keywords:
            'private key to address, eth address, btc address, solana address, multi chain tool'
        }
      },
      {
        path: 'solidity-to-opcodes',
        name: 'solidity-to-opcodes',
        component: () => import('../views/SolidityToOpcodesView.vue'),
        meta: {
          title: 'Solidity to EVM Opcodes',
          description:
            'Compile Solidity to EVM Opcodes and Bytecode in your browser. View the assembly of your smart contracts.',
          keywords:
            'solidity compile, evm opcodes, smart contract assembly, solidity bytecode, compiler'
        }
      },
      {
        path: 'agent-identity-generator',
        name: 'agent-identity-generator',
        component: () => import('../views/tools/AgentIdentityView.vue'),
        meta: {
          title: 'AI Agent Identity Generator',
          description:
            'Instantly generate unique personas, traits, and system prompts for AI agents.',
          keywords:
            'ai agent identity, agent persona, agent traits, system prompts, agent generator, artificial intelligence'
        }
      },
      {
        path: 'local-token-counter',
        name: 'local-token-counter',
        component: () => import('../views/LocalTokenCounterView.vue'),
        meta: {
          title: 'Local Token Counter',
          description:
            'Client-side LLM token counter. 100% private, no API calls. Count tokens for text input using local JavaScript.',
          keywords:
            'token counter, llm token counter, gpt token count, claude token count, local token counter, privacy-first'
        }
      },
      {
        path: 'agents',
        name: 'agents',
        component: () => import('../views/AgentsView.vue'),
        meta: {
          title: 'Agent Browser - Blockchain Agents with Reputation',
          description:
            'Explore AI Agents on the blockchain with reputation tracking. View agent addresses, reputation scores, and activity. Real-time data from the blockchain.',
          keywords:
            'agent browser, blockchain agents, ai agents reputation, crypto agents, ethereum agents, agent explorer, reputation tracking'
        }
      },
      {
        path: 'agents/:address',
        name: 'agent-detail',
        component: () => import('../views/AgentDetailView.vue'),
        meta: {
          title: 'Agent Details - View Reputation History & Metadata',
          description:
            'View detailed information about blockchain AI agents including reputation history, ratings, metadata, and transaction records. Track agent performance and feedback.',
          keywords:
            'agent details, agent reputation, blockchain agent history, ai agent ratings, crypto agent metadata, ethereum agent tracker'
        }
      },
      {
        path: 'agent-orchestrator',
        name: 'agent-orchestrator',
        component: () => import('../views/AgentOrchestratorView.vue'), // Landing page
        meta: {
          title: 'Agent Orchestrator - Local-First AI Agent Management',
          description:
            'Spin up AI workers with text, let them run autonomously, check results later. A desktop app for managing AI agents locally. Open source, privacy-first.',
          keywords:
            'ai agent orchestrator, autonomous agents, local ai, agent management, llm orchestration, open source, privacy-first'
        }
      },
      {
        path: 'agent-orchestrator/dashboard',
        name: 'agent-orchestrator-dashboard',
        component: () => import('../views/AgentOrchestratorDashboardView.vue'),
        meta: {
          title: 'Dashboard - Agent Orchestrator | Formatho',
          description: 'Monitor and manage AI agents in real-time. View agent status, activity feed, and resource usage.',
          keywords: 'agent dashboard, ai monitoring, agent status, resource usage'
        }
      },
      {
        path: 'agent-orchestrator/:agentId',
        name: 'agent-detail',
        component: () => import('../views/AgentDetailView.vue'),
        meta: {
          title: 'Agent Detail - Agent Orchestrator | Formatho',
          description: 'View agent status, controls, live logs, and task history.',
          keywords: 'agent detail, agent log, task history'
        }
      },
      {
        path: 'agent-orchestrator/todo',
        name: 'todo-queue',
        component: () => import('../views/TODOQueueView.vue'),
        meta: {
          title: 'TODO Queue - Agent Orchestrator | Formatho',
          description: 'Manage priority queue, track progress, and filter tasks.',
          keywords: 'task queue, todo list, task management, priorities'
        }
      },
      {
        path: 'agent-orchestrator/cron',
        name: 'cron-scheduler',
        component: () => import('../views/CrontabGeneratorView.vue'),
        meta: {
          title: 'Cron Scheduler - Agent Orchestrator | Formatho',
          description: 'Manage scheduled jobs and view run history.',
          keywords: 'cron scheduler, job scheduling, automated tasks'
        }
      },
      {
        path: 'agent-orchestrator/config',
        name: 'configuration',
        component: () => import('../views/ConfigurationView.vue'),
        meta: {
          title: 'Configuration - Agent Orchestrator | Formatho',
          description: 'Configure global settings, LLM providers, and skill permissions.',
          keywords: 'settings, configuration, LLM config, API keys'
        }
      },
      {
        path: 'agent-orchestrator/analytics',
        name: 'analytics-dashboard',
        component: () => import('../views/AnalyticsDashboardView.vue'),
        meta: {
          title: 'Analytics Dashboard - Agent Orchestrator | Formatho (Pro)',
          description: 'Advanced analytics dashboard for agent performance tracking, task completion trends, and team collaboration insights. Pro feature.',
          keywords: 'analytics dashboard, agent performance, task analytics, export data, csv export, json export'
        }
      },
      // Crypto Tools
      {
        path: 'bcrypt',
        name: 'bcrypt',
        component: () => import('../views/BcryptView.vue'),
        meta: {
          title: 'Bcrypt Hash Generator',
          description:
            'Generate and verify bcrypt password hashes. Privacy-first tool that runs entirely in your browser.'
        }
      },
      {
        path: 'encryption',
        name: 'encryption',
        component: () => import('../views/EncryptionView.vue'),
        meta: {
          title: 'Text Encryption/Decryption',
          description:
            'Encrypt and decrypt text using AES, DES, and other algorithms. Privacy-first tool.'
        }
      },
      {
        path: 'bip39-generator',
        name: 'bip39-generator',
        component: () => import('../views/Bip39GeneratorView.vue'),
        meta: {
          title: 'BIP39 Mnemonic Generator',
          description:
            'Generate BIP39 mnemonic phrases and derive seeds. Privacy-first crypto tool.'
        }
      },
      {
        path: 'hmac-generator',
        name: 'hmac-generator',
        component: () => import('../views/HmacGeneratorView.vue'),
        meta: {
          title: 'HMAC Generator',
          description: 'Generate HMAC hashes using various algorithms. Privacy-first tool.'
        }
      },
      {
        path: 'rsa-key-pair-generator',
        name: 'rsa-key-pair-generator',
        component: () => import('../views/RsaKeyPairGeneratorView.vue'),
        meta: {
          title: 'RSA Key Pair Generator',
          description: 'Generate RSA public/private key pairs. Privacy-first crypto tool.'
        }
      },
      {
        path: 'password-strength-analyser',
        name: 'password-strength-analyser',
        component: () => import('../views/PasswordStrengthAnalyserView.vue'),
        meta: {
          title: 'Password Strength Analyzer',
          description: 'Analyze password strength and security. Privacy-first tool.'
        }
      },
      {
        path: 'pdf-signature-checker',
        name: 'pdf-signature-checker',
        component: () => import('../views/PdfSignatureCheckerView.vue'),
        meta: {
          title: 'PDF Signature Checker',
          description: 'Check and validate digital signatures in PDF files. Privacy-first tool.'
        }
      },
      // Converter Tools
      {
        path: 'integer-base-converter',
        name: 'integer-base-converter',
        component: () => import('../views/IntegerBaseConverterView.vue'),
        meta: {
          title: 'Integer Base Converter',
          description: 'Convert numbers between binary, octal, decimal, and hexadecimal.'
        }
      },
      {
        path: 'roman-numeral-converter',
        name: 'roman-numeral-converter',
        component: () => import('../views/RomanNumeralConverterView.vue'),
        meta: {
          title: 'Roman Numeral Converter',
          description: 'Convert between Roman numerals and numbers.'
        }
      },
      {
        path: 'base64-file-converter',
        name: 'base64-file-converter',
        component: () => import('../views/Base64FileConverterView.vue'),
        meta: {
          title: 'Base64 File Converter',
          description: 'Convert files to and from Base64 format. Privacy-first tool.'
        }
      },
      {
        path: 'text-to-nato-alphabet',
        name: 'text-to-nato-alphabet',
        component: () => import('../views/TextToNatoAlphabetView.vue'),
        meta: {
          title: 'Text to NATO Alphabet',
          description: 'Convert text to NATO phonetic alphabet.'
        }
      },
      {
        path: 'text-to-unicode',
        name: 'text-to-unicode',
        component: () => import('../views/TextToUnicodeView.vue'),
        meta: {
          title: 'Text to Unicode Converter',
          description: 'Convert text to Unicode code points and HTML entities.'
        }
      },
      {
        path: 'yaml-to-toml',
        name: 'yaml-to-toml',
        component: () => import('../views/YamlToTomlView.vue'),
        meta: {
          title: 'YAML to TOML Converter',
          description: 'Convert YAML configuration files to TOML format.'
        }
      },
      {
        path: 'json-to-toml',
        name: 'json-to-toml',
        component: () => import('../views/JsonToTomlView.vue'),
        meta: { title: 'JSON to TOML Converter', description: 'Convert JSON to TOML format.' }
      },
      {
        path: 'list-converter',
        name: 'list-converter',
        component: () => import('../views/ListConverterView.vue'),
        meta: {
          title: 'List Converter',
          description: 'Convert lists between different formats (comma, newline, JSON, etc).'
        }
      },
      {
        path: 'toml-to-json',
        name: 'toml-to-json',
        component: () => import('../views/TomlToJsonView.vue'),
        meta: {
          title: 'TOML to JSON Converter',
          description: 'Convert TOML configuration files to JSON format.'
        }
      },
      {
        path: 'toml-to-yaml',
        name: 'toml-to-yaml',
        component: () => import('../views/TomlToYamlView.vue'),
        meta: {
          title: 'TOML to YAML Converter',
          description: 'Convert TOML configuration files to YAML format.'
        }
      },
      {
        path: 'xml-json-converter',
        name: 'xml-json-converter',
        component: () => import('../views/XmlJsonConverterView.vue'),
        meta: {
          title: 'XML ↔ JSON Converter',
          description: 'Convert XML to JSON and vice versa entirely client-side.'
        }
      },
      {
        path: 'xml-to-json',
        name: 'xml-to-json',
        component: () => import('../views/XmlToJsonView.vue'),
        meta: {
          title: 'XML to JSON Converter',
          description: 'Convert XML documents to JSON format.'
        }
      },
      {
        path: 'json-to-xml',
        name: 'json-to-xml',
        component: () => import('../views/JsonToXmlView.vue'),
        meta: { title: 'JSON to XML Converter', description: 'Convert JSON data to XML format.' }
      },
      {
        path: 'markdown-to-html',
        name: 'markdown-to-html',
        component: () => import('../views/MarkdownToHtmlView.vue'),
        meta: {
          title: 'Markdown to HTML Converter',
          description: 'Convert Markdown to HTML with syntax highlighting.'
        }
      },
      // Web Tools
      {
        path: 'url-encoder',
        name: 'url-encoder',
        component: () => import('../views/UrlEncoderView.vue'),
        meta: {
          title: 'URL Encoder/Decoder',
          description: 'Encode and decode URL strings. Privacy-first tool.'
        }
      },
      {
        path: 'html-entities',
        name: 'html-entities',
        component: () => import('../views/HtmlEntitiesView.vue'),
        meta: {
          title: 'HTML Entities Encoder/Decoder',
          description: 'Encode and decode HTML entities.'
        }
      },
      {
        path: 'device-information',
        name: 'device-information',
        component: () => import('../views/DeviceInformationView.vue'),
        meta: { title: 'Device Information', description: 'View browser and device information.' }
      },
      {
        path: 'basic-auth-generator',
        name: 'basic-auth-generator',
        component: () => import('../views/BasicAuthGeneratorView.vue'),
        meta: {
          title: 'HTTP Basic Auth Generator',
          description: 'Generate HTTP Basic Authentication headers.'
        }
      },
      {
        path: 'meta-tag-generator',
        name: 'meta-tag-generator',
        component: () => import('../views/MetaTagGeneratorView.vue'),
        meta: {
          title: 'Meta Tag Generator',
          description: 'Generate HTML meta tags for SEO and social sharing.'
        }
      },
      {
        path: 'otp-code-generator',
        name: 'otp-code-generator',
        component: () => import('../views/OtpCodeGeneratorView.vue'),
        meta: {
          title: 'OTP/TOTP Generator',
          description: 'Generate TOTP codes from secrets. Privacy-first tool.'
        }
      },
      {
        path: 'mime-types',
        name: 'mime-types',
        component: () => import('../views/MimeTypesView.vue'),
        meta: { title: 'MIME Type Lookup', description: 'Look up MIME types for file extensions.' }
      },
      {
        path: 'keycode-info',
        name: 'keycode-info',
        component: () => import('../views/KeycodeInfoView.vue'),
        meta: { title: 'Keycode Info', description: 'Get keyboard keycode information.' }
      },
      {
        path: 'slugify-string',
        name: 'slugify-string',
        component: () => import('../views/SlugifyStringView.vue'),
        meta: { title: 'Slugify String', description: 'Convert text to URL-friendly slugs.' }
      },

      {
        path: 'html-wysiwyg-editor',
        name: 'html-wysiwyg-editor',
        component: () => import('../views/HtmlWysiwygEditorView.vue'),
        meta: { title: 'WYSIWYG HTML Editor', description: 'Rich text HTML editor.' }
      },
      {
        path: 'user-agent-parser',
        name: 'user-agent-parser',
        component: () => import('../views/UserAgentParserView.vue'),
        meta: { title: 'User Agent Parser', description: 'Parse and analyze user agent strings.' }
      },
      {
        path: 'json-diff',
        name: 'json-diff',
        component: () => import('../views/JsonDiffView.vue'),
        meta: {
          title: 'JSON Diff',
          description: 'Compare and find differences between JSON objects.'
        }
      },
      {
        path: 'safelink-decoder',
        name: 'safelink-decoder',
        component: () => import('../views/SafelinkDecoderView.vue'),
        meta: { title: 'Outlook Safelink Decoder', description: 'Decode Outlook safelink URLs.' }
      },
      // Images/Videos Tools
      {
        path: 'wifi-qr-code-generator',
        name: 'wifi-qr-code-generator',
        component: () => import('../views/WifiQrCodeGeneratorView.vue'),
        meta: {
          title: 'WiFi QR Code Generator',
          description: 'Generate QR codes for WiFi network credentials.'
        }
      },
      {
        path: 'svg-placeholder-generator',
        name: 'svg-placeholder-generator',
        component: () => import('../views/SvgPlaceholderGeneratorView.vue'),
        meta: {
          title: 'SVG Placeholder Generator',
          description: 'Generate SVG placeholder images.'
        }
      },
      {
        path: 'camera-recorder',
        name: 'camera-recorder',
        component: () => import('../views/CameraRecorderView.vue'),
        meta: {
          title: 'Camera Recorder',
          description: 'Record video from your camera in the browser.'
        }
      },
      // Development Tools
      {
        path: 'git-memo',
        name: 'git-memo',
        component: () => import('../views/GitMemoView.vue'),
        meta: { title: 'Git Cheat Sheet', description: 'Common Git commands and their usage.' }
      },
      {
        path: 'random-port-generator',
        name: 'random-port-generator',
        component: () => import('../views/RandomPortGeneratorView.vue'),
        meta: {
          title: 'Random Port Generator',
          description: 'Generate random port numbers for development.'
        }
      },
      {
        path: 'json-viewer',
        name: 'json-viewer',
        component: () => import('../views/JsonViewerView.vue'),
        meta: { title: 'JSON Viewer/Formatter', description: 'Format and beautify JSON data.' }
      },
      {
        path: 'json-minify',
        name: 'json-minify',
        component: () => import('../views/JsonMinifyView.vue'),
        meta: { title: 'JSON Minifier', description: 'Minify JSON to reduce size.' }
      },
      {
        path: 'chmod-calculator',
        name: 'chmod-calculator',
        component: () => import('../views/ChmodCalculatorView.vue'),
        meta: { title: 'Chmod Calculator', description: 'Calculate Unix file permissions.' }
      },
      {
        path: 'docker-run-to-compose',
        name: 'docker-run-to-compose',
        component: () => import('../views/DockerRunToComposeView.vue'),
        meta: {
          title: 'Docker Run to Compose',
          description: 'Convert docker run commands to docker-compose.yml.'
        }
      },
      {
        path: 'xml-formatter',
        name: 'xml-formatter',
        component: () => import('../views/XmlFormatterView.vue'),
        meta: { title: 'XML Formatter', description: 'Format and beautify XML documents.' }
      },
      {
        path: 'yaml-viewer',
        name: 'yaml-viewer',
        component: () => import('../views/YamlViewerView.vue'),
        meta: { title: 'YAML Viewer', description: 'Format and validate YAML documents.' }
      },
      {
        path: 'email-normalizer',
        name: 'email-normalizer',
        component: () => import('../views/EmailNormalizerView.vue'),
        meta: { title: 'Email Normalizer', description: 'Normalize and validate email addresses.' }
      },
      {
        path: 'regex-memo',
        name: 'regex-memo',
        component: () => import('../views/RegexMemoView.vue'),
        meta: {
          title: 'Regex Cheat Sheet',
          description: 'Regular expression patterns and syntax reference.'
        }
      },
      // Network Tools
      {
        path: 'ipv4-subnet-calculator',
        name: 'ipv4-subnet-calculator',
        component: () => import('../views/Ipv4SubnetCalculatorView.vue'),
        meta: { title: 'IPv4 Subnet Calculator', description: 'Calculate IPv4 subnet information.' }
      },
      {
        path: 'ipv4-address-converter',
        name: 'ipv4-address-converter',
        component: () => import('../views/Ipv4AddressConverterView.vue'),
        meta: {
          title: 'IPv4 Address Converter',
          description: 'Convert IPv4 addresses to different formats.'
        }
      },
      {
        path: 'ipv4-range-expander',
        name: 'ipv4-range-expander',
        component: () => import('../views/Ipv4RangeExpanderView.vue'),
        meta: {
          title: 'IPv4 Range Expander',
          description: 'Expand IPv4 address ranges to individual IPs.'
        }
      },
      {
        path: 'mac-address-lookup',
        name: 'mac-address-lookup',
        component: () => import('../views/MacAddressLookupView.vue'),
        meta: {
          title: 'MAC Address Lookup',
          description: 'Look up MAC address vendor information.'
        }
      },
      {
        path: 'mac-address-generator',
        name: 'mac-address-generator',
        component: () => import('../views/MacAddressGeneratorView.vue'),
        meta: { title: 'MAC Address Generator', description: 'Generate random MAC addresses.' }
      },
      {
        path: 'ipv6-ula-generator',
        name: 'ipv6-ula-generator',
        component: () => import('../views/Ipv6UlaGeneratorView.vue'),
        meta: { title: 'IPv6 ULA Generator', description: 'Generate IPv6 Unique Local Addresses.' }
      },
      // Math Tools
      {
        path: 'eta-calculator',
        name: 'eta-calculator',
        component: () => import('../views/EtaCalculatorView.vue'),
        meta: { title: 'ETA Calculator', description: 'Calculate estimated time of arrival.' }
      },
      // Measurement Tools
      {
        path: 'chronometer',
        name: 'chronometer',
        component: () => import('../views/ChronometerView.vue'),
        meta: { title: 'Chronometer', description: 'Online stopwatch and timer.' }
      },
      {
        path: 'temperature-converter',
        name: 'temperature-converter',
        component: () => import('../views/TemperatureConverterView.vue'),
        meta: { title: 'Temperature Converter', description: 'Convert between temperature units.' }
      },
      {
        path: 'benchmark-builder',
        name: 'benchmark-builder',
        component: () => import('../views/BenchmarkBuilderView.vue'),
        meta: { title: 'Benchmark Builder', description: 'Benchmark JavaScript code performance.' }
      },
      // Text Tools
      {
        path: 'text-statistics',
        name: 'text-statistics',
        component: () => import('../views/TextStatisticsView.vue'),
        meta: {
          title: 'Text Statistics',
          description: 'Analyze text statistics (characters, words, etc).'
        }
      },
      {
        path: 'emoji-picker',
        name: 'emoji-picker',
        component: () => import('../views/EmojiPickerView.vue'),
        meta: { title: 'Emoji Picker', description: 'Browse and copy emojis.' }
      },
      {
        path: 'string-obfuscator',
        name: 'string-obfuscator',
        component: () => import('../views/StringObfuscatorView.vue'),
        meta: { title: 'String Obfuscator', description: 'Obfuscate text with hidden characters.' }
      },
      {
        path: 'numeronym-generator',
        name: 'numeronym-generator',
        component: () => import('../views/NumeronymGeneratorView.vue'),
        meta: { title: 'Numeronym Generator', description: 'Generate numeronyms like i18n, k8s.' }
      },
      {
        path: 'ascii-text-drawer',
        name: 'ascii-text-drawer',
        component: () => import('../views/AsciiTextDrawerView.vue'),
        meta: { title: 'ASCII Text Drawer', description: 'Generate ASCII art text.' }
      },
      // Data Tools
      {
        path: 'phone-parser',
        name: 'phone-parser',
        component: () => import('../views/PhoneParserView.vue'),
        meta: { title: 'Phone Parser & Formatter', description: 'Parse and format phone numbers.' }
      },
      {
        path: 'iban-validator',
        name: 'iban-validator',
        component: () => import('../views/IbanValidatorView.vue'),
        meta: { title: 'IBAN Validator & Parser', description: 'Validate and parse IBAN numbers.' }
      },
      // Additional missing routes
      {
        path: 'qr-code-generator',
        name: 'qr-code-generator',
        component: () => import('../views/QRCodeGeneratorView.vue'),
        meta: { title: 'QR Code Generator', description: 'Generate QR codes from text and URLs.' }
      },
      {
        path: 'crontab-generator',
        name: 'crontab-generator',
        component: () => import('../views/CrontabGeneratorView.vue'),
        meta: {
          title: 'Crontab Generator',
          description: 'Generate cron expressions with visual builder.'
        }
      },
      {
        path: 'regex-tester',
        name: 'regex-tester',
        component: () => import('../views/RegexTesterView.vue'),
        meta: { title: 'Regex Tester', description: 'Test and debug regular expressions.' }
      },
      {
        path: 'math-evaluator',
        name: 'math-evaluator',
        component: () => import('../views/MathEvaluatorView.vue'),
        meta: { title: 'Math Evaluator', description: 'Evaluate mathematical expressions.' }
      },
      {
        path: 'percentage-calculator',
        name: 'percentage-calculator',
        component: () => import('../views/PercentageCalculatorView.vue'),
        meta: {
          title: 'Percentage Calculator',
          description: 'Calculate percentages, increases, and decreases.'
        }
      },
      {
        path: 'token-generator',
        name: 'token-generator',
        component: () => import('../views/TokenGeneratorView.vue'),
        meta: { title: 'Token Generator', description: 'Generate secure random tokens.' }
      },
      {
        path: 'hash-text',
        name: 'hash-text',
        component: () => import('../views/HashTextView.vue'),
        meta: { title: 'Hash Text', description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes.' }
      },
      {
        path: 'xml-json',
        name: 'xml-json',
        component: () => import('../views/tools/XmlJsonConverter.vue'),
        meta: {
          title: 'XML ↔ JSON Converter',
          description: 'Bi-directional XML to JSON converter with real-time conversion and clipboard support. 100% client-side, zero server API calls.'
        }
      },
      {
        path: 'ulid-generator',
        name: 'ulid-generator',
        component: () => import('../views/ULIDGeneratorView.vue'),
        meta: {
          title: 'ULID Generator',
          description: 'Generate Universally Unique Lexicographically Sortable Identifiers.'
        }
      },
      {
        path: 'case-converter',
        name: 'case-converter',
        component: () => import('../views/CaseConverterView.vue'),
        meta: {
          title: 'Case Converter',
          description: 'Convert text between camelCase, snake_case, kebab-case, etc.'
        }
      },
      {
        path: 'date-time-converter',
        name: 'date-time-converter',
        component: () => import('../views/DateTimeConverterView.vue'),
        meta: {
          title: 'Date-Time Converter',
          description: 'Convert dates and times between formats.'
        }
      },
      {
        path: 'color-converter',
        name: 'color-converter',
        component: () => import('../views/ColorConverterView.vue'),
        meta: {
          title: 'Color Converter',
          description: 'Convert colors between HEX, RGB, HSL formats.'
        }
      },
      {
        path: 'text-to-binary',
        name: 'text-to-binary',
        component: () => import('../views/TextToBinaryView.vue'),
        meta: {
          title: 'Text to Binary Converter',
          description: 'Convert text to binary and vice versa.'
        }
      },
      {
        path: 'http-status-codes',
        name: 'http-status-codes',
        component: () => import('../views/HTTPStatusCodesView.vue'),
        meta: {
          title: 'HTTP Status Codes',
          description: 'Reference for HTTP status codes and meanings.'
        }
      },
      {
        path: 'url-parser',
        name: 'url-parser',
        component: () => import('../views/URLParserView.vue'),
        meta: { title: 'URL Parser', description: 'Parse and analyze URL components.' }
      },
      {
        path: 'tutorial',
        name: 'tutorial',
        component: () => import('../views/TutorialView.vue'),
        meta: {
          title: 'Agent Orchestrator Tutorial - Learn in 5 Minutes',
          description: 'Interactive tutorial to teaches you how to create agents, assign tasks, and monitor progress in Agent Orchestrator.',
          keywords: 'agent orchestrator tutorial, how to use agent orchestrator, ai agents tutorial'
        }
      }
    ]
  }
]
