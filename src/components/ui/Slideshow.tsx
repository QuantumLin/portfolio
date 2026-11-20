import { useCallback, useEffect, useRef, useState } from 'react'
import { useWheelPaging } from '../../hooks/useWheelPaging.ts'
import { useLanguage } from '../../i18n/languageContext.ts'
import { scrollBehavior } from '../../utils/motion.ts'
import { PlaceholderMedia } from './Placeholder.tsx'

type SlideshowProps = {
  /** Number of images. */
  count: number
  className?: string
}

const HINT_DURATION = 3500 // ms the "how to browse" hint stays visible

/**
 * Horizontal image strip with scroll-snap (one image fills the whole width).
 *
 * Ways to browse:
 * - mouse wheel / touchpad: scroll up or down over the images – one gesture = one image
 *   (see useWheelPaging)
 * - touch screens: native swipe
 * - keyboard: ← / → anywhere in the open window
 * - arrow buttons and dots
 */
function Slideshow({ count, className = '' }: SlideshowProps) {
  const { t } = useLanguage()
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  // Same value as `index`, but readable inside event handlers without re-subscribing them on every change
  const indexRef = useRef(0)
  const [hintVisible, setHintVisible] = useState(count > 1)
  const hasSeveralImages = count > 1

  const isTouchScreen = window.matchMedia('(pointer: coarse)').matches

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(count - 1, target))
      indexRef.current = clamped
      track.scrollTo({ left: clamped * track.clientWidth, behavior: scrollBehavior() })
      setHintVisible(false)
    },
    [count],
  )

  const step = useCallback((direction: 1 | -1) => goTo(indexRef.current + direction), [goTo])

  useWheelPaging(trackRef, step, hasSeveralImages)

  // Keep the index in sync with the actual scroll position (covers touch swipes too).
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const current = Math.round(track.scrollLeft / track.clientWidth)
    indexRef.current = current
    setIndex(current)
    if (current !== 0) setHintVisible(false)
  }

  // Hide the hint after a moment.
  useEffect(() => {
    if (!hintVisible) return
    const timer = window.setTimeout(() => setHintVisible(false), HINT_DURATION)
    return () => window.clearTimeout(timer)
  }, [hintVisible])

  // ← / → anywhere while the slideshow is shown (i.e. while the project window is open).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [step])

  return (
    <div role="region" aria-roledescription="carousel" aria-label={t.projects.modal.gallery} className={`relative bg-sand ${className}`}>
      {/* Track: scroll-snap strip. Touch screens can swipe natively (overflow-x-auto);
          elsewhere only the wheel, buttons and keys move it (scrollTo also works with overflow hidden). */}
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

      {hasSeveralImages && (
        <>
          <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-ivory/90 px-3 py-1 font-sans text-xs font-medium text-galaxy tabular-nums">
            {index + 1} / {count}
          </span>

          <BrowseHint visible={hintVisible} touch={isTouchScreen} />

          <ArrowButton direction="previous" hidden={index === 0} onClick={() => goTo(index - 1)} />
          <ArrowButton direction="next" hidden={index === count - 1} onClick={() => goTo(index + 1)} />

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

/** "Scroll to browse" / "Swipe to browse" pill; fades out after the first interaction. */
function BrowseHint({ visible, touch }: { visible: boolean; touch: boolean }) {
  const { t } = useLanguage()

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-galaxy/85 px-4 py-2 font-sans text-xs font-medium whitespace-nowrap text-ivory transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        {touch ? (
          // Left/right arrows
          <path d="M7 12h10m-3-3 3 3-3 3M10 9l-3 3 3 3" />
        ) : (
          // Mouse with scroll wheel
          <>
            <rect x="7" y="3" width="10" height="18" rx="5" />
            <path d="M12 7v3" />
          </>
        )}
      </svg>
      {touch ? t.projects.modal.hintTouch : t.projects.modal.hintMouse}
    </span>
  )
}

type ArrowButtonProps = {
  direction: 'previous' | 'next'
  /** Hidden at the first / last image. */
  hidden: boolean
  onClick: () => void
}

/** Round arrow button at the left or right edge of the slideshow. */
function ArrowButton({ direction, hidden, onClick }: ArrowButtonProps) {
  const { t } = useLanguage()
  const isNext = direction === 'next'

  return (
    <button
      type="button"
      aria-label={isNext ? t.projects.modal.next : t.projects.modal.previous}
      disabled={hidden}
      onClick={onClick}
      className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 text-galaxy shadow-md shadow-galaxy/10 transition duration-300 hover:scale-105 hover:bg-ivory ${
        isNext ? 'right-3 md:right-4' : 'left-3 md:left-4'
      } ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
        <path d={isNext ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'} />
      </svg>
    </button>
  )
}

export default Slideshow
