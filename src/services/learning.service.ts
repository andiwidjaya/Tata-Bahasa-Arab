import { createClient } from '@/lib/supabase/server';
import { AudioService } from '@/services/audio.service';

export interface CourseDetail {
  id: string;
  title: string;
  category: 'nahwu' | 'shorof';
  description: string;
  level: number;
}

export interface ChapterDetail {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  lessons: {
    id: string;
    title: string;
    titleArabic?: string;
    orderIndex: number;
    isCompleted?: boolean;
  }[];
}

export async function fetchCoursesList() {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: courses } = await (supabase.from('courses') as any)
    .select('id, title, category, description, level')
    .eq('is_published', true)
    .order('order_index', { ascending: true });

  return (courses as CourseDetail[]) || [];
}

const FALLBACK_COURSES: Record<string, { course: CourseDetail; chapters: ChapterDetail[] }> = {
  nahwu: {
    course: {
      id: '11111111-1111-4111-8111-111111111111',
      title: 'Kurikulum Lengkap Kitab Matan Al-Ajrumiyyah',
      category: 'nahwu',
      description: 'Seluruh 34 Bab dan Sub-Bab Kitab Matan Al-Ajrumiyyah karya Asy-Syaikh Ash-Shanhaji lengkap dengan matan Arab, terjemahan, dan kaidah I\'rab.',
      level: 1,
    },
    chapters: [
      {
        id: 'chap-1-kalam',
        title: 'Bab 1: Muqaddimah & Jenis Kalam (مُقَدِّمَةٌ وَأَنْوَاعُ الْكَلَامِ)',
        description: 'Memahami 4 syarat Al-Kalam dan 3 pembagian kata (Isim, Fi\'il, Harf) beserta seluruh tanda-tandanya.',
        orderIndex: 1,
        lessons: [
          { id: 'nahwu-lesson-1', title: '1. Pengenalan Al-Kalam (4 Syarat Kalimat)', titleArabic: 'تعريف الكلام', orderIndex: 1 },
          { id: 'nahwu-lesson-2', title: '2. Pembagian Kalam: Isim, Fi\'il, Harf', titleArabic: 'أقسام الكلام', orderIndex: 2 },
          { id: 'nahwu-lesson-3', title: '3. Tanda Isim & Huruf Jar / Qasam', titleArabic: 'علامات الاسم وحروف الخفض', orderIndex: 3 },
          { id: 'nahwu-lesson-4', title: '4. Tanda Fi\'il & Definisi Harf', titleArabic: 'علامات الفعل والحرف', orderIndex: 4 },
        ],
      },
      {
        id: 'chap-2-irab',
        title: 'Bab 2: Pengenalan I\'rab (بَابُ الْإِعْرَابِ)',
        description: 'Memahami konsep perubahan akhir kalimat (I\'rab) dan 4 pembagiannya (Rafa\', Nashab, Jar, Jazm).',
        orderIndex: 2,
        lessons: [
          { id: 'nahwu-lesson-5', title: '5. Definisi I\'rab & 4 Pembagian Utamanya', titleArabic: 'باب الإعراب وأقسامه', orderIndex: 1 },
        ],
      },
      {
        id: 'chap-3-alamat-irab',
        title: 'Bab 3: Tanda-tanda I\'rab (بَابُ مَعْرِفَةِ عَلَامَاتِ الْإِعْرَابِ)',
        description: 'Rincian seluruh tanda Rafa\', Nashab, Khafdh/Jar, dan Jazm serta ringkasan Mu\'rabat.',
        orderIndex: 3,
        lessons: [
          { id: 'nahwu-lesson-6', title: '6. Tanda-tanda I\'rab Rafa\' (Dhammah, Waw, Alif, Nun)', titleArabic: 'علامات الرفع', orderIndex: 1 },
          { id: 'nahwu-lesson-7', title: '7. Tanda-tanda I\'rab Nashab (Fathah, Alif, Kasrah, Ya\', Hadzf)', titleArabic: 'علامات النصب', orderIndex: 2 },
          { id: 'nahwu-lesson-8', title: '8. Tanda-tanda I\'rab Khafdh / Jar (Kasrah, Ya\', Fathah)', titleArabic: 'علامات الخفض', orderIndex: 3 },
          { id: 'nahwu-lesson-9', title: '9. Tanda-tanda I\'rab Jazm (Sukun & Hadzf)', titleArabic: 'علامات الجزم', orderIndex: 4 },
          { id: 'nahwu-lesson-10', title: '10. Ringkasan Mu\'rabat (Harakat & Huruf)', titleArabic: 'فصل المعربات', orderIndex: 5 },
        ],
      },
      {
        id: 'chap-4-afal',
        title: 'Bab 4: Kaidah Fi\'il-Fi\'il (بَابُ الْأَفْعَالِ)',
        description: 'Memahami pembagian Fi\'il Madhi, Mudhari\', Amr, 10 Amil Nawashib, dan 18 Amil Jawazim.',
        orderIndex: 4,
        lessons: [
          { id: 'nahwu-lesson-11', title: '11. Pembagian Fi\'il (Madhi, Mudhari\', Amr)', titleArabic: 'أقسام الأفعال وأحكامها', orderIndex: 1 },
          { id: 'nahwu-lesson-12', title: '12. Amil-amil Nashab (10 Huruf Nawashib)', titleArabic: 'نواصب الفعل المضارع', orderIndex: 2 },
          { id: 'nahwu-lesson-13', title: '13. Amil-amil Jazm (18 Huruf Jawazim)', titleArabic: 'جوازم الفعل المضارع', orderIndex: 3 },
        ],
      },
      {
        id: 'chap-5-marfuat',
        title: 'Bab 5: Isim-Isim Yang Dirafa\'kan (بَابُ مَرْفُوعَاتِ الْأَسْمَاءِ)',
        description: '7 kelompok Isim yang wajib Marfu\' (Fa\'il, Na\'ibul Fa\'il, Mubtada\', Khabar, Kaana, Inna, Dzhanantu, Tawabi\').',
        orderIndex: 5,
        lessons: [
          { id: 'nahwu-lesson-14', title: '14. Bab Fa\'il (Zhahir & 12 Dhamir)', titleArabic: 'باب الفاعل', orderIndex: 1 },
          { id: 'nahwu-lesson-15', title: '15. Bab Na\'ibul Fa\'il (Formasi Pasif)', titleArabic: 'باب نائب الفاعل', orderIndex: 2 },
          { id: 'nahwu-lesson-16', title: '16. Bab Mubtada\' dan Khabar', titleArabic: 'باب المبتدأ والخبر', orderIndex: 3 },
          { id: 'nahwu-lesson-17', title: '17. Bab Kaana dan Saudara-saudaranya', titleArabic: 'كان وأخواتها', orderIndex: 4 },
          { id: 'nahwu-lesson-18', title: '18. Bab Inna dan Saudara-saudaranya', titleArabic: 'إن وأخواتها', orderIndex: 5 },
          { id: 'nahwu-lesson-19', title: '19. Bab Dzhanantu dan Saudara-saudaranya', titleArabic: 'ظننت وأخواتها', orderIndex: 6 },
          { id: 'nahwu-lesson-20', title: '20. Bab Na\'at & 5 Jenis Isim Ma\'rifat', titleArabic: 'باب النعت والمعرفة', orderIndex: 7 },
          { id: 'nahwu-lesson-21', title: '21. Bab \'Athaf (10 Huruf \'Athaf)', titleArabic: 'باب العطف', orderIndex: 8 },
          { id: 'nahwu-lesson-22', title: '22. Bab Taukid (Penegas Lafadz)', titleArabic: 'باب التوكيد', orderIndex: 9 },
          { id: 'nahwu-lesson-23', title: '23. Bab Badal (4 Jenis Badal)', titleArabic: 'باب البدل', orderIndex: 10 },
        ],
      },
      {
        id: 'chap-6-manshubat',
        title: 'Bab 6: Isim-Isim Yang Dinashabkan (بَابُ مَنْصُوبَاتِ الْأَسْمَاءِ)',
        description: '15 kelompok Isim yang wajib Manshub (Maf\'ul Bih, Mashdar, Dharaf, Hal, Tamyiz, Istitsna, Laa, Munada dll).',
        orderIndex: 6,
        lessons: [
          { id: 'nahwu-lesson-24', title: '24. Bab Maf\'ul Bih (Zhahir & Dhamir)', titleArabic: 'باب المفعول به', orderIndex: 1 },
          { id: 'nahwu-lesson-25', title: '25. Bab Mashdar / Maf\'ul Mutlaq', titleArabic: 'باب المصدر', orderIndex: 2 },
          { id: 'nahwu-lesson-26', title: '26. Bab Dharaf Zaman & Dharaf Makan', titleArabic: 'ظرف الزمان وظرف المكان', orderIndex: 3 },
          { id: 'nahwu-lesson-27', title: '27. Bab Hal & Syarat-syaratnya', titleArabic: 'باب الحال', orderIndex: 4 },
          { id: 'nahwu-lesson-28', title: '28. Bab Tamyiz & Syarat-syaratnya', titleArabic: 'باب التمييز', orderIndex: 5 },
          { id: 'nahwu-lesson-29', title: '29. Bab Istitsna (8 Huruf Pengecualian)', titleArabic: 'باب الاستثناء', orderIndex: 6 },
          { id: 'nahwu-lesson-30', title: '30. Bab Laa Naafiyah lil Jinsi', titleArabic: 'باب لا', orderIndex: 7 },
          { id: 'nahwu-lesson-31', title: '31. Bab Munada (5 Jenis Panggilan)', titleArabic: 'باب المنادى', orderIndex: 8 },
          { id: 'nahwu-lesson-32', title: '32. Bab Maf\'ul min Ajlih (Sebab Perbuatan)', titleArabic: 'باب المفعول له', orderIndex: 9 },
          { id: 'nahwu-lesson-33', title: '33. Bab Maf\'ul Ma\'ah (Penyerta Perbuatan)', titleArabic: 'باب المفعول معه', orderIndex: 10 },
        ],
      },
      {
        id: 'chap-7-makhfudhat',
        title: 'Bab 7: Isim-Isim Yang Dijarkan (بَابُ مَخْفُوضَاتِ الْأَسْمَاءِ)',
        description: '3 sebab utama Isim dijarkan/dikhafadhkan (Bil-Harfi, Bil-Idhafah, Bit-Tabi\'i).',
        orderIndex: 7,
        lessons: [
          { id: 'nahwu-lesson-34', title: '34. Isim Yang Dijarkan (Huruf Jar & Idhafah)', titleArabic: 'باب المخفوضات من الأسماء', orderIndex: 1 },
        ],
      },
    ],
  },
  shorof: {
    course: {
      id: '22222222-2222-4222-8222-222222222222',
      title: 'Kurikulum Ilmu Shorof (Tashrif Al-Kalimah)',
      category: 'shorof',
      description: 'Kuasai pola perubahan bentuk kata (Tashrif Lughawi & Istilahi) dari kata dasar hingga turunan.',
      level: 1,
    },
    chapters: [
      {
        id: 'chap-shorof-1',
        title: 'Bab 1: Tashrif Tsulatsi Mujarrad (6 Bab Wazan Utama)',
        description: 'Mempelajari 6 pola kata kerja 3 huruf tanpa huruf tambahan.',
        orderIndex: 1,
        lessons: [
          { id: 'shorof-lesson-1', title: '1. Bab 1: Wazan فَعَلَ - يَفْعُلُ (نَصَرَ - يَنْصُرُ)', titleArabic: 'فَعَلَ - يَفْعُلُ', orderIndex: 1 },
          { id: 'shorof-lesson-2', title: '2. Bab 2: Wazan فَعَلَ - يَفْعِلُ (ضَرَبَ - يَضْرِبُ)', titleArabic: 'فَعَلَ - يَفْعِلُ', orderIndex: 2 },
          { id: 'shorof-lesson-3', title: '3. Bab 3: Wazan فَعَلَ - يَفْعَلُ (فَتَحَ - يَفْتَحُ)', titleArabic: 'فَعَلَ - يَفْعَلُ', orderIndex: 3 },
          { id: 'shorof-lesson-4', title: '4. Bab 4: Wazan فَعِلَ - يَفْعَلُ (عَلِمَ - يَعْلَمُ)', titleArabic: 'فَعِلَ - يَفْعَلُ', orderIndex: 4 },
          { id: 'shorof-lesson-5', title: '5. Bab 5: Wazan فَعُلَ - يَفْعُلُ (حَسُنَ - يَحْسُنُ)', titleArabic: 'فَعُلَ - يَفْعُلُ', orderIndex: 5 },
          { id: 'shorof-lesson-6', title: '6. Bab 6: Wazan فَعِلَ - يَفْعِلُ (حَسِبَ - يَحْسِبُ)', titleArabic: 'فَعِلَ - يَفْعِلُ', orderIndex: 6 },
        ],
      },
      {
        id: 'chap-shorof-2',
        title: 'Bab 2: Tashrif Tsulatsi Mazid (Kata Kerja Tambahan)',
        description: 'Mempelajari bentukan kata kerja dengan tambahan 1, 2, dan 3 huruf.',
        orderIndex: 2,
        lessons: [
          { id: 'shorof-lesson-7', title: '7. Tsulatsi Mazid 1 Huruf (أَفْعَلَ, فَعَّلَ, فَاعَلَ)', titleArabic: 'الثلاثي المزيد بحرف', orderIndex: 1 },
          { id: 'shorof-lesson-8', title: '8. Tsulatsi Mazid 2 & 3 Huruf (إِسْتَفْعَلَ dll)', titleArabic: 'الثلاثي المزيد بحرفين وثلاثة', orderIndex: 2 },
        ],
      },
    ],
  },
};

