import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminServerService } from "@/services/admin-server.service";
import { connection } from "next/server";
import { Layers, Plus } from "lucide-react";

async function AdminChaptersContent() {
  await connection();
  const chapters = await AdminServerService.getChapters();

  return (
    <PageContainer
      title="Manajemen Chapter & Bab"
      description="Kelola urutan dan nama sub-bab dalam kurikulum."
    >
      <div className="space-y-4 pt-2">
        {chapters.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Belum ada data chapter.</p>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          chapters.map((ch: any) => (
            <Card key={ch.id} className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-emerald-600">{ch.courses?.title}</span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{ch.title}</h4>
                <p className="text-xs text-slate-500">{ch.description}</p>
              </div>
              <Badge variant="outline">Urutan #{ch.order_index}</Badge>
            </Card>
          ))
        )}
      </div>
    </PageContainer>
  );
}

export default function AdminChaptersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat data chapter...</div>}>
      <AdminChaptersContent />
    </Suspense>
  );
}
