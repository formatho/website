import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { LoremIpsum } from "lorem-ipsum";
import { RefreshCw, Copy } from "lucide-vue-next";
import { a as _sfc_main$6, c as _sfc_main$b } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { SelectValue } from "radix-vue";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a } from "./SelectItem-l37Q7Jqt.js";
import { _ as _sfc_main$5 } from "./Label-Bp2OSpkW.js";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
import "@vueuse/core";
import "clsx";
import "tailwind-merge";
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
  __name: "LoremIpsumView",
  __ssrInlineRender: true,
  setup(__props) {
    const count = ref(3);
    const units = ref("paragraphs");
    const generatedText = ref("");
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });
    const generate = () => {
      if (units.value === "paragraphs") {
        generatedText.value = lorem.generateParagraphs(count.value);
      } else if (units.value === "sentences") {
        generatedText.value = lorem.generateSentences(count.value);
      } else {
        generatedText.value = lorem.generateWords(count.value);
      }
    };
    const copyToClipboard = () => {
      navigator.clipboard.writeText(generatedText.value);
    };
    generate();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Lorem Ipsum Generator</h1></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "h-full" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Settings`);
                      } else {
                        return [
                          createTextVNode("Settings")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Settings")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "grid gap-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Count`);
                      } else {
                        return [
                          createTextVNode("Count")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    type: "number",
                    modelValue: count.value,
                    "onUpdate:modelValue": ($event) => count.value = $event,
                    modelModifiers: { number: true },
                    min: "1",
                    max: "100"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Units`);
                      } else {
                        return [
                          createTextVNode("Units")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    modelValue: units.value,
                    "onUpdate:modelValue": ($event) => units.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(SelectValue), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(SelectValue))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { value: "paragraphs" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Paragraphs`);
                                  } else {
                                    return [
                                      createTextVNode("Paragraphs")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { value: "sentences" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Sentences`);
                                  } else {
                                    return [
                                      createTextVNode("Sentences")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { value: "words" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Words`);
                                  } else {
                                    return [
                                      createTextVNode("Words")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { value: "paragraphs" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Paragraphs")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), { value: "sentences" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Sentences")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), { value: "words" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Words")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createVNode(unref(SelectValue))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { value: "paragraphs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Paragraphs")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), { value: "sentences" }, {
                                default: withCtx(() => [
                                  createTextVNode("Sentences")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), { value: "words" }, {
                                default: withCtx(() => [
                                  createTextVNode("Words")
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
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    onClick: generate,
                    class: "w-full",
                    "aria-label": "Generate lorem ipsum text"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RefreshCw), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Generate `);
                      } else {
                        return [
                          createVNode(unref(RefreshCw), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Generate ")
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
                          createTextVNode("Count")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        type: "number",
                        modelValue: count.value,
                        "onUpdate:modelValue": ($event) => count.value = $event,
                        modelModifiers: { number: true },
                        min: "1",
                        max: "100"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Units")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        modelValue: units.value,
                        "onUpdate:modelValue": ($event) => units.value = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createVNode(unref(SelectValue))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { value: "paragraphs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Paragraphs")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), { value: "sentences" }, {
                                default: withCtx(() => [
                                  createTextVNode("Sentences")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), { value: "words" }, {
                                default: withCtx(() => [
                                  createTextVNode("Words")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$b), {
                      onClick: generate,
                      class: "w-full",
                      "aria-label": "Generate lorem ipsum text"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RefreshCw), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Generate ")
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
                      createTextVNode("Settings")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "grid gap-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Count")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      type: "number",
                      modelValue: count.value,
                      "onUpdate:modelValue": ($event) => count.value = $event,
                      modelModifiers: { number: true },
                      min: "1",
                      max: "100"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Units")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      modelValue: units.value,
                      "onUpdate:modelValue": ($event) => units.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createVNode(unref(SelectValue))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { value: "paragraphs" }, {
                              default: withCtx(() => [
                                createTextVNode("Paragraphs")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), { value: "sentences" }, {
                              default: withCtx(() => [
                                createTextVNode("Sentences")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), { value: "words" }, {
                              default: withCtx(() => [
                                createTextVNode("Words")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$b), {
                    onClick: generate,
                    class: "w-full",
                    "aria-label": "Generate lorem ipsum text"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(RefreshCw), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Generate ")
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
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "md:col-span-2 h-full flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generated Text`);
                      } else {
                        return [
                          createTextVNode("Generated Text")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyToClipboard,
                    disabled: !generatedText.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Copy), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Copy `);
                      } else {
                        return [
                          createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Copy ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generated Text")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), {
                      variant: "outline",
                      size: "sm",
                      onClick: copyToClipboard,
                      disabled: !generatedText.value
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Copy ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0 pt-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    "model-value": generatedText.value,
                    language: "markdown",
                    readonly: "",
                    class: "h-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": generatedText.value,
                      language: "markdown",
                      readonly: "",
                      class: "h-full"
                    }, null, 8, ["model-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Generated Text")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$b), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyToClipboard,
                    disabled: !generatedText.value
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Copy ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0 pt-4" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": generatedText.value,
                    language: "markdown",
                    readonly: "",
                    class: "h-full"
                  }, null, 8, ["model-value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/LoremIpsumView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
