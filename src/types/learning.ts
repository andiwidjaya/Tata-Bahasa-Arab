export type CategoryType = 'nahwu' | 'shorof';

export interface Course {
  id: string;
  title: string;
  category: CategoryType;
  description: string;
  level: number;
  totalChapters: number;
  orderIndex: number;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
  totalLessons: number;
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  titleArabic?: string;
  contentMarkdown: string;
  audioUrl?: string;
  xpReward: number;
  orderIndex: number;
}
