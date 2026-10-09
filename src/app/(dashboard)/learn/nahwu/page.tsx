import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle } from "lucide-react";

export default function NahwuLearnPage() {
  return (
    <PageContainer
      title="Kurikulum Ilmu Nahwu"
      description="Pelajari kaidah penyusunan kalimat Bahasa Arab step-by-step."
    >
      <div className="space-y-6">
        {/* Sample Active Lesson Display */}
        <Card className="border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Badge variant="default">Level 1 - Bab 1</Badge>
              <span className="text-xs font-semibold text-emerald-600">Pondasi Dasar</span>
            </div>
            <CardTitle className="text-xl font-bold flex items-center justify-between">
              <span>Pengenalan Al-Kalimah (الكَلِمَةُ)</span>
              <span className="font-arabic text-2xl text-emerald-700">الكَلِمَةُ</span>
            </CardTitle>
            <CardDescription>
              Kalimah adalah lafaz yang mempunyai arti tunggal. Terbagi menjadi 3 jenis: Isim, Fi'il, dan Harf.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="pt-2 flex gap-3">
              <Button size="sm" className="space-x-2">
                <PlayCircle className="w-4 h-4" />
                <span>Mulai Pelajaran (Placeholder)</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chapter Grid Placeholder */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Daftar Bab Pembelajaran</h3>
          {[
            { id: 1, title: 'Bab 1: Pengenalan Al-Kalimah (Isim, Fi\'il, Harf)', done: true },
            { id: 2, title: 'Bab 2: Tanda-tanda Isim, Fi\'il, dan Harf', done: false },
            { id: 3, title: 'Bab 3: Pembagian Kalimat (Al-Kalam & Al-Jumlah)', done: false },
            { id: 4, title: 'Bab 4: Pengenalan I\'rab & Bina\'', done: false },
          ].map((chap) => (
            <div key={chap.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {chap.done ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700" />
                )}
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{chap.title}</span>
              </div>
              <Badge variant={chap.done ? "default" : "outline"}>
                {chap.done ? "Selesai" : "Terkunci"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
