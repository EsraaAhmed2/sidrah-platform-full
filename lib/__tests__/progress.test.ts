import { describe, it, expect, beforeEach } from "vitest";
import {
  getCourseProgress,
  markLessonComplete,
  markLessonIncomplete,
  saveQuizAttempt,
  getQuizHistory,
  getBestScore,
  getNote,
  saveNote,
  toggleBookmark,
  getBookmarks,
} from "../progress";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

beforeEach(() => localStorageMock.clear());

describe("progress", () => {
  it("يحفظ الدرس المكتمل", () => {
    markLessonComplete(1, 5);
    expect(getCourseProgress(1).completedLessons).toContain(5);
  });

  it("لا يكرر الدرس", () => {
    markLessonComplete(1, 5);
    markLessonComplete(1, 5);
    expect(getCourseProgress(1).completedLessons).toEqual([5]);
  });

  it("يلغي إكمال الدرس", () => {
    markLessonComplete(1, 5);
    markLessonIncomplete(1, 5);
    expect(getCourseProgress(1).completedLessons).not.toContain(5);
  });
});

describe("quiz history", () => {
  it("يحفظ المحاولة ويحسب الأفضل", () => {
    saveQuizAttempt(1, { score: 3, total: 5, percentage: 60, date: "2026-01-01" });
    saveQuizAttempt(1, { score: 5, total: 5, percentage: 100, date: "2026-01-02" });
    expect(getQuizHistory(1)).toHaveLength(2);
    expect(getBestScore(1)).toBe(100);
  });
});

describe("notes & bookmarks", () => {
  it("يحفظ الملاحظات لكل درس", () => {
    saveNote(1, 2, "ملاحظة مهمة");
    expect(getNote(1, 2)).toBe("ملاحظة مهمة");
    expect(getNote(1, 3)).toBe("");
  });

  it("يبدل العلامة المرجعية", () => {
    toggleBookmark(1, 3);
    expect(getBookmarks(1)).toContain(3);
    toggleBookmark(1, 3);
    expect(getBookmarks(1)).not.toContain(3);
  });
});
