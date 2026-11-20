import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/languageContext.ts'
import { PlaceholderMedia } from './Placeholder.tsx'

type SlideshowProps = {
  count: number
  className?: string
}

const GESTURE_GAP = 200 // ms pause after which non-fading input starts a new gesture
const LONG_PAUSE = 400 // ms pause after which any input starts a new gesture
const FADE_FACTOR = 0.9 // input weaker than this × previous = still fading inertia
const RISE_FACTOR = 1.5 // a delta this much stronger than the previous one = a new swipe
const MIN_RISE_DELTA = 6 // ignore tiny jitter when detecting a new swipe
const MIN_STEP_INTERVAL = 160 // ms between steps, so one accelerating swipe never counts twice
const WHEEL_THRESHOLD = 25 // px of vertical scroll needed before a gesture counts
const HINT_DURATION = 3500 // ms the "how to browse" hint stays visible

/**
 * Horizontal image strip with scroll-snap.
 *
 * Ways to browse:
 * - mouse wheel / touchpad: scroll up or down over the images – one gesture = one image
 *   (mouse and touchpad can't be told apart reliably, so both use vertical scrolling;
 *   horizontal wheel input is ignored on desktop)
 * - touch screens: native swipe
 * - keyboard: ← / → anywhere in the open window
 * - arrow buttons and dots
 */
function Slideshow({ count, className = '' }: SlideshowProps) {
  const { t } = useLanguage()
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  // Mirrors `index` for event handlers that must not re-subscribe on every change.
  const indexRef = useRef(0)
  const [hintVisible, setHintVisible] = useState(count > 1)

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(count - 1, target))
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      indexRef.current = clamped
      track.scrollTo({ left: clamped * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' })
      setHintVisible(false)
    },
    [count],
  )

  // Keep the index in sync with the actual scroll position (covers touch swipes too).
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const next = Math.round(track.scrollLeft / track.clientWidth)
    indexRef.current = next
    setIndex(next)
    if (next !== 0) setHintVisible(false)
  }

  // Hide the hint after a moment.
  useEffect(() => {
    if (!hintVisible) return
    const timer = window.setTimeout(() => setHintVisible(false), HINT_DURATION)
    return () => window.clearTimeout(timer)
  }, [hintVisible])

  // ← / → anywhere while the slideshow is mounted (i.e. while the window is open).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') goTo(indexRef.current + 1)
      if (event.key === 'ArrowLeft') goTo(indexRef.current - 1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [goTo])

  // Wheel / touchpad: one scroll gesture moves exactly one image.
  // Registered manually because React's wheel listener is passive (can't preventDefault).
  useEffect(() => {
    const track = trackRef.current
    if (!track || count < 2) return
    let lastEventAt = 0
    let lastStepAt = 0
    let lastMagnitude = 0
    let lastDirection = 0
    let accumulated = 0
    let gestureUsed = false

    const onWheel = (event: WheelEvent) => {
      event.preventDefault() // the images own the wheel; also blocks horizontal scrolling
      const deltaY = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY // lines → px
      if (Math.abs(deltaY) < Math.abs(event.deltaX)) return // horizontal input is ignored

      const now = performance.now()
      const magnitude = Math.abs(deltaY)
      const direction = Math.sign(deltaY)
      // A new gesture starts
      // - after a long pause,
      // - after a short pause unless the input is still fading (touchpad inertia that
      //   merely stuttered) – e.g. every mouse wheel notch,
      // - immediately when the input gets clearly stronger again (a new touchpad swipe
      //   while the previous one's inertia is still running) or flips direction.
      const gap = now - lastEventAt
      const fading = magnitude < lastMagnitude * FADE_FACTOR
      const paused = gap > LONG_PAUSE || (gap > GESTURE_GAP && !fading)
      const rising = magnitude > lastMagnitude * RISE_FACTOR && magnitude > MIN_RISE_DELTA
      const reversed = direction !== 0 && lastDirection !== 0 && direction !== lastDirection
      if (paused || ((rising || reversed) && now - lastStepAt > MIN_STEP_INTERVAL)) {
        gestureUsed = false
        accumulated = 0
      }
      lastEventAt = now
      lastMagnitude = magnitude
      if (direction !== 0) lastDirection = direction
      if (gestureUsed) return // rest of this gesture, incl. fading touchpad inertia

      accumulated += deltaY
      if (Math.abs(accumulated) < WHEEL_THRESHOLD) return

      gestureUsed = true
      lastStepAt = now
      goTo(indexRef.current + Math.sign(accumulated))
    }

    track.addEventListener('wheel', onWheel, { passive: false })
    return () => track.removeEventListener('wheel', onWheel)
  }, [count, goTo])

  const hint = isTouch ? t.projects.modal.hintTouch : t.projects.modal.hintMouse

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t.projects.modal.gallery}
      className={`relative bg-sand ${className}`}
    >
      {/* Track: scroll-snap strip. Touch screens can swipe natively; elsewhere only the
          wheel handler / buttons / keys move it (overflow hidden still allows scrollTo). */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex size-full snap-x snap-mandatory overflow-x-hidden overscroll-x-contain select-none pointer-coarse:overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
            className="size-full shrink-0 snap-center snap-always"
          >
            <PlaceholderMedia label={`${t.projects.modal.image} ${i + 1}`} className="size-full rounded-none border-0 bg-sand" />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Counter */}
          <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-ivory/90 px-3 py-1 font-sans text-xs font-medium text-galaxy tabular-nums">
            {index + 1} / {count}
          </span>

          {/* How-to hint, fades out after the first interaction */}
          <span
            aria-hidden
            className={`pointer-events-none absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-galaxy/85 px-4 py-2 font-sans text-xs font-medium whitespace-nowrap text-ivory transition-opacity duration-500 ${
              hintVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              {isTouch ? (
                <path d="M7 12h10m-3-3 3 3-3 3M10 9l-3 3 3 3" />
              ) : (
                <>
                  <rect x="7" y="3" width="10" height="18" rx="5" />
                  <path d="M12 7v3" />
                </>
              )}
            </svg>
            {hint}
          </span>

          {/* Arrow buttons (hidden at the ends) */}
          {[
            { step: -1, label: t.projects.modal.previous, side: 'left-3 md:left-4', icon: 'm15 18-6-6 6-6', hidden: index === 0 },
            { step: 1, label: t.projects.modal.next, side: 'right-3 md:right-4', icon: 'm9 18 6-6-6-6', hidden: index === count - 1 },
          ].map(({ step, label, side, icon, hidden }) => (
            <button
              key={step}
              type="button"
              aria-label={label}
              disabled={hidden}
              onClick={() => goTo(index + step)}
              className={`absolute top-1/2 ${side} grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 text-galaxy shadow-md shadow-galaxy/10 transition duration-300 hover:scale-105 hover:bg-ivory ${
                hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
                <path d={icon} />
              </svg>
            </button>
          ))}

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${t.projects.modal.goTo} ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-galaxy' : 'w-2 bg-galaxy/25 hover:bg-galaxy/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Slideshow
