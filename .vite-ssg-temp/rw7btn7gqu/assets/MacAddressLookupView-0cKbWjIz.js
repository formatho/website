import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
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
  __name: "MacAddressLookupView",
  __ssrInlineRender: true,
  setup(__props) {
    const macAddress = ref("");
    const macVendors = {
      "00:1A:11": "Dell Inc.",
      "00:1B:21": "Dell Inc.",
      "00:1C:23": "Dell Inc.",
      "00:1D:09": "Dell Inc.",
      "00:1E:C9": "Dell Inc.",
      "00:50:56": "VMware, Inc.",
      "00:0C:29": "VMware, Inc.",
      "00:05:69": "VMware, Inc.",
      "00:1C:14": "VMware, Inc.",
      "00:0F:4B": "ASUSTek Computer Inc.",
      "00:1A:92": "ASUSTek Computer Inc.",
      "00:1E:8C": "ASUSTek Computer Inc.",
      "00:1F:F3": "ASUSTek Computer Inc.",
      "00:26:18": "ASUSTek Computer Inc.",
      "00:03:FF": "Apple, Inc.",
      "00:05:02": "Apple, Inc.",
      "00:0A:27": "Apple, Inc.",
      "00:0A:95": "Apple, Inc.",
      "00:0D:93": "Apple, Inc.",
      "00:10:FA": "Apple, Inc.",
      "00:11:24": "Apple, Inc.",
      "00:14:51": "Apple, Inc.",
      "00:16:CB": "Apple, Inc.",
      "00:17:F2": "Apple, Inc.",
      "00:19:E3": "Apple, Inc.",
      "00:1B:63": "Apple, Inc.",
      "00:1C:B3": "Apple, Inc.",
      "00:1D:4F": "Apple, Inc.",
      "00:1E:52": "Apple, Inc.",
      "00:1E:C2": "Apple, Inc.",
      "00:1F:5B": "Apple, Inc.",
      "00:1F:F6": "Apple, Inc.",
      "00:22:41": "Apple, Inc.",
      "00:23:12": "Apple, Inc.",
      "00:23:6C": "Apple, Inc.",
      "00:23:DF": "Apple, Inc.",
      "00:24:36": "Apple, Inc.",
      "00:25:00": "Apple, Inc.",
      "00:25:4B": "Apple, Inc.",
      "00:25:BC": "Apple, Inc.",
      "00:26:08": "Apple, Inc.",
      "00:26:4A": "Apple, Inc.",
      "00:26:B0": "Apple, Inc.",
      "00:26:BB": "Apple, Inc.",
      "00:30:65": "Apple, Inc.",
      "D8:1C:79": "Samsung Electronics",
      "00:12:FB": "Samsung Electronics",
      "00:16:6B": "Samsung Electronics",
      "00:17:C2": "Samsung Electronics",
      "00:18:AF": "Samsung Electronics",
      "00:1A:8A": "Samsung Electronics",
      "00:1E:7D": "Samsung Electronics",
      "00:1F:27": "Samsung Electronics"
    };
    const macInfo = ref(null);
    const lookupMac = () => {
      if (!macAddress.value) {
        macInfo.value = null;
        return;
      }
      const clean = macAddress.value.replace(/[:\-.]/g, "").toUpperCase();
      if (clean.length !== 12) {
        macInfo.value = null;
        return;
      }
      const formatted = clean.match(/.{2}/g)?.join(":") || "";
      const oui = formatted.substring(0, 8);
      macInfo.value = {
        formatted,
        vendor: macVendors[oui] || "Unknown vendor"
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">MAC Address Lookup</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Lookup MAC Address`);
                      } else {
                        return [
                          createTextVNode("Lookup MAC Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Lookup MAC Address")
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
                        _push4(`MAC Address`);
                      } else {
                        return [
                          createTextVNode("MAC Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: macAddress.value,
                    "onUpdate:modelValue": ($event) => macAddress.value = $event,
                    onInput: lookupMac,
                    "aria-label": "MAC address to look up",
                    placeholder: "00:1A:2B:3C:4D:5E",
                    class: "font-mono uppercase"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("MAC Address")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: macAddress.value,
                        "onUpdate:modelValue": ($event) => macAddress.value = $event,
                        onInput: lookupMac,
                        "aria-label": "MAC address to look up",
                        placeholder: "00:1A:2B:3C:4D:5E",
                        class: "font-mono uppercase"
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
                      createTextVNode("Lookup MAC Address")
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
                        createTextVNode("MAC Address")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: macAddress.value,
                      "onUpdate:modelValue": ($event) => macAddress.value = $event,
                      onInput: lookupMac,
                      "aria-label": "MAC address to look up",
                      placeholder: "00:1A:2B:3C:4D:5E",
                      class: "font-mono uppercase"
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
      if (macInfo.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Formatted MAC</div><div class="text-2xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(macInfo.value.formatted)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Formatted MAC"),
                      createVNode("div", { class: "text-2xl font-mono font-bold" }, toDisplayString(macInfo.value.formatted), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Formatted MAC"),
                    createVNode("div", { class: "text-2xl font-mono font-bold" }, toDisplayString(macInfo.value.formatted), 1)
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
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Vendor</div><div class="text-xl font-bold"${_scopeId2}>${ssrInterpolate(macInfo.value.vendor)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Vendor"),
                      createVNode("div", { class: "text-xl font-bold" }, toDisplayString(macInfo.value.vendor), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Vendor"),
                    createVNode("div", { class: "text-xl font-bold" }, toDisplayString(macInfo.value.vendor), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/MacAddressLookupView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
