"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Target, ArrowLeft, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllCourses } from "@/lib/courses-data";
import CourseCard from "@/components/CourseCard";
import { useLang } from "@/context/LanguageContext";

export default function AssessmentPage() {
  const { t } = useLang();
  const questions = [
    { q: t("assessment.q1"), options: [t("assessment.q1.o1"), t("assessment.q1.o2"), t("assessment.q1.o3")], weights: [0, 1, 2] },
    { q: t("assessment.q2"), options: [t("assessment.q2.o1"), t("assessment.q2.o2"), t("assessment.q2.o3")], tracks: ["frontend", "backend", "mobile"] },
    { q: t("assessment.q3"), options: [t("assessment.q3.o1"), t("assessment.q3.o2"), t("assessment.q3.o3")], weights: [0, 1, 2] },
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const answer = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const level = (answers[0] ?? 0) + (answers[2] ?? 0);
  const track = questions[1].tracks?.[answers[1] ?? 0];
  const trackMap: Record<string, number[]> = {
    frontend: [1, 3],
    backend: [4, 2, 6],
    mobile: [5],
  };
  const recommended = getAllCourses().filter((c) => (trackMap[track ?? "frontend"] ?? []).includes(c.id));
  const levelName = level <= 1 ? t("assessment.beginner") : level <= 3 ? t("assessment.intermediate") : t("assessment.advanced");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("assessment.breadcrumb") }]} />

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-sidrah-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="text-sidrah-400" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("assessment.title")}</h1>
                <p className="text-[var(--text-secondary)]">{t("assessment.subtitle")}</p>
              </div>

              <div className="w-full bg-dark-700 rounded-full h-1.5 mb-8">
                <motion.div
                  className="bg-sidrah-500 h-1.5 rounded-full"
                  animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="card"
                >
                  <p className="text-xs text-sidrah-400 mb-2">{t("quiz.question")} {step + 1} {t("flashcards.of")} {questions.length}</p>
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">{questions[step].q}</h2>
                  <div className="space-y-3">
                    {questions[step].options.map((o, i) => (
                      <button
                        key={i}
                        onClick={() => answer(i)}
                        className="w-full text-right p-4 rounded-xl border-2 border-[var(--border-color)] hover:border-sidrah-600 hover:bg-sidrah-950/20 text-[var(--text-primary)] transition-all"
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card text-center mb-8">
                <Sparkles className="text-yellow-400 mx-auto mb-3" size={36} />
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  {t("assessment.yourLevel")}: {levelName}
                </h2>
                <p className="text-[var(--text-secondary)]">
                  {t("assessment.suitableTrack")}: {track === "frontend" ? t("assessment.frontend") : track === "backend" ? t("assessment.backend") : t("assessment.mobile")}
                </p>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t("assessment.recommended")}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {recommended.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/courses" className="text-sidrah-400 hover:text-sidrah-300 text-sm flex items-center gap-1 justify-center">
                  {t("assessment.browseAll")} <ArrowLeft size={15} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
