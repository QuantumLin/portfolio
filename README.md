# Portfolio

Personal portfolio website showcasing software, web development, design and media projects.

> **Status:** Base design system and one-page layout are in place. Real content follows in later steps.

## Tech Stack

| Area        | Technology                                                                 |
| ----------- | -------------------------------------------------------------------------- |
| Frontend    | [React 19](https://react.dev)                                              |
| Language    | [TypeScript 6.0](https://www.typescriptlang.org)                           |
| Build / Dev | [Vite 8](https://vite.dev)                                                 |
| Styling     | [Tailwind CSS 4](https://tailwindcss.com) (Vite plugin)                    |
| Animation   | [Motion](https://motion.dev) (`motion/react`)                              |
| Fonts       | Fraunces + Inter via [Fontsource](https://fontsource.org)                  |
| Linting     | [ESLint](https://eslint.org) + typescript-eslint, React Hooks & React Refresh rules |
| Hosting     | GitHub Pages via GitHub Actions                                            |

## Prerequisites

- Node.js **≥ 20.19** (recommended: 24 LTS)
- npm **≥ 10**
- Git

## Installation

```bash
npm install
```

## Scripts

| Command           | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `npm run dev`     | Start the development server (http://localhost:5173)         |
| `npm run build`   | Type-check (`tsc -b`) and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally (http://localhost:4173)   |
| `npm run lint`    | Lint the code with ESLint                                    |

## Project Structure

```
.github/workflows/deploy.yml   GitHub Pages deployment (build + deploy)
index.html                     HTML entry point
vite.config.ts                 Vite config (React, Tailwind, base path)
eslint.config.js               ESLint config (flat config)
src/
├── main.tsx · App.tsx         Entry point, MotionConfig, dev grid overlay
├── pages/HomePage.tsx         One-page layout composing all sections
├── sections/                  Hero, About, Projects, Contact sections
├── components/
│   ├── decor/                 HeroBackdrop, HeroSplit, Sparkle
│   ├── layout/                Container, Grid, Section, Footer
│   ├── navigation/            Navbar (centered links, mobile menu), SideNav (node line), LanguageSwitch (EN/DE toggle)
│   ├── ui/                    Button, SectionHeading, ProjectCard, ProjectModal, Slideshow, Reveal, RichText, placeholders
│   └── dev/GridOverlay.tsx    Column overlay (dev mode only)
├── data/                      sections.ts (section ids, page order), projects.ts (project list)
├── i18n/                      Translations (EN/DE), LanguageProvider, useLanguage
├── hooks/                     useActiveSection, useScrolled, useInitialScroll, useIdle
├── styles/index.css           Design tokens (@theme), utilities, global base styles
└── assets/                    Imported assets (images, fonts …)
```

Static files that should be served as-is (e.g. `favicon.svg`, `robots.txt`) belong in a `public/` folder at the project root.

## Design System

All tokens live in the `@theme` block of [`src/styles/index.css`](src/styles/index.css) and are available as Tailwind classes (e.g. `bg-sand`, `text-galaxy`, `text-display`).

| Area       | Definition |
| ---------- | ---------- |
| Surfaces   | `ivory` `#f8f4ec` and `sand` `#ebe1cf` (gradient to `sand-deep`) – sections alternate between them |
| Text       | `ink` `#161836` (body), `muted` `#5b5d78` (secondary) |
| Accents    | `galaxy` `#1d2160` (headings, primary button), `violet` `#6a4bd6`, `teal` `#17a2a0`; gradient via `bg-gradient-galaxy` / `text-gradient` |
| Fonts      | **Fraunces** (`font-display`: headings, name, logo) – a soft humanist serif with the `SOFT` axis at 100; the hero name additionally uses the `WONK` alternates (`font-wonky`). **Inter** (`font-sans`: body text, navigation, buttons, labels). Both self-hosted via `@fontsource-variable` (no requests to Google Fonts, GDPR-friendly) |
| Type scale | `text-display` (hero, fluid 48–120 px) › `text-heading` (section titles, fluid 36–64 px) › `text-lg/xl` (lead) › `text-base` › `text-xs` uppercase + tracking (labels) |
| Grid       | 4 columns (mobile) → 8 (from `md`) → 12 (from `lg`), gutters 16/24/32 px, max width 1280 px – `components/layout/Grid.tsx` |
| Spacing    | Tailwind's 4 px scale used in 8 px steps; section top padding `--spacing-section-top` (fluid 40–64 px), bottom padding `--spacing-section` (fluid 96–160 px), navbar height `--spacing-nav` (72 px) |
| Headings   | Point-symmetric placement: the About title is centered over the right half (above the text), Projects is centered on the page, the Contact title is centered over the left half (from `md`; always left on phones) |
| Hero split | Two complementary halves: a calm warm cream panel behind the text and a light, cool "galaxy" side (mesh, shapes) behind the portrait. No visible line: an invisible S-curve (wave when stacked) guides a heavily blurred panel edge, and the dot grid fades in towards the galaxy side (`HeroSplit.tsx`) |
| Asymmetry  | Deliberate and sparing: offset column starts, staggered project cards (7/5 – 5/7), a few slightly rotated elements (portrait frame, badge, individual cards) |
| Motion     | Subtle fade-in on scroll (`Reveal`) and navigation transitions; respects `prefers-reduced-motion` |

**Dev tip:** In the development server, press **G** to toggle the column grid overlay.

**Placeholders:** Grey bars (`PlaceholderLines`) and hatched areas (`PlaceholderMedia`) mark where real content will go.

## Architecture Decisions

- **Lightweight i18n (EN/DE) without a library:** All copy lives in [`src/i18n/translations.ts`](src/i18n/translations.ts). `en` defines the shape, and `de` is type-checked against it, so a missing translation is a compile error. `useLanguage()` returns `{ lang, setLang, t }`. The initial language is the saved choice (localStorage), then the browser language (German if it starts with `de`), then English. `<html lang>`, the page title and the meta description follow the selected language. Inline markup in translations (`**bold**`, `[link](#anchor)`) is rendered by `RichText`.
- **One page without React Router:** All sections live on a single page and are reached via anchors (`#about` …). `useActiveSection` (IntersectionObserver) highlights the active section in the navbar and the side node line. Routing will be added once multiple pages exist (e.g. project detail pages). On GitHub Pages this will then require a `HashRouter` or a `404.html` fallback, since Pages has no SPA fallback.
- **Tailwind CSS 4 via `@tailwindcss/vite`:** No `tailwind.config.js` and no PostCSS needed. Design tokens (colors, fonts, spacing) are defined in the `@theme` block in `src/styles/index.css`.
- **Dynamic `base` path:** `vite.config.ts` reads `BASE_PATH` from the environment (default `/`). The workflow sets it automatically via `actions/configure-pages` – e.g. `/Portfolio/` for a project repository, `/` for a `<user>.github.io` repository. Renaming the repository therefore requires no code change.
- **No absolute asset paths:** Assets are imported in components (`import img from '../assets/x.png'`) so Vite prefixes the `base` path correctly. For files in `public/`, use `import.meta.env.BASE_URL` in code.
- **ESLint instead of oxlint, TypeScript 6.0 instead of 7:** typescript-eslint currently only supports TypeScript `< 6.1`, so TypeScript is pinned to `~6.0`. Upgrading to TypeScript 7 is possible once typescript-eslint supports it.
- **Motion** (`motion/react`) powers the navigation transitions and scroll reveals; it is globally tied to the OS setting via `MotionConfig reducedMotion="user"`.

## Deployment (GitHub Pages)

The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main` (or manually via *Actions → Run workflow*):

1. **build:** `npm ci` → `actions/configure-pages` (determines the base path) → `npm run build` → `actions/upload-pages-artifact` uploads `dist/`.
2. **deploy:** `actions/deploy-pages` publishes the artifact to the `github-pages` environment.

Required workflow permissions (already set): `contents: read`, `pages: write`, `id-token: write`.

### Manual Steps on GitHub

1. Create the repository on GitHub (e.g. `Portfolio`) – **without** a README/.gitignore, since they already exist.
2. Add the remote and push:
   ```bash
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
3. In the repository, set **Settings → Pages → Build and deployment → Source** to **"GitHub Actions"**.
4. Under **Actions**, check that the "Deploy to GitHub Pages" workflow succeeds (if needed, re-run it via *Run workflow* after step 3).
5. The site is then available at `https://<user>.github.io/<repo>/`.

Optional: **Settings → Environments → github-pages** shows the deployment branch rules (default: `main` only).
