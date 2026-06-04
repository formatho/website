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
  __name: "Ipv4SubnetCalculatorView",
  __ssrInlineRender: true,
  setup(__props) {
    const ipAddress = ref("");
    const cidr = ref(24);
    const subnetInfo = computed(() => {
      if (!ipAddress.value) return null;
      const parts = ipAddress.value.split(".");
      if (parts.length !== 4) return null;
      const ip = parts.map((p) => parseInt(p, 10));
      if (ip.some((p) => isNaN(p) || p < 0 || p > 255)) return null;
      const cidrVal = Math.max(0, Math.min(32, cidr.value));
      const mask = 4294967295 << 32 - cidrVal >>> 0;
      const wildcard = ~mask >>> 0;
      const i0 = ip[0] ?? 0;
      const i1 = ip[1] ?? 0;
      const i2 = ip[2] ?? 0;
      const i3 = ip[3] ?? 0;
      const ipNum = (i0 << 24) + (i1 << 16) + (i2 << 8) + i3;
      const network = (ipNum & mask) >>> 0;
      const broadcast = (network | wildcard) >>> 0;
      const numToIp = (num) => [num >>> 24 & 255, num >>> 16 & 255, num >>> 8 & 255, num & 255].join(".");
      const totalHosts = Math.pow(2, 32 - cidrVal);
      const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;
      return {
        networkAddress: numToIp(network),
        broadcastAddress: numToIp(broadcast),
        subnetMask: numToIp(mask),
        wildcardMask: numToIp(wildcard),
        firstHost: totalHosts > 2 ? numToIp(network + 1) : numToIp(network),
        lastHost: totalHosts > 2 ? numToIp(broadcast - 1) : numToIp(broadcast),
        totalHosts,
        usableHosts,
        cidr: cidrVal
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">IPv4 Subnet Calculator</h1></div>`);
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`IP Address`);
                      } else {
                        return [
                          createTextVNode("IP Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: ipAddress.value,
                    "onUpdate:modelValue": ($event) => ipAddress.value = $event,
                    "aria-label": "IP address",
                    placeholder: "192.168.1.1",
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`CIDR / Subnet`);
                      } else {
                        return [
                          createTextVNode("CIDR / Subnet")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: cidr.value,
                    "onUpdate:modelValue": ($event) => cidr.value = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    "aria-label": "CIDR prefix length",
                    min: "0",
                    max: "32",
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("IP Address")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: ipAddress.value,
                          "onUpdate:modelValue": ($event) => ipAddress.value = $event,
                          "aria-label": "IP address",
                          placeholder: "192.168.1.1",
                          class: "font-mono"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("CIDR / Subnet")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: cidr.value,
                          "onUpdate:modelValue": ($event) => cidr.value = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          "aria-label": "CIDR prefix length",
                          min: "0",
                          max: "32",
                          class: "font-mono"
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
                      createTextVNode("Input")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("IP Address")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: ipAddress.value,
                        "onUpdate:modelValue": ($event) => ipAddress.value = $event,
                        "aria-label": "IP address",
                        placeholder: "192.168.1.1",
                        class: "font-mono"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("CIDR / Subnet")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: cidr.value,
                        "onUpdate:modelValue": ($event) => cidr.value = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        "aria-label": "CIDR prefix length",
                        min: "0",
                        max: "32",
                        class: "font-mono"
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
      if (subnetInfo.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Network Address</div><div class="text-xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(subnetInfo.value.networkAddress)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Network Address"),
                      createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.networkAddress), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Network Address"),
                    createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.networkAddress), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Broadcast Address</div><div class="text-xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(subnetInfo.value.broadcastAddress)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Broadcast Address"),
                      createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.broadcastAddress), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Broadcast Address"),
                    createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.broadcastAddress), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Subnet Mask</div><div class="text-xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(subnetInfo.value.subnetMask)}</div><div class="text-sm text-muted-foreground"${_scopeId2}>/${ssrInterpolate(subnetInfo.value.cidr)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Subnet Mask"),
                      createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.subnetMask), 1),
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "/" + toDisplayString(subnetInfo.value.cidr), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Subnet Mask"),
                    createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.subnetMask), 1),
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "/" + toDisplayString(subnetInfo.value.cidr), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Wildcard Mask</div><div class="text-xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(subnetInfo.value.wildcardMask)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Wildcard Mask"),
                      createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.wildcardMask), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Wildcard Mask"),
                    createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.wildcardMask), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>First Host</div><div class="text-xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(subnetInfo.value.firstHost)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "First Host"),
                      createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.firstHost), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "First Host"),
                    createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.firstHost), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Last Host</div><div class="text-xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(subnetInfo.value.lastHost)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Last Host"),
                      createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.lastHost), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Last Host"),
                    createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(subnetInfo.value.lastHost), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Total Hosts</div><div class="text-xl font-bold"${_scopeId2}>${ssrInterpolate(subnetInfo.value.totalHosts.toLocaleString())}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Total Hosts"),
                      createVNode("div", { class: "text-xl font-bold" }, toDisplayString(subnetInfo.value.totalHosts.toLocaleString()), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Total Hosts"),
                    createVNode("div", { class: "text-xl font-bold" }, toDisplayString(subnetInfo.value.totalHosts.toLocaleString()), 1)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Usable Hosts</div><div class="text-xl font-bold"${_scopeId2}>${ssrInterpolate(subnetInfo.value.usableHosts.toLocaleString())}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Usable Hosts"),
                      createVNode("div", { class: "text-xl font-bold" }, toDisplayString(subnetInfo.value.usableHosts.toLocaleString()), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Usable Hosts"),
                    createVNode("div", { class: "text-xl font-bold" }, toDisplayString(subnetInfo.value.usableHosts.toLocaleString()), 1)
                  ]),
                  _: 2
                }, 1024)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Ipv4SubnetCalculatorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
