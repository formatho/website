import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
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
  __name: "JsonDiffView",
  __ssrInlineRender: true,
  setup(__props) {
    const json1 = ref("");
    const json2 = ref("");
    const diffResult = ref("");
    const compareJson = (obj1, obj2, path = "") => {
      const diffs = [];
      if (typeof obj1 !== typeof obj2) {
        diffs.push({ path, type: "changed", oldValue: obj1, newValue: obj2 });
        return diffs;
      }
      if (obj1 === null || obj2 === null) {
        if (obj1 !== obj2) {
          diffs.push({ path, type: "changed", oldValue: obj1, newValue: obj2 });
        }
        return diffs;
      }
      if (typeof obj1 !== "object") {
        if (obj1 !== obj2) {
          diffs.push({ path, type: "changed", oldValue: obj1, newValue: obj2 });
        }
        return diffs;
      }
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      const allKeys = /* @__PURE__ */ new Set([...keys1, ...keys2]);
      for (const key of allKeys) {
        const newPath = path ? `${path}.${key}` : key;
        if (!(key in obj1)) {
          diffs.push({ path: newPath, type: "added", newValue: obj2[key] });
        } else if (!(key in obj2)) {
          diffs.push({ path: newPath, type: "removed", oldValue: obj1[key] });
        } else {
          diffs.push(...compareJson(obj1[key], obj2[key], newPath));
        }
      }
      return diffs;
    };
    const compare = () => {
      try {
        const parsed1 = JSON.parse(json1.value);
        const parsed2 = JSON.parse(json2.value);
        const diffs = compareJson(parsed1, parsed2);
        if (diffs.length === 0) {
          diffResult.value = "✓ JSON objects are identical";
        } else {
          diffResult.value = diffs.map((d) => {
            if (d.type === "added") {
              return `+ ${d.path}: ${JSON.stringify(d.newValue)}`;
            } else if (d.type === "removed") {
              return `- ${d.path}: ${JSON.stringify(d.oldValue)}`;
            } else {
              return `~ ${d.path}: ${JSON.stringify(d.oldValue)} → ${JSON.stringify(d.newValue)}`;
            }
          }).join("\n");
        }
      } catch (e) {
        diffResult.value = `Error: ${e.message}`;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">JSON Diff</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`JSON 1`);
                      } else {
                        return [
                          createTextVNode("JSON 1")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("JSON 1")
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
                    modelValue: json1.value,
                    "onUpdate:modelValue": ($event) => json1.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: "Enter first JSON..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: json1.value,
                      "onUpdate:modelValue": ($event) => json1.value = $event,
                      language: "json",
                      class: "h-full",
                      placeholder: "Enter first JSON..."
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
                      createTextVNode("JSON 1")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: json1.value,
                    "onUpdate:modelValue": ($event) => json1.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: "Enter first JSON..."
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`JSON 2`);
                      } else {
                        return [
                          createTextVNode("JSON 2")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("JSON 2")
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
                    modelValue: json2.value,
                    "onUpdate:modelValue": ($event) => json2.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: "Enter second JSON..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: json2.value,
                      "onUpdate:modelValue": ($event) => json2.value = $event,
                      language: "json",
                      class: "h-full",
                      placeholder: "Enter second JSON..."
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
                      createTextVNode("JSON 2")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: json2.value,
                    "onUpdate:modelValue": ($event) => json2.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: "Enter second JSON..."
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
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: compare,
                    class: "w-full md:w-auto",
                    "aria-label": "Compare JSON documents"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Compare`);
                      } else {
                        return [
                          createTextVNode("Compare")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (diffResult.value) {
                    _push3(`<div class="p-4 rounded-lg bg-muted font-mono text-sm whitespace-pre-wrap"${_scopeId2}>${ssrInterpolate(diffResult.value)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), {
                      onClick: compare,
                      class: "w-full md:w-auto",
                      "aria-label": "Compare JSON documents"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Compare")
                      ]),
                      _: 1
                    }),
                    diffResult.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 rounded-lg bg-muted font-mono text-sm whitespace-pre-wrap"
                    }, toDisplayString(diffResult.value), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "pt-6 space-y-4" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), {
                    onClick: compare,
                    class: "w-full md:w-auto",
                    "aria-label": "Compare JSON documents"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Compare")
                    ]),
                    _: 1
                  }),
                  diffResult.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 rounded-lg bg-muted font-mono text-sm whitespace-pre-wrap"
                  }, toDisplayString(diffResult.value), 1)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/JsonDiffView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
