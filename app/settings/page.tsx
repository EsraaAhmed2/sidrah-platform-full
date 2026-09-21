"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Lock, Globe, Loader2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLang } from "@/context/LanguageContext";

const passwordSchema = (t: (k: string) => string) => z
  .object({
    current: z.string().min(1, t("settings.errCurrent")),
    next: z.string().min(8, t("settings.errNext")),
    confirm: z.string().min(1, t("settings.errConfirm")),
  })
  .refine((d) => d.next === d.confirm, {
    message: t("settings.errMatch"),
    path: ["confirm"],
  });

type PasswordForm = z.infer<ReturnType<typeof passwordSchema>>;

export default function SettingsPage() {
  const { t, setLang } = useLang();
  const [prefs, setPrefs] = useState({ lang: "ar", quality: "auto", autoplay: "on" });

  useEffect(() => {
    const saved = localStorage.getItem("sidrah-prefs");
    if (saved) {
      try { setPrefs(JSON.parse(saved)); } catch {}
    }
  }, []);

  const savePrefs = () => {
    setLang(prefs.lang as "ar" | "en");
    localStorage.setItem("sidrah-prefs", JSON.stringify(prefs));
    toast.success(t("settings.prefSaved"));
  };

  const tabs = [
    { id: "notifications", label: t("settings.tab.notifications"), icon: Bell },
    { id: "password", label: t("settings.tab.password"), icon: Lock },
    { id: "preferences", label: t("settings.tab.preferences"), icon: Globe },
  ] as const;

  const notifSettings = [
    { id: "new-lessons", label: t("settings.notif.newLessons"), desc: t("settings.notif.newLessonsDesc") },
    { id: "course-updates", label: t("settings.notif.courseUpdates"), desc: t("settings.notif.courseUpdatesDesc") },
    { id: "promotions", label: t("settings.notif.promotions"), desc: t("settings.notif.promotionsDesc") },
    { id: "weekly-report", label: t("settings.notif.weeklyReport"), desc: t("settings.notif.weeklyReportDesc") },
    { id: "comments", label: t("settings.notif.comments"), desc: t("settings.notif.commentsDesc") },
  ];

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("notifications");
  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    "new-lessons": true,
    "course-updates": true,
    promotions: false,
    "weekly-report": true,
    comments: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordForm>({ resolver: zodResolver(passwordSchema(t)) });

  const onPasswordSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success(t("settings.pwChanged"));
    reset();
  };

  const toggleNotif = (id: string) => {
    setNotifs((prev) => ({ ...prev, [id]: !prev[id] }));
    toast.success(t("settings.notifSaved"));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("settings.title") }]} />
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-8">{t("settings.title")}</h1>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="card p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-sidrah-950/40 text-sidrah-400"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "notifications" && (
                  <div className="card">
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">{t("settings.notifTitle")}</h2>
                    <div className="space-y-4">
                      {notifSettings.map((s) => (
                        <div key={s.id} className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[var(--text-primary)] text-sm font-medium">{s.label}</p>
                            <p className="text-[var(--text-muted)] text-xs">{s.desc}</p>
                          </div>
                          <button
                            role="switch"
                            aria-checked={notifs[s.id]}
                            aria-label={s.label}
                            onClick={() => toggleNotif(s.id)}
                            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                              notifs[s.id] ? "bg-sidrah-600" : "bg-dark-600"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                notifs[s.id] ? "right-0.5" : "right-[22px]"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "password" && (
                  <div className="card">
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">{t("settings.pwTitle")}</h2>
                    <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4" noValidate>
                      <div>
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("settings.pwCurrent")}</label>
                        <input type="password" className="input-field" {...register("current")} />
                        {errors.current && <p className="text-red-400 text-xs mt-1">{errors.current.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("settings.pwNew")}</label>
                        <input type="password" className="input-field" {...register("next")} />
                        {errors.next && <p className="text-red-400 text-xs mt-1">{errors.next.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("settings.pwConfirm")}</label>
                        <input type="password" className="input-field" {...register("confirm")} />
                        {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm.message}</p>}
                      </div>
                      <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                        {t("settings.pwChange")}
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === "preferences" && (
                  <div className="card">
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">{t("settings.tab.preferences")}</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("settings.langLabel")}</label>
                        <select className="input-field" value={prefs.lang} onChange={(e) => setPrefs({ ...prefs, lang: e.target.value })}>
                          <option value="ar">العربية</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("settings.videoQuality")}</label>
                        <select className="input-field" value={prefs.quality} onChange={(e) => setPrefs({ ...prefs, quality: e.target.value })}>
                          <option value="auto">{t("settings.optAuto")}</option>
                          <option value="1080">1080p</option>
                          <option value="720">720p</option>
                          <option value="480">480p</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("settings.autoplay")}</label>
                        <select className="input-field" value={prefs.autoplay} onChange={(e) => setPrefs({ ...prefs, autoplay: e.target.value })}>
                          <option value="on">{t("settings.optOn")}</option>
                          <option value="off">{t("settings.optOff")}</option>
                        </select>
                      </div>
                      <button onClick={savePrefs} className="btn-primary">
                        {t("settings.savePrefs")}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
