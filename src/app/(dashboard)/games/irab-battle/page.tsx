import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { IrabBattleGame } from "@/components/games/irab-battle-game";
import { Question } from "@/types/quiz-engine";
import { connection } from "next/server";

const mockIrabQuestions: Question[] = [
  {
    id: "gq-1",
    type: "irab",
    questionText: 'Manakah kedudukan I\'rab yang tepat untuk kata "الطَّالِبُ" dalam kalimat di atas?',
    questionArabic: 'ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ',
    points: 10,
    options: [
      { id: "gopt-1", optionText: "Fa'il Marfu' (فَاعِلٌ مَرْفُوْعٌ)", optionArabic: "فَاعِلٌ مَرْفُوْعٌ", isCorrect: true },
      { id: "gopt-2", optionText: "Maf'ul Bih Mansub (مَفْعُوْلٌ بِهِ مَنْصُوْبٌ)", optionArabic: "مَفْعُوْلٌ بِهِ مَنْصُوْبٌ", isCorrect: false },
      { id: "gopt-3", optionText: "Isim Majrur (اِسْمٌ مَجْرُوْرٌ)", optionArabic: "اِسْمٌ مَجْرُوْرٌ", isCorrect: false },
    ],
  },
  {
    id: "gq-2",
    type: "irab",
    questionText: 'Manakah kedudukan I\'rab yang tepat untuk kata "الْمَدْرَسَةِ" dalam kalimat di atas?',
    questionArabic: 'ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ',
    points: 10,
    options: [
      { id: "gopt-4", optionText: "Isim Majrur bi Ilaa (اِسْمٌ مَجْرُوْرٌ بِإِلَى)", optionArabic: "اِسْمٌ مَجْرُوْرٌ بِإِلَى", isCorrect: true },
      { id: "gopt-5", optionText: "Mubtada' Marfu' (مُبْتَدَأٌ مَرْفُوْعٌ)", optionArabic: "مُبْتَدَأٌ مَرْفُوْعٌ", isCorrect: false },
      { id: "gopt-6", optionText: "Khabar Marfu' (خَبَرٌ مَرْفُوْعٌ)", optionArabic: "خَبَرٌ مَرْفُوْعٌ", isCorrect: false },
    ],
  },
  {
    id: "gq-3",
    type: "irab",
    questionText: 'Manakah kedudukan I\'rab yang tepat untuk kata "ذَهَبَ" dalam kalimat di atas?',
    questionArabic: 'ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ',
    points: 10,
    options: [
      { id: "gopt-7", optionText: "Fi'il Madhi Mabni 'alal Fathi (فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الفَتْحِ)", optionArabic: "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الفَتْحِ", isCorrect: true },
      { id: "gopt-8", optionText: "Fi'il Mudhari Marfu' (فِعْلٌ مُضَارِعٌ مَرْفُوْعٌ)", optionArabic: "فِعْلٌ مُضَارِعٌ مَرْفُوْعٌ", isCorrect: false },
      { id: "gopt-9", optionText: "Fi'il Amr Mabni (فِعْلُ أَمْرٍ مَبْنِيٌّ)", optionArabic: "فِعْلُ أَمْرٍ مَبْنِيٌّ", isCorrect: false },
    ],
  },
];

async function BattleArenaContent() {
  await connection();
  return (
    <PageContainer
      title="I'rab Battle Arena"
      description="Uji kecepatan dan ketepatan penentuan kedudukan I'rab kata dalam pertarungan real-time!"
    >
      <IrabBattleGame questions={mockIrabQuestions} />
    </PageContainer>
  );
}

export default function IrabBattlePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Menyiapkan arena pertarungan...</div>}>
      <BattleArenaContent />
    </Suspense>
  );
}
