import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Languages, Check } from 'lucide-react';
import { useLanguage } from '../i18n';
import { languageInfo, Language } from '../i18n/translations';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const currentLangInfo = languageInfo[language];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 focus-visible:ring-2 focus-visible:ring-[#14F195] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLangInfo.flag} {currentLangInfo.nativeName}</span>
          <span className="sm:hidden">{currentLangInfo.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {(Object.entries(languageInfo) as [Language, typeof languageInfo[Language]][]).map(([code, info]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code)}
            className={`flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#14F195] ${
              language === code ? 'bg-accent' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{info.flag}</span>
              <span>{info.nativeName}</span>
            </div>
            {language === code && <Check className="h-4 w-4 text-[#14F195]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}