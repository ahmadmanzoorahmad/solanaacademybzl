import { Card } from './ui/card';
import { Button } from './ui/button';
import { Wallet, Link2, Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface AccountLinkingCTAProps {
  onConnect: () => void;
}

export function AccountLinkingCTA({ onConnect }: AccountLinkingCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-2 border-dashed border-primary/30 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/5 via-transparent to-[#9945FF]/5 animate-gradient" />
        
        <div className="relative p-8 md:p-12 text-center space-y-6">
          {/* Icon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#14F195]/20 to-[#9945FF]/20 border-2 border-primary/30"
          >
            <Wallet className="w-10 h-10 text-primary" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-2xl md:text-3xl font-heading gradient-solana-text">
              Connect Your Wallet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Link your Solana wallet to unlock your Web3-native identity, verify credentials on-chain, 
              and track your learning progress with Token-2022.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30">
              <Shield className="w-6 h-6 text-[#14F195]" />
              <span className="text-sm font-medium">Secure Identity</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30">
              <Sparkles className="w-6 h-6 text-[#9945FF]" />
              <span className="text-sm font-medium">NFT Credentials</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30">
              <Link2 className="w-6 h-6 text-[#22D3EE]" />
              <span className="text-sm font-medium">On-chain XP</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={onConnect}
              className="gap-2 bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 text-lg px-8"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </Button>
          </motion.div>

          {/* Supported Wallets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-muted-foreground"
          >
            Supports Phantom, Solflare, Backpack & more
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
