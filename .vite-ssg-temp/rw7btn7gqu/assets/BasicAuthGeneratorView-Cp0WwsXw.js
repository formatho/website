import { defineComponent, ref, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$5 } from "../main.mjs";
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
  __name: "BasicAuthGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const header = ref("");
    const generate = () => {
      const credentials = btoa(`${username.value}:${password.value}`);
      header.value = `Authorization: Basic ${credentials}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = resolveComponent("Label");
      const _component_Input = resolveComponent("Input");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">HTTP Basic Auth Generator</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate Basic Auth Header`);
                      } else {
                        return [
                          createTextVNode("Generate Basic Auth Header")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate Basic Auth Header")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Label, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Username`);
                      } else {
                        return [
                          createTextVNode("Username")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, {
                    modelValue: username.value,
                    "onUpdate:modelValue": ($event) => username.value = $event,
                    "aria-label": "Username",
                    placeholder: "Enter username..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Label, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, {
                    modelValue: password.value,
                    "onUpdate:modelValue": ($event) => password.value = $event,
                    type: "password",
                    "aria-label": "Password",
                    placeholder: "Enter password..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: generate,
                    class: "w-full md:w-auto",
                    "aria-label": "Generate Basic Auth credentials"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate`);
                      } else {
                        return [
                          createTextVNode("Generate")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (header.value) {
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Label, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Authorization Header`);
                        } else {
                          return [
                            createTextVNode("Authorization Header")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="p-4 rounded-lg bg-muted font-mono text-sm break-all"${_scopeId2}>${ssrInterpolate(header.value)}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(_component_Label, null, {
                          default: withCtx(() => [
                            createTextVNode("Username")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          modelValue: username.value,
                          "onUpdate:modelValue": ($event) => username.value = $event,
                          "aria-label": "Username",
                          placeholder: "Enter username..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(_component_Label, null, {
                          default: withCtx(() => [
                            createTextVNode("Password")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          modelValue: password.value,
                          "onUpdate:modelValue": ($event) => password.value = $event,
                          type: "password",
                          "aria-label": "Password",
                          placeholder: "Enter password..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$5), {
                      onClick: generate,
                      class: "w-full md:w-auto",
                      "aria-label": "Generate Basic Auth credentials"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate")
                      ]),
                      _: 1
                    }),
                    header.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode(_component_Label, null, {
                        default: withCtx(() => [
                          createTextVNode("Authorization Header")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, toDisplayString(header.value), 1)
                    ])) : createCommentVNode("", true)
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
                      createTextVNode("Generate Basic Auth Header")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(_component_Label, null, {
                        default: withCtx(() => [
                          createTextVNode("Username")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, {
                        modelValue: username.value,
                        "onUpdate:modelValue": ($event) => username.value = $event,
                        "aria-label": "Username",
                        placeholder: "Enter username..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(_component_Label, null, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, {
                        modelValue: password.value,
                        "onUpdate:modelValue": ($event) => password.value = $event,
                        type: "password",
                        "aria-label": "Password",
                        placeholder: "Enter password..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$5), {
                    onClick: generate,
                    class: "w-full md:w-auto",
                    "aria-label": "Generate Basic Auth credentials"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Generate")
                    ]),
                    _: 1
                  }),
                  header.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-2"
                  }, [
                    createVNode(_component_Label, null, {
                      default: withCtx(() => [
                        createTextVNode("Authorization Header")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, toDisplayString(header.value), 1)
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BasicAuthGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
