# CLAUDE.md

ARKye03 portfolio — multilingual Astro, EN+ES, Vercel SSG.

## Development Commands

```bash
# Development server with hot reload
pnpm dev

# Background dev server (Astro 7) — agent-friendly, returns URL+PID then exits
pnpm astro dev --background    # start (idempotent; lockfile blocks duplicates)
pnpm astro dev status          # is it running?
pnpm astro dev logs --follow   # tail output
pnpm astro dev stop            # terminate

# Production build (outputs to /dist)
pnpm build

# Preview production build locally
pnpm preview

# Lint (eslint .)
pnpm lint

# Type check (astro check)
pnpm check

# Format (prettier . --write)
pnpm fmt

# Direct Astro CLI access
pnpm astro [command]
```

**Background dev (Astro 7)**: AI agent run → agent-detection auto-enables `--background` + JSON logging, no flag. Health endpoint `/_astro/status` → `{"ok":true}` for readiness poll. JSON logs via `--json` or `logger: logHandlers.json()` in `astro.config.mjs`. All `astro dev` subcommands idempotent (stop-when-stopped / start-when-running succeed quiet).

## Architecture Overview

### Routing Strategy

File-based, lang-first:

- **Localized routes**: `/src/pages/[lang]/*.astro` — lang-scoped
- **Dynamic routes**: `/src/pages/[lang]/projects/[slug].astro` — project detail
- **API routes**: `/src/pages/api/*.ts` — server endpoint (prerender: false)
- **404**: `/src/pages/404.astro` — top-level fallback

Both langs prefixed (`/en/*`, `/es/*`). Root `/` → Vercel edge redirect — see "Root Redirect & Lang Persistence".

### I18n System

Manual i18n, static gen per lang:

**Config** (`astro.config.mjs`):

```javascript
i18n: {
  locales: ["en", "es"],
  defaultLocale: "en",
  routing: { prefixDefaultLocale: true }
}
```

**Key files**:

- `/src/i18n/ui.ts` — translation dict by feature; exports `languages`, `defaultLang`, `ui` keyed by locale
- `/src/i18n/utils.ts` — helpers:
  - `getLangFromUrl(url)` — extract lang from URL
  - `useTranslations(lang)` — get t() w/ fallback
  - `getAlternateLangUrl(url, targetLang)` — gen lang-switch URLs

**Usage**:

```astro
---
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t("page.home.title")}</h1>
```

All lang-aware routes need `getStaticPaths()` per lang.

### Root Redirect & Lang Persistence

Root (`/`) → Vercel edge via `vercel.json` (no `src/pages/index.astro`). Four-tier match, first wins:

1. **Cookie `lang=es`** → `/es/`
2. **Cookie `lang=en`** → `/en/`
3. **`Accept-Language` starts with `es`** (regex `^es(-[A-Z]{2})?(,.*)?$`) → `/es/`
4. **Fallback** → `/en/`

All redirects 307 (`permanent: false`) — detection stays tweakable, no burned cache.

**Cookie write**: `Header.astro` inline script writes `lang=<current>; max-age=1y; samesite=lax; path=/` on lang-prefixed routes only, lang from `Astro.props.lang`. Covers direct nav, deep links, switcher clicks — one mechanism, no event listener. Guard matters: 404 prerenders as `en`; unguarded write clobbers `lang=es` before 404 ES-swap script reads it.

**Caveats**:

- `pnpm preview` ignores `vercel.json` — `/` 404s local preview only. Use `pnpm dev` for full flow or test post-deploy.
- View transitions: inline script re-runs per page since `<ClientRouter>` re-executes inline scripts. If `transition:persist` added to Header later, swap to `astro:page-load` listener.
- Verify post-deploy: `curl -I -H "Accept-Language: es-ES" https://<host>/` → 307 to `/es/`; with `--cookie "lang=en"` → 307 to `/en/`.

### Content Collections

Markdown w/ schema validation:

**Schema** (`/src/content.config.ts`):

- Collection: `projects` (`glob` loader on `src/content/projects/**/*.md`)
- Fields: title, description, images, tags, url, github, featured, date, lang
- Content by lang: `/src/content/projects/en/` and `/src/content/projects/es/`

**Usage**:

