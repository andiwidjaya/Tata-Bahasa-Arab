export interface AchievementDefinition {
  code: string;
  title: string;
  description: string;
  category: 'learning' | 'quiz' | 'streak' | 'game';
  xpBonus: number;
  iconName: string;
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    code: 'FIRST_LESSON',
    title: 'Langkah Pertama',
    description: 'Menyelesaikan pelajaran Bahasa Arab pertama Anda',
    category: 'learning',
    xpBonus: 50,
    iconName: 'BookOpen',
  },
  {
    code: 'QUIZ_BEGINNER',
    title: 'Kuis Mania',
    description: 'Menyelesaikan 10 kuis evaluasi',
    category: 'quiz',
    xpBonus: 75,
    iconName: 'Award',
  },
  {
    code: 'PERFECT_SCORE',
    title: 'Nilai Sempurna',
    description: 'Mendapatkan nilai 100% pada kuis',
    category: 'quiz',
    xpBonus: 100,
    iconName: 'CheckCircle2',
  },
  {
    code: 'NAHWU_STUDENT',
    title: 'Pelajar Nahwu',
    description: 'Menyelesaikan 10 pelajaran kaidah Nahwu',
    category: 'learning',
    xpBonus: 100,
    iconName: 'BookMarked',
  },
  {
    code: 'SHOROF_STUDENT',
    title: 'Pelajar Shorof',
    description: 'Menyelesaikan 10 pelajaran kaidah Shorof',
    category: 'learning',
    xpBonus: 100,
    iconName: 'Layers',
  },
  {
    code: 'IRAB_MASTER',
    title: 'Master I\'rab',
    description: 'Menjawab 100 soal I\'rab dengan benar',
    category: 'game',
    xpBonus: 200,
    iconName: 'Swords',
  },
  {
    code: 'STREAK_7_DAYS',
    title: 'Pencari Ilmu Istiqomah',
    description: 'Mempertahankan streak belajar selama 7 hari berturut-turut',
    category: 'streak',
    xpBonus: 150,
    iconName: 'Flame',
  },
];
