import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$6 } from "../main.mjs";
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
  __name: "MacAddressGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const macAddress = ref("");
    const generateMac = () => {
      const bytes = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256));
      const firstByte = bytes[0] ?? 0;
      bytes[0] = firstByte & 254 | 2;
      macAddress.value = bytes.map((b) => b.toString(16).toUpperCase().padStart(2, "0")).join(":");
    };
    const copyMac = () => {
      navigator.clipboard.writeText(macAddress.value);
    };
    generateMac();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">MAC Address Generator</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate Random MAC Address`);
                      } else {
                        return [
                          createTextVNode("Generate Random MAC Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate Random MAC Address")
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
                        _push4(`Generated MAC`);
                      } else {
                        return [
                          createTextVNode("Generated MAC")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}><div class="flex-1 p-4 rounded-lg bg-muted font-mono text-2xl text-center"${_scopeId2}>${ssrInterpolate(macAddress.value)}</div></div></div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: generateMac,
                    class: "flex-1",
                    "aria-label": "Generate new MAC address"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate New`);
                      } else {
                        return [
                          createTextVNode("Generate New")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    variant: "outline",
                    onClick: copyMac,
                    "aria-label": "Copy MAC address"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Copy`);
                      } else {
                        return [
                          createTextVNode("Copy")
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
                          createTextVNode("Generated MAC")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode("div", { class: "flex-1 p-4 rounded-lg bg-muted font-mono text-2xl text-center" }, toDisplayString(macAddress.value), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$6), {
                        onClick: generateMac,
                        class: "flex-1",
                        "aria-label": "Generate new MAC address"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Generate New")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        variant: "outline",
                        onClick: copyMac,
                        "aria-label": "Copy MAC address"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Copy")
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
                      createTextVNode("Generate Random MAC Address")
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
                        createTextVNode("Generated MAC")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("div", { class: "flex-1 p-4 rounded-lg bg-muted font-mono text-2xl text-center" }, toDisplayString(macAddress.value), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$6), {
                      onClick: generateMac,
                      class: "flex-1",
                      "aria-label": "Generate new MAC address"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate New")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      variant: "outline",
                      onClick: copyMac,
                      "aria-label": "Copy MAC address"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy")
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
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`About MAC Addresses`);
                      } else {
                        return [
                          createTextVNode("About MAC Addresses")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("About MAC Addresses")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm text-muted-foreground space-y-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}> Generated MAC addresses have the locally administered bit set (bit 1 of the first octet). </p><p${_scopeId2}> This means they are suitable for virtual machines, testing, and other non-hardware use cases. </p><p${_scopeId2}>Format: XX:XX:XX:XX:XX:XX (hexadecimal)</p>`);
                } else {
                  return [
                    createVNode("p", null, " Generated MAC addresses have the locally administered bit set (bit 1 of the first octet). "),
                    createVNode("p", null, " This means they are suitable for virtual machines, testing, and other non-hardware use cases. "),
                    createVNode("p", null, "Format: XX:XX:XX:XX:XX:XX (hexadecimal)")
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
                      createTextVNode("About MAC Addresses")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "text-sm text-muted-foreground space-y-2" }, {
                default: withCtx(() => [
                  createVNode("p", null, " Generated MAC addresses have the locally administered bit set (bit 1 of the first octet). "),
                  createVNode("p", null, " This means they are suitable for virtual machines, testing, and other non-hardware use cases. "),
                  createVNode("p", null, "Format: XX:XX:XX:XX:XX:XX (hexadecimal)")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/MacAddressGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
