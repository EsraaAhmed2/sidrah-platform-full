"use client";
import { useState, useCallback } from "react";
import { useLang } from "@/context/LanguageContext";
import { Upload, FileVideo, Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import RoleGuard from "@/components/RoleGuard";
import { getAllCourses } from "@/lib/courses-data";

interface UploadFile {
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "done";
}

export default function UploadPage() {
  const { t } = useLang();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");

  const simulateUpload = useCallback((name: string, sizeMB: number) => {
    const f: UploadFile = { name, size: `${sizeMB.toFixed(1)} MB`, progress: 0, status: "uploading" };
    setFiles((prev) => [...prev, f]);
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((p) =>
          p.name === name && p.status === "uploading"
            ? { ...p, progress: Math.min(p.progress + Math.random() * 15, 100), status: p.progress >= 99 ? "done" : "uploading" }
            : p
        )
      );
    }, 400);
    setTimeout(() => clearInterval(interval), 3500);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    Array.from(e.dataTransfer.files).forEach((f) => simulateUpload(f.name, f.size / 1048576));
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files ?? []).forEach((f) => simulateUpload(f.name, f.size / 1048576));
  };

  const publish = () => {
    if (!courseId || !lessonTitle) {
      toast.error(t("teacher.upload.toast.missing"));
      return;
    }
    toast.success(t("teacher.upload.toast.success"));
    setFiles([]);
    setLessonTitle("");
  };

  return (
    <RoleGuard roles={["teacher", "admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: t("teacher.breadcrumb.dashboard"), href: "/teacher" }, { label: t("teacher.breadcrumb.upload") }]} />
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{t("teacher.upload.title")}</h1>
          <p className="text-[var(--text-secondary)] mb-8">{t("teacher.upload.subtitle")}</p>

          <div className="card mb-6 space-y-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("teacher.upload.courseLabel")}</label>
              <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="input-field">
                <option value="">{t("teacher.upload.coursePlaceholder")}</option>
                {getAllCourses().map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">{t("teacher.upload.lessonLabel")}</label>
              <input
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder={t("teacher.upload.lessonPlaceholder")}
                className="input-field"
              />
            </div>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`card border-2 border-dashed text-center py-16 transition-colors cursor-pointer mb-6 ${
              dragging ? "border-sidrah-500 bg-sidrah-950/20" : "border-[var(--border-color)]"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
            role="button"
            aria-label={t("teacher.upload.dropzoneLabel")}
          >
            <Upload size={48} className={`mx-auto mb-4 ${dragging ? "text-sidrah-400" : "text-[var(--text-muted)]"}`} />
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t("teacher.upload.dragTitle")}</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">{t("teacher.upload.dragSubtitle")}</p>
            <input id="file-input" type="file" accept="video/*" multiple className="hidden" onChange={onPick} />
            <span className="btn-secondary text-sm inline-block">{t("teacher.upload.chooseFile")}</span>
          </div>

          {/* Upload list */}
          {files.length > 0 && (
            <div className="card mb-6 space-y-4">
              <h3 className="font-bold text-[var(--text-primary)]">{t("teacher.upload.filesTitle")}</h3>
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--bg-primary)]">
                  <FileVideo className="text-sidrah-400 flex-shrink-0" size={24} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--text-primary)] text-sm truncate">{f.name}</p>
                    <p className="text-[var(--text-muted)] text-xs">{f.size}</p>
                    <div className="w-full bg-dark-600 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-sidrah-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                  </div>
                  {f.status === "done" ? (
                    <Check size={20} className="text-green-400 flex-shrink-0" />
                  ) : (
                    <Loader2 size={18} className="animate-spin text-sidrah-400 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}

          <button onClick={publish} className="btn-primary w-full flex items-center justify-center gap-2">
            <Check size={18} /> {t("teacher.upload.publish")}
          </button>
        </div>
      </div>
    </RoleGuard>
  );
}
