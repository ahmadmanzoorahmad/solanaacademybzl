import { useParams, Link } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { PrintableCertificate } from '../components/PrintableCertificate';
import { OnChainDetailsPanel } from '../components/OnChainDetailsPanel';
import { 
  Download, 
  Share2, 
  Copy,
  Twitter,
  Linkedin,
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { certificates, Certificate } from '../data/mockData';

export function CertificateView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [downloading, setDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const found = certificates.find((c) => c.id === id);
      if (found) {
        setCertificate(found as Certificate);
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  const handleDownloadImage = async () => {
    if (!certificateRef.current || !certificate) return;

    setDownloading(true);
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#0B0F1A',
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `${certificate.courseName.replace(/\s+/g, '-')}-Certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.success('Certificate downloaded successfully');
    } catch (error) {
      toast.error('Failed to download certificate');
      console.error('Download error:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyVerificationLink = () => {
    if (!certificate) return;
    
    const verificationLink = `${window.location.origin}/certificates/${certificate.id}`;
    navigator.clipboard.writeText(verificationLink);
    toast.success('Verification link copied to clipboard');
  };

  const handleShareTwitter = () => {
    if (!certificate) return;
    
    const text = `I just completed ${certificate.courseName} on Superteam Solana Academy! 🎓\n\nVerify my certificate on-chain: ${window.location.origin}/certificates/${certificate.id}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleShareLinkedIn = () => {
    if (!certificate) return;
    
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(linkedInUrl, '_blank');
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#14F195]/20 to-[#9945FF]/20 border-2 border-primary/30"
          >
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </motion.div>
          <div>
            <h2 className="text-xl font-heading mb-2">Loading Certificate</h2>
            <p className="text-sm text-muted-foreground">Verifying on-chain data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid/Not Found State
  if (!certificate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/20 border-2 border-destructive/30">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-heading">
                Certificate Not Found
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                The certificate you're looking for doesn't exist or may have been revoked.
                Please check the certificate ID and try again.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild variant="outline">
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <Button asChild>
                <Link to="/identity">
                  View My Credentials
                </Link>
              </Button>
            </div>

            <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50 text-left">
              <h3 className="font-heading text-sm mb-2">Troubleshooting</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Verify the certificate ID is correct</li>
                <li>Check if the certificate has been minted on-chain</li>
                <li>Contact support if you believe this is an error</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Valid Certificate Display
  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Button variant="ghost" asChild>
            <Link to="/identity">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Identity
            </Link>
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-2xl md:text-3xl font-heading gradient-solana-text">
              Certificate of Completion
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Verified on Solana Blockchain
            </p>
          </div>

          <div className="w-[100px]" /> {/* Spacer for alignment */}
        </div>

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Button
            variant="outline"
            onClick={handleDownloadImage}
            disabled={downloading}
            className="gap-2"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Image
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleShareTwitter}
            className="gap-2"
          >
            <Twitter className="w-4 h-4" />
            Share on X
          </Button>

          <Button
            variant="outline"
            onClick={handleShareLinkedIn}
            className="gap-2"
          >
            <Linkedin className="w-4 h-4" />
            Share on LinkedIn
          </Button>

          <Button
            variant="outline"
            onClick={handleCopyVerificationLink}
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Link
          </Button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certificate Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <PrintableCertificate ref={certificateRef} certificate={certificate} />
          </motion.div>

          {/* On-Chain Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <OnChainDetailsPanel certificate={certificate} />
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border border-border/50"
        >
          <h3 className="font-heading mb-3">About This Certificate</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              This certificate is a <span className="font-semibold text-foreground">Soulbound NFT</span> minted 
              using the Metaplex Core standard on Solana. It represents verifiable proof of completion and cannot 
              be transferred or sold.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Permanently stored on Solana blockchain</li>
              <li>Non-transferable and bound to the recipient's wallet</li>
              <li>Metadata stored on Arweave for permanent accessibility</li>
              <li>Instantly verifiable by anyone with the NFT mint address</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}