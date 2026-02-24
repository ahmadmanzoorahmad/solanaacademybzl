import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Certificate } from '../data/mockData';
import { 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Award,
  Calendar,
  Coins,
  Shield,
  Copy
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CertificateModalProps {
  certificate: Certificate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CertificateModal({ certificate, open, onOpenChange }: CertificateModalProps) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!certificate) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    toast.success('Certificate download started');
    // Simulate download
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-solana-text">NFT Certificate</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certificate Display */}
          <div className="relative overflow-hidden rounded-lg border-2 border-primary/30 bg-gradient-to-br from-card via-card/80 to-card/60 p-8">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/10 via-transparent to-[#9945FF]/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

            <div className="relative space-y-6 text-center">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Award className="h-16 w-16 text-[#14F195]" />
                </div>
                <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
                  Certificate of Completion
                </h2>
                <h1 className="text-3xl font-heading gradient-solana-text">
                  {certificate.courseName}
                </h1>
              </div>

              {/* Recipient */}
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">This certifies that</p>
                <p className="text-2xl font-heading">{certificate.recipientName}</p>
                <p className="text-sm text-muted-foreground">has successfully completed</p>
              </div>

              {/* Level Badge */}
              <div className="flex justify-center">
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-sm bg-primary/10 border-primary/30 text-primary"
                >
                  {certificate.level} Level
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-muted/30 rounded-lg p-3">
                  <Calendar className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="font-mono text-sm">
                    {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <Coins className="h-5 w-5 mx-auto mb-2 text-[#14F195]" />
                  <p className="text-xs text-muted-foreground">XP Earned</p>
                  <p className="font-heading gradient-solana-text text-sm">
                    +{certificate.xpEarned.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Soulbound Badge */}
              <div className="flex items-center justify-center gap-2 pt-4">
                <Shield className="h-4 w-4 text-[#14F195]" />
                <Badge variant="outline" className="bg-[#14F195]/10 text-[#14F195] border-[#14F195]/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Soulbound NFT (Non-transferable)
                </Badge>
              </div>
            </div>
          </div>

          {/* On-Chain Details */}
          <div className="space-y-3 bg-muted/20 rounded-lg p-4 border border-border/50">
            <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-3">
              On-Chain Details
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">NFT Mint Address</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{certificate.nftMintAddress.slice(0, 8)}...{certificate.nftMintAddress.slice(-6)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleCopy(certificate.nftMintAddress, 'Mint address')}
                  >
                    <Copy className={`h-3.5 w-3.5 ${copied === 'Mint address' ? 'text-[#14F195]' : ''}`} />
                  </Button>
                </div>
              </div>

              {certificate.metadataUri && (
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Metadata URI</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{certificate.metadataUri}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleCopy(certificate.metadataUri!, 'Metadata URI')}
                    >
                      <Copy className={`h-3.5 w-3.5 ${copied === 'Metadata URI' ? 'text-[#14F195]' : ''}`} />
                    </Button>
                  </div>
                </div>
              )}

              {certificate.transactionSignature && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Transaction Signature</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{certificate.transactionSignature}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleCopy(certificate.transactionSignature!, 'Transaction signature')}
                    >
                      <Copy className={`h-3.5 w-3.5 ${copied === 'Transaction signature' ? 'text-[#14F195]' : ''}`} />
                    </Button>
                  </div>
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

          {/* QR Code Placeholder */}
          <div className="flex items-center justify-center">
            <div className="bg-muted/20 rounded-lg p-6 border border-border/50">
              <div className="w-32 h-32 bg-gradient-to-br from-[#14F195]/20 to-[#9945FF]/20 rounded flex items-center justify-center">
                <span className="text-xs text-muted-foreground text-center">QR Code<br/>Verification</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              className="flex-1 gap-2 gradient-solana"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download Certificate
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              asChild
            >
              <a href={`/verify/${certificate.nftMintAddress}`}>
                <CheckCircle2 className="h-4 w-4" />
                Public Verification
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
