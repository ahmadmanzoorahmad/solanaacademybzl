import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { 
  BookOpen, 
  Trophy, 
  Award, 
  Coins, 
  CheckCircle2,
  Sparkles,
  Target
} from 'lucide-react';
import { cn } from './ui/utils';

interface ActivityEvent {
  id: string;
  type: 'enrolled' | 'lesson_completed' | 'xp_earned' | 'credential_minted' | 'challenge_completed' | 'achievement_earned';
  title: string;
  description: string;
  timestamp: string;
  metadata?: {
    xp?: number;
    courseName?: string;
    lessonName?: string;
    achievementName?: string;
  };
}

interface ActivityTimelineProps {
  events: ActivityEvent[];
  maxItems?: number;
}

export function ActivityTimeline({ events, maxItems = 10 }: ActivityTimelineProps) {
  const displayEvents = events.slice(0, maxItems);

  const getEventIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'enrolled':
        return <BookOpen className="h-4 w-4" />;
      case 'lesson_completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'xp_earned':
        return <Coins className="h-4 w-4" />;
      case 'credential_minted':
        return <Sparkles className="h-4 w-4" />;
      case 'challenge_completed':
        return <Target className="h-4 w-4" />;
      case 'achievement_earned':
        return <Trophy className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'enrolled':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'lesson_completed':
        return 'bg-[#14F195]/10 text-[#14F195] border-[#14F195]/20';
      case 'xp_earned':
        return 'bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20';
      case 'credential_minted':
        return 'bg-[#9945FF]/10 text-[#9945FF] border-[#9945FF]/20';
      case 'challenge_completed':
        return 'bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20';
      case 'achievement_earned':
        return 'bg-gradient-to-br from-[#14F195]/10 to-[#9945FF]/10 text-primary border-primary/20';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm">
      {/* Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/5 via-transparent to-[#9945FF]/5 pointer-events-none" />
      
      <div className="relative p-6">
        <h3 className="text-lg font-heading mb-4">Recent Activity</h3>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {displayEvents.map((event, index) => (
              <div
                key={event.id}
                className="flex gap-4 relative"
              >
                {/* Timeline Line */}
                {index < displayEvents.length - 1 && (
                  <div className="absolute left-[18px] top-10 w-[2px] h-[calc(100%+8px)] bg-border/50" />
                )}

                {/* Icon */}
                <div className={cn(
                  'flex-shrink-0 h-9 w-9 rounded-full border flex items-center justify-center z-10 bg-card',
                  getEventColor(event.type)
                )}>
                  {getEventIcon(event.type)}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-0.5">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                      {event.metadata?.xp && (
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10 border border-primary/20">
                          <Coins className="h-3 w-3 text-[#14F195]" />
                          <span className="text-xs font-medium gradient-solana-text">
                            +{event.metadata.xp} XP
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(event.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
