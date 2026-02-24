import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { DigitalIdentityHeader } from '../components/DigitalIdentityHeader';
import { StatsCard } from '../components/StatsCard';
import { SkillRadarChart } from '../components/SkillRadarChart';
import { TrackCredentialCard } from '../components/TrackCredentialCard';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { AccountLinkingCTA } from '../components/AccountLinkingCTA';
import { WalletLinkModal } from '../components/WalletLinkModal';
import { 
  currentUser, 
  courses,
} from '../data/mockData';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Flame,
  Trophy,
  BookOpen,
  Sparkles
} from 'lucide-react';

// Mock data for track credentials
interface TrackCredential {
  id: string;
  trackName: string;
  trackType: 'Fundamentals' | 'DeFi' | 'NFT' | 'Security' | 'Gaming';
  currentLevel: number;
  maxLevel: number;
  totalXP: number;
  coursesCompleted: number;
  totalCourses: number;
  nftMintAddress: string;
  isSoulbound: boolean;
  verified: boolean;
  lastUpdated: string;
}

const trackCredentials: TrackCredential[] = [
  {
    id: 'track-1',
    trackName: 'Solana Fundamentals',
    trackType: 'Fundamentals',
    currentLevel: 3,
    maxLevel: 5,
    totalXP: 3450,
    coursesCompleted: 2,
    totalCourses: 4,
    nftMintAddress: 'FndM8N2xK...9pLm4vR2',
    isSoulbound: true,
    verified: true,
    lastUpdated: '2025-02-20',
  },
  {
    id: 'track-2',
    trackName: 'DeFi Developer',
    trackType: 'DeFi',
    currentLevel: 2,
    maxLevel: 5,
    totalXP: 1500,
    coursesCompleted: 1,
    totalCourses: 3,
    nftMintAddress: 'DeFi7xW9K...3mNk8qT1',
    isSoulbound: true,
    verified: true,
    lastUpdated: '2025-02-18',
  },
  {
    id: 'track-3',
    trackName: 'NFT Specialist',
    trackType: 'NFT',
    currentLevel: 1,
    maxLevel: 5,
    totalXP: 500,
    coursesCompleted: 0,
    totalCourses: 3,
    nftMintAddress: 'NFT9pQ2L...8vLm6hN3',
    isSoulbound: true,
    verified: true,
    lastUpdated: '2025-02-15',
  },
];

// Mock activity events
interface ActivityEvent {
  id: string;
  type: 'enrolled' | 'lesson_completed' | 'xp_earned' | 'credential_minted' | 'challenge_completed' | 'achievement_earned';
  title: string;
  description: string;
  timestamp: string;
  metadata?: {
    xp?: number;
    courseName?: string;
    lessonName?: string;
    achievementName?: string;
  };
}

const activityEvents: ActivityEvent[] = [
  {
    id: 'event-1',
    type: 'lesson_completed',
    title: 'Lesson Completed',
    description: 'Finished "Understanding Solana Accounts"',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    metadata: { xp: 100, courseName: 'Solana Fundamentals' },
  },
  {
    id: 'event-2',
    type: 'xp_earned',
    title: 'XP Earned',
    description: 'Earned XP from daily streak bonus',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    metadata: { xp: 50 },
  },
  {
    id: 'event-3',
    type: 'challenge_completed',
    title: 'Challenge Completed',
    description: 'Solved "Create a Token Transfer Program"',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    metadata: { xp: 500 },
  },
  {
    id: 'event-4',
    type: 'credential_minted',
    title: 'Credential Minted',
    description: 'Received DeFi Developer Level 2 NFT',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'event-5',
    type: 'enrolled',
    title: 'Course Enrolled',
    description: 'Started "Advanced Anchor Framework"',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    metadata: { courseName: 'Advanced Anchor Framework' },
  },
  {
    id: 'event-6',
    type: 'achievement_earned',
    title: 'Achievement Unlocked',
    description: 'Earned "Week Warrior" achievement',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    metadata: { achievementName: 'Week Warrior', xp: 200 },
  },
];

