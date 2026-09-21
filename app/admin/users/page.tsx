"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Users, Search, ShieldCheck, Ban, GraduationCap, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import RoleGuard from "@/components/RoleGuard";

type Role = "student" | "teacher" | "admin";
type Status = "active" | "suspended";

interface Row {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joined: string;
}

const initialUsers: Row[] = [
  { id: 1, name: "أحمد خالد", email: "ahmed@mail.com", role: "teacher", status: "active", joined: "2026-01-15" },
  { id: 2, name: "سارة أحمد", email: "sara@mail.com", role: "student", status: "active", joined: "2026-02-10" },
  { id: 3, name: "محمد علي", email: "mohamed@mail.com", role: "student", status: "active", joined: "2026-03-05" },
  { id: 4, name: "فاطمة حسن", email: "fatma@mail.com", role: "teacher", status: "suspended", joined: "2026-04-20" },
  { id: 5, name: "خالد إبراهيم", email: "khaled@mail.com", role: "student", status: "active", joined: "2026-05-12" },
  { id: 6, name: "نور الدين", email: "nour@mail.com", role: "admin", status: "active", joined: "2026-06-01" },
];

const roleBadge: Record<Role, { cls: string; icon: typeof UserIcon }> = {
  student: { cls: "bg-blue-500/15 text-blue-400", icon: UserIcon },
  teacher: { cls: "bg-purple-500/15 text-purple-400", icon: GraduationCap },
  admin: { cls: "bg-yellow-500/15 text-yellow-400", icon: ShieldCheck },
};

export default function AdminUsersPage() {
  const { t, lang } = useLang();
  const [users, setUsers] = useState(initialUsers);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");

  const filtered = users.filter(
    (u) =>
      (roleFilter === "all" || u.role === roleFilter) &&
      (u.name.includes(q) || u.email.includes(q))
  );

  const toggleBan = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u))
    );
    toast.success(t("admin.users.toast.status"));
  };

  const changeRole = (id: number, role: Role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    toast.success(t("admin.users.toast.role"));
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <RoleGuard roles={["admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: t("admin.users.breadcrumb.management"), href: "/admin" }, { label: t("admin.users.breadcrumb.users") }]} />
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
              <Users className="text-red-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t("admin.users.title")}</h1>
              <p className="text-[var(--text-secondary)] text-sm">{t("admin.users.count").replace("{count}", String(users.length))}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("admin.users.placeholder")} className="input-field pr-10" />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "all" | Role)}
              className="input-field !w-auto"
              aria-label={t("admin.users.filterRole")}
            >
              <option value="all">{t("admin.users.role.all")}</option>
              <option value="student">{t("admin.users.role.students")}</option>
              <option value="teacher">{t("admin.users.role.teachers")}</option>
              <option value="admin">{t("admin.users.role.admins")}</option>
            </select>
          </div>

          <div className="card !p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)]">
                    <th className="text-right px-5 py-3 font-medium">{t("admin.users.header.user")}</th>
                    <th className="text-right px-5 py-3 font-medium">{t("admin.users.header.role")}</th>
                    <th className="text-right px-5 py-3 font-medium">{t("admin.users.header.status")}</th>
                    <th className="text-right px-5 py-3 font-medium">{t("admin.users.header.joined")}</th>
                    <th className="text-right px-5 py-3 font-medium">{t("admin.users.header.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => {
                    const rb = roleBadge[u.role];
                    return (
                      <tr key={u.id} className="border-b border-[var(--border-color)]/50 last:border-0 hover:bg-[var(--bg-primary)] transition-colors">
                        <td className="px-5 py-4">
                          <p className="text-[var(--text-primary)] font-medium">{u.name}</p>
                          <p className="text-[var(--text-muted)] text-xs">{u.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={u.role}
                            onChange={(e) => changeRole(u.id, e.target.value as Role)}
                            className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${rb.cls} bg-transparent`}
                            aria-label={t("admin.users.changeRole")}
                          >
                            <option value="student">{t("roles.student")}</option>
                            <option value="teacher">{t("roles.teacher")}</option>
                            <option value="admin">{t("roles.admin")}</option>
                          </select>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${u.status === "active" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                            {t(`admin.users.status.${u.status}`)}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[var(--text-muted)]">{fmtDate(u.joined)}</td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => toggleBan(u.id)}
                            className={`p-2 rounded-lg transition-colors ${u.status === "active" ? "text-[var(--text-muted)] hover:text-red-400" : "text-red-400 hover:text-green-400"}`}
                            title={u.status === "active" ? `${t("admin.users.ban")} ${u.name}` : `${t("admin.users.activate")} ${u.name}`}
                            aria-label={u.status === "active" ? `${t("admin.users.ban")} ${u.name}` : `${t("admin.users.activate")} ${u.name}`}
                          >
                            <Ban size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
