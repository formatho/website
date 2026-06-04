import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, withDirectives, vModelText, vModelSelect, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderVNode } from "vue/server-renderer";
import { QrCode, Download, Check, Copy } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$6 } from "../main.mjs";
import QRCode from "qrcode";
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
  __name: "QRCodeGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const text = ref("");
    const qrDataUrl = ref("");
    const copied = ref(false);
    const size = ref(256);
    const errorCorrectionLevel = ref("M");
    const foreground = ref("#000000");
    const background = ref("#FFFFFF");
    const generateQR = async () => {
      if (!text.value) {
        qrDataUrl.value = "";
        return;
      }
      try {
        qrDataUrl.value = await QRCode.toDataURL(text.value, {
          width: size.value,
          errorCorrectionLevel: errorCorrectionLevel.value,
          color: {
            dark: foreground.value,
            light: background.value
          }
        });
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };
    const downloadQR = () => {
      if (!qrDataUrl.value) return;
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = qrDataUrl.value;
      link.click();
    };
    const copyToClipboard = async () => {
      if (!qrDataUrl.value) return;
      try {
        const response = await fetch(qrDataUrl.value);
        const blob = await response.blob();
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        copied.value = true;
        setTimeout(() => copied.value = false, 2e3);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };
    const presets = [
      { label: "URL", value: "https://example.com" },
      { label: "Email", value: "mailto:hello@example.com" },
      { label: "Phone", value: "tel:+1234567890" },
      { label: "WiFi", value: "WIFI:T:WPA;S:NetworkName;P:Password;;" },
      {
        label: "vCard",
        value: "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD"
      }
    ];
    const applyPreset = (value) => {
      text.value = value;
      generateQR();
    };
    generateQR();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(QrCode), { class: "w-8 h-8" }, null, _parent));
      _push(` QR Code Generator </h1><p class="text-muted-foreground mt-2"> Generate QR codes for URLs, text, emails, phone numbers, WiFi, and more. </p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
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
                        _push4(`Enter text or URL to encode`);
                      } else {
                        return [
                          createTextVNode("Enter text or URL to encode")
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
                        createTextVNode("Enter text or URL to encode")
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
                  _push3(`<div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Content</label>`);
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: text.value,
                    "onUpdate:modelValue": ($event) => text.value = $event,
                    language: "plaintext",
                    class: "min-h-[128px]",
                    placeholder: "Enter text, URL, or any data..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Quick Presets</label><div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(presets, (preset) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      key: preset.label,
                      variant: "outline",
                      size: "sm",
                      onClick: ($event) => applyPreset(preset.value)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(preset.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(preset.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div></div><div class="grid grid-cols-2 gap-4"${_scopeId2}><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Size</label><input${ssrRenderAttr("value", size.value)} type="range" min="128" max="512" step="32" class="w-full"${_scopeId2}><div class="text-sm text-muted-foreground text-center"${_scopeId2}>${ssrInterpolate(size.value)}x${ssrInterpolate(size.value)}px</div></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Error Correction</label><select class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><option value="L"${ssrIncludeBooleanAttr(Array.isArray(errorCorrectionLevel.value) ? ssrLooseContain(errorCorrectionLevel.value, "L") : ssrLooseEqual(errorCorrectionLevel.value, "L")) ? " selected" : ""}${_scopeId2}>Low (7%)</option><option value="M"${ssrIncludeBooleanAttr(Array.isArray(errorCorrectionLevel.value) ? ssrLooseContain(errorCorrectionLevel.value, "M") : ssrLooseEqual(errorCorrectionLevel.value, "M")) ? " selected" : ""}${_scopeId2}>Medium (15%)</option><option value="Q"${ssrIncludeBooleanAttr(Array.isArray(errorCorrectionLevel.value) ? ssrLooseContain(errorCorrectionLevel.value, "Q") : ssrLooseEqual(errorCorrectionLevel.value, "Q")) ? " selected" : ""}${_scopeId2}>Quartile (25%)</option><option value="H"${ssrIncludeBooleanAttr(Array.isArray(errorCorrectionLevel.value) ? ssrLooseContain(errorCorrectionLevel.value, "H") : ssrLooseEqual(errorCorrectionLevel.value, "H")) ? " selected" : ""}${_scopeId2}>High (30%)</option></select></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Foreground</label><input${ssrRenderAttr("value", foreground.value)} type="color" class="w-full h-10 cursor-pointer"${_scopeId2}></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Background</label><input${ssrRenderAttr("value", background.value)} type="color" class="w-full h-10 cursor-pointer"${_scopeId2}></div></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Content"),
                      createVNode(CodeEditor, {
                        modelValue: text.value,
                        "onUpdate:modelValue": ($event) => text.value = $event,
                        language: "plaintext",
                        class: "min-h-[128px]",
                        placeholder: "Enter text, URL, or any data..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Quick Presets"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(presets, (preset) => {
                          return createVNode(unref(_sfc_main$6), {
                            key: preset.label,
                            variant: "outline",
                            size: "sm",
                            onClick: ($event) => applyPreset(preset.value)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(preset.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 64))
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Size"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => size.value = $event,
                          onInput: generateQR,
                          type: "range",
                          min: "128",
                          max: "512",
                          step: "32",
                          class: "w-full"
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [
                            vModelText,
                            size.value,
                            void 0,
                            { number: true }
                          ]
                        ]),
                        createVNode("div", { class: "text-sm text-muted-foreground text-center" }, toDisplayString(size.value) + "x" + toDisplayString(size.value) + "px", 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Error Correction"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => errorCorrectionLevel.value = $event,
                          onChange: generateQR,
                          class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        }, [
                          createVNode("option", { value: "L" }, "Low (7%)"),
                          createVNode("option", { value: "M" }, "Medium (15%)"),
                          createVNode("option", { value: "Q" }, "Quartile (25%)"),
                          createVNode("option", { value: "H" }, "High (30%)")
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, errorCorrectionLevel.value]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Foreground"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => foreground.value = $event,
                          onInput: generateQR,
                          type: "color",
                          class: "w-full h-10 cursor-pointer"
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, foreground.value]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Background"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => background.value = $event,
                          onInput: generateQR,
                          type: "color",
                          class: "w-full h-10 cursor-pointer"
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, background.value]
                        ])
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
                      createTextVNode("Enter text or URL to encode")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Content"),
                    createVNode(CodeEditor, {
                      modelValue: text.value,
                      "onUpdate:modelValue": ($event) => text.value = $event,
                      language: "plaintext",
                      class: "min-h-[128px]",
                      placeholder: "Enter text, URL, or any data..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Quick Presets"),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(presets, (preset) => {
                        return createVNode(unref(_sfc_main$6), {
                          key: preset.label,
                          variant: "outline",
                          size: "sm",
                          onClick: ($event) => applyPreset(preset.value)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(preset.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 64))
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Size"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => size.value = $event,
                        onInput: generateQR,
                        type: "range",
                        min: "128",
                        max: "512",
                        step: "32",
                        class: "w-full"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          size.value,
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createVNode("div", { class: "text-sm text-muted-foreground text-center" }, toDisplayString(size.value) + "x" + toDisplayString(size.value) + "px", 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Error Correction"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => errorCorrectionLevel.value = $event,
                        onChange: generateQR,
                        class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, [
                        createVNode("option", { value: "L" }, "Low (7%)"),
                        createVNode("option", { value: "M" }, "Medium (15%)"),
                        createVNode("option", { value: "Q" }, "Quartile (25%)"),
                        createVNode("option", { value: "H" }, "High (30%)")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, errorCorrectionLevel.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Foreground"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => foreground.value = $event,
                        onInput: generateQR,
                        type: "color",
                        class: "w-full h-10 cursor-pointer"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, foreground.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Background"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => background.value = $event,
                        onInput: generateQR,
                        type: "color",
                        class: "w-full h-10 cursor-pointer"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, background.value]
                      ])
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
                        _push4(`QR Code`);
                      } else {
                        return [
                          createTextVNode("QR Code")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generated QR code`);
                      } else {
                        return [
                          createTextVNode("Generated QR code")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("QR Code")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Generated QR code")
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
                  if (qrDataUrl.value) {
                    _push3(`<div class="space-y-4"${_scopeId2}><div class="flex justify-center p-8 bg-white rounded-lg"${_scopeId2}><img${ssrRenderAttr("src", qrDataUrl.value)} alt="QR Code" class="max-w-full"${_scopeId2}></div><div class="flex gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: downloadQR,
                      class: "flex-1",
                      "aria-label": "Download QR code"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Download PNG `);
                        } else {
                          return [
                            createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Download PNG ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      onClick: copyToClipboard,
                      variant: "outline",
                      class: "flex-1",
                      "aria-label": "Copy QR code to clipboard"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" }, null), _parent4, _scopeId3);
                          _push4(` ${ssrInterpolate(copied.value ? "Copied!" : "Copy to Clipboard")}`);
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                            createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy to Clipboard"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<div class="text-center py-16 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(QrCode), { class: "w-16 h-16 mx-auto mb-4 opacity-50" }, null, _parent3, _scopeId2));
                    _push3(`<p${_scopeId2}>Enter text above to generate QR code</p></div>`);
                  }
                } else {
                  return [
                    qrDataUrl.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "flex justify-center p-8 bg-white rounded-lg" }, [
                        createVNode("img", {
                          src: qrDataUrl.value,
                          alt: "QR Code",
                          class: "max-w-full"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$6), {
                          onClick: downloadQR,
                          class: "flex-1",
                          "aria-label": "Download QR code"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Download PNG ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          onClick: copyToClipboard,
                          variant: "outline",
                          class: "flex-1",
                          "aria-label": "Copy QR code to clipboard"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                            createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy to Clipboard"), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-16 text-muted-foreground"
                    }, [
                      createVNode(unref(QrCode), { class: "w-16 h-16 mx-auto mb-4 opacity-50" }),
                      createVNode("p", null, "Enter text above to generate QR code")
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
                      createTextVNode("QR Code")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Generated QR code")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  qrDataUrl.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "flex justify-center p-8 bg-white rounded-lg" }, [
                      createVNode("img", {
                        src: qrDataUrl.value,
                        alt: "QR Code",
                        class: "max-w-full"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$6), {
                        onClick: downloadQR,
                        class: "flex-1",
                        "aria-label": "Download QR code"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Download PNG ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        onClick: copyToClipboard,
                        variant: "outline",
                        class: "flex-1",
                        "aria-label": "Copy QR code to clipboard"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                          createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy to Clipboard"), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-16 text-muted-foreground"
                  }, [
                    createVNode(unref(QrCode), { class: "w-16 h-16 mx-auto mb-4 opacity-50" }),
                    createVNode("p", null, "Enter text above to generate QR code")
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/QRCodeGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
