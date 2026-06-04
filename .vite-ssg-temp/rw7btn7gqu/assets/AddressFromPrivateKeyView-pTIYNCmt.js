import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { privateKeyToAccount } from "viem/accounts";
import { secp256k1 } from "@noble/curves/secp256k1";
import { ripemd160 } from "@noble/hashes/legacy.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { Buffer } from "vite-plugin-node-polyfills/shims/buffer";
import { bech32 } from "bech32";
import { Keypair } from "@solana/web3.js";
import { c as _sfc_main$1 } from "../main.mjs";
import "./CardFooter-DjcCkgh0.js";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
import "lucide-vue-next";
import "@vueuse/core";
import "clsx";
import "tailwind-merge";
import "radix-vue";
import "class-variance-authority";
import "unified";
import "remark-parse";
import "remark-gfm";
import "remark-rehype";
import "rehype-raw";
import "rehype-highlight";
import "rehype-stringify";
import "docx";
import "file-saver";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AddressFromPrivateKeyView",
  __ssrInlineRender: true,
  setup(__props) {
    if (typeof window !== "undefined" && !window.Buffer) {
      window.Buffer = Buffer;
    }
    const privateKey = ref("");
    const results = ref([]);
    const error = ref("");
    const toHex = (u8) => Buffer.from(u8).toString("hex");
    const calculateAddresses = async () => {
      try {
        results.value = [];
        error.value = "";
        let pkInput = privateKey.value.trim();
        const cleanHex = pkInput.startsWith("0x") ? pkInput.slice(2) : pkInput;
        if (cleanHex.length !== 64) {
          throw new Error("Invalid private key length. Expecting 32 bytes (64 hex characters).");
        }
        const privKeyBytes = Buffer.from(cleanHex, "hex");
        if (privKeyBytes.length !== 32) throw new Error("Invalid hex string");
        const chains = [];
        try {
          const account = privateKeyToAccount(`0x${cleanHex}`);
          const pubKeyUncompressed = secp256k1.getPublicKey(privKeyBytes, false);
          chains.push({
            name: "Ethereum (EVM)",
            ticker: "ETH",
            address: account.address,
            desc: "Standard for ETH, BSC, Polygon, Optimism, Arbitrum, Base, etc.",
            color: "bg-blue-100 dark:bg-blue-900",
            publicKey: toHex(pubKeyUncompressed)
          });
        } catch (e) {
          console.error("ETH fail", e);
        }
        try {
          const pubKeyCompressed = secp256k1.getPublicKey(privKeyBytes, true);
          const sha = sha256(pubKeyCompressed);
          const rip = ripemd160(sha);
          const words = bech32.toWords(rip);
          const wordsWithVersion = [0, ...words];
          const btcSegwit = bech32.encode("bc", wordsWithVersion);
          chains.push({
            name: "Bitcoin (SegWit)",
            ticker: "BTC",
            address: btcSegwit,
            desc: "Native SegWit (Bech32). Starts with bc1q.",
            color: "bg-orange-100 dark:bg-orange-900",
            publicKey: toHex(pubKeyCompressed)
          });
        } catch (e) {
          console.error("BTC fail", e);
        }
        try {
          const pubKeyCompressed = secp256k1.getPublicKey(privKeyBytes, true);
          const sha = sha256(pubKeyCompressed);
          const rip = ripemd160(sha);
          const words = bech32.toWords(rip);
          const atomAddr = bech32.encode("cosmos", words);
          chains.push({
            name: "Cosmos",
            ticker: "ATOM",
            address: atomAddr,
            desc: "Cosmos Hub address (Bech32).",
            color: "bg-indigo-100 dark:bg-indigo-900",
            publicKey: toHex(pubKeyCompressed)
          });
        } catch (e) {
          console.error("Cosmos fail", e);
        }
        try {
          const keypair = Keypair.fromSeed(privKeyBytes);
          chains.push({
            name: "Solana (from Seed)",
            ticker: "SOL",
            address: keypair.publicKey.toBase58(),
            desc: "Derived treating the input 32 bytes as an Ed25519 SEED.",
            color: "bg-purple-100 dark:bg-purple-900",
            publicKey: keypair.publicKey.toBase58()
          });
        } catch (e) {
          console.error("SOL fail", e);
        }
        try {
          const pubKeyUncompressed = secp256k1.getPublicKey(privKeyBytes, false);
          const pubKeyStart = pubKeyUncompressed.slice(1);
          const { keccak256 } = await import("viem");
          const hash = keccak256(pubKeyStart);
          const last20 = hash.slice(-40);
          const inputHex = "41" + last20;
          const inputBytes = Buffer.from(inputHex, "hex");
          const h1 = sha256(inputBytes);
          const h2 = sha256(h1);
          const checksum = h2.slice(0, 4);
          const finalBytes = Buffer.concat([inputBytes, checksum]);
          const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
          const base58Encode = (buffer) => {
            let carry;
            const digits = [0];
            for (let i = 0; i < buffer.length; i++) {
              for (let j = 0; j < digits.length; j++) digits[j] <<= 8;
              digits[0] += buffer[i];
              carry = 0;
              for (let j = 0; j < digits.length; ++j) {
                digits[j] += carry;
                carry = digits[j] / 58 | 0;
                digits[j] %= 58;
              }
              while (carry) {
                digits.push(carry % 58);
                carry = carry / 58 | 0;
              }
            }
            let str = "";
            for (let i = 0; i < buffer.length && buffer[i] === 0; i++) str += "1";
            for (let i = digits.length - 1; i >= 0; i--) str += ALPHABET[digits[i]];
            return str;
          };
          const tronAddress = base58Encode(finalBytes);
          chains.push({
            name: "Tron",
            ticker: "TRX",
            address: tronAddress,
            desc: "EVM-compatible keys, Base58Check encoded (starts with T).",
            color: "bg-red-100 dark:bg-red-900",
            publicKey: toHex(pubKeyUncompressed)
          });
        } catch (e) {
          console.error("Tron fail", e);
        }
        results.value = chains;
      } catch (err) {
        console.error(err);
        error.value = err.message || "Invalid Private Key";
        results.value = [];
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-6 gap-6 overflow-y-auto bg-muted/30" }, _attrs))}><div class="prose dark:prose-invert max-w-none"><h1>Address from Private Key (Multi-Chain)</h1><p class="text-slate-600 dark:text-slate-400"> Enter a 32-byte raw private key (hex) to derive valid addresses for multiple blockchains. <br><span class="text-xs text-muted-foreground">Since many chains share elliptic curves (secp256k1), the same private key corresponds to valid addresses on all of them.</span></p><div class="p-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 text-amber-700 dark:text-amber-400 text-sm"><strong>Security Warning:</strong> This tool runs 100% in your browser. Keys are never sent to any server. However, do not paste keys that hold real value. Use for testing/recovery only. </div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-1 space-y-6"><div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700"><h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Input Key</h2><div class="space-y-4"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> Private Key (Hex) </label><div class="relative"><input${ssrRenderAttr("value", privateKey.value)} type="text" class="w-full font-mono rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white" placeholder="e.g. 4f3a..."></div><p class="text-xs text-slate-500 mt-1">Enter 64 hex characters (32 bytes).</p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: calculateAddresses,
        "aria-label": "Calculate addresses from private key",
        class: "w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Derive Addresses `);
          } else {
            return [
              createTextVNode(" Derive Addresses ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (error.value) {
        _push(`<div class="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-800">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="lg:col-span-2 space-y-4"><h2 class="text-xl font-bold flex items-center gap-2"> Derived Addresses `);
      if (results.value.length) {
        _push(`<span class="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">${ssrInterpolate(results.value.length)} Found</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h2>`);
      if (results.value.length === 0 && !error.value) {
        _push(`<div class="text-slate-400 italic py-8 text-center border-2 border-dashed rounded-lg"> Enter a key to see addresses. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(results.value, (chain) => {
        _push(`<div class="${ssrRenderClass([
          "relative rounded-lg p-5 border transition-all",
          chain.color,
          "border-black/5 dark:border-white/5"
        ])}"><div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2"><div><h3 class="font-bold text-lg flex items-center gap-2">${ssrInterpolate(chain.name)} <span class="text-xs font-mono bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded">${ssrInterpolate(chain.ticker)}</span></h3><p class="text-xs opacity-75 max-w-sm">${ssrInterpolate(chain.desc)}</p></div></div><div class="mt-4 space-y-3"><div><div class="text-[10px] uppercase font-bold opacity-60 mb-1">Address</div><div class="font-mono text-base break-all bg-white/60 dark:bg-black/20 p-2.5 rounded select-all border border-black/5 dark:border-white/5">${ssrInterpolate(chain.address)}</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><div class="text-[10px] uppercase font-bold opacity-60 mb-1">Public Key</div><div class="font-mono text-xs break-all bg-white/40 dark:bg-black/10 p-1.5 rounded select-all truncate">${ssrInterpolate(chain.publicKey)}</div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AddressFromPrivateKeyView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
