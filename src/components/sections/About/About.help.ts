/**
 * The `help` output is assembled rather than hand-written.
 *
 * It used to be a list of pre-padded strings (`'  whoami              - who am I'`),
 * which made the column width a translator's problem and let the listed commands
 * drift from the ones the shell actually accepts. Now the usage column is
 * invariant data, descriptions are the only translatable part, and the padding is
 * computed - so the column auto-tightens and a missing description is a type error.
 */
export const HELP_COMMANDS = [
  { id: 'whoami', usage: 'whoami' },
  { id: 'ls', usage: 'ls' },
  { id: 'cd', usage: 'cd <dir>' },
  { id: 'cat', usage: 'cat <path>' },
  { id: 'pwd', usage: 'pwd' },
  { id: 'uname', usage: 'uname -a' },
  { id: 'clear', usage: 'clear' },
  { id: 'help', usage: 'help' },
] as const;

export type HelpCommandId = (typeof HELP_COMMANDS)[number]['id'];

export interface HelpCopy {
  header: string;
  descriptions: Record<HelpCommandId, string>;
}

export function renderHelp({ header, descriptions }: HelpCopy): string[] {
  const width = Math.max(...HELP_COMMANDS.map((command) => command.usage.length));
  return [
    header,
    '',
    ...HELP_COMMANDS.map((command) => `  ${command.usage.padEnd(width + 2)}- ${descriptions[command.id]}`),
    '',
  ];
}
