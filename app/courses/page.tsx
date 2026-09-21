"use client";
import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { StaggerContainer, StaggerItem } from "@/components/Motion";
import { Search, LayoutGrid, List } from "lucide-react";
import CourseCover from "@/components/CourseCover";
import { getAllCourses } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";

const categoryOptions = ["Fundamentals", "Front-End", "Back-End", "Full Stack", "Mobile", "Database", "UI/UX", "AI Automation", "AI/ML", "Generative AI", "Cyber Security", "Data Analysis", "Testing", "DevOps"];

export default function CoursesPage() {
  const { t } = useLang();
  const allCourses = getAllCourses();
  const categories = [t("courses.all"), ...categoryOptions];
  const sortOptions = [
    { value: "rating", label: t("courses.sort.rating") },
    { value: "students", label: t("courses.sort.students") },
    { value: "price-asc", label: t("courses.sort.priceAsc") },
    { value: "price-desc", label: t("courses.sort.priceDesc") },
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("rating");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredCourses = allCourses
    .filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === categories[0] || course.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "students") return b.students - a.students;
      if (sort === "price-asc") return a.price - b.price;
      return b.price - a.price;
    });

  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("courses.breadcrumb") }]} />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{t("courses.title")}</h1>
            <p className="text-gray-400">{t("courses.subtitle")}</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder={t("courses.searchPlaceholder")} 
                className="input-field pr-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field !w-auto text-sm"
              aria-label={t("courses.sortLabel")}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="flex bg-dark-800 border border-dark-700 rounded-lg overflow-hidden" role="group" aria-label={t("courses.viewLabel")}>
              <button
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                aria-label={t("courses.gridView")}
                className={`p-2.5 transition-colors ${view === "grid" ? "bg-sidrah-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <LayoutGrid size={17} />
              </button>
              <button
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                aria-label={t("courses.listView")}
                className={`p-2.5 transition-colors ${view === "list" ? "bg-sidrah-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <List size={17} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-dark-800 text-gray-400 hover:text-white border border-dark-700 hover:border-cyan-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <StaggerContainer
          className={view === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
          key={activeCategory + searchQuery + view}
        >
          {filteredCourses.map((course) => (
            <StaggerItem key={course.id}>
              {view === "grid" ? (
                <CourseCard course={course} />
              ) : (
                <a href={`/courses/${course.id}`} className="card flex items-center gap-5 !p-4 hover:border-sidrah-700 transition-colors">
                  <div className="w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <CourseCover color={course.color} title={course.title} emoji={course.emoji} className="!h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-sidrah-400">{course.category}</span>
                    <h3 className="text-white font-bold truncate">{course.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-1">{course.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-2">
                      <span>⭐ {course.rating}</span>
                      <span>{course.lessonsCount} {t("course.lesson")}</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <div className="text-xl font-bold text-white">${course.price}</div>
                    <span className="text-sidrah-400 text-xs">{t("course.details")} ←</span>
                  </div>
                </a>
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">{t("courses.empty")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
