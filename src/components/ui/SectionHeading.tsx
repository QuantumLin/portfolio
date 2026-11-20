import type { SectionId } from '../../data/sections.ts'

type SectionHeadingProps = {
  id: SectionId
  title: string
  className?: string
}

/** Large section title; its id labels the surrounding <section>. */
function SectionHeading({ id, title, className = '' }: SectionHeadingProps) {
  return (
    <h2 id={`${id}-title`} className={`text-heading font-semibold text-galaxy ${className}`}>
      {title}
    </h2>
  )
}

export default SectionHeading
