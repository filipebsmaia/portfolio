/**
 * Identity facts. Locale-invariant by definition - a URL or an email that
 * differed between languages would be a bug, not a translation.
 *
 * Lives in `lib/` rather than beside a component because it has four consumers:
 * Contact, Footer, the layout's JSON-LD, and Hero's secondary CTA.
 */
export const profile = {
  name: 'Filipe Maia',
  domain: 'filipebsmaia.dev',
  email: 'filipebsmaia@gmail.com',
  githubUrl: 'https://github.com/filipebsmaia',
  githubProfileUrl: 'https://github.com/filipebsmaia?tab=repositories',
  linkedinUrl: 'https://linkedin.com/in/filipebsmaia',
  socialLinks: [
    { id: 'github', url: 'https://github.com/filipebsmaia', username: 'filipebsmaia' },
    { id: 'linkedin', url: 'https://linkedin.com/in/filipebsmaia', username: 'filipebsmaia' },
    { id: 'email', url: 'mailto:filipebsmaia@gmail.com', username: 'filipebsmaia@gmail.com' },
  ],
} as const;

export type SocialId = (typeof profile.socialLinks)[number]['id'];

/** Everything but email - what schema.org `sameAs` wants. */
export const profileSameAs = profile.socialLinks.filter((link) => link.id !== 'email').map((link) => link.url);
