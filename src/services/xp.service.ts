import { createClient } from "@/lib/supabase/server";
import { GAMIFICATION_CONFIG } from "@/config/gamification.config";

export type XPSource =
  | 'lesson_completion'
  | 'quiz_completion'
  | 'correct_answer'
  | 'perfect_quiz'
  | 'game';

export class XPService {
  /**
   * Award XP to user and log entry in user_xp table
   */
  static async awardXP(
    userId: string,
    source: XPSource,
    customAmount?: number,
    referenceId?: string
  ): Promise<number> {
    const supabase = await createClient();

    const amount = customAmount ?? GAMIFICATION_CONFIG.xpRewards[
      source === 'lesson_completion' ? 'lessonCompletion' :
      source === 'quiz_completion' ? 'quizCompletion' :
      source === 'correct_answer' ? 'correctAnswer' :
      source === 'perfect_quiz' ? 'perfectQuizBonus' : 'gameCompletion'
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("user_xp") as any).insert({
      user_id: userId,
      amount,
      source,
      reference_id: referenceId,
    });

    return amount;
  }

  /**
   * Calculate total XP earned by user
   */
  static async getTotalXP(userId: string): Promise<number> {
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("user_xp") as any)
      .select("amount")
      .eq("user_id", userId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data || []).reduce((acc: number, curr: any) => acc + curr.amount, 0);
  }
}
