import { Connection, PublicKey } from '@solana/web3.js';

export async function fetchXpBalance(
  connection: Connection,
  owner: PublicKey,
  xpMint: PublicKey
): Promise<number> {
  const response = await connection.getParsedTokenAccountsByOwner(
    owner,
    { mint: xpMint },
    'confirmed'
  );

  if (response.value.length === 0) {
    return 0;
  }

  const parsed = response.value[0].account.data.parsed as {
    info: {
      tokenAmount: {
        uiAmount: number | null;
        amount: string;
        decimals: number;
      };
    };
  };

  const { uiAmount, amount, decimals } = parsed.info.tokenAmount;

  if (uiAmount !== null) {
    return Math.floor(uiAmount);
  }

  return Math.floor(Number(amount) / Math.pow(10, decimals));
}

export function levelFromXp(xp: number): number {
  if (xp <= 0) return 0;
  return Math.floor(Math.sqrt(xp / 100));
}

export function levelProgress(xp: number): {
  level: number;
  current: number;
  nextLevelXp: number;
  pct: number;
} {
  const level = levelFromXp(xp);
  const xpForCurrentLevel = level * level * 100;
  const xpForNextLevel = (level + 1) * (level + 1) * 100;
  const current = xp - xpForCurrentLevel;
  const nextLevelXp = xpForNextLevel - xpForCurrentLevel;
  const pct = nextLevelXp > 0 ? Math.min((current / nextLevelXp) * 100, 100) : 0;

  return { level, current, nextLevelXp, pct };
}

export function calculateXPForLevel(level: number): number {
  return level * 1000 + (level - 1) * 500;
}

export function calculateXPProgress(currentXP: number, level: number) {
  const xpForCurrentLevel = calculateXPForLevel(level);
  const xpForNextLevel = calculateXPForLevel(level + 1);
  const xpInCurrentLevel = currentXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const progress = Math.min((xpInCurrentLevel / xpNeededForNextLevel) * 100, 100);
  return { xpInCurrentLevel, xpNeededForNextLevel, progress };
}

export function getLevelTitle(level: number): string {
  if (level >= 20) return 'Solana Legend';
  if (level >= 15) return 'Master Builder';
  if (level >= 10) return 'Expert Developer';
  if (level >= 5) return 'Skilled Coder';
  return 'Beginner';
}
