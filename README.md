# Formatho — Privacy-First Developer Tools

**Free developer tools that run entirely in your browser.** No uploads, no accounts, no tracking.

Live at **[formatho.com](https://formatho.com)**

## Why

Most online dev tools (JSON formatters, JWT decoders, hash generators) send your data to a server.
Formatho doesn't — everything runs 100% client-side. Your tokens, keys, config files, and secrets
never leave your device. The site even works offline once loaded.

## Categories

- **Security & Auth** — JWT debugger, SAML decoder, OIDC/PKCE builder, OWASP ZAP report analyzer, security headers checker, CSP generator, TLS certificate checker, Argon2id/bcrypt/PBKDF2 hashing, TOTP, RSA/X25519 key tools
- **Compliance & Standards** — EU Digital Product Passport builder/validator, ESPR readiness, ISO 20022 pain.001 builder, PINT AE invoice builder (UAE e-invoicing), SOC 2 checklist, battery passport, GS1 Digital Link, BOM tools
- **Web3 & Blockchain** — multi-chain wallet generator (ETH/BTC/SOL/ATOM/DOT with verified test vectors), EVM contract reader, vanity address generator, Solana/Polkadot/Cardano/Cosmos readers, ABI tools, ENS namehash, ERC-4626 analyzer, Uniswap calculators, RWA tokenization lab
- **Developer Tools** — SQL formatter and schema tools, Git and regex references, Docker conversion, Mermaid viewer, Markdown editor, LLM token counter, Jev playground
- **Data Formats** — JSON / YAML / XML / TOML / CSV formatters, validators, converters, diff tools, UUID/ULID
- **Converters & Calculators** — Unix timestamp, number base, color, case, roman numerals, temperature (combined tool pages)
- **Network & Web** — IPv4 subnet calculator and converter suite, MAC address toolkit, IPv6 ULA generator, URL encoder/parser, QR codes, HTTP status codes, CORS tester

Plus a [blog](https://formatho.com/blogs) and guided [tool funnels](https://formatho.com/funnels) (e.g. GTIN → DPP QR code, SPF → DMARC hardening).

## Tech Stack

- Vue 3 + TypeScript + Vite (vite-ssg static generation, every route prerendered)
- Deployed as a static site behind nginx (Docker), strict CSP, markdown content negotiation
- Build pipeline scripts generate the sitemap, llms.txt, per-tool markdown mirrors, and blog/structured-data injection

## Development

```bash
npm install
cp .env.example .env   # fill in optional values (all client-side)
npm run dev
```

Tool registration lives in `src/data/tools.ts`, `src/router/index.ts`, and `src/data/routeMeta.ts` (all three are required for a new tool page).

## License

[MIT](./LICENSE)
