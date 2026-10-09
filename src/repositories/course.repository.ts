import { Course } from '@/types/learning';

// Mock repository layer to separate UI from data access logic
export class CourseRepository {
  static async getCourses(): Promise<Course[]> {
    return [
      {
        id: 'c-nahwu-1',
        title: 'Nahwu Dasar (Pengenalan Kalimah & I\'rab)',
        category: 'nahwu',
        description: 'Pelajari pondasi dasar struktur kalimat Bahasa Arab, Al-Kalimah, dan Al-Kalam.',
        level: 1,
        totalChapters: 6,
        orderIndex: 1,
      },
      {
        id: 'c-shorof-1',
        title: 'Shorof Dasar (Tashrif Tsulatsi Mujarrad)',
        category: 'shorof',
        description: 'Kuasai pola perubahan kata kerja dasar 6 bab Tashrif Tsulatsi Mujarrad.',
        level: 1,
        totalChapters: 6,
        orderIndex: 1,
      },
    ];
  }
}
