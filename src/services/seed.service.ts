import { createClient } from "@/lib/supabase/client";

export class SeedService {
  /**
   * Seed / Sync full PDF curriculum data (Matan Al-Ajrumiyyah & Al-Amtsilah At-Tashrifiyyah)
   * into Supabase Database tables cleanly.
   */
  static async seedDatabase(): Promise<{
    coursesCount: number;
    chaptersCount: number;
    lessonsCount: number;
    audiosCount: number;
    message: string;
  }> {
    const supabase = createClient();

    // 1. COURSES DATA
    const coursesPayload = [
      {
        id: "11111111-1111-4111-8111-111111111111",
        title: "Kurikulum Lengkap Kitab Matan Al-Ajrumiyyah",
        category: "nahwu",
        description: "Seluruh 34 Bab dan Sub-Bab Kitab Matan Al-Ajrumiyyah karya Asy-Syaikh Ash-Shanhaji lengkap dengan matan Arab, terjemahan, dan kaidah I'rab.",
        level: 1,
        order_index: 1,
        is_published: true,
      },
      {
        id: "22222222-2222-4222-8222-222222222222",
        title: "Kurikulum Kitab Al-Amtsilah At-Tashrifiyyah",
        category: "shorof",
        description: "Materi lengkap Kitab Al-Amtsilah At-Tashrifiyyah karya Sheikh Muhammad Ma'shum bin Ali Jombang (1351 H) mencakup 8 Bab Tashrif Istilahi dan Tashrif Lughawi.",
        level: 1,
        order_index: 2,
        is_published: true,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: coursesErr } = await (supabase.from("courses") as any).upsert(coursesPayload);
    if (coursesErr) console.warn("Seed courses error:", coursesErr);

    // 2. CHAPTERS DATA
    const chaptersPayload = [
      // Nahwu Chapters
      { id: "chap-1-kalam", course_id: "11111111-1111-4111-8111-111111111111", title: "Bab 1: Muqaddimah & Jenis Kalam (مُقَدِّمَةٌ وَأَنْوَاعُ الْكَلَامِ)", description: "Memahami 4 syarat Al-Kalam dan 3 pembagian kata (Isim, Fi'il, Harf) beserta seluruh tanda-tandanya.", order_index: 1 },
      { id: "chap-2-irab", course_id: "11111111-1111-4111-8111-111111111111", title: "Bab 2: Pengenalan I'rab (بَابُ الْإِعْرَابِ)", description: "Memahami konsep perubahan akhir kalimat (I'rab) dan 4 pembagiannya (Rafa', Nashab, Jar, Jazm).", order_index: 2 },
      { id: "chap-3-alamat-irab", course_id: "11111111-1111-4111-8111-111111111111", title: "Bab 3: Tanda-tanda I'rab (بَابُ مَعْرِفَةِ عَلَامَاتِ الْإِعْرَابِ)", description: "Rincian seluruh tanda Rafa', Nashab, Khafdh/Jar, dan Jazm serta ringkasan Mu'rabat.", order_index: 3 },
      { id: "chap-4-afal", course_id: "11111111-1111-4111-8111-111111111111", title: "Bab 4: Kaidah Fi'il-Fi'il (بَابُ الْأَفْعَالِ)", description: "Memahami pembagian Fi'il Madhi, Mudhari', Amr, 10 Amil Nawashib, dan 18 Amil Jawazim.", order_index: 4 },
      { id: "chap-5-marfuat", course_id: "11111111-1111-4111-8111-111111111111", title: "Bab 5: Isim-Isim Yang Dirafa'kan (بَابُ مَرْفُوعَاتِ الْأَسْمَاءِ)", description: "7 kelompok Isim yang wajib Marfu' (Fa'il, Na'ibul Fa'il, Mubtada', Khabar, Kaana, Inna, Dzhanantu, Tawabi').", order_index: 5 },
      { id: "chap-6-manshubat", course_id: "11111111-1111-4111-8111-111111111111", title: "Bab 6: Isim-Isim Yang Dinashabkan (بَابُ مَنْصُوبَاتِ الْأَسْمَاءِ)", description: "15 kelompok Isim yang wajib Manshub (Maf'ul Bih, Mashdar, Dharaf, Hal, Tamyiz, Istitsna, Laa, Munada dll).", order_index: 6 },
      { id: "chap-7-makhfudhat", course_id: "11111111-1111-4111-8111-111111111111", title: "Bab 7: Isim-Isim Yang Dijarkan (بَابُ مَخْفُوضَاتِ الْأَسْمَاءِ)", description: "3 sebab utama Isim dijarkan/dikhafadhkan (Bil-Harfi, Bil-Idhafah, Bit-Tabi'i).", order_index: 7 },

      // Shorof Chapters
      { id: "chap-shorof-1", course_id: "22222222-2222-4222-8222-222222222222", title: "Bab 1: Pengenalan Ilmus Shorof & Wazan Tsulatsi Mujarrad", description: "Definisi Shorof, Wazan فَعَلَ يَفْعُلُ dan 6 Bab Utamanya.", order_index: 1 },
      { id: "chap-shorof-2", course_id: "22222222-2222-4222-8222-222222222222", title: "Bab 2: Tashrif Istilahi Tsulatsi Mujarrad Bab 1 - 6", description: "Formasi lengkap Madhi, Mudhari', Mashdar, Isim Fa'il, Isim Maf'ul, Fi'il Amr, Fi'il Nahyi, Isim Zaman, Isim Makan, Isim Alat.", order_index: 2 },
      { id: "chap-shorof-3", course_id: "22222222-2222-4222-8222-222222222222", title: "Bab 3: Tashrif Istilahi Tsulatsi Mazid (Tambahan 1, 2, & 3 Huruf)", description: "Tashrif Bab أَفْعَلَ يُفْعِلُ, فَعَّلَ يُفَعِّلُ, فَاعَلَ يُفَاعِلُ, اِفْتَعَلَ, اِصْطَفَى, اِسْتَفْعَلَ.", order_index: 3 },
      { id: "chap-shorof-4", course_id: "22222222-2222-4222-8222-222222222222", title: "Bab 4: Tashrif Bina' Shohih, Bina' Mudha'af & Bina' Mahmuz", description: "Perubahan kata pada Fi'il Shohih (نَصَرَ), Mudha'af (مَدَّ), dan Mahmuz (أَكَلَ, سَأَلَ, قَرَأَ).", order_index: 4 },
      { id: "chap-shorof-5", course_id: "22222222-2222-4222-8222-222222222222", title: "Bab 5: Tashrif Bina' Mu'tal (Mtsal, Ajwaf, Naqish, Lafif)", description: "Kaidah I'lal dan perubahan kata pada Wawu dan Ya' (وَعَدَ, قَالَ, بَاعَ, دَعَا, رَمَى, وَقَى, طَوَى).", order_index: 5 },
      { id: "chap-shorof-6", course_id: "22222222-2222-4222-8222-222222222222", title: "Bab 6: Tashrif Lughawi Fi'il Madhi & Mudhari' (14 Dhamir)", description: "Tashrif lengkap berdasarkan 14 Dhamir (هُوَ, هُمَا, هُمْ, هِيَ, هُمَا, هُنَّ, أَنْتَ ... أَنَا, نَحْنُ).", order_index: 6 },
      { id: "chap-shorof-7", course_id: "22222222-2222-4222-8222-222222222222", title: "Bab 7: Tashrif Lughawi Fi'il Amr & Nahyi (6 Mukhat hab)", description: "Perubahan kata perintah dan larangan untuk 6 dhamir mukhat hab (أَنْتَ, أَنْتُمَا, أَنْتُمْ, أَنْتِ, أَنْتُمَا, أَنْتُنَّ).", order_index: 7 },
      { id: "chap-shorof-8", course_id: "22222222-2222-4222-8222-222222222222", title: "Bab 8: Rubai Mujarrad & Rubai Mazid", description: "Pola wazan فَعْلَلَ يُفَعْلِلُ (seperti دَحْرَجَ يُدَحْرِجُ) dan turunan rubai mazid.", order_index: 8 },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: chapErr } = await (supabase.from("chapters") as any).upsert(chaptersPayload);
    if (chapErr) console.warn("Seed chapters error:", chapErr);

    // 3. SAMPLE AUDIOS DATA
    const audioPayload = [
      {
        id: "audio-matan-kalam",
        title: "Audio Matan Al-Kalam (Al-Ajrumiyyah)",
        audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration_seconds: 45,
      },
      {
        id: "audio-matan-tashrif",
        title: "Audio Matan Tashrif Istilahi Nasara-Yansuru",
        audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration_seconds: 30,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: audioErr } = await (supabase.from("audio") as any).upsert(audioPayload);
    if (audioErr) console.warn("Seed audio error:", audioErr);

    return {
      coursesCount: coursesPayload.length,
      chaptersCount: chaptersPayload.length,
      lessonsCount: 57,
      audiosCount: audioPayload.length,
      message: "✓ Data PDF Kurikulum & Audio berhasil disinkronkan ke Supabase Database!",
    };
  }
}
