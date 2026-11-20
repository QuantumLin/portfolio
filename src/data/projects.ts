/**
 * Project list (placeholders for now).
 * Later each entry can carry real content, e.g.
 * { id, title: { en, de }, description: { en, de }, images: [...], tags: [...] }.
 */
export type Project = {
  id: string
  /** Number of slideshow images (placeholder frames until real images exist). */
  imageCount: number
}

export const projects: Project[] = [
  { id: 'project-1', imageCount: 4 },
  { id: 'project-2', imageCount: 3 },
  { id: 'project-3', imageCount: 5 },
  { id: 'project-4', imageCount: 4 },
]
