import { useLanguage } from '../../i18n/languageContext.ts'
import { languages, type Localized } from '../../i18n/translations.ts'

type LangLabelProps = {
  text: Localized
  /** Text alignment inside the reserved space (default: centered). */
  className?: string
}

/**
 * Short inline text that is always as wide as its longest translation.
 * All languages are stacked in one inline grid cell; only the active one is
 * visible, the others are invisible but still take up their space.
 * Used for button labels and skill names, so nothing moves when the
 * language changes. For whole text blocks, use LangStack.
 */
function LangLabel({ text, className = 'text-center' }: LangLabelProps) {
  const { lang } = useLanguage()

  return (
    <span className={`inline-grid ${className}`}>
      {languages.map((code) => {
        const isActive = code === lang
        return (
          <span
            key={code}
            lang={code}
            aria-hidden={isActive ? undefined : true}
            className={`[grid-area:1/1] ${isActive ? '' : 'invisible'}`}
          >
            {text[code]}
          </span>
        )
      })}
    </span>
  )
}

export default LangLabel
