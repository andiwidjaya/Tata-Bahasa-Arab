-- ============================================================================
-- SEED DATA UNTUK TESTING NAHWU & SHOROF ACADEMY (VALID UUID v4)
-- ============================================================================

-- 1. Courses
INSERT INTO courses (id, title, category, description, level, order_index) VALUES
('11111111-1111-4111-8111-111111111111', 'Nahwu Dasar (Pengenalan Kalimah & I''rab)', 'nahwu', 'Pelajari pondasi dasar struktur kalimat Bahasa Arab, Al-Kalimah, dan Al-Kalam.', 1, 1),
('22222222-2222-4222-8222-222222222222', 'Shorof Dasar (Tashrif Tsulatsi Mujarrad)', 'shorof', 'Kuasai pola perubahan kata kerja dasar 6 bab Tashrif Tsulatsi Mujarrad.', 1, 1);

-- 2. Chapters
INSERT INTO chapters (id, course_id, title, description, order_index) VALUES
('33333333-3333-4333-8333-333333333333', '11111111-1111-4111-8111-111111111111', 'Bab 1: Pengenalan Al-Kalimah', 'Memahami Isim, Fi''il, dan Harf beserta ciri-cirinya.', 1),
('44444444-4444-4444-8444-444444444444', '22222222-2222-4222-8222-222222222222', 'Bab 1: Wazan Tashrif Bab Pertama', 'Memahami pola فَعَلَ - يَفْعُلُ dan variasi bentukannya.', 1);

-- 3. Audio Seed
INSERT INTO audio (id, title, audio_url, duration_seconds) VALUES
('55555555-5555-4555-8555-555555555555', 'Pelafalan Al-Kalimah', 'https://example.com/audio/alkalimah.mp3', 5),
('66666666-6666-4666-8666-666666666666', 'Tashrif Nasara Yansuru', 'https://example.com/audio/nasara.mp3', 8);

-- 4. Lessons
INSERT INTO lessons (id, chapter_id, title, title_arabic, xp_reward, order_index) VALUES
('77777777-7777-4777-8777-777777777777', '33333333-3333-4333-8333-333333333333', 'Pengenalan Al-Kalimah', 'الكَلِمَةُ', 25, 1),
('88888888-8888-4888-8888-888888888888', '44444444-4444-4444-8444-444444444444', 'Tashrif Nasara - Yansuru', 'نَصَرَ - يَنْصُرُ', 30, 1);

-- 5. Lesson Contents
INSERT INTO lesson_contents (lesson_id, content_type, content_text, content_arabic, audio_id, order_index) VALUES
('77777777-7777-4777-8777-777777777777', 'text', 'Al-Kalimah adalah lafaz yang memiliki arti tunggal.', 'الكَلِمَةُ هِيَ اللَّفْظُ الْمُفْرَدُ', '55555555-5555-4555-8555-555555555555', 1),
('77777777-7777-4777-8777-777777777777', 'example', 'Contoh Isim (Kata Benda): Kitab (Buku).', 'كِتَابٌ', NULL, 2),
('88888888-8888-4888-8888-888888888888', 'arabic_text', 'Tashrif Fi''il Madhi & Mudhari:', 'نَصَرَ - يَنْصُرُ - نَصْرًا', '66666666-6666-4666-8666-666666666666', 1);

-- 6. Questions
INSERT INTO questions (id, lesson_id, type, question_text, question_arabic, explanation, points) VALUES
('99999999-9999-4999-8999-999999999999', '77777777-7777-4777-8777-777777777777', 'multiple_choice', 'Manakah di bawah ini yang merupakan jenis Isim (Kata Benda)?', 'أَيُّ هَذِهِ الكَلِمَاتِ اِسْمٌ؟', 'Zaidun (زَيْدٌ) adalah nama orang, sehingga termasuk kategori Isim.', 10),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '77777777-7777-4777-8777-777777777777', 'true_false', 'Apakah "Fi''il" (فِعْلٌ) menunjukkan kata yang terikat dengan waktu (lampau, sekarang, atau akan datang)?', 'هَلِ الفِعْلُ يَدُلُّ عَلَى زَمَنٍ؟', 'Benar, Fi''il adalah kata kerja yang terikat dengan dimensi waktu.', 10),
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '88888888-8888-4888-8888-888888888888', 'tashrif', 'Tentukan fi''il mudhari dari kata kerja نَصَرَ!', 'مَا هُوَ الفِعْلُ المُضَارِعُ مِنْ "نَصَرَ"؟', 'Fi''il mudhari dari nasara adalah yansuru (يَنْصُرُ).', 15);

-- 7. Question Options
INSERT INTO question_options (question_id, option_text, option_arabic, is_correct, order_index) VALUES
('99999999-9999-4999-8999-999999999999', 'Zaidun (Orang)', 'زَيْدٌ', true, 1),
('99999999-9999-4999-8999-999999999999', 'Kataba (Menulis)', 'كَتَبَ', false, 2),
('99999999-9999-4999-8999-999999999999', 'Min (Dari)', 'مِنْ', false, 3),

('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Benar', 'صَحِيْحٌ', true, 1),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Salah', 'خَطَأٌ', false, 2),

('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Yansuru', 'يَنْصُرُ', true, 1),
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Yansiru', 'يَنْصِرُ', false, 2),
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Yansaru', 'يَنْصَرُ', false, 3);

-- 8. Quizzes
INSERT INTO quizzes (id, lesson_id, title, description, passing_score, xp_reward) VALUES
('cccccccc-cccc-4ccc-8ccc-cccccccccccc', '77777777-7777-4777-8777-777777777777', 'Kuis Dasar Al-Kalimah', 'Uji pemahaman Isim, Fi''il, dan Harf', 70, 50);

-- 9. Quiz Questions
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
('cccccccc-cccc-4ccc-8ccc-cccccccccccc', '99999999-9999-4999-8999-999999999999', 1),
('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 2);

-- 10. Achievements
INSERT INTO achievements (code, title, description, xp_bonus) VALUES
('FIRST_LESSON', 'Langkah Pertama', 'Menyelesaikan pelajaran Bahasa Arab pertama Anda', 50),
('STREAK_7_DAYS', 'Pencari Ilmu Istiqomah', 'Mempertahankan streak belajar selama 7 hari berturut-turut', 100),
('NAHWU_LEVEL_1', 'Master Nahwu Pemula', 'Menyelesaikan seluruh bab Nahwu Level 1', 150);
