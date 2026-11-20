type SparkleProps = {
  className?: string
}

/** Four-pointed star used as a small "galaxy" accent. Color via text-* classes. */
function Sparkle({ className = '' }: SparkleProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  )
}

export default Sparkle
