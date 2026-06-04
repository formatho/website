import { defineComponent, ref, onMounted, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeviceInformationView",
  __ssrInlineRender: true,
  setup(__props) {
    const deviceInfo = ref({
      userAgent: "",
      platform: "",
      vendor: "",
      language: "",
      cookieEnabled: false,
      onLine: false,
      screenWidth: 0,
      screenHeight: 0,
      colorDepth: 0,
      pixelRatio: 1,
      hardwareConcurrency: 0,
      deviceMemory: 0,
      maxTouchPoints: 0,
      timezone: "",
      connection: {
        effectiveType: "",
        downlink: 0,
        rtt: 0
      }
    });
    onMounted(() => {
      const nav = navigator;
      deviceInfo.value = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        screenWidth: screen.width,
        screenHeight: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
        deviceMemory: nav.deviceMemory || 0,
        maxTouchPoints: navigator.maxTouchPoints || 0,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        connection: {
          effectiveType: nav.connection?.effectiveType || "Unknown",
          downlink: nav.connection?.downlink || 0,
          rtt: nav.connection?.rtt || 0
        }
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Device Information</h1></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Browser`);
                      } else {
                        return [
                          createTextVNode("Browser")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("Browser")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Vendor:</span> ${ssrInterpolate(deviceInfo.value.vendor)}</div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Language:</span> ${ssrInterpolate(deviceInfo.value.language)}</div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Cookies:</span> ${ssrInterpolate(deviceInfo.value.cookieEnabled ? "Enabled" : "Disabled")}</div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Online:</span> ${ssrInterpolate(deviceInfo.value.onLine ? "Yes" : "No")}</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Vendor:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.vendor), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Language:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.language), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Cookies:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.cookieEnabled ? "Enabled" : "Disabled"), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Online:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.onLine ? "Yes" : "No"), 1)
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
                  createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode("Browser")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Vendor:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.vendor), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Language:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.language), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Cookies:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.cookieEnabled ? "Enabled" : "Disabled"), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Online:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.onLine ? "Yes" : "No"), 1)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Screen`);
                      } else {
                        return [
                          createTextVNode("Screen")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("Screen")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Resolution:</span> ${ssrInterpolate(deviceInfo.value.screenWidth)} x ${ssrInterpolate(deviceInfo.value.screenHeight)}</div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Color Depth:</span> ${ssrInterpolate(deviceInfo.value.colorDepth)}-bit </div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Pixel Ratio:</span> ${ssrInterpolate(deviceInfo.value.pixelRatio)}x </div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Resolution:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.screenWidth) + " x " + toDisplayString(deviceInfo.value.screenHeight), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Color Depth:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.colorDepth) + "-bit ", 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Pixel Ratio:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.pixelRatio) + "x ", 1)
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
                  createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode("Screen")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Resolution:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.screenWidth) + " x " + toDisplayString(deviceInfo.value.screenHeight), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Color Depth:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.colorDepth) + "-bit ", 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Pixel Ratio:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.pixelRatio) + "x ", 1)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Hardware`);
                      } else {
                        return [
                          createTextVNode("Hardware")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("Hardware")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Platform:</span> ${ssrInterpolate(deviceInfo.value.platform)}</div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>CPU Cores:</span> ${ssrInterpolate(deviceInfo.value.hardwareConcurrency)}</div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Memory:</span> ${ssrInterpolate(deviceInfo.value.deviceMemory || "Unknown")} GB </div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Touch Points:</span> ${ssrInterpolate(deviceInfo.value.maxTouchPoints)}</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Platform:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.platform), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "CPU Cores:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.hardwareConcurrency), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Memory:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.deviceMemory || "Unknown") + " GB ", 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Touch Points:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.maxTouchPoints), 1)
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
                  createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode("Hardware")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Platform:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.platform), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "CPU Cores:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.hardwareConcurrency), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Memory:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.deviceMemory || "Unknown") + " GB ", 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Touch Points:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.maxTouchPoints), 1)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Network`);
                      } else {
                        return [
                          createTextVNode("Network")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("Network")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Type:</span> ${ssrInterpolate(deviceInfo.value.connection.effectiveType)}</div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Downlink:</span> ${ssrInterpolate(deviceInfo.value.connection.downlink)} Mbps </div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>RTT:</span> ${ssrInterpolate(deviceInfo.value.connection.rtt)} ms </div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Type:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.connection.effectiveType), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Downlink:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.connection.downlink) + " Mbps ", 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "RTT:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.connection.rtt) + " ms ", 1)
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
                  createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode("Network")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Type:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.connection.effectiveType), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Downlink:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.connection.downlink) + " Mbps ", 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "RTT:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.connection.rtt) + " ms ", 1)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Location &amp; Time`);
                      } else {
                        return [
                          createTextVNode("Location & Time")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("Location & Time")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Timezone:</span> ${ssrInterpolate(deviceInfo.value.timezone)}</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-muted-foreground" }, "Timezone:"),
                      createTextVNode(" " + toDisplayString(deviceInfo.value.timezone), 1)
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
                  createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode("Location & Time")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("span", { class: "text-muted-foreground" }, "Timezone:"),
                    createTextVNode(" " + toDisplayString(deviceInfo.value.timezone), 1)
                  ])
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`User Agent`);
                      } else {
                        return [
                          createTextVNode("User Agent")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("User Agent")
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
                  _push3(`<div class="p-3 rounded bg-muted font-mono text-xs break-all"${_scopeId2}>${ssrInterpolate(deviceInfo.value.userAgent)}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-3 rounded bg-muted font-mono text-xs break-all" }, toDisplayString(deviceInfo.value.userAgent), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode("User Agent")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-3 rounded bg-muted font-mono text-xs break-all" }, toDisplayString(deviceInfo.value.userAgent), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/DeviceInformationView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
