import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { Line } from "vue-chartjs";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import "../main.mjs";
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
const generatedAt = "April 2, 2026";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CryptoForecastsView",
  __ssrInlineRender: true,
  setup(__props) {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
    const forecasts = ref([
      {
        symbol: "BTC",
        name: "Bitcoin",
        current_price: 68162.77,
        forecast_7d: { mean: 68919.94, q10: 62125.3, q90: 77259.73 },
        forecast_30d: { mean: 69887.87, q10: 53640.7, q90: 89386.56 },
        daily_forecast: [
          68364.7,
          68603.19,
          68729.47,
          68877.18,
          69069.62,
          69308.7,
          69486.67,
          69370.13,
          69521.65,
          69742.13,
          69610.47,
          69373.06,
          69480.54,
          69535.48,
          69531.33,
          69670.73,
          69640.36,
          69916.52,
          70253.73,
          70155.94,
          70579.07,
          70496.1,
          70557.43,
          70617.16,
          70491.05,
          70821.59,
          71044.14,
          70963.08,
          71157.56,
          71667.34
        ]
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        current_price: 2138.73,
        forecast_7d: { mean: 2149.09, q10: 1903.93, q90: 2378.68 },
        forecast_30d: { mean: 2158.26, q10: 1804.7, q90: 2675.67 },
        daily_forecast: [
          2129.44,
          2146.83,
          2152.94,
          2156.82,
          2150.31,
          2153.16,
          2154.12,
          2149.82,
          2146.12,
          2146.35,
          2145.84,
          2139.63,
          2142.95,
          2138.98,
          2140.32,
          2130.12,
          2146.26,
          2143.38,
          2166.63,
          2155.03,
          2167.86,
          2165.86,
          2173.68,
          2167.95,
          2176.51,
          2179.15,
          2188.79,
          2201.35,
          2191.75,
          2199.73
        ]
      },
      {
        symbol: "BNB",
        name: "BNB",
        current_price: 614.03,
        forecast_7d: { mean: 617.61, q10: 582.82, q90: 658.83 },
        forecast_30d: { mean: 628.22, q10: 578.75, q90: 711.94 },
        daily_forecast: [
          613,
          616.01,
          617.28,
          617,
          618.32,
          619.59,
          621.11,
          622.56,
          620.93,
          624.6,
          624.54,
          622.45,
          621.13,
          624.88,
          628.19,
          630.68,
          632.14,
          632.73,
          632.03,
          634.52,
          636.08,
          635.52,
          635.39,
          634.32,
          634.73,
          637.77,
          640.75,
          639.3,
          637.15,
          641.04
        ]
      },
      {
        symbol: "XRP",
        name: "XRP",
        current_price: 1.35,
        forecast_7d: { mean: 1.36, q10: 1.24, q90: 1.49 },
        forecast_30d: { mean: 1.37, q10: 1.19, q90: 1.83 },
        daily_forecast: [
          1.339,
          1.356,
          1.351,
          1.357,
          1.357,
          1.367,
          1.362,
          1.366,
          1.357,
          1.36,
          1.359,
          1.359,
          1.359,
          1.366,
          1.357,
          1.355,
          1.363,
          1.369,
          1.375,
          1.37,
          1.373,
          1.375,
          1.371,
          1.37,
          1.376,
          1.385,
          1.394,
          1.389,
          1.388,
          1.402
        ]
      },
      {
        symbol: "SOL",
        name: "Solana",
        current_price: 84.25,
        forecast_7d: { mean: 87.64, q10: 76.34, q90: 105.66 },
        forecast_30d: { mean: 93.37, q10: 76.34, q90: 118.07 },
        daily_forecast: [
          83.92,
          86.28,
          86.7,
          88.12,
          88.08,
          89.75,
          90.63,
          90.61,
          90.93,
          92.2,
          92.65,
          93.6,
          94.08,
          94.83,
          94.26,
          94.62,
          94.78,
          95.72,
          96.73,
          95.72,
          96.39,
          96.24,
          96.55,
          96.29,
          96.15,
          96.14,
          97.1,
          97.76,
          96.42,
          97.94
        ]
      },
      {
        symbol: "TRX",
        name: "TRON",
        current_price: 0.32,
        forecast_7d: { mean: 0.32, q10: 0.3, q90: 0.33 },
        forecast_30d: { mean: 0.31, q10: 0.28, q90: 0.34 },
        daily_forecast: [
          0.316,
          0.317,
          0.316,
          0.317,
          0.316,
          0.315,
          0.315,
          0.314,
          0.314,
          0.314,
          0.313,
          0.312,
          0.311,
          0.31,
          0.31,
          0.31,
          0.309,
          0.309,
          0.309,
          0.307,
          0.309,
          0.308,
          0.308,
          0.307,
          0.306,
          0.306,
          0.306,
          0.306,
          0.305,
          0.306
        ]
      }
    ]);
    const selectedAsset = ref("BTC");
    const currentAsset = computed(
      () => forecasts.value.find((f) => f.symbol === selectedAsset.value)
    );
    function formatPrice(price, symbol) {
      if (symbol === "TRX") return "$" + price.toFixed(4);
      if (symbol === "XRP") return "$" + price.toFixed(2);
      if (symbol === "SOL" || symbol === "BNB") return "$" + price.toFixed(2);
      if (symbol === "ETH") return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function changePercent(current, forecast) {
      return ((forecast - current) / current * 100).toFixed(2);
    }
    const chartData = computed(() => {
      const asset = currentAsset.value;
      const labels = asset.daily_forecast.map((_, i) => `Day ${i + 1}`);
      return {
        labels,
        datasets: [
          {
            label: `${asset.name} Forecast`,
            data: asset.daily_forecast,
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 2,
            pointHoverRadius: 5
          }
        ]
      };
    });
    const chartOptions = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${currentAsset.value.symbol}: ${formatPrice(ctx.parsed.y, currentAsset.value.symbol)}`
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: {
            callback: (val) => formatPrice(val, currentAsset.value.symbol)
          }
        }
      }
    }));
    const symbolColors = {
      BTC: "#f7931a",
      ETH: "#627eea",
      BNB: "#f3ba2f",
      XRP: "#00aae4",
      SOL: "#9945ff",
      TRX: "#ff0013"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-muted/30" }, _attrs))}><div class="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white py-16 px-4"><div class="max-w-5xl mx-auto text-center"><div class="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur"><span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> AI-Powered Forecasts </div><h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4"> Crypto Price Forecasts </h1><p class="text-lg text-white/70 max-w-2xl mx-auto mb-2"> 30-day price predictions for top crypto assets using <a href="https://github.com/google-research/timesfm" target="_blank" rel="noopener" class="underline underline-offset-4 hover:text-white transition">Google TimesFM 2.5</a> — a 200M parameter time-series foundation model, running locally. </p><p class="text-sm text-white/40">Last updated: ${ssrInterpolate(generatedAt)}</p></div></div><div class="max-w-5xl mx-auto px-4 py-8 space-y-6"><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(forecasts.value, (f) => {
        _push(`<button${ssrRenderAttr("aria-label", "Select " + f.symbol + " forecast")} class="${ssrRenderClass([
          "px-4 py-2 rounded-lg font-semibold text-sm transition-all",
          selectedAsset.value === f.symbol ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
        ])}">${ssrInterpolate(f.symbol)}</button>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-card border-border" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Current Price`);
                      } else {
                        return [
                          createTextVNode("Current Price")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Current Price")
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
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(formatPrice(currentAsset.value.current_price, currentAsset.value.symbol))}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatPrice(currentAsset.value.current_price, currentAsset.value.symbol)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Current Price")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatPrice(currentAsset.value.current_price, currentAsset.value.symbol)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-card border-border" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`7-Day Forecast`);
                      } else {
                        return [
                          createTextVNode("7-Day Forecast")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("7-Day Forecast")
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
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(formatPrice(currentAsset.value.forecast_7d.mean, currentAsset.value.symbol))}</div><div class="${ssrRenderClass([currentAsset.value.forecast_7d.mean >= currentAsset.value.current_price ? "text-green-500" : "text-red-500", "text-sm font-medium mt-1"])}"${_scopeId2}>${ssrInterpolate(changePercent(currentAsset.value.current_price, currentAsset.value.forecast_7d.mean))}% </div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatPrice(currentAsset.value.forecast_7d.mean, currentAsset.value.symbol)), 1),
                    createVNode("div", {
                      class: [currentAsset.value.forecast_7d.mean >= currentAsset.value.current_price ? "text-green-500" : "text-red-500", "text-sm font-medium mt-1"]
                    }, toDisplayString(changePercent(currentAsset.value.current_price, currentAsset.value.forecast_7d.mean)) + "% ", 3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("7-Day Forecast")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatPrice(currentAsset.value.forecast_7d.mean, currentAsset.value.symbol)), 1),
                  createVNode("div", {
                    class: [currentAsset.value.forecast_7d.mean >= currentAsset.value.current_price ? "text-green-500" : "text-red-500", "text-sm font-medium mt-1"]
                  }, toDisplayString(changePercent(currentAsset.value.current_price, currentAsset.value.forecast_7d.mean)) + "% ", 3)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-card border-border" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`30-Day Forecast`);
                      } else {
                        return [
                          createTextVNode("30-Day Forecast")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("30-Day Forecast")
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
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(formatPrice(currentAsset.value.forecast_30d.mean, currentAsset.value.symbol))}</div><div class="${ssrRenderClass([currentAsset.value.forecast_30d.mean >= currentAsset.value.current_price ? "text-green-500" : "text-red-500", "text-sm font-medium mt-1"])}"${_scopeId2}>${ssrInterpolate(changePercent(currentAsset.value.current_price, currentAsset.value.forecast_30d.mean))}% </div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatPrice(currentAsset.value.forecast_30d.mean, currentAsset.value.symbol)), 1),
                    createVNode("div", {
                      class: [currentAsset.value.forecast_30d.mean >= currentAsset.value.current_price ? "text-green-500" : "text-red-500", "text-sm font-medium mt-1"]
                    }, toDisplayString(changePercent(currentAsset.value.current_price, currentAsset.value.forecast_30d.mean)) + "% ", 3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("30-Day Forecast")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatPrice(currentAsset.value.forecast_30d.mean, currentAsset.value.symbol)), 1),
                  createVNode("div", {
                    class: [currentAsset.value.forecast_30d.mean >= currentAsset.value.current_price ? "text-green-500" : "text-red-500", "text-sm font-medium mt-1"]
                  }, toDisplayString(changePercent(currentAsset.value.current_price, currentAsset.value.forecast_30d.mean)) + "% ", 3)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-card border-border" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(currentAsset.value.name)} (${ssrInterpolate(currentAsset.value.symbol)}) — 30-Day Forecast`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(currentAsset.value.name) + " (" + toDisplayString(currentAsset.value.symbol) + ") — 30-Day Forecast", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentAsset.value.name) + " (" + toDisplayString(currentAsset.value.symbol) + ") — 30-Day Forecast", 1)
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
                  _push3(`<div class="h-72 md:h-96"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Line), {
                    data: chartData.value,
                    options: chartOptions.value
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-72 md:h-96" }, [
                      createVNode(unref(Line), {
                        data: chartData.value,
                        options: chartOptions.value
                      }, null, 8, ["data", "options"])
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
                      createTextVNode(toDisplayString(currentAsset.value.name) + " (" + toDisplayString(currentAsset.value.symbol) + ") — 30-Day Forecast", 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "h-72 md:h-96" }, [
                    createVNode(unref(Line), {
                      data: chartData.value,
                      options: chartOptions.value
                    }, null, 8, ["data", "options"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-card border-border" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`All Assets — Forecast Summary`);
                      } else {
                        return [
                          createTextVNode("All Assets — Forecast Summary")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("All Assets — Forecast Summary")
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
                  _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="w-full text-sm"${_scopeId2}><thead${_scopeId2}><tr class="border-b border-border text-left text-muted-foreground"${_scopeId2}><th class="pb-3 pr-4"${_scopeId2}>Asset</th><th class="pb-3 pr-4"${_scopeId2}>Current</th><th class="pb-3 pr-4"${_scopeId2}>7d Forecast</th><th class="pb-3 pr-4"${_scopeId2}>30d Forecast</th><th class="pb-3 pr-4"${_scopeId2}>30d Low</th><th class="pb-3"${_scopeId2}>30d High</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                  ssrRenderList(forecasts.value, (f) => {
                    _push3(`<tr class="border-b border-border/50 cursor-pointer hover:bg-muted/50 transition"${_scopeId2}><td class="py-3 pr-4 font-semibold"${_scopeId2}><span class="inline-block w-2 h-2 rounded-full mr-2" style="${ssrRenderStyle({ backgroundColor: symbolColors[f.symbol] })}"${_scopeId2}></span> ${ssrInterpolate(f.symbol)} <span class="text-muted-foreground font-normal ml-1"${_scopeId2}>${ssrInterpolate(f.name)}</span></td><td class="py-3 pr-4"${_scopeId2}>${ssrInterpolate(formatPrice(f.current_price, f.symbol))}</td><td class="py-3 pr-4"${_scopeId2}>${ssrInterpolate(formatPrice(f.forecast_7d.mean, f.symbol))} <span class="${ssrRenderClass([f.forecast_7d.mean >= f.current_price ? "text-green-500" : "text-red-500", "text-xs ml-1"])}"${_scopeId2}> (${ssrInterpolate(changePercent(f.current_price, f.forecast_7d.mean))}%) </span></td><td class="py-3 pr-4"${_scopeId2}>${ssrInterpolate(formatPrice(f.forecast_30d.mean, f.symbol))} <span class="${ssrRenderClass([f.forecast_30d.mean >= f.current_price ? "text-green-500" : "text-red-500", "text-xs ml-1"])}"${_scopeId2}> (${ssrInterpolate(changePercent(f.current_price, f.forecast_30d.mean))}%) </span></td><td class="py-3 pr-4 text-red-400"${_scopeId2}>${ssrInterpolate(formatPrice(f.forecast_30d.q10, f.symbol))}</td><td class="py-3 text-green-400"${_scopeId2}>${ssrInterpolate(formatPrice(f.forecast_30d.q90, f.symbol))}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table></div>`);
                } else {
                  return [
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "w-full text-sm" }, [
                        createVNode("thead", null, [
                          createVNode("tr", { class: "border-b border-border text-left text-muted-foreground" }, [
                            createVNode("th", { class: "pb-3 pr-4" }, "Asset"),
                            createVNode("th", { class: "pb-3 pr-4" }, "Current"),
                            createVNode("th", { class: "pb-3 pr-4" }, "7d Forecast"),
                            createVNode("th", { class: "pb-3 pr-4" }, "30d Forecast"),
                            createVNode("th", { class: "pb-3 pr-4" }, "30d Low"),
                            createVNode("th", { class: "pb-3" }, "30d High")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(forecasts.value, (f) => {
                            return openBlock(), createBlock("tr", {
                              key: f.symbol,
                              onClick: ($event) => selectedAsset.value = f.symbol,
                              class: "border-b border-border/50 cursor-pointer hover:bg-muted/50 transition"
                            }, [
                              createVNode("td", { class: "py-3 pr-4 font-semibold" }, [
                                createVNode("span", {
                                  class: "inline-block w-2 h-2 rounded-full mr-2",
                                  style: { backgroundColor: symbolColors[f.symbol] }
                                }, null, 4),
                                createTextVNode(" " + toDisplayString(f.symbol) + " ", 1),
                                createVNode("span", { class: "text-muted-foreground font-normal ml-1" }, toDisplayString(f.name), 1)
                              ]),
                              createVNode("td", { class: "py-3 pr-4" }, toDisplayString(formatPrice(f.current_price, f.symbol)), 1),
                              createVNode("td", { class: "py-3 pr-4" }, [
                                createTextVNode(toDisplayString(formatPrice(f.forecast_7d.mean, f.symbol)) + " ", 1),
                                createVNode("span", {
                                  class: [f.forecast_7d.mean >= f.current_price ? "text-green-500" : "text-red-500", "text-xs ml-1"]
                                }, " (" + toDisplayString(changePercent(f.current_price, f.forecast_7d.mean)) + "%) ", 3)
                              ]),
                              createVNode("td", { class: "py-3 pr-4" }, [
                                createTextVNode(toDisplayString(formatPrice(f.forecast_30d.mean, f.symbol)) + " ", 1),
                                createVNode("span", {
                                  class: [f.forecast_30d.mean >= f.current_price ? "text-green-500" : "text-red-500", "text-xs ml-1"]
                                }, " (" + toDisplayString(changePercent(f.current_price, f.forecast_30d.mean)) + "%) ", 3)
                              ]),
                              createVNode("td", { class: "py-3 pr-4 text-red-400" }, toDisplayString(formatPrice(f.forecast_30d.q10, f.symbol)), 1),
                              createVNode("td", { class: "py-3 text-green-400" }, toDisplayString(formatPrice(f.forecast_30d.q90, f.symbol)), 1)
                            ], 8, ["onClick"]);
                          }), 128))
                        ])
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
                      createTextVNode("All Assets — Forecast Summary")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "border-b border-border text-left text-muted-foreground" }, [
                          createVNode("th", { class: "pb-3 pr-4" }, "Asset"),
                          createVNode("th", { class: "pb-3 pr-4" }, "Current"),
                          createVNode("th", { class: "pb-3 pr-4" }, "7d Forecast"),
                          createVNode("th", { class: "pb-3 pr-4" }, "30d Forecast"),
                          createVNode("th", { class: "pb-3 pr-4" }, "30d Low"),
                          createVNode("th", { class: "pb-3" }, "30d High")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(forecasts.value, (f) => {
                          return openBlock(), createBlock("tr", {
                            key: f.symbol,
                            onClick: ($event) => selectedAsset.value = f.symbol,
                            class: "border-b border-border/50 cursor-pointer hover:bg-muted/50 transition"
                          }, [
                            createVNode("td", { class: "py-3 pr-4 font-semibold" }, [
                              createVNode("span", {
                                class: "inline-block w-2 h-2 rounded-full mr-2",
                                style: { backgroundColor: symbolColors[f.symbol] }
                              }, null, 4),
                              createTextVNode(" " + toDisplayString(f.symbol) + " ", 1),
                              createVNode("span", { class: "text-muted-foreground font-normal ml-1" }, toDisplayString(f.name), 1)
                            ]),
                            createVNode("td", { class: "py-3 pr-4" }, toDisplayString(formatPrice(f.current_price, f.symbol)), 1),
                            createVNode("td", { class: "py-3 pr-4" }, [
                              createTextVNode(toDisplayString(formatPrice(f.forecast_7d.mean, f.symbol)) + " ", 1),
                              createVNode("span", {
                                class: [f.forecast_7d.mean >= f.current_price ? "text-green-500" : "text-red-500", "text-xs ml-1"]
                              }, " (" + toDisplayString(changePercent(f.current_price, f.forecast_7d.mean)) + "%) ", 3)
                            ]),
                            createVNode("td", { class: "py-3 pr-4" }, [
                              createTextVNode(toDisplayString(formatPrice(f.forecast_30d.mean, f.symbol)) + " ", 1),
                              createVNode("span", {
                                class: [f.forecast_30d.mean >= f.current_price ? "text-green-500" : "text-red-500", "text-xs ml-1"]
                              }, " (" + toDisplayString(changePercent(f.current_price, f.forecast_30d.mean)) + "%) ", 3)
                            ]),
                            createVNode("td", { class: "py-3 pr-4 text-red-400" }, toDisplayString(formatPrice(f.forecast_30d.q10, f.symbol)), 1),
                            createVNode("td", { class: "py-3 text-green-400" }, toDisplayString(formatPrice(f.forecast_30d.q90, f.symbol)), 1)
                          ], 8, ["onClick"]);
                        }), 128))
                      ])
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
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-card border-border" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`How It Works`);
                      } else {
                        return [
                          createTextVNode("How It Works")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("How It Works")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-3 text-sm text-muted-foreground" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}><strong class="text-foreground"${_scopeId2}>Model:</strong><a href="https://github.com/google-research/timesfm" target="_blank" rel="noopener" class="text-indigo-400 hover:underline"${_scopeId2}>Google TimesFM 2.5</a> (200M parameters) — a general-purpose time-series foundation model developed by Google Research. </p><p${_scopeId2}><strong class="text-foreground"${_scopeId2}>Inference:</strong> All forecasts are generated via local inference — no data is sent to external APIs. This is privacy-first AI. </p><p${_scopeId2}><strong class="text-foreground"${_scopeId2}>Confidence Ranges:</strong> The 30-day low/high columns represent the 10th and 90th percentile predictions (80% confidence interval). </p><p${_scopeId2}><strong class="text-foreground"${_scopeId2}>Limitations:</strong> TimesFM is a general time-series model, not specifically trained on cryptocurrency data. Forecasts should not be used as financial advice. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", { class: "text-foreground" }, "Model:"),
                      createVNode("a", {
                        href: "https://github.com/google-research/timesfm",
                        target: "_blank",
                        rel: "noopener",
                        class: "text-indigo-400 hover:underline"
                      }, "Google TimesFM 2.5"),
                      createTextVNode(" (200M parameters) — a general-purpose time-series foundation model developed by Google Research. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", { class: "text-foreground" }, "Inference:"),
                      createTextVNode(" All forecasts are generated via local inference — no data is sent to external APIs. This is privacy-first AI. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", { class: "text-foreground" }, "Confidence Ranges:"),
                      createTextVNode(" The 30-day low/high columns represent the 10th and 90th percentile predictions (80% confidence interval). ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", { class: "text-foreground" }, "Limitations:"),
                      createTextVNode(" TimesFM is a general time-series model, not specifically trained on cryptocurrency data. Forecasts should not be used as financial advice. ")
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
                      createTextVNode("How It Works")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-3 text-sm text-muted-foreground" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", { class: "text-foreground" }, "Model:"),
                    createVNode("a", {
                      href: "https://github.com/google-research/timesfm",
                      target: "_blank",
                      rel: "noopener",
                      class: "text-indigo-400 hover:underline"
                    }, "Google TimesFM 2.5"),
                    createTextVNode(" (200M parameters) — a general-purpose time-series foundation model developed by Google Research. ")
                  ]),
                  createVNode("p", null, [
                    createVNode("strong", { class: "text-foreground" }, "Inference:"),
                    createTextVNode(" All forecasts are generated via local inference — no data is sent to external APIs. This is privacy-first AI. ")
                  ]),
                  createVNode("p", null, [
                    createVNode("strong", { class: "text-foreground" }, "Confidence Ranges:"),
                    createTextVNode(" The 30-day low/high columns represent the 10th and 90th percentile predictions (80% confidence interval). ")
                  ]),
                  createVNode("p", null, [
                    createVNode("strong", { class: "text-foreground" }, "Limitations:"),
                    createTextVNode(" TimesFM is a general time-series model, not specifically trained on cryptocurrency data. Forecasts should not be used as financial advice. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-center text-xs text-muted-foreground py-6 border-t border-border"><p class="mb-1">⚠️ <strong>Disclaimer:</strong> This is not financial advice. TimesFM is a general time-series model, not crypto-specific.</p><p>Forecasts generated with Google TimesFM 2.5 (200M). All inference runs locally — your data stays private.</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/CryptoForecastsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
