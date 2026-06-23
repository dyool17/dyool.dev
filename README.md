# dyool — personal site, CV, and engineering blog

A static personal site built with [Astro](https://astro.build) and TypeScript.
Content lives in Markdown. The site is designed to be hosted on GitHub Pages
with zero operational cost and a maintenance budget of under two hours per
month.

The structure, principles, and stack come straight from the project's
`prd.md` — read that first if you want context on the trade-offs.

## Stack

- [Astro 5](https://astro.build) — static site generator
- TypeScript (strict) — only for components, config, and utilities
- Markdown — only content format
- `@astrojs/rss` — RSS feed
- `@astrojs/sitemap` — XML sitemap

No database, no backend, no CMS, no Docker required at runtime.

## Local development

```bash
npm install
npm run dev       # start the dev server at http://localhost:4321
npm run check     # type-check .astro and .ts files
npm run build     # produce a production build in ./dist
npm run preview   # preview the production build locally
```

## Project layout

```
src/
  components/        Reusable Astro components (Header, Footer, SEO,
                     LanguageToggle, ThemeToggle)
    home/             Home page body, shared by / and /es/
  content/
    blog/            Blog posts (Markdown, validated by content.config.ts)
      es/             Spanish translations live in a subdirectory
    projects/        Portfolio entries (Markdown, validated by content.config.ts)
  i18n.ts           Locale config, translated UI strings, path helpers
  layouts/           BaseLayout, BlogPostLayout
  pages/             Routes: /, /about, /projects, /blog, /blog/[...slug],
                     /now, /404, /rss.xml
    es/              Mirrored Spanish routes under /es/
  styles/global.css  Design tokens, base typography, light/dark theme
  consts.ts          Site-wide constants (title, URL, social links)
  content.config.ts  Content collection schemas (Zod)
public/              Static assets at the site root (favicon, robots.txt,
                     sitemap.xml, og-default.png)
scripts/             Node utilities (generate-og.mjs regenerates the OG image)
```

## Languages (i18n)

The site is bilingual: English (default) and Spanish. The two locales share
one set of components and one set of routes — language is encoded in the
URL prefix.

### URL shape

| Locale | URL prefix | Example                               |
| ------ | ---------- | ------------------------------------- |
| English | (none)    | `/`, `/about/`, `/blog/some-post/`    |
| Spanish | `/es/`     | `/es/`, `/es/about/`, `/es/blog/some-post/` |

English is canonical. Every Spanish page has a corresponding English page
and vice versa. The two pages for the same content are linked by:

- the `lang` and `translationKey` fields in the post frontmatter (for blog
  posts)
- the URL path (for static pages — `/about/` ↔ `/es/about/`)

### The language switch

The `LanguageToggle` component sits in the header on every page, next to
the theme toggle. It's a segmented control with two links (EN and ES).

- The **active** language is highlighted and is not a link (`aria-current`).
- The **other** language is a real link to the page in that language.
- For blog posts, the switch looks up the counterpart post via
  `translationKey` and links to it.
- If a translation is missing, the switch falls back to the locale's blog
  index (`/es/blog/` for English-only posts, `/blog/` for Spanish-only
  posts).
- The user's explicit choice is stored in `localStorage` under
  `preferred-lang`. On the next visit to a page in the *wrong* language,
  the page redirects to the equivalent URL in the chosen language.

### SEO

- Every page sets `<html lang="…">`, `<meta http-equiv="content-language">`,
  and an `og:locale` (e.g. `en_US`, `es_ES`).
- Every page emits `<link rel="alternate" hreflang="…">` for both
  languages and an `x-default` pointing at the English (canonical) URL.
  When the page is a blog post with a translation, the alternate points
  at the translated post. When there is no translation, the alternate
  points at the locale's blog index.
- The RSS feed has two endpoints: `/rss.xml` (English-only) and
  `/es/rss.xml` (Spanish-only). Each declares its own `<language>`.

## Content authoring

### Blog post

Create a new Markdown file in `src/content/blog/`. The frontmatter is
validated at build time — missing or wrongly-typed fields fail the build,
not the reader.

```markdown
---
title: 'Your post title'
description: 'One-sentence summary used for SEO and RSS.'
pubDate: 2026-06-22
updatedDate: 2026-06-25 # optional
tags: ['backend', 'devops'] # optional, defaults to []
draft: false # optional, defaults to false
lang: 'en' # 'en' (default) or 'es'
translationKey: 'your-post-slug' # optional; required to link a translation
---
```

Drafts are excluded from the build output, the RSS feed, and the sitemap.
Set `draft: true` while you work on a post.

#### Publishing flow (adding a new post)

1. **Create the file.** Pick a slug — lowercase, hyphenated, no accents.
   Put the file at `src/content/blog/<slug>.md`. The URL becomes
   `/blog/<slug>/`.
2. **Fill in the frontmatter.** `title`, `description`, and `pubDate` are
   required. `tags`, `updatedDate`, `draft` are optional. `lang` defaults
   to `en`. Add a `translationKey` if you plan to publish a Spanish
   translation (recommended — the translation key is what links the two
   posts across the language switch).
3. **Write the post** in Markdown below the frontmatter. Standard GFM
   works (headings, lists, code blocks, tables, blockquotes). Code blocks
   are syntax-highlighted by Shiki using the `github-dark-dimmed` theme.
4. **Preview locally** with `npm run dev` and visit
   <http://localhost:4321/blog/> to see it listed, or
   <http://localhost:4321/blog/&lt;slug&gt;/> to read it.
5. **Check the build** with `npm run check && npm run build`. Both must
   pass cleanly.
6. **Commit and push.** The GitHub Actions workflow at
   `.github/workflows/deploy.yml` builds and deploys `./dist` to GitHub
   Pages on every push to `main`. The post goes live as soon as the
   workflow finishes.

There is no admin UI, no CMS, no upload form. "Publishing" a post means
opening a pull request that adds a Markdown file to `src/content/blog/`.
The whole thing is a folder of files, version-controlled, deployable from
any host in under an hour.

#### Translating a post to Spanish

1. Create `src/content/blog/es/<slug>.md` (the same slug as the English
   file, inside the `es/` subdirectory). The URL becomes
   `/es/blog/<slug>/`.
2. Use the same `translationKey` as the English original — that's what
   links them across the language switch.
3. Set `lang: 'es'` and translate the `title`, `description`, and body.
   `pubDate` and `updatedDate` stay the same (the original publication
   dates). The `tags` array can stay the same too, or be translated
   (`['meta', 'escritura', 'backend']` for example).
4. Build, commit, push — same flow as above.

If you don't publish a Spanish translation, the language switch on the
English post still works: clicking ES takes the user to `/es/blog/`,
where they'll see only Spanish posts. Conversely, an untranslated Spanish
post would fall back to `/blog/`.

### Project entry

Create a new Markdown file in `src/content/projects/`. Each entry includes
the problem, the solution, the stack, and the lessons — not just a
screenshot.

```markdown
---
title: 'Project name'
summary: 'One-sentence pitch.'
problem: 'What pain you were solving.'
solution: 'How you solved it.'
technologies: ['Go', 'Postgres']
lessons: ['Lesson one.', 'Lesson two.']
date: 2026-05-10
url: 'https://example.com' # optional
repo: 'https://github.com/x/y' # optional
featured: false # optional
order: 0 # lower numbers sort first
lang: 'en' # optional, defaults to 'en'
translationKey: 'project-slug' # optional, for translated project entries
---
```

The `featured` flag pulls the entry onto the home page. The `order` field
controls the order within the projects page (lower first, then by date).

## SEO, RSS, and structured data

- Every page sets a canonical URL, meta description, Open Graph tags, and
  Twitter Card tags via the `SEO` component.
- Every page emits `<link rel="alternate" hreflang="…">` for both
  languages and an `x-default`. See the **Languages (i18n)** section
  above.
- The home page and the about page emit a `Person` JSON-LD block. Blog
  posts emit a `BlogPosting` block (with `inLanguage`). The site itself
  emits a `WebSite` block (with `inLanguage`).
- The English RSS feed lives at `/rss.xml`. The Spanish feed lives at
  `/es/rss.xml`. Each is generated from the posts in the matching
  language.
- The XML sitemap is served at `/sitemap.xml` (a sitemap index that
  references the generated `/sitemap-0.xml`).

## Theming

Light and dark themes are driven by CSS custom properties. The user's
preference is stored in `localStorage` under the `theme` key. The first
paint decision is made by an inline script in `<head>` to avoid a flash
of the wrong theme.

## Deployment to GitHub Pages

The site is a pure static build. The deploy workflow is checked in at
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and
publishes `./dist` to GitHub Pages on every push to `main` (and on
manual dispatch via **Run workflow** in the Actions tab).

### One-time setup

1. Push this repository to GitHub.
2. In repository settings, open **Pages** and set the source to
   **GitHub Actions** (do **not** point Pages at a branch — the
   workflow does the deployment).
3. The workflow declares the `pages: write` and `id-token: write`
   permissions it needs, so no extra settings change is required.
4. For a **custom domain** (`dyool.dev`), create
   `public/CNAME` containing just the domain and configure DNS per
   the GitHub Pages docs. Astro defaults `site` to `https://dyool.dev`,
   so the build is correct out of the box.

### Supported URL shapes — which `SITE` to use

The checked-in configuration is designed for root-hosted GitHub Pages:
custom domains and user / organisation pages. `SITE` feeds the canonical,
Open Graph, and sitemap URLs, so it must match the final URL.

- **Custom domain** (`dyool.dev`): site is served at the root.
  The default `SITE` (`https://dyool.dev`) is correct. Add
  `public/CNAME`.
- **User / organisation page** (`<user>.github.io`): site is served
  at the root. Set `SITE: https://<user>.github.io` so absolute URLs
  are correct.
- **Project page** (`<user>.github.io/<repo>`): not supported by the
  current config because navigation and static assets are root-relative.
  Add Astro `base` handling before using this deployment shape.

Set `SITE` by adding an `env:` block to the build job — see
[Configuration](#configuration) for the exact snippet.

## Configuration

`astro.config.mjs` reads the public site URL from the `SITE` environment
variable, defaulting to `https://dyool.dev`. Override it in the GitHub
Actions workflow with the real URL of your site:

```yaml
env:
  SITE: https://dyool.dev
```

Site-wide strings (title, description, social links) live in
`src/consts.ts`. Edit them once. Translated UI strings (nav labels,
section headings, button text, etc.) live in `src/i18n.ts` — edit the
`ui.en` and `ui.es` objects to update copy in both languages.

## Adding a new language

The architecture is two-locale today, but it's set up to extend:

1. Add the new locale code to `LOCALES`, `LOCALE_META`, and `DEFAULT_LOCALE`
   in `src/i18n.ts`.
2. Add the `ui` table for the new locale.
3. Mirror the `src/pages/<route>` files into `src/pages/<newlocale>/<route>`.
4. Update `getLocaleFromPath` and `stripLocale` to recognise the new
   prefix.

For a single static site that is unlikely to need a third locale, the
current two-locale setup is the right trade-off.

## Licence

Code: MIT. Content (posts and project entries): CC BY-NC 4.0 unless
stated otherwise.
