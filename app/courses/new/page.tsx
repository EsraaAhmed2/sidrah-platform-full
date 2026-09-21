"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Check, ChevronRight, Plus, Trash2, Info, ListVideo, DollarSign } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLang } from "@/context/LanguageContext";

const categories = ["Fundamentals", "Front-End", "Back-End", "Full Stack", "Mobile", "Database", "UI/UX", "AI Automation", "AI/ML", "Generative AI", "Cyber Security", "Data Analysis", "Testing", "DevOps"];

export default function NewCoursePage() {
  const { t } = useLang();
  const router = useRouter();
  const steps = [
    { id: 0, label: t("newCourse.stepInfo"), icon: Info },
    { id: 1, label: t("newCourse.stepLessons"), icon: ListVideo },
    { id: 2, label: t("newCourse.stepPricing"), icon: DollarSign },
  ];
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({ title: "", category: "", level: "", description: "" });
  const [lessons, setLessons] = useState([{ title: "", duration: "", free: true }]);
  const [pricing, setPricing] = useState({ price: "", isFree: false });

  const canNext =
    step === 0
      ? info.title.trim() && info.category && info.description.trim()
      : step === 1
      ? lessons.every((l) => l.title.trim())
      : pricing.isFree || Number(pricing.price) > 0;

  const addLesson = () => setLessons((s) => [...s, { title: "", duration: "", free: false }]);
  const removeLesson = (i: number) => setLessons((s) => s.filter((_, x) => x !== i));
  const updateLesson = (i: number, key: string, value: string | boolean) =>
    setLessons((s) => s.map((l, x) => (x === i ? { ...l, [key]: value } : l)));

  const publish = async () => {
    await new Promise((r) => setTimeout(r, 900));
    toast.success(t("newCourse.publishToast"));
    router.push("/teacher");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("newCourse.teacherDashboard"), href: "/teacher" }, { label: t("newCourse.breadcrumbCreate") }]} />
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-8">{t("newCourse.title")}</h1>

        {/* Stepper */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step > i
                      ? "bg-sidrah-600 border-sidrah-600 text-white"
                      : step === i
                      ? "border-sidrah-500 text-sidrah-400"
                      : "border-[var(--border-color)] text-[var(--text-muted)]"
                  }`}
                >
                  {step > i ? <Check size={18} /> : <s.icon size={18} />}
                </div>
                <span className={`text-xs mt-2 whitespace-nowrap ${step >= i ? "text-sidrah-400" : "text-[var(--text-muted)]"}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 mb-6 rounded ${step > i ? "bg-sidrah-600" : "bg-[var(--border-color)]"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25 }}
            className="card"
          >
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("newCourse.courseTitleLabel")}</label>
                  <input
                    type="text"
                    value={info.title}
                    onChange={(e) => setInfo({ ...info, title: e.target.value })}
                    placeholder={t("newCourse.courseTitlePlaceholder")}
                    className="input-field"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("newCourse.categoryLabel")}</label>
                    <select value={info.category} onChange={(e) => setInfo({ ...info, category: e.target.value })} className="input-field">
                      <option value="">{t("newCourse.selectCategory")}</option>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("newCourse.levelLabel")}</label>
                    <select value={info.level} onChange={(e) => setInfo({ ...info, level: e.target.value })} className="input-field">
                      <option value="">{t("newCourse.selectLevel")}</option>
                      <option value="beginner">{t("newCourse.beginner")}</option>
                      <option value="intermediate">{t("newCourse.intermediate")}</option>
                      <option value="advanced">{t("newCourse.advanced")}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("newCourse.courseDescLabel")}</label>
                  <textarea
                    rows={4}
                    value={info.description}
                    onChange={(e) => setInfo({ ...info, description: e.target.value })}
                    placeholder={t("newCourse.courseDescPlaceholder")}
                    className="input-field resize-none"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[var(--text-secondary)]">{t("newCourse.lessonsHint")}</p>
                  <button onClick={addLesson} className="btn-secondary !py-2 !px-4 text-sm flex items-center gap-2">
                    <Plus size={16} /> {t("newCourse.addLesson")}
                  </button>
                </div>
                {lessons.map((lesson, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)]">
                    <span className="w-8 h-8 rounded-lg bg-sidrah-950/50 text-sidrah-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <input
                      type="text"
                      value={lesson.title}
                      onChange={(e) => updateLesson(i, "title", e.target.value)}
                      placeholder={t("newCourse.lessonTitlePlaceholder")}
                      className="input-field !py-2 flex-1"
                    />
                    <input
                      type="text"
                      value={lesson.duration}
                      onChange={(e) => updateLesson(i, "duration", e.target.value)}
                      placeholder="10:00"
                      className="input-field !py-2 w-24"
                      dir="ltr"
                    />
                    <label className="flex items-center gap-1 text-xs text-[var(--text-secondary)] whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={lesson.free}
                        onChange={(e) => updateLesson(i, "free", e.target.checked)}
                        className="rounded bg-dark-700 border-dark-600"
                      />
                      {t("newCourse.freeLesson")}
                    </label>
                    {lessons.length > 1 && (
                      <button onClick={() => removeLesson(i)} className="text-[var(--text-muted)] hover:text-red-400" aria-label={t("newCourse.deleteLesson")}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <label className="flex items-center gap-3 p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pricing.isFree}
                    onChange={(e) => setPricing({ ...pricing, isFree: e.target.checked, price: "" })}
                    className="rounded bg-dark-700 border-dark-600"
                  />
                  <div>
                    <p className="text-[var(--text-primary)] text-sm font-medium">{t("newCourse.freeCourse")}</p>
                    <p className="text-[var(--text-muted)] text-xs">{t("newCourse.freeCourseDesc")}</p>
                  </div>
                </label>
                {!pricing.isFree && (
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("newCourse.priceLabel")}</label>
                    <input
                      type="number"
                      min="1"
                      value={pricing.price}
                      onChange={(e) => setPricing({ ...pricing, price: e.target.value })}
                      placeholder={t("newCourse.pricePlaceholder")}
                      className="input-field w-40"
                      dir="ltr"
                    />
                    <p className="text-[var(--text-muted)] text-xs mt-2">{t("newCourse.revenueHint")}</p>
                  </div>
                )}
                <div className="bg-sidrah-950/30 border border-sidrah-800/30 rounded-lg p-4">
                  <h4 className="text-sidrah-300 text-sm font-medium mb-2">{t("newCourse.summaryTitle")}</h4>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                    <li>{t("newCourse.summaryTitleLabel")} {info.title}</li>
                    <li>{t("newCourse.summaryCategory")} {info.category}</li>
                    <li>{t("newCourse.summaryLessons")} {lessons.length}</li>
                    <li>{t("newCourse.summaryPrice")} {pricing.isFree ? t("newCourse.free") : `$${pricing.price}`}</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            <ChevronRight size={18} /> {t("newCourse.previous")}
          </button>
          {step < 2 ? (
            <button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext} className="btn-primary disabled:opacity-50">
              {t("newCourse.next")}
            </button>
          ) : (
            <button onClick={publish} disabled={!canNext} className="btn-primary disabled:opacity-50">
              {t("newCourse.publish")} 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
