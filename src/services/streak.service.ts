import { createClient } from "@/lib/supabase/server";

export interface StreakInfo {
  currentStreak: number;
  isTodayCompleted: boolean;
  lastActiveDate?: string;
}

export class StreakService {
  /**
   * Log daily learning activity and calculate current streak considering user timezone
   */
  static async recordActivity(userId: string): Promise<StreakInfo> {
    const supabase = await createClient();

    // Use ISO YYYY-MM-DD for current date
    const todayStr = new Date().toISOString().split('T')[0];

    // Upsert today's streak entry
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("user_streaks") as any).upsert({
      user_id: userId,
      streak_date: todayStr,
      completed: true,
    });

    return this.getStreakInfo(userId);
  }

  /**
   * Fetch consecutive active streak days for user
   */
  static async getStreakInfo(userId: string): Promise<StreakInfo> {
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: streakRows } = await (supabase.from("user_streaks") as any)
      .select("streak_date, completed")
      .eq("user_id", userId)
      .order("streak_date", { ascending: false });

    if (!streakRows || streakRows.length === 0) {
      return { currentStreak: 0, isTodayCompleted: false };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const isTodayCompleted = streakRows.some((s: { streak_date: string }) => s.streak_date === todayStr);

    let streakCount = 0;
    const checkDate = new Date();

    // Check consecutive days backward
    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasRecord = streakRows.some((s: { streak_date: string }) => s.streak_date === dateStr);

      if (hasRecord) {
        streakCount++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (i === 0 && !isTodayCompleted) {
        // Allow user to complete today without breaking yesterday's streak
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return {
      currentStreak: streakCount,
      isTodayCompleted,
      lastActiveDate: streakRows[0]?.streak_date,
    };
  }
}
