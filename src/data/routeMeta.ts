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
    title: 'Formatho - Privacy-First Developer Tools',
    description: 'Free privacy-first developer tools that run in your browser. Zero tracking, no sign-up, 100% client-side.',
    keywords: 'developer tools, json formatter, base64 encoder, uuid generator, privacy-first tools, agent todo, online utilities, free developer tools, client-side tools',
  },
  'about': {
    title: 'About Us - Formatho',
    description: 'Learn about Formatho - our mission to build privacy-first developer tools and AI agent orchestration solutions.',
    keywords: 'about formatho, privacy-first tools, developer tools, open source',
  },
  'blogs': {
    title: 'Developer Guides, Tutorials, and AI Insights | Formatho Blog',
    description: 'Explore expert developer guides, tutorials, and technical insights from the Formatho team. Deep dives into AI agent orchestration, blockchain, RWA tokenization, and privacy-first tools with zero fluff.',
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
    description: 'Learn about Formatho privacy practices. All data processing happens locally in your browser.',
    keywords: 'privacy policy, data protection, client-side processing',
  },
  'terms': {
    title: 'Terms of Service - Formatho',
    description: 'Terms of service for Formatho developer tools and AI agent platform.',
    keywords: 'terms of service, legal, usage terms',
  },
  'contact': {
    title: 'Contact Us - Formatho',
    description: 'Get in touch with the Formatho team. Report bugs, request features, or join our community.',
    keywords: 'contact, support, feedback, github',
  },
  'markdown': {
    title: 'Markdown Editor Online - Live Preview, GFM | Formatho',
    description: 'Edit and preview Markdown files in real-time. Privacy-first markdown editor that runs 100% client-side in your browser.',
    keywords: 'markdown editor, markdown preview, markdown viewer, github markdown, privacy-first',
  },
  'tools-markdown': {
    title: 'Markdown Editor Online - Live Preview, GFM | Formatho',
    description: 'Edit and preview Markdown files in real-time. Privacy-first markdown editor that runs 100% client-side in your browser.',
    keywords: 'markdown editor, markdown preview, markdown viewer, github markdown, privacy-first',
  },
  'json-yaml': {
    title: 'JSON to YAML Converter Online - Free | Formatho',
    description: 'Convert JSON to YAML and YAML to JSON online instantly. Free converter for config files, Kubernetes manifests, docker-compose, and CI/CD configs. 100% client-side — your data never leaves your browser.',
    keywords: 'json to yaml converter, yaml to json, convert json yaml online, json yaml converter free, kubernetes yaml converter, docker compose converter, json yaml online tool, privacy-first',
  },
  'json-csv': {
    title: 'JSON to CSV Converter Online - Free | Formatho',
    description: 'Convert JSON to CSV and CSV to JSON online instantly. Free converter for data export, spreadsheet import, and API data transformation. Handles nested objects and arrays. 100% client-side, no upload.',
    keywords: 'json to csv converter, csv to json, convert json csv online, json csv free tool, csv json transformer, excel json converter, data conversion tool, privacy-first',
  },
  'diff': {
    title: 'Text Diff Checker Online | Formatho',
    description: 'Compare two texts online and highlight differences instantly. Free diff checker for code review, document comparison, and version tracking. Shows additions, deletions, and changes side-by-side. 100% client-side.',
    keywords: 'text diff online, diff checker, compare text online, file comparison tool, text difference, code diff, diff tool free, online text compare, privacy-first',
  },
  'base64': {
    title: 'Base64 Encoder & Decoder Online - Free | Formatho',
    description: 'Encode text to Base64 or decode Base64 to text online instantly. Free Base64 converter supports UTF-8, files, and URLs. No signup, 100% client-side — your data never leaves your browser.',
    keywords: 'base64 encoder online, base64 decoder online, base64 converter, decode base64, encode base64, base64 to text, text to base64, base64 online tool, free base64, privacy-first',
  },
  'jwt': {
    title: 'JWT Debugger - Decode, Verify & Inspect Tokens | Formatho',
    description: 'Decode JWT (JSON Web Tokens) online instantly. Inspect JWT header, payload, and signature. Check expiry, validate claims, and debug auth tokens. Free JWT debugger — 100% client-side, tokens never leave your browser.',
    keywords: 'jwt decoder online, decode jwt, jwt debugger, jwt inspector, json web token decoder, jwt payload viewer, jwt validator, jwt expiry checker, free jwt tool, privacy-first',
  },
  'sql': {
    title: 'SQL Formatter Online - Free SQL Beautifier | Formatho',
    description: 'Format and beautify SQL queries online instantly. Free SQL formatter supporting PostgreSQL, MySQL, SQLite, T-SQL, and more. Beautify minified SQL, validate syntax, and improve readability. 100% client-side.',
    keywords: 'sql formatter online, sql beautifier, format sql online, sql prettifier, sql format tool, free sql formatter, postgresql formatter, mysql formatter, sqlite formatter, privacy-first',
  },
  'sql-to-er-diagram': {
    title: 'SQL to ER Diagram Converter Online | Formatho',
    description: 'Convert CREATE TABLE SQL statements into interactive ER diagrams instantly. Visualize tables, columns, primary keys, and foreign key relationships. Export as Mermaid for AI tools. Free, 100% client-side.',
    keywords: 'sql to er diagram, erd generator, database schema visualizer, create table to erd, entity relationship diagram, sql schema visualizer, free erd tool, mermaid er diagram, privacy-first',
  },
  'sql-query-plan-visualizer': {
    title: 'SQL Query Plan Visualizer Online | Formatho',
    description: 'Visualize SQL execution plans step by step. Understand table scans, joins, sorts, and aggregates. Get actionable optimization tips for PostgreSQL, MySQL, and more. Free, 100% client-side.',
    keywords: 'sql query plan, execution plan visualizer, sql optimizer, query analysis, explain plan, sql performance, database optimization, free sql tool, privacy-first',
  },
  'sql-dialect-converter': {
    title: 'SQL Dialect Converter - Postgres, MySQL, T-SQL | Formatho',
    description: 'Convert SQL queries between PostgreSQL, MySQL, SQLite, SQL Server, BigQuery, Snowflake, and more. Handles syntax differences, data types, and dialect-specific functions. Free, 100% client-side.',
    keywords: 'sql dialect converter, postgresql to mysql, mysql to postgresql, sql converter, tsql converter, sql translation, database migration tool, free sql converter, privacy-first',
  },
  'foreign-key-visualizer': {
    title: 'Foreign Key Visualizer - Map Database Relationships | Formatho',
    description: 'Visualize foreign key relationships in your SQL schema. See how tables connect, find orphaned tables, and export relationship diagrams as Mermaid. Free, 100% client-side.',
    keywords: 'foreign key visualizer, fk relationships, database relationships, schema relationships, sql fk mapper, table relationships visualizer, free database tool, privacy-first',
  },
  'tools-all': {
    title: 'All Developer Tools - Formatho',
    description: 'Complete collection of privacy-first developer tools. JSON, YAML, encoding, hashing, crypto, and more. All tools run in your browser.',
    keywords: 'developer tools, json formatter, yaml validator, base64 encoder, hash generator, privacy-first tools',
  },
  'uuid': {
    title: 'UUID Generator Online - Free UUID v4 & v1 | Formatho',
    description: 'Generate UUIDs online instantly — UUID v4, v1, v3, and v5. Create single or batch unique identifiers for databases, APIs, and distributed systems. Free, 100% client-side, no signup required.',
    keywords: 'uuid generator online, uuid v4 generator, generate uuid online, guid generator, unique id generator, uuid v1, uuid v5, random uuid, batch uuid generator, free uuid tool, privacy-first',
  },
  'lorem': {
    title: 'Lorem Ipsum Generator Online | Formatho',
    description: 'Generate Lorem Ipsum placeholder text online instantly. Create paragraphs, sentences, and words for mockups, wireframes, and design templates. Free dummy text generator — 100% client-side.',
    keywords: 'lorem ipsum generator, placeholder text, dummy text generator, lorem ipsum, privacy-first',
  },
  'image': {
    title: 'Image Compressor - Reduce Image Size Free Online | Formatho',
    description: 'Compress JPG, PNG, and WebP images by up to 80% without quality loss. Perfect for reducing AI-generated image sizes, optimizing web performance, and saving storage. Resize, convert, and batch process images — all in your browser, 100% private.',
    keywords: 'image compressor, compress image online, reduce image size, optimize images, ai image compressor, webp compressor, png optimizer, jpg reducer, batch image compression, free image tool, privacy-first',
  },
  'json-lint': {
    title: 'JSON Validator & Formatter Online | Formatho',
    description: 'Free online JSON validator and formatter. Check JSON syntax errors, beautify minified JSON, and validate API responses instantly in your browser. No upload, 100% private. Supports JSON5 comments.',
    keywords: 'json validator online, json formatter online, json linter, validate json, json checker, json beautifier, json parser online, json syntax checker, json to pretty, free json tool, privacy-first',
  },
  'yaml-lint': {
    title: 'YAML Validator & Linter Online | Formatho',
    description: 'Free online YAML validator and formatter. Check YAML syntax errors, format and beautify YAML instantly. Validate docker-compose, Kubernetes configs, CI/CD pipelines, and more. 100% client-side, no data uploaded.',
    keywords: 'yaml linter, yaml validator, yaml formatter, validate yaml, yaml checker, privacy-first',
  },
  'bpmn': {
    title: 'BPMN Viewer Online - Open & Export BPMN as PDF | Formatho',
    description: 'Visualize BPMN 2.0 diagrams and export them as PDF. Free, privacy-first BPMN viewer that runs entirely in your browser.',
    keywords: 'bpmn viewer, bpmn to pdf, bpmn diagram, business process model, bpmn export, privacy-first',
  },
  'bpmn-to-visio': {
    title: 'BPMN to Visio Converter Online - Free | Formatho',
    description: 'Convert BPMN process diagrams into Microsoft Visio compatible formats. Free, privacy-first converter that runs entirely in your browser.',
    keywords: 'bpmn to visio, bpmn converter, visio converter, process diagram, bpmn export, microsoft visio, privacy-first',
  },
  'visio-viewer': {
    title: 'Visio Viewer Online - Open VSDX Files in Browser | Formatho',
    description: 'View Microsoft Visio diagrams (.vsdx, .vsd) directly in your browser. Free, privacy-first Visio viewer that runs entirely client-side.',
    keywords: 'visio viewer, visio file viewer, vsdx viewer, vsd viewer, microsoft visio, diagram viewer, visio online, privacy-first',
  },
  'evm-converter': {
    title: 'Ethereum Unit Converter Online - Wei, Gwei, Ether | Formatho',
    description: 'Convert between Wei, Gwei, and Ether instantly. Essential tool for Ethereum developers. 100% client-side, privacy-first. Supports all EVM chains including L2s.',
    keywords: 'ethereum unit converter, wei converter, gwei converter, ether converter, evm tools, wei to ether, gwei to wei, blockchain unit converter',
  },
  'bls-signature': {
    title: 'BLS12-381 Signature Generator & Verifier Online | Formatho',
    description: 'Generate BLS12-381 signatures, verify signatures, and aggregate multiple signatures into one. 100% client-side, privacy-first.',
    keywords: 'bls signature, bls12-381, aggregate signatures, threshold signatures, boneh lynn shacham, ethereum consensus',
  },
  'keccak256': {
    title: 'Keccak-256 Hash Generator Online | Formatho',
    description: 'Calculate Keccak-256 hashes instantly online. Supports UTF-8, UTF-16, Hex, Base64. 100% client-side, no data leaves your browser. Free tool for Ethereum and blockchain developers.',
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
    description: 'Derive addresses for Ethereum, Bitcoin, Solana, and more from a private key. Runs entirely in browser.',
    keywords: 'private key to address, eth address, btc address, solana address, multi chain tool',
  },
  'cosmos-address-generator': {
    title: 'Cosmos Address Generator - Multi-Chain | Formatho',
    description: 'Generate Cosmos bech32 addresses: cosmos (Hub), osmo, juno, akash, inj prefixes. Convert between chains. Free, private, client-side.',
    keywords: 'cosmos address generator, cosmos hub address, atom address generator, osmosis address generator, osmo address, juno address generator, secret network address, scrt address, stargaze address, stars address, akash address generator, akt address, kava address, injective address, inj address, crescent address, cre address, umee address, bech32 address generator, bip39 cosmos, bip44 cosmos, cosmos wallet generator, cosmos seed phrase, cosmos mnemonic, multi chain wallet, secp256k1, blockchain address tool',
  },
  'rwa-swap': {
    title: 'RWA Asset Swap - Cross-Chain | Formatho',
    description: 'Swap RWA tokens, stablecoins (USDC, USDT, DAI), and native assets across 15+ EVM chains. Cross-chain routing powered by LI.FI. Transfer RWA tokens between Ethereum, Arbitrum, Base, Optimism, Polygon, Avalanche and more. Connect MetaMask or Rabby.',
    keywords: 'rwa swap, cross-chain swap, real world asset swap, li.fi swap, erc20 bridge, stablecoin swap, usdc cross-chain, usdt bridge, rwa token exchange, tokenized asset swap, multi-chain swap, ethereum arbitrum swap, base polygon bridge, metamask swap, rabby wallet swap, defi swap tool',
  },
  'rwa-deploy-lab': {
    title: 'RWA Tokenization Lab - Deploy Assets On-Chain | Formatho',
    description: 'Deploy real-world asset (RWA) smart contracts directly from your browser. Create ERC-20 mirror tokens for stocks like AAPL and AMZN, fractional ownership contracts, and custom tokenization contracts. Connect MetaMask or Rabby wallet, configure parameters, and deploy on Ethereum, Polygon, Arbitrum, Base, and Optimism. Free POC tool for RWA and DeFi developers.',
    keywords: 'rwa tokenization, real world asset tokenization, rwa deployment tool, tokenization factory, compliance manager smart contract, kyc aml blockchain, sanctions screening on-chain, transfer manager erc20, identity registry wallet mapping, treasury fee collection solidity, governance timelock dao, asset registry nft, fractional token erc20, vault custody contract, rwa architecture, erc20 mirror token deploy, fractional ownership contract, asset tokenization platform, rwa smart contract, tokenize real estate, tokenize stocks, aapl mirror token, amzn mirror token, create tokenized asset, factory pattern solidity, rwa defi, real world asset blockchain, metamask smart contract deploy, rabby wallet deploy, deploy erc20 browser, tokenization poc, rwa lab, blockchain asset tokenization, on-chain rwa, erc20 deployment tool, fractional shares, rwa project builder, defi poc tool, createasset, batch token deployment, compliance kyc smart contract, transfer restriction contract, asset fractionalization flow',
  },
  'solidity-to-opcodes': {
    title: 'Solidity to Opcodes Compiler | Formatho',
    description: 'Compile Solidity to EVM Opcodes and Bytecode in your browser. View the assembly of your smart contracts. Multiple compiler versions. 100% client-side.',
    keywords: 'solidity compile, evm opcodes, smart contract assembly, solidity bytecode, compiler, solidity to opcode, evm disassembler, blockchain development',
  },
  'cosmos-reader': {
    title: 'Cosmos Account Reader & Address Converter | Formatho',
    description: 'Look up any Cosmos SDK account - ATOM and token balances, account number, delegations and rewards - via public LCD endpoints. Includes a bech32 converter for every Cosmos chain prefix. 100% client-side.',
    keywords: 'cosmos account reader, cosmos balance checker, cosmos address converter, bech32 converter, atom balance check, osmosis address converter, cosmos lcd explorer',
  },
  'solana-account-reader': {
    title: 'Solana Account Reader & PDA Generator | Formatho',
    description: 'Look up any Solana account - owner, lamports, rent epoch, data - decode SPL token accounts, and derive Program Derived Addresses. Connects from your browser to any Solana RPC.',
    keywords: 'solana account reader, solana account info, decode solana token account, solana pda generator, program derived address, solana rpc viewer, solana balance check',
  },
  'polkadot-reader': {
    title: 'Polkadot Substrate Reader & SS58 Converter | Formatho',
    description: 'Query Substrate chains - Polkadot, Kusama, Westend, local nodes - via RPC: chain info and raw storage. Convert SS58 addresses between network formats. 100% client-side.',
    keywords: 'polkadot storage query, substrate rpc reader, polkadot address converter, ss58 converter, kusama address, substrate state_getStorage, polkadot rpc',
  },
  'cardano-reader': {
    title: 'Cardano Address Reader - ADA Balance & UTxO | Formatho',
    description: 'Look up any Cardano address - ADA balance, UTxO count, stake and script info - via the free keyless Koios API, straight from your browser.',
    keywords: 'cardano address reader, check ada balance, cardano address viewer, cardano utxo lookup, ada wallet balance, cardano explorer',
  },
  'contract-reader': {
    title: 'EVM Smart Contract Reader - Call ABI View Functions | Formatho',
    description: 'Paste a contract ABI, set any RPC endpoint and contract address, and call view and pure functions directly from your browser. Works on every EVM chain. Read-only eth_call - no wallet, no gas, no server.',
    keywords: 'read smart contract online, call contract function, abi reader, contract view functions, eth_call tool, read contract without etherscan, contract interaction tool',
  },
  'function-selector': {
    title: 'Solidity Function Selector Calculator | Formatho',
    description: 'Calculate Solidity function selectors (4-byte signatures) from function signatures using Keccak-256. Batch mode for ABI development and Foundry cast sig. 100% client-side.',
    keywords: 'function selector calculator, solidity selector, 4 byte signature, keccak256 selector, cast sig, abi selector, ethers interface id',
  },
  'ens-namehash': {
    title: 'ENS Namehash & Labelhash Calculator | Formatho',
    description: 'Calculate ENS namehash and labelhash values for any ENS name using Keccak-256 per EIP-137. Full node-by-node derivation chain. 100% client-side.',
    keywords: 'ens namehash calculator, namehash, labelhash, eip-137, ens resolution, keccak256 ens',
  },
  'passkey-address': {
    title: 'Passkey Address Deriver - P-256 WebAuthn to EVM | Formatho',
    description: 'Derive EVM addresses from P-256 passkey public keys (WebAuthn, Face ID, fingerprint). For Ritual Chain passkey transactions and WebAuthn wallets. Free, private, client-side.',
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
    title: 'TLS Certificate Checker - Expiry, Issuer, Security | Formatho',
    description: 'Check TLS/SSL certificate expiry dates, issuer, subject, and security configuration. Paste openssl output for instant analysis. Free, private, client-side.',
    keywords: 'tls checker, ssl certificate check, certificate expiry checker, openssl certificate, tls security scan'
  },
  'soc2-checklist': {
    title: 'SOC 2 Readiness Checklist - Free & Open Source | Formatho',
    description: 'Interactive, open-source SOC 2 readiness checklist covering all 5 Trust Service Criteria. Track progress with linked tools for each control. Free, private, 100% client-side.',
    keywords: 'soc 2 checklist, open source soc 2, soc 2 readiness, soc 2 compliance, soc 2 audit prep, trust service criteria, free soc 2 tools'
  },
  'policy-generator': {
    title: 'Security Policy Generator - SOC 2 Templates | Formatho',
    description: 'Generate security policies for SOC 2 compliance: password policy, access control policy, and incident response plan. Customize and copy. Free, private, client-side.',
    keywords: 'security policy generator, soc 2 policy template, password policy generator, access control policy, incident response template'
  },
  'impermanent-loss': {
    title: 'Impermanent Loss Calculator - Uniswap V2 & V3 | Formatho',
    description: 'Calculate impermanent loss for any price change. Compare HODL vs LP value, see the IL curve, and understand when fees offset losses. Free, private, client-side.',
    keywords: 'impermanent loss calculator, il calculator, uniswap impermanent loss, lp loss calculator, defi calculator, liquidity provider loss'
  },
  'vault-calculator': {
    title: 'ERC-4626 Vault Calculator - Shares to Assets | Formatho',
    description: 'Convert between ERC-4626 vault shares and underlying assets. Calculate share price, APY, and returns for Morpho, Yearn, Beefy, and any ERC-4626 vault.',
    keywords: 'erc4626 calculator, vault shares to assets, vault calculator, morpho vault calculator, yearn vault calculator, defi vault shares'
  },
  'apy-calculator': {
    title: 'APY Calculator - Convert APR to APY | Formatho',
    description: 'Convert APR to APY with any compounding frequency (daily, weekly, monthly, continuous). Compare DeFi yields accurately. Free, private, client-side.',
    keywords: 'apy calculator, apr to apy, apy to apr, defi yield calculator, compounding calculator, apy converter'
  },
  'vanity-eth': {
    title: 'Ethereum Vanity Address Generator - All EVM Chains | Formatho',
    description: 'Generate vanity addresses with a custom prefix or suffix. The same key works on every EVM chain - Ethereum, Polygon, BSC, Arbitrum, Base, Optimism, Avalanche. Runs 100% in your browser, key never transmitted.',
    keywords: 'ethereum vanity address generator, evm vanity address, vanity eth address, polygon vanity address, bsc vanity address generator, base chain vanity address, custom wallet address, safe vanity address, client-side vanity',
  },
  'security-headers': {
    title: 'Security Headers Checker | Formatho',
    description: 'Analyze HTTP security headers on any URL: HSTS, Content-Security-Policy, X-Frame-Options and more. Graded A-F with fix recommendations. Runs from your browser.',
    keywords: 'security headers check, hsts check, csp header analyzer, x-frame-options, http security headers, website security scan',
  },
  'csp-generator': {
    title: 'CSP Generator - Content Security Policy Builder | Formatho',
    description: 'Generate Content-Security-Policy headers with a visual builder. Configure script-src, style-src, img-src and more. Copy the header and deploy. Free and client-side.',
    keywords: 'csp generator, content security policy generator, csp header builder, security header generator',
  },
  'csp-evaluator': {
    title: 'CSP Evaluator - Analyze Content Security Policy | Formatho',
    description: 'Paste a Content-Security-Policy header and find security weaknesses: unsafe-inline, wildcards, missing directives, bypass risks. Free, private, client-side.',
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
    title: 'JWT & Auth Toolkit - Decode, Verify, Sign | Formatho',
    description: 'A complete JWT and authentication toolkit: decode and verify tokens, inspect claims, build OIDC authorize URLs, decode SAML, and generate secure tokens. All free and client-side.',
    keywords: 'jwt toolkit, jwt suite, auth tools, token debugging, oauth tools, oidc tools, saml tools, jwt verify, auth debugging',
  },
  'saml-decoder': {
    title: 'SAML Request & Response Decoder to XML | Formatho',
    description: 'Decode SAML AuthnRequest, LogoutRequest and Response messages. Base64 plus raw-deflate decompression with pretty-printed XML. 100% client-side - nothing is uploaded.',
    keywords: 'saml decoder, saml request decoder, saml response decoder, decode saml assertion, base64 deflate saml, saml authnrequest, saml tracing, okta saml decoder',
  },
  'oidc-url-builder': {
    title: 'OIDC Authorization URL & PKCE Generator - OAuth 2.0 | Formatho',
    description: 'Build OAuth 2.0 / OpenID Connect authorization URLs with scopes, state, nonce and S256 PKCE code challenges. Works with Okta, Auth0, Entra ID, Keycloak. 100% client-side.',
    keywords: 'oidc url builder, oauth authorization url, pkce generator, code verifier generator, code challenge s256, okta authorize url, auth0 authorize url, openid connect playground',
  },
  'abi-encoder': {
    title: 'ABI Encoder & Decoder - Solidity Tool | Formatho',
    description: 'Encode and decode Solidity ABI parameters, function calls, and constructor arguments. Generate function selectors and calldata for Foundry/Cast. Decode transaction input data. Supports all Solidity types. Free, 100% client-side.',
    keywords: 'abi encoder, abi decoder, solidity abi, abi encode online, function selector, calldata encoder, solidity encode, erc20 encode, foundry cast, ethers abi, viem abi, smart contract debugging, free abi tool, privacy-first',
  },
  'tools-agent-identity-generator': {
    title: 'AI Agent Identity Generator - Free | Formatho',
    description: 'Instantly generate unique personas, traits, and system prompts for AI agents.',
    keywords: 'ai agent identity, agent persona, agent traits, system prompts, agent generator, artificial intelligence',
  },
  'tools-local-token-counter': {
    title: 'LLM Token Counter - Local & Private Tokenizer | Formatho',
    description: 'Client-side LLM token counter. 100% private, no API calls. Count tokens for text input using local JavaScript.',
    keywords: 'token counter, llm token counter, gpt token count, claude token count, local token counter, privacy-first',
  },
  'agents': {
    title: 'Agent Browser - Blockchain Agents with Reputation',
    description: 'Explore AI Agents on the blockchain with reputation tracking. View agent addresses, reputation scores, and activity. Real-time data from the blockchain.',
    keywords: 'agent browser, blockchain agents, ai agents reputation, crypto agents, ethereum agents, agent explorer, reputation tracking',
  },
  'agent-detail': {
    title: 'Agent Details - View Reputation History & Metadata',
    description: 'View detailed information about blockchain AI agents including reputation history, ratings, metadata, and transaction records. Track agent performance and feedback.',
    keywords: 'agent details, agent reputation, blockchain agent history, ai agent ratings, crypto agent metadata, ethereum agent tracker',
  },
  'bcrypt': {
    title: 'Bcrypt Hash Generator Online - Free Password Hasher | Formatho',
    description: 'Generate bcrypt password hashes online with custom cost factors (4-31). Compare and verify bcrypt hashes. Free tool for Node.js and Python password hashing. 100% client-side — passwords never leave your browser.',
  },
  'encryption': {
    title: 'AES Encryption Tool Online - Encrypt Text Free | Formatho',
    description: 'Encrypt and decrypt text online with AES-256, DES, and TripleDES. Free client-side encryption tool — your text and keys never leave your browser. Perfect for encrypting sensitive messages and API keys.',
  },
  'bip39-generator': {
    title: 'BIP39 Mnemonic Generator | Formatho',
    description: 'Generate BIP39 mnemonic phrases and derive seeds. Privacy-first crypto tool.',
  },
  'crypto-forecasts': {
    title: 'AI Crypto Price Forecasts - BTC, ETH, SOL 30-Day | Formatho',
    description: '30-day crypto price predictions using Google TimesFM 2.5. Privacy-first AI forecasts for BTC, ETH, SOL, and more.',
  },
  'hmac-generator': {
    title: 'HMAC Generator Online - SHA256, SHA512 & More | Formatho',
    description: 'Generate HMAC hashes using various algorithms. Privacy-first tool.',
  },
  'rsa-key-pair-generator': {
    title: 'RSA Key Pair Generator Online - 2048 & 4096 Bit | Formatho',
    description: 'Generate RSA public/private key pairs. Privacy-first crypto tool.',
  },
  'password-strength-analyser': {
    title: 'Password Strength Checker & Analyzer Online | Formatho',
    description: 'Analyze password strength and security. Privacy-first tool.',
  },
  'pdf-signature-checker': {
    title: 'PDF Signature Checker - Validate Digital Signatures | Formatho',
    description: 'Check and validate digital signatures in PDF files. Privacy-first tool.',
  },
  'integer-base-converter': {
    title: 'Number Base Converter - Binary, Hex, Octal, Decimal | Formatho',
    description: 'Convert numbers between binary, octal, decimal, and hexadecimal.',
  },
  'roman-numeral-converter': {
    title: 'Roman Numeral Converter Online - Free | Formatho',
    description: 'Convert between Roman numerals and numbers.',
  },
  'base64-file-converter': {
    title: 'Base64 File Converter Online | Formatho',
    description: 'Convert files to and from Base64 format. Privacy-first tool.',
  },
  'text-to-nato-alphabet': {
    title: 'Text to NATO Alphabet Converter Online - Free | Formatho',
    description: 'Convert text to NATO phonetic alphabet.',
  },
  'text-to-unicode': {
    title: 'Text to Unicode Converter Online - Free | Formatho',
    description: 'Convert text to Unicode code points and HTML entities.',
  },
  'yaml-to-toml': {
    title: 'YAML to TOML Converter Online - Free | Formatho',
    description: 'Convert YAML configuration files to TOML format.',
  },
  'json-to-toml': {
    title: 'JSON to TOML Converter',
    description: 'Convert JSON to TOML format.',
  },
  'list-converter': {
    title: 'List Converter Online - Comma, Newline, JSON | Formatho',
    description: 'Convert lists between different formats (comma, newline, JSON, etc).',
  },
  'toml-to-json': {
    title: 'TOML to JSON Converter Online - Free | Formatho',
    description: 'Convert TOML configuration files to JSON format.',
  },
  'toml-to-yaml': {
    title: 'TOML to YAML Converter Online - Free | Formatho',
    description: 'Convert TOML configuration files to YAML format.',
  },
  'markdown-to-html': {
    title: 'Markdown to HTML Converter Online - Free | Formatho',
    description: 'Convert Markdown to HTML with syntax highlighting.',
  },
  'url-encoder': {
    title: 'URL Encoder & Decoder Online - Free | Formatho',
    description: 'Encode and decode URL strings. Privacy-first tool.',
  },
  'url-parser': {
    title: 'URL Parser Online - Split & Inspect URLs | Formatho',
    description: 'Parse and analyze URLs to extract components.',
  },
  'html-entities': {
    title: 'HTML Entities Encoder & Decoder Online - Free | Formatho',
    description: 'Encode and decode HTML entities.',
  },
  'device-information': {
    title: 'Device Information',
    description: 'View browser and device information.',
  },
  'basic-auth-generator': {
    title: 'HTTP Basic Auth Header Generator Online - Free | Formatho',
    description: 'Generate HTTP Basic Authentication headers.',
  },
  'meta-tag-generator': {
    title: 'Meta Tag Generator Online - SEO & Open Graph | Formatho',
    description: 'Generate HTML meta tags for SEO and social sharing.',
  },
  'otp-code-generator': {
    title: 'TOTP Generator Online - 2FA OTP Codes | Formatho',
    description: 'Generate TOTP codes from secrets. Privacy-first tool.',
  },
  'mime-types': {
    title: 'MIME Type Lookup',
    description: 'Look up MIME types for file extensions.',
  },
  'keycode-info': {
    title: 'Keycode Info',
    description: 'Get keyboard keycode information.',
  },
  'slugify-string': {
    title: 'Slugify String',
    description: 'Convert text to URL-friendly slugs.',
  },
  'html-wysiwyg-editor': {
    title: 'WYSIWYG HTML Editor',
    description: 'Rich text HTML editor.',
  },
  'user-agent-parser': {
    title: 'User Agent Parser',
    description: 'Parse and analyze user agent strings.',
  },
  'json-diff': {
    title: 'JSON Diff Checker - Compare JSON Online | Formatho',
    description: 'Compare and find differences between JSON objects.',
  },
  'safelink-decoder': {
    title: 'Outlook Safelink Decoder',
    description: 'Decode Outlook safelink URLs.',
  },
  'wifi-qr-code-generator': {
    title: 'WiFi QR Code Generator - Share WiFi by QR | Formatho',
    description: 'Generate QR codes for WiFi network credentials instantly. Share your WiFi password with guests without typing — scan and connect. Supports WPA, WEP, and open networks with hidden SSID. 100% client-side, no data sent to any server.',
    keywords: 'wifi qr code generator, wifi password qr, qr code wifi, share wifi, wifi qr code, wifi network qr, free wifi qr generator, scan wifi qr, guest wifi qr code, privacy-first',
  },
  'svg-placeholder-generator': {
    title: 'SVG Placeholder Generator Online - Free | Formatho',
    description: 'Generate SVG placeholder images.',
  },
  'camera-recorder': {
    title: 'Webcam Recorder - Record Video & Audio in Browser | Formatho',
    description: 'Record video and audio directly from your webcam — no software install needed. Capture HD video, take snapshots, and download as WebM. Perfect for quick video messages, screen recordings, and content creation. 100% private, all processing in your browser.',
    keywords: 'webcam recorder, record video online, browser camera, video capture, webm recorder, online video recorder, camera snapshot, screen recording, free webcam tool, privacy-first',
  },
  'git-memo': {
    title: 'Git Cheat Sheet',
    description: 'Common Git commands and their usage.',
  },
  'random-port-generator': {
    title: 'Random Port Generator Online - Free | Formatho',
    description: 'Generate random port numbers for development.',
  },
  'json-viewer': {
    title: 'JSON Viewer/Formatter',
    description: 'Format and beautify JSON data.',
  },
  'json-minify': {
    title: 'JSON Minifier',
    description: 'Minify JSON to reduce size.',
  },
  'chmod-calculator': {
    title: 'Chmod Calculator',
    description: 'Calculate Unix file permissions.',
  },
  'docker-run-to-compose': {
    title: 'Docker Run to Compose Converter Online - Free | Formatho',
    description: 'Convert docker run commands to docker-compose.yml.',
  },
  'xml-formatter': {
    title: 'XML Formatter',
    description: 'Format and beautify XML documents.',
  },
  'yaml-viewer': {
    title: 'YAML Linter & Validator Online | Formatho',
    description: 'Free YAML linter and validator that formats, validates, and beautifies YAML documents instantly. Check YAML syntax errors, fix indentation issues, and format YAML files. 100% privacy-first - runs entirely in your browser with no server uploads.',
    keywords: 'yaml lint, yaml validator, yaml linter online, yaml checker, yaml formatter, yaml beautifier, validate yaml, yaml syntax checker, yaml indentation fixer, online yaml linter, free yaml validator, yaml format, yaml viewer, yaml editor',
  },
  'email-normalizer': {
    title: 'Email Normalizer',
    description: 'Normalize and validate email addresses.',
  },
  'regex-memo': {
    title: 'Regex Cheat Sheet - Patterns & Syntax Reference | Formatho',
    description: 'Regular expression patterns and syntax reference.',
  },
  'ipv4-subnet-calculator': {
    title: 'IPv4 Subnet Calculator',
    description: 'Calculate IPv4 subnet information.',
  },
  'ipv4-address-converter': {
    title: 'IPv4 Address Converter - Decimal, Binary, Hex | Formatho',
    description: 'Convert IPv4 addresses to different formats.',
  },
  'ipv4-range-expander': {
    title: 'IPv4 Range Expander - Expand CIDR to IP List | Formatho',
    description: 'Expand IPv4 address ranges to individual IPs.',
  },
  'mac-address-lookup': {
    title: 'MAC Address Lookup - Find Vendor by MAC | Formatho',
    description: 'Look up MAC address vendor information.',
  },
  'mac-address-generator': {
    title: 'MAC Address Generator',
    description: 'Generate random MAC addresses.',
  },
  'ipv6-ula-generator': {
    title: 'IPv6 ULA Generator',
    description: 'Generate IPv6 Unique Local Address (ULA) prefixes per RFC 4193. The fd00::/8 equivalent of RFC 1918 private IPs. Free, private, client-side.',
  },
  'eta-calculator': {
    title: 'ETA Calculator',
    description: 'Calculate estimated time of arrival.',
  },
  'chronometer': {
    title: 'Chronometer',
    description: 'Online stopwatch and timer.',
  },
  'temperature-converter': {
    title: 'Temperature Converter',
    description: 'Convert between temperature units.',
  },
  'benchmark-builder': {
    title: 'Benchmark Builder',
    description: 'Benchmark JavaScript code performance.',
  },
  'text-statistics': {
    title: 'Text Statistics Counter | Formatho',
    description: 'Analyze text statistics (characters, words, etc).',
  },
  'emoji-picker': {
    title: 'Emoji Picker',
    description: 'Browse and copy emojis.',
  },
  'string-obfuscator': {
    title: 'String Obfuscator',
    description: 'Obfuscate text with hidden characters.',
  },
  'numeronym-generator': {
    title: 'Numeronym Generator',
    description: 'Generate numeronyms like i18n, k8s.',
  },
  'ascii-text-drawer': {
    title: 'ASCII Text Drawer',
    description: 'Generate ASCII art text.',
  },
  'phone-parser': {
    title: 'Phone Parser & Formatter',
    description: 'Parse and format phone numbers.',
  },
  'iban-validator': {
    title: 'IBAN Validator & Parser',
    description: 'Validate and parse IBAN numbers.',
  },
  'qr-code-generator': {
    title: 'QR Code Generator - Free Online QR Code Maker | Formatho',
    description: 'Create custom QR codes for URLs, text, WiFi, email, phone numbers, and more. Free online QR code generator with customizable size, colors, and error correction. Download as PNG or SVG. No signup, 100% client-side, zero tracking.',
    keywords: 'qr code generator, free qr code, create qr code, qr code maker, online qr generator, custom qr code, url qr code, qr code download, qr code png, qr code svg, privacy-first',
  },
  'crontab-generator': {
    title: 'Crontab Generator - Free Cron Builder | Formatho',
    description: 'Generate cron expressions with visual builder.',
  },
  'regex-tester': {
    title: 'Regex Tester Online | Formatho',
    description: 'Test and debug regular expressions online instantly. Match patterns, capture groups, flags (global, case-insensitive), and see results in real-time. Free regex tester for JavaScript, Python, and PCRE. 100% client-side.',
    keywords: 'regex tester online, regular expression tester, regex checker, regex validator, test regex online, regex matcher, regex debugger, free regex tool, privacy-first',
  },
  'math-evaluator': {
    title: 'Math Evaluator',
    description: 'Evaluate mathematical expressions.',
  },
  'quantum-circuit-simulator': {
    title: 'Quantum Circuit Simulator | Formatho',
    description: 'Design and simulate quantum circuits with real quantum gates. Build circuits with Hadamard, Pauli gates, CNOT, and measurements. Perfect for learning quantum computing concepts. Free, 100% client-side simulator.',
    keywords: 'quantum circuit simulator, quantum computing, quantum gates, hadamard gate, cnot gate, quantum simulator, qubits, superposition, entanglement, quantum learning, free quantum tool, privacy-first',
  },
  'percentage-calculator': {
    title: 'Percentage Calculator Online - Free | Formatho',
    description: 'Calculate percentages, increases, and decreases.',
  },
  'token-generator': {
    title: 'Random Token Generator - Secure API Secrets | Formatho',
    description: 'Generate cryptographically secure random tokens and API secrets - hex, base64, and custom-alphabet, any length, batch mode. 100% client-side with crypto.getRandomValues.',
    keywords: 'random token generator, api token generator, secure token generator, secret key generator, random string generator, api key generator',
  },
  'hash-text': {
    title: 'Argon2id Hash Generator Online - Free | Formatho',
    description: 'Generate Argon2id, bcrypt, PBKDF2, MD5, SHA-1, SHA-256, SHA-384, SHA-512, BLAKE2b, and Poseidon hashes online. 100% client-side hashing - your data never leaves your browser. No signup, free forever.',
    keywords: 'argon2id hash, argon2id online, argon2id browser, argon2id generator, bcrypt online, pbkdf2 online, sha256 generator, sha512 generator, md5 generator, blake2b online, poseidon hash, hash text, password hash, crypto hash, client-side hashing, privacy-first hash tool, free hash generator',
    canonical: 'https://formatho.com/tools/hash-text',
  },
  'xml-json': {
    title: 'XML to JSON Converter Online - Free & Bidirectional | Formatho',
    description: 'Bi-directional XML to JSON converter with real-time conversion and clipboard support. 100% client-side, zero server API calls.',
  },
  'ulid-generator': {
    title: 'ULID Generator Online - Free & Sortable IDs | Formatho',
    description: 'Generate Universally Unique Lexicographically Sortable Identifiers.',
  },
  'case-converter': {
    title: 'Case Converter Online - Free Text Case Changer | Formatho',
    description: 'Convert text case online instantly — UPPER, lower, Title Case, camelCase, snake_case, kebab-case, CONSTANT_CASE, and more. Free text transformer for developers and writers. 100% client-side.',
  },
  'date-time-converter': {
    title: 'Date & Time Converter Online - Unix, ISO 8601, UTC | Formatho',
    description: 'Convert dates and times between formats.',
  },
  'unix-timestamp': {
    title: 'Unix Timestamp Converter Online - Epoch to Date | Formatho',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Live clock with current time in both formats.',
  },
  'color-converter': {
    title: 'Color Converter Online - HEX, RGB, HSL | Formatho',
    description: 'Convert colors between HEX, RGB, HSL formats.',
  },
  'text-to-binary': {
    title: 'Text to Binary Converter Online - Free | Formatho',
    description: 'Convert text to binary and vice versa.',
  },
  'http-status-codes': {
    title: 'HTTP Status Codes Reference - All Codes Explained | Formatho',
    description: 'Reference for HTTP status codes and meanings.',
  },
  'mermaid-viewer': {
    title: 'Mermaid Diagram Viewer & Editor Online | Formatho',
    description: 'Free online Mermaid diagram viewer and editor. Paste Mermaid.js code from ChatGPT, Claude, or Copilot and render flowcharts, sequence diagrams, ER diagrams, Gantt charts instantly. The easiest way to visualize AI-generated diagrams. No signup, 100% client-side.',
    keywords: 'mermaid viewer, mermaid diagram, mermaid online, ai diagram tool, chatgpt diagram, claude mermaid, copilot diagram, flowchart maker, sequence diagram, er diagram, gantt chart, markdown diagram, free diagram tool, mermaid js, architecture diagram, privacy-first',
  },
  'beta-feedback': {
    title: 'Beta Feedback - Formatho',
    description: 'Share your feedback to help us improve Formatho',
    keywords: 'beta feedback, bug report, feature request',
  },
  'admin-beta-feedback': {
    title: 'Beta Feedback Dashboard - Formatho Admin',
    description: 'Review and manage beta tester feedback',
  },
  'admin-ab-tests': {
    title: 'A/B Test Dashboard - Formatho Admin',
    description: 'Monitor and analyze A/B test results for landing page optimization',
  },
  'category-web3': {
    title: 'Web3 & Blockchain Tools - Free Online | Formatho',
    description: 'EVM contract reader, vanity address generator, multi-chain readers for Solana, Polkadot, Cardano, Cosmos. Keccak-256 hasher, ABI tools, ENS calculator. All free and client-side.',
  },
  'category-security': {
    title: 'Security & Auth Tools - Free Online | Formatho',
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
    title: 'Converters & Calculators - Free Online | Formatho',
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
