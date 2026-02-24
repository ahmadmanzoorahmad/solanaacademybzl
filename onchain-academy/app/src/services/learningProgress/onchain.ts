import { Connection, PublicKey } from '@solana/web3.js';
import type { LearningProgressService, LessonProgressRecord } from './types';
import { fetchXpBalance, levelFromXp } from '@/services/xp';
import { getXpMint } from '@/lib/env';

export interface XpFetchResult {
  xp: number;
  mintConfigured: boolean;
}

export class OnchainLearningProgressService implements LearningProgressService {
  constructor(private connection: Connection) {}

  async getXpBalanceWithStatus(pubkey: string): Promise<XpFetchResult> {
    const mintAddress = getXpMint();
    if (!mintAddress) {
      return { xp: 0, mintConfigured: false };
    }

    try {
      const owner = new PublicKey(pubkey);
      const mint = new PublicKey(mintAddress);
      const xp = await fetchXpBalance(this.connection, owner, mint);
      return { xp, mintConfigured: true };
    } catch {
      return { xp: 0, mintConfigured: true };
    }
  }

  async getXpBalance(pubkey: string): Promise<number> {
    const result = await this.getXpBalanceWithStatus(pubkey);
    return result.xp;
  }

  getLevel(xp: number): number {
    return levelFromXp(xp);
  }

  async getLessonProgress(_pubkey: string, _courseId: string): Promise<LessonProgressRecord[]> {
    return [];
  }

  async markLessonComplete(_pubkey: string, _lessonId: string): Promise<void> {
    throw new Error('On-chain lesson completion not yet implemented');
  }

  async getTotalXp(pubkey: string): Promise<number> {
    return this.getXpBalance(pubkey);
  }
}
