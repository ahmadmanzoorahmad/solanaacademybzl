import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Flame, Copy, Check } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import type { LeaderboardEntry } from '../data/mockData';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
}

function shortenAddress(address?: string): string {
  if (!address) return 'Not connected';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function LeaderboardRow({ entry, isCurrentUser }: LeaderboardRowProps) {
  const [copied, setCopied] = useState(false);

  const rankColors = {
    1: 'text-yellow-400',
    2: 'text-gray-400',
    3: 'text-orange-600',
  };

  const handleCopyWallet = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (entry.walletAddress) {
      await navigator.clipboard.writeText(entry.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className={`p-4 md:p-6 transition-all ${
      isCurrentUser 
        ? 'border-[#14F195] bg-gradient-to-r from-[#14F195]/5 to-[#9945FF]/5 shadow-lg shadow-[#14F195]/10' 
        : 'hover:border-[#14F195]/50 hover:shadow-lg hover:shadow-[#14F195]/5'
    }`}>
      <Link to={`/profile/${entry.user.username}`} className="block">
        <div className="flex items-center gap-3 md:gap-6">
          {/* Rank */}
          <div className={`w-12 md:w-16 flex-shrink-0 flex items-center justify-center font-bold text-lg md:text-xl ${ 
            entry.rank <= 3 ? rankColors[entry.rank as 1 | 2 | 3] : 'text-muted-foreground'
          }`}>
            {entry.rank <= 3 ? (
              <Trophy className="w-7 h-7 md:w-9 md:h-9" />
            ) : (
              `#${entry.rank}`
            )}
          </div>
          
          {/* Avatar & User Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src={entry.user.avatar}
              alt={entry.user.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-border flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-semibold truncate">{entry.user.name}</div>
                {isCurrentUser && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-[#14F195]/20 to-[#9945FF]/20 text-[#14F195] border-[#14F195]/30 text-xs">
                    You
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground truncate">
                @{entry.user.username}
              </div>
              {/* Wallet Address - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-1.5 mt-1">
                <code className="text-xs text-muted-foreground/70 font-mono">
                  {shortenAddress(entry.walletAddress)}
                </code>
                {entry.walletAddress && (
                  <button
                    onClick={handleCopyWallet}
                    className="p-1 hover:bg-muted rounded transition-colors"
                    aria-label="Copy wallet address"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-[#14F195]" />
                    ) : (
                      <Copy className="w-3 h-3 text-muted-foreground/70 hover:text-muted-foreground" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* XP */}
            <div className="text-center hidden sm:block">
              <div className="font-semibold text-sm md:text-base">{entry.xp.toLocaleString()}</div>
              <div className="text-muted-foreground text-xs">XP</div>
            </div>
            
            {/* Level */}
            <div className="text-center">
              <Badge variant="secondary" className="font-semibold bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10 border-[#14F195]/20">
                <span className="hidden sm:inline">Lvl </span>{entry.level}
              </Badge>
            </div>
            
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-semibold text-sm">{entry.streak}</span>
            </div>
          </div>
        </div>

        {/* Mobile: Show XP and Wallet below */}
        <div className="sm:hidden flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <code className="text-xs text-muted-foreground/70 font-mono">
              {shortenAddress(entry.walletAddress)}
            </code>
            {entry.walletAddress && (
              <button
                onClick={handleCopyWallet}
                className="p-1 hover:bg-muted rounded transition-colors"
                aria-label="Copy wallet address"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-[#14F195]" />
                ) : (
                  <Copy className="w-3 h-3 text-muted-foreground/70" />
                )}
              </button>
            )}
          </div>
          <div className="text-sm">
            <span className="font-semibold">{entry.xp.toLocaleString()}</span>
            <span className="text-muted-foreground text-xs ml-1">XP</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
