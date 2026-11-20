import type { ReactNode } from 'react'
import type { SectionId } from '../../data/sections.ts'
import SectionDivider from '../decor/SectionDivider.tsx'

type SectionProps = {
  id: SectionId
  /** Alternating surface: ivory (light) or sand (warm). */
  tone: 'ivory' | 'sand'
  /** Gradient transition at the bottom edge; omit for no divider. */
  divider?: { flip?: boolean }
  children: ReactNode
  className?: string
}

const tones = {
  ivory: 'bg-ivory',
  sand: 'bg-linear-to-b from-sand to-sand-deep',
} as const

/**
 * Full-width page section with consistent vertical rhythm.
 * Compact top padding (heading close to the edge), generous bottom padding
 * that also leaves room for the divider glow. scroll-margin keeps anchor
 * jumps clear of the fixed navbar.
 */
function Section({ id, tone, divider, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate scroll-mt-(--spacing-nav) overflow-hidden pt-(--spacing-section-top) pb-(--spacing-section) ${tones[tone]} ${className}`}
    >
      {children}
      {divider && <SectionDivider flip={divider.flip} />}
    </section>
  )
}

export default Section
