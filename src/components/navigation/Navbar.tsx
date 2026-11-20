import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { sectionIds, type SectionId } from '../../data/sections.ts'
import { useScrolled } from '../../hooks/useScrolled.ts'
import { useLanguage } from '../../i18n/languageContext.ts'
import Container from '../layout/Container.tsx'
import LanguageSwitch from './LanguageSwitch.tsx'

type NavbarProps = {
  active: SectionId
}

/** Fixed top navigation. Turns into a frosted bar once the page scrolls. */
function Navbar({ active }: NavbarProps) {
  const { t } = useLanguage()
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  // Close the mobile menu when switching to desktop width.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const onChange = () => media.matches && setOpen(false)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open
          ? 'border-b border-line/70 bg-ivory'
          : scrolled
            ? 'border-b border-line/70 bg-ivory/95'
            : 'border-b border-transparent'
      }`}
    >
      {/* Three columns from md: logo | centered section links | language switch */}
      <Container className="flex h-(--spacing-nav) items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <a href="#home" className="group flex items-center gap-3 justify-self-start" aria-label={t.a11y.homeLink}>
          <span className="grid size-10 -rotate-6 place-items-center rounded-lg bg-galaxy font-display text-base font-bold text-ivory transition-transform duration-300 group-hover:rotate-0">
            DD
          </span>
          <span className="hidden font-display text-lg font-semibold text-galaxy sm:inline">Portfolio</span>
        </a>

        <nav aria-label={t.a11y.mainNav} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {sectionIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? 'location' : undefined}
                    className={`relative block px-4 py-2 font-sans text-base font-medium transition-colors ${
                      active === id ? 'text-galaxy' : 'text-muted hover:text-galaxy'
                    }`}
                  >
                    {t.nav[id]}
                    {active === id && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-galaxy"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
        </nav>

        <div className="flex items-center justify-self-end">
          <LanguageSwitch />
          <span aria-hidden className="mx-3 h-5 w-px bg-galaxy/20 md:hidden" />

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-galaxy md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((value) => !value)}
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
        </div>
      </Container>

      {/* Mobile menu: expands with a CSS grid-rows transition (0fr → 1fr).
          Not animated with Motion's height: 'auto' – measuring it makes Motion reset
          the scroll position, which cancels the smooth scroll to the tapped section. */}
      <nav
        id="mobile-menu"
        aria-label={t.a11y.mainNav}
        inert={!open}
        className={`grid transition-[grid-template-rows,border-color] duration-300 ease-out md:hidden ${
          open ? 'grid-rows-[1fr] border-t border-line/70' : 'grid-rows-[0fr] border-t border-transparent'
        }`}
      >
        <div className="overflow-hidden">
          <Container>
            <ul className="py-4">
              {sectionIds.map((id, index) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? 'location' : undefined}
                    className={`flex items-baseline gap-4 py-3 font-display text-3xl font-medium ${
                      active === id ? 'text-galaxy' : 'text-muted'
                    }`}
                  >
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

export default Navbar
