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
| Animationen     | [Motion](https://motion.dev) (`motion/react`) – installiert, noch nicht verwendet |
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
├── main.tsx                   React-Einstiegspunkt
├── App.tsx                    App-Wurzel (später Routing/Layout)
├── pages/                     Seiten (eine Datei pro Seite)
│   └── HomePage.tsx
├── components/                Wiederverwendbare Komponenten
│   └── layout/Container.tsx   Zentrierter, responsiver Inhaltscontainer
├── styles/index.css           Tailwind-Import, Design-Tokens, globale Basis-Styles
└── assets/                    Importierte Assets (Bilder, Fonts …)
```

Statische Dateien, die unverändert ausgeliefert werden sollen (z. B. `favicon.svg`, `robots.txt`), gehören in einen Ordner `public/` im Projektwurzelverzeichnis.

## Architekturentscheidungen

- **Kein React Router (vorerst):** Aktuell gibt es nur eine Seite. Routing wird ergänzt, sobald mehrere Seiten (z. B. Projekt-Detailseiten) entstehen. Auf GitHub Pages ist dann ein `HashRouter` oder ein `404.html`-Fallback nötig, da Pages kein SPA-Fallback kennt.
- **Tailwind CSS 4 über `@tailwindcss/vite`:** Keine `tailwind.config.js` und kein PostCSS nötig. Design-Tokens (Farben, Fonts, Abstände) werden später im `@theme`-Block in `src/styles/index.css` definiert.
- **Dark Mode:** Folgt vorerst der Systemeinstellung (`prefers-color-scheme`).
- **Dynamischer `base`-Pfad:** `vite.config.ts` liest `BASE_PATH` aus der Umgebung (Standard `/`). Der Workflow setzt den Wert automatisch über `actions/configure-pages` – für ein Projekt-Repository z. B. `/Portfolio/`, für ein `<user>.github.io`-Repository `/`. Ein Umbenennen des Repositorys erfordert daher keine Codeänderung.
- **Keine absoluten Asset-Pfade:** Assets werden in Komponenten importiert (`import img from '../assets/x.png'`), damit Vite den `base`-Pfad korrekt voranstellt. Für Dateien aus `public/` im Code `import.meta.env.BASE_URL` verwenden.
- **ESLint statt oxlint, TypeScript 6.0 statt 7:** typescript-eslint unterstützt derzeit nur TypeScript `< 6.1`. Deshalb ist TypeScript auf `~6.0` festgelegt. Ein Upgrade auf TypeScript 7 ist möglich, sobald typescript-eslint es unterstützt.
- **Motion** ist bereits installiert, wird aber erst mit dem Design eingesetzt (`import { motion } from 'motion/react'`).

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
