/* eslint-disable no-useless-escape */
// Deepened content for thin blog posts — batch 2 of 2 (10 posts).

export const part2 = {
  'sql-formatting-best-practices': `
<h2>Why formatting matters in SQL specifically</h2>
<p>SQL is read far more often than it's written, and query shape affects semantics in ways whitespace doesn't hint at — an indented JOIN that's actually a Cartesian product, a WHERE clause that binds to the wrong alias. Consistent formatting makes review catch real bugs instead of style debates.</p>
<h2>Conventions that survive any dialect</h2>
<ul>
<li><strong>Keywords uppercase</strong> (<code>SELECT</code>, <code>WHERE</code>), identifiers lowercase_snake — the visual grammar separates structure from data.</li>
<li><strong>One column per line</strong> in SELECTs over three columns: diffs, comments, and blame all become line-accurate.</li>
<li><strong>Leading commas</strong> (or always trailing — pick one): leading commas make errors land on the broken line, not the previous one.</li>
<li><strong>JOIN on its own line with its ON directly beneath</strong>, indented under the FROM table it extends. Nested subqueries get one indent level each.</li>
<li><strong>CTEs over deep nesting</strong> — a three-level nested SELECT becomes three named WITH clauses that read top to bottom.</li>
</ul>
<h2>A before/after</h2>
<pre><code>-- before
select u.id, u.name, o.total from users u join orders o on o.user_id=u.id where o.status='paid' and o.total&gt;100 order by o.total desc;

-- after
SELECT
    u.id
  , u.name
  , o.total
FROM users AS u
JOIN orders AS o
    ON o.user_id = u.id
WHERE o.status = 'paid'
  AND o.total &gt; 100
ORDER BY
    o.total DESC;</code></pre>
<p>The second version reviews itself: the join condition is visible, the AND grouping is explicit, and adding a column is a one-line diff.</p>
<h2>Things formatting can't fix</h2>
<ul>
<li><strong>SELECT *</strong> in production code — breaks on schema change and blocks index-only scans' column pruning. Name what you need.</li>
<li><strong>Implicit cross joins</strong> — comma-JOINs with a WHERE-based condition. Formatting to explicit JOIN/ON surfaces the mistake.</li>
<li><strong>OR conditions across joins</strong> that prevent index use — sometimes UNION of two queries beats one OR query.</li>
</ul>
<p>Dialect notes matter: Postgres wants <code>AS</code> on column aliases before FROM; MySQL treats unquoted aliases case-insensitively; T-SQL uses <code>TOP</code> not <code>LIMIT</code>. Format, then convert dialects, in the <a href="/tools/sql">SQL Formatter</a> and <a href="/tools/sql-dialect-converter">SQL Dialect Converter</a>.</p>`,

  'http-status-codes-guide': `
<h2>The five classes</h2>
<p>Status codes answer one question: <em>who is at fault and what should the client do next?</em> 1xx = in progress, 2xx = success, 3xx = go elsewhere, 4xx = client's fault, 5xx = server's fault. Restful APIs and crawlers both depend on you answering honestly.</p>
<h2>The codes that matter daily</h2>
<table>
<thead><tr><th>Code</th><th>Meaning</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>200</td><td>OK</td><td>GET/PUT/PATCH success</td></tr>
<tr><td>201</td><td>Created</td><td>include a Location header</td></tr>
<tr><td>204</td><td>No content</td><td>DELETE success; must have empty body</td></tr>
<tr><td>301 / 308</td><td>Moved permanently</td><td>308 preserves method; 301 may re-POST as GET</td></tr>
<tr><td>302 / 307</td><td>Moved temporarily</td><td>use for flows that will revert</td></tr>
<tr><td>304</td><td>Not modified</td><td>with ETag/If-None-Match; saves the full transfer</td></tr>
<tr><td>400 / 422</td><td>Bad request / unprocessable</td><td>400 = malformed; 422 = well-formed but invalid</td></tr>
<tr><td>401 / 403</td><td>Unauthenticated / unauthorized</td><td>401 = log in; 403 = logged in, still denied</td></tr>
<tr><td>404</td><td>Not found</td><td>also the honest answer for "exists but none of your business" — 403 leaks existence</td></tr>
<tr><td>409</td><td>Conflict</td><td>concurrent update / duplicate key</td></tr>
<tr><td>429</td><td>Too many requests</td><td>send Retry-After</td></tr>
<tr><td>500 / 502 / 503 / 504</td><td>Server errors</td><td>bug / bad gateway / overloaded / timeout</td></tr>
</tbody>
</table>
<h2>Where APIs go wrong</h2>
<ul>
<li><strong>Everything is 200</strong> with <code>{"error": ...}</code> in the body — breaks retry logic, monitoring, and every HTTP client's assumptions.</li>
<li><strong>500 for validation errors</strong> — a client-fixable problem paging an on-call engineer.</li>
<li><strong>Redirect chains</strong> — 301 then 302 then 301: each hop costs a round trip; consolidate, and never redirect POST without 307/308.</li>
</ul>
<h2>SEO angles</h2>
<p>Google treats 4xx/5xx honestly: a 404 drops the URL from index (fine for removed pages), but a soft-404 — a "200 OK" page saying "not found" — wastes crawl budget and confuses signals. 301 passes equity; 302 tells Google the target is temporary. 503 with Retry-After is the correct "down for maintenance" signal; repeated 500s deindex content.</p>
<p>Look up any code with response-class explanations in the <a href="/tools/http-status-codes">HTTP Status Codes reference</a>.</p>`,

  'cryptographic-hashes-guide': `
<h2>What a hash is</h2>
<p>A cryptographic hash maps any input to a fixed-size fingerprint (SHA-256: 32 bytes) with three properties: the same input always yields the same digest; the tiniest input change flips about half the output bits (avalanche); and it's infeasible to reverse or to find two inputs with the same digest (collision resistance). Hashing is one-way — unlike encryption, there is no key and no decryption.</p>
<h2>Choose by threat model</h2>
<table>
<thead><tr><th>Algorithm</th><th>Status</th><th>Use for</th></tr></thead>
<tbody>
<tr><td>MD5</td><td>Broken</td><td>checksums for corruption only — never security</td></tr>
<tr><td>SHA-1</td><td>Broken (collisions demonstrated)</td><td>legacy compat only</td></tr>
<tr><td>SHA-256 / SHA-512</td><td>Secure</td><td>integrity, signatures, digests</td></tr>
<tr><td>SHA-3</td><td>Secure</td><td>alternative construction, different internals</td></tr>
<tr><td>HMAC-SHA256</td><td>Secure</td><td><em>keyed</em> integrity: proves the sender holds the key</td></tr>
<tr><td>bcrypt / Argon2id</td><td>Slow by design</td><td>password storage — the only right answer there</td></tr>
</tbody>
</table>
<h2>Hashing passwords: the special case</h2>
<p>Fast hashes are wrong for passwords: a GPU tries billions of SHA-256 guesses per second, so any 8-character password falls in hours. Password hashing must be deliberately slow and memory-hard — bcrypt (cost factor) or Argon2id (memory + time + parallelism parameters), with a unique salt per user so identical passwords hash differently and precomputed rainbow tables are useless. Never store passwords with MD5/SHA-anything, and never "pepper" instead of salting.</p>
<h2>Verifying downloads and more</h2>
<p>The everyday use: a site publishes <code>sha256sum installer.bin</code>; you run the same command locally and compare digests — any mismatch means corruption or tampering. Same mechanism powers content addressing (git objects, container layer digests, Subresource Integrity in CSP headers) and deduplication.</p>
<h2>Common mistakes</h2>
<ul>
<li>Comparing digests with non-constant-time equality in security contexts — use a constant-time compare.</li>
<li>Concatenating fields before hashing without a separator: <code>hash("ab" + "c") == hash("a" + "bc")</code> — length-prefix or delimiter.</li>
<li>Trusting a hash from the same channel as the file — the checksum must arrive via a separate, authenticated path.</li>
</ul>
<p>Compute SHA-256/SHA-3/MD5 digests of any text or file in the <a href="/tools/hash-text">Hash</a> tool — client-side, nothing uploaded.</p>`,

  'crontab-guide': `
<h2>Five fields, one command</h2>
<pre><code># ┌─ minute (0–59)
# │ ┌─ hour (0–23)
# │ │ ┌─ day of month (1–31)
# │ │ │ ┌─ month (1–12)
# │ │ │ │ ┌─ day of week (0–7, 0 and 7 = Sunday)
# * * * * *  command-to-run</code></pre>
<p>Each field accepts a number, <code>*</code> (any), ranges (<code>9-17</code>), steps (<code>*/15</code>, <code>0-30/10</code>), and lists (<code>1,15</code>). All fields must match for the job to fire.</p>
<h2>Recipes you'll actually use</h2>
<table>
<thead><tr><th>Expression</th><th>Runs</th></tr></thead>
<tbody>
<tr><td><code>*/5 * * * *</code></td><td>every 5 minutes</td></tr>
<tr><td><code>0 * * * *</code></td><td>top of every hour</td></tr>
<tr><td><code>30 3 * * *</code></td><td>daily 03:30</td></tr>
<tr><td><code>0 9 * * 1-5</code></td><td>weekdays at 09:00</td></tr>
<tr><td><code>0 0 1 * *</code></td><td>first of the month, midnight</td></tr>
<tr><td><code>0 0 * * 0</code></td><td>Sundays at midnight</td></tr>
<tr><td><code>@reboot</code></td><td>once, at startup</td></tr>
</tbody>
</table>
<p>The @-shorthands replace all five fields: <code>@daily</code>, <code>@hourly</code>, <code>@weekly</code>, <code>@monthly</code>, <code>@yearly</code>, <code>@reboot</code>.</p>
<h2>The traps</h2>
<ul>
<li><strong>Timezone:</strong> system cron uses server time (usually UTC in containers). Modern cronies support <code>CRON_TZ=Europe/Berlin</code>; otherwise convert by hand. DST transitions double-fire or skip jobs scheduled in the 02:00–03:00 hour.</li>
<li><strong>Environment:</strong> cron runs with almost no env — your <code>~/.bashrc</code> PATH is absent. Use absolute paths (<code>/usr/local/bin/node</code>) and <code>set -e</code>.</li>
<li><strong>Silence is failure hiding:</strong> redirect output (<code>&gt;&gt; /var/log/job.log 2&gt;&amp;1</code>) or use a dead-man's-switch (healthchecks.io pattern) — a job that quietly stopped is the classic 2am discovery.</li>
<li><strong>Overlapping runs:</strong> a slow job started every minute will stack copies. Wrap with <code>flock -n /tmp/job.lock</code>.</li>
<li><strong>Seconds:</strong> cron has no seconds field; two jobs per minute need systemd timers or a wrapper sleep.</li>
</ul>
<p>Build and validate expressions with a plain-English preview in the <a href="/tools/crontab-generator">Crontab Generator</a>.</p>`,

  'password-security-guide': `
<h2>Length beats complexity</h2>
<p>Password strength is entropy: bits of real randomness. A 8-character password using all character classes carries ~52 bits at best — offline-crackable. Four random common words (the diceware pattern) carry ~51 bits <em>and are memorable</em>. The modern guidance (NIST 800-63B) follows directly: <strong>length over composition rules, no forced rotation, screen against breached lists.</strong> Complexity rules like "must contain a symbol" push users to <code>Summer2024!</code> → <code>Winter2024!</code> patterns that crackers model first.</p>
<h2>What actually protects accounts</h2>
<ul>
<li><strong>Unique password per site</strong> — credential-stuffing (replaying one breach everywhere) only works on reuse. A password manager makes uniqueness free.</li>
<li><strong>Multi-factor authentication</strong> — an app-based TOTP or hardware key removes the password's single point of failure. SMS codes are the weakest tier (SIM-swap).</li>
<li><strong>Passkeys where offered</strong> — phishing-resistant by construction; there is no secret to type on the wrong site.</li>
</ul>
<h2>How services must store passwords</h2>
<p>Not encrypted — <em>slowly hashed</em>: bcrypt or Argon2id with per-user salts, tuned so one guess takes tens of milliseconds. MD5/SHA-256 storage means a breach equals plaintext. If a service emails you your current password, they failed this test.</p>
<h2>Testing strength honestly</h2>
<p>A good meter measures entropy (length × randomness), not rule checkboxes. The caveat: never paste a real, in-use password into any web page — including meters. Test with a <em>similar-shaped</em> password instead, or use a local/offline tool. Entropy math is public: ~log2(charset<sup>length</sup>) for random strings, far less for dictionary+pattern passwords.</p>
<h2>Key hygiene for developers</h2>
<ul>
<li>API keys and DB passwords are passwords: long random (32+ bytes), one per environment, rotated on exposure, stored in a secrets manager — never in git (even Base64'd; scanners decode).</li>
<li>Rate-limit and add progressive delays on login endpoints; lockout isn't the only tool.</li>
</ul>
<p>Check the entropy model and get generation guidance in the <a href="/tools/password-strength-analyser">Password Strength</a> analyzer — it runs entirely in your browser.</p>`,

  'regex-practical-guide': `
<h2>Think in building blocks</h2>
<p>Regular expressions compose from a small vocabulary: literals (<code>abc</code>), character classes (<code>[a-z]</code>, <code>\d</code>, <code>\w</code>, <code>\s</code> and their negations), quantifiers (<code>*</code> 0+, <code>+</code> 1+, <code>?</code> 0–1, <code>{2,5}</code>), alternation (<code>a|b</code>), groups (<code>(…)</code>), anchors (<code>^ $ \b</code>). Every regex you'll ever need is these blocks arranged to describe the <em>shape</em> of what you're matching.</p>
<h2>Recipes worth memorizing</h2>
<pre><code># ISO date, with groups
(\d{4})-(\d{2})-(\d{2})

# hex color (case-insensitive, optional #)
#?([0-9a-f]{3}|[0-9a-f]{6})\b

# key=value pairs in a config line
^(\w+)\s*=\s*(.*)$

# a URL-safe slug
^[a-z0-9]+(?:-[a-z0-9]+)*$

# whole-word match (avoid cat matching category)
\bcat\b

# negative lookahead: lines not starting with #
^(?!#).+$</code></pre>
<h2>The four classic mistakes</h2>
<ul>
<li><strong>Greedy by default:</strong> <code>&lt;.*&gt;</code> on <code>&lt;a&gt;x&lt;/a&gt;</code> matches the whole string. Use lazy <code>.*?</code> or a negated class <code>&lt;[^&gt;]*&gt;</code>.</li>
<li><strong>Catastrophic backtracking:</strong> nested quantifiers like <code>(a+)+$</code> against a near-miss string take exponential time — the classic ReDoS vector. Un-nest, or use atomic groups/possessive quantifiers where supported.</li>
<li><strong>Unanchored surprises:</strong> without <code>^…$</code>, the regex matches anywhere — <code>\d{4}</code> finds "2048" inside "12048". Anchor, or use <code>\b</code>.</li>
<li><strong>Dot matches almost nothing:</strong> <code>.</code> excludes newlines unless you enable dot-all (<code>s</code> flag). Parse HTML with a parser, not regex; parse JSON with a JSON parser. Regex is for text shapes, not structure.</li>
</ul>
<h2>A testing discipline</h2>
<p>Write your test set first: strings that must match, must-not-match, and near-misses (extra character, wrong case, empty). Iterate against the set, then keep the tests. When a regex survives ten near-misses, it deserves to ship. Named groups (<code>(?&lt;year&gt;\d{4})</code>) make the final expression self-documenting.</p>
<p>Build and test against live matches with highlight and capture groups in the <a href="/tools/regex-tester">Regex Tester</a>.</p>`,

  'jwt-tokens-complete-guide': `
<h2>Three parts, two dots</h2>
<p>A JWT is <code>header.payload.signature</code>, each part Base64URL-encoded:</p>
<ul>
<li><strong>Header</strong> — <code>{"alg":"HS256","typ":"JWT"}</code>: which algorithm signed it.</li>
<li><strong>Payload</strong> — claims: <code>sub</code> (subject), <code>exp</code>/<code>iat</code>/nbf (expiry/issued-at/not-before), <code>iss</code>/<code>aud</code> (issuer/audience), plus custom claims. <strong>Base64URL is encoding, not encryption — anyone can read the payload. Never put secrets in a JWT.</strong></li>
<li><strong>Signature</strong> — HS256: HMAC of the first two parts with a shared secret. RS256/ES256: signed with the issuer's private key; verifiable by anyone with the public key.</li>
</ul>
<h2>What the signature does and doesn't do</h2>
<p>The signature guarantees <em>integrity and authenticity</em> — the claims are exactly what the issuer wrote. It does <em>not</em> guarantee confidentiality, revocation, or freshness beyond <code>exp</code>. A stolen but unexpired token works until it expires; keep lifetimes short (minutes) and use refresh tokens with rotation for sessions.</p>
<h2>Verification checklist</h2>
<ol>
<li>Split into three parts; decode header and payload.</li>
<li><strong>Pin the expected algorithm</strong> — verify <code>alg</code> is one you chose. The classic attack (alg=none / HS-vs-RS confusion) only works on verifiers that trust the header.</li>
<li>Verify the signature with the right key (shared secret for HS*, issuer's public key for RS*/ES*).</li>
<li>Check <code>exp</code> and <code>nbf</code> (in seconds), <code>iss</code> and <code>aud</code> match your expectations.</li>
<li>Only then trust the claims.</li>
</ol>
<h2>Pitfalls seen in production</h2>
<ul>
<li><strong>Leaking tokens in URLs</strong> — they land in logs, Referers, and history. Authorization headers only.</li>
<li><strong>Storing long-lived JWTs in localStorage</strong> — any XSS reads them. Prefer httpOnly cookies with CSRF protection, or short in-memory tokens.</li>
<li><strong>Ignoring <code>exp</code> on the client</strong> — "the API will 401 eventually" produces confusing failures; check expiry up front.</li>
<li><strong>Confusing JWT and JWS/JWE</strong> — a signed JWT (JWS) is tamper-evident, not secret; an encrypted token (JWE) is a different object entirely.</li>
</ul>
<p>Decode any token, inspect claims, and check expiry locally (nothing is transmitted) in the <a href="/tools/jwt">JWT Debugger</a>.</p>`,

  'qr-codes-explained': `
<h2>Anatomy of a QR code</h2>
<p>A QR code is a matrix of modules: three large finder patterns (the corners that let a scanner locate and orient the code), timing patterns alternating along the edges, alignment patterns (size-dependent), format and version information, and the data region — your content plus Reed–Solomon error-correction codewords. Everything is placed with a defined mask pattern to break up large light/dark regions that confuse scanners.</p>
<h2>Version = size = capacity</h2>
<p>Versions 1–40 run from 21×21 to 177×177 modules. Capacity depends on version, error-correction level, and mode (numeric is densest, then alphanumeric, then byte/kanji): version 1-L holds 17 bytes of byte data; a 25-L holds 1,273; 40-L tops out around 2,953. The encoder picks the smallest version that fits — which is why shorter content scans more reliably.</p>
<h2>Error correction: your margin of damage</h2>
<table>
<thead><tr><th>Level</th><th>Recovery</th><th>Cost</th></tr></thead>
<tbody>
<tr><td>L</td><td>~7%</td><td>max data</td></tr>
<tr><td>M</td><td>~15%</td><td>—</td></tr>
<tr><td>Q</td><td>~25%</td><td>—</td></tr>
<tr><td>H</td><td>~30%</td><td>min data</td></tr>
</tbody>
</table>
<p>Level H is why a logo can sit in the middle of a code and it still scans. But error correction is not a license for bad design: it rescues damage, not low contrast.</p>
<h2>Scannability rules</h2>
<ul>
<li><strong>Contrast and polarity:</strong> dark modules on light background. Inverted codes fail many scanners.</li>
<li><strong>Quiet zone:</strong> keep a four-module white border; codes printed to the edge get cropped by the camera's framing.</li>
<li><strong>Size = distance ÷ 10:</strong> a code scanned from 1 m needs ≥ 10 cm wide; phone-screen codes can be 2 cm.</li>
<li><strong>Shorten the URL</strong> before encoding: fewer characters = lower version = larger modules = faster scans. A tracking-laden URL can push a code two versions up.</li>
<li><strong>Test on two phones in bad light</strong> before printing 500 flyers.</li>
</ul>
<h2>WiFi and vCard QR codes</h2>
<p>WiFi codes embed <code>WIFI:T:WPA;S:network;P:password;;</code> — phones join without typing. vCard codes carry contact records for business cards. Both are static: the data lives in the code itself, so a printed WiFi QR with a rotated password needs reprinting, not editing.</p>
<p>Generate QR codes for URLs, text, WiFi, and vCards with adjustable size and error correction in the <a href="/tools/qr-code-generator">QR Code Generator</a>.</p>`,

  'ulids-vs-uuids': `
<h2>Same job, different shape</h2>
<p>Both are 128-bit identifiers with negligible collision risk. The difference is <em>structure</em>: UUIDv4 is 122 random bits; a ULID is 48 bits of millisecond timestamp + 80 random bits, encoded as 26 uppercase alphanumeric characters (Crockford base32). That timestamp changes everything about how each behaves in a database.</p>
<h2>The index locality problem</h2>
<p>Random UUIDs inserted into a B-tree index land at random leaf positions: every insert touches a random page, pages split unevenly, the cache hit rate drops, and on very large tables the index fragments. ULIDs are time-ordered, so inserts append to the right edge of the index — sequential-ish writes, better cache behavior, and naturally sorted by creation time. This is why event stores, log aggregators, and DynamoDB-style systems (KSUIDs, Snowflake IDs — same idea) use time-ordered IDs.</p>
<h2>Trade-offs</h2>
<table>
<thead><tr><th></th><th>UUIDv4</th><th>ULID</th></tr></thead>
<tbody>
<tr><td>Sortability</td><td>meaningless order</td><td>creation order</td></tr>
<tr><td>Index behavior</td><td>random writes</td><td>append-mostly</td></tr>
<tr><td>Unpredictability</td><td>opaque</td><td>embeds creation time</td></tr>
<tr><td>Length (text)</td><td>36 chars</td><td>26 chars</td></tr>
<tr><td>Case/format</td><td>hex + dashes</td><td>Crockford base32, canonically uppercase</td></tr>
<tr><td>Standardization</td><td>RFC 4122 everywhere</td><td>community spec, many impls</td></tr>
</tbody>
</table>
<h2>When the timestamp leaks</h2>
<p>ULIDs expose creation time — fine for a comment ID, questionable for an order ID when volume is business-sensitive (competitors can estimate your throughput from IDs), and outright wrong for capability URLs or reset tokens, which must be unguessable. The random portion is 80 bits — enough for collision resistance at normal scale, but not for unguessability against a targeted guesser; use random UUIDs or longer tokens there.</p>
<h2>Monotonicity within a millisecond</h2>
<p>Two ULIDs generated in the same millisecond must increment their random part to stay ordered — implementations differ (some offer a monotonic factory), so concurrent generators on one host need a coordination choice. Also note the 48-bit timestamp overflows in 10889 AD — someone else's problem.</p>
<p>Generate and compare both formats locally in the <a href="/tools/ulid-generator">ULID Generator</a> and <a href="/tools/uuid">UUID Generator</a>.</p>`
}
