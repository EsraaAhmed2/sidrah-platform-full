"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, FileText, Home, User, Settings, Heart } from "lucide-react";
import { getAllCourses } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";

const pageItems = [
  { key: "nav.home", href: "/", icon: Home },
  { key: "nav.courses", href: "/courses", icon: BookOpen },
  { key: "nav.dashboard", href: "/dashboard", icon: User },
  { key: "nav.wishlist", href: "/wishlist", icon: Heart },
  { key: "nav.settings", href: "/settings", icon: Settings },
  { key: "nav.blog", href: "/blog", icon: FileText },
  { key: "nav.leaderboard", href: "/leaderboard", icon: User },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const courses = getAllCourses();
  const { t } = useLang();

  const pages = useMemo(
    () =>
      pageItems.map((p) => ({
        label: t(p.key),
        href: p.href,
        icon: p.icon,
        hint: t("commandPalette.hint.page"),
      })),
    [t]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const { flat: results, grouped } = useMemo(() => {
    const q = query.toLowerCase();
    const matchedPages = pages.filter((p) => p.label.toLowerCase().includes(query) || !q);
    const matchedCourses = courses
      .filter((c) => !q || c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.description.includes(query))
      .slice(0, 5);
    const grouped = [
      { group: t("commandPalette.group.pages"), items: matchedPages },
      {
        group: t("commandPalette.group.courses"),
        items: matchedCourses.map((c) => ({
          label: c.title,
          href: `/courses/${c.id}`,
          icon: BookOpen,
          hint: c.category,
        })),
      },
    ].filter((g) => g.items.length > 0);
    return { grouped, flat: grouped.flatMap((g) => g.items) };
  }, [query, pages, courses, t]);

  useEffect(() => setSelected(0), [results.length]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.96, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 border-b border-[var(--border-color)]">
              <Search size={18} className="text-[var(--text-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
                  if (e.key === "Enter" && results[selected]) go(results[selected].href);
                }}
                placeholder={t("commandPalette.placeholder")}
                className="flex-1 bg-transparent py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                aria-label={t("commandPalette.ariaLabel")}
              />
              <kbd className="text-xs text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-1 rounded border border-[var(--border-color)]">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="text-[var(--text-muted)] text-sm text-center py-8">{t("commandPalette.noResults")}</p>
              )}
              {(() => {
                let idx = 0;
                return grouped.map((g) => (
                  <div key={g.group}>
                    <p className="text-[10px] text-[var(--text-muted)] font-bold px-4 pt-3 pb-1">{g.group}</p>
                    {g.items.map((r) => {
                      const i = idx++;
                      return (
                        <button
                          key={r.href + i}
                          onClick={() => go(r.href)}
                          onMouseEnter={() => setSelected(i)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                            selected === i ? "bg-sidrah-950/40 text-sidrah-300" : "text-[var(--text-primary)]"
                          }`}
                        >
                          <r.icon size={18} className="text-[var(--text-muted)]" />
                          <span className="flex-1 text-sm">{r.label}</span>
                          <span className="text-xs text-[var(--text-muted)]">{r.hint}</span>
                        </button>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
            <div className="px-4 py-2 border-t border-[var(--border-color)] flex gap-4 text-xs text-[var(--text-muted)]">
              <span>{t("commandPalette.navigate")}</span>
              <span>{t("commandPalette.select")}</span>
              <span>{t("commandPalette.toggle")}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
