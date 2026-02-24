import { Progress } from './ui/progress';

interface XPProgressBarProps {
  currentXP: number;
  level: number;
}

export function XPProgressBar({ currentXP, level }: XPProgressBarProps) {
  // Calculate XP needed for next level (exponential growth)
  const xpForCurrentLevel = level * 1000 + (level - 1) * 500;
  const xpForNextLevel = (level + 1) * 1000 + level * 500;
  const xpInCurrentLevel = currentXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const progress = Math.min((xpInCurrentLevel / xpNeededForNextLevel) * 100, 100);

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
