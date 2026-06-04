import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$6 } from "../main.mjs";
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
  __name: "EtaCalculatorView",
  __ssrInlineRender: true,
  setup(__props) {
    const distance = ref(100);
    const speed = ref(60);
    const startTime = ref("");
    const etaInfo = computed(() => {
      const dist = distance.value ?? 0;
      const spd = speed.value ?? 1;
      const totalMinutes = dist / spd * 60;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);
      let arrivalTime = null;
      if (startTime.value) {
        const parts = startTime.value.split(":");
        const h = Number(parts[0] ?? 0);
        const m = Number(parts[1] ?? 0);
        if (!isNaN(h) && !isNaN(m)) {
          const startDate = /* @__PURE__ */ new Date();
          startDate.setHours(h, m, 0, 0);
          startDate.setMinutes(startDate.getMinutes() + totalMinutes);
          arrivalTime = startDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          });
        }
      }
      return { hours, minutes, totalMinutes: Math.round(totalMinutes), arrivalTime };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">ETA Calculator</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Calculate Estimated Time of Arrival`);
                      } else {
                        return [
                          createTextVNode("Calculate Estimated Time of Arrival")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Calculate Estimated Time of Arrival")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Distance (km or miles)`);
                      } else {
                        return [
                          createTextVNode("Distance (km or miles)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: distance.value,
                    "onUpdate:modelValue": ($event) => distance.value = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    min: "0",
                    step: "0.1",
                    "aria-label": "Distance"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Speed (km/h or mph)`);
                      } else {
                        return [
                          createTextVNode("Speed (km/h or mph)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: speed.value,
                    "onUpdate:modelValue": ($event) => speed.value = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    min: "1",
                    step: "0.1",
                    "aria-label": "Speed"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Start Time (optional)`);
                      } else {
                        return [
                          createTextVNode("Start Time (optional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: startTime.value,
                    "onUpdate:modelValue": ($event) => startTime.value = $event,
                    type: "time"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Distance (km or miles)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: distance.value,
                          "onUpdate:modelValue": ($event) => distance.value = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "0.1",
                          "aria-label": "Distance"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Speed (km/h or mph)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: speed.value,
                          "onUpdate:modelValue": ($event) => speed.value = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "1",
                          step: "0.1",
                          "aria-label": "Speed"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Start Time (optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: startTime.value,
                          "onUpdate:modelValue": ($event) => startTime.value = $event,
                          type: "time"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createTextVNode("Calculate Estimated Time of Arrival")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Distance (km or miles)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: distance.value,
                        "onUpdate:modelValue": ($event) => distance.value = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0",
                        step: "0.1",
                        "aria-label": "Distance"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Speed (km/h or mph)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: speed.value,
                        "onUpdate:modelValue": ($event) => speed.value = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "1",
                        step: "0.1",
                        "aria-label": "Speed"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Start Time (optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: startTime.value,
                        "onUpdate:modelValue": ($event) => startTime.value = $event,
                        type: "time"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
      _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Travel Time</div><div class="text-3xl font-bold"${_scopeId2}>${ssrInterpolate(etaInfo.value.hours)}h ${ssrInterpolate(etaInfo.value.minutes)}m</div><div class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(etaInfo.value.totalMinutes)} minutes total</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Travel Time"),
                    createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(etaInfo.value.hours) + "h " + toDisplayString(etaInfo.value.minutes) + "m", 1),
                    createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(etaInfo.value.totalMinutes) + " minutes total", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-sm text-muted-foreground" }, "Travel Time"),
                  createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(etaInfo.value.hours) + "h " + toDisplayString(etaInfo.value.minutes) + "m", 1),
                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(etaInfo.value.totalMinutes) + " minutes total", 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (etaInfo.value.arrivalTime) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Estimated Arrival</div><div class="text-3xl font-bold"${_scopeId2}>${ssrInterpolate(etaInfo.value.arrivalTime)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Estimated Arrival"),
                      createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(etaInfo.value.arrivalTime), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Estimated Arrival"),
                    createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(etaInfo.value.arrivalTime), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Average Speed</div><div class="text-3xl font-bold"${_scopeId2}>${ssrInterpolate(speed.value)}</div><div class="text-sm text-muted-foreground"${_scopeId2}>per hour</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Average Speed"),
                    createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(speed.value), 1),
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "per hour")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-sm text-muted-foreground" }, "Average Speed"),
                  createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(speed.value), 1),
                  createVNode("div", { class: "text-sm text-muted-foreground" }, "per hour")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/EtaCalculatorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
