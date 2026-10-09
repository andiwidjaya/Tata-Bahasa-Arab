export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'user' | 'admin'
export type CourseCategory = 'nahwu' | 'shorof'
export type LessonContentType = 'text' | 'arabic_text' | 'example' | 'explanation' | 'audio' | 'exercise'
export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching' | 'ordering' | 'irab' | 'tashrif'
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed'
export type GameType = 'irab_battle' | 'tashrif_race' | 'word_builder'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          role?: UserRole
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          category: CourseCategory
          description: string | null
          level: number
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          category: CourseCategory
          description?: string | null
          level?: number
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          category?: CourseCategory
          description?: string | null
          level?: number
          order_index?: number
          is_published?: boolean
          updated_at?: string
        }
      }
      chapters: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          title?: string
          description?: string | null
          order_index?: number
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          chapter_id: string
          title: string
          title_arabic: string | null
          xp_reward: number
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          chapter_id: string
          title: string
          title_arabic?: string | null
          xp_reward?: number
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          title?: string
          title_arabic?: string | null
          xp_reward?: number
          order_index?: number
          is_published?: boolean
          updated_at?: string
        }
      }
      lesson_contents: {
        Row: {
          id: string
          lesson_id: string
          content_type: LessonContentType
          content_text: string | null
          content_arabic: string | null
          audio_id: string | null
          order_index: number
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          content_type: LessonContentType
          content_text?: string | null
          content_arabic?: string | null
          audio_id?: string | null
          order_index?: number
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          lesson_id?: string
          content_type?: LessonContentType
          content_text?: string | null
          content_arabic?: string | null
          audio_id?: string | null
          order_index?: number
          metadata?: Json | null
          updated_at?: string
        }
      }
      audio: {
        Row: {
          id: string
          title: string
          audio_url: string
          duration_seconds: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          audio_url: string
          duration_seconds?: number | null
          created_at?: string
        }
        Update: {
          title?: string
          audio_url?: string
          duration_seconds?: number | null
        }
      }
      questions: {
        Row: {
          id: string
          lesson_id: string | null
          type: QuestionType
          question_text: string
          question_arabic: string | null
          audio_id: string | null
          explanation: string | null
          explanation_arabic: string | null
          points: number
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lesson_id?: string | null
          type: QuestionType
          question_text: string
          question_arabic?: string | null
          audio_id?: string | null
          explanation?: string | null
          explanation_arabic?: string | null
          points?: number
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          lesson_id?: string | null
          type?: QuestionType
          question_text?: string
          question_arabic?: string | null
          audio_id?: string | null
          explanation?: string | null
          explanation_arabic?: string | null
          points?: number
          metadata?: Json | null
          updated_at?: string
        }
      }
      question_options: {
        Row: {
          id: string
          question_id: string
          option_text: string
          option_arabic: string | null
          is_correct: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          question_id: string
          option_text: string
          option_arabic?: string | null
          is_correct?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          question_id?: string
          option_text?: string
          option_arabic?: string | null
          is_correct?: boolean
          order_index?: number
        }
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string | null
          title: string
          description: string | null
          passing_score: number
          xp_reward: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lesson_id?: string | null
          title: string
          description?: string | null
          passing_score?: number
          xp_reward?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          lesson_id?: string | null
          title?: string
          description?: string | null
          passing_score?: number
          xp_reward?: number
          updated_at?: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          quiz_id: string
          question_id: string
          order_index: number
        }
        Insert: {
          id?: string
          quiz_id: string
          question_id: string
          order_index?: number
        }
        Update: {
          quiz_id?: string
          question_id?: string
          order_index?: number
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          user_id: string
          quiz_id: string
          score: number
          is_passed: boolean
          started_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          quiz_id: string
          score?: number
          is_passed?: boolean
          started_at?: string
          completed_at?: string | null
        }
        Update: {
          score?: number
          is_passed?: boolean
          completed_at?: string | null
        }
      }
      user_answers: {
        Row: {
          id: string
          attempt_id: string
          question_id: string
          selected_option_id: string | null
          answer_text: string | null
          is_correct: boolean
          created_at: string
        }
        Insert: {
          id?: string
          attempt_id: string
          question_id: string
          selected_option_id?: string | null
          answer_text?: string | null
          is_correct?: boolean
          created_at?: string
        }
        Update: {
          selected_option_id?: string | null
          answer_text?: string | null
          is_correct?: boolean
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          status: ProgressStatus
          completed_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          status?: ProgressStatus
          completed_at?: string | null
          updated_at?: string
        }
        Update: {
          status?: ProgressStatus
          completed_at?: string | null
          updated_at?: string
        }
      }
      user_xp: {
        Row: {
          id: string
          user_id: string
          amount: number
          source: string
          reference_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          source: string
          reference_id?: string | null
          created_at?: string
        }
        Update: {
          amount?: number
          source?: string
          reference_id?: string | null
        }
      }
      user_streaks: {
        Row: {
          id: string
          user_id: string
          streak_date: string
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          streak_date: string
          completed?: boolean
          created_at?: string
        }
        Update: {
          streak_date?: string
          completed?: boolean
        }
      }
      achievements: {
        Row: {
          id: string
          code: string
          title: string
          description: string
          badge_icon_url: string | null
          xp_bonus: number
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          title: string
          description: string
          badge_icon_url?: string | null
          xp_bonus?: number
          created_at?: string
        }
        Update: {
          code?: string
          title?: string
          description?: string
          badge_icon_url?: string | null
          xp_bonus?: number
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
        }
        Update: {
          unlocked_at?: string
        }
      }
      game_sessions: {
        Row: {
          id: string
          user_id: string
          game_type: GameType
          score: number
          xp_earned: number
          duration_seconds: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_type: GameType
          score?: number
          xp_earned?: number
          duration_seconds?: number | null
          created_at?: string
        }
        Update: {
          score?: number
          xp_earned?: number
          duration_seconds?: number | null
        }
      }
      user_mistakes: {
        Row: {
          id: string
          user_id: string
          question_id: string
          wrong_count: number
          last_wrong_at: string
          next_review_at: string
          is_mastered: boolean
        }
        Insert: {
          id?: string
          user_id: string
          question_id: string
          wrong_count?: number
          last_wrong_at?: string
          next_review_at?: string
          is_mastered?: boolean
        }
        Update: {
          wrong_count?: number
          last_wrong_at?: string
          next_review_at?: string
          is_mastered?: boolean
        }
      }
    }
  }
}
