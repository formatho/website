# Component Pattern

Where components live and how they're built. Companion to `CSS.md` (styling) — this file covers structure.

## Directory rules

| Location | Purpose |
|---|---|
| `src/components/ui/*` | Primitives (button, card, input, tabs, copy-button…). One folder per primitive with `index.ts`. Extend this kit instead of forking markup |
| `src/components/*.vue` | Shared app components used by 2+ views (Navbar, Footer, ToolSEOContent, GlobalSearchModal…) |
| `src/components/<feature>/` | Component families for one feature (e.g. `ab-test/`). Delete the folder when the feature dies |
| `src/views/**` | Route pages only — never importable components |
| `src/layouts/` | Layout shells |

Nothing component-shaped lives anywhere else. A component with **zero imports is deleted**, not archived.

## Rules

1. **Primitives over forks.** Need tabs → `ui/tabs`; a copy button → `ui/copy-button`; a card → `ui/card`. Never hand-roll `role="tablist"` markup or `navigator.clipboard` handlers in a view again — the copy logic and icon-swap behavior live in `CopyButton` exactly once.
2. **Clipboard copying**: use `<CopyButton :text="value" variant="ghost" aria-label="…" />`. Pass a function (`:text="() => computeLazy()"`) when the value is expensive or stateful at click time.
3. **Dead components are deleted at discovery** — `grep -rl "<Name>" src/ | grep -v components/<Name>` returning nothing means remove it.
4. **New shared component checklist**: goes in `src/components/`, props typed with `defineProps<{…}>`, no scoped CSS unless classes can't express it (see `CSS.md`), no router imports inside `ui/` primitives.
5. **Views contain page logic and layout composition only.** If a view grows a reusable widget (used elsewhere or >100 lines of presentation), extract it down into `src/components/`.

## Enforcement

- `grep -rn 'role="tablist"' src/views/` must return nothing — tab UIs come from `ui/tabs`.
- `grep -rln 'navigator.clipboard' src/views/` lists views still carrying legacy copy implementations — each is converted to `CopyButton` the next time that view is touched (boy-scout rule). The list shrinks monotonically; do not add to it.
- `grep -rn "components/team\|TeamInvitationModal\|SocialProofStats" src/` must return nothing (deleted families stay deleted).
