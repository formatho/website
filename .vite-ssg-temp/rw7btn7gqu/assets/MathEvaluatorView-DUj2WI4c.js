import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, resolveDynamicComponent, createBlock, openBlock, toDisplayString, withDirectives, withKeys, vModelText, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderVNode, ssrRenderList } from "vue/server-renderer";
import { Calculator, Trash2, Check, Copy } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$6 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$5 } from "../main.mjs";
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
  __name: "MathEvaluatorView",
  __ssrInlineRender: true,
  setup(__props) {
    const expression = ref("");
    const history = ref([]);
    const copied = ref(false);
    const evaluateExpression = (expr) => {
      try {
        const mathFunctions = {
          abs: Math.abs,
          ceil: Math.ceil,
          floor: Math.floor,
          round: Math.round,
          sqrt: Math.sqrt,
          cbrt: Math.cbrt,
          pow: Math.pow,
          log: Math.log,
          log10: Math.log10,
          log2: Math.log2,
          exp: Math.exp,
          sin: Math.sin,
          cos: Math.cos,
          tan: Math.tan,
          asin: Math.asin,
          acos: Math.acos,
          atan: Math.atan,
          sinh: Math.sinh,
          cosh: Math.cosh,
          tanh: Math.tanh,
          PI: Math.PI,
          E: Math.E
        };
        let processed = expr;
        for (const name of Object.keys(mathFunctions)) {
          const regex = new RegExp(name, "gi");
          processed = processed.replace(regex, `Math.${name}`);
        }
        processed = processed.replace(/\^/g, "**");
        const result2 = Function(`"use strict"; return (${processed})`)();
        if (typeof result2 === "number" && !isNaN(result2)) {
          return Number.isInteger(result2) ? result2.toString() : result2.toFixed(10).replace(/\.?0+$/, "");
        }
        return "Error";
      } catch {
        return "Error";
      }
    };
    const result = computed(() => {
      if (!expression.value.trim()) return "";
      return evaluateExpression(expression.value);
    });
    const addToHistory = () => {
      if (expression.value && result.value && result.value !== "Error") {
        history.value.unshift({
          expr: expression.value,
          result: result.value
        });
        if (history.value.length > 10) {
          history.value.pop();
        }
      }
    };
    const copyResult = () => {
      navigator.clipboard.writeText(result.value);
      copied.value = true;
      setTimeout(() => copied.value = false, 2e3);
    };
    const insertChar = (char) => {
      expression.value += char;
    };
    const clearExpression = () => {
      expression.value = "";
    };
    const backspace = () => {
      expression.value = expression.value.slice(0, -1);
    };
    const useHistoryItem = (item) => {
      expression.value = item.expr;
    };
    const buttons = [
      ["7", "8", "9", "/", "(", ")"],
      ["4", "5", "6", "*", "PI", "E"],
      ["1", "2", "3", "-", "sqrt(", "pow("],
      ["0", ".", "%", "+", "^", "abs("]
    ];
    const functions = [
      "sin(",
      "cos(",
      "tan(",
      "log(",
      "log10(",
      "log2(",
      "ceil(",
      "floor(",
      "round(",
      "exp(",
      "cbrt(",
      "min("
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Calculator), { class: "w-8 h-8" }, null, _parent));
      _push(` Math Evaluator </h1><p class="text-muted-foreground mt-2"> Evaluate mathematical expressions with support for functions and constants. </p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "lg:col-span-2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Expression`);
                      } else {
                        return [
                          createTextVNode("Expression")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Expression")
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
                  _push3(`<div class="relative"${_scopeId2}><input${ssrRenderAttr("value", expression.value)} type="text" placeholder="Enter expression..." class="w-full px-3 py-4 border rounded-lg font-mono text-xl focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: backspace,
                    variant: "ghost",
                    size: "sm",
                    "aria-label": "Backspace"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`←`);
                      } else {
                        return [
                          createTextVNode("←")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: clearExpression,
                    variant: "ghost",
                    size: "sm",
                    "aria-label": "Clear expression"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Trash2), { class: "w-4 h-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="p-4 bg-surface-hover rounded-lg border"${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Result</div><div class="font-mono text-3xl font-bold flex items-center justify-between"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(result.value || "—")}</span>`);
                  if (result.value && result.value !== "Error") {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      onClick: copyResult,
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy result"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-5 h-5" }, null), _parent4, _scopeId3);
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-5 h-5" }))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(buttons, (row) => {
                    _push3(`<div class="flex gap-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(row, (btn) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        key: btn,
                        onClick: ($event) => insertChar(btn),
                        variant: "outline",
                        "aria-label": "Insert " + btn,
                        class: "flex-1 h-12 text-lg font-mono"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(btn)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(btn), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  });
                  _push3(`<!--]-->`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: addToHistory,
                    class: "w-full h-12",
                    "aria-label": "Calculate expression"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` = Calculate `);
                      } else {
                        return [
                          createTextVNode(" = Calculate ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><div class="text-sm text-muted-foreground mb-2"${_scopeId2}>Functions</div><div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(functions, (fn) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      key: fn,
                      onClick: ($event) => insertChar(fn),
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Insert function " + fn,
                      class: "font-mono"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(fn)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(fn), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => expression.value = $event,
                        onKeyup: withKeys(addToHistory, ["enter"]),
                        type: "text",
                        placeholder: "Enter expression...",
                        class: "w-full px-3 py-4 border rounded-lg font-mono text-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, expression.value]
                      ]),
                      createVNode("div", { class: "absolute right-2 top-1/2 -translate-y-1/2 flex gap-1" }, [
                        createVNode(unref(_sfc_main$5), {
                          onClick: backspace,
                          variant: "ghost",
                          size: "sm",
                          "aria-label": "Backspace"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("←")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          onClick: clearExpression,
                          variant: "ghost",
                          size: "sm",
                          "aria-label": "Clear expression"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "w-4 h-4" })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "p-4 bg-surface-hover rounded-lg border" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Result"),
                      createVNode("div", { class: "font-mono text-3xl font-bold flex items-center justify-between" }, [
                        createVNode("span", null, toDisplayString(result.value || "—"), 1),
                        result.value && result.value !== "Error" ? (openBlock(), createBlock(unref(_sfc_main$5), {
                          key: 0,
                          onClick: copyResult,
                          variant: "ghost",
                          size: "sm",
                          "aria-label": "Copy result"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-5 h-5" }))
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(buttons, (row) => {
                        return createVNode("div", {
                          key: row.join(),
                          class: "flex gap-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(row, (btn) => {
                            return openBlock(), createBlock(unref(_sfc_main$5), {
                              key: btn,
                              onClick: ($event) => insertChar(btn),
                              variant: "outline",
                              "aria-label": "Insert " + btn,
                              class: "flex-1 h-12 text-lg font-mono"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(btn), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick", "aria-label"]);
                          }), 128))
                        ]);
                      }), 64)),
                      createVNode(unref(_sfc_main$5), {
                        onClick: addToHistory,
                        class: "w-full h-12",
                        "aria-label": "Calculate expression"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" = Calculate ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Functions"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(functions, (fn) => {
                          return createVNode(unref(_sfc_main$5), {
                            key: fn,
                            onClick: ($event) => insertChar(fn),
                            variant: "outline",
                            size: "sm",
                            "aria-label": "Insert function " + fn,
                            class: "font-mono"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(fn), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick", "aria-label"]);
                        }), 64))
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
                      createTextVNode("Expression")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "relative" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => expression.value = $event,
                      onKeyup: withKeys(addToHistory, ["enter"]),
                      type: "text",
                      placeholder: "Enter expression...",
                      class: "w-full px-3 py-4 border rounded-lg font-mono text-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    }, null, 40, ["onUpdate:modelValue"]), [
                      [vModelText, expression.value]
                    ]),
                    createVNode("div", { class: "absolute right-2 top-1/2 -translate-y-1/2 flex gap-1" }, [
                      createVNode(unref(_sfc_main$5), {
                        onClick: backspace,
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Backspace"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("←")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        onClick: clearExpression,
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Clear expression"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Trash2), { class: "w-4 h-4" })
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "p-4 bg-surface-hover rounded-lg border" }, [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Result"),
                    createVNode("div", { class: "font-mono text-3xl font-bold flex items-center justify-between" }, [
                      createVNode("span", null, toDisplayString(result.value || "—"), 1),
                      result.value && result.value !== "Error" ? (openBlock(), createBlock(unref(_sfc_main$5), {
                        key: 0,
                        onClick: copyResult,
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy result"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-5 h-5" }))
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(buttons, (row) => {
                      return createVNode("div", {
                        key: row.join(),
                        class: "flex gap-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(row, (btn) => {
                          return openBlock(), createBlock(unref(_sfc_main$5), {
                            key: btn,
                            onClick: ($event) => insertChar(btn),
                            variant: "outline",
                            "aria-label": "Insert " + btn,
                            class: "flex-1 h-12 text-lg font-mono"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(btn), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick", "aria-label"]);
                        }), 128))
                      ]);
                    }), 64)),
                    createVNode(unref(_sfc_main$5), {
                      onClick: addToHistory,
                      class: "w-full h-12",
                      "aria-label": "Calculate expression"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" = Calculate ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Functions"),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(functions, (fn) => {
                        return createVNode(unref(_sfc_main$5), {
                          key: fn,
                          onClick: ($event) => insertChar(fn),
                          variant: "outline",
                          size: "sm",
                          "aria-label": "Insert function " + fn,
                          class: "font-mono"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(fn), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "aria-label"]);
                      }), 64))
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
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`History`);
                      } else {
                        return [
                          createTextVNode("History")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Recent calculations`);
                      } else {
                        return [
                          createTextVNode("Recent calculations")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("History")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createTextVNode("Recent calculations")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (history.value.length > 0) {
                    _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(history.value, (item, index) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        key: index,
                        onClick: ($event) => useHistoryItem(item),
                        variant: "ghost",
                        "aria-label": "Use history item: " + item.expr + " equals " + item.result,
                        class: "w-full p-4 h-auto bg-surface-hover rounded-lg border text-left hover:bg-surface transition-colors flex-col items-start"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="font-mono text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(item.expr)}</div><div class="font-mono text-lg font-bold"${_scopeId3}>= ${ssrInterpolate(item.result)}</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "font-mono text-sm text-muted-foreground" }, toDisplayString(item.expr), 1),
                              createVNode("div", { class: "font-mono text-lg font-bold" }, "= " + toDisplayString(item.result), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="text-center py-8 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Calculator), { class: "w-12 h-12 mx-auto mb-2 opacity-50" }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-sm"${_scopeId2}>No calculations yet</p></div>`);
                  }
                } else {
                  return [
                    history.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(history.value, (item, index) => {
                        return openBlock(), createBlock(unref(_sfc_main$5), {
                          key: index,
                          onClick: ($event) => useHistoryItem(item),
                          variant: "ghost",
                          "aria-label": "Use history item: " + item.expr + " equals " + item.result,
                          class: "w-full p-4 h-auto bg-surface-hover rounded-lg border text-left hover:bg-surface transition-colors flex-col items-start"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "font-mono text-sm text-muted-foreground" }, toDisplayString(item.expr), 1),
                            createVNode("div", { class: "font-mono text-lg font-bold" }, "= " + toDisplayString(item.result), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "aria-label"]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-8 text-muted-foreground"
                    }, [
                      createVNode(unref(Calculator), { class: "w-12 h-12 mx-auto mb-2 opacity-50" }),
                      createVNode("p", { class: "text-sm" }, "No calculations yet")
                    ]))
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
                      createTextVNode("History")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createTextVNode("Recent calculations")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  history.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(history.value, (item, index) => {
                      return openBlock(), createBlock(unref(_sfc_main$5), {
                        key: index,
                        onClick: ($event) => useHistoryItem(item),
                        variant: "ghost",
                        "aria-label": "Use history item: " + item.expr + " equals " + item.result,
                        class: "w-full p-4 h-auto bg-surface-hover rounded-lg border text-left hover:bg-surface transition-colors flex-col items-start"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "font-mono text-sm text-muted-foreground" }, toDisplayString(item.expr), 1),
                          createVNode("div", { class: "font-mono text-lg font-bold" }, "= " + toDisplayString(item.result), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "aria-label"]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-8 text-muted-foreground"
                  }, [
                    createVNode(unref(Calculator), { class: "w-12 h-12 mx-auto mb-2 opacity-50" }),
                    createVNode("p", { class: "text-sm" }, "No calculations yet")
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/MathEvaluatorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
