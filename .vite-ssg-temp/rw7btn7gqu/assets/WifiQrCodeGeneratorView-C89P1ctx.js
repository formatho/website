import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
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
  __name: "WifiQrCodeGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const ssid = ref("");
    const password = ref("");
    const encryption = ref("WPA");
    const qrDataUrl = ref("");
    const generateQR = async () => {
      if (!ssid.value) return;
      const wifiString = `WIFI:T:${encryption.value};S:${ssid.value};P:${password.value};;`;
      const size = 300;
      qrDataUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(wifiString)}`;
    };
    const downloadQR = () => {
      const a = document.createElement("a");
      a.href = qrDataUrl.value;
      a.download = `wifi-${ssid.value}.png`;
      a.click();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">WiFi QR Code Generator</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`WiFi Details`);
                      } else {
                        return [
                          createTextVNode("WiFi Details")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("WiFi Details")
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
                        _push4(`Network Name (SSID)`);
                      } else {
                        return [
                          createTextVNode("Network Name (SSID)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: ssid.value,
                    "onUpdate:modelValue": ($event) => ssid.value = $event,
                    "aria-label": "WiFi network name",
                    placeholder: "Enter WiFi network name..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: password.value,
                    "onUpdate:modelValue": ($event) => password.value = $event,
                    type: "password",
                    "aria-label": "WiFi password",
                    placeholder: "Enter WiFi password..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Encryption`);
                      } else {
                        return [
                          createTextVNode("Encryption")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select aria-label="WiFi encryption type" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><option value="WPA"${ssrIncludeBooleanAttr(Array.isArray(encryption.value) ? ssrLooseContain(encryption.value, "WPA") : ssrLooseEqual(encryption.value, "WPA")) ? " selected" : ""}${_scopeId2}>WPA/WPA2</option><option value="WEP"${ssrIncludeBooleanAttr(Array.isArray(encryption.value) ? ssrLooseContain(encryption.value, "WEP") : ssrLooseEqual(encryption.value, "WEP")) ? " selected" : ""}${_scopeId2}>WEP</option><option value="nopass"${ssrIncludeBooleanAttr(Array.isArray(encryption.value) ? ssrLooseContain(encryption.value, "nopass") : ssrLooseEqual(encryption.value, "nopass")) ? " selected" : ""}${_scopeId2}>No Password</option></select></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: generateQR,
                    class: "w-full",
                    "aria-label": "Generate WiFi QR code"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate QR Code`);
                      } else {
                        return [
                          createTextVNode("Generate QR Code")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Network Name (SSID)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: ssid.value,
                        "onUpdate:modelValue": ($event) => ssid.value = $event,
                        "aria-label": "WiFi network name",
                        placeholder: "Enter WiFi network name..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: password.value,
                        "onUpdate:modelValue": ($event) => password.value = $event,
                        type: "password",
                        "aria-label": "WiFi password",
                        placeholder: "Enter WiFi password..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Encryption")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => encryption.value = $event,
                        "aria-label": "WiFi encryption type",
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        createVNode("option", { value: "WPA" }, "WPA/WPA2"),
                        createVNode("option", { value: "WEP" }, "WEP"),
                        createVNode("option", { value: "nopass" }, "No Password")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, encryption.value]
                      ])
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      onClick: generateQR,
                      class: "w-full",
                      "aria-label": "Generate WiFi QR code"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate QR Code")
                      ]),
                      _: 1
                    })
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
                      createTextVNode("WiFi Details")
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
                        createTextVNode("Network Name (SSID)")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: ssid.value,
                      "onUpdate:modelValue": ($event) => ssid.value = $event,
                      "aria-label": "WiFi network name",
                      placeholder: "Enter WiFi network name..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Password")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: password.value,
                      "onUpdate:modelValue": ($event) => password.value = $event,
                      type: "password",
                      "aria-label": "WiFi password",
                      placeholder: "Enter WiFi password..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Encryption")
                      ]),
                      _: 1
                    }),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => encryption.value = $event,
                      "aria-label": "WiFi encryption type",
                      class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    }, [
                      createVNode("option", { value: "WPA" }, "WPA/WPA2"),
                      createVNode("option", { value: "WEP" }, "WEP"),
                      createVNode("option", { value: "nopass" }, "No Password")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, encryption.value]
                    ])
                  ]),
                  createVNode(unref(_sfc_main$7), {
                    onClick: generateQR,
                    class: "w-full",
                    "aria-label": "Generate WiFi QR code"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Generate QR Code")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (qrDataUrl.value) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`QR Code`);
                        } else {
                          return [
                            createTextVNode("QR Code")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      variant: "outline",
                      size: "sm",
                      onClick: downloadQR,
                      "aria-label": "Download QR code"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Download`);
                        } else {
                          return [
                            createTextVNode("Download")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("QR Code")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        size: "sm",
                        onClick: downloadQR,
                        "aria-label": "Download QR code"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Download")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex justify-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", qrDataUrl.value)} alt="WiFi QR Code" class="max-w-full rounded-lg shadow-lg"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: qrDataUrl.value,
                        alt: "WiFi QR Code",
                        class: "max-w-full rounded-lg shadow-lg"
                      }, null, 8, ["src"])
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
                        createTextVNode("QR Code")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      variant: "outline",
                      size: "sm",
                      onClick: downloadQR,
                      "aria-label": "Download QR code"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Download")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "flex justify-center" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: qrDataUrl.value,
                      alt: "WiFi QR Code",
                      class: "max-w-full rounded-lg shadow-lg"
                    }, null, 8, ["src"])
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/WifiQrCodeGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
