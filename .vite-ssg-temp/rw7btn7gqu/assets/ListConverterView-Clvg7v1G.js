import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelSelect, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { c as _sfc_main$5 } from "../main.mjs";
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
  __name: "ListConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputList = ref("");
    const outputList = ref("");
    const inputFormat = ref("comma");
    const outputFormat = ref("newline");
    const sortList = ref(false);
    const uniqueOnly = ref(false);
    const parseList = (text, format) => {
      if (!text.trim()) return [];
      switch (format) {
        case "comma":
          return text.split(",").map((s) => s.trim()).filter(Boolean);
        case "newline":
          return text.split("\n").map((s) => s.trim()).filter(Boolean);
        case "space":
          return text.split(/\s+/).filter(Boolean);
        case "semicolon":
          return text.split(";").map((s) => s.trim()).filter(Boolean);
        case "tab":
          return text.split("	").map((s) => s.trim()).filter(Boolean);
        default:
          return text.split(",").map((s) => s.trim()).filter(Boolean);
      }
    };
    const formatList = (items, format) => {
      switch (format) {
        case "comma":
          return items.join(", ");
        case "newline":
          return items.join("\n");
        case "space":
          return items.join(" ");
        case "semicolon":
          return items.join("; ");
        case "tab":
          return items.join("	");
        case "json":
          return JSON.stringify(items, null, 2);
        default:
          return items.join("\n");
      }
    };
    const convert = () => {
      let items = parseList(inputList.value, inputFormat.value);
      if (uniqueOnly.value) {
        items = [...new Set(items)];
      }
      if (sortList.value) {
        items.sort((a, b) => a.localeCompare(b));
      }
      outputList.value = formatList(items, outputFormat.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">List Converter</h1></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Input Format`);
                      } else {
                        return [
                          createTextVNode("Input Format")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("Input Format")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<select class="w-full h-10 rounded-md border border-input bg-background px-3"${_scopeId2}><option value="comma"${ssrIncludeBooleanAttr(Array.isArray(inputFormat.value) ? ssrLooseContain(inputFormat.value, "comma") : ssrLooseEqual(inputFormat.value, "comma")) ? " selected" : ""}${_scopeId2}>Comma separated</option><option value="newline"${ssrIncludeBooleanAttr(Array.isArray(inputFormat.value) ? ssrLooseContain(inputFormat.value, "newline") : ssrLooseEqual(inputFormat.value, "newline")) ? " selected" : ""}${_scopeId2}>Newline separated</option><option value="space"${ssrIncludeBooleanAttr(Array.isArray(inputFormat.value) ? ssrLooseContain(inputFormat.value, "space") : ssrLooseEqual(inputFormat.value, "space")) ? " selected" : ""}${_scopeId2}>Space separated</option><option value="semicolon"${ssrIncludeBooleanAttr(Array.isArray(inputFormat.value) ? ssrLooseContain(inputFormat.value, "semicolon") : ssrLooseEqual(inputFormat.value, "semicolon")) ? " selected" : ""}${_scopeId2}>Semicolon separated</option><option value="tab"${ssrIncludeBooleanAttr(Array.isArray(inputFormat.value) ? ssrLooseContain(inputFormat.value, "tab") : ssrLooseEqual(inputFormat.value, "tab")) ? " selected" : ""}${_scopeId2}>Tab separated</option></select>`);
                } else {
                  return [
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => inputFormat.value = $event,
                      class: "w-full h-10 rounded-md border border-input bg-background px-3"
                    }, [
                      createVNode("option", { value: "comma" }, "Comma separated"),
                      createVNode("option", { value: "newline" }, "Newline separated"),
                      createVNode("option", { value: "space" }, "Space separated"),
                      createVNode("option", { value: "semicolon" }, "Semicolon separated"),
                      createVNode("option", { value: "tab" }, "Tab separated")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, inputFormat.value]
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
                  createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode("Input Format")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => inputFormat.value = $event,
                    class: "w-full h-10 rounded-md border border-input bg-background px-3"
                  }, [
                    createVNode("option", { value: "comma" }, "Comma separated"),
                    createVNode("option", { value: "newline" }, "Newline separated"),
                    createVNode("option", { value: "space" }, "Space separated"),
                    createVNode("option", { value: "semicolon" }, "Semicolon separated"),
                    createVNode("option", { value: "tab" }, "Tab separated")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, inputFormat.value]
                  ])
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm" }, {
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("Output Format")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<select class="w-full h-10 rounded-md border border-input bg-background px-3"${_scopeId2}><option value="comma"${ssrIncludeBooleanAttr(Array.isArray(outputFormat.value) ? ssrLooseContain(outputFormat.value, "comma") : ssrLooseEqual(outputFormat.value, "comma")) ? " selected" : ""}${_scopeId2}>Comma separated</option><option value="newline"${ssrIncludeBooleanAttr(Array.isArray(outputFormat.value) ? ssrLooseContain(outputFormat.value, "newline") : ssrLooseEqual(outputFormat.value, "newline")) ? " selected" : ""}${_scopeId2}>Newline separated</option><option value="space"${ssrIncludeBooleanAttr(Array.isArray(outputFormat.value) ? ssrLooseContain(outputFormat.value, "space") : ssrLooseEqual(outputFormat.value, "space")) ? " selected" : ""}${_scopeId2}>Space separated</option><option value="semicolon"${ssrIncludeBooleanAttr(Array.isArray(outputFormat.value) ? ssrLooseContain(outputFormat.value, "semicolon") : ssrLooseEqual(outputFormat.value, "semicolon")) ? " selected" : ""}${_scopeId2}>Semicolon separated</option><option value="tab"${ssrIncludeBooleanAttr(Array.isArray(outputFormat.value) ? ssrLooseContain(outputFormat.value, "tab") : ssrLooseEqual(outputFormat.value, "tab")) ? " selected" : ""}${_scopeId2}>Tab separated</option><option value="json"${ssrIncludeBooleanAttr(Array.isArray(outputFormat.value) ? ssrLooseContain(outputFormat.value, "json") : ssrLooseEqual(outputFormat.value, "json")) ? " selected" : ""}${_scopeId2}>JSON array</option></select>`);
                } else {
                  return [
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => outputFormat.value = $event,
                      class: "w-full h-10 rounded-md border border-input bg-background px-3"
                    }, [
                      createVNode("option", { value: "comma" }, "Comma separated"),
                      createVNode("option", { value: "newline" }, "Newline separated"),
                      createVNode("option", { value: "space" }, "Space separated"),
                      createVNode("option", { value: "semicolon" }, "Semicolon separated"),
                      createVNode("option", { value: "tab" }, "Tab separated"),
                      createVNode("option", { value: "json" }, "JSON array")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, outputFormat.value]
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
                  createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode("Output Format")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => outputFormat.value = $event,
                    class: "w-full h-10 rounded-md border border-input bg-background px-3"
                  }, [
                    createVNode("option", { value: "comma" }, "Comma separated"),
                    createVNode("option", { value: "newline" }, "Newline separated"),
                    createVNode("option", { value: "space" }, "Space separated"),
                    createVNode("option", { value: "semicolon" }, "Semicolon separated"),
                    createVNode("option", { value: "tab" }, "Tab separated"),
                    createVNode("option", { value: "json" }, "JSON array")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, outputFormat.value]
                  ])
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm" }, {
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("Options")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="flex items-center gap-2"${_scopeId2}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(sortList.value) ? ssrLooseContain(sortList.value, null) : sortList.value) ? " checked" : ""}${_scopeId2}><span class="text-sm"${_scopeId2}>Sort alphabetically</span></label><label class="flex items-center gap-2"${_scopeId2}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(uniqueOnly.value) ? ssrLooseContain(uniqueOnly.value, null) : uniqueOnly.value) ? " checked" : ""}${_scopeId2}><span class="text-sm"${_scopeId2}>Remove duplicates</span></label>`);
                } else {
                  return [
                    createVNode("label", { class: "flex items-center gap-2" }, [
                      withDirectives(createVNode("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": ($event) => sortList.value = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, sortList.value]
                      ]),
                      createVNode("span", { class: "text-sm" }, "Sort alphabetically")
                    ]),
                    createVNode("label", { class: "flex items-center gap-2" }, [
                      withDirectives(createVNode("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": ($event) => uniqueOnly.value = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, uniqueOnly.value]
                      ]),
                      createVNode("span", { class: "text-sm" }, "Remove duplicates")
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
                  createVNode(unref(_sfc_main$3), { class: "text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode("Options")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-2" }, {
                default: withCtx(() => [
                  createVNode("label", { class: "flex items-center gap-2" }, [
                    withDirectives(createVNode("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": ($event) => sortList.value = $event
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, sortList.value]
                    ]),
                    createVNode("span", { class: "text-sm" }, "Sort alphabetically")
                  ]),
                  createVNode("label", { class: "flex items-center gap-2" }, [
                    withDirectives(createVNode("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": ($event) => uniqueOnly.value = $event
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, uniqueOnly.value]
                    ]),
                    createVNode("span", { class: "text-sm" }, "Remove duplicates")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex items-center justify-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              onClick: convert,
              class: "w-full",
              "aria-label": "Convert list format"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Convert`);
                } else {
                  return [
                    createTextVNode("Convert")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$5), {
                onClick: convert,
                class: "w-full",
                "aria-label": "Convert list format"
              }, {
                default: withCtx(() => [
                  createTextVNode("Convert")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Input")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: inputList.value,
                    "onUpdate:modelValue": ($event) => inputList.value = $event,
                    language: "plaintext",
                    class: "h-full",
                    placeholder: "Enter list items..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: inputList.value,
                      "onUpdate:modelValue": ($event) => inputList.value = $event,
                      language: "plaintext",
                      class: "h-full",
                      placeholder: "Enter list items..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: inputList.value,
                    "onUpdate:modelValue": ($event) => inputList.value = $event,
                    language: "plaintext",
                    class: "h-full",
                    placeholder: "Enter list items..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`Output`);
                      } else {
                        return [
                          createTextVNode("Output")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Output")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    "model-value": outputList.value,
                    language: "plaintext",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Converted list will appear here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": outputList.value,
                      language: "plaintext",
                      readonly: "",
                      class: "h-full",
                      placeholder: "Converted list will appear here..."
                    }, null, 8, ["model-value"])
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
                      createTextVNode("Output")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": outputList.value,
                    language: "plaintext",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Converted list will appear here..."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ListConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
