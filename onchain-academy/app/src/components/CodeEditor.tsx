'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, RotateCcw, CheckCircle, XCircle, Terminal, FlaskConical } from 'lucide-react';
import { useTranslation } from '@/i18n/provider';

const Editor = dynamic(() => import('@monaco-editor/react').then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-[#1e1e1e] rounded-lg flex items-center justify-center">
      <span className="text-muted-foreground" />
    </div>
  ),
});

interface TestCase {
  name: string;
  passed: boolean;
}

interface CodeEditorProps {
  starterCode: string;
  language?: string;
  testCases: TestCase[];
  onMarkComplete?: () => void;
}

export function CodeEditor({ starterCode, language = 'rust', testCases, onMarkComplete }: CodeEditorProps) {
  const { t } = useTranslation();
  const [code, setCode] = useState(starterCode);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [tests, setTests] = useState<TestCase[]>(testCases);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('tests');

  const allTestsPassed = tests.every((tc) => tc.passed);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setActiveTab('console');
    setConsoleOutput((prev) => [...prev, '> Compiling program...']);

    setTimeout(() => {
      setConsoleOutput((prev) => [...prev, '> Build successful', '> Running tests...']);

      setTimeout(() => {
        const updatedTests = tests.map((tc, i) => ({
          ...tc,
          passed: i < 3 ? true : code.length > starterCode.length,
        }));
        setTests(updatedTests);
        const passed = updatedTests.filter((tc) => tc.passed).length;
        setConsoleOutput((prev) => [
          ...prev,
          `> ${passed}/${updatedTests.length} tests passed`,
          passed === updatedTests.length ? '> All tests passed!' : '> Some tests failed. Check test output.',
        ]);
        setIsRunning(false);
        setActiveTab('tests');
      }, 800);
    }, 600);
  }, [code, tests, starterCode]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    setConsoleOutput([]);
    setTests(testCases);
  }, [starterCode, testCases]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs uppercase">{language}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} disabled={isRunning}>
            <RotateCcw className="w-4 h-4 mr-1" /> {t('lesson.resetCode')}
          </Button>
          <Button size="sm" onClick={handleRun} disabled={isRunning} className="bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90">
            <Play className="w-4 h-4 mr-1" /> {isRunning ? t('common.loading') : t('lesson.runCode')}
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-0">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => setCode(value ?? '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </Card>

      <Card className="overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4">
            <TabsTrigger value="tests" className="gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" /> {t('lesson.tests')}
              <Badge variant={allTestsPassed ? 'default' : 'secondary'} className="ml-1 text-xs">
                {tests.filter((tc) => tc.passed).length}/{tests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="console" className="gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> {t('lesson.console')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="p-4 space-y-2 min-h-[150px]">
            {tests.map((tc, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 px-3 rounded-md bg-muted/50">
                {tc.passed ? (
                  <CheckCircle className="w-4 h-4 text-[#14F195] shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                )}
                <span className={`text-sm ${tc.passed ? 'text-foreground' : 'text-muted-foreground'}`}>{tc.name}</span>
              </div>
            ))}
            {allTestsPassed && (
              <p className="text-sm text-[#14F195] mt-3 font-medium">{t('lesson.allTestsPassed')}</p>
            )}
          </TabsContent>

          <TabsContent value="console" className="p-4 min-h-[150px]">
            <div className="font-mono text-sm space-y-1">
              {consoleOutput.length === 0 ? (
                <p className="text-muted-foreground">{t('lesson.noOutput')}</p>
              ) : (
                consoleOutput.map((line, i) => (
                  <p key={i} className={line.includes('failed') || line.includes('Error') ? 'text-red-400' : line.includes('passed') || line.includes('successful') ? 'text-[#14F195]' : 'text-muted-foreground'}>
                    {line}
                  </p>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={onMarkComplete}
          disabled={!allTestsPassed}
          className="bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4 mr-2" /> {t('lesson.markComplete')}
        </Button>
      </div>
    </div>
  );
}
