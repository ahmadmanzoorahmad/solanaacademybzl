import { Card } from './ui/card';
import { Coins, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface XPBalanceCardProps {
  xp: number;
  showAnimation?: boolean;
}

export function XPBalanceCard({ xp, showAnimation = true }: XPBalanceCardProps) {
  const [displayXP, setDisplayXP] = useState(showAnimation ? 0 : xp);

  useEffect(() => {
    if (!showAnimation) {
      setDisplayXP(xp);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = xp / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= xp) {
        setDisplayXP(xp);
        clearInterval(timer);
      } else {
        setDisplayXP(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [xp, showAnimation]);

  return (
    <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm group hover:border-primary/30 transition-all duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/10 via-transparent to-[#9945FF]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-[#14F195]/20 to-[#9945FF]/20 rounded-lg">
              <Coins className="h-5 w-5 text-[#14F195]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total XP</p>
              <p className="text-xs text-muted-foreground/70">Token-2022</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#14F195] text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>+12%</span>
          </div>
        </div>

        <div className="space-y-2">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-4xl font-heading gradient-solana-text">
              {displayXP.toLocaleString()}
            </p>
          </motion.div>
          <p className="text-xs text-muted-foreground font-mono">
            XP Balance
          </p>
        </div>

        {/* Glow Effect */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-300" />
      </div>
    </Card>
  );
}
