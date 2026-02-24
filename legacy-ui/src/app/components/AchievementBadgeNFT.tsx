import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { NFTAchievement } from '../data/mockData';
import { motion } from 'motion/react';
import { 
  Footprints, 
  Sword, 
  Flame, 
  GraduationCap, 
  Crown, 
  Users,
  Code,
  Zap,
  LucideIcon,
  Lock,
  Coins
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface AchievementBadgeNFTProps {
  achievement: NFTAchievement;
  size?: 'sm' | 'md' | 'lg';
}

const iconMap: Record<string, LucideIcon> = {
  Footprints,
  Sword,
  Flame,
  GraduationCap,
  Crown,
  Users,
  Code,
  Zap,
};

const rarityColors = {
  common: 'from-gray-400/20 to-gray-500/20 border-gray-400/30',
  rare: 'from-blue-400/20 to-blue-500/20 border-blue-400/30',
  epic: 'from-purple-400/20 to-purple-500/20 border-purple-400/30',
  legendary: 'from-[#14F195]/20 to-[#9945FF]/20 border-[#14F195]/30',
};

const rarityTextColors = {
  common: 'text-gray-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'gradient-solana-text',
};

export function AchievementBadgeNFT({ achievement, size = 'md' }: AchievementBadgeNFTProps) {
  // Use emoji from data or default icon
  const iconContent = achievement.icon;
  
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  // Estimate current supply (for demo purposes, use random percentage)
  const supplyPercent = achievement.earned ? Math.min(100, (achievement.supply * 0.3)) : 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05, rotate: achievement.earned ? 0 : 5 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`${sizeClasses[size]} relative overflow-hidden cursor-pointer transition-all duration-300 ${
                achievement.earned
                  ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} border-2`
                  : 'bg-muted/20 border border-border/50 opacity-40'
              }`}
            >
              {/* Glow Effect for Earned */}
              {achievement.earned && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/10 to-[#9945FF]/10 animate-pulse" />
              )}

              <div className="relative h-full flex flex-col items-center justify-center p-3">
                {/* Lock Icon for Unearned */}
                {!achievement.earned && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}

                {/* Achievement Icon (Emoji) */}
                <div className={`${textSizes[size]} ${achievement.earned ? rarityTextColors[achievement.rarity] : 'grayscale opacity-50'}`}>
                  {iconContent}
                </div>

                {/* Earned Badge */}
                {achievement.earned && achievement.earnedDate && (
                  <Badge
                    variant="outline"
                    className="absolute top-1 right-1 text-[8px] px-1 py-0 h-4 bg-[#14F195]/20 text-[#14F195] border-[#14F195]/30"
                  >
                    ✓
                  </Badge>
                )}

                {/* Rarity Indicator */}
                <div className="absolute bottom-1 left-2 right-2">
                  <div className="w-full h-1 bg-background/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        achievement.rarity === 'legendary'
                          ? 'gradient-solana'
                          : achievement.rarity === 'epic' 
                          ? 'bg-purple-400' 
                          : achievement.rarity === 'rare' 
                          ? 'bg-blue-400' 
                          : 'bg-gray-400'
                      }`}
                      style={{ width: `${achievement.earned ? 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{iconContent}</span>
              <p className="font-heading">{achievement.title}</p>
              <Badge variant="outline" className={`text-xs ${rarityTextColors[achievement.rarity]}`}>
                {achievement.rarity}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{achievement.description}</p>
            
            {/* XP Reward */}
            <div className="flex items-center gap-1 text-[#14F195] text-xs">
              <Coins className="h-3 w-3" />
              <span>+{achievement.xpReward.toLocaleString()} XP</span>
            </div>

            {/* Supply */}
            <div className="text-xs text-muted-foreground">
              <div className="flex justify-between mb-1">
                <span>Total Supply</span>
                <span className="font-mono">{achievement.supply.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-solana"
                  style={{ width: `${supplyPercent}%` }}
                />
              </div>
            </div>

            {/* Earned Date */}
            {achievement.earned && achievement.earnedDate && (
              <p className="text-xs text-muted-foreground font-mono">
                Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
              </p>
            )}

            {/* NFT Mint Address */}
            {achievement.earned && achievement.nftMintAddress && (
              <p className="text-xs text-muted-foreground font-mono">
                Mint: {achievement.nftMintAddress.slice(0, 8)}...
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}