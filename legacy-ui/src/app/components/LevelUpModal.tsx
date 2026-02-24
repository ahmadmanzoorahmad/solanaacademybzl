import {
  Dialog,
  DialogContent,
} from './ui/dialog';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Trophy, Sparkles, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LevelUpModalProps {
  level: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LevelUpModal({ level, open, onOpenChange }: LevelUpModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-2 border-primary/50 bg-gradient-to-br from-card via-card/95 to-card/90 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/10 via-transparent to-[#9945FF]/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" />

        {/* Confetti Effect */}
        {showConfetti && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  x: Math.random() * 400 - 200,
                  y: -20,
                  rotate: 0,
                }}
                animate={{
                  opacity: 0,
                  y: 400,
                  rotate: Math.random() * 720 - 360,
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5,
                }}
                className="absolute top-0 left-1/2"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: i % 3 === 0 ? '#14F195' : i % 3 === 1 ? '#9945FF' : '#22D3EE',
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                }}
              />
            ))}
          </>
        )}

        <div className="relative space-y-6 py-6">
          {/* Trophy Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-[#14F195]/30 to-[#9945FF]/30 rounded-full blur-xl"
              />
              <div className="relative bg-gradient-to-br from-[#14F195]/20 to-[#9945FF]/20 p-8 rounded-full border-4 border-primary/30">
                <Trophy className="h-16 w-16 text-[#14F195]" />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-[#14F195]" />
                <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
                  Level Up!
                </h2>
                <Sparkles className="h-5 w-5 text-[#9945FF]" />
              </div>
              
              <motion.h1
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: 'spring',
                  delay: 0.4,
                  duration: 0.6 
                }}
                className="text-6xl font-heading gradient-solana-text"
              >
                {level}
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground"
            >
              Congratulations! You've reached a new level on your Solana journey.
              Keep learning and building!
            </motion.p>

            {/* Rewards Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-muted/20 rounded-lg p-4 border border-border/50"
            >
              <p className="text-sm font-heading mb-2">New Perks Unlocked:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
                  <span>Access to advanced courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9945FF]" />
                  <span>Exclusive Discord role</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                  <span>+50 bonus XP multiplier</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              className="w-full gradient-solana gap-2 group"
              onClick={() => onOpenChange(false)}
            >
              Continue Learning
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
