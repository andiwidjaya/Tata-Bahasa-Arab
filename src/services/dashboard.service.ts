import { createClient } from '@/lib/supabase/server';

export interface DashboardData {
  profile: {
    fullName: string;
    role: string;
  };
  totalXp: number;
  level: number;
  streakDays: number;
  isTodayStreakCompleted: boolean;
  xpToday: number;
  activeLesson?: {
    id: string;
    title: string;
    titleArabic?: string;
    chapterTitle?: string;
    category: 'nahwu' | 'shorof';
  };
  nahwuProgress: {
    completed: number;
    total: number;
  };
  shorofProgress: {
    completed: number;
    total: number;
  };
  pendingMistakesCount: number;
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let fullName = 'Pembelajar Bahasa Arab';
  let role = 'user';
  let userId = user?.id;

  if (user) {
    if (user.email === 'juanda.andi@gmail.com') {
      role = 'admin';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase
      .from('profiles') as any)
      .select('full_name, role')
      .eq('id', user.id)
      .single();

    if (profile) {
      fullName = profile.full_name || fullName;
      if (profile.role) role = profile.role;
    }
  }

  if (!userId) {
    return {
      profile: { fullName, role },
      totalXp: 0,
      level: 1,
      streakDays: 0,
      isTodayStreakCompleted: false,
      xpToday: 0,
      activeLesson: {
        id: 'shorof-lesson-1',
        title: '1. Bab 1: Wazan فَعَلَ - يَفْعُلُ (نَصَرَ - يَنْصُرُ)',
        titleArabic: 'فَعَلَ - يَفْعُلُ',
        chapterTitle: 'Bab 1: Tashrif Istilahi Tsulatsi Mujarrad',
        category: 'shorof',
      },
      nahwuProgress: { completed: 0, total: 34 },
      shorofProgress: { completed: 0, total: 23 },
      pendingMistakesCount: 0,
    };
  }

  // 1. Fetch Total XP
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: xpRows } = await (supabase
    .from('user_xp') as any)
    .select('amount, created_at')
    .eq('user_id', userId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalXp = xpRows?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;
  const level = Math.floor(totalXp / 250) + 1;

  // Calculate today's XP
  const todayStr = new Date().toISOString().split('T')[0];
  const xpToday = xpRows
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.filter((row: any) => row.created_at?.startsWith(todayStr))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;

  // 2. Fetch Streaks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: streakRows } = await (supabase
    .from('user_streaks') as any)
    .select('streak_date, completed')
    .eq('user_id', userId)
    .order('streak_date', { ascending: false });

  const streakDays = streakRows?.length || 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTodayStreakCompleted = streakRows?.some((s: any) => s.streak_date === todayStr) || false;

  // 3. Fetch Lesson Progress
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: progressRows } = await (supabase
    .from('user_progress') as any)
    .select('lesson_id, status')
    .eq('user_id', userId)
    .eq('status', 'completed');

  const completedLessonIds: string[] = (progressRows || []).map((p: { lesson_id: string }) => p.lesson_id);

  const completedNahwu = completedLessonIds.filter((id) => id.startsWith('nahwu-lesson-')).length;
  const completedShorof = completedLessonIds.filter((id) => id.startsWith('shorof-lesson-')).length;

  // 4. Fetch Mistakes count
  const { count: mistakesCount } = await supabase
    .from('user_mistakes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_mastered', false);

  return {
    profile: { fullName, role },
    totalXp,
    level,
    streakDays,
    isTodayStreakCompleted,
    xpToday,
    activeLesson: {
      id: 'shorof-lesson-1',
      title: '1. Bab 1: Wazan فَعَلَ - يَفْعُلُ (نَصَرَ - يَنْصُرُ)',
      titleArabic: 'فَعَلَ - يَفْعُلُ',
      chapterTitle: 'Bab 1: Tashrif Istilahi Tsulatsi Mujarrad',
      category: 'shorof',
    },
    nahwuProgress: { completed: completedNahwu, total: 34 },
    shorofProgress: { completed: completedShorof, total: 23 },
    pendingMistakesCount: mistakesCount || 0,
  };
}
