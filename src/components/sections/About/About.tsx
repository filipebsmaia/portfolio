import type { Locale } from '@/i18n/config';
import { fmt } from '@/lib/fmt';
import { AboutTerminal } from './About.client';
import { renderHelp } from './About.help';
import { aboutMessages } from './About.messages';
import { initialCommands, invariantOutput } from './About.shell';

const USER = 'root@home';

/**
 * Server wrapper. Assembling the command map here keeps the other locale's
 * strings - and the help-column padding - out of the browser bundle.
 */
export function About({ locale }: { locale: Locale }) {
  const t = aboutMessages[locale];

  const shellCommands: Record<string, string[]> = {
    ...invariantOutput,
    ...t.output,
    help: renderHelp({ header: t.helpHeader, descriptions: t.help }),
  };

  return (
    <AboutTerminal
      user={USER}
      sectionTitle={t.sectionTitle}
      terminalTitle={fmt(t.terminalTitle, { user: USER })}
      inputLabel={t.inputLabel}
      unknownCommandHint={t.unknownCommandHint}
      shellCommands={shellCommands}
      initialCommands={initialCommands}
    />
  );
}
