import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Skeleton } from '../components/ui/skeleton';
import { CodeEditor, TestCasesList, HintsAccordion, ConsoleOutput, CompletionModal } from '../components';
import { ChevronLeft, ChevronRight, Clock, Lock, AlertTriangle, Wallet, BookOpen, Code2, Eye } from 'lucide-react';
import { courses, lessonContent, codeChallenge } from '../data/mockData';
import { cn } from '../components/ui/utils';

interface ConsoleLog {
  type: 'log' | 'error' | 'success' | 'info';
  message: string;
}

export function LessonView() {
  const { slug, lessonId } = useParams();
  const navigate = useNavigate();
  
  // State
  const [code, setCode] = useState(codeChallenge.starterCode);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [testCases, setTestCases] = useState(codeChallenge.testCases);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(true); // Mock state
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'tests' | 'console'>('editor');

  // Find course and lesson
  const course = courses.find((c) => c.slug === slug);
  const isEnrolled = course?.enrolled ?? false;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-save simulation
  useEffect(() => {
    if (code !== codeChallenge.starterCode) {
      const timer = setTimeout(() => {
        setAutoSaved(true);
        setTimeout(() => setAutoSaved(false), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [code]);

  if (!course) {
    return (
      <div className="container px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <Link to="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex];
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const currentModule = course.modules.find((m) => m.lessons.some((l) => l.id === lessonId));

  // Check if all tests passed
  const allTestsPassed = testCases.every((tc) => tc.passed);

  // Handlers
  const handleRunCode = async () => {
    setIsRunning(true);
    setHasAttempted(true);
    setConsoleLogs([]);
    setActiveTab('console');

    // Simulate compilation
    setTimeout(() => {
      setConsoleLogs([
        { type: 'info', message: '🔨 Compiling program...' },
      ]);
    }, 100);

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        { type: 'success', message: '✓ Build successful' },
        { type: 'log', message: '' },
        { type: 'info', message: '▶ Running tests...' },
      ]);
    }, 800);

    // Simulate running tests
    setTimeout(() => {
      const newLogs: ConsoleLog[] = [
        { type: 'log', message: 'Program log: Initializing account...' },
        { type: 'log', message: 'Program log: Account initialized successfully!' },
        { type: 'log', message: '' },
      ];

      // Simulate test results (randomly pass/fail for demo)
      const hasAccountIterator = code.includes('accounts.iter()');
      const hasOwnerCheck = code.includes('account.owner');
      
      const updatedTests = testCases.map((tc, i) => {
        if (tc.name === 'Handles accounts correctly') {
          return { ...tc, passed: hasAccountIterator && hasOwnerCheck };
        }
        return tc;
      });

      setTestCases(updatedTests);

      const passedCount = updatedTests.filter((tc) => tc.passed).length;
      const allPassed = passedCount === updatedTests.length;

      if (allPassed) {
        newLogs.push(
          { type: 'success', message: `✓ All tests passed (${passedCount}/${updatedTests.length})` },
          { type: 'log', message: '' },
          { type: 'success', message: '🎉 Challenge complete! Click "Mark Complete" to continue.' }
        );
      } else {
        newLogs.push(
          { type: 'error', message: `✗ Tests failed: ${passedCount}/${updatedTests.length} passed` },
          { type: 'log', message: '' },
          { type: 'info', message: '💡 Check the Tests tab for details or try the hints.' }
        );
      }

      setConsoleLogs((prev) => [...prev, ...newLogs]);
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setCode(codeChallenge.starterCode);
    setConsoleLogs([]);
    setTestCases(codeChallenge.testCases);
    setHasAttempted(false);
  };

  const handleMarkComplete = () => {
    setShowCompletionModal(true);
  };

  const handleContinue = () => {
    setShowCompletionModal(false);
    if (nextLesson) {
      navigate(`/courses/${slug}/lessons/${nextLesson.id}`);
    } else {
      navigate(`/courses/${slug}`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="border-b bg-card">
          <div className="container px-4 md:px-8 py-4 max-w-[1400px] mx-auto">
            <Skeleton className="h-10 w-3/4 max-w-md" />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="bg-muted/30 p-8 space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Wallet not connected state
  if (!walletConnected) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#14F195]/20 to-[#9945FF]/20 flex items-center justify-center">
            <Wallet className="w-8 h-8 text-[#14F195]" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Wallet Connection Required</h2>
          <p className="text-muted-foreground mb-6">
            Connect your Solana wallet to access lesson content and save your progress.
          </p>
          <Button className="bg-gradient-to-r from-[#14F195] to-[#9945FF]">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  // Not enrolled state
  if (!isEnrolled) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#14F195]/20 to-[#9945FF]/20 flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#9945FF]" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Enrollment Required</h2>
          <p className="text-muted-foreground mb-6">
            You need to enroll in <strong>{course.title}</strong> to access this lesson.
          </p>
          <Link to={`/courses/${slug}`}>
            <Button className="bg-gradient-to-r from-[#14F195] to-[#9945FF]">
              Enroll Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Lesson Header */}
      <div className="border-b bg-card">
        <div className="container px-4 md:px-8 py-4 max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Left side */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <Breadcrumb className="mb-3">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/courses">Courses</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/courses/${slug}`}>{course.title}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="max-w-[200px] truncate">
                      Lesson {currentLessonIndex + 1}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Title and badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-lg md:text-xl font-bold">{currentLesson?.title}</h1>
                <Badge variant="outline" className={cn(
                  "capitalize",
                  codeChallenge.difficulty === 'Beginner' && "border-[#14F195]/30 text-[#14F195]",
                  codeChallenge.difficulty === 'Intermediate' && "border-yellow-500/30 text-yellow-500",
                  codeChallenge.difficulty === 'Advanced' && "border-[#9945FF]/30 text-[#9945FF]"
                )}>
                  {codeChallenge.difficulty}
                </Badge>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{codeChallenge.estimatedTime}</span>
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2">
              <Link to={`/courses/${slug}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Course Overview</span>
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={handleMarkComplete}
                disabled={!allTestsPassed}
                className={cn(
                  "gap-2",
                  allTestsPassed
                    ? "bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90"
                    : "opacity-50 cursor-not-allowed"
                )}
              >
                {allTestsPassed ? '✓' : '○'} Mark Complete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Split Screen Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Lesson Content */}
        <ResizablePanel defaultSize={45} minSize={30}>
          <div className="h-full overflow-y-auto">
            <div className="p-6 md:p-8 max-w-3xl mx-auto">
              {/* Content */}
              <div className="prose prose-invert max-w-none mb-8">
                <div className="space-y-4 text-sm md:text-base leading-relaxed">
                  {lessonContent.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('# ')) {
                      return <h1 key={i} className="text-2xl md:text-3xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h1>;
                    }
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={i} className="text-xl md:text-2xl font-bold mt-6 mb-3">{paragraph.slice(3)}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={i} className="text-lg md:text-xl font-semibold mt-4 mb-2">{paragraph.slice(4)}</h3>;
                    }
                    if (paragraph.startsWith('```')) {
                      const code = paragraph.replace(/```rust\n|```\n|```/g, '');
                      return (
                        <pre key={i} className="bg-card border rounded-lg p-4 overflow-x-auto my-4">
                          <code className="font-mono text-sm text-[#14F195]">{code}</code>
                        </pre>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n');
                      return (
                        <ul key={i} className="list-disc list-inside space-y-2 my-4">
                          {items.map((item, j) => {
                            const text = item.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                            return <li key={j} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: text }} />;
                          })}
                        </ul>
                      );
                    }
                    const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return <p key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: formatted }} />;
                  })}
                </div>
              </div>

              {/* Hints Accordion */}
              <div className="mb-8">
                <HintsAccordion hints={codeChallenge.hints.map((h: any) => ({ ...h, locked: !hasAttempted && h.level === 'full' }))} />
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-8 border-t gap-4">
                {prevLesson ? (
                  <Link to={`/courses/${slug}/lessons/${prevLesson.id}`}>
                    <Button variant="outline" className="gap-2">
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
                {nextLesson ? (
                  <Link to={`/courses/${slug}/lessons/${nextLesson.id}`}>
                    <Button className="gap-2 bg-gradient-to-r from-[#14F195] to-[#9945FF]">
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/courses/${slug}`}>
                    <Button className="gap-2 bg-gradient-to-r from-[#14F195] to-[#9945FF]">
                      Back to Course
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-border hover:bg-[#14F195]/20 transition-colors" />

        {/* Right Panel - Code Challenge Workspace */}
        <ResizablePanel defaultSize={55} minSize={35}>
          <div className="h-full flex flex-col bg-muted/30">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="h-full flex flex-col">
              {/* Challenge Header */}
              <div className="border-b bg-card px-4 md:px-6 py-4">
                <h3 className="text-lg font-semibold mb-2">{codeChallenge.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{codeChallenge.description}</p>
                
                {/* Objectives */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Objectives:</h4>
                  <ul className="space-y-2">
                    {codeChallenge.objectives.map((obj: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                          testCases[i]?.passed
                            ? "bg-[#14F195]/20 text-[#14F195]"
                            : "bg-muted text-muted-foreground"
                        )}>
                          {testCases[i]?.passed ? '✓' : i + 1}
                        </div>
                        <span className={testCases[i]?.passed ? "text-[#14F195]" : ""}>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tabs */}
                <TabsList>
                  <TabsTrigger value="editor" className="gap-2">
                    <Code2 className="w-4 h-4" />
                    Editor
                  </TabsTrigger>
                  <TabsTrigger value="tests" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    Tests
                    {allTestsPassed && <Badge className="ml-1 h-5 px-1.5 text-xs bg-[#14F195] text-[#0B0F1A]">✓</Badge>}
                  </TabsTrigger>
                  <TabsTrigger value="console" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Console
                    {consoleLogs.length > 0 && <Badge className="ml-1 h-5 w-5 p-0 text-xs" variant="outline">{consoleLogs.length}</Badge>}
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Contents */}
              <TabsContent value="editor" className="flex-1 m-0 p-0 overflow-hidden">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  onRun={handleRunCode}
                  onReset={handleReset}
                  isRunning={isRunning}
                  filename="program.rs"
                  autoSaved={autoSaved}
                />
              </TabsContent>

              <TabsContent value="tests" className="flex-1 m-0 p-0 overflow-hidden">
                <TestCasesList testCases={testCases} />
              </TabsContent>

              <TabsContent value="console" className="flex-1 m-0 p-0 overflow-hidden">
                <ConsoleOutput logs={consoleLogs} />
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Completion Modal */}
      <CompletionModal
        open={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onContinue={handleContinue}
        xpEarned={codeChallenge.xpReward}
        lessonTitle={currentLesson?.title || ''}
        hasNextLesson={!!nextLesson}
      />
    </div>
  );
}
