---
description: Generate EN+ES portfolio project markdown from README/CLAUDE/dir input
argument-hint: <path-to-readme-or-project-dir>
model: sonnet
---

# Add Project

Generate two markdown files for the portfolio site from a source input.

**Input:** `$ARGUMENTS` — path to a `README.md`, `CLAUDE.md`, any descriptive markdown file, or a project directory.

**Output:** Two files following the project content schema:
- `src/content/projects/en/<slug>.md`
- `src/content/projects/es/<slug>.md`

## Steps

### 1. Resolve input

If `$ARGUMENTS` is a directory:
- Look for `README.md`, then `CLAUDE.md`, then any top-level `.md`. Use the first found as the primary descriptive source.
- Optionally read `package.json` / `Cargo.toml` / `pyproject.toml` for name, description, and dependency list (useful for `tags`).
- Try `git -C <dir> remote get-url origin` to derive the GitHub URL.

If `$ARGUMENTS` is a file: read it directly. Treat the parent dir as the project root and still attempt the manifest/git lookups above.

If the path is invalid, stop and report the issue.

### 2. Extract project metadata

From the input(s), determine:

| Field | How |
|---|---|
| `title` | Project name (manifest > top H1 > directory name). Title-case it. |
| `slug` | Lowercase, hyphenated, ASCII-only version of the title. Use existing dir name if it already matches that shape. |
| `description` | One-sentence pitch (≤ ~180 chars). Synthesize from the README intro if no explicit tagline exists. |
| `date` | Today's date in `YYYY-MM-DD`. Use the `currentDate` from system context if available. |
| `tags` | 3–7 relevant items: primary language, frameworks, notable libs, domain (e.g., "CLI", "Web App", "API"). Pull from manifest deps and README content. |
| `github` | Origin URL if it points to GitHub; otherwise omit. |
| `url` | Live demo / production URL if mentioned in the README; otherwise omit. |
| `featured` | Always `false`. The user edits this manually. |
| `images` | See step 3. |

### 3. Auto-scan images

Working dir is the portfolio repo root. Look in `public/projects/`:

1. If `public/projects/<slug>/` exists → list every `.webp`/`.png`/`.jpg`/`.jpeg` inside (sorted by name) and emit them as `"<slug>/<file>"`.
2. Else if `public/projects/<slug>.webp` (or `.png`/`.jpg`/`.jpeg`) exists → emit a single-element array with that filename.
3. Else → emit `images: []` and tell the user no images were found so they can drop assets into `public/projects/<slug>/` and rerun (or hand-edit later).

Use `Bash` (`ls public/projects/<slug>/` or `ls public/projects/ | grep <slug>`) for the lookup — do not invent filenames.

### 4. Write the English file

Path: `src/content/projects/en/<slug>.md`.

Frontmatter shape (match existing files like `aella.md`):

```yaml
---
title: "<Title>"
description: "<one-sentence pitch>"
date: YYYY-MM-DD
featured: false
tags: ["Tag1", "Tag2", "Tag3"]
github: "https://github.com/..."   # omit line entirely if unknown
url: "https://..."                  # omit line entirely if unknown
images: ["<slug>/foo.webp", "..."]  # or [] if none found
lang: "en"
---
```

Body sections (in this order, all `##` headings):

1. **Project Overview** — 2 paragraphs introducing what it is and the angle that makes it interesting.
2. **The Problem It Solves** — concrete user pain and the workflow / scenario the project addresses. Include a short code/CLI example block when the source supports it.
3. **Key Features** — bulleted list (6–10 bullets). Use `**Bold Label**: explanation`.
4. **Technologies Used** — bulleted list grouping by role (Language, Framework, DB, Runtime, Tooling…). Pull versions from manifests when available.
5. Optional 1–2 sections for domain-specific deep dives (e.g., "CLI Capabilities", "Desktop App Features", "API Endpoints", "Architecture") — only when the source has enough material. Skip rather than pad.
6. **Getting Started** — a fenced bash block with clone + install + run commands.
7. **Results** — bulleted list of outcomes / benefits / what the project achieves.

Tone: confident, technical, first-person-singular about the dev's motivation when natural. Match the voice of `aella.md`.

### 5. Write the Spanish file

Path: `src/content/projects/es/<slug>.md`.

Translate the English file to natural Latin-American Spanish. Rules:

- Translate `description` and all body prose, including section headings (`Project Overview` → `Descripción del Proyecto`, `Key Features` → `Características Clave`, `Technologies Used` → `Tecnologías Utilizadas`, `Getting Started` → `Empezando`, `Results` → `Resultados`, etc.). Match the heading style used in `src/content/projects/es/aella.md`.
- Keep `title` identical unless the project name itself has a localized form.
- Keep `date`, `featured`, `github`, `url`, `images` identical.
- Set `lang: "es"`.
- Tags: keep technology proper nouns in English (`Rust`, `Astro`, `React`, `Vercel`, `Tokio`…). Translate descriptive/domain tags (`Grammar Checker` → `Corrector Gramatical`, `Web App` → `App Web`, `Desktop App` → `App de Escritorio`).
- Preserve all code blocks verbatim. Translate code comments inside them. Translate output strings only when they're illustrative prose (e.g., `# Salida: ...`); leave actual command flags and identifiers untouched.
- Preserve link URLs and Markdown structure.

### 6. Confirm

After writing both files, report:

- The two file paths created.
- The chosen slug, tags, and image count.
- Any fields the user should review (especially `featured`, `description`, missing `url`/`github`, empty `images`).
- A reminder that the project will appear automatically on `/en/projects` and `/es/projects` once the dev server reloads, and that pinned/featured projects are controlled in `src/components/Projects.astro`.

## Notes

- Never overwrite an existing file without telling the user first. If `src/content/projects/en/<slug>.md` already exists, stop and ask.
- Don't invent GitHub/URL values. Leave the field omitted when unknown.
- Don't pad sections with filler. Short, real content > long, generic content.
- Don't add HTML — pure Markdown only, matching existing files.
