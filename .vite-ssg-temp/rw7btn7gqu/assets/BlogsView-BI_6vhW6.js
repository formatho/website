import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { RouterLink } from "vue-router";
import { useHead } from "@vueuse/head";
import { _ as _export_sfc } from "../main.mjs";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
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
const blogMetadata = [
  {
    id: 56,
    title: "The Structural Reconfiguration of Finance: Institutional Guide to Real-World Asset (RWA) Tokenization in 2026",
    excerpt: "The IMF calls it a structural reconfiguration of global finance. With $441B in represented value and $27.65B actively trading on-chain, RWA tokenization is no longer theoretical. This institutional guide breaks down the mechanics, regulations, and systemic risks of tokenized finance in 2026.",
    date: "2026-06-04",
    readTime: "14 min",
    tags: ["RWA", "Tokenization", "Blockchain", "Finance", "Institutional", "IMF", "Regulation"],
    slug: "structural-reconfiguration-finance-rwa-tokenization-2026",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Blockchain network transforming traditional financial assets into digital tokens"
  },
  {
    id: 55,
    title: "Why RWA, AI, and Privacy Tokens Are Outperforming Bitcoin in 2026",
    excerpt: "Discover how institutional investors are shifting from Bitcoin to Real World Assets (RWA), AI infrastructure, and privacy tokens in the 2026 crypto cycle. Explore the market dynamics driving this major shift in investor preferences.",
    date: "2026-05-28",
    readTime: "7 min",
    tags: ["Crypto", "Bitcoin", "RWA", "AI", "Privacy Tokens", "Investment", "Finance"],
    slug: "why-rwa-ai-privacy-tokens-outperforming-bitcoin-2026",
    image: "/images/blog/blog-12/header-image.jpg",
    imageAlt: "Financial chart showing RWA, AI, and privacy tokens outperforming Bitcoin in 2026"
  },
  {
    id: 46,
    title: "CLARITY Act Victory: Regulatory Clarity for $3T Crypto Market",
    excerpt: "The cryptocurrency industry just achieved a monumental legislative breakthrough that could reshape the future of digital assets in the United States.",
    date: "2026-05-20",
    readTime: "8 min",
    tags: ["Crypto", "Legislation", "Regulation", "Developers", "Blockchain"],
    slug: "clarity-act-victory-regulatory-clarity-3t-crypto-market",
    image: "/images/blog/blog-38/blockchain-regulation.jpg",
    imageAlt: "Blockchain technology and regulatory framework for cryptocurrency"
  },
  {
    id: 54,
    title: "EIP-7702: How Ethereum's Pectra Upgrade Finally Bridges EOAs and Smart Contracts",
    excerpt: "EIP-7702 is the most significant change to Ethereum accounts since the network launched. It lets regular wallets temporarily become smart contracts — enabling batching, sponsorship, and privilege de-escalation without migrating to a new address. Here is what every developer needs to know.",
    date: "2026-05-18",
    readTime: "10 min",
    tags: ["Blockchain", "Ethereum", "EIP-7702", "Account Abstraction", "Smart Contracts", "Pectra"],
    slug: "eip-7702-ethereum-pectra-eoa-smart-contract-upgrade",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
    imageAlt: "Ethereum EIP-7702 bridging EOAs and smart contracts in the Pectra upgrade"
  },
  {
    id: 53,
    title: "ERC-7730: The Clear Signing Standard That Will Transform How You Verify Ethereum Transactions",
    excerpt: "Blind signing is the silent killer of Ethereum security. ERC-7730 introduces a structured, human-readable format for transaction display that makes hardware wallet verification actually reliable. Here is why it matters for every developer building on Ethereum.",
    date: "2026-05-12",
    readTime: "9 min",
    tags: ["Blockchain", "Ethereum", "Security", "ERC-7730", "Wallets", "Smart Contracts"],
    slug: "erc-7730-clear-signing-ethereum-standard",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
    imageAlt: "Ethereum transaction clear signing with ERC-7730 structured data display"
  },
  {
    id: 52,
    title: "AI Meets Blockchain: How Agent Orchestration Could Transform Web3 Development",
    excerpt: "After analyzing 25+ research papers, 5,750+ community reactions, and 12 competitor solutions, we found a critical gap in blockchain infrastructure: no general-purpose multi-agent orchestration. Here's what this means for Web3 developers.",
    date: "2026-04-16",
    readTime: "10 min",
    tags: ["Blockchain", "Web3", "AI Agents", "DeFi", "Agent Orchestration", "Research"],
    slug: "ai-meets-blockchain-agent-orchestration-web3",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
    imageAlt: "Blockchain network visualization with AI agent orchestration nodes connecting across Web3 infrastructure"
  },
  {
    id: 51,
    title: "Beyond the Chatbot: The Rise of Agentic Orchestration and Digital Workforce",
    excerpt: "The chatbot era is ending. Discover how multi-agent orchestration, digital twins, and browser-native workflows are transforming enterprise AI from conversation tools to autonomous digital workforces.",
    date: "2026-04-14",
    readTime: "9 min",
    tags: ["AI Agents", "Orchestration", "Productivity", "Enterprise AI", "Browser Automation"],
    slug: "beyond-the-chatbot-agentic-orchestration-digital-workforce",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    imageAlt: "Digital workforce coordination with multi-agent AI orchestration system"
  },
  {
    id: 50,
    title: "Privacy-First Developer Tools: Why Your Data Should Never Leave Your Browser",
    excerpt: "The data harvesting problem in developer tooling is real. Learn why privacy-first tools matter in 2026 and how client-side processing protects your code, configs, and credentials.",
    date: "2026-03-18",
    readTime: "8 min",
    tags: ["Privacy", "Security", "Developer Tools", "Open Source", "Best Practices"],
    slug: "privacy-first-developer-tools-2026",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop",
    imageAlt: "Privacy shield representing data protection in developer tools"
  },
  {
    id: 49,
    title: "JSON to YAML Converter: A Practical Guide for DevOps Engineers",
    excerpt: "Master JSON to YAML conversion for Docker Compose, Kubernetes, and CI/CD configs. Learn when to use each format and avoid common conversion pitfalls.",
    date: "2026-03-17",
    readTime: "7 min",
    tags: ["JSON", "YAML", "DevOps", "Tutorial", "Developer Tools"],
    slug: "json-to-yaml-converter-tools",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
    imageAlt: "Data format conversion between JSON and YAML"
  },
  {
    id: 48,
    title: "JWT Decoder Security Guide: Inspect Tokens Without Risk",
    excerpt: "Deep dive into JWT structure, common vulnerabilities, and why you should never paste tokens into online decoders. Learn to inspect JWTs safely.",
    date: "2026-03-16",
    readTime: "8 min",
    tags: ["JWT", "Security", "Authentication", "Tutorial", "Developer Tools"],
    slug: "jwt-decoder-security-guide",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=225&fit=crop",
    imageAlt: "JWT token security and authentication"
  },
  {
    id: 47,
    title: "SQL Formatter for Security: Spot Vulnerabilities in Plain Sight",
    excerpt: "Unformatted SQL is a security blind spot. Learn how proper formatting reveals injection vulnerabilities, improves code reviews, and makes your database layer safer.",
    date: "2026-03-15",
    readTime: "7 min",
    tags: ["SQL", "Security", "Database", "Tutorial", "Developer Tools"],
    slug: "sql-formatter-security",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=225&fit=crop",
    imageAlt: "SQL query formatting for security review"
  },
  {
    id: 46,
    title: "Base64 Encoder/Decoder: The Complete Developer Guide",
    excerpt: "Everything you need to know about Base64 encoding — what it is, when to use it (and when not to), common pitfalls, and why your encoding tool should be client-side.",
    date: "2026-03-14",
    readTime: "8 min",
    tags: ["Base64", "Encoding", "Tutorial", "Security", "Developer Tools"],
    slug: "base64-encoder-decoder-complete-guide",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    imageAlt: "Base64 encoding and decoding visualization"
  },
  {
    id: 45,
    title: "From Dead Capital to Programmable Gold: 5 Shifts Redefining the Global Economy in 2026",
    excerpt: 'The global financial architecture is currently undergoing its most significant structural upgrade since the advent of electronic trading. We have entered the era of The Great Migration, where trillions of dollars in "dead capital"—illiquid assets like private credit, commercial real estate, and bespoke commodities—are being liberated from the friction of analog, intermediary-centric systems.',
    date: "2026-04-20",
    readTime: "7 min",
    tags: ["Blockchain", "DeFi", "Finance", "AI", "Tokenization", "Global Economy"],
    slug: "from-dead-capital-to-programmable-gold-2026",
    image: "/images/blog/blog-11/blockchain-settlement.jpg",
    imageAlt: "Financial transformation from traditional capital to programmable gold tokens"
  },
  {
    id: 44,
    title: "We Built 100+ Privacy-First Developer Tools. Here's What We Learned.",
    excerpt: "The story behind Formatho's 100+ developer tools — the architecture decisions, the hard trade-offs, and why we chose client-side processing over data harvesting.",
    date: "2026-03-13",
    readTime: "9 min",
    tags: ["Developer Tools", "Launch", "Privacy", "Productivity", "Open Source"],
    slug: "100-plus-developer-tools-launch",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
    imageAlt: "100+ privacy-first developer tools launch"
  },
  {
    id: 43,
    title: "Regex Tester Security: Patterns That Protect and Patterns That Kill",
    excerpt: "Regular expressions can validate input or bring your server to its knees. Learn about ReDoS attacks, safe regex patterns, and why client-side testing matters.",
    date: "2026-03-12",
    readTime: "8 min",
    tags: ["Regex", "Security", "Tutorial", "Developer Tools", "Testing"],
    slug: "regex-tester-security",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop",
    imageAlt: "Regular expression testing for security"
  },
  {
    id: 42,
    title: "QR Codes Without Tracking: Privacy-First QR Generation",
    excerpt: "Most free QR code generators track your data. Learn the privacy risks of online QR tools and how client-side generation keeps your information safe.",
    date: "2026-03-11",
    readTime: "7 min",
    tags: ["QR Codes", "Privacy", "Security", "Tutorial", "Developer Tools"],
    slug: "qr-codes-without-tracking",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=225&fit=crop",
    imageAlt: "Privacy-first QR code generation without tracking"
  },
  {
    id: 41,
    title: "UUID Generator Masterclass: Everything You Need to Know About Unique Identifiers",
    excerpt: "Complete guide to UUIDs — from v1 to v5, security implications of predictable IDs, and how to generate unique identifiers safely in JavaScript and Node.js.",
    date: "2026-03-10",
    readTime: "8 min",
    tags: ["UUID", "Security", "JavaScript", "Tutorial", "Developer Tools"],
    slug: "uuid-generator-masterclass",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
    imageAlt: "Unique identifier generation and UUID variants"
  },
  {
    id: 40,
    title: "From Chaos to Order: Managing AI Agent Workloads",
    excerpt: "How persistent task management transformed our AI operations from scattered to systematic. Real results: 90% reduction in duplicate work, 3x faster task completion.",
    date: "2026-03-25",
    readTime: "6 min",
    tags: ["AI Agents", "Workflow Management", "Task Management", "Automation", "Productivity"],
    slug: "from-chaos-to-order-managing-ai-agent-workloads",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
    imageAlt: "Organized AI agent workflow with persistent task management system"
  },
  {
    id: 39,
    title: "Agent-Todo vs Traditional Task Managers: What's Different?",
    excerpt: "Why AI agents need purpose-built task management. Compare Agent-Todo with Todoist, Asana, and Trello — API-first design, agent memory, and 10x better automation.",
    date: "2026-03-26",
    readTime: "8 min",
    tags: ["AI Agents", "Task Management", "Comparison", "Productivity", "Automation"],
    slug: "building-battle-tested-microservices-a-production-readiness-checklist",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    imageAlt: "Split screen showing traditional task manager UI versus API code interface"
  },
  {
    id: 38,
    title: "Why AI Agents Need Their Own Task Management System",
    excerpt: "Your AI agents forget everything between sessions. Discover how persistent task management transforms agent productivity with 10x output gains.",
    date: "2026-03-26",
    readTime: "7 min",
    tags: ["AI Agents", "Task Management", "Productivity", "Privacy", "Automation"],
    slug: "privacy-first-development-building-user-trust-in-2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    imageAlt: "AI agents managing tasks in a persistent queue system"
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlogsView",
  __ssrInlineRender: true,
  setup(__props) {
    const activeCategory = ref("ALL");
    const allTags = computed(() => {
      const tags = /* @__PURE__ */ new Set();
      blogMetadata.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
      return ["ALL", ...Array.from(tags).slice(0, 8)];
    });
    const filteredPosts = computed(() => {
      if (activeCategory.value === "ALL") return blogMetadata;
      return blogMetadata.filter((post) => post.tags.includes(activeCategory.value));
    });
    const formatDate = (dateString) => {
      const d = new Date(dateString);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = String(d.getFullYear()).slice(2);
      return `${day}.${month}.${year}`;
    };
    const formatReadTime = (readTime) => {
      const mins = readTime.replace(/\s*min.*/, "");
      return mins;
    };
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Formatho Blog",
            description: "Developer guides, tutorials, and insights from the Formatho team",
            url: "https://formatho.com/blogs",
            publisher: {
              "@type": "Organization",
              name: "Formatho",
              url: "https://formatho.com"
            },
            blogPost: blogMetadata.slice(0, 10).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.date,
              url: `https://formatho.com/blogs/${post.slug}`
            }))
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen overflow-x-hidden" }, _attrs))} data-v-474602e4><section class="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] border-b border-foreground/10" data-v-474602e4><div class="flex flex-col justify-end p-8 md:p-16" data-v-474602e4><p class="text-xs font-medium tracking-widest text-muted-foreground mb-6" data-v-474602e4> VOL. 01 — APR 2026 </p><h1 class="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8" data-v-474602e4> BLOG </h1><p class="text-muted-foreground max-w-md leading-relaxed" data-v-474602e4> Developer guides, tutorials, and insights from the Formatho team. No fluff. Pure signal. </p></div><div class="relative min-h-[300px] md:min-h-0" data-v-474602e4><div class="absolute inset-0 bg-foreground/5 filter grayscale contrast-125" data-v-474602e4>`);
      if (unref(blogMetadata)[0]?.image) {
        _push(`<img${ssrRenderAttr("src", unref(blogMetadata)[0].image)}${ssrRenderAttr("alt", unref(blogMetadata)[0].imageAlt || unref(blogMetadata)[0].title)} class="w-full h-full object-cover grayscale" loading="eager" data-v-474602e4>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><nav class="sticky top-0 z-30 bg-background border-b border-foreground/10" data-v-474602e4><div class="container mx-auto px-4 md:px-8" data-v-474602e4><div class="flex items-center gap-8 overflow-x-auto py-4 no-scrollbar" data-v-474602e4><!--[-->`);
      ssrRenderList(allTags.value, (tag) => {
        _push(`<button class="${ssrRenderClass([activeCategory.value === tag ? "text-foreground font-bold border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground line-through decoration-foreground/20", "text-xs tracking-widest uppercase whitespace-nowrap transition-all pb-1"])}" data-v-474602e4>${ssrInterpolate(tag)}</button>`);
      });
      _push(`<!--]--></div></div></nav><section class="container mx-auto px-4 md:px-8 py-0" data-v-474602e4>`);
      if (filteredPosts.value.length === 0) {
        _push(`<div class="text-center py-24" data-v-474602e4><p class="text-muted-foreground text-xs tracking-widest uppercase" data-v-474602e4>No posts found</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(filteredPosts.value, (post) => {
        _push(ssrRenderComponent(unref(RouterLink), {
          key: post.id,
          to: `/blogs/${post.slug}`,
          class: "group block border-b border-foreground/10"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 items-center" data-v-474602e4${_scopeId}><div class="md:col-span-2" data-v-474602e4${_scopeId}><p class="text-lg md:text-xl font-bold tracking-tight text-muted-foreground" data-v-474602e4${_scopeId}>${ssrInterpolate(formatDate(post.date))}</p></div><div class="md:col-span-7" data-v-474602e4${_scopeId}><h2 class="text-2xl md:text-4xl font-black tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-200" data-v-474602e4${_scopeId}>${ssrInterpolate(post.title)} <span class="inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2" data-v-474602e4${_scopeId}>→</span></h2><p class="text-xs tracking-widest text-muted-foreground mt-3 uppercase" data-v-474602e4${_scopeId}> [ MINUTE READ : ${ssrInterpolate(formatReadTime(post.readTime))} ]`);
              if (post.tags.length) {
                _push2(`<!--[--> [ TAG : ${ssrInterpolate(post.tags[0])} ]<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</p></div><div class="md:col-span-3 flex justify-end" data-v-474602e4${_scopeId}><div class="w-20 h-20 md:w-24 md:h-24 aspect-square overflow-hidden" data-v-474602e4${_scopeId}>`);
              if (post.image) {
                _push2(`<img${ssrRenderAttr("src", post.image)}${ssrRenderAttr("alt", post.imageAlt || post.title)} class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" data-v-474602e4${_scopeId}>`);
              } else {
                _push2(`<div class="w-full h-full bg-foreground/5 grayscale" data-v-474602e4${_scopeId}></div>`);
              }
              _push2(`</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 items-center" }, [
                  createVNode("div", { class: "md:col-span-2" }, [
                    createVNode("p", { class: "text-lg md:text-xl font-bold tracking-tight text-muted-foreground" }, toDisplayString(formatDate(post.date)), 1)
                  ]),
                  createVNode("div", { class: "md:col-span-7" }, [
                    createVNode("h2", { class: "text-2xl md:text-4xl font-black tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-200" }, [
                      createTextVNode(toDisplayString(post.title) + " ", 1),
                      createVNode("span", { class: "inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2" }, "→")
                    ]),
                    createVNode("p", { class: "text-xs tracking-widest text-muted-foreground mt-3 uppercase" }, [
                      createTextVNode(" [ MINUTE READ : " + toDisplayString(formatReadTime(post.readTime)) + " ]", 1),
                      post.tags.length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode(" [ TAG : " + toDisplayString(post.tags[0]) + " ]", 1)
                      ], 64)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "md:col-span-3 flex justify-end" }, [
                    createVNode("div", { class: "w-20 h-20 md:w-24 md:h-24 aspect-square overflow-hidden" }, [
                      post.image ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: post.image,
                        alt: post.imageAlt || post.title,
                        class: "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500",
                        loading: "lazy"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "w-full h-full bg-foreground/5 grayscale"
                      }))
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BlogsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BlogsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-474602e4"]]);
export {
  BlogsView as default
};
