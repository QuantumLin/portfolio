import type { ReactNode } from 'react'
import { containerClasses } from './layoutClasses.ts'

type ContainerProps = {
  children: ReactNode
  className?: string
}

/** Centers content with a max width and responsive side gutters. */
function Container({ children, className = '' }: ContainerProps) {
  return <div className={`${containerClasses} ${className}`}>{children}</div>
}

export default Container
