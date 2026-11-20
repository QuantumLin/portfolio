import type { ReactNode } from 'react'
import { gridClasses } from './layoutClasses.ts'

type GridProps = {
  children: ReactNode
  className?: string
}

/**
 * Responsive column grid: 4 columns (mobile) → 8 (tablet) → 12 (desktop).
 * Children are placed with col-span-* / col-start-* utilities per breakpoint.
 */
function Grid({ children, className = '' }: GridProps) {
  return <div className={`${gridClasses} ${className}`}>{children}</div>
}

export default Grid
