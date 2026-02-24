'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Code } from 'lucide-react';
import { courses, lessonContent, codeChallenge } from '@/data/mock-data';
import { CodeEditor } from '@/components/CodeEditor';
import { useTranslation } from '@/i18n/provider';

export default function LessonViewPage() {
  const { t } = useTranslation();
  const params = useParams<{ slug: string; lessonId: string }>();
  const { slug, lessonId } = params;
  const [completed, setCompleted] = useState(false);

  const course = courses.find((c) => c.slug === slug);
  if (!course) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">{t('common.error')}</h1>
        <p className="text-muted-foreground">{t('common.noData')}</p>
      </div>
    );
  }

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const lesson = allLessons[currentIndex];

  if (!lesson) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">{t('common.error')}</h1>
        <p className="text-muted-foreground">{t('common.noData')}</p>
      </div>
    );
  }

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isChallenge = lesson.type === 'challenge';

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <Link href={`/courses/${slug}`} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
          <ArrowLeft className="w-4 h-4" /> {t('lesson.backTo')} {course.title}
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="secondary">{lesson.type}</Badge>
          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
          {completed && <Badge className="bg-[#14F195] text-black">{t('courses.completed')}</Badge>}
        </div>
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
      </div>

      {isChallenge ? (
        <Tabs defaultValue="challenge">
          <TabsList className="mb-6">
            <TabsTrigger value="content" className="gap-1.5">
              <BookOpen className="w-4 h-4" /> {t('lesson.content')}
            </TabsTrigger>
            <TabsTrigger value="challenge" className="gap-1.5">
              <Code className="w-4 h-4" /> {t('lesson.challenge')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card className="p-8">
              <div className="prose prose-invert max-w-none">
                {lessonContent.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-6 mb-4">{line.slice(2)}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
                  if (line.startsWith('- ')) return <li key={i} className="ml-4 text-muted-foreground">{line.slice(2)}</li>;
                  if (line.startsWith('```')) return null;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="text-muted-foreground mb-2">{line}</p>;
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="challenge">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">{codeChallenge.title}</h2>
              <p className="text-muted-foreground">{codeChallenge.description}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{codeChallenge.difficulty}</Badge>
                <Badge variant="outline">{codeChallenge.estimatedTime}</Badge>
                <Badge variant="secondary">{codeChallenge.xpReward} XP</Badge>
              </div>
            </div>
            <CodeEditor
              starterCode={codeChallenge.starterCode}
              language="rust"
              testCases={codeChallenge.testCases}
              onMarkComplete={() => setCompleted(true)}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <Card className="p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {lessonContent.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-6 mb-4">{line.slice(2)}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>;
                if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
                if (line.startsWith('- ')) return <li key={i} className="ml-4 text-muted-foreground">{line.slice(2)}</li>;
                if (line.startsWith('```')) return null;
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="text-muted-foreground mb-2">{line}</p>;
              })}
            </div>
          </Card>

          <div className="flex justify-end mb-8">
            <Button
              onClick={() => setCompleted(true)}
              disabled={completed}
              className="bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90"
            >
              <CheckCircle className="w-4 h-4 mr-2" /> {t('lesson.markComplete')}
            </Button>
          </div>
        </>
      )}

      <div className="flex justify-between items-center mt-8 pt-8 border-t">
        {prevLesson ? (
          <Link href={`/courses/${slug}/lessons/${prevLesson.id}`}>
            <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> {prevLesson.title}</Button>
          </Link>
        ) : <div />}
        {nextLesson ? (
          <Link href={`/courses/${slug}/lessons/${nextLesson.id}`}>
            <Button variant="outline">{nextLesson.title} <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