- Query: `getCollection("projects")`, filter by lang (entries content-layer; `project.id` is `<lang>/<slug>`)
- Render: `import { render } from "astro:content"` → `const { Content } = await render(project)`
- Images in `/src/assets/projects/<slug>/`, relative paths in frontmatter `images:`. Schema uses `image()` from `astro:content` → Sharp pipeline, ImportMetadata at render.

### Component Architecture

- **Layout** — `/src/layouts/Layout.astro` base HTML wrapper (Header/Footer, ClientRouter, fonts).
- **Components** — `/src/components/*.astro` page sections (Header, Hero, Projects, ProjectCard, Philosophy, Journey, Skills, CallToAction, Footer, AboutHero). List drifts; `ls src/components` for current set.

All components receive/derive `lang`, call `useTranslations(lang)` for copy.

### Styling System

**Tailwind CSS v4** + **DaisyUI 5**, custom theming:

- Via `@tailwindcss/vite` plugin
- Global CSS: `/src/styles/global.css`
- OKLch color space
- Dark mode via `prefers-color-scheme` (CSS-only, no JS toggle)
- Two DaisyUI themes: `catppuccin` (light default), `catppuccin-dark` (dark, prefersdark)
- Catppuccin Mauve primary both themes
- Fonts: built-in Fonts API (`fontProviders.google()` in `astro.config.mjs`) — Space Grotesk → `--font-display`, DM Sans → `--font-body`, JetBrains Mono → `--font-mono`. No external `<link>` tags; Astro handles preload + self-hosting.
- Mobile-first, container queries (`@container`)
- DaisyUI component classes (`btn`, `input`, `textarea`, etc.)
- Icons: **astro-icon** w/ local SVGs in `src/icons/`, **NO inline SVG**

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
- `@i18n/*` → `./src/i18n/*`

### API Endpoints

Single server endpoint: `/api/contact` (POST)

**Config**:

```typescript
export const prerender = false; // Required for server routes
```

**Functionality**:

- Validates form data (name, email, subject, message): required, email format, length caps
- Honeypot field `website` — bots that fill it get fake `success: true`
- HTML-escapes all user input before email interpolation
- Sends email via Resend (`RESEND_API_KEY` required; lazy-init in handler)
- `CONTACT_FROM` / `CONTACT_TO` env vars override sender/recipient (defaults: `onboarding@resend.dev` / `rafa03-dev@proton.me`)
- Returns JSON; errors i18n codes (`missing_fields`, `invalid_email`, `too_long`, `send_failed`, `server_error`) mapped to translations client-side via `data-msg-*` attrs
- Client-side AJAX w/ status messages

### Build & Deployment

**Build config**:

- Output: `static` (full SSG)
- Adapter: Vercel (`@astrojs/vercel`)
- All routes pre-rendered except API
- Images optimized w/ Sharp

**Deployment**:

- Platform: Vercel
- Env vars: `RESEND_API_KEY` (contact form, required), `CONTACT_FROM`/`CONTACT_TO` (optional sender/recipient overrides)
- Asset cache: 1yr for `/_astro/*`
- SEO: `site` set in `astro.config.mjs`, `@astrojs/sitemap` (i18n-aware) → `/sitemap-index.xml`, `public/robots.txt`, canonical + hreflang + OG/Twitter meta in `Layout.astro` (hreflang only on lang-prefixed routes)
- 404 prerenders as EN; inline script swaps to ES via `data-i18n` attrs when path starts `/es` or cookie `lang=es`

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
5. Add keys to `/src/i18n/ui.ts` both langs

### Adding New Projects

1. Create markdown in `/src/content/projects/en/` and `/src/content/projects/es/`
2. Schema: title, description, date, tags, images (optional), url (optional), github (optional), featured (boolean), lang
3. Images in `/src/assets/projects/[project-name]/`; frontmatter `images:` = array of relative paths (e.g. `../../../assets/projects/<slug>/main.webp`) — `image()` schema processes via Sharp
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

- **Framework**: Astro 7.0.2 (SSG, built-in Fonts API, Vite 8, Sätteri Markdown)
- **Styling**: Tailwind CSS 4.3.1 (Vite plugin) + DaisyUI 5.5.19
- **Email**: Resend 6.12.2
- **Image Processing**: Sharp 0.34.5
- **Icons**: astro-icon 1.1.5 (local SVGs in `src/icons/`)
- **Deployment**: Vercel (`@astrojs/vercel` 11.0.0)
- **Package Manager**: pnpm