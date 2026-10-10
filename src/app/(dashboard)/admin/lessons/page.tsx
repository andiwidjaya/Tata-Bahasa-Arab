import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminServerService } from "@/services/admin-server.service";
import { connection } from "next/server";
import { BookOpen } from "lucide-react";

async function AdminLessonsContent() {
  await connection();
  const lessons = await AdminServerService.getLessons();

  return (
    <PageContainer
      title="Manajemen Lesson & Content"
      description="Kelola materi pembelajaran, judul Arab, dan XP Reward."
    >
      <div className="space-y-4 pt-2">
        {lessons.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Belum ada data lesson.</p>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          lessons.map((l: any) => (
            <Card key={l.id} className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-emerald-600">{l.chapters?.title}</span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{l.title}</h4>
                {l.title_arabic && (
                  <p className="font-arabic text-lg text-emerald-700 font-bold">{l.title_arabic}</p>
                )}
              </div>
              <Badge variant="default">+{l.xp_reward} XP</Badge>
            </Card>
          ))
        )}
      </div>
    </PageContainer>
  );
}

export default function AdminLessonsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat data lesson...</div>}>
      <AdminLessonsContent />
    </Suspense>
  );
}
