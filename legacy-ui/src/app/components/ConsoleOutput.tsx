import { ScrollArea } from './ui/scroll-area';
import { Terminal, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from './ui/utils';

interface ConsoleLog {
  type: 'log' | 'error' | 'success' | 'info';
  message: string;
  timestamp?: string;
}

interface ConsoleOutputProps {
  logs: ConsoleLog[];
  className?: string;
}

export function ConsoleOutput({ logs, className }: ConsoleOutputProps) {
  const getIcon = (type: ConsoleLog['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[#14F195] flex-shrink-0" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />;
      default:
        return <Terminal className="w-4 h-4 text-muted-foreground flex-shrink-0" />;
    }
  };

  const getTextColor = (type: ConsoleLog['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-[#14F195]';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-[#0B0F1A]", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-card">
        <Terminal className="w-4 h-4 text-muted-foreground" />
        <h4 className="text-sm font-semibold">Console</h4>
      </div>

      {/* Logs */}
      <ScrollArea className="flex-1">
        <div className="p-4 font-mono text-sm space-y-2">
          {logs.length === 0 ? (
            <div className="text-muted-foreground text-center py-8">
              <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Run your code to see output</p>
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="flex items-start gap-3 py-1">
                {getIcon(log.type)}
                <div className="flex-1 min-w-0">
                  <span className={cn("break-words", getTextColor(log.type))}>
                    {log.message}
                  </span>
                  {log.timestamp && (
                    <span className="text-xs text-muted-foreground ml-2">
                      {log.timestamp}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
