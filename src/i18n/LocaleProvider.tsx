'use client';

import { createContext, useContext } from 'react';
import { defaultLocale, type Locale } from './config';
import { localizedPath } from './navigation';

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Defaults to `en` outside a provider, which is what the global not-found needs. */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useHref() {
  const locale = useLocale();
  return (path: string) => localizedPath(locale, path);
}
