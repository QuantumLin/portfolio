import { useEffect, useState } from 'react'
import { containerClasses, gridClasses } from '../layout/layoutClasses.ts'

/**
 * Development aid: press "G" to toggle a column overlay matching the layout
 * grid (4 / 8 / 12 columns). Rendered only in dev builds (see App.tsx).
 */
function GridOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
      if (event.key.toLowerCase() === 'g' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        setVisible((value) => !value)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!visible) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100">
      <div className={`${containerClasses} h-full`}>
        <div className={`${gridClasses} h-full`}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className={`h-full bg-violet/8 outline outline-violet/20 ${
                i >= 8 ? 'hidden lg:block' : i >= 4 ? 'hidden md:block' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GridOverlay
