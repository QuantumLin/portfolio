/**
 * Shared animation settings, so every animation on the site feels the same.
 */

/** Easing curve for all entrance animations: starts fast, settles gently ("ease-out"). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** True if the visitor asked their operating system for less motion. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Scroll behaviour that respects the "reduce motion" setting. */
export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}
