import { createClient } from "@/lib/supabase/server";
import { ACHIEVEMENT_DEFINITIONS, AchievementDefinition } from "@/config/achievements.config";

export interface UserAchievementItem extends AchievementDefinition {
  isUnlocked: boolean;
  unlockedAt?: string;
}

export class AchievementService {
  /**
   * Fetch all achievements with user unlock status
   */
  static async getUserAchievements(userId: string): Promise<UserAchievementItem[]> {
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: unlockedRows } = await (supabase.from("user_achievements") as any)
      .select("achievement_id, unlocked_at, achievements(code)")
      .eq("user_id", userId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unlockedCodes = new Set((unlockedRows || []).map((r: any) => r.achievements?.code));

    return ACHIEVEMENT_DEFINITIONS.map((def) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const match = (unlockedRows || []).find((r: any) => r.achievements?.code === def.code);
      return {
        ...def,
        isUnlocked: unlockedCodes.has(def.code),
        unlockedAt: match?.unlocked_at,
      };
    });
  }

  /**
   * Data-driven Achievement Checker Engine
   */
  static async checkAndUnlockAchievements(userId: string): Promise<string[]> {
    const supabase = await createClient();
    const unlockedNow: string[] = [];

    // Fetch user stats
    // 1. Lessons progress
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: progressRows } = await (supabase.from("user_progress") as any)
      .select("status, lessons(chapters(courses(category)))")
      .eq("user_id", userId)
      .eq("status", "completed");

    const completedLessonsCount = progressRows?.length || 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nahwuLessonsCount = (progressRows || []).filter((p: any) => p.lessons?.chapters?.courses?.category === 'nahwu').length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shorofLessonsCount = (progressRows || []).filter((p: any) => p.lessons?.chapters?.courses?.category === 'shorof').length;

    // 2. Quiz attempts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: quizAttempts } = await (supabase.from("quiz_attempts") as any)
      .select("score, is_passed")
      .eq("user_id", userId);

    const totalQuizzesPassed = (quizAttempts || []).filter((q: { is_passed: boolean }) => q.is_passed).length;
    const hasPerfectScore = (quizAttempts || []).some((q: { score: number }) => q.score === 100);

    // 3. Streaks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: streakRows } = await (supabase.from("user_streaks") as any)
      .select("id")
      .eq("user_id", userId);

    const streakDays = streakRows?.length || 0;

    // Evaluate rules
    const rules: { code: string; condition: boolean }[] = [
      { code: 'FIRST_LESSON', condition: completedLessonsCount >= 1 },
      { code: 'QUIZ_BEGINNER', condition: totalQuizzesPassed >= 10 },
      { code: 'PERFECT_SCORE', condition: hasPerfectScore },
      { code: 'NAHWU_STUDENT', condition: nahwuLessonsCount >= 10 },
      { code: 'SHOROF_STUDENT', condition: shorofLessonsCount >= 10 },
      { code: 'STREAK_7_DAYS', condition: streakDays >= 7 },
    ];

    for (const rule of rules) {
      if (rule.condition) {
        // Fetch achievement ID
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: ach } = await (supabase.from("achievements") as any)
          .select("id, xp_bonus")
          .eq("code", rule.code)
          .single();

        if (ach) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { error } = await (supabase.from("user_achievements") as any).insert({
            user_id: userId,
            achievement_id: ach.id,
          });

          if (!error) {
            unlockedNow.push(rule.code);
            // Award XP Bonus
            if (ach.xp_bonus > 0) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              await (supabase.from("user_xp") as any).insert({
                user_id: userId,
                amount: ach.xp_bonus,
                source: "achievement",
                reference_id: ach.id,
              });
            }
          }
        }
      }
    }

    return unlockedNow;
  }
}
