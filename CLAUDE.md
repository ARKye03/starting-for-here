# CLAUDE.md

Guidance for Claude Code (claude.ai/code) in this repo.

## Project Overview

ARKye03's Portfolio — multilingual Astro portfolio, EN+ES, Vercel-deployed. Full SSG for max performance.

## Development Commands

```bash
# Development server with hot reload
pnpm dev

# Production build (outputs to /dist)
pnpm build

# Preview production build locally
pnpm preview

# Direct Astro CLI access
pnpm astro [command]
```

## Architecture Overview

### Routing Strategy

File-based, language-first routing:

- **Localized routes**: `/src/pages/[lang]/*.astro` — language-scoped (all pages live here)
- **Dynamic routes**: `/src/pages/[lang]/projects/[slug].astro` — project details
- **API routes**: `/src/pages/api/*.ts` — server endpoints (prerender: false)
- **404**: `/src/pages/404.astro` — top-level fallback

Both langs prefixed (`/en/*`, `/es/*`). Root `/` redirected at Vercel edge — see "Root Redirect & Lang Persistence" below.

### I18n System

Manual i18n, static generation per language:

**Configuration** (`astro.config.mjs`):

```javascript
i18n: {
  locales: ["en", "es"],
  defaultLocale: "en",
  routing: { prefixDefaultLocale: true }
}
```

**Key files**:

- `/src/i18n/ui.ts` — translation dict (100+ keys by feature)
- `/src/i18n/utils.ts` — helpers:
  - `getLangFromUrl(url)` — extract lang from URL
  - `useTranslations(lang)` — get t() with fallback
  - `getAlternateLangUrl(url, targetLang)` — generate lang-switch URLs

**Usage**:

```astro
---
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t("page.home.title")}</h1>
```

All lang-aware routes need `getStaticPaths()` per language.

### Root Redirect & Lang Persistence

Root (`/`) handled at Vercel edge via `vercel.json` redirects (no `src/pages/index.astro`). Four-tier match order, first match wins:

1. **Cookie `lang=es`** → `/es/`
2. **Cookie `lang=en`** → `/en/`
3. **`Accept-Language` starts with `es`** (regex `^es(-[A-Z]{2})?(,.*)?$`) → `/es/`
4. **Fallback** → `/en/`

All redirects are 307 (`permanent: false`) — keeps detection tweakable without burned cache.

**Cookie write**: `Header.astro` ships an inline script that writes `lang=<current>; max-age=1y; samesite=lax; path=/` on every page load, deriving lang from `Astro.props.lang`. Covers direct nav, deep links, and switcher clicks via one mechanism (no event listener).

**Caveats**:

- `pnpm preview` does not honor `vercel.json` — `/` 404s in local preview only. Use `pnpm dev` for full flow, or test post-deploy.
- View transitions: inline script re-runs per page since `<ClientRouter>` re-executes inline scripts. If `transition:persist` is later added to Header, swap to an `astro:page-load` listener.
- Verify post-deploy: `curl -I -H "Accept-Language: es-ES" https://<host>/` → 307 to `/es/`; with `--cookie "lang=en"` → 307 to `/en/`.

### Content Collections

Markdown content with schema validation:

**Schema** (`/src/content/config.ts`):

- Collection: `projects`
- Fields: title, description, images, tags, url, github, featured, date, lang
- Content by lang: `/src/content/projects/en/` and `/src/content/projects/es/`

**Usage**:

- Query with `getCollection("projects")`, filter by lang
- Render with `const { Content } = await project.render()`
- Images in `/public/projects/`, referenced in frontmatter

### Component Architecture

10 reusable Astro components in `/src/components/`:

- **Layout.astro** — base HTML wrapper with Header/Footer
- **Header.astro** — sticky nav with lang switcher
- **Hero.astro** — homepage banner
- **Projects.astro** — featured projects grid (pins 3 by slug)
- **ProjectCard.astro** — project thumbnail, hover effects
- **Philosophy.astro** — about page bio section
- **Journey.astro** — about page timeline
- **Skills.astro** — about page skills showcase
- **CallToAction.astro** — CTA section
- **Footer.astro** — global footer, social links

