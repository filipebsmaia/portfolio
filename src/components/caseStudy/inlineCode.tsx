import type { ReactNode } from 'react';

/**
 * Renders `backtick` spans inside plain content strings as <code> elements,
 * so the data layer can stay as strings instead of pulling in MDX.
 */
export function withInlineCode(text: string): ReactNode[] {
  return text.split('`').map((part, index) => (index % 2 === 1 ? <code key={index}>{part}</code> : part));
}
