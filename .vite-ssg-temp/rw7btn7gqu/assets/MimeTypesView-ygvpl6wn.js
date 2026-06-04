import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelRadio, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$5 } from "../main.mjs";
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
  __name: "MimeTypesView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputText = ref("");
    const searchType = ref("extension");
    const mimeTypes = {
      txt: { mime: "text/plain", name: "Plain Text" },
      html: { mime: "text/html", name: "HTML Document" },
      css: { mime: "text/css", name: "Cascading Style Sheets" },
      js: { mime: "application/javascript", name: "JavaScript" },
      json: { mime: "application/json", name: "JSON Data" },
      xml: { mime: "application/xml", name: "XML Document" },
      pdf: { mime: "application/pdf", name: "PDF Document" },
      zip: { mime: "application/zip", name: "ZIP Archive" },
      tar: { mime: "application/x-tar", name: "TAR Archive" },
      gz: { mime: "application/gzip", name: "GZIP Archive" },
      png: { mime: "image/png", name: "PNG Image" },
      jpg: { mime: "image/jpeg", name: "JPEG Image" },
      jpeg: { mime: "image/jpeg", name: "JPEG Image" },
      gif: { mime: "image/gif", name: "GIF Image" },
      svg: { mime: "image/svg+xml", name: "SVG Image" },
      webp: { mime: "image/webp", name: "WebP Image" },
      ico: { mime: "image/x-icon", name: "Icon Image" },
      mp3: { mime: "audio/mpeg", name: "MP3 Audio" },
      wav: { mime: "audio/wav", name: "WAV Audio" },
      ogg: { mime: "audio/ogg", name: "OGG Audio" },
      mp4: { mime: "video/mp4", name: "MP4 Video" },
      webm: { mime: "video/webm", name: "WebM Video" },
      avi: { mime: "video/x-msvideo", name: "AVI Video" },
      doc: { mime: "application/msword", name: "Word Document" },
      docx: {
        mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        name: "Word Document (OOXML)"
      },
      xls: { mime: "application/vnd.ms-excel", name: "Excel Spreadsheet" },
      xlsx: {
        mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        name: "Excel Spreadsheet (OOXML)"
      },
      ppt: { mime: "application/vnd.ms-powerpoint", name: "PowerPoint Presentation" },
      pptx: {
        mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        name: "PowerPoint (OOXML)"
      }
    };
    const result = computed(() => {
      const query = inputText.value.toLowerCase().trim();
      if (!query) return null;
      if (searchType.value === "extension") {
        return mimeTypes[query] || null;
      } else {
        for (const [ext, info] of Object.entries(mimeTypes)) {
          if (info.mime.toLowerCase().includes(query)) {
            return { ...info, extension: ext };
          }
        }
        return null;
      }
    });
    const allTypes = computed(() => {
      return Object.entries(mimeTypes).map(([ext, info]) => ({ extension: ext, ...info }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">MIME Type Lookup</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Search`);
                      } else {
                        return [
                          createTextVNode("Search")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Search")
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
                  _push3(`<div class="flex gap-4"${_scopeId2}><label class="flex items-center gap-2 cursor-pointer"${_scopeId2}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(searchType.value, "extension")) ? " checked" : ""} aria-label="Search by file extension" value="extension"${_scopeId2}><span${_scopeId2}>By Extension</span></label><label class="flex items-center gap-2 cursor-pointer"${_scopeId2}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(searchType.value, "mime")) ? " checked" : ""} aria-label="Search by MIME type" value="mime"${_scopeId2}><span${_scopeId2}>By MIME Type</span></label></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    "aria-label": "Search MIME types",
                    placeholder: searchType.value === "extension" ? "Enter file extension (e.g., pdf, jpg)..." : "Enter MIME type (e.g., image/png)..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => searchType.value = $event,
                          "aria-label": "Search by file extension",
                          value: "extension"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, searchType.value]
                        ]),
                        createVNode("span", null, "By Extension")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => searchType.value = $event,
                          "aria-label": "Search by MIME type",
                          value: "mime"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, searchType.value]
                        ]),
                        createVNode("span", null, "By MIME Type")
                      ])
                    ]),
                    createVNode(unref(_sfc_main$5), {
                      modelValue: inputText.value,
                      "onUpdate:modelValue": ($event) => inputText.value = $event,
                      "aria-label": "Search MIME types",
                      placeholder: searchType.value === "extension" ? "Enter file extension (e.g., pdf, jpg)..." : "Enter MIME type (e.g., image/png)..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
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
                      createTextVNode("Search")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4" }, [
                    createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => searchType.value = $event,
                        "aria-label": "Search by file extension",
                        value: "extension"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, searchType.value]
                      ]),
                      createVNode("span", null, "By Extension")
                    ]),
                    createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => searchType.value = $event,
                        "aria-label": "Search by MIME type",
                        value: "mime"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, searchType.value]
                      ]),
                      createVNode("span", null, "By MIME Type")
                    ])
                  ]),
                  createVNode(unref(_sfc_main$5), {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    "aria-label": "Search MIME types",
                    placeholder: searchType.value === "extension" ? "Enter file extension (e.g., pdf, jpg)..." : "Enter MIME type (e.g., image/png)..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (result.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
        if ("extension" in result.value) {
          _push(ssrRenderComponent(unref(_sfc_main$1), null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Extension</div><div class="text-2xl font-bold"${_scopeId2}>.${ssrInterpolate(result.value.extension)}</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Extension"),
                        createVNode("div", { class: "text-2xl font-bold" }, "." + toDisplayString(result.value.extension), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Extension"),
                      createVNode("div", { class: "text-2xl font-bold" }, "." + toDisplayString(result.value.extension), 1)
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
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>MIME Type</div><div class="text-lg font-mono"${_scopeId2}>${ssrInterpolate(result.value.mime)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "MIME Type"),
                      createVNode("div", { class: "text-lg font-mono" }, toDisplayString(result.value.mime), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "MIME Type"),
                    createVNode("div", { class: "text-lg font-mono" }, toDisplayString(result.value.mime), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Name</div><div class="text-xl font-semibold"${_scopeId2}>${ssrInterpolate(result.value.name)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Name"),
                      createVNode("div", { class: "text-xl font-semibold" }, toDisplayString(result.value.name), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Name"),
                    createVNode("div", { class: "text-xl font-semibold" }, toDisplayString(result.value.name), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Common MIME Types`);
                      } else {
                        return [
                          createTextVNode("Common MIME Types")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Common MIME Types")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm"${_scopeId2}><!--[-->`);
                  ssrRenderList(allTypes.value, (type) => {
                    _push3(`<div class="p-2 rounded bg-muted flex justify-between"${_scopeId2}><span class="font-mono"${_scopeId2}>.${ssrInterpolate(type.extension)}</span><span class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(type.mime)}</span></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(allTypes.value, (type) => {
                        return openBlock(), createBlock("div", {
                          key: type.extension,
                          class: "p-2 rounded bg-muted flex justify-between"
                        }, [
                          createVNode("span", { class: "font-mono" }, "." + toDisplayString(type.extension), 1),
                          createVNode("span", { class: "text-muted-foreground" }, toDisplayString(type.mime), 1)
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
                      createTextVNode("Common MIME Types")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(allTypes.value, (type) => {
                      return openBlock(), createBlock("div", {
                        key: type.extension,
                        class: "p-2 rounded bg-muted flex justify-between"
                      }, [
                        createVNode("span", { class: "font-mono" }, "." + toDisplayString(type.extension), 1),
                        createVNode("span", { class: "text-muted-foreground" }, toDisplayString(type.mime), 1)
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/MimeTypesView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
