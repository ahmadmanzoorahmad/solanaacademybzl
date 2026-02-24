import type { LeaderboardService, LeaderboardEntry, LeaderboardTimeframe } from './types';
import { getHeliusApiKey, getSolanaCluster, getXpMint } from '@/lib/env';
import { levelFromXp } from '@/services/xp';

interface TokenAccount {
  address: string;
  owner: string;
  amount: number;
  decimals: number;
}

interface HeliusTokenAccountsResult {
  total: number;
  token_accounts: TokenAccount[];
}

const cache = new Map<LeaderboardTimeframe, { data: LeaderboardEntry[]; ts: number }>();

function cacheTtl(timeframe: LeaderboardTimeframe): number {
  switch (timeframe) {
    case 'weekly': return 60_000;
    case 'monthly': return 120_000;
    case 'all': return 300_000;
  }
}

export class HeliusLeaderboardService implements LeaderboardService {
  private cachedAll: LeaderboardEntry[] | null = null;
  private cachedAllTs = 0;

  async getLeaderboard(timeframe: LeaderboardTimeframe): Promise<LeaderboardEntry[]> {
    const cached = cache.get(timeframe);
    if (cached && Date.now() - cached.ts < cacheTtl(timeframe)) {
      return cached.data;
    }

    const entries = await this.fetchLeaderboardEntries();

    let result: LeaderboardEntry[];
    if (timeframe === 'weekly') {
      result = entries.slice(0, 20);
    } else if (timeframe === 'monthly') {
      result = entries.slice(0, 50);
    } else {
      result = entries;
    }

    cache.set(timeframe, { data: result, ts: Date.now() });
    return result;
  }

  async getUserRank(pubkey: string): Promise<number> {
    const entries = await this.fetchLeaderboardEntries();
    const idx = entries.findIndex((e) => e.wallet === pubkey);
    return idx >= 0 ? idx + 1 : 0;
  }

  private async fetchLeaderboardEntries(): Promise<LeaderboardEntry[]> {
    if (this.cachedAll && Date.now() - this.cachedAllTs < 60_000) {
      return this.cachedAll;
    }

    const apiKey = getHeliusApiKey();
    if (!apiKey) {
      return [];
    }

    const xpMint = getXpMint();
    if (!xpMint) {
      return [];
    }

    const cluster = getSolanaCluster();

    try {
      const dasUrl = cluster === 'mainnet-beta'
        ? `https://mainnet.helius-rpc.com/?api-key=${apiKey}`
        : `https://devnet.helius-rpc.com/?api-key=${apiKey}`;

      const response = await fetch(dasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'get-token-accounts',
          method: 'getTokenAccounts',
          params: {
            mint: xpMint,
            page: 1,
            limit: 1000,
          },
        }),
      });

      if (!response.ok) {
        console.error(`[heliusLeaderboard] DAS returned ${response.status}`);
        return [];
      }

      const json = await response.json() as {
        result?: HeliusTokenAccountsResult;
        error?: { message: string };
      };

      if (json.error) {
        console.error(`[heliusLeaderboard] DAS error: ${json.error.message}`);
        return [];
      }

      const accounts = json.result?.token_accounts ?? [];

      const walletXp = new Map<string, number>();
      for (const acct of accounts) {
        const xp = acct.decimals > 0
          ? Math.floor(acct.amount / Math.pow(10, acct.decimals))
          : acct.amount;
        const existing = walletXp.get(acct.owner) ?? 0;
        walletXp.set(acct.owner, existing + xp);
      }

      const entries: LeaderboardEntry[] = Array.from(walletXp.entries())
        .map(([wallet, xp]) => ({
          rank: 0,
          wallet,
          xp,
          level: levelFromXp(xp),
        }))
        .sort((a, b) => b.xp - a.xp)
        .map((e, i) => ({ ...e, rank: i + 1 }));

      this.cachedAll = entries;
      this.cachedAllTs = Date.now();
      return entries;
    } catch (err) {
      console.error('[heliusLeaderboard] fetch error:', err);
      return [];
    }
  }
}
