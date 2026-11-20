import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'outline'
  children: ReactNode
}

const base =
  'group inline-flex h-12 items-center gap-3 rounded-full px-6 font-display text-sm font-medium tracking-wide transition duration-300'

const variants = {
  primary: 'bg-galaxy text-ivory shadow-lg shadow-galaxy/20 hover:-translate-y-0.5 hover:bg-violet',
  outline: 'border border-galaxy/25 text-galaxy hover:border-teal hover:text-teal',
} as const

/** Link styled as a button – the site's call-to-action element. */
function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  )
}

export default Button
