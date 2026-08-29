# Contributing to Formatho

## Development Setup

```bash
npm install
npm run dev        # Start dev server
npm run lint       # Check code quality
npm run build      # Build for production
```

## Project Structure

```
src/
  views/           # Page components (one per tool/route)
  components/      # Reusable UI components
  composables/     # Vue composables (useSEO, useABTest, etc.)
  data/            # Static data (tools.ts, routeMeta.ts, evmChains.ts)
  router/          # Route definitions
  layouts/         # App layout (navbar, footer, SEO content)
scripts/           # Build scripts (sitemap, meta injection, IndexNow)
public/            # Static assets (robots.txt, llms.txt, key files)
```

## Adding a New Tool

1. Create `src/views/YourToolView.vue`
2. Add route to `src/router/index.ts` (use absolute path `/tools/your-tool`)
3. Add meta to `src/data/routeMeta.ts` (title, description, keywords)
4. Add entry to `src/data/tools.ts` (name, description, route, icon, category)
5. Add SEO content to `scripts/faq-data.js` (About, How-to, FAQs)

The build pipeline automatically handles: sitemap, structured data,
meta injection, and llms.txt generation.

## Commit Convention

Use conventional commits:

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

## Deployment

- Push to `main` → CI builds and deploys to QA (qa.formatho.com)
- Merge `main` → `prod` → CI builds and deploys to production
- IndexNow auto-pings search engines on prod deploys

## Code Standards

- All tools must be 100% client-side (no server APIs)
- Follow existing patterns in the repo
- Build must pass before pushing (enforced by pre-commit hook)
- Every tool page needs: working tool + About section + How-to + FAQs
