import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Certificate } from '../data/mockData';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Award,
  Calendar,
  Coins,
  User
} from 'lucide-react';

interface VerificationStatusCardProps {
  certificate: Certificate | null;
  isValid: boolean;
  isLoading?: boolean;
}

export function VerificationStatusCard({ 
  certificate, 
  isValid, 
  isLoading = false 
}: VerificationStatusCardProps) {
  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </Card>
    );
  }

  if (!certificate || !isValid) {
    return (
      <Card className="max-w-2xl mx-auto p-8 border-2 border-destructive/50 bg-gradient-to-br from-destructive/5 to-destructive/10">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-destructive/10 rounded-full">
              <XCircle className="h-16 w-16 text-destructive" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-heading text-destructive mb-2">Invalid Certificate</h2>
            <p className="text-muted-foreground">
              This certificate could not be verified on the Solana blockchain.
              Please check the NFT mint address and try again.
            </p>
          </div>

          <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/30">
            <p className="text-sm text-muted-foreground">
              ⚠️ This may indicate a fake or expired certificate. Always verify certificates
              through official channels.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto overflow-hidden border-2 border-[#14F195]/50 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm">
      {/* Header with Status */}
      <div className="bg-gradient-to-r from-[#14F195]/20 to-[#9945FF]/20 p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#14F195]/20 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-[#14F195]" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2 bg-[#14F195]/10 text-[#14F195] border-[#14F195]/30">
                ✓ Valid Certificate
              </Badge>
              <h2 className="text-2xl font-heading">Certificate Verified</h2>
            </div>
          </div>
          <Award className="h-12 w-12 text-[#9945FF]/50" />
        </div>
      </div>

      {/* Certificate Details */}
      <div className="p-6 space-y-6">
        {/* Course Info */}
        <div className="space-y-3">
          <h3 className="font-heading text-xl gradient-solana-text">
            {certificate.courseName}
          </h3>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            {certificate.level} Level
          </Badge>
        </div>

        {/* Details Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 bg-muted/20 rounded-lg p-4 border border-border/50">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Recipient</p>
              <p className="font-heading">{certificate.recipientName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-muted/20 rounded-lg p-4 border border-border/50">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Completion Date</p>
              <p className="font-mono text-sm">
                {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-muted/20 rounded-lg p-4 border border-border/50">
            <Coins className="h-5 w-5 text-[#14F195] mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">XP Earned</p>
              <p className="font-heading gradient-solana-text">
                +{certificate.xpEarned.toLocaleString()} XP
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-muted/20 rounded-lg p-4 border border-border/50">
            <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Level Achieved</p>
              <p className="font-heading">{certificate.level}</p>
            </div>
          </div>
        </div>

        {/* On-Chain Info */}
        <div className="bg-muted/20 rounded-lg p-4 border border-border/50 space-y-3">
          <h4 className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
            On-Chain Verification
          </h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">NFT Mint Address</span>
              <span className="font-mono text-xs">
                {certificate.nftMintAddress.slice(0, 8)}...{certificate.nftMintAddress.slice(-6)}
              </span>
            </div>
            
            {certificate.transactionSignature && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Transaction</span>
                <span className="font-mono text-xs">{certificate.transactionSignature}</span>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 mt-4 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
            asChild
          >
            <a
              href={`https://explorer.solana.com/address/${certificate.nftMintAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              View on Solana Explorer
            </a>
          </Button>
        </div>

        {/* Soulbound Notice */}
        <div className="bg-[#14F195]/5 rounded-lg p-4 border border-[#14F195]/20">
          <p className="text-sm text-muted-foreground">
            🔒 This is a <span className="text-[#14F195] font-heading">Soulbound NFT</span> - 
            non-transferable credential permanently bound to the recipient's wallet.
          </p>
        </div>
      </div>
    </Card>
  );
}
