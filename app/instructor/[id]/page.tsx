"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, Users, BookOpen, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CourseCard from "@/components/CourseCard";
import { getAllCourses } from "@/lib/courses-data";
import { StaggerContainer, StaggerItem } from "@/components/Motion";
import { useLang } from "@/context/LanguageContext";

export default function InstructorPage() {
  const { t } = useLang();
  const instructors: Record<string, { name: string; title: string; bio: string; students: number; courses: number; rating: number; years: number }> = {
    "1": {
      name: "Ahmed Salah",
      title: t("inst.1.title"),
      bio: t("inst.1.bio"),
      students: 15200,
      courses: 6,
      rating: 4.8,
      years: 8,
    },
    "2": {
      name: "Mohamed Ali",
      title: t("inst.2.title"),
      bio: t("inst.2.bio"),
      students: 9800,
      courses: 4,
      rating: 4.9,
      years: 6,
    },
    "3": {
      name: "Sara Ahmed",
      title: t("inst.3.title"),
      bio: t("inst.3.bio"),
      students: 7300,
      courses: 5,
      rating: 4.9,
      years: 7,
    },
  };
  const params = useParams();
  const instructor = instructors[String(params.id)] ?? instructors["1"];
  const courses = getAllCourses().slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("inst.breadcrumb") }, { label: instructor.name }]} />

        <div className="card mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-sidrah-600 to-purple-500 flex items-center justify-center text-white font-bold text-5xl flex-shrink-0">
              {instructor.name[0]}
            </div>
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-1">{instructor.name}</h1>
              <p className="text-sidrah-400 mb-4">{instructor.title}</p>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">{instructor.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                <span className="flex items-center gap-2 text-yellow-400">
                  <Star size={18} fill="currentColor" /> {instructor.rating} {t("inst.rating")}
                </span>
                <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Users size={18} /> {instructor.students.toLocaleString()} {t("inst.students")}
                </span>
                <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <BookOpen size={18} /> {instructor.courses} {t("inst.courses")}
                </span>
                <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <MapPin size={18} /> {t("inst.country")}
                </span>
              </div>
            </div>
            <Link href="/contact" className="btn-primary flex-shrink-0">
              {t("inst.contact")}
            </Link>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">{t("inst.coursesOf")} {instructor.name}</h2>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <StaggerItem key={course.id}>
              <CourseCard course={course} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
