/* eslint-disable no-useless-escape */
// Deepened content for thin blog posts — batch 1 of 2 (10 posts).
// HTML bodies matching the CMS content field format.

export const part1 = {
  'case-conversion-guide': `
<h2>Why naming conventions exist</h2>
<p>Every language ecosystem settled on a different default casing: <strong>camelCase</strong> in JavaScript and Java, <strong>snake_case</strong> in Python and Ruby, <strong>kebab-case</strong> in CSS classes and URLs, and <strong>PascalCase</strong> for C# types and React components. When data crosses a boundary — a JSON API consumed by a Python service, a database column rendered in a React form — you convert between these conventions constantly. Getting it wrong doesn't just look sloppy: two fields that differ only by casing can collide in case-insensitive contexts, silently overwriting each other.</p>
<h2>The four conventions at a glance</h2>
<table>
<thead><tr><th>Style</th><th>Example</th><th>Typical home</th></tr></thead>
<tbody>
<tr><td>camelCase</td><td><code>userName</code></td><td>JavaScript, Java, Swift</td></tr>
<tr><td>PascalCase</td><td><code>UserName</code></td><td>C#, TypeScript types, React components</td></tr>
<tr><td>snake_case</td><td><code>user_name</code></td><td>Python, Ruby, SQL columns, env vars</td></tr>
<tr><td>kebab-case</td><td><code>user-name</code></td><td>CSS, URLs, file names, HTML attributes</td></tr>
</tbody>
</table>
<h2>The hard part: acronyms and digit boundaries</h2>
<p>Mechanical conversion breaks on boundaries a human sees instantly. <code>parseHTTPResponse</code> should become <code>parse_http_response</code> — not <code>parse_httpresponse</code> or <code>parse_h_t_t_p_response</code>. The three ambiguous cases are:</p>
<ul>
<li><strong>Acronyms:</strong> <code>userID</code> → <code>user_id</code> (the <code>ID</code> is one word, not <code>i_d</code>)</li>
<li><strong>Digits:</strong> <code>oauth2Token</code> → <code>oauth2_token</code>, and <code>sha256Hash</code> → <code>sha256_hash</code></li>
<li><strong>Sequential capitals:</strong> <code>getHTTP2Client</code> requires treating <code>HTTP2</code> as a unit before splitting</li>
</ul>
<p>A correct converter tokenises the input into words first — using upper-to-lower transitions as boundaries, keeping runs of capitals together — and only then re-joins with the target separator. Naive character-by-character splitting produces the wrong answer on every acronym.</p>
<h2>Collisions and information loss</h2>
<p>Note that conversion is not always reversible: <code>already_http_response</code> and <code>alreadyHTTPResponse</code> both map to <code>already_http_response</code>, and <code>XMLParser</code> vs <code>XmlParser</code> become identical in snake_case. If you're generating identifiers (database columns, API fields), run the conversion once, store the result, and never re-convert.</p>
<h2>Practical workflow</h2>
<p>Paste your identifiers into the <a href="/tools/case-converter">Case Converter</a> — it handles acronyms and digit boundaries correctly, shows all target styles at once, and processes whole lists (one identifier per line) for API-payload and schema migrations. Everything runs client-side, so propietary field names never leave your machine.</p>`,

  'docker-run-to-compose': `
<h2>Why the translation matters</h2>
<p>Ad-hoc <code>docker run</code> commands grow into unmaintainable one-liners: five flags become fifteen, and nobody remembers why <code>--shm-size</code> was set. Docker Compose files are the answer, but translating flags by hand is error-prone — the naming doesn't map one-to-one. This guide is the mapping.</p>
<h2>Flag-to-YAML translation table</h2>
<table>
<thead><tr><th>docker run flag</th><th>compose.yaml</th></tr></thead>
<tbody>
<tr><td><code>--name myapp</code></td><td><code>container_name: myapp</code></td></tr>
<tr><td><code>-p 8080:80</code></td><td><code>ports: ["8080:80"]</code></td></tr>
<tr><td><code>-v /data:/var/lib/app</code></td><td><code>volumes: ["/data:/var/lib/app"]</code></td></tr>
<tr><td><code>-e KEY=value</code></td><td><code>environment: [KEY=value]</code> or a map</td></tr>
<tr><td><code>--env-file .env</code></td><td><code>env_file: .env</code></td></tr>
<tr><td><code>--restart unless-stopped</code></td><td><code>restart: unless-stopped</code></td></tr>
<tr><td><code>-d</code></td><td>(default — compose detaches)</td></tr>
<tr><td><code>--network host</code></td><td><code>network_mode: host</code></td></tr>
<tr><td><code>--link redis</code></td><td>service name + <code>depends_on</code></td></tr>
<tr><td><code>-m 512m --cpus 1.5</code></td><td><code>deploy.resources.limits</code> or <code>mem_limit</code>/<code>cpus</code></td></tr>
<tr><td><code>-u 1000:1000</code></td><td><code>user: "1000:1000"</code></td></tr>
</tbody>
</table>
<h2>A worked example</h2>
<p>This run command:</p>
<pre><code>docker run -d --name gateway -p 80:8080 -e LOG_LEVEL=info \\
  -v ./config:/etc/gateway --restart unless-stopped \\
  --link redis myrepo/gateway:2.4</code></pre>
<p>becomes:</p>
<pre><code>services:
  gateway:
    image: myrepo/gateway:2.4
    container_name: gateway
    ports: ["80:8080"]
    environment:
      LOG_LEVEL: info
    volumes:
      - ./config:/etc/gateway
    restart: unless-stopped
    depends_on:
      - redis
  redis:
    image: redis:7</code></pre>
<h2>Common mistakes</h2>
<ul>
<li><strong><code>--link</code> is deprecated.</strong> In Compose, services on the same network reach each other by service name — no links needed.</li>
<li><strong>Volume paths are relative to the compose file</strong>, not your shell's working directory.</li>
<li><strong>Quoting:</strong> <code>ports: ["8080:80"]</code> must be quoted or YAML parses it as a base-60 sexagesimal number.</li>
<li><strong>Healthchecks:</strong> the <code>--health-cmd</code> flag maps to a <code>healthcheck:</code> block, and <code>depends_on</code> should use <code>condition: service_healthy</code> to wait for readiness.</li>
</ul>
<p>Paste any <code>docker run</code> command into the <a href="/tools/docker-run-to-compose">Docker to Compose converter</a> to get a ready-to-use <code>compose.yaml</code> — conversion is entirely client-side.</p>`,

  'git-commands-cheat-sheet': `
<h2>The everyday loop</h2>
<p>Ninety percent of Git work is five commands: <code>status</code> to see where you are, <code>add</code> to stage, <code>commit</code> to record, <code>pull --rebase</code> to sync, and <code>push</code> to publish. The other ten percent — the part this guide covers — is recovering from mistakes and understanding what's actually staged.</p>
<h2>Staging precisely</h2>
<ul>
<li><code>git add -p</code> — stage <strong>hunks interactively</strong>; split one file's changes into multiple commits</li>
<li><code>git restore --staged file</code> — unstage without touching the working tree</li>
<li><code>git restore file</code> — discard uncommitted changes in one file (destructive)</li>
<li><code>git stash -u</code> — stash including untracked files; <code>git stash pop</code> to restore</li>
</ul>
<h2>Undoing safely</h2>
<p>The key question before any undo: <em>have you pushed?</em> If yes, prefer <code>git revert &lt;sha&gt;</code> — it creates a new commit that inverses the old one, keeping history honest for everyone. If the mistake is still local, you can rewrite:</p>
<ul>
<li><code>git commit --amend</code> — fix the last commit's message or contents</li>
<li><code>git reset --soft HEAD~1</code> — undo last commit, keep changes staged</li>
<li><code>git reset --hard HEAD~1</code> — undo last commit and <strong>delete the changes</strong></li>
<li><code>git reflog</code> — every HEAD movement for 90 days; the way back from "disasters"</li>
</ul>
<h2>Branching and inspection</h2>
<ul>
<li><code>git switch -c feature/x</code> — create and switch (the modern <code>checkout -b</code>)</li>
<li><code>git log --oneline --graph --all</code> — the shape of history</li>
<li><code>git diff main...HEAD</code> — your branch vs where it forked</li>
<li><code>git blame -L 20,30 file</code> — who last touched those lines and in which commit</li>
<li><code>git bisect start</code> — binary-search history for the commit that introduced a bug</li>
</ul>
<h2>Two habits worth building</h2>
<p><strong>Commit messages in the imperative:</strong> "add retry loop", not "added retry loop" — the convention that makes <code>git rebase</code> auto-squash messages read correctly. <strong>Never rewrite public history:</strong> <code>push --force</code> on a shared branch destroys teammates' work; if you must, use <code>--force-with-lease</code>, which refuses when someone pushed before you.</p>
<p>Keep the full searchable reference open in the <a href="/tools/git-memo">Git Cheat Sheet</a> — it runs entirely in your browser.</p>`,

  'markdown-tips-tricks': `
<h2>Beyond bold and italic</h2>
<p>Most people write Markdown daily and still miss the features that make GFM (GitHub Flavored Markdown) genuinely powerful. These are the ones that change how you work.</p>
<h2>Tables</h2>
<pre><code>| Header | Right-aligned |
|--------|--------------:|
| cell   |         value |</code></pre>
<p>Colons in the separator row set alignment. Cells can't span columns or rows — when you need that, you need HTML.</p>
<h2>Task lists and strikethrough</h2>
<pre><code>- [x] shipped
- [ ] pending
~~deprecated~~ renders struck through</code></pre>
<p>Task lists render as real checkboxes on GitHub and in most renderers, making them the quickest status tracker that survives any tool migration.</p>
<h2>Code blocks with language</h2>
<p>Always tag fences: <code>\`\`\`python</code> buys you syntax highlighting, and — more importantly — lets tooling (like linters and docs generators) process the block. Use <code>~~~</code> fences or more backticks (<code>\`\`\`\`</code>) when the code itself contains triple backticks.</p>
<h2>The escaping traps</h2>
<ul>
<li><strong>Underscores inside words</strong> (<code>snake_case_names</code>) are usually left alone by GFM, but <code>*glob*</code> and <code>_private</code> at word boundaries become emphasis — escape with backslash when you mean it literally.</li>
<li><strong>Indentation is syntax.</strong> Four spaces after a list item makes a nested list; four spaces on a fresh paragraph makes a code block. Mixed tabs and spaces produce "code block" surprises.</li>
<li><strong>Line breaks:</strong> a single newline joins into one paragraph. End a line with two spaces, or use a backslash, for a hard break.</li>
<li><strong>HTML passes through</strong> — <code>&lt;div&gt;</code> blocks are copied to output verbatim, and Markdown inside block-level HTML often isn't processed. Inline HTML inside a paragraph works fine.</li>
</ul>
<h2>Links and images</h2>
<p>Reference-style links keep paragraphs readable: <code>[docs][1]</code> with <code>[1]: https://…</code> defined anywhere in the file. Images are links with a bang: <code>![alt](src "title")</code>.</p>
<p>Practice all of this live with syntax highlighting and export in the <a href="/tools/markdown">Markdown Editor</a> — preview, HTML, and Word export, all client-side.</p>`,

  'color-formats-guide': `
<h2>Three notations, one color space</h2>
<p>HEX, RGB, and HSL all describe sRGB colors — they're different notations, not different gamuts. <code>#3B82F6</code>, <code>rgb(59, 130, 246)</code>, and <code>hsl(217, 91%, 60%)</code> are the same blue. Choosing between them is about readability and which axis you need to manipulate.</p>
<h2>When each format wins</h2>
<ul>
<li><strong>HEX</strong> — the compact default of design systems and CSS. Supports 4- and 8-digit forms with alpha (<code>#3B82F680</code>).</li>
<li><strong>RGB</strong> — when you're computing colors (mixing, overlays, canvas pixels); channels map directly to bytes.</li>
<li><strong>HSL</strong> — when you're <em>designing</em>: make a color lighter (<code>lightness +10%</code>) or build a palette by rotating <code>hue</code> while holding saturation. Humans reason about hue/lightness, not red/green/blue byte values.</li>
</ul>
<h2>The conversion math</h2>
<p>HEX→RGB: each pair of digits is a base-16 byte (<code>3B</code> = 59). RGB→HSL: find max/min of R,G,B (normalized 0–1); lightness is their average, saturation is their spread relative to lightness, and hue is which channel won — 0°/120°/240° for red/green/blue plus the fractional position between. HSL→RGB inverts that: from hue, pick two base colors at full saturation, then descale by saturation and offset by lightness.</p>
<h2>Alpha and opacity</h2>
<p>All three carry alpha: <code>#RRGGBBAA</code>, <code>rgba(r,g,b,0.5)</code>, <code>hsla(h,s%,l%,0.5)</code>. Note that 50% alpha over white is <em>not</em> the same as lightening the color — compositing mixes with whatever is underneath, which is why alpha buttons on photos need testing against multiple backgrounds.</p>
<h2>Accessibility: contrast is not optional</h2>
<p>WCAG AA requires 4.5:1 contrast for body text (3:1 for large text). HSL lightness is perceptually misleading — a 60%-lightness yellow is far "brighter" than a 60%-lightness blue, so text colors picked by equal lightness can pass for one hue and fail for another. Always verify computed contrast, not eyeballed brightness.</p>
<p>Convert between all formats with live contrast checking in the <a href="/tools/color-converter">Color Converter</a> — client-side, instant.</p>`,

  'ipv4-subnetting-guide': `
<h2>The one idea behind subnetting</h2>
<p>An IPv4 address is 32 bits. A subnet mask says which leading bits are the <em>network</em> and which trailing bits are <em>hosts</em>. CIDR notation <code>/26</code> means the first 26 bits are network; the remaining 6 bits identify hosts — so the network contains 2<sup>6</sup> = 64 addresses, of which 62 are usable (network and broadcast addresses are reserved).</p>
<h2>The math you'll actually use</h2>
<pre><code>usable hosts = 2^(32 - prefix) - 2
block size   = 256 - mask-octet</code></pre>
<p>For a /26: mask is 255.255.255.192, block size is 256−192 = 64, so subnets start at .0, .64, .128, .192 within the fourth octet. The network address is the first, broadcast the last, gateway conventionally the first usable.</p>
<h2>Common CIDR table</h2>
<table>
<thead><tr><th>CIDR</th><th>Mask</th><th>Usable hosts</th></tr></thead>
<tbody>
<tr><td>/24</td><td>255.255.255.0</td><td>254</td></tr>
<tr><td>/25</td><td>255.255.255.128</td><td>126</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>62</td></tr>
<tr><td>/27</td><td>255.255.255.224</td><td>30</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr>
<tr><td>/30</td><td>255.255.255.252</td><td>2 (point-to-point)</td></tr>
</tbody>
</table>
<h2>A worked example</h2>
<p><strong>Split 10.0.4.0/24 into four equal subnets.</strong> Four subnets need 2 bits → borrow 2 host bits → /26 each:</p>
<ul>
<li>10.0.4.0/26 — hosts .1–.62, broadcast .63</li>
<li>10.0.4.64/26 — hosts .65–.126, broadcast .127</li>
<li>10.0.4.128/26 — hosts .129–.190, broadcast .191</li>
<li>10.0.4.192/26 — hosts .193–.254, broadcast .255</li>
</ul>
<h2>Pitfalls</h2>
<ul>
<li><strong>"Which subnet does 10.0.4.100/26 belong to?"</strong> — the answer is 10.0.4.64/26, found by masking (100 AND 192 = 64). Address ≠ network address; always derive the network.</li>
<li><strong>Size for growth:</strong> a /27 (30 hosts) is full at 25 devices once you reserve gateway and a couple of infrastructure addresses.</li>
<li><strong>Private ranges:</strong> 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — cloud VPCs default inside these; overlapping ranges break VPN routing later.</li>
</ul>
<p>Run these calculations instantly — mask, wildcard, ranges, host counts, split planning — in the <a href="/tools/ipv4-subnet-calculator">IPv4 Subnet Calculator</a>.</p>`,

  'ethereum-units-explained': `
<h2>Why ether has subunits</h2>
<p>Ethereum's native asset is divisible to 18 decimal places, and the EVM does all arithmetic in the smallest unit — <strong>wei</strong> — as unsigned 256-bit integers. Floating-point ether is a bug factory: <code>0.1 + 0.2 !== 0.3</code> in IEEE-754, and rounding at the 18th decimal loses real money at scale. The rule: <em>store and compute in wei, format for humans only at the edges.</em></p>
<h2>The unit ladder</h2>
<table>
<thead><tr><th>Unit</th><th>Wei</th><th>Typical use</th></tr></thead>
<tbody>
<tr><td>wei</td><td>1</td><td>EVM arithmetic, balances</td></tr>
<tr><td>Kwei</td><td>10<sup>3</sup></td><td>rarely used</td></tr>
<tr><td>Mwei</td><td>10<sup>6</sup></td><td>rarely used</td></tr>
<tr><td><strong>gwei</strong></td><td>10<sup>9</sup></td><td><strong>gas prices</strong></td></tr>
<tr><td>microether</td><td>10<sup>12</sup></td><td>rarely used</td></tr>
<tr><td>milliether</td><td>10<sup>15</sup></td><td>rarely used</td></tr>
<tr><td><strong>ether</strong></td><td>10<sup>18</sup></td><td>human amounts</td></tr>
</tbody>
</table>
<h2>Gas math you'll do weekly</h2>
<p>Transaction cost = gas used × gas price (in gwei), paid in ether. A swap using 180,000 gas at 12 gwei costs 180,000 × 12 gwei = 2,160,000 gwei = 0.00216 ETH. Since EIP-1559, "gas price" splits into a base fee (burned) plus a priority tip; wallets quote <code>maxFeePerGas</code> and refund the difference.</p>
<h2>Pitfalls that cost money</h2>
<ul>
<li><strong>JavaScript numbers top out at 2<sup>53</sup></strong> — about 9 ETH in wei. Always use BigInt (<code>1000000000000000000n</code>) or a decimal library; <code>Number("3 ETH in wei")</code> silently loses precision.</li>
<li><strong>Decimals differ per token.</strong> ERC-20 tokens choose their own — USDC uses 6, most others 18. Reading <code>balanceOf</code> without dividing by the token's decimals gives answers 10<sup>12</sup>× off.</li>
<li><strong>Formatting:</strong> display with fixed decimals and explicit rounding — trailing-zero trimming can hide rounding that shortchanges users.</li>
</ul>
<p>Convert wei/gwei/ether exactly, with BigInt precision, using the <a href="/tools/evm-converter">EVM Unit Converter</a> — no floating-point traps.</p>`,

  'bip39-mnemonic-guide': `
<h2>What a seed phrase actually is</h2>
<p>A BIP39 mnemonic is a human-readable encoding of 128–256 bits of entropy: your machine generated random bits, a checksum was appended, and the bits were sliced into 11-bit chunks, each mapped to one word from the 2048-word list. 12 words = 128 bits entropy (4-bit checksum); 24 words = 256 bits (8-bit checksum). The words carry no meaning — word 4 isn't "the fourth part of your wallet" — the phrase is just a number, encoded so humans can transcribe it without making errors.</p>
<h2>From words to keys</h2>
<p>The mnemonic is run through PBKDF2-HMAC-SHA512 with 2048 iterations and the passphrase <code>"mnemonic" + passphrase</code> to produce a 512-bit seed. That seed feeds BIP32 to derive the master key, and BIP44 defines the standard derivation paths (<code>m/44'/60'/0'/0/0</code> for the first Ethereum address) — which is why the same phrase restores the same addresses in every compliant wallet.</p>
<h2>The passphrase ("25th word")</h2>
<p>BIP39 lets you add a passphrase that changes the derived seed entirely: same words + different passphrase = completely different wallet, with no way to detect one from the other. This enables plausible deniability ("decoy wallet under the standard passphrase"), but it's also the #1 way people lose funds — a passphrase you forget makes the phrase useless. Unlike the words, the passphrase is <em>not</em> restricted to any list and is case-sensitive.</p>
<h2>Security practices</h2>
<ul>
<li><strong>Never type a mnemonic into a website.</strong> Hardware wallets display the phrase for a reason: it must exist only on your device and paper. Any page asking for it is a drainer.</li>
<li><strong>Test restoration</strong> with a small amount before funding — a transcription error should be caught early, not at recovery time.</li>
<li><strong>Checksums matter:</strong> an invalid word order usually fails the checksum loudly, but a wrong-but-valid phrase restores a valid <em>empty</em> wallet — which is the failure you won't notice until it matters.</li>
<li><strong>Entropy source:</strong> generate with a hardware wallet or vetted software; "made up" words have a fraction of the entropy and are crackable.</li>
</ul>
<p>Understand and experiment with derivation safely (offline, test values only) in the <a href="/tools/bip39">BIP39 Passphrase tool</a> — everything runs locally in your browser.</p>`,

  'unix-file-permissions': `
<h2>Reading the nine characters</h2>
<p><code>ls -l</code> shows <code>-rwxr-xr--</code>: the first character is the type (d, l, -), then three triplets for owner, group, and others — read (4), write (2), execute (1). So <code>754</code> means owner rwx, group r-x, others r--. Execute on a directory means <em>traverse</em> (enter and access known names), not list — listing needs read too.</p>
<h2>Octal shorthand</h2>
<table>
<thead><tr><th>Octal</th><th>Meaning</th><th>Common use</th></tr></thead>
<tbody>
<tr><td>755</td><td>rwxr-xr-x</td><td>dirs, executables</td></tr>
<tr><td>644</td><td>rw-r--r--</td><td>ordinary files</td></tr>
<tr><td>600</td><td>rw-------</td><td>private files (SSH keys)</td></tr>
<tr><td>700</td><td>rwx------</td><td>private dirs (~/.ssh)</td></tr>
</tbody>
</table>
<p>Symbolic form edits what octal replaces: <code>chmod g+w file</code> adds group write; <code>chmod o-r file</code> removes other-read; <code>chmod u+x script.sh</code> makes it runnable. Use <code>-R</code> carefully, and prefer <code>X</code> (execute only for directories) when recursing: <code>chmod -R u+rwX,go+rX .</code>.</p>
<h2>The three special bits</h2>
<ul>
<li><strong>setuid (4000)</strong> — run executable as its <em>owner</em>: <code>passwd</code> runs as root this way. Rare, audited, and a classic privilege-escalation vector when misplaced.</li>
<li><strong>setgid (2000)</strong> — on directories, new files inherit the directory's <em>group</em>: the collaboration pattern for shared team folders.</li>
<li><strong>sticky bit (1000)</strong> — on a world-writable dir, users can delete only their own files: <code>/tmp</code> is 1777 for exactly this reason.</li>
</ul>
<h2>umask: permissions at creation</h2>
<p>New files start 666 and directories 777, minus the umask. The common <code>022</code> yields 644/755; private setups use <code>077</code> (600/700). It's per-shell: set it in <code>~/.bashrc</code> or <code>~/.zshrc</code>, not once and forgotten.</p>
<h2>Pitfalls</h2>
<ul>
<li><strong>SSH refuses keys that are too open</strong> — <code>~/.ssh/id_ed25519</code> must be 600; the cryptic error is "UNPROTECTED PRIVATE KEY".</li>
<li><strong>Execute-without-read</strong> on a script fails: the interpreter can't open it. Binaries can run r-x; shell scripts can't run --x.</li>
<li><strong>Directories need x for access</strong> — r without x lets you list names but not open anything inside.</li>
</ul>
<p>Compute permission sets interactively with the <a href="/tools/chmod-calculator">Chmod Calculator</a>.</p>`,

  'encoding-vs-encryption': `
<h2>The distinction people get wrong</h2>
<p>Base64 is not encryption — it's a <em>reversible encoding</em> with a public, documented algorithm and <strong>no key</strong>. Anyone can decode Base64 instantly; its only purpose is representing arbitrary bytes with printable characters (email attachments, data URLs, JSON-embedded binaries). Encryption, by contrast, is reversible only with a key, and its security rests entirely on that key's secrecy.</p>
<h2>The test that settles it</h2>
<p>Ask: <em>"Can a stranger who intercepts this recover the content?"</em> If yes — it's encoding. Base64 "protecting" an API credential is obfuscation at best; scrapers and scanners decode it on sight. Credentials in transit need TLS; credentials at rest need AES or age; user passwords need a slow hash (bcrypt/Argon2), which isn't reversible at all.</p>
<h2>Where each belongs</h2>
<table>
<thead><tr><th>You need…</th><th>Use</th></tr></thead>
<tbody>
<tr><td>Binary in text (email, JSON, URLs)</td><td>Base64 / Base64URL</td></tr>
<tr><td>Only the right party can read it</td><td>AES-GCM (symmetric) or RSA/ECIES (asymmetric)</td></tr>
<tr><td>Nobody can read it, ever — even you</td><td>bcrypt / Argon2id hash (passwords)</td></tr>
<tr><td>Proof a message is unmodified</td><td>HMAC (keyed) or SHA-256 (unkeyed integrity)</td></tr>
</tbody>
</table>
<h2>Encoding facts worth knowing</h2>
<ul>
<li>Base64 inflates size by ~33% (3 bytes → 4 chars). Base64URL (<code>-_</code> instead of <code>+/</code>, no padding) exists for URL-safe contexts — JWTs use it.</li>
<li>Hex doubles size but survives case-insensitive contexts and eyeball comparison; hashes are conventionally hex.</li>
<li><strong>Encoding isn't compression either</strong> — it makes data bigger. Pair with gzip before Base64 if size matters.</li>
</ul>
<h2>A real-world checklist</h2>
<p>Before shipping: secrets in git are not "hidden" by Base64 (scanners decode them); "encrypted" client-side with a key shipped in the same JavaScript is encoding with extra steps; JWT payloads are Base64URL — <em>signed, not encrypted</em> — so never put secrets in one. Verify all of this hands-on in the <a href="/tools/base64">Base64</a> and <a href="/tools/encrypt">Encrypt/Decrypt</a> tools — both fully client-side.</p>`,

  'json-yaml-toml-comparison': `
<h2>Three formats, three philosophies</h2>
<p>JSON is a <em>data interchange</em> format: minimal syntax, universal parsing, no comments, no trailing commas. YAML is a <em>configuration</em> language optimized for humans: whitespace-significant, expressive, and — because of that — full of edge cases. TOML is configuration with a grammar: explicit, boring, hard to get wrong.</p>
<h2>Feature comparison</h2>
<table>
<thead><tr><th></th><th>JSON</th><th>YAML</th><th>TOML</th></tr></thead>
<tbody>
<tr><td>Comments</td><td>✗</td><td>✓</td><td>✓</td></tr>
<tr><td>Multi-line strings</td><td>Escaped only</td><td>✓ (block scalars)</td><td>✓</td></tr>
<tr><td>Dates/times</td><td>string</td><td>✓ (unquoted!)</td><td>✓ first-class</td></tr>
<tr><td>Anchors/refs</td><td>✗</td><td>✓</td><td>✗</td></tr>
<tr><td>Trailing commas</td><td>✗</td><td>n/a</td><td>tables: n/a</td></tr>
<tr><td>The Norway problem</td><td>n/a</td><td>✗ <code>no</code> → false</td><td>✓ strings stay strings</td></tr>
</tbody>
</table>
<h2>Choose by job</h2>
<ul>
<li><strong>APIs, anything machine-to-machine:</strong> JSON. Every language parses it natively; schema tooling (JSON Schema, OpenAPI) is built on it.</li>
<li><strong>Kubernetes, CI pipelines, docker-compose:</strong> YAML — ecosystem standard, like it or not. Use a linter (yamllint) and quote all strings that could parse as bool/number (<code>"no"</code>, <code>"0755"</code>, <code>version: "1.2"</code>).</li>
<li><strong>App config you control (Rust, Python, Hugo):</strong> TOML — comments, obvious typing, no indentation traps.</li>
</ul>
<h2>YAML traps, concretely</h2>
<ul>
<li><code>country: no</code> parses as <code>country: false</code> (also: <code>yes</code>, <code>on</code>, <code>off</code>). Quote strings.</li>
<li><code>version: 1.10</code> is the float 1.1 — quote semver, always.</li>
<li>Tabs are illegal for indentation; copy-paste from chat apps injects non-breaking spaces that break parsers invisibly.</li>
<li>Anchors (<code>&amp;ref</code> / <code>*ref</code>) are powerful but make files un-greppable; use sparingly in shared repos.</li>
</ul>
<h2>Interop</h2>
<p>All three convert losslessly except for the extras: comments drop in JSON, YAML dates become strings, TOML tables reorder. When configs flow between systems, convert to JSON as the canonical middle step. Try it with your own files in the <a href="/tools/json-yaml">JSON ↔ YAML</a> and <a href="/tools/toml-to-json">TOML → JSON</a> converters — all client-side.</p>`
}
