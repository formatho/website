import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { RouterLink } from "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PrivacyPolicyView",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-12" }, _attrs))}><div class="max-w-4xl mx-auto"><h1 class="text-5xl font-bold mb-8">Privacy Policy</h1><p class="text-muted-foreground mb-8">Last updated: March 7, 2026</p><div class="glass-card p-8 md:p-12 space-y-8"><section><h2 class="text-2xl font-bold mb-4">Introduction</h2><p class="text-muted-foreground leading-relaxed"> Welcome to Formatho. We are committed to protecting your privacy and ensuring the security of your data. This Privacy Policy explains how we collect, use, and safeguard information when you use our website and services at formatho.com. </p></section><section><h2 class="text-2xl font-bold mb-4">Information We Collect</h2><p class="text-muted-foreground leading-relaxed mb-4"><strong>Client-Side Processing:</strong> The core principle of Formatho is that all data processing happens locally in your browser. When you use our tools (JSON formatters, Base64 encoders, hash generators, etc.), your data is processed entirely on your device and is never transmitted to our servers. </p><p class="text-muted-foreground leading-relaxed mb-4"><strong>Analytics Data:</strong> We use Google Analytics to collect anonymous usage statistics such as page views, browser types, and general geographic data. This helps us improve our services and understand how users interact with our website. </p><p class="text-muted-foreground leading-relaxed"><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings. </p></section><section><h2 class="text-2xl font-bold mb-4">How We Use Your Information</h2><ul class="list-disc list-inside text-muted-foreground space-y-2"><li>To provide, maintain, and improve our services</li><li>To analyze usage patterns and optimize user experience</li><li>To detect and prevent technical issues</li><li>To comply with legal obligations</li></ul></section><section><h2 class="text-2xl font-bold mb-4">Data Security</h2><p class="text-muted-foreground leading-relaxed mb-4"> Since all data processing occurs locally in your browser, your sensitive information (API keys, passwords, configuration files, etc.) never leaves your device. This architecture inherently provides a high level of security and privacy. </p><p class="text-muted-foreground leading-relaxed"> We implement industry-standard security measures to protect our website infrastructure, including SSL/TLS encryption and regular security audits. </p></section><section><h2 class="text-2xl font-bold mb-4">Third-Party Services</h2><p class="text-muted-foreground leading-relaxed mb-4"><strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our website. Google Analytics may collect information about your use of our website. For more information, see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-gray-900">Google&#39;s Privacy Policy</a>. </p><p class="text-muted-foreground leading-relaxed"><strong>Google AdSense:</strong> We may display advertisements through Google AdSense, which uses cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" class="text-gray-900">Google Ads Settings</a>. </p></section><section><h2 class="text-2xl font-bold mb-4">Your Rights</h2><p class="text-muted-foreground leading-relaxed mb-4"> Depending on your location, you may have the following rights: </p><ul class="list-disc list-inside text-muted-foreground space-y-2"><li><strong>Access:</strong> Request information about data we collect about you</li><li><strong>Correction:</strong> Request correction of inaccurate data</li><li><strong>Deletion:</strong> Request deletion of your data</li><li><strong>Opt-Out:</strong> Opt out of analytics tracking and personalized advertising </li></ul></section><section><h2 class="text-2xl font-bold mb-4">Children&#39;s Privacy</h2><p class="text-muted-foreground leading-relaxed"> Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately. </p></section><section><h2 class="text-2xl font-bold mb-4">Changes to This Policy</h2><p class="text-muted-foreground leading-relaxed"> We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. </p></section><section><h2 class="text-2xl font-bold mb-4">Contact Us</h2><p class="text-muted-foreground leading-relaxed"> If you have any questions about this Privacy Policy, please contact us through our `);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/contact",
        class: "text-gray-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact page`);
          } else {
            return [
              createTextVNode("Contact page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` or visit our `);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/about",
        class: "text-gray-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About page`);
          } else {
            return [
              createTextVNode("About page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` for more information. </p></section></div><div class="mt-8 flex flex-wrap gap-4">`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/terms",
        class: "text-sm text-muted-foreground hover:text-gray-900 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Terms of Service → `);
          } else {
            return [
              createTextVNode(" Terms of Service → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/contact",
        class: "text-sm text-muted-foreground hover:text-gray-900 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact Us → `);
          } else {
            return [
              createTextVNode(" Contact Us → ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PrivacyPolicyView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
