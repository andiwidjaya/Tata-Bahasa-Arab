import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserAchievementItem } from "@/services/achievement.service";
import { Award, BookOpen, CheckCircle2, Flame, Layers, Swords, Lock } from "lucide-react";

interface AchievementCardProps {
  achievement: UserAchievementItem;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = achievement.isUnlocked;

  const renderIcon = () => {
    switch (achievement.iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Swords': return <Swords className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <Card className={`transition ${isUnlocked ? 'border-amber-400 bg-amber-50/20 dark:bg-amber-950/20' : 'opacity-60 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <div className={`p-2.5 rounded-xl ${isUnlocked ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
            {isUnlocked ? renderIcon() : <Lock className="w-6 h-6" />}
          </div>
          <Badge variant={isUnlocked ? "secondary" : "outline"}>
            +{achievement.xpBonus} XP
          </Badge>
        </div>
        <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
          {achievement.title}
        </CardTitle>
        <CardDescription className="text-xs">
          {achievement.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className={`text-[10px] font-bold ${isUnlocked ? 'text-emerald-600' : 'text-slate-400'}`}>
          {isUnlocked ? '✓ Terbuka' : '🔒 Terkunci'}
        </span>
      </CardContent>
    </Card>
  );
}
