import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Certificate } from '../data/mockData';
import { CheckCircle2, Share2, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface CredentialNFTCardProps {
  certificate: Certificate;
  onView: (certificate: Certificate) => void;
}

export function CredentialNFTCard({ certificate, onView }: CredentialNFTCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: `${certificate.courseName} - Certificate`,
        text: `Check out my ${certificate.courseName} certificate on Solana Academy!`,
        url: `${window.location.origin}/certificates/${certificate.id}`,
      });
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-[#14F195]/10 text-[#14F195] border-[#14F195]/30';
      case 'Intermediate':
        return 'bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/30';
      case 'Advanced':
        return 'bg-[#9945FF]/10 text-[#9945FF] border-[#9945FF]/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:border-primary/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onView(certificate)}
      >
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/20 via-transparent to-[#9945FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-br from-[#14F195]/30 to-[#9945FF]/30 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-[#14F195]" />
                <Badge variant="outline" className="text-xs border-border/50">
                  Soulbound NFT
                </Badge>
              </div>
              <h3 className="font-heading text-lg mb-1 group-hover:gradient-solana-text transition-all">
                {certificate.courseName}
              </h3>
              <Badge variant="outline" className={`text-xs ${getLevelColor(certificate.level)}`}>
                {certificate.level}
              </Badge>
            </div>
            {certificate.verified && (
              <div className="p-2 bg-[#14F195]/10 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-[#14F195]" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completed</span>
              <span className="font-mono text-foreground">
                {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">XP Earned</span>
              <span className="font-heading gradient-solana-text">+{certificate.xpEarned.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">NFT Mint</span>
              <span className="font-mono text-xs text-foreground">
                {shortenAddress(certificate.nftMintAddress)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2 group/btn hover:bg-primary/10 hover:text-primary hover:border-primary/50"
              onClick={() => onView(certificate)}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Verify
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2 group/btn hover:bg-accent/10 hover:text-accent hover:border-accent/50"
              onClick={handleShare}
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
