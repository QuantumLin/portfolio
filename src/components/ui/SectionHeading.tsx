import type { SectionId } from '../../data/sections.ts'

type SectionHeadingProps = {
  id: SectionId
  index: number
  eyebrow: string
  title: string
  className?: string
}

/** Numbered section heading: "02 —— About" eyebrow above a large title. */
function SectionHeading({ id, index, eyebrow, title, className = '' }: SectionHeadingProps) {
  return (
    <header className={className}>
      <p className="mb-6 flex items-center gap-4 font-display text-xs font-medium tracking-[0.25em] text-muted uppercase">
        <span className="text-teal">{String(index).padStart(2, '0')}</span>
        <span aria-hidden className="h-px w-12 bg-gradient-galaxy" />
        {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="text-heading font-semibold text-galaxy">
        {title}
      </h2>
    </header>
  )
}

export default SectionHeading
