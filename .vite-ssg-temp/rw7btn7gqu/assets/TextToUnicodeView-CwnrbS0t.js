import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, withDirectives, vModelRadio, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
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
  __name: "TextToUnicodeView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputText = ref("");
    const conversionType = ref("unicode");
    const unicodeOutput = computed(() => {
      return inputText.value.split("").map((char) => {
        const code = char.charCodeAt(0);
        return `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
      }).join(" ");
    });
    const htmlOutput = computed(() => {
      return inputText.value.split("").map((char) => {
        const code = char.charCodeAt(0);
        return `&#${code};`;
      }).join("");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Text to Unicode Converter</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Convert Text to Unicode`);
                      } else {
                        return [
                          createTextVNode("Convert Text to Unicode")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Convert Text to Unicode")
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
                        _push4(`Input Text`);
                      } else {
                        return [
                          createTextVNode("Input Text")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    "aria-label": "Text to convert to Unicode",
                    placeholder: "Enter text to convert..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Output Format`);
                      } else {
                        return [
                          createTextVNode("Output Format")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-4"${_scopeId2}><label class="flex items-center gap-2 cursor-pointer"${_scopeId2}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(conversionType.value, "unicode")) ? " checked" : ""} aria-label="Unicode output format" value="unicode"${_scopeId2}><span${_scopeId2}>Unicode (U+XXXX)</span></label><label class="flex items-center gap-2 cursor-pointer"${_scopeId2}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(conversionType.value, "html")) ? " checked" : ""} aria-label="HTML entities output format" value="html"${_scopeId2}><span${_scopeId2}>HTML Entities (&amp;#XXX;)</span></label></div></div>`);
                  if (inputText.value) {
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Output`);
                        } else {
                          return [
                            createTextVNode("Output")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="p-4 rounded-lg bg-muted font-mono text-sm break-all"${_scopeId2}>${ssrInterpolate(conversionType.value === "unicode" ? unicodeOutput.value : htmlOutput.value)}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Input Text")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: inputText.value,
                        "onUpdate:modelValue": ($event) => inputText.value = $event,
                        "aria-label": "Text to convert to Unicode",
                        placeholder: "Enter text to convert..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Output Format")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-4" }, [
                        createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                          withDirectives(createVNode("input", {
                            type: "radio",
                            "onUpdate:modelValue": ($event) => conversionType.value = $event,
                            "aria-label": "Unicode output format",
                            value: "unicode"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelRadio, conversionType.value]
                          ]),
                          createVNode("span", null, "Unicode (U+XXXX)")
                        ]),
                        createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                          withDirectives(createVNode("input", {
                            type: "radio",
                            "onUpdate:modelValue": ($event) => conversionType.value = $event,
                            "aria-label": "HTML entities output format",
                            value: "html"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelRadio, conversionType.value]
                          ]),
                          createVNode("span", null, "HTML Entities (&#XXX;)")
                        ])
                      ])
                    ]),
                    inputText.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Output")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, toDisplayString(conversionType.value === "unicode" ? unicodeOutput.value : htmlOutput.value), 1)
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
                      createTextVNode("Convert Text to Unicode")
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
                        createTextVNode("Input Text")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: inputText.value,
                      "onUpdate:modelValue": ($event) => inputText.value = $event,
                      "aria-label": "Text to convert to Unicode",
                      placeholder: "Enter text to convert..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Output Format")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => conversionType.value = $event,
                          "aria-label": "Unicode output format",
                          value: "unicode"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, conversionType.value]
                        ]),
                        createVNode("span", null, "Unicode (U+XXXX)")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => conversionType.value = $event,
                          "aria-label": "HTML entities output format",
                          value: "html"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, conversionType.value]
                        ]),
                        createVNode("span", null, "HTML Entities (&#XXX;)")
                      ])
                    ])
                  ]),
                  inputText.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-2"
                  }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Output")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, toDisplayString(conversionType.value === "unicode" ? unicodeOutput.value : htmlOutput.value), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/TextToUnicodeView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
