import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { Type, ArrowRightLeft, Check, Copy } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$6 } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
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
  __name: "CaseConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const input = ref("");
    const copied = ref(null);
    const cases = computed(() => {
      const text = input.value;
      if (!text) return {};
      const words = text.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_\-\s]+/g, " ").trim().split(" ").filter((w) => w.length > 0);
      const upperWords = words.map((w) => w.toUpperCase());
      const lowerWords = words.map((w) => w.toLowerCase());
      const titleWords = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
      const sentenceWords = words.map(
        (w, i) => i === 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()
      );
      return {
        UPPERCASE: upperWords.join(" "),
        lowercase: lowerWords.join(" "),
        "Title Case": titleWords.join(" "),
        "Sentence case": sentenceWords.join(" "),
        camelCase: words.map(
          (w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        ).join(""),
        PascalCase: titleWords.join(""),
        snake_case: lowerWords.join("_"),
        SCREAMING_SNAKE: upperWords.join("_"),
        "kebab-case": lowerWords.join("-"),
        "COBOL-CASE": upperWords.join("-"),
        "Train-Case": titleWords.join("-"),
        "dot.case": lowerWords.join("."),
        "path/case": lowerWords.join("/")
      };
    });
    const copyCase = (type) => {
      const value = cases.value[type];
      if (value) {
        navigator.clipboard.writeText(value);
      }
      copied.value = type;
      setTimeout(() => copied.value = null, 2e3);
    };
    const swapCase = () => {
      input.value = input.value.split("").map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
    };
    const examples = [
      "hello world",
      "HELLO WORLD",
      "HelloWorld",
      "hello_world",
      "hello-world",
      "user_id"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Type), { class: "w-8 h-8" }, null, _parent));
      _push(` Case Converter </h1><p class="text-muted-foreground mt-2"> Convert text between different cases: camelCase, snake_case, kebab-case, and more. </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "mb-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Input`);
                      } else {
                        return [
                          createTextVNode("Input")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Enter text to convert`);
                      } else {
                        return [
                          createTextVNode("Enter text to convert")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Input")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Enter text to convert")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: input.value,
                    "onUpdate:modelValue": ($event) => input.value = $event,
                    language: "plaintext",
                    class: "min-h-[128px]",
                    placeholder: "Enter text here..."
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2 flex-wrap"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: swapCase,
                    variant: "outline",
                    size: "sm",
                    "aria-label": "Swap text case (uppercase to lowercase)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowRightLeft), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Swap Case `);
                      } else {
                        return [
                          createVNode(unref(ArrowRightLeft), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Swap Case ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span class="text-sm text-muted-foreground py-2"${_scopeId2}>Examples:</span><!--[-->`);
                  ssrRenderList(examples, (example) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      key: example,
                      onClick: ($event) => input.value = example,
                      variant: "ghost",
                      size: "sm",
                      class: "font-mono"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(example)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(example), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: input.value,
                      "onUpdate:modelValue": ($event) => input.value = $event,
                      language: "plaintext",
                      class: "min-h-[128px]",
                      placeholder: "Enter text here..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                      createVNode(unref(_sfc_main$6), {
                        onClick: swapCase,
                        variant: "outline",
                        size: "sm",
                        "aria-label": "Swap text case (uppercase to lowercase)"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowRightLeft), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Swap Case ")
                        ]),
                        _: 1
                      }),
                      createVNode("span", { class: "text-sm text-muted-foreground py-2" }, "Examples:"),
                      (openBlock(), createBlock(Fragment, null, renderList(examples, (example) => {
                        return createVNode(unref(_sfc_main$6), {
                          key: example,
                          onClick: ($event) => input.value = example,
                          variant: "ghost",
                          size: "sm",
                          class: "font-mono"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(example), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 64))
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
                      createTextVNode("Input")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Enter text to convert")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: input.value,
                    "onUpdate:modelValue": ($event) => input.value = $event,
                    language: "plaintext",
                    class: "min-h-[128px]",
                    placeholder: "Enter text here..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                    createVNode(unref(_sfc_main$6), {
                      onClick: swapCase,
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Swap text case (uppercase to lowercase)"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowRightLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Swap Case ")
                      ]),
                      _: 1
                    }),
                    createVNode("span", { class: "text-sm text-muted-foreground py-2" }, "Examples:"),
                    (openBlock(), createBlock(Fragment, null, renderList(examples, (example) => {
                      return createVNode(unref(_sfc_main$6), {
                        key: example,
                        onClick: ($event) => input.value = example,
                        variant: "ghost",
                        size: "sm",
                        class: "font-mono"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(example), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 64))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (Object.keys(cases.value).length > 0) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Converted Cases`);
                        } else {
                          return [
                            createTextVNode("Converted Cases")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Converted Cases")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(cases.value, (value, type) => {
                      _push3(`<div class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"${_scopeId2}><div class="flex-1"${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>${ssrInterpolate(type)}</div><div class="font-mono"${_scopeId2}>${ssrInterpolate(value)}</div></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$6), {
                        onClick: ($event) => copyCase(type),
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy converted text"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent4, _scopeId3);
                          } else {
                            return [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(cases.value, (value, type) => {
                        return openBlock(), createBlock("div", {
                          key: type,
                          class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                        }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, toDisplayString(type), 1),
                            createVNode("div", { class: "font-mono" }, toDisplayString(value), 1)
                          ]),
                          createVNode(unref(_sfc_main$6), {
                            onClick: ($event) => copyCase(type),
                            variant: "ghost",
                            size: "sm",
                            "aria-label": "Copy converted text"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]);
                      }), 128))
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
                        createTextVNode("Converted Cases")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$5), { class: "space-y-3" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(cases.value, (value, type) => {
                      return openBlock(), createBlock("div", {
                        key: type,
                        class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                      }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, toDisplayString(type), 1),
                          createVNode("div", { class: "font-mono" }, toDisplayString(value), 1)
                        ]),
                        createVNode(unref(_sfc_main$6), {
                          onClick: ($event) => copyCase(type),
                          variant: "ghost",
                          size: "sm",
                          "aria-label": "Copy converted text"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="text-center py-16 text-muted-foreground">`);
        _push(ssrRenderComponent(unref(Type), { class: "w-16 h-16 mx-auto mb-4 opacity-50" }, null, _parent));
        _push(`<p>Enter text above to see case conversions</p></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/CaseConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
