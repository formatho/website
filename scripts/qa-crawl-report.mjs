#!/usr/bin/env node
/* eslint-env node */

/**
 * QA Weekly Crawl Report (OKR-2 KR3: all tool pages error-free)
 * Fetches the sitemap from a base URL (default: https://qa.formatho.com),
 * GETs every URL with limited concurrency, and reports non-200 responses.
 *
 * Usage: node scripts/qa-crawl-report.mjs [base_url]
 * Exit 0 = all URLs healthy, exit 1 = any non-200/failed URL.
 */

import https from 'https';
import { URL } from 'url';

const BASE = process.argv[2] || 'https://qa.formatho.com';
const TIMEOUT_MS = 10000;
const CONCURRENCY = 8;

function get(url, redirectsLeft = 3) {
  return new Promise((resolve) => {
    const started = Date.now();
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        port: 443,
        path: u.pathname + u.search,
        method: 'GET',
        timeout: TIMEOUT_MS,
        headers: { 'User-Agent': 'OpenClaw-QA-Crawl/1.0' },
      },
      (res) => {
        res.resume(); // drain
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
          const next = new URL(res.headers.location, url).toString();
          get(next, redirectsLeft - 1).then((inner) =>
            resolve({ url, finalUrl: inner.finalUrl, status: inner.status, ok: inner.ok, ms: Date.now() - started })
          );
        } else {
          resolve({ url, finalUrl: url, status: res.statusCode, ok: res.statusCode === 200, ms: Date.now() - started });
        }
      }
    );
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (err) => resolve({ url, finalUrl: url, status: 0, ok: false, error: err.message, ms: Date.now() - started }));
    req.end();
  });
}

async function fetchSitemap() {
  const body = await new Promise((resolve, reject) => {
    https
      .get(`${BASE}/sitemap.xml`, { headers: { 'User-Agent': 'OpenClaw-QA-Crawl/1.0' } }, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
  const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  // Sitemap <loc> entries are canonical prod URLs — rewrite them onto the crawl base host
  const base = new URL(BASE);
  return locs.map((loc) => {
    const u = new URL(loc);
    u.protocol = base.protocol;
    u.host = base.host;
    return u.toString();
  });
}

async function main() {
  const urls = await fetchSitemap();
  if (!urls.length) {
    console.error(`No URLs found in ${BASE}/sitemap.xml`);
    process.exit(1);
  }
  console.log(`QA crawl: ${urls.length} URLs from ${BASE}/sitemap.xml\n`);

  const results = [];
  let index = 0;
  async function worker() {
    while (index < urls.length) {
      const url = urls[index++];
      results.push(await get(url));
      process.stdout.write(`\r${results.length}/${urls.length} checked`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  process.stdout.write('\n\n');

  const bad = results.filter((r) => !r.ok);
  const slow = results.filter((r) => r.ok && r.ms > 3000);
  const avg = Math.round(results.reduce((s, r) => s + r.ms, 0) / results.length);

  console.log(`Result: ${results.length - bad.length}/${results.length} OK (avg ${avg}ms, ${slow.length} slow >3s)`);
  if (slow.length) {
    console.log('\nSlow (>3s):');
    slow.sort((a, b) => b.ms - a.ms).forEach((r) => console.log(`  ${r.ms}ms ${r.url}`));
  }
  if (bad.length) {
    console.log('\nFAILURES:');
    bad.forEach((r) => console.log(`  [${r.status}${r.error ? ' ' + r.error : ''}] ${r.url}${r.finalUrl !== r.url ? ' -> ' + r.finalUrl : ''}`));
    process.exit(1);
  } else {
    console.log('All pages healthy — weekly crawl clean.');
  }
}

main();
