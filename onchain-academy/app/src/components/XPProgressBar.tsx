'use client';

import { Progress } from '@/components/ui/progress';
import { calculateXPProgress } from '@/services/xp';

interface XPProgressBarProps {
  currentXP: number;
  level: number;
}

export function XPProgressBar({ currentXP, level }: XPProgressBarProps) {
  const { xpInCurrentLevel, xpNeededForNextLevel, progress } = calculateXPProgress(currentXP, level);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">Level {level}</span>
          <span className="text-muted-foreground text-sm">
            {Math.floor(xpInCurrentLevel).toLocaleString()} / {xpNeededForNextLevel.toLocaleString()} XP
          </span>
        </div>
        <span className="text-muted-foreground text-sm">
          {Math.floor(progress)}% to Level {level + 1}
        </span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
}
