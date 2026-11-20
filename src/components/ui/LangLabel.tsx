import type { Localized } from '../../data/projects.ts'
import { useLanguage } from '../../i18n/languageContext.ts'
import { languages } from '../../i18n/translations.ts'

/**
 * Inline text that is always as wide as its longest translation: all
 * languages are stacked in one inline grid cell, only the active one is
 * visible. Used for button labels, so buttons keep the same size and
 * position in every language.
 */
function LangLabel({ text, className = 'text-center' }: { text: Localized; className?: string }) {
  const { lang } = useLanguage()

  return (
    <span className={`inline-grid ${className}`}>
      {languages.map((code) => (
        <span
          key={code}
          lang={code}
          aria-hidden={code === lang ? undefined : true}
          className={`[grid-area:1/1] ${code === lang ? '' : 'invisible'}`}
        >
          {text[code]}
        </span>
      ))}
    </span>
  )
}

export default LangLabel
