"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllCourses } from "@/lib/courses-data";
import { StaggerContainer, StaggerItem } from "@/components/Motion";
import { Suspense } from "react";
import { useLang } from "@/context/LanguageContext";

const categories = ["الكل", "Fundamentals", "Front-End", "Back-End", "Full Stack", "Mobile", "Database", "UI/UX", "AI Automation", "AI/ML", "Generative AI", "Cyber Security", "Data Analysis", "Testing", "DevOps"];
const priceRanges = [
  { key: "search.all", min: 0, max: Infinity },
  { key: "search.under30", min: 0, max: 30 },
  { key: "search.30to50", min: 30, max: 50 },
  { key: "search.over50", min: 50, max: Infinity },
];

function SearchContent() {
  const { t } = useLang();
  const sortOptions = [
    { value: "rating", label: t("search.sortRating") },
    { value: "students", label: t("search.sortStudents") },
    { value: "price-asc", label: t("search.sortPriceAsc") },
    { value: "price-desc", label: t("search.sortPriceDesc") },
  ];
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState("الكل");
  const [priceIdx, setPriceIdx] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const range = priceRanges[priceIdx];
    let list = getAllCourses().filter((c) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q);
      const matchCat = category === "الكل" || c.category === category;
      const matchPrice = c.price >= range.min && c.price < range.max;
      const matchRating = c.rating >= minRating;
      return matchQ && matchCat && matchPrice && matchRating;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "students") return b.students - a.students;
      if (sort === "price-asc") return a.price - b.price;
      return b.price - a.price;
    });
    return list;
  }, [query, category, priceIdx, minRating, sort]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("search.breadcrumb") }]} />
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{t("search.title")}</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="input-field pr-10"
              aria-label={t("search.breadcrumb")}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field md:w-48"
            aria-label={t("search.sortAria")}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="btn-secondary flex items-center gap-2"
            aria-expanded={filtersOpen}
          >
            {filtersOpen ? <X size={18} /> : <SlidersHorizontal size={18} />}
            {t("search.filters")}
          </button>
        </div>

        {filtersOpen && (
          <div className="card mb-6 grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-[var(--text-primary)] font-medium mb-3 text-sm">{t("search.category")}</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      category === c
                        ? "bg-sidrah-600 text-white"
                        : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                    }`}
                  >
                    {c === "الكل" ? t("search.all") : c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[var(--text-primary)] font-medium mb-3 text-sm">{t("search.price")}</h3>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setPriceIdx(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      priceIdx === i
                        ? "bg-sidrah-600 text-white"
                        : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                    }`}
                  >
                    {t(r.key)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[var(--text-primary)] font-medium mb-3 text-sm">{t("search.minRating")}</h3>
              <div className="flex flex-wrap gap-2">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      minRating === r
                        ? "bg-sidrah-600 text-white"
                        : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                    }`}
                  >
                    {r === 0 ? t("search.all") : `+${r} ★`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="text-[var(--text-secondary)] text-sm mb-6">{results.length} {t("search.results")}</p>

        {results.length > 0 ? (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((course) => (
              <StaggerItem key={course.id}>
                <CourseCard course={course} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="card text-center py-16">
            <Search size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t("search.emptyTitle")}</h2>
            <p className="text-[var(--text-secondary)]">{t("search.emptyDesc")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-primary)] py-12" />}>
      <SearchContent />
    </Suspense>
  );
}
