import { Link } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { XPProgressBar } from '../components/XPProgressBar';
import { AchievementBadge } from '../components/AchievementBadge';
import { ArrowRight, Flame, Calendar, Award, BookOpen } from 'lucide-react';
import { currentUser, courses, achievements } from '../data/mockData';

export function Dashboard() {
  const enrolledCourses = courses.filter((c) => c.enrolled);
  const recentAchievements = achievements.filter((a) => a.earned).slice(0, 3);
  
  // Mock streak calendar data (last 30 days)
  const today = new Date();
  const streakDays = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (29 - i));
    const isActive = i >= 30 - currentUser.streak;
    return { date, isActive };
  });

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Welcome back, {currentUser.name.split(' ')[0]}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Continue your learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* XP and Level Card */}
        <Card className="p-6 lg:col-span-2">
          <XPProgressBar currentXP={currentUser.xp} level={currentUser.level} />
          
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                {currentUser.xp.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">#{currentUser.rank}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                <Flame className="w-6 h-6 text-orange-500" />
                {currentUser.streak}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Courses Enrolled</span>
              <Badge variant="secondary">{enrolledCourses.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Achievements</span>
              <Badge variant="secondary">
                {achievements.filter((a) => a.earned).length}/{achievements.length}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Certificates</span>
              <Badge variant="secondary">1</Badge>
            </div>
          </div>
          <Link to="/leaderboard" className="mt-6">
            <Button variant="outline" className="w-full">
              View Leaderboard
            </Button>
          </Link>
        </Card>
      </div>

      {/* Current Courses */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Continue Learning</h2>
          <Link to="/courses">
            <Button variant="ghost">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const nextLesson = course.modules
                .flatMap((m) => m.lessons)
                .find((l) => !l.completed);

              return (
                <Card key={course.id} className="p-6 hover:border-primary transition-all">
                  <div className="flex gap-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-2 truncate">{course.title}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#14F195] to-[#9945FF]"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      {nextLesson && (
                        <Link to={`/courses/${course.slug}/lessons/${nextLesson.id}`}>
                          <Button size="sm" className="mt-4 w-full">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Continue: {nextLesson.title}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet</p>
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Streak Calendar */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Learning Streak
            </h3>
            <Badge variant="secondary">{currentUser.streak} days</Badge>
          </div>
          
          <div className="grid grid-cols-10 gap-2">
            {streakDays.map((day, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${
                  day.isActive
                    ? 'bg-gradient-to-br from-[#14F195] to-[#9945FF]'
                    : 'bg-muted'
                }`}
                title={day.date.toLocaleDateString()}
              />
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Keep learning every day to maintain your streak!
          </p>
        </Card>

        {/* Recent Achievements */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Achievements
            </h3>
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {recentAchievements.length > 0 ? (
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 bg-opacity-20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {achievement.rarity}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Complete lessons to unlock achievements
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
