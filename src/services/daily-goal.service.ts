import { createClient } from "@/lib/supabase/server";
import { GAMIFICATION_CONFIG } from "@/config/gamification.config";

export interface DailyGoalInfo {
  targetXp: number;
  currentXpToday: number;
  isGoalAchieved: boolean;
  progressPercentage: number;
}

export class DailyGoalService {
  /**
   * Fetch user's daily XP progress for today
   */
  static async getDailyGoalInfo(userId: string, customTargetXp?: number): Promise<DailyGoalInfo> {
    const supabase = await createClient();
    const targetXp = customTargetXp || GAMIFICATION_CONFIG.defaultDailyGoalXp;

    const todayStr = new Date().toISOString().split('T')[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: xpRows } = await (supabase.from("user_xp") as any)
      .select("amount, created_at")
      .eq("user_id", userId);

    const currentXpToday = (xpRows || [])
      .filter((row: { created_at: string }) => row.created_at?.startsWith(todayStr))
      .reduce((acc: number, curr: { amount: number }) => acc + curr.amount, 0);

    const progressPercentage = Math.min(100, Math.round((currentXpToday / targetXp) * 100));
    const isGoalAchieved = currentXpToday >= targetXp;

    return {
      targetXp,
      currentXpToday,
      isGoalAchieved,
      progressPercentage,
    };
  }
}
