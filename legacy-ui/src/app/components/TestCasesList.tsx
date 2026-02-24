import { CheckCircle2, XCircle, Circle, ChevronRight } from 'lucide-react';
import { cn } from './ui/utils';
import { ScrollArea } from './ui/scroll-area';

interface TestCase {
  name: string;
  passed: boolean;
  output?: string;
  error?: string;
}

interface TestCasesListProps {
  testCases: TestCase[];
  showOutput?: boolean;
}

export function TestCasesList({ testCases, showOutput = true }: TestCasesListProps) {
  const passedCount = testCases.filter((tc) => tc.passed).length;
  const totalCount = testCases.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-card">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Test Results</h4>
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded",
            allPassed ? "bg-[#14F195]/10 text-[#14F195]" : "bg-red-500/10 text-red-400"
          )}>
            {passedCount}/{totalCount} Passed
          </div>
        </div>
      </div>

      {/* Test Cases */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {testCases.map((testCase, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                testCase.passed
                  ? "bg-[#14F195]/5 border-[#14F195]/20"
                  : "bg-red-500/5 border-red-500/20"
              )}
            >
              <div className="flex items-start gap-3">
                {testCase.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#14F195] flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{testCase.name}</p>
                  {showOutput && testCase.output && (
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {testCase.output}
                    </p>
                  )}
                  {testCase.error && (
                    <p className="text-xs text-red-400 mt-1 font-mono">
                      {testCase.error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Summary */}
      {allPassed && (
        <div className="px-4 py-3 border-t bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10">
          <div className="flex items-center gap-2 text-sm text-[#14F195]">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-medium">All tests passed! Ready to complete.</span>
          </div>
        </div>
      )}
    </div>
  );
}
