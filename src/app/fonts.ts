import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';

// Shared so the locale layout and the global not-found (which renders outside
// that layout) apply the same font variables.
//
// `latin` covers U+0000-00FF, which includes every Portuguese accented glyph
// (ã õ ç é ê á à â í ó ô ú ü and their uppercase forms). `latin-ext` would ship
// a second file per family for zero additional glyphs.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});
