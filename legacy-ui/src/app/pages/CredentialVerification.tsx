import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  ArrowLeft,
  Calendar,
  Award,
  TrendingUp,
  Hash,
  Share2,
  Copy,
  BookOpen,
  Clock,
  Shield
} from 'lucide-react';
import { certificates, Certificate } from '../data/mockData';
import { toast } from 'sonner';

export function CredentialVerification() {
  const { mint } = useParams<{ mint: string }>();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState('');

  useEffect(() => {
    // Set verification URL on client side
    setVerificationUrl(`${window.location.origin}/verify/${mint}`);
    
    // Simulate API call to verify NFT on-chain
    const timer = setTimeout(() => {
      const found = certificates.find(cert => cert.nftMintAddress === mint);
      if (found && found.verified) {
        setCertificate(found);
        setIsValid(true);
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [mint]);

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${certificate?.courseName} Credential`,
          text: `Verified Solana Academy credential for ${certificate?.recipientName}`,
          url: verificationUrl,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopy(verificationUrl, 'Verification URL');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <h2 className="text-xl font-heading mb-2">Verifying Credential</h2>
          <p className="text-muted-foreground">Checking on-chain data...</p>
        </div>
      </div>
    );
  }

  if (!isValid || !certificate) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <div className="container max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Invalid Header */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-error/10 flex items-center justify-center border-4 border-error/30">
                <XCircle className="h-14 w-14 text-error" />
              </div>
              <h1 className="text-4xl md:text-5xl font-heading mb-4 text-error">
                ❌ Invalid Credential
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                This NFT mint address could not be verified
              </p>
              {mint && (
                <div className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground bg-muted/30 rounded-lg p-3 mt-4">
                  <Hash className="h-4 w-4" />
                  {shortenAddress(mint)}
                </div>
              )}
            </div>

            <div className="bg-error/5 border border-error/20 rounded-lg p-6 mb-8 max-w-md mx-auto">
              <h3 className="font-heading mb-3 text-error">Possible Reasons:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Invalid or non-existent NFT mint address</li>
                <li>• Credential has been revoked or burned</li>
                <li>• NFT not minted on Solana mainnet</li>
                <li>• Address does not match our registry</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <Button variant="outline" asChild>
                <Link to="/identity">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Identity
                </Link>
              </Button>
              <Button asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/identity">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Valid Credential Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-2 border-[#14F195]/40 bg-gradient-to-br from-[#14F195]/10 via-card/80 to-card/80 backdrop-blur-sm">
            <div className="p-8 md:p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#14F195]/20 flex items-center justify-center border-4 border-[#14F195]/40">
                <CheckCircle2 className="h-14 w-14 text-[#14F195]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-heading mb-4 gradient-solana-text">
                ✅ Valid Credential
              </h1>
              <p className="text-lg text-muted-foreground">
                This credential has been verified on the Solana blockchain
              </p>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Credential Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Course & Recipient */}
            <Card className="p-6 border-2 border-border/50">
              <div className="space-y-6">
                {/* Recipient */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Recipient
                  </h3>
                  <p className="text-3xl font-heading gradient-solana-text">
                    {certificate.recipientName}
                  </p>
                </div>

                {/* Course */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Course Name
                  </h3>
                  <p className="text-2xl font-heading">
                    {certificate.courseName}
                  </p>
                </div>

                {/* Track Name */}
                {certificate.trackName && (
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                      Learning Track
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-heading">{certificate.trackName}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Current Level</p>
                    <p className="text-2xl font-heading">{certificate.level}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-[#14F195]/5 to-transparent">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#14F195]/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-[#14F195]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Total XP</p>
                    <p className="text-2xl font-heading gradient-solana-text">
                      {certificate.totalXP?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-accent/5 to-transparent">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Courses Completed</p>
                    <p className="text-2xl font-heading">
                      {certificate.completedCoursesCount || 1}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-[#9945FF]/5 to-transparent">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#9945FF]/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-[#9945FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Completion Date</p>
                    <p className="font-heading">
                      {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* On-Chain Details */}
            <Card className="p-6 border-2 border-border/50">
              <h3 className="text-lg font-heading mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                On-Chain Details
              </h3>
              
              <div className="space-y-4">
                {/* Mint Address */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">NFT Mint Address</p>
                  <div className="bg-muted/50 rounded-lg p-3 break-all flex items-center justify-between gap-2">
                    <p className="font-mono text-sm">{certificate.nftMintAddress}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(certificate.nftMintAddress, 'Mint address')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Owner Wallet */}
                {certificate.ownerWallet && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Owner Wallet</p>
                    <div className="bg-muted/50 rounded-lg p-3 break-all flex items-center justify-between gap-2">
                      <p className="font-mono text-sm">{certificate.ownerWallet}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(certificate.ownerWallet!, 'Owner wallet')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Last Updated */}
                {certificate.lastUpdated && (
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Last Updated</span>
                    </div>
                    <p className="font-mono text-sm">
                      {new Date(certificate.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Soulbound NFT Callout */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-[#9945FF]/10 border-2 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading mb-2 text-lg">Soulbound Metaplex Core NFT</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This credential is a <strong>non-transferable, soulbound NFT</strong> minted using the 
                    Metaplex Core standard on Solana. It is permanently tied to the recipient's wallet address 
                    and serves as immutable, cryptographically verifiable proof of course completion and skill achievement.
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {certificate.transactionSignature && (
                <Button
                  className="flex-1 gap-2"
                  asChild
                >
                  <a
                    href={`https://explorer.solana.com/tx/${certificate.transactionSignature}?cluster=mainnet-beta`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Transaction
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              
              <Button
                variant="outline"
                className="flex-1 gap-2"
                asChild
              >
                <a
                  href={`https://explorer.solana.com/address/${certificate.nftMintAddress}?cluster=mainnet-beta`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Explorer
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Sidebar - QR Code & Share */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* QR Code Card */}
            <Card className="p-6 text-center border-2 border-border/50">
              <h3 className="font-heading mb-4 text-lg">Verification QR Code</h3>
              
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <QRCodeSVG
                  value={verificationUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Scan to verify this credential
              </p>

              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                Share Verification
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-to-br from-[#14F195]/5 to-[#9945FF]/5 border-2 border-[#14F195]/20">
              <h3 className="font-heading mb-4">Credential Stats</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-[#14F195]/10 text-[#14F195] border-[#14F195]/30">
                    Verified
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">XP from Course</span>
                  <span className="font-heading">+{certificate.xpEarned.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span className="font-heading">Solana</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Standard</span>
                  <span className="font-heading">Metaplex Core</span>
                </div>
              </div>
            </Card>

            {/* Info Box */}
            <Card className="p-6 bg-muted/30 border-border/50">
              <h4 className="font-heading mb-3 text-sm">How to Verify</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>This credential is cryptographically verifiable:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Check the mint address on Solana Explorer</li>
                  <li>Verify metadata URI matches official records</li>
                  <li>Confirm owner wallet address</li>
                  <li>Validate transaction signature</li>
                </ol>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}