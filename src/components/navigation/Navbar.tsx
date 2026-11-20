import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sections, type SectionId } from '../../data/sections.ts'
import { useScrolled } from '../../hooks/useScrolled.ts'
import Container from '../layout/Container.tsx'

type NavbarProps = {
  active: SectionId
}

/** Fixed top navigation. Turns into a frosted bar once the page scrolls. */
function Navbar({ active }: NavbarProps) {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  // Close the mobile menu when switching to desktop width.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const onChange = () => media.matches && setOpen(false)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open
          ? 'border-b border-line/70 bg-ivory/95 backdrop-blur-md'
          : solid
            ? 'border-b border-line/70 bg-ivory/80 backdrop-blur-md'
            : 'border-b border-transparent'
      }`}
    >
      <Container className="flex h-(--spacing-nav) items-center justify-between">
        <a href="#home" className="group flex items-center gap-3" aria-label="Daniel Dang – Home">
          <span className="grid size-9 -rotate-6 place-items-center rounded-lg bg-galaxy font-display text-sm font-bold text-ivory transition-transform duration-300 group-hover:rotate-0">
            DD
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide text-galaxy sm:inline">
            Daniel Dang
          </span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'location' : undefined}
                  className={`relative block px-4 py-2 font-display text-sm font-medium transition-colors ${
                    active === id ? 'text-galaxy' : 'text-muted hover:text-galaxy'
                  }`}
                >
                  {label}
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

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-galaxy md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
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
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            className="overflow-hidden border-t border-line/70 md:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Container>
              <ul className="py-4">
                {sections.map(({ id, label }, index) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === id ? 'location' : undefined}
                      className={`flex items-baseline gap-4 py-3 font-display text-2xl font-medium ${
                        active === id ? 'text-galaxy' : 'text-muted'
                      }`}
                    >
                      <span className="text-xs text-teal">{String(index + 1).padStart(2, '0')}</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
