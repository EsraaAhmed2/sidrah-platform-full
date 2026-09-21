"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ClipboardList, Upload, CheckCircle2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCourseById } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";

type Status = "pending" | "submitted" | "graded" | "late";

export default function AssignmentsPage() {
  const { t } = useLang();
  const params = useParams();
  const courseId = Number(params.id);
  const courseData = getCourseById(courseId);
  const [items, setItems] = useState([
    { id: 1, title: t("assignments.todoTitle"), desc: t("assignments.todoDesc"), due: t("assignments.todoDue"), points: 100, status: "pending" as Status, grade: null as number | null },
    { id: 2, title: t("assignments.stateTitle"), desc: t("assignments.stateDesc"), due: t("assignments.stateDue"), points: 50, status: "submitted" as Status, grade: null as number | null },
    { id: 3, title: t("assignments.responsiveTitle"), desc: t("assignments.responsiveDesc"), due: t("assignments.responsiveDue"), points: 80, status: "graded" as Status, grade: 72 },
  ]);
  const [submitting, setSubmitting] = useState<number | null>(null);

  const statusMap: Record<Status, { label: string; color: string; icon: typeof CheckCircle2 }> = {
    pending: { label: t("assignments.pending"), color: "text-yellow-400 bg-yellow-500/10", icon: Clock },
    submitted: { label: t("assignments.submitted"), color: "text-blue-400 bg-blue-500/10", icon: Upload },
    graded: { label: t("assignments.graded"), color: "text-green-400 bg-green-500/10", icon: CheckCircle2 },
    late: { label: t("assignments.late"), color: "text-red-400 bg-red-500/10", icon: XCircle },
  };

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

  const submit = (id: number) => {
    setItems((a) => a.map((x) => (x.id === id ? { ...x, status: "submitted" as Status } : x)));
    setSubmitting(null);
    toast.success(t("assignments.submittedToast"));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: t("courses.breadcrumb"), href: "/courses" },
            { label: courseData.title, href: `/courses/${courseId}` },
            { label: t("assignments.breadcrumb") },
          ]}
        />
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-3">
          <ClipboardList className="text-sidrah-400" size={26} />
          {t("assignments.title")}
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">{courseData.title}</p>

        <div className="space-y-4">
          {items.map((a) => {
            const st = statusMap[a.status];
            return (
              <div key={a.id} className="card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-[var(--text-primary)] font-bold">{a.title}</h2>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">{a.desc}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${st.color}`}>
                    <st.icon size={13} /> {st.label}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                  <span className="flex items-center gap-1"><Clock size={13} /> {t("assignments.due")}: {a.due}</span>
                  <span>{t("assignments.points")}: {a.points}</span>
                  {a.grade !== null && (
                    <span className="text-green-400 font-medium">{t("assignments.youScored")}: {a.grade}/{a.points}</span>
                  )}
                </div>

                {a.status === "pending" && (
                  submitting === a.id ? (
                    <div className="flex items-center gap-3">
                      <label className="btn-secondary !py-2 text-sm flex items-center gap-2 cursor-pointer">
                        <Upload size={16} /> {t("assignments.chooseFile")}
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.length) submit(a.id);
                          }}
                        />
                      </label>
                      <button onClick={() => setSubmitting(null)} className="text-[var(--text-muted)] text-sm">
                        {t("common.cancel")}
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setSubmitting(a.id)} className="btn-primary !py-2 text-sm flex items-center gap-2">
                      <Upload size={16} /> {t("assignments.submit")}
                    </button>
                  )
                )}
                {a.status === "submitted" && (
                  <p className="text-blue-400 text-sm">{t("assignments.underReview")}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
