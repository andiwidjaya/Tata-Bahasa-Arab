export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  totalXp: number;
  currentLevel: number;
  streakDays: number;
  createdAt: string;
}

export interface StreakInfo {
  currentStreak: number;
  bestStreak: number;
  isTodayCompleted: boolean;
  lastActiveDate: string;
}
