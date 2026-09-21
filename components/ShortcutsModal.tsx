"use client";
import { useEffect, useState } from "react";
import { Keyboard, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function ShortcutsModal() {
  const { t } = useLang();
  const shortcuts = [
    { keys: "Ctrl + K", desc: t("sc.d1") },
    { keys: "?", desc: t("sc.d2") },
    { keys: "Space", desc: t("sc.d3") },
    { keys: "← / →", desc: t("sc.d4") },
    { keys: "F", desc: t("sc.d5") },
    { keys: "M", desc: t("sc.d6") },
    { keys: "ESC", desc: t("sc.d7") },
  ];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "?") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Keyboard className="text-sidrah-400" size={20} />
                {t("sc.title")}
              </h2>
              <button onClick={() => setOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]" aria-label={t("sc.close")}>
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {shortcuts.map((s) => (
                <div key={s.keys} className="flex items-center justify-between py-2 border-b border-[var(--border-color)]/50 last:border-0">
                  <span className="text-sm text-[var(--text-secondary)]">{s.desc}</span>
                  <kbd className="text-xs font-mono bg-[var(--bg-primary)] border border-[var(--border-color)] px-2 py-1 rounded" dir="ltr">
                    {s.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
