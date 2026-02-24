import { Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Achievement } from '@/types';

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const rarityColors = {
    common: 'bg-gray-500/20 text-gray-400',
    rare: 'bg-blue-500/20 text-blue-400',
    epic: 'bg-purple-500/20 text-purple-400',
    legendary: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${achievement.earned ? 'opacity-100' : 'opacity-50'}`}>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${rarityColors[achievement.rarity]}`}>
        <Award className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{achievement.title}</p>
        <p className="text-sm text-muted-foreground truncate">{achievement.description}</p>
      </div>
      <Badge variant="secondary" className="capitalize">{achievement.rarity}</Badge>
    </div>
  );
}
