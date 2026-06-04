import { defineComponent, ref, watch, computed, onMounted, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$1, h as _sfc_main$6 } from "../main.mjs";
import { Copy, ZoomOut, ZoomIn, RotateCcw, Download, Maximize2 } from "lucide-vue-next";
import mermaid from "mermaid";
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
const defaultDiagram = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[Result]
    D --> E
    E --> F[End]`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MermaidViewer",
  __ssrInlineRender: true,
  setup(__props) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "inherit"
    });
    const mermaidId = ref(0);
    const codeInput = ref(defaultDiagram);
    const renderedSvg = ref("");
    const error = ref("");
    const zoomLevel = ref(100);
    const isFullscreen = ref(false);
    const themes = ["default", "dark", "forest", "neutral", "base"];
    const currentTheme = ref("default");
    const sampleDiagrams = [
      {
        name: "Flowchart",
        code: `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[Result]
    D --> E
    E --> F[End]`
      },
      {
        name: "Sequence",
        code: `sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant DB
    User->>Frontend: Click button
    Frontend->>API: POST /api/data
    API->>DB: INSERT query
    DB-->>API: Success
    API-->>Frontend: 201 Created
    Frontend-->>User: Show success`
      },
      {
        name: "Class Diagram",
        code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +fetch()
    }
    class Cat {
        +String color
        +purr()
    }
    Animal <|-- Dog
    Animal <|-- Cat`
      },
      {
        name: "Gantt Chart",
        code: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Research       :a1, 2024-01-01, 30d
    Design         :after a1, 20d
    section Development
    Frontend       :2024-02-20, 45d
    Backend        :2024-02-20, 40d
    section Testing
    QA Testing     :2024-04-15, 20d`
      },
      {
        name: "Pie Chart",
        code: `pie title Technology Stack
    "JavaScript" : 40
    "TypeScript" : 25
    "Python" : 20
    "Rust" : 15`
      },
      {
        name: "State Diagram",
        code: `stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : Submit
    Processing --> Success : OK
    Processing --> Error : Fail
    Success --> Idle : Reset
    Error --> Idle : Retry`
      },
      {
        name: "ER Diagram",
        code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string name
        string email
    }
    ORDER ||--|{ LINE_ITEM : contains
    ORDER {
        int id
        date created
    }
    LINE_ITEM {
        string product
        int quantity
        float price
    }`
      },
      {
        name: "Git Graph",
        code: `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit`
      }
    ];
    const renderDiagram = async () => {
      error.value = "";
      if (!codeInput.value.trim()) {
        renderedSvg.value = "";
        return;
      }
      try {
        const id = `mermaid-${++mermaidId.value}`;
        const { svg } = await mermaid.render(id, codeInput.value);
        renderedSvg.value = svg;
      } catch (e) {
        const errEl = document.getElementById(`dmermaid-${mermaidId.value}`);
        if (errEl) errEl.remove();
        error.value = e?.message || "Invalid Mermaid syntax. Check your diagram code.";
        renderedSvg.value = "";
      }
    };
    let renderTimeout;
    const debouncedRender = () => {
      clearTimeout(renderTimeout);
      renderTimeout = setTimeout(renderDiagram, 500);
    };
    watch(codeInput, debouncedRender);
    watch(currentTheme, () => {
      mermaid.initialize({
        startOnLoad: false,
        theme: currentTheme.value,
        securityLevel: "loose",
        fontFamily: "inherit"
      });
      renderDiagram();
    });
    const zoomIn = () => {
      if (zoomLevel.value < 300) zoomLevel.value += 25;
    };
    const zoomOut = () => {
      if (zoomLevel.value > 25) zoomLevel.value -= 25;
    };
    const resetZoom = () => {
      zoomLevel.value = 100;
    };
    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value;
    };
    const previewStyle = computed(() => ({
      transform: `scale(${zoomLevel.value / 100})`,
      transformOrigin: "top center"
    }));
    const downloadSvg = () => {
      const blob = new Blob([renderedSvg.value], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "diagram.svg";
      a.click();
      URL.revokeObjectURL(url);
    };
    const downloadPng = async () => {
      if (!renderedSvg.value) return;
      const svgBlob = new Blob([renderedSvg.value], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = 2;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) return;
          const pngUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = pngUrl;
          a.download = "diagram.png";
          a.click();
          URL.revokeObjectURL(pngUrl);
        }, "image/png");
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };
    const loadSample = (code) => {
      codeInput.value = code;
    };
    onMounted(() => {
      renderDiagram();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="h-full flex flex-col p-4 gap-4 bg-muted/30"><div class="flex items-center justify-between flex-wrap gap-2"><h1 class="text-3xl font-bold tracking-tight">Mermaid Diagram Viewer</h1><div class="flex items-center gap-2 flex-wrap"><select class="h-9 rounded-md border border-input bg-background px-3 text-sm"><!--[-->`);
      ssrRenderList(themes, (t) => {
        _push(`<option${ssrRenderAttr("value", t)}${ssrIncludeBooleanAttr(Array.isArray(currentTheme.value) ? ssrLooseContain(currentTheme.value, t) : ssrLooseEqual(currentTheme.value, t)) ? " selected" : ""}>${ssrInterpolate(t.charAt(0).toUpperCase() + t.slice(1))} theme </option>`);
      });
      _push(`<!--]--></select></div></div><div class="flex gap-2 flex-wrap"><!--[-->`);
      ssrRenderList(sampleDiagrams, (sample) => {
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          key: sample.name,
          size: "sm",
          variant: "outline",
          onClick: ($event) => loadSample(sample.code),
          class: "text-xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(sample.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(sample.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Mermaid Code `);
                      } else {
                        return [
                          createTextVNode(" Mermaid Code ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "icon",
                    variant: "outline",
                    onClick: async () => {
                      await _ctx.navigator.clipboard.writeText(codeInput.value);
                    },
                    class: "h-8 w-8"
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
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" Mermaid Code ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), {
                      size: "icon",
                      variant: "outline",
                      onClick: async () => {
                        await _ctx.navigator.clipboard.writeText(codeInput.value);
                      },
                      class: "h-8 w-8"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Copy), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: codeInput.value,
                    "onUpdate:modelValue": ($event) => codeInput.value = $event,
                    class: "h-full resize-none font-mono text-sm",
                    placeholder: "Enter Mermaid diagram code...",
                    spellcheck: "false"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), {
                      modelValue: codeInput.value,
                      "onUpdate:modelValue": ($event) => codeInput.value = $event,
                      class: "h-full resize-none font-mono text-sm",
                      placeholder: "Enter Mermaid diagram code...",
                      spellcheck: "false"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createTextVNode(" Mermaid Code ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$1), {
                    size: "icon",
                    variant: "outline",
                    onClick: async () => {
                      await _ctx.navigator.clipboard.writeText(codeInput.value);
                    },
                    class: "h-8 w-8"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Copy), { class: "h-4 w-4" })
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), {
                    modelValue: codeInput.value,
                    "onUpdate:modelValue": ($event) => codeInput.value = $event,
                    class: "h-full resize-none font-mono text-sm",
                    placeholder: "Enter Mermaid diagram code...",
                    spellcheck: "false"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        class: ["flex flex-col min-h-0", { "fixed inset-0 z-50 rounded-none": isFullscreen.value }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
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
                  _push3(`<div class="flex items-center gap-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "icon",
                    variant: "ghost",
                    onClick: zoomOut,
                    class: "h-8 w-8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ZoomOut), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ZoomOut), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span class="text-xs text-muted-foreground w-12 text-center"${_scopeId2}>${ssrInterpolate(zoomLevel.value)}%</span>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "icon",
                    variant: "ghost",
                    onClick: zoomIn,
                    class: "h-8 w-8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ZoomIn), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ZoomIn), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "icon",
                    variant: "ghost",
                    onClick: resetZoom,
                    class: "h-8 w-8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RotateCcw), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(RotateCcw), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="w-px h-5 bg-border mx-1"${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "icon",
                    variant: "ghost",
                    onClick: downloadSvg,
                    disabled: !renderedSvg.value,
                    class: "h-8 w-8",
                    title: "Download SVG"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Download), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "icon",
                    variant: "ghost",
                    onClick: downloadPng,
                    disabled: !renderedSvg.value,
                    class: "h-8 w-8",
                    title: "Download PNG"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Download), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "icon",
                    variant: "ghost",
                    onClick: toggleFullscreen,
                    class: "h-8 w-8",
                    title: isFullscreen.value ? "Exit fullscreen" : "Fullscreen"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Maximize2), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Maximize2), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Preview")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex items-center gap-1" }, [
                      createVNode(unref(_sfc_main$1), {
                        size: "icon",
                        variant: "ghost",
                        onClick: zoomOut,
                        class: "h-8 w-8"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ZoomOut), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }),
                      createVNode("span", { class: "text-xs text-muted-foreground w-12 text-center" }, toDisplayString(zoomLevel.value) + "%", 1),
                      createVNode(unref(_sfc_main$1), {
                        size: "icon",
                        variant: "ghost",
                        onClick: zoomIn,
                        class: "h-8 w-8"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ZoomIn), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$1), {
                        size: "icon",
                        variant: "ghost",
                        onClick: resetZoom,
                        class: "h-8 w-8"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(RotateCcw), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "w-px h-5 bg-border mx-1" }),
                      createVNode(unref(_sfc_main$1), {
                        size: "icon",
                        variant: "ghost",
                        onClick: downloadSvg,
                        disabled: !renderedSvg.value,
                        class: "h-8 w-8",
                        title: "Download SVG"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Download), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(unref(_sfc_main$1), {
                        size: "icon",
                        variant: "ghost",
                        onClick: downloadPng,
                        disabled: !renderedSvg.value,
                        class: "h-8 w-8",
                        title: "Download PNG"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Download), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(unref(_sfc_main$1), {
                        size: "icon",
                        variant: "ghost",
                        onClick: toggleFullscreen,
                        class: "h-8 w-8",
                        title: isFullscreen.value ? "Exit fullscreen" : "Fullscreen"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Maximize2), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["title"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0 overflow-auto bg-white dark:bg-zinc-900 rounded-lg flex items-start justify-center p-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (renderedSvg.value) {
                    _push3(`<div class="transition-transform duration-200" style="${ssrRenderStyle(previewStyle.value)}"${_scopeId2}>${renderedSvg.value ?? ""}</div>`);
                  } else if (!error.value) {
                    _push3(`<div class="text-muted-foreground text-sm flex items-center justify-center h-full"${_scopeId2}> Diagram preview will appear here... </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    renderedSvg.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      innerHTML: renderedSvg.value,
                      class: "transition-transform duration-200",
                      style: previewStyle.value
                    }, null, 12, ["innerHTML"])) : !error.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-muted-foreground text-sm flex items-center justify-center h-full"
                    }, " Diagram preview will appear here... ")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Preview")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex items-center gap-1" }, [
                    createVNode(unref(_sfc_main$1), {
                      size: "icon",
                      variant: "ghost",
                      onClick: zoomOut,
                      class: "h-8 w-8"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ZoomOut), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }),
                    createVNode("span", { class: "text-xs text-muted-foreground w-12 text-center" }, toDisplayString(zoomLevel.value) + "%", 1),
                    createVNode(unref(_sfc_main$1), {
                      size: "icon",
                      variant: "ghost",
                      onClick: zoomIn,
                      class: "h-8 w-8"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ZoomIn), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), {
                      size: "icon",
                      variant: "ghost",
                      onClick: resetZoom,
                      class: "h-8 w-8"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RotateCcw), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "w-px h-5 bg-border mx-1" }),
                    createVNode(unref(_sfc_main$1), {
                      size: "icon",
                      variant: "ghost",
                      onClick: downloadSvg,
                      disabled: !renderedSvg.value,
                      class: "h-8 w-8",
                      title: "Download SVG"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Download), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(_sfc_main$1), {
                      size: "icon",
                      variant: "ghost",
                      onClick: downloadPng,
                      disabled: !renderedSvg.value,
                      class: "h-8 w-8",
                      title: "Download PNG"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Download), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(_sfc_main$1), {
                      size: "icon",
                      variant: "ghost",
                      onClick: toggleFullscreen,
                      class: "h-8 w-8",
                      title: isFullscreen.value ? "Exit fullscreen" : "Fullscreen"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Maximize2), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["title"])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0 overflow-auto bg-white dark:bg-zinc-900 rounded-lg flex items-start justify-center p-4" }, {
                default: withCtx(() => [
                  renderedSvg.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    innerHTML: renderedSvg.value,
                    class: "transition-transform duration-200",
                    style: previewStyle.value
                  }, null, 12, ["innerHTML"])) : !error.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-muted-foreground text-sm flex items-center justify-center h-full"
                  }, " Diagram preview will appear here... ")) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (error.value) {
        _push(`<div class="p-3 text-sm text-destructive bg-destructive/10 rounded-md">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (isFullscreen.value) {
        _push(`<div class="fixed inset-0 z-40 bg-black/20 -inset-4" style="${ssrRenderStyle({ "pointer-events": "none" })}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/tools/MermaidViewer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
