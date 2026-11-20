# Portfolio

Persönliche Portfolio-Website zur Präsentation von Software-, Webentwicklungs-, Design- und Medienprojekten.

> **Status:** Technisches Grundgerüst. Design und Inhalte folgen in späteren Schritten.

## Tech-Stack

| Bereich         | Technologie                                        |
| --------------- | -------------------------------------------------- |
| Frontend        | [React 19](https://react.dev)                      |
| Sprache         | [TypeScript 6.0](https://www.typescriptlang.org)   |
| Build / Dev     | [Vite 8](https://vite.dev)                         |
| Styling         | [Tailwind CSS 4](https://tailwindcss.com) (Vite-Plugin) |
| Animationen     | [Motion](https://motion.dev) (`motion/react`)      |
| Schriften       | Space Grotesk + Inter via [Fontsource](https://fontsource.org) |
| Linting         | [ESLint](https://eslint.org) + typescript-eslint, React-Hooks- & React-Refresh-Regeln |
| Hosting         | GitHub Pages via GitHub Actions                    |

## Voraussetzungen

- Node.js **≥ 20.19** (empfohlen: 24 LTS)
- npm **≥ 10**
- Git

## Installation

```bash
npm install
```

## Befehle

| Befehl            | Beschreibung                                           |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Development Server starten (http://localhost:5173)     |
| `npm run build`   | Typprüfung (`tsc -b`) und Produktions-Build nach `dist/` |
| `npm run preview` | Produktions-Build lokal ausliefern (http://localhost:4173) |
| `npm run lint`    | Code mit ESLint prüfen                                 |

## Projektstruktur

```
.github/workflows/deploy.yml   GitHub-Pages-Deployment (Build + Deploy)
index.html                     HTML-Einstiegspunkt
vite.config.ts                 Vite-Konfiguration (React, Tailwind, base-Pfad)
eslint.config.js               ESLint-Konfiguration (Flat Config)
src/
├── main.tsx · App.tsx         Einstieg, MotionConfig, Dev-Grid-Overlay
├── pages/HomePage.tsx         One-Page: setzt alle Sections zusammen
├── sections/                  Hero-, About-, Projects-, Contact-Section
├── components/
│   ├── layout/                Container, Grid, Section, Footer
│   ├── navigation/            Navbar (inkl. Mobile-Menü), SideNav (Knotenlinie)
│   ├── ui/                    Button, SectionHeading, ProjectCard, Reveal, Platzhalter
│   └── dev/GridOverlay.tsx    Spalten-Overlay (nur im Dev-Modus)
├── data/sections.ts           Section-Liste (IDs + Labels) für Navigation & Seite
├── hooks/                     useActiveSection, useScrolled, useScrollToHash
├── styles/index.css           Design-Tokens (@theme), Utilities, globale Basis-Styles
└── assets/                    Importierte Assets (Bilder, Fonts …)
```

Statische Dateien, die unverändert ausgeliefert werden sollen (z. B. `favicon.svg`, `robots.txt`), gehören in einen Ordner `public/` im Projektwurzelverzeichnis.

## Design-System

Alle Tokens liegen im `@theme`-Block von [`src/styles/index.css`](src/styles/index.css) und stehen als Tailwind-Klassen zur Verfügung (z. B. `bg-sand`, `text-galaxy`, `text-display`).

| Bereich | Festlegung |
| --- | --- |
| Flächen | `ivory` `#f8f4ec` und `sand` `#ebe1cf` (Verlauf zu `sand-deep`) – Sections wechseln abwechselnd |
| Text | `ink` `#161836` (Fließtext), `muted` `#5b5d78` (Nebentext) |
| Akzente | `galaxy` `#1d2160` (Überschriften, Primär-Button), `violet` `#6a4bd6`, `teal` `#17a2a0`; Verlauf `bg-gradient-galaxy` / `text-gradient` |
| Schriften | **Space Grotesk** (Überschriften, Labels) + **Inter** (Fließtext), selbst gehostet via `@fontsource-variable` (keine Google-Fonts-Requests, DSGVO-freundlich) |
| Typo-Skala | `text-display` (Hero, fluid 48–120 px) › `text-heading` (Section-Titel, fluid 36–64 px) › `text-lg/xl` (Lead) › `text-base` › `text-xs` uppercase + Laufweite (Labels) |
| Raster | 4 Spalten (mobil) → 8 (ab `md`) → 12 (ab `lg`), Gutter 16/24/32 px, max. Breite 1280 px – `components/layout/Grid.tsx` |
| Spacing | Tailwind-4-px-Skala in 8-px-Schritten; Section-Abstand `--spacing-section` (fluid 96–160 px), Navbar-Höhe `--spacing-nav` (72 px) |
| Asymmetrie | Gezielt und sparsam: versetzte Spaltenstarts, gestaffelte Projektkarten (7/5 – 5/7), wenige leicht rotierte Elemente (Porträtrahmen, Badge, einzelne Karten) |
| Bewegung | Motion: dezentes Einblenden beim Scrollen (`Reveal`), Navigation; respektiert `prefers-reduced-motion` |

**Dev-Tipp:** Im Development Server blendet die Taste **G** das Spaltenraster als Overlay ein bzw. aus.

**Platzhalter:** Graue Balken (`PlaceholderLines`) und schraffierte Flächen (`PlaceholderMedia`) markieren, wo später echte Inhalte stehen.

## Architekturentscheidungen

- **One-Page ohne React Router:** Alle Sections liegen auf einer Seite und werden über Anker (`#about` …) angesteuert. `useActiveSection` (IntersectionObserver) markiert den aktiven Abschnitt in Navbar und Knotenlinie. Routing wird ergänzt, sobald mehrere Seiten (z. B. Projekt-Detailseiten) entstehen. Auf GitHub Pages ist dann ein `HashRouter` oder ein `404.html`-Fallback nötig, da Pages kein SPA-Fallback kennt.
- **Tailwind CSS 4 über `@tailwindcss/vite`:** Keine `tailwind.config.js` und kein PostCSS nötig. Design-Tokens (Farben, Fonts, Abstände) werden später im `@theme`-Block in `src/styles/index.css` definiert.
- **Dynamischer `base`-Pfad:** `vite.config.ts` liest `BASE_PATH` aus der Umgebung (Standard `/`). Der Workflow setzt den Wert automatisch über `actions/configure-pages` – für ein Projekt-Repository z. B. `/Portfolio/`, für ein `<user>.github.io`-Repository `/`. Ein Umbenennen des Repositorys erfordert daher keine Codeänderung.
- **Keine absoluten Asset-Pfade:** Assets werden in Komponenten importiert (`import img from '../assets/x.png'`), damit Vite den `base`-Pfad korrekt voranstellt. Für Dateien aus `public/` im Code `import.meta.env.BASE_URL` verwenden.
- **ESLint statt oxlint, TypeScript 6.0 statt 7:** typescript-eslint unterstützt derzeit nur TypeScript `< 6.1`. Deshalb ist TypeScript auf `~6.0` festgelegt. Ein Upgrade auf TypeScript 7 ist möglich, sobald typescript-eslint es unterstützt.
- **Motion** (`motion/react`) für Ein-/Ausblendungen der Navigation und Scroll-Reveals; global über `MotionConfig reducedMotion="user"` an die Systemeinstellung gekoppelt.

## Deployment (GitHub Pages)

Der Workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) läuft bei jedem Push auf `main` (oder manuell über *Actions → Run workflow*):

1. **build:** `npm ci` → `actions/configure-pages` (ermittelt den Base-Pfad) → `npm run build` → `actions/upload-pages-artifact` lädt `dist/` hoch.
2. **deploy:** `actions/deploy-pages` veröffentlicht das Artifact in der Umgebung `github-pages`.

Benötigte Workflow-Berechtigungen (bereits gesetzt): `contents: read`, `pages: write`, `id-token: write`.

### Manuelle Schritte auf GitHub

1. Repository auf GitHub anlegen (z. B. `Portfolio`) – **ohne** README/.gitignore, da diese bereits existieren.
2. Remote verbinden und pushen:
   ```bash
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
3. Im Repository **Settings → Pages → Build and deployment → Source** auf **„GitHub Actions“** stellen.
4. Unter **Actions** prüfen, ob der Workflow „Deploy to GitHub Pages“ erfolgreich läuft (ggf. nach Schritt 3 über *Run workflow* erneut starten).
5. Die Seite ist anschließend erreichbar unter `https://<user>.github.io/<repo>/`.

Optional: Unter **Settings → Environments → github-pages** sind die Deployment-Branch-Regeln einsehbar (Standard: nur `main`).
