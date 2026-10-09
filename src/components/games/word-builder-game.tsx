"use client";

import * as React from "react";
import { HealthBar } from "./health-bar";
import { ComboIndicator } from "./combo-indicator";
import { GameResult } from "./game-result";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, RotateCcw, Sparkles, ArrowRight, Lightbulb } from "lucide-react";

interface WordPuzzle {
  id: string;
  targetMeaning: string;
  targetArabic: string;
  tokens: string[];
  explanation: string;
}

const PUZZLES: WordPuzzle[] = [
  {
    id: "p1",
    targetMeaning: "Zaid telah datang ke masjid",
    targetArabic: "جَاءَ زَيْدٌ إِلَى الْمَسْجِدِ",
    tokens: ["الْمَسْجِدِ", "جَاءَ", "إِلَى", "زَيْدٌ"],
    explanation: "Susunan Fi'il (جَاءَ) + Fa'il Marfu' (زَيْدٌ) + Huruf Jar (إِلَى) + Isim Majrur (الْمَسْجِدِ).",
  },
  {
    id: "p2",
    targetMeaning: "Buku itu ada di atas meja",
    targetArabic: "الْكِتَابُ عَلَى الْمَكْتَبِ",
    tokens: ["عَلَى", "الْمَكْتَبِ", "الْكِتَابُ"],
    explanation: "Susunan Mubtada' Marfu' (الْكِتَابُ) + Khabar Jar Majrur (عَلَى الْمَكْتَبِ).",
  },
  {
    id: "p3",
    targetMeaning: "Zaid telah memukul 'Amr",
    targetArabic: "ضَرَبَ زَيْدٌ عَمْرًا",
    tokens: ["عَمْرًا", "ضَرَبَ", "زَيْدٌ"],
    explanation: "Susunan Fi'il (ضَرَبَ) + Fa'il Marfu' (زَيْدٌ) + Maf'ul Bih Manshub (عَمْرًا).",
  },
  {
    id: "p4",
    targetMeaning: "Sesungguhnya Zaid itu berdiri",
    targetArabic: "إِنَّ زَيْدًا قَائِمٌ",
    tokens: ["قَائِمٌ", "إِنَّ", "زَيْدًا"],
    explanation: "Amil Inna (إِنَّ) + Isim Inna Manshub (زَيْدًا) + Khabar Inna Marfu' (قَائِمٌ).",
  },
  {
    id: "p5",
    targetMeaning: "Siswa itu pergi ke sekolah",
    targetArabic: "ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ",
    tokens: ["الْمَدْرَسَةِ", "ذَهَبَ", "إِلَى", "الطَّالِبُ"],
    explanation: "Susunan Fi'il (ذَهَبَ) + Fa'il Marfu' (الطَّالِبُ) + Huruf Jar (إِلَى) + Isim Majrur (الْمَدْرَسَةِ).",
  },
];

