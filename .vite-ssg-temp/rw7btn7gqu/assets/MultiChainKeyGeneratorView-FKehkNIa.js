import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";
import { sha256 } from "@noble/hashes/sha256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { keccak_256 } from "@noble/hashes/sha3";
import { bech32 } from "bech32";
import { c as _sfc_main$1 } from "../main.mjs";
import "./CardFooter-DjcCkgh0.js";
import "vite-plugin-node-polyfills/shims/buffer";
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
  __name: "MultiChainKeyGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const mnemonic = ref("");
    const error = ref("");
    const generated = ref(false);
    const results = ref([]);
    const toHex = (bytes) => Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
    const getEthAddress = (publicKey) => {
      const pubKeyBytes = publicKey.length === 65 ? publicKey.slice(1) : publicKey;
      const hash = keccak_256(pubKeyBytes);
      return "0x" + toHex(hash.slice(-20));
    };
    const generateMnemonic = () => {
      try {
        if (typeof window === "undefined" || !window.crypto) {
          error.value = "Crypto API not available. Please use a modern browser over HTTPS.";
          return;
        }
        mnemonic.value = bip39.generateMnemonic(wordlist, 128);
        error.value = "";
        generateKeys();
      } catch (err) {
        console.error(err);
        error.value = "Error generating mnemonic: " + err.message;
      }
    };
    const validateAndGenerate = () => {
      if (!bip39.validateMnemonic(mnemonic.value, wordlist)) {
        error.value = "Invalid mnemonic phrase";
        return;
      }
      error.value = "";
      generateKeys();
    };
    const getCosmosAddress = (pubKey) => {
      const sha = sha256(pubKey);
      const rip = ripemd160(sha);
      const words = bech32.toWords(rip);
      return bech32.encode("cosmos", words);
    };
    const generateKeys = () => {
      try {
        const seed = bip39.mnemonicToSeedSync(mnemonic.value);
        const master = HDKey.fromMasterSeed(seed);
        const resultsList = [];
        const ethPath = "m/44'/60'/0'/0/0";
        const ethChild = master.derive(ethPath);
        if (ethChild.publicKey) {
          const ethAddress = getEthAddress(ethChild.publicKey);
          resultsList.push({
            name: "Ethereum",
            ticker: "ETH",
            address: ethAddress,
            privateKey: ethChild.privateKey ? toHex(ethChild.privateKey) : "Unavailable",
            publicKey: toHex(ethChild.publicKey),
            path: ethPath,
            algo: "Secp256k1",
            algoDesc: "ECDSA on secp256k1 curve. Used by Bitcoin, Ethereum, Cosmos.",
            color: "bg-blue-100 dark:bg-blue-900"
          });
        }
        const solPath = "m/44'/501'/0'/0'";
        const solChild = master.derive(solPath);
        if (solChild.publicKey) {
          resultsList.push({
            name: "Solana",
            ticker: "SOL",
            address: "Requires SLIP-0010 Ed25519 derivation",
            privateKey: solChild.privateKey ? toHex(solChild.privateKey) : "Unavailable",
            publicKey: toHex(solChild.publicKey),
            path: solPath,
            algo: "Ed25519",
            algoDesc: "EdDSA on Curve25519. Solana uses SLIP-0010 Ed25519 with specific derivation.",
            color: "bg-indigo-100 dark:bg-indigo-900"
          });
        }
        const cosmosPath = "m/44'/118'/0'/0/0";
        const cosmosChild = master.derive(cosmosPath);
        if (cosmosChild.publicKey) {
          const cosmosAddress = getCosmosAddress(cosmosChild.publicKey);
          resultsList.push({
            name: "Cosmos",
            ticker: "ATOM",
            address: cosmosAddress,
            privateKey: cosmosChild.privateKey ? toHex(cosmosChild.privateKey) : "Unavailable",
            publicKey: toHex(cosmosChild.publicKey),
            path: cosmosPath,
            algo: "Secp256k1",
            algoDesc: "Same curve as Ethereum but using Bech32 address encoding.",
            color: "bg-purple-100 dark:bg-purple-900"
          });
        }
        const btcPath = "m/84'/0'/0'/0/0";
        const btcChild = master.derive(btcPath);
        if (btcChild.publicKey) {
          resultsList.push({
            name: "Bitcoin",
            ticker: "BTC",
            address: "Requires Bech32m encoding",
            privateKey: btcChild.privateKey ? toHex(btcChild.privateKey) : "Unavailable",
            publicKey: toHex(btcChild.publicKey),
            path: btcPath,
            algo: "Secp256k1",
            algoDesc: "Native SegWit (BIP84). Uses Bech32m encoding for addresses.",
            color: "bg-orange-100 dark:bg-orange-900"
          });
        }
        resultsList.push({
          name: "Polkadot",
          ticker: "DOT",
          address: "Requires Sr25519 WASM",
          privateKey: "Requires @polkadot WASM",
          publicKey: "Requires @polkadot WASM",
          path: "//polkadot",
          algo: "Sr25519",
          algoDesc: "Schnorr signatures on Ristretto group. Requires WASM initialization.",
          color: "bg-pink-100 dark:bg-pink-900"
        });
        results.value = resultsList;
        generated.value = true;
      } catch (err) {
        console.error(err);
        error.value = "Error generating keys: " + err.message;
      }
    };
    const reset = () => {
      mnemonic.value = "";
      error.value = "";
      results.value = [];
      generated.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-6 bg-muted/30" }, _attrs))}><div class="prose dark:prose-invert max-w-none"><h1>Multi-Chain Key Generator</h1><p class="text-slate-600 dark:text-slate-400"> Generate keys and addresses for multiple blockchains from a single recovery phrase. Your keys never leave your browser. </p></div><div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700"><div class="space-y-4"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> Mnemonic Phrase (Seed) </label><textarea rows="3" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono" placeholder="Enter your 12 or 24 word phrase...">${ssrInterpolate(mnemonic.value)}</textarea></div><div class="flex flex-wrap gap-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: generateMnemonic,
        "aria-label": "Generate new mnemonic"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Generate Random `);
          } else {
            return [
              createTextVNode(" Generate Random ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: validateAndGenerate,
        class: "bg-emerald-600 hover:bg-emerald-700",
        "aria-label": "Calculate keys"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Calculate Keys `);
          } else {
            return [
              createTextVNode(" Calculate Keys ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: reset,
        variant: "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Clear`);
          } else {
            return [
              createTextVNode("Clear")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (error.value) {
        _push(`<div class="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-md">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (generated.value) {
        _push(`<div class="grid gap-4 md:grid-cols-1"><!--[-->`);
        ssrRenderList(results.value, (chain) => {
          _push(`<div class="${ssrRenderClass(["rounded-lg p-6 border", chain.color])}"><div class="flex justify-between items-start mb-4"><div><h3 class="text-xl font-bold flex items-center gap-2">${ssrInterpolate(chain.name)} <span class="text-xs bg-black/10 px-2 py-0.5 rounded">${ssrInterpolate(chain.ticker)}</span></h3><p class="text-sm text-slate-700 dark:text-slate-300 mt-1">${ssrInterpolate(chain.algo)}</p></div></div><div class="space-y-3 text-sm font-mono break-all"><div><div class="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Address</div><div class="bg-white/50 dark:bg-black/20 p-2 rounded select-all">${ssrInterpolate(chain.address)}</div></div><div><div class="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Private Key</div><div class="bg-white/50 dark:bg-black/20 p-2 rounded blur-sm hover:blur-none transition-all select-all">${ssrInterpolate(chain.privateKey)}</div></div><div class="grid grid-cols-2 gap-4"><div><div class="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Derivation Path</div><div class="bg-white/50 dark:bg-black/20 p-1.5 rounded">${ssrInterpolate(chain.path)}</div></div><div><div class="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Public Key</div><div class="bg-white/50 dark:bg-black/20 p-1.5 rounded truncate">${ssrInterpolate(chain.publicKey)}</div></div></div><div class="mt-3 pt-3 border-t border-black/10 dark:border-white/10"><p class="text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed"><strong>Algorithm:</strong> ${ssrInterpolate(chain.algoDesc)}</p></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!generated.value && !error.value) {
        _push(`<div class="text-center text-muted-foreground py-8"> Click <strong>Generate Random</strong> to create a new mnemonic, or paste an existing one and click <strong>Calculate Keys</strong>. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/MultiChainKeyGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
