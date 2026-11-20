import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import LanguageProvider from './i18n/LanguageProvider.tsx'
import { legalTitles, type LegalPageId } from './i18n/legal.ts'
import LegalPage from './pages/LegalPage.tsx'

// Entry for impressum.html / datenschutz.html – the page is chosen via data-page.
const root = document.getElementById('root')!
const page = root.dataset.page as LegalPageId

createRoot(root).render(
  <StrictMode>
    <LanguageProvider titles={legalTitles[page]}>
      <LegalPage page={page} />
    </LanguageProvider>
  </StrictMode>,
)
