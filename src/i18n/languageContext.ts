import { createContext, useContext } from 'react'
import type { Language, Translation } from './translations.ts'

export type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  t: Translation
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

/** Current language, its translations and a setter. Use inside <LanguageProvider>. */
export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return value
}
