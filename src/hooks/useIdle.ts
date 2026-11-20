import { useEffect, useState } from 'react'

const activityEvents = ['scroll', 'wheel', 'mousemove', 'pointerdown', 'keydown', 'touchstart'] as const

/** True after `timeout` ms without scrolling, pointer, touch or keyboard activity. */
export function useIdle(timeout: number): boolean {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    let timer = window.setTimeout(() => setIdle(true), timeout)

    const onActivity = () => {
      setIdle(false) // no re-render when already false
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setIdle(true), timeout)
    }

    activityEvents.forEach((event) => window.addEventListener(event, onActivity, { passive: true }))
    return () => {
      window.clearTimeout(timer)
      activityEvents.forEach((event) => window.removeEventListener(event, onActivity))
    }
  }, [timeout])

  return idle
}
