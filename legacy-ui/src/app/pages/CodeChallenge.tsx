import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Wallet } from 'lucide-react';
import { CodeEditor } from '../components/CodeEditor';
import { ChallengeSidebar } from '../components/ChallengeSidebar';
import { ObjectiveChecklist } from '../components/ObjectiveChecklist';
import { ChallengeTestRunner } from '../components/ChallengeTestRunner';
import { XPRewardModal } from '../components/XPRewardModal';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface Objective {
  id: string;
  text: string;
  completed: boolean;
}

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

interface RelatedLesson {
  id: string;
  title: string;
  courseSlug: string;
  lessonId: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  timeEstimate: string;
  objectives: Objective[];
  expectedOutput: string;
  starterCode: string;
  relatedLessons: RelatedLesson[];
}

// Mock challenge data
const mockChallenge: Challenge = {
  id: 'challenge-1',
  title: 'Create a Token Transfer Program',
  description:
    'Build a Solana program that transfers SOL tokens between accounts. Implement proper error handling and validate account ownership.',
  difficulty: 'Intermediate',
  xpReward: 500,
  timeEstimate: '45 minutes',
  objectives: [
    {
      id: 'obj-1',
      text: 'Initialize the program with proper account validation',
      completed: false,
    },
    {
      id: 'obj-2',
      text: 'Implement transfer logic with correct lamport calculations',
      completed: false,
    },
    {
      id: 'obj-3',
      text: 'Add error handling for insufficient funds',
      completed: false,
    },
    {
      id: 'obj-4',
      text: 'Return success status with transaction signature',
      completed: false,
    },
  ],
  expectedOutput: `Transaction successful!
Signature: 5xJ8...9pKL
Transferred: 1.5 SOL
From: 7xW9...3mNk
To: 4pQ2...8vLm`,
  starterCode: `use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod token_transfer {
    use super::*;

    pub fn transfer_sol(
        ctx: Context<TransferSol>,
        amount: u64,
    ) -> Result<()> {
        // TODO: Implement your transfer logic here
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct TransferSol<'info> {
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(mut)]
    pub to: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}`,
  relatedLessons: [
    {
      id: 'rel-1',
      title: 'Understanding Solana Accounts',
      courseSlug: 'solana-fundamentals',
      lessonId: 'les-4',
    },
    {
      id: 'rel-2',
      title: 'Token Program Basics',
      courseSlug: 'solana-fundamentals',
      lessonId: 'les-5',
    },
    {
      id: 'rel-3',
      title: 'Error Handling in Anchor',
      courseSlug: 'anchor-framework',
      lessonId: 'les-12',
    },
  ],
};

