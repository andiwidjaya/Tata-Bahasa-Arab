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

const FALLBACK_COURSES: Record<string, { course: CourseDetail; chapters: ChapterDetail[] }> = {
  nahwu: {
    course: {
      id: '11111111-1111-4111-8111-111111111111',
      title: 'Kurikulum Ilmu Nahwu',
      category: 'nahwu',
      description: 'Pelajari kaidah penyusunan kalimat Bahasa Arab step-by-step.',
      level: 1,
    },
    chapters: [
      {
        id: '33333333-3333-4333-8333-333333333333',
        title: 'Bab 1: Pengenalan Al-Kalimah (Isim, Fi\'il, Harf)',
        description: 'Memahami pembagian kata tunggal dalam Bahasa Arab.',
        orderIndex: 1,
        lessons: [
          {
            id: '77777777-7777-4777-8777-777777777777',
            title: 'Pengenalan Al-Kalimah',
            titleArabic: 'الكَلِمَةُ',
            orderIndex: 1,
          },
          {
            id: '77777777-7777-4777-8777-777777777778',
            title: 'Tanda-tanda Isim, Fi\'il, dan Harf',
            titleArabic: 'عَلَامَاتُ الإِسْمِ وَالفِعْلِ وَالحَرْفِ',
            orderIndex: 2,
          },
        ],
      },
      {
        id: '33333333-3333-4333-8333-333333333334',
        title: 'Bab 2: Pembagian Kalimat (Al-Kalam & Al-Jumlah)',
        description: 'Memahami susunan kalimat sempurna dalam Bahasa Arab.',
        orderIndex: 2,
        lessons: [
          {
            id: '77777777-7777-4777-8777-777777777779',
            title: 'Pengenalan Al-Kalam',
            titleArabic: 'الكَلَامُ',
            orderIndex: 1,
          },
        ],
      },
    ],
  },
  shorof: {
    course: {
      id: '22222222-2222-4222-8222-222222222222',
      title: 'Kurikulum Ilmu Shorof',
      category: 'shorof',
      description: 'Pelajari pola perubahan bentuk kata (Tashrif) Bahasa Arab.',
      level: 1,
    },
    chapters: [
      {
        id: '44444444-4444-4444-8444-444444444444',
        title: 'Bab 1: Wazan Tashrif Bab Pertama (فَعَلَ - يَفْعُلُ)',
        description: 'Memahami pola فَعَلَ - يَفْعُلُ dan variasi bentukannya.',
        orderIndex: 1,
        lessons: [
          {
            id: '88888888-8888-4888-8888-888888888888',
            title: 'Tashrif Nasara - Yansuru',
            titleArabic: 'نَصَرَ - يَنْصُرُ',
            orderIndex: 1,
          },
          {
            id: '88888888-8888-4888-8888-888888888889',
            title: 'Tashrif Daraba - Yadribu',
            titleArabic: 'ضَرَبَ - يَضْرِبُ',
            orderIndex: 2,
          },
        ],
      },
    ],
  },
};

