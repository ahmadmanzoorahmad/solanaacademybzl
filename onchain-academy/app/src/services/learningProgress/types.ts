export interface LearningProgressService {
  getXpBalance(pubkey: string): Promise<number>;
  getLessonProgress(pubkey: string, courseId: string): Promise<LessonProgressRecord[]>;
  markLessonComplete(pubkey: string, lessonId: string): Promise<void>;
  getTotalXp(pubkey: string): Promise<number>;
}

export interface LessonProgressRecord {
  lessonId: string;
  courseId: string;
  completedAt: string | null;
  xpEarned: number;
}
