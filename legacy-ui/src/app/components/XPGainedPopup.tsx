import { motion, AnimatePresence } from 'motion/react';
import { Coins, Sparkles } from 'lucide-react';

interface XPGainedPopupProps {
  amount: number;
  show: boolean;
  onComplete?: () => void;
}

export function XPGainedPopup({ amount, show, onComplete }: XPGainedPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.6 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onAnimationComplete={() => {
            if (onComplete) {
              setTimeout(onComplete, 1500);
            }
          }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#14F195]/40 to-[#9945FF]/40 blur-xl rounded-full animate-pulse" />
            
            {/* Card */}
            <div className="relative bg-card/95 backdrop-blur-sm border-2 border-[#14F195]/50 rounded-lg px-6 py-3 shadow-2xl">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Coins className="h-6 w-6 text-[#14F195]" />
                </motion.div>
                
                <div className="flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, times: [0, 0.6, 1] }}
                    className="text-2xl font-heading gradient-solana-text"
                  >
                    +{amount} XP
                  </motion.span>
                  
                  <motion.div
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 1]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Sparkles className="h-5 w-5 text-[#14F195]" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Particle Effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((i * Math.PI * 2) / 6) * 40,
                  y: Math.sin((i * Math.PI * 2) / 6) * 40,
                  scale: 0,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#14F195] rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
