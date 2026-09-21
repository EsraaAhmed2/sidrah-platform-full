"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Users, BookOpen, DollarSign, Activity, GraduationCap, School, LayoutDashboard, UserCheck, Layers } from "lucide-react";
import { CategoryPieChart } from "@/components/Charts";
import RoleGuard from "@/components/RoleGuard";
import { getAllCourses } from "@/lib/courses-data";

const content = {
  ar: {
    title: "لوحة التحكم",
    welcome: "مرحباً {name}، إليك نظرة عامة على المنصة",
    overview: "نظرة عامة",
    teachers: "المعلمين",
    students: "الطلاب",
    enrollments: "التسجيلات",
    courses: "الكورسات",
    totalUsers: "إجمالي المستخدمين",
    totalCourses: "إجمالي الكورسات",
    totalTeachers: "إجمالي المعلمين",
    totalRevenue: "إجمالي الإيرادات",
    topCourses: "أكثر الكورسات مبيعاً",
    course: "الكورس",
    studentsN: "الطلاب",
    revenue: "الإيرادات",
    rating: "التقييم",
    name: "الاسم",
    email: "البريد",
    role: "الدور",
    status: "الحالة",
    active: "نشط",
    pending: "قيد المراجعة",
    coursesTaught: "الكورسات المُدرّسة",
    enrolled: "الكورسات المسجّل فيها",
    enrollDate: "تاريخ التسجيل",
    viewAll: "عرض الكل",
    distribution: "توزيع الفئات",
    noStudents: "لا يوجد طلاب بعد",
    noTeachers: "لا يوجد معلمين بعد",
    noEnrollments: "لا يوجد تسجيلات بعد",
  },
  en: {
    title: "Admin Dashboard",
    welcome: "Welcome {name}, here is an overview of the platform",
    overview: "Overview",
    teachers: "Teachers",
    students: "Students",
    enrollments: "Enrollments",
    courses: "Courses",
    totalUsers: "Total users",
    totalCourses: "Total courses",
    totalTeachers: "Total teachers",
    totalRevenue: "Total revenue",
    topCourses: "Top selling courses",
    course: "Course",
    studentsN: "Students",
    revenue: "Revenue",
    rating: "Rating",
    name: "Name",
    email: "Email",
    role: "Role",
    status: "Status",
    active: "Active",
    pending: "Pending review",
    coursesTaught: "Courses taught",
    enrolled: "Enrolled courses",
    enrollDate: "Enrollment date",
    viewAll: "View all",
    distribution: "Category distribution",
    noStudents: "No students yet",
    noTeachers: "No teachers yet",
    noEnrollments: "No enrollments yet",
  },
};

const tabs = [
  { id: "overview", label: "overview", icon: LayoutDashboard },
  { id: "teachers", label: "teachers", icon: GraduationCap },
  { id: "students", label: "students", icon: School },
  { id: "enrollments", label: "enrollments", icon: UserCheck },
  { id: "courses", label: "courses", icon: Layers },
];

const categoryData = [
  { name: "Front-End", value: 22 },
  { name: "AI/ML", value: 18 },
  { name: "Back-End", value: 15 },
  { name: "Data Analysis", value: 12 },
  { name: "Cyber Security", value: 10 },
  { name: "Mobile", value: 8 },
  { name: "DevOps", value: 8 },
  { name: "UI/UX", value: 7 },
];

const teachersData = [
  { name: "Ahmed Salah", email: "ahmed@sidrah.com", status: "active", courses: ["React.js", "JavaScript Basics"] },
  { name: "Sara Ahmed", email: "sara@sidrah.com", status: "active", courses: ["Full Stack", "Node.js"] },
  { name: "Khaled Mahmoud", email: "khaled@sidrah.com", status: "pending", courses: ["Node.js"] },
  { name: "Nora Samy", email: "nora@sidrah.com", status: "active", courses: ["Flutter"] },
  { name: "Mostafa Adel", email: "mostafa@sidrah.com", status: "active", courses: ["Cyber Security"] },
];

const studentsData = [
  { name: "Omar Khaled", email: "omar@email.com", enrolled: ["React.js", "Python"], status: "active", date: "2026-09-01" },
  { name: "Hoda Mahmoud", email: "hoda@email.com", enrolled: ["Full Stack"], status: "active", date: "2026-09-03" },
  { name: "Youssef Nabil", email: "youssef@email.com", enrolled: ["AI/ML"], status: "active", date: "2026-09-05" },
  { name: "Mariam Hassan", email: "mariam@email.com", enrolled: ["UI/UX"], status: "active", date: "2026-09-08" },
  { name: "Layla Mostafa", email: "layla@email.com", enrolled: ["Generative AI"], status: "active", date: "2026-09-10" },
];

const enrollmentsData = [
  { student: "Omar Khaled", course: "React.js", date: "2026-09-01", status: "completed" },
  { student: "Hoda Mahmoud", course: "Full Stack", date: "2026-09-03", status: "in-progress" },
  { student: "Youssef Nabil", course: "AI/ML", date: "2026-09-05", status: "in-progress" },
  { student: "Mariam Hassan", course: "UI/UX", date: "2026-09-08", status: "completed" },
  { student: "Layla Mostafa", course: "Generative AI", date: "2026-09-10", status: "in-progress" },
  { student: "Karim Samir", course: "DevOps", date: "2026-09-11", status: "in-progress" },
  { student: "Nour El-Din", course: "Data Analysis", date: "2026-09-12", status: "completed" },
  { student: "Mostafa Adel", course: "Flutter", date: "2026-09-13", status: "in-progress" },
];

