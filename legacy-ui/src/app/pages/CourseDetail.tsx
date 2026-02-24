import { useParams, Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Clock, Award, Users, Star, PlayCircle, CheckCircle, Lock } from 'lucide-react';
import { courses } from '../data/mockData';

export function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="container px-4 md:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <Link to="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const difficultyColor = {
    Beginner: 'bg-[#22C55E] text-white',
    Intermediate: 'bg-[#FACC15] text-black',
    Advanced: 'bg-[#EF4444] text-white',
  };

  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, mod) => acc + mod.lessons.filter((l) => l.completed).length,
    0
  );

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge className={difficultyColor[course.difficulty]}>
                {course.difficulty}
              </Badge>
              <Badge variant="outline">{course.category}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground">{course.description}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-muted-foreground" />
              <span>{course.xpReward} XP</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span>{course.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span>{course.rating} rating</span>
            </div>
          </div>

          {course.progress !== undefined && course.progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Your Progress</span>
                <span className="font-medium">
                  {completedLessons} / {totalLessons} lessons completed
                </span>
              </div>
              <Progress value={course.progress} className="h-3" />
            </div>
          )}
        </div>

        <div>
          <Card className="p-6 space-y-4 sticky top-24">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            
            {course.enrolled ? (
              <Link to={`/courses/${course.slug}/lessons/les-1`}>
                <Button className="w-full" size="lg">
                  Continue Learning
                </Button>
              </Link>
            ) : (
              <Button className="w-full bg-gradient-to-r from-[#14F195] to-[#9945FF]" size="lg">
                Enroll Now - Free
              </Button>
            )}

            <div className="pt-4 border-t space-y-3">
              <h4 className="font-semibold">This course includes:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {totalLessons} interactive lessons
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Hands-on coding challenges
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  NFT certificate upon completion
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Lifetime access
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      {/* Course Content */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <Accordion type="multiple" className="space-y-4">
          {course.modules.map((module, moduleIndex) => (
            <AccordionItem
              key={module.id}
              value={module.id}
              className="border rounded-lg px-6"
            >
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                      {moduleIndex + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.lessons.length} lessons
                      </p>
                    </div>
                  </div>
                  {module.completed && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-2 pl-14">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lesson.id}
                      to={course.enrolled ? `/courses/${course.slug}/lessons/${lesson.id}` : '#'}
                      className={`block p-4 rounded-lg border hover:border-primary transition-all ${
                        !course.enrolled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : course.enrolled ? (
                            <PlayCircle className="w-5 h-5 text-primary" />
                          ) : (
                            <Lock className="w-5 h-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {lesson.type} · {lesson.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
        <Card className="p-8 text-center text-muted-foreground">
          <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500 fill-yellow-500" />
          <p>Reviews coming soon!</p>
        </Card>
      </div>
    </div>
  );
}
