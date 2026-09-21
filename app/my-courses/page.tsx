"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, PlayCircle, Award } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RoleGuard from "@/components/RoleGuard";
import CourseCover from "@/components/CourseCover";
import { getAllCourses } from "@/lib/courses-data";
import { getCourseProgress } from "@/lib/progress";
import { useLang } from "@/context/LanguageContext";

const enrolledIds = [1, 4, 3];

export default function MyCoursesPage() {
  const { t } = useLang();
  const courses = getAllCourses().filter((c) => enrolledIds.includes(c.id));
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});

  useEffect(() => {
    const map: Record<number, number> = {};
    courses.forEach((c) => {
      const p = getCourseProgress(c.id);
      map[c.id] = Math.round((p.completedLessons.length / c.lessonsCount) * 100);
    });
    setProgressMap(map);
  }, []);

  return (
    <RoleGuard roles={["student", "teacher", "admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: t("myCourses.breadcrumb") }]} />
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-sidrah-950/50 rounded-xl flex items-center justify-center">
              <BookOpen className="text-sidrah-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t("myCourses.title")}</h1>
              <p className="text-[var(--text-secondary)] text-sm">{t("myCourses.subtitle")}</p>
            </div>
          </div>

          <div className="space-y-4">
            {courses.map((c) => {
              const pct = progressMap[c.id] ?? 0;
              const done = pct >= 100;
              return (
                <Link
                  key={c.id}
                  href={`/courses/${c.id}/lesson/1`}
                  className="card flex items-center gap-5 hover:border-sidrah-700 transition-colors !p-4"
                >
                  <div className="w-32 flex-shrink-0 hidden sm:block">
                    <CourseCover color={c.color} title={c.title} emoji={c.emoji} className="!h-20" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[var(--text-primary)] font-bold mb-1 truncate">{c.title}</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-dark-700 rounded-full h-2 max-w-xs">
                        <div
                          className={`h-2 rounded-full ${done ? "bg-green-500" : "bg-sidrah-500"}`}
                          style={{ width: `${Math.max(pct, 4)}%` }}
                        />
                      </div>
                      <span className="text-[var(--text-muted)] text-xs">{pct}%</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {done ? (
                      <span className="flex items-center gap-1 text-green-400 text-sm">
                        <Award size={16} /> {t("myCourses.completed")}
                      </span>
                    ) : (
                      <span className="btn-primary !py-2 text-sm flex items-center gap-2">
                        <PlayCircle size={16} /> {t("myCourses.continue")}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
