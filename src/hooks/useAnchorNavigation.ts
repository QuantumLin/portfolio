import { useEffect } from 'react'

/**
 * Handles all in-page links (`href="#section"`) in one place: smooth-scrolls to
 * the target (respecting its CSS scroll-margin and "reduce motion") and updates
 * the URL hash.
 *
 * Why not rely on the browser? Native fragment navigation is cancelled on some
 * mobile browsers when the element that was clicked disappears at the same
 * moment – exactly what happens when the mobile menu closes on tap.
 */
export function useAnchorNavigation(): void {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const id = decodeURIComponent(link.hash.slice(1))
      const target = id ? document.getElementById(id) : null
      if (!target) return

      event.preventDefault()
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      if (window.location.hash !== link.hash) history.pushState(null, '', link.hash)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
