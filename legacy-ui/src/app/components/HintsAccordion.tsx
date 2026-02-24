import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Lightbulb, Lock } from 'lucide-react';
import { cn } from './ui/utils';

interface Hint {
  level: 'small' | 'medium' | 'full';
  content: string;
  locked?: boolean;
}

interface HintsAccordionProps {
  hints: Hint[];
  onUnlock?: (level: string) => void;
}

export function HintsAccordion({ hints, onUnlock }: HintsAccordionProps) {
  const levelLabels = {
    small: 'Small Hint',
    medium: 'Medium Hint',
    full: 'Full Solution Hint',
  };

  const levelColors = {
    small: 'text-blue-400',
    medium: 'text-yellow-400',
    full: 'text-purple-400',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="font-semibold">Need Help?</h3>
      </div>
      
      <Accordion type="single" collapsible className="space-y-2">
        {hints.map((hint, index) => (
          <AccordionItem
            key={hint.level}
            value={hint.level}
            className="border rounded-lg overflow-hidden bg-card/50"
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors"
              disabled={hint.locked}
            >
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-2">
                  <span className={cn("text-sm font-medium", levelColors[hint.level])}>
                    {levelLabels[hint.level]}
                  </span>
                </div>
                {hint.locked && (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {hint.locked ? (
                <div className="text-sm text-muted-foreground">
                  This hint is locked. Try solving the challenge first!
                </div>
              ) : (
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {hint.content}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
