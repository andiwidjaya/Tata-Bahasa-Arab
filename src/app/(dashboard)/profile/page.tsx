import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AchievementCard } from "@/components/profile/achievement-card";
import { AchievementService, UserAchievementItem } from "@/services/achievement.service";
import { createClient } from "@/lib/supabase/server";
import { connection } from "next/server";
import { Award, Flame, BookOpen } from "lucide-react";

async function ProfileContent() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let fullName = "Pembelajar Bahasa Arab";
  let email = user?.email || "";
  let achievements: UserAchievementItem[] = [];

  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase.from("profiles") as any)
      .select("full_name")
      .eq("id", user.id)
      .single();

    if (profile) fullName = profile.full_name || fullName;

    // Trigger achievement check
    await AchievementService.checkAndUnlockAchievements(user.id);
    achievements = await AchievementService.getUserAchievements(user.id);
  }

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <PageContainer
      title="Profil Pembelajar"
      description="Pantau pencapaian lencana penghargaan, statistik belajar, dan akumulasi XP."
    >
      <div className="space-y-6">
        {/* Profile User Header */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardContent className="pt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-emerald-100 dark:border-emerald-900 shadow-md">
              {fullName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{fullName}</h2>
              <p className="text-xs text-slate-500">{email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                <Badge variant="default">Pencapaian: {unlockedCount} / {achievements.length} Lencana</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Lencana Penghargaan & Achievement</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <AchievementCard key={ach.code} achievement={ach} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat profil & lencana...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
