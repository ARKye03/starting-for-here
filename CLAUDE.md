# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ARKye03's Portfolio - A multilingual Astro-based portfolio site with English and Spanish support, deployed on Vercel. Built with static site generation for maximum performance.

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

File-based routing with language-first architecture:

- **Root routes**: `/src/pages/*.astro` - Top-level pages (index redirects to /en)
- **Localized routes**: `/src/pages/[lang]/*.astro` - Language-scoped pages
- **Dynamic routes**: `/src/pages/[lang]/projects/[slug].astro` - Project details
- **API routes**: `/src/pages/api/*.ts` - Server endpoints (prerender: false)

Default language (en) has no URL prefix. Spanish uses `/es` prefix.

### I18n System

Manual internationalization with static generation per language:

**Configuration** (`astro.config.mjs`):

```javascript
i18n: {
  locales: ["en", "es"],
  defaultLocale: "en",
  routing: { prefixDefaultLocale: false }
}
```

**Key files**:

- `/src/i18n/ui.ts` - Translation dictionary (100+ keys organized by feature)
- `/src/i18n/utils.ts` - Helper functions:
  - `getLangFromUrl(url)` - Extract language from URL
  - `useTranslations(lang)` - Get translation function with fallback
  - `getAlternateLangUrl(url, targetLang)` - Generate language-switched URLs

**Usage pattern**:

```astro
---
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t("page.home.title")}</h1>
```

All language-aware routes must use `getStaticPaths()` to generate pages per language.

### Content Collections

Markdown-based content system with schema validation:

**Schema** (`/src/content/config.ts`):

- Collection: `projects`
- Fields: title, description, images, tags, url, github, featured, date, lang
- Content organized by language: `/src/content/projects/en/` and `/src/content/projects/es/`

**Usage**:

- Query with `getCollection("projects")` and filter by language
- Render markdown with `const { Content } = await project.render()`
- Images stored in `/public/projects/` and referenced relatively in frontmatter

### Component Architecture

10 reusable Astro components in `/src/components/`:

- **Layout.astro** - Base HTML wrapper with Header/Footer
- **Header.astro** - Sticky navigation with language switcher
- **Hero.astro** - Homepage banner
- **Projects.astro** - Featured projects grid (pins 3 by slug)
- **ProjectCard.astro** - Project thumbnail with hover effects
- **Philosophy.astro** - About page biography section
- **Journey.astro** - About page timeline
- **Skills.astro** - About page skills showcase
- **CallToAction.astro** - CTA section
- **Footer.astro** - Global footer with social links

All components extract language from URL and use translation helpers.

### Styling System

**Tailwind CSS v4** with custom theming:

- Integrated via `@tailwindcss/vite` plugin
- Global CSS: `/src/styles/global.css`
- Color system uses OKLch color space for precise theming
- Dark mode as default with Catppuccin Mauve (#8839ef) as primary color
- Design tokens: Montserrat (sans), Georgia (serif), Fira Code (mono)
- Responsive: mobile-first with container queries (`@container`)
- Components: uses shadcn ui with catppuccin theme
- Icons: uses lucide icons

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
- Sends email via Resend service (requires `RESEND_API_KEY` env var)
- Returns JSON response with success/error status
- Client-side AJAX submission with status messages

### Build & Deployment

**Build configuration**:

- Output: `static` (full SSG)
- Adapter: Vercel (`@astrojs/vercel`)
- All routes pre-rendered except API endpoints
- Images optimized with Sharp

**Deployment**:

- Platform: Vercel
- Environment variable: `RESEND_API_KEY` (contact form)
- Asset caching: 1 year for `/_astro/*` files

## Important Patterns

### Adding New Pages

1. Create file in `/src/pages/[lang]/your-page.astro`
2. Implement `getStaticPaths()` to generate per language:

   ```javascript
   export async function getStaticPaths() {
     return Object.keys(languages).map((lang) => ({
       params: { lang },
     }));
   }
   ```

3. Extract language: `const lang = getLangFromUrl(Astro.url);`
4. Use translations: `const t = useTranslations(lang);`
5. Add translations to `/src/i18n/ui.ts` for both languages

### Adding New Projects

1. Create markdown files in `/src/content/projects/en/` and `/src/content/projects/es/`
2. Follow schema: title, description, date, tags, images (optional), url (optional), github (optional), featured (boolean), lang
3. Add images to `/public/projects/[project-name]/`
4. Projects auto-appear in listing, sorted by date descending

### Modifying Translations

Edit `/src/i18n/ui.ts` - translations organized by feature:

- Navigation: `nav.*`
- Pages: `page.[pagename].*`
- Common: `common.*`
- Projects: `projects.*`
- Contact: `contact.*`

Always update both `en` and `es` dictionaries.

### View Transitions

Pages use Astro's `<ClientRouter>` for SPA-like navigation. Use `transition:name` directives for shared elements across pages.

## Technology Stack

- **Framework**: Astro 5.15.1 (static site generation)
- **Styling**: Tailwind CSS 4.1.14 with Vite plugin
- **Email**: Resend 6.1.2
- **Image Processing**: Sharp 0.34.4
- **Icons**: lucide-react 0.562.0
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Deployment**: Vercel (@astrojs/vercel 9.0.0)
- **Package Manager**: pnpm
