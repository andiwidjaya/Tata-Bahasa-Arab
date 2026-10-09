import { UserProfile } from '@/types/user';

export class UserService {
  static getMockProfile(): UserProfile {
    return {
      id: 'usr-1',
      fullName: 'Ahmad Mujahid',
      email: 'ahmad@example.com',
      avatarUrl: '',
      role: 'user',
      totalXp: 1250,
      currentLevel: 5,
      streakDays: 7,
      createdAt: new Date().toISOString(),
    };
  }

  static calculateLevel(xp: number): number {
    return Math.floor(xp / 250) + 1;
  }
}
