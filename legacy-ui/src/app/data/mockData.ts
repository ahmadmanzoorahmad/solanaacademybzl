import type { User, Course, Achievement, Module, Lesson, NFTAchievement } from '../types';

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

// Re-export types for convenience
export type { User, Course, Achievement, Module, Lesson, NFTAchievement };

export const currentUser: User = {
  id: 'user-1',
  username: 'solana_dev',
  name: 'Alex Chen',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  bio: 'Full-stack developer learning Solana. Passionate about DeFi and NFTs.',
  xp: 12450,
  level: 8,
  rank: 142,
  streak: 12,
  joinDate: '2024-01-15',
  socialLinks: {
    twitter: 'https://twitter.com/solana_dev',
    github: 'https://github.com/solana_dev',
  },
  skills: {
    rust: 65,
    anchor: 50,
    frontend: 85,
    security: 40,
  },
};

export const courses: Course[] = [
  {
    id: 'course-1',
    slug: 'solana-fundamentals',
    title: 'Solana Fundamentals',
    description: 'Master the basics of Solana blockchain development. Learn about accounts, transactions, and programs.',
    difficulty: 'Beginner',
    duration: '8 hours',
    xpReward: 1000,
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    category: 'Fundamentals',
    rating: 4.8,
    students: 2341,
    progress: 65,
    enrolled: true,
    modules: [
      {
        id: 'mod-1',
        title: 'Introduction to Solana',
        lessons: [
          { id: 'les-1', title: 'What is Solana?', duration: '15 min', type: 'reading', completed: true },
          { id: 'les-2', title: 'Setting up your environment', duration: '20 min', type: 'reading', completed: true },
          { id: 'les-3', title: 'Your first transaction', duration: '30 min', type: 'challenge', completed: false },
        ],
      },
      {
        id: 'mod-2',
        title: 'Accounts and Programs',
        lessons: [
          { id: 'les-4', title: 'Understanding accounts', duration: '25 min', type: 'reading', completed: false },
          { id: 'les-5', title: 'Program basics', duration: '30 min', type: 'video', completed: false },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    slug: 'defi-developer',
    title: 'DeFi Developer Track',
    description: 'Build decentralized finance applications on Solana. Learn AMMs, lending protocols, and yield farming.',
    difficulty: 'Advanced',
    duration: '24 hours',
    xpReward: 5000,
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800',
    category: 'DeFi',
    rating: 4.9,
    students: 1205,
    progress: 0,
    enrolled: false,
    modules: [
      {
        id: 'mod-3',
        title: 'DeFi Fundamentals',
        lessons: [
          { id: 'les-6', title: 'Introduction to DeFi', duration: '20 min', type: 'reading' },
          { id: 'les-7', title: 'AMM mechanics', duration: '45 min', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'course-3',
    slug: 'anchor-framework',
    title: 'Anchor Framework Mastery',
    description: 'Deep dive into Anchor, the most popular framework for Solana development.',
    difficulty: 'Intermediate',
    duration: '16 hours',
    xpReward: 3000,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    category: 'Development',
    rating: 4.7,
    students: 1876,
    progress: 25,
    enrolled: true,
    modules: [
      {
        id: 'mod-4',
        title: 'Anchor Basics',
        lessons: [
          { id: 'les-8', title: 'Setting up Anchor', duration: '15 min', type: 'reading', completed: true },
          { id: 'les-9', title: 'Your first Anchor program', duration: '40 min', type: 'challenge', completed: false },
        ],
      },
    ],
  },
  {
    id: 'course-4',
    slug: 'solana-security',
    title: 'Security & Auditing',
    description: 'Learn how to write secure Solana programs and conduct security audits.',
    difficulty: 'Advanced',
    duration: '20 hours',
    xpReward: 4000,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    category: 'Security',
    rating: 5.0,
    students: 892,
    progress: 0,
    enrolled: false,
    modules: [],
  },
  {
    id: 'course-5',
    slug: 'nft-development',
    title: 'NFT Development',
    description: 'Create NFT marketplaces and minting platforms on Solana.',
    difficulty: 'Intermediate',
    duration: '12 hours',
    xpReward: 2500,
    thumbnail: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800',
    category: 'NFT',
    rating: 4.6,
    students: 1654,
    progress: 0,
    enrolled: false,
    modules: [],
  },
  {
    id: 'course-6',
    slug: 'rust-for-solana',
    title: 'Rust for Solana Developers',
    description: 'Master Rust programming specifically for Solana blockchain development.',
    difficulty: 'Beginner',
    duration: '10 hours',
    xpReward: 1500,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    category: 'Programming',
    rating: 4.8,
    students: 3102,
    progress: 0,
    enrolled: false,
    modules: [],
  },
];

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'Footprints',
    earned: true,
    earnedDate: '2024-01-16',
    rarity: 'common',
  },
  {
    id: 'ach-2',
    title: 'Code Warrior',
    description: 'Complete 10 coding challenges',
    icon: 'Sword',
    earned: true,
    earnedDate: '2024-02-05',
    rarity: 'rare',
  },
  {
    id: 'ach-3',
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: 'Flame',
    earned: true,
    earnedDate: '2024-02-10',
    rarity: 'epic',
  },
  {
    id: 'ach-4',
    title: 'Knowledge Seeker',
    description: 'Complete your first course',
    icon: 'GraduationCap',
    earned: false,
    rarity: 'rare',
  },
  {
    id: 'ach-5',
    title: 'Solana Master',
    description: 'Reach level 10',
    icon: 'Crown',
    earned: false,
    rarity: 'legendary',
  },
];

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    courseId: 'course-1',
    courseName: 'Solana Fundamentals',
    recipientName: 'Alex Chen',
    completionDate: '2024-02-15',
    nftMintAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    verified: true,
    level: 'Beginner',
    xpEarned: 1000,
    metadataUri: 'https://arweave.net/1234567890abcdef',
    transactionSignature: '4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    ownerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    trackName: 'Solana Developer',
    completedCoursesCount: 3,
    lastUpdated: '2024-02-23',
    totalXP: 12450,
  },
  {
    id: 'cert-2',
    courseId: 'course-3',
    courseName: 'Anchor Framework Mastery',
    recipientName: 'Alex Chen',
    completionDate: '2024-02-20',
    nftMintAddress: '8yLYug3DH98e98UYJSDpbD5jBkheTqA83TZRuJosgBvV',
    verified: true,
    level: 'Intermediate',
    xpEarned: 3000,
    metadataUri: 'https://arweave.net/abcdef1234567890',
    transactionSignature: 'def1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    ownerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    trackName: 'DeFi Specialist',
    completedCoursesCount: 5,
    lastUpdated: '2024-02-22',
    totalXP: 18750,
  },
  {
    id: 'cert-3',
    courseId: 'course-6',
    courseName: 'Rust for Solana Developers',
    recipientName: 'Alex Chen',
    completionDate: '2024-01-28',
    nftMintAddress: '9zMZvh4EI09f09VZKTEqcE6kClmfUuB94U0SvKpthCwW',
    verified: true,
    level: 'Beginner',
    xpEarned: 1500,
    metadataUri: 'https://arweave.net/fedcba0987654321',
    transactionSignature: 'ghi1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    ownerWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    trackName: 'Rust Developer',
    completedCoursesCount: 2,
    lastUpdated: '2024-02-10',
    totalXP: 8900,
  },
];

export const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: 'user-2',
      username: 'crypto_master',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: '',
      xp: 45230,
      level: 18,
      rank: 1,
      streak: 45,
      joinDate: '2023-11-01',
      socialLinks: {},
      skills: { rust: 95, anchor: 90, frontend: 88, security: 92 },
    },
    xp: 45230,
    level: 18,
    streak: 45,
    walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    track: 'Solana Developer',
  },
  {
    rank: 2,
    user: {
      id: 'user-3',
      username: 'dev_ninja',
      name: 'Marcus Lee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: '',
      xp: 38940,
      level: 16,
      rank: 2,
      streak: 32,
      joinDate: '2023-12-05',
      socialLinks: {},
      skills: { rust: 88, anchor: 85, frontend: 90, security: 78 },
    },
    xp: 38940,
    level: 16,
    streak: 32,
    walletAddress: '8yLYug3DH98e98UYJSDpbD5jBkheTqA83TZRuJosgBvV',
    track: 'DeFi Specialist',
  },
  {
    rank: 3,
    user: {
      id: 'user-4',
      username: 'blockchain_pro',
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: '',
      xp: 32150,
      level: 14,
      rank: 3,
      streak: 28,
      joinDate: '2024-01-08',
      socialLinks: {},
      skills: { rust: 82, anchor: 88, frontend: 75, security: 85 },
    },
    xp: 32150,
    level: 14,
    streak: 28,
    walletAddress: '9zMZvh4EI09f09VZKTEqcE6kClmfUuB94U0SvKpthCwW',
    track: 'Rust Developer',
  },
  {
    rank: 4,
    user: {
      id: 'user-5',
      username: 'defi_wizard',
      name: 'Kenji Tanaka',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      bio: '',
      xp: 28750,
      level: 13,
      rank: 4,
      streak: 21,
      joinDate: '2024-01-12',
      socialLinks: {},
      skills: { rust: 75, anchor: 92, frontend: 70, security: 88 },
    },
    xp: 28750,
    level: 13,
    streak: 21,
    walletAddress: 'AzJKmg5HN21g21WZLTFrcD6lCmnheTrB94V1TwLqteEwX',
    track: 'DeFi Specialist',
  },
  {
    rank: 5,
    user: {
      id: 'user-6',
      username: 'nft_builder',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      bio: '',
      xp: 26340,
      level: 12,
      rank: 5,
      streak: 18,
      joinDate: '2024-01-20',
      socialLinks: {},
      skills: { rust: 70, anchor: 78, frontend: 95, security: 65 },
    },
    xp: 26340,
    level: 12,
    streak: 18,
    walletAddress: 'BqNPoh6JO32h32XAMUGsdE7mDonifUsC05W2UxMruFyY',
    track: 'NFT Developer',
  },
  {
    rank: 6,
    user: {
      id: 'user-7',
      username: 'sec_auditor',
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: '',
      xp: 24890,
      level: 12,
      rank: 6,
      streak: 15,
      joinDate: '2023-12-18',
      socialLinks: {},
      skills: { rust: 90, anchor: 82, frontend: 60, security: 98 },
    },
    xp: 24890,
    level: 12,
    streak: 15,
    walletAddress: 'CrOQpi7KP43i43YBNVHteF8nEpqkgVtD16X3VyNsvGzZ',
    track: 'Security Specialist',
  },
  {
    rank: 7,
    user: {
      id: 'user-8',
      username: 'rust_enthusiast',
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      bio: '',
      xp: 22150,
      level: 11,
      rank: 7,
      streak: 25,
      joinDate: '2024-01-05',
      socialLinks: {},
      skills: { rust: 98, anchor: 75, frontend: 68, security: 72 },
    },
    xp: 22150,
    level: 11,
    streak: 25,
    walletAddress: 'DsPRqj8LQ54j54ZCOWIufG9oFqrlhWuE27Y4WzOtwHaA',
    track: 'Rust Developer',
  },
  {
    rank: 8,
    user: {
      id: 'user-9',
      username: 'solana_newbie',
      name: 'Ahmed Hassan',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
      bio: '',
      xp: 19820,
      level: 10,
      rank: 8,
      streak: 12,
      joinDate: '2024-02-01',
      socialLinks: {},
      skills: { rust: 65, anchor: 70, frontend: 82, security: 58 },
    },
    xp: 19820,
    level: 10,
    streak: 12,
    walletAddress: 'EtQSrk9MR65k65aDPXJvgHApGssmjXvF38Z5XAQuxIbB',
    track: 'Solana Developer',
  },
  {
    rank: 9,
    user: {
      id: 'user-10',
      username: 'anchor_ace',
      name: 'Sophie Chen',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: '',
      xp: 18540,
      level: 10,
      rank: 9,
      streak: 9,
      joinDate: '2024-01-25',
      socialLinks: {},
      skills: { rust: 72, anchor: 95, frontend: 78, security: 70 },
    },
    xp: 18540,
    level: 10,
    streak: 9,
    walletAddress: 'FuRTsl0NS76l76bEQYKwhIBqHttokYwG49A6YBRvyJcC',
    track: 'Solana Developer',
  },
  {
    rank: 10,
    user: {
      id: 'user-11',
      username: 'web3_explorer',
      name: 'Lucas Silva',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
      bio: '',
      xp: 16290,
      level: 9,
      rank: 10,
      streak: 7,
      joinDate: '2024-02-05',
      socialLinks: {},
      skills: { rust: 60, anchor: 68, frontend: 88, security: 55 },
    },
    xp: 16290,
    level: 9,
    streak: 7,
    walletAddress: 'GvSTtm1OT87m87cFRZLxiJCsIuuply1H5aB7ZCSvzKdD',
    track: 'NFT Developer',
  },
  {
    rank: 142,
    user: currentUser,
    xp: currentUser.xp,
    level: currentUser.level,
    streak: currentUser.streak,
    walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    track: 'Solana Developer',
  },
];

