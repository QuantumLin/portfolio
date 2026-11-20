import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the vertical center of the
 * viewport. At the very bottom of the page the last section is always active,
 * so a short final section still gets highlighted.
 */
export function useActiveSection<T extends string>(ids: readonly T[]): T {
  const [active, setActive] = useState<T>(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as T)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))

    const onScroll = () => {
      const { scrollHeight } = document.documentElement
      if (window.innerHeight + window.scrollY >= scrollHeight - 2) setActive(ids[ids.length - 1])
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  return active
}
