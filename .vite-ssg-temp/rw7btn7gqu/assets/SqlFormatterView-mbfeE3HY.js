import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { format } from "sql-formatter";
import { RefreshCw, Copy } from "lucide-vue-next";
import { c as _sfc_main$a } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { SelectValue } from "radix-vue";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, c as _sfc_main$9 } from "./SelectItem-l37Q7Jqt.js";
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
  __name: "SqlFormatterView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputSql = ref("SELECT * FROM users WHERE id = 1");
    const outputSql = ref("");
    const dialect = ref("sql");
    const error = ref("");
    const formatSql = () => {
      try {
        error.value = "";
        outputSql.value = format(inputSql.value, { language: dialect.value });
      } catch (e) {
        error.value = e.message;
      }
    };
    const copyToClipboard = async () => {
      if (!outputSql.value) return;
      await navigator.clipboard.writeText(outputSql.value);
    };
    formatSql();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">SQL Formatter</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Input SQL`);
                      } else {
                        return [
                          createTextVNode("Input SQL")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Input SQL")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 flex flex-col gap-4 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-4"${_scopeId2}><div class="flex-1 space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dialect`);
                      } else {
                        return [
                          createTextVNode("Dialect")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: dialect.value,
                    "onUpdate:modelValue": ($event) => dialect.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(SelectValue), { placeholder: "Select dialect" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(SelectValue), { placeholder: "Select dialect" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$9), { value: "sql" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Standard SQL`);
                                  } else {
                                    return [
                                      createTextVNode("Standard SQL")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$9), { value: "mysql" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`MySQL`);
                                  } else {
                                    return [
                                      createTextVNode("MySQL")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$9), { value: "postgresql" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`PostgreSQL`);
                                  } else {
                                    return [
                                      createTextVNode("PostgreSQL")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$9), { value: "sqlite" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`SQLite`);
                                  } else {
                                    return [
                                      createTextVNode("SQLite")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$9), { value: "sql" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Standard SQL")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), { value: "mysql" }, {
                                  default: withCtx(() => [
                                    createTextVNode("MySQL")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), { value: "postgresql" }, {
                                  default: withCtx(() => [
                                    createTextVNode("PostgreSQL")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), { value: "sqlite" }, {
                                  default: withCtx(() => [
                                    createTextVNode("SQLite")
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
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createVNode(unref(SelectValue), { placeholder: "Select dialect" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), { value: "sql" }, {
                                default: withCtx(() => [
                                  createTextVNode("Standard SQL")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), { value: "mysql" }, {
                                default: withCtx(() => [
                                  createTextVNode("MySQL")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), { value: "postgresql" }, {
                                default: withCtx(() => [
                                  createTextVNode("PostgreSQL")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), { value: "sqlite" }, {
                                default: withCtx(() => [
                                  createTextVNode("SQLite")
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
                  _push3(`</div><div class="flex items-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    onClick: formatSql,
                    "aria-label": "Format SQL query"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RefreshCw), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Format `);
                      } else {
                        return [
                          createVNode(unref(RefreshCw), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Format ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: inputSql.value,
                    "onUpdate:modelValue": ($event) => inputSql.value = $event,
                    language: "sql",
                    class: "flex-1 min-h-0",
                    placeholder: "Paste your SQL here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode("div", { class: "flex-1 space-y-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Dialect")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: dialect.value,
                          "onUpdate:modelValue": ($event) => dialect.value = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createVNode(unref(SelectValue), { placeholder: "Select dialect" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), { value: "sql" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Standard SQL")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), { value: "mysql" }, {
                                  default: withCtx(() => [
                                    createTextVNode("MySQL")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), { value: "postgresql" }, {
                                  default: withCtx(() => [
                                    createTextVNode("PostgreSQL")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), { value: "sqlite" }, {
                                  default: withCtx(() => [
                                    createTextVNode("SQLite")
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
                      createVNode("div", { class: "flex items-end" }, [
                        createVNode(unref(_sfc_main$a), {
                          onClick: formatSql,
                          "aria-label": "Format SQL query"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RefreshCw), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Format ")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode(CodeEditor, {
                      modelValue: inputSql.value,
                      "onUpdate:modelValue": ($event) => inputSql.value = $event,
                      language: "sql",
                      class: "flex-1 min-h-0",
                      placeholder: "Paste your SQL here..."
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
                      createTextVNode("Input SQL")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 flex flex-col gap-4 min-h-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4" }, [
                    createVNode("div", { class: "flex-1 space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Dialect")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: dialect.value,
                        "onUpdate:modelValue": ($event) => dialect.value = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createVNode(unref(SelectValue), { placeholder: "Select dialect" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), { value: "sql" }, {
                                default: withCtx(() => [
                                  createTextVNode("Standard SQL")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), { value: "mysql" }, {
                                default: withCtx(() => [
                                  createTextVNode("MySQL")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), { value: "postgresql" }, {
                                default: withCtx(() => [
                                  createTextVNode("PostgreSQL")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), { value: "sqlite" }, {
                                default: withCtx(() => [
                                  createTextVNode("SQLite")
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
                    createVNode("div", { class: "flex items-end" }, [
                      createVNode(unref(_sfc_main$a), {
                        onClick: formatSql,
                        "aria-label": "Format SQL query"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(RefreshCw), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Format ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode(CodeEditor, {
                    modelValue: inputSql.value,
                    "onUpdate:modelValue": ($event) => inputSql.value = $event,
                    language: "sql",
                    class: "flex-1 min-h-0",
                    placeholder: "Paste your SQL here..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0 bg-muted/50" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    variant: "ghost",
                    size: "icon",
                    onClick: copyToClipboard,
                    disabled: !outputSql.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Formatted Output")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), {
                      variant: "ghost",
                      size: "icon",
                      onClick: copyToClipboard,
                      disabled: !outputSql.value
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Copy), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 flex flex-col min-h-0 pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (error.value) {
                    _push3(`<div class="p-4 text-sm text-destructive bg-destructive/10 rounded-md"${_scopeId2}>${ssrInterpolate(error.value)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(CodeEditor, {
                    "model-value": outputSql.value,
                    language: "sql",
                    readonly: "",
                    class: "flex-1 min-h-0"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    error.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 text-sm text-destructive bg-destructive/10 rounded-md"
                    }, toDisplayString(error.value), 1)) : createCommentVNode("", true),
                    createVNode(CodeEditor, {
                      "model-value": outputSql.value,
                      language: "sql",
                      readonly: "",
                      class: "flex-1 min-h-0"
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
                      createTextVNode("Formatted Output")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), {
                    variant: "ghost",
                    size: "icon",
                    onClick: copyToClipboard,
                    disabled: !outputSql.value
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Copy), { class: "h-4 w-4" })
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 flex flex-col min-h-0 pt-6" }, {
                default: withCtx(() => [
                  error.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 text-sm text-destructive bg-destructive/10 rounded-md"
                  }, toDisplayString(error.value), 1)) : createCommentVNode("", true),
                  createVNode(CodeEditor, {
                    "model-value": outputSql.value,
                    language: "sql",
                    readonly: "",
                    class: "flex-1 min-h-0"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/SqlFormatterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
