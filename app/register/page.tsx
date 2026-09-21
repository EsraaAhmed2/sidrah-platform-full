"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Chrome, Github, Loader2 } from "lucide-react";
import { registerSchema, type RegisterForm } from "@/lib/schemas";
import { useState } from "react";
import { GraduationCap, BookOpen } from "lucide-react";
import { useAuth, type Role } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLang();
  const [role, setRole] = useState<Role>("student");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    await new Promise((r) => setTimeout(r, 900));
    login(data.email, data.name, role);
    toast.success(t("register.toastSuccess"));
    router.push(role === "teacher" ? "/teacher" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/logo-icon.jpg" alt="Sidrah" className="w-16 h-16 rounded-2xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">{t("register.title")}</h1>
          <p className="text-gray-400 text-sm">{t("register.subtitle")}</p>
        </div>

        <div className="card space-y-4">
          <button type="button" onClick={() => { login("google@sidrah.com", "Google User", role); toast.success(t("register.toastSuccess")); router.push(role === "teacher" ? "/teacher" : "/dashboard"); }} className="w-full flex items-center justify-center gap-3 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg px-4 py-3 text-white transition-colors">
            <Chrome size={20} className="text-red-400" />
            <span className="text-sm">{t("register.withGoogle")}</span>
          </button>

          <button type="button" onClick={() => { login("github@sidrah.com", "GitHub User", role); toast.success(t("register.toastSuccess")); router.push(role === "teacher" ? "/teacher" : "/dashboard"); }} className="w-full flex items-center justify-center gap-3 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg px-4 py-3 text-white transition-colors">
            <Github size={20} />
            <span className="text-sm">{t("register.withGithub")}</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-800 text-gray-500">{t("register.or")}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm text-gray-300 mb-2">{t("register.asRole")}</label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { r: "student" as Role, label: t("register.roleStudent"), desc: t("register.roleStudentDesc"), icon: BookOpen },
                  { r: "teacher" as Role, label: t("register.roleTeacher"), desc: t("register.roleTeacherDesc"), icon: GraduationCap },
                ]).map((o) => (
                  <button
                    key={o.r}
                    type="button"
                    onClick={() => setRole(o.r)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      role === o.r ? "border-sidrah-500 bg-sidrah-950/30" : "border-dark-600 hover:border-dark-500"
                    }`}
                    aria-pressed={role === o.r}
                  >
                    <o.icon size={22} className={`mx-auto mb-1 ${role === o.r ? "text-sidrah-400" : "text-gray-500"}`} />
                    <p className="text-white text-sm font-medium">{o.label}</p>
                    <p className="text-gray-500 text-xs">{o.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-2">{t("register.name")}</label>
              <input id="name" type="text" placeholder={t("register.namePlaceholder")} className="input-field" aria-invalid={!!errors.name} {...register("name")} />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-2">{t("register.email")}</label>
              <input id="email" type="email" placeholder="example@email.com" className="input-field" aria-invalid={!!errors.email} {...register("email")} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-2">{t("register.password")}</label>
              <input id="password" type="password" placeholder={t("register.passwordPlaceholder")} className="input-field" aria-invalid={!!errors.password} {...register("password")} />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-2">{t("register.confirmPassword")}</label>
              <input id="confirmPassword" type="password" placeholder={t("register.confirmPlaceholder")} className="input-field" aria-invalid={!!errors.confirmPassword} {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <input id="terms" type="checkbox" className="rounded bg-dark-700 border-dark-600" {...register("terms")} />
                <label htmlFor="terms">
                  {t("register.agree")} <Link href="/terms" className="text-sidrah-400">{t("register.terms")}</Link> {t("register.and")} <Link href="/privacy" className="text-sidrah-400">{t("register.privacy")}</Link>
                </label>
              </div>
              {errors.terms && <p className="text-red-400 text-xs mt-1">{errors.terms.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting && <Loader2 size={18} className="animate-spin" />}
              {t("register.submit")}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          {t("register.haveAccount")}{" "}
          <Link href="/login" className="text-sidrah-400 hover:text-sidrah-300 font-medium">
            {t("register.login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
