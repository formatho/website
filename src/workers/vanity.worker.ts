/// <reference lib="webworker" />
// Vanity ETH address generator worker - keeps the UI responsive while
// generating secp256k1 keypairs at full speed. Keys are produced with
// crypto.getRandomValues inside this worker and never leave the browser.
import { generatePrivateKey, privateKeyToAddress } from 'viem/accounts'

const ctx = self as unknown as Worker

let running = false

ctx.onmessage = (e: MessageEvent) => {
  const { action, prefix, suffix } = e.data

  if (action === 'start') {
    running = true
    const p = (prefix || '').toLowerCase()
    const s = (suffix || '').toLowerCase()
    let attempts = 0

    const loop = () => {
      if (!running) return
      // Chunk work so progress messages reach the UI promptly
      for (let i = 0; i < 500; i++) {
        attempts++
        const pk = generatePrivateKey()
        const addr = privateKeyToAddress(pk)
        const a = addr.toLowerCase()
        if ((!p || a.slice(2, 2 + p.length) === p) && (!s || a.endsWith(s))) {
          ctx.postMessage({ type: 'found', attempts, address: addr, privateKey: pk })
        }
      }
      ctx.postMessage({ type: 'progress', attempts })
      setTimeout(loop, 0)
    }
    loop()
  } else if (action === 'stop') {
    running = false
  }
}
