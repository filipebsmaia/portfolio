import type { Locale } from './config';

/**
 * A colocated message bundle: exactly one entry per locale, all the same shape.
 *
 * The idiom in each `*.messages.ts` is:
 *
 *   const en = { ... };                    // no `as const` - it would narrow
 *                                          // values to literals and the pt-BR
 *                                          // strings would not typecheck
 *   export type XMessages = typeof en;
 *   const ptBR: XMessages = { ... };       // annotated, so a missing or typo'd
 *                                          // key reports on the right line
 *   export const xMessages = { en, 'pt-BR': ptBR } satisfies Messages<XMessages>;
 *
 * Values must stay JSON-serializable - never functions - because a resolved
 * slice can cross the server/client boundary.
 */
export type Messages<T> = { readonly [L in Locale]: T };
