import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminService } from "@/services/admin.service";
import { connection } from "next/server";
import { Volume2 } from "lucide-react";

async function AdminAudioContent() {
  await connection();
  const audios = await AdminService.getAudios();

  return (
    <PageContainer
      title="Manajemen Audio & Storage"
      description="Kelola metadata file audio pelafalan Arab dari Supabase Storage."
    >
      <div className="space-y-4 pt-2">
        {audios.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Belum ada data audio.</p>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          audios.map((a: any) => (
            <Card key={a.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{a.title}</h4>
                  <p className="text-xs text-slate-500 truncate max-w-sm">{a.audio_url}</p>
                </div>
              </div>
              <Badge variant="outline">{a.duration_seconds || 0}s</Badge>
            </Card>
          ))
        )}
      </div>
    </PageContainer>
  );
}

export default function AdminAudioPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat data audio...</div>}>
      <AdminAudioContent />
    </Suspense>
  );
}
