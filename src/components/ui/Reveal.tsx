import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { EASE_OUT } from '../../utils/motion.ts'

type RevealProps = {
  children: ReactNode
  /** Seconds to wait before fading in, e.g. to stagger neighbouring elements. */
  delay?: number
  className?: string
}

/** Fades and lifts its children in once they scroll into view (only the first time). */
function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Starts when the element is 10 % of the screen height above the bottom edge
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
