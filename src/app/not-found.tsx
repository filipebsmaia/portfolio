import { NotFoundTerminal } from '@/components/layout/NotFound/NotFound';
import { ibmPlexSans, jetbrainsMono } from './fonts';
import './globals.sass';

/**
 * The global 404, for the handful of paths the proxy matcher skips (things that
 * look like files). It renders inside the bare <html><body> Next injects when
 * there is no root layout, so it applies the font variables itself.
 *
 * English only: a global not-found cannot receive params, so it cannot know the
 * locale. Its "cd ~" points at `/`, which the proxy then redirects for a pt-BR
 * visitor - so the escape hatch still lands them in the right language.
 */
export default function GlobalNotFound() {
  return (
    <div className={`${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
      <NotFoundTerminal />
    </div>
  );
}
