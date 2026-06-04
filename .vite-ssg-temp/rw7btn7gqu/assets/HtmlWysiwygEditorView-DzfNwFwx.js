import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$1, h as _sfc_main$6 } from "../main.mjs";
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
  __name: "HtmlWysiwygEditorView",
  __ssrInlineRender: true,
  setup(__props) {
    const htmlContent = ref("");
    const editorRef = ref(null);
    const execCommand = (command, value) => {
      document.execCommand(command, false, value);
      editorRef.value?.focus();
    };
    const getHtml = () => {
      if (editorRef.value) {
        htmlContent.value = editorRef.value.innerHTML;
      }
    };
    const copyHtml = () => {
      navigator.clipboard.writeText(htmlContent.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">WYSIWYG HTML Editor</h1></div><div class="flex flex-wrap gap-1 p-2 bg-muted rounded-lg" role="toolbar" aria-label="Text formatting toolbar">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("bold"),
        "aria-label": "Bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<b${_scopeId}>B</b>`);
          } else {
            return [
              createVNode("b", null, "B")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("italic"),
        "aria-label": "Italic"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i${_scopeId}>I</i>`);
          } else {
            return [
              createVNode("i", null, "I")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("underline"),
        "aria-label": "Underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<u${_scopeId}>U</u>`);
          } else {
            return [
              createVNode("u", null, "U")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("strikeThrough"),
        "aria-label": "Strikethrough"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<s${_scopeId}>S</s>`);
          } else {
            return [
              createVNode("s", null, "S")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-px h-8 bg-border mx-1"></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("justifyLeft"),
        "aria-label": "Align left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Left`);
          } else {
            return [
              createTextVNode("Left")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("justifyCenter"),
        "aria-label": "Align center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Center`);
          } else {
            return [
              createTextVNode("Center")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("justifyRight"),
        "aria-label": "Align right"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Right`);
          } else {
            return [
              createTextVNode("Right")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-px h-8 bg-border mx-1"></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("insertUnorderedList"),
        "aria-label": "Bullet list"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`• List`);
          } else {
            return [
              createTextVNode("• List")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("insertOrderedList"),
        "aria-label": "Numbered list"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`1. List`);
          } else {
            return [
              createTextVNode("1. List")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-px h-8 bg-border mx-1"></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("formatBlock", "h1"),
        "aria-label": "Heading 1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`H1`);
          } else {
            return [
              createTextVNode("H1")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("formatBlock", "h2"),
        "aria-label": "Heading 2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`H2`);
          } else {
            return [
              createTextVNode("H2")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("formatBlock", "h3"),
        "aria-label": "Heading 3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`H3`);
          } else {
            return [
              createTextVNode("H3")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("formatBlock", "p"),
        "aria-label": "Paragraph"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`P`);
          } else {
            return [
              createTextVNode("P")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-px h-8 bg-border mx-1"></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => execCommand("removeFormat"),
        "aria-label": "Clear formatting"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Clear`);
          } else {
            return [
              createTextVNode("Clear")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Editor`);
                      } else {
                        return [
                          createTextVNode("Editor")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    variant: "outline",
                    size: "sm",
                    onClick: getHtml,
                    "aria-label": "Get HTML output"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Get HTML`);
                      } else {
                        return [
                          createTextVNode("Get HTML")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Editor")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), {
                      variant: "outline",
                      size: "sm",
                      onClick: getHtml,
                      "aria-label": "Get HTML output"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Get HTML")
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
                  _push3(`<div contenteditable="true" class="h-full p-4 rounded-lg border border-input bg-background overflow-y-auto focus:outline-none focus:ring-2 focus:ring-ring"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      ref_key: "editorRef",
                      ref: editorRef,
                      contenteditable: "true",
                      class: "h-full p-4 rounded-lg border border-input bg-background overflow-y-auto focus:outline-none focus:ring-2 focus:ring-ring",
                      onInput: getHtml
                    }, null, 544)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "flex-row items-center justify-between" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Editor")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$1), {
                    variant: "outline",
                    size: "sm",
                    onClick: getHtml,
                    "aria-label": "Get HTML output"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Get HTML")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode("div", {
                    ref_key: "editorRef",
                    ref: editorRef,
                    contenteditable: "true",
                    class: "h-full p-4 rounded-lg border border-input bg-background overflow-y-auto focus:outline-none focus:ring-2 focus:ring-ring",
                    onInput: getHtml
                  }, null, 544)
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
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`HTML Output`);
                      } else {
                        return [
                          createTextVNode("HTML Output")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyHtml,
                    disabled: !htmlContent.value,
                    "aria-label": "Copy HTML to clipboard"
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
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("HTML Output")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), {
                      variant: "outline",
                      size: "sm",
                      onClick: copyHtml,
                      disabled: !htmlContent.value,
                      "aria-label": "Copy HTML to clipboard"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    "model-value": htmlContent.value,
                    readonly: "",
                    class: "h-full resize-none font-mono text-sm",
                    placeholder: "HTML will appear here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), {
                      "model-value": htmlContent.value,
                      readonly: "",
                      class: "h-full resize-none font-mono text-sm",
                      placeholder: "HTML will appear here..."
                    }, null, 8, ["model-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "flex-row items-center justify-between" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("HTML Output")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$1), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyHtml,
                    disabled: !htmlContent.value,
                    "aria-label": "Copy HTML to clipboard"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Copy")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), {
                    "model-value": htmlContent.value,
                    readonly: "",
                    class: "h-full resize-none font-mono text-sm",
                    placeholder: "HTML will appear here..."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/HtmlWysiwygEditorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
