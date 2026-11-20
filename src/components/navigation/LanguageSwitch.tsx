import { useLanguage } from '../../i18n/languageContext.ts'

/**
 * EN/DE toggle switch: one control with a sliding knob.
 * Exposed as a switch named "German"/"Deutsch" that is on when German is active.
 */
function LanguageSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()
  const isDe = lang === 'de'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDe}
      aria-label={t.a11y.languageSwitch}
      onClick={() => setLang(isDe ? 'en' : 'de')}
      className={`group relative grid h-8 w-[4.5rem] grid-cols-2 items-center rounded-full border border-galaxy/15 bg-galaxy/5 p-0.5 font-sans text-xs font-semibold tracking-wider uppercase transition-colors hover:border-violet/40 ${className}`}
    >
      {/* Knob */}
      <span
        aria-hidden
        className={`absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-galaxy shadow-sm shadow-galaxy/30 transition-transform duration-300 ease-out ${
          isDe ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      <span aria-hidden className={`relative z-10 text-center transition-colors duration-300 ${isDe ? 'text-muted' : 'text-ivory'}`}>
        en
      </span>
      <span aria-hidden className={`relative z-10 text-center transition-colors duration-300 ${isDe ? 'text-ivory' : 'text-muted'}`}>
        de
      </span>
    </button>
  )
}

export default LanguageSwitch
