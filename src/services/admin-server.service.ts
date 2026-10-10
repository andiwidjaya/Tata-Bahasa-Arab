import { createClient } from "@/lib/supabase/server";

export class AdminServerService {
  /**
   * Check if current user is Admin (Server-side)
   */
  static async isAdmin(): Promise<boolean> {
    const supabase = await createClient();
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
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("courses") as any)
      .select("*")
      .order("order_index", { ascending: true });
    return data || [];
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

  // 3. LESSONS CRUD
  static async getLessons() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("lessons") as any)
      .select("*, chapters(title, course_id)")
      .order("order_index", { ascending: true });
    return data || [];
  }

  // 4. QUESTIONS & QUIZZES CRUD
  static async getQuestions() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("questions") as any)
      .select("*, question_options(*), lessons(title)")
      .order("created_at", { ascending: false });
    return data || [];
  }

  static async getQuizzes() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("quizzes") as any)
      .select("*, lessons(title), quiz_questions(question_id)")
      .order("created_at", { ascending: false });
    return data || [];
  }

  // 5. USERS MANAGEMENT
  static async getUsers() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("profiles") as any)
      .select("*")
      .order("created_at", { ascending: false });

    const users = data || [];
    return users.map((u: { id: string; full_name: string; role: string; email?: string }) => {
      if (u.email === "juanda.andi@gmail.com") {
        return { ...u, role: "admin", isSuperAdmin: true };
      }
      return u;
    });
  }

  // 6. AUDIO CRUD
  static async getAudios() {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("audio") as any)
      .select("*")
      .order("created_at", { ascending: false });
    return data || [];
  }
}
