// حفظ تقدم المستخدم في الكورسات والاختبارات — localStorage مؤقتاً لحد الـ backend.

const PROGRESS_KEY = "sidrah-progress";
const QUIZ_KEY = "sidrah-quiz-history";
const NOTES_KEY = "sidrah-notes";
const BOOKMARKS_KEY = "sidrah-bookmarks";

export interface CourseProgress {
  completedLessons: number[];
}

function read<T>(key: string): Record<string, T> {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function write(key: string, data: unknown) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCourseProgress(courseId: number): CourseProgress {
  const all = read<CourseProgress>(PROGRESS_KEY);
  return all[courseId] || { completedLessons: [] };
}

export function markLessonComplete(courseId: number, lessonId: number): CourseProgress {
  const all = read<CourseProgress>(PROGRESS_KEY);
  const current = all[courseId] || { completedLessons: [] };
  if (!current.completedLessons.includes(lessonId)) {
    current.completedLessons.push(lessonId);
  }
  all[courseId] = current;
  write(PROGRESS_KEY, all);
  return current;
}

export function markLessonIncomplete(courseId: number, lessonId: number): CourseProgress {
  const all = read<CourseProgress>(PROGRESS_KEY);
  const current = all[courseId] || { completedLessons: [] };
  current.completedLessons = current.completedLessons.filter((id) => id !== lessonId);
  all[courseId] = current;
  write(PROGRESS_KEY, all);
  return current;
}

export interface QuizAttempt {
  score: number;
  total: number;
  percentage: number;
  date: string;
}

export function getQuizHistory(courseId: number): QuizAttempt[] {
  const all = read<QuizAttempt[]>(QUIZ_KEY);
  return all[courseId] || [];
}

export function saveQuizAttempt(courseId: number, attempt: QuizAttempt) {
  const all = read<QuizAttempt[]>(QUIZ_KEY);
  all[courseId] = [...(all[courseId] || []), attempt];
  write(QUIZ_KEY, all);
}

export function getBestScore(courseId: number): number | null {
  const history = getQuizHistory(courseId);
  if (!history.length) return null;
  return Math.max(...history.map((a) => a.percentage));
}

export function getNote(courseId: number, lessonId: number): string {
  const all = read<string>(NOTES_KEY);
  return all[`${courseId}-${lessonId}`] || "";
}

export function saveNote(courseId: number, lessonId: number, note: string) {
  const all = read<string>(NOTES_KEY);
  all[`${courseId}-${lessonId}`] = note;
  write(NOTES_KEY, all);
}

export function getBookmarks(courseId: number): number[] {
  const all = read<number[]>(BOOKMARKS_KEY);
  return all[courseId] || [];
}

export function toggleBookmark(courseId: number, lessonId: number): number[] {
  const all = read<number[]>(BOOKMARKS_KEY);
  const list = all[courseId] || [];
  all[courseId] = list.includes(lessonId)
    ? list.filter((id) => id !== lessonId)
    : [...list, lessonId];
  write(BOOKMARKS_KEY, all);
  return all[courseId];
}
