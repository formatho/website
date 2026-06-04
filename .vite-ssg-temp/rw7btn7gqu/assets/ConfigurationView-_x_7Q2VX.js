import { defineComponent, ref, onMounted, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { Settings, AlertCircle, Bot, Wifi, Database, Save, RotateCcw, CheckCircle } from "lucide-vue-next";
import { c as _sfc_main$1, _ as _export_sfc } from "../main.mjs";
import "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
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
  __name: "ConfigurationView",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(true);
    const error = ref(null);
    const successMessage = ref("");
    const connectionStatus = ref(null);
    const config = ref({
      llm: {
        provider: "openai",
        apiKey: "",
        baseUrl: "https://api.openai.com/v1",
        model: "gpt-4o",
        temperature: 0.7,
        maxTokens: 2048,
        systemPrompt: "You are a helpful AI assistant."
      },
      agent: {
        maxConcurrentAgents: 5,
        heartbeatInterval: 30,
        retryAttempts: 3,
        autoStart: true,
        logLevel: "info"
      },
      storage: {
        dataDir: "/var/lib/formatho/data",
        logRetentionDays: 30,
        maxLogSize: 100,
        backupIntervalHours: 24,
        maxBackups: 5,
        autoBackup: true
      }
    });
    const loadConfig = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await fetch("/api/config", {
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) {
          throw new Error("Failed to load configuration");
        }
        config.value = await response.json();
      } catch (err) {
        error.value = err instanceof Error ? err.message : "Unknown error occurred";
      } finally {
        loading.value = false;
      }
    };
    const saveConfig = async () => {
      try {
        const response = await fetch("/api/config", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(config.value)
        });
        if (!response.ok) {
          throw new Error("Failed to save configuration");
        }
        successMessage.value = "Configuration saved successfully!";
        setTimeout(() => {
          successMessage.value = "";
        }, 3e3);
      } catch (err) {
        error.value = err instanceof Error ? err.message : "Unknown error occurred";
      }
    };
    const testLLMConnection = async () => {
      try {
        const response = await fetch("/api/config/test-llm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(config.value)
        });
        const result = await response.json();
        if (result.success) {
          connectionStatus.value = {
            type: "success",
            message: `Connected successfully to ${result.provider}! Model: ${result.model}`
          };
        } else {
          connectionStatus.value = {
            type: "error",
            message: result.error || "Connection test failed"
          };
        }
      } catch (err) {
        connectionStatus.value = {
          type: "error",
          message: err instanceof Error ? err.message : "Network error"
        };
      }
    };
    onMounted(() => {
      loadConfig();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "agent-config-view" }, _attrs))} data-v-1c9cf029><header class="config-header" data-v-1c9cf029><h1 data-v-1c9cf029>`);
      _push(ssrRenderComponent(unref(Settings), null, null, _parent));
      _push(` Agent Configuration</h1><p data-v-1c9cf029>Configure LLM endpoints, API keys, and agent behavior settings</p></header><div class="config-content" data-v-1c9cf029>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-1c9cf029><div class="spinner" data-v-1c9cf029></div><p data-v-1c9cf029>Loading configuration...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-1c9cf029>`);
        _push(ssrRenderComponent(unref(AlertCircle), null, null, _parent));
        _push(`<p data-v-1c9cf029>${ssrInterpolate(error.value)}</p>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: loadConfig,
          variant: "outline",
          "aria-label": "Reload configuration"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Retry`);
            } else {
              return [
                createTextVNode("Retry")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="config-form-wrapper" data-v-1c9cf029><section class="config-section" data-v-1c9cf029><h2 data-v-1c9cf029>`);
        _push(ssrRenderComponent(unref(Bot), null, null, _parent));
        _push(` LLM Settings</h2><form class="config-form" data-v-1c9cf029><div class="form-group" data-v-1c9cf029><label for="llmProvider" data-v-1c9cf029>LLM Provider</label><select id="llmProvider" required data-v-1c9cf029><option value="openai" data-v-1c9cf029${ssrIncludeBooleanAttr(Array.isArray(config.value.llm.provider) ? ssrLooseContain(config.value.llm.provider, "openai") : ssrLooseEqual(config.value.llm.provider, "openai")) ? " selected" : ""}>OpenAI</option><option value="anthropic" data-v-1c9cf029${ssrIncludeBooleanAttr(Array.isArray(config.value.llm.provider) ? ssrLooseContain(config.value.llm.provider, "anthropic") : ssrLooseEqual(config.value.llm.provider, "anthropic")) ? " selected" : ""}>Anthropic</option><option value="ollama" data-v-1c9cf029${ssrIncludeBooleanAttr(Array.isArray(config.value.llm.provider) ? ssrLooseContain(config.value.llm.provider, "ollama") : ssrLooseEqual(config.value.llm.provider, "ollama")) ? " selected" : ""}>Ollama (Local)</option><option value="lmstudio" data-v-1c9cf029${ssrIncludeBooleanAttr(Array.isArray(config.value.llm.provider) ? ssrLooseContain(config.value.llm.provider, "lmstudio") : ssrLooseEqual(config.value.llm.provider, "lmstudio")) ? " selected" : ""}>LM Studio</option></select></div><div class="form-group" data-v-1c9cf029><label for="apiKey" data-v-1c9cf029>API Key</label><input type="password" id="apiKey"${ssrRenderAttr("value", config.value.llm.apiKey)} placeholder="Enter your API key" data-v-1c9cf029><small data-v-1c9cf029>Required for cloud providers (OpenAI, Anthropic)</small></div><div class="form-group" data-v-1c9cf029><label for="baseUrl" data-v-1c9cf029>Base URL</label><input type="url" id="baseUrl"${ssrRenderAttr("value", config.value.llm.baseUrl)} placeholder="https://api.openai.com/v1" data-v-1c9cf029><small data-v-1c9cf029>For custom endpoints or local servers</small></div><div class="form-group" data-v-1c9cf029><label for="model" data-v-1c9cf029>Default Model</label><input type="text" id="model"${ssrRenderAttr("value", config.value.llm.model)} placeholder="e.g., gpt-4, claude-3" data-v-1c9cf029></div><div class="form-row" data-v-1c9cf029><div class="form-group" data-v-1c9cf029><label for="temperature" data-v-1c9cf029>Temperature: ${ssrInterpolate(config.value.llm.temperature)}</label><input type="range" id="temperature"${ssrRenderAttr("value", config.value.llm.temperature)} min="0" max="2" step="0.1" data-v-1c9cf029></div><div class="form-group" data-v-1c9cf029><label for="maxTokens" data-v-1c9cf029>Max Tokens: ${ssrInterpolate(config.value.llm.maxTokens)}</label><input type="number" id="maxTokens"${ssrRenderAttr("value", config.value.llm.maxTokens)} min="100" max="8192" data-v-1c9cf029></div></div><div class="form-group full-width" data-v-1c9cf029><label for="systemPrompt" data-v-1c9cf029>System Prompt</label>`);
        _push(ssrRenderComponent(CodeEditor, {
          id: "systemPrompt",
          modelValue: config.value.llm.systemPrompt,
          "onUpdate:modelValue": ($event) => config.value.llm.systemPrompt = $event,
          language: "markdown",
          class: "min-h-[100px]",
          placeholder: "Define the agent's behavior and personality..."
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          type: "button",
          onClick: testLLMConnection,
          variant: "outline",
          "aria-label": "Test LLM connection"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Wifi), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Test LLM Connection `);
            } else {
              return [
                createVNode(unref(Wifi), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Test LLM Connection ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (connectionStatus.value) {
          _push(`<p class="${ssrRenderClass("status " + connectionStatus.value.type)}" data-v-1c9cf029>${ssrInterpolate(connectionStatus.value.message)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></section><section class="config-section" data-v-1c9cf029><h2 data-v-1c9cf029>`);
        _push(ssrRenderComponent(unref(Settings), null, null, _parent));
        _push(` Agent Behavior</h2><form class="config-form" data-v-1c9cf029><div class="form-group" data-v-1c9cf029><label for="maxConcurrentAgents" data-v-1c9cf029>Maximum Concurrent Agents: ${ssrInterpolate(config.value.agent.maxConcurrentAgents)}</label><input type="range" id="maxConcurrentAgents"${ssrRenderAttr("value", config.value.agent.maxConcurrentAgents)} min="1" max="20" data-v-1c9cf029></div><div class="form-group" data-v-1c9cf029><label for="heartbeatInterval" data-v-1c9cf029>Heartbeat Interval (seconds): ${ssrInterpolate(config.value.agent.heartbeatInterval)}</label><input type="number" id="heartbeatInterval"${ssrRenderAttr("value", config.value.agent.heartbeatInterval)} min="5" max="300" data-v-1c9cf029></div><div class="form-group" data-v-1c9cf029><label for="retryAttempts" data-v-1c9cf029>Retry Attempts: ${ssrInterpolate(config.value.agent.retryAttempts)}</label><input type="number" id="retryAttempts"${ssrRenderAttr("value", config.value.agent.retryAttempts)} min="0" max="10" data-v-1c9cf029></div><div class="form-group" data-v-1c9cf029><label class="checkbox-label" data-v-1c9cf029><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(config.value.agent.autoStart) ? ssrLooseContain(config.value.agent.autoStart, null) : config.value.agent.autoStart) ? " checked" : ""} data-v-1c9cf029> Auto-start agents on creation </label></div><div class="form-group" data-v-1c9cf029><label class="checkbox-label" data-v-1c9cf029><input type="checkbox"${ssrIncludeBooleanAttr(config.value.agent.logLevel === "debug") ? " checked" : ""} data-v-1c9cf029> Enable debug logging </label></div></form></section><section class="config-section" data-v-1c9cf029><h2 data-v-1c9cf029>`);
        _push(ssrRenderComponent(unref(Database), null, null, _parent));
        _push(` Storage Configuration</h2><form class="config-form" data-v-1c9cf029><div class="form-group" data-v-1c9cf029><label for="dataDir" data-v-1c9cf029>Data Directory: ${ssrInterpolate(config.value.storage.dataDir)}</label><input type="text" id="dataDir"${ssrRenderAttr("value", config.value.storage.dataDir)} placeholder="/var/lib/formatho/data" data-v-1c9cf029></div><div class="form-group" data-v-1c9cf029><label for="logRetentionDays" data-v-1c9cf029>Log Retention (days): ${ssrInterpolate(config.value.storage.logRetentionDays)}</label><input type="number" id="logRetentionDays"${ssrRenderAttr("value", config.value.storage.logRetentionDays)} min="1" max="365" data-v-1c9cf029></div><div class="form-group" data-v-1c9cf029><label for="maxLogSize" data-v-1c9cf029>Max Log Size (MB): ${ssrInterpolate(config.value.storage.maxLogSize)}</label><input type="number" id="maxLogSize"${ssrRenderAttr("value", config.value.storage.maxLogSize)} min="10" max="1024" data-v-1c9cf029></div><h3 data-v-1c9cf029>Backup Settings</h3><div class="form-group" data-v-1c9cf029><label for="backupInterval" data-v-1c9cf029>Backup Interval (hours): ${ssrInterpolate(config.value.storage.backupIntervalHours)}</label><input type="number" id="backupInterval"${ssrRenderAttr("value", config.value.storage.backupIntervalHours)} min="1" max="720" data-v-1c9cf029></div><div class="form-group" data-v-1c9cf029><label for="maxBackups" data-v-1c9cf029>Max Backups to Keep: ${ssrInterpolate(config.value.storage.maxBackups)}</label><input type="number" id="maxBackups"${ssrRenderAttr("value", config.value.storage.maxBackups)} min="1" max="50" data-v-1c9cf029></div><div class="form-group" data-v-1c9cf029><label class="checkbox-label" data-v-1c9cf029><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(config.value.storage.autoBackup) ? ssrLooseContain(config.value.storage.autoBackup, null) : config.value.storage.autoBackup) ? " checked" : ""} data-v-1c9cf029> Enable automatic backups </label></div></form></section><div class="action-buttons" data-v-1c9cf029>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          type: "submit",
          form: "configForm",
          onClick: saveConfig,
          "aria-label": "Save configuration"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Save), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Save Configuration `);
            } else {
              return [
                createVNode(unref(Save), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Save Configuration ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          type: "button",
          onClick: loadConfig,
          variant: "outline",
          "aria-label": "Reset to defaults"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(RotateCcw), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Reset to Defaults `);
            } else {
              return [
                createVNode(unref(RotateCcw), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Reset to Defaults ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (successMessage.value) {
          _push(`<p class="success-message" data-v-1c9cf029>`);
          _push(ssrRenderComponent(unref(CheckCircle), null, null, _parent));
          _push(` ${ssrInterpolate(successMessage.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ConfigurationView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ConfigurationView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1c9cf029"]]);
export {
  ConfigurationView as default
};
