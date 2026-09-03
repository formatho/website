# CSS & Styling Pattern

This is the strict, single pattern for where styles live. Follow it in every change.

## The four layers (and the only four)

| Layer | Lives in | What goes there |
|---|---|---|
| 1. Design tokens & globals | `src/style.css` | CSS variables (`--background`, `--primary`, …), `body`/`#app`/element defaults, shared keyframes, cross-page custom classes (`.glass-card`) |
| 2. Theme mapping | `tailwind.config.js` | Token→utility wiring, fonts, plugins. Never hardcode colors here that exist as tokens |
| 3. Component styles | One `<style scoped>` block at the **end** of the component's `.vue` file | Anything used only by that component. Maximum **one block per file** |
| 4. Utility classes | Inline `class="…"` in templates | The default for layout/spacing/typography — Tailwind utilities, including arbitrary values (`max-h-[70vh]`) |

## Rules

1. **No unscoped `<style>` in any view or component.** The only global stylesheet is `src/style.css`. (History: an unscoped block in `App.vue` silently overrode the body font and background site-wide.)
2. **Third-party injected DOM** (bpmn-js, chart.js internals) is styled with `:deep(.vendor-class)` **inside the scoped block** — never with an unscoped block:
   ```vue
   <style scoped>
   :deep(.djs-container) { font-family: inherit !important; }
   </style>
   ```
3. **No static `style="…"` attributes** in templates. Convert to Tailwind classes (`style="max-height:400px"` → `class="max-h-[400px]"`). When editing an element that already has a `class`, merge — never write a second `class` attribute.
4. **`:style` bindings are allowed only for genuinely dynamic values** computed at runtime (zoom percentage, data-driven colors, chart heights from props). If the value is a constant, it must be a class.
5. **Inline styles inside markdown content strings** (marketing copy in `faq-data.js`, blog bodies) are content, not chrome — they are exempt, but keep them minimal and repeated patterns should become a class in `src/style.css` instead.
6. **Keyframes**: single-component animations live in that component's scoped block; anything used by 2+ components moves to `src/style.css`.
7. **When adding a new tool view**, it needs no stylesheet at all in almost every case — the UI kit (`src/components/ui/*`) plus Tailwind classes cover it. Add a scoped block only for what classes can't express.

## Enforcement

- `grep -rn '<style>' src/ --include='*.vue'` must return nothing (every block is `<style scoped>`).
- `grep -rn 'style="' src/views/ src/components/ | grep -v ':style'` should only match markdown-content exemptions.
