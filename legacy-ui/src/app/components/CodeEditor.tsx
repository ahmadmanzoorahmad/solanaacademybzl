import { useState } from 'react';
import { Button } from './ui/button';
import { Play, RotateCcw, Save, Loader2 } from 'lucide-react';
import { cn } from './ui/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning?: boolean;
  language?: string;
  filename?: string;
  autoSaved?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  onRun,
  onReset,
  isRunning = false,
  language = 'rust',
  filename = 'program.rs',
  autoSaved = false,
}: CodeEditorProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-muted-foreground">{filename}</span>
          {autoSaved && (
            <div className="flex items-center gap-1.5 text-xs text-[#14F195]">
              <Save className="w-3 h-3" />
              <span>Auto-saved</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onReset}
            disabled={isRunning}
            className="gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={onRun}
            disabled={isRunning}
            className="gap-2 bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Run Tests
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative overflow-hidden">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full h-full p-4 bg-[#0B0F1A] font-mono text-sm resize-none",
            "focus:outline-none focus:ring-2 focus:ring-[#14F195]/20",
            "text-gray-100 leading-relaxed",
            "placeholder:text-muted-foreground"
          )}
          spellCheck={false}
          placeholder="// Start coding..."
          style={{
            tabSize: 2,
            lineHeight: '1.6',
          }}
        />
        {/* Line numbers overlay could be added here */}
      </div>
    </div>
  );
}
