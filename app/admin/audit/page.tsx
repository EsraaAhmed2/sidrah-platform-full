"use client";
import { Shield, Calendar } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import RoleGuard from "@/components/RoleGuard";

const content = {
  ar: {
    title: "سجل التدقيق",
    subtitle: "سجل الإجراءات الحساسة غير القابل للتعديل",
    actor: "المستخدم",
    action: "الإجراء",
    target: "الهدف",
    time: "الوقت",
    status: "الحالة",
    success: "ناجح",
  },
  en: {
    title: "Audit Logs",
    subtitle: "Immutable record of sensitive actions",
    actor: "User",
    action: "Action",
    target: "Target",
    time: "Time",
    status: "Status",
    success: "Success",
  },
};

export default function AuditLogs() {
  const { lang } = useLang();
  const t = content[lang];

  const logs = [
    { id: 1, actor: "admin@s", action: "Approved course", target: "React.js", time: "2026-09-14 10:30" },
    { id: 2, actor: "reviewer@sidrah", action: "Requested changes", target: "Flutter", time: "2026-09-14 09:15" },
    { id: 3, actor: "admin@s", action: "Suspended user", target: "user#452", time: "2026-09-13 18:00" },
    { id: 4, actor: "system", action: "Issued certificate", target: "SID-2026-001", time: "2026-09-13 12:40" },
  ];

  return (
    <RoleGuard roles={["admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2 bg-sidrah-600/20 rounded-lg">
              <Shield className="w-6 h-6 text-sidrah-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
              <p className="text-[var(--text-secondary)]">{t.subtitle}</p>
            </div>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-right">
              <thead className="border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm">
                <tr>
                  <th className="pb-3 px-4">#</th>
                  <th className="pb-3 px-4">{t.actor}</th>
                  <th className="pb-3 px-4">{t.action}</th>
                  <th className="pb-3 px-4">{t.target}</th>
                  <th className="pb-3 px-4">{t.time}</th>
                  <th className="pb-3 px-4">{t.status}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {logs.map((l) => (
                  <tr key={l.id} className="border-b border-[var(--border-color)]/50">
                    <td className="py-3 px-4 text-[var(--text-muted)]">{l.id}</td>
                    <td className="py-3 px-4 text-[var(--text-primary)]">{l.actor}</td>
                    <td className="py-3 px-4 text-[var(--text-primary)]">{l.action}</td>
                    <td className="py-3 px-4 text-[var(--text-primary)]">{l.target}</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)] whitespace-nowrap">{l.time}</td>
                    <td className="py-3 px-4"><span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">{t.success}</span></td>
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
