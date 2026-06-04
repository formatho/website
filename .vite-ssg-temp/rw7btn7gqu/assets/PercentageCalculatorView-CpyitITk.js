import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, resolveDynamicComponent, createBlock, openBlock, createCommentVNode, withDirectives, vModelText, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderVNode, ssrRenderClass } from "vue/server-renderer";
import { Percent, Check, Copy } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$6 } from "../main.mjs";
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
  __name: "PercentageCalculatorView",
  __ssrInlineRender: true,
  setup(__props) {
    const percent1 = ref("");
    const value1 = ref("");
    const value2a = ref("");
    const value2b = ref("");
    const value3a = ref("");
    const value3b = ref("");
    const fromValue = ref("");
    const toValue = ref("");
    const copied = ref(null);
    const result1 = computed(() => {
      if (!percent1.value || !value1.value) return null;
      return parseFloat(percent1.value) / 100 * parseFloat(value1.value);
    });
    const result2 = computed(() => {
      if (!value2a.value || !value2b.value) return null;
      return parseFloat(value2a.value) / parseFloat(value2b.value) * 100;
    });
    const result3 = computed(() => {
      if (!value3a.value || !value3b.value) return null;
      return parseFloat(value3a.value) / (parseFloat(value3b.value) / 100);
    });
    const result4 = computed(() => {
      if (!fromValue.value || !toValue.value) return null;
      const from = parseFloat(fromValue.value);
      const to = parseFloat(toValue.value);
      return (to - from) / from * 100;
    });
    const copyResult = (id, value) => {
      navigator.clipboard.writeText(value.toFixed(2));
      copied.value = id;
      setTimeout(() => copied.value = null, 2e3);
    };
    const formatNumber = (num) => {
      return num.toFixed(2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Percent), { class: "w-8 h-8" }, null, _parent));
      _push(` Percentage Calculator </h1><p class="text-muted-foreground mt-2"> Calculate percentages, percentage change, and more. </p></div><div class="space-y-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`What is X% of Y?`);
                      } else {
                        return [
                          createTextVNode("What is X% of Y?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Find a percentage of a value`);
                      } else {
                        return [
                          createTextVNode("Find a percentage of a value")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("What is X% of Y?")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Find a percentage of a value")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-4 items-end"${_scopeId2}><div class="flex-1"${_scopeId2}><label class="block text-sm mb-2"${_scopeId2}>Percentage</label><div class="relative"${_scopeId2}><input${ssrRenderAttr("value", percent1.value)} type="number" placeholder="25" class="w-full px-3 py-2 border rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><span class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"${_scopeId2}>%</span></div></div><div class="text-lg font-bold mb-2"${_scopeId2}>of</div><div class="flex-1"${_scopeId2}><label class="block text-sm mb-2"${_scopeId2}>Value</label><input${ssrRenderAttr("value", value1.value)} type="number" placeholder="200" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div></div>`);
                  if (result1.value !== null) {
                    _push3(`<div class="p-4 bg-surface-hover rounded-lg border flex items-center justify-between"${_scopeId2}><div${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Result</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(formatNumber(result1.value))}</div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: ($event) => copyResult("1", result1.value),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy result"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === "1" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent4, _scopeId3);
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === "1" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4 items-end" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("label", { class: "block text-sm mb-2" }, "Percentage"),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => percent1.value = $event,
                            type: "number",
                            placeholder: "25",
                            class: "w-full px-3 py-2 border rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, percent1.value]
                          ]),
                          createVNode("span", { class: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" }, "%")
                        ])
                      ]),
                      createVNode("div", { class: "text-lg font-bold mb-2" }, "of"),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("label", { class: "block text-sm mb-2" }, "Value"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => value1.value = $event,
                          type: "number",
                          placeholder: "200",
                          class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, value1.value]
                        ])
                      ])
                    ]),
                    result1.value !== null ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
                    }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Result"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(result1.value)), 1)
                      ]),
                      createVNode(unref(_sfc_main$6), {
                        onClick: ($event) => copyResult("1", result1.value),
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy result"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value === "1" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
                      createTextVNode("What is X% of Y?")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Find a percentage of a value")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4 items-end" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("label", { class: "block text-sm mb-2" }, "Percentage"),
                      createVNode("div", { class: "relative" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => percent1.value = $event,
                          type: "number",
                          placeholder: "25",
                          class: "w-full px-3 py-2 border rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, percent1.value]
                        ]),
                        createVNode("span", { class: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" }, "%")
                      ])
                    ]),
                    createVNode("div", { class: "text-lg font-bold mb-2" }, "of"),
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("label", { class: "block text-sm mb-2" }, "Value"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => value1.value = $event,
                        type: "number",
                        placeholder: "200",
                        class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, value1.value]
                      ])
                    ])
                  ]),
                  result1.value !== null ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
                  }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Result"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(result1.value)), 1)
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: ($event) => copyResult("1", result1.value),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy result"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(copied.value === "1" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : createCommentVNode("", true)
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
                        _push4(`X is what % of Y?`);
                      } else {
                        return [
                          createTextVNode("X is what % of Y?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Find what percentage one value is of another`);
                      } else {
                        return [
                          createTextVNode("Find what percentage one value is of another")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("X is what % of Y?")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Find what percentage one value is of another")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-4 items-end"${_scopeId2}><div class="flex-1"${_scopeId2}><label class="block text-sm mb-2"${_scopeId2}>Value</label><input${ssrRenderAttr("value", value2a.value)} type="number" placeholder="50" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div><div class="text-lg font-bold mb-2"${_scopeId2}>is what % of</div><div class="flex-1"${_scopeId2}><label class="block text-sm mb-2"${_scopeId2}>Total</label><input${ssrRenderAttr("value", value2b.value)} type="number" placeholder="200" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div></div>`);
                  if (result2.value !== null) {
                    _push3(`<div class="p-4 bg-surface-hover rounded-lg border flex items-center justify-between"${_scopeId2}><div${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Result</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(formatNumber(result2.value))}%</div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: ($event) => copyResult("2", result2.value),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy result"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === "2" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent4, _scopeId3);
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === "2" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4 items-end" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("label", { class: "block text-sm mb-2" }, "Value"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => value2a.value = $event,
                          type: "number",
                          placeholder: "50",
                          class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, value2a.value]
                        ])
                      ]),
                      createVNode("div", { class: "text-lg font-bold mb-2" }, "is what % of"),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("label", { class: "block text-sm mb-2" }, "Total"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => value2b.value = $event,
                          type: "number",
                          placeholder: "200",
                          class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, value2b.value]
                        ])
                      ])
                    ]),
                    result2.value !== null ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
                    }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Result"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(result2.value)) + "%", 1)
                      ]),
                      createVNode(unref(_sfc_main$6), {
                        onClick: ($event) => copyResult("2", result2.value),
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy result"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value === "2" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
                      createTextVNode("X is what % of Y?")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Find what percentage one value is of another")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4 items-end" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("label", { class: "block text-sm mb-2" }, "Value"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => value2a.value = $event,
                        type: "number",
                        placeholder: "50",
                        class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, value2a.value]
                      ])
                    ]),
                    createVNode("div", { class: "text-lg font-bold mb-2" }, "is what % of"),
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("label", { class: "block text-sm mb-2" }, "Total"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => value2b.value = $event,
                        type: "number",
                        placeholder: "200",
                        class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, value2b.value]
                      ])
                    ])
                  ]),
                  result2.value !== null ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
                  }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Result"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(result2.value)) + "%", 1)
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: ($event) => copyResult("2", result2.value),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy result"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(copied.value === "2" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : createCommentVNode("", true)
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
                        _push4(`X is Y% of what?`);
                      } else {
                        return [
                          createTextVNode("X is Y% of what?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Find the original value`);
                      } else {
                        return [
                          createTextVNode("Find the original value")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("X is Y% of what?")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Find the original value")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-4 items-end"${_scopeId2}><div class="flex-1"${_scopeId2}><label class="block text-sm mb-2"${_scopeId2}>Value</label><input${ssrRenderAttr("value", value3a.value)} type="number" placeholder="50" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div><div class="text-lg font-bold mb-2"${_scopeId2}>is</div><div class="flex-1"${_scopeId2}><label class="block text-sm mb-2"${_scopeId2}>Percentage</label><div class="relative"${_scopeId2}><input${ssrRenderAttr("value", value3b.value)} type="number" placeholder="25" class="w-full px-3 py-2 border rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><span class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"${_scopeId2}>%</span></div></div></div>`);
                  if (result3.value !== null) {
                    _push3(`<div class="p-4 bg-surface-hover rounded-lg border flex items-center justify-between"${_scopeId2}><div${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Result</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(formatNumber(result3.value))}</div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: ($event) => copyResult("3", result3.value),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy result"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === "3" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent4, _scopeId3);
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === "3" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4 items-end" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("label", { class: "block text-sm mb-2" }, "Value"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => value3a.value = $event,
                          type: "number",
                          placeholder: "50",
                          class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, value3a.value]
                        ])
                      ]),
                      createVNode("div", { class: "text-lg font-bold mb-2" }, "is"),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("label", { class: "block text-sm mb-2" }, "Percentage"),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => value3b.value = $event,
                            type: "number",
                            placeholder: "25",
                            class: "w-full px-3 py-2 border rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, value3b.value]
                          ]),
                          createVNode("span", { class: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" }, "%")
                        ])
                      ])
                    ]),
                    result3.value !== null ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
                    }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Result"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(result3.value)), 1)
                      ]),
                      createVNode(unref(_sfc_main$6), {
                        onClick: ($event) => copyResult("3", result3.value),
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy result"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value === "3" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
                      createTextVNode("X is Y% of what?")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Find the original value")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4 items-end" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("label", { class: "block text-sm mb-2" }, "Value"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => value3a.value = $event,
                        type: "number",
                        placeholder: "50",
                        class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, value3a.value]
                      ])
                    ]),
                    createVNode("div", { class: "text-lg font-bold mb-2" }, "is"),
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("label", { class: "block text-sm mb-2" }, "Percentage"),
                      createVNode("div", { class: "relative" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => value3b.value = $event,
                          type: "number",
                          placeholder: "25",
                          class: "w-full px-3 py-2 border rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, value3b.value]
                        ]),
                        createVNode("span", { class: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" }, "%")
                      ])
                    ])
                  ]),
                  result3.value !== null ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
                  }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Result"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(result3.value)), 1)
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: ($event) => copyResult("3", result3.value),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy result"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(copied.value === "3" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : createCommentVNode("", true)
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
                        _push4(`Percentage Change`);
                      } else {
                        return [
                          createTextVNode("Percentage Change")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Calculate percentage increase or decrease`);
                      } else {
                        return [
                          createTextVNode("Calculate percentage increase or decrease")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Percentage Change")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Calculate percentage increase or decrease")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-4 items-end"${_scopeId2}><div class="flex-1"${_scopeId2}><label class="block text-sm mb-2"${_scopeId2}>From</label><input${ssrRenderAttr("value", fromValue.value)} type="number" placeholder="100" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div><div class="text-lg font-bold mb-2"${_scopeId2}>→</div><div class="flex-1"${_scopeId2}><label class="block text-sm mb-2"${_scopeId2}>To</label><input${ssrRenderAttr("value", toValue.value)} type="number" placeholder="150" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div></div>`);
                  if (result4.value !== null) {
                    _push3(`<div class="p-4 bg-surface-hover rounded-lg border flex items-center justify-between"${_scopeId2}><div${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Change</div><div class="${ssrRenderClass([result4.value >= 0 ? "text-green-500" : "text-red-500", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate(result4.value >= 0 ? "+" : "")}${ssrInterpolate(formatNumber(result4.value))}% </div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: ($event) => copyResult("4", result4.value),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy result"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === "4" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent4, _scopeId3);
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === "4" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4 items-end" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("label", { class: "block text-sm mb-2" }, "From"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => fromValue.value = $event,
                          type: "number",
                          placeholder: "100",
                          class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, fromValue.value]
                        ])
                      ]),
                      createVNode("div", { class: "text-lg font-bold mb-2" }, "→"),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("label", { class: "block text-sm mb-2" }, "To"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => toValue.value = $event,
                          type: "number",
                          placeholder: "150",
                          class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, toValue.value]
                        ])
                      ])
                    ]),
                    result4.value !== null ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
                    }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Change"),
                        createVNode("div", {
                          class: ["text-2xl font-bold", result4.value >= 0 ? "text-green-500" : "text-red-500"]
                        }, toDisplayString(result4.value >= 0 ? "+" : "") + toDisplayString(formatNumber(result4.value)) + "% ", 3)
                      ]),
                      createVNode(unref(_sfc_main$6), {
                        onClick: ($event) => copyResult("4", result4.value),
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy result"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value === "4" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
                      createTextVNode("Percentage Change")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Calculate percentage increase or decrease")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4 items-end" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("label", { class: "block text-sm mb-2" }, "From"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => fromValue.value = $event,
                        type: "number",
                        placeholder: "100",
                        class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, fromValue.value]
                      ])
                    ]),
                    createVNode("div", { class: "text-lg font-bold mb-2" }, "→"),
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("label", { class: "block text-sm mb-2" }, "To"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => toValue.value = $event,
                        type: "number",
                        placeholder: "150",
                        class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, toValue.value]
                      ])
                    ])
                  ]),
                  result4.value !== null ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
                  }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Change"),
                      createVNode("div", {
                        class: ["text-2xl font-bold", result4.value >= 0 ? "text-green-500" : "text-red-500"]
                      }, toDisplayString(result4.value >= 0 ? "+" : "") + toDisplayString(formatNumber(result4.value)) + "% ", 3)
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: ($event) => copyResult("4", result4.value),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy result"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(copied.value === "4" ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PercentageCalculatorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
