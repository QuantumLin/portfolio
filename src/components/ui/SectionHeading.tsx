import type { SectionId } from '../../data/sections.ts'

type SectionHeadingProps = {
  id: SectionId
  title: string
  /** Alignment from tablet up; on phones headings are always left-aligned. */
  align?: 'left' | 'center' | 'right'
  className?: string
}

const alignments = {
  left: 'text-left',
  center: 'md:text-center',
  right: 'md:text-right',
} as const

/** Large section title; its id labels the surrounding <section>. */
function SectionHeading({ id, title, align = 'left', className = '' }: SectionHeadingProps) {
  return (
    <h2 id={`${id}-title`} className={`text-heading font-semibold text-galaxy ${alignments[align]} ${className}`}>
      {title}
    </h2>
  )
}

export default SectionHeading
