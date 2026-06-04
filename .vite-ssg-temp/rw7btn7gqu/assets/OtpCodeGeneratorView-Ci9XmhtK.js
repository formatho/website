import { defineComponent, ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelSelect, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
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
  __name: "OtpCodeGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const secret = ref("");
    const digits = ref(6);
    const period = ref(30);
    const otpCode = ref("");
    const remainingTime = ref(30);
    let interval = null;
    const base32Decode = (base32) => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      const cleaned = base32.toUpperCase().replace(/[^A-Z2-7]/g, "");
      const bits = cleaned.split("").map((c) => alphabet.indexOf(c).toString(2).padStart(5, "0")).join("");
      const bytes = new Uint8Array(Math.floor(bits.length / 8));
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(bits.substr(i * 8, 8), 2);
      }
      return bytes;
    };
    const hmacSha1 = async (key, message) => {
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        key.buffer,
        { name: "HMAC", hash: "SHA-1" },
        false,
        ["sign"]
      );
      return crypto.subtle.sign("HMAC", cryptoKey, message.buffer);
    };
    const generateTOTP = async () => {
      if (!secret.value) return;
      try {
        const key = base32Decode(secret.value);
        const counter = Math.floor(Date.now() / 1e3 / period.value);
        const counterBuffer = new ArrayBuffer(8);
        const counterView = new DataView(counterBuffer);
        counterView.setUint32(4, counter, false);
        const hmac = await hmacSha1(key, new Uint8Array(counterBuffer));
        const hmacArray = new Uint8Array(hmac);
        const lastByte = hmacArray[hmacArray.length - 1] ?? 0;
        const offset = lastByte & 15;
        const o0 = hmacArray[offset] ?? 0;
        const o1 = hmacArray[offset + 1] ?? 0;
        const o2 = hmacArray[offset + 2] ?? 0;
        const o3 = hmacArray[offset + 3] ?? 0;
        const code = ((o0 & 127) << 24 | (o1 & 255) << 16 | (o2 & 255) << 8 | o3 & 255) % Math.pow(10, digits.value);
        otpCode.value = code.toString().padStart(digits.value, "0");
      } catch (e) {
        otpCode.value = "Invalid secret";
      }
    };
    const updateRemainingTime = () => {
      remainingTime.value = period.value - Math.floor(Date.now() / 1e3) % period.value;
    };
    onMounted(() => {
      interval = window.setInterval(() => {
        updateRemainingTime();
        if (remainingTime.value === period.value) {
          generateTOTP();
        }
      }, 1e3);
    });
    onUnmounted(() => {
      if (interval) clearInterval(interval);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">OTP/TOTP Generator</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate TOTP Code`);
                      } else {
                        return [
                          createTextVNode("Generate TOTP Code")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate TOTP Code")
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
                        _push4(`Secret (Base32)`);
                      } else {
                        return [
                          createTextVNode("Secret (Base32)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: secret.value,
                    "onUpdate:modelValue": ($event) => secret.value = $event,
                    placeholder: "Enter secret...",
                    class: "font-mono uppercase"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Digits`);
                      } else {
                        return [
                          createTextVNode("Digits")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><option${ssrRenderAttr("value", 6)}${ssrIncludeBooleanAttr(Array.isArray(digits.value) ? ssrLooseContain(digits.value, 6) : ssrLooseEqual(digits.value, 6)) ? " selected" : ""}${_scopeId2}>6 digits</option><option${ssrRenderAttr("value", 8)}${ssrIncludeBooleanAttr(Array.isArray(digits.value) ? ssrLooseContain(digits.value, 8) : ssrLooseEqual(digits.value, 8)) ? " selected" : ""}${_scopeId2}>8 digits</option></select></div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Period (seconds)`);
                      } else {
                        return [
                          createTextVNode("Period (seconds)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><option${ssrRenderAttr("value", 30)}${ssrIncludeBooleanAttr(Array.isArray(period.value) ? ssrLooseContain(period.value, 30) : ssrLooseEqual(period.value, 30)) ? " selected" : ""}${_scopeId2}>30 seconds</option><option${ssrRenderAttr("value", 60)}${ssrIncludeBooleanAttr(Array.isArray(period.value) ? ssrLooseContain(period.value, 60) : ssrLooseEqual(period.value, 60)) ? " selected" : ""}${_scopeId2}>60 seconds</option></select></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: generateTOTP,
                    class: "w-full md:w-auto",
                    "aria-label": "Generate TOTP code"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate Code`);
                      } else {
                        return [
                          createTextVNode("Generate Code")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Secret (Base32)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: secret.value,
                          "onUpdate:modelValue": ($event) => secret.value = $event,
                          placeholder: "Enter secret...",
                          class: "font-mono uppercase"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Digits")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => digits.value = $event,
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, [
                          createVNode("option", { value: 6 }, "6 digits"),
                          createVNode("option", { value: 8 }, "8 digits")
                        ], 8, ["onUpdate:modelValue"]), [
                          [
                            vModelSelect,
                            digits.value,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Period (seconds)")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => period.value = $event,
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, [
                          createVNode("option", { value: 30 }, "30 seconds"),
                          createVNode("option", { value: 60 }, "60 seconds")
                        ], 8, ["onUpdate:modelValue"]), [
                          [
                            vModelSelect,
                            period.value,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      onClick: generateTOTP,
                      class: "w-full md:w-auto",
                      "aria-label": "Generate TOTP code"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate Code")
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
                      createTextVNode("Generate TOTP Code")
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
                          createTextVNode("Secret (Base32)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: secret.value,
                        "onUpdate:modelValue": ($event) => secret.value = $event,
                        placeholder: "Enter secret...",
                        class: "font-mono uppercase"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Digits")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => digits.value = $event,
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        createVNode("option", { value: 6 }, "6 digits"),
                        createVNode("option", { value: 8 }, "8 digits")
                      ], 8, ["onUpdate:modelValue"]), [
                        [
                          vModelSelect,
                          digits.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Period (seconds)")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => period.value = $event,
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        createVNode("option", { value: 30 }, "30 seconds"),
                        createVNode("option", { value: 60 }, "60 seconds")
                      ], 8, ["onUpdate:modelValue"]), [
                        [
                          vModelSelect,
                          period.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$7), {
                    onClick: generateTOTP,
                    class: "w-full md:w-auto",
                    "aria-label": "Generate TOTP code"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Generate Code")
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
      if (otpCode.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-2"${_scopeId2}>OTP Code</div><div class="text-5xl font-mono font-bold tracking-widest"${_scopeId2}>${ssrInterpolate(otpCode.value)}</div><div class="mt-4"${_scopeId2}><div class="h-2 bg-muted rounded-full overflow-hidden"${_scopeId2}><div class="h-full bg-primary transition-all duration-1000" style="${ssrRenderStyle({ width: `${remainingTime.value / period.value * 100}%` })}"${_scopeId2}></div></div><div class="text-sm text-muted-foreground mt-2"${_scopeId2}>Expires in ${ssrInterpolate(remainingTime.value)}s</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "OTP Code"),
                      createVNode("div", { class: "text-5xl font-mono font-bold tracking-widest" }, toDisplayString(otpCode.value), 1),
                      createVNode("div", { class: "mt-4" }, [
                        createVNode("div", { class: "h-2 bg-muted rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: "h-full bg-primary transition-all duration-1000",
                            style: { width: `${remainingTime.value / period.value * 100}%` }
                          }, null, 4)
                        ]),
                        createVNode("div", { class: "text-sm text-muted-foreground mt-2" }, "Expires in " + toDisplayString(remainingTime.value) + "s", 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "OTP Code"),
                    createVNode("div", { class: "text-5xl font-mono font-bold tracking-widest" }, toDisplayString(otpCode.value), 1),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode("div", { class: "h-2 bg-muted rounded-full overflow-hidden" }, [
                        createVNode("div", {
                          class: "h-full bg-primary transition-all duration-1000",
                          style: { width: `${remainingTime.value / period.value * 100}%` }
                        }, null, 4)
                      ]),
                      createVNode("div", { class: "text-sm text-muted-foreground mt-2" }, "Expires in " + toDisplayString(remainingTime.value) + "s", 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/OtpCodeGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
