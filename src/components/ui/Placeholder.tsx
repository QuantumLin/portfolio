type PlaceholderLinesProps = {
  lines?: number
  className?: string
}

const widths = ['w-full', 'w-11/12', 'w-10/12', 'w-full', 'w-9/12']

/** Neutral text skeleton – marks where real copy will go. */
export function PlaceholderLines({ lines = 3, className = '' }: PlaceholderLinesProps) {
  return (
    <div aria-hidden className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={`h-2.5 rounded-full bg-galaxy/10 ${i === lines - 1 ? 'w-6/12' : widths[i % widths.length]}`}
        />
      ))}
    </div>
  )
}

type PlaceholderMediaProps = {
  label?: string
  className?: string
}

/** Hatched media frame – marks where an image or preview will go. */
export function PlaceholderMedia({ label = 'Image', className = '' }: PlaceholderMediaProps) {
  return (
    <div
      aria-hidden
      className={`grid place-items-center rounded-2xl border border-galaxy/10 bg-ivory bg-hatch ${className}`}
    >
      <span className="font-display text-[0.65rem] tracking-[0.3em] text-muted/70 uppercase">{label}</span>
    </div>
  )
}
