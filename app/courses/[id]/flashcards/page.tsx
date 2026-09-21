"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCourseById } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";

export default function FlashcardsPage() {
  const { t } = useLang();
  const params = useParams();
  const courseId = Number(params.id);
  const courseData = getCourseById(courseId);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);

  if (!courseData) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t("course.notFound")}</h1>
          <Link href="/courses" className="btn-primary">{t("course.backToCourses")}</Link>
        </div>
      </div>
    );
  }

  const cardsByCategory: Record<string, { front: string; back: string }[]> = {
    "Front-End": [
      { front: t("flashcards.frontEnd.1.front"), back: t("flashcards.frontEnd.1.back") },
      { front: t("flashcards.frontEnd.2.front"), back: t("flashcards.frontEnd.2.back") },
      { front: t("flashcards.frontEnd.3.front"), back: t("flashcards.frontEnd.3.back") },
      { front: t("flashcards.frontEnd.4.front"), back: t("flashcards.frontEnd.4.back") },
    ],
    "Back-End": [
      { front: t("flashcards.backEnd.1.front"), back: t("flashcards.backEnd.1.back") },
      { front: t("flashcards.backEnd.2.front"), back: t("flashcards.backEnd.2.back") },
      { front: t("flashcards.backEnd.3.front"), back: t("flashcards.backEnd.3.back") },
      { front: t("flashcards.backEnd.4.front"), back: t("flashcards.backEnd.4.back") },
    ],
    default: [
      { front: t("flashcards.default.1.front"), back: t("flashcards.default.1.back") },
      { front: t("flashcards.default.2.front"), back: t("flashcards.default.2.back") },
      { front: t("flashcards.default.3.front"), back: t("flashcards.default.3.back") },
    ],
  };

  const cards = cardsByCategory[courseData.category] ?? cardsByCategory.default;
  const card = cards[idx % cards.length];

  const mark = (ok: boolean) => {
    if (ok) {
      setKnown((k) => (k.includes(idx % cards.length) ? k : [...k, idx % cards.length]));
      toast.success(t("flashcards.knewIt") + "! 🎯");
    }
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: t("courses.breadcrumb"), href: "/courses" },
            { label: courseData.title, href: `/courses/${courseId}` },
            { label: t("flashcards.breadcrumb") },
          ]}
        />
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-sidrah-950/50 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Layers className="text-sidrah-400" size={26} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{t("flashcards.title")}</h1>
          <p className="text-[var(--text-secondary)] text-sm">{courseData.title} — {t("flashcards.mastered")} {known.length} {t("flashcards.of")} {cards.length}</p>
        </div>

        {/* Card */}
        <div className="perspective-1000 mb-8" style={{ perspective: "1000px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <motion.button
                onClick={() => setFlipped(!flipped)}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-64 relative"
                aria-label={flipped ? t("flashcards.backFace") : t("flashcards.frontFace")}
              >
                <div
                  className="absolute inset-0 card flex items-center justify-center p-8 text-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div>
                    <p className="text-xs text-sidrah-400 mb-3">{t("flashcards.frontHint")}</p>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{card.front}</p>
                  </div>
                </div>
                <div
                  className="absolute inset-0 card !bg-sidrah-950/40 border-sidrah-800/40 flex items-center justify-center p-8 text-center"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div>
                    <p className="text-xs text-sidrah-300 mb-3">{t("flashcards.answer")}</p>
                    <p className="text-lg text-[var(--text-primary)] leading-relaxed">{card.back}</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <button onClick={() => mark(false)} className="btn-secondary flex items-center gap-2">
            <ChevronRight size={18} /> {t("flashcards.needReview")}
          </button>
          <button onClick={() => mark(true)} className="btn-primary flex items-center gap-2">
            {t("flashcards.knewIt")} <ChevronLeft size={18} />
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => { setIdx(0); setKnown([]); setFlipped(false); }}
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-sm flex items-center gap-1 mx-auto"
          >
            <RotateCcw size={14} /> {t("flashcards.restart")}
          </button>
        </div>
      </div>
    </div>
  );
}
