/**
 * Replaces `{token}` placeholders in a message string.
 *
 * Messages stay plain strings rather than functions so a resolved slice can
 * cross the server/client boundary - functions are not serializable.
 */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => String(vars[key] ?? ''));
}
