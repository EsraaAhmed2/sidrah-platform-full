"use client";
import { useState } from "react";
import { Check, X, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import RoleGuard from "@/components/RoleGuard";

const content = {
  ar: {
    title: "قائمة مراجعة الكورسات",
    subtitle: "كورسات قيد المراجعة والاعتماد",
    course: "الكورس",
    provider: "المقدم",
    status: "الحالة",
    submitted: "تاريخ التقديم",
    approve: "موافقة",
    reject: "رفض",
    request: "طلب تعديل",
    approved: "تمت الموافقة",
    rejected: "تم الرفض",
    requested: "تم طلب التعديل",
  },
  en: {
    title: "Course Review Queue",
    subtitle: "Courses pending review and approval",
    course: "Course",
    provider: "Provider",
    status: "Status",
    submitted: "Submitted",
    approve: "Approve",
    reject: "Reject",
    request: "Request changes",
    approved: "Approved",
    rejected: "Rejected",
    requested: "Changes requested",
  },
};

export default function ReviewQueue() {
  const { lang } = useLang();
  const t = content[lang];
  const [courses, setCourses] = useState([
    { id: 1, title: "Advanced React Patterns", provider: "Ahmed Salah", status: "Under Review", date: "2026-09-12" },
    { id: 2, title: "Cybersecurity 101", provider: "Mostafa Adel", status: "Submitted", date: "2026-09-13" },
    { id: 3, title: "Generative AI", provider: "Layla Mostafa", status: "Changes Requested", date: "2026-09-10" },
  ]);

  const update = (id: number, status: string) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, status } : c)));
    const msg = status === "Approved" ? t.approved : status === "Rejected" ? t.rejected : t.requested;
    toast.success(msg);
  };

  return (
    <RoleGuard roles={["admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
            <p className="text-[var(--text-secondary)]">{t.subtitle}</p>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-right">
              <thead className="border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm">
                <tr>
                  <th className="pb-3 px-4">{t.course}</th>
                  <th className="pb-3 px-4">{t.provider}</th>
                  <th className="pb-3 px-4">{t.status}</th>
                  <th className="pb-3 px-4">{t.submitted}</th>
                  <th className="pb-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {courses.map((c) => (
                  <tr key={c.id} className="border-b border-[var(--border-color)]/50">
                    <td className="py-3 px-4 text-[var(--text-primary)]">{c.title}</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">{c.provider}</td>
                    <td className="py-3 px-4"><span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded">{c.status}</span></td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">{c.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => update(c.id, "Approved")} className="p-2 text-green-400 hover:bg-green-500/10 rounded"><Check size={16} /></button>
                        <button onClick={() => update(c.id, "Changes Requested")} className="p-2 text-yellow-400 hover:bg-yellow-500/10 rounded"><MessageSquare size={16} /></button>
                        <button onClick={() => update(c.id, "Rejected")} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><X size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
