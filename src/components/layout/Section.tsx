import type { ReactNode } from 'react'
import type { SectionId } from '../../data/sections.ts'

type SectionProps = {
  id: SectionId
  /**
   * Surface: ivory (light, faint violet/teal tint), sand (warm) or ivory-flip
   * (mirrored tint, for a light section directly below another light one).
   */
  tone: 'ivory' | 'ivory-flip' | 'sand'
  children: ReactNode
  className?: string
}

const tones = {
  ivory: 'bg-ivory-wash',
  'ivory-flip': 'bg-ivory-wash-flip',
  sand: 'bg-linear-to-b from-sand to-sand-deep',
} as const

/**
 * Full-width page section with consistent vertical rhythm.
 * Compact top padding (heading close to the edge), generous bottom padding.
 * scroll-margin keeps anchor jumps clear of the fixed navbar.
 */
function Section({ id, tone, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate scroll-mt-(--spacing-nav) overflow-hidden pt-(--spacing-section-top) pb-(--spacing-section) ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  )
}

export default Section
