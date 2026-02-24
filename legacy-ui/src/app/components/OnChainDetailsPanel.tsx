import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Copy, 
  ExternalLink, 
  CheckCircle2,
  Hash,
  Wallet,
  FileText,
  Link as LinkIcon
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Certificate } from '../data/mockData';

interface OnChainDetailsPanelProps {
  certificate: Certificate;
}

export function OnChainDetailsPanel({ certificate }: OnChainDetailsPanelProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const ownerWallet = certificate.ownerWallet || certificate.nftMintAddress;
  const metadataUri = certificate.metadataUri || 'https://arweave.net/' + certificate.id;
  const transactionSignature = certificate.transactionSignature || '5' + certificate.id.slice(1) + 'abc';

  return (
    <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm">
      {/* Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/5 via-transparent to-[#9945FF]/5 pointer-events-none" />
      
      <div className="relative p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading">On-Chain Details</h3>
          {certificate.verified && (
            <Badge 
              variant="outline" 
              className="bg-[#14F195]/10 text-[#14F195] border-[#14F195]/30"
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          {/* Mint Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Hash className="w-4 h-4" />
              <span>NFT Mint Address</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3 border border-border/50">
              <span className="font-mono text-sm flex-1 break-all">
                {certificate.nftMintAddress}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(certificate.nftMintAddress, 'Mint Address')}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <Copy className={`w-4 h-4 ${copiedField === 'Mint Address' ? 'text-[#14F195]' : ''}`} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              The unique identifier for this certificate NFT on Solana
            </p>
          </div>

          {/* Owner Wallet */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wallet className="w-4 h-4" />
              <span>Owner Wallet</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3 border border-border/50">
              <span className="font-mono text-sm flex-1">
                {ownerWallet}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(ownerWallet, 'Owner Wallet')}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <Copy className={`w-4 h-4 ${copiedField === 'Owner Wallet' ? 'text-[#14F195]' : ''}`} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              The wallet address that owns this soulbound certificate
            </p>
          </div>

          {/* Metadata URI */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Metadata URI</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3 border border-border/50">
              <span className="font-mono text-sm flex-1 truncate">
                {metadataUri}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(metadataUri, 'Metadata URI')}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <Copy className={`w-4 h-4 ${copiedField === 'Metadata URI' ? 'text-[#14F195]' : ''}`} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Permanent storage link for certificate metadata
            </p>
          </div>

          {/* Transaction Signature */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LinkIcon className="w-4 h-4" />
              <span>Transaction Signature</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3 border border-border/50">
              <span className="font-mono text-sm flex-1 truncate">
                {transactionSignature}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(transactionSignature, 'Transaction Signature')}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <Copy className={`w-4 h-4 ${copiedField === 'Transaction Signature' ? 'text-[#14F195]' : ''}`} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              The transaction that minted this certificate NFT
            </p>
          </div>
        </div>

        {/* Verify Button */}
        <Button
          className="w-full gap-2 bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90"
          asChild
        >
          <a
            href={`https://explorer.solana.com/address/${certificate.nftMintAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4" />
            Verify on Solana Explorer
          </a>
        </Button>

        {/* Info Box */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-4 border border-border/50">
          <p className="text-xs text-muted-foreground">
            This certificate is minted as a <span className="font-semibold text-foreground">Soulbound NFT</span> using 
            the <span className="font-semibold text-foreground">Metaplex Core</span> standard. It's permanently 
            non-transferable and verifiable on the Solana blockchain.
          </p>
        </div>
      </div>
    </Card>
  );
}