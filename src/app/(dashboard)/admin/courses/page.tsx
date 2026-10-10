import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminServerService } from "@/services/admin-server.service";
import { connection } from "next/server";
import { BookOpen, Layers, HelpCircle, Volume2, ShieldCheck, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

async function AdminCoursesContent() {
  await connection();
  const courses = await AdminServerService.getCourses();

  return (
    <PageContainer
      title="Manajemen Kurikulum & Course"
      description="Tambah, edit, dan hapus modul kursus Nahwu & Shorof."
      action={
        <Link href="/admin/courses">
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>Tambah Course</span>
          </button>
        </Link>
      }
    >
      <div className="space-y-4 pt-2">
        {courses.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Belum ada data course.</p>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          courses.map((course: any) => (
            <Card key={course.id} className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Badge variant={course.category === 'nahwu' ? 'default' : 'secondary'}>
                    {course.category}
                  </Badge>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{course.title}</span>
                </div>
                <p className="text-xs text-slate-500">{course.description}</p>
              </div>
              <Badge variant="outline">Level {course.level}</Badge>
            </Card>
          ))
        )}
      </div>
    </PageContainer>
  );
}

export default function AdminCoursesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat data course...</div>}>
      <AdminCoursesContent />
    </Suspense>
  );
}
