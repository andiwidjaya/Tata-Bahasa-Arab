import { Question, UserAnswerInput, EvaluatedAnswer } from "@/types/quiz-engine";

export interface QuestionHandlerStrategy {
  type: string;
  evaluate(question: Question, answer: UserAnswerInput): EvaluatedAnswer;
}

// 1. Multiple Choice Strategy
class MultipleChoiceStrategy implements QuestionHandlerStrategy {
  type = "multiple_choice";
  evaluate(question: Question, answer: UserAnswerInput): EvaluatedAnswer {
    const correctOption = question.options.find((opt) => opt.isCorrect);
    const isCorrect = correctOption?.id === answer.selectedOptionId;
    return {
      questionId: question.id,
      isCorrect: !!isCorrect,
      scoreAwarded: isCorrect ? question.points : 0,
      explanation: question.explanation,
    };
  }
}

// 2. True / False Strategy
class TrueFalseStrategy implements QuestionHandlerStrategy {
  type = "true_false";
  evaluate(question: Question, answer: UserAnswerInput): EvaluatedAnswer {
    const correctOption = question.options.find((opt) => opt.isCorrect);
    const isCorrect = correctOption?.id === answer.selectedOptionId;
    return {
      questionId: question.id,
      isCorrect: !!isCorrect,
      scoreAwarded: isCorrect ? question.points : 0,
      explanation: question.explanation,
    };
  }
}

// 3. Fill in the Blank Strategy
class FillBlankStrategy implements QuestionHandlerStrategy {
  type = "fill_blank";
  evaluate(question: Question, answer: UserAnswerInput): EvaluatedAnswer {
    const correctText = question.options.find((opt) => opt.isCorrect)?.optionText.trim().toLowerCase();
    const userText = answer.answerText?.trim().toLowerCase();
    const isCorrect = correctText === userText;
    return {
      questionId: question.id,
      isCorrect: !!isCorrect,
      scoreAwarded: isCorrect ? question.points : 0,
      explanation: question.explanation,
    };
  }
}

// 4. Matching Strategy
class MatchingStrategy implements QuestionHandlerStrategy {
  type = "matching";
  evaluate(question: Question, answer: UserAnswerInput): EvaluatedAnswer {
    const correctOption = question.options.find((opt) => opt.isCorrect);
    const isCorrect = correctOption?.id === answer.selectedOptionId;
    return {
      questionId: question.id,
      isCorrect: !!isCorrect,
      scoreAwarded: isCorrect ? question.points : 0,
      explanation: question.explanation,
    };
  }
}

// 5. Ordering Strategy
class OrderingStrategy implements QuestionHandlerStrategy {
  type = "ordering";
  evaluate(question: Question, answer: UserAnswerInput): EvaluatedAnswer {
    const correctOption = question.options.find((opt) => opt.isCorrect);
    const isCorrect = correctOption?.id === answer.selectedOptionId;
    return {
      questionId: question.id,
      isCorrect: !!isCorrect,
      scoreAwarded: isCorrect ? question.points : 0,
      explanation: question.explanation,
    };
  }
}

// 6. I'rab Selection Strategy
class IrabStrategy implements QuestionHandlerStrategy {
  type = "irab";
  evaluate(question: Question, answer: UserAnswerInput): EvaluatedAnswer {
    const correctOption = question.options.find((opt) => opt.isCorrect);
    const isCorrect = correctOption?.id === answer.selectedOptionId;
    return {
      questionId: question.id,
      isCorrect: !!isCorrect,
      scoreAwarded: isCorrect ? question.points : 0,
      explanation: question.explanation,
    };
  }
}

// 7. Tashrif Matching Strategy
class TashrifStrategy implements QuestionHandlerStrategy {
  type = "tashrif";
  evaluate(question: Question, answer: UserAnswerInput): EvaluatedAnswer {
    const correctOption = question.options.find((opt) => opt.isCorrect);
    const isCorrect = correctOption?.id === answer.selectedOptionId;
    return {
      questionId: question.id,
      isCorrect: !!isCorrect,
      scoreAwarded: isCorrect ? question.points : 0,
      explanation: question.explanation,
    };
  }
}

// Extensible Strategy Registry (Strategy Pattern)
export class QuizEvaluationEngine {
  private static strategies: Map<string, QuestionHandlerStrategy> = new Map();

  static registerStrategy(strategy: QuestionHandlerStrategy) {
    this.strategies.set(strategy.type, strategy);
  }

  static evaluateQuestion(question: Question, answer: UserAnswerInput): EvaluatedAnswer {
    const strategy = this.strategies.get(question.type) || new MultipleChoiceStrategy();
    return strategy.evaluate(question, answer);
  }
}

// Register default 7 strategies
QuizEvaluationEngine.registerStrategy(new MultipleChoiceStrategy());
QuizEvaluationEngine.registerStrategy(new TrueFalseStrategy());
QuizEvaluationEngine.registerStrategy(new FillBlankStrategy());
QuizEvaluationEngine.registerStrategy(new MatchingStrategy());
QuizEvaluationEngine.registerStrategy(new OrderingStrategy());
QuizEvaluationEngine.registerStrategy(new IrabStrategy());
QuizEvaluationEngine.registerStrategy(new TashrifStrategy());
