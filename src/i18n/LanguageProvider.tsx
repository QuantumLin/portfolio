import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext } from './languageContext.ts'
import { languages, translations, type Language } from './translations.ts'

const STORAGE_KEY = 'portfolio.lang'

/** Saved choice → browser language (German if it starts with "de") → English. */
function getInitialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && (languages as readonly string[]).includes(saved)) return saved as Language
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) – fall through.
  }
  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'
}

type LanguageProviderProps = {
  children: ReactNode
  /** Page-specific browser tab titles (default: the portfolio title). */
  titles?: Record<Language, string>
}

function LanguageProvider({ children, titles }: LanguageProviderProps) {
  const [lang, setLang] = useState<Language>(getInitialLanguage)
  const t = translations[lang]

  // Keep <html lang>, title and description in sync and remember the choice.
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = titles?.[lang] ?? t.meta.title
    if (!titles) document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Ignore – the choice simply isn't remembered.
    }
  }, [lang, t, titles])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
