import { useEffect } from 'react'

/**
 * Decides where the page starts after it loads:
 * - Browser reload → always back to the top of the start page; a section hash
 *   left in the URL by in-page navigation (".../#about") is removed.
 * - Fresh visit with a deep link (".../#projects") → jump to that section once
 *   React has rendered it (the browser tries before the content exists).
 *
 * Works together with `history.scrollRestoration = 'manual'` (see main.tsx),
 * which stops the browser from restoring the old scroll position on reload.
 */
export function useInitialScroll(): void {
  useEffect(() => {
    const [navigation] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]

    if (navigation?.type === 'reload') {
      if (window.location.hash) {
        history.replaceState(history.state, '', window.location.pathname + window.location.search)
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [])
}
