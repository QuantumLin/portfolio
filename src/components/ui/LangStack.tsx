import type { ReactNode } from 'react'
import { useLanguage } from '../../i18n/languageContext.ts'
import { languages, translations, type Language, type Translation } from '../../i18n/translations.ts'

type LangStackProps = {
  /** Renders the block for one language. */
  children: (t: Translation, lang: Language) => ReactNode
  className?: string
  /** Classes for each language layer, e.g. `self-center` or `md:justify-self-center`. */
  itemClassName?: string
}

/**
 * Keeps layout identical across languages: renders a text block in every
 * language, stacked in the same grid cell. Only the active one is visible; the
 * others are invisible but still take up space (and are hidden from screen
 * readers and keyboard focus). The cell is therefore always as large as the
 * longest translation, and shorter text can be positioned inside it (e.g. centered).
 *
 * Usage: <LangStack>{(t) => <p>{t.contact.intro}</p>}</LangStack>
 * For short inline labels, use LangLabel.
 */
function LangStack({ children, className = '', itemClassName = '' }: LangStackProps) {
  const { lang } = useLanguage()

  return (
    <div className={`grid ${className}`}>
      {languages.map((code) => {
        const isActive = code === lang
        return (
          <div
            key={code}
            lang={code}
            aria-hidden={isActive ? undefined : true}
            inert={!isActive}
            className={`[grid-area:1/1] ${isActive ? '' : 'invisible'} ${itemClassName}`}
          >
            {children(translations[code], code)}
          </div>
        )
      })}
    </div>
  )
}

export default LangStack
