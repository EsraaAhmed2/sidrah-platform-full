"use client";
import { useState } from "react";
import { Scale, Star, Clock, BookOpen, Users, DollarSign, Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CourseCover from "@/components/CourseCover";
import { getAllCourses } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";

export default function ComparePage() {
  const { t } = useLang();
  const courses = getAllCourses();
  const [a, setA] = useState(courses[0].id);
  const [b, setB] = useState(courses[1].id);

  const ca = courses.find((c) => c.id === a)!;
  const cb = courses.find((c) => c.id === b)!;

  const rows: { key: string; icon: typeof Star; get: (c: typeof ca) => string | number; better?: (a: number, b: number) => number }[] = [
    { key: "compare.rating", icon: Star, get: (c) => c.rating, better: (x, y) => x > y ? 1 : x < y ? -1 : 0 },
    { key: "compare.students", icon: Users, get: (c) => c.students.toLocaleString() },
    { key: "compare.duration", icon: Clock, get: (c) => c.duration },
    { key: "compare.lessons", icon: BookOpen, get: (c) => c.lessonsCount, better: (x, y) => x > y ? 1 : x < y ? -1 : 0 },
    { key: "compare.price", icon: DollarSign, get: (c) => `$${c.price}`, better: (x, y) => x < y ? 1 : x > y ? -1 : 0 },
    { key: "compare.quizzes", icon: Check, get: (c) => c.questions.length },
  ];

  const numeric = (c: typeof ca, key: string): number => {
    if (key === "compare.rating") return c.rating;
    if (key === "compare.lessons") return c.lessonsCount;
    if (key === "compare.price") return c.price;
    if (key === "compare.quizzes") return c.questions.length;
    return 0;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("compare.breadcrumb") }]} />
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-sidrah-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Scale className="text-sidrah-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("compare.title")}</h1>
          <p className="text-[var(--text-secondary)]">{t("compare.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[{ val: a, set: setA }, { val: b, set: setB }].map((sel, i) => (
            <select
              key={i}
              value={sel.val}
              onChange={(e) => sel.set(Number(e.target.value))}
              className="input-field"
              aria-label={`${t("compare.selectCourse")} ${i + 1}`}
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          ))}
        </div>

        <div className="card !p-0 overflow-hidden">
          <div className="grid grid-cols-3 items-center gap-4 p-6 border-b border-[var(--border-color)]">
            <div>
              <CourseCover color={ca.color} title={ca.title} emoji={ca.emoji} className="!h-28 mb-3" />
              <h3 className="text-[var(--text-primary)] font-bold text-sm">{ca.title}</h3>
            </div>
            <div className="text-center text-[var(--text-muted)] font-bold">VS</div>
            <div>
              <CourseCover color={cb.color} title={cb.title} emoji={cb.emoji} className="!h-28 mb-3" />
              <h3 className="text-[var(--text-primary)] font-bold text-sm">{cb.title}</h3>
            </div>
          </div>
          {rows.map((row) => {
            const diff = row.better ? row.better(numeric(ca, row.key), numeric(cb, row.key)) : 0;
            return (
              <div key={row.key} className="grid grid-cols-3 items-center gap-4 px-6 py-4 border-b border-[var(--border-color)]/50 last:border-0">
                <div className={`text-center font-medium ${diff === 1 ? "text-green-400" : "text-[var(--text-primary)]"}`}>
                  {row.get(ca)} {diff === 1 && "✓"}
                </div>
                <div className="flex items-center justify-center gap-2 text-[var(--text-muted)] text-sm">
                  <row.icon size={16} /> {t(row.key)}
                </div>
                <div className={`text-center font-medium ${diff === -1 ? "text-green-400" : "text-[var(--text-primary)]"}`}>
                  {diff === -1 && "✓"} {row.get(cb)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
