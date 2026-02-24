export interface LeaderboardService {
  getLeaderboard(timeframe: LeaderboardTimeframe, track?: string): Promise<LeaderboardEntry[]>;
  getUserRank(pubkey: string): Promise<number>;
}

export type LeaderboardTimeframe = 'weekly' | 'monthly' | 'all';

export interface LeaderboardEntry {
  rank: number;
  wallet: string;
  displayName?: string;
  xp: number;
  level: number;
  avatarUrl?: string;
  streak?: number;
}