const FALLBACK_LESSONS: Record<string, { lesson: any; contents: any[] }> = {
  'nahwu-lesson-1': {
    lesson: { id: 'nahwu-lesson-1', title: '1. Pengenalan Al-Kalam (4 Syarat Kalimat)', titleArabic: 'تَعْرِيفُ الْكَلَامِ', xpReward: 25, chapterTitle: 'Bab 1: Muqaddimah & Jenis Kalam', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'text', text: 'Syaikh Ash-Shanhaji menyatakan dalam Matan Al-Ajrumiyyah:' },
      { id: 'c2', type: 'arabic_text', arabic: 'اَلْكَلَامُ هُوَ اَللَّفْظُ اَلْمُرَكَّبُ اَلْمُفِيدُ بِالْوَضْعِ', text: 'Al-Kalam adalah lafaz yang tersusun, memberikan faedah sempurna, dengan menggunakan bahasa Arab (disengaja).' },
      { id: 'c3', type: 'explanation', text: 'Syarat susunan kalimat dapat disebut Al-Kalam ada 4 hal:\n1. Al-Lafdz (اللَّفْظُ): Suara yang mengandung sebagian huruf hijaiyyah.\n2. Al-Murakkab (الْمُرَكَّبُ): Tersusun dari 2 kata atau lebih.\n3. Al-Mufid (الْمُفِيْدُ): Memberikan pemahaman sempurna sehingga pendengar tidak menunggu kelanjutan kalimat.\n4. Bil-Wadh\'i (بِالْوَضْعِ): Disengaja menggunakan ucapan bahasa Arab.' },
      { id: 'c4', type: 'example', arabic: 'جَاءَ زَيْدٌ (Zaid telah datang) | زَيْدٌ قَائِمٌ (Zaid berdiri)', text: 'Contoh Al-Kalam yang memenuhi 4 syarat sempurna.' },
    ],
  },
  'nahwu-lesson-2': {
    lesson: { id: 'nahwu-lesson-2', title: '2. Pembagian Kalam: Isim, Fi\'il, Harf', titleArabic: 'وَأَقْسَامُهُ ثَلَاثَةٌ: اِسْمٌ، وَفِعْلٌ، وَحَرْفٌ', xpReward: 25, chapterTitle: 'Bab 1: Muqaddimah & Jenis Kalam', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَأَقْسَامُهُ ثَلَاثَةٌ: اِسْمٌ، وَفِعْلٌ، وَحَرْفٌ جَاءَ لِمَعْنًى', text: 'Pembagian Al-Kalam ada tiga: Isim (kata benda/sifat), Fi\'il (kata kerja), dan Harf (kata hubung) yang memiliki makna.' },
      { id: 'c2', type: 'explanation', text: '1. Isim (اِسْمٌ): Kata yang menunjukkan makna mandiri tanpa terikat dimensi waktu (contoh: Zaid, Buku, Masjid).\n2. Fi\'il (فِعْلٌ): Kata yang menunjukkan makna mandiri dan terikat waktu lampau, sekarang, atau mendatang (contoh: Telah menulis, Sedang membaca).\n3. Harf (حَرْفٌ): Kata yang baru terlihat makna jelasnya ketika digabungkan dengan kata lain (contoh: dari, ke, di dalam).' },
      { id: 'c3', type: 'example', arabic: 'كِتَابٌ (Isim) | كَتَبَ (Fi\'il) | فِي (Harf)', text: 'Contoh 3 jenis Al-Kalimah.' },
    ],
  },
  'nahwu-lesson-3': {
    lesson: { id: 'nahwu-lesson-3', title: '3. Tanda Isim & Huruf Jar / Qasam', titleArabic: 'عَلَامَاتُ الإِسْمِ وَحُرُوفُ الخَفْضِ', xpReward: 30, chapterTitle: 'Bab 1: Muqaddimah & Jenis Kalam', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'فَالْاِسْمُ يُعْرَفُ بِالْخَفْضِ، وَالتَّنْوِينِ، وَدُخُولِ الْأَلِفِ وَاللَّامِ...', text: 'Maka Isim dapat dikenali dengan Khafdh (Jar), Tanwin, masuknya Alif-Lam, dan didahului Huruf Jar/Qasam.' },
      { id: 'c2', type: 'explanation', text: 'Huruf Jar meliputi: مِنْ (dari), إِلَى (ke), عَنْ (dari/tentang), عَلَى (di atas), فِي (di dalam), رُبَّ (betapa banyak), الْبَاء (dengan), الْكَاف (seperti), اللَّام (milik/untuk).\nHuruf Qasam (sumpah): الْوَاو (demi), الْبَاء, التَّاء.' },
      { id: 'c3', type: 'example', arabic: 'فِي الْمَسْجِدِ | وَاللهِ', text: 'Contoh: "fil-masjidi" (mengandung tanda Jar & Alif-Lam), "Wallahi" (Sumpah demi Allah).' },
    ],
  },
  'nahwu-lesson-4': {
    lesson: { id: 'nahwu-lesson-4', title: '4. Tanda Fi\'il & Definisi Harf', titleArabic: 'عَلَامَاتُ الفِعْلِ وَالحَرْفِ', xpReward: 30, chapterTitle: 'Bab 1: Muqaddimah & Jenis Kalam', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَالْفِعْلُ يُعْرَفُ بِقَدْ، وَالسِّينِ، وَسَوْفَ، وَتَاءِ التَّأْنِيثِ السَّاكِنَةِ', text: 'Fi\'il dapat dikenali dengan kemasukan: Qad (قَدْ), As-Sin (سـ), Saufa (سَوْفَ), dan Ta\' Ta\'nits As-Sakinah (تْ).' },
      { id: 'c2', type: 'arabic_text', arabic: 'وَالْحَرْفُ مَا لَا يَصْلُحُ مَعَهُ دَلِيلُ الْاِسْمِ وَلَا دَلِيلُ الْفِعْلِ', text: 'Adapun Harf adalah kata yang tidak cocok padanya tanda Isim maupun tanda Fi\'il.' },
      { id: 'c3', type: 'example', arabic: 'قَدْ قَامَتِ الصَّلَاةُ | سَيَقُومُ | سَوْفَ يَعْلَمُونَ | قَامَتْ هِنْدٌ', text: 'Contoh tanda-tanda Fi\'il.' },
    ],
  },
  'nahwu-lesson-5': {
    lesson: { id: 'nahwu-lesson-5', title: '5. Definisi I\'rab & 4 Pembagian Utamanya', titleArabic: 'بَابُ الْإِعْرَابِ', xpReward: 30, chapterTitle: 'Bab 2: Pengenalan I\'rab', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْإِعْرَابُ هُوَ تَغْيِيرُ أَوَاخِرِ الْكَلِمِ لِاخْتِلَافِ الْعَوَامِلِ الدَّاخِلَةِ عَلَيْهَا لَفْظًا أَوْ تَقْدِيرًا', text: 'I\'rab adalah perubahan akhir kalimat karena perbedaan amil-amil yang masuk padanya, baik secara lafadz (terlihat) atau taqdir (dikira-kirakan).' },
      { id: 'c2', type: 'explanation', text: 'Pembagian I\'rab ada 4:\n1. Rafa\' (رَفْعٌ)\n2. Nashab (نَصْبٌ)\n3. Khafdh / Jar (خَفْضٌ)\n4. Jazm (جَزْمٌ)\n\nAturan:\n- Isim bisa mengalami: Rafa\', Nashab, Khafdh (TIDAK BISA JAZM).\n- Fi\'il bisa mengalami: Rafa\', Nashab, Jazm (TIDAK BISA KHAFDH).' },
      { id: 'c3', type: 'example', arabic: 'جَاءَ زَيْدٌ (Rafa\') | رَأَيْتُ زَيْدًا (Nashab) | مَرَرْتُ بِزَيْدٍ (Jar)', text: 'Perubahan harakat akhir kata Zaidun karena pengaruh amil.' },
    ],
  },
  'nahwu-lesson-6': {
    lesson: { id: 'nahwu-lesson-6', title: '6. Tanda-tanda I\'rab Rafa\' (Dhammah, Waw, Alif, Nun)', titleArabic: 'عَلَامَاتُ الرَّفْعِ', xpReward: 35, chapterTitle: 'Bab 3: Tanda-tanda I\'rab', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'لِلرَّفْعِ أَرْبَعُ عَلَامَاتٍ: اَلضَّمَّةُ، وَالْوَاوُ، وَالْأَلِفُ، وَالنُّونُ', text: 'Bagi Rafa\' ada 4 tanda: Dhammah (utama), Waw, Alif, dan Nun.' },
      { id: 'c2', type: 'explanation', text: '1. Dhammah pada: Isim Mufrad, Jama\' Taksir, Jama\' Muannats Salim, dan Fi\'il Mudhari\' Shahih Akhir.\n2. Waw pada: Jama\' Mudzakkar Salim & Asma\'ul Khamsah (أَبُوكَ, أَخُوكَ, حَمُوكَ, فَوكَ, ذُو مَالٍ).\n3. Alif pada: Isim Tatsniyah (Mutsanna).\n4. Nun pada: Af\'alul Khamsah (يَفْعَلَانِ, تَفْعَلَانِ, يَفْعَلُونَ, تَفْعَلُونَ, تَفْعَلِينَ).' },
    ],
  },
  'nahwu-lesson-7': {
    lesson: { id: 'nahwu-lesson-7', title: '7. Tanda-tanda I\'rab Nashab', titleArabic: 'عَلَامَاتُ النَّصْبِ', xpReward: 35, chapterTitle: 'Bab 3: Tanda-tanda I\'rab', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَلِلنَّصْبِ خَمْسُ عَلَامَاتٍ: اَلْفَتْحَةُ، وَالْأَلِفُ، وَالْكَسْرَةُ، وَالْيَاءُ، وَحَذْفُ النُّونِ', text: 'Bagi Nashab ada 5 tanda: Fathah (utama), Alif, Kasrah, Ya\', dan Membuang Nun (Hadzfunnuun).' },
      { id: 'c2', type: 'explanation', text: '1. Fathah pada: Isim Mufrad, Jama\' Taksir, Fi\'il Mudhari\' kemasukan Amil Nashab.\n2. Alif pada: Asma\'ul Khamsah (رَأَيْتُ أَبَاكَ).\n3. Kasrah pada: Jama\' Muannats Salim (رَأَيْتُ الْمُسْلِمَاتِ).\n4. Ya\' pada: Isim Tatsniyah & Jama\' Mudzakkar Salim.\n5. Hadzfunnuun pada: Af\'alul Khamsah.' },
    ],
  },
  'nahwu-lesson-8': {
    lesson: { id: 'nahwu-lesson-8', title: '8. Tanda-tanda I\'rab Khafdh / Jar', titleArabic: 'عَلَامَاتُ الخَفْضِ', xpReward: 35, chapterTitle: 'Bab 3: Tanda-tanda I\'rab', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَلِلْخَفْضِ ثَلَاثُ عَلَامَاتٍ: اَلْكَسْرَةُ، وَالْيَاءُ، وَالْفَتْحَةُ', text: 'Bagi Khafdh/Jar ada 3 tanda: Kasrah (utama), Ya\', dan Fathah.' },
      { id: 'c2', type: 'explanation', text: '1. Kasrah pada: Isim Mufrad Munsharif, Jama\' Taksir Munsharif, Jama\' Muannats Salim.\n2. Ya\' pada: Asma\'ul Khamsah, Isim Tatsniyah, Jama\' Mudzakkar Salim.\n3. Fathah pada: Isim Ghairu Munsharif (kata benda tidak menerima tanwin, contoh: مَرَرْتُ بِأَحْمَدَ).' },
    ],
  },
  'nahwu-lesson-9': {
    lesson: { id: 'nahwu-lesson-9', title: '9. Tanda-tanda I\'rab Jazm', titleArabic: 'عَلَامَاتُ الجَزْمِ', xpReward: 35, chapterTitle: 'Bab 3: Tanda-tanda I\'rab', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَلِلْجَزْمِ عَلَامَتَانِ: اَلسُّكُونُ، وَالْحَذْفُ', text: 'Bagi Jazm ada 2 tanda: Sukun (utama) dan Al-Hadzfu (membuang).' },
      { id: 'c2', type: 'explanation', text: '1. Sukun pada: Fi\'il Mudhari\' Shahih Akhir (contoh: لَمْ يَضْرِبْ).\n2. Hadzfu (Membuang) terbagi 2:\n   - Membuang Huruf \'Illat pada Fi\'il Mudhari\' Mu\'tal Akhir (contoh: لَمْ يَدْعُ).\n   - Membuang Nun pada Af\'alul Khamsah (contoh: لَمْ يَفْعَلُوا).' },
    ],
  },
  'nahwu-lesson-10': {
    lesson: { id: 'nahwu-lesson-10', title: '10. Ringkasan Mu\'rabat (Harakat & Huruf)', titleArabic: 'فَصْلٌ الْمُعْرَبَاتُ', xpReward: 35, chapterTitle: 'Bab 3: Tanda-tanda I\'rab', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْمُعْرَبَاتُ قِسْمَانِ: قِسْمٌ يُعْرَبُ بِالْحَرَكَاتِ، وَقِسْمٌ يُعْرَبُ بِالْحُرُوفِ', text: 'Kata yang di-I\'rab terbagi 2 golongan: Golongan di-I\'rab dengan harakat dan golongan di-I\'rab dengan huruf.' },
      { id: 'c2', type: 'explanation', text: 'Di-I\'rab dengan Harakat:\n1. Isim Mufrad\n2. Jama\' Taksir\n3. Jama\' Muannats Salim\n4. Fi\'il Mudhari\' Shahih Akhir\n\nDi-I\'rab dengan Huruf:\n1. Isim Tatsniyah (Alif/Ya\')\n2. Jama\' Mudzakkar Salim (Waw/Ya\')\n3. Asma\'ul Khamsah (Waw/Alif/Ya\')\n4. Af\'alul Khamsah (Tetap Nun/Hadzfunnuun)' },
    ],
  },
  'nahwu-lesson-11': {
    lesson: { id: 'nahwu-lesson-11', title: '11. Pembagian Fi\'il (Madhi, Mudhari\', Amr)', titleArabic: 'بَابُ الْأَفْعَالِ', xpReward: 30, chapterTitle: 'Bab 4: Kaidah Fi\'il-Fi\'il', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْأَفْعَالُ ثَلَاثَةٌ: مَاضٍ، وَمُضَارِعٌ، وَأَمْرٌ، نَحْوُ: ضَرَبَ، وَيَضْرِبُ، وَاضْرِبْ', text: 'Fi\'il ada 3: Madhi (lampau), Mudhari\' (sekarang/akan datang), dan Amr (perintah). Contoh: Daraba, Yadribu, Idrib.' },
      { id: 'c2', type: 'explanation', text: 'Harakat dasar & Hukum:\n- Fi\'il Madhi: Selalu mabni Fathah.\n- Fi\'il Amr: Selalu mabni Sukun/Jazm.\n- Fi\'il Mudhari\': Diawali salah satu huruf zawaid (أَنَيْتَ - Alif, Nun, Ya, Ta) dan hukum asalnya selalu Marfu\' kecuali jika kemasukan Amil Nashab atau Amil Jazm.' },
    ],
  },
  'nahwu-lesson-12': {
    lesson: { id: 'nahwu-lesson-12', title: '12. Amil-amil Nashab (10 Huruf Nawashib)', titleArabic: 'نَوَاصِبُ الفِعْلِ المُضَارِعِ', xpReward: 35, chapterTitle: 'Bab 4: Kaidah Fi\'il-Fi\'il', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'فَالنَّوَاصِبُ عَشَرَةٌ: أَنْ، وَلَنْ، وَإِذَنْ، وَكَيْ، وَلَامُ كَيْ، وَلَامُ الْجُحُودِ، وَحَتَّى، وَالْجَوَابُ بِالْفَاءِ، وَالْوَاوِ، وَأَوْ', text: 'Amil Nashab yang menashabkan Fi\'il Mudhari\' ada 10: An, Lan, Idzan, Kai, Lam Kai, Lam Juhud, Hatta, Jawab bil-Fa\', Waw, dan Au.' },
      { id: 'c2', type: 'example', arabic: 'أُرِيدُ أَنْ أَتَعَلَّمَ | لَنْ يَنْجَحَ الْكَسْلَانُ', text: 'Contoh: "Uridu an ata\'allama" (Aku ingin belajar), "Lan yanjaha" (Tidak akan sukses pemalas).' },
    ],
  },
  'nahwu-lesson-13': {
    lesson: { id: 'nahwu-lesson-13', title: '13. Amil-amil Jazm (18 Huruf Jawazim)', titleArabic: 'جَوَازِمُ الفِعْلِ المُضَارِعِ', xpReward: 35, chapterTitle: 'Bab 4: Kaidah Fi\'il-Fi\'il', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَالْجَوَازِمُ ثَمَانِيَةَ عَشَرَ: لَمْ، وَلَمَّا، وَأَلَمْ... وَإِنْ، وَمَا، وَمَنْ، وَمَهْمَا...', text: 'Amil Jazm ada 18 yang menjazmkan 1 fi\'il (Lam, Lamma, Alam, Alamma, Lam Amar, La Nahyah) atau 2 fi\'il syarat & jawab (In, Ma, Man, Mahma, Idzma, Ayyun, Mata, Ayyana, Ayna, Anna, Haitsuma, Kaifama).' },
      { id: 'c2', type: 'example', arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ | إِنْ تَنْصُرُوا اللهَ يَنْصُرْكُمْ', text: 'Contoh amil jazm 1 fi\'il dan 2 fi\'il (syarat & jawab).' },
    ],
  },
  'nahwu-lesson-14': {
    lesson: { id: 'nahwu-lesson-14', title: '14. Bab Fa\'il (Zhahir & 12 Dhamir)', titleArabic: 'بَابُ الْفَاعِلِ', xpReward: 35, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْفَاعِلُ هُوَ الْاِسْمُ الْمَرْفُوعُ الْمَذْكُورُ قَبْلَهُ فِعْلُهُ', text: 'Fa\'il adalah Isim Marfu\' yang sebutkan kata kerja (Fi\'il) sebelum dirinya.' },
      { id: 'c2', type: 'explanation', text: 'Fa\'il terbagi 2 jenis:\n1. Fa\'il Zhahir (tampak jelas, contoh: قَامَ زَيْدٌ).\n2. Fa\'il Dhamir (kata ganti 12 bentuk: ضَرَبْتُ, ضَرَبْنَا, ضَرَبْتَ, ضَرَبْتِ, ضَرَبْتُمَا, ضَرَبْتُمْ, ضَرَبْتُنَّ, ضَرَبَ, ضَرَبَتْ, ضَرَبَا, ضَرَبُوا, ضَرَبْنَ).' },
    ],
  },
  'nahwu-lesson-15': {
    lesson: { id: 'nahwu-lesson-15', title: '15. Bab Na\'ibul Fa\'il (Formasi Pasif)', titleArabic: 'بَابُ نَائِبِ الْفَاعِلِ', xpReward: 35, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَهُوَ الْاِسْمُ الْمَرْفُوعُ الَّذِي لَمْ يُذْكَرْ مَعَهُ فَاعِلُهُ', text: 'Na\'ibul Fa\'il adalah Isim Marfu\' yang tidak disebutkan pelaku (Fa\'il)-nya dalam kalimat pasif.' },
      { id: 'c2', type: 'explanation', text: 'Perubahan Fi\'il Pasif:\n- Fi\'il Madhi: Didhammahkan awal dan dikasrahkan sebelum akhir (ضُرِبَ زَيْدٌ).\n- Fi\'il Mudhari\': Didhammahkan awal dan difathahkan sebelum akhir (يُضْرَبُ زَيْدٌ).' },
    ],
  },
  'nahwu-lesson-16': {
    lesson: { id: 'nahwu-lesson-16', title: '16. Bab Mubtada\' dan Khabar', titleArabic: 'بَابُ الْمُبْتَدَأِ وَالْخَبَرِ', xpReward: 35, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْمُبْتَدَأُ: هُوَ الْاِسْمُ الْمَرْفُوعُ الْعَارِي عَنِ الْعَوَامِلِ اللَّفْظِيَّةِ. وَالْخَبَرُ: هُوَ الْاِسْمُ الْمَرْفُوعُ الْمُسْنَدُ إِلَيْهِ', text: 'Mubtada\' adalah Isim Marfu\' yang bebas dari amil lafadz. Khabar adalah Isim Marfu\' yang disandarkan kepada Mubtada\'.' },
      { id: 'c2', type: 'explanation', text: 'Khabar terbagi 2:\n1. Khabar Mufrad (bukan berupa kalimat, contoh: زَيْدٌ قَائِمٌ).\n2. Khabar Ghairu Mufrad (4 jenis: Jar Majrur, Dharaf, Jumlah Fi\'liyyah, Jumlah Ismiyyah).' },
    ],
  },
  'nahwu-lesson-17': {
    lesson: { id: 'nahwu-lesson-17', title: '17. Bab Kaana dan Saudara-saudaranya', titleArabic: 'كَانَ وَأَخَوَاتُهَا', xpReward: 40, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'فَأَمَّا كَانَ وَأَخَوَاتُهَا فَإِنَّهَا تَرْفَعُ الاِسْمَ وَتَنْصِبُ الخَبَرَ', text: 'Kaana dan saudara-saudaranya merafa\'kan Mubtada\' (disebut Isim Kaana) dan menashabkan Khabar (disebut Khabar Kaana).' },
      { id: 'c2', type: 'explanation', text: 'Saudara Kaana: كَانَ, أَمْسَى, أَصْبَحَ, أَضْحَى, ظَلَّ, بَاتَ, صَارَ, لَيْسَ, مَا زَالَ, مَا انْفَكَّ, مَا فَتِئَ, مَا بَرِحَ, مَا دَامَ.' },
      { id: 'c3', type: 'example', arabic: 'كَانَ زَيْدٌ قَائِمًا | لَيْسَ عَمْرٌو شَاخِصًا', text: 'Contoh perubahan harakat khabar menjadi Fathah (Manshub).' },
    ],
  },
  'nahwu-lesson-18': {
    lesson: { id: 'nahwu-lesson-18', title: '18. Bab Inna dan Saudara-saudaranya', titleArabic: 'إِنَّ وَأَخَوَاتُهَا', xpReward: 40, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَأَمَّا إِنَّ وَأَخَوَاتُهَا فَإِنَّهَا تَنْصِبُ الاِسْمَ وَتَرْفَعُ الخَبَرَ', text: 'Inna dan saudara-saudaranya menashabkan Mubtada\' (disebut Isim Inna) dan merafa\'kan Khabar (disebut Khabar Inna).' },
      { id: 'c2', type: 'explanation', text: 'Saudara Inna: إِنَّ (Penegas), أَنَّ (Penegas), لَكِنَّ (Istidrak/Pertentangan), كَأَنَّ (Tasybih/Penyerupaan), لَيْتَ (Pengandaian), لَعَلَّ (Pengharapan).' },
      { id: 'c3', type: 'example', arabic: 'إِنَّ زَيْدًا قَائِمٌ | لَيْتَ الشَّبَابَ عَائِدٌ', text: 'Contoh perubahan harakat Isim Inna menjadi Fathah (Manshub).' },
    ],
  },
  'nahwu-lesson-19': {
    lesson: { id: 'nahwu-lesson-19', title: '19. Bab Dzhanantu dan Saudara-saudaranya', titleArabic: 'ظَنَنْتُ وَأَخَوَاتُهَا', xpReward: 40, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَأَمَّا ظَنَنْتُ وَأَخَوَاتُهَا فَإِنَّهَا تَنْصِبُ المُبْتَدَأَ وَالخَبَرَ عَلَى أَنَّهُمَا مَفْعُولَانِ لَهَا', text: 'Dzhanantu dan saudara-saudaranya menashabkan Mubtada\' dan Khabar sekaligus sebagai dua Objek (Maf\'ul).' },
      { id: 'c2', type: 'explanation', text: 'Saudara Dzhanantu: ظَنَنْتُ, حَسِبْتُ, خِلْتُ, زَعَمْتُ, رَأَيْتُ, عَلِمْتُ, وَجَدْتُ, اتَّخَذْتُ, جَعَلْتُ, سَمِعْتُ.' },
      { id: 'c3', type: 'example', arabic: 'ظَنَنْتُ زَيْدًا قَائِمًا | رَأَيْتُ عَمْرًا شَاخِصًا', text: 'Contoh 2 objek yang sama-sama dinashabkan.' },
    ],
  },
  'nahwu-lesson-20': {
    lesson: { id: 'nahwu-lesson-20', title: '20. Bab Na\'at & 5 Jenis Isim Ma\'rifat', titleArabic: 'بَابُ النَّعْتِ وَالمَعْرِفَةِ', xpReward: 40, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلنَّعْتُ: تَابِعٌ لِلْمَنْعُوتِ فِي رَفْعِهِ وَنَصْبِهِ وَخَفْضِهِ وَتَعْرِيفِهِ وَتَنْكِيرِهِ', text: 'Na\'at (Sifat) mengikuti kata yang disifati dalam Rafa\', Nashab, Jar, Ma\'rifat, dan Nakirah.' },
      { id: 'c2', type: 'explanation', text: '5 Jenis Isim Ma\'rifat (Kata Khusus):\n1. Isim Dhamir (Kata Ganti: أَنَا, أَنْتَ)\n2. Isim Alam (Nama: زَيْدٌ, مَكَّةُ)\n3. Isim Mubham / Isyarah (Kata Tunjuk: هَذَا, هَذِهِ, هَؤُلَاءِ)\n4. Isim kemasukan Alif-Lam (الرَّجُلُ, الْغُلَامُ)\n5. Isim yang di-idhafahkan kepada salah satu dari 4 jenis di atas.' },
    ],
  },
  'nahwu-lesson-21': {
    lesson: { id: 'nahwu-lesson-21', title: '21. Bab \'Athaf (10 Huruf \'Athaf)', titleArabic: 'بَابُ العَطْفِ', xpReward: 40, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَحُرُوفُ العَطْفِ عَشَرَةٌ: الوَاوُ، وَالفَاءُ، وَثُمَّ، وَأَوْ، وَأَمْ، وَإِمَّا، وَبَلْ، وَلَا، وَلَكِنْ، وَحَتَّى', text: 'Huruf \'Athaf (kata sambung) ada 10: Waw, Fa, Tsumma, Aw, Am, Imma, Bal, La, Laakin, Hatta.' },
      { id: 'c2', type: 'example', arabic: 'قَامَ زَيْدٌ وَعَمْرٌو | رَأَيْتُ زَيْدًا وَعَمْرًا | مَرَرْتُ بِزَيْدٍ وَعَمْرٍو', text: 'Kata sambung mengikuti I\'rab kata sebelumnya.' },
    ],
  },
  'nahwu-lesson-22': {
    lesson: { id: 'nahwu-lesson-22', title: '22. Bab Taukid (Penegas Lafadz)', titleArabic: 'بَابُ التَّوْكِيدِ', xpReward: 40, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْتَّوْكِيدُ: تَابِعٌ لِلْمُؤَكَّدِ فِي رَفْعِهِ وَنَصْبِهِ وَخَفْضِهِ وَتَعْرِيفِهِ', text: 'Taukid adalah penegas yang mengikuti kata yang ditegaskan dalam I\'rab dan Ma\'rifatnya.' },
      { id: 'c2', type: 'explanation', text: 'Lafadz Taukid tertentu: النَّفْس (diri), العَيْن (sendiri), كُلّ (seluruh), أَجْمَع (semua), dan pengikut ajma\' (أَكْتَع, أَبْتَع, أَبْصَع).' },
      { id: 'c3', type: 'example', arabic: 'قَامَ زَيْدٌ نَفْسُهُ | قَامَ الْقَوْمُ كُلُّهُمْ', text: 'Contoh: "Zaid berdiri sendiri", "Kaum berdiri seluruhnya".' },
    ],
  },
  'nahwu-lesson-23': {
    lesson: { id: 'nahwu-lesson-23', title: '23. Bab Badal (4 Jenis Badal)', titleArabic: 'بَابُ البَدَلِ', xpReward: 40, chapterTitle: 'Bab 5: Isim-Isim Yang Dirafa\'kan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'إِذَا أُبْدِلَ اسْمٌ مِنْ اسْمٍ أَوْ فِعْلٌ مِنْ فِعْلٍ تَبِعَهُ فِي جَمِيعِ إِعْرَابِهِ', text: 'Apabila Isim digantikan dengan Isim atau Fi\'il dengan Fi\'il, maka pengganti (Badal) mengikuti I\'rabnya.' },
      { id: 'c2', type: 'explanation', text: '4 Jenis Badal:\n1. Badal Kull min Kull (Badal Keseluruhan: قَامَ زَيْدٌ أَخُوكَ).\n2. Badal Ba\'dh min Kull (Badal Sebagian: أَكَلْتُ الرَّغِيفَ ثُلُثَهُ).\n3. Badal Isytimal (Badal Cakupan Makna: نَفَعَنِي زَيْدٌ عِلْمُهُ).\n4. Badal Ghalath (Badal Ralat/Kekeliruan: رَأَيْتُ زَيْدًا الْفَرَسَ).' },
    ],
  },
  'nahwu-lesson-24': {
    lesson: { id: 'nahwu-lesson-24', title: '24. Bab Maf\'ul Bih (Zhahir & Dhamir)', titleArabic: 'بَابُ المَفْعُولِ بِهِ', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْمَفْعُولُ بِهِ: هُوَ الْاِسْمُ الْمَنْصُوبُ الَّذِي يَقَعُ بِهِ الْفِعْلُ', text: 'Maf\'ul Bih adalah Isim Manshub yang dikenai suatu perbuatan (objek).' },
      { id: 'c2', type: 'explanation', text: 'Pembagian Maf\'ul Bih:\n1. Zhahir (tampak jelas: رَكِبْتُ الْفَرَسَ).\n2. Dhamir Muttashil (12 kata ganti bersambung: ضَرَبَنِي, ضَرَبَنَا, ضَرَبَكَ...).\n3. Dhamir Munfashil (12 kata ganti terpisah: إِيَّايَ, إِيَّانَا, إِيَّاكَ, إِيَّاهُ...).' },
    ],
  },
  'nahwu-lesson-25': {
    lesson: { id: 'nahwu-lesson-25', title: '25. Bab Mashdar / Maf\'ul Mutlaq', titleArabic: 'بَابُ المَصْدَرِ', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْمَصْدَرُ: هُوَ الْاِسْمُ الْمَنْصُوبُ الَّذِي يَجِيءُ ثَالِثًا فِي تَصْرِيفِ الْفِعْلِ', text: 'Mashdar adalah Isim Manshub urutan ketiga dalam Tashrif Fi\'il (ضَرَبَ - يَضْرِبُ - ضَرْبًا).' },
      { id: 'c2', type: 'explanation', text: 'Pembagian Mashdar:\n1. Lafdzhy (lafadz mashdar sama persis dengan fi\'ilnya: قَتَلْتُهُ قَتْلًا).\n2. Ma\'nawy (lafadz mashdar berbeda namun maknanya sama: جَلَسْتُ قُعُودًا).' },
    ],
  },
  'nahwu-lesson-26': {
    lesson: { id: 'nahwu-lesson-26', title: '26. Bab Dharaf Zaman & Dharaf Makan', titleArabic: 'ظَرْفُ الزَّمَانِ وَظَرْفُ المَكَانِ', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'explanation', text: '1. Dharaf Zaman (Keterangan Waktu): Isim zaman yang dinashabkan bermakna فِي (pada). Contoh: الْيَوْمَ (hari ini), اللَّيْلَةَ (malam ini), غَدْوَةً (pagi hari), صَبَاحًا (pagi), مَسَاءً (petang).\n2. Dharaf Makan (Keterangan Tempat): Isim makan yang dinashabkan bermakna فِي (di/pada). Contoh: أَمَامَ (di depan), خَلْفَ (di belakang), قُدَّامَ (di depan), وَرَاءَ (di belakang), فَوْقَ (di atas), تَحْتَ (di bawah).' },
    ],
  },
  'nahwu-lesson-27': {
    lesson: { id: 'nahwu-lesson-27', title: '27. Bab Hal & Syarat-syaratnya', titleArabic: 'بَابُ الحَالِ', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْحَالُ: هُوَ الْاِسْمُ الْمَنْصُوبُ الْمُفَسِّرُ لِمَا انْبَهَمَ مِنَ الْهَيْئَاتِ', text: 'Hal adalah Isim Manshub penjelas tata cara/keadaan yang sebelumnya samar.' },
      { id: 'c2', type: 'example', arabic: 'جَاءَ زَيْدٌ رَاكِبًا | رَكِبْتُ الْفَرَسَ مُسْرَجًا', text: 'Contoh: "Zaid datang dalam keadaan berkuda", "Aku menunggangi kuda dalam keadaan terpelana".' },
      { id: 'c3', type: 'explanation', text: 'Syarat Hal: Wajib berupa Isim Nakirah dan hanya terjadi setelah kalimat sempurna (Kalam Taam). Shahibul Hal (pemilik keadaan) wajib berupa Isim Ma\'rifat.' },
    ],
  },
  'nahwu-lesson-28': {
    lesson: { id: 'nahwu-lesson-28', title: '28. Bab Tamyiz & Syarat-syaratnya', titleArabic: 'بَابُ التَّمْيِيزِ', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلتَّمْيِيزُ: هُوَ الْاِسْمُ الْمَنْصُوبُ الْمُفَسِّرُ لِمَا انْبَهَمَ مِنَ الذَّوَاتِ', text: 'Tamyiz adalah Isim Manshub penjelas dzat/benda yang sebelumnya samar.' },
      { id: 'c2', type: 'example', arabic: 'تَصَبَّبَ زَيْدٌ عَرَقًا | وَاشْتَرَيْتُ عِشْرِينَ غُلَامًا', text: 'Contoh: "Zaid bercucuran keringatnya", "Aku membeli 20 anak laki-laki".' },
      { id: 'c3', type: 'explanation', text: 'Syarat Tamyiz: Wajib berupa Isim Nakirah dan terjadi setelah kalimat sempurna.' },
    ],
  },
  'nahwu-lesson-29': {
    lesson: { id: 'nahwu-lesson-29', title: '29. Bab Istitsna (8 Huruf Pengecualian)', titleArabic: 'بَابُ الاِسْتِثْنَاءِ', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَحُرُوفُ الاِسْتِثْنَاءِ ثَمَانِيَةٌ: إِلَّا، وَغَيْرُ، وَسِوَى، وَسُوَى، وَسَوَاءٌ، وَخَلَا، وَعَدَا، وَحَاشَا', text: 'Huruf Istitsna ada 8: Illa, Ghairu, Siwa, Suwa, Sawa\', Khala, \'Ada, Hasya.' },
      { id: 'c2', type: 'explanation', text: 'Hukum Mustatsna dengan ILLAA:\n1. Kalam Taam Mujab (Positif Sempurna): Wajib Manshub (قَامَ الْقَوْمُ إِلَّا زَيْدًا).\n2. Kalam Taam Manfiy (Negatif Sempurna): Boleh jadi Badal atau Manshub (مَا قَامَ الْقَوْمُ إِلَّا زَيْدٌ / إِلَّا زَيْدًا).\n3. Kalam Naaqish (Negatif Kurang): Disesuaikan amil (مَا قَامَ إِلَّا زَيْدٌ).' },
    ],
  },
  'nahwu-lesson-30': {
    lesson: { id: 'nahwu-lesson-30', title: '30. Bab Laa Naafiyah lil Jinsi', titleArabic: 'بَابُ لَا', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اِعْلَمْ أَنَّ "لَا" تَنْصِبُ النَّكِرَاتِ بِغَيْرِ تَنْوِينٍ إِذَا بَاشَرَتِ النَّكِرَةَ', text: 'Ketahuilah bahwa "Laa" menashabkan Isim Nakirah tanpa tanwin apabila bertemu langsung.' },
      { id: 'c2', type: 'example', arabic: 'لَا رَجُلَ فِي الدَّارِ', text: 'Contoh: "Tidak ada seorang laki-laki pun di dalam rumah".' },
    ],
  },
  'nahwu-lesson-31': {
    lesson: { id: 'nahwu-lesson-31', title: '31. Bab Munada (5 Jenis Panggilan)', titleArabic: 'بَابُ المُنَادَى', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْمُنَادَى خَمْسَةُ أَنْوَاعٍ: اَلْمُفْرَدُ الْعَلَمُ، وَالنَّكِرَةُ الْمَقْصُودَةُ... وَالْمُضَافُ', text: 'Munada (yang dipanggil) ada 5 jenis: Mufrad \'Alam, Nakirah Maqsudah, Nakirah Ghairu Maqsudah, Mudhaf, dan Syabih bil Mudhaf.' },
      { id: 'c2', type: 'explanation', text: 'Hukum:\n- Mufrad \'Alam & Nakirah Maqsudah: Mabni Dhammah (يَا زَيْدُ, يَا رَجُلُ).\n- 3 sisanya (Nakirah Ghairu Maqsudah, Mudhaf, Syabih bil Mudhaf): Wajib Manshub (يَا عَبْدَ اللهِ).' },
    ],
  },
  'nahwu-lesson-32': {
    lesson: { id: 'nahwu-lesson-32', title: '32. Bab Maf\'ul min Ajlih (Sebab Perbuatan)', titleArabic: 'بَابُ المَفْعُولِ مِنْ أَجْلِهِ', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَهُوَ الْاِسْمُ الْمَنْصُوبُ الَّذِي يُذْكَرُ بَيَانًا لِسَبَبِ وُقُوعِ الْفِعْلِ', text: 'Maf\'ul min Ajlih adalah Isim Manshub penjelas alasan/sebab terjadinya perbuatan.' },
      { id: 'c2', type: 'example', arabic: 'قَامَ زَيْدٌ إِجْلَالًا لِعَمْرٍو | وَقَصَدْتُكَ ابْتِغَاءَ مَعْرُوفِكَ', text: 'Contoh: "Zaid berdiri karena menghormati \'Amr", "Aku menujumu karena mengharap kebaikanmu".' },
    ],
  },
  'nahwu-lesson-33': {
    lesson: { id: 'nahwu-lesson-33', title: '33. Bab Maf\'ul Ma\'ah (Penyerta Perbuatan)', titleArabic: 'بَابُ المَفْعُولِ مَعَهُ', xpReward: 40, chapterTitle: 'Bab 6: Isim-Isim Yang Dinashabkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'وَهُوَ الْاِسْمُ الْمَنْصُوبُ الَّذِي يُذْكَرُ لِبَيَانِ مَنْ فُعِلَ مَعَهُ الْفِعْلُ', text: 'Maf\'ul Ma\'ah adalah Isim Manshub penjelas pihak yang menyertai perbuatan setelah Waw Ma\'iyyah (وَـ).' },
      { id: 'c2', type: 'example', arabic: 'جَاءَ الْأَمِيرُ وَالْجَيْشَ | وَاسْتَوَى الْمَاءُ وَالْخَشَبَةَ', text: 'Contoh: "Pemimpin datang bersama pasukan", "Air sejajar bersama kayu pengukuran".' },
    ],
  },
  'nahwu-lesson-34': {
    lesson: { id: 'nahwu-lesson-34', title: '34. Isim Yang Dijarkan (Huruf Jar & Idhafah)', titleArabic: 'بَابُ مَخْفُوضَاتِ الْأَسْمَاءِ', xpReward: 45, chapterTitle: 'Bab 7: Isim-Isim Yang Dijarkan', category: 'nahwu' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'اَلْمَخْفُوضَاتُ ثَلَاثَةُ أَنْوَاعٍ: مَخْفُوضٌ بِالْحَرْفِ، وَمَخْفُوضٌ بِالْإِضَافَةِ، وَتَابِعٌ لِلْمَخْفُوضِ', text: 'Isim yang dijarkan ada 3 jenis: Dijarkan dengan Huruf Jar, Dijarkan dengan Idhafah, dan Pengikut kata yang majrur.' },
      { id: 'c2', type: 'explanation', text: 'Idhafah terbagi 2 makna:\n1. Taqdir Lam (makna milik/untuk, contoh: غُلَامُ زَيْدٍ -> Anak milik Zaid).\n2. Taqdir Min (makna bahan dasar, contoh: ثَوْبُ خَزٍّ -> Pakaian dari sutra, خَاتَمُ حَدِيدٍ -> Cincin dari besi).' },
    ],
  },
  'shorof-lesson-1': {
    lesson: { id: 'shorof-lesson-1', title: '1. Bab 1: Wazan فَعَلَ - يَفْعُلُ (نَصَرَ - يَنْصُرُ)', titleArabic: 'فَعَلَ - يَفْعُلُ', xpReward: 30, chapterTitle: 'Bab 1: Tashrif Tsulatsi Mujarrad', category: 'shorof' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'نَصَرَ - يَنْصُرُ - نَصْرًا - فَهُوَ نَاصِرٌ - وَذَاكَ مَنْصُورٌ - اُنْصُرْ - لَا تَنْصُرْ', text: 'Wazan Bab Pertama Shorof: Nasara - Yansuru - Nasran - Naasirun - Mansoorun - Unsur - Laa Tansur.' },
    ],
  },
  'shorof-lesson-2': {
    lesson: { id: 'shorof-lesson-2', title: '2. Bab 2: Wazan فَعَلَ - يَفْعِلُ (ضَرَبَ - يَضْرِبُ)', titleArabic: 'فَعَلَ - يَفْعِلُ', xpReward: 30, chapterTitle: 'Bab 1: Tashrif Tsulatsi Mujarrad', category: 'shorof' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'ضَرَبَ - يَضْرِبُ - ضَرْبًا - فَهُوَ ضَارِبٌ - وَذَاكَ مَضْرُوبٌ - اِضْرِبْ - لَا تَضْرِبْ', text: 'Wazan Bab Kedua Shorof: Daraba - Yadribu.' },
    ],
  },
  'shorof-lesson-3': {
    lesson: { id: 'shorof-lesson-3', title: '3. Bab 3: Wazan فَعَلَ - يَفْعَلُ (فَتَحَ - يَفْتَحُ)', titleArabic: 'فَعَلَ - يَفْعَلُ', xpReward: 30, chapterTitle: 'Bab 1: Tashrif Tsulatsi Mujarrad', category: 'shorof' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'فَتَحَ - يَفْتَحُ - فَتْحًا - فَهُوَ فَاتِحٌ - وَذَاكَ مَفْتُوحٌ - اِفْتَحْ', text: 'Wazan Bab Ketiga Shorof: Fataha - Yaftahu.' },
    ],
  },
  'shorof-lesson-4': {
    lesson: { id: 'shorof-lesson-4', title: '4. Bab 4: Wazan فَعِلَ - يَفْعَلُ (عَلِمَ - يَعْلَمُ)', titleArabic: 'فَعِلَ - يَفْعَلُ', xpReward: 30, chapterTitle: 'Bab 1: Tashrif Tsulatsi Mujarrad', category: 'shorof' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'عَلِمَ - يَعْلَمُ - عِلْمًا - فَهُوَ عَالِمٌ - وَذَاكَ مَعْلُومٌ - اِعْلَمْ', text: 'Wazan Bab Keempat Shorof: \'Alima - Ya\'lamu.' },
    ],
  },
  'shorof-lesson-5': {
    lesson: { id: 'shorof-lesson-5', title: '5. Bab 5: Wazan فَعُلَ - يَفْعُلُ (حَسُنَ - يَحْسُنُ)', titleArabic: 'فَعُلَ - يَفْعُلُ', xpReward: 30, chapterTitle: 'Bab 1: Tashrif Tsulatsi Mujarrad', category: 'shorof' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'حَسُنَ - يَحْسُنُ - حُسْنًا - فَهُوَ حَسَنٌ - اُحْسُنْ', text: 'Wazan Bab Kelima Shorof.' },
    ],
  },
  'shorof-lesson-6': {
    lesson: { id: 'shorof-lesson-6', title: '6. Bab 6: Wazan فَعِلَ - يَفْعِلُ (حَسِبَ - يَحْسِبُ)', titleArabic: 'فَعِلَ - يَفْعِلُ', xpReward: 30, chapterTitle: 'Bab 1: Tashrif Tsulatsi Mujarrad', category: 'shorof' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'حَسِبَ - يَحْسِبُ - حِسْبَانًا - فَهُوَ حَاسِبٌ - وَذَاكَ مَحْسُوبٌ', text: 'Wazan Bab Keenam Shorof.' },
    ],
  },
  'shorof-lesson-7': {
    lesson: { id: 'shorof-lesson-7', title: '7. Tsulatsi Mazid 1 Huruf (أَفْعَلَ, فَعَّلَ, فَاعَلَ)', titleArabic: 'الثلاثي المزيد بحرف', xpReward: 35, chapterTitle: 'Bab 2: Tashrif Tsulatsi Mazid', category: 'shorof' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'أَكْرَمَ - يُكْرِمُ | كَبَّرَ - يُكَبِّرُ | قَاتَلَ - يُقَاتِلُ', text: 'Tashrif kata kerja 3 huruf dengan tambahan 1 huruf (Hamzah, Tasydid, Alif).' },
    ],
  },
  'shorof-lesson-8': {
    lesson: { id: 'shorof-lesson-8', title: '8. Tsulatsi Mazid 2 & 3 Huruf (إِسْتَفْعَلَ dll)', titleArabic: 'الثلاثي المزيد بحرفين وثلاثة', xpReward: 40, chapterTitle: 'Bab 2: Tashrif Tsulatsi Mazid', category: 'shorof' },
    contents: [
      { id: 'c1', type: 'arabic_text', arabic: 'إِسْتَغْفَرَ - يَسْتَغْفِرُ - إِسْتِغْفَارًا', text: 'Tashrif kata kerja 3 huruf dengan tambahan 3 huruf (Istaghfara = Memohon ampunan).' },
    ],
  },
};

