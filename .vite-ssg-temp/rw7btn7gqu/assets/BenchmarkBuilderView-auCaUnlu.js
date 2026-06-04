import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelText, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { h as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
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
  __name: "BenchmarkBuilderView",
  __ssrInlineRender: true,
  setup(__props) {
    const codeInput = ref("");
    const results = ref([]);
    const iterations = ref(1e3);
    const runBenchmark = async () => {
      results.value = [];
      if (!codeInput.value.trim()) return;
      try {
        const fn = new Function(
          "iterations",
          `
      const start = performance.now();
      ${codeInput.value}
      const end = performance.now();
      return end - start;
    `
        );
        const time = fn(iterations);
        results.value.push({
          name: "Benchmark",
          time
        });
      } catch (e) {
        results.value.push({
          name: "Error",
          time: 0,
          error: e.message
        });
      }
    };
    const runComparison = async () => {
      results.value = [];
      const implementations = codeInput.value.split(/\/\/\s*---+\s*/).filter((s) => s.trim());
      if (implementations.length === 0) return;
      for (let i = 0; i < implementations.length; i++) {
        const code = implementations[i];
        const nameMatch = code?.match(/\/\/\s*name:\s*(.+)/i);
        const name = nameMatch?.[1]?.trim() ?? `Implementation ${i + 1}`;
        try {
          const fn = new Function(
            "iterations",
            `
        const start = performance.now();
        ${code}
        const end = performance.now();
        return end - start;
      `
          );
          const time = fn(iterations);
          results.value.push({ name, time });
        } catch (e) {
          results.value.push({ name, time: 0, error: e.message });
        }
      }
      results.value.sort((a, b) => a.time - b.time);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Benchmark Builder</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Code Benchmark`);
                      } else {
                        return [
                          createTextVNode("Code Benchmark")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Code Benchmark")
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
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Iterations`);
                      } else {
                        return [
                          createTextVNode("Iterations")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<input${ssrRenderAttr("value", iterations.value)} type="number" aria-label="Number of iterations" min="1" class="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}></div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`JavaScript Code`);
                      } else {
                        return [
                          createTextVNode("JavaScript Code")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: codeInput.value,
                    "onUpdate:modelValue": ($event) => codeInput.value = $event,
                    rows: "8",
                    "aria-label": "JavaScript code to benchmark",
                    placeholder: "// Enter JavaScript code to benchmark\n// Use 'iterations' variable for loop count\nfor (let i = 0; i < iterations; i++) {\n  // your code here\n}\n\n// For comparison, separate implementations with // ---",
                    class: "font-mono text-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: runBenchmark,
                    "aria-label": "Run performance benchmark"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Run Benchmark`);
                      } else {
                        return [
                          createTextVNode("Run Benchmark")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "outline",
                    onClick: runComparison,
                    "aria-label": "Compare implementations"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Compare Implementations`);
                      } else {
                        return [
                          createTextVNode("Compare Implementations")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Iterations")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => iterations.value = $event,
                        type: "number",
                        "aria-label": "Number of iterations",
                        min: "1",
                        class: "flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          iterations.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("JavaScript Code")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: codeInput.value,
                        "onUpdate:modelValue": ($event) => codeInput.value = $event,
                        rows: "8",
                        "aria-label": "JavaScript code to benchmark",
                        placeholder: "// Enter JavaScript code to benchmark\n// Use 'iterations' variable for loop count\nfor (let i = 0; i < iterations; i++) {\n  // your code here\n}\n\n// For comparison, separate implementations with // ---",
                        class: "font-mono text-sm"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$7), {
                        onClick: runBenchmark,
                        "aria-label": "Run performance benchmark"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Run Benchmark")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        onClick: runComparison,
                        "aria-label": "Compare implementations"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Compare Implementations")
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
                      createTextVNode("Code Benchmark")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Iterations")
                      ]),
                      _: 1
                    }),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => iterations.value = $event,
                      type: "number",
                      "aria-label": "Number of iterations",
                      min: "1",
                      class: "flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [
                        vModelText,
                        iterations.value,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("JavaScript Code")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: codeInput.value,
                      "onUpdate:modelValue": ($event) => codeInput.value = $event,
                      rows: "8",
                      "aria-label": "JavaScript code to benchmark",
                      placeholder: "// Enter JavaScript code to benchmark\n// Use 'iterations' variable for loop count\nfor (let i = 0; i < iterations; i++) {\n  // your code here\n}\n\n// For comparison, separate implementations with // ---",
                      class: "font-mono text-sm"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$7), {
                      onClick: runBenchmark,
                      "aria-label": "Run performance benchmark"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Run Benchmark")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      variant: "outline",
                      onClick: runComparison,
                      "aria-label": "Compare implementations"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Compare Implementations")
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
      if (results.value.length > 0) {
        _push(`<div class="space-y-2"><!--[-->`);
        ssrRenderList(results.value, (result, idx) => {
          _push(ssrRenderComponent(unref(_sfc_main$1), { key: idx }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex justify-between items-center"${_scopeId2}><div${_scopeId2}><div class="font-semibold"${_scopeId2}>${ssrInterpolate(result.name)}</div>`);
                      if (result.error) {
                        _push3(`<div class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(result.error)}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      if (!result.error) {
                        _push3(`<div class="text-right"${_scopeId2}><div class="text-2xl font-bold font-mono"${_scopeId2}>${ssrInterpolate(result.time.toFixed(3))} ms</div><div class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate((result.time / iterations.value).toFixed(6))} ms/op </div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      if (!result.error && results.value.length > 1) {
                        _push3(`<div class="mt-2"${_scopeId2}><div class="h-2 bg-muted rounded-full overflow-hidden"${_scopeId2}><div class="h-full bg-primary transition-all" style="${ssrRenderStyle({ width: `${result.time / (results.value[0]?.time ?? 1) * 100}%` })}"${_scopeId2}></div></div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "font-semibold" }, toDisplayString(result.name), 1),
                            result.error ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(result.error), 1)) : createCommentVNode("", true)
                          ]),
                          !result.error ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-right"
                          }, [
                            createVNode("div", { class: "text-2xl font-bold font-mono" }, toDisplayString(result.time.toFixed(3)) + " ms", 1),
                            createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString((result.time / iterations.value).toFixed(6)) + " ms/op ", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        !result.error && results.value.length > 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2"
                        }, [
                          createVNode("div", { class: "h-2 bg-muted rounded-full overflow-hidden" }, [
                            createVNode("div", {
                              class: "h-full bg-primary transition-all",
                              style: { width: `${result.time / (results.value[0]?.time ?? 1) * 100}%` }
                            }, null, 4)
                          ])
                        ])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold" }, toDisplayString(result.name), 1),
                          result.error ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(result.error), 1)) : createCommentVNode("", true)
                        ]),
                        !result.error ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-right"
                        }, [
                          createVNode("div", { class: "text-2xl font-bold font-mono" }, toDisplayString(result.time.toFixed(3)) + " ms", 1),
                          createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString((result.time / iterations.value).toFixed(6)) + " ms/op ", 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      !result.error && results.value.length > 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-2"
                      }, [
                        createVNode("div", { class: "h-2 bg-muted rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: "h-full bg-primary transition-all",
                            style: { width: `${result.time / (results.value[0]?.time ?? 1) * 100}%` }
                          }, null, 4)
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BenchmarkBuilderView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
