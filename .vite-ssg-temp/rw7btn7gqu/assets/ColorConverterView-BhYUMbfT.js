import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelText, toDisplayString, createBlock, openBlock, Fragment, renderList, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { Palette, Check, Copy } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$6 } from "../main.mjs";
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
  __name: "ColorConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const hex = ref("#FF5733");
    const copied = ref(null);
    const hexToRgb = (hexStr) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);
      return result ? {
        r: parseInt(result[1] ?? "0", 16),
        g: parseInt(result[2] ?? "0", 16),
        b: parseInt(result[3] ?? "0", 16)
      } : null;
    };
    const rgbToHsl = (r, g, b) => {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0;
      const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }
      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      };
    };
    const rgbToCmyk = (r, g, b) => {
      if (r === 0 && g === 0 && b === 0) {
        return { c: 0, m: 0, y: 0, k: 100 };
      }
      const rr = r / 255;
      const gg = g / 255;
      const bb = b / 255;
      const k = 1 - Math.max(rr, gg, bb);
      const c = (1 - rr - k) / (1 - k);
      const m = (1 - gg - k) / (1 - k);
      const y = (1 - bb - k) / (1 - k);
      return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
      };
    };
    const rgb = computed(() => hexToRgb(hex.value) ?? { r: 0, g: 0, b: 0 });
    const hsl = computed(() => rgbToHsl(rgb.value.r, rgb.value.g, rgb.value.b));
    const cmyk = computed(() => rgbToCmyk(rgb.value.r, rgb.value.g, rgb.value.b));
    const formats = computed(() => ({
      HEX: hex.value.toUpperCase(),
      "HEX (no #)": hex.value.replace("#", "").toUpperCase(),
      RGB: `rgb(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b})`,
      RGBA: `rgba(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b}, 1)`,
      HSL: `hsl(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%)`,
      HSLA: `hsla(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%, 1)`,
      CMYK: `cmyk(${cmyk.value.c}%, ${cmyk.value.m}%, ${cmyk.value.y}%, ${cmyk.value.k}%)`,
      "CSS Variable": `--color: ${hex.value};`,
      "Tailwind Class": `bg-[${hex.value}]`
    }));
    const presets = [
      { name: "Red", color: "#FF0000" },
      { name: "Green", color: "#00FF00" },
      { name: "Blue", color: "#0000FF" },
      { name: "Yellow", color: "#FFFF00" },
      { name: "Cyan", color: "#00FFFF" },
      { name: "Magenta", color: "#FF00FF" },
      { name: "White", color: "#FFFFFF" },
      { name: "Black", color: "#000000" },
      { name: "Orange", color: "#FF5733" },
      { name: "Purple", color: "#800080" },
      { name: "Pink", color: "#FFC0CB" },
      { name: "Brown", color: "#8B4513" }
    ];
    const copyFormat = (type) => {
      const value = formats.value[type];
      if (value) {
        navigator.clipboard.writeText(value);
      }
      copied.value = type;
      setTimeout(() => copied.value = null, 2e3);
    };
    const randomColor = () => {
      hex.value = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Palette), { class: "w-8 h-8" }, null, _parent));
      _push(` Color Converter </h1><p class="text-muted-foreground mt-2"> Convert colors between HEX, RGB, HSL, CMYK, and more. </p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
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
                        _push4(`Select or enter a color`);
                      } else {
                        return [
                          createTextVNode("Select or enter a color")
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
                        createTextVNode("Select or enter a color")
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
                  _push3(`<div class="flex gap-4"${_scopeId2}><input${ssrRenderAttr("value", hex.value)} type="color" class="w-20 h-20 cursor-pointer rounded-lg border"${_scopeId2}><input${ssrRenderAttr("value", hex.value)} type="text" placeholder="#000000" class="flex-1 px-3 py-2 border rounded-md font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div><div class="h-24 rounded-lg border flex items-center justify-center text-2xl font-bold" style="${ssrRenderStyle({ backgroundColor: hex.value, color: hsl.value.l > 50 ? "#000" : "#FFF" })}"${_scopeId2}>${ssrInterpolate(hex.value.toUpperCase())}</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: randomColor,
                    variant: "outline",
                    class: "w-full",
                    "aria-label": "Generate random color"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 🎲 Random Color `);
                      } else {
                        return [
                          createTextVNode(" 🎲 Random Color ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(presets, (preset) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      key: preset.name,
                      onClick: ($event) => hex.value = preset.color,
                      variant: "ghost",
                      size: "icon",
                      "aria-label": "Select " + preset.name + " color",
                      class: "w-8 h-8 rounded-full border-2 border-transparent hover:border-primary transition-colors",
                      style: { backgroundColor: preset.color },
                      title: preset.name
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => hex.value = $event,
                        type: "color",
                        class: "w-20 h-20 cursor-pointer rounded-lg border"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, hex.value]
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => hex.value = $event,
                        type: "text",
                        placeholder: "#000000",
                        class: "flex-1 px-3 py-2 border rounded-md font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, hex.value]
                      ])
                    ]),
                    createVNode("div", {
                      class: "h-24 rounded-lg border flex items-center justify-center text-2xl font-bold",
                      style: { backgroundColor: hex.value, color: hsl.value.l > 50 ? "#000" : "#FFF" }
                    }, toDisplayString(hex.value.toUpperCase()), 5),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), {
                        onClick: randomColor,
                        variant: "outline",
                        class: "w-full",
                        "aria-label": "Generate random color"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 🎲 Random Color ")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(presets, (preset) => {
                          return createVNode(unref(_sfc_main$6), {
                            key: preset.name,
                            onClick: ($event) => hex.value = preset.color,
                            variant: "ghost",
                            size: "icon",
                            "aria-label": "Select " + preset.name + " color",
                            class: "w-8 h-8 rounded-full border-2 border-transparent hover:border-primary transition-colors",
                            style: { backgroundColor: preset.color },
                            title: preset.name
                          }, null, 8, ["onClick", "aria-label", "style", "title"]);
                        }), 64))
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
                      createTextVNode("Input")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Select or enter a color")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => hex.value = $event,
                      type: "color",
                      class: "w-20 h-20 cursor-pointer rounded-lg border"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, hex.value]
                    ]),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => hex.value = $event,
                      type: "text",
                      placeholder: "#000000",
                      class: "flex-1 px-3 py-2 border rounded-md font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, hex.value]
                    ])
                  ]),
                  createVNode("div", {
                    class: "h-24 rounded-lg border flex items-center justify-center text-2xl font-bold",
                    style: { backgroundColor: hex.value, color: hsl.value.l > 50 ? "#000" : "#FFF" }
                  }, toDisplayString(hex.value.toUpperCase()), 5),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), {
                      onClick: randomColor,
                      variant: "outline",
                      class: "w-full",
                      "aria-label": "Generate random color"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 🎲 Random Color ")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(presets, (preset) => {
                        return createVNode(unref(_sfc_main$6), {
                          key: preset.name,
                          onClick: ($event) => hex.value = preset.color,
                          variant: "ghost",
                          size: "icon",
                          "aria-label": "Select " + preset.name + " color",
                          class: "w-8 h-8 rounded-full border-2 border-transparent hover:border-primary transition-colors",
                          style: { backgroundColor: preset.color },
                          title: preset.name
                        }, null, 8, ["onClick", "aria-label", "style", "title"]);
                      }), 64))
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
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Converted Formats`);
                      } else {
                        return [
                          createTextVNode("Converted Formats")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Converted Formats")
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
                  ssrRenderList(formats.value, (value, type) => {
                    _push3(`<div class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"${_scopeId2}><div class="flex-1"${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>${ssrInterpolate(type)}</div><div class="font-mono"${_scopeId2}>${ssrInterpolate(value)}</div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: ($event) => copyFormat(type),
                      variant: "ghost",
                      size: "sm",
                      "aria-label": "Copy color value"
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
                    (openBlock(true), createBlock(Fragment, null, renderList(formats.value, (value, type) => {
                      return openBlock(), createBlock("div", {
                        key: type,
                        class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                      }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, toDisplayString(type), 1),
                          createVNode("div", { class: "font-mono" }, toDisplayString(value), 1)
                        ]),
                        createVNode(unref(_sfc_main$6), {
                          onClick: ($event) => copyFormat(type),
                          variant: "ghost",
                          size: "sm",
                          "aria-label": "Copy color value"
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
                      createTextVNode("Converted Formats")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-3" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(formats.value, (value, type) => {
                    return openBlock(), createBlock("div", {
                      key: type,
                      class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                    }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, toDisplayString(type), 1),
                        createVNode("div", { class: "font-mono" }, toDisplayString(value), 1)
                      ]),
                      createVNode(unref(_sfc_main$6), {
                        onClick: ($event) => copyFormat(type),
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy color value"
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
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "mt-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Color Values`);
                      } else {
                        return [
                          createTextVNode("Color Values")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Color Values")
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
                  _push3(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"${_scopeId2}><div class="p-4 bg-surface-hover rounded-lg text-center"${_scopeId2}><div class="text-sm text-muted-foreground mb-2"${_scopeId2}>Red</div><div class="text-2xl font-bold" style="${ssrRenderStyle({ color: "#FF0000" })}"${_scopeId2}>${ssrInterpolate(rgb.value.r)}</div></div><div class="p-4 bg-surface-hover rounded-lg text-center"${_scopeId2}><div class="text-sm text-muted-foreground mb-2"${_scopeId2}>Green</div><div class="text-2xl font-bold" style="${ssrRenderStyle({ color: "#00FF00" })}"${_scopeId2}>${ssrInterpolate(rgb.value.g)}</div></div><div class="p-4 bg-surface-hover rounded-lg text-center"${_scopeId2}><div class="text-sm text-muted-foreground mb-2"${_scopeId2}>Blue</div><div class="text-2xl font-bold" style="${ssrRenderStyle({ color: "#0000FF" })}"${_scopeId2}>${ssrInterpolate(rgb.value.b)}</div></div><div class="p-4 bg-surface-hover rounded-lg text-center"${_scopeId2}><div class="text-sm text-muted-foreground mb-2"${_scopeId2}>Lightness</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(hsl.value.l ?? 0)}%</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                      createVNode("div", { class: "p-4 bg-surface-hover rounded-lg text-center" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Red"),
                        createVNode("div", {
                          class: "text-2xl font-bold",
                          style: { color: "#FF0000" }
                        }, toDisplayString(rgb.value.r), 1)
                      ]),
                      createVNode("div", { class: "p-4 bg-surface-hover rounded-lg text-center" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Green"),
                        createVNode("div", {
                          class: "text-2xl font-bold",
                          style: { color: "#00FF00" }
                        }, toDisplayString(rgb.value.g), 1)
                      ]),
                      createVNode("div", { class: "p-4 bg-surface-hover rounded-lg text-center" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Blue"),
                        createVNode("div", {
                          class: "text-2xl font-bold",
                          style: { color: "#0000FF" }
                        }, toDisplayString(rgb.value.b), 1)
                      ]),
                      createVNode("div", { class: "p-4 bg-surface-hover rounded-lg text-center" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Lightness"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(hsl.value.l ?? 0) + "%", 1)
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
                      createTextVNode("Color Values")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                    createVNode("div", { class: "p-4 bg-surface-hover rounded-lg text-center" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Red"),
                      createVNode("div", {
                        class: "text-2xl font-bold",
                        style: { color: "#FF0000" }
                      }, toDisplayString(rgb.value.r), 1)
                    ]),
                    createVNode("div", { class: "p-4 bg-surface-hover rounded-lg text-center" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Green"),
                      createVNode("div", {
                        class: "text-2xl font-bold",
                        style: { color: "#00FF00" }
                      }, toDisplayString(rgb.value.g), 1)
                    ]),
                    createVNode("div", { class: "p-4 bg-surface-hover rounded-lg text-center" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Blue"),
                      createVNode("div", {
                        class: "text-2xl font-bold",
                        style: { color: "#0000FF" }
                      }, toDisplayString(rgb.value.b), 1)
                    ]),
                    createVNode("div", { class: "p-4 bg-surface-hover rounded-lg text-center" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Lightness"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(hsl.value.l ?? 0) + "%", 1)
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ColorConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
