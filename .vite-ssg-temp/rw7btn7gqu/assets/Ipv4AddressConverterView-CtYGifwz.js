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
  __name: "Ipv4AddressConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const ipAddress = ref("");
    const ipInfo = computed(() => {
      if (!ipAddress.value) return null;
      const parts = ipAddress.value.split(".");
      if (parts.length !== 4) return null;
      const octets = parts.map((p) => parseInt(p, 10));
      if (octets.some((p) => isNaN(p) || p < 0 || p > 255)) return null;
      const o0 = octets[0] ?? 0;
      const o1 = octets[1] ?? 0;
      const o2 = octets[2] ?? 0;
      const o3 = octets[3] ?? 0;
      const decimal = (o0 << 24) + (o1 << 16) + (o2 << 8) + o3;
      return {
        decimal: decimal.toString(),
        binary: octets.map((o) => o.toString(2).padStart(8, "0")).join("."),
        hex: octets.map((o) => o.toString(16).toUpperCase().padStart(2, "0")).join("."),
        octal: octets.map((o) => o.toString(8).padStart(3, "0")).join("."),
        reverseDns: `${o3}.${o2}.${o1}.${o0}.in-addr.arpa`
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">IPv4 Address Converter</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`IPv4 Address`);
                      } else {
                        return [
                          createTextVNode("IPv4 Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: ipAddress.value,
                    "onUpdate:modelValue": ($event) => ipAddress.value = $event,
                    placeholder: "192.168.1.1",
                    class: "font-mono",
                    "aria-label": "IPv4 address"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("IPv4 Address")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: ipAddress.value,
                        "onUpdate:modelValue": ($event) => ipAddress.value = $event,
                        placeholder: "192.168.1.1",
                        class: "font-mono",
                        "aria-label": "IPv4 address"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createTextVNode("Input")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("IPv4 Address")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: ipAddress.value,
                      "onUpdate:modelValue": ($event) => ipAddress.value = $event,
                      placeholder: "192.168.1.1",
                      class: "font-mono",
                      "aria-label": "IPv4 address"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (ipInfo.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Decimal</div><div class="text-2xl font-mono font-bold break-all"${_scopeId2}>${ssrInterpolate(ipInfo.value.decimal)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Decimal"),
                      createVNode("div", { class: "text-2xl font-mono font-bold break-all" }, toDisplayString(ipInfo.value.decimal), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Decimal"),
                    createVNode("div", { class: "text-2xl font-mono font-bold break-all" }, toDisplayString(ipInfo.value.decimal), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Binary</div><div class="text-lg font-mono font-bold break-all"${_scopeId2}>${ssrInterpolate(ipInfo.value.binary)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Binary"),
                      createVNode("div", { class: "text-lg font-mono font-bold break-all" }, toDisplayString(ipInfo.value.binary), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Binary"),
                    createVNode("div", { class: "text-lg font-mono font-bold break-all" }, toDisplayString(ipInfo.value.binary), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Hexadecimal</div><div class="text-xl font-mono font-bold break-all"${_scopeId2}>${ssrInterpolate(ipInfo.value.hex)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Hexadecimal"),
                      createVNode("div", { class: "text-xl font-mono font-bold break-all" }, toDisplayString(ipInfo.value.hex), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Hexadecimal"),
                    createVNode("div", { class: "text-xl font-mono font-bold break-all" }, toDisplayString(ipInfo.value.hex), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Octal</div><div class="text-xl font-mono font-bold break-all"${_scopeId2}>${ssrInterpolate(ipInfo.value.octal)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Octal"),
                      createVNode("div", { class: "text-xl font-mono font-bold break-all" }, toDisplayString(ipInfo.value.octal), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Octal"),
                    createVNode("div", { class: "text-xl font-mono font-bold break-all" }, toDisplayString(ipInfo.value.octal), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), { class: "md:col-span-2" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Reverse DNS</div><div class="text-xl font-mono font-bold break-all"${_scopeId2}>${ssrInterpolate(ipInfo.value.reverseDns)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Reverse DNS"),
                      createVNode("div", { class: "text-xl font-mono font-bold break-all" }, toDisplayString(ipInfo.value.reverseDns), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Reverse DNS"),
                    createVNode("div", { class: "text-xl font-mono font-bold break-all" }, toDisplayString(ipInfo.value.reverseDns), 1)
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Ipv4AddressConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
