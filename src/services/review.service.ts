import { createClient } from "@/lib/supabase/server";

export interface MistakeItem {
  id: string;
  userId: string;
  questionId: string;
  questionText: string;
  questionArabic?: string;
  lessonTitle?: string;
  incorrectAnswer?: string;
  correctAnswer?: string;
  mistakeCount: number;
  masteryLevel: number; // 0=unlearned, 1=learning, 2=familiar, 3=mastered
  lastAttemptAt: string;
}

export class ReviewService {
  /**
   * Fetch ranked mistake items for user review ordered by mistakeCount & recency
   */
  static async getUserMistakes(userId: string): Promise<MistakeItem[]> {
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: mistakes } = await (supabase.from("user_mistakes") as any)
      .select("*, questions(*, lessons(title))")
      .eq("user_id", userId)
      .eq("is_mastered", false)
      .order("wrong_count", { ascending: false })
      .order("last_wrong_at", { ascending: false });

    if (!mistakes) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mistakes.map((m: any) => ({
      id: m.id,
      userId: m.user_id,
      questionId: m.question_id,
      questionText: m.questions?.question_text || "Soal Latihan",
      questionArabic: m.questions?.question_arabic,
      lessonTitle: m.questions?.lessons?.title || "Materi Umum",
      mistakeCount: m.wrong_count || 1,
      masteryLevel: m.wrong_count > 4 ? 0 : m.wrong_count > 2 ? 1 : 2,
      lastAttemptAt: m.last_wrong_at,
    }));
  }

  /**
   * Update mastery level when user answers correctly during review
   */
  static async resolveMistake(userId: string, questionId: string): Promise<void> {
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("user_mistakes") as any)
      .update({
        is_mastered: true,
      })
      .eq("user_id", userId)
      .eq("question_id", questionId);
  }
}