const FALLBACK_LESSONS: Record<string, { lesson: any; contents: any[] }> = {
  '77777777-7777-4777-8777-777777777777': {
    lesson: {
      id: '77777777-7777-4777-8777-777777777777',
      title: 'Pengenalan Al-Kalimah',
      titleArabic: 'الكَلِمَةُ',
      xpReward: 25,
      chapterTitle: 'Bab 1: Pengenalan Al-Kalimah',
      category: 'nahwu',
    },
    contents: [
      {
        id: 'c1',
        type: 'text',
        text: 'Dalam Bahasa Arab, Al-Kalimah (kata) adalah lafaz yang memiliki arti tunggal. Al-Kalimah terbagi menjadi 3 jenis utama: Isim, Fi\'il, dan Harf.',
      },
      {
        id: 'c2',
        type: 'arabic_text',
        arabic: 'الكَلِمَةُ هِيَ اللَّفْظُ الْمُفْرَدُ',
        text: 'Al-Kalimah adalah lafaz yang mempunyai arti tunggal.',
      },
      {
        id: 'c3',
        type: 'example',
        arabic: 'كِتَابٌ (Isim) / كَتَبَ (Fi\'il) / فِي (Harf)',
        text: 'Contoh Isim (Kitab = Buku), Fi\'il (Kataba = Menulis), Harf (Fi = Di dalam)',
      },
      {
        id: 'c4',
        type: 'exercise',
        text: 'Sebutkan 3 jenis Al-Kalimah yang telah kamu pelajari!',
      },
    ],
  },
  '77777777-7777-4777-8777-777777777778': {
    lesson: {
      id: '77777777-7777-4777-8777-777777777778',
      title: 'Tanda-tanda Isim, Fi\'il, dan Harf',
      titleArabic: 'عَلَامَاتُ الإِسْمِ وَالفِعْلِ وَالحَرْفِ',
      xpReward: 30,
      chapterTitle: 'Bab 1: Pengenalan Al-Kalimah',
      category: 'nahwu',
    },
    contents: [
      {
        id: 'c1',
        type: 'text',
        text: 'Isim memiliki tanda-tanda khusus seperti menerima Tanwin, diawali Alif Lam (Al-), dan didahului oleh Huruf Jar.',
      },
      {
        id: 'c2',
        type: 'arabic_text',
        arabic: 'فَالإِسْمُ يُعْرَفُ بِالخَفْضِ وَالتَّنْوِيْنِ وَدُخُوْلِ الأَلِفِ وَاللاَّمِ',
        text: 'Maka Isim dapat dikenali dengan Khafdh (Jar), Tanwin, dan masuknya Alif Lam.',
      },
      {
        id: 'c3',
        type: 'example',
        arabic: 'فِي الْمَسْجِدِ',
        text: 'Contoh: Pada kata Al-Masjidi terdapat tanda Jar dan Alif Lam.',
      },
    ],
  },
  '77777777-7777-4777-8777-777777777779': {
    lesson: {
      id: '77777777-7777-4777-8777-777777777779',
      title: 'Pengenalan Al-Kalam',
      titleArabic: 'الكَلَامُ',
      xpReward: 30,
      chapterTitle: 'Bab 2: Pembagian Kalimat',
      category: 'nahwu',
    },
    contents: [
      {
        id: 'c1',
        type: 'text',
        text: 'Al-Kalam adalah lafaz yang tersusun, memberikan faedah sempurna, dan menggunakan bahasa Arab.',
      },
      {
        id: 'c2',
        type: 'arabic_text',
        arabic: 'الكَلَامُ هُوَ اللَّفْظُ الْمُرَكَّبُ الْمُفِيْدُ بِالْوَضْعِ',
        text: 'Al-Kalam adalah lafaz tersusun yang memberi faedah dengan bahasa Arab.',
      },
    ],
  },
  '88888888-8888-4888-8888-888888888888': {
    lesson: {
      id: '88888888-8888-4888-8888-888888888888',
      title: 'Tashrif Nasara - Yansuru',
      titleArabic: 'نَصَرَ - يَنْصُرُ',
      xpReward: 30,
      chapterTitle: 'Bab 1: Wazan Tashrif Bab Pertama',
      category: 'shorof',
    },
    contents: [
      {
        id: 'c1',
        type: 'text',
        text: 'Wazan Bab Pertama Shorof adalah فَعَلَ - يَفْعُلُ. Contoh utamanya adalah kata kerja نَصَرَ (menolong).',
      },
      {
        id: 'c2',
        type: 'arabic_text',
        arabic: 'نَصَرَ - يَنْصُرُ - نَصْرًا - فَهُوَ نَاصِرٌ - وَذَاكَ مَنْصُوْرٌ',
        text: 'Perubahan bentuk kata kerja Nasara (Fi\'il Madhi, Mudhari, Masdar, Isim Fa\'il, Isim Maf\'ul).',
      },
    ],
  },
  '88888888-8888-4888-8888-888888888889': {
    lesson: {
      id: '88888888-8888-4888-8888-888888888889',
      title: 'Tashrif Daraba - Yadribu',
      titleArabic: 'ضَرَبَ - يَضْرِبُ',
      xpReward: 30,
      chapterTitle: 'Bab 1: Wazan Tashrif Bab Pertama',
      category: 'shorof',
    },
    contents: [
      {
        id: 'c1',
        type: 'text',
        text: 'Wazan Bab Kedua Shorof adalah فَعَلَ - يَفْعِلُ. Contoh utamanya adalah kata kerja ضَرَبَ (memukul).',
      },
      {
        id: 'c2',
        type: 'arabic_text',
        arabic: 'ضَرَبَ - يَضْرِبُ - ضَرْبًا - فَهُوَ ضَارِبٌ',
        text: 'Perubahan bentuk kata kerja Daraba (Fi\'il Madhi, Mudhari, Masdar, Isim Fa\'il).',
      },
    ],
  },
};

export async function fetchCourseChapters(courseCategory: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch course
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: course } = await (supabase.from('courses') as any)
      .select('id, title, category, description, level')
      .eq('category', courseCategory)
      .single();

    if (!course) {
      return FALLBACK_COURSES[courseCategory] || { course: null, chapters: [] };
    }

    // Fetch chapters & lessons
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: chaptersData } = await (supabase.from('chapters') as any)
      .select('id, title, description, order_index, lessons(id, title, title_arabic, order_index)')
      .eq('course_id', course.id)
      .order('order_index', { ascending: true });

    if (!chaptersData || chaptersData.length === 0) {
      return FALLBACK_COURSES[courseCategory] || { course: null, chapters: [] };
    }

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
  } catch (err) {
    console.error("fetchCourseChapters error:", err);
    return FALLBACK_COURSES[courseCategory] || { course: null, chapters: [] };
  }
}

export async function fetchLessonDetail(lessonId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: lesson } = await (supabase.from('lessons') as any)
      .select('id, chapter_id, title, title_arabic, xp_reward, chapters(title, courses(category))')
      .eq('id', lessonId)
      .single();

    if (!lesson) {
      const fallback = FALLBACK_LESSONS[lessonId];
      if (fallback) {
        return {
          lesson: fallback.lesson,
          contents: fallback.contents,
          isCompletedInitial: false,
        };
      }
      return null;
    }

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
  } catch (err) {
    console.error("fetchLessonDetail error:", err);
    const fallback = FALLBACK_LESSONS[lessonId];
    if (fallback) {
      return {
        lesson: fallback.lesson,
        contents: fallback.contents,
        isCompletedInitial: false,
      };
    }
    return null;
  }
}

