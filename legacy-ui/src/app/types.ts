// Core type definitions for the Solana Academy application

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
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  supply: number;
  nftMintAddress?: string;
}
