import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminService } from "@/services/admin.service";
import { connection } from "next/server";
import { HelpCircle } from "lucide-react";

async function AdminQuestionsContent() {
  await connection();
  const questions = await AdminService.getQuestions();

  return (
    <PageContainer
      title="Question Builder & Bank Soal"
      description="Kelola bank soal 7 tipe interaktif (Multiple Choice, True/False, Fill Blank, Matching, Ordering, I'rab, Tashrif)."
    >
      <div className="space-y-4 pt-2">
        {questions.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Belum ada data soal.</p>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          questions.map((q: any) => (
            <Card key={q.id} className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="uppercase font-mono text-[10px]">{q.type}</Badge>
                <span className="text-xs font-bold text-emerald-600">+{q.points} Points</span>
              </div>
              <p className="font-bold text-slate-900 dark:text-slate-100">{q.question_text}</p>
              {q.question_arabic && (
                <p className="font-arabic text-xl font-bold text-emerald-700">{q.question_arabic}</p>
              )}
              {q.explanation && (
                <p className="text-xs text-slate-500 border-t pt-2">💡 Penjelasan: {q.explanation}</p>
              )}
            </Card>
          ))
        )}
      </div>
    </PageContainer>
  );
}

export default function AdminQuestionsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat data soal...</div>}>
      <AdminQuestionsContent />
    </Suspense>
  );
}
