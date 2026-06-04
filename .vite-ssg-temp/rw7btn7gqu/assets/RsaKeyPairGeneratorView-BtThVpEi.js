import { defineComponent, ref, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
import { c as _sfc_main$5 } from "../main.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
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
  __name: "RsaKeyPairGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const keySize = ref(2048);
    const publicKey = ref("");
    const privateKey = ref("");
    const generating = ref(false);
    const generateKeyPair = async () => {
      generating.value = true;
      try {
        const keyPair = await window.crypto.subtle.generateKey(
          {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: keySize.value,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
          },
          true,
          ["sign", "verify"]
        );
        const publicKeyData = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
        const privateKeyData = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
        publicKey.value = arrayBufferToPem(publicKeyData, "PUBLIC KEY");
        privateKey.value = arrayBufferToPem(privateKeyData, "PRIVATE KEY");
      } catch (e) {
        console.error(e);
      } finally {
        generating.value = false;
      }
    };
    const arrayBufferToPem = (buffer, label) => {
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      const lines = base64.match(/.{1,64}/g) || [];
      return `-----BEGIN ${label}-----
${lines.join("\n")}
-----END ${label}-----`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = resolveComponent("Label");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">RSA Key Pair Generator</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate RSA Key Pair`);
                      } else {
                        return [
                          createTextVNode("Generate RSA Key Pair")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate RSA Key Pair")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Label, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Key Size (bits)`);
                      } else {
                        return [
                          createTextVNode("Key Size (bits)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><option${ssrRenderAttr("value", 2048)}${ssrIncludeBooleanAttr(Array.isArray(keySize.value) ? ssrLooseContain(keySize.value, 2048) : ssrLooseEqual(keySize.value, 2048)) ? " selected" : ""}${_scopeId2}>2048 bits</option><option${ssrRenderAttr("value", 3072)}${ssrIncludeBooleanAttr(Array.isArray(keySize.value) ? ssrLooseContain(keySize.value, 3072) : ssrLooseEqual(keySize.value, 3072)) ? " selected" : ""}${_scopeId2}>3072 bits</option><option${ssrRenderAttr("value", 4096)}${ssrIncludeBooleanAttr(Array.isArray(keySize.value) ? ssrLooseContain(keySize.value, 4096) : ssrLooseEqual(keySize.value, 4096)) ? " selected" : ""}${_scopeId2}>4096 bits</option></select></div><div class="flex items-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: generateKeyPair,
                    disabled: generating.value,
                    class: "w-full",
                    "aria-label": "Generate RSA key pair"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(generating.value ? "Generating..." : "Generate Key Pair")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(generating.value ? "Generating..." : "Generate Key Pair"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(_component_Label, null, {
                          default: withCtx(() => [
                            createTextVNode("Key Size (bits)")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => keySize.value = $event,
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, [
                          createVNode("option", { value: 2048 }, "2048 bits"),
                          createVNode("option", { value: 3072 }, "3072 bits"),
                          createVNode("option", { value: 4096 }, "4096 bits")
                        ], 8, ["onUpdate:modelValue"]), [
                          [
                            vModelSelect,
                            keySize.value,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ]),
                      createVNode("div", { class: "flex items-end" }, [
                        createVNode(unref(_sfc_main$5), {
                          onClick: generateKeyPair,
                          disabled: generating.value,
                          class: "w-full",
                          "aria-label": "Generate RSA key pair"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(generating.value ? "Generating..." : "Generate Key Pair"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
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
                      createTextVNode("Generate RSA Key Pair")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(_component_Label, null, {
                        default: withCtx(() => [
                          createTextVNode("Key Size (bits)")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => keySize.value = $event,
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        createVNode("option", { value: 2048 }, "2048 bits"),
                        createVNode("option", { value: 3072 }, "3072 bits"),
                        createVNode("option", { value: 4096 }, "4096 bits")
                      ], 8, ["onUpdate:modelValue"]), [
                        [
                          vModelSelect,
                          keySize.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createVNode("div", { class: "flex items-end" }, [
                      createVNode(unref(_sfc_main$5), {
                        onClick: generateKeyPair,
                        disabled: generating.value,
                        class: "w-full",
                        "aria-label": "Generate RSA key pair"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(generating.value ? "Generating..." : "Generate Key Pair"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
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
                        _push4(`Public Key (PEM)`);
                      } else {
                        return [
                          createTextVNode("Public Key (PEM)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Public Key (PEM)")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    "model-value": publicKey.value,
                    language: "plaintext",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Public key will appear here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": publicKey.value,
                      language: "plaintext",
                      readonly: "",
                      class: "h-full",
                      placeholder: "Public key will appear here..."
                    }, null, 8, ["model-value"])
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
                      createTextVNode("Public Key (PEM)")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": publicKey.value,
                    language: "plaintext",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Public key will appear here..."
                  }, null, 8, ["model-value"])
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
                        _push4(`Private Key (PEM)`);
                      } else {
                        return [
                          createTextVNode("Private Key (PEM)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Private Key (PEM)")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    "model-value": privateKey.value,
                    language: "plaintext",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Private key will appear here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": privateKey.value,
                      language: "plaintext",
                      readonly: "",
                      class: "h-full",
                      placeholder: "Private key will appear here..."
                    }, null, 8, ["model-value"])
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
                      createTextVNode("Private Key (PEM)")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": privateKey.value,
                    language: "plaintext",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Private key will appear here..."
                  }, null, 8, ["model-value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/RsaKeyPairGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
