/**
 * Single source of truth for the one-page sections (order = page order).
 * Labels live in the translations (`t.nav[id]`).
 */
export const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'] as const

export type SectionId = (typeof sectionIds)[number]
