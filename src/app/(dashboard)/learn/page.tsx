import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Layers } from "lucide-react";

export default function LearnPage() {
  return (
    <PageContainer
      title="Pusat Pembelajaran Bahasa Arab"
      description="Pilih cabang ilmu Bahasa Arab yang ingin Anda pelajari hari ini."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Nahwu Card */}
        <Card className="border-2 border-emerald-200 dark:border-emerald-800/60 hover:shadow-xl transition">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <Badge variant="default">Ilmu Nahwu</Badge>
              <span className="font-arabic text-3xl font-bold text-emerald-700 dark:text-emerald-400">عِلْمُ النَّحْوِ</span>
            </div>
            <CardTitle className="text-2xl font-bold">Struktur & Jabatan Kalimat</CardTitle>
            <CardDescription className="text-base">
              Pelajari aturan perubahan harakat akhir kata dan kedudukannya dalam kalimat Bahasa Arab (Mubtada', Khabar, Fa'il, Maf'ul, dll).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>6 Level Materi</span>
              </div>
              <div className="flex items-center space-x-1">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>36 Sub-Bab</span>
              </div>
            </div>
            <Link href="/learn/nahwu" className="block pt-2">
              <button className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition">
                <span>Mulai Belajar Nahwu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </CardContent>
        </Card>

        {/* Shorof Card */}
        <Card className="border-2 border-amber-200 dark:border-amber-800/60 hover:shadow-xl transition">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <Badge variant="secondary">Ilmu Shorof</Badge>
              <span className="font-arabic text-3xl font-bold text-amber-700 dark:text-amber-400">عِلْمُ الصَّرْفِ</span>
            </div>
            <CardTitle className="text-2xl font-bold">Pola & Perubahan Kata</CardTitle>
            <CardDescription className="text-base">
              Pelajari bentukan kata (Tashrif), wazan kata kerja, pembentukan kata benda, dan turunan makna kata kerja Arab.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>6 Level Materi</span>
              </div>
              <div className="flex items-center space-x-1">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>30 Sub-Bab</span>
              </div>
            </div>
            <Link href="/learn/shorof" className="block pt-2">
              <button className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center justify-center space-x-2 transition">
                <span>Mulai Belajar Shorof</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
