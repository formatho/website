import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { c as _sfc_main$1 } from "../main.mjs";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-vue-next";
import * as yaml from "js-yaml";
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
  __name: "YamlLintView",
  __ssrInlineRender: true,
  setup(__props) {
    const yamlInput = ref("");
    const yamlOutput = ref("");
    const error = ref(null);
    const isValid = ref(false);
    const validateYAML = () => {
      if (!yamlInput.value.trim()) {
        error.value = null;
        isValid.value = false;
        yamlOutput.value = "";
        return;
      }
      try {
        yaml.load(yamlInput.value);
        error.value = null;
        isValid.value = true;
      } catch (e) {
        error.value = e.message;
        isValid.value = false;
        yamlOutput.value = "";
      }
    };
    const formatYAML = () => {
      if (!isValid.value) return;
      try {
        const parsed = yaml.load(yamlInput.value);
        yamlOutput.value = yaml.dump(parsed, { indent: 2 });
      } catch (e) {
        error.value = e.message;
      }
    };
    watch(yamlInput, validateYAML);
    const fillSample = () => {
      yamlInput.value = `name: John Doe
age: 30
email: john@example.com
address:
  street: 123 Main St
  city: New York`;
      validateYAML();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">YAML Linter</h1>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "ghost",
        onClick: fillSample,
        "aria-label": "Load sample YAML data"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Load Sample`);
          } else {
            return [
              createTextVNode("Load Sample")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}> YAML Input `);
                        if (yamlInput.value.trim()) {
                          _push4(`<div class="flex items-center gap-1"${_scopeId3}>`);
                          if (isValid.value) {
                            _push4(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4 text-success" }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(AlertCircle), { class: "h-4 w-4 text-destructive" }, null, _parent4, _scopeId3));
                          }
                          _push4(`<span class="${ssrRenderClass([isValid.value ? "text-success" : "text-destructive", "text-xs"])}"${_scopeId3}>${ssrInterpolate(isValid.value ? "Valid" : "Invalid")}</span></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createTextVNode(" YAML Input "),
                            yamlInput.value.trim() ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-1"
                            }, [
                              isValid.value ? (openBlock(), createBlock(unref(CheckCircle), {
                                key: 0,
                                class: "h-4 w-4 text-success"
                              })) : (openBlock(), createBlock(unref(AlertCircle), {
                                key: 1,
                                class: "h-4 w-4 text-destructive"
                              })),
                              createVNode("span", {
                                class: [isValid.value ? "text-success" : "text-destructive", "text-xs"]
                              }, toDisplayString(isValid.value ? "Valid" : "Invalid"), 3)
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "sm",
                    onClick: formatYAML,
                    disabled: !isValid.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Format `);
                        _push4(ssrRenderComponent(unref(ArrowRight), { class: "ml-1 h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Format "),
                          createVNode(unref(ArrowRight), { class: "ml-1 h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createTextVNode(" YAML Input "),
                          yamlInput.value.trim() ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-1"
                          }, [
                            isValid.value ? (openBlock(), createBlock(unref(CheckCircle), {
                              key: 0,
                              class: "h-4 w-4 text-success"
                            })) : (openBlock(), createBlock(unref(AlertCircle), {
                              key: 1,
                              class: "h-4 w-4 text-destructive"
                            })),
                            createVNode("span", {
                              class: [isValid.value ? "text-success" : "text-destructive", "text-xs"]
                            }, toDisplayString(isValid.value ? "Valid" : "Invalid"), 3)
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), {
                      size: "sm",
                      onClick: formatYAML,
                      disabled: !isValid.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Format "),
                        createVNode(unref(ArrowRight), { class: "ml-1 h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0 flex flex-col gap-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: yamlInput.value,
                    "onUpdate:modelValue": ($event) => yamlInput.value = $event,
                    language: "yaml",
                    class: "flex-1 min-h-0",
                    placeholder: "key: value"
                  }, null, _parent3, _scopeId2));
                  if (error.value) {
                    _push3(`<div class="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm"${_scopeId2}><div class="font-semibold mb-1"${_scopeId2}>Syntax Error:</div> ${ssrInterpolate(error.value)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: yamlInput.value,
                      "onUpdate:modelValue": ($event) => yamlInput.value = $event,
                      language: "yaml",
                      class: "flex-1 min-h-0",
                      placeholder: "key: value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    error.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                    }, [
                      createVNode("div", { class: "font-semibold mb-1" }, "Syntax Error:"),
                      createTextVNode(" " + toDisplayString(error.value), 1)
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createTextVNode(" YAML Input "),
                        yamlInput.value.trim() ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-1"
                        }, [
                          isValid.value ? (openBlock(), createBlock(unref(CheckCircle), {
                            key: 0,
                            class: "h-4 w-4 text-success"
                          })) : (openBlock(), createBlock(unref(AlertCircle), {
                            key: 1,
                            class: "h-4 w-4 text-destructive"
                          })),
                          createVNode("span", {
                            class: [isValid.value ? "text-success" : "text-destructive", "text-xs"]
                          }, toDisplayString(isValid.value ? "Valid" : "Invalid"), 3)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$1), {
                    size: "sm",
                    onClick: formatYAML,
                    disabled: !isValid.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Format "),
                      createVNode(unref(ArrowRight), { class: "ml-1 h-4 w-4" })
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0 flex flex-col gap-2" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: yamlInput.value,
                    "onUpdate:modelValue": ($event) => yamlInput.value = $event,
                    language: "yaml",
                    class: "flex-1 min-h-0",
                    placeholder: "key: value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  error.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                  }, [
                    createVNode("div", { class: "font-semibold mb-1" }, "Syntax Error:"),
                    createTextVNode(" " + toDisplayString(error.value), 1)
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Formatted Output`);
                      } else {
                        return [
                          createTextVNode("Formatted Output")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Formatted Output")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    "model-value": yamlOutput.value,
                    language: "yaml",
                    readonly: "",
                    class: "h-full min-h-0",
                    placeholder: "Formatted YAML will appear here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": yamlOutput.value,
                      language: "yaml",
                      readonly: "",
                      class: "h-full min-h-0",
                      placeholder: "Formatted YAML will appear here..."
                    }, null, 8, ["model-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Formatted Output")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": yamlOutput.value,
                    language: "yaml",
                    readonly: "",
                    class: "h-full min-h-0",
                    placeholder: "Formatted YAML will appear here..."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/YamlLintView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
