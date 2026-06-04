import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, toDisplayString, vModelText, vModelCheckbox, resolveDynamicComponent, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderVNode, ssrRenderList } from "vue/server-renderer";
import { Key, RefreshCw, Check, Copy } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$6 } from "../main.mjs";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
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
  __name: "TokenGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const length = ref(32);
    const count = ref(5);
    const includeUppercase = ref(true);
    const includeLowercase = ref(true);
    const includeNumbers = ref(true);
    const includeSymbols = ref(false);
    const customChars = ref("");
    const tokens = ref([]);
    const copied = ref(null);
    const charsets = computed(() => ({
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    }));
    const generateToken = () => {
      let chars = "";
      if (customChars.value) {
        chars = customChars.value;
      } else {
        if (includeUppercase.value) chars += charsets.value.uppercase;
        if (includeLowercase.value) chars += charsets.value.lowercase;
        if (includeNumbers.value) chars += charsets.value.numbers;
        if (includeSymbols.value) chars += charsets.value.symbols;
      }
      if (!chars) chars = charsets.value.lowercase + charsets.value.numbers;
      const bytes = new Uint8Array(length.value);
      crypto.getRandomValues(bytes);
      let token = "";
      for (let i = 0; i < length.value; i++) {
        const char = chars[bytes[i] % chars.length];
        token += char ?? "";
      }
      return token;
    };
    const generate = () => {
      tokens.value = Array.from({ length: count.value }, () => generateToken());
    };
    const copyToken = (index) => {
      const token = tokens.value[index];
      if (token) {
        navigator.clipboard.writeText(token);
        copied.value = index;
        setTimeout(() => copied.value = null, 2e3);
      }
    };
    const copyAll = () => {
      navigator.clipboard.writeText(tokens.value.join("\n"));
      copied.value = -1;
      setTimeout(() => copied.value = null, 2e3);
    };
    generate();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Key), { class: "w-8 h-8" }, null, _parent));
      _push(` Token Generator </h1><p class="text-muted-foreground mt-2">Generate secure random tokens and API keys.</p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Options`);
                      } else {
                        return [
                          createTextVNode("Options")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Configure token generation`);
                      } else {
                        return [
                          createTextVNode("Configure token generation")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Options")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Configure token generation")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Length: ${ssrInterpolate(length.value)}</label><input${ssrRenderAttr("value", length.value)} type="range" min="8" max="128" class="w-full"${_scopeId2}><div class="flex justify-between text-xs text-muted-foreground"${_scopeId2}><span${_scopeId2}>8</span><span${_scopeId2}>128</span></div></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Count</label><input${ssrRenderAttr("value", count.value)} type="number" min="1" max="100" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Character Sets</label><div class="space-y-2"${_scopeId2}><label class="flex items-center gap-2"${_scopeId2}><input${ssrIncludeBooleanAttr(Array.isArray(includeUppercase.value) ? ssrLooseContain(includeUppercase.value, null) : includeUppercase.value) ? " checked" : ""} type="checkbox" class="rounded"${_scopeId2}><span${_scopeId2}>Uppercase (A-Z)</span></label><label class="flex items-center gap-2"${_scopeId2}><input${ssrIncludeBooleanAttr(Array.isArray(includeLowercase.value) ? ssrLooseContain(includeLowercase.value, null) : includeLowercase.value) ? " checked" : ""} type="checkbox" class="rounded"${_scopeId2}><span${_scopeId2}>Lowercase (a-z)</span></label><label class="flex items-center gap-2"${_scopeId2}><input${ssrIncludeBooleanAttr(Array.isArray(includeNumbers.value) ? ssrLooseContain(includeNumbers.value, null) : includeNumbers.value) ? " checked" : ""} type="checkbox" class="rounded"${_scopeId2}><span${_scopeId2}>Numbers (0-9)</span></label><label class="flex items-center gap-2"${_scopeId2}><input${ssrIncludeBooleanAttr(Array.isArray(includeSymbols.value) ? ssrLooseContain(includeSymbols.value, null) : includeSymbols.value) ? " checked" : ""} type="checkbox" class="rounded"${_scopeId2}><span${_scopeId2}>Symbols (!@#$...)</span></label></div></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Custom Characters (optional)</label><input${ssrRenderAttr("value", customChars.value)} type="text" placeholder="e.g., ABCDEF0123456789" class="w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: generate,
                    class: "w-full",
                    "aria-label": "Generate secure token"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Generate Tokens `);
                      } else {
                        return [
                          createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Generate Tokens ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Length: " + toDisplayString(length.value), 1),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => length.value = $event,
                        type: "range",
                        min: "8",
                        max: "128",
                        class: "w-full"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          length.value,
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createVNode("div", { class: "flex justify-between text-xs text-muted-foreground" }, [
                        createVNode("span", null, "8"),
                        createVNode("span", null, "128")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Count"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => count.value = $event,
                        type: "number",
                        min: "1",
                        max: "100",
                        class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          count.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Character Sets"),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "flex items-center gap-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => includeUppercase.value = $event,
                            type: "checkbox",
                            class: "rounded"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, includeUppercase.value]
                          ]),
                          createVNode("span", null, "Uppercase (A-Z)")
                        ]),
                        createVNode("label", { class: "flex items-center gap-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => includeLowercase.value = $event,
                            type: "checkbox",
                            class: "rounded"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, includeLowercase.value]
                          ]),
                          createVNode("span", null, "Lowercase (a-z)")
                        ]),
                        createVNode("label", { class: "flex items-center gap-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => includeNumbers.value = $event,
                            type: "checkbox",
                            class: "rounded"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, includeNumbers.value]
                          ]),
                          createVNode("span", null, "Numbers (0-9)")
                        ]),
                        createVNode("label", { class: "flex items-center gap-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => includeSymbols.value = $event,
                            type: "checkbox",
                            class: "rounded"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, includeSymbols.value]
                          ]),
                          createVNode("span", null, "Symbols (!@#$...)")
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Custom Characters (optional)"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => customChars.value = $event,
                        type: "text",
                        placeholder: "e.g., ABCDEF0123456789",
                        class: "w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, customChars.value]
                      ])
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: generate,
                      class: "w-full",
                      "aria-label": "Generate secure token"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Generate Tokens ")
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
                      createTextVNode("Options")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Configure token generation")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-6" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Length: " + toDisplayString(length.value), 1),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => length.value = $event,
                      type: "range",
                      min: "8",
                      max: "128",
                      class: "w-full"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [
                        vModelText,
                        length.value,
                        void 0,
                        { number: true }
                      ]
                    ]),
                    createVNode("div", { class: "flex justify-between text-xs text-muted-foreground" }, [
                      createVNode("span", null, "8"),
                      createVNode("span", null, "128")
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Count"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => count.value = $event,
                      type: "number",
                      min: "1",
                      max: "100",
                      class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [
                        vModelText,
                        count.value,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Character Sets"),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "flex items-center gap-2" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => includeUppercase.value = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, includeUppercase.value]
                        ]),
                        createVNode("span", null, "Uppercase (A-Z)")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => includeLowercase.value = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, includeLowercase.value]
                        ]),
                        createVNode("span", null, "Lowercase (a-z)")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => includeNumbers.value = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, includeNumbers.value]
                        ]),
                        createVNode("span", null, "Numbers (0-9)")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => includeSymbols.value = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, includeSymbols.value]
                        ]),
                        createVNode("span", null, "Symbols (!@#$...)")
                      ])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Custom Characters (optional)"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => customChars.value = $event,
                      type: "text",
                      placeholder: "e.g., ABCDEF0123456789",
                      class: "w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, customChars.value]
                    ])
                  ]),
                  createVNode(unref(_sfc_main$6), {
                    onClick: generate,
                    class: "w-full",
                    "aria-label": "Generate secure token"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Generate Tokens ")
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
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "lg:col-span-2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generated Tokens`);
                      } else {
                        return [
                          createTextVNode("Generated Tokens")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(tokens.value.length)} token(s) of ${ssrInterpolate(length.value)} characters`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(tokens.value.length) + " token(s) of " + toDisplayString(length.value) + " characters", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: copyAll,
                    variant: "outline",
                    size: "sm",
                    "aria-label": "Copy all tokens"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === -1 ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" }, null), _parent4, _scopeId3);
                        _push4(` ${ssrInterpolate(copied.value === -1 ? "Copied!" : "Copy All")}`);
                      } else {
                        return [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value === -1 ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                          createTextVNode(" " + toDisplayString(copied.value === -1 ? "Copied!" : "Copy All"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createTextVNode("Generated Tokens")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(tokens.value.length) + " token(s) of " + toDisplayString(length.value) + " characters", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(unref(_sfc_main$6), {
                        onClick: copyAll,
                        variant: "outline",
                        size: "sm",
                        "aria-label": "Copy all tokens"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value === -1 ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                          createTextVNode(" " + toDisplayString(copied.value === -1 ? "Copied!" : "Copy All"), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(tokens.value, (token, index) => {
                    _push3(`<div class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"${_scopeId2}><div class="font-mono text-sm break-all"${_scopeId2}>${ssrInterpolate(token)}</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: ($event) => copyToken(index),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy token " + (index + 1)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === index ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent4, _scopeId3);
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === index ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(tokens.value, (token, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                        }, [
                          createVNode("div", { class: "font-mono text-sm break-all" }, toDisplayString(token), 1),
                          createVNode(unref(_sfc_main$6), {
                            onClick: ($event) => copyToken(index),
                            variant: "ghost",
                            size: "sm",
                            "aria-label": "Copy token " + (index + 1)
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value === index ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                            ]),
                            _: 2
                          }, 1032, ["onClick", "aria-label"])
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
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Generated Tokens")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(tokens.value.length) + " token(s) of " + toDisplayString(length.value) + " characters", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: copyAll,
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Copy all tokens"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(copied.value === -1 ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                        createTextVNode(" " + toDisplayString(copied.value === -1 ? "Copied!" : "Copy All"), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(tokens.value, (token, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                      }, [
                        createVNode("div", { class: "font-mono text-sm break-all" }, toDisplayString(token), 1),
                        createVNode(unref(_sfc_main$6), {
                          onClick: ($event) => copyToken(index),
                          variant: "ghost",
                          size: "sm",
                          "aria-label": "Copy token " + (index + 1)
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === index ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                          ]),
                          _: 2
                        }, 1032, ["onClick", "aria-label"])
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
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "mt-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Security Information`);
                      } else {
                        return [
                          createTextVNode("Security Information")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Security Information")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4 text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"${_scopeId2}><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Randomness</div><div class="text-muted-foreground"${_scopeId2}>Cryptographically secure</div></div><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Entropy</div><div class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(Math.floor(length.value * Math.log2(62)))} bits</div></div><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Collision Resistance</div><div class="text-muted-foreground"${_scopeId2}>Extremely low</div></div><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Best Practice</div><div class="text-muted-foreground"${_scopeId2}>32+ characters</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Randomness"),
                        createVNode("div", { class: "text-muted-foreground" }, "Cryptographically secure")
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Entropy"),
                        createVNode("div", { class: "text-muted-foreground" }, toDisplayString(Math.floor(length.value * Math.log2(62))) + " bits", 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Collision Resistance"),
                        createVNode("div", { class: "text-muted-foreground" }, "Extremely low")
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Best Practice"),
                        createVNode("div", { class: "text-muted-foreground" }, "32+ characters")
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
                      createTextVNode("Security Information")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4 text-sm" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Randomness"),
                      createVNode("div", { class: "text-muted-foreground" }, "Cryptographically secure")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Entropy"),
                      createVNode("div", { class: "text-muted-foreground" }, toDisplayString(Math.floor(length.value * Math.log2(62))) + " bits", 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Collision Resistance"),
                      createVNode("div", { class: "text-muted-foreground" }, "Extremely low")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Best Practice"),
                      createVNode("div", { class: "text-muted-foreground" }, "32+ characters")
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/TokenGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
