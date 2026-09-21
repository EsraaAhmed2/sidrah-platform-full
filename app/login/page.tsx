"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Github, Chrome, Loader2 } from "lucide-react";
import { loginSchema, type LoginForm } from "@/lib/schemas";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLang();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    await new Promise((r) => setTimeout(r, 800));
    login(data.email);
    toast.success(t("login.toastSuccess"));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/logo-icon.jpg" alt="Sidrah" className="w-16 h-16 rounded-2xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">{t("login.title")}</h1>
          <p className="text-gray-400 text-sm">{t("login.subtitle")}</p>
        </div>

        <div className="card space-y-4">
          <button type="button" onClick={() => { login("google@sidrah.com", "Google User", "student"); toast.success(t("login.toastSuccess")); router.push("/dashboard"); }} className="w-full flex items-center justify-center gap-3 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg px-4 py-3 text-white transition-colors">
            <Chrome size={20} className="text-red-400" />
            <span className="text-sm">{t("login.withGoogle")}</span>
          </button>

          <button type="button" onClick={() => { login("github@sidrah.com", "GitHub User", "student"); toast.success(t("login.toastSuccess")); router.push("/dashboard"); }} className="w-full flex items-center justify-center gap-3 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg px-4 py-3 text-white transition-colors">
            <Github size={20} />
            <span className="text-sm">{t("login.withGithub")}</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-800 text-gray-500">{t("login.or")}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-2">{t("login.email")}</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="input-field"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-2">{t("login.password")}</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input-field"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="rounded bg-dark-700 border-dark-600" {...register("remember")} />
                {t("login.remember")}
              </label>
              <Link href="/forgot-password" className="text-sidrah-400 hover:text-sidrah-300">
                {t("login.forgot")}
              </Link>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting && <Loader2 size={18} className="animate-spin" />}
              {t("login.submit")}
            </button>
          </form>
        </div>

        {/* Demo quick-login roles */}
        <div className="card mt-4 !p-4">
          <p className="text-gray-500 text-xs text-center mb-3">🧪 {t("login.demoTitle")}</p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { role: "student" as const, labelKey: "login.roleStudent", icon: "🎓" },
              { role: "teacher" as const, labelKey: "login.roleTeacher", icon: "👨‍🏫" },
              { role: "admin" as const, labelKey: "login.roleAdmin", icon: "🛡️" },
            ]).map((r) => (
              <button
                key={r.role}
                onClick={() => {
                  login(`${r.role}@sidrah.com`, t(r.labelKey), r.role);
                  toast.success(`${t("login.demoLoggedAs")} ${t(r.labelKey)}`);
                  router.push(r.role === "student" ? "/dashboard" : r.role === "teacher" ? "/teacher" : "/admin");
                }}
                className="bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg py-2 text-white text-sm transition-colors"
              >
                <span className="block text-lg mb-1">{r.icon}</span>
                {t(r.labelKey)}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          {t("login.noAccount")}{" "}
          <Link href="/register" className="text-sidrah-400 hover:text-sidrah-300 font-medium">
            {t("login.createAccount")}
          </Link>
        </p>
      </div>
    </div>
  );
}
