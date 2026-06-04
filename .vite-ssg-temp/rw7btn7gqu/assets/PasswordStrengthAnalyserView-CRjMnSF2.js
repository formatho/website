import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
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
  __name: "PasswordStrengthAnalyserView",
  __ssrInlineRender: true,
  setup(__props) {
    const password = ref("");
    const analysis = computed(() => {
      const pwd = password.value;
      if (!pwd) {
        return {
          score: 0,
          level: "None",
          color: "bg-gray-400",
          checks: {
            length: false,
            uppercase: false,
            lowercase: false,
            numbers: false,
            symbols: false,
            noCommon: true
          },
          entropy: 0,
          crackTime: "Instant"
        };
      }
      const checks = {
        length: pwd.length >= 12,
        uppercase: /[A-Z]/.test(pwd),
        lowercase: /[a-z]/.test(pwd),
        numbers: /[0-9]/.test(pwd),
        symbols: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        noCommon: !["password", "123456", "qwerty", "admin", "letmein"].includes(pwd.toLowerCase())
      };
      let poolSize = 0;
      if (checks.lowercase) poolSize += 26;
      if (checks.uppercase) poolSize += 26;
      if (checks.numbers) poolSize += 10;
      if (checks.symbols) poolSize += 32;
      const entropy = pwd.length * Math.log2(poolSize || 1);
      let score = 0;
      if (checks.length) score++;
      if (checks.uppercase) score++;
      if (checks.lowercase) score++;
      if (checks.numbers) score++;
      if (checks.symbols) score++;
      if (checks.noCommon) score++;
      const levels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
      const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-emerald-500"
      ];
      const levelIndex = Math.min(Math.floor(score), 5);
      const level = levels[levelIndex] ?? "Very Weak";
      const color = colors[levelIndex] ?? "bg-red-500";
      const combinations = Math.pow(2, entropy);
      const seconds = combinations / 1e10;
      let crackTime = "";
      if (seconds < 1) crackTime = "Instant";
      else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
      else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
      else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
      else if (seconds < 31536e3) crackTime = `${Math.round(seconds / 86400)} days`;
      else if (seconds < 31536e3 * 100) crackTime = `${Math.round(seconds / 31536e3)} years`;
      else if (seconds < 31536e3 * 1e6)
        crackTime = `${Math.round(seconds / 31536e3 / 1e3)} thousand years`;
      else crackTime = "Millions of years+";
      return {
        score,
        level,
        color,
        checks,
        entropy: Math.round(entropy),
        crackTime
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Password Strength Analyzer</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Analyze Password`);
                      } else {
                        return [
                          createTextVNode("Analyze Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Analyze Password")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 space-y-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
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
                    "aria-label": "Password to analyze",
                    placeholder: "Enter password to analyze..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (password.value) {
                    _push3(`<div class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}><div class="flex justify-between text-sm"${_scopeId2}><span${_scopeId2}>Strength: ${ssrInterpolate(analysis.value.level)}</span><span${_scopeId2}>${ssrInterpolate(analysis.value.score)}/6 checks passed</span></div><div class="h-3 bg-gray-200 rounded-full overflow-hidden"${_scopeId2}><div class="${ssrRenderClass([analysis.value.color, "h-full transition-all duration-300"])}" style="${ssrRenderStyle({ width: `${analysis.value.score / 6 * 100}%` })}"${_scopeId2}></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Entropy</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(analysis.value.entropy)} bits</div></div><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Estimated Crack Time</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(analysis.value.crackTime)}</div></div></div><div class="grid grid-cols-2 md:grid-cols-3 gap-3"${_scopeId2}><div class="${ssrRenderClass([
                      "p-3 rounded-lg flex items-center gap-2",
                      analysis.value.checks.length ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    ])}"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(analysis.value.checks.length ? "✓" : "✗")}</span><span class="text-sm"${_scopeId2}>12+ characters</span></div><div class="${ssrRenderClass([
                      "p-3 rounded-lg flex items-center gap-2",
                      analysis.value.checks.uppercase ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    ])}"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(analysis.value.checks.uppercase ? "✓" : "✗")}</span><span class="text-sm"${_scopeId2}>Uppercase</span></div><div class="${ssrRenderClass([
                      "p-3 rounded-lg flex items-center gap-2",
                      analysis.value.checks.lowercase ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    ])}"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(analysis.value.checks.lowercase ? "✓" : "✗")}</span><span class="text-sm"${_scopeId2}>Lowercase</span></div><div class="${ssrRenderClass([
                      "p-3 rounded-lg flex items-center gap-2",
                      analysis.value.checks.numbers ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    ])}"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(analysis.value.checks.numbers ? "✓" : "✗")}</span><span class="text-sm"${_scopeId2}>Numbers</span></div><div class="${ssrRenderClass([
                      "p-3 rounded-lg flex items-center gap-2",
                      analysis.value.checks.symbols ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    ])}"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(analysis.value.checks.symbols ? "✓" : "✗")}</span><span class="text-sm"${_scopeId2}>Symbols</span></div><div class="${ssrRenderClass([
                      "p-3 rounded-lg flex items-center gap-2",
                      analysis.value.checks.noCommon ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    ])}"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(analysis.value.checks.noCommon ? "✓" : "✗")}</span><span class="text-sm"${_scopeId2}>Not common</span></div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
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
                        "aria-label": "Password to analyze",
                        placeholder: "Enter password to analyze..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    password.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", null, "Strength: " + toDisplayString(analysis.value.level), 1),
                          createVNode("span", null, toDisplayString(analysis.value.score) + "/6 checks passed", 1)
                        ]),
                        createVNode("div", { class: "h-3 bg-gray-200 rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: [analysis.value.color, "h-full transition-all duration-300"],
                            style: { width: `${analysis.value.score / 6 * 100}%` }
                          }, null, 6)
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                          createVNode("div", { class: "text-sm text-muted-foreground" }, "Entropy"),
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(analysis.value.entropy) + " bits", 1)
                        ]),
                        createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                          createVNode("div", { class: "text-sm text-muted-foreground" }, "Estimated Crack Time"),
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(analysis.value.crackTime), 1)
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 gap-3" }, [
                        createVNode("div", {
                          class: [
                            "p-3 rounded-lg flex items-center gap-2",
                            analysis.value.checks.length ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                          ]
                        }, [
                          createVNode("span", null, toDisplayString(analysis.value.checks.length ? "✓" : "✗"), 1),
                          createVNode("span", { class: "text-sm" }, "12+ characters")
                        ], 2),
                        createVNode("div", {
                          class: [
                            "p-3 rounded-lg flex items-center gap-2",
                            analysis.value.checks.uppercase ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                          ]
                        }, [
                          createVNode("span", null, toDisplayString(analysis.value.checks.uppercase ? "✓" : "✗"), 1),
                          createVNode("span", { class: "text-sm" }, "Uppercase")
                        ], 2),
                        createVNode("div", {
                          class: [
                            "p-3 rounded-lg flex items-center gap-2",
                            analysis.value.checks.lowercase ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                          ]
                        }, [
                          createVNode("span", null, toDisplayString(analysis.value.checks.lowercase ? "✓" : "✗"), 1),
                          createVNode("span", { class: "text-sm" }, "Lowercase")
                        ], 2),
                        createVNode("div", {
                          class: [
                            "p-3 rounded-lg flex items-center gap-2",
                            analysis.value.checks.numbers ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                          ]
                        }, [
                          createVNode("span", null, toDisplayString(analysis.value.checks.numbers ? "✓" : "✗"), 1),
                          createVNode("span", { class: "text-sm" }, "Numbers")
                        ], 2),
                        createVNode("div", {
                          class: [
                            "p-3 rounded-lg flex items-center gap-2",
                            analysis.value.checks.symbols ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                          ]
                        }, [
                          createVNode("span", null, toDisplayString(analysis.value.checks.symbols ? "✓" : "✗"), 1),
                          createVNode("span", { class: "text-sm" }, "Symbols")
                        ], 2),
                        createVNode("div", {
                          class: [
                            "p-3 rounded-lg flex items-center gap-2",
                            analysis.value.checks.noCommon ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                          ]
                        }, [
                          createVNode("span", null, toDisplayString(analysis.value.checks.noCommon ? "✓" : "✗"), 1),
                          createVNode("span", { class: "text-sm" }, "Not common")
                        ], 2)
                      ])
                    ])) : createCommentVNode("", true)
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
                      createTextVNode("Analyze Password")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-6" }, {
                default: withCtx(() => [
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
                      "aria-label": "Password to analyze",
                      placeholder: "Enter password to analyze..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  password.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", null, "Strength: " + toDisplayString(analysis.value.level), 1),
                        createVNode("span", null, toDisplayString(analysis.value.score) + "/6 checks passed", 1)
                      ]),
                      createVNode("div", { class: "h-3 bg-gray-200 rounded-full overflow-hidden" }, [
                        createVNode("div", {
                          class: [analysis.value.color, "h-full transition-all duration-300"],
                          style: { width: `${analysis.value.score / 6 * 100}%` }
                        }, null, 6)
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Entropy"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(analysis.value.entropy) + " bits", 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Estimated Crack Time"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(analysis.value.crackTime), 1)
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 gap-3" }, [
                      createVNode("div", {
                        class: [
                          "p-3 rounded-lg flex items-center gap-2",
                          analysis.value.checks.length ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        ]
                      }, [
                        createVNode("span", null, toDisplayString(analysis.value.checks.length ? "✓" : "✗"), 1),
                        createVNode("span", { class: "text-sm" }, "12+ characters")
                      ], 2),
                      createVNode("div", {
                        class: [
                          "p-3 rounded-lg flex items-center gap-2",
                          analysis.value.checks.uppercase ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        ]
                      }, [
                        createVNode("span", null, toDisplayString(analysis.value.checks.uppercase ? "✓" : "✗"), 1),
                        createVNode("span", { class: "text-sm" }, "Uppercase")
                      ], 2),
                      createVNode("div", {
                        class: [
                          "p-3 rounded-lg flex items-center gap-2",
                          analysis.value.checks.lowercase ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        ]
                      }, [
                        createVNode("span", null, toDisplayString(analysis.value.checks.lowercase ? "✓" : "✗"), 1),
                        createVNode("span", { class: "text-sm" }, "Lowercase")
                      ], 2),
                      createVNode("div", {
                        class: [
                          "p-3 rounded-lg flex items-center gap-2",
                          analysis.value.checks.numbers ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        ]
                      }, [
                        createVNode("span", null, toDisplayString(analysis.value.checks.numbers ? "✓" : "✗"), 1),
                        createVNode("span", { class: "text-sm" }, "Numbers")
                      ], 2),
                      createVNode("div", {
                        class: [
                          "p-3 rounded-lg flex items-center gap-2",
                          analysis.value.checks.symbols ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        ]
                      }, [
                        createVNode("span", null, toDisplayString(analysis.value.checks.symbols ? "✓" : "✗"), 1),
                        createVNode("span", { class: "text-sm" }, "Symbols")
                      ], 2),
                      createVNode("div", {
                        class: [
                          "p-3 rounded-lg flex items-center gap-2",
                          analysis.value.checks.noCommon ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        ]
                      }, [
                        createVNode("span", null, toDisplayString(analysis.value.checks.noCommon ? "✓" : "✗"), 1),
                        createVNode("span", { class: "text-sm" }, "Not common")
                      ], 2)
                    ])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PasswordStrengthAnalyserView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
