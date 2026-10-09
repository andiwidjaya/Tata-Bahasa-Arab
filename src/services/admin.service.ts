import { createClient } from "@/lib/supabase/server";

export class AdminService {
  /**
   * Check if current user is Admin
   */
  static async isAdmin(): Promise<boolean> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase.from("profiles") as any)
      .select("role")
      .eq("id", user.id)
      .single();

    return profile?.role === "admin";
  }

  // 1. COURSES CRUD
  static async getCourses() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("courses") as any)
      .select("*")
      .order("order_index", { ascending: true });
    return data || [];
  }

  static async createCourse(payload: { title: string; category: string; description: string; level: number }) {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("courses") as any).insert([payload]).select().single();
    if (error) throw error;
    return data;
  }

  static async deleteCourse(id: string) {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("courses") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  // 2. CHAPTERS CRUD
  static async getChapters() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("chapters") as any)
      .select("*, courses(title)")
      .order("order_index", { ascending: true });
    return data || [];
  }

  static async createChapter(payload: { course_id: string; title: string; description?: string }) {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("chapters") as any).insert([payload]).select().single();
    if (error) throw error;
    return data;
  }

  static async deleteChapter(id: string) {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("chapters") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  // 3. LESSONS CRUD
  static async getLessons() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("lessons") as any)
      .select("*, chapters(title)")
      .order("order_index", { ascending: true });
    return data || [];
  }

  static async createLesson(payload: { chapter_id: string; title: string; title_arabic?: string; xp_reward?: number }) {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("lessons") as any).insert([payload]).select().single();
    if (error) throw error;
    return data;
  }

  static async deleteLesson(id: string) {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("lessons") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  // 4. QUESTIONS CRUD
  static async getQuestions() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("questions") as any)
      .select("*, question_options(*)")
      .order("created_at", { ascending: false });
    return data || [];
  }

  static async createQuestion(payload: {
    type: string;
    question_text: string;
    question_arabic?: string;
    explanation?: string;
    points: number;
    options: { option_text: string; option_arabic?: string; is_correct: boolean }[];
  }) {
    const supabase = await createClient();

    // Insert question
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: qData, error: qErr } = await (supabase.from("questions") as any)
      .insert([{
        type: payload.type,
        question_text: payload.question_text,
        question_arabic: payload.question_arabic,
        explanation: payload.explanation,
        points: payload.points,
      }])
      .select()
      .single();

    if (qErr) throw qErr;

    // Insert options
    const optionsPayload = payload.options.map((opt) => ({
      question_id: qData.id,
      option_text: opt.option_text,
      option_arabic: opt.option_arabic,
      is_correct: opt.is_correct,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("question_options") as any).insert(optionsPayload);
    return qData;
  }

  static async deleteQuestion(id: string) {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("questions") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  // 5. AUDIO CRUD
  static async getAudios() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("audio") as any)
      .select("*")
      .order("created_at", { ascending: false });
    return data || [];
  }

  static async createAudio(payload: { title: string; audio_url: string }) {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("audio") as any).insert([payload]).select().single();
    if (error) throw error;
    return data;
  }

  static async deleteAudio(id: string) {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("audio") as any).delete().eq("id", id);
    if (error) throw error;
    return true;
  }
}
