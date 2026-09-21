"use client";
import Link from "next/link";
import { Route, CheckCircle2, Circle, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllCourses } from "@/lib/courses-data";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/Motion";
import { useLang } from "@/context/LanguageContext";

export default function PathsPage() {
  const { t } = useLang();
  const paths = [
    {
      id: "frontend",
      title: t("paths.frontend.title"),
      desc: t("paths.frontend.desc"),
      color: "from-blue-500 to-cyan-400",
      courseIds: [1, 3],
      duration: `70 ${t("paths.hours")}`,
    },
    {
      id: "backend",
      title: t("paths.backend.title"),
      desc: t("paths.backend.desc"),
      color: "from-green-500 to-emerald-400",
      courseIds: [4, 2, 6],
      duration: `78 ${t("paths.hours")}`,
    },
    {
      id: "fullstack",
      title: t("paths.fullstack.title"),
      desc: t("paths.fullstack.desc"),
      color: "from-purple-500 to-pink-400",
      courseIds: [1, 4, 3, 6],
      duration: `123 ${t("paths.hours")}`,
    },
    {
      id: "mobile",
      title: t("paths.mobile.title"),
      desc: t("paths.mobile.desc"),
      color: "from-orange-500 to-red-400",
      courseIds: [5],
      duration: `32 ${t("paths.hours")}`,
    },
  ];
  const all = getAllCourses();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("paths.title") }]} />
        <ScrollReveal className="text-center mb-12">
          <div className="w-16 h-16 bg-sidrah-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Route className="text-sidrah-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">{t("paths.title")}</h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            {t("paths.subtitle")}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {paths.map((path) => {
            const courses = path.courseIds.map((id) => all.find((c) => c.id === id)!).filter(Boolean);
            return (
              <StaggerItem key={path.id} className="card hover:border-sidrah-700 transition-colors">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4`}>
                  <Route className="text-white" size={26} />
                </div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{path.title}</h2>
                <p className="text-[var(--text-secondary)] text-sm mb-4">{path.desc}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-5">
                  <span className="flex items-center gap-1"><Clock size={14} /> {path.duration}</span>
                  <span>{courses.length} {t("paths.courses")}</span>
                </div>
                <div className="space-y-2 mb-5">
                  {courses.map((c, i) => (
                    <Link
                      key={c.id}
                      href={`/courses/${c.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-primary)] hover:border-sidrah-700 border border-transparent transition-colors"
                    >
                      {c.lessons.every((l) => l.completed) ? (
                        <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle size={18} className="text-[var(--text-muted)] flex-shrink-0" />
                      )}
                      <span className="text-sm text-[var(--text-primary)] flex-1">{i + 1}. {c.title}</span>
                      <span className="text-xs text-[var(--text-muted)]">{c.duration}</span>
                    </Link>
                  ))}
                </div>
                <Link href={`/courses/${courses[0].id}`} className="btn-primary w-full text-center block">
                  {t("paths.start")}
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
