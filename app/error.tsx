"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLang();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{t("error.title")}</h1>
        <p className="text-[var(--text-secondary)] mb-8">
          {t("error.message")}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary inline-flex items-center gap-2">
            <RotateCcw size={18} />
            {t("error.retry")}
          </button>
          <Link href="/" className="btn-secondary inline-flex items-center gap-2">
            <Home size={18} />
            {t("error.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
