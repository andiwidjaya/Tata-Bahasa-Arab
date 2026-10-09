import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { TashrifRaceGame } from "@/components/games/tashrif-race-game";
import { Question } from "@/types/quiz-engine";
import { connection } from "next/server";

const mockTashrifQuestions: Question[] = [
  {
    id: "tq-1",
    type: "tashrif",
    questionText: 'Tentukan bentukan Fi\'il Madhi untuk Dhomir "هُمْ" (Mereka Laki-Laki) dari kata "نَصَرَ"!',
    questionArabic: 'هُمْ → ؟',
    points: 10,
    options: [
      { id: "topt-1", optionText: "Nasaruu (نَصَرُوا)", optionArabic: "نَصَرُوا", isCorrect: true },
      { id: "topt-2", optionText: "Nasaraa (نَصَرَا)", optionArabic: "نَصَرَا", isCorrect: false },
      { id: "topt-3", optionText: "Nasarat (نَصَرَتْ)", optionArabic: "نَصَرَتْ", isCorrect: false },
    ],
  },
  {
    id: "tq-2",
    type: "tashrif",
    questionText: 'Tentukan bentukan Fi\'il Madhi untuk Dhomir "هُمَا" (Mereka Berdua) dari kata "نَصَرَ"!',
    questionArabic: 'هُمَا → ؟',
    points: 10,
    options: [
      { id: "topt-4", optionText: "Nasaraa (نَصَرَا)", optionArabic: "نَصَرَا", isCorrect: true },
      { id: "topt-5", optionText: "Nasarn (نَصَرْنَ)", optionArabic: "نَصَرْنَ", isCorrect: false },
      { id: "topt-6", optionText: "Nasarta (نَصَرْتَ)", optionArabic: "نَصَرْتَ", isCorrect: false },
    ],
  },
  {
    id: "tq-3",
    type: "tashrif",
    questionText: 'Tentukan bentukan Fi\'il Madhi untuk Dhomir "أَنَا" (Saya) dari kata "نَصَرَ"!',
    questionArabic: 'أَنَا → ؟',
    points: 10,
    options: [
      { id: "topt-7", optionText: "Nasartu (نَصَرْتُ)", optionArabic: "نَصَرْتُ", isCorrect: true },
      { id: "topt-8", optionText: "Nasarnaa (نَصَرْنَا)", optionArabic: "نَصَرْنَا", isCorrect: false },
      { id: "topt-9", optionText: "Nasartum (نَصَرْتُمْ)", optionArabic: "نَصَرْتُمْ", isCorrect: false },
    ],
  },
];

async function TashrifArenaContent() {
  await connection();
  return (
    <PageContainer
      title="Tashrif Race Arena"
      description="Adu kecepatan mencocokkan perubahan bentuk kata kerja (Tashrif) dalam Speed Challenge 45 detik!"
    >
      <TashrifRaceGame questions={mockTashrifQuestions} />
    </PageContainer>
  );
}

export default function TashrifRacePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Menyiapkan arena Tashrif Race...</div>}>
      <TashrifArenaContent />
    </Suspense>
  );
}
