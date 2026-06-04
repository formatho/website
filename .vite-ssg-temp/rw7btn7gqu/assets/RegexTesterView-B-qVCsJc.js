import { defineComponent, ref, computed, watchEffect, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, Fragment, renderList, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { Code, Copy, Check, X } from "lucide-vue-next";
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
  __name: "RegexTesterView",
  __ssrInlineRender: true,
  setup(__props) {
    const pattern = ref("");
    const testString = ref("");
    const flags = ref({
      g: true,
      i: false,
      m: false,
      s: false,
      u: false
    });
    const error = ref("");
    const matches = computed(() => {
      if (!pattern.value || !testString.value) {
        return [];
      }
      try {
        const flagString = Object.entries(flags.value).filter(([, enabled]) => enabled).map(([flag]) => flag).join("");
        const regex = new RegExp(pattern.value, flagString);
        const results = [];
        if (flags.value.g) {
          let match;
          while ((match = regex.exec(testString.value)) !== null) {
            results.push({
              match: match[0],
              index: match.index,
              groups: match.groups
            });
          }
        } else {
          const match = regex.exec(testString.value);
          if (match) {
            results.push({
              match: match[0],
              index: match.index,
              groups: match.groups
            });
          }
        }
        return results;
      } catch (e) {
        return [];
      }
    });
    watchEffect(() => {
      if (!pattern.value || !testString.value) {
        error.value = "";
        return;
      }
      try {
        const flagString = Object.entries(flags.value).filter(([, enabled]) => enabled).map(([flag]) => flag).join("");
        new RegExp(pattern.value, flagString);
        error.value = "";
      } catch (e) {
        error.value = e.message;
      }
    });
    const highlightedText = computed(() => {
      if (!pattern.value || !testString.value || matches.value.length === 0) {
        return testString.value;
      }
      let result = "";
      let lastIndex = 0;
      const sortedMatches = [...matches.value].sort((a, b) => a.index - b.index);
      for (const match of sortedMatches) {
        result += testString.value.slice(lastIndex, match.index);
        result += `<mark class="bg-yellow-300 text-black px-0.5 rounded">${match.match}</mark>`;
        lastIndex = match.index + match.match.length;
      }
      result += testString.value.slice(lastIndex);
      return result;
    });
    const copyRegex = () => {
      const flagString = Object.entries(flags.value).filter(([_, enabled]) => enabled).map(([flag]) => flag).join("");
      const regexString = `/${pattern.value}/${flagString}`;
      navigator.clipboard.writeText(regexString);
    };
    const examples = [
      { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
      {
        label: "URL",
        pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)"
      },
      {
        label: "Phone",
        pattern: "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}"
      },
      { label: "IP Address", pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b" },
      { label: "Hex Color", pattern: "#[0-9a-fA-F]{6}\\b|#[0-9a-fA-F]{3}\\b" }
    ];
    const applyExample = (examplePattern) => {
      pattern.value = examplePattern;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-6xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Code), { class: "w-8 h-8" }, null, _parent));
      _push(` Regex Tester </h1><p class="text-muted-foreground mt-2"> Test regular expressions with real-time matching and highlighting. </p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "lg:col-span-1" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Pattern`);
                      } else {
                        return [
                          createTextVNode("Pattern")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Regular expression pattern`);
                      } else {
                        return [
                          createTextVNode("Regular expression pattern")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Pattern")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Regular expression pattern")
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
                  _push3(`<div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Regex Pattern</label><input${ssrRenderAttr("value", pattern.value)} type="text" placeholder="Enter regex pattern..." class="w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Flags</label><div class="space-y-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(flags.value, (_enabled, flag) => {
                    _push3(`<label class="flex items-center gap-2"${_scopeId2}><input${ssrIncludeBooleanAttr(Array.isArray(flags.value[flag]) ? ssrLooseContain(flags.value[flag], null) : flags.value[flag]) ? " checked" : ""} type="checkbox" class="rounded"${_scopeId2}><span class="font-mono"${_scopeId2}>${ssrInterpolate(flag)}</span><span class="text-sm text-muted-foreground"${_scopeId2}>`);
                    if (flag === "g") {
                      _push3(`<!--[-->Global<!--]-->`);
                    } else if (flag === "i") {
                      _push3(`<!--[-->Case insensitive<!--]-->`);
                    } else if (flag === "m") {
                      _push3(`<!--[-->Multiline<!--]-->`);
                    } else if (flag === "s") {
                      _push3(`<!--[-->Dotall<!--]-->`);
                    } else if (flag === "u") {
                      _push3(`<!--[-->Unicode<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</span></label>`);
                  });
                  _push3(`<!--]--></div></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Examples</label><div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(examples, (example) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      key: example.label,
                      variant: "outline",
                      size: "sm",
                      onClick: ($event) => applyExample(example.pattern)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(example.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(example.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div></div>`);
                  if (error.value) {
                    _push3(`<div class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"${_scopeId2}><p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(error.value)}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (pattern.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: copyRegex,
                      variant: "outline",
                      class: "w-full",
                      "aria-label": "Copy regex pattern"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Copy), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Copy Regex `);
                        } else {
                          return [
                            createVNode(unref(Copy), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Copy Regex ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Regex Pattern"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => pattern.value = $event,
                        type: "text",
                        placeholder: "Enter regex pattern...",
                        class: "w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, pattern.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Flags"),
                      createVNode("div", { class: "space-y-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(flags.value, (_enabled, flag) => {
                          return openBlock(), createBlock("label", {
                            key: flag,
                            class: "flex items-center gap-2"
                          }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => flags.value[flag] = $event,
                              type: "checkbox",
                              class: "rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, flags.value[flag]]
                            ]),
                            createVNode("span", { class: "font-mono" }, toDisplayString(flag), 1),
                            createVNode("span", { class: "text-sm text-muted-foreground" }, [
                              flag === "g" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode("Global")
                              ], 64)) : flag === "i" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode("Case insensitive")
                              ], 64)) : flag === "m" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                                createTextVNode("Multiline")
                              ], 64)) : flag === "s" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                createTextVNode("Dotall")
                              ], 64)) : flag === "u" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                                createTextVNode("Unicode")
                              ], 64)) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Examples"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(examples, (example) => {
                          return createVNode(unref(_sfc_main$6), {
                            key: example.label,
                            variant: "outline",
                            size: "sm",
                            onClick: ($event) => applyExample(example.pattern)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(example.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 64))
                      ])
                    ]),
                    error.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    }, [
                      createVNode("p", { class: "text-sm text-red-500" }, toDisplayString(error.value), 1)
                    ])) : createCommentVNode("", true),
                    pattern.value ? (openBlock(), createBlock(unref(_sfc_main$6), {
                      key: 1,
                      onClick: copyRegex,
                      variant: "outline",
                      class: "w-full",
                      "aria-label": "Copy regex pattern"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Copy), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Copy Regex ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
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
                      createTextVNode("Pattern")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Regular expression pattern")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Regex Pattern"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => pattern.value = $event,
                      type: "text",
                      placeholder: "Enter regex pattern...",
                      class: "w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, pattern.value]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Flags"),
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(flags.value, (_enabled, flag) => {
                        return openBlock(), createBlock("label", {
                          key: flag,
                          class: "flex items-center gap-2"
                        }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => flags.value[flag] = $event,
                            type: "checkbox",
                            class: "rounded"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, flags.value[flag]]
                          ]),
                          createVNode("span", { class: "font-mono" }, toDisplayString(flag), 1),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, [
                            flag === "g" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode("Global")
                            ], 64)) : flag === "i" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode("Case insensitive")
                            ], 64)) : flag === "m" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                              createTextVNode("Multiline")
                            ], 64)) : flag === "s" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                              createTextVNode("Dotall")
                            ], 64)) : flag === "u" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                              createTextVNode("Unicode")
                            ], 64)) : createCommentVNode("", true)
                          ])
                        ]);
                      }), 128))
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Examples"),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(examples, (example) => {
                        return createVNode(unref(_sfc_main$6), {
                          key: example.label,
                          variant: "outline",
                          size: "sm",
                          onClick: ($event) => applyExample(example.pattern)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(example.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 64))
                    ])
                  ]),
                  error.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                  }, [
                    createVNode("p", { class: "text-sm text-red-500" }, toDisplayString(error.value), 1)
                  ])) : createCommentVNode("", true),
                  pattern.value ? (openBlock(), createBlock(unref(_sfc_main$6), {
                    key: 1,
                    onClick: copyRegex,
                    variant: "outline",
                    class: "w-full",
                    "aria-label": "Copy regex pattern"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Copy), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Copy Regex ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="lg:col-span-2 space-y-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Test String`);
                      } else {
                        return [
                          createTextVNode("Test String")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Enter text to test against the pattern`);
                      } else {
                        return [
                          createTextVNode("Enter text to test against the pattern")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Test String")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Enter text to test against the pattern")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: testString.value,
                    "onUpdate:modelValue": ($event) => testString.value = $event,
                    language: "plaintext",
                    class: "min-h-[160px]",
                    placeholder: "Enter test string..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: testString.value,
                      "onUpdate:modelValue": ($event) => testString.value = $event,
                      language: "plaintext",
                      class: "min-h-[160px]",
                      placeholder: "Enter test string..."
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
                      createTextVNode("Test String")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Enter text to test against the pattern")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: testString.value,
                    "onUpdate:modelValue": ($event) => testString.value = $event,
                    language: "plaintext",
                    class: "min-h-[160px]",
                    placeholder: "Enter test string..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Result`);
                      } else {
                        return [
                          createTextVNode("Result")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Highlighted matches`);
                      } else {
                        return [
                          createTextVNode("Highlighted matches")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Result")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Highlighted matches")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (testString.value) {
                    _push3(`<div class="w-full min-h-[100px] p-3 bg-surface rounded-md font-mono text-sm whitespace-pre-wrap"${_scopeId2}>${highlightedText.value ?? ""}</div>`);
                  } else {
                    _push3(`<div class="text-center py-8 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Code), { class: "w-12 h-12 mx-auto mb-2 opacity-50" }, null, _parent3, _scopeId2));
                    _push3(`<p${_scopeId2}>Enter a test string to see matches</p></div>`);
                  }
                } else {
                  return [
                    testString.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      innerHTML: highlightedText.value,
                      class: "w-full min-h-[100px] p-3 bg-surface rounded-md font-mono text-sm whitespace-pre-wrap"
                    }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-8 text-muted-foreground"
                    }, [
                      createVNode(unref(Code), { class: "w-12 h-12 mx-auto mb-2 opacity-50" }),
                      createVNode("p", null, "Enter a test string to see matches")
                    ]))
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
                      createTextVNode("Result")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Highlighted matches")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  testString.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    innerHTML: highlightedText.value,
                    class: "w-full min-h-[100px] p-3 bg-surface rounded-md font-mono text-sm whitespace-pre-wrap"
                  }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-8 text-muted-foreground"
                  }, [
                    createVNode(unref(Code), { class: "w-12 h-12 mx-auto mb-2 opacity-50" }),
                    createVNode("p", null, "Enter a test string to see matches")
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (matches.value.length > 0) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Matches (${ssrInterpolate(matches.value.length)})`);
                        } else {
                          return [
                            createTextVNode("Matches (" + toDisplayString(matches.value.length) + ")", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Matches (" + toDisplayString(matches.value.length) + ")", 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(matches.value, (match, index) => {
                      _push3(`<div class="flex items-start gap-3 p-3 bg-surface-hover rounded border"${_scopeId2}><div class="text-gray-900"${_scopeId2}>${ssrInterpolate(index + 1)}</div><div class="flex-1"${_scopeId2}><div class="font-mono text-sm mb-1"${_scopeId2}>${ssrInterpolate(match.match)}</div><div class="text-xs text-muted-foreground"${_scopeId2}>Index: ${ssrInterpolate(match.index)}</div>`);
                      if (match.groups) {
                        _push3(`<div class="mt-2 text-xs"${_scopeId2}><div class="font-medium mb-1"${_scopeId2}>Groups:</div><div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                        ssrRenderList(match.groups, (value, key) => {
                          _push3(`<span class="px-2 py-1 bg-blue-500/10 text-blue-600 rounded text-xs"${_scopeId2}>${ssrInterpolate(key)}: ${ssrInterpolate(value)}</span>`);
                        });
                        _push3(`<!--]--></div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="flex items-center"${_scopeId2}>`);
                      if (match) {
                        _push3(ssrRenderComponent(unref(Check), { class: "w-5 h-5 text-green-500" }, null, _parent3, _scopeId2));
                      } else {
                        _push3(ssrRenderComponent(unref(X), { class: "w-5 h-5 text-red-500" }, null, _parent3, _scopeId2));
                      }
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "space-y-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(matches.value, (match, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "flex items-start gap-3 p-3 bg-surface-hover rounded border"
                          }, [
                            createVNode("div", { class: "text-gray-900" }, toDisplayString(index + 1), 1),
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("div", { class: "font-mono text-sm mb-1" }, toDisplayString(match.match), 1),
                              createVNode("div", { class: "text-xs text-muted-foreground" }, "Index: " + toDisplayString(match.index), 1),
                              match.groups ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-xs"
                              }, [
                                createVNode("div", { class: "font-medium mb-1" }, "Groups:"),
                                createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(match.groups, (value, key) => {
                                    return openBlock(), createBlock("span", {
                                      key,
                                      class: "px-2 py-1 bg-blue-500/10 text-blue-600 rounded text-xs"
                                    }, toDisplayString(key) + ": " + toDisplayString(value), 1);
                                  }), 128))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex items-center" }, [
                              match ? (openBlock(), createBlock(unref(Check), {
                                key: 0,
                                class: "w-5 h-5 text-green-500"
                              })) : (openBlock(), createBlock(unref(X), {
                                key: 1,
                                class: "w-5 h-5 text-red-500"
                              }))
                            ])
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
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Matches (" + toDisplayString(matches.value.length) + ")", 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$5), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(matches.value, (match, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "flex items-start gap-3 p-3 bg-surface-hover rounded border"
                        }, [
                          createVNode("div", { class: "text-gray-900" }, toDisplayString(index + 1), 1),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "font-mono text-sm mb-1" }, toDisplayString(match.match), 1),
                            createVNode("div", { class: "text-xs text-muted-foreground" }, "Index: " + toDisplayString(match.index), 1),
                            match.groups ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-xs"
                            }, [
                              createVNode("div", { class: "font-medium mb-1" }, "Groups:"),
                              createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(match.groups, (value, key) => {
                                  return openBlock(), createBlock("span", {
                                    key,
                                    class: "px-2 py-1 bg-blue-500/10 text-blue-600 rounded text-xs"
                                  }, toDisplayString(key) + ": " + toDisplayString(value), 1);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center" }, [
                            match ? (openBlock(), createBlock(unref(Check), {
                              key: 0,
                              class: "w-5 h-5 text-green-500"
                            })) : (openBlock(), createBlock(unref(X), {
                              key: 1,
                              class: "w-5 h-5 text-red-500"
                            }))
                          ])
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
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/RegexTesterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
