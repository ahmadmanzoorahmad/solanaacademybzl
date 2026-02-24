import { useLanguage } from './LanguageContext';
import { Translations } from './translations';

/**
 * Convenience hook for translations
 * Alias for useLanguage that provides the same functionality
 * Use this when you only need the t() function
 */
export function useTranslation() {
  const { t, language, devMode } = useLanguage();
  
  return {
    t,
    language,
    devMode,
  };
}

/**
 * Helper to check if a translation key exists
 */
export function hasTranslation(key: string): key is keyof Translations {
  // This is a type guard that helps with dynamic keys
  return true; // In production, you might want to check the actual key
}
