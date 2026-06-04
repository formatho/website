import { defineComponent, ref, onMounted, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelSelect, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import * as bip39 from "bip39";
import { c as _sfc_main$6, h as _sfc_main$7, a as _sfc_main$8 } from "../main.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { _ as _sfc_main$5 } from "./Label-Bp2OSpkW.js";
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
  __name: "Bip39GeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const wordCount = ref(12);
    const mnemonic = ref("");
    const seed = ref("");
    const passphrase = ref("");
    const entropy = ref("");
    const isReady = ref(false);
    const generateMnemonic = () => {
      const strength = wordCount.value === 12 ? 128 : wordCount.value === 15 ? 160 : wordCount.value === 18 ? 192 : wordCount.value === 21 ? 224 : 256;
      mnemonic.value = bip39.generateMnemonic(strength);
      updateSeed();
    };
    const updateSeed = async () => {
      if (mnemonic.value) {
        try {
          const seedBytes = await bip39.mnemonicToSeed(mnemonic.value, passphrase.value);
          seed.value = Array.from(seedBytes).map((b) => b.toString(16).padStart(2, "0")).join("");
        } catch (err) {
          console.error("Seed derivation failed:", err);
          seed.value = "Error deriving seed";
        }
      }
    };
    const validateMnemonic = () => {
      return mnemonic.value ? bip39.validateMnemonic(mnemonic.value) : false;
    };
    onMounted(() => {
      isReady.value = true;
      generateMnemonic();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">BIP39 Mnemonic Generator</h1></div>`);
      if (isReady.value) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Generate Mnemonic`);
                        } else {
                          return [
                            createTextVNode("Generate Mnemonic")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Generate Mnemonic")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Word Count`);
                        } else {
                          return [
                            createTextVNode("Word Count")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<select aria-label="Mnemonic word count" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><option${ssrRenderAttr("value", 12)}${ssrIncludeBooleanAttr(Array.isArray(wordCount.value) ? ssrLooseContain(wordCount.value, 12) : ssrLooseEqual(wordCount.value, 12)) ? " selected" : ""}${_scopeId2}>12 words</option><option${ssrRenderAttr("value", 15)}${ssrIncludeBooleanAttr(Array.isArray(wordCount.value) ? ssrLooseContain(wordCount.value, 15) : ssrLooseEqual(wordCount.value, 15)) ? " selected" : ""}${_scopeId2}>15 words</option><option${ssrRenderAttr("value", 18)}${ssrIncludeBooleanAttr(Array.isArray(wordCount.value) ? ssrLooseContain(wordCount.value, 18) : ssrLooseEqual(wordCount.value, 18)) ? " selected" : ""}${_scopeId2}>18 words</option><option${ssrRenderAttr("value", 21)}${ssrIncludeBooleanAttr(Array.isArray(wordCount.value) ? ssrLooseContain(wordCount.value, 21) : ssrLooseEqual(wordCount.value, 21)) ? " selected" : ""}${_scopeId2}>21 words</option><option${ssrRenderAttr("value", 24)}${ssrIncludeBooleanAttr(Array.isArray(wordCount.value) ? ssrLooseContain(wordCount.value, 24) : ssrLooseEqual(wordCount.value, 24)) ? " selected" : ""}${_scopeId2}>24 words</option></select></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: generateMnemonic,
                      class: "w-full",
                      "aria-label": "Generate new BIP39 mnemonic"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Generate New Mnemonic`);
                        } else {
                          return [
                            createTextVNode("Generate New Mnemonic")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Mnemonic Phrase`);
                        } else {
                          return [
                            createTextVNode("Mnemonic Phrase")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      modelValue: mnemonic.value,
                      "onUpdate:modelValue": ($event) => mnemonic.value = $event,
                      onInput: updateSeed,
                      rows: "4",
                      "aria-label": "BIP39 mnemonic phrase",
                      class: "font-mono",
                      placeholder: "Enter or generate mnemonic..."
                    }, null, _parent3, _scopeId2));
                    if (mnemonic.value) {
                      _push3(`<div class="${ssrRenderClass(["text-sm", validateMnemonic() ? "text-green-600" : "text-red-600"])}"${_scopeId2}>${ssrInterpolate(validateMnemonic() ? "✓ Valid BIP39 mnemonic" : "✗ Invalid mnemonic")}</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Word Count")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => wordCount.value = $event,
                          "aria-label": "Mnemonic word count",
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, [
                          createVNode("option", { value: 12 }, "12 words"),
                          createVNode("option", { value: 15 }, "15 words"),
                          createVNode("option", { value: 18 }, "18 words"),
                          createVNode("option", { value: 21 }, "21 words"),
                          createVNode("option", { value: 24 }, "24 words")
                        ], 8, ["onUpdate:modelValue"]), [
                          [
                            vModelSelect,
                            wordCount.value,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ]),
                      createVNode(unref(_sfc_main$6), {
                        onClick: generateMnemonic,
                        class: "w-full",
                        "aria-label": "Generate new BIP39 mnemonic"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Generate New Mnemonic")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Mnemonic Phrase")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          modelValue: mnemonic.value,
                          "onUpdate:modelValue": ($event) => mnemonic.value = $event,
                          onInput: updateSeed,
                          rows: "4",
                          "aria-label": "BIP39 mnemonic phrase",
                          class: "font-mono",
                          placeholder: "Enter or generate mnemonic..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        mnemonic.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: ["text-sm", validateMnemonic() ? "text-green-600" : "text-red-600"]
                        }, toDisplayString(validateMnemonic() ? "✓ Valid BIP39 mnemonic" : "✗ Invalid mnemonic"), 3)) : createCommentVNode("", true)
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
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate Mnemonic")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Word Count")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => wordCount.value = $event,
                        "aria-label": "Mnemonic word count",
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        createVNode("option", { value: 12 }, "12 words"),
                        createVNode("option", { value: 15 }, "15 words"),
                        createVNode("option", { value: 18 }, "18 words"),
                        createVNode("option", { value: 21 }, "21 words"),
                        createVNode("option", { value: 24 }, "24 words")
                      ], 8, ["onUpdate:modelValue"]), [
                        [
                          vModelSelect,
                          wordCount.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: generateMnemonic,
                      class: "w-full",
                      "aria-label": "Generate new BIP39 mnemonic"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate New Mnemonic")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Mnemonic Phrase")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        modelValue: mnemonic.value,
                        "onUpdate:modelValue": ($event) => mnemonic.value = $event,
                        onInput: updateSeed,
                        rows: "4",
                        "aria-label": "BIP39 mnemonic phrase",
                        class: "font-mono",
                        placeholder: "Enter or generate mnemonic..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      mnemonic.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: ["text-sm", validateMnemonic() ? "text-green-600" : "text-red-600"]
                      }, toDisplayString(validateMnemonic() ? "✓ Valid BIP39 mnemonic" : "✗ Invalid mnemonic"), 3)) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Derive Seed`);
                        } else {
                          return [
                            createTextVNode("Derive Seed")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Derive Seed")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Passphrase (optional)`);
                        } else {
                          return [
                            createTextVNode("Passphrase (optional)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$8), {
                      modelValue: passphrase.value,
                      "onUpdate:modelValue": ($event) => passphrase.value = $event,
                      onInput: updateSeed,
                      type: "password",
                      "aria-label": "BIP39 passphrase",
                      placeholder: "Enter passphrase..."
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Seed (hex)`);
                        } else {
                          return [
                            createTextVNode("Seed (hex)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      "model-value": seed.value,
                      readonly: "",
                      "aria-label": "Derived seed hex",
                      rows: "8",
                      class: "font-mono text-xs"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Entropy (hex)`);
                        } else {
                          return [
                            createTextVNode("Entropy (hex)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      "model-value": entropy.value,
                      readonly: "",
                      "aria-label": "Entropy hex",
                      rows: "3",
                      class: "font-mono text-xs"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Passphrase (optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: passphrase.value,
                          "onUpdate:modelValue": ($event) => passphrase.value = $event,
                          onInput: updateSeed,
                          type: "password",
                          "aria-label": "BIP39 passphrase",
                          placeholder: "Enter passphrase..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Seed (hex)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          "model-value": seed.value,
                          readonly: "",
                          "aria-label": "Derived seed hex",
                          rows: "8",
                          class: "font-mono text-xs"
                        }, null, 8, ["model-value"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Entropy (hex)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          "model-value": entropy.value,
                          readonly: "",
                          "aria-label": "Entropy hex",
                          rows: "3",
                          class: "font-mono text-xs"
                        }, null, 8, ["model-value"])
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
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Derive Seed")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Passphrase (optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: passphrase.value,
                        "onUpdate:modelValue": ($event) => passphrase.value = $event,
                        onInput: updateSeed,
                        type: "password",
                        "aria-label": "BIP39 passphrase",
                        placeholder: "Enter passphrase..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Seed (hex)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        "model-value": seed.value,
                        readonly: "",
                        "aria-label": "Derived seed hex",
                        rows: "8",
                        class: "font-mono text-xs"
                      }, null, 8, ["model-value"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Entropy (hex)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        "model-value": entropy.value,
                        readonly: "",
                        "aria-label": "Entropy hex",
                        rows: "3",
                        class: "font-mono text-xs"
                      }, null, 8, ["model-value"])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="flex items-center justify-center py-20 text-muted-foreground"> Loading... </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Bip39GeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
