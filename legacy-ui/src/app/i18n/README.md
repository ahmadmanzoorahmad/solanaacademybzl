# Internationalization (i18n) System

This directory contains the internationalization system for the Superteam Solana Academy application.

## Features

- 🌍 **Multi-language support**: English (EN), Portuguese (PT-BR), and Spanish (ES)
- 🔑 **Type-safe translations**: Full TypeScript support with autocomplete
- 🛠️ **Developer Mode**: Show translation keys as tooltips for debugging
- 💾 **Persistent preferences**: Language selection saved to localStorage
- 🎨 **Dark mode optimized**: Solana gradient accents (#14F195 → #9945FF)
- ♿ **Accessible**: Proper focus states and keyboard navigation

## Quick Start

### 1. Wrap your app with LanguageProvider

```tsx
import { LanguageProvider } from './i18n';

export default function App() {
  return (
    <LanguageProvider>
      {/* Your app content */}
    </LanguageProvider>
  );
}
```

### 2. Use translations in components

There are two ways to use translations:

#### Method 1: Using the `t()` function

```tsx
import { useLanguage } from '../i18n';

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <button>{t('common.save')}</button>
  );
}
```

#### Method 2: Using the `<T />` component (with dev mode support)

```tsx
import { T } from '../i18n';

function MyComponent() {
  return (
    <h1>
      <T k="settings.title" />
    </h1>
  );
}
```

## Developer Mode

Developer Mode adds visual indicators to help identify translation keys:

1. **Enable in Settings**: Go to Settings → Preferences → Developer Mode
2. **Visual indicators**: Translated text will have a dotted green underline
3. **Tooltips**: Hover over text to see the translation key
4. **Corner badge**: A "DEV MODE" indicator appears in the bottom-right corner

### Toggle dev mode programmatically:

```tsx
import { useLanguage } from '../i18n';

function MyComponent() {
  const { devMode, setDevMode } = useLanguage();
  
  return (
    <button onClick={() => setDevMode(!devMode)}>
      Toggle Dev Mode
    </button>
  );
}
```

## Adding New Translations

### 1. Add the key to the `Translations` interface

```typescript
// translations.ts
export interface Translations {
  // ... existing keys
  'myFeature.title': string;
  'myFeature.description': string;
}
```

### 2. Add translations for all languages

```typescript
export const translations: Record<Language, Translations> = {
  'en': {
    // ... existing translations
    'myFeature.title': 'My Feature',
    'myFeature.description': 'This is my feature',
  },
  'pt-BR': {
    // ... existing translations
    'myFeature.title': 'Minha Funcionalidade',
    'myFeature.description': 'Esta é minha funcionalidade',
  },
  'es': {
    // ... existing translations
    'myFeature.title': 'Mi Función',
    'myFeature.description': 'Esta es mi función',
  },
};
```

### 3. Use in your components

```tsx
import { useLanguage } from '../i18n';

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('myFeature.title')}</h1>
      <p>{t('myFeature.description')}</p>
    </div>
  );
}
```

## Language Switcher Component

The `LanguageSwitcher` component is already integrated into the header:

```tsx
import { LanguageSwitcher } from './components/LanguageSwitcher';

function Header() {
  return (
    <header>
      {/* ... other header content */}
      <LanguageSwitcher />
    </header>
  );
}
```

Features:
- Dropdown with language names and flag emojis
- Shows current language selection
- Compact on mobile (flag only)
- Accessible focus states with Solana green (#14F195)

## API Reference

### `useLanguage()` Hook

Returns an object with:

```typescript
{
  language: Language;              // Current language ('en' | 'pt-BR' | 'es')
  setLanguage: (lang: Language) => void;  // Change language
  t: (key: keyof Translations) => string; // Get translation
  devMode: boolean;                // Dev mode state
  setDevMode: (enabled: boolean) => void; // Toggle dev mode
}
```

### `<T />` Component

Props:
- `k`: Translation key (required)
- `className`: Additional CSS classes (optional)

Example:
```tsx
<T k="settings.title" className="text-xl" />
```

## File Structure

```
/src/app/i18n/
├── README.md              # This file
├── index.ts               # Exports
├── translations.ts        # Translation definitions
└── LanguageContext.tsx    # Context provider and hooks
```

## Best Practices

1. **Always use translation keys**: Don't hardcode strings in components
2. **Namespace your keys**: Use dot notation (e.g., `settings.profile.title`)
3. **Test in all languages**: Switch between languages to verify layout
4. **Use dev mode**: Enable dev mode to quickly identify missing translations
5. **Keep translations consistent**: Use similar phrasing across languages

## Supported Languages

| Code | Language | Native Name | Flag |
|------|----------|-------------|------|
| `en` | English | English | 🇺🇸 |
| `pt-BR` | Portuguese (Brazil) | Português | 🇧🇷 |
| `es` | Spanish | Español | 🇪🇸 |

## Notes

- Language preference is persisted in `localStorage`
- Dev mode state is also persisted in `localStorage`
- The system defaults to English (`en`) if no preference is saved
- All components using translations must be wrapped by `LanguageProvider`
