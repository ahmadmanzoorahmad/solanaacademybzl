'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Locale } from './config';
import { defaultLocale, locales } from './config';
import enMessages from './messages/en.json';
import ptBRMessages from './messages/pt-BR.json';
import esMessages from './messages/es.json';

type Messages = typeof enMessages;

const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  'pt-BR': ptBRMessages as Messages,
  es: esMessages as Messages,
};

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
    }
  }, []);

  const t = useCallback(
    (key: string) => getNestedValue(messagesMap[locale] as unknown as Record<string, unknown>, key),
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
