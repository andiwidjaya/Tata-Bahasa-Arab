export type QuestionType = 'multiple_choice' | 'irab_select' | 'tashrif_match' | 'fill_blank';

export interface QuizOption {
  id: string;
  text: string;
  textArabic?: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  lessonId: string;
  type: QuestionType;
  questionText: string;
  questionArabic?: string;
  audioUrl?: string;
  options: QuizOption[];
  correctAnswerId: string;
  explanation: string;
}

export interface QuizSession {
  id: string;
  lessonId: string;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  xpEarned: number;
  isCompleted: boolean;
}
