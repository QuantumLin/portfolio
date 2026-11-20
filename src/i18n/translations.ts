import type { SectionId } from '../data/sections.ts'

export const languages = ['en', 'de'] as const
export type Language = (typeof languages)[number]

/**
 * All user-facing copy. `en` defines the shape; `de` must match it exactly
 * (enforced by the `Translation` type).
 * Rich strings support **bold** and [link text](#anchor) – see RichText.tsx.
 */
const en = {
  meta: {
    title: 'Daniel Dang – Portfolio',
    description: 'Portfolio of Daniel Dang – software, web development, design and media projects.',
  },
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
  } satisfies Record<SectionId, string>,
  a11y: {
    mainNav: 'Main',
    sectionNav: 'Sections',
    languageSwitch: 'German',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeLink: 'Daniel Dang – Home',
    skipToContent: 'Skip to content',
    scrollToAbout: 'Scroll to About',
  },
  hero: {
    tagline: 'All things **software, web, design & media**.',
    primaryCta: 'View projects',
    secondaryCta: 'Find me',
    portrait: 'Portrait',
    scroll: 'Scroll',
  },
  about: {
    title: 'About me',
    lead: 'I’m Daniel Dang – part developer, part designer, part media maker.',
    paragraphs: [
      'I trained as an **IT specialist in application development** and am now studying **Audiovisual Media (B.Eng.)** in Stuttgart – adding design, image, sound and storytelling to the mix.',
      'Every step of a project shapes the final result, so I care about how things look and feel as much as how they work. Take a look at my [projects](#projects) or [find me](#contact).',
    ],
    facts: {
      studying: {
        label: 'Studying',
        value: 'Audiovisual Media, B.Eng.',
        detail: 'Hochschule der Medien, Stuttgart',
        period: 'Since summer semester 2026',
      },
      background: {
        label: 'Background',
        value: 'Application Development',
        detail: 'Trained IT specialist',
        period: '2022 – 2025',
      },
    },
  },
  projects: {
    title: 'Projects',
    thumbnail: 'Thumbnail',
    placeholderTitle: 'Project title',
    modal: {
      close: 'Close',
      gallery: 'Project images',
      image: 'Image',
      previous: 'Previous image',
      next: 'Next image',
      goTo: 'Go to image',
      hintMouse: 'Scroll to browse',
      hintTouch: 'Swipe to browse',
    },
  },
  contact: {
    title: 'Find me',
    channels: ['Email', 'GitHub', 'LinkedIn'],
    fields: { name: 'Name', email: 'Email', message: 'Message' },
  },
  footer: {
    backToTop: 'Back to top',
  },
}

export type Translation = typeof en

const de: Translation = {
  meta: {
    title: 'Daniel Dang – Portfolio',
    description: 'Portfolio von Daniel Dang – Projekte aus Softwareentwicklung, Webentwicklung, Design und Medien.',
  },
  nav: {
    home: 'Start',
    about: 'Über mich',
    projects: 'Projekte',
    contact: 'Kontakt',
  },
  a11y: {
    mainNav: 'Hauptnavigation',
    sectionNav: 'Abschnitte',
    languageSwitch: 'Deutsch',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    homeLink: 'Daniel Dang – Startseite',
    skipToContent: 'Zum Inhalt springen',
    scrollToAbout: 'Zu „Über mich“ scrollen',
  },
  hero: {
    tagline: 'Alles rund um **Software, Web, Design & Medien**.',
    primaryCta: 'Projekte ansehen',
    secondaryCta: 'Finde mich',
    portrait: 'Porträt',
    scroll: 'Scrollen',
  },
  about: {
    title: 'Über mich',
    lead: 'Ich bin Daniel Dang – Entwickler, Designer und Medienmacher in einem.',
    paragraphs: [
      'Nach meiner Ausbildung zum **Fachinformatiker für Anwendungsentwicklung** studiere ich jetzt **Audiovisuelle Medien (B.Eng.)** in Stuttgart – dazu kommen Gestaltung, Bild, Ton und Storytelling.',
      'Jeder Schritt eines Projekts prägt das Endergebnis. Deshalb achte ich genauso darauf, wie etwas aussieht und sich anfühlt, wie darauf, dass es funktioniert. Schau dir meine [Projekte](#projects) an oder [nimm Kontakt auf](#contact).',
    ],
    facts: {
      studying: {
        label: 'Studium',
        value: 'Audiovisuelle Medien, B.Eng.',
        detail: 'Hochschule der Medien, Stuttgart',
        period: 'Seit Sommersemester 2026',
      },
      // ­ = soft hyphen, lets the long word break cleanly in narrow cards
      background: {
        label: 'Hintergrund',
        value: 'Anwendungs­entwicklung',
        detail: 'Ausgebildeter Fachinformatiker',
        period: '2022 – 2025',
      },
    },
  },
  projects: {
    title: 'Projekte',
    thumbnail: 'Vorschaubild',
    placeholderTitle: 'Projekttitel',
    modal: {
      close: 'Schließen',
      gallery: 'Projektbilder',
      image: 'Bild',
      previous: 'Vorheriges Bild',
      next: 'Nächstes Bild',
      goTo: 'Gehe zu Bild',
      hintMouse: 'Scrollen zum Blättern',
      hintTouch: 'Wischen zum Blättern',
    },
  },
  contact: {
    title: 'Finde mich',
    channels: ['E-Mail', 'GitHub', 'LinkedIn'],
    fields: { name: 'Name', email: 'E-Mail', message: 'Nachricht' },
  },
  footer: {
    backToTop: 'Nach oben',
  },
}

export const translations: Record<Language, Translation> = { en, de }
