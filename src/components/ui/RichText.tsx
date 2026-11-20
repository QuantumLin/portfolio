import type { ReactNode } from 'react'

type RichTextProps = {
  text: string
}

// Matches **bold** or [label](href)
const token = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g

/**
 * Renders translation strings with minimal inline markup:
 * **bold** → highlighted text, [label](href) → styled link (external links open in a new tab).
 */
function RichText({ text }: RichTextProps) {
  const parts: ReactNode[] = text.split(token).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-medium text-galaxy">
          {part.slice(2, -2)}
        </strong>
      )
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          {...(/^https?:/.test(link[2]) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="font-medium text-violet underline decoration-violet/30 underline-offset-4 transition-colors hover:decoration-violet"
        >
          {link[1]}
        </a>
      )
    }
    return part
  })

  return <>{parts}</>
}

export default RichText
