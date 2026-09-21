"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";

const interests = ["Front-End", "Back-End", "Full Stack", "Mobile", "Database", "UI/UX", "AI/ML", "AI Automation", "Generative AI", "Cyber Security", "Data Analysis", "Testing", "DevOps", "Fundamentals"];

export default function Onboarding() {
  const { t } = useLang();
  const levels = [t("ob.l1"), t("ob.l2"), t("ob.l3"), t("ob.l4")];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [level, setLevel] = useState("");

  useEffect(() => {
    const seen = localStorage.getItem("sidrah-onboarded");
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const finish = () => {
    localStorage.setItem("sidrah-onboarded", "1");
    localStorage.setItem("sidrah-interests", JSON.stringify(selected));
    localStorage.setItem("sidrah-level", level);
    setOpen(false);
    toast.success(t("ob.done"));
  };

  const toggle = (i: string) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl w-full max-w-md p-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-sidrah-400" size={20} />
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{t("ob.title")}</h2>
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              {t("ob.sub")}
            </p>

            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <p className="text-[var(--text-primary)] text-sm font-medium mb-3">{t("ob.q1")}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {interests.map((i) => (
                      <button
                        key={i}
                        onClick={() => toggle(i)}
                        className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                          selected.includes(i)
                            ? "bg-sidrah-600 text-white border-sidrah-600"
                            : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-sidrah-700"
                        }`}
                      >
                        {selected.includes(i) && <Check size={14} className="inline ml-1" />}
                        {i}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    disabled={selected.length === 0}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    {t("ob.next")}
                  </button>
                </motion.div>
              ) : (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <p className="text-[var(--text-primary)] text-sm font-medium mb-3">{t("ob.q2")}</p>
                  <div className="space-y-2 mb-6">
                    {levels.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`w-full text-right px-4 py-3 rounded-lg text-sm border transition-all ${
                          level === l
                            ? "bg-sidrah-600 text-white border-sidrah-600"
                            : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-sidrah-700"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="btn-secondary flex-1">{t("ob.back")}</button>
                    <button onClick={finish} disabled={!level} className="btn-primary flex-1 disabled:opacity-50">
                      {t("ob.start")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={finish} className="w-full text-center text-[var(--text-muted)] text-xs mt-4 hover:text-[var(--text-secondary)]">
              {t("ob.skip")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
