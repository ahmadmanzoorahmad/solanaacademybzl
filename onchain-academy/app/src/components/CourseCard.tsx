import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-[#22C55E] text-white',
  Intermediate: 'bg-[#FACC15] text-black',
  Advanced: 'bg-[#EF4444] text-white',
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group cursor-pointer h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge className={difficultyColor[course.difficulty]}>{course.difficulty}</Badge>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{course.duration}</span>
            <Badge variant="secondary">{course.xpReward} XP</Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}
