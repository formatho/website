/* eslint-disable no-useless-escape */
// Deepened content — batch 3: CMS posts that were thin but not previously
// parked (140-157 words).

export const part3 = {
  'base64-encoding-guide': `
<h2>What Base64 actually does</h2>
<p>Base64 maps every 3 bytes of input onto 4 printable characters (A–Z, a–z, 0–9, +, /), so arbitrary binary can travel through systems that only handle text — email bodies, JSON fields, data URLs, XML. It is an <strong>encoding</strong>, not encryption: there is no key, and every Base64 string is trivially decodable by anyone. It also inflates data by ~33% (plus occasional newlines), and it is not compression — encoded data is bigger than the original.</p>
<h2>How the mapping works</h2>
<p>The encoder treats input as a bit stream, re-slices it into 6-bit groups (2<sup>6</sup> = 64 values → one character each), and pads the final group with <code>=</code> when the input length isn't a multiple of three. That's why Base64 strings so often end in one or two <code>=</code> — and why a valid Base64 length is always a multiple of 4.</p>
<h2>The variants you'll meet</h2>
<table>
<thead><tr><th>Variant</th><th>Alphabet difference</th><th>Where</th></tr></thead>
<tbody>
<tr><td>Standard</td><td><code>+ /</code></td><td>MIME, most defaults</td></tr>
<tr><td>Base64URL</td><td><code>- _</code>, padding often dropped</td><td>JWTs, URLs, filenames</td></tr>
<tr><td>Base64 with newlines</td><td>76-char lines</td><td>PEM certificates/keys</td></tr>
</tbody>
</table>
<p>Mixing variants is a classic integration bug: a JWT pasted with <code>+</code> becomes a space in a URL; a PEM parsed without stripping newlines fails. When a decoder errors, check padding and the alphabet before assuming the data is corrupt.</p>
<h2>Legitimate uses — and the anti-pattern</h2>
<ul>
<li><strong>Good:</strong> embedding small images as data URLs (weigh against a separate cached file — Base64 in CSS re-downloads with every stylesheet change), passing binary payloads through JSON, email attachments.</li>
<li><strong>Bad:</strong> "hiding" API keys or secrets. Scanners decode Base64 on sight; treat anything Base64'd in source control as plaintext. Also avoid Base64-ing large assets inline — it blocks rendering and defeats HTTP caching.</li>
</ul>
<p>Decode and encode any Base64, including file support, in the <a href="/tools/base64">Base64 tools</a> — client-side only.</p>`,

  'bcrypt-password-hashing-guide': `
<h2>Why passwords need slow hashing</h2>
<p>Fast hashes like SHA-256 exist to verify data quickly — which is exactly wrong for passwords. A GPU can try billions of SHA-256 guesses per second, so when a database leaks, 8-character passwords fall in hours. bcrypt is deliberately <em>slow</em>: its cost factor (2<sup>cost</sup> rounds) lets you tune each guess to take tens of milliseconds, turning a breach from a weekend into centuries — and its built-in salt kills rainbow tables and makes identical passwords hash differently.</p>
<h2>Anatomy of a bcrypt hash</h2>
<pre><code>$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW
 │   │  └────────────┬─────────────┘└──────────┬───────────┘
 │   │        22-char salt              31-char hash
 └── algorithm  cost factor (2^12 rounds)</code></pre>
<p>Everything needed to verify is inside the string: the algorithm version (<code>2a</code>/<code>2b</code>/<code>2y</code>), the cost, the salt, and the digest. You store the whole thing; verification re-runs the same cost and compares.</p>
<h2>Using it correctly</h2>
<ul>
<li><strong>Cost factor:</strong> target ~100–250 ms per hash on your production hardware — commonly 11–13 today. Raise it as CPUs improve; the cost travels with the hash, so old hashes verify forever while new ones get stronger.</li>
<li><strong>Never pre-hash with SHA-256</strong> to "normalize" length: bcrypt truncates input at 72 bytes, and pre-hashing has caused real vulnerabilities (pass-the-hash via the SHA digest). For long passphrases, bcrypt's 72-byte limit is acceptable in practice; if not, use Argon2id instead.</li>
<li><strong>Always use a vetted library</strong> (bcryptjs in Node, bcrypt in Python) — the comparison must be constant-time, which libraries provide and hand-rolled code doesn't.</li>
<li><strong>Salt is automatic</strong> — don't add your own; generating it per-password is the library's job.</li>
</ul>
<h2>bcrypt vs the alternatives</h2>
<p>Argon2id (the Password Hashing Competition winner) adds memory-hardness, resisting GPUs even better, and is the first choice for new systems; scrypt is the middle ground; bcrypt remains a perfectly sound, battle-tested default. All three belong to the "slow, salted" family — the only family acceptable for password storage. MD5, SHA-1, and plain SHA-256 do not.</p>
<p>Generate bcrypt hashes with adjustable cost and verify round-trips locally in the <a href="/tools/bcrypt">bcrypt tool</a>.</p>`,

  'uuid-v1-vs-v4': `
<h2>Two very different 128 bits</h2>
<p>A UUIDv1 encodes the <strong>MAC address and a timestamp</strong>; a UUIDv4 is <strong>122 random bits</strong> (6 bits go to the version/variant markers). Both render as 36 characters like <code>550e8400-e29b-41d4-a716-446655440000</code> — the third group's leading digit (1 or 4) tells you which you have.</p>
<h2>Why v1 fell out of favor</h2>
<ul>
<li><strong>Privacy:</strong> v1 leaks the generating machine's MAC address — which is why modern implementations randomize it, which removes v1's only ordering guarantee.</li>
<li><strong>Collisions across nodes:</strong> v1 uniqueness depends on correct clock discipline and unique MACs; virtualized fleets have violated both.</li>
<li><strong>Index behavior:</strong> timestamp-prefixed v1s insert sequentially into B-trees (the good part), but with the privacy fixes they're no better than v4 — and if you want orderability, ULIDs or UUIDv7 do it explicitly.</li>
</ul>
<h2>Why v4 is the default</h2>
<p>Random v4 needs no coordination: any node generates IDs that are unique with overwhelming probability. Collision math: after generating a <em>billion</em> v4s, the chance any two match is ~10<sup>-18</sup> — you should worry about almost anything else first. The trade-off: random IDs scatter across B-tree indexes, which matters at very large scale (that's what v7/ULID solve).</p>
<h2>Neither is a security token</h2>
<p>A UUID is an <em>identifier</em>, not a capability. v4's 122 random bits resist guessing, but v1 is predictable (timestamp + MAC), and neither was designed as an access token. For password resets, session IDs, or "unguessable links," use a CSPRNG with ≥ 128 bits (crypto.randomUUID or random bytes hex) and treat secrecy as a design requirement, not a UUID property.</p>
<h2>Practical guidance</h2>
<table>
<thead><tr><th>Need</th><th>Reach for</th></tr></thead>
<tbody>
<tr><td>General-purpose ID, no ordering</td><td>UUIDv4</td></tr>
<tr><td>Sortable, time-ordered IDs in DBs</td><td>UUIDv7 or ULID</td></tr>
<tr><td>Deterministic ID from a name</td><td>UUIDv3/v5 (namespace hash)</td></tr>
<tr><td>Secret token</td><td>crypto random 32+ bytes, not a UUID</td></tr>
</tbody>
</table>
<p>Generate v4s (and other versions) in bulk, client-side, in the <a href="/tools/uuid">UUID Generator</a>.</p>`
}
