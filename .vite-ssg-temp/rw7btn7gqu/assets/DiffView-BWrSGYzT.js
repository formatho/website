import { defineComponent, ref, watch, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import * as Diff from "diff";
import { f as useTwins, c as _sfc_main$1 } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
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
  __name: "DiffView",
  __ssrInlineRender: true,
  setup(__props) {
    const { summonTwin } = useTwins();
    const originalText = ref("");
    const modifiedText = ref("");
    const diffResult = ref([]);
    const computeDiff = () => {
      if (!originalText.value && !modifiedText.value) {
        diffResult.value = [];
        return;
      }
      const diffs = Diff.diffLines(originalText.value, modifiedText.value);
      diffResult.value = diffs;
      if (originalText.value && modifiedText.value) {
        summonTwin("flowtho", "Process flows perfectly. Diff computed.", "diff-success", {
          x: "right",
          y: "bottom"
        });
      }
    };
    watch([originalText, modifiedText], computeDiff);
    const processedLines = computed(() => {
      const lines = [];
      diffResult.value.forEach((part) => {
        const split = part.value.split("\n");
        if (part.value.endsWith("\n")) {
          split.pop();
        }
        split.forEach((line) => {
          lines.push({
            type: part.added ? "added" : part.removed ? "removed" : "unchanged",
            value: line
          });
        });
      });
      return lines;
    });
    const fillSample = () => {
      originalText.value = `Hello World
This is a test file.
It has some lines.
Some deleted lines.
Unchanged footer.`;
      modifiedText.value = `Hello World!
This is a test file.
It has changed lines.
New added lines.
Unchanged footer.`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Diff Checker</h1>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "ghost",
        onClick: fillSample,
        "aria-label": "Load sample diff comparison data"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Load Sample`);
          } else {
            return [
              createTextVNode("Load Sample")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0"><div class="flex flex-col gap-4 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-1 flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "py-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Original Text`);
                      } else {
                        return [
                          createTextVNode("Original Text")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Original Text")
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
                    modelValue: originalText.value,
                    "onUpdate:modelValue": ($event) => originalText.value = $event,
                    language: "plaintext",
                    "min-height": "200px",
                    "line-numbers": "on"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: originalText.value,
                      "onUpdate:modelValue": ($event) => originalText.value = $event,
                      language: "plaintext",
                      "min-height": "200px",
                      "line-numbers": "on"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "py-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Original Text")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: originalText.value,
                    "onUpdate:modelValue": ($event) => originalText.value = $event,
                    language: "plaintext",
                    "min-height": "200px",
                    "line-numbers": "on"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-1 flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "py-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Modified Text`);
                      } else {
                        return [
                          createTextVNode("Modified Text")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Modified Text")
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
                    modelValue: modifiedText.value,
                    "onUpdate:modelValue": ($event) => modifiedText.value = $event,
                    language: "plaintext",
                    "min-height": "200px",
                    "line-numbers": "on"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: modifiedText.value,
                      "onUpdate:modelValue": ($event) => modifiedText.value = $event,
                      language: "plaintext",
                      "min-height": "200px",
                      "line-numbers": "on"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "py-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Modified Text")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: modifiedText.value,
                    "onUpdate:modelValue": ($event) => modifiedText.value = $event,
                    language: "plaintext",
                    "min-height": "200px",
                    "line-numbers": "on"
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
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0 bg-background/50" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "py-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Difference`);
                      } else {
                        return [
                          createTextVNode("Difference")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Difference")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0 overflow-auto p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="font-mono text-sm w-full min-w-max"${_scopeId2}><!--[-->`);
                  ssrRenderList(processedLines.value, (line, index) => {
                    _push3(`<div class="${ssrRenderClass([{
                      "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300": line.type === "added",
                      "bg-red-500/20 text-red-800 dark:text-red-300": line.type === "removed",
                      "text-muted-foreground": line.type === "unchanged"
                    }, "flex w-full px-4 py-0.5 whitespace-pre"])}"${_scopeId2}><span class="select-none w-6 inline-block opacity-50"${_scopeId2}>${ssrInterpolate(line.type === "added" ? "+" : line.type === "removed" ? "-" : " ")}</span><span${_scopeId2}>${ssrInterpolate(line.value)}</span></div>`);
                  });
                  _push3(`<!--]-->`);
                  if (processedLines.value.length === 0) {
                    _push3(`<div class="p-4 text-muted-foreground italic text-center"${_scopeId2}> Enter text to see differences </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "font-mono text-sm w-full min-w-max" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(processedLines.value, (line, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: ["flex w-full px-4 py-0.5 whitespace-pre", {
                            "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300": line.type === "added",
                            "bg-red-500/20 text-red-800 dark:text-red-300": line.type === "removed",
                            "text-muted-foreground": line.type === "unchanged"
                          }]
                        }, [
                          createVNode("span", { class: "select-none w-6 inline-block opacity-50" }, toDisplayString(line.type === "added" ? "+" : line.type === "removed" ? "-" : " "), 1),
                          createVNode("span", null, toDisplayString(line.value), 1)
                        ], 2);
                      }), 128)),
                      processedLines.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-4 text-muted-foreground italic text-center"
                      }, " Enter text to see differences ")) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "py-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Difference")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0 overflow-auto p-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "font-mono text-sm w-full min-w-max" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(processedLines.value, (line, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: ["flex w-full px-4 py-0.5 whitespace-pre", {
                          "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300": line.type === "added",
                          "bg-red-500/20 text-red-800 dark:text-red-300": line.type === "removed",
                          "text-muted-foreground": line.type === "unchanged"
                        }]
                      }, [
                        createVNode("span", { class: "select-none w-6 inline-block opacity-50" }, toDisplayString(line.type === "added" ? "+" : line.type === "removed" ? "-" : " "), 1),
                        createVNode("span", null, toDisplayString(line.value), 1)
                      ], 2);
                    }), 128)),
                    processedLines.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 text-muted-foreground italic text-center"
                    }, " Enter text to see differences ")) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/DiffView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
