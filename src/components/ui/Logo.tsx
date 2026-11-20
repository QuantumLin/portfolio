import { useLanguage } from '../../i18n/languageContext.ts'

type LogoProps = {
  href: string
  /** When the "Portfolio" wordmark next to the badge is visible (Tailwind display classes). */
  wordmarkClassName?: string
  className?: string
}

/** "DD" badge plus "Portfolio" wordmark, linking to the start page. */
function Logo({ href, wordmarkClassName = 'hidden sm:inline', className = '' }: LogoProps) {
  const { t } = useLanguage()

  return (
    <a href={href} className={`group flex items-center gap-3 ${className}`} aria-label={t.a11y.homeLink}>
      <span className="grid size-10 -rotate-6 place-items-center rounded-lg bg-galaxy font-display text-base font-bold text-ivory transition-transform duration-300 group-hover:rotate-0">
        DD
      </span>
      <span className={`font-display text-lg font-semibold text-galaxy ${wordmarkClassName}`}>Portfolio</span>
    </a>
  )
}

export default Logo