export const lessonContent = `# Understanding Solana Accounts

In this lesson, you'll learn about one of the most fundamental concepts in Solana: **accounts**.

## What are Accounts?

Accounts are the basic storage unit in Solana. Unlike Ethereum, where smart contracts store state within themselves, Solana separates code from data.

### Key Points:
- **Everything is an account** - Programs, data, and even native programs
- **Accounts store data** - Each account can hold up to 10MB of data
- **Accounts have owners** - Only the owner can modify the account's data
- **Accounts cost SOL** - You pay rent to keep accounts alive

## Account Structure

\`\`\`rust
pub struct Account {
    pub lamports: u64,        // Balance in lamports
    pub data: Vec<u8>,        // Stored data
    pub owner: Pubkey,        // Owner program
    pub executable: bool,     // Can this be executed?
    pub rent_epoch: Epoch,    // Next rent collection
}
\`\`\`

## Challenge

Now it's your turn! Create a simple program that initializes a new account.`;

export const codeChallenge = {
  id: 'challenge-1',
  title: 'Create Your First Account',
  description: 'Write a function that initializes a Solana account',
  difficulty: 'Beginner',
  estimatedTime: '30 min',
  xpReward: 75,
  objectives: [
    'Import necessary modules',
    'Define account structure',
    'Initialize the account',
    'Set the owner',
  ],
  hints: [
    {
      level: 'small',
      content: 'Start by importing the necessary modules from solana_program. You\'ll need AccountInfo, Pubkey, and ProgramResult to create a basic program structure.',
    },
    {
      level: 'medium',
      content: 'Use the msg! macro to log messages to the console. Access the first account from the accounts array using an iterator and the next() method.',
    },
    {
      level: 'full',
      content: 'Complete solution: After iterating through accounts, verify that the account owner matches the program_id. Use ProgramError::IncorrectProgramId if they don\'t match. Don\'t forget to import the msg macro and ProgramError.',
    },
  ],
  starterCode: `use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // Your code here
    
    Ok(())
}`,
  solution: `use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Initializing account...");
    
    let accounts_iter = &mut accounts.iter();
    let account = accounts_iter.next().ok_or(ProgramError::NotEnoughAccountKeys)?;
    
    // Verify the account is owned by this program
    if account.owner != program_id {
        return Err(ProgramError::IncorrectProgramId);
    }
    
    msg!("Account initialized successfully!");
    Ok(())
}`,
  testCases: [
    { name: 'Imports correct modules', passed: true },
    { name: 'Defines entrypoint', passed: true },
    { name: 'Handles accounts correctly', passed: false },
    { name: 'Returns ProgramResult', passed: true },
  ],
};

