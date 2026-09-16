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
]
