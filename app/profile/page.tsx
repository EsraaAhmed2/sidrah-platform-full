"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Camera, Loader2, Award, BookOpen, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLang } from "@/context/LanguageContext";

const profileSchema = (t: (k: string) => string) => z.object({
  name: z.string().min(3, t("profile.errName")),
  email: z.string().email(t("profile.errEmail")),
  bio: z.string().max(200, t("profile.errBio")).optional(),
  phone: z.string().regex(/^01[0-9]{9}$/, t("profile.errPhone")).or(z.literal("")),
});

type ProfileForm = z.infer<ReturnType<typeof profileSchema>>;

export default function ProfilePage() {
  const { t } = useLang();
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema(t)),
    defaultValues: {
      name: t("profile.defaultName"),
      email: "ahmed@email.com",
      bio: t("profile.defaultBio"),
      phone: "01027285487",
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success(t("profile.saved"));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("profile.breadcrumb") }]} />

        {/* Header */}
        <div className="card mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              {photo ? (
                <img src={photo} alt="" className="w-24 h-24 rounded-full object-cover border-2 border-[var(--bg-card)]" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sidrah-600 to-purple-500 flex items-center justify-center text-white font-bold text-4xl">
                  {t("profile.initial")}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 left-0 w-8 h-8 bg-sidrah-600 rounded-full flex items-center justify-center text-white hover:bg-sidrah-700 transition-colors border-2 border-[var(--bg-card)]"
                aria-label={t("profile.changePhoto")}
              >
                <Camera size={14} />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const url = URL.createObjectURL(f);
                    setPhoto(url);
                    toast.success(t("profile.saved"));
                  }
                }}
              />
            </div>
            <div className="text-center sm:text-right flex-1">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t("profile.defaultName")}</h1>
              <p className="text-[var(--text-secondary)] text-sm">ahmed@email.com — {t("profile.role")}</p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <div className="flex items-center gap-1 text-blue-400 justify-center"><BookOpen size={16} /><span className="font-bold">5</span></div>
                <span className="text-[var(--text-muted)] text-xs">{t("profile.courses")}</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-400 justify-center"><Award size={16} /><span className="font-bold">3</span></div>
                <span className="text-[var(--text-muted)] text-xs">{t("profile.certs")}</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-purple-400 justify-center"><Clock size={16} /><span className="font-bold">120</span></div>
                <span className="text-[var(--text-muted)] text-xs">{t("profile.hours")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">{t("profile.edit")}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm text-[var(--text-secondary)] mb-2">{t("profile.nameLabel")}</label>
                <input id="name" type="text" className="input-field" {...register("name")} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-[var(--text-secondary)] mb-2">{t("profile.emailLabel")}</label>
                <input id="email" type="email" className="input-field" {...register("email")} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-[var(--text-secondary)] mb-2">{t("profile.phoneLabel")}</label>
              <input id="phone" type="text" dir="ltr" className="input-field" {...register("phone")} />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm text-[var(--text-secondary)] mb-2">{t("profile.bioLabel")}</label>
              <textarea id="bio" rows={4} className="input-field resize-none" placeholder={t("profile.bioPlaceholder")} {...register("bio")}></textarea>
              {errors.bio && <p className="text-red-400 text-xs mt-1">{errors.bio.message}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="btn-primary flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                {t("profile.save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
