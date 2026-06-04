import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, resolveDynamicComponent, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { Hash, Check, Copy } from "lucide-vue-next";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$6 } from "./CardFooter-DjcCkgh0.js";
import { e as _sfc_main$1, c as _sfc_main$7 } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { blake2bInit, blake2bUpdate, blake2bFinal } from "blakejs";
import bcrypt__default from "bcryptjs";
import CryptoJS from "crypto-js";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
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
  __name: "HashTextView",
  __ssrInlineRender: true,
  setup(__props) {
    const input = ref("");
    const hashResults = ref({});
    const copied = ref(null);
    const isComputing = ref(false);
    const bytesToHex = (bytes) => {
      return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
    };
    const hashText = async (text, algorithm) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      return bytesToHex(new Uint8Array(hashBuffer));
    };
    const md5 = (str) => {
      const rotateLeft = (x2, n) => x2 << n | x2 >>> 32 - n;
      const addUnsigned = (x2, y) => {
        const x8 = x2 & 2147483648;
        const y8 = y & 2147483648;
        const x4 = x2 & 1073741824;
        const y4 = y & 1073741824;
        const result = (x2 & 1073741823) + (y & 1073741823);
        if (x4 & y4) return result ^ 2147483648 ^ x8 ^ y8;
        if (x4 | y4) {
          if (result & 1073741824) return result ^ 3221225472 ^ x8 ^ y8;
          return result ^ 1073741824 ^ x8 ^ y8;
        }
        return result ^ x8 ^ y8;
      };
      const F = (x2, y, z) => x2 & y | ~x2 & z;
      const G = (x2, y, z) => x2 & z | y & ~z;
      const H = (x2, y, z) => x2 ^ y ^ z;
      const I = (x2, y, z) => y ^ (x2 | ~z);
      const FF = (a2, b2, c2, d2, x2, s, ac) => {
        a2 = addUnsigned(a2, addUnsigned(addUnsigned(F(b2, c2, d2), x2), ac));
        return addUnsigned(rotateLeft(a2, s), b2);
      };
      const GG = (a2, b2, c2, d2, x2, s, ac) => {
        a2 = addUnsigned(a2, addUnsigned(addUnsigned(G(b2, c2, d2), x2), ac));
        return addUnsigned(rotateLeft(a2, s), b2);
      };
      const HH = (a2, b2, c2, d2, x2, s, ac) => {
        a2 = addUnsigned(a2, addUnsigned(addUnsigned(H(b2, c2, d2), x2), ac));
        return addUnsigned(rotateLeft(a2, s), b2);
      };
      const II = (a2, b2, c2, d2, x2, s, ac) => {
        a2 = addUnsigned(a2, addUnsigned(addUnsigned(I(b2, c2, d2), x2), ac));
        return addUnsigned(rotateLeft(a2, s), b2);
      };
      const convertToWordArray = (str2) => {
        const lWordCount = Math.floor((str2.length + 8 - (str2.length + 8) % 64) / 64 + 1);
        const lNumberOfWords = lWordCount * 16;
        const lWordArray = new Array(lNumberOfWords - 1);
        let lByteCount = 0;
        while (lByteCount < str2.length) {
          const lWordIndex2 = Math.floor(lByteCount / 4);
          lWordArray[lWordIndex2] = (lWordArray[lWordIndex2] ?? 0) | str2.charCodeAt(lByteCount) << lByteCount % 4 * 8;
          lByteCount++;
        }
        const lWordIndex = Math.floor(lByteCount / 4);
        lWordArray[lWordIndex] = (lWordArray[lWordIndex] ?? 0) | 128 << lByteCount % 4 * 8;
        lWordArray[lNumberOfWords - 2] = str2.length << 3;
        lWordArray[lNumberOfWords - 1] = str2.length >>> 29;
        return lWordArray;
      };
      const wordToHex = (value) => {
        let hex = "";
        for (let i = 0; i <= 3; i++) {
          const byte = value >>> i * 8 & 255;
          hex += ("0" + byte.toString(16)).slice(-2);
        }
        return hex;
      };
      const x = convertToWordArray(str);
      let a = 1732584193, b = 4023233417, c = 2562383102, d = 271733878;
      const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
      const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
      const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
      const S41 = 6, S42 = 10, S43 = 15, S44 = 21;
      for (let k = 0; k < x.length; k += 16) {
        const AA = a, BB = b, CC = c, DD = d;
        a = FF(a, b, c, d, x[k + 0] ?? 0, S11, 3614090360);
        d = FF(d, a, b, c, x[k + 1] ?? 0, S12, 3905402710);
        c = FF(c, d, a, b, x[k + 2] ?? 0, S13, 606105819);
        b = FF(b, c, d, a, x[k + 3] ?? 0, S14, 3250441966);
        a = FF(a, b, c, d, x[k + 4] ?? 0, S11, 4118548399);
        d = FF(d, a, b, c, x[k + 5] ?? 0, S12, 1200080426);
        c = FF(c, d, a, b, x[k + 6] ?? 0, S13, 2821735955);
        b = FF(b, c, d, a, x[k + 7] ?? 0, S14, 4249261313);
        a = FF(a, b, c, d, x[k + 8] ?? 0, S11, 1770035416);
        d = FF(d, a, b, c, x[k + 9] ?? 0, S12, 2336552879);
        c = FF(c, d, a, b, x[k + 10] ?? 0, S13, 4294925233);
        b = FF(b, c, d, a, x[k + 11] ?? 0, S14, 2304563134);
        a = FF(a, b, c, d, x[k + 12] ?? 0, S11, 1804603682);
        d = FF(d, a, b, c, x[k + 13] ?? 0, S12, 4254626195);
        c = FF(c, d, a, b, x[k + 14] ?? 0, S13, 2792965006);
        b = FF(b, c, d, a, x[k + 15] ?? 0, S14, 1236535329);
        a = GG(a, b, c, d, x[k + 1] ?? 0, S21, 4129170786);
        d = GG(d, a, b, c, x[k + 6] ?? 0, S22, 3225465664);
        c = GG(c, d, a, b, x[k + 11] ?? 0, S23, 643717713);
        b = GG(b, c, d, a, x[k + 0] ?? 0, S24, 3921069994);
        a = GG(a, b, c, d, x[k + 5] ?? 0, S21, 3593408605);
        d = GG(d, a, b, c, x[k + 10] ?? 0, S22, 38016083);
        c = GG(c, d, a, b, x[k + 15] ?? 0, S23, 3634488961);
        b = GG(b, c, d, a, x[k + 4] ?? 0, S24, 3889429448);
        a = GG(a, b, c, d, x[k + 9] ?? 0, S21, 568446438);
        d = GG(d, a, b, c, x[k + 14] ?? 0, S22, 3275163606);
        c = GG(c, d, a, b, x[k + 3] ?? 0, S23, 4107603335);
        b = GG(b, c, d, a, x[k + 8] ?? 0, S24, 1163531501);
        a = GG(a, b, c, d, x[k + 13] ?? 0, S21, 2850285829);
        d = GG(d, a, b, c, x[k + 2] ?? 0, S22, 4243563512);
        c = GG(c, d, a, b, x[k + 7] ?? 0, S23, 1735328473);
        b = GG(b, c, d, a, x[k + 12] ?? 0, S24, 2368359562);
        a = HH(a, b, c, d, x[k + 5] ?? 0, S31, 4294588738);
        d = HH(d, a, b, c, x[k + 8] ?? 0, S32, 2272392833);
        c = HH(c, d, a, b, x[k + 11] ?? 0, S33, 1839030562);
        b = HH(b, c, d, a, x[k + 14] ?? 0, S34, 4259657740);
        a = HH(a, b, c, d, x[k + 1] ?? 0, S31, 2763975236);
        d = HH(d, a, b, c, x[k + 4] ?? 0, S32, 1272893353);
        c = HH(c, d, a, b, x[k + 7] ?? 0, S33, 4139469664);
        b = HH(b, c, d, a, x[k + 10] ?? 0, S34, 3200236656);
        a = HH(a, b, c, d, x[k + 13] ?? 0, S31, 681279174);
        d = HH(d, a, b, c, x[k + 0] ?? 0, S32, 3936430074);
        c = HH(c, d, a, b, x[k + 3] ?? 0, S33, 3572445317);
        b = HH(b, c, d, a, x[k + 6] ?? 0, S34, 76029189);
        a = HH(a, b, c, d, x[k + 9] ?? 0, S31, 3654602809);
        d = HH(d, a, b, c, x[k + 12] ?? 0, S32, 3873151461);
        c = HH(c, d, a, b, x[k + 15] ?? 0, S33, 530742520);
        b = HH(b, c, d, a, x[k + 2] ?? 0, S34, 3299628645);
        a = II(a, b, c, d, x[k + 0] ?? 0, S41, 4096336452);
        d = II(d, a, b, c, x[k + 7] ?? 0, S42, 1126891415);
        c = II(c, d, a, b, x[k + 14] ?? 0, S43, 2878612391);
        b = II(b, c, d, a, x[k + 5] ?? 0, S44, 4237533241);
        a = II(a, b, c, d, x[k + 12] ?? 0, S41, 1700485571);
        d = II(d, a, b, c, x[k + 3] ?? 0, S42, 2399980690);
        c = II(c, d, a, b, x[k + 10] ?? 0, S43, 4293915773);
        b = II(b, c, d, a, x[k + 1] ?? 0, S44, 2240044497);
        a = II(a, b, c, d, x[k + 8] ?? 0, S41, 1873313359);
        d = II(d, a, b, c, x[k + 15] ?? 0, S42, 4264355552);
        c = II(c, d, a, b, x[k + 6] ?? 0, S43, 2734768916);
        b = II(b, c, d, a, x[k + 13] ?? 0, S44, 1309151649);
        a = II(a, b, c, d, x[k + 4] ?? 0, S41, 4149444226);
        d = II(d, a, b, c, x[k + 11] ?? 0, S42, 3174756917);
        c = II(c, d, a, b, x[k + 2] ?? 0, S43, 718787259);
        b = II(b, c, d, a, x[k + 9] ?? 0, S44, 3951481745);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
      }
      return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
    };
    const computeBLAKE2b = (text) => {
      const context = blake2bInit(32, null);
      blake2bUpdate(context, new TextEncoder().encode(text));
      const result = blake2bFinal(context);
      return bytesToHex(result);
    };
    const computeBcrypt = (text) => {
      const salt = bcrypt__default.genSaltSync(12);
      return bcrypt__default.hashSync(text, salt);
    };
    const computeArgon2 = async (text) => {
      try {
        if (!window.argon2) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2-bundled.min.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Argon2 library"));
            document.head.appendChild(script);
          });
        }
        const salt = new Uint8Array(16);
        crypto.getRandomValues(salt);
        const result = await window.argon2.hash({
          pass: text,
          salt,
          time: 3,
          mem: 65536,
          hashLen: 32,
          parallelism: 1,
          type: window.argon2.ArgonType.Argon2id
        });
        return result.encoded;
      } catch (e) {
        return "Argon2id: " + (e?.message || "computation failed");
      }
    };
    const computePBKDF2 = (text) => {
      const salt = CryptoJS.lib.WordArray.random(16);
      const key = CryptoJS.PBKDF2(text, salt, {
        keySize: 8,
        iterations: 1e5,
        hasher: CryptoJS.algo.SHA256
      });
      return key.toString(CryptoJS.enc.Hex);
    };
    const POSEIDON_PRIME = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617");
    const poseidonArk = (state, c) => {
      return state.map((val, i) => (val + c[i]) % POSEIDON_PRIME);
    };
    const poseidonSBox = (val) => {
      const v2 = val * val % POSEIDON_PRIME;
      const v4 = v2 * v2 % POSEIDON_PRIME;
      return v4 * val % POSEIDON_PRIME;
    };
    const poseidonMix = (state, m) => {
      const newState = [];
      for (let i = 0; i < state.length; i++) {
        let sum = BigInt(0);
        for (let j = 0; j < state.length; j++) {
          sum = (sum + m[i][j] * state[j]) % POSEIDON_PRIME;
        }
        newState.push(sum);
      }
      return newState;
    };
    const generatePoseidonConstants = (seed, count) => {
      const constants = [];
      let h = BigInt(seed);
      for (let i = 0; i < count; i++) {
        h = h * BigInt(65537) % POSEIDON_PRIME;
        constants.push(h);
      }
      return constants;
    };
    const computePoseidon = (text) => {
      const t = 3;
      const nRoundsF = 8;
      const nRoundsP = 57;
      const nRounds = nRoundsF + nRoundsP;
      const allC = generatePoseidonConstants(4660, nRounds * t);
      const allM = Array.from(
        { length: t },
        (_, i) => Array.from({ length: t }, (_2, j) => {
          const seed = BigInt(i * t + j + 22136);
          return seed * seed % POSEIDON_PRIME;
        })
      );
      const encoder = new TextEncoder();
      const bytes = encoder.encode(text);
      let textAsBigint = BigInt(0);
      for (let i = 0; i < bytes.length; i++) {
        textAsBigint = (textAsBigint * BigInt(256) + BigInt(bytes[i])) % POSEIDON_PRIME;
      }
      const state = [BigInt(0), textAsBigint, BigInt(0)];
      for (let r = 0; r < nRoundsF / 2; r++) {
        const c = allC.slice(r * t, r * t + t);
        const st = poseidonArk(state, c);
        const sboxed = st.map(poseidonSBox);
        const mixed = poseidonMix(sboxed, allM);
        for (let i = 0; i < t; i++) state[i] = mixed[i];
      }
      for (let r = nRoundsF / 2; r < nRoundsF / 2 + nRoundsP; r++) {
        const c = allC.slice(r * t, r * t + t);
        const st = poseidonArk(state, c);
        st[0] = poseidonSBox(st[0]);
        const mixed = poseidonMix(st, allM);
        for (let i = 0; i < t; i++) state[i] = mixed[i];
      }
      for (let r = nRoundsF / 2 + nRoundsP; r < nRounds; r++) {
        const c = allC.slice(r * t, r * t + t);
        const st = poseidonArk(state, c);
        const sboxed = st.map(poseidonSBox);
        const mixed = poseidonMix(sboxed, allM);
        for (let i = 0; i < t; i++) state[i] = mixed[i];
      }
      return "0x" + state[0].toString(16).padStart(64, "0");
    };
    const updateHashes = async () => {
      if (!input.value) {
        hashResults.value = {};
        return;
      }
      isComputing.value = true;
      try {
        hashResults.value = {
          MD5: {
            hash: md5(input.value),
            description: "Legacy 128-bit hash — fast but cryptographically broken. Use only for checksums and non-security purposes."
          },
          "SHA-1": {
            hash: await hashText(input.value, "SHA-1"),
            description: "160-bit hash — deprecated for cryptographic use due to collision vulnerabilities."
          },
          "SHA-256": {
            hash: await hashText(input.value, "SHA-256"),
            description: "256-bit hash — the industry standard for digital signatures, certificates, and blockchain."
          },
          "SHA-384": {
            hash: await hashText(input.value, "SHA-384"),
            description: "384-bit hash — stronger variant of SHA-256, used in TLS and government applications."
          },
          "SHA-512": {
            hash: await hashText(input.value, "SHA-512"),
            description: "512-bit hash — highest SHA-2 security, ideal for high-assurance cryptographic systems."
          },
          "BLAKE2b": {
            hash: computeBLAKE2b(input.value),
            description: "Ultra-fast cryptographic hash — faster than MD5 yet more secure than SHA-256. Used in Zcash, WireGuard, and Argon2."
          },
          bcrypt: {
            hash: computeBcrypt(input.value),
            description: "Adaptive password hash with built-in salt and cost factor — the gold standard for password storage since 1999."
          },
          "PBKDF2": {
            hash: computePBKDF2(input.value),
            description: "Password-based key derivation with 100,000 iterations of SHA-256 — widely used in WPA2, Wi-Fi, and encrypted archives."
          },
          "Argon2id": {
            hash: await computeArgon2(input.value),
            description: "Winner of the 2015 Password Hashing Competition — memory-hard, ASIC-resistant, recommended for modern password storage."
          },
          Poseidon: {
            hash: computePoseidon(input.value),
            description: "Zero-knowledge proof optimized hash — used in zkSNARKs, zkSTARKs, and privacy protocols like Filecoin and Mina."
          }
        };
      } finally {
        isComputing.value = false;
      }
    };
    watch(input, updateHashes, { immediate: true });
    const copyHash = (type) => {
      const entry = hashResults.value[type];
      if (entry?.hash) {
        navigator.clipboard.writeText(entry.hash);
        copied.value = type;
        setTimeout(() => copied.value = null, 2e3);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Hash), { class: "w-8 h-8" }, null, _parent));
      _push(` Hash Text </h1><p class="text-muted-foreground mt-2"> Generate cryptographic hashes: MD5, SHA-1, SHA-256, SHA-384, SHA-512, BLAKE2b, bcrypt, PBKDF2, Argon2id, and Poseidon. </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "mb-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Input`);
                      } else {
                        return [
                          createTextVNode("Input")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Enter text to hash`);
                      } else {
                        return [
                          createTextVNode("Enter text to hash")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Input")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Enter text to hash")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: input.value,
                    "onUpdate:modelValue": ($event) => input.value = $event,
                    language: "plaintext",
                    "min-height": "120px",
                    "line-numbers": "off"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: input.value,
                      "onUpdate:modelValue": ($event) => input.value = $event,
                      language: "plaintext",
                      "min-height": "120px",
                      "line-numbers": "off"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Input")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      createTextVNode("Enter text to hash")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: input.value,
                    "onUpdate:modelValue": ($event) => input.value = $event,
                    language: "plaintext",
                    "min-height": "120px",
                    "line-numbers": "off"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (isComputing.value) {
        _push(`<div class="flex items-center justify-center py-4 text-muted-foreground"><div class="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div> Computing hashes... </div>`);
      } else {
        _push(`<!---->`);
      }
      if (Object.keys(hashResults.value).length > 0 && !isComputing.value) {
        _push(ssrRenderComponent(unref(_sfc_main$2), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Hash Results`);
                        } else {
                          return [
                            createTextVNode("Hash Results")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`All hashing is performed client-side. Nothing leaves your browser.`);
                        } else {
                          return [
                            createTextVNode("All hashing is performed client-side. Nothing leaves your browser.")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createTextVNode("Hash Results")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("All hashing is performed client-side. Nothing leaves your browser.")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(hashResults.value, (entry, type) => {
                      _push3(`<div class="p-4 bg-surface-hover rounded-lg border"${_scopeId2}><div class="flex items-center justify-between mb-1"${_scopeId2}><span class="font-semibold text-base"${_scopeId2}>${ssrInterpolate(type)}</span>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$7), {
                        onClick: ($event) => copyHash(type),
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy hash value"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent4, _scopeId3);
                          } else {
                            return [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><p class="text-xs text-muted-foreground mb-2 leading-relaxed"${_scopeId2}>${ssrInterpolate(entry.description)}</p><div class="font-mono text-sm break-all bg-background/50 p-2 rounded"${_scopeId2}>${ssrInterpolate(entry.hash)}</div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(hashResults.value, (entry, type) => {
                        return openBlock(), createBlock("div", {
                          key: type,
                          class: "p-4 bg-surface-hover rounded-lg border"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between mb-1" }, [
                            createVNode("span", { class: "font-semibold text-base" }, toDisplayString(type), 1),
                            createVNode(unref(_sfc_main$7), {
                              onClick: ($event) => copyHash(type),
                              variant: "ghost",
                              size: "sm",
                              "aria-label": "Copy hash value"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          createVNode("p", { class: "text-xs text-muted-foreground mb-2 leading-relaxed" }, toDisplayString(entry.description), 1),
                          createVNode("div", { class: "font-mono text-sm break-all bg-background/50 p-2 rounded" }, toDisplayString(entry.hash), 1)
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Hash Results")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("All hashing is performed client-side. Nothing leaves your browser.")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(hashResults.value, (entry, type) => {
                      return openBlock(), createBlock("div", {
                        key: type,
                        class: "p-4 bg-surface-hover rounded-lg border"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between mb-1" }, [
                          createVNode("span", { class: "font-semibold text-base" }, toDisplayString(type), 1),
                          createVNode(unref(_sfc_main$7), {
                            onClick: ($event) => copyHash(type),
                            variant: "ghost",
                            size: "sm",
                            "aria-label": "Copy hash value"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground mb-2 leading-relaxed" }, toDisplayString(entry.description), 1),
                        createVNode("div", { class: "font-mono text-sm break-all bg-background/50 p-2 rounded" }, toDisplayString(entry.hash), 1)
                      ]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (!isComputing.value) {
        _push(ssrRenderComponent(unref(_sfc_main$2), { class: "border-dashed" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "py-16 text-center text-muted-foreground" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Hash), { class: "w-16 h-16 mx-auto mb-4 opacity-50" }, null, _parent3, _scopeId2));
                    _push3(`<p${_scopeId2}>Enter text above to generate hashes</p>`);
                  } else {
                    return [
                      createVNode(unref(Hash), { class: "w-16 h-16 mx-auto mb-4 opacity-50" }),
                      createVNode("p", null, "Enter text above to generate hashes")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$6), { class: "py-16 text-center text-muted-foreground" }, {
                  default: withCtx(() => [
                    createVNode(unref(Hash), { class: "w-16 h-16 mx-auto mb-4 opacity-50" }),
                    createVNode("p", null, "Enter text above to generate hashes")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/HashTextView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
