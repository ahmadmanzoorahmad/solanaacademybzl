import { Card } from './ui/card';
import { Button } from './ui/button';
import { useLanguage, T } from '../i18n';
import { Languages, Code } from 'lucide-react';

/**
 * Example component showing how to use translations
 * This demonstrates both the t() function and <T /> component with dev mode
 */
export function TranslationExample() {
  const { t, language, devMode } = useLanguage();

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Languages className="w-5 h-5 text-[#14F195]" />
        <h3 className="text-xl font-bold">
          <T k="settings.title" />
        </h3>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Current language: <span className="font-mono text-[#14F195]">{language}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Dev mode: <span className="font-mono text-[#14F195]">{devMode ? 'ON' : 'OFF'}</span>
        </p>
      </div>

      <div className="pt-4 border-t space-y-2">
        <p className="text-sm font-semibold">Using t() function:</p>
        <Button variant="outline" size="sm">
          {t('common.save')}
        </Button>
      </div>

      <div className="pt-4 border-t space-y-2">
        <p className="text-sm font-semibold">Using {'<T />'} component (with dev mode tooltips):</p>
        <p className="text-sm">
          <T k="settings.subtitle" />
        </p>
      </div>

      {devMode && (
        <div className="pt-4 border-t bg-muted/50 -mx-6 -mb-6 p-4 rounded-b-lg">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Code className="w-4 h-4 text-[#14F195]" />
            <span>Dev Mode Active: Hover over text with dotted underline to see translation keys</span>
          </div>
        </div>
      )}
    </Card>
  );
}
