import { createClient } from "@/lib/supabase/server";
import { Quiz, Question } from "@/types/quiz-engine";

export class QuizService {
  /**
   * Fetch complete Quiz by ID or Lesson ID from Supabase
   */
  static async getQuizByLessonId(lessonId: string): Promise<Quiz | null> {
    try {
      const supabase = await createClient();

      // Fetch quiz entity
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: quizData } = await (supabase.from("quizzes") as any)
        .select("id, title, description, passing_score, xp_reward, lesson_id")
        .eq("lesson_id", lessonId)
        .single();

      if (!quizData) {
        return this.getMockQuiz(lessonId);
      }

      // Fetch quiz questions
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: quizQuestions } = await (supabase.from("quiz_questions") as any)
        .select("question_id, order_index, questions(*, question_options(*))")
        .eq("quiz_id", quizData.id)
        .order("order_index", { ascending: true });

      if (!quizQuestions || quizQuestions.length === 0) {
        return this.getMockQuiz(lessonId);
      }

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
    } catch (err) {
      console.error("getQuizByLessonId error:", err);
      return this.getMockQuiz(lessonId);
    }
  }

  static getMockQuiz(lessonId: string): Quiz {
    const QUIZ_DATABASE: Record<string, Quiz> = {
      'nahwu-lesson-1': {
        id: 'quiz-nahwu-1',
        lessonId: 'nahwu-lesson-1',
        title: 'Kuis Bab 1: Pengenalan Al-Kalam Matan Al-Ajrumiyyah',
        description: 'Uji pemahaman 4 syarat utama Al-Kalam menurut Asy-Syaikh Ash-Shanhaji.',
        passingScore: 70,
        xpReward: 50,
        questions: [
          {
            id: 'q-n1-1',
            type: 'multiple_choice',
            questionText: 'Manakah di bawah ini yang merupakan susunan definisi Al-Kalam menurut Matan Al-Ajrumiyyah?',
            questionArabic: 'مَا هُوَ تَعْرِيفُ الكَلَامِ فِي المَتْنِ؟',
            explanation: 'Syaikh Ash-Shanhaji menyatakan: "Al-Kalamu huwal lafdzhul murakkabul mufidu bil-wadh\'i".',
            points: 10,
            options: [
              { id: 'opt-n1-1a', optionText: 'Lafadz tersusun yang bermanfaat dengan bahasa Arab', optionArabic: 'اَللَّفْظُ الْمُرَكَّبُ الْمُفِيدُ بِالْوَضْعِ', isCorrect: true },
              { id: 'opt-n1-1b', optionText: 'Setiap kata tunggal yang memiliki arti', optionArabic: 'اَللَّفْظُ الْمُفْرَدُ', isCorrect: false },
              { id: 'opt-n1-1c', optionText: 'Suara yang tidak mengandung arti', optionArabic: 'اَللَّفْظُ غَيْرُ الْمُفِيدِ', isCorrect: false },
            ],
          },
          {
            id: 'q-n1-2',
            type: 'true_false',
            questionText: 'Apakah kalimat yang tersusun namun belum memberikan pemahaman sempurna (belum mufid) dapat disebut Al-Kalam?',
            questionArabic: 'هَلِ الـمُرَكَّبُ غَيْرُ الـمُفِيدِ يُسَمَّى كَلَامًا؟',
            explanation: 'Salah. Syarat mutlak Al-Kalam harus Mufid (memberikan faedah pemahaman yang sempurna).',
            points: 10,
            options: [
              { id: 'opt-n1-2a', optionText: 'Benar (صَحِيْحٌ)', isCorrect: false },
              { id: 'opt-n1-2b', optionText: 'Salah (خَطَأٌ)', isCorrect: true },
            ],
          },
          {
            id: 'q-n1-3',
            type: 'multiple_choice',
            questionText: 'Manakah di bawah ini contoh kalimat yang memenuhi 4 syarat Al-Kalam sempurna?',
            questionArabic: 'أَيُّ الـجُمَلِ كَلَامٌ تَامٌّ؟',
            explanation: '"Zaidun Qa\'imun" (Zaid berdiri) adalah susunan isim mubtada dan khabar yang memberikan faedah sempurna.',
            points: 15,
            options: [
              { id: 'opt-n1-3a', optionText: 'Zaidun Qa\'imun (Zaid berdiri)', optionArabic: 'زَيْدٌ قَائِمٌ', isCorrect: true },
              { id: 'opt-n1-3b', optionText: 'In qama zaidun (Jika Zaid berdiri...)', optionArabic: 'إِنْ قَامَ زَيْدٌ', isCorrect: false },
              { id: 'opt-n1-3c', optionText: 'Ghulam (Anak laki-laki)', optionArabic: 'غُلَامٌ', isCorrect: false },
            ],
          },
        ],
      },
      'nahwu-lesson-2': {
        id: 'quiz-nahwu-2',
        lessonId: 'nahwu-lesson-2',
        title: 'Kuis Bab 1: Pembagian Kalam (Isim, Fi\'il, Harf)',
        description: 'Uji pemahaman perbedaan antara kata benda, kata kerja, dan kata hubung.',
        passingScore: 70,
        xpReward: 50,
        questions: [
          {
            id: 'q-n2-1',
            type: 'multiple_choice',
            questionText: 'Al-Kalam terbagi menjadi berapa bagian menurut Matan Al-Ajrumiyyah?',
            questionArabic: 'كَمْ أَقْسَامُ الكَلَامِ؟',
            explanation: 'Pembagian Kalam ada 3: Isim (اسم), Fi\'il (فعل), dan Harf (harf ja\'a lime\'nan).',
            points: 10,
            options: [
              { id: 'opt-n2-1a', optionText: '3 Bagian (Isim, Fi\'il, Harf)', optionArabic: 'ثَلَاثَةُ أَقْسَامٍ', isCorrect: true },
              { id: 'opt-n2-1b', optionText: '4 Bagian', optionArabic: 'أَرْبَعَةُ أَقْسَامٍ', isCorrect: false },
              { id: 'opt-n2-1c', optionText: '2 Bagian', optionArabic: 'قِسْمَانِ', isCorrect: false },
            ],
          },
          {
            id: 'q-n2-2',
            type: 'true_false',
            questionText: 'Apakah Isim (اِسْمٌ) adalah kata yang maknanya terikat dengan dimensi waktu?',
            questionArabic: 'هَلِ الاِسْمُ يَدُلُّ عَلَى زَمَنٍ؟',
            explanation: 'Salah. Kata yang terikat dimensi waktu adalah Fi\'il, sedangkan Isim tidak terikat waktu.',
            points: 10,
            options: [
              { id: 'opt-n2-2a', optionText: 'Benar (صَحِيْحٌ)', isCorrect: false },
              { id: 'opt-n2-2b', optionText: 'Salah (خَطَأٌ)', isCorrect: true },
            ],
          },
        ],
      },
      'nahwu-lesson-5': {
        id: 'quiz-nahwu-5',
        lessonId: 'nahwu-lesson-5',
        title: 'Kuis Bab 2: Pengenalan I\'rab & 4 Pembagiannya',
        description: 'Uji pemahaman jenis I\'rab Rafa\', Nashab, Jar, dan Jazm.',
        passingScore: 70,
        xpReward: 50,
        questions: [
          {
            id: 'q-n5-1',
            type: 'multiple_choice',
            questionText: 'Manakah jenis I\'rab yang BISA masuk pada Isim tetapi TIDAK BISA masuk pada Fi\'il?',
            questionArabic: 'مَا هُوَ الإِعْرَابُ الخَاصُّ بِالأَسْمَاءِ؟',
            explanation: 'Khafdh/Jar khusus untuk Isim dan tidak bisa masuk pada Fi\'il. Sebaliknya Jazm khusus untuk Fi\'il.',
            points: 10,
            options: [
              { id: 'opt-n5-1a', optionText: 'Khafdh / Jar (خَفْضٌ)', optionArabic: 'الخَفْضُ', isCorrect: true },
              { id: 'opt-n5-1b', optionText: 'Jazm (جَزْمٌ)', optionArabic: 'الجَزْمُ', isCorrect: false },
              { id: 'opt-n5-1c', optionText: 'Rafa\' (رَفْعٌ)', optionArabic: 'الرَّفْعُ', isCorrect: false },
            ],
          },
        ],
      },
      'shorof-lesson-1': {
        id: 'quiz-shorof-1',
        lessonId: 'shorof-lesson-1',
        title: 'Kuis Shorof Bab 1: Wazan Nasara - Yansuru',
        description: 'Uji pemahaman Tashrif Istilahi wazan Fa\'ala - Yaf\'ulu.',
        passingScore: 70,
        xpReward: 50,
        questions: [
          {
            id: 'q-s1-1',
            type: 'tashrif',
            questionText: 'Apakah bentuk Fi\'il Mudhari\' dari kata kerja نَصَرَ (Nasara)?',
            questionArabic: 'مَا هُوَ الفِعْلُ المُضَارِعُ مِنْ "نَصَرَ"؟',
            explanation: 'Fi\'il mudhari\' dari Nasara mengikuti wazan yaf\'ulu yaitu Yansuru (يَنْصُرُ).',
            points: 10,
            options: [
              { id: 'opt-s1-1a', optionText: 'Yansuru', optionArabic: 'يَنْصُرُ', isCorrect: true },
              { id: 'opt-s1-1b', optionText: 'Yansiru', optionArabic: 'يَنْصِرُ', isCorrect: false },
              { id: 'opt-s1-1c', optionText: 'Yansaru', optionArabic: 'يَنْصَرُ', isCorrect: false },
            ],
          },
        ],
      },
    };

    return QUIZ_DATABASE[lessonId] || {
      id: `quiz-mock-${lessonId}`,
      title: "Kuis Evaluasi Materi Matan Al-Ajrumiyyah",
      description: "Uji pemahaman kaidah tata bahasa Arab pada bab ini.",
      passingScore: 70,
      xpReward: 50,
      questions: [
        {
          id: `q-gen-${lessonId}-1`,
          type: "multiple_choice",
          questionText: "Berapakah jumlah pembagian utama Al-Kalam dalam Kitab Matan Al-Ajrumiyyah?",
          questionArabic: "كَمْ أَقْسَامُ الكَلَامِ فِي المَتْنِ؟",
          explanation: "Pembagian Kalam ada 3: Isim (اسم), Fi'il (فعل), dan Harf (حرف).",
          points: 10,
          options: [
            { id: "opt-g1-a", optionText: "3 Bagian (Isim, Fi'il, Harf)", optionArabic: "ثَلَاثَةُ أَقْسَامٍ", isCorrect: true },
            { id: "opt-g1-b", optionText: "4 Bagian", optionArabic: "أَرْبَعَةُ أَقْسَامٍ", isCorrect: false },
            { id: "opt-g1-c", optionText: "5 Bagian", optionArabic: "خَمْسَةُ أَقْسَامٍ", isCorrect: false },
          ],
        },
        {
          id: `q-gen-${lessonId}-2`,
          type: "true_false",
          questionText: "Apakah Isim (اِسْمٌ) dapat menerima harakat Tanwin dan diawali Alif-Lam (الـ)?",
          questionArabic: "هَلِ الإِسْمُ يَقْبَلُ التَّنْوِيْنَ وَالأَلِفَ وَاللاَّمَ؟",
          explanation: "Benar. Tanwin dan Alif-Lam adalah 2 tanda utama yang membedakan Isim dari Fi'il dan Harf.",
          points: 10,
          options: [
            { id: "opt-g2-a", optionText: "Benar (صَحِيْحٌ)", isCorrect: true },
            { id: "opt-g2-b", optionText: "Salah (خَطَأٌ)", isCorrect: false },
          ],
        },
        {
          id: `q-gen-${lessonId}-3`,
          type: "irab",
          questionText: "Manakah harakat I'rab utama bagi kata yang berkedudukan sebagai Fa'il (Pelaku)?",
          questionArabic: "مَا هُوَ إِعْرَابُ الفَاعِلِ؟",
          explanation: "Fa'il adalah Isim Marfu' yang diawali oleh kata kerja (Fi'il).",
          points: 15,
          options: [
            { id: "opt-g3-a", optionText: "Marfu' (مَرْفُوْعٌ)", isCorrect: true },
            { id: "opt-g3-b", optionText: "Manshub (مَنْصُوْبٌ)", isCorrect: false },
            { id: "opt-g3-c", optionText: "Majrur / Makshfud (مَخْفُوْضٌ)", isCorrect: false },
          ],
        },
      ],
    };
  }
}
