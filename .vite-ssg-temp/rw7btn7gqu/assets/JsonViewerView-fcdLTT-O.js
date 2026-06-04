import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { f as useTwins, c as _sfc_main$1 } from "../main.mjs";
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
  __name: "JsonViewerView",
  __ssrInlineRender: true,
  setup(__props) {
    const { summonTwin } = useTwins();
    const jsonInput = ref("");
    const jsonOutput = ref("");
    const error = ref("");
    const formatJson = () => {
      try {
        error.value = "";
        if (!jsonInput.value.trim()) {
          jsonOutput.value = "";
          return;
        }
        const parsed = JSON.parse(jsonInput.value);
        jsonOutput.value = JSON.stringify(parsed, null, 2);
        summonTwin("memo", "Data parsed and secured.", "json-format-success", {
          x: "right",
          y: "bottom"
        });
      } catch (e) {
        error.value = e.message || "Invalid JSON";
      }
    };
    const minifyJson = () => {
      try {
        error.value = "";
        if (!jsonInput.value.trim()) {
          jsonOutput.value = "";
          return;
        }
        const parsed = JSON.parse(jsonInput.value);
        jsonOutput.value = JSON.stringify(parsed);
        summonTwin("memo", "Data parsed and secured.", "json-minify-success", {
          x: "right",
          y: "bottom"
        });
      } catch (e) {
        error.value = e.message || "Invalid JSON";
      }
    };
    const copyOutput = () => {
      navigator.clipboard.writeText(jsonOutput.value);
    };
    watch(jsonInput, formatJson);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">JSON Viewer/Formatter</h1></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: formatJson,
        "aria-label": "Format JSON with pretty printing"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Format (Pretty)`);
          } else {
            return [
              createTextVNode("Format (Pretty)")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: minifyJson,
        variant: "outline",
        "aria-label": "Minify JSON to compact format"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Minify`);
          } else {
            return [
              createTextVNode("Minify")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0" }, {
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    language: "json",
                    "min-height": "300px",
                    "max-height": "100%"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: jsonInput.value,
                      "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                      language: "json",
                      "min-height": "300px",
                      "max-height": "100%"
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
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    language: "json",
                    "min-height": "300px",
                    "max-height": "100%"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Output`);
                      } else {
                        return [
                          createTextVNode("Output")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyOutput,
                    disabled: !jsonOutput.value
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
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Output")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), {
                      variant: "outline",
                      size: "sm",
                      onClick: copyOutput,
                      disabled: !jsonOutput.value
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
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: jsonOutput.value,
                    "onUpdate:modelValue": ($event) => jsonOutput.value = $event,
                    language: "json",
                    readonly: true,
                    "min-height": "300px",
                    "max-height": "100%"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: jsonOutput.value,
                      "onUpdate:modelValue": ($event) => jsonOutput.value = $event,
                      language: "json",
                      readonly: true,
                      "min-height": "300px",
                      "max-height": "100%"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "flex-row items-center justify-between" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Output")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$1), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyOutput,
                    disabled: !jsonOutput.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Copy")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: jsonOutput.value,
                    "onUpdate:modelValue": ($event) => jsonOutput.value = $event,
                    language: "json",
                    readonly: true,
                    "min-height": "300px",
                    "max-height": "100%"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/JsonViewerView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
