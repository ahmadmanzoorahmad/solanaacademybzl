import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  devMode: boolean;
  setDevMode: (enabled: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });
  
  const [devMode, setDevModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem('devMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('devMode', devMode.toString());
  }, [devMode]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setDevMode = (enabled: boolean) => {
    setDevModeState(enabled);
  };

  const t = (key: keyof Translations): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, devMode, setDevMode }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation component with dev mode support
interface TProps {
  k: keyof Translations;
  className?: string;
}

export function T({ k, className }: TProps) {
  const { t, devMode } = useLanguage();
  
  if (devMode) {
    return (
      <span 
        className={className} 
        title={`🔑 ${k}`}
        style={{ 
          textDecoration: 'underline dotted',
          textDecorationColor: 'rgba(20, 241, 149, 0.3)',
          textUnderlineOffset: '2px'
        }}
      >
        {t(k)}
      </span>
    );
  }
  
  return <span className={className}>{t(k)}</span>;
}
