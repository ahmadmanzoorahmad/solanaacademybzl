import { Card } from './ui/card';
import { Badge } from './ui/badge';
import * as LucideIcons from 'lucide-react';
import type { Achievement } from '../data/mockData';

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const Icon = (LucideIcons as any)[achievement.icon] || LucideIcons.Award;
  
  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-600',
  };

  return (
    <Card 
      className={`p-6 relative overflow-hidden ${
        achievement.earned 
          ? 'hover:border-primary transition-all cursor-pointer' 
          : 'opacity-50 grayscale'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[achievement.rarity]} opacity-10`} />
      
      <div className="relative space-y-3">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${rarityColors[achievement.rarity]} bg-opacity-20`}>
            <Icon className="w-8 h-8" />
          </div>
          {achievement.earned && (
            <Badge variant="secondary" className="capitalize">
              {achievement.rarity}
            </Badge>
          )}
        </div>
        
        <div>
          <h4 className="font-semibold mb-1">{achievement.title}</h4>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
        
        {achievement.earned && achievement.earnedDate && (
          <p className="text-xs text-muted-foreground">
            Earned {new Date(achievement.earnedDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </Card>
  );
}
