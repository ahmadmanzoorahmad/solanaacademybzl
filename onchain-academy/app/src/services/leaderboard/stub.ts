import type { LeaderboardService, LeaderboardEntry, LeaderboardTimeframe } from './types';
import { levelFromXp } from '@/services/xp';

const NAMES = [
  'Sarah Johnson', 'Marcus Lee', 'Elena Rodriguez', 'Kenji Tanaka',
  'Priya Sharma', 'James Wilson', 'Maria Garcia', 'Ahmed Hassan',
  'Sophie Chen', 'Lucas Silva', 'Aisha Patel', 'David Kim',
  'Olivia Brown', 'Rafael Santos', 'Yuki Nakamura', 'Emma Davis',
  'Carlos Mendez', 'Fatima Al-Rashid', 'Liam Murphy', 'Chloe Dubois',
];

const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100',
  'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=100',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100',
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100',
  'https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=100',
  'https://images.unsplash.com/photo-1480429370612-2cd5a2f49e28?w=100',
  'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100',
];

function makeWallet(index: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const seed = index * 7 + 42;
  for (let i = 0; i < 44; i++) {
    result += chars[(seed * (i + 1) * 13 + i * 7) % chars.length];
  }
  return result;
}

const XP_VALUES = [
  45230, 38940, 32150, 28750, 26340, 24890, 22150, 19820,
  18540, 16290, 14870, 13650, 12400, 11200, 10050, 9100,
  8250, 7400, 6700, 5900,
];

const STREAKS = [45, 32, 28, 21, 18, 15, 25, 12, 9, 7, 14, 22, 5, 11, 8, 3, 16, 6, 10, 4];

function buildEntries(): LeaderboardEntry[] {
  return XP_VALUES
    .map((xp, i) => ({
      rank: i + 1,
      wallet: makeWallet(i),
      displayName: NAMES[i],
      xp,
      level: levelFromXp(xp),
      avatarUrl: AVATARS[i],
      streak: STREAKS[i],
    }))
    .sort((a, b) => b.xp - a.xp)
    .map((e, i) => ({ ...e, rank: i + 1 }));
}

const ALL_ENTRIES = buildEntries();

export class StubLeaderboardService implements LeaderboardService {
  async getLeaderboard(_timeframe: LeaderboardTimeframe): Promise<LeaderboardEntry[]> {
    if (_timeframe === 'weekly') {
      return ALL_ENTRIES.slice(0, 10);
    }
    if (_timeframe === 'monthly') {
      return ALL_ENTRIES.slice(0, 15);
    }
    return ALL_ENTRIES;
  }

  async getUserRank(_pubkey: string): Promise<number> {
    const found = ALL_ENTRIES.findIndex((e) => e.wallet === _pubkey);
    return found >= 0 ? found + 1 : 142;
  }
}
