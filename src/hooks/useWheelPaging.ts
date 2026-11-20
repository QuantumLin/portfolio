import { useEffect, type RefObject } from 'react'

// Tuning values (times in ms, distances in px)
const GESTURE_GAP = 200 // pause after which non-fading input starts a new gesture
const LONG_PAUSE = 400 // pause after which any input starts a new gesture
const FADE_FACTOR = 0.9 // input weaker than this × the previous one = touchpad inertia fading out
const RISE_FACTOR = 1.5 // input this much stronger than the previous one = a new swipe
const MIN_RISE_DELTA = 6 // ignore tiny jitter when detecting a new swipe
const MIN_STEP_INTERVAL = 160 // minimum time between two steps, so one swipe never counts twice
const WHEEL_THRESHOLD = 25 // vertical scroll distance needed before a gesture counts
const LINE_HEIGHT = 16 // some mice report "lines" instead of pixels

/**
 * Turns mouse-wheel and touchpad scrolling over `ref` into page steps:
 * one scroll gesture calls `onStep(+1)` (down) or `onStep(-1)` (up) exactly once.
 *
 * Why this is tricky: a mouse wheel sends one event per notch, a touchpad
 * sends a long stream of events – including "inertia" that keeps coming after
 * the fingers have left the pad. Both can't be told apart reliably, so the
 * stream is split into gestures by looking at pauses and at how the strength
 * of the input changes:
 * - after a long pause, any input starts a new gesture,
 * - after a short pause, input starts a new gesture unless it is still
 *   fading (fading = touchpad inertia that merely stuttered),
 * - input that suddenly gets clearly stronger (a new swipe while the old
 *   inertia is still running) or flips direction starts a new gesture at once.
 * Only the first part of each gesture moves the slideshow; the rest is ignored.
 *
 * Horizontal wheel input is ignored, and the page itself doesn't scroll
 * while the pointer is over the element.
 */
export function useWheelPaging(ref: RefObject<HTMLElement | null>, onStep: (direction: 1 | -1) => void, enabled = true) {
  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return

    let lastEventAt = 0
    let lastStepAt = 0
    let lastStrength = 0
    let lastDirection = 0
    let distance = 0 // scrolled so far in the current gesture
    let gestureUsed = false // true once the current gesture has made its step

    const onWheel = (event: WheelEvent) => {
      event.preventDefault() // the element owns the wheel: no page scrolling
      const deltaY = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * LINE_HEIGHT : event.deltaY
      if (Math.abs(deltaY) < Math.abs(event.deltaX)) return // mostly horizontal → ignore

      const now = performance.now()
      const strength = Math.abs(deltaY)
      const direction = Math.sign(deltaY)

      // Does this event start a new gesture?
      const pause = now - lastEventAt
      const isFading = strength < lastStrength * FADE_FACTOR
      const isAfterPause = pause > LONG_PAUSE || (pause > GESTURE_GAP && !isFading)
      const isRising = strength > lastStrength * RISE_FACTOR && strength > MIN_RISE_DELTA
      const isReversed = direction !== 0 && lastDirection !== 0 && direction !== lastDirection
      const stepAllowed = now - lastStepAt > MIN_STEP_INTERVAL
      if (isAfterPause || ((isRising || isReversed) && stepAllowed)) {
        gestureUsed = false
        distance = 0
      }

      lastEventAt = now
      lastStrength = strength
      if (direction !== 0) lastDirection = direction
      if (gestureUsed) return // rest of this gesture, incl. fading touchpad inertia

      distance += deltaY
      if (Math.abs(distance) < WHEEL_THRESHOLD) return

      gestureUsed = true
      lastStepAt = now
      onStep(distance > 0 ? 1 : -1)
    }

    // Registered manually: React's onWheel listener is passive and can't call preventDefault().
    element.addEventListener('wheel', onWheel, { passive: false })
    return () => element.removeEventListener('wheel', onWheel)
  }, [ref, onStep, enabled])
}
