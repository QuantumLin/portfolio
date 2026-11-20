import { externalLinkProps, isExternalUrl } from '../../utils/links.ts'

type RichTextProps = {
  text: string
}

// Splits the text at **bold** and [label](href) parts. The capture group keeps
// those parts in the result, e.g. "a **b** c" → ["a ", "**b**", " c"].
const MARKUP = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/

/**
 * Renders translation strings with a tiny bit of Markdown-like markup:
 * - **bold**       → highlighted text
 * - [label](href)  → styled link (links to other websites open in a new tab)
 */
function RichText({ text }: RichTextProps) {
  const parts = text.split(MARKUP).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-medium text-galaxy">
          {part.slice(2, -2)}
        </strong>
      )
    }

    const link = LINK.exec(part)
    if (link) {
      const [, label, href] = link
      return (
        <a
          key={i}
          href={href}
          {...(isExternalUrl(href) ? externalLinkProps : {})}
          className="font-medium text-violet underline decoration-violet/30 underline-offset-4 transition-colors hover:decoration-violet"
        >
          {label}
        </a>
      )
    }

    return part // plain text
  })

  return <>{parts}</>
}

export default RichText
