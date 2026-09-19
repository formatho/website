/**
 * Route metadata for SEO — single source of truth for titles,
 * descriptions, and keywords. Keyed by route name.
 * Consumed by: router/index.ts (route definitions), inject-tool-meta.js
 * (static meta injection), and useSEO (client-side updates).
 */
export interface RouteMeta {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
}

export const routeMeta: Record<string, RouteMeta> = {
  'home': {
    title: 'Formatho | Private Infrastructure for AI Agents',
    description: 'Self-hosted MCP server giving AI agents controlled access to developer, security, and EVM tools - permissioned, audit-logged, zero data egress.',
    keywords: 'developer tools, json formatter, base64 encoder, uuid generator, privacy-first tools, agent todo, online utilities, free developer tools, client-side tools',
  },
    'runtime': {
    title: 'Self-Hosted MCP Server — Docker, Private AI | Formatho',
    description: 'Run your own MCP server in Docker: give Claude Code, Cursor and Claude Desktop permissioned, audit-logged tool access inside your network.',
    keywords: 'self hosted mcp server, mcp server docker, private ai agent tools, claude code mcp server, cursor mcp, mcp gateway, model context protocol server',
  },
  'about': {
    title: 'About Formatho - Private Infrastructure for AI Agents',
    description: 'Formatho builds self-hosted MCP infrastructure giving AI agents controlled, audited access to developer, security, and EVM tools - plus a library of free.',
    keywords: 'about formatho, private mcp server, ai agent infrastructure, self-hosted tools, on-premise ai',
  },
  'blogs': {
    title: 'Developer Guides & Tutorials | Formatho Blog',
    description: 'Explore expert developer guides, tutorials, and technical insights from the Formatho team. Deep dives into AI agent orchestration, blockchain, RWA.',
    keywords: 'formatho blog, developer guides, developer tutorials, ai agents, blockchain, rwa tokenization, privacy-first tools, web development',
  },
  'blog-post-dynamic': {
    title: 'Article - Formatho Blog',
    description: 'Expert developer guides, tutorials, and technical insights on privacy-first development, AI agents, and blockchain from the Formatho team.',
    keywords: 'formatho blog, developer guides, tutorials, ai agents, blockchain, privacy-first',
  },
  'security': {
    title: 'Security - Vulnerability Disclosure | Formatho',
    description: 'Report security vulnerabilities to Formatho. Responsible disclosure program with safe harbor protections and response timeline commitments.',
    keywords: 'formatho security, vulnerability disclosure, bug bounty, security report, responsible disclosure'
  },
  'acceptable-use': {
    title: 'Acceptable Use Policy - Formatho',
    description: 'Acceptable use policy for Formatho tools. Permitted and prohibited uses of our free developer tools, including security and crypto tool guidelines.',
    keywords: 'formatho acceptable use, usage policy, terms of use, permitted use'
  },
  'privacy': {
    title: 'Privacy Policy - Formatho',
    description: 'Learn about Formatho privacy practices. All data processing happens locally in your browser. Free, private, and 100% client-side in your browser.',
    keywords: 'privacy policy, data protection, client-side processing',
  },
  'terms': {
    title: 'Terms of Service - Formatho',
    description: 'Terms of service for Formatho developer tools and AI agent platform. Free, private, and 100% client-side in your browser. No signup, no upload.',
    keywords: 'terms of service, legal, usage terms',
  },
  'contact': {
    title: 'Contact Us - Formatho',
    description: 'Get in touch with the Formatho team. Report bugs, request features, or join our community. Free, private, and 100% client-side in your browser.',
    keywords: 'contact, support, feedback, github',
  },
  'tools-markdown': {
    title: 'Markdown Editor Online - Live Preview, GFM | Formatho',
    description: 'Edit and preview Markdown files in real-time. Privacy-first markdown editor that runs 100% client-side in your browser. Free, private, and 100%.',
    keywords: 'markdown editor, markdown preview, markdown viewer, github markdown, privacy-first',
  },
  'json-yaml': {
    title: 'JSON to YAML Converter — K8s Manifests & CI | Formatho',
    description: 'Convert JSON to YAML and back online — built for Kubernetes manifests, docker-compose, GitHub Actions and Ansible. 100% client-side: configs never upload.',
    keywords: 'json to yaml, yaml to json, kubernetes yaml converter, json to k8s manifest, docker compose converter, ci cd config converter',
  },
  'json-csv': {
    title: 'JSON to CSV Converter — Export API Responses | Formatho',
    description: 'Convert JSON arrays to CSV and back — flatten nested API responses, export for spreadsheets. Handles big files locally, nothing uploaded.',
    keywords: 'json to csv, csv to json, json array to csv, flatten json to csv, api response to csv',
  },
  'diff': {
    title: 'Text Diff Checker Online | Formatho',
    description: 'Compare two texts online and highlight differences instantly. Free diff checker for code review, document comparison, and version tracking.',
    keywords: 'text diff online, diff checker, compare text online, file comparison tool, text difference, code diff, diff tool free, online text compare, privacy-first',
  },
  'base64': {
    title: 'Base64 Encode & Decode — Client-Side, UTF-8 Safe | Formatho',
    description: 'Encode and decode Base64 in your browser — UTF-8 correct, file support, no data uploaded. Safe for tokens and payloads you cannot paste into a server.',
    keywords: 'base64 encode, base64 decode, base64 converter, base64 online, base64 url safe',
  },
  'jwt': {
    title: 'JWT Decoder & Verifier — Offline, No Token Upload | Formatho',
    description: 'Decode and inspect JWTs entirely in your browser — payloads, expiry, alg confusion risks. Production tokens never touch a server.',
    keywords: 'jwt decoder, jwt debugger, offline jwt decoder, client side jwt decoder, decode jwt online, jwt verifier',
  },
  'sql': {
    title: 'SQL Formatter Online - Secure SQL Beautifier | Formatho',
    description: 'Format and beautify SQL queries online instantly. Free SQL formatter supporting PostgreSQL, MySQL, SQLite, T-SQL, and more.',
    keywords: 'sql formatter online, sql beautifier, format sql online, sql prettifier, sql format tool, free sql formatter, postgresql formatter, mysql formatter, sqlite formatter, privacy-first',
  },
  'sql-to-er-diagram': {
    title: 'SQL to ER Diagram Converter Online | Formatho',
    description: 'Convert CREATE TABLE SQL statements into interactive ER diagrams instantly. Visualize tables, columns, primary keys, and foreign key relationships.',
    keywords: 'sql to er diagram, erd generator, database schema visualizer, create table to erd, entity relationship diagram, sql schema visualizer, free erd tool, mermaid er diagram, privacy-first',
  },
  'sql-query-plan-visualizer': {
    title: 'SQL Query Plan Visualizer Online | Formatho',
    description: 'Visualize SQL execution plans step by step. Understand table scans, joins, sorts, and aggregates. Get actionable optimization tips for PostgreSQL, MySQL.',
    keywords: 'sql query plan, execution plan visualizer, sql optimizer, query analysis, explain plan, sql performance, database optimization, free sql tool, privacy-first',
  },
  'sql-dialect-converter': {
    title: 'SQL Dialect Converter - Postgres, MySQL, T-SQL | Formatho',
    description: 'Convert SQL queries between PostgreSQL, MySQL, SQLite, SQL Server, BigQuery, Snowflake, and more. Handles syntax differences, data types, and.',
    keywords: 'sql dialect converter, postgresql to mysql, mysql to postgresql, sql converter, tsql converter, sql translation, database migration tool, free sql converter, privacy-first',
  },
  'foreign-key-visualizer': {
    title: 'Foreign Key Visualizer - Map Database | Formatho',
    description: 'Visualize foreign key relationships in your SQL schema. See how tables connect, find orphaned tables, and export relationship diagrams as Mermaid.',
    keywords: 'foreign key visualizer, fk relationships, database relationships, schema relationships, sql fk mapper, table relationships visualizer, free database tool, privacy-first',
  },
  'tools-all': {
    title: 'All Developer Tools - Formatho',
    description: 'Complete collection of privacy-first developer tools. JSON, YAML, encoding, hashing, crypto, and more. All tools run in your browser.',
    keywords: 'developer tools, json formatter, yaml validator, base64 encoder, hash generator, privacy-first tools',
  },
  'uuid': {
    title: 'UUID Generator v4 Online — Offline, Bulk, No | Formatho',
    description: 'Generate UUID v1, v4 and v7 in bulk — offline in your browser. No server round-trip, no logging: safe for production seeds and test fixtures.',
    keywords: 'uuid generator, uuid v4, uuidv4 online, bulk uuid generator, offline uuid generator, guid generator',
  },
  'lorem': {
    title: 'Lorem Ipsum Generator Online | Formatho',
    description: 'Generate Lorem Ipsum placeholder text online instantly. Create paragraphs, sentences, and words for mockups, wireframes, and design templates.',
    keywords: 'lorem ipsum generator, placeholder text, dummy text generator, lorem ipsum, privacy-first',
  },
  'image': {
    title: 'Image Compressor - Reduce Image Size Securely | Formatho',
    description: 'Compress JPG, PNG, and WebP images by up to 80% without quality loss. Perfect for reducing AI-generated image sizes, optimizing web performance, and.',
    keywords: 'image compressor, compress image online, reduce image size, optimize images, ai image compressor, webp compressor, png optimizer, jpg reducer, batch image compression, free image tool, privacy-first',
  },
  'json-lint': {
    title: 'JSON Validator & Linter — Find Errors Instantly | Formatho',
    description: 'Validate JSON and find the exact line of the error — trailing commas, unquoted keys, encoding issues. Big logs paste and lint locally.',
    keywords: 'json validator, json linter, validate json online, json error finder, json syntax check',
  },
  'yaml-lint': {
    title: 'YAML Validator & Linter Online | Formatho',
    description: 'Free online YAML validator and formatter. Check YAML syntax errors, format and beautify YAML instantly. Validate docker-compose, Kubernetes configs, CI/CD.',
    keywords: 'yaml linter, yaml validator, yaml formatter, validate yaml, yaml checker, privacy-first',
  },
  'bpmn': {
    title: 'BPMN Viewer Online - Open & Export BPMN as PDF | Formatho',
    description: 'Visualize BPMN 2.0 diagrams and export them as PDF. Free, privacy-first BPMN viewer that runs entirely in your browser. Free, private, and 100%.',
    keywords: 'bpmn viewer, bpmn to pdf, bpmn diagram, business process model, bpmn export, privacy-first',
  },
  'visio-viewer': {
    title: 'Visio Viewer Online - Open .vsdx Files Securely | Formatho',
    description: 'View Microsoft Visio .vsdx files in your browser without Visio or an upload. Multi-page rendering, zoom, SVG export. 100% client-side — the file never.',
    keywords: 'visio viewer, microsoft visio viewer, vsdx viewer online, open visio file online, view vsdx without visio, visio file viewer free',
  },
  'bpmn-to-visio': {
    title: 'BPMN to Visio Converter - Free, Layout Preserved | Formatho',
    description: 'Convert BPMN 2.0 XML to Visio (.vdx) with a live preview and exact BPMN DI layout preservation. Waypoint connectors, auto-layout fallback, conversion.',
    keywords: 'bpmn to visio, bpmn converter, convert bpmn to visio, bpmn to vdx, visio converter, bpmn export, camunda to visio, bpmn diagram import visio',
  },
  'evm-converter': {
    title: 'EVM Unit Converter — Wei, Gwei, Ether, Exact | Formatho',
    description: 'Convert wei, gwei and ether with BigInt precision — no floating-point rounding, gas math included. Works offline in your browser.',
    keywords: 'evm unit converter, wei to ether, gwei to ether, wei converter, gas price converter',
  },
  'bls-signature': {
    title: 'BLS12-381 Signature Generator & Verifier Online | Formatho',
    description: 'Generate BLS12-381 signatures, verify signatures, and aggregate multiple signatures into one. 100% client-side, privacy-first.',
    keywords: 'bls signature, bls12-381, aggregate signatures, threshold signatures, boneh lynn shacham, ethereum consensus',
  },
  'r1cs-inspector': {
    title: 'R1CS Viewer - Inspect Circom Circuit Files | Formatho',
    description: 'Open .r1cs constraint files and .wtns witnesses in your browser. Wire counts, constraints, public/private inputs, curve, and named signal terms per.',
    keywords: 'r1cs viewer, r1cs info online, inspect r1cs file, circom constraint count, snarkjs r1cs print, wtns viewer, r1cs file format, taceo cocircom',
  },
  'keccak256': {
    title: 'Keccak-256 Hash Generator Online | Formatho',
    description: 'Calculate Keccak-256 hashes instantly online. Supports UTF-8, UTF-16, Hex, Base64. 100% client-side, no data leaves your browser.',
    keywords: 'keccak-256 hash generator, keccak256 online, ethereum hash, solidity keccak256, blockchain hash, client-side hash, privacy-first, utf-8 hashing, utf-16 hashing, hex hashing, base64 hashing',
  },
  'address-checksum': {
    title: 'Ethereum Address Checksum (EIP-55) Online | Formatho',
    description: 'Validate and checksum Ethereum addresses using EIP-55. Detect spoofed addresses and prevent loss from typos. 100% client-side, privacy-first.',
    keywords: 'ethereum address checksum, eip-55 checksum, address validator, spoofed address, ethereum address verify, checksum address, web3 security',
  },
  'multi-chain-keys': {
    title: 'Multi-Chain Wallet Generator - ETH, BTC, SOL | Formatho',
    description: 'Generate keys and addresses for Ethereum, Bitcoin, Solana, Cosmos, and Polkadot from one mnemonic. BIP-39, BIP-44, secp256k1, Ed25519. 100% client-side.',
    keywords: 'multi chain wallet, key generator, ethereum, solana, polkadot, cosmos, bip39, ed25519, secp256k1, hd wallet, derivation path, blockchain keys',
  },
  'address-from-key': {
    title: 'Private Key to Address Converter - ETH, BTC, SOL | Formatho',
    description: 'Derive addresses for Ethereum, Bitcoin, Solana, and more from a private key. Runs entirely in browser. Free, private, and 100% client-side in your.',
    keywords: 'private key to address, eth address, btc address, solana address, multi chain tool',
  },
  'cosmos-address-generator': {
    title: 'Cosmos Address Generator - Multi-Chain | Formatho',
    description: 'Generate Cosmos bech32 addresses: cosmos (Hub), osmo, juno, akash, inj prefixes. Convert between chains. Free, private, client-side.',
    keywords: 'cosmos address generator, cosmos hub address, atom address generator, osmosis address generator, osmo address, juno address generator, secret network address, scrt address, stargaze address, stars address, akash address generator, akt address, kava address, injective address, inj address, crescent address, cre address, umee address, bech32 address generator, bip39 cosmos, bip44 cosmos, cosmos wallet generator, cosmos seed phrase, cosmos mnemonic, multi chain wallet, secp256k1, blockchain address tool',
  },
  'rwa-swap': {
    title: 'RWA Asset Swap - Cross-Chain | Formatho',
    description: 'Swap RWA tokens, stablecoins (USDC, USDT, DAI), and native assets across 15+ EVM chains. Cross-chain routing powered by LI.FI.',
    keywords: 'rwa swap, cross-chain swap, real world asset swap, li.fi swap, erc20 bridge, stablecoin swap, usdc cross-chain, usdt bridge, rwa token exchange, tokenized asset swap, multi-chain swap, ethereum arbitrum swap, base polygon bridge, metamask swap, rabby wallet swap, defi swap tool',
  },
  'rwa-deploy-lab': {
    title: 'RWA Tokenization Lab - Deploy Assets On-Chain | Formatho',
    description: 'Deploy real-world asset (RWA) smart contracts directly from your browser. Create ERC-20 mirror tokens for stocks like AAPL and AMZN, fractional ownership.',
    keywords: 'rwa tokenization, real world asset tokenization, rwa deployment tool, tokenization factory, compliance manager smart contract, kyc aml blockchain, sanctions screening on-chain, transfer manager erc20, identity registry wallet mapping, treasury fee collection solidity, governance timelock dao, asset registry nft, fractional token erc20, vault custody contract, rwa architecture, erc20 mirror token deploy, fractional ownership contract, asset tokenization platform, rwa smart contract, tokenize real estate, tokenize stocks, aapl mirror token, amzn mirror token, create tokenized asset, factory pattern solidity, rwa defi, real world asset blockchain, metamask smart contract deploy, rabby wallet deploy, deploy erc20 browser, tokenization poc, rwa lab, blockchain asset tokenization, on-chain rwa, erc20 deployment tool, fractional shares, rwa project builder, defi poc tool, createasset, batch token deployment, compliance kyc smart contract, transfer restriction contract, asset fractionalization flow',
  },
  'solidity-to-opcodes': {
    title: 'Solidity to Opcodes Compiler | Formatho',
    description: 'Compile Solidity to EVM Opcodes and Bytecode in your browser. View the assembly of your smart contracts. Multiple compiler versions. 100% client-side.',
    keywords: 'solidity compile, evm opcodes, smart contract assembly, solidity bytecode, compiler, solidity to opcode, evm disassembler, blockchain development',
  },
  'cosmos-reader': {
    title: 'Cosmos Account Reader & Address Converter | Formatho',
    description: 'Look up any Cosmos SDK account - ATOM and token balances, account number, delegations and rewards - via public LCD endpoints.',
    keywords: 'cosmos account reader, cosmos balance checker, cosmos address converter, bech32 converter, atom balance check, osmosis address converter, cosmos lcd explorer',
  },
  'solana-account-reader': {
    title: 'Solana Account Reader & PDA Generator | Formatho',
    description: 'Look up any Solana account - owner, lamports, rent epoch, data - decode SPL token accounts, and derive Program Derived Addresses.',
    keywords: 'solana account reader, solana account info, decode solana token account, solana pda generator, program derived address, solana rpc viewer, solana balance check',
  },
  'polkadot-reader': {
    title: 'Polkadot Substrate Reader & SS58 Converter | Formatho',
    description: 'Query Substrate chains - Polkadot, Kusama, Westend, local nodes - via RPC: chain info and raw storage. Convert SS58 addresses between network formats.',
    keywords: 'polkadot storage query, substrate rpc reader, polkadot address converter, ss58 converter, kusama address, substrate state_getStorage, polkadot rpc',
  },
  'cardano-reader': {
    title: 'Cardano Address Reader - ADA Balance & UTxO | Formatho',
    description: 'Look up any Cardano address - ADA balance, UTxO count, stake and script info - via the free keyless Koios API, straight from your browser.',
    keywords: 'cardano address reader, check ada balance, cardano address viewer, cardano utxo lookup, ada wallet balance, cardano explorer',
  },
  'contract-reader': {
    title: 'EVM Smart Contract Reader - Call ABI View | Formatho',
    description: 'Paste a contract ABI, set any RPC endpoint and contract address, and call view and pure functions directly from your browser. Works on every EVM chain.',
    keywords: 'read smart contract online, call contract function, abi reader, contract view functions, eth_call tool, read contract without etherscan, contract interaction tool',
  },
  'calldata-decoder': {
    title: 'EVM Calldata Decoder — Decode Transaction Input | Formatho',
    description: 'Paste any 0x transaction input and see the function called and every argument decoded — before you sign. Local decoding, nothing broadcast.',
    keywords: 'calldata decoder, decode transaction input, evm input data decoder, decode 0x hex data, transaction decoder'
  },
  'create2-calculator': {
    title: 'CREATE2 Address Calculator | Formatho',
    description: 'Compute deterministic CREATE2 deployment addresses from factory, salt, and init code hash. Keccak math identical to the EVM, all client-side.',
  },
  'uniswap-math': {
    title: 'Uniswap Tick & SqrtPrice Calculator | Formatho',
    description: 'Convert between Uniswap v3 price, tick, and sqrtPriceX96 with token decimals. Exact Q64.96 integer math matching TickMath. 100% client-side.',
  },
  'eip1967-checker': {
    title: 'EIP-1967 Proxy Slot Checker | Formatho',
    description: 'Read the standardized proxy storage slots — implementation, admin, beacon — for any contract across 21 EVM chains. Read-only eth_getStorageAt.',
  },
  'storage-slot-calculator': {
    title: 'Solidity Storage Slot Calculator | Formatho',
    description: 'Compute storage slots for Solidity variables, mappings (keccak of key and slot), and dynamic array elements. Exact EVM slot math. 100% client-side.',
  },
  'v4-hook-calculator': {
    title: 'Uniswap v4 Hook Calculator | Formatho',
    description: 'Compute the v4 hook permission bits and the address prefix to mine, or decode any hook address into its 14 hook-call permissions. 100% client-side.',
  },
  'tx-decoder': {
    title: 'Ethereum Transaction Decoder | Formatho',
    description: 'Decode raw signed transactions (legacy, EIP-1559, EIP-2930, EIP-4844) into typed fields: nonce, gas, to, value, calldata selector, signature.',
  },
  'function-selector': {
    title: 'Function Selector Lookup — keccak256 4-Byte | Formatho',
    description: 'Compute Solidity function selectors (first 4 bytes of keccak256) and look up known signatures — client-side, instant, no RPC needed.',
    keywords: 'function selector, solidity selector, keccak256 4 byte, method id calculator, function signature hash',
  },
  'ens-namehash': {
    title: 'ENS Namehash Calculator — namehash() Online | Formatho',
    description: 'Compute ENS namehash for any .eth name — the exact algorithm from EIP-137, running locally. Verify resolver keys without a console.',
    keywords: 'ens namehash, namehash calculator, ens name hash, eip 137 namehash',
  },
  'passkey-address': {
    title: 'Passkey Address Deriver - P-256 WebAuthn to EVM | Formatho',
    description: 'Derive EVM addresses from P-256 passkey public keys (WebAuthn, Face ID, fingerprint). For Ritual Chain passkey transactions and WebAuthn wallets.',
    keywords: 'passkey address, webauthn address, p256 to evm, passkey wallet, ritual passkey, face id ethereum, secp256r1 address'
  },
  'dkms-visualizer': {
    title: 'DKMS Key Derivation Visualizer - Ritual Agents | Formatho',
    description: 'Visualize how Ritual Chain agents derive identity keys via DKMS. See the derivation chain from TEE-held master keys to agent-specific signing keys.',
    keywords: 'dkms visualizer, ritual agent keys, decentralized key management, tee key derivation, agent identity, ritual chain'
  },
  'x402-encoder': {
    title: 'X402 Payment Encoder - Agent-to-Agent | Formatho',
    description: 'Encode and decode X402 payment payloads for agent-to-agent transactions on Ritual Chain. Build HTTP 402 challenges and payment headers.',
    keywords: 'x402 encoder, x402 payment, agent payment, ritual x402, http 402, machine payments, ai agent payments'
  },
  'tls-checker': {
    title: 'TLS Certificate Checker - Expiry, Issuer | Formatho',
    description: 'Check TLS/SSL certificate expiry dates, issuer, subject, and security configuration. Paste openssl output for instant analysis. Free, private, client-side.',
    keywords: 'tls checker, ssl certificate check, certificate expiry checker, openssl certificate, tls security scan'
  },
  'soc2-checklist': {
    title: 'SOC 2 Readiness Checklist - Secure & Open Source | Formatho',
    description: 'Interactive, open-source SOC 2 readiness checklist covering all 5 Trust Service Criteria. Track progress with linked tools for each control.',
    keywords: 'soc 2 checklist, open source soc 2, soc 2 readiness, soc 2 compliance, soc 2 audit prep, trust service criteria, free soc 2 tools'
  },
  'policy-generator': {
    title: 'Security Policy Generator - SOC 2 Templates | Formatho',
    description: 'Generate security policies for SOC 2 compliance: password policy, access control policy, and incident response plan. Customize and copy.',
    keywords: 'security policy generator, soc 2 policy template, password policy generator, access control policy, incident response template'
  },
  'impermanent-loss': {
    title: 'Impermanent Loss Calculator - Uniswap V2 & V3 | Formatho',
    description: 'Calculate impermanent loss for any price change. Compare HODL vs LP value, see the IL curve, and understand when fees offset losses.',
    keywords: 'impermanent loss calculator, il calculator, uniswap impermanent loss, lp loss calculator, defi calculator, liquidity provider loss'
  },
  'vault-calculator': {
    title: 'ERC-4626 Vault Analyzer & Calculator Online | Formatho',
    description: 'Simulate ERC-4626 vault math with exact spec rounding (shares minted, round-trip dust, inflation attack) and read live vaults on-chain: share price.',
    keywords: 'erc4626 calculator, erc-4626 vault analyzer, vault shares to assets, vault calculator, share price calculator, erc4626 inflation attack, morpho vault calculator, yearn vault calculator, defi vault shares'
  },
  'apy-calculator': {
    title: 'APY Calculator - Convert APR to APY | Formatho',
    description: 'Convert APR to APY with any compounding frequency (daily, weekly, monthly, continuous). Compare DeFi yields accurately. Free, private, client-side.',
    keywords: 'apy calculator, apr to apy, apy to apr, defi yield calculator, compounding calculator, apy converter'
  },
  'vanity-eth': {
    title: 'Ethereum Vanity Address Generator - All EVM | Formatho',
    description: 'Generate vanity addresses with a custom prefix or suffix. The same key works on every EVM chain - Ethereum, Polygon, BSC, Arbitrum, Base, Optimism.',
    keywords: 'ethereum vanity address generator, evm vanity address, vanity eth address, polygon vanity address, bsc vanity address generator, base chain vanity address, custom wallet address, safe vanity address, client-side vanity',
  },
  'prompt-injection-tester': {
    title: 'Prompt Injection Tester - Scan Prompts & Content | Formatho',
    description: 'Scan untrusted content and prompts for prompt-injection patterns: instruction overrides, exfiltration commands, hidden Unicode, encoded payloads.',
    keywords: 'prompt injection tester, prompt injection scanner, prompt injection checker, llm security, owasp llm01, indirect prompt injection, ai agent security',
  },
  'security-headers': {
    title: 'Security Headers Checker | Formatho',
    description: 'Analyze HTTP security headers on any URL: HSTS, Content-Security-Policy, X-Frame-Options and more. Graded A-F with fix recommendations.',
    keywords: 'security headers check, hsts check, csp header analyzer, x-frame-options, http security headers, website security scan',
  },
  'csp-generator': {
    title: 'CSP Generator - Content Security Policy Builder | Formatho',
    description: 'Generate Content-Security-Policy headers with a visual builder. Configure script-src, style-src, img-src and more. Copy the header and deploy.',
    keywords: 'csp generator, content security policy generator, csp header builder, security header generator',
  },
  'csp-evaluator': {
    title: 'CSP Evaluator - Analyze Content Security Policy | Formatho',
    description: 'Paste a Content-Security-Policy header and find security weaknesses: unsafe-inline, wildcards, missing directives, bypass risks.',
    keywords: 'csp evaluator, csp checker, content security policy analysis, csp validator, csp security check',
  },
  'cors-tester': {
    title: 'CORS Tester - Test Cross-Origin Requests | Formatho',
    description: 'Test CORS on any API endpoint from your browser. See Access-Control-Allow-Origin, methods, headers, and preflight responses.',
    keywords: 'cors tester, cors check, access-control-allow-origin, cors preflight, cors debug, cross origin test',
  },
  'cookie-analyzer': {
    title: 'Cookie Security Analyzer - Check Secure, HttpOnly | Formatho',
    description: 'Analyze Set-Cookie headers for security: Secure flag, HttpOnly, SameSite, prefixes, domain scope and expiry. Free, private, client-side.',
    keywords: 'cookie security analyzer, set-cookie checker, httponly check, samesite cookie, cookie flags, secure cookie validator',
  },
  'jwt-suite': {
    title: 'JWT Toolkit — Decode, Verify & Debug Locally | Formatho',
    description: 'A full JWT workbench in your browser: decode, verify signatures, compare algorithms, check claims. Built for security teams that never paste tokens into.',
    keywords: 'jwt toolkit, jwt verify, jwt inspect, jwt debugging, security team jwt tool',
  },
  'saml-metadata-generator': {
    title: 'SAML Metadata Generator - SP & IdP XML Online | Formatho',
    description: 'Generate SAML 2.0 SP and IdP metadata XML online: entityID, ACS/SLO endpoints, NameID format, signing certificates. 100% client-side — nothing uploaded.',
    keywords: 'saml metadata generator, sp metadata generator, idp metadata generator, saml 2.0 metadata xml, assertion consumer service, generate saml metadata online',
  },
  'certificate-fingerprint': {
    title: 'X.509 Certificate Fingerprint Calculator Online | Formatho',
    description: 'Calculate SHA-1, SHA-256, SHA-384 and SHA-512 fingerprints of X.509 certificates from PEM. For certificate pinning, SAML key descriptors, and TLS.',
    keywords: 'certificate fingerprint calculator, x509 fingerprint, cert sha256 fingerprint online, pem fingerprint, saml certificate fingerprint, certificate thumbprint',
  },
  'key-format-converter': {
    title: 'Private Key Format Converter - PKCS#1 to PKCS#8 | Formatho',
    description: 'Convert RSA keys between PKCS#1 and PKCS#8, and public keys between SPKI and PKCS#1. PEM and DER hex output. Keys are validated and converted entirely in.',
    keywords: 'private key format converter, pkcs1 to pkcs8, pkcs8 to pkcs1, rsa private key converter, pem to der, begin rsa private key, key format online',
  },
  'gzip': {
    title: 'GZip Compress & Decompress Online - Client-Side | Formatho',
    description: 'Compress text to gzip/deflate and decompress gzip, zlib, or raw deflate data online. Base64 input/output for SAML and API debugging.',
    keywords: 'gzip decompress online, gzip compress online, deflate decode online, zlib decompress, base64 to gzip, gzip to base64, saml deflate decompress',
  },
  'dmarc-parser': {
    title: 'DMARC Record Parser & Validator — Check Your Policy | Formatho',
    description: 'Parse DMARC TXT records in your browser: policy (p/sp), rua/ruf reporting, pct, adkim/aspf alignment, RFC 7489 validation and misconfiguration warnings. Optional DNS lookup. 100% client-side.',
    keywords: 'dmarc parser, dmarc record checker, dmarc validator, dmarc lookup, parse dmarc txt record, dmarc policy, rua ruf, email authentication, spf dkim dmarc',
  },
  'saml-decoder': {
    title: 'SAML Decoder — Inspect SSO Responses Offline | Formatho',
    description: 'Decode base64 SAML requests and responses in your browser — attributes, conditions, signature elements. IdP debugging without leaking assertions to a.',
    keywords: 'saml decoder, decode saml response, saml inspection, sso debug tool, saml base64 decode',
  },
  'oidc-url-builder': {
    title: 'OIDC Auth URL Builder — PKCE Generator Online | Formatho',
    description: 'Build OAuth2/OIDC authorization URLs with PKCE challenge generation — state, scopes, nonce. Constructed client-side for your own apps.',
    keywords: 'oidc url builder, oauth authorization url, pkce generator, pkce code challenge, openid connect url',
  },
  'abi-encoder': {
    title: 'ABI Encoder & Decoder — Solidity eth_abi Online | Formatho',
    description: 'Encode and decode Solidity ABI calldata in your browser — match eth_abi.encodeExactly, inspect function signatures, debug transaction input offline.',
    keywords: 'abi encoder, abi decoder, solidity abi encode, eth abi encode data, encode function call',
  },
  'tools-agent-identity-generator': {
    title: 'AI Agent Identity Generator | Formatho',
    description: 'Instantly generate unique personas, traits, and system prompts for AI agents. Free, private, and 100% client-side in your browser. No signup, no upload.',
    keywords: 'ai agent identity, agent persona, agent traits, system prompts, agent generator, artificial intelligence',
  },
  'iso20022-validator': {
    title: 'ISO 20022 Message Validator - pain.001, pacs.008 | Formatho',
    description: 'Validate ISO 20022 payment messages: pain, pacs, camt families. Auto-detects message type, checks required fields, pretty-prints XML. Free, client-side.',
    keywords: 'iso 20022 validator, pain.001 validator, pacs.008 validator, camt.053 validator, iso 20022 xml, payment message validation',
  },
  'pain001-builder': {
    title: 'pain.001 Message Builder - ISO 20022 Credit | Formatho',
    description: 'Build ISO 20022 pain.001 Customer Credit Transfer Initiation messages visually. Fill debtor, creditor, amount → get valid XML. Free, no upload.',
    keywords: 'pain.001 builder, iso 20022 message generator, pain.001 example xml, credit transfer initiation, sepa payment message',
  },
  'csv-counter': {
    title: 'CSV Row & Column Counter - Online, Private | Formatho',
    description: 'Count rows, columns, and cells in CSV data. Handles quoted fields, custom delimiters, shows column types and empty values. Free, client-side.',
    keywords: 'csv row counter, csv column count, count csv lines, csv dimensions, how many rows in csv, csv analyzer',
  },
  'enterprise': {
    title: 'Enterprise Agent-Ready Services — MCP Integration | Formatho',
    description: 'Formatho Engineering turns internal APIs and workflows into secure, MCP-accessible tools — deployed inside your infrastructure.',
    keywords: 'enterprise ai agent integration, agent ready, mcp integration services, self hosted mcp enterprise, ai agent tool development',
  },
  'espr-passport': {
    title: 'ESPR Digital Product Passport Builder - EU | Formatho',
    description: 'Prototype a Digital Product Passport under the EU Ecodesign for Sustainable Products Regulation: Art. 9 identification, Art.',
    keywords: 'espr digital product passport, dpp builder, ecodesign regulation 2024/1781, product passport json, eu sustainability passport, dpp qr code',
  },
  'jev-playground': {
    title: 'Jev Playground — System One Request Builder | Formatho',
    description: 'Build Jev requests visually: state plus Noul, Choice, and Score questions with live mock distributions. Generates typesafe_sdk Python code. No API key, fully client-side.',
    keywords: 'jev playground, jev api builder, typesafe jev, system one model, jev request example, noul choice score primitives',
  },
  'jev-suitability': {
    title: 'Jev Suitability Test — Is Your Task Jev-Shaped? | Formatho',
    description: 'Six criteria decide if your task fits Jev or belongs to an LLM, reasoning model, or code. Scored verdict with decomposition advice. Free, client-side.',
    keywords: 'jev suitability test, is my task jev shaped, when to use jev, system one model criteria, jev vs llm',
  },
  'gs1-digital-link': {
    title: 'GS1 Digital Link Builder & Parser - GTIN to URL | Formatho',
    description: 'Build GS1 Digital Link URLs from GTIN, serial, lot, and expiry — with QR code and element-string output. Paste a link back and decode every identifier.',
    keywords: 'gs1 digital link, gs1 digital link builder, gtin url builder, gs1 qr code generator, element string parser, ai 01 gtin, fmd serialisation url',
  },
  'sqlite-browser': {
    title: 'SQLite Browser - Open & Query .db Files Online | Formatho',
    description: 'Open SQLite databases in your browser: browse tables, run SQL, edit cells, import CSV, export .db files. Powered by WebAssembly SQLite — no upload, fully.',
    keywords: 'sqlite browser, sqlite viewer, open sqlite online, sqlite online, run sql in browser, db browser online, db file viewer, sqlite editor, sqlite wasm',
  },
  'shamir-splitter': {
    title: 'Shamir Secret Sharing - Split & Combine Online | Formatho',
    description: 'Split secrets into N shares where any threshold K reconstructs. Visual polynomial interpolation, GF(257) arithmetic. Free, private, client-side.',
    keywords: 'shamir secret sharing, split secret into shares, threshold cryptography, secret sharing online, k of n scheme',
  },
  'mpc-demo': {
    title: 'MPC Demo - How Secure Multi-Party Computation | Formatho',
    description: 'Interactive demo: split numbers into additive shares, compute on encrypted shares, reconstruct result. See how MPC enables private AI, confidential DeFi.',
    keywords: 'mpc demo, secure multi-party computation, additive secret sharing, how does mpc work, encrypted computation, privacy preserving',
  },
  'pedersen-commitment': {
    title: 'Pedersen Commitment Calculator - Commit Without | Formatho',
    description: 'Create Pedersen commitments over secp256k1: bind to a value without revealing it. Hiding and binding. Free, client-side.',
    keywords: 'pedersen commitment, commitment scheme, hiding commitment, binding commitment, zero knowledge, cryptographic commitment',
  },
  'x25519-demo': {
    title: 'X25519 Key Exchange Demo - ECDH Online | Formatho',
    description: 'Generate X25519 keypairs and perform ECDH key exchange. See how two parties derive the same shared secret without transmitting it.',
    keywords: 'x25519 key exchange, diffie hellman demo, ecdh x25519, curve25519, shared secret, elliptic curve key exchange',
  },
  'ctr-mode': {
    title: 'CTR Mode Encryption Visualizer - Counter Mode | Formatho',
    description: 'Interactive CTR mode demo: watch counter blocks generate a keystream that XORs with plaintext. Block-by-block breakdown.',
    keywords: 'ctr mode demo, counter mode encryption, block cipher modes, aes ctr, keystream visualizer, nonce handling',
  },
  'bom-diff': {
    title: 'BOM Diff Tool - Compare Bills of Materials | Formatho',
    description: 'Compare two Bills of Materials and see added, removed, and changed parts. Handles CSV/TSV. Free, client-side. Engineering change orders live or die by.',
    keywords: 'bom diff, bill of materials comparison, bom changes, compare bom, engineering change',
  },
  'bom-cost-rollup': {
    title: 'BOM Cost Roll-up Calculator - Multi-Level | Formatho',
    description: 'Calculate total cost of multi-level Bills of Materials. Handles indented BOMs with quantities and unit costs. Free, client-side.',
    keywords: 'bom cost calculator, bill of materials cost, multi-level bom, rolled up cost, product cost',
  },
  'part-number-generator': {
    title: 'Intelligent Part Number Generator | Formatho',
    description: 'Generate categorised part numbers with configurable category, type, and sequence codes. Batch generation, CSV export. Free, client-side.',
    keywords: 'part number generator, intelligent part number, pn format, part numbering system',
  },
  'pii-redactor': {
    title: 'PII Redactor - Remove Personal Data Before AI | Formatho',
    description: 'Scan text for PII before sending to an LLM: emails, phones, SSNs, credit cards, API keys, IPs. Mask or replace sensitive data client-side.',
    keywords: 'pii redactor, data redaction, remove personal data, llm privacy, text anonymizer, scrub pii',
  },
  'openai-request-builder': {
    title: 'OpenAI API Request Builder - curl, Python, JS | Formatho',
    description: 'Build OpenAI chat/completions API requests visually. Generate ready-to-run curl, Python, and JavaScript code. Client-side, no API key needed.',
    keywords: 'openai api builder, chat completions curl, openai request generator, gpt-4o api call, llm code generator',
  },
  'context-splitter': {
    title: 'Context Window Splitter - RAG Chunking Tool | Formatho',
    description: 'Split long text into RAG-ready chunks by tokens, sentences, or paragraphs. See overlap, chunk sizes, and context usage. Client-side.',
    keywords: 'context window splitter, rag chunking, text chunker, llm text splitting, document chunking',
  },
  'prompt-template-renderer': {
    title: 'Prompt Template Renderer - Variable Substitution | Formatho',
    description: 'Paste a prompt with {{variables}} and get an auto-generated form to fill each variable. Renders with token count. Client-side.',
    keywords: 'prompt template renderer, prompt variable substitution, llm prompt template, prompt form generator',
  },
  'llm-json-validator': {
    title: 'LLM JSON Output Validator & Extractor | Formatho',
    description: 'Extract and validate JSON from any AI model output. Handles markdown fences, prose, trailing commas, smart quotes. Client-side.',
    keywords: 'llm json validator, extract json from ai, json from chatgpt, validate llm output, json extractor',
  },
  'tools-local-token-counter': {
    title: 'LLM Token Counter - GPT-4o, GPT-4, o1, Davinci | Formatho',
    description: 'Count tokens for GPT-4o, GPT-4, GPT-3.5, o1, and legacy models locally. Compare token counts across tokenizers (o200k_base, cl100k_base, p50k_base).',
    keywords: 'token counter, llm token counter, gpt-4o token count, gpt-4 tokenizer, gpt-3.5 token counter, o200k_base, cl100k_base, p50k_base, tiktoken alternative, token cost calculator, ai token counter, openai token count, prompt token counter, context window calculator',
  },
  'agents': {
    title: 'Agent Browser - Blockchain Agents with Reputation',
    description: 'Explore AI Agents on the blockchain with reputation tracking. View agent addresses, reputation scores, and activity. Real-time data from the blockchain.',
    keywords: 'agent browser, blockchain agents, ai agents reputation, crypto agents, ethereum agents, agent explorer, reputation tracking',
  },
  'agent-detail': {
    title: 'Agent Details - View Reputation History & Metadata',
    description: 'View detailed information about blockchain AI agents including reputation history, ratings, metadata, and transaction records.',
    keywords: 'agent details, agent reputation, blockchain agent history, ai agent ratings, crypto agent metadata, ethereum agent tracker',
  },
  'bcrypt': {
    title: 'Bcrypt Hash Generator Online - Secure Password | Formatho',
    description: 'Generate bcrypt password hashes online with custom cost factors (4-31). Compare and verify bcrypt hashes. Free tool for Node.js and Python password.',
  },
  'encryption': {
    title: 'AES Encryption Tool Online - Encrypt Text | Formatho',
    description: 'Encrypt and decrypt text online with AES-256, DES, and TripleDES. Free client-side encryption tool — your text and keys never leave your browser.',
  },
  'bip39-generator': {
    title: 'BIP39 Mnemonic Generator | Formatho',
    description: 'Generate BIP39 mnemonic phrases and derive seeds. Privacy-first crypto tool. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'crypto-forecasts': {
    title: 'AI Crypto Price Forecasts - BTC, ETH, SOL 30-Day | Formatho',
    description: '30-day crypto price predictions using Google TimesFM 2.5. Privacy-first AI forecasts for BTC, ETH, SOL, and more. Free, private, and 100% client-side in.',
  },
  'hmac-generator': {
    title: 'HMAC Generator Online - SHA256, SHA512 & More | Formatho',
    description: 'Generate HMAC hashes using various algorithms. Privacy-first tool. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'rsa-key-pair-generator': {
    title: 'RSA Key Generator & Signature Online | Formatho',
    description: 'Generate RSA key pairs, sign messages with an RSA private key (RSASSA-PKCS1-v1_5 or RSA-PSS), and verify RSA signatures online.',
    keywords: 'rsa signature online, generate rsa signature, sign message with rsa private key, rsa sign and verify, rsa key pair generator, rsassa-pkcs1-v1_5, rsa-pss',
  },
  'password-strength-analyser': {
    title: 'Password Strength Checker & Analyzer Online | Formatho',
    description: 'Analyze password strength and security. Privacy-first tool. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'pdf-signature-checker': {
    title: 'PDF Signature Checker - Validate Digital | Formatho',
    description: 'Check and validate digital signatures in PDF files. Privacy-first tool. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'integer-base-converter': {
    title: 'Number Base Converter - Binary, Hex, Octal | Formatho',
    description: 'Convert numbers between binary, octal, decimal, and hexadecimal. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'roman-numeral-converter': {
    title: 'Roman Numeral Converter - Secure MCP Tool for AI | Formatho',
    description: 'Convert Roman numerals to numbers and back. Handles subtractive notation (IV, IX, XL), validates malformed input, and shows the arithmetic.',
  },
  'base64-file-converter': {
    title: 'Base64 File Converter Online | Formatho',
    description: 'Convert files to and from Base64 format. Privacy-first tool. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'text-to-nato-alphabet': {
    title: 'Text to NATO Alphabet Converter | Formatho',
    description: 'Convert any text to the NATO phonetic alphabet (Alpha, Bravo, Charlie) and back — for reading strings aloud over voice channels without ambiguity.',
  },
  'text-to-unicode': {
    title: 'Text to Unicode Converter | Formatho',
    description: 'Convert text to Unicode code points and HTML entities. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'yaml-to-toml': {
    title: 'YAML to TOML Converter - Secure MCP Tool for AI | Formatho',
    description: 'Convert YAML configuration files to TOML format. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'json-to-toml': {
    title: 'JSON to TOML Converter',
    description: 'Convert JSON to TOML instantly — tables, arrays of tables, and nested values mapped to their TOML equivalents. Runs entirely client-side; your configs.',
  },
  'list-converter': {
    title: 'List Converter Online - Comma, Newline, JSON | Formatho',
    description: 'Convert lists between different formats (comma, newline, JSON, etc). Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'toml-to-json': {
    title: 'TOML to JSON Converter — Cargo.toml & pyproject | Formatho',
    description: 'Convert TOML to JSON instantly — Rust Cargo.toml, pyproject.toml, and config files. Runs client-side; your configs never leave the browser.',
    keywords: 'toml to json, cargo toml converter, pyproject.toml to json, toml parser online'
  },
  'toml-to-yaml': {
    title: 'TOML to YAML Converter - Secure MCP Tool for AI | Formatho',
    description: 'Convert TOML configuration files to YAML format. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'markdown-to-html': {
    title: 'Markdown to HTML Converter | Formatho',
    description: 'Convert Markdown to HTML with syntax highlighting. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'url-encoder': {
    title: 'URL Encoder & Decoder — Query Strings Online | Formatho',
    description: 'Encode and decode URLs and query strings — percent-encoding, URI components, full URLs. Client-side, instant, nothing logged.',
    keywords: 'url encoder, url decoder, percent encoding, encode uri component, query string encoder'
  },
  'url-parser': {
    title: 'URL Parser Online - Split & Inspect URLs | Formatho',
    description: 'Parse and analyze URLs to extract components. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'html-entities': {
    title: 'HTML Entities Encoder & Decoder | Formatho',
    description: 'Encode and decode HTML entities — &amp;, &lt;, &gt;, &quot;, numeric and named references. Fix pasted markup or prepare text for safe embedding.',
  },
  'device-information': {
    title: 'Device Information',
    description: 'See what your browser reveals about you: user agent, screen, timezone, locale, GPU, cores, memory, and touch support. A privacy check for your own.',
  },
  'basic-auth-generator': {
    title: 'Basic Auth Header Generator — Client-Side | Formatho',
    description: 'Generate HTTP Basic Authorization headers in your browser — credentials are never sent anywhere. Copy-ready Authorization: Basic values.',
    keywords: 'basic auth generator, authorization header, basic authentication online, base64 basic auth'
  },
  'meta-tag-generator': {
    title: 'Meta Tag Generator Online - SEO & Open Graph | Formatho',
    description: 'Generate HTML meta tags for SEO and social sharing. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'otp-code-generator': {
    title: 'TOTP Generator Online - 2FA OTP Codes | Formatho',
    description: 'Generate TOTP codes from secrets. Privacy-first tool. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'mime-types': {
    title: 'MIME Type Lookup',
    description: 'Look up MIME types by file extension and vice versa — official IANA types with common alternates and category. Instant reference for headers, uploads, and.',
  },
  'keycode-info': {
    title: 'Keycode Info',
    description: 'Press any key to see its JavaScript event data: keyCode, key, code, and modifier state. Essential for keyboard shortcuts, games, and accessibility work.',
  },
  'slugify-string': {
    title: 'Slugify — URL-Safe Slugs, Client-Side | Formatho',
    description: 'Turn any title into a clean URL slug — accent-stripping, stop-word options, bulk mode. Generated locally, never uploaded.',
    keywords: 'slugify, slug generator, url slug, seo slug generator'
  },
  'html-wysiwyg-editor': {
    title: 'WYSIWYG HTML Editor',
    description: 'Rich text HTML editor. Free, private, and 100% client-side in your browser. No signup, no upload. Free, private, and 100% client-side in your browser.',
  },
  'user-agent-parser': {
    title: 'User Agent Parser',
    description: 'Parse any user-agent string into browser, version, engine, OS, and device type — paste UA strings from logs and get structured output.',
  },
  'json-diff': {
    title: 'JSON Diff Checker - Compare JSON Online | Formatho',
    description: 'Compare and find differences between JSON objects. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'safelink-decoder': {
    title: 'Outlook Safelink Decoder',
    description: 'Decode Outlook SafeLinks wrapper URLs back to their original destination. Strip the redirection tracking layer to see where a link really goes before you.',
  },
  'wifi-qr-code-generator': {
    title: 'WiFi QR Code Generator - Share WiFi by QR | Formatho',
    description: 'Generate QR codes for WiFi network credentials instantly. Share your WiFi password with guests without typing — scan and connect.',
    keywords: 'wifi qr code generator, wifi password qr, qr code wifi, share wifi, wifi qr code, wifi network qr, free wifi qr generator, scan wifi qr, guest wifi qr code, privacy-first',
  },
  'svg-placeholder-generator': {
    title: 'SVG Placeholder Generator | Formatho',
    description: 'Generate clean SVG placeholder images with custom dimensions, colors, and text labels — data-URI ready for mockups and tests.',
  },
  'camera-recorder': {
    title: 'Webcam Recorder - Record Video & Audio in Browser | Formatho',
    description: 'Record video and audio directly from your webcam — no software install needed. Capture HD video, take snapshots, and download as WebM.',
    keywords: 'webcam recorder, record video online, browser camera, video capture, webm recorder, online video recorder, camera snapshot, screen recording, free webcam tool, privacy-first',
  },
  'git-memo': {
    title: 'Git Cheat Sheet',
    description: 'A searchable Git cheat sheet: staging, branching, undoing, and recovery commands with when-to-use notes. The reference for fixing mistakes without.',
  },
  'random-port-generator': {
    title: 'Random Port Generator - Secure MCP Tool for AI | Formatho',
    description: 'Generate random port numbers for development. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'json-viewer': {
    title: 'JSON Viewer/Formatter',
    description: 'Format, validate, and explore JSON as a collapsible tree with syntax highlighting. Pinpoints parse errors to the exact position.',
  },
  'json-minify': {
    title: 'JSON Minifier',
    description: 'Minify JSON to reduce size. Free, private, and 100% client-side in your browser. No signup, no upload. Free, private, and 100% client-side in your browser.',
  },
  'chmod-calculator': {
    title: 'Chmod Calculator',
    description: 'Compute Unix file permissions in every notation: numeric (755), symbolic (rwxr-xr-x), and special bits (setuid, setgid, sticky).',
  },
  'docker-run-to-compose': {
    title: 'Docker Run to Compose Converter | Formatho',
    description: 'Convert docker run commands to docker-compose.yml. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'xml-formatter': {
    title: 'XML Formatter & Validator — Pretty Print, Offline | Formatho',
    description: 'Format, minify and validate XML in your browser — SOAP, SAML, SVG, configs. No upload, works on large files instantly. Free, private, and 100% client-side.',
    keywords: 'xml formatter, xml validator, xml pretty print, format xml online, xml beautifier'
  },
  'yaml-viewer': {
    title: 'YAML Validator & Formatter — Lint K8s & CI | Formatho',
    description: 'Validate and format YAML in your browser — catches indentation and duplicate-key errors before kubectl does. Kubernetes, CI, Ansible configs stay local.',
    keywords: 'yaml validator, yaml linter, yaml formatter, kubernetes yaml validator, ci yaml checker, validate yaml online',
  },
  'email-normalizer': {
    title: 'Email Normalizer',
    description: 'Normalize email addresses for deduplication: lowercasing, Gmail dot and plus-addressing rules, and provider-specific quirks.',
  },
  'regex-memo': {
    title: 'Regex Cheat Sheet - Patterns & Syntax Reference | Formatho',
    description: 'Regular expression patterns and syntax reference. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'ipv4-subnet-calculator': {
    title: 'IPv4 Subnet Calculator',
    description: 'IPv4 subnet calculator: CIDR to mask, network and broadcast addresses, usable host ranges, and split planning for any prefix.',
  },
  'ipv4-address-converter': {
    title: 'IPv4 Address Converter - Decimal, Binary, Hex | Formatho',
    description: 'Convert IPv4 addresses between dotted decimal, binary, octal, decimal, and hex representations — with the bit layout shown.',
  },
  'ipv4-range-expander': {
    title: 'IPv4 Range Expander - Expand CIDR to IP List | Formatho',
    description: 'Expand IPv4 address ranges to individual IPs. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'mac-address-lookup': {
    title: 'MAC Address Lookup - Find Vendor by MAC | Formatho',
    description: 'Look up MAC address vendors by OUI prefix, and generate or format MAC addresses in any notation (colon, hyphen, dot, bare).',
  },
  'mac-address-generator': {
    title: 'MAC Address Generator',
    description: 'Generate random MAC addresses with vendor OUI prefixes or fully random locally-administered addresses — bulk output, any notation.',
  },
  'ipv6-ula-generator': {
    title: 'IPv6 ULA Generator',
    description: 'Generate IPv6 Unique Local Address (ULA) prefixes per RFC 4193. The fd00::/8 equivalent of RFC 1918 private IPs. Free, private, client-side.',
  },
  'eta-calculator': {
    title: 'ETA Calculator',
    description: 'Calculate arrival times from distance and speed, or the speed needed to hit a deadline — with unit conversions built in.',
  },
  'chronometer': {
    title: 'Chronometer',
    description: 'Online stopwatch and timer. Free, private, and 100% client-side in your browser. No signup, no upload. Free, private, and 100% client-side in your browser.',
  },
  'temperature-converter': {
    title: 'Temperature Converter',
    description: 'Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine. Free, private, and 100% client-side in your browser.',
  },
  'benchmark-builder': {
    title: 'Benchmark Builder',
    description: 'Build performance benchmarks and compare results — track runs, compute statistics, and export findings. Prototype your methodology in the browser before.',
  },
  'text-statistics': {
    title: 'Text Statistics Counter | Formatho',
    description: 'Analyze text statistics (characters, words, etc). Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'emoji-picker': {
    title: 'Emoji Picker',
    description: 'Browse and copy emojis. Free, private, and 100% client-side in your browser. No signup, no upload. Free, private, and 100% client-side in your browser.',
  },
  'string-obfuscator': {
    title: 'String Obfuscator',
    description: 'Obfuscate strings for basic anti-scraping and casual hiding — encoding layers and character tricks with reversible output.',
  },
  'numeronym-generator': {
    title: 'Numeronym Generator',
    description: 'Generate numeronyms like i18n and k8s from any word or phrase — the abbreviation convention behind DevOps vocabulary. Bulk conversion, instant, entirely.',
  },
  'ascii-text-drawer': {
    title: 'ASCII Text Drawer',
    description: 'Generate ASCII art text. Free, private, and 100% client-side in your browser. No signup, no upload. Free, private, and 100% client-side in your browser.',
  },
  'phone-parser': {
    title: 'Phone Parser & Formatter',
    description: 'Parse phone numbers into country code, area code, and subscriber portions with formatting for common regions. Clean up contact data without uploading it.',
  },
  'iban-validator': {
    title: 'IBAN Validator & Parser',
    description: 'Validate IBANs: checksum verification, country length rules, and structure breakdown (bank, branch, account). Catch typos before payments fail.',
  },
  'qr-code-generator': {
    title: 'QR Code Generator - Secure AI & MCP Tool | Formatho',
    description: 'Create custom QR codes for URLs, text, WiFi, email, phone numbers, and more. Free online QR code generator with customizable size, colors, and error.',
    keywords: 'qr code generator, free qr code, create qr code, qr code maker, online qr generator, custom qr code, url qr code, qr code download, qr code png, qr code svg, privacy-first',
  },
  'crontab-generator': {
    title: 'Crontab Generator - Secure Cron Builder | Formatho',
    description: 'Generate cron expressions with visual builder. Cron expressions control scheduled jobs on nearly every Linux server, yet the five-field syntax (minute.',
  },
  'regex-tester': {
    title: 'Regex Tester Online | Formatho',
    description: 'Test and debug regular expressions online instantly. Match patterns, capture groups, flags (global, case-insensitive), and see results in real-time.',
    keywords: 'regex tester online, regular expression tester, regex checker, regex validator, test regex online, regex matcher, regex debugger, free regex tool, privacy-first',
  },
  'math-evaluator': {
    title: 'Math Evaluator',
    description: 'Evaluate mathematical expressions with full operator precedence, functions, and constants — safer than eval, with step-by-step parsing.',
  },
  'quantum-circuit-simulator': {
    title: 'Quantum Circuit Simulator | Formatho',
    description: 'Design and simulate quantum circuits with real quantum gates. Build circuits with Hadamard, Pauli gates, CNOT, and measurements.',
    keywords: 'quantum circuit simulator, quantum computing, quantum gates, hadamard gate, cnot gate, quantum simulator, qubits, superposition, entanglement, quantum learning, free quantum tool, privacy-first',
  },
  'percentage-calculator': {
    title: 'Percentage Calculator - Secure MCP Tool for AI | Formatho',
    description: 'Calculate percentages, increases, and decreases. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'token-generator': {
    title: 'Random Token Generator - Secure API Secrets | Formatho',
    description: 'Generate cryptographically secure random tokens and API secrets - hex, base64, and custom-alphabet, any length, batch mode.',
    keywords: 'random token generator, api token generator, secure token generator, secret key generator, random string generator, api key generator',
  },
  'hash-text': {
    title: 'Argon2id Hash Generator - Secure MCP Tool for AI | Formatho',
    description: 'Generate Argon2id, bcrypt, PBKDF2, MD5, SHA-1, SHA-256, SHA-384, SHA-512, BLAKE2b, and Poseidon hashes online. 100% client-side hashing - your data never.',
    keywords: 'argon2id hash, argon2id online, argon2id browser, argon2id generator, bcrypt online, pbkdf2 online, sha256 generator, sha512 generator, md5 generator, blake2b online, poseidon hash, hash text, password hash, crypto hash, client-side hashing, privacy-first hash tool, free hash generator',
    canonical: 'https://formatho.com/tools/hash-text',
  },
  'xml-json': {
    title: 'XML to JSON Converter Online - Secure & | Formatho',
    description: 'Bi-directional XML to JSON converter with real-time conversion and clipboard support. 100% client-side, zero server API calls.',
  },
  'ulid-generator': {
    title: 'ULID Generator — Sortable IDs, Bulk, Offline | Formatho',
    description: 'Generate ULIDs in bulk — timestamp-sortable IDs that index better than UUIDs. Monotonic option, all generated locally in your browser.',
    keywords: 'ulid generator, ulid vs uuid, sortable id generator, ulid online'
  },
  'case-converter': {
    title: 'Case Converter — camelCase, snake_case, Offline | Formatho',
    description: 'Convert between camelCase, snake_case, kebab-case and more — correctly handling acronyms and digits. Paste whole identifier lists; runs in your browser.',
    keywords: 'case converter, camelcase to snake case, snake case converter, coding case converter, case conversion'
  },
  'date-time-converter': {
    title: 'Date & Time Converter Online - Unix, ISO 8601 | Formatho',
    description: 'Convert between Unix timestamps, ISO 8601, RFC formats, and human dates across timezones — with live clock and epoch reference.',
  },
  'unix-timestamp': {
    title: 'Unix Timestamp Converter Online - Epoch to Date | Formatho',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Live clock with current time in both formats. Unix timestamps — seconds or milliseconds.',
  },
  'color-converter': {
    title: 'Color Converter Online - HEX, RGB, HSL | Formatho',
    description: 'Convert colors between HEX, RGB, HSL formats. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'text-to-binary': {
    title: 'Text to Binary Converter - Secure MCP Tool for AI | Formatho',
    description: 'Convert text to binary and back — UTF-8 bytes, hex, and decimal alongside. See exactly how strings encode at the bit level.',
  },
  'http-status-codes': {
    title: 'HTTP Status Codes Reference - All Codes Explained | Formatho',
    description: 'Reference for HTTP status codes and meanings. Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'mermaid-viewer': {
    title: 'Mermaid Diagram Viewer & Editor Online | Formatho',
    description: 'Free online Mermaid diagram viewer and editor. Paste Mermaid.js code from ChatGPT, Claude, or Copilot and render flowcharts, sequence diagrams, ER.',
    keywords: 'mermaid viewer, mermaid diagram, mermaid online, ai diagram tool, chatgpt diagram, claude mermaid, copilot diagram, flowchart maker, sequence diagram, er diagram, gantt chart, markdown diagram, free diagram tool, mermaid js, architecture diagram, privacy-first',
  },
  'beta-feedback': {
    title: 'Beta Feedback - Formatho',
    description: 'Share your feedback to help us improve Formatho Free, private, and 100% client-side in your browser. No signup, no upload.',
    keywords: 'beta feedback, bug report, feature request',
  },
  'admin-beta-feedback': {
    title: 'Beta Feedback Dashboard - Formatho Admin',
    description: 'Review and manage beta tester feedback',
  },
  'admin-ab-tests': {
    title: 'A/B Test Dashboard - Formatho Admin',
    description: 'Monitor and analyze A/B test results for landing page optimization Free, private, and 100% client-side in your browser. No signup, no upload.',
  },
  'category-web3': {
    title: 'Web3 & Blockchain Tools - Secure MCP for AI | Formatho',
    description: 'EVM contract reader, vanity address generator, multi-chain readers for Solana, Polkadot, Cardano, Cosmos. Keccak-256 hasher, ABI tools, ENS calculator.',
  },
  'category-security': {
    title: 'Security & Auth Tools - Secure MCP for AI Agents | Formatho',
    description: 'Hash generators, JWT debugger, SAML decoder, OIDC builder, encryption, TOTP, password analysis. Free, private, 100% client-side.',
  },
  'category-data-formats': {
    title: 'Data Format Tools - JSON, YAML, XML, CSV | Formatho',
    description: 'Validators, formatters, and converters for JSON, YAML, XML, TOML, and CSV. Plus UUID, Base64, and IBAN tools. Free and client-side.',
  },
  'category-developer': {
    title: 'Developer Tools - SQL, Git, Docker, Regex | Formatho',
    description: 'SQL formatting and schema tools, Git and regex references, Docker conversion, Mermaid viewer, image compression. Free, private, client-side.',
  },
  'category-converters': {
    title: 'Converters & Calculators - Secure MCP for AI | Formatho',
    description: 'Unix timestamp, date-time, number base, color, case, temperature converters. Math, ETA, and percentage calculators. Free and client-side.',
  },
  'category-network': {
    title: 'Network & Web Tools - Subnet, URL, HTTP | Formatho',
    description: 'IPv4 subnet calculator, MAC address tools, IPv6 ULA, URL encoder/parser, HTTP status codes, QR code generator. Free, private, client-side.',
  },
  'not-found': {
    title: '404 - Page Not Found | Formatho',
    description: 'The page you are looking for does not exist.',
  },
}
