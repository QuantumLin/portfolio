/**
 * Personal contact details, used by the contact section, the legal notice
 * (Impressum) and the privacy policy.
 *
 * The values are NOT stored in the repository. They are injected at build time
 * from environment variables (Vite inlines `VITE_*` variables into the bundle):
 * - locally:  `.env.local` in the project root (git-ignored)
 * - GitHub:   repository secrets, passed to the build by .github/workflows/deploy.yml
 *
 * The live site still shows them publicly – the legal notice requires that –
 * but they never end up in the git history.
 *
 * Empty values become `null`: GitHub/LinkedIn are then hidden, required fields
 * show a visible "[…]" placeholder (the deploy workflow refuses to publish those).
 * The country (Germany) is added per language by the legal pages.
 */
export type ContactDetails = {
  name: string
  /** Street and house number – must be a postal address, not a P.O. box. */
  street: string | null
  /** Postal code and city, e.g. "70174 Stuttgart". */
  city: string | null
  email: string | null
  /** Second quick contact channel required for the legal notice (usually a phone number). */
  phone: string | null
  github: string | null
  linkedin: string | null
}

const env = (value: string | undefined): string | null => value?.trim() || null

export const contact: ContactDetails = {
  name: env(import.meta.env.VITE_CONTACT_NAME) ?? 'Daniel Dang',
  street: env(import.meta.env.VITE_CONTACT_STREET),
  city: env(import.meta.env.VITE_CONTACT_CITY),
  email: env(import.meta.env.VITE_CONTACT_EMAIL),
  phone: env(import.meta.env.VITE_CONTACT_PHONE),
  github: env(import.meta.env.VITE_CONTACT_GITHUB),
  linkedin: env(import.meta.env.VITE_CONTACT_LINKEDIN),
}
