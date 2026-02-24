'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Flame, Award, BookOpen } from 'lucide-react';
import { currentUser, courses, achievements } from '@/data/mock-data';
import { useServices } from '@/providers/ServicesProvider';
import { useTranslation } from '@/i18n/provider';
import { levelFromXp, levelProgress } from '@/services/xp';
import { shortenAddress } from '@/services/solana';
import { getSolanaRpcUrl, getXpMint } from '@/lib/env';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { publicKey, connected } = useWallet();
  const { learningProgress } = useServices();
  const [onChainXp, setOnChainXp] = useState<number | null>(null);
  const [xpLoading, setXpLoading] = useState(false);

  const enrolledCourses = courses.filter((c) => c.enrolled);
  const recentAchievements = achievements.filter((a) => a.earned).slice(0, 3);

  useEffect(() => {
    if (connected && publicKey) {
      setXpLoading(true);
      learningProgress
        .getXpBalance(publicKey.toBase58())
        .then(setOnChainXp)
        .catch((err: Error) => {
          toast.error(`Failed to fetch XP: ${err.message}`);
          setOnChainXp(null);
        })
        .finally(() => setXpLoading(false));
    } else {
      setOnChainXp(null);
    }
  }, [connected, publicKey, learningProgress]);

  const xpLevel = onChainXp !== null ? levelFromXp(onChainXp) : null;
  const xpProgress = onChainXp !== null ? levelProgress(onChainXp) : null;

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
          {t('dashboard.welcome')} {connected && publicKey ? shortenAddress(publicKey.toBase58()) : ''}
        </h1>
        <p className="text-lg text-muted-foreground">{t('dashboard.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 lg:col-span-2">
          {connected && xpLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-3 w-full" />
            </div>
          ) : connected && onChainXp !== null && xpProgress ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">Level {xpLevel}</span>
                  <span className="text-muted-foreground text-sm">
                    {xpProgress.current.toLocaleString()} / {xpProgress.nextLevelXp.toLocaleString()} XP
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">
                  {Math.floor(xpProgress.pct)}% to Level {(xpLevel ?? 0) + 1}
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#14F195] to-[#9945FF] rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress.pct}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">Level {currentUser.level}</span>
                  <span className="text-muted-foreground text-sm">
                    {currentUser.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#14F195] to-[#9945FF] rounded-full"
                  style={{ width: '63%' }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              {connected && xpLoading ? (
                <Skeleton className="h-8 w-20 mx-auto" />
              ) : (
                <div className="text-2xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                  {connected && onChainXp !== null ? onChainXp.toLocaleString() : currentUser.xp.toLocaleString()}
                </div>
              )}
              <div className="text-sm text-muted-foreground">{t('dashboard.totalXp')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">#{currentUser.rank}</div>
              <div className="text-sm text-muted-foreground">{t('dashboard.globalRank')}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                <Flame className="w-6 h-6 text-orange-500" />{currentUser.streak}
              </div>
              <div className="text-sm text-muted-foreground">{t('dashboard.dayStreak')}</div>
            </div>
          </div>
          {connected && onChainXp !== null && (
            <div className="mt-4 pt-4 border-t text-center">
              <span className="text-sm text-muted-foreground">{t('dashboard.onChainXp')}: </span>
              <span className="font-mono font-bold text-[#14F195]">{onChainXp.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground ml-2">(Level {xpLevel})</span>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">{t('dashboard.quickStats')}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('dashboard.coursesEnrolled')}</span>
              <Badge variant="secondary">{enrolledCourses.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('dashboard.achievements')}</span>
              <Badge variant="secondary">{achievements.filter((a) => a.earned).length}/{achievements.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('dashboard.certificates')}</span>
              <Badge variant="secondary">1</Badge>
            </div>
          </div>
          <Link href="/leaderboard" className="mt-6 block">
            <Button variant="outline" className="w-full">{t('dashboard.viewLeaderboard')}</Button>
          </Link>
        </Card>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <Card className="p-3 mb-8 text-xs font-mono bg-muted/30 border-dashed">
          <div className="flex gap-4 text-muted-foreground">
            <span>RPC: {getSolanaRpcUrl()}</span>
            <span>XP Mint: {getXpMint() ?? 'not configured'}</span>
          </div>
        </Card>
      )}

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t('dashboard.continueLearning')}</h2>
          <Link href="/courses"><Button variant="ghost">{t('common.viewAll')} <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const nextLesson = course.modules.flatMap((m) => m.lessons).find((l) => !l.completed);
              return (
                <Card key={course.id} className="p-6 hover:border-primary transition-all">
                  <div className="flex gap-4">
                    <img src={course.thumbnail} alt={course.title} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-2 truncate">{course.title}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t('dashboard.progress')}</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#14F195] to-[#9945FF]" style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>
                      {nextLesson && (
                        <Link href={`/courses/${course.slug}/lessons/${nextLesson.id}`}>
                          <Button size="sm" className="mt-4 w-full"><BookOpen className="w-4 h-4 mr-2" />{t('dashboard.continueLesson')}: {nextLesson.title}</Button>
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
            <p className="text-muted-foreground mb-4">You haven&apos;t enrolled in any courses yet</p>
            <Link href="/courses"><Button>{t('courses.title')}</Button></Link>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500" />Learning Streak</h3>
            <Badge variant="secondary">{currentUser.streak} days</Badge>
          </div>
          <div className="grid grid-cols-10 gap-2">
            {streakDays.map((day, i) => (
              <div key={i} className={`aspect-square rounded ${day.isActive ? 'bg-gradient-to-br from-[#14F195] to-[#9945FF]' : 'bg-muted'}`} title={day.date.toLocaleDateString()} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">Keep learning every day to maintain your streak!</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold flex items-center gap-2"><Award className="w-5 h-5" />Recent {t('dashboard.achievements')}</h3>
            <Link href="/profile"><Button variant="ghost" size="sm">{t('common.viewAll')} <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
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
                    <p className="text-sm text-muted-foreground">{achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="secondary" className="capitalize">{achievement.rarity}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Complete lessons to unlock achievements</p>
          )}
        </Card>
      </div>
    </div>
  );
}
