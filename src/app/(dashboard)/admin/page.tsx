import { Suspense } from "react";
import { AdminServerService } from "@/services/admin-server.service";
import { AdminCMS } from "@/components/admin/admin-cms";
import { connection } from "next/server";

async function AdminPageContent() {
  await connection();

  const [courses, chapters, lessons, questions, quizzes, users, audios] = await Promise.all([
    AdminServerService.getCourses(),
    AdminServerService.getChapters(),
    AdminServerService.getLessons(),
    AdminServerService.getQuestions(),
    AdminServerService.getQuizzes(),
    AdminServerService.getUsers(),
    AdminServerService.getAudios(),
  ]);

  const defaultCourses = courses.length > 0 ? courses : [
    {
      id: '11111111-1111-4111-8111-111111111111',
      title: 'Kurikulum Lengkap Kitab Matan Al-Ajrumiyyah',
      category: 'nahwu',
      description: 'Seluruh 34 Bab dan Sub-Bab Kitab Matan Al-Ajrumiyyah karya Asy-Syaikh Ash-Shanhaji.',
      level: 1,
      order_index: 1,
    },
    {
      id: '22222222-2222-4222-8222-222222222222',
      title: 'Kurikulum Kitab Al-Amtsilah At-Tashrifiyyah',
      category: 'shorof',
      description: 'Pelajari seluruh 8 Bab Tashrif Istilahi & Tashrif Lughawi dari Kitab Al-Amtsilah At-Tashrifiyyah karya Sheikh Muhammad Ma\'shum bin Ali Jombang.',
      level: 1,
      order_index: 2,
    },
  ];

  const defaultChapters = chapters.length > 0 ? chapters : [
    { id: 'chap-shorof-1', course_id: '22222222-2222-4222-8222-222222222222', title: 'Bab 1: Tashrif Istilahi Tsulatsi Mujarrad (6 Bab Utama)', description: 'Tashrif 6 wazan utama Fi\'il 3 huruf tanpa tambahan.', order_index: 1, courses: { title: 'Kitab Al-Amtsilah At-Tashrifiyyah' } },
    { id: 'chap-shorof-2', course_id: '22222222-2222-4222-8222-222222222222', title: 'Bab 2: Tashrif Istilahi Rubai Mujarrad & Mulhaq', description: 'Tashrif kata 4 huruf asli (Dahraja) dan 7 mulhaq (Jalbaba, Hauqala, Baytara, dll).', order_index: 2, courses: { title: 'Kitab Al-Amtsilah At-Tashrifiyyah' } },
    { id: 'chap-shorof-3', course_id: '22222222-2222-4222-8222-222222222222', title: 'Bab 3: Tashrif Istilahi Tsulatsi Mazid (12 Bab)', description: 'Tashrif kata kerja 3 huruf dengan tambahan 1, 2, dan 3 huruf.', order_index: 3, courses: { title: 'Kitab Al-Amtsilah At-Tashrifiyyah' } },
    { id: 'chap-shorof-4', course_id: '22222222-2222-4222-8222-222222222222', title: 'Bab 4: Mulhaq Rubai Mazid (5 Bab)', description: 'Wazan Tadahraja, Tasalqa, Ihranjama, Islanqa, Iqsha\'arra.', order_index: 4, courses: { title: 'Kitab Al-Amtsilah At-Tashrifiyyah' } },
    { id: 'chap-shorof-5', course_id: '22222222-2222-4222-8222-222222222222', title: 'Bab 5: Tashrif Lughawi Fi\'il Madhi & Mudhari', description: 'Tashrif lughawi 14 kata ganti (Dhamir) Ma\'lum & Majhul.', order_index: 5, courses: { title: 'Kitab Al-Amtsilah At-Tashrifiyyah' } },
    { id: 'chap-shorof-6', course_id: '22222222-2222-4222-8222-222222222222', title: 'Bab 6: Tashrif Lughawi Fi\'il Amar, Nahyi & Nun Taukid', description: 'Bentuk perintah, larangan, dan penguat nun taukid tsaqilah & khafifah.', order_index: 6, courses: { title: 'Kitab Al-Amtsilah At-Tashrifiyyah' } },
    { id: 'chap-shorof-7', course_id: '22222222-2222-4222-8222-222222222222', title: 'Bab 7: Tashrif Lughawi Isim Fa\'il, Maf\'ul, Sifat & Zaman/Makan/Alat', description: 'Tashrif lughawi kata benda turunan, mudzakkar, muannats, & munasabah.', order_index: 7, courses: { title: 'Kitab Al-Amtsilah At-Tashrifiyyah' } },
    { id: 'chap-shorof-8', course_id: '22222222-2222-4222-8222-222222222222', title: 'Bab 8: Tadziyil & Penutup Kitab Al-Amtsilah At-Tashrifiyyah', description: 'Biografi penyusun Sheikh Muhammad Ma\'shum bin Ali Jombang 1351 H & Faidah.', order_index: 8, courses: { title: 'Kitab Al-Amtsilah At-Tashrifiyyah' } },
  ];

  const defaultLessons = lessons.length > 0 ? lessons : [
    { id: 'shorof-lesson-1', chapter_id: 'chap-shorof-1', title: '1. Bab 1: Wazan فَعَلَ - يَفْعُلُ (نَصَرَ - يَنْصُرُ)', title_arabic: 'نَصَرَ - يَنْصُرُ - نَصْرًا', xp_reward: 30, order_index: 1, chapters: { title: 'Bab 1: Tashrif Istilahi Tsulatsi Mujarrad' } },
    { id: 'shorof-lesson-2', chapter_id: 'chap-shorof-1', title: '2. Bab 2: Wazan فَعَلَ - يَفْعِلُ (ضَرَبَ - يَضْرِبُ)', title_arabic: 'ضَرَبَ - يَضْرِبُ - ضَرْبًا', xp_reward: 30, order_index: 2, chapters: { title: 'Bab 1: Tashrif Istilahi Tsulatsi Mujarrad' } },
    { id: 'shorof-lesson-3', chapter_id: 'chap-shorof-1', title: '3. Bab 3: Wazan فَعَلَ - يَفْعَلُ (فَتَحَ - يَفْتَحُ)', title_arabic: 'فَتَحَ - يَفْتَحُ - فَتْحًا', xp_reward: 30, order_index: 3, chapters: { title: 'Bab 1: Tashrif Istilahi Tsulatsi Mujarrad' } },
    { id: 'shorof-lesson-4', chapter_id: 'chap-shorof-1', title: '4. Bab 4: Wazan فَعِلَ - يَفْعَلُ (عَلِمَ - يَعْلَمُ)', title_arabic: 'عَلِمَ - يَعْلَمُ - عِلْمًا', xp_reward: 30, order_index: 4, chapters: { title: 'Bab 1: Tashrif Istilahi Tsulatsi Mujarrad' } },
    { id: 'shorof-lesson-5', chapter_id: 'chap-shorof-1', title: '5. Bab 5: Wazan فَعُلَ - يَفْعُلُ (حَسُنَ - يَحْسُنُ)', title_arabic: 'حَسُنَ - يَحْسُنُ - حُسْنًا', xp_reward: 30, order_index: 5, chapters: { title: 'Bab 1: Tashrif Istilahi Tsulatsi Mujarrad' } },
    { id: 'shorof-lesson-6', chapter_id: 'chap-shorof-1', title: '6. Bab 6: Wazan فَعِلَ - يَفْعِلُ (حَسِبَ - يَحْسِبُ)', title_arabic: 'حَسِبَ - يَحْسِبُ - حِسْبَانًا', xp_reward: 30, order_index: 6, chapters: { title: 'Bab 1: Tashrif Istilahi Tsulatsi Mujarrad' } },
    { id: 'shorof-lesson-7', chapter_id: 'chap-shorof-2', title: '7. Rubai Mujarrad: فَعْلَلَ - يُفَعْلِلُ (دَحْرَجَ - يُدَحْرِجُ)', title_arabic: 'دَحْرَجَ - يُدَحْرِجُ - دَحْرَجَةً وَدِحْرَاجًا', xp_reward: 35, order_index: 1, chapters: { title: 'Bab 2: Tashrif Istilahi Rubai Mujarrad & Mulhaq' } },
    { id: 'shorof-lesson-8', chapter_id: 'chap-shorof-2', title: '8. Mulhaq Rubai 7 Wazan (حَمْدَلَ, حَوْقَلَ, بَسْمَلَ dll)', title_arabic: 'حَمْدَلَ - يُحَمْدِلُ - حَمْدَلَةً', xp_reward: 35, order_index: 2, chapters: { title: 'Bab 2: Tashrif Istilahi Rubai Mujarrad & Mulhaq' } },
    { id: 'shorof-lesson-9', chapter_id: 'chap-shorof-3', title: '9. Tsulatsi Mazid 1 Huruf (فَعَّلَ, فَاعَلَ, أَفْعَلَ)', title_arabic: 'فَرَّحَ - قَاتَلَ - أَكْرَمَ', xp_reward: 35, order_index: 1, chapters: { title: 'Bab 3: Tashrif Istilahi Tsulatsi Mazid' } },
    { id: 'shorof-lesson-10', chapter_id: 'chap-shorof-3', title: '10. Tsulatsi Mazid 2 Huruf (تَفَاعَلَ, تَفَعَّلَ, إِفْتَعَلَ, إِنْفَعَلَ, إِفْعَلَّ)', title_arabic: 'تَبَاعَدَ - تَكَسَّرَ - إِجْتَمَعَ', xp_reward: 40, order_index: 2, chapters: { title: 'Bab 3: Tashrif Istilahi Tsulatsi Mazid' } },
    { id: 'shorof-lesson-11', chapter_id: 'chap-shorof-3', title: '11. Tsulatsi Mazid 3 Huruf (إِسْتَفْعَلَ, إِفْعَوْعَلَ, إِفْعَالَّ, إِفْعَوَّلَ)', title_arabic: 'إِسْتَخْرَجَ - إِحْدَوْدَبَ - إِصْهَارَّ', xp_reward: 40, order_index: 3, chapters: { title: 'Bab 3: Tashrif Istilahi Tsulatsi Mazid' } },
    { id: 'shorof-lesson-12', chapter_id: 'chap-shorof-4', title: '12. Mulhaq Rubai Mazid (تَفَعْلَلَ, تَفَعْلَى, إِفْعَنْلَلَ, إِفْعَنْلَى, إِفْعَلَلَّ)', title_arabic: 'تَدَحْرَجَ - إِحْرَنْجَمَ - إِقْشَعَرَّ', xp_reward: 40, order_index: 1, chapters: { title: 'Bab 4: Mulhaq Rubai Mazid' } },
    { id: 'shorof-lesson-13', chapter_id: 'chap-shorof-5', title: '13. Tashrif Lughawi Fi\'il Madhi Ma\'lum (14 Dhamir)', title_arabic: 'فَعَلَ، فَعَلَا، فَعَلُوا...', xp_reward: 40, order_index: 1, chapters: { title: 'Bab 5: Tashrif Lughawi Fi\'il Madhi & Mudhari' } },
    { id: 'shorof-lesson-14', chapter_id: 'chap-shorof-5', title: '14. Tashrif Lughawi Fi\'il Madhi Majhul Pasif (14 Dhamir)', title_arabic: 'فُعِلَ، فُعِلَا، فُعِلُوا...', xp_reward: 40, order_index: 2, chapters: { title: 'Bab 5: Tashrif Lughawi Fi\'il Madhi & Mudhari' } },
    { id: 'shorof-lesson-15', chapter_id: 'chap-shorof-5', title: '15. Tashrif Lughawi Fi\'il Mudhari Ma\'lum (14 Dhamir)', title_arabic: 'يَفْعُلُ، يَفْعُلَانِ، يَفْعُلُونَ...', xp_reward: 40, order_index: 3, chapters: { title: 'Bab 5: Tashrif Lughawi Fi\'il Madhi & Mudhari' } },
    { id: 'shorof-lesson-16', chapter_id: 'chap-shorof-5', title: '16. Tashrif Lughawi Fi\'il Mudhari Majhul (14 Dhamir)', title_arabic: 'يُفْعَلُ، يُفْعَلَانِ، يُفْعَلُونَ...', xp_reward: 40, order_index: 4, chapters: { title: 'Bab 5: Tashrif Lughawi Fi\'il Madhi & Mudhari' } },
    { id: 'shorof-lesson-17', chapter_id: 'chap-shorof-6', title: '17. Fi\'il Mudhari Nun Taukid Tsaqilah & Khafifah', title_arabic: 'يَصُونَنَّ - يَصُونَنْ', xp_reward: 40, order_index: 1, chapters: { title: 'Bab 6: Tashrif Lughawi Fi\'il Amar, Nahyi & Nun Taukid' } },
    { id: 'shorof-lesson-18', chapter_id: 'chap-shorof-6', title: '18. Fi\'il Amar Perintah Ma\'lum & Majhul', title_arabic: 'أُفْعُلْ - صُنْ - لِيُصَنَّ', xp_reward: 40, order_index: 2, chapters: { title: 'Bab 6: Tashrif Lughawi Fi\'il Amar, Nahyi & Nun Taukid' } },
    { id: 'shorof-lesson-19', chapter_id: 'chap-shorof-6', title: '19. Fi\'il Nahyi Larangan', title_arabic: 'لَا تَفْعُلْ - لَا تَصُنْ', xp_reward: 40, order_index: 3, chapters: { title: 'Bab 6: Tashrif Lughawi Fi\'il Amar, Nahyi & Nun Taukid' } },
    { id: 'shorof-lesson-20', chapter_id: 'chap-shorof-7', title: '20. Tashrif Lughawi Isim Fa\'il & Isim Maf\'ul', title_arabic: 'فَاعِلٌ - مَفْعُولٌ', xp_reward: 40, order_index: 1, chapters: { title: 'Bab 7: Tashrif Lughawi Isim Fa\'il, Maf\'ul, Sifat & Zaman/Makan/Alat' } },
    { id: 'shorof-lesson-21', chapter_id: 'chap-shorof-7', title: '21. Tashrif Lughawi Sifat Musyabbahah bi Ismi Fa\'il', title_arabic: 'حَسَنٌ - حَسَنَانِ - حَسَنُونَ', xp_reward: 40, order_index: 2, chapters: { title: 'Bab 7: Tashrif Lughawi Isim Fa\'il, Maf\'ul, Sifat & Zaman/Makan/Alat' } },
    { id: 'shorof-lesson-22', chapter_id: 'chap-shorof-7', title: '22. Tashrif Lughawi Asma\' Az-Zaman, Al-Makan & Al-Alah', title_arabic: 'مَفْعَلٌ - مَفْعَلَانِ - مَفَاعِلُ', xp_reward: 40, order_index: 3, chapters: { title: 'Bab 7: Tashrif Lughawi Isim Fa\'il, Maf\'ul, Sifat & Zaman/Makan/Alat' } },
    { id: 'shorof-lesson-23', chapter_id: 'chap-shorof-8', title: '23. Tadziyil & Biografi Sheikh Muhammad Ma\'shum bin Ali Jombang', title_arabic: 'تَذْيِيْلٌ وَخَاتِمَةٌ', xp_reward: 50, order_index: 1, chapters: { title: 'Bab 8: Tadziyil & Penutup Kitab Al-Amtsilah At-Tashrifiyyah' } },
  ];

  const defaultQuestions = questions.length > 0 ? questions : [
    {
      id: 'q-shorof-1',
      type: 'tashrif',
      question_text: 'Tentukan Fi\'il Mudhari dari kata kerja نَصَرَ (Nasara) berdasarkan Bab Pertama Al-Amtsilah At-Tashrifiyyah!',
      question_arabic: 'مَا هُوَ الفِعْلُ المُضَارِعُ مِنْ "نَصَرَ"؟',
      explanation: 'Wazan Bab Pertama Tsulatsi Mujarrad adalah فَعَلَ - يَفْعُلُ, sehingga نَصَرَ menjadi يَنْصُرُ (Yansuru).',
      points: 15,
      question_options: [
        { option_text: 'Yansuru', option_arabic: 'يَنْصُرُ', is_correct: true },
        { option_text: 'Yansiru', option_arabic: 'يَنْصِرُ', is_correct: false },
        { option_text: 'Yansaru', option_arabic: 'يَنْصَرُ', is_correct: false },
      ],
    },
    {
      id: 'q-shorof-2',
      type: 'multiple_choice',
      question_text: 'Manakah bentuk Isim Fa\'il (pelaku) dari kata kerja ضَرَبَ (Daraba)?',
      question_arabic: 'أَيُّ هَذِهِ الكَلِمَاتِ اِسْمُ فَاعِلٍ مِنْ "ضَرَبَ"؟',
      explanation: 'Isim Fa\'il dari ضَرَبَ mengikut wazan فَاعِلٌ adalah ضَارِبٌ (Daaribun = orang yang memukul).',
      points: 15,
      question_options: [
        { option_text: 'Daaribun', option_arabic: 'ضَارِبٌ', is_correct: true },
        { option_text: 'Madroobun', option_arabic: 'مَضْرُوبٌ', is_correct: false },
        { option_text: 'Idrib', option_arabic: 'اِضْرِبْ', is_correct: false },
      ],
    },
    {
      id: 'q-shorof-3',
      type: 'tashrif',
      question_text: 'Tashrif lughawi untuk Fi\'il Madhi نَصَرَ dengan Dhamir Humaa (هُمَا - Mereka Berdua Laki-laki) adalah...',
      question_arabic: 'تَصْرِيفُ "نَصَرَ" مَعَ الضَّمِيرِ (هُمَا)',
      explanation: 'Dhamir Humaa ditambahkan alif tatsniyah pada akhir Fi\'il Madhi: نَصَرَ + ا = نَصَرَا.',
      points: 20,
      question_options: [
        { option_text: 'Nasaraa', option_arabic: 'نَصَرَا', is_correct: true },
        { option_text: 'Nasaruu', option_arabic: 'نَصَرُوا', is_correct: false },
        { option_text: 'Nasarat', option_arabic: 'نَصَرَتْ', is_correct: false },
      ],
    },
  ];

  const defaultUsers = users.length > 0 ? users : [
    {
      id: 'usr-admin-juanda',
      full_name: 'Juanda Andi',
      email: 'juanda.andi@gmail.com',
      role: 'admin',
      isSuperAdmin: true,
    },
    {
      id: 'usr-2',
      full_name: 'Ahmad Mujahid',
      email: 'ahmad@example.com',
      role: 'user',
    },
  ];

  return (
    <AdminCMS
      initialCourses={defaultCourses}
      initialChapters={defaultChapters}
      initialLessons={defaultLessons}
      initialQuestions={defaultQuestions}
      initialQuizzes={quizzes}
      initialUsers={defaultUsers}
      initialAudios={audios}
    />
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 font-bold animate-pulse">Memuat Admin Content Management System...</div>}>
      <AdminPageContent />
    </Suspense>
  );
}
