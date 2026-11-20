import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

/** Fades and lifts its children in once they scroll into view (runs once). */
function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
