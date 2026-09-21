"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Users, DollarSign, Plus, Eye, Edit, BarChart3, Upload, Check, X } from "lucide-react";
import { RevenueBarChart } from "@/components/Charts";
import RoleGuard from "@/components/RoleGuard";

const fill = (str: string, vars: Record<string, string>) => {
  let out = str;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replace(`{${k}}`, v);
  }
  return out;
};

const revenueData = [
  { monthIndex: 0, value: 400 },
  { monthIndex: 1, value: 650 },
  { monthIndex: 2, value: 450 },
  { monthIndex: 3, value: 800 },
  { monthIndex: 4, value: 550 },
  { monthIndex: 5, value: 900 },
  { monthIndex: 6, value: 700 },
];

type CourseStatus = "published" | "draft" | "review";

const myCourses = [
  { id: 1, title: "React.js - Front-End", students: 120, revenue: 1300, status: "published" as CourseStatus, image: "⚛️" },
  { id: 2, title: "Node.js - Backend", students: 85, revenue: 850, status: "published" as CourseStatus, image: "🟢" },
  { id: 3, title: "JavaScript Basics", students: 65, revenue: 500, status: "draft" as CourseStatus, image: "📜" },
  { id: 4, title: "Full Stack Web Dev", students: 50, revenue: 0, status: "review" as CourseStatus, image: "🚀" },
];

const stats = [
  { labelKey: "teacher.stats.courses", value: "4", icon: BookOpen, color: "text-blue-400" },
  { labelKey: "teacher.stats.students", value: "320", icon: Users, color: "text-green-400" },
  { labelKey: "teacher.stats.lessons", value: "18", icon: BarChart3, color: "text-purple-400" },
  { labelKey: "teacher.stats.revenue", value: "$2,450", icon: DollarSign, color: "text-yellow-400" },
];

const activities: { textKey: string; vars: Record<string, string>; time: { n: number; unit: "minutes" | "hour" | "hours" | "day" }; icon: string }[] = [
  { textKey: "teacher.activity.newStudent", vars: { course: "React.js" }, time: { n: 5, unit: "minutes" }, icon: "👤" },
  { textKey: "teacher.activity.lessonCompleted", vars: { lesson: "Hooks" }, time: { n: 1, unit: "hour" }, icon: "✅" },
  { textKey: "teacher.activity.newRating", vars: { stars: "5" }, time: { n: 3, unit: "hours" }, icon: "⭐" },
  { textKey: "teacher.activity.withdrawal", vars: { amount: "$500" }, time: { n: 1, unit: "day" }, icon: "💰" },
];

export default function TeacherDashboard() {
  const { t, lang } = useLang();
  const { user } = useAuth();
  const [courses, setCourses] = useState(myCourses);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const formatTimeAgo = (n: number, unit: "minutes" | "hour" | "hours" | "day") => {
    if (unit === "minutes") return t("teacher.activity.minutesAgo").replace("{n}", String(n));
    if (unit === "hour") return t("teacher.activity.hourAgo");
    if (unit === "hours") return t("teacher.activity.hoursAgo").replace("{n}", String(n));
    return t("teacher.activity.dayAgo");
  };

  const localizedRevenue = revenueData.map((d) => ({
    name: new Date(2026, d.monthIndex, 1).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", { month: "short" }),
    value: d.value,
  }));

  return (
    <RoleGuard roles={["teacher", "admin"]}>
    <div className="min-h-screen bg-[var(--bg-primary)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{fill(t("teacher.welcome"), { name: user?.name || "Teacher" })}</h1>
            <p className="text-[var(--text-secondary)]">{t("teacher.summary")}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/teacher/upload" className="btn-secondary flex items-center gap-2">
              <Upload size={18} />
              {t("teacher.uploadVideo")}
            </Link>
            <Link href="/teacher/students" className="btn-secondary flex items-center gap-2">
              <Users size={18} />
              {t("teacher.students")}
            </Link>
            <Link href="/courses/new" className="btn-primary flex items-center gap-2">
              <Plus size={18} />
              {t("teacher.newCourse")}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="card text-center">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</div>
              <div className="text-[var(--text-secondary)] text-sm">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">{t("teacher.courses.title")}</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="card flex flex-col md:flex-row md:items-center gap-4">
                  <div className="text-4xl">{course.image}</div>
                  <div className="flex-1 min-w-0">
                    {editingId === course.id ? (
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="input-field text-sm flex-1"
                          autoFocus
                        />
                        <button
                          onClick={() => {
                            setCourses((prev) => prev.map((c) => (c.id === course.id ? { ...c, title: editTitle } : c)));
                            setEditingId(null);
                            toast.success(lang === "ar" ? "تم حفظ التعديل" : "Saved");
                          }}
                          className="p-2 text-green-400 hover:bg-green-500/10 rounded"
                          aria-label={lang === "ar" ? "حفظ" : "Save"}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded"
                          aria-label={lang === "ar" ? "إلغاء" : "Cancel"}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <h3 className="text-[var(--text-primary)] font-semibold mb-1">{course.title}</h3>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1"><Users size={14} /> {t("teacher.courses.studentCount").replace("{count}", String(course.students))}</span>
                      <span className="flex items-center gap-1"><DollarSign size={14} /> ${course.revenue}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        course.status === "published" ? "bg-green-500/20 text-green-400" :
                        course.status === "draft" ? "bg-gray-500/20 text-gray-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>{t(`teacher.courses.status.${course.status}`)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={"/courses/" + course.id} aria-label={lang === "ar" ? "عرض" : "View"} className="p-2 bg-[var(--bg-primary)] rounded-lg text-[var(--text-secondary)] hover:text-sidrah-400 transition-colors"><Eye size={18} /></Link>
                    <button
                      onClick={() => { setEditingId(course.id); setEditTitle(course.title); }}
                      aria-label={lang === "ar" ? "تعديل" : "Edit"}
                      className="p-2 bg-[var(--bg-primary)] rounded-lg text-[var(--text-secondary)] hover:text-sidrah-400 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t("teacher.activity.title")}</h3>
              <div className="space-y-3">
                {activities.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)]">
                    <div className="text-lg">{activity.icon}</div>
                    <div>
                      <p className="text-[var(--text-primary)] text-sm">{fill(t(activity.textKey), activity.vars)}</p>
                      <p className="text-[var(--text-muted)] text-xs">{formatTimeAgo(activity.time.n, activity.time.unit)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mt-4">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t("teacher.revenue.title")}</h3>
              <RevenueBarChart data={localizedRevenue} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </RoleGuard>
  );
}
