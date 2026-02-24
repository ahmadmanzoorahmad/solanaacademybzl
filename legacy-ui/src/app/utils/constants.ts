export const DIFFICULTY_COLORS = {
  Beginner: 'bg-[#22C55E] text-white',
  Intermediate: 'bg-[#FACC15] text-black',
  Advanced: 'bg-[#EF4444] text-white',
} as const;

export const RARITY_COLORS = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-600',
} as const;

export const SOLANA_EXPLORER_BASE_URL = 'https://explorer.solana.com/address/';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/superteam',
  github: 'https://github.com/superteam',
  discord: 'https://discord.gg/superteam',
} as const;
