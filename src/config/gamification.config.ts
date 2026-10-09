export const GAMIFICATION_CONFIG = {
  // XP Rewards per source
  xpRewards: {
    lessonCompletion: 25,
    quizCompletion: 50,
    correctAnswer: 10,
    perfectQuizBonus: 30,
    gameCompletion: 20,
  },

  // Level Threshold Configuration (XP Required to reach each level)
  levelThresholds: [
    { level: 1, minXp: 0, title: 'Mubtadi\' (Pemula)' },
    { level: 2, minXp: 100, title: 'Tholib (Pelajar)' },
    { level: 3, minXp: 250, title: 'Mutawassit (Menengah)' },
    { level: 4, minXp: 500, title: 'Mahir (Lanjutan)' },
    { level: 5, minXp: 900, title: 'Mutaqaddim (Utama)' },
    { level: 6, minXp: 1400, title: 'Ustadh (Master)' },
  ],

  // Default Daily Goal XP
  defaultDailyGoalXp: 50,
};
