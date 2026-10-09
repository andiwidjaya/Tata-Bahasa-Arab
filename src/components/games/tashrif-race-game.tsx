"use client";

import * as React from "react";
import { Question } from "@/types/quiz-engine";
import { QuizEvaluationEngine } from "@/lib/engines/quiz-engine";
import { QuestionArea } from "./question-area";
import { QuizOption } from "@/components/ui/quiz-option";
import { ComboIndicator } from "./combo-indicator";
import { GameResult } from "./game-result";
import { Timer, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface TashrifRaceProps {
  questions: Question[];
}

export function TashrifRaceGame({ questions }: TashrifRaceProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [comboCount, setComboCount] = React.useState(0);
  const [maxCombo, setMaxCombo] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(45); // Speed Challenge: 45s

  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isVictory, setIsVictory] = React.useState(false);

  const currentQuestion = questions[currentIndex % questions.length];

  // Game Timer Countdown
  React.useEffect(() => {
    if (isGameOver || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame(score >= 50);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameOver, score]);

  const handleSelectOption = (optionId: string) => {
    if (isGameOver || !currentQuestion) return;

    const answer = { questionId: currentQuestion.id, selectedOptionId: optionId };
    const evalResult = QuizEvaluationEngine.evaluateQuestion(currentQuestion, answer);

    if (evalResult.isCorrect) {
      const newCombo = comboCount + 1;
      setComboCount(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      let multiplier = 1;
      if (newCombo >= 10) multiplier = 5;
      else if (newCombo >= 5) multiplier = 3;
      else if (newCombo >= 3) multiplier = 2;

      setScore((prev) => prev + 15 * multiplier);
    } else {
      setComboCount(0);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const endGame = async (victory: boolean) => {
    setIsVictory(victory);
    setIsGameOver(true);

    const xpEarned = victory ? 35 + score : Math.round(score / 2);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from("game_sessions") as any).insert({
          user_id: user.id,
          game_type: "tashrif_race",
          score,
          xp_earned: xpEarned,
          duration_seconds: 45 - timeLeft,
        });

        if (xpEarned > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase.from("user_xp") as any).insert({
            user_id: user.id,
            amount: xpEarned,
            source: "game",
          });
        }
      }
    } catch (err) {
      console.error("Failed to save Tashrif Race session", err);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setComboCount(0);
    setMaxCombo(0);
    setTimeLeft(45);
    setIsGameOver(false);
    setIsVictory(false);
  };

  if (isGameOver) {
    const xpEarned = isVictory ? 35 + score : Math.round(score / 2);
    return (
      <GameResult
        isVictory={isVictory}
        score={score}
        xpEarned={xpEarned}
        maxCombo={maxCombo}
        onRestart={restartGame}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Tashrif Race Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2 text-amber-500 font-extrabold text-lg">
          <Zap className="w-6 h-6 fill-amber-500" />
          <span>TASHRIF RACE (SPEED CHALLENGE)</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 px-3 py-1 rounded-full text-xs font-bold text-amber-600">
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
          <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
            Skor: <span className="text-amber-500">{score}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-1">
        <ComboIndicator comboCount={comboCount} />
        <span className="text-xs font-bold text-slate-400">Tashrif #{currentIndex + 1}</span>
      </div>

      {currentQuestion && (
        <>
          <QuestionArea
            question={currentQuestion}
            sentenceArabic="نَصَرَ (Tashrif Fi'il Madhi)"
          />

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => (
              <QuizOption
                key={opt.id}
                index={idx}
                option={{
                  id: opt.id,
                  text: opt.optionText,
                  textArabic: opt.optionArabic,
                  isCorrect: opt.isCorrect,
                }}
                isSelected={false}
                onSelect={() => handleSelectOption(opt.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
