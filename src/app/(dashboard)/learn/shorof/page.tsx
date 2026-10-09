import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle } from "lucide-react";

export default function ShorofLearnPage() {
  return (
    <PageContainer
      title="Kurikulum Ilmu Shorof"
      description="Pelajari pola perubahan bentuk kata (Tashrif) Bahasa Arab."
    >
      <div className="space-y-6">
        <Card className="border-amber-500/40 bg-amber-50/20 dark:bg-amber-950/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Level 1 - Bab 1</Badge>
              <span className="text-xs font-semibold text-amber-600">Tashrif Tsulatsi Mujarrad</span>
            </div>
            <CardTitle className="text-xl font-bold flex items-center justify-between">
              <span>Wazan Bab 1: فَعَلَ - يَفْعُلُ</span>
              <span className="font-arabic text-2xl text-amber-700">فَعَلَ - يَفْعُلُ</span>
            </CardTitle>
            <CardDescription>
              Wazan utama kata kerja 3 huruf tanpa tambahan. Contoh: نَصَرَ - يَنْصُرُ (Menolong).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="pt-2 flex gap-3">
              <Button size="sm" variant="secondary" className="space-x-2">
                <PlayCircle className="w-4 h-4" />
                <span>Mulai Tashrif (Placeholder)</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Daftar Bab Tashrif</h3>
          {[
            { id: 1, title: 'Bab 1: Wazan فَعَلَ - يَفْعُلُ (نَصَرَ - يَنْصُرُ)', done: true },
            { id: 2, title: 'Bab 2: Wazan فَعَلَ - يَفْعِلُ (ضَرَبَ - يَضْرِبُ)', done: false },
            { id: 3, title: 'Bab 3: Wazan فَعَلَ - يَفْعَلُ (فَتَحَ - يَفْتَحُ)', done: false },
          ].map((chap) => (
            <div key={chap.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {chap.done ? (
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700" />
                )}
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{chap.title}</span>
              </div>
              <Badge variant={chap.done ? "secondary" : "outline"}>
                {chap.done ? "Selesai" : "Terkunci"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
