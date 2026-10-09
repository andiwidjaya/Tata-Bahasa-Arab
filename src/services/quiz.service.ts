import { createClient } from "@/lib/supabase/server";
import { Quiz, Question } from "@/types/quiz-engine";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export class QuizService {
  /**
   * Fetch complete Quiz by ID or Lesson ID from Supabase or generate a randomized 15-question set
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
        return this.getRandomizedAjrumiyyahQuiz(lessonId, 15);
      }

      // Fetch quiz questions
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: quizQuestions } = await (supabase.from("quiz_questions") as any)
        .select("question_id, order_index, questions(*, question_options(*))")
        .eq("quiz_id", quizData.id)
        .order("order_index", { ascending: true });

      if (!quizQuestions || quizQuestions.length === 0) {
        return this.getRandomizedAjrumiyyahQuiz(lessonId, 15);
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
          options: shuffleArray((q.question_options || []).map((opt: any) => ({
            id: opt.id,
            optionText: opt.option_text,
            optionArabic: opt.option_arabic,
            isCorrect: opt.is_correct,
          }))),
        };
      });

      return {
        id: quizData.id,
        lessonId: quizData.lesson_id,
        title: quizData.title,
        description: quizData.description,
        passingScore: quizData.passing_score,
        xpReward: quizData.xp_reward,
        questions: shuffleArray(questions).slice(0, 15),
      };
    } catch (err) {
      console.error("getQuizByLessonId error:", err);
      return this.getRandomizedAjrumiyyahQuiz(lessonId, 15);
    }
  }

  /**
   * Generates a varied, randomized 15-question quiz from Matan Al-Ajrumiyyah question bank
   */
  static getRandomizedAjrumiyyahQuiz(lessonId: string, count: number = 15): Quiz {
    const MASTER_QUESTION_BANK: Question[] = [
      {
        id: 'q-aj1',
        type: 'multiple_choice',
        questionText: 'Manakah susunan definisi Al-Kalam yang benar menurut Matan Al-Ajrumiyyah?',
        questionArabic: 'مَا هُوَ تَعْرِيفُ الكَلَامِ فِي المَتْنِ؟',
        explanation: 'Syaikh Ash-Shanhaji menyatakan: "Al-Kalamu huwal lafdzhul murakkabul mufidu bil-wadh\'i".',
        points: 10,
        options: [
          { id: 'opt-aj1-a', optionText: 'Lafadz tersusun yang memberikan faedah sempurna dengan bahasa Arab', optionArabic: 'اَللَّفْظُ الْمُرَكَّبُ الْمُفِيدُ بِالْوَضْعِ', isCorrect: true },
          { id: 'opt-aj1-b', optionText: 'Setiap kata tunggal yang mempunyai arti', optionArabic: 'اَللَّفْظُ الْمُفْرَدُ', isCorrect: false },
          { id: 'opt-aj1-c', optionText: 'Suara yang tidak mengandung arti hijaiyyah', optionArabic: 'اَللَّفْظُ غَيْرُ الْمُفِيدِ', isCorrect: false },
          { id: 'opt-aj1-d', optionText: 'Setiap tulisan di dalam kitab bahasa Arab', optionArabic: 'اَلْكِتَابَةُ المَجْرُورَةُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj2',
        type: 'multiple_choice',
        questionText: 'Berapa jumlah pembagian Al-Kalam dalam Kitab Matan Al-Ajrumiyyah?',
        questionArabic: 'كَمْ أَقْسَامُ الكَلَامِ؟',
        explanation: 'Kalam terbagi 3: Isim (اسم), Fi\'il (فعل), dan Harf (حرف).',
        points: 10,
        options: [
          { id: 'opt-aj2-a', optionText: '3 Bagian (Isim, Fi\'il, Harf)', optionArabic: 'ثَلَاثَةُ أَقْسَامٍ', isCorrect: true },
          { id: 'opt-aj2-b', optionText: '4 Bagian', optionArabic: 'أَرْبَعَةُ أَقْسَامٍ', isCorrect: false },
          { id: 'opt-aj2-c', optionText: '2 Bagian', optionArabic: 'قِسْمَانِ', isCorrect: false },
          { id: 'opt-aj2-d', optionText: '5 Bagian', optionArabic: 'خَمْسَةُ أَقْسَامٍ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj3',
        type: 'true_false',
        questionText: 'Apakah kalimat yang tersusun namun belum mufid (belum memberikan faedah sempurna) dapat disebut Al-Kalam?',
        questionArabic: 'هَلِ الـمُرَكَّبُ غَيْرُ الـمُفِيدِ يُسَمَّى كَلَامًا؟',
        explanation: 'Salah. Syarat mutlak Al-Kalam harus Mufid (memberikan pemahaman sempurna).',
        points: 10,
        options: [
          { id: 'opt-aj3-a', optionText: 'Benar (صَحِيْحٌ)', isCorrect: false },
          { id: 'opt-aj3-b', optionText: 'Salah (خَطَأٌ)', isCorrect: true },
        ],
      },
      {
        id: 'q-aj4',
        type: 'multiple_choice',
        questionText: 'Manakah yang BUKAN merupakan tanda-tanda khusus Isim?',
        questionArabic: 'أَيُّ هَذِهِ لَيْسَتْ مِنْ عَلَامَاتِ الإِسْمِ؟',
        explanation: 'Qad (قَدْ) adalah tanda khusus Fi\'il, bukan tanda Isim.',
        points: 10,
        options: [
          { id: 'opt-aj4-a', optionText: 'Kemasukan huruf Qad (قَدْ)', optionArabic: 'دُخُولُ قَدْ', isCorrect: true },
          { id: 'opt-aj4-b', optionText: 'Menerima Tanwin', optionArabic: 'التَّنْوِينُ', isCorrect: false },
          { id: 'opt-aj4-c', optionText: 'Kemasukan Alif-Lam (الـ)', optionArabic: 'دُخُولُ الأَلِفِ وَاللاَّمِ', isCorrect: false },
          { id: 'opt-aj4-d', optionText: 'Khafdh / Jar', optionArabic: 'الخَفْضُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj5',
        type: 'multiple_choice',
        questionText: 'Berikut ini yang merupakan huruf-huruf Qasam (Sumpah) adalah...',
        questionArabic: 'مَا هِيَ حُرُوفُ القَسَمِ؟',
        explanation: 'Huruf Qasam ada 3: Al-Waw (و), Al-Ba (ب), dan At-Ta (ت).',
        points: 10,
        options: [
          { id: 'opt-aj5-a', optionText: 'Waw, Ba, dan Ta', optionArabic: 'الوَاوُ، وَالبَاءُ، وَالتَّاءُ', isCorrect: true },
          { id: 'opt-aj5-b', optionText: 'Min, Ila, dan \'An', optionArabic: 'مِنْ، وَإِلَى، وَعَنْ', isCorrect: false },
          { id: 'opt-aj5-c', optionText: 'Fi, Rubba, dan Lam', optionArabic: 'فِي، وَرُبَّ، وَاللَّامُ', isCorrect: false },
          { id: 'opt-aj5-d', optionText: 'An, Lan, dan Kai', optionArabic: 'أَنْ، وَلَنْ، وَكَيْ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj6',
        type: 'multiple_choice',
        questionText: 'Manakah tanda khusus yang membedakan Fi\'il dari Isim dan Harf?',
        questionArabic: 'مَا هِيَ عَلَامَاتُ الفِعْلِ؟',
        explanation: 'Tanda Fi\'il: Qad, As-Sin, Saufa, dan Ta\' Ta\'nits As-Sakinah (تْ).',
        points: 10,
        options: [
          { id: 'opt-aj6-a', optionText: 'Qad, Sin, Saufa, dan Ta\' Ta\'nits Sakinah', optionArabic: 'قَدْ، وَالسِّينُ، وَسَوْفَ، وَتَاءُ التَّأْنِيثِ السَّاكِنَةُ', isCorrect: true },
          { id: 'opt-aj6-b', optionText: 'Tanwin dan Alif-Lam', optionArabic: 'التَّنْوِينُ وَالأَلِفُ وَاللاَّمُ', isCorrect: false },
          { id: 'opt-aj6-c', optionText: 'Khafdh dan Huruf Jar', optionArabic: 'الخَفْضُ وَحُرُوفُ الجَرِّ', isCorrect: false },
          { id: 'opt-aj6-d', optionText: 'Idhafah dan Na\'at', optionArabic: 'الإِضَافَةُ وَالنَّعْتُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj7',
        type: 'multiple_choice',
        questionText: 'Apa definisi I\'rab menurut Matan Al-Ajrumiyyah?',
        questionArabic: 'مَا هُوَ تَعْرِيفُ الإِعْرَابِ؟',
        explanation: 'I\'rab adalah perubahan akhir kalimat karena perbedaan amil yang masuk padanya, baik lafadz maupun taqdir.',
        points: 10,
        options: [
          { id: 'opt-aj7-a', optionText: 'Perubahan akhir kalimat karena perbedaan amil yang masuk padanya', optionArabic: 'تَغْيِيرُ أَوَاخِرِ الْكَلِمِ لِاخْتِلَافِ الْعَوَامِلِ الدَّاخِلَةِ عَلَيْهَا', isCorrect: true },
          { id: 'opt-aj7-b', optionText: 'Tetapnya harakat akhir kata dalam setiap keadaan', optionArabic: 'ثَبَاتُ أَوَاخِرِ الكَلِمِ', isCorrect: false },
          { id: 'opt-aj7-c', optionText: 'Perubahan makna kata tanpa perubahan harakat', optionArabic: 'تَغْيِيرُ الـمَعْنَى فَقَطْ', isCorrect: false },
          { id: 'opt-aj7-d', optionText: 'Penambahan huruf di awal kata kerja', optionArabic: 'زِيَادَةُ الحُرُوفِ فِي الأَوَّلِ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj8',
        type: 'multiple_choice',
        questionText: 'Jenis I\'rab manakah yang KHUSUS untuk Isim dan TIDAK BISA masuk pada Fi\'il?',
        questionArabic: 'مَا هُوَ الإِعْرَابُ الخَاصُّ بِالأَسْمَاءِ؟',
        explanation: 'Khafdh/Jar khusus untuk Isim. Sebaliknya, Jazm khusus untuk Fi\'il.',
        points: 10,
        options: [
          { id: 'opt-aj8-a', optionText: 'Khafdh / Jar (خَفْضٌ)', optionArabic: 'الخَفْضُ', isCorrect: true },
          { id: 'opt-aj8-b', optionText: 'Jazm (جَزْمٌ)', optionArabic: 'الجَزْمُ', isCorrect: false },
          { id: 'opt-aj8-c', optionText: 'Rafa\' (رَفْعٌ)', optionArabic: 'الرَّفْعُ', isCorrect: false },
          { id: 'opt-aj8-d', optionText: 'Nashab (نَصْبٌ)', optionArabic: 'النَّصْبُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj9',
        type: 'multiple_choice',
        questionText: 'Jenis I\'rab manakah yang KHUSUS untuk Fi\'il dan TIDAK BISA masuk pada Isim?',
        questionArabic: 'مَا هُوَ الإِعْرَابُ الخَاصُّ بِالأَفْعَالِ؟',
        explanation: 'Jazm khusus untuk Fi\'il dan tidak pernah terjadi pada Isim.',
        points: 10,
        options: [
          { id: 'opt-aj9-a', optionText: 'Jazm (جَزْمٌ)', optionArabic: 'الجَزْمُ', isCorrect: true },
          { id: 'opt-aj9-b', optionText: 'Khafdh / Jar (خَفْضٌ)', optionArabic: 'الخَفْضُ', isCorrect: false },
          { id: 'opt-aj9-c', optionText: 'Rafa\' (رَفْعٌ)', optionArabic: 'الرَّفْعُ', isCorrect: false },
          { id: 'opt-aj9-d', optionText: 'Nashab (نَصْبٌ)', optionArabic: 'النَّصْبُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj10',
        type: 'multiple_choice',
        questionText: 'Apa tanda Utama (Asli) bagi keadaan Rafa\'?',
        questionArabic: 'مَا هِيَ العَلَامَةُ الأَصْلِيَّةُ لِلرَّفْعِ؟',
        explanation: 'Dhammah (الضَّمَّةُ) adalah tanda utama Rafa\'. Waw, Alif, dan Nun adalah tanda pengganti (niyabah).',
        points: 10,
        options: [
          { id: 'opt-aj10-a', optionText: 'Dhammah (الضَّمَّةُ)', optionArabic: 'الضَّمَّةُ', isCorrect: true },
          { id: 'opt-aj10-b', optionText: 'Waw (الوَاوُ)', optionArabic: 'الوَاوُ', isCorrect: false },
          { id: 'opt-aj10-c', optionText: 'Alif (الأَلِفُ)', optionArabic: 'الأَلِفُ', isCorrect: false },
          { id: 'opt-aj10-d', optionText: 'Nun (النُّونُ)', optionArabic: 'النُّونُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj11',
        type: 'multiple_choice',
        questionText: 'Waw (الوَاو) menjadi tanda Rafa\' pada dua tempat, yaitu...',
        questionArabic: 'مَتَى تَكُونُ الوَاوُ عَلَامَةً لِلرَّفْعِ؟',
        explanation: 'Waw menjadi tanda Rafa\' pada Jama\' Mudzakkar Salim dan Asma\'ul Khamsah.',
        points: 10,
        options: [
          { id: 'opt-aj11-a', optionText: 'Jama\' Mudzakkar Salim dan Asma\'ul Khamsah', optionArabic: 'جَمْعُ المُذَكَّرِ السَّالِمُ وَالأَسْمَاءُ الخَمْسَةُ', isCorrect: true },
          { id: 'opt-aj11-b', optionText: 'Isim Mufrad dan Jama\' Taksir', optionArabic: 'الاِسْمُ الـمُفْرَدُ وَجَمْعُ التَّكْسِيرِ', isCorrect: false },
          { id: 'opt-aj11-c', optionText: 'Isim Tatsniyah dan Af\'alul Khamsah', optionArabic: 'التَّثْنِيَةُ وَالأَفْعَالُ الخَمْسَةُ', isCorrect: false },
          { id: 'opt-aj11-d', optionText: 'Jama\' Muannats Salim dan Fi\'il Mudhari\'', optionArabic: 'جَمْعُ الـمُؤَنَّثِ السَّالِمُ وَالفِعْلُ الـمُضَارِعُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj12',
        type: 'multiple_choice',
        questionText: 'Manakah yang TERMASUK dalam Asma\'ul Khamsah (Isim-Isim Yang Lima)?',
        questionArabic: 'مَا هِيَ الأَسْمَاءُ الخَمْسَةُ؟',
        explanation: 'Asma\'ul Khamsah: Abuka, Akhuka, Hamuka, Fuka, Dzu Malin.',
        points: 10,
        options: [
          { id: 'opt-aj12-a', optionText: 'Abuka, Akhuka, Hamuka, Fuka, Dzu malin', optionArabic: 'أَبُوكَ، وَأَخُوكَ، وَحَمُوكَ، وَفُوكَ، وَذُو مَالٍ', isCorrect: true },
          { id: 'opt-aj12-b', optionText: 'Kataba, Yaktubu, Uktub, Katibun, Maktubun', optionArabic: 'كَتَبَ، وَيَكْتُبُ، وَاكْتُبْ', isCorrect: false },
          { id: 'opt-aj12-c', optionText: 'Zaidun, \'Amrun, Bakrun, Khalidun, Umar', optionArabic: 'زَيْدٌ، وَعَمْرٌو، وَبَكْرٌ', isCorrect: false },
          { id: 'opt-aj12-d', optionText: 'Huwa, Huma, Hum, Hiya, Huma', optionArabic: 'هُوَ، وَهُمَا، وَهُمْ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj13',
        type: 'multiple_choice',
        questionText: 'Alif (الأَلِف) menjadi tanda Rafa\' khusus pada...',
        questionArabic: 'مَتَى تَكُونُ الأَلِفُ عَلَامَةً لِلرَّفْعِ؟',
        explanation: 'Alif menjadi tanda Rafa\' khusus pada Isim Tatsniyah (Mutsanna).',
        points: 10,
        options: [
          { id: 'opt-aj13-a', optionText: 'Isim Tatsniyah (Mutsanna)', optionArabic: 'تَثْنِيَةُ الأَسْمَاءِ خَاصَّةً', isCorrect: true },
          { id: 'opt-aj13-b', optionText: 'Jama\' Mudzakkar Salim', optionArabic: 'جَمْعُ الـمُذَكَّرِ السَّالِمُ', isCorrect: false },
          { id: 'opt-aj13-c', optionText: 'Asma\'ul Khamsah', optionArabic: 'الأَسْمَاءُ الخَمْسَةُ', isCorrect: false },
          { id: 'opt-aj13-d', optionText: 'Jama\' Taksir', optionArabic: 'جَمْعُ التَّكْسِيرِ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj14',
        type: 'multiple_choice',
        questionText: 'Kasrah (الْكَسْرَةُ) menjadi tanda Nashab khusus pada...',
        questionArabic: 'مَتَى تَكُونُ الكَسْرَةُ عَلَامَةً لِلنَّصْبِ؟',
        explanation: 'Kasrah menjadi tanda Nashab khusus pada Jama\' Muannats Salim (contoh: رَأَيْتُ الْمُسْلِمَاتِ).',
        points: 10,
        options: [
          { id: 'opt-aj14-a', optionText: 'Jama\' Muannats Salim', optionArabic: 'جَمْعُ الـمُؤَنَّثِ السَّالِمُ', isCorrect: true },
          { id: 'opt-aj14-b', optionText: 'Isim Mufrad', optionArabic: 'الاِسْمُ الـمُفْرَدُ', isCorrect: false },
          { id: 'opt-aj14-c', optionText: 'Jama\' Mudzakkar Salim', optionArabic: 'جَمْعُ الـمُذَكَّرِ السَّالِمُ', isCorrect: false },
          { id: 'opt-aj14-d', optionText: 'Asma\'ul Khamsah', optionArabic: 'الأَسْمَاءُ الخَمْسَةُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj15',
        type: 'multiple_choice',
        questionText: 'Fathah (الْفَتْحَةُ) menjadi tanda Khafdh/Jar khusus pada...',
        questionArabic: 'مَتَى تَكُونُ الفَتْحَةُ عَلَامَةً لِلخَفْضِ؟',
        explanation: 'Fathah menjadi tanda Khafdh/Jar pada Isim Ghairu Munsharif (Isim yang tidak menerima tanwin).',
        points: 10,
        options: [
          { id: 'opt-aj15-a', optionText: 'Isim yang tidak menerima tanwin (Ghairu Munsharif)', optionArabic: 'الاِسْمُ الَّذِي لَا يَنْصَرِفُ', isCorrect: true },
          { id: 'opt-aj15-b', optionText: 'Isim Mufrad Munsharif', optionArabic: 'الاِسْمُ الـمُفْرَدُ الـمُنْصَرِفُ', isCorrect: false },
          { id: 'opt-aj15-c', optionText: 'Jama\' Muannats Salim', optionArabic: 'جَمْعُ الـمُؤَنَّثِ السَّالِمُ', isCorrect: false },
          { id: 'opt-aj15-d', optionText: 'Asma\'ul Khamsah', optionArabic: 'الأَسْمَاءُ الخَمْسَةُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj16',
        type: 'multiple_choice',
        questionText: 'Berapakah jumlah Amil Nashab yang menashabkan Fi\'il Mudhari\'?',
        questionArabic: 'كَمْ عَدَدُ نَوَاصِبِ الـمُضَارِعِ؟',
        explanation: 'Amil Nashab ada 10: An, Lan, Idzan, Kai, Lam Kai, Lam Juhud, Hatta, Jawab bil Fa, Waw, Au.',
        points: 10,
        options: [
          { id: 'opt-aj16-a', optionText: '10 Huruf', optionArabic: 'عَشَرَةُ حُرُوفٍ', isCorrect: true },
          { id: 'opt-aj16-b', optionText: '18 Huruf', optionArabic: 'ثَمَانِيَةَ عَشَرَ', isCorrect: false },
          { id: 'opt-aj16-c', optionText: '5 Huruf', optionArabic: 'خَمْسَةُ حُرُوفٍ', isCorrect: false },
          { id: 'opt-aj16-d', optionText: '12 Huruf', optionArabic: 'اثْنَا عَشَرَ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj17',
        type: 'multiple_choice',
        questionText: 'Berapakah jumlah Amil Jazm yang menjazmkan Fi\'il Mudhari\'?',
        questionArabic: 'كَمْ عَدَدُ جَوَازِمِ الـمُضَارِعِ؟',
        explanation: 'Amil Jazm ada 18 yang terbagi menjazmkan 1 fi\'il atau 2 fi\'il (syarat & jawab).',
        points: 10,
        options: [
          { id: 'opt-aj17-a', optionText: '18 Huruf / Kata', optionArabic: 'ثَمَانِيَةَ عَشَرَ', isCorrect: true },
          { id: 'opt-aj17-b', optionText: '10 Huruf', optionArabic: 'عَشَرَةُ حُرُوفٍ', isCorrect: false },
          { id: 'opt-aj17-c', optionText: '7 Huruf', optionArabic: 'سَبْعَةُ حُرُوفٍ', isCorrect: false },
          { id: 'opt-aj17-d', optionText: '15 Huruf', optionArabic: 'خَمْسَةَ عَشَرَ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj18',
        type: 'irab',
        questionText: 'Tentukan I\'rab kata "Zaidun" pada kalimat (جَاءَ زَيْدٌ)!',
        questionArabic: 'مَا هُوَ إِعْرَابُ "زَيْدٌ" فِي جُمْلَةِ (جَاءَ زَيْدٌ)؟',
        explanation: 'Zaidun berkedudukan sebagai Fa\'il (Pelaku) sehingga Marfu\' dengan tanda Dhammah.',
        points: 15,
        options: [
          { id: 'opt-aj18-a', optionText: 'Fa\'il Marfu\' dengan Dhammah', optionArabic: 'فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ', isCorrect: true },
          { id: 'opt-aj18-b', optionText: 'Maf\'ul Bih Manshub dengan Fathah', optionArabic: 'مَفْعُولٌ بِهِ مَنْصُوبٌ بِالْفَتْحَةِ', isCorrect: false },
          { id: 'opt-aj18-c', optionText: 'Mubtada\' Marfu\' dengan Dhammah', optionArabic: 'مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ', isCorrect: false },
          { id: 'opt-aj18-d', optionText: 'Isim Majrur dengan Kasrah', optionArabic: 'اِسْمٌ مَجْرُورٌ بِالْكَسْرَةِ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj19',
        type: 'irab',
        questionText: 'Tentukan I\'rab kata "Zaidan" pada kalimat (رَأَيْتُ زَيْدًا)!',
        questionArabic: 'مَا هُوَ إِعْرَابُ "زَيْدًا" فِي جُمْلَةِ (رَأَيْتُ زَيْدًا)؟',
        explanation: 'Zaidan berkedudukan sebagai Maf\'ul Bih (Objek) sehingga Manshub dengan tanda Fathah.',
        points: 15,
        options: [
          { id: 'opt-aj19-a', optionText: 'Maf\'ul Bih Manshub dengan Fathah', optionArabic: 'مَفْعُولٌ بِهِ مَنْصُوبٌ بِالْفَتْحَةِ', isCorrect: true },
          { id: 'opt-aj19-b', optionText: 'Fa\'il Marfu\' dengan Dhammah', optionArabic: 'فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ', isCorrect: false },
          { id: 'opt-aj19-c', optionText: 'Khabar Kaana Manshub', optionArabic: 'خَبَرُ كَانَ مَنْصُوبٌ', isCorrect: false },
          { id: 'opt-aj19-d', optionText: 'Hal Manshub', optionArabic: 'حَالٌ مَنْصُوبٌ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj20',
        type: 'multiple_choice',
        questionText: 'Tugas kaidah I\'rab dari Kaana dan saudara-saudaranya (كَانَ وَأَخَوَاتُهَا) adalah...',
        questionArabic: 'مَا هُوَ عَمَلُ كَانَ وَأَخَوَاتِهَا؟',
        explanation: 'Kaana merafa\'kan Mubtada\' (Isim Kaana) dan menashabkan Khabar (Khabar Kaana).',
        points: 10,
        options: [
          { id: 'opt-aj20-a', optionText: 'Merafa\'kan Isim dan Menashabkan Khabar', optionArabic: 'تَرْفَعُ الاِسْمَ وَتَنْصِبُ الخَبَرَ', isCorrect: true },
          { id: 'opt-aj20-b', optionText: 'Menashabkan Isim dan Merafa\'kan Khabar', optionArabic: 'تَنْصِبُ الاِسْمَ وَتَرْفَعُ الخَبَرَ', isCorrect: false },
          { id: 'opt-aj20-c', optionText: 'Menashabkan Isim dan Khabar sekaligus', optionArabic: 'تَنْصِبُ المَبْتَدَأَ وَالخَبَرَ', isCorrect: false },
          { id: 'opt-aj20-d', optionText: 'Merafa\'kan Isim dan Khabar sekaligus', optionArabic: 'تَرْفَعُ الـمُبْتَدَأَ وَالخَبَرَ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj21',
        type: 'multiple_choice',
        questionText: 'Tugas kaidah I\'rab dari Inna dan saudara-saudaranya (إِنَّ وَأَخَوَاتُهَا) adalah...',
        questionArabic: 'مَا هُوَ عَمَلُ إِنَّ وَأَخَوَاتِهَا؟',
        explanation: 'Inna menashabkan Isim (Isim Inna) dan merafa\'kan Khabar (Khabar Inna).',
        points: 10,
        options: [
          { id: 'opt-aj21-a', optionText: 'Menashabkan Isim dan Merafa\'kan Khabar', optionArabic: 'تَنْصِبُ الاِسْمَ وَتَرْفَعُ الخَبَرَ', isCorrect: true },
          { id: 'opt-aj21-b', optionText: 'Merafa\'kan Isim dan Menashabkan Khabar', optionArabic: 'تَرْفَعُ الاِسْمَ وَتَنْصِبُ الخَبَرَ', isCorrect: false },
          { id: 'opt-aj21-c', optionText: 'Menashabkan Isim dan Khabar sekaligus', optionArabic: 'تَنْصِبُ المَبْتَدَأَ وَالخَبَرَ', isCorrect: false },
          { id: 'opt-aj21-d', optionText: 'Menjarkan Isim dan Khabar', optionArabic: 'تَخْفِضُ الاِسْمَ وَالخَبَرَ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj22',
        type: 'multiple_choice',
        questionText: 'Manakah yang BUKAN merupakan salah satu dari 5 jenis Isim Ma\'rifat?',
        questionArabic: 'أَيُّ هَذِهِ لَيْسَتْ مِنْ أَنْوَاعِ الـمَعْرِفَةِ الخَمْسَةِ؟',
        explanation: 'Isim Nakirah adalah kebalikan dari Ma\'rifat.',
        points: 10,
        options: [
          { id: 'opt-aj22-a', optionText: 'Isim Nakirah umum', optionArabic: 'الاِسْمُ النَّكِرَةُ', isCorrect: true },
          { id: 'opt-aj22-b', optionText: 'Isim Dhamir (Kata Ganti)', optionArabic: 'اِسْمُ الضَّمِيرِ', isCorrect: false },
          { id: 'opt-aj22-c', optionText: 'Isim Alam (Nama Orang/Tempat)', optionArabic: 'اِسْمُ العَلَمِ', isCorrect: false },
          { id: 'opt-aj22-d', optionText: 'Isim yang diawali Alif-Lam (الـ)', optionArabic: 'الاِسْمُ فِيهِ الأَلِفُ وَاللاَّمُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj23',
        type: 'multiple_choice',
        questionText: 'Berapakah jumlah huruf \'Athaf (kata sambung) dalam Matan Al-Ajrumiyyah?',
        questionArabic: 'كَمْ عَدَدُ حُرُوفِ العَطْفِ؟',
        explanation: 'Huruf \'Athaf ada 10: Waw, Fa, Tsumma, Aw, Am, Imma, Bal, La, Laakin, Hatta.',
        points: 10,
        options: [
          { id: 'opt-aj23-a', optionText: '10 Huruf', optionArabic: 'عَشَرَةُ حُرُوفٍ', isCorrect: true },
          { id: 'opt-aj23-b', optionText: '5 Huruf', optionArabic: 'خَمْسَةُ حُرُوفٍ', isCorrect: false },
          { id: 'opt-aj23-c', optionText: '7 Huruf', optionArabic: 'سَبْعَةُ حُرُوفٍ', isCorrect: false },
          { id: 'opt-aj23-d', optionText: '12 Huruf', optionArabic: 'اثْنَا عَشَرَ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj24',
        type: 'multiple_choice',
        questionText: 'Manakah yang merupakan definisi dari Hal (الحَالُ)?',
        questionArabic: 'مَا هُوَ تَعْرِيفُ الحَالِ؟',
        explanation: 'Hal adalah Isim Manshub penjelas tata cara/keadaan yang sebelumnya samar.',
        points: 10,
        options: [
          { id: 'opt-aj24-a', optionText: 'Isim Manshub penjelas tata cara/keadaan yang samar', optionArabic: 'اَلْمَنْصُوبُ الْمُفَسِّرُ لِمَا انْبَهَمَ مِنَ الْهَيْئَاتِ', isCorrect: true },
          { id: 'opt-aj24-b', optionText: 'Isim Manshub penjelas dzat/benda yang samar', optionArabic: 'اَلْمَنْصُوبُ الْمُفَسِّرُ لِمَا انْبَهَمَ مِنَ الذَّوَاتِ', isCorrect: false },
          { id: 'opt-aj24-c', optionText: 'Isim Marfu\' penjelas sebab perbuatan', optionArabic: 'المَرْفُوعُ لِبَيَانِ السَّبَبِ', isCorrect: false },
          { id: 'opt-aj24-d', optionText: 'Isim Majrur setelah Huruf Jar', optionArabic: 'المَجْرُورُ بَعْدَ الجَرِّ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj25',
        type: 'multiple_choice',
        questionText: 'Manakah yang merupakan definisi dari Tamyiz (التَّمْيِيزُ)?',
        questionArabic: 'مَا هُوَ تَعْرِيفُ التَّمْيِيزِ؟',
        explanation: 'Tamyiz adalah Isim Manshub penjelas dzat/benda yang sebelumnya samar.',
        points: 10,
        options: [
          { id: 'opt-aj25-a', optionText: 'Isim Manshub penjelas dzat/benda yang samar', optionArabic: 'اَلْمَنْصُوبُ الْمُفَسِّرُ لِمَا انْبَهَمَ مِنَ الذَّوَاتِ', isCorrect: true },
          { id: 'opt-aj25-b', optionText: 'Isim Manshub penjelas tata cara/keadaan yang samar', optionArabic: 'اَلْمَنْصُوبُ الْمُفَسِّرُ لِمَا انْبَهَمَ مِنَ الْهَيْئَاتِ', isCorrect: false },
          { id: 'opt-aj25-c', optionText: 'Isim Marfu\' yang bebas dari amil lafadz', optionArabic: 'المَرْفُوعُ العَارِي عَنِ العَوَامِلِ', isCorrect: false },
          { id: 'opt-aj25-d', optionText: 'Isim Majrur karena Idhafah', optionArabic: 'المَجْرُورُ بِالإِضَافَةِ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj26',
        type: 'multiple_choice',
        questionText: 'Bagaimanakah hukum I\'rab Mustatsna dengan ILLAA pada kalimat Kalam Taam Mujab (Positif Sempurna)?',
        questionArabic: 'مَا هُوَ حُكْمُ الـمُسْتَثْنَى فِي الكَلَامِ التَّامِّ الـمُوجَبِ؟',
        explanation: 'Pada Kalam Taam Mujab (seperti قَامَ الْقَوْمُ إِلَّا زَيْدًا), Mustatsna Wajib Manshub.',
        points: 10,
        options: [
          { id: 'opt-aj26-a', optionText: 'Wajib Manshub', optionArabic: 'وَاجِبُ النَّصْبِ', isCorrect: true },
          { id: 'opt-aj26-b', optionText: 'Wajib Marfu\'', optionArabic: 'وَاجِبُ الرَّفْعِ', isCorrect: false },
          { id: 'opt-aj26-c', optionText: 'Wajib Majrur', optionArabic: 'وَاجِبُ الجَرِّ', isCorrect: false },
          { id: 'opt-aj26-d', optionText: 'Mabni Sukun', optionArabic: 'مَبْنِيٌّ عَلَى السُّكُونِ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj27',
        type: 'multiple_choice',
        questionText: 'Bagaimanakah hukum I\'rab Munada Mudhaf (contoh: يَا عَبْدَ اللهِ)?',
        questionArabic: 'مَا هُوَ حُكْمُ الـمُنَادَى الـمُضَافِ؟',
        explanation: 'Munada Mudhaf hukumnya Wajib Manshub (contoh: Ya \'Abdallahi).',
        points: 10,
        options: [
          { id: 'opt-aj27-a', optionText: 'Wajib Manshub dengan Fathah', optionArabic: 'مَنْصُوبٌ بِالْفَتْحَةِ', isCorrect: true },
          { id: 'opt-aj27-b', optionText: 'Mabni Dhammah', optionArabic: 'مَبْنِيٌّ عَلَى الضَّمِّ', isCorrect: false },
          { id: 'opt-aj27-c', optionText: 'Majrur Kasrah', optionArabic: 'مَجْرُورٌ بِالْكَسْرَةِ', isCorrect: false },
          { id: 'opt-aj27-d', optionText: 'Mabni Sukun', optionArabic: 'مَبْنِيٌّ عَلَى السُّكُونِ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj28',
        type: 'tashrif',
        questionText: 'Apakah bentuk Fi\'il Mudhari\' dari kata kerja (نَصَرَ) pada Bab 1 Shorof?',
        questionArabic: 'مَا هُوَ الفِعْلُ المُضَارِعُ مِنْ "نَصَرَ"؟',
        explanation: 'Nasara - Yansuru (نَصَرَ - يَنْصُرُ) mengikut wazan fa\'ala - yaf\'ulu.',
        points: 10,
        options: [
          { id: 'opt-aj28-a', optionText: 'Yansuru', optionArabic: 'يَنْصُرُ', isCorrect: true },
          { id: 'opt-aj28-b', optionText: 'Yansiru', optionArabic: 'يَنْصِرُ', isCorrect: false },
          { id: 'opt-aj28-c', optionText: 'Yansaru', optionArabic: 'يَنْصَرُ', isCorrect: false },
          { id: 'opt-aj28-d', optionText: 'Nansuru', optionArabic: 'نَنْصُرُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj29',
        type: 'tashrif',
        questionText: 'Apakah bentuk Fi\'il Mudhari\' dari kata kerja (ضَرَبَ) pada Bab 2 Shorof?',
        questionArabic: 'مَا هُوَ الفِعْلُ المُضَارِعُ مِنْ "ضَرَبَ"؟',
        explanation: 'Daraba - Yadribu (ضَرَبَ - يَضْرِبُ) mengikut wazan fa\'ala - yaf\'ilu.',
        points: 10,
        options: [
          { id: 'opt-aj29-a', optionText: 'Yadribu', optionArabic: 'يَضْرِبُ', isCorrect: true },
          { id: 'opt-aj29-b', optionText: 'Yadrubu', optionArabic: 'يَضْرُبُ', isCorrect: false },
          { id: 'opt-aj29-c', optionText: 'Yadrabu', optionArabic: 'يَضْرَبُ', isCorrect: false },
          { id: 'opt-aj29-d', optionText: 'Tadribu', optionArabic: 'تَضْرِبُ', isCorrect: false },
        ],
      },
      {
        id: 'q-aj30',
        type: 'tashrif',
        questionText: 'Apakah bentuk Fi\'il Amr (Kata Perintah) dari kata kerja (فَتَحَ)?',
        questionArabic: 'مَا هُوَ فِعْلُ الأَمْرِ مِنْ "فَتَحَ"؟',
        explanation: 'Fataha - Yaftahu - Iftah (اِفْتَحْ).',
        points: 10,
        options: [
          { id: 'opt-aj30-a', optionText: 'Iftah', optionArabic: 'اِفْتَحْ', isCorrect: true },
          { id: 'opt-aj30-b', optionText: 'Uftuh', optionArabic: 'اُفْتُحْ', isCorrect: false },
          { id: 'opt-aj30-c', optionText: 'Iftih', optionArabic: 'اِفْتِحْ', isCorrect: false },
          { id: 'opt-aj30-d', optionText: 'Fataha', optionArabic: 'فَتَحَ', isCorrect: false },
        ],
      },
    ];

    // Shuffle the master question bank and pick the requested count (default 15)
    const selectedQuestions = shuffleArray(MASTER_QUESTION_BANK).slice(0, Math.min(count, MASTER_QUESTION_BANK.length));

    // Shuffle options inside every selected question so option A/B/C/D order changes randomly every session
    const randomizedQuestions: Question[] = selectedQuestions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));

    return {
      id: `quiz-random-${lessonId}-${Date.now()}`,
      lessonId: lessonId,
      title: "Sesi Latihan Interaktif (15 Soal Acak Matan Al-Ajrumiyyah)",
      description: "Soal bervariasi dan diacak otomatis setiap kali Anda membuka latihan.",
      passingScore: 70,
      xpReward: 50,
      questions: randomizedQuestions,
    };
  }
}
