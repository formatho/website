import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
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
  __name: "Ipv4RangeExpanderView",
  __ssrInlineRender: true,
  setup(__props) {
    const startIp = ref("");
    const endIp = ref("");
    const expandedIps = computed(() => {
      if (!startIp.value || !endIp.value) return [];
      const startParts = startIp.value.split(".").map((p) => parseInt(p, 10));
      const endParts = endIp.value.split(".").map((p) => parseInt(p, 10));
      if (startParts.length !== 4 || endParts.length !== 4) return [];
      if (startParts.some((p) => isNaN(p) || p < 0 || p > 255)) return [];
      if (endParts.some((p) => isNaN(p) || p < 0 || p > 255)) return [];
      const s0 = startParts[0] ?? 0;
      const s1 = startParts[1] ?? 0;
      const s2 = startParts[2] ?? 0;
      const s3 = startParts[3] ?? 0;
      const e0 = endParts[0] ?? 0;
      const e1 = endParts[1] ?? 0;
      const e2 = endParts[2] ?? 0;
      const e3 = endParts[3] ?? 0;
      const startNum = (s0 << 24) + (s1 << 16) + (s2 << 8) + s3;
      const endNum = (e0 << 24) + (e1 << 16) + (e2 << 8) + e3;
      if (endNum < startNum) return [];
      const numToIp = (num) => [num >>> 24 & 255, num >>> 16 & 255, num >>> 8 & 255, num & 255].join(".");
      const count = endNum - startNum + 1;
      if (count > 256) {
        return [{ ip: `Too many IPs (${count.toLocaleString()}). Max 256.`, index: 0 }];
      }
      return Array.from({ length: count }, (_, i) => ({
        ip: numToIp(startNum + i),
        index: i + 1
      }));
    });
    const copyAll = () => {
      const ips = expandedIps.value.map((e) => e.ip).join("\n");
      if (ips) navigator.clipboard.writeText(ips);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">IPv4 Range Expander</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`IP Range`);
                      } else {
                        return [
                          createTextVNode("IP Range")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("IP Range")
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
                        _push4(`Start IP`);
                      } else {
                        return [
                          createTextVNode("Start IP")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: startIp.value,
                    "onUpdate:modelValue": ($event) => startIp.value = $event,
                    placeholder: "192.168.1.1",
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`End IP`);
                      } else {
                        return [
                          createTextVNode("End IP")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: endIp.value,
                    "onUpdate:modelValue": ($event) => endIp.value = $event,
                    placeholder: "192.168.1.10",
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Start IP")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: startIp.value,
                          "onUpdate:modelValue": ($event) => startIp.value = $event,
                          placeholder: "192.168.1.1",
                          class: "font-mono"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("End IP")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: endIp.value,
                          "onUpdate:modelValue": ($event) => endIp.value = $event,
                          placeholder: "192.168.1.10",
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
                      createTextVNode("IP Range")
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
                          createTextVNode("Start IP")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: startIp.value,
                        "onUpdate:modelValue": ($event) => startIp.value = $event,
                        placeholder: "192.168.1.1",
                        class: "font-mono"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("End IP")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: endIp.value,
                        "onUpdate:modelValue": ($event) => endIp.value = $event,
                        placeholder: "192.168.1.10",
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
      if (expandedIps.value.length > 0) {
        _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0 flex-1" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Expanded IPs (${ssrInterpolate(expandedIps.value.length)})`);
                        } else {
                          return [
                            createTextVNode("Expanded IPs (" + toDisplayString(expandedIps.value.length) + ")", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: copyAll,
                      "aria-label": "Copy all IP addresses"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Copy All`);
                        } else {
                          return [
                            createTextVNode("Copy All")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Expanded IPs (" + toDisplayString(expandedIps.value.length) + ")", 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Button, {
                        variant: "outline",
                        size: "sm",
                        onClick: copyAll,
                        "aria-label": "Copy all IP addresses"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Copy All")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0 overflow-y-auto" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(expandedIps.value, (item) => {
                      _push3(`<div class="flex items-center gap-4 p-2 rounded hover:bg-muted transition-colors"${_scopeId2}><span class="text-sm text-muted-foreground w-12"${_scopeId2}>${ssrInterpolate(item.index)}.</span><code class="font-mono"${_scopeId2}>${ssrInterpolate(item.ip)}</code></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "space-y-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(expandedIps.value, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.index,
                            class: "flex items-center gap-4 p-2 rounded hover:bg-muted transition-colors"
                          }, [
                            createVNode("span", { class: "text-sm text-muted-foreground w-12" }, toDisplayString(item.index) + ".", 1),
                            createVNode("code", { class: "font-mono" }, toDisplayString(item.ip), 1)
                          ]);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Expanded IPs (" + toDisplayString(expandedIps.value.length) + ")", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: copyAll,
                      "aria-label": "Copy all IP addresses"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy All")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0 overflow-y-auto" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(expandedIps.value, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.index,
                          class: "flex items-center gap-4 p-2 rounded hover:bg-muted transition-colors"
                        }, [
                          createVNode("span", { class: "text-sm text-muted-foreground w-12" }, toDisplayString(item.index) + ".", 1),
                          createVNode("code", { class: "font-mono" }, toDisplayString(item.ip), 1)
                        ]);
                      }), 128))
                    ])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Ipv4RangeExpanderView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
