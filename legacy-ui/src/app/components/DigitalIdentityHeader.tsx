import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CheckCircle2, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { currentUser, walletConnections } from '../data/mockData';

interface DigitalIdentityHeaderProps {
  isWalletConnected?: boolean;
  onChainVerified?: boolean;
}

export function DigitalIdentityHeader({ 
  isWalletConnected = true, 
  onChainVerified = true 
}: DigitalIdentityHeaderProps) {
  const [copied, setCopied] = useState(false);
  const primaryWallet = walletConnections.find((w) => w.isPrimary);

  const handleCopy = () => {
    if (primaryWallet?.address) {
      navigator.clipboard.writeText(primaryWallet.address);
      setCopied(true);
      toast.success('Wallet address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm">
      {/* Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/5 via-transparent to-[#9945FF]/5 pointer-events-none" />
      
      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-primary/20 ring-4 ring-primary/10">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {isWalletConnected && onChainVerified && (
              <div className="absolute -bottom-2 -right-2 bg-card border-2 border-[#14F195] rounded-full p-1.5">
                <CheckCircle2 className="h-5 w-5 text-[#14F195]" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-heading">{currentUser.name}</h1>
                {isWalletConnected && onChainVerified ? (
                  <Badge variant="outline" className="bg-[#14F195]/10 text-[#14F195] border-[#14F195]/30">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    On-chain Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/30">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Not Linked
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-mono text-sm">@{currentUser.username}</span>
                <span className="text-xs">•</span>
                <span className="text-sm">Joined {new Date(currentUser.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Wallet Address */}
            {primaryWallet?.address && isWalletConnected && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                    <span className="font-mono text-sm text-muted-foreground">
                      {shortenAddress(primaryWallet.address)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-6 w-6 p-0 hover:bg-primary/10"
                    >
                      <Copy className={`h-3.5 w-3.5 ${copied ? 'text-[#14F195]' : 'text-muted-foreground'}`} />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-[#14F195]"
                    asChild
                  >
                    <a
                      href={`https://explorer.solana.com/address/${primaryWallet.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Explorer
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
                {/* Connected via */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Connected via</span>
                  <Badge variant="secondary" className="text-xs">
                    {primaryWallet.name}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Level Badge */}
          <div className="flex flex-col items-center gap-1 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg px-6 py-4 border border-primary/30">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Level</span>
            <span className="text-4xl font-heading gradient-solana-text">{currentUser.level}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}