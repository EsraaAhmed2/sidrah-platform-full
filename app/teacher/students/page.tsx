"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Users, Search, Mail } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RoleGuard from "@/components/RoleGuard";

type TimeUnit = "hour" | "hours" | "day" | "days" | "week";

const students = [
  { id: 1, name: "أحمد محمد", email: "ahmed@mail.com", course: "React.js", progress: 78, lastActive: { n: 1, unit: "hour" as TimeUnit } },
  { id: 2, name: "سارة أحمد", email: "sara@mail.com", course: "Node.js", progress: 45, lastActive: { n: 3, unit: "hours" as TimeUnit } },
  { id: 3, name: "محمد علي", email: "mohamed@mail.com", course: "React.js", progress: 92, lastActive: { n: 1, unit: "day" as TimeUnit } },
  { id: 4, name: "فاطمة حسن", email: "fatma@mail.com", course: "JavaScript", progress: 60, lastActive: { n: 2, unit: "days" as TimeUnit } },
  { id: 5, name: "خالد إبراهيم", email: "khaled@mail.com", course: "Node.js", progress: 30, lastActive: { n: 1, unit: "week" as TimeUnit } },
  { id: 6, name: "نور الدين", email: "nour@mail.com", course: "React.js", progress: 55, lastActive: { n: 5, unit: "hours" as TimeUnit } },
];

export default function StudentsPage() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const filtered = students.filter(
    (s) => s.name.includes(q) || s.course.includes(q) || s.email.includes(q)
  );

  const formatLastActive = (n: number, unit: TimeUnit) => {
    const key = `teacher.students.lastActive.${unit}` as const;
    return t(key).replace("{n}", String(n));
  };

  return (
    <RoleGuard roles={["teacher", "admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: t("teacher.breadcrumb.dashboard"), href: "/teacher" }, { label: t("teacher.breadcrumb.students") }]} />
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Users className="text-green-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t("teacher.students.title")}</h1>
              <p className="text-[var(--text-secondary)] text-sm">{t("teacher.students.count").replace("{count}", String(students.length))}</p>
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("teacher.students.placeholder")}
              className="input-field pr-10"
            />
          </div>

          <div className="card !p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)]">
                    <th className="text-right px-5 py-3 font-medium">{t("teacher.students.header.student")}</th>
                    <th className="text-right px-5 py-3 font-medium">{t("teacher.students.header.course")}</th>
                    <th className="text-right px-5 py-3 font-medium">{t("teacher.students.header.progress")}</th>
                    <th className="text-right px-5 py-3 font-medium">{t("teacher.students.header.lastActive")}</th>
                    <th className="text-right px-5 py-3 font-medium">{t("teacher.students.header.contact")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-b border-[var(--border-color)]/50 last:border-0 hover:bg-[var(--bg-primary)] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sidrah-600 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                            {s.name[0]}
                          </div>
                          <div>
                            <p className="text-[var(--text-primary)] font-medium">{s.name}</p>
                            <p className="text-[var(--text-muted)] text-xs">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[var(--text-secondary)]">{s.course}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-dark-700 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${s.progress >= 70 ? "bg-green-500" : s.progress >= 40 ? "bg-yellow-500" : "bg-red-400"}`}
                              style={{ width: `${s.progress}%` }}
                            />
                          </div>
                          <span className="text-[var(--text-secondary)] text-xs">{s.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[var(--text-muted)]">{formatLastActive(s.lastActive.n, s.lastActive.unit)}</td>
                      <td className="px-5 py-4">
                        <a href={"mailto:" + (s.email || "student@sidrah.com")} className="inline-block p-2 rounded-lg text-[var(--text-muted)] hover:text-sidrah-400 hover:bg-[var(--bg-primary)] transition-colors" aria-label={t("teacher.students.message").replace("{name}", s.name)}>
                          <Mail size={16} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
