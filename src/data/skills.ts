import {
  siCss,
  siDavinciresolve,
  siDocker,
  siFigma,
  siGit,
  siHtml5,
  siJavascript,
  siN8n,
  siReact,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons'
import type { GlyphName } from './skillGlyphs.ts'
import type { Localized } from './projects.ts'

/**
 * Skills shown in the Skills section, grouped by category (display order).
 *
 * - `logo`: brand logo from Simple Icons (CC0, https://simpleicons.org) – import it
 *   by slug, e.g. `siFigma`.
 * - `glyph`: a simple line icon (see skillGlyphs.ts) for skills without a logo.
 * - `name`: a plain string, or `{ en, de }` if it should be translated.
 */
export type Skill = {
  name: string | Localized
  logo?: SimpleIcon
  /**
   * Colour shown through cut-out parts of a logo, for logos whose original has
   * coloured lettering there (e.g. the black "JS" of JavaScript).
   */
  knockout?: string
  glyph?: GlyphName
}

export type SkillCategory = {
  id: string
  title: Localized
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'software',
    title: { en: 'Software Development', de: 'Softwareentwicklung' },
    skills: [
      { name: 'Java', glyph: 'java' },
      { name: 'JavaScript', logo: siJavascript, knockout: '#000000' },
      { name: 'TypeScript', logo: siTypescript },
      { name: 'React', logo: siReact },
      { name: 'HTML', logo: siHtml5 },
      { name: 'CSS', logo: siCss },
      { name: 'SQL', glyph: 'database' },
      { name: 'Git', logo: siGit },
      { name: 'Docker', logo: siDocker },
      { name: 'REST APIs', glyph: 'api' },
    ],
  },
  {
    id: 'media',
    title: { en: 'Audio & Video Production', de: 'Audio- & Videoproduktion' },
    skills: [
      { name: 'DaVinci Resolve', logo: siDavinciresolve },
      { name: 'Reaper', glyph: 'daw' },
      { name: { en: 'Video Editing', de: 'Video\u00adschnitt' }, glyph: 'film' }, // \u00ad = soft hyphen
      { name: { en: 'Audio Editing', de: 'Audio\u00adbearbeitung' }, glyph: 'waveform' },
      { name: 'MIDI', glyph: 'midi' },
    ],
  },
  {
    id: 'design',
    title: { en: 'Design & Creative Tools', de: 'Design & Kreativ-Tools' },
    skills: [
      { name: 'Figma', logo: siFigma },
      { name: 'Affinity', glyph: 'layers' },
      { name: 'Illustrator', glyph: 'pen' },
      { name: 'UI/UX Design', glyph: 'layout' },
    ],
  },
  {
    id: 'ai',
    title: { en: 'AI & Automation', de: 'KI & Automatisierung' },
    skills: [
      { name: 'Prompt Engineering', glyph: 'prompt' },
      { name: 'LLMs', glyph: 'chip' },
      { name: 'n8n', logo: siN8n },
      { name: { en: 'AI Integration', de: 'KI-Integration' }, glyph: 'puzzle' },
      { name: { en: 'Workflow Automation', de: 'Workflow-Automatisierung' }, glyph: 'flow' },
    ],
  },
]

/** Show the skill name under each icon. */
export const SHOW_SKILL_NAMES = true