export async function fetchCourseChapters(courseCategory: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch course
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: course } = await (supabase.from('courses') as any)
      .select('id, title, category, description, level')
      .eq('category', courseCategory)
      .single();

    if (!course) {
      return FALLBACK_COURSES[courseCategory] || { course: null, chapters: [] };
    }

    // Fetch chapters & lessons
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: chaptersData } = await (supabase.from('chapters') as any)
      .select('id, title, description, order_index, lessons(id, title, title_arabic, order_index)')
      .eq('course_id', course.id)
      .order('order_index', { ascending: true });

    if (!chaptersData || chaptersData.length === 0) {
      return FALLBACK_COURSES[courseCategory] || { course: null, chapters: [] };
    }

    let completedLessonIds: string[] = [];
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: progress } = await (supabase.from('user_progress') as any)
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('status', 'completed');
      completedLessonIds = progress?.map((p: { lesson_id: string }) => p.lesson_id) || [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chapters: ChapterDetail[] = (chaptersData || []).map((ch: any) => ({
      id: ch.id,
      title: ch.title,
      description: ch.description,
      orderIndex: ch.order_index,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lessons: (ch.lessons || []).map((l: any) => ({
        id: l.id,
        title: l.title,
        titleArabic: l.title_arabic,
        orderIndex: l.order_index,
        isCompleted: completedLessonIds.includes(l.id),
      })),
    }));

    return { course: course as CourseDetail, chapters };
  } catch (err) {
    console.error("fetchCourseChapters error:", err);
    return FALLBACK_COURSES[courseCategory] || { course: null, chapters: [] };
  }
}

