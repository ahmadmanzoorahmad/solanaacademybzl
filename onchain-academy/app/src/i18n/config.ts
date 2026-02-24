export type Locale = 'en' | 'pt-BR' | 'es';

export const locales: Locale[] = ['en', 'pt-BR', 'es'];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, { name: string; flag: string; nativeName: string }> = {
  en: { name: 'English', flag: '🇺🇸', nativeName: 'English' },
  'pt-BR': { name: 'Portuguese (Brazil)', flag: '🇧🇷', nativeName: 'Português' },
  es: { name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
};
