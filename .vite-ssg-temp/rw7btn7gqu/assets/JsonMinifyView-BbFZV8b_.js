import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$5 } from "../main.mjs";
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
  __name: "JsonMinifyView",
  __ssrInlineRender: true,
  setup(__props) {
    const jsonInput = ref("");
    const minifiedOutput = ref("");
    const originalSize = ref(0);
    const minifiedSize = ref(0);
    const error = ref("");
    const minify = () => {
      try {
        error.value = "";
        if (!jsonInput.value.trim()) {
          minifiedOutput.value = "";
          originalSize.value = 0;
          minifiedSize.value = 0;
          return;
        }
        originalSize.value = new Blob([jsonInput.value]).size;
        const parsed = JSON.parse(jsonInput.value);
        minifiedOutput.value = JSON.stringify(parsed);
        minifiedSize.value = new Blob([minifiedOutput.value]).size;
      } catch (e) {
        error.value = e.message || "Invalid JSON";
        minifiedOutput.value = "";
      }
    };
    const copyOutput = () => {
      navigator.clipboard.writeText(minifiedOutput.value);
    };
    watch(jsonInput, minify);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">JSON Minifier</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: "Enter JSON to minify..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: jsonInput.value,
                      "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                      language: "json",
                      class: "h-full",
                      placeholder: "Enter JSON to minify..."
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
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: "Enter JSON to minify..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Minified Output`);
                      } else {
                        return [
                          createTextVNode("Minified Output")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyOutput,
                    disabled: !minifiedOutput.value,
                    "aria-label": "Copy minified JSON"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Copy`);
                      } else {
                        return [
                          createTextVNode("Copy")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Minified Output")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), {
                      variant: "outline",
                      size: "sm",
                      onClick: copyOutput,
                      disabled: !minifiedOutput.value,
                      "aria-label": "Copy minified JSON"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    "model-value": minifiedOutput.value,
                    language: "json",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Minified JSON will appear here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": minifiedOutput.value,
                      language: "json",
                      readonly: "",
                      class: "h-full",
                      placeholder: "Minified JSON will appear here..."
                    }, null, 8, ["model-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Minified Output")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$5), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyOutput,
                    disabled: !minifiedOutput.value,
                    "aria-label": "Copy minified JSON"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Copy")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": minifiedOutput.value,
                    language: "json",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Minified JSON will appear here..."
                  }, null, 8, ["model-value"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (minifiedOutput.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Original Size</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(originalSize.value)} bytes</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Original Size"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(originalSize.value) + " bytes", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Original Size"),
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(originalSize.value) + " bytes", 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Minified Size</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(minifiedSize.value)} bytes</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Minified Size"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(minifiedSize.value) + " bytes", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Minified Size"),
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(minifiedSize.value) + " bytes", 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Saved</div><div class="text-2xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(((1 - minifiedSize.value / originalSize.value) * 100).toFixed(1))}% </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Saved"),
                      createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(((1 - minifiedSize.value / originalSize.value) * 100).toFixed(1)) + "% ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Saved"),
                    createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(((1 - minifiedSize.value / originalSize.value) * 100).toFixed(1)) + "% ", 1)
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
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">${ssrInterpolate(error.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/JsonMinifyView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
