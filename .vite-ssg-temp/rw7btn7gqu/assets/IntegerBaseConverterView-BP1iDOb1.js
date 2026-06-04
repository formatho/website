import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
  __name: "IntegerBaseConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const decimalValue = ref("");
    const binaryValue = ref("");
    const octalValue = ref("");
    const hexadecimalValue = ref("");
    const updateFromDecimal = () => {
      const num = parseInt(decimalValue.value, 10);
      if (isNaN(num)) {
        binaryValue.value = "";
        octalValue.value = "";
        hexadecimalValue.value = "";
        return;
      }
      binaryValue.value = num.toString(2);
      octalValue.value = num.toString(8);
      hexadecimalValue.value = num.toString(16).toUpperCase();
    };
    const updateFromBinary = () => {
      const num = parseInt(binaryValue.value, 2);
      if (isNaN(num)) {
        decimalValue.value = "";
        octalValue.value = "";
        hexadecimalValue.value = "";
        return;
      }
      decimalValue.value = num.toString(10);
      octalValue.value = num.toString(8);
      hexadecimalValue.value = num.toString(16).toUpperCase();
    };
    const updateFromOctal = () => {
      const num = parseInt(octalValue.value, 8);
      if (isNaN(num)) {
        decimalValue.value = "";
        binaryValue.value = "";
        hexadecimalValue.value = "";
        return;
      }
      decimalValue.value = num.toString(10);
      binaryValue.value = num.toString(2);
      hexadecimalValue.value = num.toString(16).toUpperCase();
    };
    const updateFromHex = () => {
      const num = parseInt(hexadecimalValue.value, 16);
      if (isNaN(num)) {
        decimalValue.value = "";
        binaryValue.value = "";
        octalValue.value = "";
        return;
      }
      decimalValue.value = num.toString(10);
      binaryValue.value = num.toString(2);
      octalValue.value = num.toString(8);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Integer Base Converter</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Convert Between Bases`);
                      } else {
                        return [
                          createTextVNode("Convert Between Bases")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Convert Between Bases")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Decimal (base 10)`);
                      } else {
                        return [
                          createTextVNode("Decimal (base 10)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: decimalValue.value,
                    "onUpdate:modelValue": ($event) => decimalValue.value = $event,
                    onInput: updateFromDecimal,
                    "aria-label": "Decimal number input",
                    placeholder: "Enter decimal number...",
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Binary (base 2)`);
                      } else {
                        return [
                          createTextVNode("Binary (base 2)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: binaryValue.value,
                    "onUpdate:modelValue": ($event) => binaryValue.value = $event,
                    onInput: updateFromBinary,
                    "aria-label": "Binary number input",
                    placeholder: "Enter binary number...",
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Octal (base 8)`);
                      } else {
                        return [
                          createTextVNode("Octal (base 8)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: octalValue.value,
                    "onUpdate:modelValue": ($event) => octalValue.value = $event,
                    onInput: updateFromOctal,
                    "aria-label": "Octal number input",
                    placeholder: "Enter octal number...",
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Hexadecimal (base 16)`);
                      } else {
                        return [
                          createTextVNode("Hexadecimal (base 16)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: hexadecimalValue.value,
                    "onUpdate:modelValue": ($event) => hexadecimalValue.value = $event,
                    onInput: updateFromHex,
                    "aria-label": "Hexadecimal number input",
                    placeholder: "Enter hex number...",
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Decimal (base 10)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: decimalValue.value,
                          "onUpdate:modelValue": ($event) => decimalValue.value = $event,
                          onInput: updateFromDecimal,
                          "aria-label": "Decimal number input",
                          placeholder: "Enter decimal number...",
                          class: "font-mono"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Binary (base 2)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: binaryValue.value,
                          "onUpdate:modelValue": ($event) => binaryValue.value = $event,
                          onInput: updateFromBinary,
                          "aria-label": "Binary number input",
                          placeholder: "Enter binary number...",
                          class: "font-mono"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Octal (base 8)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: octalValue.value,
                          "onUpdate:modelValue": ($event) => octalValue.value = $event,
                          onInput: updateFromOctal,
                          "aria-label": "Octal number input",
                          placeholder: "Enter octal number...",
                          class: "font-mono"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Hexadecimal (base 16)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: hexadecimalValue.value,
                          "onUpdate:modelValue": ($event) => hexadecimalValue.value = $event,
                          onInput: updateFromHex,
                          "aria-label": "Hexadecimal number input",
                          placeholder: "Enter hex number...",
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
                      createTextVNode("Convert Between Bases")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Decimal (base 10)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: decimalValue.value,
                        "onUpdate:modelValue": ($event) => decimalValue.value = $event,
                        onInput: updateFromDecimal,
                        "aria-label": "Decimal number input",
                        placeholder: "Enter decimal number...",
                        class: "font-mono"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Binary (base 2)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: binaryValue.value,
                        "onUpdate:modelValue": ($event) => binaryValue.value = $event,
                        onInput: updateFromBinary,
                        "aria-label": "Binary number input",
                        placeholder: "Enter binary number...",
                        class: "font-mono"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Octal (base 8)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: octalValue.value,
                        "onUpdate:modelValue": ($event) => octalValue.value = $event,
                        onInput: updateFromOctal,
                        "aria-label": "Octal number input",
                        placeholder: "Enter octal number...",
                        class: "font-mono"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Hexadecimal (base 16)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: hexadecimalValue.value,
                        "onUpdate:modelValue": ($event) => hexadecimalValue.value = $event,
                        onInput: updateFromHex,
                        "aria-label": "Hexadecimal number input",
                        placeholder: "Enter hex number...",
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/IntegerBaseConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
