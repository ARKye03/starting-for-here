# CLAUDE.md

ARKye03 portfolio — multilingual Astro, EN+ES, Vercel SSG.

## Development Commands

```bash
# Development server with hot reload
pnpm dev

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

## Architecture Overview

### Routing Strategy

File-based, lang-first:

- **Localized routes**: `/src/pages/[lang]/*.astro` — lang-scoped
- **Dynamic routes**: `/src/pages/[lang]/projects/[slug].astro` — project details
- **API routes**: `/src/pages/api/*.ts` — server endpoints (prerender: false)
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

All redirects 307 (`permanent: false`) — keeps detection tweakable, no burned cache.

**Cookie write**: `Header.astro` inline script writes `lang=<current>; max-age=1y; samesite=lax; path=/` on every page load, deriving lang from `Astro.props.lang`. Covers direct nav, deep links, switcher clicks — one mechanism, no event listener.

**Caveats**:

- `pnpm preview` ignores `vercel.json` — `/` 404s in local preview only. Use `pnpm dev` for full flow or test post-deploy.
- View transitions: inline script re-runs per page since `<ClientRouter>` re-executes inline scripts. If `transition:persist` added to Header later, swap to `astro:page-load` listener.
- Verify post-deploy: `curl -I -H "Accept-Language: es-ES" https://<host>/` → 307 to `/es/`; with `--cookie "lang=en"` → 307 to `/en/`.

### Content Collections

Markdown w/ schema validation:

**Schema** (`/src/content.config.ts`):

- Collection: `projects` (`glob` loader on `src/content/projects/**/*.md`)
- Fields: title, description, images, tags, url, github, featured, date, lang
- Content by lang: `/src/content/projects/en/` and `/src/content/projects/es/`

**Usage**:

- Query: `getCollection("projects")`, filter by lang
- Render: `const { Content } = await project.render()`
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
- Catppuccin Mauve as primary both themes
- Fonts: Astro 6 built-in Fonts API (`fontProviders.google()` in `astro.config.mjs`) — Space Grotesk → `--font-display`, DM Sans → `--font-body`, JetBrains Mono → `--font-mono`. No external `<link>` tags; Astro handles preload + self-hosting.
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
- `@lib/*` → `./src/lib/*`
- `@i18n/*` → `./src/i18n/*`

### API Endpoints

Single server endpoint: `/api/contact` (POST)

**Config**:

```typescript
export const prerender = false; // Required for server routes
```

**Functionality**:

- Validates form data (name, email, subject, message)
- Sends email via Resend (`RESEND_API_KEY` env var required)
- Returns JSON success/error
- Client-side AJAX w/ status messages

### Build & Deployment

**Build config**:

- Output: `static` (full SSG)
- Adapter: Vercel (`@astrojs/vercel`)
- All routes pre-rendered except API
- Images optimized w/ Sharp

**Deployment**:

- Platform: Vercel
- Env var: `RESEND_API_KEY` (contact form)
- Asset cache: 1yr for `/_astro/*`

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

- **Framework**: Astro 6.2.1 (SSG, built-in Fonts API)
- **Styling**: Tailwind CSS 4.2.4 (Vite plugin) + DaisyUI 5.5.19
- **Email**: Resend 6.12.2
- **Image Processing**: Sharp 0.34.5
- **Icons**: astro-icon 1.1.5 (local SVGs in `src/icons/`)
- **Deployment**: Vercel (`@astrojs/vercel` 10.0.6)
- **Package Manager**: pnpm