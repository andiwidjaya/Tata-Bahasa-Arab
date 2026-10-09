import { createClient } from '@/lib/supabase/server';
import { AudioService } from '@/services/audio.service';

export interface CourseDetail {
  id: string;
  title: string;
  category: 'nahwu' | 'shorof';
  description: string;
  level: number;
}

export interface ChapterDetail {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  lessons: {
    id: string;
    title: string;
    titleArabic?: string;
    orderIndex: number;
    isCompleted?: boolean;
  }[];
}

export async function fetchCoursesList() {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: courses } = await (supabase.from('courses') as any)
    .select('id, title, category, description, level')
    .eq('is_published', true)
    .order('order_index', { ascending: true });

  return (courses as CourseDetail[]) || [];
}

export async function fetchCourseChapters(courseCategory: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // Fetch course
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: course } = await (supabase.from('courses') as any)
    .select('id, title, category, description, level')
    .eq('category', courseCategory)
    .single();

  if (!course) return { course: null, chapters: [] };

  // Fetch chapters & lessons
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: chaptersData } = await (supabase.from('chapters') as any)
    .select('id, title, description, order_index, lessons(id, title, title_arabic, order_index)')
    .eq('course_id', course.id)
    .order('order_index', { ascending: true });

  // Fetch completed lessons for current user
  let completedLessonIds: string[] = [];
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: progress } = await (supabase.from('user_progress') as any)
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('status', 'completed');
    completedLessonIds = progress?.map((p: { lesson_id: string }) => p.lesson_id) || [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chapters: ChapterDetail[] = (chaptersData || []).map((ch: any) => ({
    id: ch.id,
    title: ch.title,
    description: ch.description,
    orderIndex: ch.order_index,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lessons: (ch.lessons || []).map((l: any) => ({
      id: l.id,
      title: l.title,
      titleArabic: l.title_arabic,
      orderIndex: l.order_index,
      isCompleted: completedLessonIds.includes(l.id),
    })),
  }));

  return { course: course as CourseDetail, chapters };
}

export async function fetchLessonDetail(lessonId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: lesson } = await (supabase.from('lessons') as any)
    .select('id, chapter_id, title, title_arabic, xp_reward, chapters(title, courses(category))')
    .eq('id', lessonId)
    .single();

  if (!lesson) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: contents } = await (supabase.from('lesson_contents') as any)
    .select('id, content_type, content_text, content_arabic, audio(audio_url)')
    .eq('lesson_id', lessonId)
    .order('order_index', { ascending: true });

  let isCompletedInitial = false;
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: prog } = await (supabase.from('user_progress') as any)
      .select('status')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .eq('status', 'completed')
      .single();
    if (prog) isCompletedInitial = true;
  }

  return {
    lesson: {
      id: lesson.id,
      title: lesson.title,
      titleArabic: lesson.title_arabic,
      xpReward: lesson.xp_reward,
      chapterTitle: lesson.chapters?.title,
      category: lesson.chapters?.courses?.category,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contents: (contents || []).map((c: any) => ({
      id: c.id,
      type: c.content_type,
      text: c.content_text,
      arabic: c.content_arabic,
      audioUrl: c.audio?.audio_url ? AudioService.getStoragePublicUrl(c.audio.audio_url) : undefined,
    })),
    isCompletedInitial,
  };
}
