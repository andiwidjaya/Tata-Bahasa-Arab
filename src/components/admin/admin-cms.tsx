"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Layers,
  HelpCircle,
  Volume2,
  Users,
  Plus,
  Trash2,
  CheckCircle,
  ShieldCheck,
  FileText,
  Sparkles,
  Edit,
  Save,
  X,
  ArrowRight,
  ListOrdered
} from "lucide-react";

interface AdminCMSProps {
  initialCourses: any[];
  initialChapters: any[];
  initialLessons: any[];
  initialQuestions: any[];
  initialQuizzes: any[];
  initialUsers: any[];
  initialAudios: any[];
}

export function AdminCMS({
  initialCourses,
  initialChapters,
  initialLessons,
  initialQuestions,
  initialQuizzes,
  initialUsers,
  initialAudios,
}: AdminCMSProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "chapters" | "lessons" | "questions" | "users" | "audio">("overview");

  // State arrays
  const [courses, setCourses] = useState(initialCourses);
  const [chapters, setChapters] = useState(initialChapters);
  const [lessons, setLessons] = useState(initialLessons);
  const [questions, setQuestions] = useState(initialQuestions);
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [users, setUsers] = useState(initialUsers);
  const [audios, setAudios] = useState(initialAudios);

  // Form Modals / Input States
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);

  // New Course Form State
  const [courseForm, setCourseForm] = useState({ title: "", category: "shorof", description: "", level: 1 });
  // New Chapter Form State
  const [chapterForm, setChapterForm] = useState({ course_id: courses[0]?.id || "", title: "", description: "", order_index: 1 });
  // New Lesson Form State
  const [lessonForm, setLessonForm] = useState({ chapter_id: chapters[0]?.id || "", title: "", title_arabic: "", xp_reward: 25, order_index: 1 });
  // New Question Form State
  const [questionForm, setQuestionForm] = useState({
    lesson_id: "",
    type: "tashrif",
    question_text: "",
    question_arabic: "",
    explanation: "",
    points: 10,
    options: [
      { option_text: "", option_arabic: "", is_correct: true },
      { option_text: "", option_arabic: "", is_correct: false },
      { option_text: "", option_arabic: "", is_correct: false },
    ],
  });
  // New Audio Form State
  const [audioForm, setAudioForm] = useState({ title: "", audio_url: "", duration_seconds: 10 });

  // Status message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // HANDLERS
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title) return;
    const newCourse = {
      id: "course-" + Date.now(),
      title: courseForm.title,
      category: courseForm.category,
      description: courseForm.description,
      level: Number(courseForm.level),
      order_index: courses.length + 1,
      is_published: true,
    };
    setCourses([...courses, newCourse]);
    setShowCourseModal(false);
    setCourseForm({ title: "", category: "shorof", description: "", level: 1 });
    showToast("✓ Course baru berhasil ditambahkan!");
  };

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterForm.title) return;
    const newChapter = {
      id: "chap-" + Date.now(),
      course_id: chapterForm.course_id || courses[0]?.id,
      title: chapterForm.title,
      description: chapterForm.description,
      order_index: Number(chapterForm.order_index),
      courses: { title: courses.find(c => c.id === chapterForm.course_id)?.title || "General" },
    };
    setChapters([...chapters, newChapter]);
    setShowChapterModal(false);
    setChapterForm({ course_id: courses[0]?.id || "", title: "", description: "", order_index: 1 });
    showToast("✓ Bab / Chapter baru berhasil ditambahkan!");
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.title) return;
    const newLesson = {
      id: "lesson-" + Date.now(),
      chapter_id: lessonForm.chapter_id || chapters[0]?.id,
      title: lessonForm.title,
      title_arabic: lessonForm.title_arabic,
      xp_reward: Number(lessonForm.xp_reward),
      order_index: Number(lessonForm.order_index),
      is_published: true,
      chapters: { title: chapters.find(ch => ch.id === lessonForm.chapter_id)?.title || "General Bab" },
    };
    setLessons([...lessons, newLesson]);
    setShowLessonModal(false);
    setLessonForm({ chapter_id: chapters[0]?.id || "", title: "", title_arabic: "", xp_reward: 25, order_index: 1 });
    showToast("✓ Materi Pembelajaran baru berhasil ditambahkan!");
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionForm.question_text) return;
    const newQuestion = {
      id: "q-" + Date.now(),
      lesson_id: questionForm.lesson_id,
      type: questionForm.type,
      question_text: questionForm.question_text,
      question_arabic: questionForm.question_arabic,
      explanation: questionForm.explanation,
      points: Number(questionForm.points),
      question_options: questionForm.options.filter(o => o.option_text.trim() !== ""),
    };
    setQuestions([newQuestion, ...questions]);
    setShowQuestionModal(false);
    setQuestionForm({
      lesson_id: "",
      type: "tashrif",
      question_text: "",
      question_arabic: "",
      explanation: "",
      points: 10,
      options: [
        { option_text: "", option_arabic: "", is_correct: true },
        { option_text: "", option_arabic: "", is_correct: false },
        { option_text: "", option_arabic: "", is_correct: false },
      ],
    });
    showToast("✓ Soal Latihan baru berhasil disimpan ke Bank Soal!");
  };

  const handleAddAudio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioForm.title || !audioForm.audio_url) return;
    const newAudio = {
      id: "audio-" + Date.now(),
      title: audioForm.title,
      audio_url: audioForm.audio_url,
      duration_seconds: Number(audioForm.duration_seconds),
      created_at: new Date().toISOString(),
    };
    setAudios([newAudio, ...audios]);
    setShowAudioModal(false);
    setAudioForm({ title: "", audio_url: "", duration_seconds: 10 });
    showToast("✓ File Audio pelafalan berhasil ditambahkan!");
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    showToast("Course telah dihapus.");
  };

  const handleDeleteChapter = (id: string) => {
    setChapters(chapters.filter(c => c.id !== id));
    showToast("Chapter telah dihapus.");
  };

  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
    showToast("Materi lesson telah dihapus.");
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    showToast("Soal latihan telah dihapus dari bank soal.");
  };

  const handleToggleUserRole = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id && !u.isSuperAdmin) {
        const nextRole = u.role === "admin" ? "user" : "admin";
        return { ...u, role: nextRole };
      }
      return u;
    }));
    showToast("Hak akses role user diperbarui!");
  };

  return (
    <PageContainer
      title="Admin Content Management System (CMS)"
      description="Kelola materi pembelajaran Al-Amtsilah At-Tashrifiyyah & Matan Al-Ajrumiyyah, kuis latihan, audio, dan administrator platform."
    >
      {/* Toast Banner */}
      {toastMessage && (
        <div className="mb-4 p-4 rounded-xl bg-emerald-600 text-white font-semibold flex items-center justify-between shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-200" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white opacity-80 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("courses")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "courses"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Kursus ({courses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("chapters")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "chapters"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Bab ({chapters.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("lessons")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "lessons"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Materi ({lessons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("questions")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "questions"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Latihan & Bank Soal ({questions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "users"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Pengguna & Role ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("audio")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "audio"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Audio Pelafalan ({audios.length})</span>
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Admin Banner for juanda.andi@gmail.com */}
          <Card className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white border-emerald-800 p-6 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                  <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30">Administrator Principal</Badge>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight">Selamat Datang di CMS Administrator</h2>
                <p className="text-sm text-emerald-200/80">
                  Akun terdaftar: <span className="font-mono font-bold text-white">juanda.andi@gmail.com</span> — Memiliki hak penuh mengelola materi Kitab Al-Amtsilah At-Tashrifiyyah, Matan Al-Ajrumiyyah, bank soal latihan 7 tipe, dan akses platform.
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowLessonModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold">
                  <Plus className="w-4 h-4 mr-1" /> Tambah Materi
                </Button>
                <Button onClick={() => setShowQuestionModal(true)} variant="outline" className="border-emerald-700 text-emerald-300 hover:bg-emerald-900/50">
                  <Plus className="w-4 h-4 mr-1" /> Buat Latihan
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 border-l-4 border-l-emerald-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Kursus</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{courses.length} Kursus</h3>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-l-4 border-l-teal-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Bab / Chapters</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{chapters.length} Bab</h3>
                </div>
                <div className="p-3 bg-teal-100 dark:bg-teal-950 text-teal-600 rounded-xl">
                  <Layers className="w-6 h-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-l-4 border-l-cyan-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Materi Pembelajaran</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{lessons.length} Lesson</h3>
                </div>
                <div className="p-3 bg-cyan-100 dark:bg-cyan-950 text-cyan-600 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-l-4 border-l-amber-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Bank Soal & Latihan</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{questions.length} Soal</h3>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded-xl">
                  <HelpCircle className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Access Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <Card className="p-5 space-y-4 hover:border-emerald-500 transition">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Kelola Materi Al-Amtsilah At-Tashrifiyyah</h3>
                  <p className="text-xs text-slate-500">Input matan, terjemahan, pola Tashrif Istilahi & Lughawi.</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Lengkap dengan 8 Bab utama mencakup Tashrif Istilahi (Tsulatsi Mujarrad, Rubai, Mazid) & Tashrif Lughawi 14 Dhamir.
              </p>
              <Button onClick={() => setActiveTab("lessons")} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Kelola Materi Pembelajaran →
              </Button>
            </Card>

            <Card className="p-5 space-y-4 hover:border-emerald-500 transition">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Buat Latihan & Kuis</h3>
                  <p className="text-xs text-slate-500">Rancang soal interaktif (Pilihan Ganda, Tashrif, I'rab, Isian).</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Tambahkan pilihan jawaban, tentukan kunci jawaban benar, set poin XP, dan berikan pembahasan penjelasan.
              </p>
              <Button onClick={() => setActiveTab("questions")} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                Buka Bank Soal & Kuis →
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* COURSES TAB */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Daftar Kursus Kurikulum</h3>
            <Button onClick={() => setShowCourseModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-1" /> Tambah Kursus Baru
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c) => (
              <Card key={c.id} className="p-5 space-y-3 relative">
                <div className="flex justify-between items-start">
                  <Badge variant={c.category === "nahwu" ? "default" : "secondary"} className="uppercase">
                    {c.category}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCourse(c.id)} className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <h4 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">{c.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                <div className="flex justify-between items-center border-t pt-3 text-xs text-slate-400">
                  <span>Level: {c.level}</span>
                  <span>Urutan: #{c.order_index}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* CHAPTERS TAB */}
      {activeTab === "chapters" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Daftar Bab / Chapters</h3>
            <Button onClick={() => setShowChapterModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-1" /> Tambah Bab Baru
            </Button>
          </div>

          <div className="space-y-3">
            {chapters.map((ch) => (
              <Card key={ch.id} className="p-4 flex items-center justify-between hover:border-emerald-500 transition">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-[10px]">{ch.courses?.title || "Kurikulum"}</Badge>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{ch.title}</span>
                  </div>
                  <p className="text-xs text-slate-500">{ch.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Bab #{ch.order_index}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteChapter(ch.id)} className="text-rose-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* LESSONS TAB */}
      {activeTab === "lessons" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Manajemen Materi Pembelajaran (Lessons)</h3>
              <p className="text-xs text-slate-500">Kelola judul materi, matan Arab Al-Amtsilah At-Tashrifiyyah, & konten.</p>
            </div>
            <Button onClick={() => setShowLessonModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-1" /> Input Materi Baru
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((l) => (
              <Card key={l.id} className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-emerald-600">{l.chapters?.title}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">+{l.xp_reward} XP</Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteLesson(l.id)} className="text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">{l.title}</h4>
                {l.title_arabic && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
                    <p className="font-arabic text-xl font-bold text-emerald-700 dark:text-emerald-300 text-right dir-rtl">{l.title_arabic}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* QUESTIONS & EXERCISES TAB */}
      {activeTab === "questions" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Bank Soal & Pembuat Latihan</h3>
              <p className="text-xs text-slate-500">Kelola soal latihan untuk menguji hafalan & pemahaman Tashrif murid.</p>
            </div>
            <Button onClick={() => setShowQuestionModal(true)} className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
              <Plus className="w-4 h-4 mr-1" /> Buat Soal Latihan Baru
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((q) => (
              <Card key={q.id} className="p-5 space-y-3 border-l-4 border-l-amber-500">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="uppercase font-mono text-[10px] bg-amber-50 dark:bg-amber-950 text-amber-700 border-amber-300">
                      {q.type}
                    </Badge>
                    <span className="text-xs font-bold text-emerald-600">+{q.points} Poin XP</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteQuestion(q.id)} className="text-rose-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{q.question_text}</h4>
                  {q.question_arabic && (
                    <p className="font-arabic text-xl font-bold text-emerald-700 dark:text-emerald-300 text-right dir-rtl">
                      {q.question_arabic}
                    </p>
                  )}
                </div>

                {q.question_options && q.question_options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.question_options.map((opt: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-xs flex justify-between items-center ${
                          opt.is_correct
                            ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold"
                            : "bg-slate-50 dark:bg-slate-800 border-slate-200 text-slate-600"
                        }`}
                      >
                        <span>{opt.option_text} {opt.option_arabic && <span className="font-arabic font-bold ml-1">({opt.option_arabic})</span>}</span>
                        {opt.is_correct && <Badge className="bg-emerald-600 text-[10px]">Kunci Jawaban</Badge>}
                      </div>
                    ))}
                  </div>
                )}

                {q.explanation && (
                  <p className="text-xs text-slate-500 border-t pt-2 mt-2">
                    💡 <span className="font-bold">Penjelasan:</span> {q.explanation}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* USERS & ROLES TAB */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Hak Akses & Pengguna Platform</h3>
              <p className="text-xs text-slate-500">Daftar akun pengguna dan administrator terverifikasi.</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Highlights juanda.andi@gmail.com */}
            <Card className="p-4 bg-gradient-to-r from-slate-900 to-emerald-950 text-white border-amber-500 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-400 text-slate-950 rounded-xl font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-base">Juanda Andi</span>
                    <Badge className="bg-amber-400 text-slate-950 font-bold">Super Admin Principal</Badge>
                  </div>
                  <p className="text-xs text-emerald-200 font-mono">juanda.andi@gmail.com</p>
                </div>
              </div>
              <Badge variant="outline" className="border-amber-400 text-amber-300">Hak Akses Penuh</Badge>
            </Card>

            {users.filter(u => u.email !== "juanda.andi@gmail.com").map((u) => (
              <Card key={u.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600">
                    {(u.full_name || u.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{u.full_name || "Pengguna"}</h4>
                    <p className="text-xs text-slate-500">{u.email || u.id}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                    {u.role}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleToggleUserRole(u.id)}>
                    Ubah Role
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* AUDIO TAB */}
      {activeTab === "audio" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">File Audio Pelafalan & Audio Storage</h3>
            <Button onClick={() => setShowAudioModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-1" /> Upload Audio Baru
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audios.map((a) => (
              <Card key={a.id} className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm">{a.title}</h4>
                  <Button variant="ghost" size="sm" onClick={() => setAudios(audios.filter(x => x.id !== a.id))} className="text-rose-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 font-mono truncate">{a.audio_url}</p>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Durasi: {a.duration_seconds || 5}s</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH KURSUS */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 space-y-4 bg-white dark:bg-slate-900 border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Tambah Course Kurikulum Baru</h3>
              <button onClick={() => setShowCourseModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddCourse} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Judul Course</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kitab Al-Amtsilah At-Tashrifiyyah Lanjutan"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Kategori</label>
                <select
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                >
                  <option value="shorof">Shorof (Tashrif)</option>
                  <option value="nahwu">Nahwu (I'rab & Kaidah)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan cakupan materi..."
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setShowCourseModal(false)}>Batal</Button>
                <Button type="submit" className="bg-emerald-600 text-white font-bold">Simpan Course</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* MODAL: TAMBAH BAB / CHAPTER */}
      {showChapterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 space-y-4 bg-white dark:bg-slate-900 border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Tambah Bab Baru</h3>
              <button onClick={() => setShowChapterModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddChapter} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Pilih Course Induk</label>
                <select
                  value={chapterForm.course_id}
                  onChange={(e) => setChapterForm({ ...chapterForm, course_id: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title} ({c.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Judul Bab (Termasuk Bahasa Arab Jika Ada)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bab 1: Tashrif Istilahi Tsulatsi Mujarrad"
                  value={chapterForm.title}
                  onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Deskripsi Bab</label>
                <textarea
                  rows={2}
                  placeholder="Penjelasan pokok bahasan dalam bab ini..."
                  value={chapterForm.description}
                  onChange={(e) => setChapterForm({ ...chapterForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setShowChapterModal(false)}>Batal</Button>
                <Button type="submit" className="bg-emerald-600 text-white font-bold">Simpan Bab</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* MODAL: INPUT MATERI / LESSON */}
      {showLessonModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6 space-y-4 bg-white dark:bg-slate-900 border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Input Materi Pembelajaran Baru</h3>
              <button onClick={() => setShowLessonModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddLesson} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Pilih Bab / Chapter</label>
                <select
                  value={lessonForm.chapter_id}
                  onChange={(e) => setLessonForm({ ...lessonForm, chapter_id: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                >
                  {chapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>{ch.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Judul Materi (Indonesia)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 1. Bab 1: Wazan فَعَلَ - يَفْعُلُ (نَصَرَ - يَنْصُرُ)"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Judul Bahasa Arab / Matan</label>
                <input
                  type="text"
                  placeholder="Contoh: فَعَلَ - يَفْعُلُ - فَعْلًا"
                  value={lessonForm.title_arabic}
                  onChange={(e) => setLessonForm({ ...lessonForm, title_arabic: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 font-arabic text-right dir-rtl"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">XP Reward (Hadiah XP)</label>
                <input
                  type="number"
                  value={lessonForm.xp_reward}
                  onChange={(e) => setLessonForm({ ...lessonForm, xp_reward: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setShowLessonModal(false)}>Batal</Button>
                <Button type="submit" className="bg-emerald-600 text-white font-bold">Simpan Materi</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* MODAL: BUAT SOAL LATIHAN */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-xl p-6 space-y-4 bg-white dark:bg-slate-900 border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Buat Soal Latihan & Kuis Baru</h3>
              <button onClick={() => setShowQuestionModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="text-xs font-bold block mb-1">Tipe Soal Latihan</label>
                <select
                  value={questionForm.type}
                  onChange={(e) => setQuestionForm({ ...questionForm, type: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                >
                  <option value="tashrif">Tashrif (Pola Kata Kerja Al-Amtsilah)</option>
                  <option value="multiple_choice">Pilihan Ganda (Multiple Choice)</option>
                  <option value="true_false">Benar / Salah (True or False)</option>
                  <option value="irab">I'rab Kalimat</option>
                  <option value="fill_blank">Isi Titik-Titik (Fill in Blank)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Pertanyaan (Indonesia)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tentukan Fi'il Mudhari' dari kata kerja نَصَرَ!"
                  value={questionForm.question_text}
                  onChange={(e) => setQuestionForm({ ...questionForm, question_text: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Teks / Matan Arab Soal (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: مَا هُوَ الفِعْلُ المُضَارِعُ مِنْ نَصَرَ؟"
                  value={questionForm.question_arabic}
                  onChange={(e) => setQuestionForm({ ...questionForm, question_arabic: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 font-arabic text-right dir-rtl"
                />
              </div>

              {/* Options */}
              <div className="space-y-2 border-t pt-3">
                <label className="text-xs font-bold block text-slate-700 dark:text-slate-300">Pilihan Jawaban & Kunci Jawaban</label>
                {questionForm.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correct_option"
                      checked={opt.is_correct}
                      onChange={() => {
                        const nextOptions = questionForm.options.map((o, i) => ({ ...o, is_correct: i === idx }));
                        setQuestionForm({ ...questionForm, options: nextOptions });
                      }}
                    />
                    <input
                      type="text"
                      placeholder={`Pilihan ${idx + 1} (Indonesia)`}
                      value={opt.option_text}
                      onChange={(e) => {
                        const nextOptions = [...questionForm.options];
                        nextOptions[idx].option_text = e.target.value;
                        setQuestionForm({ ...questionForm, options: nextOptions });
                      }}
                      className="flex-1 p-2 rounded-lg border text-xs bg-slate-50 dark:bg-slate-800"
                    />
                    <input
                      type="text"
                      placeholder={`Arab`}
                      value={opt.option_arabic}
                      onChange={(e) => {
                        const nextOptions = [...questionForm.options];
                        nextOptions[idx].option_arabic = e.target.value;
                        setQuestionForm({ ...questionForm, options: nextOptions });
                      }}
                      className="w-28 p-2 rounded-lg border text-xs bg-slate-50 dark:bg-slate-800 font-arabic text-right"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Pembahasan / Penjelasan Jawaban Benar</label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Fi'il Mudhari' dari nasara adalah yansuru (يَنْصُرُ) mengikuti wazan Fa'ala - Yaf'ulu."
                  value={questionForm.explanation}
                  onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setShowQuestionModal(false)}>Batal</Button>
                <Button type="submit" className="bg-amber-600 text-white font-bold">Simpan Soal ke Bank Soal</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* MODAL: UPLOAD AUDIO */}
      {showAudioModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 space-y-4 bg-white dark:bg-slate-900 border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Input Audio Clips</h3>
              <button onClick={() => setShowAudioModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddAudio} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Judul Audio</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pelafalan Tashrif Nasara Yansuru"
                  value={audioForm.title}
                  onChange={(e) => setAudioForm({ ...audioForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">URL Audio Storage / MP3</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={audioForm.audio_url}
                  onChange={(e) => setAudioForm({ ...audioForm, audio_url: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setShowAudioModal(false)}>Batal</Button>
                <Button type="submit" className="bg-emerald-600 text-white font-bold">Simpan Audio</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </PageContainer>
  );
}
