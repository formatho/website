# Formatho — Privacy-First Developer Tools

**134 free developer tools that run entirely in your browser.** No uploads, no accounts, no tracking.

Live at **[formatho.com](https://formatho.com)**

## Why

Most online dev tools (JSON formatters, JWT decoders, hash generators) send your data to a server.
Formatho doesn't — everything runs 100% client-side. Your tokens, keys, config files, and secrets
never leave your device. The site even works offline once loaded.

## Tools

- **Data Formats** — JSON / YAML / XML / TOML / CSV formatters, validators, converters, diff tools, UUID/ULID validators
- **Security & Auth** — JWT debugger, SAML decoder, OIDC builder, hash generators (SHA, Keccak-256, bcrypt), encryption, TOTP, password analysis
- **Web3 & Blockchain** — EVM contract reader with Uniswap presets, vanity address generator, multi-chain readers (Solana, Polkadot, Cardano, Cosmos), ABI tools, ENS calculator
- **Developer Tools** — SQL formatter and schema tools, Git and regex references, Docker conversion, Mermaid viewer, Markdown editor
- **Converters & Calculators** — Unix timestamp, number base, color, case, binary, unicode, math calculators
- **Network & Web** — IPv4 subnet calculator, MAC tools, IPv6 ULA generator, URL encoder/parser, QR codes, HTTP status codes

## Tech Stack

- Vue 3 + TypeScript + Vite
- Deployed as a static SPA (nginx + Docker)

## Development

```bash
npm install
cp .env.example .env   # fill in optional values (all client-side)
npm run dev
```

## License

[MIT](./LICENSE)
