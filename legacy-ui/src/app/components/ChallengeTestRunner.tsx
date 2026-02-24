import { useState } from 'react';
import { Button } from './ui/button';
import { Play, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { TestCasesList } from './TestCasesList';
import { ConsoleOutput } from './ConsoleOutput';
import { cn } from './ui/utils';
import { motion, AnimatePresence } from 'motion/react';

interface TestCase {
  name: string;
  passed: boolean;
  output?: string;
  error?: string;
}

interface ConsoleLog {
  type: 'log' | 'error' | 'success' | 'info';
  message: string;
  timestamp?: string;
}

interface ChallengeTestRunnerProps {
  testCases: TestCase[];
  consoleLogs: ConsoleLog[];
  isRunning: boolean;
  onRun: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  showSuccessBanner?: boolean;
}

export function ChallengeTestRunner({
  testCases,
  consoleLogs,
  isRunning,
  onRun,
  onSubmit,
  canSubmit,
  showSuccessBanner = false,
}: ChallengeTestRunnerProps) {
  const allTestsPassed = testCases.length > 0 && testCases.every((tc) => tc.passed);
  const hasFailedTests = testCases.some((tc) => !tc.passed);

  return (
    <div className="flex flex-col h-full">
      {/* Success/Error Banners */}
      <AnimatePresence>
        {showSuccessBanner && allTestsPassed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#14F195]/20 to-[#9945FF]/20 border border-[#14F195]/30 p-4 mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-[#14F195]" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-[#14F195]">All Tests Passed!</h4>
                  <p className="text-sm text-muted-foreground">
                    Great work! You can now submit your solution to earn XP.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {hasFailedTests && testCases.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-red-500/10 border border-red-500/30 p-4 mb-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-400">Tests Failed</h4>
                  <p className="text-sm text-muted-foreground">
                    Some tests didn't pass. Review the errors below and try again.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-4">
        <Button
          onClick={onRun}
          disabled={isRunning}
          className="flex-1 gap-2 bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90"
          size="lg"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Tests
            </>
          )}
        </Button>

        <Button
          onClick={onSubmit}
          disabled={!canSubmit || isRunning}
          className={cn(
            'flex-1 gap-2',
            canSubmit
              ? 'bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90'
              : ''
          )}
          variant={canSubmit ? 'default' : 'outline'}
          size="lg"
        >
          <Send className="w-4 h-4" />
          Submit Solution
        </Button>
      </div>

      {/* Test Results and Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Test Cases */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <TestCasesList testCases={testCases} showOutput={true} />
        </div>

        {/* Console Output */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <ConsoleOutput logs={consoleLogs} />
        </div>
      </div>
    </div>
  );
}
