/* eslint-disable no-useless-escape */
/**
 * FAQ content for the top 25 tool pages (P1 keyword clusters). Rendered
 * visibly by ToolSEOContent and emitted as FAQPage JSON-LD by
 * inject-tool-meta.js — schema and visible content always match.
 * HowTo JSON-LD is generated from toolSEOContent[route].howTo.
 */

export const faqHowTo = {
  '/tools/json-yaml': [
    { question: 'Is this JSON to YAML converter safe for private configs?', answer: 'Yes — conversion runs entirely in your browser with JavaScript. Your Kubernetes manifests, CI configs, and secrets are never uploaded to any server, logged, or stored.' },
    { question: 'Which should I use for Kubernetes manifests, JSON or YAML?', answer: 'Kubernetes accepts both, but YAML is conventional: it supports comments, anchors, and multi-document files (--- separators) that JSON lacks. Convert JSON specs to YAML when hand-maintaining them.' },
    { question: 'Why did my YAML convert back to JSON with different key order?', answer: 'JSON objects are unordered, so tools may serialize keys differently. The data is identical; if order matters for diffs, keep the canonical form in version control and convert one direction only.' }
  ],
  '/tools/json-csv': [
    { question: 'How do I convert a nested JSON array to CSV?', answer: 'Paste the JSON and the converter flattens nested objects into dot-notation columns (user.name → user.name) so every record fits the CSV grid. Arrays of objects work best; a single object is wrapped as one row.' },
    { question: 'Does CSV conversion handle commas and quotes in my data?', answer: 'Yes — values containing commas, quotes, or newlines are wrapped and escaped per RFC 4180, so the exported CSV opens correctly in Excel, Sheets, and pandas.' },
    { question: 'Is there a size limit for JSON to CSV conversion?', answer: 'The limit is your browser memory, not a server — files into the tens of megabytes convert fine locally. Nothing is uploaded, so large customer exports never leave your machine.' }
  ],
  '/tools/yaml-viewer': [
    { question: 'Can this tool validate Kubernetes YAML?', answer: 'Yes — it parses YAML strictly and reports the exact line of syntax errors like bad indentation or duplicate keys, which are the most common kubectl apply failures. It validates syntax; schema validation (required fields per resource) is done by kubectl or kubeconform.' },
    { question: 'Why does YAML reject tabs?', answer: 'The YAML specification requires spaces for indentation. Editors often insert tabs silently — this linter flags them so you fix the file before it reaches your pipeline.' },
    { question: 'Does formatting change my YAML meaning?', answer: 'No — formatting normalizes indentation and spacing only. Comments and key order are preserved wherever the parser supports them.' }
  ],
  '/tools/xml-formatter': [
    { question: 'Can this formatter handle large XML files?', answer: 'Yes — parsing and formatting run locally in your browser, so multi-megabyte SOAP responses and SAML documents format without upload timeouts. Processing speed depends on your machine, not a server.' },
    { question: 'Does it validate XML or just pretty-print?', answer: 'Both — malformed XML (unclosed tags, bad entities) is reported with the parser error position before any formatting is applied.' },
    { question: 'Is my XML uploaded anywhere?', answer: 'No. Formatting and validation are 100% client-side. SAML assertions and SOAP payloads stay in your browser.' }
  ],
  '/tools/toml-to-json': [
    { question: 'Which TOML files does this converter support?', answer: 'Any valid TOML v1.0 — Cargo.toml for Rust, pyproject.toml for Python, Netlify and Hugo configs. Tables, arrays of tables, dates, and multiline strings all convert to their JSON equivalents.' },
    { question: 'How are TOML dates converted to JSON?', answer: 'TOML has native date-time types; JSON does not. They serialize as ISO-8601 strings (2026-01-15T10:30:00Z), which every JSON parser round-trips safely.' },
    { question: 'Why convert pyproject.toml to JSON at all?', answer: 'Tooling: JSON is what most scripting environments consume natively. Converting lets you inspect resolved dependency trees or feed configuration into Node-based pipelines without a TOML parser.' }
  ],
  '/tools/json-lint': [
    { question: 'Why does my JSON fail validation in the browser but work in Python?', answer: 'Python\'s json module accepts some extensions (single quotes via ast, trailing commas via comment tricks) that strict JSON forbids. This linter enforces the RFC 8259 grammar — what every strict parser expects.' },
    { question: 'How do I find the exact position of a JSON syntax error?', answer: 'Paste the document and the linter reports the line and character of the first error — typically a trailing comma, unquoted key, or unterminated string — so you can fix logs and API responses in seconds.' },
    { question: 'Does the linter check UTF-8 and encoding issues?', answer: 'It flags control characters and malformed escapes that break strict parsers, the usual cause of "invalid character" errors when JSON crosses systems with different encodings.' }
  ],
  '/tools/uuid': [
    { question: 'Are UUIDs generated in the browser safe for production use?', answer: 'Yes — v4 UUIDs here use the browser\'s crypto.getRandomValues(), a cryptographically secure random source. They are as unpredictable as any server-generated UUID, and generating them locally means your seeding data never touches a network.' },
    { question: 'What is the difference between UUID v1 and v4?', answer: 'v1 encodes a timestamp and the generating machine\'s MAC address (privacy and collision concerns); v4 is 122 random bits. v4 is the modern default; use ULIDs or UUIDv7 when you need sortability.' },
    { question: 'Can I generate UUIDs in bulk?', answer: 'Yes — generate thousands at once for test fixtures and database seeds. Bulk generation happens locally, so large batches are instant and private.' }
  ],
  '/tools/base64': [
    { question: 'Is Base64 encryption?', answer: 'No — Base64 is a reversible encoding with no key. Anyone can decode it instantly. Use it to represent binary as text (data URLs, JSON payloads), never to protect secrets.' },
    { question: 'Why does my Base64 output contain + and /?', answer: 'That is the standard alphabet. URLs need Base64URL, which substitutes - and _ — this tool supports both, which matters for JWTs and query-string values.' },
    { question: 'Does Base64 encoding work correctly with UTF-8 and emojis?', answer: 'Yes — the encoder operates on UTF-8 bytes, so non-ASCII text and emoji round-trip exactly. Naive encoders that treat characters as bytes corrupt them.' }
  ],
  '/tools/ulid-generator': [
    { question: 'Why use a ULID instead of a UUID?', answer: 'ULIDs are timestamp-prefixed and lexicographically sortable, so database indexes insert sequentially (better cache behavior than random UUIDs) and creation order is readable from the ID itself.' },
    { question: 'Can ULIDs be guessed from their timestamp?', answer: 'The timestamp half is public by design; the random 80-bit half is not practically guessable. Do not use ULIDs as secret tokens — use random values for capabilities.' },
    { question: 'What is a monotonic ULID?', answer: 'When several ULIDs are generated in the same millisecond, a monotonic generator increments the random portion to preserve ordering — important for event logs where strict ordering matters.' }
  ],
  '/tools/url-encoder': [
    { question: 'When should I use encodeURIComponent vs encodeURI?', answer: 'encodeURIComponent encodes everything meaningful in a query-string value (including & = ?); encodeURI preserves URL structure characters. This tool lets you encode full URLs or components accordingly.' },
    { question: 'Why do spaces become %20 or +?', answer: '%20 is the percent-encoded space; + is the legacy application/x-www-form-urlencoded form used in query strings. Both decode to a space, but %20 is universally safe.' },
    { question: 'Is URL encoding enough to prevent injection?', answer: 'Encoding makes values safe as URL data, but injection defense is contextual — always URL-encode when building URLs and follow each consumer\'s escaping rules for HTML or SQL contexts.' }
  ],
  '/tools/case-converter': [
    { question: 'How does the converter handle acronyms like userID?', answer: 'It tokenises identifiers into words first, keeping runs of capitals together — userID becomes user_id and back to userID, not the u_i_d mangling naive converters produce.' },
    { question: 'Which case style should my API use?', answer: 'JSON fields conventionally use snake_case or camelCase per your ecosystem (camelCase in JS, snake_case in Python); URLs and CSS use kebab-case. Consistency matters more than the choice.' },
    { question: 'Can I convert whole lists of field names at once?', answer: 'Yes — paste one identifier per line for bulk conversion, ideal for migrating API payloads or database columns between conventions. Processing is local.' }
  ],
  '/tools/slugify-string': [
    { question: 'What makes a good URL slug?', answer: 'Lowercase, words separated by hyphens, accents stripped (café → cafe), punctuation removed. Short slugs with the target keyword read well to users and search engines alike.' },
    { question: 'Should slugs include stop words like the and of?', answer: 'Usually not — removing them shortens URLs without losing meaning. This tool can drop them for you while preserving the words that carry the topic.' },
    { question: 'Are the same titles guaranteed to produce the same slug?', answer: 'Yes — slugification is deterministic: identical input yields identical output, which is what makes slugs stable keys for routing.' }
  ],
  '/tools/jwt': [
    { question: 'Is it safe to paste a production JWT into this debugger?', answer: 'Yes — decoding and signature checks run entirely in your browser; the token is never sent to a server. That is precisely the difference from online debuggers that POST your token to their backend.' },
    { question: 'What should I check when a JWT fails verification?', answer: 'Confirm the algorithm matches what your backend expects (alg confusion is a classic exploit), the exp/nbf times are valid for the current clock, and for HS256 that the shared secret is exact — one trailing newline breaks HMACs.' },
    { question: 'Can a JWT be revoked before its expiry?', answer: 'Not by the token itself — JWTs are stateless. Expired-only revocation is why access tokens should be short-lived, with revocation handled by a server-side denylist or refresh-token rotation.' }
  ],
  '/tools/jwt-suite': [
    { question: 'How is the JWT Toolkit different from the JWT debugger?', answer: 'The toolkit adds verification with your own keys (HS256 secret or RS256 public key), claim-by-claim inspection, and side-by-side algorithm comparison — built for debugging auth flows, not just reading payloads.' },
    { question: 'Does the toolkit ever send my secrets or tokens anywhere?', answer: 'No. Signature verification uses Web Crypto locally in your browser. Secrets pasted here never traverse a network.' },
    { question: 'Why does RS256 verification need only a public key?', answer: 'RS256 is asymmetric: the issuer signs with a private key, anyone verifies with the public one. That lets you validate tokens without ever holding the signing secret — the safer pattern for multi-service setups.' }
  ],
  '/tools/saml-decoder': [
    { question: 'How do I decode a SAML response from a browser?', answer: 'Copy the SAMLResponse form field (base64) from your browser\'s developer tools during login, paste it here, and the decoded XML appears instantly — attributes, conditions, NameID, and signature elements.' },
    { question: 'Is decoding a SAML response here safe?', answer: 'Yes — decoding is local. SAML assertions carry identity data and sometimes sensitive attributes, so keeping them out of server-side decoders is the point of a client-side tool.' },
    { question: 'Why is my SAML response not valid base64?', answer: 'Browsers URL-encode the POST payload. The toolkit handles the deflate (compressed) variant too — if raw base64 decode fails, it retries with inflation, which most IdPs use.' }
  ],
  '/tools/oidc-url-builder': [
    { question: 'What is PKCE and do I need it?', answer: 'PKCE (proof of key for code exchange) binds the authorization request to a verifier only your app knows, preventing intercepted authorization codes from being used. It is required for public clients (SPAs, mobile) and recommended everywhere — this builder generates the challenge pair for you.' },
    { question: 'Which parameters are required in an OIDC authorization URL?', answer: 'response_type, client_id, and redirect_uri at minimum; state (CSRF protection) and nonce (replay protection for ID tokens) should always be included. scope=openid is what makes it OIDC rather than plain OAuth2.' },
    { question: 'Why must redirect_uri match exactly?', answer: 'Identity providers compare it byte-for-byte against the registered value — a trailing slash or http/https difference is rejected. Copy the exact registered URI when building requests.' }
  ],
  '/tools/basic-auth-generator': [
    { question: 'How is a Basic Auth header constructed?', answer: 'The header is Base64(username:password) prefixed with Basic . This generator produces the exact header value to paste into curl, Postman, or REST clients — computed locally so credentials never leave your browser.' },
    { question: 'Is Basic Auth secure?', answer: 'Only over HTTPS — the credentials are merely encoded, not encrypted, and reversible by anyone who captures the header. Modern APIs prefer bearer tokens; Basic Auth remains common for internal tools and simple automation.' },
    { question: 'Can I use Basic Auth with special characters in the password?', answer: 'Yes — the colon is the only reserved separator (it cannot appear in the username). Everything else, including UTF-8, encodes cleanly since the whole string becomes Base64 bytes.' }
  ],
  '/tools/abi-encoder': [
    { question: 'What is ABI encoding used for?', answer: 'Every Ethereum contract call encodes its arguments per the ABI specification — the same bytes eth_abi.encode produces. This encoder builds them from a signature and values, matching what wallets and web3 libraries send on-chain.' },
    { question: 'Can I decode calldata I found in a transaction?', answer: 'Yes — paste the function signature and the 0x data; each argument decodes to its uint, address, bytes, or composite type. Useful for verifying what a pending transaction will do before signing it.' },
    { question: 'Does encoding contact a node or wallet?', answer: 'No — ABI encoding is pure local computation. Nothing is broadcast, and no wallet connection is needed or requested.' }
  ],
  '/tools/calldata-decoder': [
    { question: 'What is calldata in an Ethereum transaction?', answer: 'It is the input data field: a 4-byte function selector (keccak256 of the signature) followed by ABI-encoded arguments. This decoder turns that hex into the function name and each argument value.' },
    { question: 'Why decode calldata before approving a transaction?', answer: 'Wallets show raw hex at worst and summaries at best. Decoding reveals exactly which function runs and with which values — the difference between approving a swap and approving an unlimited allowance to a drainer.' },
    { question: 'Does decoding require an RPC connection?', answer: 'No — decoding is local. Paste the data from Etherscan, your wallet preview, or a log; nothing is queried or transmitted.' }
  ],
  '/tools/function-selector': [
    { question: 'What is a function selector?', answer: 'The first four bytes of keccak256 of a function\'s canonical signature — transfer(address,uint256) becomes 0xa9059cbb. The EVM dispatches calls by these bytes alone, which is why signatures must match exactly.' },
    { question: 'Why does my selector differ from the contract\'s?', answer: 'Signatures must use canonical types: uint not uint256 in the string you hash is wrong — it is the reverse, uint256 is canonical while uint is the alias. Type mismatches and typo\'d argument order produce different selectors that silently call nothing.' },
    { question: 'Can I look up unknown selectors?', answer: 'Yes — the tool computes keccak256 locally and matches against common signature databases for 4-byte lookups, helping you reverse-engineer unlabeled transactions.' }
  ],
  '/tools/ens-namehash': [
    { question: 'What is the ENS namehash algorithm?', answer: 'Defined by EIP-137, namehash recursively hashes labels from the rightmost part: namehash(\'foo.bar.eth\') = keccak256(namehash(\'bar.eth\') + keccak256(\'foo\')). The root is the zero hash, and labels are hashed as UTF-8 bytes.' },
    { question: 'Why do I need namehash instead of just hashing the name?', answer: 'ENS stores records keyed by namehash in the registry — node lookups, resolver addresses, and reverse records all use it. Hashing the full string directly produces a value no contract recognizes.' },
    { question: 'Does normalization matter for namehash?', answer: 'Yes — labels must be ENS-normalized (lowercase, Unicode forms per UTS-46) before hashing. This tool applies the normalization step; skipping it yields hashes that do not match on-chain records.' }
  ],
  '/tools/evm-converter': [
    { question: 'Why do EVM tools use wei instead of ether?', answer: 'The EVM computes in 256-bit integers, and JavaScript numbers lose precision above 2^53 — about 9 ETH in wei. Converting with BigInt keeps 18-decimal arithmetic exact; this converter never uses floating point.' },
    { question: 'How do I calculate transaction cost in ether?', answer: 'Cost = gas used × gas price. A 180,000-gas swap at 12 gwei is 2,160,000 gwei = 0.00216 ETH. The converter handles the gwei-to-ether step exactly.' },
    { question: 'Do tokens use the same 18 decimals as ether?', answer: 'No — decimals are per-token (USDC uses 6). The ether ladder here applies to ETH and EVM gas; for tokens, divide by that token\'s specific decimals.' }
  ],
  '/tools/json-viewer': [
    { question: 'How do I explore a large JSON file without uploading it?', answer: 'Paste or load it — the viewer formats and renders a collapsible tree entirely in your browser, so multi-megabyte API dumps with sensitive fields never touch a server.' },
    { question: 'Can the viewer handle JSON with syntax errors?', answer: 'It reports the line and position of the first error instead of rendering, which doubles as a quick pre-check before jq or your pipeline sees the file.' },
    { question: 'Does formatting change my JSON data?', answer: 'No — pretty-printing only adds whitespace. Key order and values are preserved exactly as parsed.' }
  ],
  '/tools/sql': [
    { question: 'Why format SQL at all?', answer: 'Formatted SQL reviews itself: join conditions become visible, WHERE grouping is explicit, and adding a column is a one-line diff. This formatter applies conventions consistently across dialects.' },
    { question: 'Which SQL dialects does the formatter support?', answer: 'PostgreSQL, MySQL, T-SQL, BigQuery, SQLite and more — keyword sets and identifier quoting adapt per dialect, and the dialect converter translates queries between them.' },
    { question: 'Is my SQL uploaded for formatting?', answer: 'No — formatting is client-side. Queries with production table names and business logic stay in your browser.' }
  ],
  '/tools/ipv4-subnet-calculator': [
    { question: 'How many usable hosts are in a /26?', answer: '62 — a /26 leaves 6 host bits (2^6 = 64 addresses), minus the network and broadcast addresses. The calculator shows ranges, broadcast, and usable count for any mask.' },
    { question: 'How do I split a /24 into four equal subnets?', answer: 'Borrow 2 bits → /26 each: .0/26, .64/26, .128/26, .192/26 with 62 usable hosts apiece. The calculator lists every range when you plan the split.' },
    { question: 'Why subtract 2 addresses from every subnet?', answer: 'The first address identifies the network and the last is the broadcast — neither is assignable to a host.' }
  ]
}
