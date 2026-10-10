import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { ProfileView } from "@/components/profile/profile-view";
import { AchievementService, UserAchievementItem } from "@/services/achievement.service";
import { createClient } from "@/lib/supabase/server";
import { connection } from "next/server";

async function ProfileContent() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let fullName = "Pembelajar Bahasa Arab";
  let email = user?.email || "";
  let role = "user";
  let totalXp = 0;
  let level = 1;
  let streakDays = 0;
  let completedLessonsCount = 0;
  let achievements: UserAchievementItem[] = [];

  if (user) {
    if (user.email === "juanda.andi@gmail.com") {
      role = "admin";
    }

    // 1. Fetch Profile
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase.from("profiles") as any)
      .select("full_name, role")
      .eq("id", user.id)
      .single();

    if (profile) {
      fullName = profile.full_name || fullName;
      if (profile.role) role = profile.role;
    }

    // 2. Fetch XP
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: xpRows } = await (supabase.from("user_xp") as any)
      .select("amount")
      .eq("user_id", user.id);

    totalXp = (xpRows || []).reduce((acc: number, curr: any) => acc + curr.amount, 0);
    level = Math.floor(totalXp / 250) + 1;

    // 3. Fetch Streaks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: streakRows } = await (supabase.from("user_streaks") as any)
      .select("streak_date")
      .eq("user_id", user.id);

    streakDays = streakRows?.length || 0;

    // 4. Fetch Completed Lessons Count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: progressRows } = await (supabase.from("user_progress") as any)
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("status", "completed");

    completedLessonsCount = progressRows?.length || 0;

    // 5. Check and unlock achievements
    await AchievementService.checkAndUnlockAchievements(user.id);
    achievements = await AchievementService.getUserAchievements(user.id);
  }

  const initialProfile = {
    id: user?.id || "guest",
    fullName,
    email,
    role,
    totalXp,
    level,
    streakDays,
    completedLessonsCount,
  };

  return (
    <PageContainer
      title="Profil Pembelajar"
      description="Pantau pencapaian lencana penghargaan, statistik belajar, dan akumulasi XP."
    >
      <ProfileView initialProfile={initialProfile} achievements={achievements} />
    </PageContainer>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 font-bold animate-pulse">Memuat profil pembelajar...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