export function DigitalIdentity() {
  const [walletLinkModalOpen, setWalletLinkModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(true); // Toggle to false to show CTA
  const [onChainVerified, setOnChainVerified] = useState(true);

  // Calculate stats
  const completedCourses = courses.filter((c) => c.enrolled && c.progress === 100).length;
  const totalChallenges = courses.reduce((acc, course) => {
    return acc + course.modules.reduce((modAcc, mod) => {
      return modAcc + mod.lessons.filter((l) => l.type === 'challenge' && l.completed).length;
    }, 0);
  }, 0);

  const earnedAchievements = 15; // Mock value

  const handleVerifyCredential = (credential: TrackCredential) => {
    window.open(`https://explorer.solana.com/address/${credential.nftMintAddress}`, '_blank');
  };

  const handleConnectWallet = () => {
    setWalletLinkModalOpen(true);
  };

  // Show CTA if wallet is not connected
  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading gradient-solana-text mb-2">
                Digital Identity
              </h1>
              <p className="text-muted-foreground">
                Your Web3-native profile and on-chain credentials
              </p>
            </div>
          </div>

          {/* Account Linking CTA */}
          <AccountLinkingCTA onConnect={handleConnectWallet} />
        </div>

        {/* Wallet Link Modal */}
        <WalletLinkModal
          open={walletLinkModalOpen}
          onOpenChange={setWalletLinkModalOpen}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading gradient-solana-text mb-2">
              Digital Identity
            </h1>
            <p className="text-muted-foreground">
              Your Web3-native profile and on-chain credentials
            </p>
          </div>
        </div>

        {/* Identity Header */}
        <DigitalIdentityHeader 
          isWalletConnected={isWalletConnected}
          onChainVerified={onChainVerified}
        />

        {/* Identity Stats Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-heading">Identity Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatsCard
              label="Total XP"
              value={currentUser.xp.toLocaleString()}
              icon={Sparkles}
              description="Token-2022"
              trend={{ value: 8.2, isPositive: true }}
            />
            
            <StatsCard
              label="Level"
              value={currentUser.level.toString()}
              icon={TrendingUp}
              description="Derived"
              trend={{ value: 12.5, isPositive: true }}
            />
            
            <StatsCard
              label="Courses"
              value={completedCourses.toString()}
              icon={BookOpen}
              description="Completed"
            />
            
            <StatsCard
              label="Challenges"
              value={totalChallenges.toString()}
              icon={Target}
              description="Solved"
            />
            
            <StatsCard
              label="Achievements"
              value={earnedAchievements.toString()}
              icon={Trophy}
            />
            
            <StatsCard
              label="Streak"
              value={`${currentUser.streak} Days`}
              icon={Flame}
              description="Current"
            />
          </div>
        </div>

        {/* Two Column Layout: Credentials & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Credentials & Skills */}
          <div className="lg:col-span-2 space-y-8">
            {/* Evolving Track Credentials */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading">Evolving Track Credentials</h2>
                  <p className="text-sm text-muted-foreground">Soulbound NFTs that level up as you progress</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {trackCredentials.map((credential) => (
                  <TrackCredentialCard
                    key={credential.id}
                    credential={credential}
                    onVerify={handleVerifyCredential}
                  />
                ))}
              </div>
            </div>

            {/* Skill Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SkillRadarChart />
            </motion.div>
          </div>

          {/* Right Column: Activity Timeline */}
          <div className="lg:col-span-1">
            <ActivityTimeline events={activityEvents} maxItems={10} />
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border border-border/50">
          <h3 className="font-heading mb-3">About Your Web3 Identity</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Your Solana Academy identity is wallet-first and fully on-chain. Your progress, credentials, 
              and achievements are verifiable by anyone on the blockchain.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Track credentials are Soulbound NFTs that evolve as you complete courses</li>
              <li>Your XP is tracked on-chain using Token-2022 standard</li>
              <li>Level is derived from your total XP automatically</li>
              <li>All credentials are verifiable on Solana Explorer</li>
              <li>Skills and stats are calculated from your learning activity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Wallet Link Modal */}
      <WalletLinkModal
        open={walletLinkModalOpen}
        onOpenChange={setWalletLinkModalOpen}
      />
    </div>
  );
}
