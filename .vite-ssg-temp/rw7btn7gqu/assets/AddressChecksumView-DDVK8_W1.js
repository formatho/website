import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { isAddress, getAddress } from "viem";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
import { _ as _sfc_main$5 } from "./Label-Bp2OSpkW.js";
import { Copy } from "lucide-vue-next";
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
const exampleAddress = "0xa1b2c3d4e5f67890abcdef1234567890abcdef12";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AddressChecksumView",
  __ssrInlineRender: true,
  setup(__props) {
    const address = ref("");
    const validationResult = computed(() => {
      if (!address.value) return { status: "empty", checksum: "", original: "", mixed: false };
      if (isAddress(address.value)) {
        const checksummed = getAddress(address.value);
        const isMixedCase = address.value !== address.value.toLowerCase() && address.value !== address.value.toUpperCase();
        return {
          status: "valid",
          checksum: checksummed,
          original: address.value,
          mixed: isMixedCase && address.value !== checksummed
        };
      }
      return { status: "invalid", checksum: "", original: "", mixed: false };
    });
    const copyChecksum = () => {
      if (validationResult.value.status === "valid") {
        navigator.clipboard.writeText(validationResult.value.checksum);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-6 bg-muted/30" }, _attrs))}><div><h1 class="text-3xl font-bold tracking-tight">Ethereum Address Checksum (EIP-55)</h1><p class="text-muted-foreground mt-1">Validate and convert Ethereum addresses to their correct checksummed format. Prevents loss from typos and spoofed addresses.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Input")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ethereum Address`);
                      } else {
                        return [
                          createTextVNode("Ethereum Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: address.value,
                    "onUpdate:modelValue": ($event) => address.value = $event,
                    placeholder: "0x...",
                    "aria-label": "Ethereum address input",
                    class: ["font-mono", {
                      "border-green-500": validationResult.value.status === "valid",
                      "border-destructive": validationResult.value.status === "invalid"
                    }]
                  }, null, _parent3, _scopeId2));
                  if (validationResult.value.status === "invalid") {
                    _push3(`<div class="text-xs text-destructive"${_scopeId2}> Invalid Ethereum Address </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (validationResult.value.mixed) {
                    _push3(`<div class="text-xs text-amber-600 font-medium"${_scopeId2}> ⚠️ Your address has mixed casing that doesn&#39;t match the EIP-55 checksum. The original may be a spoofed address. </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (validationResult.value.status === "valid") {
                    _push3(`<div class="text-xs text-green-600"${_scopeId2}> ✅ Valid address — checksummed version generated below </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => address.value = exampleAddress
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Try Example `);
                      } else {
                        return [
                          createTextVNode(" Try Example ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Ethereum Address")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: address.value,
                      "onUpdate:modelValue": ($event) => address.value = $event,
                      placeholder: "0x...",
                      "aria-label": "Ethereum address input",
                      class: ["font-mono", {
                        "border-green-500": validationResult.value.status === "valid",
                        "border-destructive": validationResult.value.status === "invalid"
                      }]
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    validationResult.value.status === "invalid" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-xs text-destructive"
                    }, " Invalid Ethereum Address ")) : createCommentVNode("", true),
                    validationResult.value.mixed ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-xs text-amber-600 font-medium"
                    }, " ⚠️ Your address has mixed casing that doesn't match the EIP-55 checksum. The original may be a spoofed address. ")) : createCommentVNode("", true),
                    validationResult.value.status === "valid" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-xs text-green-600"
                    }, " ✅ Valid address — checksummed version generated below ")) : createCommentVNode("", true),
                    createVNode(unref(_sfc_main$7), {
                      variant: "outline",
                      size: "sm",
                      onClick: ($event) => address.value = exampleAddress
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Try Example ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Input")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      createTextVNode("Ethereum Address")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$6), {
                    modelValue: address.value,
                    "onUpdate:modelValue": ($event) => address.value = $event,
                    placeholder: "0x...",
                    "aria-label": "Ethereum address input",
                    class: ["font-mono", {
                      "border-green-500": validationResult.value.status === "valid",
                      "border-destructive": validationResult.value.status === "invalid"
                    }]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                  validationResult.value.status === "invalid" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-xs text-destructive"
                  }, " Invalid Ethereum Address ")) : createCommentVNode("", true),
                  validationResult.value.mixed ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-xs text-amber-600 font-medium"
                  }, " ⚠️ Your address has mixed casing that doesn't match the EIP-55 checksum. The original may be a spoofed address. ")) : createCommentVNode("", true),
                  validationResult.value.status === "valid" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "text-xs text-green-600"
                  }, " ✅ Valid address — checksummed version generated below ")) : createCommentVNode("", true),
                  createVNode(unref(_sfc_main$7), {
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => address.value = exampleAddress
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Try Example ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Checksummed Result`);
                      } else {
                        return [
                          createTextVNode("Checksummed Result")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Checksummed Result")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`EIP-55 Checksum Address`);
                      } else {
                        return [
                          createTextVNode("EIP-55 Checksum Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2 relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    readonly: "",
                    value: validationResult.value.checksum,
                    class: "font-mono text-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "ghost",
                    size: "icon",
                    onClick: copyChecksum,
                    "aria-label": "Copy checksummed address",
                    disabled: validationResult.value.status !== "valid"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  if (validationResult.value.status === "valid") {
                    _push3(`<div class="text-xs text-muted-foreground space-y-1"${_scopeId2}><p${_scopeId2}><strong${_scopeId2}>Original:</strong> <code class="font-mono"${_scopeId2}>${ssrInterpolate(validationResult.value.original)}</code></p><p${_scopeId2}><strong${_scopeId2}>Checksummed:</strong> <code class="font-mono"${_scopeId2}>${ssrInterpolate(validationResult.value.checksum)}</code></p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("EIP-55 Checksum Address")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2 relative" }, [
                        createVNode(unref(_sfc_main$6), {
                          readonly: "",
                          value: validationResult.value.checksum,
                          class: "font-mono text-sm"
                        }, null, 8, ["value"]),
                        createVNode(unref(_sfc_main$7), {
                          variant: "ghost",
                          size: "icon",
                          onClick: copyChecksum,
                          "aria-label": "Copy checksummed address",
                          disabled: validationResult.value.status !== "valid"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Copy), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ]),
                    validationResult.value.status === "valid" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-xs text-muted-foreground space-y-1"
                    }, [
                      createVNode("p", null, [
                        createVNode("strong", null, "Original:"),
                        createTextVNode(),
                        createVNode("code", { class: "font-mono" }, toDisplayString(validationResult.value.original), 1)
                      ]),
                      createVNode("p", null, [
                        createVNode("strong", null, "Checksummed:"),
                        createTextVNode(),
                        createVNode("code", { class: "font-mono" }, toDisplayString(validationResult.value.checksum), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Checksummed Result")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("EIP-55 Checksum Address")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2 relative" }, [
                      createVNode(unref(_sfc_main$6), {
                        readonly: "",
                        value: validationResult.value.checksum,
                        class: "font-mono text-sm"
                      }, null, 8, ["value"]),
                      createVNode(unref(_sfc_main$7), {
                        variant: "ghost",
                        size: "icon",
                        onClick: copyChecksum,
                        "aria-label": "Copy checksummed address",
                        disabled: validationResult.value.status !== "valid"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ]),
                  validationResult.value.status === "valid" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-xs text-muted-foreground space-y-1"
                  }, [
                    createVNode("p", null, [
                      createVNode("strong", null, "Original:"),
                      createTextVNode(),
                      createVNode("code", { class: "font-mono" }, toDisplayString(validationResult.value.original), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Checksummed:"),
                      createTextVNode(),
                      createVNode("code", { class: "font-mono" }, toDisplayString(validationResult.value.checksum), 1)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="max-w-5xl mx-auto w-full space-y-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Why Address Checksums Matter`);
                      } else {
                        return [
                          createTextVNode("Why Address Checksums Matter")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                      default: withCtx(() => [
                        createTextVNode("Why Address Checksums Matter")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "prose prose-sm dark:prose-invert max-w-none space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Ethereum addresses are 40-character hexadecimal strings. Without checksums, these addresses are case-insensitive — meaning <code${_scopeId2}>0xab...cd</code> and <code${_scopeId2}>0xAB...CD</code> resolve to the same account. This creates a dangerous attack vector.</p><h3 class="text-lg font-bold mt-4"${_scopeId2}>The Spoofed Address Attack</h3><p${_scopeId2}>An attacker generates a vanity address that looks similar to a known address but uses different capitalization. For example:</p><div class="bg-muted/50 p-3 rounded-md font-mono text-xs space-y-1"${_scopeId2}><p${_scopeId2}><strong class="text-red-500"${_scopeId2}>Spoofed:</strong> 0x<strong${_scopeId2}>A</strong>e7eC8<strong${_scopeId2}>B</strong>3C...d<strong${_scopeId2}>E</strong>4f (attacker&#39;s address)</p><p${_scopeId2}><strong class="text-green-500"${_scopeId2}>Real: </strong> 0x<strong${_scopeId2}>a</strong>E7eC8<strong${_scopeId2}>b</strong>3C...D<strong${_scopeId2}>e</strong>4F (victim&#39;s address)</p></div><p${_scopeId2}>At a glance, they look identical. But the capitalization differs — and on networks without EIP-55 validation, both are treated as valid inputs. A user copies the wrong one, sends funds, and they&#39;re gone forever.</p><h3 class="text-lg font-bold mt-4"${_scopeId2}>Real-World Incidents</h3><ul class="space-y-3"${_scopeId2}><li${_scopeId2}><strong${_scopeId2}>The &quot;Poisoned Address&quot; Attack (2023-2024)</strong> — Attackers sent dust transactions from spoofed addresses to victims&#39; wallets. When the victim later copied an address from their transaction history, they accidentally copied the attacker&#39;s lookalike address. Estimated losses exceeded <strong${_scopeId2}>$100M+</strong> across multiple victims. </li><li${_scopeId2}><strong${_scopeId2}>ENS Name Spoofing</strong> — Attackers registered ENS names similar to well-known entities and generated addresses with matching first/last characters, making manual verification unreliable without checksum validation. </li><li${_scopeId2}><strong${_scopeId2}>Clipboard Hijacking</strong> — Malware replaces copied Ethereum addresses with attacker-controlled addresses that share the same first and last characters. EIP-55 checksum verification catches this because the case pattern won&#39;t match. </li></ul><h3 class="text-lg font-bold mt-4"${_scopeId2}>How EIP-55 Works</h3><p${_scopeId2}>EIP-55 encodes the address using the Keccak-256 hash of the lowercase address itself:</p><ol class="space-y-1 list-decimal list-inside"${_scopeId2}><li${_scopeId2}>Take the lowercase address (without <code${_scopeId2}>0x</code>)</li><li${_scopeId2}>Hash it with Keccak-256</li><li${_scopeId2}>For each character in the address: if the corresponding hash nibble ≥ 8, uppercase it</li><li${_scopeId2}>The result is a mixed-case address where the casing is a cryptographic checksum</li></ol><p${_scopeId2}>Any change to even a single character produces a completely different hash, making the checksum fail. This gives ~15 bits of error detection — catching 99.998% of typos.</p><h3 class="text-lg font-bold mt-4"${_scopeId2}>Protect Yourself</h3><ul class="space-y-1"${_scopeId2}><li${_scopeId2}>Always verify addresses using EIP-55 checksum before sending</li><li${_scopeId2}>Compare the full address, not just first/last characters</li><li${_scopeId2}>Use address book features in wallets for frequent recipients</li><li${_scopeId2}>Test with small amounts first for new addresses</li></ul>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Ethereum addresses are 40-character hexadecimal strings. Without checksums, these addresses are case-insensitive — meaning "),
                      createVNode("code", null, "0xab...cd"),
                      createTextVNode(" and "),
                      createVNode("code", null, "0xAB...CD"),
                      createTextVNode(" resolve to the same account. This creates a dangerous attack vector.")
                    ]),
                    createVNode("h3", { class: "text-lg font-bold mt-4" }, "The Spoofed Address Attack"),
                    createVNode("p", null, "An attacker generates a vanity address that looks similar to a known address but uses different capitalization. For example:"),
                    createVNode("div", { class: "bg-muted/50 p-3 rounded-md font-mono text-xs space-y-1" }, [
                      createVNode("p", null, [
                        createVNode("strong", { class: "text-red-500" }, "Spoofed:"),
                        createTextVNode(" 0x"),
                        createVNode("strong", null, "A"),
                        createTextVNode("e7eC8"),
                        createVNode("strong", null, "B"),
                        createTextVNode("3C...d"),
                        createVNode("strong", null, "E"),
                        createTextVNode("4f (attacker's address)")
                      ]),
                      createVNode("p", null, [
                        createVNode("strong", { class: "text-green-500" }, "Real: "),
                        createTextVNode(" 0x"),
                        createVNode("strong", null, "a"),
                        createTextVNode("E7eC8"),
                        createVNode("strong", null, "b"),
                        createTextVNode("3C...D"),
                        createVNode("strong", null, "e"),
                        createTextVNode("4F (victim's address)")
                      ])
                    ]),
                    createVNode("p", null, "At a glance, they look identical. But the capitalization differs — and on networks without EIP-55 validation, both are treated as valid inputs. A user copies the wrong one, sends funds, and they're gone forever."),
                    createVNode("h3", { class: "text-lg font-bold mt-4" }, "Real-World Incidents"),
                    createVNode("ul", { class: "space-y-3" }, [
                      createVNode("li", null, [
                        createVNode("strong", null, 'The "Poisoned Address" Attack (2023-2024)'),
                        createTextVNode(" — Attackers sent dust transactions from spoofed addresses to victims' wallets. When the victim later copied an address from their transaction history, they accidentally copied the attacker's lookalike address. Estimated losses exceeded "),
                        createVNode("strong", null, "$100M+"),
                        createTextVNode(" across multiple victims. ")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "ENS Name Spoofing"),
                        createTextVNode(" — Attackers registered ENS names similar to well-known entities and generated addresses with matching first/last characters, making manual verification unreliable without checksum validation. ")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Clipboard Hijacking"),
                        createTextVNode(" — Malware replaces copied Ethereum addresses with attacker-controlled addresses that share the same first and last characters. EIP-55 checksum verification catches this because the case pattern won't match. ")
                      ])
                    ]),
                    createVNode("h3", { class: "text-lg font-bold mt-4" }, "How EIP-55 Works"),
                    createVNode("p", null, "EIP-55 encodes the address using the Keccak-256 hash of the lowercase address itself:"),
                    createVNode("ol", { class: "space-y-1 list-decimal list-inside" }, [
                      createVNode("li", null, [
                        createTextVNode("Take the lowercase address (without "),
                        createVNode("code", null, "0x"),
                        createTextVNode(")")
                      ]),
                      createVNode("li", null, "Hash it with Keccak-256"),
                      createVNode("li", null, "For each character in the address: if the corresponding hash nibble ≥ 8, uppercase it"),
                      createVNode("li", null, "The result is a mixed-case address where the casing is a cryptographic checksum")
                    ]),
                    createVNode("p", null, "Any change to even a single character produces a completely different hash, making the checksum fail. This gives ~15 bits of error detection — catching 99.998% of typos."),
                    createVNode("h3", { class: "text-lg font-bold mt-4" }, "Protect Yourself"),
                    createVNode("ul", { class: "space-y-1" }, [
                      createVNode("li", null, "Always verify addresses using EIP-55 checksum before sending"),
                      createVNode("li", null, "Compare the full address, not just first/last characters"),
                      createVNode("li", null, "Use address book features in wallets for frequent recipients"),
                      createVNode("li", null, "Test with small amounts first for new addresses")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx(() => [
                      createTextVNode("Why Address Checksums Matter")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "prose prose-sm dark:prose-invert max-w-none space-y-4" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Ethereum addresses are 40-character hexadecimal strings. Without checksums, these addresses are case-insensitive — meaning "),
                    createVNode("code", null, "0xab...cd"),
                    createTextVNode(" and "),
                    createVNode("code", null, "0xAB...CD"),
                    createTextVNode(" resolve to the same account. This creates a dangerous attack vector.")
                  ]),
                  createVNode("h3", { class: "text-lg font-bold mt-4" }, "The Spoofed Address Attack"),
                  createVNode("p", null, "An attacker generates a vanity address that looks similar to a known address but uses different capitalization. For example:"),
                  createVNode("div", { class: "bg-muted/50 p-3 rounded-md font-mono text-xs space-y-1" }, [
                    createVNode("p", null, [
                      createVNode("strong", { class: "text-red-500" }, "Spoofed:"),
                      createTextVNode(" 0x"),
                      createVNode("strong", null, "A"),
                      createTextVNode("e7eC8"),
                      createVNode("strong", null, "B"),
                      createTextVNode("3C...d"),
                      createVNode("strong", null, "E"),
                      createTextVNode("4f (attacker's address)")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", { class: "text-green-500" }, "Real: "),
                      createTextVNode(" 0x"),
                      createVNode("strong", null, "a"),
                      createTextVNode("E7eC8"),
                      createVNode("strong", null, "b"),
                      createTextVNode("3C...D"),
                      createVNode("strong", null, "e"),
                      createTextVNode("4F (victim's address)")
                    ])
                  ]),
                  createVNode("p", null, "At a glance, they look identical. But the capitalization differs — and on networks without EIP-55 validation, both are treated as valid inputs. A user copies the wrong one, sends funds, and they're gone forever."),
                  createVNode("h3", { class: "text-lg font-bold mt-4" }, "Real-World Incidents"),
                  createVNode("ul", { class: "space-y-3" }, [
                    createVNode("li", null, [
                      createVNode("strong", null, 'The "Poisoned Address" Attack (2023-2024)'),
                      createTextVNode(" — Attackers sent dust transactions from spoofed addresses to victims' wallets. When the victim later copied an address from their transaction history, they accidentally copied the attacker's lookalike address. Estimated losses exceeded "),
                      createVNode("strong", null, "$100M+"),
                      createTextVNode(" across multiple victims. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "ENS Name Spoofing"),
                      createTextVNode(" — Attackers registered ENS names similar to well-known entities and generated addresses with matching first/last characters, making manual verification unreliable without checksum validation. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Clipboard Hijacking"),
                      createTextVNode(" — Malware replaces copied Ethereum addresses with attacker-controlled addresses that share the same first and last characters. EIP-55 checksum verification catches this because the case pattern won't match. ")
                    ])
                  ]),
                  createVNode("h3", { class: "text-lg font-bold mt-4" }, "How EIP-55 Works"),
                  createVNode("p", null, "EIP-55 encodes the address using the Keccak-256 hash of the lowercase address itself:"),
                  createVNode("ol", { class: "space-y-1 list-decimal list-inside" }, [
                    createVNode("li", null, [
                      createTextVNode("Take the lowercase address (without "),
                      createVNode("code", null, "0x"),
                      createTextVNode(")")
                    ]),
                    createVNode("li", null, "Hash it with Keccak-256"),
                    createVNode("li", null, "For each character in the address: if the corresponding hash nibble ≥ 8, uppercase it"),
                    createVNode("li", null, "The result is a mixed-case address where the casing is a cryptographic checksum")
                  ]),
                  createVNode("p", null, "Any change to even a single character produces a completely different hash, making the checksum fail. This gives ~15 bits of error detection — catching 99.998% of typos."),
                  createVNode("h3", { class: "text-lg font-bold mt-4" }, "Protect Yourself"),
                  createVNode("ul", { class: "space-y-1" }, [
                    createVNode("li", null, "Always verify addresses using EIP-55 checksum before sending"),
                    createVNode("li", null, "Compare the full address, not just first/last characters"),
                    createVNode("li", null, "Use address book features in wallets for frequent recipients"),
                    createVNode("li", null, "Test with small amounts first for new addresses")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AddressChecksumView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