const topCourses = [
  { title: "React.js", students: 1200, revenue: 12000, rating: 4.8 },
  { title: "Python", students: 980, revenue: 9500, rating: 4.9 },
  { title: "Full Stack", students: 750, revenue: 11000, rating: 4.9 },
  { title: "Node.js", students: 890, revenue: 8900, rating: 4.7 },
];

export default function AdminDashboard() {
  const { lang } = useLang();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const t = content[lang];
  const allCourses = getAllCourses();

  const stats = [
    { label: t.totalUsers, value: "15,000", icon: Users, color: "text-blue-400" },
    { label: t.totalCourses, value: String(allCourses.length), icon: BookOpen, color: "text-green-400" },
    { label: t.totalTeachers, value: String(teachersData.length), icon: Activity, color: "text-purple-400" },
    { label: t.totalRevenue, value: "$45,230", icon: DollarSign, color: "text-yellow-400" },
  ];

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <RoleGuard roles={["admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{t.title}</h1>
            <p className="text-[var(--text-secondary)]">{t.welcome.replace("{name}", user?.name || "Admin")}</p>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-[var(--border-color)] mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "text-sidrah-400 border-sidrah-400"
                    : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
                }`}
              >
                <tab.icon size={18} />
                {(t as any)[tab.label]}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className="card">
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                    <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</div>
                    <div className="text-[var(--text-secondary)] text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="card lg:col-span-2">
                  <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t.topCourses}</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[var(--border-color)]">
                          <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.course}</th>
                          <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.studentsN}</th>
                          <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.revenue}</th>
                          <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.rating}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topCourses.map((course, i) => (
                          <tr key={i} className="border-b border-[var(--border-color)]/50">
                            <td className="py-3 text-[var(--text-primary)] text-sm font-medium">{course.title}</td>
                            <td className="py-3 text-[var(--text-secondary)] text-sm">{course.students}</td>
                            <td className="py-3 text-green-400 text-sm">${course.revenue.toLocaleString()}</td>
                            <td className="py-3 text-yellow-400 text-sm">★ {course.rating}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t.distribution}</h3>
                  <CategoryPieChart data={categoryData} />
                </div>
              </div>
            </>
          )}

          {activeTab === "teachers" && (
            <div className="card">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t.teachers}</h2>
              {teachersData.length === 0 ? (
                <p className="text-[var(--text-secondary)]">{t.noTeachers}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border-color)]">
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.name}</th>
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.email}</th>
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.coursesTaught}</th>
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.status}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachersData.map((teacher, i) => (
                        <tr key={i} className="border-b border-[var(--border-color)]/50">
                          <td className="py-3 text-[var(--text-primary)] text-sm font-medium">{teacher.name}</td>
                          <td className="py-3 text-[var(--text-muted)] text-sm">{teacher.email}</td>
                          <td className="py-3 text-[var(--text-secondary)] text-sm">{teacher.courses.join(", ")}</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-1 rounded ${teacher.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                              {teacher.status === "active" ? t.active : t.pending}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "students" && (
            <div className="card">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t.students}</h2>
              {studentsData.length === 0 ? (
                <p className="text-[var(--text-secondary)]">{t.noStudents}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border-color)]">
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.name}</th>
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.email}</th>
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.enrolled}</th>
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.enrollDate}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsData.map((s, i) => (
                        <tr key={i} className="border-b border-[var(--border-color)]/50">
                          <td className="py-3 text-[var(--text-primary)] text-sm font-medium">{s.name}</td>
                          <td className="py-3 text-[var(--text-muted)] text-sm">{s.email}</td>
                          <td className="py-3 text-[var(--text-secondary)] text-sm">{s.enrolled.join(", ")}</td>
                          <td className="py-3 text-[var(--text-secondary)] text-sm">{fmtDate(s.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "enrollments" && (
            <div className="card">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t.enrollments}</h2>
              {enrollmentsData.length === 0 ? (
                <p className="text-[var(--text-secondary)]">{t.noEnrollments}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border-color)]">
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.name}</th>
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.course}</th>
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.enrollDate}</th>
                        <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.status}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollmentsData.map((e, i) => (
                        <tr key={i} className="border-b border-[var(--border-color)]/50">
                          <td className="py-3 text-[var(--text-primary)] text-sm font-medium">{e.student}</td>
                          <td className="py-3 text-[var(--text-secondary)] text-sm">{e.course}</td>
                          <td className="py-3 text-[var(--text-muted)] text-sm">{fmtDate(e.date)}</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-1 rounded ${e.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}>
                              {e.status === "completed" ? (lang === "ar" ? "مكتمل" : "Completed") : (lang === "ar" ? "قيد التعلم" : "In Progress")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "courses" && (
            <div className="card">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t.courses}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.course}</th>
                      <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.studentsN}</th>
                      <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.rating}</th>
                      <th className="text-right text-[var(--text-secondary)] text-sm font-medium pb-3">{t.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCourses.map((course) => (
                      <tr key={course.id} className="border-b border-[var(--border-color)]/50">
                        <td className="py-3 text-[var(--text-primary)] text-sm font-medium">{course.title}</td>
                        <td className="py-3 text-[var(--text-secondary)] text-sm">{course.students}</td>
                        <td className="py-3 text-yellow-400 text-sm">★ {course.rating}</td>
                        <td className="py-3"><span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">{lang === "ar" ? "منشور" : "Published"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