// NFT Achievements - Gamification
export const nftAchievements: NFTAchievement[] = [
  // Progress Category
  {
    id: 'nft-ach-1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    category: 'Progress',
    icon: '🚀',
    earned: true,
    earnedDate: '2024-01-16',
    xpReward: 50,
    rarity: 'common',
    supply: 10000,
    nftMintAddress: 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0',
  },
  {
    id: 'nft-ach-2',
    title: 'Course Starter',
    description: 'Enroll in your first course',
    category: 'Progress',
    icon: '📚',
    earned: true,
    earnedDate: '2024-01-15',
    xpReward: 100,
    rarity: 'common',
    supply: 10000,
    nftMintAddress: 'B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1',
  },
  {
    id: 'nft-ach-3',
    title: 'Module Master',
    description: 'Complete an entire module',
    category: 'Progress',
    icon: '📖',
    earned: true,
    earnedDate: '2024-01-20',
    xpReward: 250,
    rarity: 'rare',
    supply: 5000,
    nftMintAddress: 'C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2',
  },
  {
    id: 'nft-ach-4',
    title: 'Course Champion',
    description: 'Complete your first course',
    category: 'Progress',
    icon: '🎓',
    earned: false,
    xpReward: 500,
    rarity: 'epic',
    supply: 2000,
  },
  {
    id: 'nft-ach-5',
    title: 'Learning Legend',
    description: 'Complete 5 courses',
    category: 'Progress',
    icon: '👑',
    earned: false,
    xpReward: 2000,
    rarity: 'legendary',
    supply: 100,
  },
  
  // Streaks Category
  {
    id: 'nft-ach-6',
    title: '3-Day Streak',
    description: 'Learn for 3 consecutive days',
    category: 'Streaks',
    icon: '🔥',
    earned: true,
    earnedDate: '2024-01-18',
    xpReward: 150,
    rarity: 'common',
    supply: 8000,
    nftMintAddress: 'D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3',
  },
  {
    id: 'nft-ach-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    category: 'Streaks',
    icon: '⚡',
    earned: true,
    earnedDate: '2024-01-22',
    xpReward: 300,
    rarity: 'rare',
    supply: 4000,
    nftMintAddress: 'E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4',
  },
  {
    id: 'nft-ach-8',
    title: 'Month Master',
    description: 'Maintain a 30-day learning streak',
    category: 'Streaks',
    icon: '💫',
    earned: false,
    xpReward: 1000,
    rarity: 'epic',
    supply: 1000,
  },
  {
    id: 'nft-ach-9',
    title: 'Unstoppable',
    description: 'Maintain a 100-day learning streak',
    category: 'Streaks',
    icon: '🌟',
    earned: false,
    xpReward: 5000,
    rarity: 'legendary',
    supply: 50,
  },
  
  // Skills Category
  {
    id: 'nft-ach-10',
    title: 'Rust Novice',
    description: 'Reach 25% proficiency in Rust',
    category: 'Skills',
    icon: '🦀',
    earned: true,
    earnedDate: '2024-02-01',
    xpReward: 200,
    rarity: 'common',
    supply: 7000,
    nftMintAddress: 'F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5',
  },
  {
    id: 'nft-ach-11',
    title: 'Anchor Apprentice',
    description: 'Reach 50% proficiency in Anchor',
    category: 'Skills',
    icon: '⚓',
    earned: true,
    earnedDate: '2024-02-08',
    xpReward: 350,
    rarity: 'rare',
    supply: 3500,
    nftMintAddress: 'G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6',
  },
  {
    id: 'nft-ach-12',
    title: 'Security Specialist',
    description: 'Master security fundamentals',
    category: 'Skills',
    icon: '🛡️',
    earned: false,
    xpReward: 800,
    rarity: 'epic',
    supply: 1500,
  },
  {
    id: 'nft-ach-13',
    title: 'DeFi Expert',
    description: 'Complete all DeFi courses',
    category: 'Skills',
    icon: '💰',
    earned: false,
    xpReward: 3000,
    rarity: 'legendary',
    supply: 200,
  },
  
  // Community Category
  {
    id: 'nft-ach-14',
    title: 'Helper',
    description: 'Help 5 fellow learners',
    category: 'Community',
    icon: '🤝',
    earned: true,
    earnedDate: '2024-02-05',
    xpReward: 250,
    rarity: 'rare',
    supply: 5000,
    nftMintAddress: 'H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7',
  },
  {
    id: 'nft-ach-15',
    title: 'Community Contributor',
    description: 'Share 10 solutions',
    category: 'Community',
    icon: '💬',
    earned: false,
    xpReward: 500,
    rarity: 'epic',
    supply: 2000,
  },
  {
    id: 'nft-ach-16',
    title: 'Mentor',
    description: 'Guide 20+ learners',
    category: 'Community',
    icon: '🎖️',
    earned: false,
    xpReward: 2500,
    rarity: 'legendary',
    supply: 100,
  },
  
  // Special Category
  {
    id: 'nft-ach-17',
    title: 'Early Adopter',
    description: 'Join Solana Academy in beta',
    category: 'Special',
    icon: '🌱',
    earned: true,
    earnedDate: '2024-01-15',
    xpReward: 1000,
    rarity: 'epic',
    supply: 500,
    nftMintAddress: 'I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8',
  },
  {
    id: 'nft-ach-18',
    title: 'Challenge Creator',
    description: 'Create a verified challenge',
    category: 'Special',
    icon: '🎨',
    earned: false,
    xpReward: 1500,
    rarity: 'epic',
    supply: 1000,
  },
  {
    id: 'nft-ach-19',
    title: 'Solana OG',
    description: 'Exclusive founder badge',
    category: 'Special',
    icon: '💎',
    earned: false,
    xpReward: 10000,
    rarity: 'legendary',
    supply: 10,
  },
];

// Wallet Connections
export const walletConnections: WalletConnection[] = [
  {
    id: 'wallet-1',
    type: 'wallet',
    name: 'Phantom',
    address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    isPrimary: true,
    connectedDate: '2024-01-15',
    avatar: 'https://phantom.app/img/logo.png',
  },
  {
    id: 'wallet-2',
    type: 'github',
    name: 'GitHub',
    username: 'solana_dev',
    isPrimary: false,
    connectedDate: '2024-01-16',
  },
  {
    id: 'wallet-3',
    type: 'google',
    name: 'Google',
    email: 'alex.chen@example.com',
    isPrimary: false,
    connectedDate: '2024-01-15',
  },
];