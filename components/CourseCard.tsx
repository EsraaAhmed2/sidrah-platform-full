import Link from "next/link";
import { Star, Users, ArrowLeft, Clock } from "lucide-react";
import CourseCover from "@/components/CourseCover";
import T from "@/components/T";

interface Course {
  id: number;
  title: string;
  description: string;
  emoji: string;
  rating: number;
  students: number;
  price: number;
  color: string;
  duration?: string;
  category?: string;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="card hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 group block"
    >
      <div className="overflow-hidden rounded-xl mb-4 -mx-2 -mt-2">
        <div className="group-hover:scale-105 transition-transform duration-500">
          <CourseCover color={course.color} title={course.title} emoji={course.emoji} />
        </div>
      </div>
      {course.category && (
        <span className="inline-block text-xs text-sidrah-400 bg-sidrah-950/40 px-2 py-1 rounded-md mb-2">
          {course.category}
        </span>
      )}
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-sidrah-400 transition-colors">
        {course.title}
      </h3>
      <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">{course.description}</p>
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1 text-yellow-400">
          <Star size={16} fill="currentColor" />
          <span>{course.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--text-secondary)]">
          <Users size={16} />
          <span>{course.students}</span>
        </div>
        {course.duration && (
          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
        <span className="text-2xl font-bold text-[var(--text-primary)]">${course.price}</span>
        <span className="text-cyan-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          <T k="course.details" />
          <ArrowLeft size={16} />
        </span>
      </div>
    </Link>
  );
}
