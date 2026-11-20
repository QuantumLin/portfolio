import { PlaceholderLines, PlaceholderMedia } from './Placeholder.tsx'

type ProjectCardProps = {
  index: number
  /** Wide cards use a landscape preview, narrow ones a squarer preview. */
  wide?: boolean
}

/** Project card skeleton: preview, number, title and description slots. */
function ProjectCard({ index, wide = false }: ProjectCardProps) {
  return (
    <article className="group rounded-3xl border border-galaxy/10 bg-ivory p-3 shadow-sm shadow-galaxy/5 transition duration-500 hover:-translate-y-1 hover:-rotate-[0.6deg] hover:shadow-xl hover:shadow-galaxy/10">
      <div className="relative overflow-hidden rounded-2xl">
        <PlaceholderMedia label="Preview" className={`${wide ? 'aspect-16/10' : 'aspect-4/3'} rounded-2xl bg-sand/60`} />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-galaxy transition-transform duration-500 group-hover:scale-x-100"
        />
      </div>
      <div className="flex items-start justify-between gap-6 px-3 pt-6 pb-4">
        <div className="flex-1">
          <div aria-hidden className="mb-4 h-4 w-1/2 rounded-full bg-galaxy/20" />
          <PlaceholderLines lines={2} />
        </div>
        <span className="font-display text-sm font-medium text-teal">{String(index).padStart(2, '0')}</span>
      </div>
    </article>
  )
}

export default ProjectCard
