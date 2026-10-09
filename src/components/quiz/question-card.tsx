"use client";

import * as React from "react";
import { QuizOption } from "@/components/ui/quiz-option";
import { Button } from "@/components/ui/button";
import { Question, UserAnswerInput } from "@/types/quiz-engine";
import { AudioPlayer } from "@/components/ui/audio-player";

interface QuestionCardProps {
  question: Question;
  userAnswer?: UserAnswerInput;
  isSubmitted: boolean;
  onAnswerChange: (answer: UserAnswerInput) => void;
}

export function QuestionCard({
  question,
  userAnswer,
  isSubmitted,
  onAnswerChange,
}: QuestionCardProps) {
  const [inputText, setInputText] = React.useState(userAnswer?.answerText || "");

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    onAnswerChange({
      questionId: question.id,
      selectedOptionId: optionId,
    });
  };

  const handleTextInputChange = (text: string) => {
    setInputText(text);
    onAnswerChange({
      questionId: question.id,
      answerText: text,
    });
  };

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      {/* Question Text & Arabic Header */}
      <div className="space-y-3">
        {question.questionArabic && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <span className="font-arabic text-3xl font-bold text-emerald-800 dark:text-emerald-300">
              {question.questionArabic}
            </span>
          </div>
        )}
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {question.questionText}
        </h3>
      </div>

      {/* Audio if available */}
      {question.audioUrl && (
        <AudioPlayer src={question.audioUrl} label="Dengarkan Soal Audio" />
      )}

      {/* Render input controls depending on question type */}
      {question.type === "fill_blank" ? (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500">Ketikkan Jawaban Anda:</label>
          <input
            type="text"
            value={inputText}
            disabled={isSubmitted}
            onChange={(e) => handleTextInputChange(e.target.value)}
            placeholder="Ketik jawaban di sini..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-medium text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {question.options.map((opt) => {
            const isSelected = userAnswer?.selectedOptionId === opt.id;
            let status: "idle" | "correct" | "incorrect" = "idle";
            if (isSubmitted) {
              if (opt.isCorrect) status = "correct";
              else if (isSelected) status = "incorrect";
            }

            return (
              <QuizOption
                key={opt.id}
                option={{
                  id: opt.id,
                  text: opt.optionText,
                  textArabic: opt.optionArabic,
                  isCorrect: opt.isCorrect,
                }}
                isSelected={isSelected}
                status={status}
                onSelect={() => handleOptionSelect(opt.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
