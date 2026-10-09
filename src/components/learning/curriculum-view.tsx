"use client";

import * as React from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChapterDetail, CourseDetail } from "@/services/learning.service";
import { PlayCircle, CheckCircle2, Lock, BookOpen } from "lucide-react";

interface CurriculumViewProps {
  course: CourseDetail;
  chapters: ChapterDetail[];
}

export function CurriculumView({ course, chapters }: CurriculumViewProps) {
  const [completedIds, setCompletedIds] = React.useState<string[]>([]);
  const isNahwu = course.category === "nahwu";
  const themeColor = isNahwu ? "emerald" : "amber";

  React.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("completed_lessons") || "[]");
      setCompletedIds(saved);
    } catch (e) {}
  }, []);

  // Compute all lessons in order
  let previousCompleted = true; // First lesson is unlocked
  let nextActiveLesson: { chapterId: string; lessonId: string; title: string } | null = null;

  const processedChapters = chapters.map((chapter) => {
    const processedLessons = chapter.lessons.map((lesson) => {
      const isCompleted = lesson.isCompleted || completedIds.includes(lesson.id);
      const isUnlocked = previousCompleted;

      if (isUnlocked && !isCompleted && !nextActiveLesson) {
        nextActiveLesson = {
          chapterId: chapter.id,
          lessonId: lesson.id,
          title: lesson.title,
        };
      }

      previousCompleted = isCompleted;

      return {
        ...lesson,
        isCompleted,
        isUnlocked,
      };
    });

    return {
      ...chapter,
      lessons: processedLessons,
    };
  });

  // Fallback if all completed or none
  if (!nextActiveLesson && chapters.length > 0 && chapters[0].lessons.length > 0) {
    const firstCh = chapters[0];
    const firstL = firstCh.lessons[0];
    nextActiveLesson = {
      chapterId: firstCh.id,
      lessonId: firstL.id,
      title: firstL.title,
    };
  }

  return (
    <PageContainer
      title={course.title}
      description={course.description || "Pelajari kaidah Bahasa Arab step-by-step."}
      action={<Badge variant={isNahwu ? "default" : "secondary"}>Level {course.level}</Badge>}
    >
      <div className="space-y-6 pt-2">
        {/* Active Lesson Header Card */}
        {nextActiveLesson && (
          <Card className={isNahwu ? "border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20" : "border-amber-500/40 bg-amber-50/20 dark:bg-amber-950/20"}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Badge variant={isNahwu ? "default" : "secondary"}>Pelajaran Aktif</Badge>
                <span className={`text-xs font-semibold ${isNahwu ? "text-emerald-600" : "text-amber-600"}`}>
                  Kurikulum {isNahwu ? "Nahwu" : "Shorof"}
                </span>
              </div>
              <CardTitle className="text-xl font-bold flex items-center justify-between">
                <span>{nextActiveLesson.title}</span>
              </CardTitle>
              <CardDescription>
                Klik tombol di bawah ini untuk memulai pelajaran dan membuka materi berikutnya.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/learn/${course.category}/${nextActiveLesson.chapterId}/${nextActiveLesson.lessonId}`}>
                <Button size="sm" variant={isNahwu ? "default" : "secondary"} className="space-x-2">
                  <PlayCircle className="w-4 h-4" />
                  <span>Mulai Pelajaran</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Chapters and Lessons Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Daftar Bab Pembelajaran</h3>
          {processedChapters.map((chapter) => (
            <Card key={chapter.id} className="border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                  <BookOpen className={`w-5 h-5 ${isNahwu ? "text-emerald-600" : "text-amber-500"}`} />
                  <span>{chapter.title}</span>
                </CardTitle>
                {chapter.description && <CardDescription>{chapter.description}</CardDescription>}
              </CardHeader>
              <CardContent className="space-y-3">
                {chapter.lessons.map((lesson) => {
                  const lessonUrl = `/learn/${course.category}/${chapter.id}/${lesson.id}`;

                  if (lesson.isUnlocked) {
                    return (
                      <Link
                        key={lesson.id}
                        href={lessonUrl}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 dark:hover:border-emerald-700 hover:shadow-sm transition flex justify-between items-center group cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          {lesson.isCompleted ? (
                            <CheckCircle2 className={`w-5 h-5 ${isNahwu ? "text-emerald-600" : "text-amber-500"}`} />
                          ) : (
                            <PlayCircle className={`w-5 h-5 ${isNahwu ? "text-emerald-600" : "text-amber-500"}`} />
                          )}
                          <div>
                            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition">
                              {lesson.title}
                            </span>
                            {lesson.titleArabic && (
                              <p className="font-arabic text-sm text-emerald-700 dark:text-emerald-400 font-bold">
                                {lesson.titleArabic}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge variant={lesson.isCompleted ? (isNahwu ? "default" : "secondary") : "outline"}>
                          {lesson.isCompleted ? "Selesai" : "Mulai"}
                        </Badge>
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={lesson.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 opacity-60 flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-slate-400" />
                        <div>
                          <span className="font-semibold text-sm text-slate-500 dark:text-slate-400">
                            {lesson.title}
                          </span>
                          {lesson.titleArabic && (
                            <p className="font-arabic text-sm text-slate-400">
                              {lesson.titleArabic}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline">Terkunci</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
