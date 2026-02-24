import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Shield, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles,
  TrendingUp,
  BookOpen,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

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

interface TrackCredentialCardProps {
  credential: TrackCredential;
  onVerify: (credential: TrackCredential) => void;
}

export function TrackCredentialCard({ credential, onVerify }: TrackCredentialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getTrackColor = (trackType: TrackCredential['trackType']) => {
    switch (trackType) {
      case 'Fundamentals':
        return {
          gradient: 'from-blue-500 to-cyan-500',
          bg: 'bg-blue-500/10',
          text: 'text-blue-400',
          border: 'border-blue-500/30',
        };
      case 'DeFi':
        return {
          gradient: 'from-[#14F195] to-[#22D3EE]',
          bg: 'bg-[#14F195]/10',
          text: 'text-[#14F195]',
          border: 'border-[#14F195]/30',
        };
      case 'NFT':
        return {
          gradient: 'from-[#9945FF] to-[#14F195]',
          bg: 'bg-[#9945FF]/10',
          text: 'text-[#9945FF]',
          border: 'border-[#9945FF]/30',
        };
      case 'Security':
        return {
          gradient: 'from-red-500 to-orange-500',
          bg: 'bg-red-500/10',
          text: 'text-red-400',
          border: 'border-red-500/30',
        };
      case 'Gaming':
        return {
          gradient: 'from-purple-500 to-pink-500',
          bg: 'bg-purple-500/10',
          text: 'text-purple-400',
          border: 'border-purple-500/30',
        };
    }
  };

  const trackColor = getTrackColor(credential.trackType);
  const progressPercentage = (credential.currentLevel / credential.maxLevel) * 100;
  const courseProgressPercentage = (credential.coursesCompleted / credential.totalCourses) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group relative overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Glow */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-br ${trackColor.gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shield className={`h-4 w-4 ${trackColor.text}`} />
                <Badge 
                  variant="outline" 
                  className={`text-xs ${trackColor.bg} ${trackColor.text} ${trackColor.border}`}
                >
                  Soulbound NFT
                </Badge>
              </div>
              <h3 className="font-heading text-lg mb-1">
                {credential.trackName}
              </h3>
              <p className="text-xs text-muted-foreground">
                Evolving Track Credential
              </p>
            </div>
            {credential.verified && (
              <div className={`p-2 ${trackColor.bg} rounded-full`}>
                <CheckCircle2 className={`h-5 w-5 ${trackColor.text}`} />
              </div>
            )}
          </div>

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Track Level</span>
              <div className="flex items-center gap-1.5">
                <TrendingUp className={`h-3.5 w-3.5 ${trackColor.text}`} />
                <span className="font-heading">
                  Level {credential.currentLevel} / {credential.maxLevel}
                </span>
              </div>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`${trackColor.bg} rounded-lg p-3 border ${trackColor.border}`}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className={`h-3.5 w-3.5 ${trackColor.text}`} />
                <span className="text-xs text-muted-foreground">Total XP</span>
              </div>
              <p className={`text-lg font-heading ${trackColor.text}`}>
                {credential.totalXP.toLocaleString()}
              </p>
            </div>
            <div className={`${trackColor.bg} rounded-lg p-3 border ${trackColor.border}`}>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className={`h-3.5 w-3.5 ${trackColor.text}`} />
                <span className="text-xs text-muted-foreground">Courses</span>
              </div>
              <p className={`text-lg font-heading ${trackColor.text}`}>
                {credential.coursesCompleted} / {credential.totalCourses}
              </p>
            </div>
          </div>

          {/* Course Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Course Progress</span>
              <span className={`font-medium ${trackColor.text}`}>
                {Math.round(courseProgressPercentage)}%
              </span>
            </div>
            <Progress 
              value={courseProgressPercentage} 
              className="h-1.5"
            />
          </div>

          {/* NFT Mint Address */}
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">NFT Mint</span>
              <span className="font-mono text-foreground">
                {shortenAddress(credential.nftMintAddress)}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant="outline"
            size="sm"
            className={`w-full gap-2 group/btn hover:${trackColor.bg} hover:${trackColor.text} hover:${trackColor.border}`}
            onClick={() => onVerify(credential)}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Verify On-Chain
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
