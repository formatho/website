import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, withDirectives, vModelSelect, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import CryptoJS from "crypto-js";
import { a as _sfc_main$6, h as _sfc_main$7, c as _sfc_main$8 } from "../main.mjs";
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
  __name: "HmacGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const message = ref("");
    const secretKey = ref("");
    const algorithm = ref("SHA256");
    const hmacResult = ref("");
    const generateHMAC = () => {
      if (!message.value || !secretKey.value) return;
      let hash;
      switch (algorithm.value) {
        case "MD5":
          hash = CryptoJS.HmacMD5(message.value, secretKey.value);
          break;
        case "SHA1":
          hash = CryptoJS.HmacSHA1(message.value, secretKey.value);
          break;
        case "SHA256":
          hash = CryptoJS.HmacSHA256(message.value, secretKey.value);
          break;
        case "SHA384":
          hash = CryptoJS.HmacSHA384(message.value, secretKey.value);
          break;
        case "SHA512":
          hash = CryptoJS.HmacSHA512(message.value, secretKey.value);
          break;
        case "SHA3":
          hash = CryptoJS.HmacSHA3(message.value, secretKey.value);
          break;
        default:
          return;
      }
      hmacResult.value = hash.toString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">HMAC Generator</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate HMAC`);
                      } else {
                        return [
                          createTextVNode("Generate HMAC")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate HMAC")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Algorithm`);
                      } else {
                        return [
                          createTextVNode("Algorithm")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><option value="MD5"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "MD5") : ssrLooseEqual(algorithm.value, "MD5")) ? " selected" : ""}${_scopeId2}>HMAC-MD5</option><option value="SHA1"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "SHA1") : ssrLooseEqual(algorithm.value, "SHA1")) ? " selected" : ""}${_scopeId2}>HMAC-SHA1</option><option value="SHA256"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "SHA256") : ssrLooseEqual(algorithm.value, "SHA256")) ? " selected" : ""}${_scopeId2}>HMAC-SHA256</option><option value="SHA384"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "SHA384") : ssrLooseEqual(algorithm.value, "SHA384")) ? " selected" : ""}${_scopeId2}>HMAC-SHA384</option><option value="SHA512"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "SHA512") : ssrLooseEqual(algorithm.value, "SHA512")) ? " selected" : ""}${_scopeId2}>HMAC-SHA512</option><option value="SHA3"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "SHA3") : ssrLooseEqual(algorithm.value, "SHA3")) ? " selected" : ""}${_scopeId2}>HMAC-SHA3</option></select></div><div class="grid gap-2 md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Secret Key`);
                      } else {
                        return [
                          createTextVNode("Secret Key")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: secretKey.value,
                    "onUpdate:modelValue": ($event) => secretKey.value = $event,
                    type: "password",
                    placeholder: "Enter secret key...",
                    "aria-label": "HMAC secret key"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Message`);
                      } else {
                        return [
                          createTextVNode("Message")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    modelValue: message.value,
                    "onUpdate:modelValue": ($event) => message.value = $event,
                    placeholder: "Enter message to hash...",
                    rows: "4"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    onClick: generateHMAC,
                    class: "w-full md:w-auto",
                    "aria-label": "Generate HMAC"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate HMAC`);
                      } else {
                        return [
                          createTextVNode("Generate HMAC")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (hmacResult.value) {
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`HMAC Result (hex)`);
                        } else {
                          return [
                            createTextVNode("HMAC Result (hex)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      "model-value": hmacResult.value,
                      readonly: "",
                      class: "font-mono text-sm",
                      rows: "3"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Algorithm")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => algorithm.value = $event,
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, [
                          createVNode("option", { value: "MD5" }, "HMAC-MD5"),
                          createVNode("option", { value: "SHA1" }, "HMAC-SHA1"),
                          createVNode("option", { value: "SHA256" }, "HMAC-SHA256"),
                          createVNode("option", { value: "SHA384" }, "HMAC-SHA384"),
                          createVNode("option", { value: "SHA512" }, "HMAC-SHA512"),
                          createVNode("option", { value: "SHA3" }, "HMAC-SHA3")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, algorithm.value]
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2 md:col-span-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Secret Key")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: secretKey.value,
                          "onUpdate:modelValue": ($event) => secretKey.value = $event,
                          type: "password",
                          placeholder: "Enter secret key...",
                          "aria-label": "HMAC secret key"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Message")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        modelValue: message.value,
                        "onUpdate:modelValue": ($event) => message.value = $event,
                        placeholder: "Enter message to hash...",
                        rows: "4"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$8), {
                      onClick: generateHMAC,
                      class: "w-full md:w-auto",
                      "aria-label": "Generate HMAC"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate HMAC")
                      ]),
                      _: 1
                    }),
                    hmacResult.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("HMAC Result (hex)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        "model-value": hmacResult.value,
                        readonly: "",
                        class: "font-mono text-sm",
                        rows: "3"
                      }, null, 8, ["model-value"])
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
                      createTextVNode("Generate HMAC")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Algorithm")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => algorithm.value = $event,
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        createVNode("option", { value: "MD5" }, "HMAC-MD5"),
                        createVNode("option", { value: "SHA1" }, "HMAC-SHA1"),
                        createVNode("option", { value: "SHA256" }, "HMAC-SHA256"),
                        createVNode("option", { value: "SHA384" }, "HMAC-SHA384"),
                        createVNode("option", { value: "SHA512" }, "HMAC-SHA512"),
                        createVNode("option", { value: "SHA3" }, "HMAC-SHA3")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, algorithm.value]
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2 md:col-span-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Secret Key")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: secretKey.value,
                        "onUpdate:modelValue": ($event) => secretKey.value = $event,
                        type: "password",
                        placeholder: "Enter secret key...",
                        "aria-label": "HMAC secret key"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Message")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      modelValue: message.value,
                      "onUpdate:modelValue": ($event) => message.value = $event,
                      placeholder: "Enter message to hash...",
                      rows: "4"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$8), {
                    onClick: generateHMAC,
                    class: "w-full md:w-auto",
                    "aria-label": "Generate HMAC"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Generate HMAC")
                    ]),
                    _: 1
                  }),
                  hmacResult.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-2"
                  }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("HMAC Result (hex)")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      "model-value": hmacResult.value,
                      readonly: "",
                      class: "font-mono text-sm",
                      rows: "3"
                    }, null, 8, ["model-value"])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/HmacGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
