// API layer — كل طلبات البيانات تمر من هنا.
// حالياً بترجع البيانات المحلية (mock) بعد تأخير بسيط يحاكي الشبكة.
// عند ربط الـ backend الحقيقي، غيّر جسم الدوال فقط — الواجهة تفضل كما هي.

import { getAllCourses, getCourseById, type CourseData } from "./courses-data";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const api = {
  courses: {
    list: async (): Promise<CourseData[]> => {
      await delay();
      return getAllCourses();
    },
    get: async (id: number): Promise<CourseData | undefined> => {
      await delay();
      return getCourseById(id);
    },
  },
  auth: {
    login: async (email: string, _password: string) => {
      await delay(500);
      return { token: "mock-token", user: { email, name: email.split("@")[0], role: "student" as const } };
    },
    register: async (name: string, email: string, _password: string) => {
      await delay(500);
      return { token: "mock-token", user: { email, name, role: "student" as const } };
    },
  },
  enroll: async (courseId: number) => {
    await delay(400);
    return { success: true, courseId };
  },
  submitQuiz: async (courseId: number, score: number) => {
    await delay(400);
    return { success: true, courseId, score };
  },
};
