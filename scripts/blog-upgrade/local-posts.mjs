/* eslint-disable no-useless-escape */
/**
 * Posts authored in-repo (the CMS API token is read-only — push.mjs moves
 * these to Strapi once a write token exists; then delete the entry here).
 * Wired into: sitemap generation, blog listing, post fetch, build-time
 * meta injection, and build-time content inlining.
 */

export const localPosts = [
  {
    title: 'Keccak-256 vs SHA-256: When to Use Which (With Examples)',
    slug: 'keccak-256-vs-sha-256-when-to-use-which',
    excerpt: 'Keccak-256 is not SHA3-256, and neither is a drop-in for the other. The padding-byte difference that splits the Keccak family, why Ethereum chose the pre-standard variant, and concrete examples of when each hash is the right one.',
    date: '2026-09-16',
    readTime: '9 min',
    tags: ['Cryptography', 'Ethereum', 'Security', 'Web3', 'Hashing'],
    image: '',
    imageAlt: '',
    metaDescription: 'Keccak-256 vs SHA-256 vs SHA3-256: the padding difference, why Ethereum uses pre-standard Keccak, and worked examples of when each hash is correct.',
    content: `
<h2>Two hashes, one family tree, one byte of difference</h2>
<p>Keccak-256 and SHA-256 answer the same question — give me a fixed-size fingerprint of this data — and both are cryptographically secure. Yet they are <strong>not interchangeable</strong>, and confusing them is one of the most common bugs in Web3 engineering. Sign a message with the wrong one and your signature verification fails silently. Build a Merkle proof with SHA-256 when the contract expects Keccak-256 and every proof reverts.</p>
<p>The short version: <strong>SHA-256</strong> is the general-purpose integrity hash of the internet — TLS certificates, Git objects, Bitcoin, file checksums. <strong>Keccak-256</strong> is the hash of the Ethereum Virtual Machine — function selectors, address derivation, typed-data signatures, on-chain Merkle trees. And <strong>SHA3-256 is a third thing</strong> that is frequently mistaken for Keccak-256.</p>

<h2>The gotcha that costs hours: Keccak-256 ≠ SHA3-256</h2>
<p>The Keccak team won NIST's SHA-3 competition in 2012. When NIST standardized the design in 2015 (FIPS 202), it changed the padding byte from <code>0x01</code> to <code>0x06</code> — a deliberate domain separation tweak. The result: the same input produces <em>different digests</em> under original Keccak and under standardized SHA3-256.</p>
<p>Ethereum launched in 2015 with the pre-standard Keccak-256 already baked into the protocol — and never switched. So when an Ethereum tool says "keccak256", it means the original padding (<code>0x01</code>), and when your system library says "SHA3-256" (Node's <code>crypto</code>, Python's <code>hashlib.sha3_256</code>, Go's <code>golang.org/x/crypto/sha3</code>), it means the standardized padding (<code>0x06</code>). Same sponge construction, same capacity, incompatible outputs.</p>
<pre><code># same input, three different answers
keccak256("transfer(address,uint256)")
  → 0xa9059cbb2ab09eb219583f4a59a5d0623ade34bc954990bef74b0f6c6dece5be   (Ethereum selector)

sha3_256("transfer(address,uint256)")
  → 0x5c1c3be2...  (standardized SHA3 — NOT what the EVM uses)

sha256("transfer(address,uint256)")
  → 0x6a4ffbd9...  (SHA-2 family, entirely different design)</code></pre>
<p>The first four bytes of the Keccak digest — <code>a9059cbb</code> — are the function selector every EVM wallet and contract recognizes for ERC-20 <code>transfer</code>. Compute that selector with SHA3-256 and you get a selector for a function that does not exist.</p>

<h2>When to use Keccak-256</h2>
<p>Reach for Keccak-256 whenever the <strong>EVM is the verifier</strong>:</p>
<ul>
<li><strong>Function selectors.</strong> The first 4 bytes of <code>keccak256(signature)</code> route every contract call. Computing selectors, encoding calldata, or decoding transactions all need Keccak — the exact algorithm, original padding.</li>
<li><strong>Address derivation.</strong> An Ethereum address is the last 20 bytes of <code>keccak256(uncompressed_public_key)</code>. Not the first 20, not SHA-256 — the mismatched variants produce valid-looking addresses that own nothing.</li>
<li><strong>Solidity hashing.</strong> The <code>keccak256()</code> builtin is the only hash most contracts use for commitments, digests, and comparisons, because it is cheap and native.</li>
<li><strong>EIP-712 typed data.</strong> The signature scheme every modern wallet uses for human-readable signing hashes the typed structure with Keccak-256 at every level.</li>
<li><strong>On-chain Merkle proofs.</strong> Airdrops and whitelist trees are built with Keccak because the contract verifier is Solidity's <code>keccak256</code>. Your off-chain tree builder must match, including the double-hash of leaves and the <code>abi.encodePacked</code> concatenation quirks.</li>
<li><strong>CREATE2 addresses.</strong> The deterministic address formula keccaks the deployer, salt, and init code together.</li>
</ul>
<pre><code>// JavaScript — ethers v6
import { keccak256, toUtf8Bytes } from 'ethers'
keccak256(toUtf8Bytes('transfer(address,uint256)'))
// '0xa9059cbb2ab09eb219583f4a59a5d0623ade34bc954990bef74b0f6c6dece5be'

// Solidity — the same hash on-chain
bytes32 digest = keccak256(abi.encodePacked("transfer(address,uint256)"));</code></pre>

<h2>When to use SHA-256</h2>
<p>Reach for SHA-256 everywhere the <strong>ecosystem predates or ignores the EVM</strong>:</p>
<ul>
<li><strong>Integrity and checksums.</strong> File verification, software signatures, <code>sha256sum</code> — SHA-2 is the default everywhere precisely because it predates SHA-3 and has decades of unbroken deployment.</li>
<li><strong>Bitcoin.</strong> Double SHA-256 (<code>SHA256(SHA256(x))</code>) secures block headers and addresses in that order — mixing in Keccak breaks at the first verification.</li>
<li><strong>TLS and certificates.</strong> Signature algorithms in the WebPKI use SHA-256 (or SHA-384) with RSA/ECDSA.</li>
<li><strong>HMAC.</strong> <code>HMAC-SHA256</code> is the workhorse of API request signing and JWTs (HS256). HMAC's construction already neutralizes length-extension, which is the main theoretical weakness of raw SHA-256 — you get a keyed MAC with no caveats.</li>
<li><strong>Subresource Integrity and content addressing.</strong> SRI hashes in CSP headers, Docker digests, and IPFS multihashes use SHA-2 family hashes.</li>
</ul>
<pre><code>// Node — SHA-256 and HMAC, no extra dependencies
import { createHash, createHmac } from 'node:crypto'

createHash('sha256').update('payload').digest('hex')

createHmac('sha256', secret)
  .update('POST /api/transfer\n' + timestamp + '.' + body)
  .digest('base64url')   // the API-signature pattern</code></pre>

<h2>Are they equally secure?</h2>
<p>Yes, in every way that matters today. Both offer 128-bit collision resistance at 256-bit output; neither has a practical collision or preimage attack. Keccak's sponge construction has a wider security margin in some theoretical senses; SHA-256 has more cryptanalytic mileage. <strong>The choice is compatibility, not strength</strong> — pick the hash your verifier expects, and if you are the verifier, pick the one your ecosystem's tooling speaks natively.</p>
<p>One real caveat they share: both are <em>unkeyed</em> hashes, so both are length-extension vulnerable when used as <code>hash(secret ‖ message)</code>. Never authenticate that way — use HMAC with either hash.</p>

<h2>The cross-language interop table</h2>
<table>
<thead><tr><th>Language</th><th>Keccak-256 (Ethereum)</th><th>SHA-256</th></tr></thead>
<tbody>
<tr><td>JavaScript</td><td><code>ethers.keccak256()</code>, <code>js-sha3</code> keccak256</td><td><code>crypto.createHash('sha256')</code>, Web Crypto</td></tr>
<tr><td>Python</td><td><code>eth_hash</code>, <code>SafeKeccak</code>, <code>sha3.keccak_256</code> (not <code>hashlib.sha3_256</code>!)</td><td><code>hashlib.sha256()</code></td></tr>
<tr><td>Go</td><td><code>golang.org/x/crypto/sha3</code> with <code>NewLegacyKeccak256()</code></td><td><code>crypto/sha256</code></td></tr>
<tr><td>Rust</td><td><code>tiny-keccak</code> keccak256</td><td><code>sha2::Sha256</code></td></tr>
<tr><td>Solidity</td><td><code>keccak256()</code> builtin</td><td>precompile 0x02</td></tr>
</tbody>
</table>
<p>Python's <code>pysha3</code> is the classic trap: it exposed both <code>keccak_256</code> and <code>sha3_256</code>, was deprecated, and replacements shuffle the names again. If a digest starts looking right but a contract still rejects it, print the first byte of the domain separator digest — a mismatched padding shows up immediately.</p>

<h2>Decision table</h2>
<table>
<thead><tr><th>You are…</th><th>Use</th></tr></thead>
<tbody>
<tr><td>Computing a function selector or calldata</td><td>Keccak-256</td></tr>
<tr><td>Deriving an address from a public key</td><td>Keccak-256</td></tr>
<tr><td>Building Merkle proofs verified by a Solidity contract</td><td>Keccak-256 (match the contract's exact encodePacked layout)</td></tr>
<tr><td>Signing EIP-712 typed data</td><td>Keccak-256</td></tr>
<tr><td>Verifying file downloads, writing SRI, content addressing</td><td>SHA-256</td></tr>
<tr><td>Anything Bitcoin</td><td>Double SHA-256</td></tr>
<tr><td>Signing API requests or JWTs</td><td>HMAC-SHA256</td></tr>
<tr><td>General-purpose integrity outside Web3</td><td>SHA-256</td></tr>
</tbody>
</table>

<h2>Try both, right now, in your browser</h2>
<p>The fastest way to internalize the difference is to hash the same string with each. Our <a href="/tools/keccak256">Keccak-256 hasher</a> and <a href="/tools/hash-text">SHA-256 hash tool</a> run side by side — paste <code>transfer(address,uint256)</code> into both and watch the digests diverge from the first byte. Then take the Keccak digest's first four bytes to the <a href="/tools/function-selector">function selector calculator</a> — <code>a9059cbb</code>, the selector you have seen in every Etherscan transaction. Everything runs client-side, so test signatures and candidate digests never leave your machine.</p>`
  }
,
  {
    title: 'The Secure AI-Agent Stack: Zero Data Egress in Practice',
    slug: 'secure-ai-agent-stack-zero-data-egress',
    excerpt: 'Agents leak at every layer: prompts to model APIs, tool payloads to SaaS endpoints, telemetry you did not know you sent. A layer-by-layer map of where data actually leaves — and how to build a stack where egress is structurally absent, not policy-promised.',
    date: '2026-09-17',
    readTime: '11 min',
    tags: ['AI Agents', 'Security', 'MCP', 'Privacy', 'Zero Trust'],
    image: '',
    imageAlt: '',
    metaDescription: 'Where AI agent stacks actually leak data — model calls, tool execution, MCP servers, logs — and the concrete practices that make egress structurally impossible instead of policy-promised.',
    content: `
<h2>"We don't store your data" is not a security model</h2>
<p>Every AI-agent vendor makes some version of the promise. Almost none of them can survive the follow-up question: <em>what code path could send my data out if you were breached, subpoenaed, or simply buggy?</em> The honest answer for most SaaS tooling is "several" — because their architecture <em>requires</em> your payload to transit their servers to do anything useful.</p>
<p>Zero data egress, done seriously, is not a privacy policy. It is an architectural property: <strong>the absence of capability</strong>. No network client in the code, no outbound requests at install or runtime, no channel from your data to the network — so the question "will you send it?" becomes meaningless. There is nothing to send with.</p>
<p>This piece maps where agent stacks actually leak, layer by layer, and what the mitigations look like when they are structural rather than promissory.</p>

<h2>Layer 1: The model call itself</h2>
<p>The unavoidable layer. When your agent sends a prompt to a frontier-model API, that payload has left your perimeter — full stop. Everything else in this article is about minimizing what crosses this boundary, not pretending it doesn't exist.</p>
<p>Practical discipline for this layer:</p>
<ul>
<li><strong>Classify before you send.</strong> Scan prompts and context for PII, credentials, and keys before they reach the API — mechanically, not by asking users nicely. A redaction pass that strips emails, phone numbers, API keys, and token patterns turns "we hope the model vendor is fine" into "the worst case contains no identifiers."</li>
<li><strong>Know your retention terms.</strong> The differences that matter are data-retention windows, training-use flags, and where the inference region is — not the marketing word "private."</li>
<li><strong>When nothing may cross:</strong> local models exist and are getting capable. For genuinely regulated content, the only honest architecture is local inference; everything after this layer still applies.</li>
</ul>

<h2>Layer 2: Tool execution — the leak nobody budgets for</h2>
<p>Here is the pattern that dominates "AI-ready" SaaS: your agent calls a JSON-to-YAML converter hosted at some endpoint, and your Kubernetes manifest — with its inline secrets and internal hostnames — transits that vendor's server to be converted. The model call was the <em>planned</em> disclosure; the tool call was the <em>unplanned</em> one. Agentic workflows multiply this: a single task might fan out to a dozen tool endpoints, each a separate disclosure of whatever context the agent passed.</p>
<p>The structural fix has two shapes, depending on who executes:</p>
<ul>
<li><strong>Browser-side tools.</strong> If the tool is a deterministic function — format, hash, decode, convert — it can run entirely in your browser tab. No upload path exists because the code contains no network call. This is the model behind the free tools on this site: paste a JWT, and the token that would be a firing offense to submit to a web form never moves.</li>
<li><strong>Self-hosted tool servers.</strong> When an <em>AI agent</em> needs the tool (agents cannot use browser tabs), the same pure functions can run in a container you control. The decisive detail is the tool's capability declaration: a tool that declares <code>network: false, filesystem: false, secrets: false, subprocess: false</code> — and a registry that refuses to register anything claiming otherwise — has no exfiltration channel even if the tool code is fully compromised.</li>
</ul>
<p>That last clause is the difference between safety-by-review and safety-by-construction. Review says "we read the code and it looks clean." Construction says "the runtime build contains no mechanism by which a tool could reach the network, so a malicious tool would still have nowhere to send your data."</p>

<h2>Layer 3: The MCP server in the middle</h2>
<p>The Model Context Protocol is how agents reach tools, and it re-creates the Layer 2 problem one level up: a hosted MCP server means your agent's tool calls — with their payloads — transit someone else's infrastructure. The protocol is transport-neutral, which is the opportunity: <strong>MCP does not require a SaaS in the middle.</strong> A self-hosted MCP server gives agents the same tool access with connections terminating on your network.</p>
<p>What to demand of a self-hosted agent server, concretely:</p>
<ul>
<li><strong>Per-key identity and policies.</strong> Each agent gets its own key; policy files say which tools that key may call (wildcards like <code>evm.*</code> for a narrow agent, deny-by-default for everything else).</li>
<li><strong>Rate limits per key.</strong> A runaway agent loop is a data-volume problem as much as a cost problem.</li>
<li><strong>Audit that cannot itself leak.</strong> You want to know <em>what was called</em> without recording <em>what was sent</em>. Metadata-only audit logs — tool, version, duration, byte sizes — give compliance a trail while ensuring the log file is never the incident.</li>
<li><strong>A verifiable supply chain.</strong> Three pinned dependencies beat three hundred transitive ones. No <code>postinstall</code> scripts. Outbound-connection count: zero, checkable with a grep.</li>
</ul>

<h2>Layer 4: Telemetry, updates, and the quiet egress</h2>
<p>The layer that escapes audits: crash reporters, update checks, analytics beacons, and "anonymous" usage stats that ship enabled-by-default in tooling. Each is a small, legitimate-looking outbound channel that turns into a data path when the payload includes, say, the document you were editing. The structural answer is boring and absolute: <strong>zero outbound requests in the runtime, ever</strong> — no update pings, no telemetry, no registry checks. If the feature matters, make it explicit and pull-based (you run a command), not ambient.</p>
<p>You can verify this yourself on any candidate tool: run it in a network-isolated namespace or container with an egress-deny rule and watch what breaks. A tool that works perfectly with no network route out earns a different kind of trust than one that phones home to function.</p>

<h2>The evaluation checklist</h2>
<p>Next time a vendor says "your data never leaves X," ask these — the answers map exactly to the layers above:</p>
<ol>
<li>Does the payload transit your servers to execute, or is execution local to my environment?</li>
<li>May I see the tool's capability declaration — network, filesystem, secrets, subprocess — and what enforces it?</li>
<li>What appears in your logs after my agent calls a tool — full payloads or metadata?</li>
<li>What outbound connections does the runtime make on its own — telemetry, updates, anything?</li>
<li>Which dependencies run at install time, and how many are in the supply chain?</li>
<li>What happens under an egress-deny firewall rule — graceful local operation, or breakage that reveals a phone-home?</li>
</ol>
<p>"Trust us" answers to any of these are your signal to keep looking.</p>

<h2>Zero egress in practice — the honest version</h2>
<p>A stack with literally zero egress including the model call means local inference, and for many workloads that trade is now reasonable. But the practical target for most teams is sharper than perfection: <strong>classify what crosses the model boundary, and make every other layer structurally incapable of egress.</strong> Prompt-time redaction handles the first. Browser-side execution and self-hosted, pure-function tool servers handle the rest — with policies, keys, rate limits, and metadata-only audit so the residual surface is governed rather than hoped away.</p>
<p>You can try every layer of this stack hands-on: the <a href="/tools/pii-redactor">PII Redactor</a> shows what mechanical pre-send classification looks like; the browser tools on this site demonstrate pure client-side execution (open your network tab — nothing sends); and the <a href="/runtime">Formatho Runtime</a> is a working self-hosted MCP server built on the capability-by-construction model — the registry refuses tools that declare any network, filesystem, or secret access, and its audit log is metadata by construction. Verify all of it: the code is open, and every claim above is checkable with a grep.`
  }
]
