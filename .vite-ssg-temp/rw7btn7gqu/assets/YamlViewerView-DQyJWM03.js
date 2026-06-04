import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import yaml__default from "js-yaml";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { c as _sfc_main$1 } from "../main.mjs";
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
  __name: "YamlViewerView",
  __ssrInlineRender: true,
  setup(__props) {
    const yamlInput = ref("");
    const error = ref("");
    watch(yamlInput, () => {
      try {
        error.value = "";
        if (!yamlInput.value.trim()) return;
        yaml__default.load(yamlInput.value);
      } catch (e) {
        error.value = e.message || "Invalid YAML";
      }
    });
    const formatYaml = () => {
      try {
        error.value = "";
        if (!yamlInput.value.trim()) return;
        const parsed = yaml__default.load(yamlInput.value);
        yamlInput.value = yaml__default.dump(parsed, { indent: 2, lineWidth: -1 });
      } catch (e) {
        error.value = e.message || "Invalid YAML";
      }
    };
    const copyOutput = () => {
      navigator.clipboard.writeText(yamlInput.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">YAML Linter &amp; Viewer</h1></div><p class="text-sm text-muted-foreground"> Format, validate, and beautify YAML documents instantly. Our YAML linter checks syntax errors in real-time and helps you fix indentation issues. 100% client-side - your data never leaves your browser. </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: formatYaml,
        "aria-label": "Format YAML"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Format`);
          } else {
            return [
              createTextVNode("Format")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        onClick: copyOutput,
        disabled: !yamlInput.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Copy`);
          } else {
            return [
              createTextVNode("Copy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0 flex-1" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`YAML`);
                      } else {
                        return [
                          createTextVNode("YAML")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("YAML")
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
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: yamlInput.value,
                    "onUpdate:modelValue": ($event) => yamlInput.value = $event,
                    language: "yaml",
                    class: "h-full",
                    placeholder: "Enter YAML..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: yamlInput.value,
                      "onUpdate:modelValue": ($event) => yamlInput.value = $event,
                      language: "yaml",
                      class: "h-full",
                      placeholder: "Enter YAML..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("YAML")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: yamlInput.value,
                    "onUpdate:modelValue": ($event) => yamlInput.value = $event,
                    language: "yaml",
                    class: "h-full",
                    placeholder: "Enter YAML..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (error.value) {
        _push(`<div class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">${ssrInterpolate(error.value)}</div>`);
      } else if (yamlInput.value) {
        _push(`<div class="p-4 text-sm text-green-600 bg-green-500/10 rounded-md"> ✓ Valid YAML </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-4 p-4 bg-card rounded-lg border"><h2 class="text-lg font-semibold mb-2">About This YAML Linter</h2><div class="text-sm text-muted-foreground space-y-2"><p> This free <strong>YAML linter</strong> and validator helps you format, validate, and beautify YAML documents with real-time syntax checking. Whether you&#39;re working with Kubernetes configs, CI/CD pipelines, or data serialization, our tool ensures your YAML files are error-free and properly formatted. </p><h3 class="font-medium text-foreground mt-3">Key Features:</h3><ul class="list-disc list-inside space-y-1 ml-2"><li><strong>Real-time YAML validation</strong> - Detects syntax errors instantly as you type</li><li><strong>YAML formatter &amp; beautifier</strong> - Auto-formats with proper indentation (2 spaces)</li><li><strong>YAML syntax checker</strong> - Identifies common YAML mistakes</li><li><strong>100% privacy-first</strong> - All processing happens in your browser</li><li><strong>No signup required</strong> - Start linting YAML immediately</li><li><strong>Supports all YAML versions</strong> - YAML 1.1, 1.2, and beyond</li></ul><h3 class="font-medium text-foreground mt-3">Common Use Cases:</h3><ul class="list-disc list-inside space-y-1 ml-2"><li>Validate Kubernetes manifests and Helm charts</li><li>Check CI/CD pipeline configurations (GitHub Actions, GitLab CI)</li><li>Format Docker Compose files</li><li>Lint Ansible playbooks and inventory files</li><li>Validate API specifications and configuration files</li></ul></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/YamlViewerView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
