type SectionDividerProps = {
  /** Mirror the color direction so consecutive dividers alternate (teal ↔ violet side). */
  flip?: boolean
}

/**
 * Straight transition at the bottom edge of a section: a soft violet/teal glow
 * fading upwards and a thin gradient line on the boundary itself.
 * Place it as the last child of a `relative` section.
 */
function SectionDivider({ flip = false }: SectionDividerProps) {
  const direction = flip ? 'bg-linear-to-l' : 'bg-linear-to-r'

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0">
      <div
        className={`h-16 ${direction} from-violet/20 via-galaxy/5 to-teal/20 md:h-24`}
        style={{ maskImage: 'linear-gradient(to top, black, transparent)' }}
      />
      <div className={`h-px ${direction} from-violet/0 via-violet/60 to-teal/70`} />
    </div>
  )
}

export default SectionDivider
