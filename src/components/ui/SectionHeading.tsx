import type { SectionId } from '../../data/sections.ts'

type SectionHeadingProps = {
  id: SectionId
  title: string
  className?: string
}

/**
 * Large section title: left-aligned on phones, centered from tablet up.
 * Its id ("about-title" …) labels the surrounding <section> (see Section.tsx).
 */
function SectionHeading({ id, title, className = '' }: SectionHeadingProps) {
  return (
    <h2 id={`${id}-title`} className={`text-heading font-semibold text-galaxy md:text-center ${className}`}>
      {title}
    </h2>
  )
}

export default SectionHeading
