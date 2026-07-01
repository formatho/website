import AppLayout from '../layouts/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import MarkdownView from '../views/MarkdownView.vue'
import { blogPosts } from '../data/blogPosts'

// Generate static routes for each blog post (for SSG pre-rendering)
// Store slug in meta since props don't work reliably during SSR
const blogPostRoutes = blogPosts.map((post) => ({
  path: `blogs/${post.slug}`,
  name: `blog-post-${post.slug}`,
  component: () => import(/* webpackPrefetch: true */ '../views/BlogPostView.vue'),
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
        redirect: '/tools'
      },
      {
        path: 'tools',
        name: 'home',
        component: HomeView,
        meta: {
          title: 'Formatho - 100+ Free Privacy-First Developer Tools & AI Agent Platform',
          description:
            '100+ free online developer tools that run in your browser. JSON formatter, Base64, UUID, and more. Plus Agent Orchestrator for AI-powered workflows. Zero tracking, 100% client-side.',
          keywords:
            'developer tools, json formatter, base64 encoder, uuid generator, privacy-first tools, ai agent orchestrator, agent todo, online utilities, free developer tools, client-side tools'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackPrefetch: true */ '../views/AboutView.vue'),
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
        component: () => import(/* webpackPrefetch: true */ '../views/docs/ApiDocsView.vue'),
        meta: {
          title: 'API Documentation - Agent Orchestrator | Formatho',
          description:
            'Comprehensive REST API documentation for Agent Orchestrator. Interactive examples, authentication guides, and code snippets in JavaScript, Python, and Go.',
          keywords:
            'api documentation, rest api, agent orchestrator api, developer docs, interactive api, code examples'
        }
      },
      {
        path: 'beta',
        name: 'beta',
        component: () => import(/* webpackPrefetch: true */ '../views/BetaView.vue'),
        meta: {
          title: 'Beta Program - Agent Orchestrator | Formatho',
          description:
            'Become a founding beta tester for Agent Orchestrator. Get 6 months free Pro tier ($294 value) and shape the future of AI agent automation.',
          keywords:
            'beta tester, agent orchestrator beta, early access, free pro tier, ai agents, developer tools beta'
        }
      },
      {
        path: 'compare',
        name: 'compare',
        component: () => import(/* webpackPrefetch: true */ '../views/CompareView.vue'),
        meta: {
          title: 'Agent-Todo vs Zapier, n8n, Make - Comparison | Formatho',
          description:
            'Compare Agent-Todo with Zapier, n8n, and Make. See why Agent-Todo is the privacy-first, developer-friendly choice for AI agent task management.',
          keywords:
            'zapier alternative, n8n alternative, make alternative, agent todo comparison, privacy first automation, ai agent task management'
        }
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import(/* webpackPrefetch: true */ '../views/BlogsView.vue'),
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
        component: () => import(/* webpackPrefetch: true */ '../views/BlogPostView.vue'),
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
        component: () => import(/* webpackPrefetch: true */ '../views/PrivacyPolicyView.vue'),
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
        component: () => import(/* webpackPrefetch: true */ '../views/TermsOfServiceView.vue'),
        meta: {
          title: 'Terms of Service - Formatho',
          description:
            'Terms of service for Formatho developer tools and AI agent platform.',
          keywords: 'terms of service, legal, usage terms'
        }
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import(/* webpackPrefetch: true */ '../views/ContactView.vue'),
        meta: {
          title: 'Contact Us - Formatho',
          description:
            'Get in touch with the Formatho team. Report bugs, request features, or join our community.',
          keywords: 'contact, support, feedback, github'
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
        path: 'tools/markdown',
        name: 'tools-markdown',
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
        path: 'tools/json-yaml',
        name: 'json-yaml',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonYamlView.vue'),
        meta: {
          title: 'JSON to YAML Converter Online - Free | Formatho',
          description:
            'Convert JSON to YAML and YAML to JSON online instantly. Free converter for config files, Kubernetes manifests, docker-compose, and CI/CD configs. 100% client-side — your data never leaves your browser.',
          keywords:
            'json to yaml converter, yaml to json, convert json yaml online, json yaml converter free, kubernetes yaml converter, docker compose converter, json yaml online tool, privacy-first'
        }
      },
      {
        path: 'tools/json-csv',
        name: 'json-csv',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonCsvView.vue'),
        meta: {
          title: 'JSON to CSV Converter Online - Free | Formatho',
          description:
            'Convert JSON to CSV and CSV to JSON online instantly. Free converter for data export, spreadsheet import, and API data transformation. Handles nested objects and arrays. 100% client-side, no upload.',
          keywords:
            'json to csv converter, csv to json, convert json csv online, json csv free tool, csv json transformer, excel json converter, data conversion tool, privacy-first'
        }
      },
      {
        path: 'tools/diff',
        name: 'diff',
        component: () => import(/* webpackPrefetch: true */ '../views/DiffView.vue'),
        meta: {
          title: 'Text Diff Checker Online - Free File Comparison Tool | Formatho',
          description:
            'Compare two texts online and highlight differences instantly. Free diff checker for code review, document comparison, and version tracking. Shows additions, deletions, and changes side-by-side. 100% client-side.',
          keywords:
            'text diff online, diff checker, compare text online, file comparison tool, text difference, code diff, diff tool free, online text compare, privacy-first'
        }
      },
      {
        path: 'tools/base64',
        name: 'base64',
        component: () => import(/* webpackPrefetch: true */ '../views/Base64View.vue'),
        meta: {
          title: 'Base64 Encoder & Decoder Online - Free | Formatho',
          description:
            'Encode text to Base64 or decode Base64 to text online instantly. Free Base64 converter supports UTF-8, files, and URLs. No signup, 100% client-side — your data never leaves your browser.',
          keywords:
            'base64 encoder online, base64 decoder online, base64 converter, decode base64, encode base64, base64 to text, text to base64, base64 online tool, free base64, privacy-first'
        }
      },
      {
        path: 'tools/jwt',
        name: 'jwt',
        component: () => import(/* webpackPrefetch: true */ '../views/JwtView.vue'),
        meta: {
          title: 'JWT Decoder Online - Decode JSON Web Tokens Free | Formatho',
          description:
            'Decode JWT (JSON Web Tokens) online instantly. Inspect JWT header, payload, and signature. Check expiry, validate claims, and debug auth tokens. Free JWT debugger — 100% client-side, tokens never leave your browser.',
          keywords:
            'jwt decoder online, decode jwt, jwt debugger, jwt inspector, json web token decoder, jwt payload viewer, jwt validator, jwt expiry checker, free jwt tool, privacy-first'
        }
      },
      {
        path: 'tools/sql',
        name: 'sql',
        component: () => import(/* webpackPrefetch: true */ '../views/SqlFormatterView.vue'),
        meta: {
          title: 'SQL Formatter Online - Free SQL Beautifier | Formatho',
          description:
            'Format and beautify SQL queries online instantly. Free SQL formatter supporting PostgreSQL, MySQL, SQLite, T-SQL, and more. Beautify minified SQL, validate syntax, and improve readability. 100% client-side.',
          keywords:
            'sql formatter online, sql beautifier, format sql online, sql prettifier, sql format tool, free sql formatter, postgresql formatter, mysql formatter, sqlite formatter, privacy-first'
        }
      },
      {
        path: 'tools/sql-to-er-diagram',
        name: 'sql-to-er-diagram',
        component: () => import(/* webpackPrefetch: true */ '../views/SqlToErDiagramView.vue'),
        meta: {
          title: 'SQL to ER Diagram Converter - Visualize Database Schema | Formatho',
          description: 'Convert CREATE TABLE SQL statements into interactive ER diagrams instantly. Visualize tables, columns, primary keys, and foreign key relationships. Export as Mermaid for AI tools. Free, 100% client-side.',
          keywords: 'sql to er diagram, erd generator, database schema visualizer, create table to erd, entity relationship diagram, sql schema visualizer, free erd tool, mermaid er diagram, privacy-first'
        }
      },
      {
        path: 'tools/sql-query-plan-visualizer',
        name: 'sql-query-plan-visualizer',
        component: () => import(/* webpackPrefetch: true */ '../views/SqlQueryPlanVisualizerView.vue'),
        meta: {
          title: 'SQL Query Plan Visualizer - Analyze & Optimize Queries | Formatho',
          description: 'Visualize SQL execution plans step by step. Understand table scans, joins, sorts, and aggregates. Get actionable optimization tips for PostgreSQL, MySQL, and more. Free, 100% client-side.',
          keywords: 'sql query plan, execution plan visualizer, sql optimizer, query analysis, explain plan, sql performance, database optimization, free sql tool, privacy-first'
        }
      },
      {
        path: 'tools/sql-dialect-converter',
        name: 'sql-dialect-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/SqlDialectConverterView.vue'),
        meta: {
          title: 'SQL Dialect Converter - PostgreSQL, MySQL, SQLite, T-SQL | Formatho',
          description: 'Convert SQL queries between PostgreSQL, MySQL, SQLite, SQL Server, BigQuery, Snowflake, and more. Handles syntax differences, data types, and dialect-specific functions. Free, 100% client-side.',
          keywords: 'sql dialect converter, postgresql to mysql, mysql to postgresql, sql converter, tsql converter, sql translation, database migration tool, free sql converter, privacy-first'
        }
      },
      {
        path: 'tools/foreign-key-visualizer',
        name: 'foreign-key-visualizer',
        component: () => import(/* webpackPrefetch: true */ '../views/FkVisualizerView.vue'),
        meta: {
          title: 'Foreign Key Visualizer - Map Database Relationships | Formatho',
          description: 'Visualize foreign key relationships in your SQL schema. See how tables connect, find orphaned tables, and export relationship diagrams as Mermaid. Free, 100% client-side.',
          keywords: 'foreign key visualizer, fk relationships, database relationships, schema relationships, sql fk mapper, table relationships visualizer, free database tool, privacy-first'
        }
      },
      {
        path: 'tools/all',
        name: 'tools-all',
        component: () => import(/* webpackPrefetch: true */ '../views/ToolsView.vue'),
        meta: {
          title: 'All Developer Tools - Formatho',
          description:
            'Complete collection of privacy-first developer tools. JSON, YAML, encoding, hashing, crypto, and more. All tools run in your browser.',
          keywords:
            'developer tools, json formatter, yaml validator, base64 encoder, hash generator, privacy-first tools'
        }
      },
      {
        path: 'tools/uuid',
        name: 'uuid',
        component: () => import(/* webpackPrefetch: true */ '../views/UuidGeneratorView.vue'),
        meta: {
          title: 'UUID Generator Online - Free UUID v4 & v1 | Formatho',
          description:
            'Generate UUIDs online instantly — UUID v4, v1, v3, and v5. Create single or batch unique identifiers for databases, APIs, and distributed systems. Free, 100% client-side, no signup required.',
          keywords:
            'uuid generator online, uuid v4 generator, generate uuid online, guid generator, unique id generator, uuid v1, uuid v5, random uuid, batch uuid generator, free uuid tool, privacy-first'
        }
      },
      {
        path: 'tools/lorem',
        name: 'lorem',
        component: () => import(/* webpackPrefetch: true */ '../views/LoremIpsumView.vue'),
        meta: {
          title: 'Lorem Ipsum Generator Online - Free Placeholder Text | Formatho',
          description:
            'Generate Lorem Ipsum placeholder text online instantly. Create paragraphs, sentences, and words for mockups, wireframes, and design templates. Free dummy text generator — 100% client-side.',
          keywords:
            'lorem ipsum generator, placeholder text, dummy text generator, lorem ipsum, privacy-first'
        }
      },
      {
        path: 'tools/image',
        name: 'image',
        component: () => import(/* webpackPrefetch: true */ '../views/ImageCompressorView.vue'),
        meta: {
          title: 'Image Compressor - Reduce Image Size Free Online | Formatho',
          description: 'Compress JPG, PNG, and WebP images by up to 80% without quality loss. Perfect for reducing AI-generated image sizes, optimizing web performance, and saving storage. Resize, convert, and batch process images — all in your browser, 100% private.',
          keywords: 'image compressor, compress image online, reduce image size, optimize images, ai image compressor, webp compressor, png optimizer, jpg reducer, batch image compression, free image tool, privacy-first'
        }
      },
      {
        path: 'tools/json-lint',
        name: 'json-lint',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonLintView.vue'),
        meta: {
          title: 'JSON Validator Online - Free JSON Formatter & Linter | Formatho',
          description:
            'Free online JSON validator and formatter. Check JSON syntax errors, beautify minified JSON, and validate API responses instantly in your browser. No upload, 100% private. Supports JSON5 comments.',
          keywords:
            'json validator online, json formatter online, json linter, validate json, json checker, json beautifier, json parser online, json syntax checker, json to pretty, free json tool, privacy-first'
        }
      },
      {
        path: 'tools/yaml-lint',
        name: 'yaml-lint',
        component: () => import(/* webpackPrefetch: true */ '../views/YamlLintView.vue'),
        meta: {
          title: 'YAML Validator Online - Free YAML Linter & Formatter | Formatho',
          description:
            'Free online YAML validator and formatter. Check YAML syntax errors, format and beautify YAML instantly. Validate docker-compose, Kubernetes configs, CI/CD pipelines, and more. 100% client-side, no data uploaded.',
          keywords:
            'yaml linter, yaml validator, yaml formatter, validate yaml, yaml checker, privacy-first'
        }
      },
      {
        path: 'tools/bpmn',
        name: 'bpmn',
        component: () => import(/* webpackPrefetch: true */ '../views/BpmnView.vue'),
        meta: {
          title: 'BPMN Viewer & PDF Exporter',
          description:
            'Visualize BPMN 2.0 diagrams and export them as PDF. Free, privacy-first BPMN viewer that runs entirely in your browser.',
          keywords:
            'bpmn viewer, bpmn to pdf, bpmn diagram, business process model, bpmn export, privacy-first'
        }
      },
      {
        path: 'tools/bpmn-to-visio',
        name: 'bpmn-to-visio',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/BpmnToVisioConverterView.vue'),
        meta: {
          title: 'BPMN to Visio Converter',
          description:
            'Convert BPMN process diagrams into Microsoft Visio compatible formats. Free, privacy-first converter that runs entirely in your browser.',
          keywords:
            'bpmn to visio, bpmn converter, visio converter, process diagram, bpmn export, microsoft visio, privacy-first'
        }
      },
      {
        path: 'tools/visio-viewer',
        name: 'visio-viewer',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/tools/VisioViewer.vue'),
        meta: {
          title: 'Visio File Viewer',
          description:
            'View Microsoft Visio diagrams (.vsdx, .vsd) directly in your browser. Free, privacy-first Visio viewer that runs entirely client-side.',
          keywords:
            'visio viewer, visio file viewer, vsdx viewer, vsd viewer, microsoft visio, diagram viewer, visio online, privacy-first'
        }
      },
      {
        path: 'tools/evm-converter',
        name: 'evm-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/EvmUnitConverterView.vue'),
        meta: {
          title: 'Ethereum Unit Converter Online - Wei, Gwei, Ether | Formatho',
          description:
            'Convert between Wei, Gwei, and Ether instantly. Essential tool for Ethereum developers.',
          keywords:
            'ethereum unit converter, wei converter, gwei converter, ether converter, evm tools'
        }
      },
      {
        path: 'tools/bls-signature',
        name: 'bls-signature',
        component: () => import(/* webpackPrefetch: true */ '../views/BlsSignatureView.vue'),
        meta: {
          title: 'BLS Signatures — Generate, Verify & Aggregate',
          description:
            'Generate BLS12-381 signatures, verify signatures, and aggregate multiple signatures into one. 100% client-side, privacy-first.',
          keywords: 'bls signature, bls12-381, aggregate signatures, threshold signatures, boneh lynn shacham, ethereum consensus'
        }
      },
      {
        path: 'tools/keccak256',
        name: 'keccak256',
        component: () => import(/* webpackPrefetch: true */ '../views/KeccakHasherView.vue'),
        meta: {
          title: 'Keccak-256 Hash Generator Online - Free & Privacy-First | Formatho',
          description:
            'Calculate Keccak-256 hashes instantly online. Supports UTF-8, UTF-16, Hex, Base64. 100% client-side, no data leaves your browser. Free tool for Ethereum and blockchain developers.',
          keywords: 'keccak-256 hash generator, keccak256 online, ethereum hash, solidity keccak256, blockchain hash, client-side hash, privacy-first, utf-8 hashing, utf-16 hashing, hex hashing, base64 hashing'
        }
      },
      {
        path: 'tools/address-checksum',
        name: 'address-checksum',
        component: () => import(/* webpackPrefetch: true */ '../views/AddressChecksumView.vue'),
        meta: {
          title: 'Address Checksum (EIP-55)',
          description:
            'Validate and checksum Ethereum addresses (EIP-55). Ensure correct address formatting.',
          keywords: 'ethereum address checksum, eip-55 checksum, address validator, connect wallet'
        }
      },
      {
        path: 'tools/multi-chain-keys',
        name: 'multi-chain-keys',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/MultiChainKeyGeneratorView.vue'),
        meta: {
          title: 'Multi-Chain Key Generator',
          description:
            'Generate keys for Ethereum, Solana, Polkadot, and Cosmos from one mnemonic. Understand the algorithms.',
          keywords:
            'multi chain wallet, key generator, ethereum, solana, polkadot, cosmos, bip39, ed25519, secp256k1'
        }
      },
      {
        path: 'tools/address-from-key',
        name: 'address-from-key',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/AddressFromPrivateKeyView.vue'),
        meta: {
          title: 'Address from Private Key (Multi-Chain)',
          description:
            'Derive addresses for Ethereum, Bitcoin, Solana, and more from a private key. Runs entirely in browser.',
          keywords:
            'private key to address, eth address, btc address, solana address, multi chain tool'
        }
      },
      {
        path: 'tools/cosmos-address-generator',
        name: 'cosmos-address-generator',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/CosmosAddressGeneratorView.vue'),
        meta: {
          title: 'Cosmos Address Generator - ATOM, OSMO, JUNO, AKT, INJ & More | Formatho',
          description:
            'Free Cosmos address generator for Cosmos Hub (ATOM), Osmosis (OSMO), Juno (JUNO), Secret Network (SCRT), Stargaze (STARS), Akash (AKT), Kava (KAVA), Injective (INJ), Crescent (CRE), and Umee (UMEE). Generate Bech32 addresses from BIP39 seed phrases with real BIP32/BIP44 derivation. 100% client-side, privacy-first.',
          keywords:
            'cosmos address generator, cosmos hub address, atom address generator, osmosis address generator, osmo address, juno address generator, secret network address, scrt address, stargaze address, stars address, akash address generator, akt address, kava address, injective address, inj address, crescent address, cre address, umee address, bech32 address generator, bip39 cosmos, bip44 cosmos, cosmos wallet generator, cosmos seed phrase, cosmos mnemonic, multi chain wallet, secp256k1, blockchain address tool'
        }
      },
      {
        path: 'tools/rwa-deploy-lab',
        name: 'rwa-deploy-lab',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/RwaDeployLabView.vue'),
        meta: {
          title: 'RWA Tokenization Lab - Deploy ERC-20 Mirror Tokens & Fractional Assets On-Chain | Formatho',
          description:
            'Deploy real-world asset (RWA) smart contracts directly from your browser. Create ERC-20 mirror tokens for stocks like AAPL and AMZN, fractional ownership contracts, and custom tokenization contracts. Connect MetaMask or Rabby wallet, configure parameters, and deploy on Ethereum, Polygon, Arbitrum, Base, and Optimism. Free POC tool for RWA and DeFi developers.',
          keywords:
            'rwa tokenization, real world asset tokenization, rwa deployment tool, tokenization factory, erc20 mirror token deploy, fractional ownership contract, asset tokenization platform, rwa smart contract, tokenize real estate, tokenize stocks, aapl mirror token, amzn mirror token, create tokenized asset, factory pattern solidity, rwa defi, real world asset blockchain, metamask smart contract deploy, rabby wallet deploy, deploy erc20 browser, tokenization poc, rwa lab, blockchain asset tokenization, on-chain rwa, erc20 deployment tool, fractional shares, rwa project builder, defi poc tool, createasset, batch token deployment'
        }
      },
      {
        path: 'tools/solidity-to-opcodes',
        name: 'solidity-to-opcodes',
        component: () => import(/* webpackPrefetch: true */ '../views/SolidityToOpcodesView.vue'),
        meta: {
          title: 'Solidity to EVM Opcodes',
          description:
            'Compile Solidity to EVM Opcodes and Bytecode in your browser. View the assembly of your smart contracts.',
          keywords:
            'solidity compile, evm opcodes, smart contract assembly, solidity bytecode, compiler'
        }
      },
      {
        path: 'tools/abi-encoder',
        name: 'abi-encoder',
        component: () => import(/* webpackPrefetch: true */ '../views/AbiEncoderView.vue'),
        meta: {
          title: 'ABI Encoder & Decoder - Solidity Smart Contract ABI Tool | Formatho',
          description: 'Encode and decode Solidity ABI parameters, function calls, and constructor arguments. Generate function selectors and calldata for Foundry/Cast. Decode transaction input data. Supports all Solidity types. Free, 100% client-side.',
          keywords: 'abi encoder, abi decoder, solidity abi, abi encode online, function selector, calldata encoder, solidity encode, erc20 encode, foundry cast, ethers abi, viem abi, smart contract debugging, free abi tool, privacy-first'
        }
      },
      {
        path: 'agent-identity-generator',
        name: 'agent-identity-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/tools/AgentIdentityView.vue'),
      },
      {
        path: 'tools/agent-identity-generator',
        name: 'tools-agent-identity-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/tools/AgentIdentityView.vue'),
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
        component: () => import(/* webpackPrefetch: true */ '../views/LocalTokenCounterView.vue'),
      },
      {
        path: 'tools/local-token-counter',
        name: 'tools-local-token-counter',
        component: () => import(/* webpackPrefetch: true */ '../views/LocalTokenCounterView.vue'),
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
        component: () => import(/* webpackPrefetch: true */ '../views/AgentsView.vue'),
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
        component: () => import(/* webpackPrefetch: true */ '../views/AgentDetailView.vue'),
        meta: {
          title: 'Agent Details - View Reputation History & Metadata',
          description:
            'View detailed information about blockchain AI agents including reputation history, ratings, metadata, and transaction records. Track agent performance and feedback.',
          keywords:
            'agent details, agent reputation, blockchain agent history, ai agent ratings, crypto agent metadata, ethereum agent tracker'
        }
      },
      {
        path: 'get-verified',
        name: 'get-verified',
        component: () => import(/* webpackPrefetch: true */ '../views/GetVerifiedView.vue'),
        meta: {
          title: 'Get Verified - Formatho',
          description:
            'Privacy-first identity verification for developers. Coming soon from Formatho.',
          keywords:
            'identity verification, get verified, privacy-first, developer verification, trustless'
        }
      },
      {
        path: 'pricing',
        name: 'pricing',
        component: () => import(/* webpackPrefetch: true */ '../views/PricingView.vue'),
        meta: {
          title: 'Pricing - Formatho Agent Todo & Tools',
          description:
            'Simple, transparent pricing for Formatho Agent Todo. Start free with 3 agents, upgrade to Pro for unlimited power. No hidden fees.',
          keywords:
            'formatho pricing, agent todo pricing, ai agent task management pricing, developer tools pricing'
        }
      },
      {
        path: 'agent-todo',
        name: 'agent-todo',
        component: () => import(/* webpackPrefetch: true */ '../views/AgentTodoLandingView.vue'),
        meta: {
          title: 'Agent-Todo - Task Management for AI Agents',
          description:
            'Persistent task management built for AI agents. Stop losing context between sessions. Keep your AI workforce organized and productive.',
          keywords:
            'ai agent tasks, agent todo, task management for ai, persistent tasks, agent memory, ai workforce'
        }
      },
      {
        path: 'agent-orchestrator',
        name: 'agent-orchestrator',
        component: () => import(/* webpackPrefetch: true */ '../views/AgentOrchestratorView.vue'), // Landing page
      },
      {
        path: 'tools/agent-orchestrator',
        name: 'tools-agent-orchestrator',
        component: () => import(/* webpackPrefetch: true */ '../views/AgentOrchestratorView.vue'),
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
        component: () =>
          import(/* webpackPrefetch: true */ '../views/AgentOrchestratorDashboardView.vue'),
        meta: {
          title: 'Dashboard - Agent Orchestrator | Formatho',
          description:
            'Monitor and manage AI agents in real-time. View agent status, activity feed, and resource usage.',
          keywords: 'agent dashboard, ai monitoring, agent status, resource usage'
        }
      },
      {
        path: 'agent-orchestrator/:agentId',
        name: 'agent-detail',
        component: () => import(/* webpackPrefetch: true */ '../views/AgentDetailView.vue'),
        meta: {
          title: 'Agent Detail - Agent Orchestrator | Formatho',
          description: 'View agent status, controls, live logs, and task history.',
          keywords: 'agent detail, agent log, task history'
        }
      },
      {
        path: 'agent-orchestrator/todo',
        name: 'todo-queue',
        component: () => import(/* webpackPrefetch: true */ '../views/TODOQueueView.vue'),
        meta: {
          title: 'TODO Queue - Agent Orchestrator | Formatho',
          description: 'Manage priority queue, track progress, and filter tasks.',
          keywords: 'task queue, todo list, task management, priorities'
        }
      },
      {
        path: 'agent-orchestrator/cron',
        name: 'cron-scheduler',
        component: () => import(/* webpackPrefetch: true */ '../views/CrontabGeneratorView.vue'),
        meta: {
          title: 'Cron Scheduler - Agent Orchestrator | Formatho',
          description: 'Manage scheduled jobs and view run history.',
          keywords: 'cron scheduler, job scheduling, automated tasks'
        }
      },
      {
        path: 'agent-orchestrator/config',
        name: 'configuration',
        component: () => import(/* webpackPrefetch: true */ '../views/ConfigurationView.vue'),
        meta: {
          title: 'Configuration - Agent Orchestrator | Formatho',
          description: 'Configure global settings, LLM providers, and skill permissions.',
          keywords: 'settings, configuration, LLM config, API keys'
        }
      },
      {
        path: 'agent-orchestrator/analytics',
        name: 'analytics-dashboard',
        component: () => import(/* webpackPrefetch: true */ '../views/AnalyticsDashboardView.vue'),
        meta: {
          title: 'Analytics Dashboard - Agent Orchestrator | Formatho (Pro)',
          description:
            'Advanced analytics dashboard for agent performance tracking, task completion trends, and team collaboration insights. Pro feature.',
          keywords:
            'analytics dashboard, agent performance, task analytics, export data, csv export, json export'
        }
      },
      // Crypto Tools
      {
        path: 'tools/bcrypt',
        name: 'bcrypt',
        component: () => import(/* webpackPrefetch: true */ '../views/BcryptView.vue'),
        meta: {
          title: 'Bcrypt Hash Generator Online - Free Password Hasher | Formatho',
          description:
            'Generate bcrypt password hashes online with custom cost factors (4-31). Compare and verify bcrypt hashes. Free tool for Node.js and Python password hashing. 100% client-side — passwords never leave your browser.'
        }
      },
      {
        path: 'tools/encryption',
        name: 'encryption',
        component: () => import(/* webpackPrefetch: true */ '../views/EncryptionView.vue'),
        meta: {
          title: 'AES Encryption Tool Online - Encrypt Text Free | Formatho',
          description:
            'Encrypt and decrypt text online with AES-256, DES, and TripleDES. Free client-side encryption tool — your text and keys never leave your browser. Perfect for encrypting sensitive messages and API keys.'
        }
      },
      {
        path: 'tools/bip39-generator',
        name: 'bip39-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/Bip39GeneratorView.vue'),
        meta: {
          title: 'BIP39 Mnemonic Generator',
          description:
            'Generate BIP39 mnemonic phrases and derive seeds. Privacy-first crypto tool.'
        }
      },
      {
        path: 'tools/crypto-forecasts',
        name: 'crypto-forecasts',
        component: () => import(/* webpackPrefetch: true */ '../views/CryptoForecastsView.vue'),
        meta: {
          title: 'AI-Powered Crypto Price Forecasts',
          description:
            '30-day crypto price predictions using Google TimesFM 2.5. Privacy-first AI forecasts for BTC, ETH, SOL, and more.'
        }
      },
      {
        path: 'tools/hmac-generator',
        name: 'hmac-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/HmacGeneratorView.vue'),
        meta: {
          title: 'HMAC Generator',
          description: 'Generate HMAC hashes using various algorithms. Privacy-first tool.'
        }
      },
      {
        path: 'tools/rsa-key-pair-generator',
        name: 'rsa-key-pair-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/RsaKeyPairGeneratorView.vue'),
        meta: {
          title: 'RSA Key Pair Generator',
          description: 'Generate RSA public/private key pairs. Privacy-first crypto tool.'
        }
      },
      {
        path: 'tools/password-strength-analyser',
        name: 'password-strength-analyser',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/PasswordStrengthAnalyserView.vue'),
        meta: {
          title: 'Password Strength Analyzer',
          description: 'Analyze password strength and security. Privacy-first tool.'
        }
      },
      {
        path: 'tools/pdf-signature-checker',
        name: 'pdf-signature-checker',
        component: () => import(/* webpackPrefetch: true */ '../views/PdfSignatureCheckerView.vue'),
        meta: {
          title: 'PDF Signature Checker',
          description: 'Check and validate digital signatures in PDF files. Privacy-first tool.'
        }
      },
      // Converter Tools
      {
        path: 'tools/integer-base-converter',
        name: 'integer-base-converter',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/IntegerBaseConverterView.vue'),
        meta: {
          title: 'Integer Base Converter',
          description: 'Convert numbers between binary, octal, decimal, and hexadecimal.'
        }
      },
      {
        path: 'tools/roman-numeral-converter',
        name: 'roman-numeral-converter',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/RomanNumeralConverterView.vue'),
        meta: {
          title: 'Roman Numeral Converter',
          description: 'Convert between Roman numerals and numbers.'
        }
      },
      {
        path: 'tools/base64-file-converter',
        name: 'base64-file-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/Base64FileConverterView.vue'),
        meta: {
          title: 'Base64 File Converter',
          description: 'Convert files to and from Base64 format. Privacy-first tool.'
        }
      },
      {
        path: 'tools/text-to-nato-alphabet',
        name: 'text-to-nato-alphabet',
        component: () => import(/* webpackPrefetch: true */ '../views/TextToNatoAlphabetView.vue'),
        meta: {
          title: 'Text to NATO Alphabet',
          description: 'Convert text to NATO phonetic alphabet.'
        }
      },
      {
        path: 'tools/text-to-unicode',
        name: 'text-to-unicode',
        component: () => import(/* webpackPrefetch: true */ '../views/TextToUnicodeView.vue'),
        meta: {
          title: 'Text to Unicode Converter',
          description: 'Convert text to Unicode code points and HTML entities.'
        }
      },
      {
        path: 'tools/yaml-to-toml',
        name: 'yaml-to-toml',
        component: () => import(/* webpackPrefetch: true */ '../views/YamlToTomlView.vue'),
        meta: {
          title: 'YAML to TOML Converter',
          description: 'Convert YAML configuration files to TOML format.'
        }
      },
      {
        path: 'tools/json-to-toml',
        name: 'json-to-toml',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonToTomlView.vue'),
        meta: { title: 'JSON to TOML Converter', description: 'Convert JSON to TOML format.' }
      },
      {
        path: 'tools/list-converter',
        name: 'list-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/ListConverterView.vue'),
        meta: {
          title: 'List Converter',
          description: 'Convert lists between different formats (comma, newline, JSON, etc).'
        }
      },
      {
        path: 'tools/toml-to-json',
        name: 'toml-to-json',
        component: () => import(/* webpackPrefetch: true */ '../views/TomlToJsonView.vue'),
        meta: {
          title: 'TOML to JSON Converter',
          description: 'Convert TOML configuration files to JSON format.'
        }
      },
      {
        path: 'tools/toml-to-yaml',
        name: 'toml-to-yaml',
        component: () => import(/* webpackPrefetch: true */ '../views/TomlToYamlView.vue'),
        meta: {
          title: 'TOML to YAML Converter',
          description: 'Convert TOML configuration files to YAML format.'
        }
      },
      {
        path: 'tools/xml-json-converter',
        name: 'xml-json-converter',
        redirect: '/tools/xml-json'
      },
      {
        path: 'tools/xml-to-json',
        name: 'xml-to-json',
        redirect: '/tools/xml-json'
      },
      {
        path: 'tools/json-to-xml',
        name: 'json-to-xml',
        redirect: '/tools/xml-json'
      },
      {
        path: 'tools/markdown-to-html',
        name: 'markdown-to-html',
        component: () => import(/* webpackPrefetch: true */ '../views/MarkdownToHtmlView.vue'),
        meta: {
          title: 'Markdown to HTML Converter',
          description: 'Convert Markdown to HTML with syntax highlighting.'
        }
      },
      // Web Tools
      {
        path: 'tools/url-encoder',
        name: 'url-encoder',
        component: () => import(/* webpackPrefetch: true */ '../views/UrlEncoderView.vue'),
        meta: {
          title: 'URL Encoder/Decoder',
          description: 'Encode and decode URL strings. Privacy-first tool.'
        }
      },
      {
        path: 'tools/url-parser',
        name: 'url-parser',
        component: () => import(/* webpackPrefetch: true */ '../views/URLParserView.vue'),
        meta: {
          title: 'URL Parser',
          description: 'Parse and analyze URLs to extract components.'
        }
      },
      {
        path: 'tools/html-entities',
        name: 'html-entities',
        component: () => import(/* webpackPrefetch: true */ '../views/HtmlEntitiesView.vue'),
        meta: {
          title: 'HTML Entities Encoder/Decoder',
          description: 'Encode and decode HTML entities.'
        }
      },
      {
        path: 'tools/device-information',
        name: 'device-information',
        component: () => import(/* webpackPrefetch: true */ '../views/DeviceInformationView.vue'),
        meta: { title: 'Device Information', description: 'View browser and device information.' }
      },
      {
        path: 'tools/basic-auth-generator',
        name: 'basic-auth-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/BasicAuthGeneratorView.vue'),
        meta: {
          title: 'HTTP Basic Auth Generator',
          description: 'Generate HTTP Basic Authentication headers.'
        }
      },
      {
        path: 'tools/meta-tag-generator',
        name: 'meta-tag-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/MetaTagGeneratorView.vue'),
        meta: {
          title: 'Meta Tag Generator',
          description: 'Generate HTML meta tags for SEO and social sharing.'
        }
      },
      {
        path: 'tools/otp-code-generator',
        name: 'otp-code-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/OtpCodeGeneratorView.vue'),
        meta: {
          title: 'OTP/TOTP Generator',
          description: 'Generate TOTP codes from secrets. Privacy-first tool.'
        }
      },
      {
        path: 'tools/mime-types',
        name: 'mime-types',
        component: () => import(/* webpackPrefetch: true */ '../views/MimeTypesView.vue'),
        meta: { title: 'MIME Type Lookup', description: 'Look up MIME types for file extensions.' }
      },
      {
        path: 'tools/keycode-info',
        name: 'keycode-info',
        component: () => import(/* webpackPrefetch: true */ '../views/KeycodeInfoView.vue'),
        meta: { title: 'Keycode Info', description: 'Get keyboard keycode information.' }
      },
      {
        path: 'tools/slugify-string',
        name: 'slugify-string',
        component: () => import(/* webpackPrefetch: true */ '../views/SlugifyStringView.vue'),
        meta: { title: 'Slugify String', description: 'Convert text to URL-friendly slugs.' }
      },

      {
        path: 'tools/html-wysiwyg-editor',
        name: 'html-wysiwyg-editor',
        component: () => import(/* webpackPrefetch: true */ '../views/HtmlWysiwygEditorView.vue'),
        meta: { title: 'WYSIWYG HTML Editor', description: 'Rich text HTML editor.' }
      },
      {
        path: 'tools/user-agent-parser',
        name: 'user-agent-parser',
        component: () => import(/* webpackPrefetch: true */ '../views/UserAgentParserView.vue'),
        meta: { title: 'User Agent Parser', description: 'Parse and analyze user agent strings.' }
      },
      {
        path: 'tools/json-diff',
        name: 'json-diff',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonDiffView.vue'),
        meta: {
          title: 'JSON Diff',
          description: 'Compare and find differences between JSON objects.'
        }
      },
      {
        path: 'tools/safelink-decoder',
        name: 'safelink-decoder',
        component: () => import(/* webpackPrefetch: true */ '../views/SafelinkDecoderView.vue'),
        meta: { title: 'Outlook Safelink Decoder', description: 'Decode Outlook safelink URLs.' }
      },
      // Images/Videos Tools
      {
        path: 'tools/wifi-qr-code-generator',
        name: 'wifi-qr-code-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/WifiQrCodeGeneratorView.vue'),
        meta: {
          title: 'WiFi QR Code Generator - Share WiFi Password via QR Code | Formatho',
          description: 'Generate QR codes for WiFi network credentials instantly. Share your WiFi password with guests without typing — scan and connect. Supports WPA, WEP, and open networks with hidden SSID. 100% client-side, no data sent to any server.',
          keywords: 'wifi qr code generator, wifi password qr, qr code wifi, share wifi, wifi qr code, wifi network qr, free wifi qr generator, scan wifi qr, guest wifi qr code, privacy-first'
        }
      },
      {
        path: 'tools/svg-placeholder-generator',
        name: 'svg-placeholder-generator',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/SvgPlaceholderGeneratorView.vue'),
        meta: {
          title: 'SVG Placeholder Generator',
          description: 'Generate SVG placeholder images.'
        }
      },
      {
        path: 'tools/camera-recorder',
        name: 'camera-recorder',
        component: () => import(/* webpackPrefetch: true */ '../views/CameraRecorderView.vue'),
        meta: {
          title: 'Webcam Recorder - Record Video & Audio in Browser | Formatho',
          description: 'Record video and audio directly from your webcam — no software install needed. Capture HD video, take snapshots, and download as WebM. Perfect for quick video messages, screen recordings, and content creation. 100% private, all processing in your browser.',
          keywords: 'webcam recorder, record video online, browser camera, video capture, webm recorder, online video recorder, camera snapshot, screen recording, free webcam tool, privacy-first'
        }
      },
      // Development Tools
      {
        path: 'tools/git-memo',
        name: 'git-memo',
        component: () => import(/* webpackPrefetch: true */ '../views/GitMemoView.vue'),
        meta: { title: 'Git Cheat Sheet', description: 'Common Git commands and their usage.' }
      },
      {
        path: 'tools/random-port-generator',
        name: 'random-port-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/RandomPortGeneratorView.vue'),
        meta: {
          title: 'Random Port Generator',
          description: 'Generate random port numbers for development.'
        }
      },
      {
        path: 'tools/json-viewer',
        name: 'json-viewer',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonViewerView.vue'),
        meta: { title: 'JSON Viewer/Formatter', description: 'Format and beautify JSON data.' }
      },
      {
        path: 'tools/json-minify',
        name: 'json-minify',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonMinifyView.vue'),
        meta: { title: 'JSON Minifier', description: 'Minify JSON to reduce size.' }
      },
      {
        path: 'tools/chmod-calculator',
        name: 'chmod-calculator',
        component: () => import(/* webpackPrefetch: true */ '../views/ChmodCalculatorView.vue'),
        meta: { title: 'Chmod Calculator', description: 'Calculate Unix file permissions.' }
      },
      {
        path: 'tools/docker-run-to-compose',
        name: 'docker-run-to-compose',
        component: () => import(/* webpackPrefetch: true */ '../views/DockerRunToComposeView.vue'),
        meta: {
          title: 'Docker Run to Compose',
          description: 'Convert docker run commands to docker-compose.yml.'
        }
      },
      {
        path: 'tools/xml-formatter',
        name: 'xml-formatter',
        component: () => import(/* webpackPrefetch: true */ '../views/XmlFormatterView.vue'),
        meta: { title: 'XML Formatter', description: 'Format and beautify XML documents.' }
      },
      {
        path: 'tools/yaml-viewer',
        name: 'yaml-viewer',
        component: () => import(/* webpackPrefetch: true */ '../views/YamlViewerView.vue'),
        meta: {
          title: 'YAML Linter & Validator - Format, Validate, and Beautify YAML Online',
          description:
            'Free YAML linter and validator that formats, validates, and beautifies YAML documents instantly. Check YAML syntax errors, fix indentation issues, and format YAML files. 100% privacy-first - runs entirely in your browser with no server uploads.',
          keywords:
            'yaml lint, yaml validator, yaml linter online, yaml checker, yaml formatter, yaml beautifier, validate yaml, yaml syntax checker, yaml indentation fixer, online yaml linter, free yaml validator, yaml format, yaml viewer, yaml editor'
        }
      },
      {
        path: 'tools/email-normalizer',
        name: 'email-normalizer',
        component: () => import(/* webpackPrefetch: true */ '../views/EmailNormalizerView.vue'),
        meta: { title: 'Email Normalizer', description: 'Normalize and validate email addresses.' }
      },
      {
        path: 'tools/regex-memo',
        name: 'regex-memo',
        component: () => import(/* webpackPrefetch: true */ '../views/RegexMemoView.vue'),
        meta: {
          title: 'Regex Cheat Sheet',
          description: 'Regular expression patterns and syntax reference.'
        }
      },
      // Network Tools
      {
        path: 'tools/ipv4-subnet-calculator',
        name: 'ipv4-subnet-calculator',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/Ipv4SubnetCalculatorView.vue'),
        meta: { title: 'IPv4 Subnet Calculator', description: 'Calculate IPv4 subnet information.' }
      },
      {
        path: 'tools/ipv4-address-converter',
        name: 'ipv4-address-converter',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/Ipv4AddressConverterView.vue'),
        meta: {
          title: 'IPv4 Address Converter',
          description: 'Convert IPv4 addresses to different formats.'
        }
      },
      {
        path: 'tools/ipv4-range-expander',
        name: 'ipv4-range-expander',
        component: () => import(/* webpackPrefetch: true */ '../views/Ipv4RangeExpanderView.vue'),
        meta: {
          title: 'IPv4 Range Expander',
          description: 'Expand IPv4 address ranges to individual IPs.'
        }
      },
      {
        path: 'tools/mac-address-lookup',
        name: 'mac-address-lookup',
        component: () => import(/* webpackPrefetch: true */ '../views/MacAddressLookupView.vue'),
        meta: {
          title: 'MAC Address Lookup',
          description: 'Look up MAC address vendor information.'
        }
      },
      {
        path: 'tools/mac-address-generator',
        name: 'mac-address-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/MacAddressGeneratorView.vue'),
        meta: { title: 'MAC Address Generator', description: 'Generate random MAC addresses.' }
      },
      {
        path: 'tools/ipv6-ula-generator',
        name: 'ipv6-ula-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/Ipv6UlaGeneratorView.vue'),
        meta: { title: 'IPv6 ULA Generator', description: 'Generate IPv6 Unique Local Addresses.' }
      },
      // Math Tools
      {
        path: 'tools/eta-calculator',
        name: 'eta-calculator',
        component: () => import(/* webpackPrefetch: true */ '../views/EtaCalculatorView.vue'),
        meta: { title: 'ETA Calculator', description: 'Calculate estimated time of arrival.' }
      },
      // Measurement Tools
      {
        path: 'tools/chronometer',
        name: 'chronometer',
        component: () => import(/* webpackPrefetch: true */ '../views/ChronometerView.vue'),
        meta: { title: 'Chronometer', description: 'Online stopwatch and timer.' }
      },
      {
        path: 'tools/temperature-converter',
        name: 'temperature-converter',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/TemperatureConverterView.vue'),
        meta: { title: 'Temperature Converter', description: 'Convert between temperature units.' }
      },
      {
        path: 'tools/benchmark-builder',
        name: 'benchmark-builder',
        component: () => import(/* webpackPrefetch: true */ '../views/BenchmarkBuilderView.vue'),
        meta: { title: 'Benchmark Builder', description: 'Benchmark JavaScript code performance.' }
      },
      // Text Tools
      {
        path: 'tools/text-statistics',
        name: 'text-statistics',
        component: () => import(/* webpackPrefetch: true */ '../views/TextStatisticsView.vue'),
        meta: {
          title: 'Text Statistics',
          description: 'Analyze text statistics (characters, words, etc).'
        }
      },
      {
        path: 'tools/emoji-picker',
        name: 'emoji-picker',
        component: () => import(/* webpackPrefetch: true */ '../views/EmojiPickerView.vue'),
        meta: { title: 'Emoji Picker', description: 'Browse and copy emojis.' }
      },
      {
        path: 'tools/string-obfuscator',
        name: 'string-obfuscator',
        component: () => import(/* webpackPrefetch: true */ '../views/StringObfuscatorView.vue'),
        meta: { title: 'String Obfuscator', description: 'Obfuscate text with hidden characters.' }
      },
      {
        path: 'tools/numeronym-generator',
        name: 'numeronym-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/NumeronymGeneratorView.vue'),
        meta: { title: 'Numeronym Generator', description: 'Generate numeronyms like i18n, k8s.' }
      },
      {
        path: 'tools/ascii-text-drawer',
        name: 'ascii-text-drawer',
        component: () => import(/* webpackPrefetch: true */ '../views/AsciiTextDrawerView.vue'),
        meta: { title: 'ASCII Text Drawer', description: 'Generate ASCII art text.' }
      },
      // Data Tools
      {
        path: 'tools/phone-parser',
        name: 'phone-parser',
        component: () => import(/* webpackPrefetch: true */ '../views/PhoneParserView.vue'),
        meta: { title: 'Phone Parser & Formatter', description: 'Parse and format phone numbers.' }
      },
      {
        path: 'tools/iban-validator',
        name: 'iban-validator',
        component: () => import(/* webpackPrefetch: true */ '../views/IbanValidatorView.vue'),
        meta: { title: 'IBAN Validator & Parser', description: 'Validate and parse IBAN numbers.' }
      },
      // Additional missing routes
      {
        path: 'tools/qr-code-generator',
        name: 'qr-code-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/QRCodeGeneratorView.vue'),
        meta: {
          title: 'QR Code Generator - Free Online QR Code Maker | Formatho',
          description: 'Create custom QR codes for URLs, text, WiFi, email, phone numbers, and more. Free online QR code generator with customizable size, colors, and error correction. Download as PNG or SVG. No signup, 100% client-side, zero tracking.',
          keywords: 'qr code generator, free qr code, create qr code, qr code maker, online qr generator, custom qr code, url qr code, qr code download, qr code png, qr code svg, privacy-first'
        }
      },
      {
        path: 'tools/crontab-generator',
        name: 'crontab-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/CrontabGeneratorView.vue'),
        meta: {
          title: 'Crontab Generator',
          description: 'Generate cron expressions with visual builder.'
        }
      },
      {
        path: 'tools/regex-tester',
        name: 'regex-tester',
        component: () => import(/* webpackPrefetch: true */ '../views/RegexTesterView.vue'),
        meta: {
          title: 'Regex Tester Online - Free Regular Expression Tester | Formatho',
          description: 'Test and debug regular expressions online instantly. Match patterns, capture groups, flags (global, case-insensitive), and see results in real-time. Free regex tester for JavaScript, Python, and PCRE. 100% client-side.',
          keywords: 'regex tester online, regular expression tester, regex checker, regex validator, test regex online, regex matcher, regex debugger, free regex tool, privacy-first'
        }
      },
      {
        path: 'tools/math-evaluator',
        name: 'math-evaluator',
        component: () => import(/* webpackPrefetch: true */ '../views/MathEvaluatorView.vue'),
        meta: { title: 'Math Evaluator', description: 'Evaluate mathematical expressions.' }
      },
      {
        path: 'tools/quantum-circuit-simulator',
        name: 'quantum-circuit-simulator',
        component: () => import(/* webpackPrefetch: true */ '../views/QuantumCircuitSimulatorView.vue'),
        meta: {
          title: 'Quantum Circuit Simulator - Design & Simulate Quantum Circuits | Formatho',
          description:
            'Design and simulate quantum circuits with real quantum gates. Build circuits with Hadamard, Pauli gates, CNOT, and measurements. Perfect for learning quantum computing concepts. Free, 100% client-side simulator.',
          keywords:
            'quantum circuit simulator, quantum computing, quantum gates, hadamard gate, cnot gate, quantum simulator, qubits, superposition, entanglement, quantum learning, free quantum tool, privacy-first'
        }
      },
      {
        path: 'tools/percentage-calculator',
        name: 'percentage-calculator',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/PercentageCalculatorView.vue'),
        meta: {
          title: 'Percentage Calculator',
          description: 'Calculate percentages, increases, and decreases.'
        }
      },
      {
        path: 'tools/token-generator',
        name: 'token-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/TokenGeneratorView.vue'),
        meta: { title: 'Token Generator', description: 'Generate secure random tokens.' }
      },
      {
        path: 'tools/hash-text',
        name: 'hash-text',
        component: () => import(/* webpackPrefetch: true */ '../views/HashTextView.vue'),
        meta: {
          title: 'Argon2id Hash Generator Online - Free Browser-Based Hashing Tool',
          description: 'Generate Argon2id, bcrypt, PBKDF2, MD5, SHA-1, SHA-256, SHA-384, SHA-512, BLAKE2b, and Poseidon hashes online. 100% client-side hashing - your data never leaves your browser. No signup, free forever.',
          keywords: 'argon2id hash, argon2id online, argon2id browser, argon2id generator, bcrypt online, pbkdf2 online, sha256 generator, sha512 generator, md5 generator, blake2b online, poseidon hash, hash text, password hash, crypto hash, client-side hashing, privacy-first hash tool, free hash generator',
          canonical: 'https://formatho.com/tools/hash-text'
        }
      },
      {
        path: 'tools/xml-json',
        name: 'xml-json',
        component: () => import(/* webpackPrefetch: true */ '../views/tools/XmlJsonConverter.vue'),
        meta: {
          title: 'XML ↔ JSON Converter',
          description:
            'Bi-directional XML to JSON converter with real-time conversion and clipboard support. 100% client-side, zero server API calls.'
        }
      },
      {
        path: 'tools/ulid-generator',
        name: 'ulid-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/ULIDGeneratorView.vue'),
        meta: {
          title: 'ULID Generator',
          description: 'Generate Universally Unique Lexicographically Sortable Identifiers.'
        }
      },
      {
        path: 'tools/case-converter',
        name: 'case-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/CaseConverterView.vue'),
        meta: {
          title: 'Case Converter Online - Free Text Case Changer | Formatho',
          description: 'Convert text case online instantly — UPPER, lower, Title Case, camelCase, snake_case, kebab-case, CONSTANT_CASE, and more. Free text transformer for developers and writers. 100% client-side.'
        }
      },
      {
        path: 'tools/date-time-converter',
        name: 'date-time-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/DateTimeConverterView.vue'),
        meta: {
          title: 'Date-Time Converter',
          description: 'Convert dates and times between formats.'
        }
      },
      {
        path: 'tools/unix-timestamp',
        name: 'unix-timestamp',
        component: () => import(/* webpackPrefetch: true */ '../views/UnixTimestampView.vue'),
        meta: {
          title: 'Unix Timestamp Converter',
          description: 'Convert Unix timestamps to human-readable dates and vice versa. Live clock with current time in both formats.'
        }
      },
      {
        path: 'tools/color-converter',
        name: 'color-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/ColorConverterView.vue'),
        meta: {
          title: 'Color Converter',
          description: 'Convert colors between HEX, RGB, HSL formats.'
        }
      },
      {
        path: 'tools/text-to-binary',
        name: 'text-to-binary',
        component: () => import(/* webpackPrefetch: true */ '../views/TextToBinaryView.vue'),
        meta: {
          title: 'Text to Binary Converter',
          description: 'Convert text to binary and vice versa.'
        }
      },
      {
        path: 'tools/http-status-codes',
        name: 'http-status-codes',
        component: () => import(/* webpackPrefetch: true */ '../views/HTTPStatusCodesView.vue'),
        meta: {
          title: 'HTTP Status Codes',
          description: 'Reference for HTTP status codes and meanings.'
        }
      },
      {
        path: 'tools/mermaid-viewer',
        name: 'mermaid-viewer',
        component: () => import(/* webpackPrefetch: true */ '../views/tools/MermaidViewer.vue'),
        meta: {
          title: 'Mermaid Diagram Viewer - Free Online Markdown to Diagram Tool',
          description: 'Free online Mermaid diagram viewer and editor. Paste Mermaid.js code from ChatGPT, Claude, or Copilot and render flowcharts, sequence diagrams, ER diagrams, Gantt charts instantly. The easiest way to visualize AI-generated diagrams. No signup, 100% client-side.',
          keywords: 'mermaid viewer, mermaid diagram, mermaid online, ai diagram tool, chatgpt diagram, claude mermaid, copilot diagram, flowchart maker, sequence diagram, er diagram, gantt chart, markdown diagram, free diagram tool, mermaid js, architecture diagram, privacy-first'
        }
      },
      {
        path: 'tools/beta-feedback',
        name: 'beta-feedback',
        component: () => import(/* webpackPrefetch: true */ '../views/BetaFeedbackView.vue'),
        meta: {
          title: 'Beta Feedback - Formatho',
          description: 'Share your feedback to help us improve Formatho',
          keywords: 'beta feedback, bug report, feature request'
        }
      },
      {
        path: 'tools/admin/beta-feedback',
        name: 'admin-beta-feedback',
        component: () => import(/* webpackPrefetch: true */ '../views/admin/BetaFeedbackAdmin.vue'),
        meta: {
          title: 'Beta Feedback Dashboard - Formatho Admin',
          description: 'Review and manage beta tester feedback'
        }
      },
      {
        path: 'tools/admin/ab-tests',
        name: 'admin-ab-tests',
        component: () => import(/* webpackPrefetch: true */ '../views/admin/ABTestDashboard.vue'),
        meta: {
          title: 'A/B Test Dashboard - Formatho Admin',
          description: 'Monitor and analyze A/B test results for landing page optimization'
        }
      }
    ]
  },
  // 404 Catch-all route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackPrefetch: true */ '../views/NotFoundView.vue'),
    meta: {
      title: '404 - Page Not Found | Formatho',
      description: 'The page you are looking for does not exist.'
    }
  }
]
