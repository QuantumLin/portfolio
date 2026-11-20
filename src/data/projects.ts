import type { Localized } from '../i18n/translations.ts'

/** Texts of a project card / project window. */
export type ProjectContent = {
  title: Localized
  /** Project type · period · team size */
  meta: Localized
  /** What the project is about (30–50 words). */
  description: Localized
  /** My personal contribution (15–35 words). */
  role: Localized
  /** Most relevant technologies I used (3–6). */
  tech: string[]
}

export type Project = {
  id: string
  /** Number of slideshow images (placeholder frames until real images exist). */
  imageCount: number
  /** `undefined` = placeholder card without real content yet. */
  content?: ProjectContent
}

export const projects: Project[] = [
  {
    // Sources: sac-challenger5/README.md, frontend/README.md, frontend/FRONTEND.md,
    // docker-compose.yml, frontend/Dockerfile; role confirmed by Daniel.
    id: 'challenger5',
    imageCount: 3,
    content: {
      title: {
        // \u00a0 = no-break space: keeps the dash next to the project name when the title wraps
        de: 'Challenger5\u00a0– SPHEREx-Himmelsviewer',
        en: 'Challenger5\u00a0– SPHEREx Sky Viewer',
      },
      meta: {
        de: 'Hackathon-Teamprojekt (NASA Space Apps Challenge) · 2026 · 4 Personen',
        en: 'Hackathon team project (NASA Space Apps Challenge) · 2026 · 4 people',
      },
      description: {
        de: 'Weboberfläche für die NASA Space Apps Challenge 2026, mit der sich Himmelsaufnahmen der SPHEREx-Mission erkunden lassen. Zu einem gesuchten Himmelsobjekt werden Aufnahmen verschiedener Beobachtungszeitpunkte nacheinander gezeigt, sodass bewegte oder in ihrer Helligkeit veränderliche Objekte leicht erkennbar werden.',
        en: 'A web interface, built for the NASA Space Apps Challenge 2026, for exploring sky images from the SPHEREx mission. For a searched object, it shows images from different observation dates one after another, so objects that move or change in brightness are easy to spot.',
      },
      role: {
        de: 'Ich habe das gesamte Frontend umgesetzt: einen Vollbild-Viewer mit Zeit- und Wellenlängenreglern, die Objektsuche mit Vorschlägen und Verlauf, eine Ansicht für Differenzbilder, das responsive Design, die Anbindung an die Backend-API und das Docker-Setup.',
        en: 'I built the entire frontend: a full-screen viewer with time and wavelength sliders, object search with suggestions and history, a view for difference images, the responsive design, the backend API connection and the Docker setup.',
      },
      tech: ['Angular', 'TypeScript', 'SCSS', 'RxJS', 'Vitest', 'Docker'],
    },
  },
  {
    // Sources: MidiAnalysis/README.md, docs/features.md, docs/architecture.md,
    // docs/analysis.md, docs/video-export.md, git history (Nov 2026);
    // solo project, developed with Claude Code (confirmed by Daniel).
    id: 'midi-analysis',
    imageCount: 3,
    content: {
      title: {
        de: 'MIDI Analysis – Neon-Overlays für Klaviervideos',
        en: 'MIDI Analysis – Neon Overlays for Piano Videos',
      },
      meta: {
        de: 'Eigenprojekt · 2026 · 1 Person, KI-gestützt (Claude Code)',
        en: 'Personal project · 2026 · solo, AI-assisted (Claude Code)',
      },
      description: {
        de: 'Webanwendung, die MIDI-Dateien musikalisch analysiert, von Tonart und Akkorden bis zu Motiven und Abschnitten, und die Ergebnisse als transparente Neon-Overlays für Piano-Visualizer-Videos exportiert, etwa für den Schnitt in DaVinci Resolve. Spielerische Elemente wie Achievements, ein Endgegner und ein „Song Wrapped“-Abspann machen die Analyse anschaulich.',
        en: 'A web app that analyses MIDI files musically, from key and chords to motifs and sections, and exports the results as transparent neon overlays for piano visualizer videos, e.g. for editing in DaVinci Resolve. Playful elements such as achievements, a boss fight and a “Song Wrapped” outro make the analysis easy to follow.',
      },
      role: {
        de: 'Alleiniges Eigenprojekt: Ich habe die Anwendung KI-gestützt mit Claude Code entwickelt, von der Idee bis zur fertigen Version: Backend mit Musikanalyse und Video-Rendering, Frontend mit synchroner Live-Vorschau und das Docker-Setup.',
        en: 'A solo personal project: I developed the app with AI assistance using Claude Code, from the idea to the finished version: a backend for music analysis and video rendering, a frontend with a synchronised live preview, and the Docker setup.',
      },
      tech: ['Python', 'FastAPI', 'NumPy', 'ffmpeg', 'React', 'TypeScript'],
    },
  },
  { id: 'project-3', imageCount: 3 },
  { id: 'project-4', imageCount: 3 },
]
