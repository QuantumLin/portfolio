/// <reference types="vite/client" />

/** Build-time environment variables (see src/data/contact.ts). */
interface ImportMetaEnv {
  readonly VITE_CONTACT_NAME?: string
  readonly VITE_CONTACT_STREET?: string
  readonly VITE_CONTACT_CITY?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_CONTACT_PHONE?: string
  readonly VITE_CONTACT_GITHUB?: string
  readonly VITE_CONTACT_LINKEDIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
