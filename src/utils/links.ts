/**
 * Attributes for links to other websites: open in a new tab, and
 * `noopener noreferrer` stops the new page from accessing this one.
 */
export const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const

/** True for absolute web addresses ("https://…"), false for in-page or relative links. */
export function isExternalUrl(href: string): boolean {
  return /^https?:/.test(href)
}
