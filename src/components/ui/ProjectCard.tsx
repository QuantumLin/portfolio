import { PlaceholderMedia } from './Placeholder.tsx'

type ProjectCardProps = {
  title: string
  /** Label shown on the placeholder thumbnail until a real image exists. */
  thumbnailLabel: string
  onOpen: () => void
}

/**
 * Project card: large thumbnail with the project title below.
 * The whole card is clickable via a stretched button on the title
 * (keeps valid HTML – a heading can't live inside a <button>).
 */
function ProjectCard({ title, thumbnailLabel, onOpen }: ProjectCardProps) {
  return (
    <article className="group relative h-full cursor-pointer rounded-3xl border border-galaxy/10 bg-ivory p-3 shadow-sm shadow-galaxy/5 transition duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-galaxy/15 has-[:focus-visible]:scale-[1.03] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-violet motion-reduce:hover:scale-100">
      <div className="relative overflow-hidden rounded-2xl">
        <PlaceholderMedia label={thumbnailLabel} className="aspect-16/10 rounded-2xl bg-sand/60" />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-galaxy transition-transform duration-500 group-hover:scale-x-100"
        />
      </div>
      <h3 className="flex items-center justify-between gap-4 px-2 pt-4 pb-2 font-display text-xl font-semibold text-galaxy md:text-2xl">
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={onOpen}
          className="text-left outline-none after:absolute after:inset-0 after:rounded-3xl after:content-['']"
        >
          {title}
        </button>
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-full border border-galaxy/15 font-sans text-base text-galaxy transition duration-300 group-hover:border-violet group-hover:bg-violet group-hover:text-ivory"
        >
          ↗
        </span>
      </h3>
    </article>
  )
}

export default ProjectCard
