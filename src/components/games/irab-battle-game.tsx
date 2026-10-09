"use client";

import * as React from "react";
import { Question } from "@/types/quiz-engine";
import { QuizEvaluationEngine } from "@/lib/engines/quiz-engine";
import { BattleHeader } from "./battle-header";
import { QuestionArea } from "./question-area";
import { QuizOption } from "@/components/ui/quiz-option";
import { ComboIndicator } from "./combo-indicator";
import { GameResult } from "./game-result";
import { createClient } from "@/lib/supabase/client";

interface IrabBattleProps {
  questions: Question[];
}

export function IrabBattleGame({ questions }: IrabBattleProps) {
  const [playerHp, setPlayerHp] = React.useState(100);
  const [opponentHp, setOpponentHp] = React.useState(100);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [comboCount, setComboCount] = React.useState(0);
  const [maxCombo, setMaxCombo] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(60);

  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isVictory, setIsVictory] = React.useState(false);

  const currentQuestion = questions[currentIndex % questions.length];

  // Game Timer Countdown
  React.useEffect(() => {
    if (isGameOver || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame(playerHp > opponentHp);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameOver, playerHp, opponentHp]);

  const handleSelectOption = (optionId: string) => {
    if (isGameOver || !currentQuestion) return;

    const answer = { questionId: currentQuestion.id, selectedOptionId: optionId };
    const evalResult = QuizEvaluationEngine.evaluateQuestion(currentQuestion, answer);

    if (evalResult.isCorrect) {
      // Calculate Combo Multiplier
      const newCombo = comboCount + 1;
      setComboCount(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      let multiplier = 1;
      if (newCombo >= 10) multiplier = 5;
      else if (newCombo >= 5) multiplier = 3;
      else if (newCombo >= 3) multiplier = 2;

      const damage = 20 * multiplier;
      const newOpponentHp = Math.max(0, opponentHp - damage);
      setOpponentHp(newOpponentHp);
      setScore((prev) => prev + 10 * multiplier);

      if (newOpponentHp <= 0) {
        endGame(true);
        return;
      }
    } else {
      // Reset Combo and Damage Player
      setComboCount(0);
      const newPlayerHp = Math.max(0, playerHp - 25);
      setPlayerHp(newPlayerHp);

      if (newPlayerHp <= 0) {
        endGame(false);
        return;
      }
    }

    // Move to next question
    setCurrentIndex((prev) => prev + 1);
  };

  const endGame = async (victory: boolean) => {
    setIsVictory(victory);
    setIsGameOver(true);

    const xpEarned = victory ? 30 + score : Math.round(score / 2);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Save game session to DB
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from("game_sessions") as any).insert({
          user_id: user.id,
          game_type: "irab_battle",
          score,
          xp_earned: xpEarned,
          duration_seconds: 60 - timeLeft,
        });

        // Award XP
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
      console.error("Failed to save game session", err);
    }
  };

  const restartGame = () => {
    setPlayerHp(100);
    setOpponentHp(100);
    setCurrentIndex(0);
    setScore(0);
    setComboCount(0);
    setMaxCombo(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setIsVictory(false);
  };

  if (isGameOver) {
    const xpEarned = isVictory ? 30 + score : Math.round(score / 2);
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
      <BattleHeader
        playerHp={playerHp}
        opponentHp={opponentHp}
        timeLeft={timeLeft}
        score={score}
      />

      <div className="flex justify-between items-center px-1">
        <ComboIndicator comboCount={comboCount} />
        <span className="text-xs font-bold text-slate-400">Soal Pertarungan #{currentIndex + 1}</span>
      </div>

      {currentQuestion && (
        <>
          <QuestionArea
            question={currentQuestion}
            sentenceArabic="ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ"
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
