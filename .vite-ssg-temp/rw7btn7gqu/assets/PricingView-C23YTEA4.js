import { defineComponent, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { u as useStructuredData } from "./useStructuredData-TTou69kz.js";
import { _ as _export_sfc } from "../main.mjs";
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
  __name: "PricingView",
  __ssrInlineRender: true,
  setup(__props) {
    const { addFAQStructuredData, addBreadcrumbStructuredData } = useStructuredData();
    const billingPeriod = ref("monthly");
    const openFaq = ref(null);
    const plans = [
      {
        name: "Free",
        description: "For solo developers getting started with AI agents",
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
          "Up to 3 agents",
          "100 tasks per day",
          "Basic analytics dashboard",
          "Community support (Discord)",
          "REST API access",
          "1 project"
        ],
        cta: "Get Started Free",
        ctaLink: "https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=pricing_page",
        popular: false
      },
      {
        name: "Pro",
        description: "For serious developers and growing teams",
        monthlyPrice: 29,
        yearlyPrice: 24,
        features: [
          "Up to 25 agents",
          "Unlimited tasks",
          "Advanced analytics & reports",
          "Priority email support",
          "REST API access",
          "Unlimited projects",
          "Agent pools & parallel execution",
          "Cron scheduling",
          "State persistence",
          "Custom integrations"
        ],
        cta: "Start 14-Day Free Trial",
        ctaLink: "https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=pricing_page",
        popular: true
      },
      {
        name: "Enterprise",
        description: "For organizations with custom requirements",
        monthlyPrice: null,
        yearlyPrice: null,
        features: [
          "Unlimited agents",
          "Unlimited everything",
          "Dedicated account manager",
          "SLA guarantee (99.99%)",
          "On-premise deployment",
          "Custom training & onboarding",
          "SSO / SAML integration",
          "Audit logs",
          "Custom SLA & support"
        ],
        cta: "Contact Sales",
        ctaLink: "mailto:hello@formatho.com",
        popular: false
      }
    ];
    const faqs = [
      {
        question: "Is there really a free tier?",
        answer: "Yes! The Free plan is free forever. No credit card required. You get 3 agents and 100 tasks per day — enough for most solo developers."
      },
      {
        question: "What happens when I hit the task limit?",
        answer: "On the Free plan, tasks beyond the daily limit are queued and processed the next day. On Pro, there are no limits. We never delete your data."
      },
      {
        question: "Can I switch plans anytime?",
        answer: "Absolutely. Upgrade or downgrade at any time. When upgrading, you get immediate access to new features. When downgrading, changes take effect at the end of your billing period."
      },
      {
        question: "Do you offer a startup discount?",
        answer: "Yes! If you're a startup with under $1M in funding, email us at hello@formatho.com for 50% off Pro for the first year."
      },
      {
        question: "Is there a self-hosted option?",
        answer: "Enterprise plans include on-premise deployment. Self-hosted Pro is coming Q3 2026. Join our newsletter to get notified."
      }
    ];
    const planSpacing = (name) => {
      return name.split("").join(" ");
    };
    onMounted(() => {
      addBreadcrumbStructuredData([
        { name: "Home", url: "https://formatho.com" },
        { name: "Pricing", url: "https://formatho.com/pricing" }
      ]);
      addFAQStructuredData(faqs.map((f) => ({ question: f.question, answer: f.answer })));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen overflow-x-hidden" }, _attrs))} data-v-b41f1fe2><section class="border-b-2 border-foreground" data-v-b41f1fe2><div class="container mx-auto px-4 md:px-12 py-16 md:py-24" data-v-b41f1fe2><h1 class="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6" data-v-b41f1fe2> Pricing </h1><p class="font-mono text-xs md:text-sm tracking-widest text-muted-foreground max-w-xl" data-v-b41f1fe2> Start free. Scale when you&#39;re ready. No hidden fees, no surprises. </p><div class="mt-10 flex items-center gap-6" data-v-b41f1fe2><button class="${ssrRenderClass([
        "text-xs tracking-widest uppercase transition-none pb-1",
        billingPeriod.value === "monthly" ? "text-foreground font-bold border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground line-through decoration-foreground/20"
      ])}" data-v-b41f1fe2> Monthly </button><button class="${ssrRenderClass([
        "text-xs tracking-widest uppercase transition-none pb-1",
        billingPeriod.value === "yearly" ? "text-foreground font-bold border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground line-through decoration-foreground/20"
      ])}" data-v-b41f1fe2> Yearly <span class="text-muted-foreground normal-case tracking-normal ml-1" data-v-b41f1fe2>Save 17%</span></button></div></div></section><div class="container mx-auto px-4 md:px-12 py-16 md:py-24" data-v-b41f1fe2><div class="border-t-2 border-b-2 border-foreground pricing-grid" data-v-b41f1fe2><!--[-->`);
      ssrRenderList(plans, (plan, index) => {
        _push(`<div class="${ssrRenderClass([
          "flex flex-col p-8 md:p-10",
          plan.popular ? "bg-foreground text-background" : "bg-background text-foreground",
          "border-b md:border-b-0 md:border-r",
          index === plans.length - 1 ? "md:border-r-0" : ""
        ])}" data-v-b41f1fe2><p class="${ssrRenderClass([plan.popular ? "text-background/70" : "text-muted-foreground", "text-xs tracking-widest mb-2 font-bold"])}" data-v-b41f1fe2>${ssrInterpolate(planSpacing(plan.name.toUpperCase()))}</p><p class="${ssrRenderClass([plan.popular ? "text-background/60" : "text-muted-foreground", "text-sm mb-4"])}" data-v-b41f1fe2>${ssrInterpolate(plan.description)}</p><div class="mb-8" data-v-b41f1fe2><div class="flex items-baseline gap-1" data-v-b41f1fe2>`);
        if (plan.monthlyPrice !== null) {
          _push(`<span class="text-7xl md:text-8xl font-black tracking-tighter leading-none" data-v-b41f1fe2> $${ssrInterpolate(billingPeriod.value === "monthly" ? plan.monthlyPrice : plan.yearlyPrice)}</span>`);
        } else {
          _push(`<span class="text-4xl md:text-5xl font-black tracking-tighter leading-none" data-v-b41f1fe2>Custom</span>`);
        }
        _push(`</div>`);
        if (plan.monthlyPrice !== null) {
          _push(`<p class="${ssrRenderClass([plan.popular ? "text-background/40" : "text-muted-foreground", "text-xs tracking-widest mt-2"])}" data-v-b41f1fe2> PER MONTH </p>`);
        } else {
          _push(`<!---->`);
        }
        if (billingPeriod.value === "yearly" && plan.monthlyPrice) {
          _push(`<p class="${ssrRenderClass([plan.popular ? "text-background/40" : "text-muted-foreground", "text-xs tracking-widest mt-1"])}" data-v-b41f1fe2> BILLED $${ssrInterpolate(plan.yearlyPrice * 12)}/YEAR </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><ul class="flex-1 mb-8 p-0" data-v-b41f1fe2><!--[-->`);
        ssrRenderList(plan.features, (feature) => {
          _push(`<li class="${ssrRenderClass([
            "flex items-center gap-3 py-3 m-0 border-b",
            plan.popular ? "border-background/15" : "border-foreground/10"
          ])}" data-v-b41f1fe2><span class="${ssrRenderClass([plan.popular ? "text-background/40" : "text-muted-foreground", "text-xs font-mono"])}" data-v-b41f1fe2>+</span><span class="${ssrRenderClass([plan.popular ? "text-background/80" : "", "text-sm"])}" data-v-b41f1fe2>${ssrInterpolate(feature)}</span></li>`);
        });
        _push(`<!--]--></ul><a${ssrRenderAttr("href", plan.ctaLink)} class="${ssrRenderClass([
          "block w-full text-center py-4 mt-6 font-bold tracking-widest text-xs uppercase rounded-xl cursor-pointer",
          plan.popular ? "bg-background text-foreground hover:opacity-80" : "bg-foreground text-background hover:opacity-80"
        ])}" data-v-b41f1fe2>${ssrInterpolate(plan.cta)}</a></div>`);
      });
      _push(`<!--]--></div></div><section class="border-t-2 border-foreground" data-v-b41f1fe2><div class="container mx-auto px-4 md:px-12 py-8" data-v-b41f1fe2><div class="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4" data-v-b41f1fe2><span class="text-xs tracking-widest text-muted-foreground" data-v-b41f1fe2>30-DAY MONEY-BACK GUARANTEE</span><span class="text-muted-foreground hidden md:inline" data-v-b41f1fe2>—</span><span class="text-xs text-muted-foreground" data-v-b41f1fe2>Not satisfied? Full refund, no questions asked.</span></div></div></section><section class="container mx-auto px-4 md:px-12 py-16 md:py-24" data-v-b41f1fe2><h2 class="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-12" data-v-b41f1fe2> FAQ </h2><div data-v-b41f1fe2><!--[-->`);
      ssrRenderList(faqs, (faq, index) => {
        _push(`<div class="border-t-2 border-foreground" data-v-b41f1fe2><button class="w-full flex items-start justify-between gap-8 py-8 text-left" data-v-b41f1fe2><h3 class="text-xl md:text-2xl font-bold tracking-tight leading-tight" data-v-b41f1fe2>${ssrInterpolate(faq.question)}</h3><span class="${ssrRenderClass([openFaq.value === index ? "rotate-45" : "", "text-3xl font-thin leading-none mt-1 flex-shrink-0 select-none"])}" data-v-b41f1fe2>+</span></button><div class="pb-8 pl-6 border-b border-foreground/10" style="${ssrRenderStyle(openFaq.value === index ? null : { display: "none" })}" data-v-b41f1fe2><p class="text-sm text-muted-foreground leading-relaxed max-w-2xl" data-v-b41f1fe2>${ssrInterpolate(faq.answer)}</p></div></div>`);
      });
      _push(`<!--]--><div class="border-t-2 border-foreground" data-v-b41f1fe2></div></div></section><section class="border-t-2 border-foreground" data-v-b41f1fe2><div class="container mx-auto px-4 md:px-12 py-16 md:py-24" data-v-b41f1fe2><div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" data-v-b41f1fe2><h2 class="text-4xl md:text-6xl font-black tracking-tighter leading-none" data-v-b41f1fe2> Ready to Get Started? </h2><div class="md:text-right" data-v-b41f1fe2><a href="https://todo.formatho.com/?utm_source=formatho&amp;utm_medium=website&amp;utm_campaign=pricing_bottom_cta" class="inline-block bg-foreground text-background px-10 py-4 text-xs font-bold tracking-widest uppercase rounded-xl border border-foreground hover:opacity-80" data-v-b41f1fe2> Start Free — No Credit Card </a><p class="text-xs text-muted-foreground mt-4 tracking-widest" data-v-b41f1fe2> No credit card required · Setup in 2 minutes · Cancel anytime </p></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PricingView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PricingView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b41f1fe2"]]);
export {
  PricingView as default
};
