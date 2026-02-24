export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  xp: number;
  level: number;
  rank: number;
  streak: number;
  joinDate: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    discord?: string;
  };
  skills: {
    rust: number;
    anchor: number;
    frontend: number;
    security: number;
  };
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  xpReward: number;
  thumbnail: string;
  category: string;
  rating: number;
  students: number;
  progress?: number;
  enrolled?: boolean;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'reading' | 'video' | 'challenge';
  completed?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface NFTAchievement extends Achievement {
  category: string;
  xpReward: number;
  supply: number;
  nftMintAddress?: string;
}

export interface WalletConnection {
  id: string;
  type: 'wallet' | 'google' | 'github';
  name: string;
  address?: string;
  email?: string;
  username?: string;
  isPrimary: boolean;
  connectedDate: string;
  avatar?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  xp: number;
  level: number;
  streak: number;
  walletAddress?: string;
  track?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  recipientName: string;
  completionDate: string;
  nftMintAddress: string;
  verified: boolean;
  level: string;
  xpEarned: number;
  metadataUri?: string;
  transactionSignature?: string;
  ownerWallet?: string;
  trackName?: string;
  completedCoursesCount?: number;
  lastUpdated?: string;
  totalXP?: number;
}

export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  xpReward: number;
  objectives: string[];
  hints: { level: string; content: string }[];
  starterCode: string;
  solution: string;
  testCases: { name: string; passed: boolean }[];
}
