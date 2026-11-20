import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sections, type SectionId } from '../../data/sections.ts'
import { useIdle } from '../../hooks/useIdle.ts'

type SideNavProps = {
  active: SectionId
  visible: boolean
}

const NODE_GAP = 44 // px between nodes – keep in sync with the gap-11 below
const IDLE_TIMEOUT = 2000 // ms without activity before the nav fades out

/**
 * Vertical "node line" on the right edge. Appears after leaving the hero and
 * fades out after a short period of inactivity (stays while hovered/focused).
 * The gradient track fills up to the active node.
 */
function SideNav({ active, visible }: SideNavProps) {
  const activeIndex = sections.findIndex((section) => section.id === active)
  const idle = useIdle(IDLE_TIMEOUT)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const shown = visible && (!idle || hovered || focused)

  return (
    <AnimatePresence onExitComplete={() => setHovered(false)}>
      {shown && (
        <motion.nav
          aria-label="Sections"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
          }}
          // Sits inside the container's side gutter (lg: 40px), so it never covers grid content.
          className="fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 lg:block xl:right-6"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="relative">
            {/* Track */}
            <span aria-hidden className="absolute inset-y-0 right-[7px] w-px bg-galaxy/15" />
            {/* Progress */}
            <motion.span
              aria-hidden
              className="absolute top-0 right-[7px] w-px origin-top bg-linear-to-b from-violet to-teal"
              animate={{ height: activeIndex * NODE_GAP }}
              transition={{ type: 'spring', stiffness: 160, damping: 24 }}
            />

            <ul className="relative flex flex-col gap-11">
              {sections.map(({ id, label }, index) => {
                const isActive = id === active
                const isPassed = index < activeIndex
                return (
                  <li key={id} className="flex h-0 items-center justify-end">
                    <a
                      href={`#${id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className="group flex items-center gap-3 py-2"
                    >
                      <span
                        // Labels show on hover/focus; the active one stays visible only on
                        // very wide screens where the gutter has room for it.
                        className={`rounded-full bg-ivory/85 px-2.5 py-1 font-sans text-xs font-medium tracking-[0.2em] uppercase shadow-sm shadow-galaxy/5 backdrop-blur-sm transition-all duration-300 ${
                          isActive ? 'text-galaxy 2xl:translate-x-0 2xl:opacity-100' : 'text-muted'
                        } translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100`}
                      >
                        {label}
                      </span>
                      <span
                        aria-hidden
                        className={`grid size-[15px] place-items-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? 'rotate-45 rounded-[3px] border-violet bg-ivory'
                            : isPassed
                              ? 'border-teal bg-teal'
                              : 'border-galaxy/30 bg-ivory group-hover:border-violet'
                        }`}
                      >
                        {isActive && <span className="size-[7px] rounded-[1px] bg-gradient-galaxy" />}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default SideNav
