// Buffer polyfill for bip39 and other Node.js crypto libraries in the browser
import { Buffer } from 'buffer'
if (typeof window !== 'undefined' && !(window as any).Buffer) {
  ;(window as any).Buffer = Buffer
}
if (typeof globalThis !== 'undefined' && !(globalThis as any).Buffer) {
  ;(globalThis as any).Buffer = Buffer
}

if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  ;(globalThis as any).self = globalThis
}

if (typeof window !== 'undefined') {
  if (!window.localStorage) {
    ;(window as any).localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    }
  }
  if (!window.matchMedia) {
    ;(window as any).matchMedia = () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    })
  }
}
