import { Award, Clock, Trophy, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from './ui/utils';

interface RelatedLesson {
  id: string;
  title: string;
  courseSlug: string;
  lessonId: string;
}

interface ChallengeSidebarProps {
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  timeEstimate: string;
  relatedLessons: RelatedLesson[];
}

export function ChallengeSidebar({
  difficulty,
  xpReward,
  timeEstimate,
  relatedLessons,
}: ChallengeSidebarProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-[#14F195] bg-[#14F195]/10 border-[#14F195]/20';
      case 'Intermediate':
        return 'text-[#FACC15] bg-[#FACC15]/10 border-[#FACC15]/20';
      case 'Advanced':
        return 'text-[#9945FF] bg-[#9945FF]/10 border-[#9945FF]/20';
    }
  };

  return (
    <div className="space-y-4">
      {/* Difficulty */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-semibold">Difficulty</span>
        </div>
        <div
          className={cn(
            'inline-flex items-center px-3 py-1.5 rounded-md border font-medium text-sm',
            getDifficultyColor()
          )}
        >
          {difficulty}
        </div>
      </div>

      {/* XP Reward */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-semibold">XP Reward</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
            {xpReward}
          </span>
          <span className="text-sm text-muted-foreground">XP</span>
        </div>
      </div>

      {/* Time Estimate */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-semibold">Time Estimate</span>
        </div>
        <div className="text-lg font-medium">{timeEstimate}</div>
      </div>

      {/* Related Lessons */}
      {relatedLessons.length > 0 && (
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-semibold">Related Lessons</span>
          </div>
          <div className="space-y-2">
            {relatedLessons.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/courses/${lesson.courseSlug}/lessons/${lesson.lessonId}`}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors group"
              >
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {lesson.title}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
