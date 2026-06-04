import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { c as _sfc_main$5 } from "../main.mjs";
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
  __name: "HtmlEntitiesView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputText = ref("");
    const encodedText = ref("");
    const decodedText = ref("");
    const htmlEntities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
      "©": "&copy;",
      "®": "&reg;",
      "™": "&trade;",
      "€": "&euro;",
      "£": "&pound;",
      "¥": "&yen;",
      "¢": "&cent;",
      "§": "&sect;",
      "¶": "&para;",
      "°": "&deg;",
      "±": "&plusmn;",
      "×": "&times;",
      "÷": "&divide;"
    };
    const encode = () => {
      let result = inputText.value;
      for (const [char, entity] of Object.entries(htmlEntities)) {
        result = result.split(char).join(entity);
      }
      result = result.replace(/[^\x00-\x7F]/g, (char) => {
        return `&#${char.charCodeAt(0)};`;
      });
      encodedText.value = result;
    };
    const decode = () => {
      const doc = new DOMParser().parseFromString(inputText.value, "text/html");
      decodedText.value = doc.documentElement.textContent || "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">HTML Entities Encoder/Decoder</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
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
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    language: "html",
                    class: "min-h-[100px]",
                    placeholder: "Enter text to encode or decode..."
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: encode,
                    "aria-label": "Encode HTML entities"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Encode`);
                      } else {
                        return [
                          createTextVNode("Encode")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: decode,
                    variant: "secondary",
                    "aria-label": "Decode HTML entities"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Decode`);
                      } else {
                        return [
                          createTextVNode("Decode")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: inputText.value,
                      "onUpdate:modelValue": ($event) => inputText.value = $event,
                      language: "html",
                      class: "min-h-[100px]",
                      placeholder: "Enter text to encode or decode..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$5), {
                        onClick: encode,
                        "aria-label": "Encode HTML entities"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Encode")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        onClick: decode,
                        variant: "secondary",
                        "aria-label": "Decode HTML entities"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Decode")
                        ]),
                        _: 1
                      })
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
                      createTextVNode("Input")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    language: "html",
                    class: "min-h-[100px]",
                    placeholder: "Enter text to encode or decode..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$5), {
                      onClick: encode,
                      "aria-label": "Encode HTML entities"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Encode")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), {
                      onClick: decode,
                      variant: "secondary",
                      "aria-label": "Decode HTML entities"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Decode")
                      ]),
                      _: 1
                    })
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
                        _push4(`Encoded`);
                      } else {
                        return [
                          createTextVNode("Encoded")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Encoded")
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
                    "model-value": encodedText.value,
                    language: "html",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Encoded result..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": encodedText.value,
                      language: "html",
                      readonly: "",
                      class: "h-full",
                      placeholder: "Encoded result..."
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
                      createTextVNode("Encoded")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": encodedText.value,
                    language: "html",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Encoded result..."
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
                        _push4(`Decoded`);
                      } else {
                        return [
                          createTextVNode("Decoded")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Decoded")
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
                    "model-value": decodedText.value,
                    language: "plaintext",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Decoded result..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": decodedText.value,
                      language: "plaintext",
                      readonly: "",
                      class: "h-full",
                      placeholder: "Decoded result..."
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
                      createTextVNode("Decoded")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": decodedText.value,
                    language: "plaintext",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Decoded result..."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/HtmlEntitiesView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
