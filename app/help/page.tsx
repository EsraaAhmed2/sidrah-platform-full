"use client";
import { useState } from "react";
import Link from "next/link";
import { LifeBuoy, Search, CreditCard, BookOpen, Award, Shield } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { StaggerContainer, StaggerItem } from "@/components/Motion";
import { useLang } from "@/context/LanguageContext";

const articles = [
  { id: 1, icon: BookOpen, titleKey: "help.a1title", catKey: "help.catStart", textKey: "help.a1text" },
  { id: 2, icon: CreditCard, titleKey: "help.a2title", catKey: "help.catPayments", textKey: "help.a2text" },
  { id: 3, icon: Award, titleKey: "help.a3title", catKey: "help.catCertificates", textKey: "help.a3text" },
  { id: 4, icon: Shield, titleKey: "help.a4title", catKey: "help.catPayments", textKey: "help.a4text" },
  { id: 5, icon: BookOpen, titleKey: "help.a5title", catKey: "help.catLessons", textKey: "help.a5text" },
  { id: 6, icon: Shield, titleKey: "help.a6title", catKey: "help.catAccount", textKey: "help.a6text" },
  { id: 7, icon: Award, titleKey: "help.a7title", catKey: "help.catPoints", textKey: "help.a7text" },
  { id: 8, icon: BookOpen, titleKey: "help.a8title", catKey: "help.catLessons", textKey: "help.a8text" },
];

const categories = ["help.catAll", "help.catStart", "help.catLessons", "help.catPayments", "help.catCertificates", "help.catAccount", "help.catPoints"];

export default function HelpPage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("help.catAll");

  const filtered = articles.filter(
    (a) =>
      (category === "help.catAll" || a.catKey === category) &&
      (!query || t(a.titleKey).includes(query) || t(a.textKey).includes(query))
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("help.title") }]} />
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-sidrah-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LifeBuoy className="text-sidrah-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">{t("help.title")}</h1>
          <p className="text-[var(--text-secondary)] mb-6">{t("help.subtitle")}</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("help.searchPlaceholder")}
              className="input-field pr-10"
              aria-label={t("help.searchLabel")}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                category === c
                  ? "bg-sidrah-600 text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
              }`}
            >
              {t(c)}
            </button>
          ))}
        </div>

        <StaggerContainer className="grid md:grid-cols-2 gap-4">
          {filtered.map((a) => (
            <StaggerItem key={a.id} className="card hover:border-sidrah-700 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sidrah-950/40 flex items-center justify-center text-sidrah-400 flex-shrink-0">
                  <a.icon size={18} />
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-medium text-sm mb-1">{t(a.titleKey)}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{t(a.textKey)}</p>
                  <span className="inline-block mt-2 text-xs text-sidrah-400 bg-sidrah-950/30 px-2 py-0.5 rounded">{t(a.catKey)}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filtered.length === 0 && (
          <div className="card text-center py-12">
            <Search size={40} className="text-[var(--text-muted)] mx-auto mb-3" />
            <p className="text-[var(--text-secondary)]">{t("help.noResults")}</p>
          </div>
        )}

        <div className="card mt-10 text-center bg-gradient-to-br from-sidrah-950/40 to-purple-950/20 border-sidrah-800/40">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t("help.notFound")}</h3>
          <p className="text-[var(--text-secondary)] text-sm mb-4">{t("help.notFoundSub")}</p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            {t("help.contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
