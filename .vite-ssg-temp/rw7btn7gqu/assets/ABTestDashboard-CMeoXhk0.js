import { defineComponent, ref, onMounted, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$6, d as _sfc_main$7 } from "./CardFooter-DjcCkgh0.js";
import { _ as _sfc_main$5 } from "./Badge-wTrEnT9H.js";
import { c as _sfc_main$1 } from "../main.mjs";
import "class-variance-authority";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
import "lucide-vue-next";
import "@vueuse/core";
import "clsx";
import "tailwind-merge";
import "radix-vue";
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
  __name: "ABTestDashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const tests = ref([]);
    const loading = ref(true);
    const error = ref("");
    const autoRefresh = ref(true);
    const refreshInterval = ref(null);
    const fetchTests = async () => {
      try {
        const response = await fetch("/api/analytics/ab-tests", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (!response.ok) throw new Error("Failed to fetch A/B tests");
        const data = await response.json();
        tests.value = data.tests || [];
        error.value = "";
      } catch (err) {
        error.value = err.message || "Failed to load A/B test data";
        console.error("Error fetching A/B tests:", err);
      } finally {
        loading.value = false;
      }
    };
    const getConfidenceColor = (significance) => {
      if (significance >= 0.95) return "bg-green-500";
      if (significance >= 0.85) return "bg-yellow-500";
      return "bg-gray-400";
    };
    const getConfidenceText = (significance) => {
      if (significance >= 0.95) return "95%+ Confidence";
      if (significance >= 0.85) return "85%+ Confidence";
      if (significance >= 0.5) return "50%+ Confidence";
      return "Insufficient Data";
    };
    const getStatusBadge = (status) => {
      switch (status) {
        case "running":
          return "bg-green-500";
        case "completed":
          return "bg-blue-500";
        case "paused":
          return "bg-yellow-500";
        default:
          return "bg-gray-500";
      }
    };
    const formatNumber = (num) => {
      return new Intl.NumberFormat().format(num);
    };
    const formatPercent = (num) => {
      return num.toFixed(2) + "%";
    };
    const toggleAutoRefresh = () => {
      autoRefresh.value = !autoRefresh.value;
      if (autoRefresh.value) {
        refreshInterval.value = window.setInterval(fetchTests, 3e4);
      } else if (refreshInterval.value) {
        clearInterval(refreshInterval.value);
        refreshInterval.value = null;
      }
    };
    onMounted(() => {
      fetchTests();
      if (autoRefresh.value) {
        refreshInterval.value = window.setInterval(fetchTests, 3e4);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-bold">A/B Test Dashboard</h1><p class="text-muted-foreground mt-2"> Monitor test performance and identify winning variants </p></div><div class="flex items-center gap-4"><div class="flex items-center gap-2"><div class="${ssrRenderClass([
        "w-2 h-2 rounded-full",
        autoRefresh.value ? "bg-green-500 animate-pulse" : "bg-gray-400"
      ])}"></div><span class="text-sm text-muted-foreground">${ssrInterpolate(autoRefresh.value ? "Live Updates" : "Paused")}</span></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: toggleAutoRefresh,
        variant: "outline",
        "aria-label": autoRefresh.value ? "Pause live updates" : "Resume live updates"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(autoRefresh.value ? "Pause" : "Resume")}`);
          } else {
            return [
              createTextVNode(toDisplayString(autoRefresh.value ? "Pause" : "Resume"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: fetchTests,
        "aria-label": "Refresh test data"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Refresh `);
          } else {
            return [
              createTextVNode(" Refresh ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (error.value) {
        _push(`<div class="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"><p class="text-red-400">${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="text-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div><p class="text-muted-foreground">Loading A/B test data...</p></div>`);
      } else {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(tests.value, (test) => {
          _push(ssrRenderComponent(unref(_sfc_main$2), {
            key: test.test_id,
            class: "bg-slate-900/50 border-slate-800"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-start justify-between"${_scopeId2}><div class="flex-1"${_scopeId2}><div class="flex items-center gap-3 mb-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-2xl" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(test.test_name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(test.test_name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        class: getStatusBadge(test.status)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(test.status)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(test.status), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      if (test.winner) {
                        _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "bg-green-500" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Winner: ${ssrInterpolate(test.winner)}`);
                            } else {
                              return [
                                createTextVNode(" Winner: " + toDisplayString(test.winner), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "text-base" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(test.hypothesis)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(test.hypothesis), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><div class="text-right"${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Expected Lift</div><div class="text-2xl font-bold text-green-400"${_scopeId2}> +${ssrInterpolate(test.expected_lift)}% </div></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-start justify-between" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "flex items-center gap-3 mb-2" }, [
                              createVNode(unref(_sfc_main$4), { class: "text-2xl" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(test.test_name), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$5), {
                                class: getStatusBadge(test.status)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(test.status), 1)
                                ]),
                                _: 2
                              }, 1032, ["class"]),
                              test.winner ? (openBlock(), createBlock(unref(_sfc_main$5), {
                                key: 0,
                                class: "bg-green-500"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Winner: " + toDisplayString(test.winner), 1)
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ]),
                            createVNode(unref(_sfc_main$6), { class: "text-base" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(test.hypothesis), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Expected Lift"),
                            createVNode("div", { class: "text-2xl font-bold text-green-400" }, " +" + toDisplayString(test.expected_lift) + "% ", 1)
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(_sfc_main$7), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="grid grid-cols-4 gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg"${_scopeId2}><div${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Total Visitors</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(formatNumber(test.total_visitors))}</div></div><div${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Total Conversions</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(formatNumber(test.total_conversions))}</div></div><div${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Overall Conversion</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(test.total_visitors > 0 ? formatPercent(test.total_conversions / test.total_visitors * 100) : "0%")}</div></div><div${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Statistical Confidence</div><div class="flex items-center gap-2"${_scopeId2}><div class="${ssrRenderClass(["w-3 h-3 rounded-full", getConfidenceColor(test.statistical_significance)])}"${_scopeId2}></div><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(getConfidenceText(test.statistical_significance))}</span></div></div></div><div class="space-y-3"${_scopeId2}><div class="text-sm font-medium text-muted-foreground mb-2"${_scopeId2}>Variants Performance</div><!--[-->`);
                      ssrRenderList(test.variants, (variant) => {
                        _push3(`<div class="${ssrRenderClass([
                          "p-4 rounded-lg border transition-all",
                          test.winner === variant.variant_id ? "bg-green-500/10 border-green-500/50" : "bg-slate-800/30 border-slate-700"
                        ])}"${_scopeId2}><div class="flex items-center justify-between mb-2"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                        if (test.winner === variant.variant_id) {
                          _push3(`<div class="text-green-400"${_scopeId2}> ✓ </div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<div class="font-semibold"${_scopeId2}>${ssrInterpolate(variant.variant_name)}</div></div><div class="text-right"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Conversion Rate</div><div class="text-xl font-bold"${_scopeId2}>${ssrInterpolate(formatPercent(variant.conversion_rate))}</div></div></div><div class="grid grid-cols-3 gap-4 text-sm"${_scopeId2}><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Visitors:</span><span class="ml-2 font-medium"${_scopeId2}>${ssrInterpolate(formatNumber(variant.visitors))}</span></div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Conversions:</span><span class="ml-2 font-medium"${_scopeId2}>${ssrInterpolate(formatNumber(variant.conversions))}</span></div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Traffic:</span><span class="ml-2 font-medium"${_scopeId2}>${ssrInterpolate(formatPercent(variant.traffic_weight * 100))}</span></div></div><div class="mt-3"${_scopeId2}><div class="${ssrRenderClass([
                          "h-2 rounded-full overflow-hidden",
                          test.winner === variant.variant_id ? "bg-green-500/20" : "bg-slate-700"
                        ])}"${_scopeId2}><div class="${ssrRenderClass([
                          "h-full rounded-full transition-all",
                          test.winner === variant.variant_id ? "bg-green-500" : "bg-blue-500"
                        ])}" style="${ssrRenderStyle({ width: `${Math.min(variant.conversion_rate / 10 * 100, 100)}%` })}"${_scopeId2}></div></div></div></div>`);
                      });
                      _push3(`<!--]--></div>`);
                      if (test.statistical_significance >= 0.95) {
                        _push3(`<div class="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}><div class="text-green-400 text-xl"${_scopeId2}>✓</div><div${_scopeId2}><div class="font-semibold text-green-400 mb-1"${_scopeId2}>Test Complete!</div><div class="text-sm text-muted-foreground"${_scopeId2}> Statistical significance reached (${ssrInterpolate((test.statistical_significance * 100).toFixed(0))}% confidence). `);
                        if (test.winner) {
                          _push3(`<span${_scopeId2}><strong${_scopeId2}>${ssrInterpolate(test.winner)}</strong> is the winner with ${ssrInterpolate(test.actual_lift > 0 ? "+" : "")}${ssrInterpolate(test.actual_lift.toFixed(1))}% lift. </span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></div></div></div>`);
                      } else if (test.total_visitors < 1e3) {
                        _push3(`<div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}><div class="text-blue-400 text-xl"${_scopeId2}>ℹ️</div><div${_scopeId2}><div class="font-semibold text-blue-400 mb-1"${_scopeId2}>Collecting Data...</div><div class="text-sm text-muted-foreground"${_scopeId2}> Need at least 1,000 visitors per variant for statistically significant results. Currently at ${ssrInterpolate(formatNumber(test.total_visitors))} total visitors. </div></div></div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode("div", { class: "grid grid-cols-4 gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Total Visitors"),
                            createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(test.total_visitors)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Total Conversions"),
                            createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(test.total_conversions)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Overall Conversion"),
                            createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(test.total_visitors > 0 ? formatPercent(test.total_conversions / test.total_visitors * 100) : "0%"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Statistical Confidence"),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("div", {
                                class: ["w-3 h-3 rounded-full", getConfidenceColor(test.statistical_significance)]
                              }, null, 2),
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(getConfidenceText(test.statistical_significance)), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", { class: "text-sm font-medium text-muted-foreground mb-2" }, "Variants Performance"),
                          (openBlock(true), createBlock(Fragment, null, renderList(test.variants, (variant) => {
                            return openBlock(), createBlock("div", {
                              key: variant.variant_id,
                              class: [
                                "p-4 rounded-lg border transition-all",
                                test.winner === variant.variant_id ? "bg-green-500/10 border-green-500/50" : "bg-slate-800/30 border-slate-700"
                              ]
                            }, [
                              createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  test.winner === variant.variant_id ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-green-400"
                                  }, " ✓ ")) : createCommentVNode("", true),
                                  createVNode("div", { class: "font-semibold" }, toDisplayString(variant.variant_name), 1)
                                ]),
                                createVNode("div", { class: "text-right" }, [
                                  createVNode("div", { class: "text-sm text-muted-foreground" }, "Conversion Rate"),
                                  createVNode("div", { class: "text-xl font-bold" }, toDisplayString(formatPercent(variant.conversion_rate)), 1)
                                ])
                              ]),
                              createVNode("div", { class: "grid grid-cols-3 gap-4 text-sm" }, [
                                createVNode("div", null, [
                                  createVNode("span", { class: "text-muted-foreground" }, "Visitors:"),
                                  createVNode("span", { class: "ml-2 font-medium" }, toDisplayString(formatNumber(variant.visitors)), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("span", { class: "text-muted-foreground" }, "Conversions:"),
                                  createVNode("span", { class: "ml-2 font-medium" }, toDisplayString(formatNumber(variant.conversions)), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("span", { class: "text-muted-foreground" }, "Traffic:"),
                                  createVNode("span", { class: "ml-2 font-medium" }, toDisplayString(formatPercent(variant.traffic_weight * 100)), 1)
                                ])
                              ]),
                              createVNode("div", { class: "mt-3" }, [
                                createVNode("div", {
                                  class: [
                                    "h-2 rounded-full overflow-hidden",
                                    test.winner === variant.variant_id ? "bg-green-500/20" : "bg-slate-700"
                                  ]
                                }, [
                                  createVNode("div", {
                                    class: [
                                      "h-full rounded-full transition-all",
                                      test.winner === variant.variant_id ? "bg-green-500" : "bg-blue-500"
                                    ],
                                    style: { width: `${Math.min(variant.conversion_rate / 10 * 100, 100)}%` }
                                  }, null, 6)
                                ], 2)
                              ])
                            ], 2);
                          }), 128))
                        ]),
                        test.statistical_significance >= 0.95 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                        }, [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode("div", { class: "text-green-400 text-xl" }, "✓"),
                            createVNode("div", null, [
                              createVNode("div", { class: "font-semibold text-green-400 mb-1" }, "Test Complete!"),
                              createVNode("div", { class: "text-sm text-muted-foreground" }, [
                                createTextVNode(" Statistical significance reached (" + toDisplayString((test.statistical_significance * 100).toFixed(0)) + "% confidence). ", 1),
                                test.winner ? (openBlock(), createBlock("span", { key: 0 }, [
                                  createVNode("strong", null, toDisplayString(test.winner), 1),
                                  createTextVNode(" is the winner with " + toDisplayString(test.actual_lift > 0 ? "+" : "") + toDisplayString(test.actual_lift.toFixed(1)) + "% lift. ", 1)
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ])
                        ])) : test.total_visitors < 1e3 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                        }, [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode("div", { class: "text-blue-400 text-xl" }, "ℹ️"),
                            createVNode("div", null, [
                              createVNode("div", { class: "font-semibold text-blue-400 mb-1" }, "Collecting Data..."),
                              createVNode("div", { class: "text-sm text-muted-foreground" }, " Need at least 1,000 visitors per variant for statistically significant results. Currently at " + toDisplayString(formatNumber(test.total_visitors)) + " total visitors. ", 1)
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-start justify-between" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "flex items-center gap-3 mb-2" }, [
                            createVNode(unref(_sfc_main$4), { class: "text-2xl" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(test.test_name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$5), {
                              class: getStatusBadge(test.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(test.status), 1)
                              ]),
                              _: 2
                            }, 1032, ["class"]),
                            test.winner ? (openBlock(), createBlock(unref(_sfc_main$5), {
                              key: 0,
                              class: "bg-green-500"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Winner: " + toDisplayString(test.winner), 1)
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ]),
                          createVNode(unref(_sfc_main$6), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(test.hypothesis), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Expected Lift"),
                          createVNode("div", { class: "text-2xl font-bold text-green-400" }, " +" + toDisplayString(test.expected_lift) + "% ", 1)
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(_sfc_main$7), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "grid grid-cols-4 gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Total Visitors"),
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(test.total_visitors)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Total Conversions"),
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(test.total_conversions)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Overall Conversion"),
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(test.total_visitors > 0 ? formatPercent(test.total_conversions / test.total_visitors * 100) : "0%"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Statistical Confidence"),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("div", {
                              class: ["w-3 h-3 rounded-full", getConfidenceColor(test.statistical_significance)]
                            }, null, 2),
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(getConfidenceText(test.statistical_significance)), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", { class: "text-sm font-medium text-muted-foreground mb-2" }, "Variants Performance"),
                        (openBlock(true), createBlock(Fragment, null, renderList(test.variants, (variant) => {
                          return openBlock(), createBlock("div", {
                            key: variant.variant_id,
                            class: [
                              "p-4 rounded-lg border transition-all",
                              test.winner === variant.variant_id ? "bg-green-500/10 border-green-500/50" : "bg-slate-800/30 border-slate-700"
                            ]
                          }, [
                            createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                test.winner === variant.variant_id ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-green-400"
                                }, " ✓ ")) : createCommentVNode("", true),
                                createVNode("div", { class: "font-semibold" }, toDisplayString(variant.variant_name), 1)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("div", { class: "text-sm text-muted-foreground" }, "Conversion Rate"),
                                createVNode("div", { class: "text-xl font-bold" }, toDisplayString(formatPercent(variant.conversion_rate)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-3 gap-4 text-sm" }, [
                              createVNode("div", null, [
                                createVNode("span", { class: "text-muted-foreground" }, "Visitors:"),
                                createVNode("span", { class: "ml-2 font-medium" }, toDisplayString(formatNumber(variant.visitors)), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("span", { class: "text-muted-foreground" }, "Conversions:"),
                                createVNode("span", { class: "ml-2 font-medium" }, toDisplayString(formatNumber(variant.conversions)), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("span", { class: "text-muted-foreground" }, "Traffic:"),
                                createVNode("span", { class: "ml-2 font-medium" }, toDisplayString(formatPercent(variant.traffic_weight * 100)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "mt-3" }, [
                              createVNode("div", {
                                class: [
                                  "h-2 rounded-full overflow-hidden",
                                  test.winner === variant.variant_id ? "bg-green-500/20" : "bg-slate-700"
                                ]
                              }, [
                                createVNode("div", {
                                  class: [
                                    "h-full rounded-full transition-all",
                                    test.winner === variant.variant_id ? "bg-green-500" : "bg-blue-500"
                                  ],
                                  style: { width: `${Math.min(variant.conversion_rate / 10 * 100, 100)}%` }
                                }, null, 6)
                              ], 2)
                            ])
                          ], 2);
                        }), 128))
                      ]),
                      test.statistical_significance >= 0.95 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                      }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode("div", { class: "text-green-400 text-xl" }, "✓"),
                          createVNode("div", null, [
                            createVNode("div", { class: "font-semibold text-green-400 mb-1" }, "Test Complete!"),
                            createVNode("div", { class: "text-sm text-muted-foreground" }, [
                              createTextVNode(" Statistical significance reached (" + toDisplayString((test.statistical_significance * 100).toFixed(0)) + "% confidence). ", 1),
                              test.winner ? (openBlock(), createBlock("span", { key: 0 }, [
                                createVNode("strong", null, toDisplayString(test.winner), 1),
                                createTextVNode(" is the winner with " + toDisplayString(test.actual_lift > 0 ? "+" : "") + toDisplayString(test.actual_lift.toFixed(1)) + "% lift. ", 1)
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ])) : test.total_visitors < 1e3 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                      }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode("div", { class: "text-blue-400 text-xl" }, "ℹ️"),
                          createVNode("div", null, [
                            createVNode("div", { class: "font-semibold text-blue-400 mb-1" }, "Collecting Data..."),
                            createVNode("div", { class: "text-sm text-muted-foreground" }, " Need at least 1,000 visitors per variant for statistically significant results. Currently at " + toDisplayString(formatNumber(test.total_visitors)) + " total visitors. ", 1)
                          ])
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
        _push(`<!--]-->`);
        if (tests.value.length === 0) {
          _push(`<div class="text-center py-12"><div class="text-6xl mb-4">🧪</div><h3 class="text-xl font-semibold mb-2">No Active A/B Tests</h3><p class="text-muted-foreground"> A/B tests will appear here once they start collecting data. </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/ABTestDashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
