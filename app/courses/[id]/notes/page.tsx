"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { StickyNote, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCourseById } from "@/lib/courses-data";
import { getNote } from "@/lib/progress";
import { useLang } from "@/context/LanguageContext";

export default function NotesPage() {
  const { t } = useLang();
  const params = useParams();
  const courseId = Number(params.id);
  const courseData = getCourseById(courseId);
  const [notes, setNotes] = useState<{ lessonId: number; title: string; text: string }[]>([]);

  useEffect(() => {
    if (!courseData) return;
    setNotes(
      courseData.lessons
        .map((l) => ({ lessonId: l.id, title: l.title, text: getNote(courseId, l.id) }))
        .filter((n) => n.text.trim())
    );
  }, [courseId, courseData]);

  if (!courseData) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t("course.notFound")}</h1>
          <Link href="/courses" className="btn-primary">{t("course.backToCourses")}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: t("courses.breadcrumb"), href: "/courses" },
            { label: courseData.title, href: `/courses/${courseId}` },
            { label: t("notes.breadcrumb") },
          ]}
        />
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-3">
          <StickyNote className="text-sidrah-400" size={26} />
          {t("notes.title")}
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">{courseData.title}</p>

        {notes.length === 0 ? (
          <div className="card text-center py-16">
            <StickyNote size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t("notes.emptyTitle")}</h2>
            <p className="text-[var(--text-secondary)] mb-6">{t("notes.emptyHint")}</p>
            <Link href={`/courses/${courseId}`} className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={16} /> {t("notes.backToCourse")}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((n) => (
              <Link
                key={n.lessonId}
                href={`/courses/${courseId}/lesson/${n.lessonId}`}
                className="card block hover:border-sidrah-700 transition-colors"
              >
                <h3 className="text-sidrah-400 text-sm font-medium mb-2">{n.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm whitespace-pre-line leading-relaxed">{n.text}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
