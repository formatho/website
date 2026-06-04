import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { a as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
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
  __name: "BetaView",
  __ssrInlineRender: true,
  setup(__props) {
    const name = ref("");
    const email = ref("");
    const role = ref("");
    const useCase = ref("");
    const isSubmitting = ref(false);
    const isSubmitted = ref(false);
    const handleSubmit = async () => {
      if (!name.value || !email.value) return;
      isSubmitting.value = true;
      try {
        const response = await fetch("http://localhost:18765/api/beta-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            role: role.value,
            use_case: useCase.value
          })
        });
        if (response.ok) {
          isSubmitted.value = true;
        } else {
          const data = await response.json();
          alert(data.error || data.message || "Failed to submit application");
        }
      } catch (error) {
        console.error("Signup failed:", error);
        alert("Failed to submit application. Please try again.");
      } finally {
        isSubmitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white py-20 px-6" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="text-center mb-12"><div class="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"><span class="text-primary text-sm font-medium">🚀 Beta Program</span></div><h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Become a Founding Beta Tester </h1><p class="text-xl text-slate-400 max-w-2xl mx-auto"> Agent Orchestrator is looking for 10 early adopters to test our AI agent platform and shape the future of the product. </p></div><div class="grid md:grid-cols-2 gap-6 mb-12">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-slate-900/50 border-slate-800" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-2xl flex items-center gap-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-3xl"${_scopeId3}>🎁</span> What You&#39;ll Get `);
                      } else {
                        return [
                          createVNode("span", { class: "text-3xl" }, "🎁"),
                          createTextVNode(" What You'll Get ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-2xl flex items-center gap-3" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-3xl" }, "🎁"),
                        createTextVNode(" What You'll Get ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4 text-slate-300" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-start gap-3"${_scopeId2}><span class="text-green-400 text-xl"${_scopeId2}>✅</span><div${_scopeId2}><div class="font-semibold text-white"${_scopeId2}>6 months free Pro tier</div><div class="text-sm text-slate-400"${_scopeId2}>$294 value - unlimited agents, pools, API access</div></div></div><div class="flex items-start gap-3"${_scopeId2}><span class="text-green-400 text-xl"${_scopeId2}>✅</span><div${_scopeId2}><div class="font-semibold text-white"${_scopeId2}>Founder-level support</div><div class="text-sm text-slate-400"${_scopeId2}>Direct access via email, Discord, or phone</div></div></div><div class="flex items-start gap-3"${_scopeId2}><span class="text-green-400 text-xl"${_scopeId2}>✅</span><div${_scopeId2}><div class="font-semibold text-white"${_scopeId2}>Shape the product roadmap</div><div class="text-sm text-slate-400"${_scopeId2}>Your feedback directly influences development</div></div></div><div class="flex items-start gap-3"${_scopeId2}><span class="text-green-400 text-xl"${_scopeId2}>✅</span><div${_scopeId2}><div class="font-semibold text-white"${_scopeId2}>&quot;Founding Beta Tester&quot; status</div><div class="text-sm text-slate-400"${_scopeId2}>Permanent badge + website recognition</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("span", { class: "text-green-400 text-xl" }, "✅"),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold text-white" }, "6 months free Pro tier"),
                        createVNode("div", { class: "text-sm text-slate-400" }, "$294 value - unlimited agents, pools, API access")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("span", { class: "text-green-400 text-xl" }, "✅"),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold text-white" }, "Founder-level support"),
                        createVNode("div", { class: "text-sm text-slate-400" }, "Direct access via email, Discord, or phone")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("span", { class: "text-green-400 text-xl" }, "✅"),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold text-white" }, "Shape the product roadmap"),
                        createVNode("div", { class: "text-sm text-slate-400" }, "Your feedback directly influences development")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("span", { class: "text-green-400 text-xl" }, "✅"),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold text-white" }, '"Founding Beta Tester" status'),
                        createVNode("div", { class: "text-sm text-slate-400" }, "Permanent badge + website recognition")
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
                  createVNode(unref(_sfc_main$3), { class: "text-2xl flex items-center gap-3" }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-3xl" }, "🎁"),
                      createTextVNode(" What You'll Get ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4 text-slate-300" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-start gap-3" }, [
                    createVNode("span", { class: "text-green-400 text-xl" }, "✅"),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold text-white" }, "6 months free Pro tier"),
                      createVNode("div", { class: "text-sm text-slate-400" }, "$294 value - unlimited agents, pools, API access")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-start gap-3" }, [
                    createVNode("span", { class: "text-green-400 text-xl" }, "✅"),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold text-white" }, "Founder-level support"),
                      createVNode("div", { class: "text-sm text-slate-400" }, "Direct access via email, Discord, or phone")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-start gap-3" }, [
                    createVNode("span", { class: "text-green-400 text-xl" }, "✅"),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold text-white" }, "Shape the product roadmap"),
                      createVNode("div", { class: "text-sm text-slate-400" }, "Your feedback directly influences development")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-start gap-3" }, [
                    createVNode("span", { class: "text-green-400 text-xl" }, "✅"),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold text-white" }, '"Founding Beta Tester" status'),
                      createVNode("div", { class: "text-sm text-slate-400" }, "Permanent badge + website recognition")
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
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-slate-900/50 border-slate-800" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-2xl flex items-center gap-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-3xl"${_scopeId3}>🎯</span> What We&#39;re Looking For `);
                      } else {
                        return [
                          createVNode("span", { class: "text-3xl" }, "🎯"),
                          createTextVNode(" What We're Looking For ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-2xl flex items-center gap-3" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-3xl" }, "🎯"),
                        createTextVNode(" What We're Looking For ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4 text-slate-300" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-start gap-3"${_scopeId2}><span class="text-blue-400 text-xl"${_scopeId2}>👨‍💻</span><div${_scopeId2}><div class="font-semibold text-white"${_scopeId2}>Developers using AI tools</div><div class="text-sm text-slate-400"${_scopeId2}>Familiar with ChatGPT, Claude, or similar</div></div></div><div class="flex items-start gap-3"${_scopeId2}><span class="text-blue-400 text-xl"${_scopeId2}>⏱️</span><div${_scopeId2}><div class="font-semibold text-white"${_scopeId2}>1-2 hours/week for 2 weeks</div><div class="text-sm text-slate-400"${_scopeId2}>Test features, provide feedback</div></div></div><div class="flex items-start gap-3"${_scopeId2}><span class="text-blue-400 text-xl"${_scopeId2}>💬</span><div${_scopeId2}><div class="font-semibold text-white"${_scopeId2}>Willing to share honest feedback</div><div class="text-sm text-slate-400"${_scopeId2}>Both positive and constructive</div></div></div><div class="flex items-start gap-3"${_scopeId2}><span class="text-blue-400 text-xl"${_scopeId2}>🚀</span><div${_scopeId2}><div class="font-semibold text-white"${_scopeId2}>Early adopter mindset</div><div class="text-sm text-slate-400"${_scopeId2}>Excited about cutting-edge tools</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("span", { class: "text-blue-400 text-xl" }, "👨‍💻"),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold text-white" }, "Developers using AI tools"),
                        createVNode("div", { class: "text-sm text-slate-400" }, "Familiar with ChatGPT, Claude, or similar")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("span", { class: "text-blue-400 text-xl" }, "⏱️"),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold text-white" }, "1-2 hours/week for 2 weeks"),
                        createVNode("div", { class: "text-sm text-slate-400" }, "Test features, provide feedback")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("span", { class: "text-blue-400 text-xl" }, "💬"),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold text-white" }, "Willing to share honest feedback"),
                        createVNode("div", { class: "text-sm text-slate-400" }, "Both positive and constructive")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("span", { class: "text-blue-400 text-xl" }, "🚀"),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold text-white" }, "Early adopter mindset"),
                        createVNode("div", { class: "text-sm text-slate-400" }, "Excited about cutting-edge tools")
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
                  createVNode(unref(_sfc_main$3), { class: "text-2xl flex items-center gap-3" }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-3xl" }, "🎯"),
                      createTextVNode(" What We're Looking For ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4 text-slate-300" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-start gap-3" }, [
                    createVNode("span", { class: "text-blue-400 text-xl" }, "👨‍💻"),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold text-white" }, "Developers using AI tools"),
                      createVNode("div", { class: "text-sm text-slate-400" }, "Familiar with ChatGPT, Claude, or similar")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-start gap-3" }, [
                    createVNode("span", { class: "text-blue-400 text-xl" }, "⏱️"),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold text-white" }, "1-2 hours/week for 2 weeks"),
                      createVNode("div", { class: "text-sm text-slate-400" }, "Test features, provide feedback")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-start gap-3" }, [
                    createVNode("span", { class: "text-blue-400 text-xl" }, "💬"),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold text-white" }, "Willing to share honest feedback"),
                      createVNode("div", { class: "text-sm text-slate-400" }, "Both positive and constructive")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-start gap-3" }, [
                    createVNode("span", { class: "text-blue-400 text-xl" }, "🚀"),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold text-white" }, "Early adopter mindset"),
                      createVNode("div", { class: "text-sm text-slate-400" }, "Excited about cutting-edge tools")
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
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-slate-900/50 border-slate-800 max-w-2xl mx-auto" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-3xl text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Apply Now`);
                      } else {
                        return [
                          createTextVNode("Apply Now")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-center text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Only 10 spots available - Applications close soon `);
                      } else {
                        return [
                          createTextVNode(" Only 10 spots available - Applications close soon ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-3xl text-center" }, {
                      default: withCtx(() => [
                        createTextVNode("Apply Now")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), { class: "text-center text-lg" }, {
                      default: withCtx(() => [
                        createTextVNode(" Only 10 spots available - Applications close soon ")
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
                  if (isSubmitted.value) {
                    _push3(`<div class="text-center py-8"${_scopeId2}><div class="text-6xl mb-4"${_scopeId2}>🎉</div><h3 class="text-2xl font-bold mb-2"${_scopeId2}>Application Received!</h3><p class="text-slate-400"${_scopeId2}> We&#39;ll review your application and get back to you within 24 hours. Check your email for confirmation. </p></div>`);
                  } else {
                    _push3(`<form class="space-y-6"${_scopeId2}><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Name *</label>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      modelValue: name.value,
                      "onUpdate:modelValue": ($event) => name.value = $event,
                      placeholder: "Your name",
                      required: "",
                      "aria-label": "Your name",
                      class: "bg-slate-800 border-slate-700"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Email *</label>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      modelValue: email.value,
                      "onUpdate:modelValue": ($event) => email.value = $event,
                      type: "email",
                      placeholder: "you@example.com",
                      required: "",
                      "aria-label": "Your email",
                      class: "bg-slate-800 border-slate-700"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Role</label>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      modelValue: role.value,
                      "onUpdate:modelValue": ($event) => role.value = $event,
                      placeholder: "e.g., Full-stack developer, DevOps engineer, Founder",
                      "aria-label": "Your role",
                      class: "bg-slate-800 border-slate-700"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>What would you use Agent Orchestrator for? (optional)</label><textarea aria-label="Use case description" placeholder="e.g., Automating code reviews, content generation, data processing..." class="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"${_scopeId2}>${ssrInterpolate(useCase.value)}</textarea></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      "aria-label": "Explore Formatho beta",
                      type: "submit",
                      loading: isSubmitting.value,
                      size: "lg",
                      class: "w-full font-semibold py-6 text-lg"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Apply for Beta Access `);
                        } else {
                          return [
                            createTextVNode(" Apply for Beta Access ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<p class="text-center text-sm text-slate-500"${_scopeId2}> By applying, you agree to provide feedback during the beta period. </p></form>`);
                  }
                } else {
                  return [
                    isSubmitted.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-8"
                    }, [
                      createVNode("div", { class: "text-6xl mb-4" }, "🎉"),
                      createVNode("h3", { class: "text-2xl font-bold mb-2" }, "Application Received!"),
                      createVNode("p", { class: "text-slate-400" }, " We'll review your application and get back to you within 24 hours. Check your email for confirmation. ")
                    ])) : (openBlock(), createBlock("form", {
                      key: 1,
                      onSubmit: withModifiers(handleSubmit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Name *"),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: name.value,
                          "onUpdate:modelValue": ($event) => name.value = $event,
                          placeholder: "Your name",
                          required: "",
                          "aria-label": "Your name",
                          class: "bg-slate-800 border-slate-700"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Email *"),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: email.value,
                          "onUpdate:modelValue": ($event) => email.value = $event,
                          type: "email",
                          placeholder: "you@example.com",
                          required: "",
                          "aria-label": "Your email",
                          class: "bg-slate-800 border-slate-700"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Role"),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: role.value,
                          "onUpdate:modelValue": ($event) => role.value = $event,
                          placeholder: "e.g., Full-stack developer, DevOps engineer, Founder",
                          "aria-label": "Your role",
                          class: "bg-slate-800 border-slate-700"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "What would you use Agent Orchestrator for? (optional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => useCase.value = $event,
                          "aria-label": "Use case description",
                          placeholder: "e.g., Automating code reviews, content generation, data processing...",
                          class: "w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, useCase.value]
                        ])
                      ]),
                      createVNode(unref(_sfc_main$7), {
                        "aria-label": "Explore Formatho beta",
                        type: "submit",
                        loading: isSubmitting.value,
                        size: "lg",
                        class: "w-full font-semibold py-6 text-lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Apply for Beta Access ")
                        ]),
                        _: 1
                      }, 8, ["loading"]),
                      createVNode("p", { class: "text-center text-sm text-slate-500" }, " By applying, you agree to provide feedback during the beta period. ")
                    ], 32))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-3xl text-center" }, {
                    default: withCtx(() => [
                      createTextVNode("Apply Now")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$5), { class: "text-center text-lg" }, {
                    default: withCtx(() => [
                      createTextVNode(" Only 10 spots available - Applications close soon ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  isSubmitted.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-8"
                  }, [
                    createVNode("div", { class: "text-6xl mb-4" }, "🎉"),
                    createVNode("h3", { class: "text-2xl font-bold mb-2" }, "Application Received!"),
                    createVNode("p", { class: "text-slate-400" }, " We'll review your application and get back to you within 24 hours. Check your email for confirmation. ")
                  ])) : (openBlock(), createBlock("form", {
                    key: 1,
                    onSubmit: withModifiers(handleSubmit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Name *"),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: name.value,
                        "onUpdate:modelValue": ($event) => name.value = $event,
                        placeholder: "Your name",
                        required: "",
                        "aria-label": "Your name",
                        class: "bg-slate-800 border-slate-700"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Email *"),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: email.value,
                        "onUpdate:modelValue": ($event) => email.value = $event,
                        type: "email",
                        placeholder: "you@example.com",
                        required: "",
                        "aria-label": "Your email",
                        class: "bg-slate-800 border-slate-700"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Role"),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: role.value,
                        "onUpdate:modelValue": ($event) => role.value = $event,
                        placeholder: "e.g., Full-stack developer, DevOps engineer, Founder",
                        "aria-label": "Your role",
                        class: "bg-slate-800 border-slate-700"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "What would you use Agent Orchestrator for? (optional)"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => useCase.value = $event,
                        "aria-label": "Use case description",
                        placeholder: "e.g., Automating code reviews, content generation, data processing...",
                        class: "w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, useCase.value]
                      ])
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      "aria-label": "Explore Formatho beta",
                      type: "submit",
                      loading: isSubmitting.value,
                      size: "lg",
                      class: "w-full font-semibold py-6 text-lg"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Apply for Beta Access ")
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode("p", { class: "text-center text-sm text-slate-500" }, " By applying, you agree to provide feedback during the beta period. ")
                  ], 32))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-20"><h2 class="text-3xl font-bold text-center mb-10">What You&#39;ll Be Testing</h2><div class="grid md:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-slate-900/50 border-slate-800" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`🤖 Multiple AI Models`);
                      } else {
                        return [
                          createTextVNode("🤖 Multiple AI Models")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                      default: withCtx(() => [
                        createTextVNode("🤖 Multiple AI Models")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "text-slate-400" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Connect to OpenAI, Anthropic Claude, or run local models with Ollama. Switch between providers seamlessly. `);
                } else {
                  return [
                    createTextVNode(" Connect to OpenAI, Anthropic Claude, or run local models with Ollama. Switch between providers seamlessly. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx(() => [
                      createTextVNode("🤖 Multiple AI Models")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "text-slate-400" }, {
                default: withCtx(() => [
                  createTextVNode(" Connect to OpenAI, Anthropic Claude, or run local models with Ollama. Switch between providers seamlessly. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-slate-900/50 border-slate-800" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`🔄 Agent Pools`);
                      } else {
                        return [
                          createTextVNode("🔄 Agent Pools")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                      default: withCtx(() => [
                        createTextVNode("🔄 Agent Pools")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "text-slate-400" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Run 10+ agents in parallel for maximum productivity. Distribute tasks across specialized AI workers. `);
                } else {
                  return [
                    createTextVNode(" Run 10+ agents in parallel for maximum productivity. Distribute tasks across specialized AI workers. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx(() => [
                      createTextVNode("🔄 Agent Pools")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "text-slate-400" }, {
                default: withCtx(() => [
                  createTextVNode(" Run 10+ agents in parallel for maximum productivity. Distribute tasks across specialized AI workers. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "bg-slate-900/50 border-slate-800" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`🔒 Privacy-First`);
                      } else {
                        return [
                          createTextVNode("🔒 Privacy-First")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                      default: withCtx(() => [
                        createTextVNode("🔒 Privacy-First")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "text-slate-400" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` All data stays on your machine. No cloud dependency. Complete control over your AI agents. `);
                } else {
                  return [
                    createTextVNode(" All data stays on your machine. No cloud dependency. Complete control over your AI agents. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx(() => [
                      createTextVNode("🔒 Privacy-First")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "text-slate-400" }, {
                default: withCtx(() => [
                  createTextVNode(" All data stays on your machine. No cloud dependency. Complete control over your AI agents. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="mt-20 max-w-3xl mx-auto"><h2 class="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2><div class="space-y-6"><div><h3 class="text-xl font-semibold mb-2">When will I hear back?</h3><p class="text-slate-400">Within 24 hours of applying. We&#39;re reviewing applications daily.</p></div><div><h3 class="text-xl font-semibold mb-2">What happens after I&#39;m accepted?</h3><p class="text-slate-400">You&#39;ll receive login credentials, download links, and a quick-start guide. We&#39;ll also schedule an optional onboarding call.</p></div><div><h3 class="text-xl font-semibold mb-2">Is there a deadline?</h3><p class="text-slate-400">We&#39;re accepting applications until we fill all 10 spots. Apply early to secure your place.</p></div><div><h3 class="text-xl font-semibold mb-2">What if I&#39;m not selected?</h3><p class="text-slate-400">You&#39;ll be added to our waitlist and notified when we open more beta spots or launch publicly.</p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BetaView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
