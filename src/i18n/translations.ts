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
    eyebrow: 'Portfolio',
    tagline: 'Software Developer · Web · Design · Media',
    primaryCta: 'View projects',
    secondaryCta: 'Find me',
    portrait: 'Portrait',
    scroll: 'Scroll',
  },
  about: {
    title: 'About me',
    lead: 'I’m Daniel Dang – a developer with an eye for design, working where code meets media.',
    paragraphs: [
      'Trained as an **IT specialist in application development**, I learned to build software that is reliable and maintainable. Now I’m studying **Audiovisual Media (B.Eng.)** at Hochschule der Medien in Stuttgart – adding design, image, sound and storytelling to the mix.',
      'I care about how things look and feel as much as how they run. Curious? Take a look at my projects or [reach out](#contact).',
    ],
    facts: {
      studying: { label: 'Studying', value: 'Audiovisual Media, B.Eng.', detail: 'Hochschule der Medien, Stuttgart' },
      background: { label: 'Background', value: 'Application Development', detail: 'Trained IT specialist' },
      focus: { label: 'Focus' },
    },
    detailImage: 'Detail',
  },
  projects: {
    title: 'Projects',
    tags: ['Software', 'Web', 'Design', 'Media'],
    preview: 'Preview',
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
    eyebrow: 'Portfolio',
    tagline: 'Softwareentwicklung · Web · Design · Medien',
    primaryCta: 'Projekte ansehen',
    secondaryCta: 'Finde mich',
    portrait: 'Porträt',
    scroll: 'Scrollen',
  },
  about: {
    title: 'Über mich',
    lead: 'Ich bin Daniel Dang – Entwickler mit Gespür für Design, an der Schnittstelle von Code und Medien.',
    paragraphs: [
      'Als ausgebildeter **Fachinformatiker für Anwendungsentwicklung** habe ich gelernt, zuverlässige und wartbare Software zu bauen. Heute studiere ich **Audiovisuelle Medien (B.Eng.)** an der Hochschule der Medien in Stuttgart – und ergänze das um Gestaltung, Bild, Ton und Storytelling.',
      'Mir ist wichtig, wie sich etwas anfühlt und aussieht – genauso wie, dass es läuft. Neugierig? Schau dir meine Projekte an oder [schreib mir](#contact).',
    ],
    facts: {
      studying: { label: 'Studium', value: 'Audiovisuelle Medien, B.Eng.', detail: 'Hochschule der Medien, Stuttgart' },
      // ­ = soft hyphen, lets the long word break cleanly in narrow cards
      background: { label: 'Hintergrund', value: 'Anwendungs­entwicklung', detail: 'Ausgebildeter Fachinformatiker' },
      focus: { label: 'Fokus' },
    },
    detailImage: 'Detail',
  },
  projects: {
    title: 'Projekte',
    tags: ['Software', 'Web', 'Design', 'Medien'],
    preview: 'Vorschau',
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