export function CodeChallenge() {
  const { id } = useParams();
  const [challenge] = useState<Challenge>(mockChallenge);
  const [code, setCode] = useState(challenge.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(true); // Mock wallet state
  const [autoSaved, setAutoSaved] = useState(false);
  const [objectives, setObjectives] = useState(challenge.objectives);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoSaved(true);
      setTimeout(() => setAutoSaved(false), 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [code]);

  const handleRun = async () => {
    setIsRunning(true);
    setConsoleLogs([
      {
        type: 'info',
        message: 'Compiling program...',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check code for specific patterns to determine test results
    const hasTransferLogic = code.includes('invoke') || code.includes('transfer');
    const hasErrorHandling = code.includes('require!') || code.includes('Error');
    const hasValidation = code.includes('Signer') && code.includes('mut');

    const newTestCases: TestCase[] = [
      {
        name: 'Program initialization',
        passed: hasValidation,
        output: hasValidation
          ? 'Accounts validated successfully'
          : 'Missing account validation',
        error: hasValidation ? undefined : 'Expected signer validation',
      },
      {
        name: 'Transfer execution',
        passed: hasTransferLogic,
        output: hasTransferLogic ? 'Transfer completed' : 'No transfer logic found',
        error: hasTransferLogic ? undefined : 'Missing transfer implementation',
      },
      {
        name: 'Error handling',
        passed: hasErrorHandling,
        output: hasErrorHandling ? 'Error checks present' : 'No error handling',
        error: hasErrorHandling ? undefined : 'Add require! or custom errors',
      },
      {
        name: 'Return signature',
        passed: hasTransferLogic && hasValidation,
        output:
          hasTransferLogic && hasValidation
            ? 'Signature: 5xJ8...9pKL'
            : 'Incomplete implementation',
      },
    ];

    setTestCases(newTestCases);

    // Update objectives based on test results
    const updatedObjectives = objectives.map((obj, index) => ({
      ...obj,
      completed: newTestCases[index]?.passed || false,
    }));
    setObjectives(updatedObjectives);

    // Add console logs
    const logs: ConsoleLog[] = [
      { type: 'success', message: 'Compilation successful', timestamp: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Running tests...', timestamp: new Date().toLocaleTimeString() },
    ];

    const allPassed = newTestCases.every((tc) => tc.passed);
    if (allPassed) {
      logs.push({
        type: 'success',
        message: '✓ All tests passed!',
        timestamp: new Date().toLocaleTimeString(),
      });
      setShowSuccessBanner(true);
      toast.success('All tests passed! 🎉', {
        description: 'Your solution is ready to submit.',
      });
    } else {
      const failedCount = newTestCases.filter((tc) => !tc.passed).length;
      logs.push({
        type: 'error',
        message: `✗ ${failedCount} test(s) failed`,
        timestamp: new Date().toLocaleTimeString(),
      });
      setShowSuccessBanner(false);
    }

    setConsoleLogs(logs);
    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setTestCases([]);
    setConsoleLogs([]);
    setObjectives(challenge.objectives);
    setShowSuccessBanner(false);
    toast.info('Code reset to starter template');
  };

  const handleSubmit = () => {
    setShowRewardModal(true);
    toast.success('Challenge completed! 🎉', {
      description: `You earned ${challenge.xpReward} XP!`,
    });
  };

  const allTestsPassed = testCases.length > 0 && testCases.every((tc) => tc.passed);

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <Wallet className="w-16 h-16 mx-auto text-muted-foreground" />
          <h2>Wallet Not Connected</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to access coding challenges.
          </p>
          <Button className="bg-gradient-to-r from-[#14F195] to-[#9945FF]">
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/courses">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{challenge.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {challenge.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Content - Main Challenge Area */}
          <div className="xl:col-span-3 space-y-6">
            {/* Objectives */}
            <ObjectiveChecklist objectives={objectives} />

            {/* Expected Output */}
            <div className="bg-card border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Expected Output</h3>
              <pre className="bg-[#0B0F1A] p-4 rounded-md font-mono text-sm text-gray-300 overflow-x-auto">
                {challenge.expectedOutput}
              </pre>
            </div>

            {/* Code Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border rounded-lg overflow-hidden"
            >
              <CodeEditor
                value={code}
                onChange={setCode}
                onRun={handleRun}
                onReset={handleReset}
                isRunning={isRunning}
                language="rust"
                filename="program.rs"
                autoSaved={autoSaved}
              />
            </motion.div>

            {/* Test Runner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ChallengeTestRunner
                testCases={testCases}
                consoleLogs={consoleLogs}
                isRunning={isRunning}
                onRun={handleRun}
                onSubmit={handleSubmit}
                canSubmit={allTestsPassed}
                showSuccessBanner={showSuccessBanner}
              />
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-1"
          >
            <div className="sticky top-24">
              <ChallengeSidebar
                difficulty={challenge.difficulty}
                xpReward={challenge.xpReward}
                timeEstimate={challenge.timeEstimate}
                relatedLessons={challenge.relatedLessons}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* XP Reward Modal */}
      <XPRewardModal
        open={showRewardModal}
        onOpenChange={setShowRewardModal}
        xpEarned={challenge.xpReward}
        title="Challenge Completed!"
        description="Excellent work! You've mastered this challenge."
      />
    </div>
  );
}
