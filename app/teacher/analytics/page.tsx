"use client";
import { BarChart3, Users, BookOpen, Star, TrendingUp } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import RoleGuard from "@/components/RoleGuard";

const content = {
  ar: {
    title: "تحليلات المعلم",
    subtitle: "مؤشرات الأداء والطلاب والكورسات",
    students: "طلاب نشطون",
    courses: "كورسات منشورة",
    rating: "متوسط التقييم",
    revenue: "إيرادات الشهر",
    top: "أكثر الكورسات مبيعاً",
    reviews: "آخر التقييمات",
  },
  en: {
    title: "Instructor Analytics",
    subtitle: "Performance, students and course metrics",
    students: "Active students",
    courses: "Published courses",
    rating: "Average rating",
    revenue: "Monthly revenue",
    top: "Top selling courses",
    reviews: "Latest reviews",
  },
};

export default function TeacherAnalytics() {
  const { lang } = useLang();
  const { user } = useAuth();
  const t = content[lang];

  const stats = [
    { label: t.students, value: "320", icon: Users, color: "text-blue-400" },
    { label: t.courses, value: "4", icon: BookOpen, color: "text-green-400" },
    { label: t.rating, value: "4.7", icon: Star, color: "text-yellow-400" },
    { label: t.revenue, value: "$850", icon: TrendingUp, color: "text-sidrah-400" },
  ];

  const topCourses = [
    { title: "React.js", sales: 120, revenue: "$2,450" },
    { title: "Node.js", sales: 85, revenue: "$850" },
    { title: "Flutter", sales: 50, revenue: "$500" },
  ];

  const reviews = [
    { name: "Sara", course: "React.js", text: lang === "ar" ? "شرح ممتاز ومفيد" : "Excellent and useful" },
    { name: "Omar", course: "Python", text: lang === "ar" ? "كورس رائع" : "Great course" },
  ];

  return (
    <RoleGuard roles={["teacher", "admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
            <p className="text-[var(--text-secondary)]">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <div key={i} className="card text-center">
                <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-[var(--text-primary)]">{s.value}</div>
                <div className="text-[var(--text-secondary)] text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-bold text-[var(--text-primary)] mb-4">{t.top}</h3>
              <div className="space-y-3">
                {topCourses.map((c) => (
                  <div key={c.title} className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-primary)]">
                    <span className="text-[var(--text-primary)] font-medium">{c.title}</span>
                    <div className="text-sm text-[var(--text-secondary)]">
                      {c.sales} {lang === "ar" ? "مبيع" : "sales"} · {c.revenue}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-[var(--text-primary)] mb-4">{t.reviews}</h3>
              <div className="space-y-3">
                {reviews.map((r, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[var(--bg-primary)]">
                    <div className="text-sm text-[var(--text-secondary)] mb-1">{r.name} · {r.course}</div>
                    <p className="text-[var(--text-primary)] text-sm">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
