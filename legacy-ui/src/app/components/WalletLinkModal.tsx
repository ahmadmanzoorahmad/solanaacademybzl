import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { WalletConnection, walletConnections } from '../data/mockData';
import { motion } from 'motion/react';
import { Wallet, Github, Chrome, CheckCircle2, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface WalletLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const walletProviders = [
  { id: 'phantom', name: 'Phantom', icon: Wallet, color: 'from-purple-500 to-purple-600' },
  { id: 'solflare', name: 'Solflare', icon: Wallet, color: 'from-orange-500 to-orange-600' },
  { id: 'backpack', name: 'Backpack', icon: Wallet, color: 'from-red-500 to-red-600' },
];

const socialProviders = [
  { id: 'google', name: 'Google', icon: Chrome, color: 'from-blue-500 to-blue-600' },
  { id: 'github', name: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-800' },
];

export function WalletLinkModal({ open, onOpenChange }: WalletLinkModalProps) {
  const [connections, setConnections] = useState<WalletConnection[]>(walletConnections);

  const handleConnect = (providerId: string, providerName: string) => {
    toast.success(`${providerName} connected successfully`);
    // Simulate connection
  };

  const handleRemove = (connectionId: string) => {
    setConnections(connections.filter((c) => c.id !== connectionId));
    toast.success('Connection removed');
  };

  const handleSetPrimary = (connectionId: string) => {
    setConnections(
      connections.map((c) => ({
        ...c,
        isPrimary: c.id === connectionId,
      }))
    );
    toast.success('Primary wallet updated');
  };

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'phantom':
      case 'solflare':
      case 'backpack':
        return Wallet;
      case 'github':
        return Github;
      case 'google':
        return Chrome;
      default:
        return Wallet;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-solana-text">Link Wallet & Accounts</DialogTitle>
          <DialogDescription>
            Connect your wallets and social accounts to your Solana Academy identity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Connected Accounts */}
          {connections.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
                Connected Accounts
              </h3>
              
              <div className="space-y-2">
                {connections.map((connection) => {
                  const Icon = getProviderIcon(connection.type);
                  
                  return (
                    <motion.div
                      key={connection.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-heading capitalize">{connection.type}</p>
                            {connection.isPrimary && (
                              <Badge variant="outline" className="text-xs bg-[#14F195]/10 text-[#14F195] border-[#14F195]/30">
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                Primary
                              </Badge>
                            )}
                          </div>
                          {connection.address && (
                            <p className="text-xs text-muted-foreground font-mono">
                              {connection.address.slice(0, 8)}...{connection.address.slice(-6)}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Connected {new Date(connection.connectedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!connection.isPrimary && connection.address && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetPrimary(connection.id)}
                            className="text-xs hover:bg-primary/10 hover:text-primary"
                          >
                            Set Primary
                          </Button>
                        )}
                        {!connection.isPrimary && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(connection.id)}
                            className="text-xs hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        {connection.isPrimary && (
                          <CheckCircle2 className="h-5 w-5 text-[#14F195]" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wallet Providers */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
              Connect Wallet
            </h3>
            
            <div className="grid gap-3">
              {walletProviders.map((provider) => {
                const Icon = provider.icon;
                const isConnected = connections.some((c) => c.type === provider.id);

                return (
                  <Button
                    key={provider.id}
                    variant="outline"
                    className="justify-start gap-3 h-auto p-4 hover:bg-primary/5 hover:border-primary/30"
                    onClick={() => handleConnect(provider.id, provider.name)}
                    disabled={isConnected}
                  >
                    <div className={`p-2 bg-gradient-to-br ${provider.color} rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-heading">{provider.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {isConnected ? 'Already connected' : 'Connect your wallet'}
                      </p>
                    </div>
                    {isConnected && <CheckCircle2 className="h-5 w-5 text-[#14F195]" />}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Social Providers */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
              Connect Social
            </h3>
            
            <div className="grid gap-3">
              {socialProviders.map((provider) => {
                const Icon = provider.icon;
                const isConnected = connections.some((c) => c.type === provider.id);

                return (
                  <Button
                    key={provider.id}
                    variant="outline"
                    className="justify-start gap-3 h-auto p-4 hover:bg-primary/5 hover:border-primary/30"
                    onClick={() => handleConnect(provider.id, provider.name)}
                    disabled={isConnected}
                  >
                    <div className={`p-2 bg-gradient-to-br ${provider.color} rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-heading">{provider.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {isConnected ? 'Already connected' : `Link your ${provider.name} account`}
                      </p>
                    </div>
                    {isConnected && <CheckCircle2 className="h-5 w-5 text-[#14F195]" />}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
            <p className="text-xs text-muted-foreground">
              🔒 Your wallet and social accounts are securely linked to your Solana Academy identity.
              Your primary wallet is used for NFT certificates and on-chain verification.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
