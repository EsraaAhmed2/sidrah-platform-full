"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Bookmark, FileText, Download, StickyNote } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import Discussions from "@/components/Discussions";
import VideoPlayer from "@/components/VideoPlayer";
import { getCourseById } from "@/lib/courses-data";
import {
  getCourseProgress,
  markLessonComplete,
  markLessonIncomplete,
  getBookmarks,
  toggleBookmark,
  getNote,
  saveNote,
} from "@/lib/progress";
import { useLang } from "@/context/LanguageContext";

export default function LessonPage() {
  const { t, lang } = useLang();
  const params = useParams();
  const courseId = Number(params.id);
  const lessonId = Number(params.lessonId);
  const courseData = getCourseById(courseId);

  const resources = [
    { name: t("lesson.resourceSlides"), size: "2.4 MB" },
    { name: t("lesson.resourceCode"), size: "180 KB" },
    { name: t("lesson.resourceSummary"), size: "850 KB" },
  ];

  const [activeTab, setActiveTab] = useState<"overview" | "comments" | "notes">("overview");
  const [completed, setCompleted] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [note, setNote] = useState("");
  const [cinema, setCinema] = useState(false);

  useEffect(() => {
    if (!courseData) return;
    setCompleted(getCourseProgress(courseId).completedLessons);
    setBookmarks(getBookmarks(courseId));
    setNote(getNote(courseId, lessonId));
  }, [courseId, lessonId, courseData]);

  if (!courseData) {
    return (
      <div className="min-h-screen bg-dark-900 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t("course.notFound")}</h1>
          <Link href="/courses" className="btn-primary">{t("course.backToCourses")}</Link>
        </div>
      </div>
    );
  }

  const currentLessonIndex = courseData.lessons.findIndex((l) => l.id === lessonId);
  const currentLesson = courseData.lessons[currentLessonIndex];
  const prevLesson = currentLessonIndex > 0 ? courseData.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < courseData.lessons.length - 1 ? courseData.lessons[currentLessonIndex + 1] : null;

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-dark-900 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t("lesson.notFound")}</h1>
          <Link href={`/courses/${courseId}`} className="btn-primary">{t("lesson.backToCourse")}</Link>
        </div>
      </div>
    );
  }

  const isDone = completed.includes(lessonId);
  const isBookmarked = bookmarks.includes(lessonId);
  const progressPct = Math.round((completed.length / courseData.lessons.length) * 100);

  const toggleComplete = () => {
    const updated = isDone
      ? markLessonIncomplete(courseId, lessonId)
      : markLessonComplete(courseId, lessonId);
    setCompleted(updated.completedLessons);
    toast.success(isDone ? t("lesson.markIncompleteToast") : t("lesson.completedToast"));
  };

  const onVideoEnded = () => {
    if (!isDone) {
      const updated = markLessonComplete(courseId, lessonId);
      setCompleted(updated.completedLessons);
      toast.success(t("lesson.endedToast"));
    }
  };

  const onBookmark = () => {
    setBookmarks(toggleBookmark(courseId, lessonId));
    toast.success(isBookmarked ? t("lesson.bookmarkRemoved") : t("lesson.bookmarkSaved"));
  };

  const onSaveNote = () => {
    saveNote(courseId, lessonId, note);
    toast.success(t("lesson.notesSaved"));
  };

  const videoTitle = `${t("lesson.videoTitle")} ${currentLessonIndex + 1}: ${currentLesson.title}`;

  return (
    <div className={`min-h-screen py-8 transition-colors ${cinema ? "bg-black" : "bg-dark-900"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!cinema && (
          <Breadcrumbs
            items={[
              { label: t("courses.breadcrumb"), href: "/courses" },
              { label: courseData.title, href: `/courses/${courseId}` },
              { label: currentLesson.title },
            ]}
          />
        )}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <VideoPlayer
                title={videoTitle}
                chapters={[
                  { time: 0, label: "مقدمة" },
                  { time: 60, label: "الشرح النظري" },
                  { time: 180, label: "التطبيق العملي" },
                  { time: 420, label: "الخلاصة" },
                ]}
                onEnded={onVideoEnded}
                onCinemaToggle={setCinema}
              />
            </div>

            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{courseData.title}</h1>
                <p className="text-gray-400">
                  {t("lesson.videoTitle")} {currentLessonIndex + 1}: {currentLesson.title}
                </p>
              </div>
              <button
                onClick={onBookmark}
                className={`p-2 rounded-lg border transition-colors flex-shrink-0 ${
                  isBookmarked
                    ? "border-sidrah-500 text-sidrah-400 bg-sidrah-950/30"
                    : "border-dark-600 text-gray-500 hover:text-sidrah-400"
                }`}
                aria-label={t("lesson.bookmarkAria")}
              >
                <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="flex gap-4 border-b border-dark-700 mb-6" role="tablist">
              {([
                ["overview", t("lesson.tabOverview")],
                ["comments", t("lesson.tabComments")],
                ["notes", t("lesson.tabNotes")],
              ] as const).map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={activeTab === id}
                  onClick={() => setActiveTab(id)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === id
                      ? "border-sidrah-500 text-sidrah-400"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="text-gray-300 leading-relaxed">
                <p className="mb-4">
                  {t("lesson.overviewStart")}{currentLesson.title}{t("lesson.overviewMiddle")}{courseData.title}{t("lesson.overviewEnd")}
                </p>

                {/* Resources */}
                <div className="card !p-4 mb-6">
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-sidrah-400" /> {t("lesson.resources")}
                  </h3>
                  <div className="space-y-2">
                    {resources.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const text = lang === "ar" ? `نموذج من ${r.name} — ${currentLesson.title}` : `Sample ${r.name} — ${currentLesson.title}`;
                          const blob = new Blob([text], { type: "text/plain" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${r.name}.txt`;
                          a.click();
                          URL.revokeObjectURL(url);
                          const msg = lang === "ar" ? `تم تحميل ${r.name}` : `Downloaded ${r.name}`;
                          toast.success(msg);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors text-sm"
                      >
                        <span className="text-gray-300">{r.name}</span>
                        <span className="flex items-center gap-2 text-gray-500">
                          <span className="text-xs">{r.size}</span>
                          <Download size={15} />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={toggleComplete}
                  className={`flex items-center gap-2 rounded-lg font-medium px-6 py-3 transition-all ${
                    isDone
                      ? "bg-green-500/15 text-green-400 border border-green-500/40"
                      : "btn-primary"
                  }`}
                >
                  <Check size={18} />
                  {isDone ? `${t("lesson.completedLabel")} ✓` : t("lesson.markComplete")}
                </button>
              </div>
            )}

            {activeTab === "comments" && <Discussions />}

            {activeTab === "notes" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <StickyNote size={18} className="text-sidrah-400" />
                  <p className="text-sm">{t("lesson.notesInfo")}</p>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={8}
                  placeholder={t("lesson.notesPlaceholder")}
                  className="input-field resize-none"
                  aria-label={t("lesson.notesAria")}
                />
                <button onClick={onSaveNote} className="btn-primary">{t("lesson.saveNotes")}</button>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {prevLesson ? (
                <Link href={`/courses/${courseId}/lesson/${prevLesson.id}`} className="btn-secondary flex items-center gap-2">
                  <ChevronRight size={18} />
                  {t("lesson.prevLesson")}
                </Link>
              ) : (
                <div />
              )}
              {nextLesson ? (
                <Link href={`/courses/${courseId}/lesson/${nextLesson.id}`} className="btn-primary flex items-center gap-2">
                  {t("lesson.nextLesson")}
                  <ChevronLeft size={18} />
                </Link>
              ) : (
                <Link href={`/courses/${courseId}/quiz`} className="btn-primary flex items-center gap-2">
                  {t("lesson.courseQuiz")}
                  <ChevronLeft size={18} />
                </Link>
              )}
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{t("course.curriculumTitle")}</h3>
                <span className="text-sidrah-400 text-sm font-medium">{progressPct}%</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-1.5 mb-4">
                <motion.div
                  className="bg-sidrah-500 h-1.5 rounded-full"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="space-y-2">
                {courseData.lessons.map((lesson, idx) => {
                  const done = completed.includes(lesson.id) || lesson.completed;
                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseId}/lesson/${lesson.id}`}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        lesson.id === lessonId
                          ? "bg-sidrah-950/30 border border-sidrah-800/30"
                          : "hover:bg-dark-700"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                          done ? "bg-sidrah-600 text-white" : "bg-dark-600 text-gray-400"
                        }`}
                      >
                        {done ? <Check size={14} /> : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-sm font-medium truncate ${
                            lesson.id === lessonId ? "text-sidrah-300" : "text-gray-300"
                          }`}
                        >
                          {lesson.title}
                        </h4>
                        <span className="text-gray-500 text-xs">{lesson.duration}</span>
                      </div>
                      {bookmarks.includes(lesson.id) && (
                        <Bookmark size={14} className="text-sidrah-400 flex-shrink-0" fill="currentColor" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
