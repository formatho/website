import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
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
  __name: "RomanNumeralConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const numberInput = ref("");
    const romanOutput = ref("");
    const romanInput = ref("");
    const numberOutput = ref(null);
    const error = ref("");
    const intToRoman = (num) => {
      const val = [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
      let roman = "";
      let i = 0;
      while (num > 0) {
        const currentVal = val[i] ?? 1;
        const currentSym = syms[i] ?? "I";
        const div = Math.floor(num / currentVal);
        num = num % currentVal;
        roman += currentSym.repeat(div);
        i++;
      }
      return roman;
    };
    const romanToInt = (s) => {
      const map = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1e3
      };
      let result = 0;
      for (let i = 0; i < s.length; i++) {
        const current = map[s[i] ?? ""] ?? 0;
        const next = map[s[i + 1] ?? ""] ?? 0;
        if (next && current < next) {
          result += next - current;
          i++;
        } else {
          result += current;
        }
      }
      return result;
    };
    const convertToRoman = () => {
      error.value = "";
      const num = parseInt(numberInput.value, 10);
      if (isNaN(num) || num < 1 || num > 3999) {
        error.value = "Please enter a number between 1 and 3999";
        romanOutput.value = "";
        return;
      }
      romanOutput.value = intToRoman(num);
    };
    const convertToNumber = () => {
      error.value = "";
      if (!romanInput.value) {
        error.value = "Please enter a Roman numeral";
        numberOutput.value = null;
        return;
      }
      const roman = romanInput.value.toUpperCase().trim();
      if (!/^[MDCLXVI]+$/.test(roman)) {
        error.value = "Invalid Roman numeral characters";
        numberOutput.value = null;
        return;
      }
      numberOutput.value = romanToInt(roman);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Roman Numeral Converter</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Number to Roman`);
                      } else {
                        return [
                          createTextVNode("Number to Roman")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Number to Roman")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Number (1-3999)`);
                      } else {
                        return [
                          createTextVNode("Number (1-3999)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: numberInput.value,
                    "onUpdate:modelValue": ($event) => numberInput.value = $event,
                    type: "number",
                    min: "1",
                    max: "3999",
                    placeholder: "Enter number..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: convertToRoman,
                    class: "w-full",
                    "aria-label": "Convert number to Roman numeral"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Convert`);
                      } else {
                        return [
                          createTextVNode("Convert")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (romanOutput.value) {
                    _push3(`<div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Roman Numeral</div><div class="text-3xl font-bold font-mono"${_scopeId2}>${ssrInterpolate(romanOutput.value)}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Number (1-3999)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: numberInput.value,
                        "onUpdate:modelValue": ($event) => numberInput.value = $event,
                        type: "number",
                        min: "1",
                        max: "3999",
                        placeholder: "Enter number..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      onClick: convertToRoman,
                      class: "w-full",
                      "aria-label": "Convert number to Roman numeral"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Convert")
                      ]),
                      _: 1
                    }),
                    romanOutput.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 rounded-lg bg-muted"
                    }, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Roman Numeral"),
                      createVNode("div", { class: "text-3xl font-bold font-mono" }, toDisplayString(romanOutput.value), 1)
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
                      createTextVNode("Number to Roman")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Number (1-3999)")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: numberInput.value,
                      "onUpdate:modelValue": ($event) => numberInput.value = $event,
                      type: "number",
                      min: "1",
                      max: "3999",
                      placeholder: "Enter number..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$7), {
                    onClick: convertToRoman,
                    class: "w-full",
                    "aria-label": "Convert number to Roman numeral"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Convert")
                    ]),
                    _: 1
                  }),
                  romanOutput.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 rounded-lg bg-muted"
                  }, [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Roman Numeral"),
                    createVNode("div", { class: "text-3xl font-bold font-mono" }, toDisplayString(romanOutput.value), 1)
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Roman to Number`);
                      } else {
                        return [
                          createTextVNode("Roman to Number")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Roman to Number")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Roman Numeral`);
                      } else {
                        return [
                          createTextVNode("Roman Numeral")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: romanInput.value,
                    "onUpdate:modelValue": ($event) => romanInput.value = $event,
                    placeholder: "Enter Roman numeral (e.g., XIV)...",
                    class: "uppercase"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: convertToNumber,
                    class: "w-full",
                    "aria-label": "Convert Roman numeral to number"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Convert`);
                      } else {
                        return [
                          createTextVNode("Convert")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (numberOutput.value !== null) {
                    _push3(`<div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Number</div><div class="text-3xl font-bold"${_scopeId2}>${ssrInterpolate(numberOutput.value)}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Roman Numeral")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: romanInput.value,
                        "onUpdate:modelValue": ($event) => romanInput.value = $event,
                        placeholder: "Enter Roman numeral (e.g., XIV)...",
                        class: "uppercase"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      onClick: convertToNumber,
                      class: "w-full",
                      "aria-label": "Convert Roman numeral to number"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Convert")
                      ]),
                      _: 1
                    }),
                    numberOutput.value !== null ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 rounded-lg bg-muted"
                    }, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Number"),
                      createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(numberOutput.value), 1)
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
                      createTextVNode("Roman to Number")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Roman Numeral")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: romanInput.value,
                      "onUpdate:modelValue": ($event) => romanInput.value = $event,
                      placeholder: "Enter Roman numeral (e.g., XIV)...",
                      class: "uppercase"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$7), {
                    onClick: convertToNumber,
                    class: "w-full",
                    "aria-label": "Convert Roman numeral to number"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Convert")
                    ]),
                    _: 1
                  }),
                  numberOutput.value !== null ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 rounded-lg bg-muted"
                  }, [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Number"),
                    createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(numberOutput.value), 1)
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
      if (error.value) {
        _push(`<div class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">${ssrInterpolate(error.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/RomanNumeralConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
