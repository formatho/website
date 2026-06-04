import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, resolveDynamicComponent, createBlock, toDisplayString, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { Globe, Search, Check, Copy } from "lucide-vue-next";
import { _ as _sfc_main$1, d as _sfc_main$2 } from "./CardFooter-DjcCkgh0.js";
import "../main.mjs";
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
  __name: "HTTPStatusCodesView",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const copied = ref(null);
    const statusCodes = [
      // 1xx Informational
      {
        code: 100,
        name: "Continue",
        description: "Server received request headers and client should proceed",
        category: "Informational"
      },
      {
        code: 101,
        name: "Switching Protocols",
        description: "Server is switching protocols as requested by client",
        category: "Informational"
      },
      {
        code: 102,
        name: "Processing",
        description: "Server has received and is processing the request",
        category: "Informational"
      },
      {
        code: 103,
        name: "Early Hints",
        description: "Server is likely to send a final response with header fields",
        category: "Informational"
      },
      // 2xx Success
      { code: 200, name: "OK", description: "Request succeeded", category: "Success" },
      { code: 201, name: "Created", description: "Resource successfully created", category: "Success" },
      {
        code: 202,
        name: "Accepted",
        description: "Request accepted for processing",
        category: "Success"
      },
      {
        code: 203,
        name: "Non-Authoritative Information",
        description: "Request processed, information may be from third party",
        category: "Success"
      },
      {
        code: 204,
        name: "No Content",
        description: "Request succeeded, no content returned",
        category: "Success"
      },
      {
        code: 205,
        name: "Reset Content",
        description: "Client should reset the document view",
        category: "Success"
      },
      {
        code: 206,
        name: "Partial Content",
        description: "Partial GET request succeeded",
        category: "Success"
      },
      {
        code: 207,
        name: "Multi-Status",
        description: "Multiple status codes for multiple operations",
        category: "Success"
      },
      {
        code: 208,
        name: "Already Reported",
        description: "Members already reported",
        category: "Success"
      },
      { code: 226, name: "IM Used", description: "Instance manipulation used", category: "Success" },
      // 3xx Redirection
      {
        code: 300,
        name: "Multiple Choices",
        description: "Multiple options for resource",
        category: "Redirection"
      },
      {
        code: 301,
        name: "Moved Permanently",
        description: "Resource moved to new URL permanently",
        category: "Redirection"
      },
      {
        code: 302,
        name: "Found",
        description: "Resource temporarily at different URL",
        category: "Redirection"
      },
      {
        code: 303,
        name: "See Other",
        description: "Response available at different URL via GET",
        category: "Redirection"
      },
      {
        code: 304,
        name: "Not Modified",
        description: "Resource not modified since last request",
        category: "Redirection"
      },
      {
        code: 305,
        name: "Use Proxy",
        description: "Access via proxy required",
        category: "Redirection"
      },
      {
        code: 307,
        name: "Temporary Redirect",
        description: "Temporary redirect keeping method",
        category: "Redirection"
      },
      {
        code: 308,
        name: "Permanent Redirect",
        description: "Permanent redirect keeping method",
        category: "Redirection"
      },
      // 4xx Client Error
      {
        code: 400,
        name: "Bad Request",
        description: "Server could not understand request",
        category: "Client Error"
      },
      {
        code: 401,
        name: "Unauthorized",
        description: "Authentication required",
        category: "Client Error"
      },
      {
        code: 402,
        name: "Payment Required",
        description: "Payment required to proceed",
        category: "Client Error"
      },
      { code: 403, name: "Forbidden", description: "Access forbidden", category: "Client Error" },
      { code: 404, name: "Not Found", description: "Resource not found", category: "Client Error" },
      {
        code: 405,
        name: "Method Not Allowed",
        description: "HTTP method not allowed",
        category: "Client Error"
      },
      {
        code: 406,
        name: "Not Acceptable",
        description: "Content not acceptable per headers",
        category: "Client Error"
      },
      {
        code: 407,
        name: "Proxy Authentication Required",
        description: "Proxy authentication required",
        category: "Client Error"
      },
      {
        code: 408,
        name: "Request Timeout",
        description: "Server timeout waiting for request",
        category: "Client Error"
      },
      {
        code: 409,
        name: "Conflict",
        description: "Request conflicts with current state",
        category: "Client Error"
      },
      {
        code: 410,
        name: "Gone",
        description: "Resource no longer available",
        category: "Client Error"
      },
      {
        code: 411,
        name: "Length Required",
        description: "Content-Length header required",
        category: "Client Error"
      },
      {
        code: 412,
        name: "Precondition Failed",
        description: "Precondition in headers failed",
        category: "Client Error"
      },
      {
        code: 413,
        name: "Payload Too Large",
        description: "Request payload too large",
        category: "Client Error"
      },
      {
        code: 414,
        name: "URI Too Long",
        description: "URI too long to process",
        category: "Client Error"
      },
      {
        code: 415,
        name: "Unsupported Media Type",
        description: "Media type not supported",
        category: "Client Error"
      },
      {
        code: 416,
        name: "Range Not Satisfiable",
        description: "Requested range not satisfiable",
        category: "Client Error"
      },
      {
        code: 417,
        name: "Expectation Failed",
        description: "Expect header could not be met",
        category: "Client Error"
      },
      {
        code: 418,
        name: "I'm a teapot",
        description: "Server is a teapot (April Fools joke)",
        category: "Client Error"
      },
      {
        code: 421,
        name: "Misdirected Request",
        description: "Request directed to wrong server",
        category: "Client Error"
      },
      {
        code: 422,
        name: "Unprocessable Entity",
        description: "Request well-formed but semantically incorrect",
        category: "Client Error"
      },
      { code: 423, name: "Locked", description: "Resource is locked", category: "Client Error" },
      {
        code: 424,
        name: "Failed Dependency",
        description: "Request failed due to dependency",
        category: "Client Error"
      },
      {
        code: 425,
        name: "Too Early",
        description: "Server unwilling to process",
        category: "Client Error"
      },
      {
        code: 426,
        name: "Upgrade Required",
        description: "Protocol upgrade required",
        category: "Client Error"
      },
      {
        code: 428,
        name: "Precondition Required",
        description: "Server requires precondition",
        category: "Client Error"
      },
      {
        code: 429,
        name: "Too Many Requests",
        description: "Rate limit exceeded",
        category: "Client Error"
      },
      {
        code: 431,
        name: "Request Header Fields Too Large",
        description: "Headers too large",
        category: "Client Error"
      },
      {
        code: 451,
        name: "Unavailable For Legal Reasons",
        description: "Resource unavailable for legal reasons",
        category: "Client Error"
      },
      // 5xx Server Error
      {
        code: 500,
        name: "Internal Server Error",
        description: "Generic server error",
        category: "Server Error"
      },
      {
        code: 501,
        name: "Not Implemented",
        description: "Server does not support functionality",
        category: "Server Error"
      },
      {
        code: 502,
        name: "Bad Gateway",
        description: "Invalid response from upstream server",
        category: "Server Error"
      },
      {
        code: 503,
        name: "Service Unavailable",
        description: "Server temporarily unavailable",
        category: "Server Error"
      },
      {
        code: 504,
        name: "Gateway Timeout",
        description: "Upstream server timeout",
        category: "Server Error"
      },
      {
        code: 505,
        name: "HTTP Version Not Supported",
        description: "HTTP version not supported",
        category: "Server Error"
      },
      {
        code: 506,
        name: "Variant Also Negotiates",
        description: "Content negotiation error",
        category: "Server Error"
      },
      {
        code: 507,
        name: "Insufficient Storage",
        description: "Server cannot store representation",
        category: "Server Error"
      },
      {
        code: 508,
        name: "Loop Detected",
        description: "Infinite loop detected",
        category: "Server Error"
      },
      { code: 510, name: "Not Extended", description: "Extension required", category: "Server Error" },
      {
        code: 511,
        name: "Network Authentication Required",
        description: "Network authentication required",
        category: "Server Error"
      }
    ];
    const filteredCodes = computed(() => {
      if (!searchQuery.value) return statusCodes;
      const query = searchQuery.value.toLowerCase();
      return statusCodes.filter(
        (code) => code.code.toString().includes(query) || code.name.toLowerCase().includes(query) || code.description.toLowerCase().includes(query)
      );
    });
    const groupedCodes = computed(() => {
      const groups = {};
      for (const code of filteredCodes.value) {
        if (!groups[code.category]) {
          groups[code.category] = [];
        }
        const group = groups[code.category];
        if (group) {
          group.push(code);
        }
      }
      return groups;
    });
    const getCategoryColor = (category) => {
      const colors = {
        Informational: "bg-blue-500",
        Success: "bg-green-500",
        Redirection: "bg-yellow-500",
        "Client Error": "bg-orange-500",
        "Server Error": "bg-red-500"
      };
      return colors[category] || "bg-gray-500";
    };
    const getCategoryBg = (category) => {
      const colors = {
        Informational: "border-blue-500 bg-blue-500/10",
        Success: "border-green-500 bg-green-500/10",
        Redirection: "border-yellow-500 bg-yellow-500/10",
        "Client Error": "border-orange-500 bg-orange-500/10",
        "Server Error": "border-red-500 bg-red-500/10"
      };
      return colors[category] || "border-gray-500 bg-gray-500/10";
    };
    const copyCode = (code) => {
      navigator.clipboard.writeText(code.toString());
      copied.value = code;
      setTimeout(() => copied.value = null, 2e3);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-5xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Globe), { class: "w-8 h-8" }, null, _parent));
      _push(` HTTP Status Codes </h1><p class="text-muted-foreground mt-2"> Reference for all HTTP status codes with descriptions. </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "mb-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "py-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" aria-label="Search HTTP status codes" placeholder="Search by code, name, or description..." class="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        type: "text",
                        "aria-label": "Search HTTP status codes",
                        placeholder: "Search by code, name, or description...",
                        class: "w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "py-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "relative" }, [
                    createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      type: "text",
                      "aria-label": "Search HTTP status codes",
                      placeholder: "Search by code, name, or description...",
                      class: "w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, searchQuery.value]
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
      _push(`<div class="space-y-6"><!--[-->`);
      ssrRenderList(groupedCodes.value, (codes, category) => {
        _push(`<div><div class="flex items-center gap-2 mb-3"><div class="${ssrRenderClass([getCategoryColor(category), "w-3 h-3 rounded-full"])}"></div><h2 class="text-xl font-semibold">${ssrInterpolate(category)}</h2><span class="text-sm text-muted-foreground">(${ssrInterpolate(codes.length)})</span></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"><!--[-->`);
        ssrRenderList(codes, (code) => {
          _push(ssrRenderComponent(unref(_sfc_main$1), {
            key: code.code,
            class: ["cursor-pointer hover:border-primary transition-colors", getCategoryBg(category)],
            onClick: ($event) => copyCode(code.code)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "py-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-start justify-between"${_scopeId2}><div${_scopeId2}><div class="text-2xl font-bold mb-1"${_scopeId2}>${ssrInterpolate(code.code)}</div><div class="font-medium"${_scopeId2}>${ssrInterpolate(code.name)}</div><div class="text-sm text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(code.description)}</div></div>`);
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(copied.value === code.code ? unref(Check) : unref(Copy)), { class: "w-4 h-4 text-muted-foreground" }, null), _parent3, _scopeId2);
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-start justify-between" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "text-2xl font-bold mb-1" }, toDisplayString(code.code), 1),
                            createVNode("div", { class: "font-medium" }, toDisplayString(code.name), 1),
                            createVNode("div", { class: "text-sm text-muted-foreground mt-1" }, toDisplayString(code.description), 1)
                          ]),
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value === code.code ? unref(Check) : unref(Copy)), { class: "w-4 h-4 text-muted-foreground" }))
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$2), { class: "py-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-start justify-between" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "text-2xl font-bold mb-1" }, toDisplayString(code.code), 1),
                          createVNode("div", { class: "font-medium" }, toDisplayString(code.name), 1),
                          createVNode("div", { class: "text-sm text-muted-foreground mt-1" }, toDisplayString(code.description), 1)
                        ]),
                        (openBlock(), createBlock(resolveDynamicComponent(copied.value === code.code ? unref(Check) : unref(Copy)), { class: "w-4 h-4 text-muted-foreground" }))
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (filteredCodes.value.length === 0) {
        _push(`<div class="text-center py-16 text-muted-foreground">`);
        _push(ssrRenderComponent(unref(Globe), { class: "w-16 h-16 mx-auto mb-4 opacity-50" }, null, _parent));
        _push(`<p>No status codes found matching your search</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/HTTPStatusCodesView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
