/**
 * Simple line icons for skills that have no brand logo (concepts like
 * "Video Editing", or tools whose makers don't allow their logo in Simple Icons).
 * 24×24 grid, drawn with the current text colour.
 */
export const glyphs = {
  java: 'M6 10h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-4Zm11 1h1.5a2.5 2.5 0 0 1 0 5H17M9 3c-1 1.2 1 1.8 0 3M12.5 3c-1 1.2 1 1.8 0 3',
  database: 'M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3',
  api: 'M8 4H7a2 2 0 0 0-2 2v4l-2 2 2 2v4a2 2 0 0 0 2 2h1M16 4h1a2 2 0 0 1 2 2v4l2 2-2 2v4a2 2 0 0 1-2 2h-1M10 12h.01M14 12h.01',
  daw: 'M5 4v16M12 4v16M19 4v16M3 8h4M10 15h4M17 10h4',
  film: 'M3 5h18v14H3zM7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4',
  waveform: 'M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0',
  midi: 'M3 5h18v14H3zM7.5 5v8M12 5v8M16.5 5v8M7.5 13v6M12 13v6M16.5 13v6',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
  pen: 'm12 3 6 6-3 9H9L6 9l6-6Zm0 0v7M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0M8 21h8',
  layout: 'M3 4h18v16H3zM3 9h18M9 9v11',
  prompt: 'M4 5h16v11H9l-5 4V5Zm8 2.5.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9.9-2Z',
  chip: 'M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4',
  puzzle: 'M5 8h3a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v3h-3a2 2 0 1 0-4 0H5v-3a2 2 0 1 0 0-4V8Z',
  flow: 'M4 5h5v4H4zM15 15h5v4h-5zM6.5 9v4a2 2 0 0 0 2 2H15M15 5h5v4h-5zM9 7h6',
} as const

export type GlyphName = keyof typeof glyphs
