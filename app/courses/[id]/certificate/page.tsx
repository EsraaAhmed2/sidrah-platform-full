"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Download, Share2, Award, Check, Star } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { getCourseById } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";

export default function CertificatePage() {
  const { t } = useLang();
  const params = useParams();
  const courseId = Number(params.id);
  const courseData = getCourseById(courseId);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!courseData) return;
    const timeout = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.3 },
        colors: ["#0ea5e9", "#8b5cf6", "#f59e0b", "#10b981"],
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [courseData]);

  const handleDownload = () => {
    toast.info(t("certificate.printHint"));
    setTimeout(() => window.print(), 400);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${t("certificate.shareTitle")} - ${courseData?.title || "Sidrah"}`,
        text: `${t("certificate.shareText1")}${courseData?.title || ""}${t("certificate.shareText2")}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t("certificate.linkCopied"));
    }
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

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("certificate.title")}</h1>
          <p className="text-[var(--text-secondary)]">{t("certificate.subtitle")}</p>
        </div>

        {/* Certificate */}
        <div ref={certRef} className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12 border-4 border-amber-300 shadow-2xl mb-8">
          <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-amber-400"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-amber-400"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-amber-400"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-amber-400"></div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>
              <span className="text-2xl font-bold text-amber-800">SIDRAH</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4" style={{ fontFamily: "serif" }}>
              {t("certificate.title")}
            </h2>
            <p className="text-amber-700 text-lg mb-8">
              {t("certificate.presentedTo")}
            </p>

            <h3 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4" style={{ fontFamily: "cursive" }}>
              Ahmed Khaled
            </h3>

            <p className="text-amber-700 mb-2">
              {t("certificate.forCompleting")}
            </p>
            <h4 className="text-2xl font-bold text-amber-800 mb-6">
              {courseData.certificateTitle}
            </h4>

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} className="text-amber-400" fill="currentColor" />
                ))}
              </div>
              <span className="text-amber-700 text-sm">{t("certificate.excellentRating")}</span>
            </div>

            <div className="flex items-center justify-between max-w-md mx-auto mb-8">
              <div className="text-center">
                <p className="text-amber-600 text-sm mb-1">{t("certificate.date")}</p>
                <p className="text-amber-800 font-medium">{t("certificate.sampleDate")}</p>
              </div>
              <div className="w-px h-12 bg-amber-300"></div>
              <div className="text-center">
                <p className="text-amber-600 text-sm mb-1">{t("certificate.courseDuration")}</p>
                <p className="text-amber-800 font-medium">{courseData.duration}</p>
              </div>
              <div className="w-px h-12 bg-amber-300"></div>
              <div className="text-center">
                <p className="text-amber-600 text-sm mb-1">{t("certificate.certNumber")}</p>
                <p className="text-amber-800 font-medium">SID-2026-{String(courseData.id).padStart(3, "0")}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-32 h-px bg-amber-400 mb-2"></div>
                <p className="text-amber-700 text-sm" style={{ fontFamily: "cursive" }}>Hossam Ahmed</p>
                <p className="text-amber-600 text-xs">{t("certificate.platformDirector")}</p>
              </div>
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-400">
                <Award className="w-10 h-10 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-[var(--text-primary)] font-medium">{t("certificate.verifiedTitle")}</h3>
              <p className="text-[var(--text-secondary)] text-sm">{t("certificate.verifiedDesc")}</p>
            </div>
          </div>
          <div className="bg-[var(--bg-primary)] rounded-lg p-3 flex items-center justify-between">
            <code className="text-sidrah-400 text-sm">SID-2026-{String(courseData.id).padStart(3, "0")}-{courseData.title.split(" ")[0].toUpperCase()}-AHMED</code>
            <button onClick={() => { navigator.clipboard.writeText(`SID-2026-${String(courseData.id).padStart(3, "0")}-${courseData.title.split(" ")[0].toUpperCase()}-AHMED`); toast.success(t("certs.copied")); }} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm">{t("certificate.copy")}</button>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={handleDownload} className="btn-primary flex items-center gap-2">
            <Download size={18} />
            {t("certificate.download")}
          </button>
          <button onClick={handleShare} className="btn-secondary flex items-center gap-2">
            <Share2 size={18} />
            {t("certificate.share")}
          </button>
          <Link href="/dashboard" className="btn-secondary flex items-center gap-2">
            {t("certificate.dashboard")}
          </Link>
        </div>
      </div>
    </div>
  );
}
