"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import CourseCard from "@/components/CourseCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllCourses } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";

const initialWishlist = [1, 4, 5];

export default function WishlistPage() {
  const { t } = useLang();
  const [ids, setIds] = useState<number[]>(initialWishlist);
  const courses = getAllCourses().filter((c) => ids.includes(c.id));

  const remove = (id: number) => {
    setIds((prev) => prev.filter((i) => i !== id));
    toast.success(t("wishlist.removed"));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("wishlist.title") }]} />
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-400" size={28} fill="currentColor" />
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t("wishlist.title")}</h1>
            <p className="text-[var(--text-secondary)] text-sm">{courses.length} {t("wishlist.saved")}</p>
          </div>
        </div>

        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="relative">
                <CourseCard course={course} />
                <button
                  onClick={() => remove(course.id)}
                  className="absolute top-4 left-4 w-9 h-9 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-400 hover:bg-black/70 transition-colors z-10"
                  aria-label={`${t("wishlist.remove")} ${course.title}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-16">
            <Heart size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t("wishlist.emptyTitle")}</h2>
            <p className="text-[var(--text-secondary)] mb-6">{t("wishlist.emptyDesc")}</p>
            <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
              {t("wishlist.browse")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
