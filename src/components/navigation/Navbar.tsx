import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { sectionIds, type SectionId } from '../../data/sections.ts'
import { useScrolled } from '../../hooks/useScrolled.ts'
import { useLanguage } from '../../i18n/languageContext.ts'
import Container from '../layout/Container.tsx'
import Logo from '../ui/Logo.tsx'
import LanguageSwitch from './LanguageSwitch.tsx'

type NavbarProps = {
  active: SectionId
}

/**
 * Fixed top navigation: logo | section links | language switch.
 * Transparent at the very top, an (almost) opaque bar once the page scrolls.
 * Below md the section links move into a drop-down menu.
 */
function Navbar({ active }: NavbarProps) {
  const { t } = useLanguage()
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu when the window becomes desktop-wide.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  let barStyle = 'border-transparent'
  if (menuOpen) barStyle = 'border-line/70 bg-ivory'
  else if (scrolled) barStyle = 'border-line/70 bg-ivory/95'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${barStyle}`}>
      {/* From md: three columns – logo | centered section links | language switch */}
      <Container className="flex h-(--spacing-nav) items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Wordmark hidden on tablets (md), where the five section links need the room */}
        <Logo href="#home" className="justify-self-start" wordmarkClassName="hidden sm:inline md:hidden lg:inline" />

        <nav aria-label={t.a11y.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {sectionIds.map((id) => {
              const isActive = id === active
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block px-3 py-2 font-sans text-base font-medium transition-colors lg:px-4 ${
                      isActive ? 'text-galaxy' : 'text-muted hover:text-galaxy'
                    }`}
                  >
                    {t.nav[id]}
                    {/* Underline; Motion slides it from the old to the new active link (shared layoutId) */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-galaxy lg:inset-x-4"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end">
          <LanguageSwitch />
          <span aria-hidden className="mx-3 h-5 w-px bg-galaxy/20 md:hidden" />
          <MenuButton open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
        </div>
      </Container>

      {/* Mobile menu: expands with a CSS grid-rows transition (0fr → 1fr).
          Not animated with Motion's height: 'auto' – measuring it makes Motion reset
          the scroll position, which cancels the smooth scroll to the tapped section. */}
      <nav
        id="mobile-menu"
        aria-label={t.a11y.mainNav}
        inert={!menuOpen}
        className={`grid border-t transition-[grid-template-rows,border-color] duration-300 ease-out md:hidden ${
          menuOpen ? 'grid-rows-[1fr] border-line/70' : 'grid-rows-[0fr] border-transparent'
        }`}
      >
        <div className="overflow-hidden">
          <Container>
            <ul className="py-4">
              {sectionIds.map((id, index) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={id === active ? 'location' : undefined}
                    className={`flex items-baseline gap-4 py-3 font-display text-3xl font-medium ${
                      id === active ? 'text-galaxy' : 'text-muted'
                    }`}
                  >
                    {/* "01", "02", … */}
                    <span className="font-sans text-xs text-teal-deep">{String(index + 1).padStart(2, '0')}</span>
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </nav>
    </header>
  )
}

type MenuButtonProps = {
  open: boolean
  onToggle: () => void
}

/** Two-line "hamburger" button (phones only) that morphs into an ✕ while the menu is open. */
function MenuButton({ open, onToggle }: MenuButtonProps) {
  const { t } = useLanguage()

  return (
    <button
      type="button"
      className="grid size-10 place-items-center rounded-full text-galaxy md:hidden"
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
      onClick={onToggle}
    >
      <span aria-hidden className="relative block h-3 w-5">
        <span
          className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
            open ? 'top-1.25 rotate-45' : 'top-0'
          }`}
        />
        <span
          className={`absolute left-0 block h-0.5 rounded bg-current transition-all duration-300 ${
            open ? 'top-1.25 w-5 -rotate-45' : 'top-2.5 w-3'
          }`}
        />
      </span>
    </button>
  )
}

export default Navbar
