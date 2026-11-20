import Footer from '../components/layout/Footer.tsx'
import Navbar from '../components/navigation/Navbar.tsx'
import SideNav from '../components/navigation/SideNav.tsx'
import { sectionIds } from '../data/sections.ts'
import { useActiveSection } from '../hooks/useActiveSection.ts'
import { useAnchorNavigation } from '../hooks/useAnchorNavigation.ts'
import { useInitialScroll } from '../hooks/useInitialScroll.ts'
import { useLanguage } from '../i18n/languageContext.ts'
import AboutSection from '../sections/AboutSection.tsx'
import ContactSection from '../sections/ContactSection.tsx'
import HeroSection from '../sections/HeroSection.tsx'
import ProjectsSection from '../sections/ProjectsSection.tsx'
import SkillsSection from '../sections/SkillsSection.tsx'

/** One-page layout: all sections stacked, navigation via in-page anchors. */
function HomePage() {
  const { t } = useLanguage()
  const active = useActiveSection(sectionIds)
  useInitialScroll()
  useAnchorNavigation()

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-full focus:bg-galaxy focus:px-4 focus:py-2 focus:text-ivory"
      >
        {t.a11y.skipToContent}
      </a>
      <Navbar active={active} />
      <SideNav active={active} visible={active !== 'home'} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
