import { useEffect } from 'react'

/**
 * Scrolls to the section named in the URL hash after the first render.
 * Needed because the browser tries to jump to the anchor before React has
 * rendered it, so deep links like ".../#projects" would otherwise land on top.
 */
export function useScrollToHash(): void {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [])
}
