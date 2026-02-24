import { useLanguage } from '../i18n';
import { Code } from 'lucide-react';

export function DevModeIndicator() {
  const { devMode } = useLanguage();

  if (!devMode) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div className="bg-background/95 backdrop-blur-sm border-2 border-[#14F195] rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
        <Code className="w-4 h-4 text-[#14F195] animate-pulse" />
        <span className="text-xs font-mono text-[#14F195]">DEV MODE</span>
      </div>
    </div>
  );
}
