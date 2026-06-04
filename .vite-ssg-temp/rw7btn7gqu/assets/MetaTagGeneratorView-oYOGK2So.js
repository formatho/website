import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
import { _ as _sfc_main$5 } from "./Label-Bp2OSpkW.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
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
  __name: "MetaTagGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const title = ref("");
    const description = ref("");
    const keywords = ref("");
    const author = ref("");
    const viewport = ref("width=device-width, initial-scale=1");
    const charset = ref("UTF-8");
    const ogTitle = ref("");
    const ogDescription = ref("");
    const ogImage = ref("");
    const twitterCard = ref("summary_large_image");
    const generatedTags = computed(() => {
      let tags = "";
      tags += `<meta charset="${charset.value}">
`;
      tags += `<meta name="viewport" content="${viewport.value}">
`;
      tags += `<title>${title.value}</title>
`;
      if (description.value) {
        tags += `<meta name="description" content="${description.value}">
`;
      }
      if (keywords.value) {
        tags += `<meta name="keywords" content="${keywords.value}">
`;
      }
      if (author.value) {
        tags += `<meta name="author" content="${author.value}">
`;
      }
      tags += "\n<!-- Open Graph / Facebook -->\n";
      tags += `<meta property="og:type" content="website">
`;
      if (ogTitle.value || title.value) {
        tags += `<meta property="og:title" content="${ogTitle.value || title.value}">
`;
      }
      if (ogDescription.value || description.value) {
        tags += `<meta property="og:description" content="${ogDescription.value || description.value}">
`;
      }
      if (ogImage.value) {
        tags += `<meta property="og:image" content="${ogImage.value}">
`;
      }
      tags += "\n<!-- Twitter -->\n";
      tags += `<meta name="twitter:card" content="${twitterCard.value}">
`;
      if (ogTitle.value || title.value) {
        tags += `<meta name="twitter:title" content="${ogTitle.value || title.value}">
`;
      }
      if (ogDescription.value || description.value) {
        tags += `<meta name="twitter:description" content="${ogDescription.value || description.value}">
`;
      }
      if (ogImage.value) {
        tags += `<meta name="twitter:image" content="${ogImage.value}">
`;
      }
      return tags;
    });
    const copyTags = () => {
      navigator.clipboard.writeText(generatedTags.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Meta Tag Generator</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Basic Meta Tags`);
                      } else {
                        return [
                          createTextVNode("Basic Meta Tags")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Basic Meta Tags")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Title`);
                      } else {
                        return [
                          createTextVNode("Title")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: title.value,
                    "onUpdate:modelValue": ($event) => title.value = $event,
                    placeholder: "Page title..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Description`);
                      } else {
                        return [
                          createTextVNode("Description")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: description.value,
                    "onUpdate:modelValue": ($event) => description.value = $event,
                    placeholder: "Page description..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Keywords`);
                      } else {
                        return [
                          createTextVNode("Keywords")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: keywords.value,
                    "onUpdate:modelValue": ($event) => keywords.value = $event,
                    placeholder: "keyword1, keyword2..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Author`);
                      } else {
                        return [
                          createTextVNode("Author")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: author.value,
                    "onUpdate:modelValue": ($event) => author.value = $event,
                    placeholder: "Author name..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Title")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: title.value,
                        "onUpdate:modelValue": ($event) => title.value = $event,
                        placeholder: "Page title..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Description")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: description.value,
                        "onUpdate:modelValue": ($event) => description.value = $event,
                        placeholder: "Page description..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Keywords")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: keywords.value,
                        "onUpdate:modelValue": ($event) => keywords.value = $event,
                        placeholder: "keyword1, keyword2..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Author")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: author.value,
                        "onUpdate:modelValue": ($event) => author.value = $event,
                        placeholder: "Author name..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createTextVNode("Basic Meta Tags")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Title")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: title.value,
                      "onUpdate:modelValue": ($event) => title.value = $event,
                      placeholder: "Page title..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Description")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: description.value,
                      "onUpdate:modelValue": ($event) => description.value = $event,
                      placeholder: "Page description..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Keywords")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: keywords.value,
                      "onUpdate:modelValue": ($event) => keywords.value = $event,
                      placeholder: "keyword1, keyword2..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Author")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: author.value,
                      "onUpdate:modelValue": ($event) => author.value = $event,
                      placeholder: "Author name..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Open Graph &amp; Twitter`);
                      } else {
                        return [
                          createTextVNode("Open Graph & Twitter")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Open Graph & Twitter")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`OG Title (optional, defaults to title)`);
                      } else {
                        return [
                          createTextVNode("OG Title (optional, defaults to title)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: ogTitle.value,
                    "onUpdate:modelValue": ($event) => ogTitle.value = $event,
                    placeholder: "Open Graph title..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`OG Description (optional)`);
                      } else {
                        return [
                          createTextVNode("OG Description (optional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: ogDescription.value,
                    "onUpdate:modelValue": ($event) => ogDescription.value = $event,
                    placeholder: "Open Graph description..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`OG Image URL`);
                      } else {
                        return [
                          createTextVNode("OG Image URL")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: ogImage.value,
                    "onUpdate:modelValue": ($event) => ogImage.value = $event,
                    placeholder: "https://example.com/image.jpg"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Twitter Card Type`);
                      } else {
                        return [
                          createTextVNode("Twitter Card Type")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><option value="summary"${ssrIncludeBooleanAttr(Array.isArray(twitterCard.value) ? ssrLooseContain(twitterCard.value, "summary") : ssrLooseEqual(twitterCard.value, "summary")) ? " selected" : ""}${_scopeId2}>Summary</option><option value="summary_large_image"${ssrIncludeBooleanAttr(Array.isArray(twitterCard.value) ? ssrLooseContain(twitterCard.value, "summary_large_image") : ssrLooseEqual(twitterCard.value, "summary_large_image")) ? " selected" : ""}${_scopeId2}>Summary Large Image</option></select></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("OG Title (optional, defaults to title)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: ogTitle.value,
                        "onUpdate:modelValue": ($event) => ogTitle.value = $event,
                        placeholder: "Open Graph title..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("OG Description (optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: ogDescription.value,
                        "onUpdate:modelValue": ($event) => ogDescription.value = $event,
                        placeholder: "Open Graph description..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("OG Image URL")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: ogImage.value,
                        "onUpdate:modelValue": ($event) => ogImage.value = $event,
                        placeholder: "https://example.com/image.jpg"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Twitter Card Type")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => twitterCard.value = $event,
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        createVNode("option", { value: "summary" }, "Summary"),
                        createVNode("option", { value: "summary_large_image" }, "Summary Large Image")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, twitterCard.value]
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
                      createTextVNode("Open Graph & Twitter")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("OG Title (optional, defaults to title)")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: ogTitle.value,
                      "onUpdate:modelValue": ($event) => ogTitle.value = $event,
                      placeholder: "Open Graph title..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("OG Description (optional)")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: ogDescription.value,
                      "onUpdate:modelValue": ($event) => ogDescription.value = $event,
                      placeholder: "Open Graph description..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("OG Image URL")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: ogImage.value,
                      "onUpdate:modelValue": ($event) => ogImage.value = $event,
                      placeholder: "https://example.com/image.jpg"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Twitter Card Type")
                      ]),
                      _: 1
                    }),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => twitterCard.value = $event,
                      class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    }, [
                      createVNode("option", { value: "summary" }, "Summary"),
                      createVNode("option", { value: "summary_large_image" }, "Summary Large Image")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, twitterCard.value]
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
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generated Meta Tags`);
                      } else {
                        return [
                          createTextVNode("Generated Meta Tags")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyTags,
                    "aria-label": "Copy meta tags"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Copy`);
                      } else {
                        return [
                          createTextVNode("Copy")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generated Meta Tags")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      variant: "outline",
                      size: "sm",
                      onClick: copyTags,
                      "aria-label": "Copy meta tags"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy")
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
                  _push3(ssrRenderComponent(CodeEditor, {
                    "model-value": generatedTags.value,
                    language: "html",
                    readonly: "",
                    class: "min-h-[300px]"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": generatedTags.value,
                      language: "html",
                      readonly: "",
                      class: "min-h-[300px]"
                    }, null, 8, ["model-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Generated Meta Tags")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$7), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyTags,
                    "aria-label": "Copy meta tags"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Copy")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": generatedTags.value,
                    language: "html",
                    readonly: "",
                    class: "min-h-[300px]"
                  }, null, 8, ["model-value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/MetaTagGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
