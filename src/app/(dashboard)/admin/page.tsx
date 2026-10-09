import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, HelpCircle, Volume2, Users, Layers, Plus } from "lucide-react";

export default function AdminPage() {
  const cmsModules = [
    { title: 'Course Management', desc: 'Kelola kurikulum Nahwu & Shorof', icon: BookOpen, count: '2 Kursus' },
    { title: 'Lesson Management', desc: 'Kelola bab, materi markdown, & urutan', icon: Layers, count: '66 Bab' },
    { title: 'Question Management', desc: 'Kelola bank soal & pilihan jawaban', icon: HelpCircle, count: '150 Soal' },
    { title: 'Audio Management', desc: 'Upload audio pelafalan ke Supabase Storage', icon: Volume2, count: '45 Files' },
    { title: 'User Management', desc: 'Kelola akun pengguna & hak akses role', icon: Users, count: '1,240 Users' },
  ];

  return (
    <PageContainer
      title="Admin Content Management System (CMS)"
      description="Kelola materi pembelajaran, audio, bank soal, dan pengguna platform."
      action={
        <Button className="space-x-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Content Baru</span>
        </Button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {cmsModules.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} className="hover:border-emerald-500 transition cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline">{m.count}</Badge>
                </div>
                <CardTitle className="text-lg font-bold">{m.title}</CardTitle>
                <CardDescription>{m.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="w-full text-emerald-600">
                  Kelola Modul →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