export async function fetchLessonDetail(lessonId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: lesson } = await (supabase.from('lessons') as any)
      .select('id, chapter_id, title, title_arabic, xp_reward, chapters(title, courses(category))')
      .eq('id', lessonId)
      .single();

    if (!lesson) {
      const fallback = FALLBACK_LESSONS[lessonId];
      if (fallback) {
        return {
          lesson: fallback.lesson,
          contents: fallback.contents,
          isCompletedInitial: false,
        };
      }
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: contents } = await (supabase.from('lesson_contents') as any)
      .select('id, content_type, content_text, content_arabic, audio(audio_url)')
      .eq('lesson_id', lessonId)
      .order('order_index', { ascending: true });

    let isCompletedInitial = false;
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: prog } = await (supabase.from('user_progress') as any)
        .select('status')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .eq('status', 'completed')
        .single();
      if (prog) isCompletedInitial = true;
    }

    return {
      lesson: {
        id: lesson.id,
        title: lesson.title,
        titleArabic: lesson.title_arabic,
        xpReward: lesson.xp_reward,
        chapterTitle: lesson.chapters?.title,
        category: lesson.chapters?.courses?.category,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contents: (contents || []).map((c: any) => ({
        id: c.id,
        type: c.content_type,
        text: c.content_text,
        arabic: c.content_arabic,
        audioUrl: c.audio?.audio_url ? AudioService.getStoragePublicUrl(c.audio.audio_url) : undefined,
      })),
      isCompletedInitial,
    };
  } catch (err) {
    console.error("fetchLessonDetail error:", err);
    const fallback = FALLBACK_LESSONS[lessonId];
    if (fallback) {
      return {
        lesson: fallback.lesson,
        contents: fallback.contents,
        isCompletedInitial: false,
      };
    }
    return null;
  }
}
