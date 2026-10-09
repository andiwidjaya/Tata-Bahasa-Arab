import { GAMIFICATION_CONFIG } from "@/config/gamification.config";

export interface LevelInfo {
  currentLevel: number;
  title: string;
  currentXp: number;
  minXpForCurrentLevel: number;
  nextLevelMinXp: number;
  progressPercentage: number;
}

export class LevelService {
  /**
   * Calculate current level, title, and progress percentage from total XP
   */
  static getLevelInfo(totalXp: number): LevelInfo {
    const thresholds = GAMIFICATION_CONFIG.levelThresholds;

    let currentLevel = 1;
    let title = thresholds[0].title;
    let minXpForCurrentLevel = 0;
    let nextLevelMinXp = thresholds[1]?.minXp || 100;

    for (let i = 0; i < thresholds.length; i++) {
      if (totalXp >= thresholds[i].minXp) {
        currentLevel = thresholds[i].level;
        title = thresholds[i].title;
        minXpForCurrentLevel = thresholds[i].minXp;
        nextLevelMinXp = thresholds[i + 1]?.minXp || thresholds[i].minXp + 500;
      } else {
        break;
      }
    }

    const xpInCurrentLevel = Math.max(0, totalXp - minXpForCurrentLevel);
    const totalXpNeededForNextLevel = Math.max(1, nextLevelMinXp - minXpForCurrentLevel);
    const progressPercentage = Math.min(100, Math.round((xpInCurrentLevel / totalXpNeededForNextLevel) * 100));

    return {
      currentLevel,
      title,
      currentXp: totalXp,
      minXpForCurrentLevel,
      nextLevelMinXp,
      progressPercentage,
    };
  }
}
