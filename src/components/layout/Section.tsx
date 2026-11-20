import type { ReactNode } from 'react'
import type { SectionId } from '../../data/sections.ts'

type SectionProps = {
  id: SectionId
  /** Alternating surface: ivory (light) or sand (warm). */
  tone: 'ivory' | 'sand'
  children: ReactNode
  className?: string
}

const tones = {
  ivory: 'bg-ivory',
  sand: 'bg-linear-to-b from-sand to-sand-deep',
} as const

/** Full-width page section with consistent vertical rhythm. */
function Section({ id, tone, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate overflow-hidden py-(--spacing-section) ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  )
}

export default Section
