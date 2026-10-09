export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'matching'
  | 'ordering'
  | 'irab'
  | 'tashrif';

export interface QuestionOption {
  id: string;
  optionText: string;
  optionArabic?: string;
  isCorrect: boolean;
  orderIndex?: number;
}

export interface Question {
  id: string;
  lessonId?: string;
  type: QuestionType;
  questionText: string;
  questionArabic?: string;
  audioUrl?: string;
  explanation?: string;
  explanationArabic?: string;
  points: number;
  options: QuestionOption[];
  metadata?: Record<string, unknown>;
}

export interface Quiz {
  id: string;
  lessonId?: string;
  title: string;
  description?: string;
  passingScore: number;
  xpReward: number;
  questions: Question[];
}

export interface UserAnswerInput {
  questionId: string;
  selectedOptionId?: string;
  answerText?: string;
}

export interface EvaluatedAnswer {
  questionId: string;
  isCorrect: boolean;
  scoreAwarded: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  isPassed: boolean;
  startedAt: string;
  completedAt?: string;
  answers: EvaluatedAnswer[];
}
