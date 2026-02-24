import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface XPRewardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  xpEarned: number;
  title?: string;
  description?: string;
}

export function XPRewardModal({
  open,
  onOpenChange,
  xpEarned,
  title = 'Lesson Complete!',
  description = 'Great job! Keep up the momentum.',
}: XPRewardModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center space-y-6 py-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#14F195] to-[#9945FF]"
          >
            <Award className="w-10 h-10 text-white" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary/10 border-2 border-primary"
          >
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-3xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
              +{xpEarned} XP
            </span>
          </motion.div>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-gradient-to-r from-[#14F195] to-[#9945FF]"
            size="lg"
          >
            Continue Learning
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
