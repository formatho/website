import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$5 } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
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
  __name: "DockerRunToComposeView",
  __ssrInlineRender: true,
  setup(__props) {
    const dockerRunInput = ref("");
    const dockerComposeOutput = ref("");
    const convertToCompose = () => {
      if (!dockerRunInput.value.trim()) {
        dockerComposeOutput.value = "";
        return;
      }
      const args = parseDockerRun(dockerRunInput.value);
      const compose = generateCompose(args);
      dockerComposeOutput.value = compose;
    };
    const parseDockerRun = (cmd) => {
      const tokens = cmd.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
      const args = {
        image: "",
        ports: [],
        volumes: [],
        environment: []
      };
      let i = 0;
      while (i < tokens.length) {
        const token = tokens[i];
        if (!token) {
          i++;
          continue;
        }
        if (token === "-p" || token === "--publish") {
          const port = tokens[++i];
          if (port) args.ports.push(port);
        } else if (token === "-v" || token === "--volume") {
          const vol = tokens[++i];
          if (vol) args.volumes.push(vol);
        } else if (token === "-e" || token === "--env") {
          const env = tokens[++i];
          if (env) args.environment.push(env);
        } else if (token === "--name") {
          args.name = tokens[++i];
        } else if (token === "--network") {
          args.network = tokens[++i];
        } else if (token === "--restart") {
          args.restart = tokens[++i];
        } else if (!token.startsWith("-") && !args.image) {
          args.image = token;
        } else if (args.image && i === tokens.length - 1) {
          args.command = token;
        }
        i++;
      }
      return args;
    };
    const generateCompose = (args) => {
      const imageParts = args.image.split("/");
      const namePart = (imageParts[0] ?? args.image).split(":")[0] ?? args.image;
      const serviceName = args.name || namePart;
      let compose = `version: '3.8'

services:
  ${serviceName}:
`;
      compose += `    image: ${args.image}
`;
      if (args.name) {
        compose += `    container_name: ${args.name}
`;
      }
      if (args.restart) {
        compose += `    restart: ${args.restart}
`;
      }
      if (args.ports.length > 0) {
        compose += "    ports:\n";
        args.ports.forEach((p) => {
          compose += `      - "${p}"
`;
        });
      }
      if (args.volumes.length > 0) {
        compose += "    volumes:\n";
        args.volumes.forEach((v) => {
          compose += `      - ${v}
`;
        });
      }
      if (args.environment.length > 0) {
        compose += "    environment:\n";
        args.environment.forEach((e) => {
          compose += `      - ${e}
`;
        });
      }
      if (args.command) {
        compose += `    command: ${args.command}
`;
      }
      return compose;
    };
    const copyOutput = () => {
      navigator.clipboard.writeText(dockerComposeOutput.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Docker Run to Compose</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Docker Run Command`);
                      } else {
                        return [
                          createTextVNode("Docker Run Command")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Docker Run Command")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0 space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: dockerRunInput.value,
                    "onUpdate:modelValue": ($event) => dockerRunInput.value = $event,
                    language: "plaintext",
                    class: "min-h-[80px]",
                    placeholder: "docker run -d -p 80:80 --name nginx nginx:latest"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: convertToCompose,
                    "aria-label": "Convert Docker run command to docker-compose format"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Convert`);
                      } else {
                        return [
                          createTextVNode("Convert")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: dockerRunInput.value,
                      "onUpdate:modelValue": ($event) => dockerRunInput.value = $event,
                      language: "plaintext",
                      class: "min-h-[80px]",
                      placeholder: "docker run -d -p 80:80 --name nginx nginx:latest"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(_sfc_main$5), {
                      onClick: convertToCompose,
                      "aria-label": "Convert Docker run command to docker-compose format"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Convert")
                      ]),
                      _: 1
                    })
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
                      createTextVNode("Docker Run Command")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0 space-y-4" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: dockerRunInput.value,
                    "onUpdate:modelValue": ($event) => dockerRunInput.value = $event,
                    language: "plaintext",
                    class: "min-h-[80px]",
                    placeholder: "docker run -d -p 80:80 --name nginx nginx:latest"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(unref(_sfc_main$5), {
                    onClick: convertToCompose,
                    "aria-label": "Convert Docker run command to docker-compose format"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Convert")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (dockerComposeOutput.value) {
        _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`docker-compose.yml`);
                        } else {
                          return [
                            createTextVNode("docker-compose.yml")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      variant: "outline",
                      size: "sm",
                      onClick: copyOutput,
                      "aria-label": "Copy docker-compose output"
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
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("docker-compose.yml")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        variant: "outline",
                        size: "sm",
                        onClick: copyOutput,
                        "aria-label": "Copy docker-compose output"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Copy")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(CodeEditor, {
                      "model-value": dockerComposeOutput.value,
                      language: "yaml",
                      readonly: "",
                      class: "min-h-[400px]"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(CodeEditor, {
                        "model-value": dockerComposeOutput.value,
                        language: "yaml",
                        readonly: "",
                        class: "min-h-[400px]"
                      }, null, 8, ["model-value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("docker-compose.yml")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), {
                      variant: "outline",
                      size: "sm",
                      onClick: copyOutput,
                      "aria-label": "Copy docker-compose output"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                  default: withCtx(() => [
                    createVNode(CodeEditor, {
                      "model-value": dockerComposeOutput.value,
                      language: "yaml",
                      readonly: "",
                      class: "min-h-[400px]"
                    }, null, 8, ["model-value"])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/DockerRunToComposeView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
