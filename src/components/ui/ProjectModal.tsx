import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import type { Project } from '../../data/projects.ts'
import { useLanguage } from '../../i18n/languageContext.ts'
import { EASE_OUT } from '../../utils/motion.ts'
import { PlaceholderLines } from './Placeholder.tsx'
import Slideshow from './Slideshow.tsx'

type ProjectModalProps = {
  /** The project to show, or `null` while the window is closed. */
  project: Project | null
  onClose: () => void
}

/**
 * Large project window (not fullscreen) over a dimmed page.
 * Top: slideshow. Below: title, meta, description, my role and technologies
 * (placeholder lines for projects without content yet).
 *
 * - Closes via ✕, Esc or a click on the dimmed background.
 * - While open, the page behind can't scroll and Tab stays inside the window;
 *   afterwards the keyboard focus returns to the card that opened it.
 * - Dimmed, not blurred: a backdrop blur over the whole page is very slow
 *   without GPU acceleration.
 * - Rendered into <body> via a portal, so it sits above the navbar (each
 *   section creates its own stacking context).
 */
function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang, t } = useLanguage()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isOpen = project !== null

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const unlockScroll = lockPageScroll()
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && panelRef.current) keepFocusInside(panelRef.current, event)
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      unlockScroll()
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  const content = project?.content

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-70 grid place-items-center bg-galaxy-deep/60 p-3 sm:p-6 md:p-10"
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
            transition={{ duration: 0.35, ease: EASE_OUT }}
            // Clicks inside the window must not reach the background (which closes it)
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={t.projects.modal.close}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-ivory/90 text-galaxy shadow-md shadow-galaxy/10 transition hover:rotate-90 hover:bg-ivory"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <Slideshow count={project.imageCount} className="aspect-2/1 max-h-[40dvh] w-full shrink-0" />

            {/* Project details (scroll if they don't fit) */}
            <div className="overflow-y-auto px-6 pt-8 pb-10 md:px-10">
              <h2 id={titleId} className="text-3xl font-semibold text-galaxy md:text-4xl">
                {content?.title[lang] ?? t.projects.placeholderTitle}
              </h2>

              {content ? (
                <>
                  <p className="mt-3 font-sans text-sm text-muted">{content.meta[lang]}</p>

                  <div className="mt-8 grid gap-8 md:grid-cols-[3fr_2fr] md:gap-10">
                    <div className="space-y-6">
                      <DetailSection title={t.projects.details.description}>
                        <p className="text-base leading-relaxed text-ink/80">{content.description[lang]}</p>
                      </DetailSection>
                      <DetailSection title={t.projects.details.role}>
                        <p className="text-base leading-relaxed text-ink/80">{content.role[lang]}</p>
                      </DetailSection>
                    </div>

                    <DetailSection title={t.projects.details.tech}>
                      <ul className="flex flex-wrap gap-2">
                        {content.tech.map((tech) => (
                          <li key={tech} className="rounded-full border border-galaxy/15 bg-sand/50 px-3 py-1 font-sans text-sm text-galaxy">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </DetailSection>
                  </div>
                </>
              ) : (
                <PlaceholderLines lines={5} className="mt-6 max-w-3xl" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/** Small labelled block inside the project window ("About the project", "My role" …). */
function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-2.5 text-label text-teal-deep">{title}</h3>
      {children}
    </section>
  )
}

/**
 * Stops the page behind the window from scrolling. Returns a function that undoes it.
 * Hiding the scrollbar would make the page jump sideways, so its width is added as padding.
 */
function lockPageScroll(): () => void {
  const root = document.documentElement
  const scrollbarWidth = window.innerWidth - root.clientWidth
  const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight }

  root.style.overflow = 'hidden'
  if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`

  return () => {
    root.style.overflow = previous.overflow
    root.style.paddingRight = previous.paddingRight
  }
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/** Simple focus trap: Tab on the last element jumps to the first, Shift+Tab on the first to the last. */
function keepFocusInside(container: HTMLElement, event: KeyboardEvent) {
  const focusables = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)]
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

export default ProjectModal
