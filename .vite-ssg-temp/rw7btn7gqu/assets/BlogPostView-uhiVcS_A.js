import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useRoute, RouterLink } from "vue-router";
import { useHead } from "@vueuse/head";
import { ArrowLeft } from "lucide-vue-next";
import { b as blogPosts, E as EmailCapture, _ as _export_sfc } from "../main.mjs";
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
const siteName = "Formatho";
const baseUrl = "https://formatho.com/tools";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlogPostView",
  __ssrInlineRender: true,
  props: {
    slug: {}
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const slug = computed(() => {
      if (route.meta?.slug) return route.meta.slug;
      if (props.slug) return props.slug;
      if (route.params.slug) return route.params.slug;
      if (route.name && typeof route.name === "string" && route.name.startsWith("blog-post-")) {
        return route.name.replace("blog-post-", "");
      }
      if (route.path) {
        const pathParts = route.path.split("/").filter(Boolean);
        if (pathParts.length >= 2 && pathParts[0] === "blogs") {
          return pathParts.slice(1).join("/");
        }
      }
      return "";
    });
    const post = computed(() => {
      if (route.meta?.postData) {
        return route.meta.postData;
      }
      return blogPosts.find((p) => p.slug === slug.value);
    });
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    useHead(computed(() => {
      if (!post.value) {
        return {
          title: "Article Not Found - Formatho",
          meta: [
            { name: "description", content: "The requested article could not be found." }
          ]
        };
      }
      const fullTitle = `${post.value.title} - ${siteName}`;
      const url = `${baseUrl}/blogs/${post.value.slug}`;
      const image = post.value.image ? post.value.image.startsWith("http") ? post.value.image : `${baseUrl}${post.value.image}` : `${baseUrl}/logo.png`;
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.value.title,
        image,
        datePublished: post.value.date,
        dateModified: post.value.date,
        author: {
          "@type": "Organization",
          name: siteName
        },
        description: post.value.excerpt,
        articleSection: post.value.tags[0] || "Technology",
        url
      };
      return {
        title: fullTitle,
        meta: [
          { name: "title", content: fullTitle },
          { name: "description", content: post.value.excerpt },
          { name: "keywords", content: post.value.tags.join(", ") },
          { property: "og:type", content: "article" },
          { property: "og:url", content: url },
          { property: "og:title", content: fullTitle },
          { property: "og:description", content: post.value.excerpt },
          { property: "og:image", content: image },
          { property: "og:site_name", content: siteName },
          { property: "article:published_time", content: post.value.date },
          { property: "article:tag", content: post.value.tags.join(", ") },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:site", content: "@heyformatho" },
          { name: "twitter:url", content: url },
          { name: "twitter:title", content: fullTitle },
          { name: "twitter:description", content: post.value.excerpt },
          { name: "twitter:image", content: image }
        ],
        link: [
          { rel: "canonical", href: url }
        ],
        script: [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify(articleSchema)
          }
        ]
      };
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen overflow-x-hidden" }, _attrs))} data-v-c36bc3bf><div class="border-b border-foreground/10" data-v-c36bc3bf><div class="container mx-auto px-4 md:px-8 py-4" data-v-c36bc3bf>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/blogs",
        class: "inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-3 h-3" }, null, _parent2, _scopeId));
            _push2(` Back to Index `);
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "w-3 h-3" }),
              createTextVNode(" Back to Index ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (!post.value) {
        _push(`<div class="flex items-center justify-center min-h-[60vh]" data-v-c36bc3bf><div class="text-center" data-v-c36bc3bf><h1 class="text-8xl font-black tracking-tighter leading-none text-foreground/10 mb-4" data-v-c36bc3bf>404</h1><p class="text-xs tracking-widest text-muted-foreground mb-8" data-v-c36bc3bf>ARTICLE NOT FOUND</p>`);
        _push(ssrRenderComponent(unref(RouterLink), {
          to: "/blogs",
          class: "text-xs tracking-widest uppercase text-foreground hover:text-muted-foreground transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Return to Index → `);
            } else {
              return [
                createTextVNode(" Return to Index → ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!--[--><header class="min-h-[50vh] flex flex-col justify-end border-b border-foreground/10" data-v-c36bc3bf><div class="container mx-auto px-4 md:px-8 pb-12 md:pb-20" data-v-c36bc3bf><div class="flex items-center gap-6 mb-8" data-v-c36bc3bf><p class="text-xs tracking-widest text-muted-foreground uppercase" data-v-c36bc3bf>${ssrInterpolate(formatDate(post.value.date))}</p><p class="text-xs tracking-widest text-muted-foreground uppercase" data-v-c36bc3bf>${ssrInterpolate(post.value.readTime)}</p></div><h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none max-w-5xl" data-v-c36bc3bf>${ssrInterpolate(post.value.title)}</h1><div class="flex flex-wrap gap-4 mt-8" data-v-c36bc3bf><!--[-->`);
        ssrRenderList(post.value.tags, (tag) => {
          _push(`<span class="text-xs tracking-widest uppercase text-muted-foreground" data-v-c36bc3bf>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div></header>`);
        if (post.value.image) {
          _push(`<div class="border-b border-foreground/10" data-v-c36bc3bf><div class="container mx-auto px-4 md:px-8 py-8 md:py-12" data-v-c36bc3bf><img${ssrRenderAttr("src", post.value.image)}${ssrRenderAttr("alt", post.value.imageAlt || post.value.title)} class="w-full max-h-[60vh] object-cover grayscale" loading="lazy" data-v-c36bc3bf></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="container mx-auto px-4 md:px-8 py-12 md:py-24" data-v-c36bc3bf><article class="max-w-4xl mx-auto" data-v-c36bc3bf><div class="prose-editorial" data-v-c36bc3bf>${post.value.content ?? ""}</div></article></div><div class="border-t border-foreground/10" data-v-c36bc3bf><div class="container mx-auto px-4 md:px-8 py-12 md:py-20" data-v-c36bc3bf><div class="max-w-4xl mx-auto" data-v-c36bc3bf>`);
        _push(ssrRenderComponent(EmailCapture, {
          source: "blog",
          variant: "card",
          title: "Enjoyed this article?",
          subtitle: "Subscribe to get more tutorials, tips, and developer insights delivered to your inbox.",
          placeholder: "your@email.com",
          buttonText: "Subscribe"
        }, null, _parent));
        _push(`</div></div></div>`);
        if (post.value.cta) {
          _push(`<div class="border-t border-foreground/10" data-v-c36bc3bf><div class="container mx-auto px-4 md:px-8 py-12 md:py-20" data-v-c36bc3bf><div class="max-w-4xl mx-auto" data-v-c36bc3bf><h3 class="text-2xl md:text-3xl font-black tracking-tighter leading-none mb-4" data-v-c36bc3bf>${ssrInterpolate(post.value.cta.title)}</h3><p class="text-muted-foreground leading-relaxed mb-8" data-v-c36bc3bf>${ssrInterpolate(post.value.cta.description)}</p>`);
          if (post.value.cta.link.startsWith("http")) {
            _push(`<a${ssrRenderAttr("href", post.value.cta.link)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-foreground px-8 py-4 text-sm font-medium tracking-widest text-background hover:bg-foreground/90 transition-colors" data-v-c36bc3bf>${ssrInterpolate(post.value.cta.buttonText)} → </a>`);
          } else {
            _push(ssrRenderComponent(unref(RouterLink), {
              to: post.value.cta.link,
              class: "inline-flex items-center justify-center bg-foreground px-8 py-4 text-sm font-medium tracking-widest text-background hover:bg-foreground/90 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(post.value.cta.buttonText)} → `);
                } else {
                  return [
                    createTextVNode(toDisplayString(post.value.cta.buttonText) + " → ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (post.value.relatedTools && post.value.relatedTools.length > 0) {
          _push(`<div class="border-t border-foreground/10" data-v-c36bc3bf><div class="container mx-auto px-4 md:px-8 py-12 md:py-20" data-v-c36bc3bf><p class="text-xs tracking-widest text-muted-foreground mb-8 uppercase" data-v-c36bc3bf>Related Tools</p><div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10" data-v-c36bc3bf><!--[-->`);
          ssrRenderList(post.value.relatedTools.filter((t) => t.link.startsWith("http")), (tool) => {
            _push(`<a${ssrRenderAttr("href", tool.link)} target="_blank" rel="noopener noreferrer" class="block p-8 bg-background hover:bg-muted/50 transition-colors group" data-v-c36bc3bf><h4 class="text-lg font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-200" data-v-c36bc3bf>${ssrInterpolate(tool.name)} <span class="inline-block opacity-0 group-hover:opacity-100 transition-opacity ml-1" data-v-c36bc3bf>→</span></h4><p class="text-sm text-muted-foreground mt-2" data-v-c36bc3bf>${ssrInterpolate(tool.description)}</p></a>`);
          });
          _push(`<!--]--><!--[-->`);
          ssrRenderList(post.value.relatedTools.filter((t) => !t.link.startsWith("http")), (tool) => {
            _push(ssrRenderComponent(unref(RouterLink), {
              key: tool.link,
              to: tool.link,
              class: "block p-8 bg-background hover:bg-muted/50 transition-colors group"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<h4 class="text-lg font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-200" data-v-c36bc3bf${_scopeId}>${ssrInterpolate(tool.name)} <span class="inline-block opacity-0 group-hover:opacity-100 transition-opacity ml-1" data-v-c36bc3bf${_scopeId}>→</span></h4><p class="text-sm text-muted-foreground mt-2" data-v-c36bc3bf${_scopeId}>${ssrInterpolate(tool.description)}</p>`);
                } else {
                  return [
                    createVNode("h4", { class: "text-lg font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-200" }, [
                      createTextVNode(toDisplayString(tool.name) + " ", 1),
                      createVNode("span", { class: "inline-block opacity-0 group-hover:opacity-100 transition-opacity ml-1" }, "→")
                    ]),
                    createVNode("p", { class: "text-sm text-muted-foreground mt-2" }, toDisplayString(tool.description), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="border-t border-foreground/10" data-v-c36bc3bf><div class="container mx-auto px-4 md:px-8 py-8" data-v-c36bc3bf>`);
        _push(ssrRenderComponent(unref(RouterLink), {
          to: "/blogs",
          class: "inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-3 h-3" }, null, _parent2, _scopeId));
              _push2(` Back to Index `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "w-3 h-3" }),
                createTextVNode(" Back to Index ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BlogPostView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BlogPostView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c36bc3bf"]]);
export {
  BlogPostView as default
};
