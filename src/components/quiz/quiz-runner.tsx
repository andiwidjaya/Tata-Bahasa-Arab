"use client";

import * as React from "react";
import { Quiz, UserAnswerInput, EvaluatedAnswer } from "@/types/quiz-engine";
import { QuizEvaluationEngine } from "@/lib/engines/quiz-engine";
import { QuestionCard } from "./question-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ArrowRight, Award, RotateCcw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface QuizRunnerProps {
  quiz: Quiz;
  onFinish?: (finalScore: number, isPassed: boolean) => void;
}

export function QuizRunner({ quiz, onFinish }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<Record<string, UserAnswerInput>>({});
  const [submittedQuestions, setSubmittedQuestions] = React.useState<Record<string, EvaluatedAnswer>>({});
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [totalScore, setTotalScore] = React.useState(0);
  const [isPassed, setIsPassed] = React.useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const currentAnswer = currentQuestion ? userAnswers[currentQuestion.id] : undefined;
  const currentFeedback = currentQuestion ? submittedQuestions[currentQuestion.id] : undefined;

  const handleAnswerChange = (ans: UserAnswerInput) => {
    setUserAnswers((prev) => ({
      ...prev,
      [ans.questionId]: ans,
    }));
  };

  const handleCheckAnswer = () => {
    if (!currentQuestion || !currentAnswer) return;
    const evaluated = QuizEvaluationEngine.evaluateQuestion(currentQuestion, currentAnswer);
    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: evaluated,
    }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Complete quiz & calculate score
      let earnedPoints = 0;
      let totalPossiblePoints = 0;

      quiz.questions.forEach((q) => {
        totalPossiblePoints += q.points;
        const result = submittedQuestions[q.id];
        if (result?.isCorrect) {
          earnedPoints += result.scoreAwarded;
        }
      });

      const finalPercentage = totalPossiblePoints > 0
        ? Math.round((earnedPoints / totalPossiblePoints) * 100)
        : 0;
      const passed = finalPercentage >= quiz.passingScore;

      setTotalScore(finalPercentage);
      setIsPassed(passed);
      setIsCompleted(true);

      // Persist to Supabase if logged in
      saveAttemptToSupabase(finalPercentage, passed);

      if (onFinish) onFinish(finalPercentage, passed);
    }
  };

  const saveAttemptToSupabase = async (score: number, passed: boolean) => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: attempt } = await (supabase.from("quiz_attempts") as any).insert({
          user_id: user.id,
          quiz_id: quiz.id,
          score,
          is_passed: passed,
          completed_at: new Date().toISOString(),
        }).select("id").single();

        // Award XP if passed
        if (passed && quiz.xpReward > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase.from("user_xp") as any).insert({
            user_id: user.id,
            amount: quiz.xpReward,
            source: "quiz_passed",
            reference_id: quiz.id,
          });
        }

        // Track mistakes
        quiz.questions.forEach(async (q) => {
          const evalRes = submittedQuestions[q.id];
          if (evalRes && !evalRes.isCorrect) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase.from("user_mistakes") as any).upsert({
              user_id: user.id,
              question_id: q.id,
              wrong_count: 1,
              last_wrong_at: new Date().toISOString(),
              next_review_at: new Date(Date.now() + 86400000).toISOString(),
            });
          }
        });
      }
    } catch (err) {
      console.error("Failed to save quiz attempt", err);
    }
  };

  const progressPercentage = ((currentIndex + 1) / quiz.questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6 max-w-xl mx-auto shadow-md">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
          <Award className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <Badge variant={isPassed ? "default" : "destructive"}>
            {isPassed ? "LULUS KUIS" : "BELUM LULUS"}
          </Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Skor Akhir Anda: {totalScore}%
          </h2>
          <p className="text-xs text-slate-500">
            Syarat kelulusan kuis ini: {quiz.passingScore}%
          </p>
        </div>

        {isPassed && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
            🎉 Selamat! Anda berhak mendapatkan +{quiz.xpReward} XP.
          </div>
        )}

        <div className="pt-2 flex justify-center space-x-3">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentIndex(0);
              setUserAnswers({});
              setSubmittedQuestions({});
              setIsCompleted(false);
            }}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            <span>Coba Lagi</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Quiz Progress & Question Counter */}
      <div className="flex items-center justify-between">
        <Badge variant="outline">{quiz.title}</Badge>
        <span className="text-xs font-bold text-slate-500">
          Soal {currentIndex + 1} dari {quiz.questions.length}
        </span>
      </div>
      <ProgressBar value={progressPercentage} variant="emerald" />

      {/* Interactive Question Display */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          userAnswer={currentAnswer}
          isSubmitted={!!currentFeedback}
          onAnswerChange={handleAnswerChange}
        />
      )}

      {/* Immediate Answer Feedback Banner */}
      {currentFeedback && (
        <div
          className={`p-4 rounded-xl border flex items-start space-x-3 ${
            currentFeedback.isCorrect
              ? "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-200"
              : "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-900 dark:text-red-200"
          }`}
        >
          {currentFeedback.isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1 text-sm">
            <p className="font-bold">
              {currentFeedback.isCorrect ? "Jawaban Anda benar." : "Jawaban belum tepat."}
            </p>
            {currentFeedback.explanation && (
              <p className="text-xs opacity-90">💡 {currentFeedback.explanation}</p>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons: Submit / Next */}
      <div className="flex justify-end pt-2">
        {!currentFeedback ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={!currentAnswer}
            size="lg"
            className="w-full sm:w-auto"
          >
            <span>Periksa Jawaban</span>
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg" className="w-full sm:w-auto space-x-2">
            <span>{currentIndex < quiz.questions.length - 1 ? "Soal Berikutnya" : "Selesaikan Kuis"}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
