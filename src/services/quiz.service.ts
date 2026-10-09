import { createClient } from "@/lib/supabase/server";
import { Quiz, Question } from "@/types/quiz-engine";

export class QuizService {
  /**
   * Fetch complete Quiz by ID or Lesson ID from Supabase
   */
  static async getQuizByLessonId(lessonId: string): Promise<Quiz | null> {
    const supabase = await createClient();

    // Fetch quiz entity
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: quizData } = await (supabase.from("quizzes") as any)
      .select("id, title, description, passing_score, xp_reward, lesson_id")
      .eq("lesson_id", lessonId)
      .single();

    if (!quizData) {
      // Fallback mock quiz if no quiz record in DB yet
      return this.getMockQuiz(lessonId);
    }

    // Fetch quiz questions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: quizQuestions } = await (supabase.from("quiz_questions") as any)
      .select("question_id, order_index, questions(*, question_options(*))")
      .eq("quiz_id", quizData.id)
      .order("order_index", { ascending: true });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const questions: Question[] = (quizQuestions || []).map((qq: any) => {
      const q = qq.questions;
      return {
        id: q.id,
        lessonId: q.lesson_id,
        type: q.type,
        questionText: q.question_text,
        questionArabic: q.question_arabic,
        explanation: q.explanation,
        points: q.points || 10,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options: (q.question_options || []).map((opt: any) => ({
          id: opt.id,
          optionText: opt.option_text,
          optionArabic: opt.option_arabic,
          isCorrect: opt.is_correct,
        })),
      };
    });

    return {
      id: quizData.id,
      lessonId: quizData.lesson_id,
      title: quizData.title,
      description: quizData.description,
      passingScore: quizData.passing_score,
      xpReward: quizData.xp_reward,
      questions,
    };
  }

  static getMockQuiz(lessonId: string): Quiz {
    return {
      id: `quiz-mock-${lessonId}`,
      title: "Kuis Latihan Al-Kalimah",
      description: "Uji pemahaman Isim, Fi'il, dan Harf.",
      passingScore: 70,
      xpReward: 50,
      questions: [
        {
          id: "q-1",
          type: "multiple_choice",
          questionText: "Manakah di bawah ini yang merupakan contoh Isim (Kata Benda)?",
          questionArabic: "أَيُّ هَذِهِ الكَلِمَاتِ اِسْمٌ؟",
          explanation: "Zaidun (زَيْدٌ) adalah nama orang, sehingga merupakan kategori Isim.",
          points: 10,
          options: [
            { id: "opt-1", optionText: "Zaidun", optionArabic: "زَيْدٌ", isCorrect: true },
            { id: "opt-2", optionText: "Kataba", optionArabic: "كَتَبَ", isCorrect: false },
            { id: "opt-3", optionText: "Min", optionArabic: "مِنْ", isCorrect: false },
          ],
        },
        {
          id: "q-2",
          type: "true_false",
          questionText: 'Apakah "Fi\'il" (فِعْلٌ) menunjukkan kata yang terikat dengan waktu?',
          questionArabic: "هَلِ الفِعْلُ يَدُلُّ عَلَى زَمَنٍ؟",
          explanation: "Benar, Fi'il adalah kata kerja yang terikat dengan dimensi waktu.",
          points: 10,
          options: [
            { id: "opt-tf-1", optionText: "Benar (صَحِيْحٌ)", isCorrect: true },
            { id: "opt-tf-2", optionText: "Salah (خَطَأٌ)", isCorrect: false },
          ],
        },
        {
          id: "q-3",
          type: "irab",
          questionText: "Tentukan kedudukan I'rab dari kata 'Zaidun' dalam kalimat (جَاءَ زَيْدٌ)!",
          questionArabic: "مَا هُوَ إِعْرَابُ كَلِمَةِ 'زَيْدٌ'؟",
          explanation: "Zaidun berkedudukan sebagai Fa'il (Pelaku) sehingga marfu' dengan harakat dhommah.",
          points: 15,
          options: [
            { id: "opt-irab-1", optionText: "Fa'il Marfu' (فَاعِلٌ مَرْفُوْعٌ)", isCorrect: true },
            { id: "opt-irab-2", optionText: "Maf'ul Bih Mansub (مَفْعُوْلٌ بِهِ مَنْصُوْبٌ)", isCorrect: false },
            { id: "opt-irab-3", optionText: "Mubtada' Marfu' (مُبْتَدَأٌ مَرْفُوْعٌ)", isCorrect: false },
          ],
        },
      ],
    };
  }
}
