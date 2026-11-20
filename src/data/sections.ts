/** Single source of truth for the one-page sections (navbar, side nav, page). */
export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const sectionIds: readonly SectionId[] = sections.map((section) => section.id)
