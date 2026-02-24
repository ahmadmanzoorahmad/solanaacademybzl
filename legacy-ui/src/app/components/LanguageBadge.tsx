import { useLanguage } from '../i18n';
import { languageInfo } from '../i18n/translations';
import { Globe } from 'lucide-react';

interface LanguageBadgeProps {
  showIcon?: boolean;
  showFlag?: boolean;
  showName?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * A compact badge showing the current language
 * Useful for footers, debug panels, or info displays
 */
export function LanguageBadge({ 
  showIcon = true,
  showFlag = true,
  showName = true,
  compact = false,
  className = ''
}: LanguageBadgeProps) {
  const { language } = useLanguage();
  const langInfo = languageInfo[language];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 text-xs ${className}`}>
      {showIcon && !compact && <Globe className="w-3 h-3 text-muted-foreground" />}
      {showFlag && <span>{langInfo.flag}</span>}
      {showName && <span className="font-medium">{compact ? language.toUpperCase() : langInfo.nativeName}</span>}
    </div>
  );
}
