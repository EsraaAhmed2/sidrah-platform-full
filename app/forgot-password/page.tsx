"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordForm } from "@/lib/schemas";
import { useLang } from "@/context/LanguageContext";

export default function ForgotPasswordPage() {
  const { t } = useLang();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data: ForgotPasswordForm) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`${t("forgot.sentTo")} ${data.email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/logo-icon.jpg" alt="Sidrah" className="w-16 h-16 rounded-2xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">{t("forgot.title")}</h1>
          <p className="text-gray-400 text-sm">{t("forgot.subtitle")}</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-2">{t("forgot.email")}</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder={t("forgot.emailPlaceholder")}
                  className="input-field pr-10"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting && <Loader2 size={18} className="animate-spin" />}
              {t("forgot.submit")}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-800 text-gray-500">{t("forgot.or")}</span>
            </div>
          </div>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sidrah-400 hover:text-sidrah-300 text-sm"
          >
            <ArrowLeft size={16} />
            {t("forgot.backToLogin")}
          </Link>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          {t("forgot.remembered")}{" "}
          <Link href="/login" className="text-sidrah-400 hover:text-sidrah-300 font-medium">
            {t("forgot.login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
