import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Clock, Users, Star, BookOpen, Video, Code } from 'lucide-react';
import { courses } from '@/data/mock-data';
import { notFound } from 'next/navigation';

const lessonTypeIcon: Record<string, React.ElementType> = { reading: BookOpen, video: Video, challenge: Code };

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const difficultyColor: Record<string, string> = { Beginner: 'bg-[#22C55E] text-white', Intermediate: 'bg-[#FACC15] text-black', Advanced: 'bg-[#EF4444] text-white' };
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((sum, m) => sum + m.lessons.filter((l) => l.completed).length, 0);

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <Badge className={difficultyColor[course.difficulty]}>{course.difficulty}</Badge>
            <h1 className="text-4xl font-bold mt-4 mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground">{course.description}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{course.students.toLocaleString()} students</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{course.rating}</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Course Content</h2>
            {course.modules.map((mod) => (
              <Card key={mod.id} className="p-6">
                <h3 className="font-semibold text-lg mb-4">{mod.title}</h3>
                <div className="space-y-3">
                  {mod.lessons.map((lesson) => {
                    const Icon = lessonTypeIcon[lesson.type] || BookOpen;
                    return (
                      <Link key={lesson.id} href={`/courses/${course.slug}/lessons/${lesson.id}`}
                        className={`flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors ${lesson.completed ? 'opacity-60' : ''}`}>
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span className={lesson.completed ? 'line-through' : ''}>{lesson.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </Link>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card className="p-6 sticky top-20">
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-6" />
            {course.enrolled ? (
              <>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm"><span>Progress</span><span>{course.progress}%</span></div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{completedLessons} of {totalLessons} lessons completed</p>
                </div>
                <Button className="w-full">Continue Learning <ArrowRight className="ml-2 w-4 h-4" /></Button>
              </>
            ) : (
              <Button className="w-full bg-gradient-to-r from-[#14F195] to-[#9945FF]">
                Enroll Now - Free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
            <div className="mt-4 pt-4 border-t space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">XP Reward</span><Badge variant="secondary">{course.xpReward} XP</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span>{course.category}</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
