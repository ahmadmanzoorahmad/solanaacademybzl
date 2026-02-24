# i18n Usage Guide

## Visual Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface                           │
│                                                             │
│  ┌──────────────┐     ┌──────────────┐    ┌─────────────┐ │
│  │ LanguageSwitcher │  │ Header Nav  │    │ Settings   │ │
│  │  🇺🇸 English    │  │  Courses    │    │  Language  │ │
│  │  🇧🇷 Português  │  │  Ranking    │    │  Theme     │ │
│  │  🇪🇸 Español    │  │  Dashboard  │    │  Dev Mode  │ │
│  └──────────────┘     └──────────────┘    └─────────────┘ │
│                                                             │
│  When Dev Mode is ON:                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Settings                  🔑 settings.title         │  │
│  │  ‾‾‾‾‾‾‾‾                                            │  │
│  │  Manage your account...    🔑 settings.subtitle      │  │
│  │  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│                    ┌───────────────────┐                   │
│                    │ [DEV MODE] 🔄     │                   │
│                    └───────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  LanguageContext                            │
│                                                             │
│  • language: 'en' | 'pt-BR' | 'es'                         │
│  • devMode: boolean                                         │
│  • t(key) → translated string                              │
│  • setLanguage(lang)                                        │
│  • setDevMode(enabled)                                      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  Translations Object                        │
│                                                             │
│  translations = {                                           │
│    'en': {                                                  │
│      'common.save': 'Save',                                 │
│      'settings.title': 'Settings',                          │
│      ...                                                    │
│    },                                                       │
│    'pt-BR': {                                               │
│      'common.save': 'Salvar',                               │
│      'settings.title': 'Configurações',                     │
│      ...                                                    │
│    },                                                       │
│    'es': { ... }                                            │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   localStorage                              │
│                                                             │
│  • 'language': 'en' | 'pt-BR' | 'es'                       │
│  • 'devMode': 'true' | 'false'                             │
└─────────────────────────────────────────────────────────────┘
```

## Component Examples

### Example 1: Simple Button

```tsx
import { useLanguage } from '../i18n';
import { Button } from './ui/button';

function SaveButton() {
  const { t } = useLanguage();
  
  return (
    <Button onClick={handleSave}>
      {t('common.save')}
    </Button>
  );
}
```

**Result in different languages:**
- EN: "Save"
- PT-BR: "Salvar"
- ES: "Guardar"

### Example 2: Header with T Component

```tsx
import { T } from '../i18n';

function PageHeader() {
  return (
    <div>
      <h1><T k="settings.title" /></h1>
      <p><T k="settings.subtitle" /></p>
    </div>
  );
}
```

**In Dev Mode, hovering shows:**
```
Settings
🔑 settings.title

Manage your account settings and preferences
🔑 settings.subtitle
```

### Example 3: Language Switcher Integration

```tsx
import { Header } from './components/Header';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function AppHeader() {
  return (
    <header>
      <nav>
        {/* Navigation items */}
      </nav>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        {/* Other controls */}
      </div>
    </header>
  );
}
```

**Dropdown shows:**
```
🇺🇸 English     ✓
🇧🇷 Português
🇪🇸 Español
```

### Example 4: Settings Page with Language Selector

```tsx
import { useLanguage } from '../i18n';
import { Select } from './ui/select';
import { languageInfo, Language } from '../i18n/translations';

function LanguageSettings() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <Select 
      value={language} 
      onValueChange={(value) => setLanguage(value as Language)}
    >
      {Object.entries(languageInfo).map(([code, info]) => (
        <SelectItem key={code} value={code}>
          {info.flag} {info.nativeName}
        </SelectItem>
      ))}
    </Select>
  );
}
```

## Translation Key Naming Convention

```
category.subcategory.identifier

Examples:
✓ common.save
✓ common.cancel
✓ header.courses
✓ header.dashboard
✓ settings.title
✓ settings.tabs.profile
✓ settings.profile.fullName
✓ settings.notifications.email
```

## Dev Mode Features

### 1. Visual Indicators
- Dotted green underline on translated text
- Tooltip showing translation key on hover
- Bottom-right corner badge

### 2. Toggle Methods

**Via Settings UI:**
```
Settings → Preferences → Developer Mode (toggle switch)
```

**Programmatically:**
```tsx
const { devMode, setDevMode } = useLanguage();
setDevMode(!devMode);
```

**Check Status:**
```tsx
const { devMode } = useLanguage();
console.log('Dev mode is', devMode ? 'ON' : 'OFF');
```

## Testing Checklist

- [ ] Header navigation translates correctly
- [ ] Mobile navigation menu translates correctly
- [ ] Settings page fully translated
- [ ] Wallet button shows correct text
- [ ] Language switcher displays current selection
- [ ] Dev mode toggle works in Settings
- [ ] Dev mode shows translation keys as tooltips
- [ ] Dev mode indicator appears in corner
- [ ] Language preference persists on refresh
- [ ] Dev mode preference persists on refresh
- [ ] All three languages (EN, PT-BR, ES) display correctly
- [ ] Text doesn't overflow on mobile
- [ ] Focus states are accessible and visible

## Troubleshooting

### Problem: Translations not showing
**Solution:** Make sure the component is wrapped by `LanguageProvider` in App.tsx

### Problem: TypeScript errors on translation keys
**Solution:** Rebuild the TypeScript cache or add the key to the `Translations` interface

### Problem: Dev mode not persisting
**Solution:** Check localStorage permissions in the browser

### Problem: Missing translation
**Solution:** Add the key to all three language objects in `translations.ts`

## Performance Notes

- Translations are loaded synchronously (no async loading)
- Translation objects are small and don't impact bundle size significantly
- Context updates only when language or devMode changes
- LocalStorage is used for persistence (synchronous, no network calls)
