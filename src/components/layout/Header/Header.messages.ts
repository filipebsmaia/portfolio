/**
 * The visible nav labels are filenames, so they are invariant - `about.md` reads
 * the same in both locales, and translating it would break the terminal conceit.
 * Only the aria labels are copy.
 */
export const navItems = [
  { href: '/#about', fileName: 'about.md' },
  { href: '/#skills', fileName: 'skills.json' },
  { href: '/#experience', fileName: 'experience.git' },
  { href: '/#projects', fileName: 'projects/' },
  { href: '/#contact', fileName: 'contact.sh' },
] as const;

export type NavItem = (typeof navItems)[number];
