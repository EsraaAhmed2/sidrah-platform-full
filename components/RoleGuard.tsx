"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type Role } from "@/context/AuthContext";
import { ShieldX, Loader2 } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function RoleGuard({
  roles,
  children,
}: {
  roles: Role[];
  children: React.ReactNode;
}) {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const { t } = useLang();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChecked(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (checked && !isLoggedIn) {
      router.replace("/login");
    }
  }, [checked, isLoggedIn, router]);

  if (!checked || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <Loader2 className="animate-spin text-sidrah-400" size={40} />
      </div>
    );
  }

  if (user && !roles.includes(user.role)) {
    const roleList = roles.map((r) => t(`roles.${r}`)).join(` ${t("common.or")} `);
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-12">
        <div className="card text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldX className="text-red-400" size={32} />
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t("roleGuard.title")}</h1>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            {t("roleGuard.message").replace("{roles}", roleList).replace("{role}", t(`roles.${user.role}`))}
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/dashboard" className="btn-primary text-sm !py-2">{t("roleGuard.dashboard")}</Link>
            <Link href="/" className="btn-secondary text-sm !py-2">{t("roleGuard.home")}</Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
