import { createClient } from "@/lib/supabase/client";

function getSupabase() {
  return createClient();
}

export class AdminService {
  /**
   * Check if current user is Admin
   */
  static async isAdmin(): Promise<boolean> {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    if (user.email === "juanda.andi@gmail.com") return true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase.from("profiles") as any)
      .select("role")
      .eq("id", user.id)
      .single();

    return profile?.role === "admin";
  }

  // 1. COURSES CRUD
  static async getCourses() {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("courses") as any)
      .select("*")
      .order("order_index", { ascending: true });
    return data || [];
  }

  static async createCourse(payload: { title: string; category: string; description: string; level: number }) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("courses") as any).insert([payload]).select().single();
    if (error) throw error;
    return data;
  }

  static async updateCourse(id: string, payload: Partial<{ title: string; category: string; description: string; level: number; is_published: boolean }>) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("courses") as any)
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteCourse(id: string) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("courses") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  // 2. CHAPTERS CRUD
  static async getChapters() {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("chapters") as any)
      .select("*, courses(title)")
      .order("order_index", { ascending: true });
    return data || [];
  }

  static async createChapter(payload: { course_id: string; title: string; description?: string; order_index?: number }) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("chapters") as any).insert([payload]).select().single();
    if (error) throw error;
    return data;
  }

  static async updateChapter(id: string, payload: Partial<{ course_id: string; title: string; description: string; order_index: number }>) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("chapters") as any)
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteChapter(id: string) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("chapters") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  // 3. LESSONS CRUD
  static async getLessons() {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("lessons") as any)
      .select("*, chapters(title, course_id)")
      .order("order_index", { ascending: true });
    return data || [];
  }

  static async createLesson(payload: { chapter_id: string; title: string; title_arabic?: string; xp_reward?: number; order_index?: number }) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("lessons") as any).insert([payload]).select().single();
    if (error) throw error;
    return data;
  }

  static async updateLesson(id: string, payload: Partial<{ chapter_id: string; title: string; title_arabic: string; xp_reward: number; order_index: number; is_published: boolean }>) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("lessons") as any)
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteLesson(id: string) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("lessons") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  // 3b. LESSON CONTENTS CRUD
  static async getLessonContents(lessonId: string) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("lesson_contents") as any)
      .select("*, audio(title, audio_url)")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true });
    return data || [];
  }

  static async addLessonContent(payload: {
    lesson_id: string;
    content_type: 'text' | 'arabic_text' | 'example' | 'explanation' | 'audio' | 'exercise';
    content_text?: string;
    content_arabic?: string;
    audio_id?: string;
    order_index?: number;
  }) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("lesson_contents") as any).insert([payload]).select().single();
    if (error) throw error;
    return data;
  }

  static async deleteLessonContent(id: string) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("lesson_contents") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  // 4. QUESTIONS & QUIZZES CRUD
  static async getQuestions() {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("questions") as any)
      .select("*, question_options(*), lessons(title)")
      .order("created_at", { ascending: false });
    return data || [];
  }

  static async createQuestion(payload: {
    lesson_id?: string;
    type: string;
    question_text: string;
    question_arabic?: string;
    explanation?: string;
    points: number;
    options: { option_text: string; option_arabic?: string; is_correct: boolean }[];
  }) {
    const supabase = await getSupabase();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: qData, error: qErr } = await (supabase.from("questions") as any)
      .insert([{
        lesson_id: payload.lesson_id || null,
        type: payload.type,
        question_text: payload.question_text,
        question_arabic: payload.question_arabic,
        explanation: payload.explanation,
        points: payload.points,
      }])
      .select()
      .single();

    if (qErr) throw qErr;

    if (payload.options && payload.options.length > 0) {
      const optionsPayload = payload.options.map((opt, idx) => ({
        question_id: qData.id,
        option_text: opt.option_text,
        option_arabic: opt.option_arabic,
        is_correct: opt.is_correct,
        order_index: idx + 1,
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("question_options") as any).insert(optionsPayload);
    }

    return qData;
  }

  static async deleteQuestion(id: string) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("questions") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  static async getQuizzes() {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("quizzes") as any)
      .select("*, lessons(title), quiz_questions(question_id)")
      .order("created_at", { ascending: false });
    return data || [];
  }

  static async createQuiz(payload: {
    lesson_id?: string;
    title: string;
    description?: string;
    passing_score?: number;
    xp_reward?: number;
    question_ids?: string[];
  }) {
    const supabase = await getSupabase();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: quiz, error } = await (supabase.from("quizzes") as any)
      .insert([{
        lesson_id: payload.lesson_id || null,
        title: payload.title,
        description: payload.description,
        passing_score: payload.passing_score || 70,
        xp_reward: payload.xp_reward || 50,
      }])
      .select()
      .single();

    if (error) throw error;

    if (payload.question_ids && payload.question_ids.length > 0) {
      const qqPayload = payload.question_ids.map((qId, idx) => ({
        quiz_id: quiz.id,
        question_id: qId,
        order_index: idx + 1,
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("quiz_questions") as any).insert(qqPayload);
    }

    return quiz;
  }

  static async deleteQuiz(id: string) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("quizzes") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  // 5. USERS MANAGEMENT & ROLE ACCESS
  static async getUsers() {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("profiles") as any)
      .select("*")
      .order("created_at", { ascending: false });

    // Always ensure juanda.andi@gmail.com is listed / presented with admin role
    const users = data || [];
    return users.map((u: { id: string; full_name: string; role: string; email?: string }) => {
      if (u.email === "juanda.andi@gmail.com") {
        return { ...u, role: "admin", isSuperAdmin: true };
      }
      return u;
    });
  }

  static async updateUserRole(userId: string, role: "user" | "admin") {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("profiles") as any)
      .update({ role, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // 6. AUDIO CRUD
  static async getAudios() {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("audio") as any)
      .select("*")
      .order("created_at", { ascending: false });
    return data || [];
  }

  static async createAudio(payload: { title: string; audio_url: string; duration_seconds?: number; lesson_id?: string; chapter_id?: string }) {
    const supabase = await getSupabase();
    
    // 1. Insert into audio table
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("audio") as any).insert([{
      title: payload.title,
      audio_url: payload.audio_url,
      duration_seconds: payload.duration_seconds || 10,
    }]).select().single();
    
    if (error) console.warn("Audio table insert note:", error);

    // 2. Link to lesson_contents if lesson_id provided
    if (payload.lesson_id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("lesson_contents") as any).insert([{
        lesson_id: payload.lesson_id,
        content_type: "audio",
        content_text: payload.title,
        audio_id: data?.id || null,
        order_index: 99,
      }]);
    }

    return data || payload;
  }

  static async deleteAudio(id: string) {
    const supabase = await getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("audio") as any).delete().eq("id", id);
    if (error) console.warn("Audio delete note:", error);
    return true;
  }
}

