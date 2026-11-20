import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import type { Project } from '../../data/projects.ts'
import { useLanguage } from '../../i18n/languageContext.ts'
import { PlaceholderLines } from './Placeholder.tsx'
import Slideshow from './Slideshow.tsx'

type ProjectModalProps = {
  project: Project | null
  title: string
  onClose: () => void
}

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Large project window (not fullscreen) over a blurred page.
 * Top: slideshow. Below: title and description.
 * Closes via ✕, Esc or a click on the backdrop; locks page scroll, keeps
 * keyboard focus inside and returns it to the card afterwards.
 * Rendered into <body> via a portal so it sits above the navbar (sections
 * create their own stacking contexts).
 */
function ProjectModal({ project, title, onClose }: ProjectModalProps) {
  const { t } = useLanguage()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = project !== null

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    // Lock page scroll; pad by the scrollbar width so the page doesn't shift sideways.
    const root = document.documentElement
    const scrollbarWidth = window.innerWidth - root.clientWidth
    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight }
    root.style.overflow = 'hidden'
    if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      // Simple focus trap: Tab cycles within the panel.
      if (event.key === 'Tab' && panelRef.current) {
        const focusables = [...panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)]
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      root.style.overflow = previous.overflow
      root.style.paddingRight = previous.paddingRight
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-70 grid place-items-center bg-galaxy-deep/30 p-3 backdrop-blur-md sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-ivory shadow-2xl shadow-galaxy-deep/30"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              aria-label={t.projects.modal.close}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-ivory/85 text-galaxy shadow-md shadow-galaxy/10 backdrop-blur-sm transition hover:rotate-90 hover:bg-ivory"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Upper half: slideshow */}
            <Slideshow count={project.imageCount} className="aspect-16/9 max-h-[52dvh] w-full shrink-0" />

            {/* Lower half: title + description (scrolls if long) */}
            <div className="overflow-y-auto px-6 pt-8 pb-10 md:px-10">
              <h2 id={titleId} className="text-3xl font-semibold text-galaxy md:text-4xl">
                {title}
              </h2>
              <PlaceholderLines lines={5} className="mt-6 max-w-3xl" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default ProjectModal