export function WordBuilderGame() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [availableWords, setAvailableWords] = React.useState<string[]>([]);
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);
  const [health, setHealth] = React.useState(100);
  const [score, setScore] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [maxCombo, setMaxCombo] = React.useState(0);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [feedback, setFeedback] = React.useState<"idle" | "correct" | "incorrect">("idle");
  const [gameOver, setGameOver] = React.useState(false);

  const currentPuzzle = PUZZLES[currentIndex];

  React.useEffect(() => {
    if (currentPuzzle) {
      setAvailableWords([...currentPuzzle.tokens]);
      setSelectedWords([]);
      setFeedback("idle");
    }
  }, [currentIndex]);

  const handleSelectAvailable = (word: string, index: number) => {
    if (feedback !== "idle") return;
    const newAvail = [...availableWords];
    newAvail.splice(index, 1);
    setAvailableWords(newAvail);
    setSelectedWords([...selectedWords, word]);
  };

  const handleDeselectWord = (word: string, index: number) => {
    if (feedback !== "idle") return;
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
  };

  const handleResetCurrent = () => {
    if (feedback !== "idle") return;
    setAvailableWords([...currentPuzzle.tokens]);
    setSelectedWords([]);
  };

  const handleCheckAnswer = () => {
    if (selectedWords.length === 0 || feedback !== "idle") return;

    const constructed = selectedWords.join(" ");
    const isCorrect = constructed === currentPuzzle.targetArabic;

    if (isCorrect) {
      setFeedback("correct");
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setScore((prev) => prev + 100 + newCombo * 20);
      setCorrectCount((prev) => prev + 1);
    } else {
      setFeedback("incorrect");
      setCombo(0);
      const newHealth = Math.max(0, health - 25);
      setHealth(newHealth);
      if (newHealth <= 0) {
        setTimeout(() => setGameOver(true), 1500);
      }
    }
  };

  const handleNextPuzzle = () => {
    if (currentIndex + 1 < PUZZLES.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setHealth(100);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCorrectCount(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <GameResult
        isVictory={score > 0 && health > 0}
        score={score}
        maxCombo={maxCombo}
        xpEarned={score > 0 ? Math.floor(score / 5) : 10}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Header: Health, Combo, Score */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <HealthBar currentHp={health} maxHp={100} label="Nyawa Puzzle" />
        <div className="text-center">
          <ComboIndicator comboCount={combo} />
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500 uppercase">Skor Permainan</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{score} PTS</p>
        </div>
      </div>

      {/* Target Challenge Display */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm text-center">
        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/40">
          Puzzle {currentIndex + 1} dari {PUZZLES.length}
        </Badge>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Susun Kalimat: "{currentPuzzle.targetMeaning}"
        </h3>
        <p className="text-xs text-slate-500">
          Klik potongan kata di bawah untuk merangkai kalimat Bahasa Arab yang tepat sesuai kaidah Nahwu.
        </p>
      </div>

      {/* Construction Active Slot Box */}
      <div className="p-6 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/20 min-h-[110px] flex flex-wrap items-center justify-center gap-3">
        {selectedWords.length === 0 ? (
          <span className="text-xs font-semibold text-slate-400 italic">
            Klik potongan kata di bawah ini untuk mulai menyusun...
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              onClick={() => handleDeselectWord(word, idx)}
              disabled={feedback !== "idle"}
              className="px-5 py-3 rounded-xl bg-blue-600 text-white font-arabic text-2xl font-bold shadow-md hover:bg-red-600 transition flex items-center space-x-2 group cursor-pointer"
            >
              <span>{word}</span>
            </button>
          ))
        )}
      </div>

      {/* Available Word Pool */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm text-center">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase">Potongan Kata Tersedia:</span>
          <Button variant="ghost" size="sm" onClick={handleResetCurrent} disabled={selectedWords.length === 0 || feedback !== "idle"}>
            <RotateCcw className="w-4 h-4 mr-1" />
            <span>Reset</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {availableWords.map((word, idx) => (
            <button
              key={`avail-${word}-${idx}`}
              onClick={() => handleSelectAvailable(word, idx)}
              disabled={feedback !== "idle"}
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 font-arabic text-2xl font-bold text-slate-900 dark:text-slate-100 shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback & Actions */}
      {feedback === "idle" && (
        <Button
          onClick={handleCheckAnswer}
          disabled={selectedWords.length === 0}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl text-base shadow-lg"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          <span>Cek Jawaban Kalimat</span>
        </Button>
      )}

      {feedback === "correct" && (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center justify-center space-x-2 text-emerald-700 dark:text-emerald-300">
            <Sparkles className="w-6 h-6" />
            <h4 className="font-bold text-lg">Mumtaz! Susunan Kalimat Tepat 🎉</h4>
          </div>
          <p className="font-arabic text-2xl text-emerald-800 dark:text-emerald-200 font-bold">{currentPuzzle.targetArabic}</p>
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{currentPuzzle.explanation}</span>
          </div>
          <Button onClick={handleNextPuzzle} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold mt-2">
            <span>Lanjut ke Puzzle Berikutnya</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {feedback === "incorrect" && (
        <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-center space-y-3 animate-in fade-in zoom-in duration-200">
          <h4 className="font-bold text-lg text-red-700 dark:text-red-300">Afwan! Susunan Belum Tepat ❌</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">Susunan yang benar:</p>
          <p className="font-arabic text-2xl text-emerald-700 dark:text-emerald-300 font-bold">{currentPuzzle.targetArabic}</p>
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{currentPuzzle.explanation}</span>
          </div>
          <Button onClick={handleNextPuzzle} variant="outline" className="w-full sm:w-auto mt-2">
            <span>Coba Puzzle Berikutnya</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
