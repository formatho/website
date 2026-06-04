import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
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
  __name: "SvgPlaceholderGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const width = ref(300);
    const height = ref(200);
    const bgColor = ref("#cccccc");
    const textColor = ref("#333333");
    const text = ref("");
    const svgContent = computed(() => {
      const displayText = text.value || `${width.value} × ${height.value}`;
      return `<svg width="${width.value}" height="${height.value}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor.value}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
        fill="${textColor.value}" font-family="monospace" font-size="16">
    ${displayText}
  </text>
</svg>`;
    });
    const svgDataUrl = computed(() => {
      return `data:image/svg+xml,${encodeURIComponent(svgContent.value)}`;
    });
    const downloadSvg = () => {
      const a = document.createElement("a");
      a.href = svgDataUrl.value;
      a.download = `placeholder-${width.value}x${height.value}.svg`;
      a.click();
    };
    const copySvg = () => {
      navigator.clipboard.writeText(svgContent.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">SVG Placeholder Generator</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Width (px)`);
                      } else {
                        return [
                          createTextVNode("Width (px)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: width.value,
                    "onUpdate:modelValue": ($event) => width.value = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    min: "1",
                    max: "2000"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Height (px)`);
                      } else {
                        return [
                          createTextVNode("Height (px)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: height.value,
                    "onUpdate:modelValue": ($event) => height.value = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    min: "1",
                    max: "2000"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Background Color`);
                      } else {
                        return [
                          createTextVNode("Background Color")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}><input type="color"${ssrRenderAttr("value", bgColor.value)} class="w-12 h-10 rounded cursor-pointer"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: bgColor.value,
                    "onUpdate:modelValue": ($event) => bgColor.value = $event,
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Text Color`);
                      } else {
                        return [
                          createTextVNode("Text Color")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}><input type="color"${ssrRenderAttr("value", textColor.value)} class="w-12 h-10 rounded cursor-pointer"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: textColor.value,
                    "onUpdate:modelValue": ($event) => textColor.value = $event,
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Custom Text (optional)`);
                      } else {
                        return [
                          createTextVNode("Custom Text (optional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: text.value,
                    "onUpdate:modelValue": ($event) => text.value = $event,
                    placeholder: "Leave empty for dimensions"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: downloadSvg,
                    "aria-label": "Download SVG file"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Download SVG`);
                      } else {
                        return [
                          createTextVNode("Download SVG")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "outline",
                    onClick: copySvg,
                    "aria-label": "Copy SVG code to clipboard"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Copy SVG Code`);
                      } else {
                        return [
                          createTextVNode("Copy SVG Code")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Width (px)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: width.value,
                          "onUpdate:modelValue": ($event) => width.value = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "1",
                          max: "2000"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Height (px)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: height.value,
                          "onUpdate:modelValue": ($event) => height.value = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "1",
                          max: "2000"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Background Color")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex gap-2" }, [
                          withDirectives(createVNode("input", {
                            type: "color",
                            "onUpdate:modelValue": ($event) => bgColor.value = $event,
                            class: "w-12 h-10 rounded cursor-pointer"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, bgColor.value]
                          ]),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: bgColor.value,
                            "onUpdate:modelValue": ($event) => bgColor.value = $event,
                            class: "font-mono"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Text Color")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex gap-2" }, [
                          withDirectives(createVNode("input", {
                            type: "color",
                            "onUpdate:modelValue": ($event) => textColor.value = $event,
                            class: "w-12 h-10 rounded cursor-pointer"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, textColor.value]
                          ]),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: textColor.value,
                            "onUpdate:modelValue": ($event) => textColor.value = $event,
                            class: "font-mono"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Custom Text (optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: text.value,
                        "onUpdate:modelValue": ($event) => text.value = $event,
                        placeholder: "Leave empty for dimensions"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$7), {
                        onClick: downloadSvg,
                        "aria-label": "Download SVG file"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Download SVG")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        onClick: copySvg,
                        "aria-label": "Copy SVG code to clipboard"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Copy SVG Code")
                        ]),
                        _: 1
                      })
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
                      createTextVNode("Settings")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Width (px)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: width.value,
                        "onUpdate:modelValue": ($event) => width.value = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "1",
                        max: "2000"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Height (px)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: height.value,
                        "onUpdate:modelValue": ($event) => height.value = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "1",
                        max: "2000"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Background Color")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        withDirectives(createVNode("input", {
                          type: "color",
                          "onUpdate:modelValue": ($event) => bgColor.value = $event,
                          class: "w-12 h-10 rounded cursor-pointer"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, bgColor.value]
                        ]),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: bgColor.value,
                          "onUpdate:modelValue": ($event) => bgColor.value = $event,
                          class: "font-mono"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Text Color")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        withDirectives(createVNode("input", {
                          type: "color",
                          "onUpdate:modelValue": ($event) => textColor.value = $event,
                          class: "w-12 h-10 rounded cursor-pointer"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, textColor.value]
                        ]),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: textColor.value,
                          "onUpdate:modelValue": ($event) => textColor.value = $event,
                          class: "font-mono"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Custom Text (optional)")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: text.value,
                      "onUpdate:modelValue": ($event) => text.value = $event,
                      placeholder: "Leave empty for dimensions"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$7), {
                      onClick: downloadSvg,
                      "aria-label": "Download SVG file"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Download SVG")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      variant: "outline",
                      onClick: copySvg,
                      "aria-label": "Copy SVG code to clipboard"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy SVG Code")
                      ]),
                      _: 1
                    })
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
                        _push4(`Preview`);
                      } else {
                        return [
                          createTextVNode("Preview")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Preview")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex justify-center items-center min-h-[200px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img${ssrRenderAttr("src", svgDataUrl.value)} alt="Placeholder" class="max-w-full rounded shadow"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      src: svgDataUrl.value,
                      alt: "Placeholder",
                      class: "max-w-full rounded shadow"
                    }, null, 8, ["src"])
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
                      createTextVNode("Preview")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex justify-center items-center min-h-[200px]" }, {
                default: withCtx(() => [
                  createVNode("img", {
                    src: svgDataUrl.value,
                    alt: "Placeholder",
                    class: "max-w-full rounded shadow"
                  }, null, 8, ["src"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/SvgPlaceholderGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
