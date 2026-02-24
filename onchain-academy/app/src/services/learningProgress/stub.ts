import type { LearningProgressService, LessonProgressRecord } from './types';

export class StubLearningProgressService implements LearningProgressService {
  private completedLessons = new Set<string>();

  async getXpBalance(_pubkey: string): Promise<number> {
    return 12450;
  }

  async getLessonProgress(_pubkey: string, _courseId: string): Promise<LessonProgressRecord[]> {
    return [
      { lessonId: 'les-1', courseId: 'course-1', completedAt: '2024-01-16T10:00:00Z', xpEarned: 50 },
      { lessonId: 'les-2', courseId: 'course-1', completedAt: '2024-01-17T14:30:00Z', xpEarned: 75 },
    ];
  }

  async markLessonComplete(_pubkey: string, lessonId: string): Promise<void> {
    this.completedLessons.add(lessonId);
  }

  async getTotalXp(_pubkey: string): Promise<number> {
    return 12450;
  }
}
