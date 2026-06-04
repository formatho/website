import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { keccak256, toHex, stringToBytes } from "viem";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "KeccakHasherView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputText = ref("");
    const hash = computed(() => {
      if (!inputText.value) return "";
      try {
        return keccak256(toHex(stringToBytes(inputText.value)));
      } catch (e) {
        return "Invalid Input";
      }
    });
    const copyHash = () => {
      if (hash.value) {
        navigator.clipboard.writeText(hash.value);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Keccak-256 Hasher</h1></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">`);
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
                        _push4(`Text to Hash`);
                      } else {
                        return [
                          createTextVNode("Text to Hash")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    language: "plaintext",
                    class: "min-h-[160px]",
                    placeholder: "Enter text to hash..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Text to Hash")
                      ]),
                      _: 1
                    }),
                    createVNode(CodeEditor, {
                      modelValue: inputText.value,
                      "onUpdate:modelValue": ($event) => inputText.value = $event,
                      language: "plaintext",
                      class: "min-h-[160px]",
                      placeholder: "Enter text to hash..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createTextVNode("Text to Hash")
                    ]),
                    _: 1
                  }),
                  createVNode(CodeEditor, {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    language: "plaintext",
                    class: "min-h-[160px]",
                    placeholder: "Enter text to hash..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`Output (Byte32)`);
                      } else {
                        return [
                          createTextVNode("Output (Byte32)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Output (Byte32)")
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
                        _push4(`Keccak-256 Hash`);
                      } else {
                        return [
                          createTextVNode("Keccak-256 Hash")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    readonly: "",
                    value: hash.value,
                    class: "font-mono text-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "ghost",
                    size: "icon",
                    onClick: copyHash,
                    "aria-label": "Copy hash"
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
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Keccak-256 Hash")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$6), {
                          readonly: "",
                          value: hash.value,
                          class: "font-mono text-sm"
                        }, null, 8, ["value"]),
                        createVNode(unref(_sfc_main$7), {
                          variant: "ghost",
                          size: "icon",
                          onClick: copyHash,
                          "aria-label": "Copy hash"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Copy), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        })
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
                      createTextVNode("Output (Byte32)")
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
                        createTextVNode("Keccak-256 Hash")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$6), {
                        readonly: "",
                        value: hash.value,
                        class: "font-mono text-sm"
                      }, null, 8, ["value"]),
                      createVNode(unref(_sfc_main$7), {
                        variant: "ghost",
                        size: "icon",
                        onClick: copyHash,
                        "aria-label": "Copy hash"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      })
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/KeccakHasherView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
