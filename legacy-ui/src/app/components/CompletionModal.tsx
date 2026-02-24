import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Trophy, Star, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { GradientText } from './GradientText';

interface CompletionModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  xpEarned: number;
  lessonTitle: string;
  hasNextLesson: boolean;
}

export function CompletionModal({
  open,
  onClose,
  onContinue,
  xpEarned,
  lessonTitle,
  hasNextLesson,
}: CompletionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Celebration Icon */}
          <div className="flex justify-center mb-6 mt-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#14F195] to-[#9945FF] rounded-full blur-2xl opacity-50" />
              <div className="relative bg-gradient-to-r from-[#14F195] to-[#9945FF] rounded-full p-6">
                <Trophy className="w-12 h-12 text-[#0B0F1A]" />
              </div>
            </motion.div>
          </div>

          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              <GradientText>Lesson Complete!</GradientText>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Lesson Title */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">You completed</p>
              <p className="font-semibold mt-1">{lessonTitle}</p>
            </div>

            {/* XP Reward */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10 border border-[#14F195]/20 rounded-lg p-6"
            >
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-[#14F195]" />
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                    +{xpEarned} XP
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Experience earned</p>
                </div>
                <Star className="w-6 h-6 text-[#9945FF]" />
              </div>
            </motion.div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Review Lesson
              </Button>
              <Button
                onClick={onContinue}
                className="flex-1 bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90"
              >
                {hasNextLesson ? (
                  <>
                    Next Lesson
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  'Back to Course'
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
