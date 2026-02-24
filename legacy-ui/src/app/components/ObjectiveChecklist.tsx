import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from './ui/utils';

interface Objective {
  id: string;
  text: string;
  completed: boolean;
}

interface ObjectiveChecklistProps {
  objectives: Objective[];
}

export function ObjectiveChecklist({ objectives }: ObjectiveChecklistProps) {
  const completedCount = objectives.filter((obj) => obj.completed).length;
  const totalCount = objectives.length;

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Objectives</h3>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{totalCount}
        </span>
      </div>
      <div className="space-y-3">
        {objectives.map((objective) => (
          <div
            key={objective.id}
            className={cn(
              'flex items-start gap-3 p-3 rounded-md transition-colors',
              objective.completed ? 'bg-[#14F195]/5' : 'bg-muted/30'
            )}
          >
            {objective.completed ? (
              <CheckCircle2 className="w-5 h-5 text-[#14F195] flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            )}
            <span
              className={cn(
                'text-sm',
                objective.completed ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {objective.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