All components extract lang from URL, use translation helpers.

### Styling System

**Tailwind CSS v4** + **DaisyUI 5**, custom theming:

- Integrated via `@tailwindcss/vite` plugin
- Global CSS: `/src/styles/global.css`
- OKLch color space
- Dark mode via `prefers-color-scheme` (CSS-only, no JS toggle)
- Two DaisyUI themes: `catppuccin` (light default), `catppuccin-dark` (dark, prefersdark)
- Catppuccin Mauve as primary in both themes
- Fonts: Montserrat (sans), Georgia (serif), Fira Code (mono)
- Mobile-first, container queries (`@container`)
- DaisyUI component classes (`btn`, `input`, `textarea`, etc.)
- Icons: **astro-icon** with local SVGs in `src/icons/`, **NO inline SVG**

**Icon usage**:

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="icon-name" class="h-5 w-5" />
```

Add icons as SVG in `src/icons/`. Name = filename (e.g., `src/icons/mail.svg` → `name="mail"`).

**Button classes** (DaisyUI):

- Primary: `btn btn-primary`
- Secondary: `btn btn-secondary`
- Large: add `btn-lg`

**Path aliases** (tsconfig.json):

- `@assets/*` → `./src/assets/*`
- `@components/*` → `./src/components/*`

### API Endpoints

Single server endpoint: `/api/contact` (POST)

**Configuration**:

```typescript
export const prerender = false; // Required for server routes
```

**Functionality**:

- Validates form data (name, email, subject, message)
- Sends email via Resend (`RESEND_API_KEY` env var required)
- Returns JSON success/error
- Client-side AJAX with status messages

### Build & Deployment

**Build config**:

- Output: `static` (full SSG)
- Adapter: Vercel (`@astrojs/vercel`)
- All routes pre-rendered except API
- Images optimized with Sharp

**Deployment**:

- Platform: Vercel
- Env var: `RESEND_API_KEY` (contact form)
- Asset cache: 1 year for `/_astro/*`

## Important Patterns

### Adding New Pages

1. Create `/src/pages/[lang]/your-page.astro`
2. Implement `getStaticPaths()`:

   ```javascript
   export async function getStaticPaths() {
     return Object.keys(languages).map((lang) => ({
       params: { lang },
     }));
   }
   ```

3. Extract lang: `const lang = getLangFromUrl(Astro.url);`
4. Use translations: `const t = useTranslations(lang);`
5. Add keys to `/src/i18n/ui.ts` for both langs

### Adding New Projects

1. Create markdown in `/src/content/projects/en/` and `/src/content/projects/es/`
2. Schema: title, description, date, tags, images (optional), url (optional), github (optional), featured (boolean), lang
3. Images in `/public/projects/[project-name]/`
4. Auto-appear in listing, sorted by date desc

### Modifying Translations

Edit `/src/i18n/ui.ts` — organized by feature:

- Navigation: `nav.*`
- Pages: `page.[pagename].*`
- Common: `common.*`
- Projects: `projects.*`
- Contact: `contact.*`

Always update both `en` and `es`.

### View Transitions

Pages use Astro's `<ClientRouter>` for SPA-like nav. Use `transition:name` for shared elements across pages.

## Technology Stack

- **Framework**: Astro 6.0.5 (SSG)
- **Styling**: Tailwind CSS 4.1.18 (Vite plugin) + DaisyUI 5.5.19
- **Email**: Resend 6.1.3
- **Image Processing**: Sharp 0.34.4
- **Icons**: astro-icon 1.1.5 (local SVGs in `src/icons/`)
- **Deployment**: Vercel (@astrojs/vercel 10.0.1)
- **Package Manager**: pnpm